import { useEffect } from "react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (start, end, amount) => start + (end - start) * amount;

export function useHomeAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanup = [];

    initPreloader(cleanup);
    initDynamicPageMotion(cleanup, prefersReduced, canHover);
    initApproachStage(cleanup, prefersReduced);
    initVideoCards(cleanup, prefersReduced, canHover);
    initHeroWhiteFade(cleanup, prefersReduced);
    initStoryProgress(cleanup, prefersReduced, canHover);
    initReviewCarousel(cleanup, prefersReduced);
    initContactMotion(cleanup, prefersReduced, canHover);

    return () => cleanup.forEach((fn) => fn?.());
  }, []);
}

function initPreloader(cleanup) {
  const preloader = document.querySelector("#preloader");
  const bar = document.querySelector("#preBar");
  const pct = document.querySelector("#prePct");
  const video = document.querySelector("#heroVideo");

  if (!preloader || !bar || !pct) {
    document.documentElement.classList.remove("is-loading");
    return;
  }

  document.documentElement.classList.add("is-loading");

  let progress = 0;
  let finished = false;
  const startedAt = Date.now();
  const minTime = 700;
  const maxWait = 5000;

  const setProgress = (value) => {
    progress = clamp(value, 0, 100);
    const rounded = Math.floor(progress);
    bar.style.width = `${rounded}%`;
    pct.textContent = `${rounded}%`;
  };

  const interval = window.setInterval(() => {
    if (progress < 55) setProgress(progress + Math.random() * 7);
    else if (progress < 82) setProgress(progress + Math.random() * 3.5);
    else if (progress < 94) setProgress(progress + Math.random() * 1.2);
  }, 140);

  const finish = () => {
    if (finished) return;
    finished = true;
    window.clearInterval(interval);

    const elapsed = Date.now() - startedAt;
    const wait = Math.max(0, minTime - elapsed);

    window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => {
        preloader.classList.add("preloader--hide");
        document.documentElement.classList.remove("is-loading");
        window.setTimeout(() => preloader.remove(), 850);
      }, 300);
    }, wait);
  };

  if (video) {
    try { video.load(); } catch (error) { /* no blocking */ }
    if (video.readyState >= 2) finish();
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("canplay", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
  }

  window.addEventListener("load", finish, { once: true });
  const fallback = window.setTimeout(finish, maxWait);

  cleanup.push(() => {
    window.clearInterval(interval);
    window.clearTimeout(fallback);
    document.documentElement.classList.remove("is-loading");
  });
}

function initDynamicPageMotion(cleanup, prefersReduced, canHover) {
  if (prefersReduced) return;

  const root = document.documentElement;
  const body = document.body;
  const sections = Array.from(document.querySelectorAll(".hero, .approachStage, .videoShowcase, .storyMoment, .reviews, .contactHero, .footer"));
  const magneticItems = Array.from(document.querySelectorAll(".btn, .videoCard, .reviewTile, .socialBtn, .footer__cta"));

  let currentY = window.scrollY || 0;
  let easedY = currentY;
  let lastY = currentY;
  let velocity = 0;
  let raf = 0;

  const update = () => {
    currentY = window.scrollY || document.documentElement.scrollTop || 0;
    easedY = lerp(easedY, currentY, 0.12);
    velocity = lerp(velocity, currentY - lastY, 0.18);
    lastY = currentY;

    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = clamp(currentY / docHeight, 0, 1);

    root.style.setProperty("--pageProgress", progress.toFixed(4));
    root.style.setProperty("--smoothScrollY", easedY.toFixed(2));
    root.style.setProperty("--scrollVelocity", clamp(Math.abs(velocity) / 38, 0, 1).toFixed(3));
    body.classList.toggle("is-scrolling-fast", Math.abs(velocity) > 18);

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionProgress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
      const centerOffset = clamp((rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight, -1, 1);
      section.style.setProperty("--sectionProgress", sectionProgress.toFixed(4));
      section.style.setProperty("--sectionCenter", centerOffset.toFixed(4));
      section.classList.toggle("is-section-active", rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28);
    });
  };

  const onScroll = () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  if (canHover) {
    const handlers = [];
    magneticItems.forEach((item) => {
      const mouseMove = (event) => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty("--magnetX", `${(x * 10).toFixed(2)}px`);
        item.style.setProperty("--magnetY", `${(y * 8).toFixed(2)}px`);
      };
      const mouseLeave = () => {
        item.style.setProperty("--magnetX", "0px");
        item.style.setProperty("--magnetY", "0px");
      };
      item.addEventListener("mousemove", mouseMove);
      item.addEventListener("mouseleave", mouseLeave);
      handlers.push([item, mouseMove, mouseLeave]);
    });
    cleanup.push(() => handlers.forEach(([item, mouseMove, mouseLeave]) => {
      item.removeEventListener("mousemove", mouseMove);
      item.removeEventListener("mouseleave", mouseLeave);
    }));
  }

  cleanup.push(() => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  });
}

