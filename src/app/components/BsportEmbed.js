"use client";

import { useEffect } from "react";
import { mountBsportWidget } from "@/lib/bsport";

const mountedIds = new Set();

/**
 * Renders the mount div and calls BSport mount when the CDN script is ready.
 */
export default function BsportEmbed({ config, className = "" }) {
  const id = config.parentElement;

  useEffect(() => {
    if (mountedIds.has(id)) return;
    mountedIds.add(id);
    mountBsportWidget(config);
  }, [id, config]);

  return <div id={id} className={className} />;
}
