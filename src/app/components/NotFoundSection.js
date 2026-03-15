"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ROTATE_MS = 5000;

export default function notFoundSection({ images }) {
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
          <h1 className="hero__title">Page not Found</h1>
          <Link href="/" className="hero__tagline">
            Go Back?
          </Link>
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
        <h1 className="hero__title">Page not Found</h1>
        <Link href="/" className="hero__tagline">
          Go Back?
        </Link>
      </div>
    </section>
  );
}
