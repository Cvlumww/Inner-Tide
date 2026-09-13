import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Inner Tide Studios — Reformer Pilates, 16 Fitzroy Place, Second Floor,
        Finnieston, Glasgow, G3 7RW
      </p>
      <nav className="site-footer__nav" aria-label="Footer">
        <Link href="/blog">Blog</Link>
        <Link href="/news">News</Link>
        <Link href="/services">Services</Link>
      </nav>
      <p className="site-footer__link">
        Website by <Link href="https://calum.work">Calum Fraser Wardrop</Link>
      </p>
    </footer>
  );
}

