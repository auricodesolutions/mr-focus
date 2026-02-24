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
