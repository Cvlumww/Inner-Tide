"use client";

import { useBsportSignedIn } from "@/lib/useBsportSignedIn";

/**
 * Renders children only when a BSport-related session is detected.
 * Login via the header BSport widget should populate storage; we re-check on an interval.
 */
export default function MemberProfileGate({ children }) {
  const signedIn = useBsportSignedIn();
  if (!signedIn) return null;
  return children;
}
