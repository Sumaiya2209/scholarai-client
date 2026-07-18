import Link from "next/link";
import { Paper } from "@/types";
import { citationId, fieldColor } from "@/lib/paperDisplay";
import { StatusBadge } from "./StatusBadge";

export function PaperCard({ paper, showStatus = false }: { paper: Paper; showStatus?: boolean }) {
  const color = fieldColor(paper.field);

  return (
    <Link
      href={`/papers/${paper._id}`}
      className="group flex flex-col rounded-r-lg rounded-l-none border border-parchment-line bg-white p-4 transition-shadow hover:shadow-[0_4px_16px_rgba(28,43,58,0.08)]"
      style={{ borderLeft: `3px solid ${color.border}` }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={`font-mono text-[11px] ${color.text}`}>
          [{citationId(paper._id)}] · {paper.field}
        </span>
        {showStatus && <StatusBadge status={paper.status} />}
      </div>
      <h3 className="mb-1.5 font-display text-base font-semibold leading-snug text-ink group-hover:underline">
        {paper.title}
      </h3>
      <p className="mb-3 line-clamp-2 text-[13px] leading-relaxed text-ink-faint">{paper.abstract}</p>
      <div className="mt-auto flex items-center justify-between text-[11px] text-ink-faint">
        <span>{paper.authors.slice(0, 2).join(", ")}{paper.authors.length > 2 ? " et al." : ""}</span>
        <span>{paper.views} views</span>
      </div>
    </Link>
  );
}
