import { useEffect } from "react";

export function useDrawer() {
  useEffect(() => {
    const burger = document.querySelector("#burger");
    const drawer = document.querySelector("#drawer");
    const drawerClose = document.querySelector("#drawerClose");
    const links = Array.from(document.querySelectorAll(".drawer__link"));

    if (!burger || !drawer) return;

    const openDrawer = () => {
      drawer.classList.add("is-open");
      document.body.classList.add("drawer-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
    };

    const closeDrawer = () => {
      drawer.classList.remove("is-open");
      document.body.classList.remove("drawer-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
    };

    const onBurger = () => drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    const onDrawer = (event) => { if (event.target === drawer) closeDrawer(); };
    const onKey = (event) => { if (event.key === "Escape") closeDrawer(); };

    burger.addEventListener("click", onBurger);
    drawerClose?.addEventListener("click", closeDrawer);
    drawer.addEventListener("click", onDrawer);
    links.forEach((link) => link.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", onKey);

    return () => {
      burger.removeEventListener("click", onBurger);
      drawerClose?.removeEventListener("click", closeDrawer);
      drawer.removeEventListener("click", onDrawer);
      links.forEach((link) => link.removeEventListener("click", closeDrawer));
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("drawer-open");
    };
  }, []);
}
