/**
 * Original “booking” block from the first homepage spec:
 * short copy + reserved space for a future embed (see JSX comments).
 */
export default function BookingPlaceholderSection() {
  return (
    <section
      className="section section--booking-placeholder"
      id="booking-soon"
    >
      <h2 className="section-heading">Booking</h2>
      <p className="coming-soon">Coming soon</p>
      {/* When ready, replace the &quot;Coming soon&quot; block above with your booking embed, e.g.:
      <div className="embed-wrap" dangerouslySetInnerHTML={{ __html: YOUR_EMBED_HTML }} />
      Or use an iframe:
      <iframe
        src="YOUR_BOOKING_EMBED_URL"
        title="Book a session"
        className="embed-iframe"
      />
      */}
    </section>
  );
}
