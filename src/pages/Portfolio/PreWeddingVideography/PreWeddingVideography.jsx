import { useEffect, useRef } from "react";
import "./PreWeddingVideography.css";

const preWeddingVideos = [
  {
    title: "Pre Wedding Film 01",
    type: "Pre-wedding Film",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Pre Wedding Film 02",
    type: "Couple Story",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Pre Wedding Film 03",
    type: "Cinematic Pre Shoot",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Pre Wedding Film 04",
    type: "Outdoor Love Story",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Pre Wedding Film 05",
    type: "Pre-wedding Highlights",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Pre Wedding Film 06",
    type: "Cinematic Couple Film",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
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

export default function PreWeddingVideography() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".preWeddingVideoCard");

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
    <main className="preWeddingPage" ref={pageRef}>
      <section className="preWeddingHero">

        <h1>Pre-wedding Videography</h1>

        <p>
          Cinematic pre-wedding films, natural couple stories, and romantic
          moments captured before the big day.
        </p>
      </section>

      <section className="preWeddingVideoGrid" aria-label="Pre-wedding videography videos">
        {preWeddingVideos.map((video, index) => (
          <article
            className="preWeddingVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="preWeddingVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="preWeddingVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}