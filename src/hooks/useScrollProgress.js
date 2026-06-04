import { useEffect } from "react";

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector("#progressBar");
    const header = document.querySelector(".header--astray");

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (bar) bar.style.width = `${progress * 100}%`;
      if (header) {
        header.style.setProperty("--scrollLine", progress.toFixed(4));
        header.classList.toggle("is-scrolled", window.scrollY > 45);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
}
