import "./Footer.css";
import { Link } from "react-router-dom";
import { footerServices, socialLinks } from "../../data/navigationData";

const SocialIcon = ({ label }) => {
  const name = label.toLowerCase();

  if (name.includes("ig") || name.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }

  if (name.includes("fb") || name.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 8.4V6.7c0-.8.2-1.3 1.4-1.3H17V2.2C16.2 2.1 15.5 2 14.7 2c-2.9 0-4.8 1.8-4.8 5v1.4H7v3.6h2.9v10H14V12h3l.5-3.6H14Z" />
      </svg>
    );
  }

  if (name.includes("yt") || name.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 7.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C15.8 3.8 12 3.8 12 3.8s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.7-.8 2.3-.8 2.3S2.2 9.1 2.2 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.3c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.3c.4 0 1.3 0 2.1-.8.6-.7.8-2.3.8-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8ZM10.1 14.8V8.6l5.9 3.1-5.9 3.1Z" />
      </svg>
    );
  }

  if (name.includes("tt") || name.includes("tiktok")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.6 2c.3 2.6 1.8 4.2 4.4 4.4v3.4c-1.5.1-2.9-.4-4.3-1.3v6.4c0 8.1-8.8 10.6-12.4 4.8-2.3-3.7-.9-10.2 6.5-10.5v3.6c-.5.1-1 .2-1.5.4-1.5.5-2.3 1.8-2.1 3.3.4 2.9 5.7 3.8 5.3-1.9V2h4.1Z" />
      </svg>
    );
  }

  return <span>{label}</span>;
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__wrap">
        <div className="footer__brandBlock reveal-soft">
          <div className="footer__brand">MR FOCUS</div>
          <div className="footer__tag">Photography & Films • Sri Lanka</div>

          <p className="footer__about">
            Clean, emotional, documentary-style storytelling with gentle guidance so you never feel awkward.
          </p>

          <div className="footer__social">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className="socialBtn"
                href={item.url}
                target="_blank"
                rel="noreferrer"
                aria-label={item.aria || item.label}
                title={item.aria || item.label}
              >
                <SocialIcon label={item.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col reveal-soft">
          <div className="footer__title">Quick Links</div>

          <Link className="footer__link" to="/#storyMoment">Work</Link>
          <Link className="footer__link" to="/about#services">Services</Link>

          <a className="footer__link" href="/portfolio">Portfolio</a>

          <Link className="footer__link" to="/#reviews">Reviews</Link>
          <a className="footer__link" href="/contact">Enquire</a>
        </div>

  <div className="footer__col reveal-soft">
  <div className="footer__title">Services</div>

  {footerServices.map((item) => (
    <div key={item} className="footer__serviceText">
      {item}
    </div>
  ))}
</div>

        <div className="footer__col footer__contact reveal-soft">
          <div className="footer__title">Contact</div>

          <div className="footer__item">
            <span className="footer__label">Phone</span>
            <a className="footer__link" href="tel:+94 77 495 6764">+94 77 495 6764</a>
          </div>

          <div className="footer__item">
            <span className="footer__label">Email</span>
            <a className="footer__link" href="mailto:yasirulakmal33@gmail.com">yasirulakmal33@gmail.com</a>
          </div>

          <div className="footer__item">
            <span className="footer__label">Location</span>
            <div className="footer__text">Wadduwa • Srilanka</div>
          </div>

          <a className="footer__cta" href="/contact">Get a Quote</a>
        </div>
      </div>

      <div className="footer__bottom">
  <div className="container footer__bottomInner">
    <div className="footer__mini">
      © {year} MR FOCUS. All rights reserved.
    </div>

    <a
      className="footer__credit"
      href="https://auricodesolutions.com/"
      target="_blank"
      rel="noreferrer"
      aria-label="Visit Auricode Solutions website"
    >
      <span className="footer__creditText">Made in</span>

      <img
        className="footer__creditLogo"
        src="/assets/auricode-logo.png"
        alt="Auricode Solutions"
      />

      <span className="footer__creditName">Auricode Solutions</span>
    </a>

    <div className="footer__miniLinks">
      <a href="#" className="footer__miniLink">Privacy</a>
      <span className="dotSep">•</span>
      <a href="#" className="footer__miniLink">Terms</a>
    </div>
  </div>
</div>
    </footer>
  );
}