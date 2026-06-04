import "./Preloader.css";
export default function Preloader() {
  return (
    <div className="preloader" id="preloader" role="status" aria-live="polite" aria-label="Loading" style={{ "--preloader-bg": "url('/assets/hero.jpg')" }}>
      <div className="preloader__box">
        <div className="preloader__brand">
          <div className="preloader__name">MR FOCUS</div>
          <div className="preloader__tag">BY ANUKA INDEERA</div>
        </div>

        <div className="preloader__barWrap" aria-hidden="true">
          <div className="preloader__bar" id="preBar" />
        </div>

        <div className="preloader__meta">
          <span className="preloader__pct" id="prePct">0%</span>
          <span className="preloader__dots" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
