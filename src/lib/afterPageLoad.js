// Wait for the document to finish, give the first screen time to paint, then
// yield to browser work. This is independent of scroll position and visibility.
export function afterPageLoad(callback) {
  let timer;
  let idle;
  let cancelled = false;
  const run = () => { if (!cancelled) callback(); };
  const loaded = () => {
    timer = window.setTimeout(() => {
      if (window.requestIdleCallback) idle = window.requestIdleCallback(run, { timeout: 1500 });
      else run();
    }, 1000);
  };
  if (document.readyState === "complete") loaded();
  else window.addEventListener("load", loaded, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", loaded);
    window.clearTimeout(timer);
    if (idle !== undefined) window.cancelIdleCallback?.(idle);
  };
}