import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ApproachStage.css";

const rightImages = [
  "/assets/img4.jpg",
  "/assets/img5.jpg",
  "/assets/im8.jpg",
  "/assets/img10.jpg",
  "/assets/img.jpg",
];

export default function ApproachStage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    rightImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % rightImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="approachStage layer"
      id="approach"
      style={{
        "--layer": 2,
        "--img-left": "url('/assets/img11.jpg')",
      }}
    >
      <div className="approachStage__sticky">
        <div className="approachStage__bg" aria-hidden="true">
          <div className="approachStage__half approachStage__half--left" />

          <div className="approachStage__half approachStage__half--right">
            {rightImages.map((src, index) => (
              <img
                key={src}
                className={`approachStage__rightImg ${
                  index === activeIndex ? "is-active" : ""
                }`}
                src={src}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>
        </div>

        <div className="approachStage__overlay" aria-hidden="true" />

        <div className="approachStage__titleWrap" aria-hidden="true">
          <div className="approachStage__title">
            EVERY MOMENT
            <br />
            TELLS A
            <br />
            BEAUTIFUL STORY
          </div>
        </div>

        <article className="approachStage__card">
          <p className="approachStage__top">
            LET THE DAY UNFOLD NATURALLY. WE’LL CAPTURE THE REAL CONNECTION.
          </p>

          <div className="approachStage__rule" />

          <p className="approachStage__body">
            If you love adventure, laughter, and natural moments, we’d love to
            be there to capture your story beautifully.
          </p>

        <div className="approachStage__cta">
          <a href="/portfolio" className="btn btn--primary">
             View Portfolio
          </a>
        </div>
        </article>
      </div>
    </section>
  );
}