function initApproachStage(cleanup, prefersReduced) {
  const section = document.querySelector(".approachStage");
  if (!section) return;

  const images = Array.from(section.querySelectorAll(".approachStage__rightImg"));
  let activeIndex = 0;
  let interval;

  if (images.length > 1 && !prefersReduced) {
    interval = window.setInterval(() => {
      images[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % images.length;
      images[activeIndex].classList.add("is-active");
    }, 4200);
  }

  const update = () => {
    const rect = section.getBoundingClientRect();
    const totalScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / totalScroll, 0, 1);
    const titleProgress = clamp((progress - 0.10) / 0.25, 0, 1);
    const cardProgress = clamp((progress - 0.20) / 0.35, 0, 1);

    section.style.setProperty("--titleOpacity", (1 - titleProgress).toFixed(3));
    section.style.setProperty("--cardOpacity", cardProgress.toFixed(3));
    section.style.setProperty("--cardOffset", `${(240 - 240 * cardProgress).toFixed(1)}px`);
    section.style.setProperty("--leftScale", (1.03 - 0.02 * progress).toFixed(4));
    section.style.setProperty("--rightScale", (1.06 - 0.04 * progress).toFixed(4));
  };

  let raf = 0;
  const requestUpdate = () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  cleanup.push(() => {
    if (interval) window.clearInterval(interval);
    window.cancelAnimationFrame(raf);
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
  });
}

function initVideoCards(cleanup, prefersReduced, canHover) {
  if (!canHover || prefersReduced) return;
  const cards = Array.from(document.querySelectorAll(".videoCard"));
  const handlers = [];

  cards.forEach((card) => {
    const mouseMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = (0.5 - (y / rect.height)) * 7;
      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    };
    const mouseLeave = () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    card.addEventListener("mousemove", mouseMove);
    card.addEventListener("mouseleave", mouseLeave);
    handlers.push([card, mouseMove, mouseLeave]);
  });

  cleanup.push(() => handlers.forEach(([card, mouseMove, mouseLeave]) => {
    card.removeEventListener("mousemove", mouseMove);
    card.removeEventListener("mouseleave", mouseLeave);
  }));
}

function initHeroWhiteFade(cleanup, prefersReduced) {
  const hero = document.querySelector("#hero");
  const nextSection = document.querySelector("#approach");
  if (!hero || !nextSection || prefersReduced) return;

  const update = () => {
    const nextRect = nextSection.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = clamp((vh * 0.78 - nextRect.top) / (vh * 0.78), 0, 1);

    hero.style.setProperty("--heroWhiteFade", progress.toFixed(3));
    hero.style.setProperty("--heroExitOpacity", (1 - progress).toFixed(3));
    hero.style.setProperty("--heroBlur", `${(progress * 2.4).toFixed(2)}px`);
    hero.classList.toggle("hero-exiting", progress > 0.01);
    hero.classList.remove("hero-hidden");
  };

  let raf = 0;
  const requestUpdate = () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  cleanup.push(() => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
  });
}

