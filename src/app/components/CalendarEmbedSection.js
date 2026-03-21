"use client";

import BsportEmbed from "./BsportEmbed";
import { BSPORT_CALENDAR_INLINE } from "@/lib/bsport-configs";

/**
 * BSport calendar (dialogMode 1) — full snippet equivalent, mounted once below gallery.
 */
export default function CalendarEmbedSection() {
  return (
    <section
      className="section section--calendar-embed"
      id="booking-calendar"
      aria-labelledby="booking-calendar-heading"
    >
      <h2 className="section-heading" id="booking-calendar-heading">
        Class schedule
      </h2>
      <p className="calendar-embed__intro">
        View and book group classes using the calendar below.
      </p>
      <BsportEmbed
        config={BSPORT_CALENDAR_INLINE}
        className="calendar-embed__mount"
      />
    </section>
  );
}
