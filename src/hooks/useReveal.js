import { useEffect } from "react";

export function useReveal(selector = ".reveal-soft, .reveal") {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(selector));
    if (!items.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
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
  }, [selector]);
}
