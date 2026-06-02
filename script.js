const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

/* Progress bar */
const progressBar = $("#progressBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = `${Math.min(100, Math.max(0, p))}%`;
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-in");
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

/* Mobile Drawer */
const burger = $("#burger");
const drawer = $("#drawer");
const drawerClose = $("#drawerClose");

function openDrawer(){
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  burger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
burger?.addEventListener("click", () => drawer.classList.contains("is-open") ? closeDrawer() : openDrawer());
drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });
$$(".drawer__link").forEach(a => a.addEventListener("click", closeDrawer));

/* Contact toast (frontend only) */
const toast = $("#toast");
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("is-show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("is-show"), 2600);
}

$("#contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Enquiry sent ✅ (Frontend). Connect email/WhatsApp anytime.");
  e.target.reset();
});

/* Footer year */
$("#year").textContent = new Date().getFullYear();

/* Set your real contact links here */
const SETTINGS = {
  email: "hello@yourdomain.com",
  whatsapp: "94770000000" // no +
};

const mailLink = $("#mailLink");
const waLink = $("#waLink");
if (mailLink){
  mailLink.href = `mailto:${SETTINGS.email}`;
  mailLink.textContent = SETTINGS.email;
}
if (waLink){
  waLink.href = `https://wa.me/${SETTINGS.whatsapp}`;
  waLink.textContent = `wa.me/${SETTINGS.whatsapp}`;
}

