import { useEffect, useRef, useState } from "react";

const LEVELS = [
  "border-border bg-white/[0.04]",
  "border-cyan/20 bg-cyan/20",
  "border-cyan/30 bg-cyan/40",
  "border-cyan/40 bg-cyan/70",
  "border-cyan/60 bg-cyan",
];

const levelOf = (count) => {
  if (count <= 0) return 0;
  if (count < 4) return 1;
  if (count < 8) return 2;
  if (count < 14) return 3;
  return 4;
};

const monthLabel = (date) =>
  new Date(date).toLocaleString("en-US", { month: "short", timeZone: "UTC" });

// Cells light up in reading order and finish filling inside ~1.6s.
const FILL_MS = 1600;

export default function ActivityHeatmap({ weeks }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const columns = { gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` };
  const total = weeks.reduce((sum, week) => sum + week.length, 0);
  const step = Math.min(4, FILL_MS / Math.max(total, 1));
  const offsets = weeks.reduce((acc, week) => [...acc, acc[acc.length - 1] + week.length], [0]);

  return (
    <div className="mt-5 w-full overflow-x-auto scrollbar-themed pb-2">
      <div ref={ref} className="mx-auto w-full min-w-[540px] max-w-[900px]">
        <div className="grid gap-[3px]" style={columns}>
          {weeks.map((week, i) => {
            const month = monthLabel(week[0].date);
            const previous = i > 0 ? monthLabel(weeks[i - 1][0].date) : null;
            return (
              <span
                key={week[0].date}
                className="block h-3 overflow-visible whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {month !== previous ? month : ""}
              </span>
            );
          })}
        </div>

        <div className="mt-1 grid gap-[3px]" style={columns}>
          {weeks.map((week, wi) => (
            <div key={week[0].date} className="flex flex-col gap-[3px]">
              {week.map((day, di) => {
                const level = levelOf(day.count);
                return (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className={`aspect-square w-full rounded-[2px] border transition-colors duration-300 ${
                      revealed ? LEVELS[level] : LEVELS[0]
                    }`}
                    style={
                      revealed
                        ? { transitionDelay: `${Math.round((offsets[wi] + di) * step)}ms` }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Less
          </span>
          {LEVELS.map((level) => (
            <span key={level} className={`h-[10px] w-[10px] rounded-[2px] border ${level}`} />
          ))}
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            More
          </span>
        </div>
      </div>
    </div>
  );
}