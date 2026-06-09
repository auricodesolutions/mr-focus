import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedReviewSection.css";

export default function FeaturedReviewSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoPlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="featuredReview">
      <div className="featuredReview__wrap">
        <div className="featuredReview__video">
          <video
            ref={videoRef}
            src="./assets/hero.mp4"
            poster="./assets/thumb1.png"
            muted
            playsInline
            preload="metadata"
          />

          <div className="featuredReview__videoOverlay" />

          <button
            className={`featuredReview__play ${isPlaying ? "is-playing" : ""}`}
            type="button"
            aria-label={isPlaying ? "Pause video" : "Play video"}
            onClick={handleVideoPlay}
          >
            <span />
          </button>

          <div className="featuredReview__videoText">
            <h2>MR FOCUS</h2>
            <p>Wedding Stories</p>
          </div>
        </div>

        <div className="featuredReview__card">
          <p className="featuredReview__quote">
            You can trust MR.FOCUS team to exceed your expectations and deliver
            truly magical moments.
          </p>

          <a href="/reviews" className="featuredReview__btn" >View Reviews</a>


        </div>
      </div>
    </section>
  );
}