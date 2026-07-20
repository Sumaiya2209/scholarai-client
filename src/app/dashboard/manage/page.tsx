"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PapersByFieldChart } from "@/components/paper/PapersByFieldChart";
import { citationId } from "@/lib/paperDisplay";
import { useSession } from "@/lib/auth-client";
import { useMyPapers } from "@/hooks/useMyPapers";
import { useDeletePaper } from "@/hooks/usePaperActions";
import { usePendingPapers, useApprovePaper, useRejectPaper } from "@/hooks/useAdminPapers";
import { Paper } from "@/types";
import Link from "next/link";

type Tab = "mine" | "pending" | "analytics";

export default function ManagePapersPage() {
  return (
    <AuthGuard>
      <ManageContent />
    </AuthGuard>
  );
}

function ManageContent() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const [tab, setTab] = useState<Tab>("mine");

  return (
    <Container className="py-10">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink">Manage papers</h1>

      {isAdmin && (
        <div className="mb-6 flex gap-1 border-b border-parchment-line">
          <TabButton active={tab === "mine"} onClick={() => setTab("mine")}>My papers</TabButton>
          <TabButton active={tab === "pending"} onClick={() => setTab("pending")}>Pending approvals</TabButton>
          <TabButton active={tab === "analytics"} onClick={() => setTab("analytics")}>Analytics</TabButton>
        </div>
      )}

      {tab === "mine" && <MyPapersTable />}
      {tab === "pending" && <PendingApprovalsTable />}
      {tab === "analytics" && <PapersByFieldChart />}
    </Container>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-[13px] font-medium transition-colors ${
        active ? "border-b-2 border-amber text-ink" : "text-ink-faint hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function MyPapersTable() {
  const { data, isLoading } = useMyPapers();
  const deletePaper = useDeletePaper();

  if (isLoading) return <TableSkeleton />;

  if (!data || data.papers.length === 0) {
    return <EmptyState message="You haven't submitted any papers yet." ctaLabel="Submit your first paper" ctaHref="/papers/add" />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-parchment-line bg-white">
      <table className="w-full text-left text-[13px]">
        <thead className="border-b border-parchment-line bg-parchment/50 text-[11px] uppercase tracking-wide text-ink-faint">
          <tr>
            <th className="px-4 py-3 font-medium">Paper</th>
            <th className="px-4 py-3 font-medium">Field</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Views</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.papers.map((paper) => (
            <tr key={paper._id} className="border-b border-parchment-line last:border-0">
              <td className="px-4 py-3">
                <div className="font-mono text-[11px] text-ink-faint">[{citationId(paper._id)}]</div>
                <div className="font-medium text-ink">{paper.title}</div>
                {paper.status === "rejected" && paper.rejectionReason && (
                  <div className="mt-0.5 text-[11px] text-red-600">Reason: {paper.rejectionReason}</div>
                )}
              </td>
              <td className="px-4 py-3 text-ink-muted">{paper.field}</td>
              <td className="px-4 py-3"><StatusBadge status={paper.status} /></td>
              <td className="px-4 py-3 text-ink-muted">{paper.views}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  {paper.status === "approved" && (
                    <Link href={`/papers/${paper._id}`} className="text-navy hover:underline">View</Link>
                  )}
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${paper.title}"? This can't be undone.`)) {
                        deletePaper.mutate(paper._id);
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PendingApprovalsTable() {
  const { data, isLoading } = usePendingPapers();
  const approvePaper = useApprovePaper();
  const rejectPaper = useRejectPaper();

  if (isLoading) return <TableSkeleton />;

  if (!data || data.papers.length === 0) {
    return <EmptyState message="No papers waiting for review right now." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.papers.map((paper: Paper) => (
        <div key={paper._id} className="rounded-lg border border-parchment-line bg-white p-4">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] text-ink-faint">[{citationId(paper._id)}] · {paper.field}</div>
              <h3 className="font-display text-[15px] font-semibold text-ink">{paper.title}</h3>
              <p className="mt-1 text-[12px] text-ink-faint">
                by {paper.authors.join(", ")} · {typeof paper.uploadedBy === "object" ? paper.uploadedBy.name : "Unknown"}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const reason = prompt("Reason for rejection (optional):") || "";
                  rejectPaper.mutate({ paperId: paper._id, reason });
                }}
              >
                Reject
              </Button>
              <Button size="sm" onClick={() => approvePaper.mutate(paper._id)} disabled={approvePaper.isPending}>
                Approve
              </Button>
            </div>
          </div>
          <p className="line-clamp-2 text-[12.5px] text-ink-faint">{paper.abstract}</p>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message, ctaLabel, ctaHref }: { message: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-parchment-line py-16 text-center">
      <p className="mb-4 text-[14px] text-ink-faint">{message}</p>
      {ctaLabel && ctaHref && <Button href={ctaHref}>{ctaLabel}</Button>}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-lg bg-parchment-line/60" />
      ))}
    </div>
  );
}