import { useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Portfolio.css";
import StoryPeek from "../../components/StoryPeek/StoryPeek";

const categories = [
  {
    title: "Wedding Photography",
    text: "WEDDING\nPHOTOGRAPHY",
    image: "/assets/work5.jpg",
    link: "/portfolio/wedding-photography",
  },
  {
    title: "Engagement Photography",
    text: "ENGAGEMENT\nPHOTOGRAPHY",
    image: "/assets/img11.jpg",
    link: "/portfolio/engagement-photography",
  },
  {
    title: "Cinematic Wedding Films",
    text: "CINEMATIC\nWEDDING FILMS",
    image: "/assets/img2.jpg",
    link: "/portfolio/cinematic-wedding-films",
  },
  {
    title: "Pre-wedding Videography",
    text: "PRE-WEDDING\nVIDEOGRAPHY",
    image: "/assets/img10.jpg",
    link: "/portfolio/pre-wedding-videography",
  },
    {
    title: "Professional Drone Coverage",
    text: "PROFESSIONAL\nDRONE COVERAGE",
    image: "/assets/drone.jpg",
    link: "/portfolio/professional-drone-coverage",
  },
  {
    title: "Cinematography",
    text: "CINEMATOGRAPHY",
    image: "/assets/cinematography.jpg",
    link: "/portfolio/cinematography",
  },
  {
    title: "Event Coverage",
    text: "EVENT\nCOVERAGE",
    image: "/assets/eventcoverage.jpg",
    link: "/portfolio/event-coverage",
  },
  {
    title: "Commercial Corporate Films",
    text: "COMMERCIAL\nCORPORATE FILMS",
    image: "/assets/COMMERCIALPRODUCTIONS.jpg",
    link: "/portfolio/commercial-corporate-films",
  },
  {
    title: "Production",
    text: "PRODUCTION",
    image: "/assets/production.jpg",
    link: "/portfolio/production",
  },
];

export default function Portfolio() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const touched = new Map();

    const saveAndSet = (el, prop, value) => {
      if (!el) return;

      if (!touched.has(el)) {
        touched.set(el, new Map());
      }

      const props = touched.get(el);

      if (!props.has(prop)) {
        props.set(prop, {
          value: el.style.getPropertyValue(prop),
          priority: el.style.getPropertyPriority(prop),
        });
      }

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
        ".portfolioPage",
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          saveAndSet(el, "height", "auto");
          saveAndSet(el, "max-height", "none");
          saveAndSet(el, "overflow-x", "hidden");

          if (selector === "html" || selector === "body") {
            saveAndSet(el, "min-height", "100%");
            saveAndSet(el, "overflow-y", "auto");
            saveAndSet(el, "position", "static");
          } else {
            saveAndSet(el, "min-height", "100dvh");
            saveAndSet(el, "overflow-y", "visible");
            saveAndSet(el, "position", "relative");
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

      const page = pageRef.current;

      if (page) {
        saveAndSet(page, "display", "block");
        saveAndSet(page, "visibility", "visible");
        saveAndSet(page, "opacity", "1");
      }
    };

    unlockPageScroll();
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      unlockPageScroll();
      window.scrollTo(0, 0);
    });

    const timer1 = window.setTimeout(() => {
      unlockPageScroll();
      window.scrollTo(0, 0);
    }, 120);

    const timer2 = window.setTimeout(() => {
      unlockPageScroll();
      window.scrollTo(0, 0);
    }, 500);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);

      touched.forEach((props, el) => {
        props.forEach((old, prop) => {
          if (old.value) {
            el.style.setProperty(prop, old.value, old.priority);
          } else {
            el.style.removeProperty(prop);
          }
        });
      });
    };
  }, [location.pathname]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--heroMoveX", `${x * 20}px`);
      hero.style.setProperty("--heroMoveY", `${y * 14}px`);
      hero.style.setProperty("--heroTextX", `${x * -12}px`);
      hero.style.setProperty("--heroTextY", `${y * -8}px`);
      hero.style.setProperty("--lightX", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--lightY", `${event.clientY - rect.top}px`);
    };

    const resetMove = () => {
      hero.style.setProperty("--heroMoveX", "0px");
      hero.style.setProperty("--heroMoveY", "0px");
      hero.style.setProperty("--heroTextX", "0px");
      hero.style.setProperty("--heroTextY", "0px");
      hero.style.setProperty("--lightX", "50%");
      hero.style.setProperty("--lightY", "45%");
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", resetMove);

    return () => {
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", resetMove);
    };
  }, []);

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 6;
    const rotateX = (y / rect.height - 0.5) * -6;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--glowX", `${x}px`);
    card.style.setProperty("--glowY", `${y}px`);
  };

  const resetCardMove = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--glowX", "50%");
    card.style.setProperty("--glowY", "50%");
  };

  return (
    <main className="portfolioPage" ref={pageRef}>
      <section className="portfolioHero" ref={heroRef}>
        <div className="portfolioHero__bg" aria-hidden="true" />

        <div className="portfolioHero__inner">
          <p className="portfolioHero__kicker">MR FOCUS PHOTO + FILMS</p>

          <h1 className="portfolioHero__title">
            <span>Portfolio</span>
          </h1>

         
        </div>
      </section>

      <section className="portfolioCategories" id="portfolio-gallery">
        <div className="container">
          <div className="portfolioHead">

            <h2>Choose a Story</h2>

            {/* <p>
              Explore our main portfolio categories and see the style, mood, and detail behind each
              MR FOCUS production.
            </p> */}
          </div>

          <div className="portfolioGrid">
            {categories.map((category, index) => (
              <article
                className="portfolioCard"
                key={category.title}
                style={{ "--delay": `${index * 90}ms` }}
                onPointerMove={handleCardMove}
                onPointerLeave={resetCardMove}
              >
                <Link to={category.link} className="portfolioCard__link">
                  <div className="portfolioCard__media">
                    <img src={category.image} alt={category.title} />

                    <span className="portfolioCard__shine" aria-hidden="true" />
                    <span className="portfolioCard__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="portfolioCard__body">
                    <h3>
                      {category.text.split("\n").map((line) => (
                        <span className="portfolioCard__titleLine" key={line}>
                          {line}
                        </span>
                      ))}
                    </h3>

                    <p>{category.desc}</p>
                    <span className="portfolioCard__cta">VIEW GALLERY</span>

                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StoryPeek />
    </main>
  );
}