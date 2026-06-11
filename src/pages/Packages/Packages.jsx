import { Link } from "react-router-dom";
import "./Packages.css";

const photographyPackages = [
  {
    name: "Mini Package",
    price: "Rs.100,000/-",
    type: "Wedding Photography",
    image: "/assets/img2.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 8 hour Coverage",
      "10x28 Magazine Photobook (20 Pages)",
      "With rexing box, Glasscover & Wood",
      "16x24 Enlargements - 02 (With Fiber Frame)",
      "5x7 Thank you cards - 100",
    ],
  },
  {
    name: "Classic Package",
    price: "Rs.120,000/-",
    type: "Wedding Photography",
    image: "/assets/im8.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 10 hour Coverage",
      "10x36 Magazine Photobook (40 Pages)",
      "With rexing box, Glasscover & Wood",
      "16x24 Enlargements - 02 (With Fiber Frame)",
      "5x7 Thank you cards - 100",
    ],
  },
  {
    name: "Gold Package",
    price: "Rs.140,000/-",
    type: "Wedding Photography",
    image: "/assets/img1.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 12 hour Coverage",
      "15x24 Album Photobook (60 Pages)",
      "With rexing box, Glasscover & Wood",
      "8x24 family magazine Photobook (20 pages) With Photo cover",
      "16x24 Enlargements - 02 (With Fiber Frame)",
      "6x8 Thank you cards - 100",
    ],
  },
  {
    name: "Platinum Package",
    price: "Rs.170,000/-",
    type: "Wedding Photography",
    image: "/assets/pho1.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 12 hour Coverage",
      "16x24 Magazine Photobook (60 pages) With rexing box, Glasscover & Wood",
      "8x24 family magazine Photobook (20 pages) With Photo cover",
      "16x24 Enlargements - 02 (With Fiber Frame)",
      "6x8 Thank you cards - 100",
      "Casual Photo Session (02 Costumes)",
      "Pre shoot Slide show",
    ],
  },
  {
    name: "Diamond Package",
    price: "Rs.195,000/-",
    type: "Wedding Photography",
    image: "/assets/categories1.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 12 hour Coverage",
      "16x24 Magazine Photobook (60 Pages) With rexing box, Glasscover & Wood",
      "8x24 family magazine Photobook (20 pages) With Photo cover",
      "8x24 Pre Shoot Magazine Photobook (30 pages) With Photo cover",
      "16x24 Enlargements - 02 (With Fiber Frame)",
      "12x18 Enlargements - 02 (With Fiber Frame)",
      "6x8 Thank you cards - 100",
      "Casual Photo Session (03 Costumes)",
      "Pre Shoot Slide show",
    ],
  },
  {
    name: "Titanium Package",
    price: "Rs.245,000/-",
    type: "Wedding Photography",
    image: "/assets/work6.jpg",
    features: [
      "Main Photo Session at location",
      "Wedding Ceremony & Reception",
      "Up to 12 hour Coverage",
      "17x24 Magazine Photobook (60 Pages) With rexing box, Glasscover & Wood",
      "8x24 family magazine Photobook (30 pages) With Photo cover",
      "10x30 Pre Shoot Magazine Photobook (40 pages) With Photo Cover",
      "16x24 Enlargements - 04 (With Fiber Frame)",
      "12x18 Enlargements - 02 (With Fiber Frame)",
      "6x8 Thank You cards - 150",
      "Casual Photo Session (03 Costumes)",
      "Pre Shoot Slide show",
    ],
  },
];

