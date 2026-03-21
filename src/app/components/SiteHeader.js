"use client";

import { useState } from "react";
import Image from "next/image";
import BsportEmbed from "./BsportEmbed";
import { BSPORT_LOGIN } from "@/lib/bsport-configs";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#booking", label: "Booking" },
  { href: "#gallery", label: "Gallery" },
  { href: "#member", label: "Member" },
  { href: "#find-us", label: "Find Us" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a href="/" aria-label="Inner Tide Studios home">
        <Image
          src="/logos/cream.png"
          alt="Inner Tide Studios"
          width={160}
          height={48}
          className="site-header__logo"
          priority
          quality={90}
        />
      </a>

      <div className="site-header__end">
        <nav
          id="site-header__nav"
          className={`site-header__nav ${menuOpen ? "site-header__nav--open" : ""}`}
          aria-label="Main"
        >
          <ul className="site-header__nav-list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={handleNavClick}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__login" aria-label="Account login">
          <BsportEmbed config={BSPORT_LOGIN} />
        </div>

        <button
          type="button"
          className="site-header__hamburger"
          aria-expanded={menuOpen}
          aria-controls="site-header__nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="site-header__hamburger-line" />
          <span className="site-header__hamburger-line" />
          <span className="site-header__hamburger-line" />
        </button>
      </div>
    </header>
  );
}
