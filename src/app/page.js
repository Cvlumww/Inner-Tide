import fs from "fs";
import path from "path";
import Link from "next/link";
import ArticleCard from "./components/ArticleCard";
import BookingSection from "./components/BookingSection";
import CalendarEmbedSection from "./components/CalendarEmbedSection";
import GallerySection from "./components/GallerySection";
import FindUsSection from "./components/FindUsSection";
import HeroSection from "./components/HeroSection";
import ServiceCard from "./components/ServiceCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { getPosts, getServices } from "@/lib/wordpress";

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

export default async function Home() {
  const galleryImages = getGalleryImages();
  const heroImages = getHeroImages();
  const [posts, services] = await Promise.all([
    getPosts({ limit: 3 }),
    getServices({ featuredOnly: true }),
  ]);

  return (
    <div className="page">
      <SiteHeader />

      <HeroSection images={heroImages} />

      <main className="main-content">
        <section className="section" id="about">
          <h2 className="section-heading">About Innertide Studios</h2>
          <div className="about-content">
            <p>
              Innertide Studios is a boutique reformer Pilates studio created to
              strengthen the body and soften the mind. Designed as a calm and
              welcoming space, the studio invites you to step away from the pace
              of everyday life and reconnect with yourself through mindful
              movement.
            </p>

            <p>
              Our reformer Pilates classes focus on building strength, improving
              mobility, and creating balance throughout the body. Using
              small-group reformer sessions, we provide a supportive environment
              where every client can move with control, confidence, and
              intention. Whether you are completely new to reformer Pilates or
              looking to deepen your practice, our classes are designed to
              support all levels.
            </p>

            <p>
              At Innertide, we believe taking time to prioritise yourself is
              essential. Pilates offers a powerful way to improve posture,
              develop core strength, and support both physical and mental
              wellbeing. Our aim is to create a space where clients feel
              stronger, calmer, and more connected to their bodies.
            </p>

            <p>
              We offer beginner-friendly reformer Pilates classes, progressive
              sessions for those looking to challenge themselves, and private
              1:1 reformer sessions for a more personalised experience. With a
              focus on thoughtful movement and a welcoming studio atmosphere,
              Innertide is a place where you can move with purpose and feel the
              benefits long after your class ends.{" "}
            </p>

            <p>
              Located in Glasgow, Innertide Studios offers small-group reformer
              Pilates classes and private sessions designed to support strength,
              balance, and wellbeing
            </p>
          </div>
        </section>

        <section className="section section--booking" id="booking">
          <h2 className="section-heading">Booking</h2>
          <BookingSection />
        </section>

        {services.length > 0 && (
          <section className="section home-content-section">
            <div className="home-content-section__heading">
              <div>
                <p className="content-hero__eyebrow">Move with purpose</p>
                <h2 className="section-heading">Featured services</h2>
              </div>
              <Link href="/services" className="text-link">
                View all services
              </Link>
            </div>
            <div className="content-grid">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section className="section home-content-section">
            <div className="home-content-section__heading">
              <div>
                <p className="content-hero__eyebrow">From the studio</p>
                <h2 className="section-heading">Latest articles</h2>
              </div>
              <Link href="/blog" className="text-link">
                Visit the blog
              </Link>
            </div>
            <div className="content-grid">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <GallerySection images={galleryImages} />
        <CalendarEmbedSection />
        <FindUsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
