import { useEffect, useRef } from "react";
import "./EngagementPhotography.css";
import { Link } from "react-router-dom";


const engagementImages = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: `/assets/img${index + 1}.jpg`,
  alt: `Engagement photography image ${index + 1}`,
}));

export default function EngagementPhotography() {
  const pageRef = useRef(null);

  useEffect(() => {
    const items = pageRef.current?.querySelectorAll(".engagementGallery__item");

    if (!items?.length) return;

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

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="engagementPage" ref={pageRef}>
      <section className="engagementHero">

        <h1>Engagement Photography</h1>

        <p>
          A soft and elegant collection of engagement memories, couple portraits,
          and meaningful moments captured with natural emotion.
        </p>

        <Link className="portfolioBackBtn" to="/portfolio">
  Back to Portfolio
</Link>
      </section>

      <section className="engagementGallery" aria-label="Engagement photography gallery">
        {engagementImages.map((item, index) => (
          <figure
            className="engagementGallery__item"
            key={item.id}
            style={{ "--delay": `${index * 0.045}s` }}
          >
            <img src={item.image} alt={item.alt} loading="lazy" />
          </figure>
        ))}
      </section>
    </main>
  );
}