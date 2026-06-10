import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { weddingAlbums } from "../../../data/weddingAlbumsData";
import "./wedding-photography.css";


export default function WeddingPhotography() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".weddingAlbumCard");

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
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="weddingAlbumsPage" ref={pageRef}>
      <section className="weddingAlbumsHero">
        <h1>Wedding Photography</h1>
        <p>
          A collection of real wedding stories and timeless couple memories
          captured with care.
        </p>
        <Link className="portfolioBackBtn" to="/portfolio">
  Back to Portfolio
</Link>
      </section>

      <section
        className="weddingAlbumsGrid"
        aria-label="Wedding photography albums"
      >
        {weddingAlbums.map((album, index) => (
          <article
            className="weddingAlbumCard"
            key={album.slug}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <Link
              className="weddingAlbumCard__link"
              to={`/portfolio/wedding-photography/${album.slug}`}
              aria-label={`Open ${album.title} album`}
            >
              <img src={album.cover} alt={album.title} loading="lazy" />

              <div className="weddingAlbumCard__shade" />

              <div className="weddingAlbumCard__overlay">
                <span className="weddingAlbumCard__type">{album.type}</span>
                <h2>{album.title}</h2>
              </div>

              <span className="weddingAlbumCard__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}