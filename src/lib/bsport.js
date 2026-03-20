/**
 * BSport widget loader — mirrors their MountBsportWidget helper.
 * Waits for window.BsportWidget (CDN script) then mounts.
 */
export function mountBsportWidget(config, repeat = 1) {
  if (typeof window === "undefined") return;
  if (repeat > 50) return;
  if (!window.BsportWidget) {
    setTimeout(
      () => mountBsportWidget(config, repeat + 1),
      100 * repeat || 1
    );
    return;
  }
  window.BsportWidget.mount(config);
}
