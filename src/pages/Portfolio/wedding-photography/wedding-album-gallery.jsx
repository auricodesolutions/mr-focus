import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./wedding-album-gallery.css";

const weddingAlbums = [
  {
    type: "Wedding Shoot",
    title: "THARINDI & CHATHURA",
    slug: "tharindi-chathura",
    cover: "/assets/img2.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "MAHEESH & ARTHIKA",
    slug: "maheesh-arthika",
    cover: "/assets/img3.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "NETHMI & PASINDU",
    slug: "nethmi-pasindu",
    cover: "/assets/img4.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "DINUKI & ASHAN",
    slug: "dinuki-ashan",
    cover: "/assets/img5.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "SANDUNI & KAVINDU",
    slug: "sanduni-kavindu",
    cover: "/assets/img6.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "ISURI & JANITH",
    slug: "isuri-janith",
    cover: "/assets/img7.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "CHAMODI & RAVINDU",
    slug: "chamodi-ravindu",
    cover: "/assets/img10.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "AMAYA & DILAN",
    slug: "amaya-dilan",
    cover: "/assets/img11.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "HIMASHA & SHENAL",
    slug: "himasha-shenal",
    cover: "/assets/img12.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "KAVINDYA & THARUSHAN",
    slug: "kavindya-tharushan",
    cover: "/assets/img13.jpg",
  },
];

const albumImages = {
  "tharindi-chathura": [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img3.jpg",
    "/assets/img4.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
  ],

  "maheesh-arthika": [
    "/assets/img2.jpg",
    "/assets/img3.jpg",
    "/assets/img4.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
  ],

  "nethmi-pasindu": [
    "/assets/img3.jpg",
    "/assets/img4.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
  ],

  "dinuki-ashan": [
    "/assets/img4.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "sanduni-kavindu": [
    "/assets/img1.jpg",
    "/assets/img3.jpg",
    "/assets/img5.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "isuri-janith": [
    "/assets/img2.jpg",
    "/assets/img4.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "chamodi-ravindu": [
    "/assets/img1.jpg",
    "/assets/img2.jpg",
    "/assets/img4.jpg",
    "/assets/img6.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "amaya-dilan": [
    "/assets/img3.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "himasha-shenal": [
    "/assets/img1.jpg",
    "/assets/img5.jpg",
    "/assets/img6.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],

  "kavindya-tharushan": [
    "/assets/img2.jpg",
    "/assets/img3.jpg",
    "/assets/img5.jpg",
    "/assets/img7.jpg",
    "/assets/img10.jpg",
    "/assets/img11.jpg",
    "/assets/img12.jpg",
    "/assets/img13.jpg",
    "/assets/img14.jpg",
    "/assets/img15.jpg",
  ],
};

function getAlbumImages(slug) {
  const images = albumImages[slug] || [];

  return images.map((src, index) => ({
    src,
    alt: `${slug} wedding gallery image ${index + 1}`,
  }));
}

export default function WeddingAlbumGallery() {
  const { albumSlug } = useParams();
  const pageRef = useRef(null);

  const album = weddingAlbums.find((item) => item.slug === albumSlug);

  useEffect(() => {
    const items = pageRef.current?.querySelectorAll(".albumGallery__item");

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
  }, [albumSlug]);

  if (!album) {
    return <Navigate to="/portfolio/wedding-photography" replace />;
  }

  const images = getAlbumImages(album.slug);

  return (
    <main className="albumGalleryPage" ref={pageRef}>
      <section
        className="albumGalleryHero"
        style={{ "--albumHeroImage": `url(${album.cover})` }}
      >
        <Link
          className="albumGalleryHero__back"
          to="/portfolio/wedding-photography"
        >
          Back to Albums
        </Link>

        <span>{album.type}</span>
        <h1>{album.title}</h1>
        <p>Best moments from this wedding story.</p>
      </section>

      <section className="albumGallery" aria-label={`${album.title} gallery`}>
        {images.map((image, index) => (
          <figure
            className="albumGallery__item"
            key={`${image.src}-${index}`}
            style={{ "--delay": `${index * 0.05}s` }}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </section>
    </main>
  );
}