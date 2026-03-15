import fs from "fs";
import path from "path";
import GallerySection from "./components/GallerySection";
import ContactForm from "./components/ContactForm";
import HeroSection from "./components/HeroSection";
import SiteHeader from "./components/SiteHeader";

function getGalleryImages() {
  try {
    const dir = path.join(process.cwd(), "public", "gallery-images");
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort()
      .map((f) => `/gallery-images/${f}`);
  } catch {
    return [];
  }
}

function getHeroImages() {
  try {
    const dir = path.join(process.cwd(), "public", "hero-images");
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
        return numA - numB;
      })
      .map((f) => `/hero-images/${f}`);
  } catch {
    return [];
  }
}

export default function Home() {
  const galleryImages = getGalleryImages();
  const heroImages = getHeroImages();

  return (
    <div className="page">
      <SiteHeader />

      <HeroSection images={heroImages} />

      <main className="main-content">
        <section className="section" id="about">
          <h2 className="section-heading">About</h2>
          <div className="about-content">
            <p>
              Inner Tide Studios is a reformer pilates studio that has just
              opened in Finnieston, in the West End of Glasgow. We offer
              mindful, strength-building sessions on the reformer in a calm,
              welcoming space.
            </p>
            <p>
              Whether you&apos;re new to reformer pilates or looking to deepen
              your practice, we&apos;d love to see you. Get in touch or book a
              session below.
            </p>
          </div>
        </section>

        <section className="section" id="booking">
          <h2 className="section-heading">Booking</h2>
          <p className="coming-soon">Coming soon</p>
          {/* When ready, replace the "Coming soon" block above with your booking embed, e.g.:
          <div className="embed-wrap" dangerouslySetInnerHTML={{ __html: YOUR_EMBED_HTML }} />
          Or use an iframe:
          <iframe
            src="YOUR_BOOKING_EMBED_URL"
            title="Book a session"
            className="embed-iframe"
          />
          */}
        </section>

        <GallerySection images={galleryImages} />
        <ContactForm />
      </main>

      <footer className="site-footer">
        <p>Inner Tide Studios — Reformer Pilates, Finnieston, Glasgow</p>
      </footer>
    </div>
  );
}
