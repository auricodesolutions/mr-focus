import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function usePageEffects() {
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector(".header--astray");
    const progressBar = document.querySelector("#progressBar");
    const burger = document.querySelector("#burger");
    const drawer = document.querySelector("#drawer");
    const drawerClose = document.querySelector("#drawerClose");
    const drawerLinks = Array.from(document.querySelectorAll(".drawer__link"));

    if (header) header.classList.add("nav-ready");

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = clamp(scrollTop / docHeight, 0, 1);
      if (progressBar) progressBar.style.width = `${progress * 100}%`;
      if (header) {
        header.style.setProperty("--scrollLine", progress.toFixed(4));
        header.classList.toggle("is-scrolled", scrollTop > 45);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    const closeDrawer = () => {
      if (!drawer || !burger) return;
      drawer.classList.remove("is-open");
      document.body.classList.remove("drawer-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
    };

    const openDrawer = () => {
      if (!drawer || !burger) return;
      drawer.classList.add("is-open");
      document.body.classList.add("drawer-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
    };

    const onBurgerClick = () => {
      if (!drawer) return;
      drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    };

    const onDrawerClick = (event) => {
      if (event.target === drawer) closeDrawer();
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeDrawer();
    };

    burger?.addEventListener("click", onBurgerClick);
    drawerClose?.addEventListener("click", closeDrawer);
    drawer?.addEventListener("click", onDrawerClick);
    drawerLinks.forEach((link) => link.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    updateProgress();

    return () => {
      burger?.removeEventListener("click", onBurgerClick);
      drawerClose?.removeEventListener("click", closeDrawer);
      drawer?.removeEventListener("click", onDrawerClick);
      drawerLinks.forEach((link) => link.removeEventListener("click", closeDrawer));
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("drawer-open");
    };
  }, [location.pathname]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 60);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".reveal-soft, .reveal"));

    if (!items.length) return undefined;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

    items.forEach((item, index) => {
      if (!item.style.getPropertyValue("--delay")) {
        item.style.setProperty("--delay", `${Math.min(index % 8, 7) * 55}ms`);
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
