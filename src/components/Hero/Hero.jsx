import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero layer" id="hero" style={{ "--layer": 1, "--hold": "0vh", "--stack-offset": "0px" }}>
      <div className="hero__bg">
        <video className="hero__video" id="heroVideo" autoPlay muted loop playsInline preload="auto" poster="/assets/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__vignette" aria-hidden="true" />
      </div>

      <div className="container hero__content reveal-soft">
        <h1 className="hero__title">Photography & films that feel like your real story.</h1>
        <div className="heroActions">
          <a href="/portfolio" className="btn btn--primary">Enquire Now</a>
          <a href="/portfolio" className="btn btn--ghost"> View Work</a>
</div>

      </div>
    </section>
  );
}
