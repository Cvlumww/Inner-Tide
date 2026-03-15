import fs from "fs";
import path from "path";
import NotFoundSection from "./components/NotFoundSection";
import SiteHeader from "./components/SiteHeader";

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
  const heroImages = getHeroImages();

  return (
    <div className="page">
      <SiteHeader />

      <NotFoundSection images={heroImages} />

      <footer className="site-footer">
        <p>Inner Tide Studios — Reformer Pilates, Finnieston, Glasgow</p>
      </footer>
    </div>
  );
}
