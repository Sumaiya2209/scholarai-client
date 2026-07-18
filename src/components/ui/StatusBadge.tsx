import { PaperStatus } from "@/types";

const styles: Record<PaperStatus, string> = {
  approved: "bg-teal/10 text-teal border-teal/30",
  pending: "bg-amber/10 text-amber-dark border-amber/30",
  rejected: "bg-red-500/10 text-red-700 border-red-500/30",
};

const labels: Record<PaperStatus, string> = {
  approved: "Approved",
  pending: "Pending review",
  rejected: "Rejected",
};

export function StatusBadge({ status }: { status: PaperStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
