import { useEffect, useRef } from "react";
import "./CinematicWeddingFilms.css";

const weddingFilms = [
  {
    title: "Tharindi & Chathura",
    youtube: "https://youtu.be/FUWc8hgkRfA?si=u83y6UinxI28K2mG",
  },
  {
    title: "Mahesh & Arthika",
    youtube: "https://youtu.be/Q0cKGwMkyh4?si=SEBduQNLgtD2LABN",
  },
  {
    title: "Nethmi & Pasindu",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Dinuki & Ashan",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Sanduni & Kavindu",
    youtube: "https://youtu.be/3GGKi2Lale4?si=2bY2Mc9vkHxywKaN",
  },
  {
    title: "Isuri & Janith",
    type: "Cinematic Film",
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

export default function CinematicWeddingFilms() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".filmCard");

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
    <main className="cinematicFilmsPage" ref={pageRef}>
      <section className="cinematicFilmsHero">

        <h1>Cinematic Wedding Films</h1>

        <p>
          Emotional wedding stories created to keep every special moment alive.
        </p>
      </section>

      <section className="filmsGrid" aria-label="Cinematic wedding films">
        {weddingFilms.map((film, index) => (
          <article
            className="filmCard"
            key={film.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="filmCard__video">
              <iframe
                src={getYouTubeEmbedUrl(film.youtube)}
                title={film.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="filmCard__content">
              <span>{film.type}</span>
              <h2>{film.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}