(() => {
  const carousel = document.getElementById("storiesCarousel");
  const track = document.getElementById("storiesTrack");
  const prevBtn = document.getElementById("storiesPrev");
  const nextBtn = document.getElementById("storiesNext");
  const dotsWrap = document.getElementById("storiesDots");

  if (!carousel || !track) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // store original slides
  let originalSlides = Array.from(track.children);
  const total = originalSlides.length;

  let perView = 3;
  let gap = 0;
  let slideW = 0;

  let index = 0;          // index in "track children" (after cloning)
  let timer = null;
  let isHover = false;

  function readVars() {
    const cs = getComputedStyle(carousel);
    perView = parseInt(cs.getPropertyValue("--perView")) || 3;
    const gapStr = getComputedStyle(track).gap || cs.getPropertyValue("--gap") || "0px";
    gap = parseFloat(gapStr) || 0;
  }

  function measure() {
    const first = track.querySelector(".storySlide");
    if (!first) return;
    slideW = first.getBoundingClientRect().width;
  }

  function setTransition(on) {
    track.style.transition = on ? "transform .55s ease" : "none";
  }

  function goTo(i, animate = true) {
    setTransition(animate);
    track.style.transform = `translateX(${-(i * (slideW + gap))}px)`;
    index = i;
    updateDots();
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carDot";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => {
        stop();
        goTo(perView + i, true);
        start();
      });
      dotsWrap.appendChild(b);
    }
    updateDots();
  }

  function updateDots() {
    const dots = Array.from(dotsWrap.children);
    if (!dots.length) return;
    // map cloned index to original index
    const realIndex = ((index - perView) % total + total) % total;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));
  }

  function rebuild() {
    // restore to originals
    track.innerHTML = "";
    originalSlides.forEach(s => track.appendChild(s));

    readVars();

    // clone last perView to front + first perView to end
    originalSlides = Array.from(track.children);
    const headClones = originalSlides.slice(0, perView).map(n => n.cloneNode(true));
    const tailClones = originalSlides.slice(-perView).map(n => n.cloneNode(true));

    tailClones.forEach(n => track.insertBefore(n, track.firstChild));
    headClones.forEach(n => track.appendChild(n));

    // start at first real slide
    requestAnimationFrame(() => {
      measure();
      goTo(perView, false);
      buildDots();
    });
  }

  function next() {
    goTo(index + 1, true);
  }

  function prev() {
    goTo(index - 1, true);
  }

  // handle infinite snap after transition
  track.addEventListener("transitionend", () => {
    // when passing end clones
    if (index >= total + perView) {
      goTo(perView, false);
    }
    // when passing start clones
    if (index < perView) {
      goTo(total + perView - 1, false);
    }
  });

  prevBtn?.addEventListener("click", () => { stop(); prev(); start(); });
  nextBtn?.addEventListener("click", () => { stop(); next(); start(); });

  function start() {
    if (prefersReduced) return;
    if (timer) return;
    timer = setInterval(() => {
      if (!isHover) next();
    }, 3500);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  carousel.addEventListener("mouseenter", () => { isHover = true; });
  carousel.addEventListener("mouseleave", () => { isHover = false; });

  // rebuild on resize (perView changes)
  let rAF = null;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => rebuild());
  });

  rebuild();
  start();
})();

  document.getElementById("year").textContent = new Date().getFullYear();
  
 //-- ================= PRELOADER SCRIPT (VIDEO LOADING TIME) ================= 
    (function () {
      const preloader = document.getElementById("preloader");
      const video = document.getElementById("heroVideo");

      // show preloader at least this long (prevents flash)
      const MIN_TIME = 700;
      // safety fallback: never stay stuck
      const MAX_WAIT = 4500;

      const start = Date.now();
      let doneCalled = false;

      function hidePreloader() {
        if (doneCalled) return;
        doneCalled = true;

        const elapsed = Date.now() - start;
        const wait = Math.max(0, MIN_TIME - elapsed);

        setTimeout(() => {
          if (preloader) preloader.classList.add("preloader--hide");
          document.documentElement.classList.remove("is-loading");
        }, wait);
      }

      // If video is already ready enough
      function videoReadyNow(v) {
        try { return v && v.readyState >= 2; } catch (e) { return false; } // HAVE_CURRENT_DATA
      }

      // Always force a fallback timeout
      setTimeout(hidePreloader, MAX_WAIT);

      // If no video on page
      if (!video) {
        window.addEventListener("load", hidePreloader, { once: true });
        return;
      }

      // Try to start loading immediately
      try { video.load(); } catch (e) {}

      // If ready immediately, hide
      if (videoReadyNow(video)) {
        hidePreloader();
        return;
      }

      // Wait for video to have actual frame data
      video.addEventListener("loadeddata", hidePreloader, { once: true });
      video.addEventListener("canplay", hidePreloader, { once: true });

      // If error, don't block the site
      video.addEventListener("error", hidePreloader, { once: true });

      // Extra: if whole page loaded and video still slow, allow hide
      window.addEventListener("load", function () {
        // if still not ready, we still hide (user-first)
        hidePreloader();
      }, { once: true });

      // Footer year
      const y = document.getElementById("year");
      if (y) y.textContent = new Date().getFullYear();
    })();

  (function(){
    const sec = document.querySelector('.approachStage');
    if(!sec) return;

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    let ticking = false;
    function update(){
      ticking = false;

      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;

      // how much we can scroll inside this section
      const maxScroll = Math.max(1, r.height - vh);

      // scrolled distance within section (0 -> maxScroll)
      const scrolled = clamp(-r.top, 0, maxScroll);

      // progress 0..1
      const p = scrolled / maxScroll;

      // card comes in between 0.28 and 0.60 (tuned to look like your video)
      const cardIn = clamp((p - 0.28) / 0.32, 0, 1);

      // card slide + fade
      const cardOffset = (1 - cardIn) * 240; // px
      const cardOpacity = cardIn;

      // title fades slightly when card comes in (still visible behind)
      const titleOpacity = 1 - (cardIn * 0.55); // 1 -> 0.45

      sec.style.setProperty('--cardOffset', cardOffset.toFixed(0) + 'px');
      sec.style.setProperty('--cardOpacity', cardOpacity.toFixed(3));
      sec.style.setProperty('--titleOpacity', titleOpacity.toFixed(3));
    }

    function onScroll(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    update();
  })();

    (function(){
      const pre = document.getElementById("preloader");
      const bar = document.getElementById("preBar");
      const pct = document.getElementById("prePct");
      if(!pre || !bar || !pct) return;

      let p = 0;
      const tick = setInterval(() => {
        p = Math.min(92, p + Math.random() * 6);
        const v = Math.floor(p);
        bar.style.width = v + "%";
        pct.textContent = v + "%";
      }, 140);

      window.addEventListener("load", () => {
        clearInterval(tick);
        bar.style.width = "100%";
        pct.textContent = "100%";

        setTimeout(() => {
          pre.classList.add("preloader--hide");
          document.documentElement.classList.remove("is-loading");
          setTimeout(() => pre.remove(), 500);
        }, 220);
      });
    })();

(function(){
  const root = document.querySelector('[data-review-carousel]');
  if(!root) return;

  const track = root.querySelector('.reviewTrack');
  const cards = Array.from(root.querySelectorAll('.reviewTile'));
  const dotsWrap = root.querySelector('.reviewDots');
  const prev = root.querySelector('.revArrow--prev');
  const next = root.querySelector('.revArrow--next');

  if(!track || cards.length === 0 || !dotsWrap) return;

  function perView(){
    const v = getComputedStyle(track).getPropertyValue('--perView').trim();
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? n : 3;
  }

  function pageCount(){
    return Math.ceil(cards.length / perView());
  }

  let page = 0;

  function buildDots(){
    dotsWrap.innerHTML = '';
    const pages = pageCount();
    for(let i=0;i<pages;i++){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'reviewDot' + (i === page ? ' is-active' : '');
      b.setAttribute('aria-label', 'Go to reviews page ' + (i+1));
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    }
  }

  function setActiveDot(){
    const dots = Array.from(dotsWrap.querySelectorAll('.reviewDot'));
    dots.forEach((d,i)=>d.classList.toggle('is-active', i===page));
  }

  function go(p){
    const pages = pageCount();
    page = Math.max(0, Math.min(p, pages-1));

    // move track by page
    const firstIndex = page * perView();
    const target = cards[firstIndex];
    const left = target ? target.offsetLeft : 0;

    track.style.transform = `translateX(${-left}px)`;
    setActiveDot();
  }

  function nextPage(){ go(page + 1); }
  function prevPage(){ go(page - 1); }

  prev && prev.addEventListener('click', prevPage);
  next && next.addEventListener('click', nextPage);

  window.addEventListener('resize', () => {
    buildDots();
    go(page); // keep current page
  });

  buildDots();
  go(0);
})();

(function () {
  const section = document.querySelector('.approachStage');
  if (!section) return;

  /* RIGHT SIDE IMAGE CROSSFADE */
  const images = section.querySelectorAll('.approachStage__rightImg');
  let activeIndex = 0;
  let crossfadeTimer = null;

  function startCrossfade() {
    if (images.length <= 1 || crossfadeTimer) return;

    crossfadeTimer = setInterval(() => {
      images[activeIndex].classList.remove('is-active');

      activeIndex = (activeIndex + 1) % images.length;

      images[activeIndex].classList.add('is-active');
    }, 4000);
  }

  startCrossfade();

  /* SMOOTH SCROLL ANIMATION */
  let targetProgress = 0;
  let currentProgress = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateTargetProgress() {
    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;

    if (totalScroll <= 0) {
      targetProgress = 0;
      return;
    }

    const passed = clamp(-rect.top, 0, totalScroll);
    targetProgress = passed / totalScroll;
  }

  function animate() {
    currentProgress = lerp(currentProgress, targetProgress, 0.08);

    /* TITLE FADE OUT */
    const titleFadeStart = 0.10;
    const titleFadeEnd = 0.35;

    const titleProgress = clamp(
      (currentProgress - titleFadeStart) / (titleFadeEnd - titleFadeStart),
      0,
      1
    );

    const titleOpacity = 1 - titleProgress;

    /* CARD COMES UP */
    const cardFadeStart = 0.20;
    const cardFadeEnd = 0.55;

    const cardProgress = clamp(
      (currentProgress - cardFadeStart) / (cardFadeEnd - cardFadeStart),
      0,
      1
    );

    const cardOpacity = cardProgress;
    const cardOffset = 240 - (240 * cardProgress);

    /* CINEMATIC ZOOM */
    const leftScale = 1.03 - (0.02 * currentProgress);
    const rightScale = 1.06 - (0.04 * currentProgress);

    section.style.setProperty('--titleOpacity', titleOpacity.toFixed(3));
    section.style.setProperty('--cardOpacity', cardOpacity.toFixed(3));
    section.style.setProperty('--cardOffset', `${cardOffset.toFixed(1)}px`);
    section.style.setProperty('--leftScale', leftScale.toFixed(4));
    section.style.setProperty('--rightScale', rightScale.toFixed(4));

    requestAnimationFrame(animate);
  }

  window.addEventListener('scroll', updateTargetProgress, { passive: true });
  window.addEventListener('resize', updateTargetProgress);

  updateTargetProgress();
  animate();
})();

(function () {
  const section = document.querySelector('.videoShowcase');
  if (!section) return;

  section.classList.add('js-animate');

  /* Smooth scroll reveal */
  const revealItems = section.querySelectorAll('.head, .videoCard');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));

  /* Smooth 3D hover tilt */
  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  const cards = section.querySelectorAll('.videoCard');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = (0.5 - (y / rect.height)) * 7;

      card.style.setProperty('--rx', rotateX.toFixed(2) + 'deg');
      card.style.setProperty('--ry', rotateY.toFixed(2) + 'deg');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
})();


