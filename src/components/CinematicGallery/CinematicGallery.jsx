import "./CinematicGallery.css";
import { useEffect, useMemo, useState } from "react";
import { videoItems } from "../../data/videosData";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getYoutubeId(url) {
  if (!url) return "";

  const normalMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);

  return (
    normalMatch?.[1] ||
    shortMatch?.[1] ||
    embedMatch?.[1] ||
    shortsMatch?.[1] ||
    ""
  );
}

function getYoutubeThumb(url) {
  const videoId = getYoutubeId(url);

  if (!videoId) return "";

  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYoutubeEmbed(url) {
  const videoId = getYoutubeId(url);

  if (!videoId) return "";

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

function getFacebookEmbed(url) {
  if (!url) return "";

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&autoplay=true&width=1200`;
}

function getPlayerData(item) {
  const source = item.video || item.embed || item.url || "";

  const isMp4 =
    source.endsWith(".mp4") ||
    source.endsWith(".webm") ||
    source.endsWith(".ogg");

  const isYoutube =
    source.includes("youtube.com") || source.includes("youtu.be");

  const isFacebook =
    source.includes("facebook.com") || source.includes("fb.watch");

  if (isMp4) {
    return {
      type: "video",
      src: source,
    };
  }

  if (isYoutube) {
    return {
      type: "iframe",
      src: getYoutubeEmbed(source),
    };
  }

  if (isFacebook) {
    return {
      type: "iframe",
      src: getFacebookEmbed(source),
    };
  }

  return {
    type: "iframe",
    src: source,
  };
}

function getThumb(item) {
  if (item.thumb) return item.thumb;

  const source = item.video || item.embed || item.url || "";
  const youtubeThumb = getYoutubeThumb(source);

  return youtubeThumb || "/assets/videos/default-thumb.jpg";
}

export default function CinematicGallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  const playerData = useMemo(() => {
    if (!activeVideo) return null;
    return getPlayerData(activeVideo);
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.body.classList.add("videoModalOpen");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("videoModalOpen");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <section
      className="section videoShowcase layer"
      id="films"
      style={{ "--layer": 4, "--hold": "10vh", "--stack-offset": "28px" }}
    >
      <div className="container">
        <div className="head head--center reveal-soft">
          <div>
            <h2 className="h2 h2--spaced">Cinematic Gallery</h2>
            <p className="lead muted lead--center">
              Watch a few highlights. Tap a video to play it here.
            </p>
          </div>
        </div>

        <div className="videoGrid">
          {videoItems.map((item, index) => {
            const thumb = getThumb(item);

            return (
              <button
                key={`${item.title}-${index}`}
                className="videoCard reveal-soft"
                type="button"
                onClick={() => setActiveVideo(item)}
                aria-label={`Play ${item.title}`}
              >
                <div
                  className="videoThumb"
                  style={{ "--thumb": `url("${thumb}")` }}
                >
                  <span className="playBtn" aria-hidden="true">
                    <PlayIcon />
                  </span>
                </div>

                <div className="videoMeta">
                  <p className="videoTitle">{item.title}</p>
                  <p className="videoSub muted">Play video here</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeVideo && playerData && (
        <div
          className="videoModal"
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          <button
            className="videoModal__backdrop"
            type="button"
            aria-label="Close video"
            onClick={() => setActiveVideo(null)}
          />

          <div className="videoModal__panel">
            <div className="videoModal__top">
              <div>
                <p className="videoModal__eyebrow">MR FOCUS Films</p>
                <h3 className="videoModal__title">{activeVideo.title}</h3>
              </div>

              <button
                className="videoModal__close"
                type="button"
                aria-label="Close video"
                onClick={() => setActiveVideo(null)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="videoModal__player">
              {playerData.type === "video" ? (
                <video
                  src={playerData.src}
                  controls
                  autoPlay
                  playsInline
                  className="videoModal__video"
                />
              ) : (
                <iframe
                  src={playerData.src}
                  title={activeVideo.title}
                  className="videoModal__iframe"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}