import { useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Preloader from "./components/Preloader/Preloader";

import Hero from "./components/Hero/Hero";
import ApproachStage from "./components/ApproachStage/ApproachStage";
import CinematicGallery from "./components/CinematicGallery/CinematicGallery";
import StoryMoment from "./components/StoryMoment/StoryMoment";
import ContactHero from "./components/ContactHero/ContactHero";
import About from "./pages/About/about";
import Contact from "./pages/Contact/Contact";
import Portfolio from "./pages/Portfolio/portfolio";

import { usePageEffects } from "./hooks/usePageEffects";
import { useHomeAnimations } from "./hooks/useHomeAnimations";
import ClientStories from "./components/ClientStories/ClientStories";
import StoryPeek from "./components/StoryPeek/StoryPeek";
import WeddingPhotography from "./pages/Portfolio/wedding-photography/wedding-photography";
import EngagementPhotography from "./pages/Portfolio/EngagementPhotography/EngagementPhotography";
import CinematicWeddingFilms from "./pages/Portfolio/CinematicWeddingFilms/CinematicWeddingFilms";
import PreWeddingVideography from "./pages/Portfolio/PreWeddingVideography/PreWeddingVideography";
import Cinematography from "./pages/Portfolio/Cinematography/Cinematography";
import EventCoverage from "./pages/Portfolio/EventCoverage/EventCoverage";
import CommercialCorporateFilms from "./pages/Portfolio/CommercialCorporateFilms/CommercialCorporateFilms";
import Production from "./pages/Portfolio/Production/Production";
import FeaturedReviewSection from "./components/FeaturedReviewSection/FeaturedReviewSection";
import WeddingAlbumGallery from "./pages/Portfolio/wedding-photography/wedding-album-gallery";
import Reviews from "./pages/Reviews/Reviews";

function HomeContent() {
  useHomeAnimations();

  return (
    <>
      <Preloader />

      <main id="main" className="layerScroll">
        <Hero />
        <ApproachStage />
        <CinematicGallery />
        <StoryMoment />
        <FeaturedReviewSection />
        <ClientStories />
        <ContactHero variant="home" />
      </main>
    </>
  );
}

function PageShell({ children }) {
  return (
    <>
      <ProgressBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  usePageEffects();

  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  useLayoutEffect(() => {
    const isHome = pathname === "/";

    document.body.classList.remove(
      "menu-open",
      "drawer-open",
      "nav-open",
      "lock-scroll",
      "no-scroll",
      "is-locked",
      "is-scrolling-fast"
    );

    // When leaving home, remove home animation scroll/sticky side effects
    if (!isHome) {
      const selectors = [
        "html",
        "body",
        "#root",
        ".App",
        ".app",
        ".site",
        ".siteWrap",
        ".layout",
        ".page",
        ".pageWrap",
        ".router",
        ".routes",
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.style.setProperty("height", "auto", "important");
          el.style.setProperty("max-height", "none", "important");
          el.style.setProperty("overflow-x", "hidden", "important");

          if (selector === "html" || selector === "body") {
            el.style.setProperty("min-height", "100%", "important");
            el.style.setProperty("overflow-y", "auto", "important");
            el.style.setProperty("position", "static", "important");
          } else {
            el.style.setProperty("min-height", "100dvh", "important");
            el.style.setProperty("overflow-y", "visible", "important");
            el.style.setProperty("position", "relative", "important");
          }
        });
      });
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PageShell>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeContent />} />
        <Route path="/about" element={<About />} />

        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<Reviews />} />

       <Route
  path="/portfolio/wedding-photography"
  element={<WeddingPhotography />}
/>
      
   <Route
  path="/portfolio/wedding-photography/:albumSlug"
  element={<WeddingAlbumGallery />}
/>

        <Route
          path="/portfolio/engagement-photography"
          element={<EngagementPhotography />}
        />

        <Route
          path="/portfolio/cinematic-wedding-films"
          element={<CinematicWeddingFilms />}
        />

        <Route
          path="/portfolio/pre-wedding-videography"
          element={<PreWeddingVideography />}
        />

        <Route
          path="/portfolio/cinematography"
          element={<Cinematography />}
        />

        <Route
          path="/portfolio/event-coverage"
          element={<EventCoverage />}
        />

        <Route
          path="/portfolio/commercial-corporate-films"
          element={<CommercialCorporateFilms />}
        />

        <Route
          path="/portfolio/production"
          element={<Production />}
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="/Portfolio" element={<Navigate to="/portfolio" replace />} />
        <Route path="/categories" element={<Navigate to="/portfolio" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageShell>
  );
}