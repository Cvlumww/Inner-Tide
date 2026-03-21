"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { mountBsportWidget } from "@/lib/bsport";
import { BSPORT_PASS } from "@/lib/bsport-configs";

/** First booking tile — class schedule: scrolls to calendar below gallery */
const CLASS_SCHEDULE_BG = "/hero-images/3.JPG";

/** Second tile (passes) — replace when you have an image */
const PASSES_BG = "/hero-images/2.JPG";

const MODAL_WIDGET = {
  pass: { label: "Passes", config: BSPORT_PASS },
};

export default function BookingSection() {
  const [active, setActive] = useState(null);
  const titleId = useId();

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const scrollToCalendar = useCallback(() => {
    document.getElementById("booking-calendar")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const config = MODAL_WIDGET[active].config;

    const runMount = () => {
      const el = document.getElementById(config.parentElement);
      if (!el) return;
      mountBsportWidget(config);
    };

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(runMount);
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  return (
    <div className="booking-section">
      <p className="booking-section__intro">
        Class schedule is below the gallery. Use Passes to buy packs in a new
        window.
      </p>
      <div className="booking-actions">
        <button
          type="button"
          className="booking-actions__btn booking-actions__btn--image"
          style={{ "--booking-bg": `url(${CLASS_SCHEDULE_BG})` }}
          onClick={scrollToCalendar}
        >
          <span className="booking-actions__btn-overlay" aria-hidden />
          <span className="booking-actions__btn-label">Class schedule</span>
        </button>

        <button
          type="button"
          className="booking-actions__btn booking-actions__btn--image booking-actions__btn--passes"
          style={{ "--booking-bg": `url(${PASSES_BG})` }}
          onClick={() => setActive("pass")}
        >
          <span className="booking-actions__btn-overlay" aria-hidden />
          <span className="booking-actions__btn-label">Passes</span>
        </button>

        {/* Private sessions — enable when image + BSPORT_PRIVATE_SESSIONS are ready
        <button
          type="button"
          className="booking-actions__btn booking-actions__btn--image"
          style={{ "--booking-bg": "url(/hero-images/…)" }}
          onClick={() => setActive("private")}
        >
          <span className="booking-actions__btn-overlay" aria-hidden />
          <span className="booking-actions__btn-label">Private sessions</span>
        </button>
        */}
      </div>

      {active ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div
            className="booking-modal__backdrop"
            role="presentation"
            onClick={close}
          />
          <div className="booking-modal__panel">
            <div className="booking-modal__header">
              <h3 className="booking-modal__title" id={titleId}>
                {MODAL_WIDGET[active].label}
              </h3>
              <button
                type="button"
                className="booking-modal__close"
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="booking-modal__body">
              <div
                key={active}
                id={MODAL_WIDGET[active].config.parentElement}
                className="booking-modal__mount"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
