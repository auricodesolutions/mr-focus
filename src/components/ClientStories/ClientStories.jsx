import "./ClientStories.css";
import { useEffect, useMemo, useState } from "react";
import { reviewTiles } from "../../data/reviewsData";

const reviewsBg = "/assets/reviews-bg.png";
const fallbackReviewImage = "/assets/img2.jpg";
const REVIEW_CHANGE_TIME = 4200;

function getImagePath(src) {
  if (!src) return fallbackReviewImage;

  if (src.startsWith("http")) return src;
  if (src.startsWith("/")) return src;

  return `/assets/reviews/${src}`;
}

export default function ClientStories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalReviews = reviewTiles.length;

  const active = useMemo(() => {
    return reviewTiles[index] || reviewTiles[0];
  }, [index]);

  const activeImage = getImagePath(active?.img || active?.image);

  useEffect(() => {
    if (paused || totalReviews <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % totalReviews);
    }, REVIEW_CHANGE_TIME);

    return () => window.clearInterval(timer);
  }, [paused, totalReviews]);

  const nextReview = () => {
    setIndex((current) => (current + 1) % totalReviews);
  };

  const prevReview = () => {
    setIndex((current) => (current === 0 ? totalReviews - 1 : current - 1));
  };

  const goTo = (nextIndex) => {
    setIndex(nextIndex);
  };

  if (!active) return null;

  return (
    <section
      id="client-stories"
      className="clientStories"
      style={{ "--client-stories-bg": `url(${reviewsBg})` }}
    >
      <div className="clientStories__bg" aria-hidden="true" />
      <div className="clientStories__softLayer" aria-hidden="true" />

      <div className="clientStories__movingText" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, lineIndex) => (
          <div
            key={lineIndex}
            className={`clientStories__textLine${
              lineIndex % 2 === 1 ? " clientStories__textLine--reverse" : ""
            }`}
          >
            MR FOCUS WEDDINGS MR FOCUS WEDDINGS MR FOCUS WEDDINGS
          </div>
        ))}
      </div>

      <div
        className="clientStories__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          className="clientStoriesArrow clientStoriesArrow--left"
          type="button"
          aria-label="Previous client story"
          onClick={prevReview}
        >
          ‹
        </button>

        <article key={`card-${index}`} className="clientStoriesCard">
          <div className="clientStoriesCard__inner">
            <h2 className="clientStoriesCard__title">{active.headline}</h2>

            <div className="clientStoriesCard__image">
              <img
                key={`client-story-img-${index}-${activeImage}`}
                src={activeImage}
                alt={active?.name || "MR FOCUS client story"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackReviewImage;
                }}
              />
            </div>

            <p className="clientStoriesCard__message">{active.message}</p>

            <div className="clientStoriesCard__author">
              <span>{active.name}</span>
              <small>{active.role}</small>
            </div>
          </div>
        </article>

        <button
          className="clientStoriesArrow clientStoriesArrow--right"
          type="button"
          aria-label="Next client story"
          onClick={nextReview}
        >
          ›
        </button>

        <div className="clientStoriesDots" aria-label="Client story pages">
          {reviewTiles.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`clientStoriesDot${
                dotIndex === index ? " is-active" : ""
              }`}
              type="button"
              aria-label={`Go to client story ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}