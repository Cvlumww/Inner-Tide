"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { mountBsportWidget } from "@/lib/bsport";
import {
  BSPORT_CALENDAR,
  BSPORT_PASS,
  BSPORT_PRIVATE_SESSIONS,
} from "@/lib/bsport-configs";

const WIDGETS = {
  calendar: { label: "Book a class", config: BSPORT_CALENDAR },
  pass: { label: "Passes", config: BSPORT_PASS },
  private: { label: "Private sessions", config: BSPORT_PRIVATE_SESSIONS },
};

export default function BookingSection() {
  const [active, setActive] = useState(null);
  const titleId = useId();

  const close = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const config = WIDGETS[active].config;

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
        Choose an option below to open the booking window.
      </p>
      <div className="booking-actions">
        {(Object.keys(WIDGETS)).map((key) => (
          <button
            key={key}
            type="button"
            className="booking-actions__btn"
            onClick={() => setActive(key)}
          >
            {WIDGETS[key].label}
          </button>
        ))}
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
                {WIDGETS[active].label}
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
                id={WIDGETS[active].config.parentElement}
                className="booking-modal__mount"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
