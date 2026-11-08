import TiltCard from "@/components/portfolio/TiltCard";

export default function ContactChannel({ channel }) {
  const Icon = channel.icon;
  const external = channel.href.startsWith("http");
  return (
    <TiltCard
      max={5}
      glareOnHover
      className={`relative rounded-xl border bg-card transition-colors motion-reduce:!transform-none [@media(hover:none)]:!transform-none ${
        channel.accent ? "border-primary/40" : "border-border"
      }`}
    >
      <a
        href={channel.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group flex items-center gap-4 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [@media(hover:hover)]:hover:bg-white/[0.02]"
      >
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border transition-colors ${
            channel.accent
              ? "border-primary/50 bg-primary/10 text-primary"
              : "border-border bg-background/50 text-muted-foreground group-hover:text-primary"
          }`}
        >
          <Icon size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {channel.label}
          </span>
          <span className="block truncate text-sm font-medium text-foreground">
            {channel.value}
          </span>
        </span>
      </a>
    </TiltCard>
  );
}