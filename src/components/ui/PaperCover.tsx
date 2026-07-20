import { Cpu, Globe, Flask, GraduationCap, BookOpen, Layers } from "@gravity-ui/icons";
import { fieldColor, fieldIconKey, citationId, FieldIconKey } from "@/lib/paperDisplay";

const ICONS: Record<FieldIconKey, typeof Cpu> = {
  cpu: Cpu,
  globe: Globe,
  flask: Flask,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  layers: Layers,
};

export function PaperCover({ paperId, field }: { paperId: string; field: string }) {
  const color = fieldColor(field);
  const Icon = ICONS[fieldIconKey(field)];

  return (
    <div
      className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-t-lg"
      style={{ background: `linear-gradient(135deg, ${color.border}22, ${color.border}0D)` }}
    >
      <span className="pointer-events-none absolute -bottom-3 -right-2 select-none font-display text-[52px] font-semibold" style={{ color: `${color.border}1A` }}>
        {citationId(paperId).replace("SA-", "")}
      </span>
      <Icon width={30} height={30} style={{ color: color.border }} />
    </div>
  );
}