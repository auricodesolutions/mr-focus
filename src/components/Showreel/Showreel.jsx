import "./Showreel.css";
export default function Showreel() {
  return (
    <section className="showreelSection" data-layer>
      <div className="container">
        <div className="reveal-soft">
          <div className="sectionTitle">Videography</div>
          <h2 className="sectionH2">Watch a short showreel</h2>
          <p className="sectionLead">A quick look at the vibe and style of my cinematic wedding films.</p>
        </div>

        <div className="reelWrap reveal-soft">
          <div className="reel" id="showreelBox">
            <iframe
              id="showreelFrame"
              title="MR FOCUS Showreel"
              src="https://www.youtube.com/embed/Q0cKGwMkyh4"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
