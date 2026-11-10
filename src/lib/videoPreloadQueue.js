// Deferred, one-at-a-time warm-up for YouTube players.
//
// A player is expensive: player script, player heap, and its cookies. Mounting
// every player with the page is what hurt mobile; mounting them only on click
// makes pressing play feel slow. So they are mounted one by one, only after the
// page has finished loading, in the order the visitor will most likely reach
// them — each player asks to be warmed up as it gets near the viewport.
const FIRST_DELAY = 900;
const GAP = 800;

let queue = [];
let timer = null;
let armed = false;

const canPreload = () => {
  if (typeof navigator === "undefined") return false;
  const connection = navigator.connection;
  if (connection?.saveData) return false;
  const type = connection?.effectiveType;
  return !type || !/(^|-)2g$/.test(type);
};

const pump = () => {
  if (timer || !queue.length) return;
  if (document.visibilityState !== "visible") return;
  timer = window.setTimeout(() => {
    timer = null;
    const task = queue.shift();
    if (task) task.mount();
    pump();
  }, GAP);
};

const arm = () => {
  if (armed) return;
  armed = true;

  const begin = () => window.setTimeout(pump, FIRST_DELAY);
  if (document.readyState === "complete") begin();
  else window.addEventListener("load", begin, { once: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") pump();
  });
};

export function requestVideoPreload(mount) {
  if (!canPreload()) return;
  arm();
  if (queue.some((task) => task.mount === mount)) return;
  queue.push({ mount });
  pump();
}

export function cancelVideoPreload(mount) {
  queue = queue.filter((task) => task.mount !== mount);
}