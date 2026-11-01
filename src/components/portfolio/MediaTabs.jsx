export default function MediaTabs({ tabs, active, onChange }) {
  return (
    <div role="tablist" aria-label="Project media" className="mt-4 flex flex-wrap gap-2">
      {tabs.map((tab, i) => {
        const on = i === active;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className={`rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
              on
                ? "border-cyan/60 bg-cyan/10 text-cyan"
                : "border-border text-muted-foreground hover:border-cyan/40 hover:text-ghost"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}