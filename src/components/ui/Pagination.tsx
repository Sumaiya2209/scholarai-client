interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-parchment-line px-3 py-1.5 text-[13px] text-ink-muted disabled:opacity-40 hover:enabled:border-navy hover:enabled:text-navy transition-colors"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`h-8 w-8 rounded-md text-[13px] transition-colors ${
            p === page ? "bg-navy text-parchment" : "text-ink-muted hover:bg-navy/5"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-md border border-parchment-line px-3 py-1.5 text-[13px] text-ink-muted disabled:opacity-40 hover:enabled:border-navy hover:enabled:text-navy transition-colors"
      >
        Next
      </button>
    </div>
  );
}