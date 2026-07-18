export function PaperCardSkeleton() {
  return (
    <div className="flex flex-col rounded-r-lg rounded-l-none border border-parchment-line bg-white p-4" style={{ borderLeft: "3px solid #DDD6C4" }}>
      <div className="mb-3 h-3 w-24 animate-pulse rounded bg-parchment-line" />
      <div className="mb-2 h-4 w-full animate-pulse rounded bg-parchment-line" />
      <div className="mb-3 h-3 w-4/5 animate-pulse rounded bg-parchment-line" />
      <div className="mb-3 h-3 w-full animate-pulse rounded bg-parchment-line" />
      <div className="mt-auto flex justify-between">
        <div className="h-3 w-20 animate-pulse rounded bg-parchment-line" />
        <div className="h-3 w-12 animate-pulse rounded bg-parchment-line" />
      </div>
    </div>
  );
}

export function PaperGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <PaperCardSkeleton key={i} />
      ))}
    </div>
  );
}
