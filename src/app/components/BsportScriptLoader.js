"use client";

import Script from "next/script";

/**
 * Load BSport CDN once for the whole app (matches their insert-bsport-widget-cdn snippet).
 */
export default function BsportScriptLoader() {
  return (
    <Script
      id="bsport-widget-cdn"
      src="https://cdn.bsport.io/scripts/widget.js"
      strategy="afterInteractive"
    />
  );
}
