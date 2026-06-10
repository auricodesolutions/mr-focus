import { useEffect, useRef } from "react";
import "./EventCoverage.css";
import { Link } from "react-router-dom";

const eventVideos = [
  {
    title: "Event Coverage 01",
    type: "Event Film",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
  {
    title: "Event Coverage 02",
    type: "Live Event",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
  {
    title: "Event Coverage 03",
    type: "Conference Coverage",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
  {
    title: "Event Coverage 04",
    type: "Stage Event",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
  {
    title: "Event Coverage 05",
    type: "Highlight Film",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
  {
    title: "Event Coverage 06",
    type: "Full Event Coverage",
    youtube: "https://youtu.be/IfcBoR6PZF0?si=XYxhy_NMYOp04F_s",
  },
];

function getYouTubeEmbedUrl(url) {
  if (!url) return "";

  const normalMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const embedMatch = url.match(/embed\/([^?&]+)/);
  const shortsMatch = url.match(/shorts\/([^?&]+)/);

  const videoId =
    normalMatch?.[1] ||
    shortMatch?.[1] ||
    embedMatch?.[1] ||
    shortsMatch?.[1];

  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
    : url;
}

export default function EventCoverage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".eventVideoCard");

    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="eventCoveragePage" ref={pageRef}>
      <section className="eventCoverageHero">

        <h1>Event Coverage</h1>

        <p>
          Professional event coverage, stage moments, corporate functions, and
          special occasions captured with cinematic detail.
        </p>

        <Link className="portfolioBackBtn" to="/portfolio">
  Back to Portfolio
</Link>
      </section>

      <section className="eventVideoGrid" aria-label="Event coverage videos">
        {eventVideos.map((video, index) => (
          <article
            className="eventVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="eventVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="eventVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}