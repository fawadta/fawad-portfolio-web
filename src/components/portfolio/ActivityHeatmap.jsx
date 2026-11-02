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

export default function ActivityHeatmap({ weeks }) {
  return (
    <div className="mt-6 overflow-x-auto scrollbar-themed pb-2">
      <div className="inline-flex min-w-full flex-col gap-1.5">
        <div className="flex gap-[3px]">
          {weeks.map((week, i) => {
            const month = monthLabel(week[0].date);
            const previous = i > 0 ? monthLabel(weeks[i - 1][0].date) : null;
            return (
              <div key={week[0].date} className="w-[10px] shrink-0 sm:w-3">
                <span className="block h-3 overflow-visible whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {month !== previous ? month : ""}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-[3px]">
          {weeks.map((week) => (
            <div key={week[0].date} className="flex w-[10px] shrink-0 flex-col gap-[3px] sm:w-3">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={`h-[10px] w-[10px] rounded-[2px] border transition-colors sm:h-3 sm:w-3 ${
                    LEVELS[levelOf(day.count)]
                  }`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-end gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Less
          </span>
          {LEVELS.map((level) => (
            <span key={level} className={`h-[9px] w-[9px] rounded-[2px] border ${level}`} />
          ))}
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            More
          </span>
        </div>
      </div>
    </div>
  );
}