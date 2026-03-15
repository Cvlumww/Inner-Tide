"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ROTATE_MS = 4000;
const PAUSE_AFTER_CLICK_MS = 5000;

function ArrowPrev() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowNext() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function GallerySection({ images }) {
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [clickPaused, setClickPaused] = useState(false);
  const intervalRef = useRef(null);

  const paused = hoverPaused || clickPaused;

  useEffect(() => {
    if (!images?.length || paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images?.length, paused]);

  if (!images?.length) return null;

  const goPrev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setClickPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeout(() => setClickPaused(false), PAUSE_AFTER_CLICK_MS);
  };
  const goNext = () => {
    setIndex((i) => (i + 1) % images.length);
    setClickPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeout(() => setClickPaused(false), PAUSE_AFTER_CLICK_MS);
  };

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="section-heading">Gallery</h2>
      <div
        className="gallery-carousel-wrap"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        <button
          type="button"
          className="gallery-arrow gallery-arrow--prev"
          onClick={goPrev}
          aria-label="Previous image"
        >
          <ArrowPrev />
        </button>
        <div className="gallery-carousel">
          {images.map((src, i) => (
            <div
              key={src}
              className="gallery-slide"
              data-active={i === index}
              aria-hidden={i !== index}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, min(80vw, 900px)"
                style={{ objectFit: "cover" }}
                priority={i === 0}
                quality={82}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="gallery-arrow gallery-arrow--next"
          onClick={goNext}
          aria-label="Next image"
        >
          <ArrowNext />
        </button>
      </div>
    </section>
  );
}
