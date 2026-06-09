import { useEffect, useState } from "react";
import ContactHero from "../../components/ContactHero/ContactHero";
import "./Contact.css";

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 8.2h2.4V4.4c-.4-.1-1.8-.2-3.4-.2-3.3 0-5.5 2-5.5 5.7v3.2H4v4.2h3.5V24h4.4v-6.7h3.5l.6-4.2h-4.1V10.3c0-1.2.3-2.1 2.1-2.1Z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C15.4 3.6 12 3.6 12 3.6s-3.4 0-6.7.3c-.5.1-1.5.1-2.4 1C2.2 5.6 2 7.2 2 7.2S1.7 9.1 1.7 11v1.8c0 1.9.3 3.8.3 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.5.3 6.5.3s3.4 0 6.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.8V11c0-1.9-.3-3.8-.3-3.8ZM10 14.8V8.3l5.8 3.3L10 14.8Z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.4 6.2c-1.1-.7-1.8-1.8-2-3.2h-3.5v13.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2v-3.5c-.3 0-.6-.1-.9-.1C5.7 10.1 3 12.8 3 16.2s2.7 6.2 6.2 6.2 6.2-2.7 6.2-6.2V9.7c1.4 1 3.1 1.5 4.8 1.5V7.7c-1 0-2-.5-2.8-1.5Z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/mrfocus_by_anukaindeera",
    aria: "Instagram",
    Icon: IconInstagram,
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/Mr.Focusphotography/",
    aria: "Facebook",
    Icon: IconFacebook,
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@mr_focus_wedding_flims",
    aria: "YouTube",
    Icon: IconYouTube,
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com/@anuka.indeera1?_r=1&_t=ZS-96uZz4pOqEi",
    aria: "TikTok",
    Icon: IconTikTok,
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(
      ".contact-page .reveal-soft, .contact-page .contactCard, .contact-page .contactInfo__item"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    items.forEach((item, index) => {
      item.style.setProperty("--revealDelay", `${Math.min(index * 80, 520)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    window.setTimeout(() => setSent(false), 2600);
  };

  return (
    <main className="contact-page">
      <ContactHero />

      <section className="contactSection" id="info">
        <div className="container contactGrid">
          <div className="contactCard info reveal-soft">
            <h2>Contact Details</h2>
            <p className="muted">Fast reply within working hours.</p>

            <div className="contactInfo__list">
              <div className="contactInfo__item">
                <span className="contactDot" />
                <div>
                  <strong>Phone</strong>
                  <div className="muted">+94 77 495 6764</div>
                </div>
              </div>

              <div className="contactInfo__item">
                <span className="contactDot" />
                <div>
                  <strong>Email</strong>
                  <div className="muted">yasirulakmal33@gmail.com</div>
                </div>
              </div>

              <div className="contactInfo__item">
                <span className="contactDot" />
                <div>
                  <strong>Location</strong>
                  <div className="muted">Wadduwa / Sri Lanka</div>
                </div>
              </div>
            </div>

          <div className="contactSocials">
  <span className="contactSocials__title">Follow Us</span>

  <div className="contactSocials__links">
    {socialLinks.map(({ label, url, aria, Icon }) => (
      <a
        key={label}
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={aria}
        title={aria}
      >
        <Icon />
        <span>{label}</span>
      </a>
    ))}
  </div>
</div>
          </div>

          <div className="contactCard reveal-soft">
            <h2>Send an Enquiry</h2>
            <p className="muted">
              Fill out the form below and we’ll reply with availability & a quote.
            </p>

            {sent && (
              <div className="contactNote contactNote--success">
                Enquiry sent ✅ Connect this form with email or WhatsApp later.
              </div>
            )}

            <form className="contactForm" id="contactForm" onSubmit={handleSubmit}>
              <div className="contactRow2">
                <label>
                  <span>Your Name</span>
                  <input name="name" required placeholder="Your name" />
                </label>

                <label>
                  <span>Your Phone Number</span>
                  <input name="phone" placeholder="07X XXX XXXX" />
                </label>
              </div>

              <div className="contactRow2">
                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                  />
                </label>

                <label>
                  <span>Wedding/Event date</span>
                  <input type="date" name="date" />
                </label>
              </div>

              <div className="contactRow2">
                <label>
                  <span>Location (& Wedding Venue)</span>
                  <input name="location" placeholder="City / Venue" />
                </label>

                <label>
                  <span>Service</span>
                  <select name="service">
                    <option value="">Select Service</option>
                    <option value="Wedding Photography">Wedding Photography</option>
                    <option value="Engagement Photography">
                      Engagement Photography
                    </option>
                    <option value="Pre-wedding Photography">
                      Pre-wedding Photography
                    </option>
                    <option value="Cinematic Wedding Films">
                      Cinematic Wedding Films
                    </option>
                    <option value="Pre-wedding Videography">
                      Pre-wedding Videography
                    </option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Event Coverage">Event Coverage</option>
                    <option value="Commercial Corporate Films">
                      Commercial Corporate Films
                    </option>
                    <option value="Production">Production</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us what you need (type of event, hours, style)"
                />
              </label>

              <button className="contactBtn contactBtn--full" type="submit">
                Send Message
              </button>

              <p className="contactTiny muted">
                By submitting, you agree to be contacted about your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}