const otherPhotography = [
  {
    title: "Homecoming Packages",
    image: "/assets/work3.jpg",
    items: [
      {
        name: "Homecoming Portrait Session",
        price: "Rs.20,000/-",
        features: ["Main Photo Session at a location", "Homecoming Portrait Session"],
      },
      {
        name: "Homecoming Ceremony",
        price: "Rs.30,000/-",
        features: [
          "Main Photo Session at a location",
          "Homecoming Portrait Session & Ceremony",
        ],
      },
      {
        name: "Homecoming Album Package",
        price: "Rs.60,000/-",
        features: [
          "Main Photo Session at location",
          "Homecoming Portrait Session & Ceremony",
          "8x24 Magazine Album 30 Pages",
          "6x24 Enlargements - 01 (With Fiber Frame)",
        ],
      },
    ],
  },
  {
    title: "Pre Shoot Packages",
    image: "/assets/work1.jpg",
    items: [
      {
        name: "Pre Shoot Basic",
        price: "Rs.20,000/-",
        features: ["Pre Shoot Session at a location", "2 dresses", "Pre shoot Slideshow"],
      },
      {
        name: "Pre Shoot Standard",
        price: "Rs.30,000/-",
        features: [
          "Pre Shoot Session at a location",
          "2 dresses",
          "6x24 Enlargements - 01 (With Fiber Frame)",
          "Pre shoot Slideshow",
        ],
      },
      {
        name: "Pre Shoot Premium",
        price: "Rs.60,000/-",
        features: [
          "Pre Shoot Session at a location",
          "3 dresses",
          "8x24 Magazine Album 30 Pages",
          "6x24 Enlargements - 01 (With Fiber Frame)",
          "Pre shoot Slideshow",
        ],
      },
    ],
  },
  {
    title: "Engagement Packages",
    image: "/assets/work6.jpg",
    items: [
      {
        name: "Engagement Basic",
        price: "Rs.25,000/-",
        features: ["Main Photo Session at a location", "Engagement Portrait Session"],
      },
      {
        name: "Engagement Standard",
        price: "Rs.40,000/-",
        features: [
          "Main Photo Session at a location",
          "Engagement Portrait Session",
          "16x24 Enlargements - 02 (With Fiber Frame)",
        ],
      },
      {
        name: "Engagement Premium",
        price: "Rs.65,000/-",
        features: [
          "Main Photo Session at a location",
          "Engagement Portrait Session",
          "10x30 Magazine Photobook (30 Pages) With rexing box, Glasscover & Wood",
          "16x24 Enlargements - 02 (With Fiber Frame)",
        ],
      },
    ],
  },
];

const specialPackages = [
  {
    name: "Wedding & Homecoming",
    price: "Rs.255,000/-",
    features: [
      "12x30 Magazine Photobook (40 Pages) With rexing box, Glasscover & Wood",
      "10x30 Homecoming Magazine Photobook (30 Pages)",
      "16x24 Enlargements - 04 (With Fiber Frame)",
      "6x8 Thank you cards - 200",
      "All Images Gallery",
    ],
  },
  {
    name: "Wedding, Homecoming & Pre Shoot",
    price: "Rs.320,000/-",
    features: [
      "12x30 Magazine Photobook (40 Pages) With rexing box, Glasscover & Wood",
      "10x30 Homecoming Magazine Photobook (30 Pages)",
      "8x24 Pre shoot Magazine Photobook (30 Pages)",
      "16x24 Enlargements - 04 (With Fiber Frame)",
      "12x18 Enlargements - 02 (With Fiber Frame)",
      "6x8 Thank you cards - 200",
      "All Images Gallery",
    ],
  },
];

const cinematographyPackages = [
  {
    name: "Engagement",
    price: "Rs.50,000",
    image: "/assets/review.png",
    features: [
      "One DSLR Camera (up to 5 hour coverage)",
      "Highlight Video",
      "Full HD Video",
      "Wood laser Cut Pen Drive",
      "Soft Copy",
    ],
  },
  {
    name: "Pre Shoot - One DSLR",
    price: "Rs.45,000",
    image: "/assets/img4.jpg",
    features: [
      "One DSLR Camera (up to 5 hour coverage)",
      "Highlight Video",
      "4K Video",
      "Wood laser Cut Pen Drive",
      "2 Dresses",
      "Soft Copy",
    ],
  },
  {
    name: "Pre Shoot - Two DSLR",
    price: "Rs.65,000",
    image: "/assets/img3.jpg",
    features: [
      "Two DSLR Camera (up to 5 hour coverage)",
      "Highlight Video",
      "4K Video",
      "Wood laser Cut Pen Drive",
      "2 Dresses",
      "Soft Copy",
    ],
  },
  {
    name: "Wedding - One DSLR",
    price: "Rs.55,000",
    image: "/assets/img11.jpg",
    features: [
      "One DSLR Camera (up to 10 hour coverage)",
      "Full HD Videos",
      "Wedding Highlight Video",
      "Soft Copy",
    ],
  },
  {
    name: "Wedding - Two DSLR",
    price: "Rs.65,000",
    image: "/assets/thumb2.png",
    features: [
      "Two DSLR Camera (up to 10 hour coverage)",
      "Full HD Videos",
      "Wedding Highlight Video",
      "Soft Copy",
    ],
  },
  {
    name: "Wedding 4K - One DSLR",
    price: "Rs.70,000",
    image: "/assets/work5.jpg",
    features: [
      "One DSLR Camera (up to 10 hour coverage)",
      "4K HD Videos",
      "Teaser video",
      "Highlight Video",
      "Full ceremony Video",
      "Wood laser Cut Pen Drive",
      "Soft Copy",
    ],
  },
  {
    name: "Wedding 4K - Two DSLR",
    price: "Rs.100,000",
    image: "/assets/portfoliohero.jpg",
    features: [
      "Two DSLR Camera (up to 10 hour coverage)",
      "4K HD Videos",
      "Teaser video",
      "Highlight Video",
      "Full ceremony Video",
      "Wood laser Cut Pen Drive",
      "Soft Copy",
    ],
  },
  {
    name: "Homecoming - One DSLR",
    price: "Rs.60,000",
    image: "/assets/work3.jpg",
    features: [
      "One DSLR Camera (up to 10 hour coverage)",
      "Full HD Videos",
      "Teaser video",
      "Highlight Video",
      "Full ceremony Video",
      "Wood laser Cut Pen Drive",
      "Soft Copy",
    ],
  },
  {
    name: "Homecoming - Two DSLR",
    price: "Rs.85,000",
    image: "/assets/img10.jpg",
    features: [
      "Two DSLR Camera (up to 10 hour coverage)",
      "Full HD Videos",
      "Teaser video",
      "Highlight Video",
      "Full ceremony Video",
      "Wood laser Cut Pen Drive",
      "Soft Copy",
    ],
  },
];

