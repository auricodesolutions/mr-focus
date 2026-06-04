import { useEffect, useState } from "react";
import ContactHero from "../../components/ContactHero/ContactHero";
import "./Contact.css";

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
                  <div className="muted">Wadduwa / Srilanka</div>
                </div>
              </div>
            </div>

            <div className="contactNote">
              <strong>Tip:</strong> Add your event date + location to get an accurate quote.
            </div>
          </div>

          <div className="contactCard reveal-soft">
            <h2>Send an Enquiry</h2>
            <p className="muted">Fill out the form below and we’ll reply with availability & a quote.</p>

            {sent && (
              <div className="contactNote contactNote--success">
                Enquiry sent ✅ Connect this form with email or WhatsApp later.
              </div>
            )}

            <form className="contactForm" id="contactForm" onSubmit={handleSubmit}>
              <div className="contactRow2">
                <label>
                  <span>Name</span>
                  <input name="name" required placeholder="Your name" />
                </label>

                <label>
                  <span>Phone</span>
                  <input name="phone" placeholder="07X XXX XXXX" />
                </label>
              </div>

              <div className="contactRow2">
                <label>
                  <span>Email</span>
                  <input type="email" name="email" required placeholder="you@email.com" />
                </label>

                <label>
                  <span>Date</span>
                  <input type="date" name="date" />
                </label>
              </div>

              <div className="contactRow2">
                <label>
                  <span>Location</span>
                  <input name="location" placeholder="City / Venue" />
                </label>

                <label>
                  <span>Service</span>
                  <select name="service">
                    <option value="">Select</option>
                    <option>Photography</option>
                    <option>Videography</option>
                    <option>Photography + Videography</option>
                    <option>Pre-shoot</option>
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