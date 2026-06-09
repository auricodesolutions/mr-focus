import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Showreel from "../../components/Showreel/Showreel";
import { services } from "../../data/servicesData";
import "./about.css";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pauseServiceAutoPlay, setPauseServiceAutoPlay] = useState(false);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const interactionTimerRef = useRef(null);

  /* ================================
     FORCE ABOUT PAGE NORMAL SCROLL
  ================================= */
useEffect(() => {
  const touched = [];

  const setImportant = (el, prop, value) => {
    touched.push([el, prop, el.style.getPropertyValue(prop), el.style.getPropertyPriority(prop)]);
    el.style.setProperty(prop, value, "important");
  };

  const unlockPageScroll = () => {
    const selectors = [
      "html",
      "body",
      "#root",
      ".App",
      ".app",
      ".site",
      ".siteWrap",
      ".layout",
      ".page",
      ".pageWrap",
      ".router",
      ".routes",
      ".about-page",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        setImportant(el, "height", "auto");
        setImportant(el, "min-height", selector === "html" || selector === "body" ? "100%" : "100dvh");
        setImportant(el, "max-height", "none");
        setImportant(el, "overflow-x", "hidden");

        if (selector === "html" || selector === "body") {
          setImportant(el, "overflow-y", "auto");
          setImportant(el, "position", "static");
        } else {
          setImportant(el, "overflow-y", "visible");
          setImportant(el, "position", "relative");
        }
      });
    });

    document.body.classList.remove(
      "menu-open",
      "drawer-open",
      "nav-open",
      "lock-scroll",
      "no-scroll",
      "is-locked"
    );
  };

  unlockPageScroll();

  const timer1 = window.setTimeout(unlockPageScroll, 100);
  const timer2 = window.setTimeout(unlockPageScroll, 400);
  const timer3 = window.setTimeout(unlockPageScroll, 900);

  return () => {
    window.clearTimeout(timer1);
    window.clearTimeout(timer2);
    window.clearTimeout(timer3);

    touched.forEach(([el, prop, oldValue, oldPriority]) => {
      if (oldValue) {
        el.style.setProperty(prop, oldValue, oldPriority);
      } else {
        el.style.removeProperty(prop);
      }
    });
  };
}, []);

  /* ================================
     HERO MOUSE DEPTH EFFECT
  ================================= */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--heroTextX", `${x * -12}px`);
      hero.style.setProperty("--heroTextY", `${y * -10}px`);
      hero.style.setProperty("--heroImgX", `${x * 20}px`);
      hero.style.setProperty("--heroImgY", `${y * 16}px`);
      hero.style.setProperty("--heroLightX", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--heroLightY", `${event.clientY - rect.top}px`);
    };

    const resetMove = () => {
      hero.style.setProperty("--heroTextX", "0px");
      hero.style.setProperty("--heroTextY", "0px");
      hero.style.setProperty("--heroImgX", "0px");
      hero.style.setProperty("--heroImgY", "0px");
      hero.style.setProperty("--heroLightX", "22%");
      hero.style.setProperty("--heroLightY", "26%");
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", resetMove);

    return () => {
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", resetMove);
    };
  }, []);

  /* ================================
     REVEAL ON SCROLL
  ================================= */
  useEffect(() => {
    const revealItems = document.querySelectorAll(
  ".about-page .reveal-soft, .about-page .showreelSection"
);
    if (!revealItems.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty("--revealDelay", `${Math.min(index * 70, 520)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  /* ================================
     AUTO ACTIVE SERVICE CARD
  ================================= */
  useEffect(() => {
    if (!services.length || pauseServiceAutoPlay) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 1500);

    return () => window.clearInterval(timer);
  }, [pauseServiceAutoPlay]);

  /* ================================
     SERVICE CARD 3D HOVER
  ================================= */
  const handleTileMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--glowX", `${x}px`);
    card.style.setProperty("--glowY", `${y}px`);
  };

  const resetTileMove = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--glowX", "50%");
    card.style.setProperty("--glowY", "50%");
  };

  const handleServiceSelect = (index) => {
    setActiveIndex(index);
    setPauseServiceAutoPlay(true);

    window.clearTimeout(interactionTimerRef.current);

    interactionTimerRef.current = window.setTimeout(() => {
      setPauseServiceAutoPlay(false);
    }, 4200);
  };

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="aboutHero" data-layer ref={heroRef}>
        <div className="container aboutHero__inner">
          <div className="aboutHero__content reveal-soft">
            <span className="kicker">About MR Focus</span>

            <h1 className="h1">Photography • Films</h1>

            <p className="subline">
              Wedding Photography • Engagement Photography • Cinematic wedding Films • Pre-wedding Videography • Cinematography • Event Coverage • Commercial & corporate Films • Production
            </p>

            <p className="heroLead">
              I capture real moments — calm, natural, and timeless. My style is clean and true
              to color, with gentle guidance so you never feel awkward.
            </p>

            <div className="heroActions">
              <Link to="/contact#contactForm" className="btn btn--primary">
                Check Availability
              </Link>

              <Link to="/categories" className="btn btn--ghost">
                View Work
              </Link>
            </div>

            <div className="heroMini">
              <span>Story-first</span>
              <span>Clean edit</span>
              <span>Calm guidance</span>
            </div>
          </div>

          <div className="heroImgWrap reveal-soft">
            <span className="heroFrame heroFrame--one" aria-hidden="true" />
            <span className="heroFrame heroFrame--two" aria-hidden="true" />

            <img
              className="heroImg"
              src="/assets/ownerimg1.jpg"
              alt="MR Focus photographer portrait"
            />

            <div className="heroBadge">
              <span className="dot" aria-hidden="true" />
              MR.FOCUS WEDDINGS
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="aboutServices servicesSwitch"
        id="services"
        data-layer
        ref={servicesRef}
        onMouseEnter={() => setPauseServiceAutoPlay(true)}
        onMouseLeave={() => setPauseServiceAutoPlay(false)}
      >
        <div className="container">
          <div className="aboutServices__head reveal-soft">
            <span className="kicker">What we do</span>

            <h2 className="h2 h2--spaced">Services</h2>

            <p className="lead muted">Pick what you need. We’ll handle the rest.</p>
          </div>

          <div className="tilesGrid" role="tablist" aria-label="Services">
            {services.map((service, index) => (
              <button
                key={service.title}
                className={`tile tileBtn${activeIndex === index ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                style={{
                  "--img": `url('${service.image}')`,
                  "--cardIndex": index,
                }}
                onClick={() => handleServiceSelect(index)}
                onFocus={() => handleServiceSelect(index)}
                onPointerMove={handleTileMove}
                onPointerLeave={resetTileMove}
              >
                <span className="tile__bg" aria-hidden="true" />
                <span className="tile__shine" aria-hidden="true" />
                <span className="tile__shade" aria-hidden="true" />

                <span className="tile__text">
                  {(service.text || service.title).split("\n").map((line, lineIndex) => (
                    <span key={`${service.title}-${lineIndex}`}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>

                <span className="tile__activeLine" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <Showreel />
    </main>
  );
}