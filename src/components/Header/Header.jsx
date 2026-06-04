import "./Header.css";
import { navLinks } from "../../data/navigationData";

export default function Header() {
  return (
    <header className="header header--astray" id="top">
      <span className="navScrollLine" aria-hidden="true" />

      <div className="container header__inner">
        <div className="header__spacer" aria-hidden="true" />

        <a className="header__logo header__logo--center" href="/" aria-label="Go to home">
          <span className="brand brand--center">
            <span className="brand__name">MR FOCUS</span>
            <span className="brand__tag">BY ANUKA INDEERA</span>
          </span>
        </a>

        <div className="header__right">
          <button
            className="burger burger--astray"
            id="burger"
            aria-label="Open menu"
            aria-expanded="false"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="drawer" id="drawer" aria-hidden="true">
        <div className="drawer__panel" role="dialog" aria-label="Mobile menu">
          <button className="drawer__close" id="drawerClose" aria-label="Close menu" type="button">
            <span />
            <span />
          </button>

          <nav className="drawer__nav" aria-label="Main menu">
            {navLinks.map((link) => (
              <a key={link.label} className="drawer__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}