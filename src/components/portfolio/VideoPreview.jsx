import { Play } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function VideoPreview({ videoId, title, onPlay, active }) {
  return (
    <button type="button" onClick={onPlay} tabIndex={active ? 0 : -1}
      aria-label={`Play on YouTube: ${title}`}
      className="group absolute inset-0 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <Image src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" aria-hidden="true"
        loading="lazy" decoding="async" fittingType="fill" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-background/90 to-transparent px-4 pb-10 pt-3 text-sm font-medium text-foreground">
        {title}
      </span>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-12 w-[68px] place-items-center rounded-xl bg-destructive text-destructive-foreground transition-opacity group-hover:opacity-90">
          <Play size={28} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </span>
      </span>
      <span className="absolute bottom-3 right-3 rounded bg-background/80 px-2 py-1 text-sm font-bold tracking-tight text-foreground">YouTube</span>
    </button>
  );
}