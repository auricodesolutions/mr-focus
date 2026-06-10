import { useEffect, useRef, useState } from "react";
import "./Reviews.css";

const clientPhotos = [
  "/assets/im8.jpg",
  "/assets/img.jpg",
  "/assets/img1.jpg",
  "/assets/img4.jpg",
];

const eventTypes = [
  "Wedding Photography",
  "Engagement Photography",
  "Pre-wedding Photography",
  "Cinematic Wedding Films",
  "Pre-wedding Videography",
  "Cinematography",
  "Event Coverage",
  "Commercial Corporate Films",
  "Production",
  "Photography",
  "Videography",
  "Photography + Videography",
  "Drone Coverage",
  "Other",
];

const defaultReviews = [
  {
    id: 1,
    name: "Nadeesha & Pasindu",
    event: "Wedding Shoot",
    rating: 5,
    message:
      "MR Focus captured our special day beautifully. Every photo felt natural, emotional, and timeless.",
    photo: "/assets/client-1.jpg",
  },
  {
    id: 2,
    name: "Tharushi & Kavindu",
    event: "Pre-wedding Shoot",
    rating: 5,
    message:
      "The team made us feel very comfortable. The final photos were elegant, clean, and full of emotion.",
    photo: "/assets/client-2.jpg",
  },
  {
    id: 3,
    name: "Dinuka & Malshi",
    event: "Cinematic Wedding Film",
    rating: 5,
    message:
      "The final wedding film was amazing. It felt like reliving our best memories again.",
    photo: "/assets/client-3.jpg",
  },
];

const REVIEWS_PER_LOAD = 6;

export default function Reviews() {
  const formRef = useRef(null);
  const reviewsRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_LOAD);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    try {
      const savedReviews = JSON.parse(
        localStorage.getItem("mrFocusReviewsBW") || "[]"
      );

      setReviews([...savedReviews, ...defaultReviews]);
    } catch {
      setReviews(defaultReviews);
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".bw-reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [reviews, showForm, visibleCount]);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < reviews.length;

  const handleLoadMore = () => {
    setVisibleCount(current =>
      Math.min(current + REVIEWS_PER_LOAD, reviews.length)
    );
  };

  const handleOpenForm = () => {
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleScrollReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.trim();
    const reviewEvent = formData.get("event")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !reviewEvent || !message) {
      setFormError("Please fill all fields before submitting your review.");
      return;
    }

    const randomPhoto =
      clientPhotos[Math.floor(Math.random() * clientPhotos.length)];

    const newReview = {
      id: Date.now(),
      name,
      event: reviewEvent,
      rating,
      message,
      photo: randomPhoto,
    };

    const savedReviews = JSON.parse(
      localStorage.getItem("mrFocusReviewsBW") || "[]"
    );

    const updatedSavedReviews = [newReview, ...savedReviews];

    localStorage.setItem(
      "mrFocusReviewsBW",
      JSON.stringify(updatedSavedReviews)
    );

    setReviews([newReview, ...reviews]);
    setVisibleCount(REVIEWS_PER_LOAD);
    setRating(5);
    setShowForm(false);
    e.currentTarget.reset();
  };

  return (
    <main className="reviews-page-bw only-testimonials-page">
      <section className="testimonials-only-section">
        <div className="testimonials-overlay"></div>

        <div className="testimonials-content-wrap">
          <div className="testimonials-header bw-reveal">
            <span className="bw-kicker">Testimonials</span>

            <h1>What Our Clients Say</h1>

            <p>
              Clean, emotional, and timeless reviews from MR Focus photography
              and film clients.
            </p>

            <div className="hero-actions-bw">
              <button onClick={handleOpenForm} className="bw-main-btn">
                Write a Review
              </button>

              <button onClick={handleScrollReviews} className="bw-outline-btn">
                View Reviews
              </button>
            </div>
          </div>

          <div ref={reviewsRef} className="reviews-grid-bw">
            {visibleReviews.map((review, index) => (
              <article
                className="review-card-bw bw-reveal"
                key={review.id}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="review-card-top">
                  <div className="review-profile">
                    <img
                      src={review.photo}
                      alt={review.name}
                      onError={e => {
                        e.currentTarget.src = "/assets/client-default.jpg";
                      }}
                    />
                  </div>

                  <div className="review-person-info">
                    <h3>{review.name}</h3>
                    <span>{review.event}</span>
                  </div>
                </div>

                <div className="review-stars-bw">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p className="review-message-bw">“{review.message}”</p>
              </article>
            ))}
          </div>

          {hasMoreReviews && (
            <div className="reviews-load-more-wrap">
              <button
                type="button"
                className="bw-main-btn reviews-load-more-btn"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}

          {showForm && (
            <section ref={formRef} className="review-form-section-bw active">
              <div className="review-form-card-bw bw-reveal">
                <div className="form-left-bw">
                  <span className="bw-kicker">Share Your Story</span>
                  <h2>Write a Review</h2>
                  <p>
                    Share your experience with MR Focus. Your words help future
                    clients trust our work.
                  </p>
                </div>

                <form className="review-form-bw" onSubmit={handleSubmit}>
                  {formError && (
                    <div className="review-error-bw">{formError}</div>
                  )}

                  <div className="form-row-bw">
                    <input type="text" name="name" placeholder="Your name" />

                    <select name="event" defaultValue="">
                      <option value="">Select service</option>
                      {eventTypes.map(service => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rating-box-bw">
                    <span>Your rating</span>

                    <div>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={star <= rating ? "active" : ""}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Write your review here..."
                  ></textarea>

                  <button type="submit" className="bw-main-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}