(function () {
  const section = document.querySelector('.storyMoment');
  if (!section) return;

  /* Reveal animation */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add('is-visible');
        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(section);

  /* Smooth scroll progress */
  let targetProgress = 0;
  let currentProgress = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateProgress() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;

    targetProgress = clamp(
      1 - (rect.bottom / (rect.height + windowH)),
      0,
      1
    );
  }

  function animate() {
    currentProgress = lerp(currentProgress, targetProgress, 0.08);
    section.style.setProperty('--storyProgress', currentProgress.toFixed(4));
    requestAnimationFrame(animate);
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  updateProgress();
  animate();

  /* Mouse parallax for main image */
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (canHover) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;

      section.style.setProperty('--mx', x.toFixed(2) + 'px');
      section.style.setProperty('--my', y.toFixed(2) + 'px');
    });

    section.addEventListener('mouseleave', () => {
      section.style.setProperty('--mx', '0px');
      section.style.setProperty('--my', '0px');
    });
  }
})();

(function () {
  const carousel = document.querySelector('[data-review-carousel]');
  if (!carousel) return;

  const section = carousel.closest('.reviews');
  const track = carousel.querySelector('.reviewTrack');
  const cards = Array.from(carousel.querySelectorAll('.reviewTile'));
  const dotsWrap = carousel.querySelector('.reviewDots');

  if (!track || !cards.length || !dotsWrap) return;

  let pageIndex = 0;
  let perView = 3;
  let totalPages = 1;
  let autoTimer = null;

  if (section) {
    section.classList.add('js-ready');
  }

  function getPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  }

  function calculatePages() {
    perView = getPerView();
    totalPages = Math.max(1, Math.ceil(cards.length / perView));

    if (pageIndex > totalPages - 1) {
      pageIndex = totalPages - 1;
    }
  }

  function buildDots() {
    dotsWrap.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to review slide ' + (i + 1));

      dot.addEventListener('click', function () {
        pageIndex = i;
        updateCarousel();
        restartAuto();
      });

      dotsWrap.appendChild(dot);
    }
  }

  function updateCarousel() {
    calculatePages();

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    const maxCardIndex = Math.max(0, cards.length - perView);
    const cardIndex = Math.min(pageIndex * perView, maxCardIndex);

    const moveX = cardIndex * (cardWidth + gap);

    track.style.transform = 'translate3d(' + (-moveX) + 'px, 0, 0)';

    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === pageIndex);
    });
  }

  function nextSlide() {
    pageIndex = pageIndex >= totalPages - 1 ? 0 : pageIndex + 1;
    updateCarousel();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 4500);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', function () {
    const oldPages = totalPages;

    calculatePages();

    if (oldPages !== totalPages) {
      buildDots();
    }

    updateCarousel();
  });

  /* Smooth reveal */
  if (section) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          observer.unobserve(section);
        }
      });
    }, {
      threshold: 0.18
    });

    observer.observe(section);
  }

  /* Touch swipe */
  let startX = 0;
  let endX = 0;

  carousel.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchmove', function (e) {
    endX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', function () {
    const diff = startX - endX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        pageIndex = pageIndex >= totalPages - 1 ? 0 : pageIndex + 1;
      } else {
        pageIndex = pageIndex <= 0 ? totalPages - 1 : pageIndex - 1;
      }

      updateCarousel();
      restartAuto();
    }

    startX = 0;
    endX = 0;
  });

  calculatePages();
  buildDots();
  updateCarousel();
  startAuto();
})();

