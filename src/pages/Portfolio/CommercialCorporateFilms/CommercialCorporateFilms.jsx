import { useEffect, useRef } from "react";
import "./CommercialCorporateFilms.css";

const commercialVideos = [
  {
    title: "Commercial Film 01",
    type: "Commercial Film",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
  },
  {
    title: "Corporate Film 02",
    type: "Corporate Video",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
  },
  {
    title: "Brand Film 03",
    type: "Brand Story",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
  },
  {
    title: "Product Film 04",
    type: "Product Video",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
  },
  {
    title: "Business Film 05",
    type: "Business Promo",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
  },
  {
    title: "Corporate Highlights 06",
    type: "Highlights",
    youtube: "https://youtu.be/vYSRh7t_IUA?si=P8Ha35hepKYn0He5",
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

export default function CommercialCorporateFilms() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".commercialVideoCard");

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
    <main className="commercialPage" ref={pageRef}>
      <section className="commercialHero">

        <h1>Commercial Corporate Films</h1>

        <p>
          Professional corporate films, brand stories, product videos, and
          business visuals created with clean cinematic quality.
        </p>
      </section>

      <section className="commercialVideoGrid" aria-label="Commercial corporate films">
        {commercialVideos.map((video, index) => (
          <article
            className="commercialVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="commercialVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="commercialVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}