function initStoryProgress(cleanup, prefersReduced, canHover) {
  const story = document.querySelector("#storyMoment");
  if (!story) return;

  const updateProgress = () => {
    const rect = story.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = 1 - clamp((rect.top + vh * 0.2) / (vh * 1.2), 0, 1);
    story.style.setProperty("--storyProgress", progress.toFixed(3));
  };

  let raf = 0;
  const onScroll = () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateProgress();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) story.classList.add("is-visible");
    });
  }, { threshold: 0.35, rootMargin: "0px 0px -12% 0px" });
  observer.observe(story);

  let mouseMove;
  let mouseLeave;
  if (canHover && !prefersReduced) {
    mouseMove = (event) => {
      const rect = story.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 22;
      story.style.setProperty("--mx", `${x.toFixed(2)}px`);
      story.style.setProperty("--my", `${y.toFixed(2)}px`);
    };
    mouseLeave = () => {
      story.style.setProperty("--mx", "0px");
      story.style.setProperty("--my", "0px");
    };
    story.addEventListener("mousemove", mouseMove);
    story.addEventListener("mouseleave", mouseLeave);
  }

  cleanup.push(() => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    observer.disconnect();
    if (mouseMove) story.removeEventListener("mousemove", mouseMove);
    if (mouseLeave) story.removeEventListener("mouseleave", mouseLeave);
  });
}

function initReviewCarousel(cleanup, prefersReduced) {
  const root = document.querySelector("[data-review-carousel]");
  if (!root) return;

  const track = root.querySelector(".reviewTrack");
  const cards = Array.from(root.querySelectorAll(".reviewTile"));
  const dotsWrap = root.querySelector(".reviewDots");
  if (!track || !cards.length || !dotsWrap) return;

  let page = 0;
  let timer = null;

  const getPerView = () => {
    const value = parseInt(getComputedStyle(track).getPropertyValue("--perView"), 10);
    return Number.isFinite(value) && value > 0 ? value : 3;
  };

  const getPages = () => Math.max(1, Math.ceil(cards.length / getPerView()));

  const setActiveDot = () => {
    Array.from(dotsWrap.querySelectorAll(".reviewDot")).forEach((dot, i) => dot.classList.toggle("is-active", i === page));
  };

  const go = (nextPage) => {
    const pages = getPages();
    page = clamp(nextPage, 0, pages - 1);
    const perView = getPerView();
    const maxCardIndex = Math.max(0, cards.length - perView);
    const cardIndex = Math.min(page * perView, maxCardIndex);
    const target = cards[cardIndex];
    track.style.transform = `translate3d(${-((target && target.offsetLeft) || 0)}px, 0, 0)`;
    setActiveDot();
  };

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < getPages(); i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `reviewDot${i === page ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `Go to reviews page ${i + 1}`);
      dot.addEventListener("click", () => {
        go(i);
        restartAuto();
      });
      dotsWrap.appendChild(dot);
    }
  };

  const next = () => go(page >= getPages() - 1 ? 0 : page + 1);
  const stopAuto = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const startAuto = () => {
    if (prefersReduced) return;
    stopAuto();
    timer = window.setInterval(next, 5500);
  };
  const restartAuto = () => {
    stopAuto();
    startAuto();
  };

  const onResize = () => {
    page = clamp(page, 0, getPages() - 1);
    buildDots();
    go(page);
  };

  buildDots();
  go(0);
  startAuto();

  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);
  root.addEventListener("focusin", stopAuto);
  root.addEventListener("focusout", startAuto);
  window.addEventListener("resize", onResize);

  cleanup.push(() => {
    stopAuto();
    root.removeEventListener("mouseenter", stopAuto);
    root.removeEventListener("mouseleave", startAuto);
    root.removeEventListener("focusin", stopAuto);
    root.removeEventListener("focusout", startAuto);
    window.removeEventListener("resize", onResize);
  });
}

function initContactMotion(cleanup, prefersReduced, canHover) {
  const contact = document.querySelector(".contactHero");
  if (!contact || prefersReduced || !canHover) return;

  const mouseMove = (event) => {
    const rect = contact.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 22;
    contact.style.setProperty("--contactMx", `${x.toFixed(2)}px`);
    contact.style.setProperty("--contactMy", `${y.toFixed(2)}px`);
  };

  const mouseLeave = () => {
    contact.style.setProperty("--contactMx", "0px");
    contact.style.setProperty("--contactMy", "0px");
  };

  contact.addEventListener("mousemove", mouseMove);
  contact.addEventListener("mouseleave", mouseLeave);

  cleanup.push(() => {
    contact.removeEventListener("mousemove", mouseMove);
    contact.removeEventListener("mouseleave", mouseLeave);
  });
}
