import "./StoryMoment.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { storyReviews } from "../../data/storyReviewsData";

const SLIDE_TIME = 2800; // total time for one review
const EXIT_TIME = 320;   // old image going out
const ENTER_TIME = 620;  // new image coming in

export default function StoryMoment() {
  const [index, setIndex] = useState(0);
  const [motion, setMotion] = useState("is-entering");

  const active = storyReviews[index];

  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const addTimeout = (callback, time) => {
    const id = window.setTimeout(callback, time);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    storyReviews.forEach((item) => {
      const img = new Image();
      img.src = item.img;
    });

    return clearAllTimeouts;
  }, []);

  const changeSlide = useCallback((nextIndex) => {
    if (isAnimatingRef.current) return;
    if (nextIndex === indexRef.current) return;

    isAnimatingRef.current = true;
    setMotion("is-leaving");

    addTimeout(() => {
      indexRef.current = nextIndex;
      setIndex(nextIndex);
      setMotion("is-entering");

      addTimeout(() => {
        setMotion("is-holding");
        isAnimatingRef.current = false;
      }, ENTER_TIME);
    }, EXIT_TIME);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextIndex = (indexRef.current + 1) % storyReviews.length;
      changeSlide(nextIndex);
    }, SLIDE_TIME);

    return () => window.clearInterval(timer);
  }, [changeSlide]);

  const goTo = (nextIndex) => {
    clearAllTimeouts();
    isAnimatingRef.current = false;
    changeSlide(nextIndex);
  };

  if (!active) return null;

  return (
    <section
      className={`storyMoment layer ${motion}`}
      id="storyMoment"
      style={{
        "--layer": 5,
        "--stack-offset": "0px",
        "--hold": "0vh",
      }}
      data-storymoment
    >
      <div className="storyMoment__bgPhoto">
        <img key={`bg-${index}`} src={active.img} alt="" />
      </div>

      <div className="storyMoment__inner">
        <div className="storyMoment__text">
          <span className="storyMoment__label">Client Review</span>

          <h2 className="storyMoment__quoteTitle">
            {active.lines.map((line, lineIndex) => (
              <span
                key={`${index}-${lineIndex}`}
                style={{ "--line-delay": `${lineIndex * 55}ms` }}
              >
                {line}
              </span>
            ))}
          </h2>

          <p className="storyMoment__review">{active.text}</p>

          <div className="storyMoment__reviewAuthor">
            <small>{active.by}</small>
          </div>
        </div>

        <div className="storyMoment__mainPhoto">
          <img key={`main-${index}`} src={active.img} alt="Wedding couple" />
        </div>
      </div>

      <div className="storyMoment__dots" aria-label="Review dots">
        {storyReviews.map((_, dotIndex) => (
          <button
            key={dotIndex}
            className={`storyMoment__dot${
              dotIndex === index ? " is-active" : ""
            }`}
            type="button"
            aria-label={`Go to review ${dotIndex + 1}`}
            onClick={() => goTo(dotIndex)}
          >
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}