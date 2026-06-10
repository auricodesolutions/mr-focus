import { useEffect, useRef } from "react";
import "./ProfessionalDroneCoverage.css";
import { Link } from "react-router-dom";


const droneVideos = [
  {
    title: "Drone Coverage 01",
    type: "Aerial Wedding Film",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
  },
  {
    title: "Drone Coverage 02",
    type: "Aerial Event Coverage",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
  },
  {
    title: "Drone Coverage 03",
    type: "Cinematic Drone Shot",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
  },
  {
    title: "Drone Coverage 04",
    type: "Outdoor Location Film",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
  },
  {
    title: "Drone Coverage 05",
    type: "Aerial Highlights",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
  },
  {
    title: "Drone Coverage 06",
    type: "Professional Drone Reel",
    youtube: "https://youtu.be/cvUvYiJOp_c?si=oZxzxhPGZoMsUF-3",
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

export default function ProfessionalDroneCoverage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".droneVideoCard");

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
    <main className="dronePage" ref={pageRef}>
      <section className="droneHero">

        <h1>Professional Drone Coverage</h1>

        <p>
          Cinematic aerial visuals, wedding drone coverage, event flyovers, and
          professional drone footage captured with smooth cinematic movement.
        </p>

        <Link className="portfolioBackBtn" to="/portfolio">
  Back to Portfolio
</Link>
      </section>

      <section className="droneVideoGrid" aria-label="Professional drone coverage videos">
        {droneVideos.map((video, index) => (
          <article
            className="droneVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="droneVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="droneVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}