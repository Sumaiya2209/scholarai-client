"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FileArrowDown, Sparkles, Eye } from "@gravity-ui/icons";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PaperCard } from "@/components/ui/PaperCard";
import { ChatPanel } from "@/components/paper/ChatPanel";
import { citationId, fieldColor } from "@/lib/paperDisplay";
import { useSession } from "@/lib/auth-client";
import { usePaper, useRelatedPapers } from "@/hooks/usePaper";

export default function PaperDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = usePaper(id);
  const { data: related } = useRelatedPapers(id);
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-parchment-line" />
        <div className="mb-6 h-10 w-2/3 animate-pulse rounded bg-parchment-line" />
        <div className="h-64 animate-pulse rounded-lg bg-parchment-line" />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container className="py-20 text-center">
        <h1 className="mb-2 font-display text-2xl font-semibold text-ink">Paper not found</h1>
        <p className="text-[13px] text-ink-faint">
          It may not be approved yet, or the link is incorrect.{" "}
          <Link href="/explore" className="text-navy hover:underline">
            Browse papers →
          </Link>
        </p>
      </Container>
    );
  }

  const { paper } = data;
  const color = fieldColor(paper.field);
  const isOwnerOrAdmin =
    session &&
    ((typeof paper.uploadedBy === "object" ? paper.uploadedBy._id : paper.uploadedBy) === session.user.id ||
      (session.user as { role?: string }).role === "admin");

  return (
    <Container className="py-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`font-mono text-[12px] ${color.text}`}>
          [{citationId(paper._id)}] · {paper.field}
        </span>
        {isOwnerOrAdmin && <StatusBadge status={paper.status} />}
      </div>

      <h1 className="mb-2 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
        {paper.title}
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-faint">
        <span>{paper.authors.join(", ")}</span>
        <span className="flex items-center gap-1">
          <Eye width={14} height={14} /> {paper.views} views
        </span>
        <span>Submitted {new Date(paper.createdAt).toLocaleDateString()}</span>
      </div>

      <a
        href={paper.fileUrl}
        target="_blank"
        rel="noreferrer"
        className="mb-10 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-[13px] font-medium text-parchment transition-colors hover:bg-navy-dark"
      >
        <FileArrowDown width={16} height={16} />
        View / download PDF
      </a>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">Overview</h2>
            <p className="text-[14px] leading-relaxed text-ink-muted">{paper.abstract}</p>
          </section>

          {paper.aiSummary && (
            <section className="rounded-lg border border-teal/25 bg-teal/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles width={16} height={16} className="text-teal" />
                <h2 className="font-display text-[15px] font-semibold text-ink">AI Summary</h2>
              </div>
              <p className="mb-4 text-[13.5px] leading-relaxed text-ink-muted">{paper.aiSummary}</p>

              {paper.aiKeyPoints && paper.aiKeyPoints.length > 0 && (
                <>
                  <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-ink-faint">
                    Key points
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {paper.aiKeyPoints.map((point, i) => (
                      <li key={i} className="flex gap-2 text-[13px] text-ink-muted">
                        <span className="text-teal">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          <section>
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">Key information</h2>
            <dl className="grid grid-cols-2 gap-4 rounded-lg border border-parchment-line bg-white p-5 sm:grid-cols-4">
              <Spec label="Field" value={paper.field} />
              <Spec label="Citation ID" value={`[${citationId(paper._id)}]`} />
              <Spec label="Views" value={String(paper.views)} />
              <Spec label="Submitted" value={new Date(paper.createdAt).toLocaleDateString()} />
            </dl>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <ChatPanel paperId={paper._id} />
        </div>
      </div>

      {related && related.papers.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">Related papers</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.papers.map((p) => (
              <PaperCard key={p._id} paper={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-0.5 text-[11px] uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="text-[13px] font-medium text-ink">{value}</dd>
    </div>
  );
}