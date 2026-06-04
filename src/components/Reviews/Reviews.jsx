import "./Reviews.css";
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

export default function Reviews() {
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
      id="reviews"
      className="reviews customerReview"
      style={{ "--reviews-bg": `url(${reviewsBg})` }}
    >
      <div className="reviews__bg" aria-hidden="true" />
      <div className="reviews__softLayer" aria-hidden="true" />

      <div className="reviews__movingText" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, lineIndex) => (
          <div
            key={lineIndex}
            className={`reviews__textLine${
              lineIndex % 2 === 1 ? " reviews__textLine--reverse" : ""
            }`}
          >
            MR FOCUS WEDDINGS MR FOCUS WEDDINGS MR FOCUS WEDDINGS
          </div>
        ))}
      </div>

      <div
        className="reviews__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          className="reviewArrow reviewArrow--left"
          type="button"
          aria-label="Previous review"
          onClick={prevReview}
        >
          ‹
        </button>

        <article key={`card-${index}`} className="reviewCard">
          <div className="reviewCard__inner">
            
            <h2 className="reviewCard__title">{active.headline}</h2>

            <div className="reviewCard__image">
              <img
                key={`review-img-${index}-${activeImage}`}
                src={activeImage}
                alt={active?.name || "MR FOCUS review"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackReviewImage;
                }}
              />
            </div>

            <p className="reviewCard__message">{active.message}</p>

            <div className="reviewCard__author">
              <span>{active.name}</span>
              <small>{active.role}</small>
            </div>
          </div>
        </article>

        <button
          className="reviewArrow reviewArrow--right"
          type="button"
          aria-label="Next review"
          onClick={nextReview}
        >
          ›
        </button>

        <div className="reviewDots" aria-label="Review pages">
          {reviewTiles.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`reviewDot${dotIndex === index ? " is-active" : ""}`}
              type="button"
              aria-label={`Go to review ${dotIndex + 1}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}