(function () {
  const contact = document.querySelector('.contactHero');
  if (!contact) return;

  contact.classList.add('js-ready');

  /* reveal when contact section appears */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        contact.classList.add('is-visible');
        observer.unobserve(contact);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(contact);

  /* mouse parallax */
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (canHover) {
    contact.addEventListener('mousemove', (e) => {
      const rect = contact.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 22;

      contact.style.setProperty('--contactMx', x.toFixed(2) + 'px');
      contact.style.setProperty('--contactMy', y.toFixed(2) + 'px');
    });

    contact.addEventListener('mouseleave', () => {
      contact.style.setProperty('--contactMx', '0px');
      contact.style.setProperty('--contactMy', '0px');
    });
  }
})();


(function () {
  const header = document.querySelector('.header--astray');
  if (!header) return;

  header.classList.add('nav-ready');

  let ticking = false;

  function updateNavbar() {
    const scrolled = window.scrollY > 45;

    header.classList.toggle('is-scrolled', scrolled);

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateNavbar);

  updateNavbar();
})();

(function () {
  const header = document.querySelector('.header--astray');
  if (!header) return;

  function updateNavbar() {
    header.classList.toggle('is-scrolled', window.scrollY > 45);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
})();

// ===== HERO micro-parallax (optional, desktop only) =====
(() => {
  const hero = document.querySelector(".hero");
  const content = document.querySelector(".hero__content");
  if (!hero || !content) return;

  // respect reduced motion + mobile
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduce || coarse) return;

  let raf = null;
  let targetX = 0, targetY = 0;
  let x = 0, y = 0;

  function animate() {
    raf = null;
    // smooth follow
    x += (targetX - x) * 0.10;
    y += (targetY - y) * 0.10;
    content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = requestAnimationFrame(animate);
  }

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

    // tiny movement (keep professional)
    targetX = dx * 6;
    targetY = dy * 4;

    if (!raf) raf = requestAnimationFrame(animate);
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0; targetY = 0;
    if (!raf) raf = requestAnimationFrame(animate);
  });
})();

