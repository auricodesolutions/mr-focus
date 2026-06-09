export const weddingAlbums = [
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
    cover: "/assets/img5.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "NETHMI & PASINDU",
    slug: "nethmi-pasindu",
    cover: "/assets/img15.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "DINUKI & ASHAN",
    slug: "dinuki-ashan",
    cover: "/assets/img1.jpg",
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
    cover: "/assets/thumb6.png",
  },
  {
    type: "Wedding Shoot",
    title: "CHAMODI & RAVINDU",
    slug: "chamodi-ravindu",
    cover: "/assets/portfoliohero.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "AMAYA & DILAN",
    slug: "amaya-dilan",
    cover: "/assets/wedding/wedding8.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "HIMASHA & SHENAL",
    slug: "himasha-shenal",
    cover: "/assets/wedding/wedding9.jpg",
  },
  {
    type: "Wedding Shoot",
    title: "KAVINDYA & THARUSHAN",
    slug: "kavindya-tharushan",
    cover: "/assets/wedding/wedding10.jpg",
  },
];

export function getAlbumImages(slug) {
  return Array.from({ length: 10 }, (_, index) => ({
    src: `/assets/img2${slug}/${index + 1}.jpg`,
    alt: `${slug} wedding gallery image ${index + 1}`,
  }));
}