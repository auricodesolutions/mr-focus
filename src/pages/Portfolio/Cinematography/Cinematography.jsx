import { useEffect, useRef } from "react";
import "./Cinematography.css";
import { Link } from "react-router-dom";


const cinematographyVideos = [
  {
    title: "Cinematography Showreel 01",
    type: "Showreel",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqNX",
  },
  {
    title: "Creative Film 02",
    type: "Creative Film",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqNX",
  },
  {
    title: "Event Cinematography 03",
    type: "Event Film",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqNX",
  },
  {
    title: "Story Film 04",
    type: "Storytelling",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqN",
  },
  {
    title: "Highlight Film 05",
    type: "Highlights",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqNX",
  },
  {
    title: "Production Film 06",
    type: "Production",
    youtube: "https://youtu.be/11x_dS-t6lk?si=gCcxW_iWRzs8mqNX",
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

export default function Cinematography() {
  const pageRef = useRef(null);

  useEffect(() => {
    const cards = pageRef.current?.querySelectorAll(".cinematographyVideoCard");

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
    <main className="cinematographyPage" ref={pageRef}>
      <section className="cinematographyHero">

        <h1>Cinematography</h1>

        <p>
          A collection of cinematic visuals, creative productions, event films,
          and meaningful stories crafted with emotion and detail.
        </p>

                <Link className="portfolioBackBtn" to="/portfolio">
  Back to Portfolio
</Link>
      </section>

      <section className="cinematographyVideoGrid" aria-label="Cinematography videos">
        {cinematographyVideos.map((video, index) => (
          <article
            className="cinematographyVideoCard"
            key={video.title}
            style={{ "--delay": `${index * 0.08}s` }}
          >
            <div className="cinematographyVideoCard__video">
              <iframe
                src={getYouTubeEmbedUrl(video.youtube)}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="cinematographyVideoCard__content">
              <span>{video.type}</span>
              <h2>{video.title}</h2>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}