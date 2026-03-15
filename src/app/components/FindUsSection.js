export default function FindUsSection() {
  const mapSrc =
    "https://www.google.com/maps?q=17+Fitzroy+Place,Glasgow,UK&z=16&output=embed";

  return (
    <section className="find-us-section" id="find-us">
      <div className="find-us__grid">
        <div className="find-us__content">
          <h2 className="section-heading">Find Us</h2>
          <p className="find-us__text">
            We&apos;re in the heart of Finnieston at 17 Fitzroy Place, with
            easy access from the West End and city centre.
          </p>
          <address className="find-us__address">
            <strong>Inner Tide Studios</strong>
            <br />
            17 Fitzroy Place
            <br />
            Glasgow
          </address>
          <p className="find-us__text find-us__text--small">
            Get in touch for enquiries at{" "}
            <a href="mailto:emma@inner-tide.studio">emma@inner-tide.studio</a>.
          </p>
        </div>
        <div className="find-us__map-wrap">
          <iframe
            src={mapSrc}
            title="Map showing Inner Tide Studios at 17 Fitzroy Place, Glasgow"
            className="find-us__map"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
