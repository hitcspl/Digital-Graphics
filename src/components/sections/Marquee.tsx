const tokens = [
  "Brand Identity",
  "Marketing Campaigns",
  "Social Media",
  "Content Strategy",
  "Video Editing",
  "Visual Storytelling",
  "Creative Direction",
  "Web Experiences",
  "Proud Moments",
  "Campaign Design",
  "Motion Graphics",
  "Editorial Design",
];

function Row({ text, reverse, bg, fg }: { text: string[]; reverse?: boolean; bg: string; fg: string }) {
  const line = (
    <span className="flex shrink-0 items-center">
      {text.map((t, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="px-8 text-sm font-medium uppercase tracking-[0.28em] md:text-base">{t}</span>
          <span className="font-serif text-2xl italic">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`overflow-hidden ${bg} ${fg} py-5`}>
      <div className={`flex w-max ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {line}{line}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="border-y border-border/40">
      <Row text={tokens} bg="bg-foreground" fg="text-background" />
    </div>
  );
}