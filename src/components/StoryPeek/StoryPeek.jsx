import "./StoryPeek.css";
import { useEffect, useState } from "react";

const storyImages = [
  "/assets/img2.jpg",
  "/assets/img12.jpg",
  "/assets/img4.jpg",
  "/assets/img5.jpg",
  "/assets/img6.jpg",
  "/assets/img.jpg",
  "/assets/img7.jpg",
  "/assets/im8.jpg",
  "/assets/img10.jpg",
  "/assets/work3.jpg",
  
];

const SLIDE_TIME = 1500;

export default function StoryPeek() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % storyImages.length);
    }, SLIDE_TIME);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="storyPeek">
      <div className="storyPeek__inner">
        <div className="storyPeek__media">
          {storyImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`storyPeek__img ${activeIndex === index ? "is-active" : ""}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="storyPeek__content">
          <div className="storyPeek__brandMark" aria-label="MR FOCUS by Anuka Indeera">
            <h3>MR FOCUS</h3>
            <span>BY ANUKA INDEERA</span>
          </div>

          <h2>
            Take a peek into
            <br />
            the stories we’ve
            <br />
            had the honor
            <br />
            of telling.
          </h2>

          <p>
            From quiet, emotional wedding moments to beautiful cinematic
            celebrations, these images are a reflection of love in its purest,
            most timeless form.
          </p>

          <a className="storyPeek__btn" href="/packages">
           View Packages
          </a>
        </div>
      </div>
    </section>
  );
}