(function () {
  const header = document.querySelector('.header--astray');
  if (!header) return;

  function updateHeaderLine() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    header.style.setProperty('--scrollLine', progress.toFixed(4));
    header.classList.toggle('is-scrolled', scrollTop > 45);
  }

  window.addEventListener('scroll', updateHeaderLine, { passive: true });
  window.addEventListener('resize', updateHeaderLine);

  updateHeaderLine();
})();

// ================= REVIEWS: reveal + dot carousel + optional autoplay =================
(() => {
  const root = document.querySelector('[data-review-carousel]');
  if (!root) return;

  const track = root.querySelector('.reviewTrack');
  const tiles = Array.from(root.querySelectorAll('.reviewTile'));
  const dotsWrap = root.querySelector('.reviewDots');
  const head = document.querySelector('.reviewHead');

  if (!track || tiles.length === 0 || !dotsWrap) return;

  // ---------- Reveal animation (head + cards) ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('is-in');
    });
  }, { threshold: 0.18 });

  if (head) io.observe(head);

  tiles.forEach((t, i) => {
    t.style.setProperty('--d', `${i * 90}ms`); // stagger
    io.observe(t);
  });

  // ---------- Carousel logic ----------
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function perView() {
    const v = getComputedStyle(track).getPropertyValue('--perView').trim();
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? n : 3;
  }

  function pages() {
    return Math.ceil(tiles.length / perView());
  }

  let page = 0;

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'reviewDot' + (i === page ? ' is-active' : '');
      b.setAttribute('aria-label', `Go to reviews page ${i + 1}`);
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    }
  }

  function setActiveDot() {
    const dots = Array.from(dotsWrap.querySelectorAll('.reviewDot'));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === page));
  }

  function go(p) {
    const max = pages() - 1;
    page = Math.max(0, Math.min(p, max));

    const idx = page * perView();
    const target = tiles[idx];
    const left = target ? target.offsetLeft : 0;

    track.style.transform = `translateX(${-left}px)`;
    setActiveDot();
  }

  // keep correct on resize
  let resizeTO = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      buildDots();
      go(page);
    }, 120);
  });

  buildDots();
  go(0);

  // ---------- Optional autoplay (smooth + premium) ----------
  // pauses on hover / focus, disabled for reduced motion
  if (!prefersReduce) {
    let timer = null;
    const interval = 5500;

    const start = () => {
      stop();
      timer = setInterval(() => {
        const max = pages() - 1;
        go(page >= max ? 0 : page + 1);
      }, interval);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    start();
  }
})();


