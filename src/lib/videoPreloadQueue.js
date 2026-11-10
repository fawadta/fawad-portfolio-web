import { afterPageLoad } from "@/lib/afterPageLoad";

// All registered players load in document order, never in viewport order.
// A hard gate prevents registration from starting work before the page loads.
let queue = [];
let ready = false;
let armed = false;
let scheduled = false;
let running = false;

const pump = () => {
  if (!ready || running || scheduled || !queue.length || document.hidden) return;
  scheduled = true;
  window.setTimeout(() => {
    const run = () => {
      scheduled = false;
      if (document.hidden || !queue.length) return;
      const mount = queue.shift();
      running = true;
      let finished = false;
      let watchdog;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(watchdog);
        running = false;
        pump();
      };
      // A failed external frame must not hold up every remaining video.
      watchdog = window.setTimeout(finish, 15000);
      Promise.resolve(mount()).then(finish, finish);
    };
    if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 1500 });
    else run();
  }, 500);
};

export function requestVideoPreload(mount) {
  if (!queue.includes(mount)) queue.push(mount);
  if (!armed) {
    armed = true;
    afterPageLoad(() => { ready = true; pump(); });
    document.addEventListener("visibilitychange", pump);
  }
  pump();
}

export function cancelVideoPreload(mount) {
  queue = queue.filter((task) => task !== mount);
}