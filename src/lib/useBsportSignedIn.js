"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Heuristic: BSport / Auth0 often persist session in localStorage or sessionStorage.
 * Adjust patterns if your tenant uses different keys (see BSport docs or DevTools → Application).
 */
function storageLooksLoggedIn() {
  if (typeof window === "undefined") return false;

  const keyPatterns = [
    /bsport/i,
    /auth0/i,
    /access_token/i,
    /refresh_token/i,
    /id_token/i,
    /consumer.*token/i,
    /member.*session/i,
  ];

  const valuePatterns = [
    /^eyJ/, // JWT prefix
  ];

  function scan(store) {
    try {
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        if (!key) continue;
        if (keyPatterns.some((re) => re.test(key))) {
          const val = store.getItem(key);
          if (val && val.length > 8) return true;
        }
        const val = store.getItem(key);
        if (typeof val === "string" && valuePatterns.some((re) => re.test(val)))
          return true;
      }
    } catch {
      /* private mode / blocked */
    }
    return false;
  }

  if (scan(localStorage) || scan(sessionStorage)) return true;

  try {
    if (/bsport|auth0|access_token/i.test(document.cookie)) return true;
  } catch {
    /* ignore */
  }

  return false;
}

/**
 * True when we believe the user has an active BSport-related session.
 */
export function useBsportSignedIn() {
  const [signedIn, setSignedIn] = useState(false);

  const refresh = useCallback(() => {
    setSignedIn(storageLooksLoggedIn());
  }, []);

  useEffect(() => {
    refresh();

    const onStorage = (e) => {
      if (e.storageArea === localStorage || e.storageArea === sessionStorage)
        refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    /** BSport iframes may postMessage on auth changes (best-effort). */
    const onMessage = (event) => {
      if (typeof event.data !== "string" && typeof event.data !== "object")
        return;
      const raw =
        typeof event.data === "string"
          ? event.data
          : JSON.stringify(event.data);
      if (/login|logout|auth|token|bsport/i.test(raw)) refresh();
    };
    window.addEventListener("message", onMessage);

    const interval = window.setInterval(refresh, 2500);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("message", onMessage);
      window.clearInterval(interval);
    };
  }, [refresh]);

  return signedIn;
}