(() => {
  const section = document.querySelector('[data-storymoment]');
  if (!section) return;

  const bgImg   = document.getElementById('storyBgImg');
  const mainImg = document.getElementById('storyMainImg');
  const quote   = document.getElementById('storyQuote');
  const review  = document.getElementById('storyReview');
  const author  = document.getElementById('storyAuthor');
  const dotsWrap= document.getElementById('storyDots');

  if (!bgImg || !mainImg || !quote || !review || !author || !dotsWrap) return;

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ✅ Use your real 5 files
  const REVIEWS = [
    {
      img: 'assets/work2.jpg',
      lines: ['“From the first moment,', 'we felt so calm', 'and comfortable', 'throughout the shoot”'],
      text: 'A beautiful and relaxed experience from start to finish. We loved the direction, the atmosphere, and the final images. Everything felt elegant and natural.',
      by: 'Sachitha & Hiruni • Couple Session'
    },
    {
      img: 'assets/img11.jpg',
      lines: ['“Every frame felt', 'timeless, graceful,', 'and full of', 'real emotion”'],
      text: 'Our special day was captured perfectly. The photos feel emotional, rich, and memorable. We truly appreciate the care, patience, and premium quality.',
      by: 'Nethmi & Kasun • Wedding Client'
    },
    {
      img: 'assets/img13.jpg',
      lines: ['“The session felt', 'natural, fun,', 'and easy from', 'start to end”'],
      text: 'We never felt awkward in front of the camera. The guidance was simple and helpful, and the final photos looked clean, stylish, and full of life.',
      by: 'Ayesh & Dinuki • Couple Shoot'
    },
    {
      img: 'assets/review.png',
      lines: ['“So much love,', 'so much softness,', 'and such a', 'beautiful final result”'],
      text: 'These photos are more than pictures to us. They captured closeness, emotion, and beauty in such a soft and premium way. We will always treasure them.',
      by: 'Britteny & Daniel • Wedding Client'
    },
    {
      img: 'assets/work1.jpg',
      lines: ['“The mood, the light,', 'and the storytelling', 'were beyond our', 'expectations”'],
      text: 'Every image feels cinematic and romantic. The edits are clean, the composition is beautiful, and the whole experience was professional and enjoyable.',
      by: 'Gayani & Tharindu • Pre-Shoot Client'
    }
  ];

  // Build dots
  dotsWrap.innerHTML = REVIEWS.map((_, i) =>
    `<button class="storyMoment__dot ${i === 0 ? 'is-active' : ''}" type="button" aria-label="Go to review ${i + 1}"></button>`
  ).join('');

  const dots = Array.from(dotsWrap.querySelectorAll('.storyMoment__dot'));
  let index = 0;
  let timer = null;
  let isInView = true; // default true so autoplay starts

  function setDots(i){
    dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
  }

  function ensureSpans(){
    const spans = quote.querySelectorAll('span');
    if (spans.length >= 4) return spans;
    quote.innerHTML = '<span></span><span></span><span></span><span></span>';
    return quote.querySelectorAll('span');
  }

  function applyReview(i){
    const r = REVIEWS[i];
    section.classList.add('is-swapping');

    setTimeout(() => {
      bgImg.src = r.img;
      mainImg.src = r.img;

      const spans = ensureSpans();
      spans.forEach((sp, idx) => sp.textContent = r.lines[idx] || '');

      review.textContent = r.text;
      author.textContent = r.by;

      setDots(i);

      requestAnimationFrame(() => section.classList.remove('is-swapping'));
    }, 220);
  }

  function go(i){
    index = (i + REVIEWS.length) % REVIEWS.length;
    applyReview(index);
  }

  dots.forEach((d, i) => d.addEventListener('click', () => {
    stop();
    go(i);
    start();
  }));

  function start(){
    if (prefersReduce) return;
    if (!isInView) return;
    stop();
    timer = setInterval(() => go(index + 1), 6500);
  }

  function stop(){
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Pause on hover/focus
  section.addEventListener('mouseenter', stop);
  section.addEventListener('mouseleave', start);
  section.addEventListener('focusin', stop);
  section.addEventListener('focusout', start);

  // More reliable in-view detection (sticky sections friendly)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      isInView = e.isIntersecting;
      if (isInView){
        section.classList.add('is-visible');
        start();
      } else {
        stop();
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -25% 0px'
  });

  io.observe(section);

  // Optional: progress variable for your CSS motion
  function updateProgress(){
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const t = 1 - Math.min(1, Math.max(0, (r.top + vh * 0.2) / (vh * 1.2)));
    section.style.setProperty('--storyProgress', t.toFixed(3));
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // Init + ✅ start autoplay immediately
  applyReview(0);
  start();
})();

// ================= Footer: reveal + year =================
(() => {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  // year
  const y = footer.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();

  // reveal animation
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        footer.classList.add("is-in");
        io.disconnect();
      }
    });
  }, { threshold: 0.12 });

  io.observe(footer);
})();