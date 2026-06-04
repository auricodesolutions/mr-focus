import "./ContactHero.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function ContactHero({ variant = "page" }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      hero.style.setProperty("--contactMx", `${x / 18}px`);
      hero.style.setProperty("--contactMy", `${y / 18}px`);
    };

    const resetMove = () => {
      hero.style.setProperty("--contactMx", "0px");
      hero.style.setProperty("--contactMy", "0px");
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", resetMove);

    return () => {
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", resetMove);
    };
  }, []);

  if (variant === "home") {
    return (
      <section
        className="contactHero section"
        id="contact"
        ref={heroRef}
        style={{
          "--contact-bg": "url('/assets/img15.jpg')",
          "--contact-pos": "50% 55%",
        }}
      >
        <div className="container">
          <div className="contactHero__intro reveal-soft">
            <h2 className="contactHero__title">LET’S CONNECT!</h2>

            <p className="contactHero__text">
              You don’t need to have everything figured out yet.
              <br />
              Share your date + location, and we’ll guide the next steps.
            </p>

            <p className="contactHero__text">
              Fill out the form below and we’ll reply with availability & a quote.
            </p>

            <a className="contactHero__cta btn btn--primary" href="/contact">
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="contactPageHero"
      ref={heroRef}
      style={{ "--hero-img": "url('/assets/img3.jpg')" }}
    >
      <div className="container contactPageHero__inner">
        <div className="contactPageHero__copy reveal-soft">
          <span className="contactPageHero__tag">Contact MR Focus</span>

          <h1>Let’s Connect!</h1>

          <p>You don’t need to have everything figured out yet.</p>

          <p className="muted">
            Share your date + location, and we’ll guide the next steps.
          </p>

          <div className="contactHeroActions">
            <a className="contactBtn" href="#contactForm">
              Get a Quote
            </a>

            <a className="contactBtn" href="#info">
              Contact Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}