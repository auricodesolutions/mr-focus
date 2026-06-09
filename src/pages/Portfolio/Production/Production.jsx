import { useEffect, useRef } from "react";
import "./Production.css";

const productionVideos = [
  {
    title: "Production Film 01",
    type: "Production",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
  },
  {
    title: "Behind The Scenes 02",
    type: "Behind The Scenes",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
  },
  {
    title: "Creative Production 03",
    type: "Creative Production",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
  },
  {
    title: "Studio Production 04",
    type: "Studio Work",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
  },
  {
    title: "Production Reel 05",
    type: "Showreel",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
  },
  {
    title: "Visual Production 06",
    type: "Visual Story",
    youtube: "https://youtu.be/XBw3l7rRZWo?si=jwDW0cWkG8QHV1GA",
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

export default function Production() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".productionVideoCard");

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
    <main className="productionPage" ref={pageRef}>
      <section className="productionHero">

        <h1>Production</h1>

        <p>
          Creative production work, behind-the-scenes visuals, studio projects,
          and storytelling crafted for modern brands and events.
        </p>
      </section>

      <section className="productionVideoGrid" aria-label="Production videos">
        {productionVideos.map((video, index) => (
          <article
            className="productionVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="productionVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="productionVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}