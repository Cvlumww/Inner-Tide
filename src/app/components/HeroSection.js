"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ROTATE_MS = 5000;

export default function HeroSection({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images?.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [images?.length]);

  if (!images?.length) {
    return (
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">Inner Tide Studios</h1>
          <p className="hero__tagline">
            Mindful, strength-focused Reformer Pilates in the heart of
            Finnieston. Find your balance in Glasgow’s West End.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero__carousel" aria-hidden="true">
        {images.map((src, i) => (
          <div
            key={src}
            className="hero__carousel-slide"
            data-active={i === index}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              quality={85}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">Inner Tide Studios</h1>
        <p className="hero__tagline">
          Mindful, strength-focused Reformer Pilates in the heart of Finnieston.
          Find your balance in Glasgow’s West End.
        </p>

        <Link href="/#booking" className="hero__button">
          Book a session
        </Link>
      </div>
    </section>
  );
}