const extras = [
  "Wedding or Homecoming Photoshoot only - 30,000 LKR",
  "Additional Thank You Card - 150 LKR",
  "Additional 20x30 Enlargement - 13,000L KR",
  "Additional 16x24 Enlargement - 8,500 LKR",
  "Additional 12x18 Enlargement - 5,000 LKR",
  "Additional page for Album - 1500 LKR",
  "8x24 Album - 20,000 LKR",
  "10x30 Album - 30,000 LKR",
  "10x36 Album - 36,000 LKR",
];

export default function Packages() {
  return (
    <main className="packagesPage">
      <section className="packagesHero">
        <div className="packagesHero__shade" />

        <div className="container packagesHero__inner">
          <h1 className="packagesHero__title">
            Wedding Photography & Cinematography Packages
          </h1>

          <p className="packagesHero__text">
            Choose the perfect package for your wedding, engagement, homecoming,
            pre shoot, photography, or cinematic wedding film.
          </p>

          <div className="packagesHero__actions">
            <a href="#photography" className="packagesBtn packagesBtn--primary">
              View Photography
            </a>

            <a href="#cinematography" className="packagesBtn packagesBtn--ghost">
              View Cinematography
            </a>
          </div>
        </div>
      </section>


      <section className="packagesSection" id="photography">
        <div className="container">
          <div className="packagesHead">
            <span className="kicker">Photography</span>
            <h2>Wedding Photography Packages</h2>
          </div>

          <div className="packagesGrid">
            {photographyPackages.map((item) => (
              <article className="packageCard" key={item.name}>
                <div className="packageCard__image">
                  <img src={item.image} alt={item.name} />
                  <span>{item.type}</span>
                </div>

                <div className="packageCard__body">
                  <h3>{item.name}</h3>
                  <p className="packageCard__price">{item.price}</p>

                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <Link to="/contact#contactForm" className="packageCard__btn">
                    Book This Package
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packagesSection packagesSection--soft">
        <div className="container">
          <div className="packagesHead">
            <span className="kicker">Photography</span>
            <h2>Other Photography Packages</h2>
          </div>

          <div className="categoryPackages">
            {otherPhotography.map((category) => (
              <article className="categoryPackage" key={category.title}>
                <div className="categoryPackage__image">
                  <img src={category.image} alt={category.title} />
                  <h3>{category.title}</h3>
                </div>

                <div className="categoryPackage__items">
                  {category.items.map((item) => (
                    <div className="miniPackage" key={item.name}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                      </div>

                      <ul>
                        {item.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packagesSection">
        <div className="container">
          <div className="packagesHead">
            <span className="kicker">Special</span>
            <h2>Special Packages</h2>
          </div>

          <div className="specialGrid">
            {specialPackages.map((item) => (
              <article className="specialCard" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>

                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="packagesSection packagesSection--dark" id="cinematography">
        <div className="container">
          <div className="packagesHead packagesHead--dark">
            <h2>Wedding Cinematography Packages</h2>
          </div>

          <div className="packagesGrid">
            {cinematographyPackages.map((item) => (
              <article className="packageCard packageCard--dark" key={item.name}>
                <div className="packageCard__image">
                  <img src={item.image} alt={item.name} />
                  <span>Cinematography</span>
                </div>

                <div className="packageCard__body">
                  <h3>{item.name}</h3>
                  <p className="packageCard__price">{item.price}</p>

                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <Link to="/contact#contactForm" className="packageCard__btn">
                    Book This Package
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="cinemaExtras">
            <p>Drone Camera With Permission - 25,000/-</p>
            <p>Extra Camera - 20,000/-</p>
          </div>
        </div>
      </section>

      <section className="packagesSection">
        <div className="container">
          <div className="packagesHead">
            <span className="kicker">Extra</span>
            <h2>Additional Charges</h2>
          </div>

          <div className="extrasGrid">
            {extras.map((extra) => (
              <div className="extraItem" key={extra}>
                {extra}
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}