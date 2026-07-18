"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PaperCard } from "@/components/ui/PaperCard";
import { PaperGridSkeleton } from "@/components/ui/PaperCardSkeleton";
import { usePapers } from "@/hooks/usePapers";

export function RecentlyApproved() {
  const { data, isLoading } = usePapers({ sort: "newest", limit: 4 });

  return (
    <Container className="py-14">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Recently approved</h2>
        <Link href="/explore" className="text-[13px] text-ink-faint hover:text-navy transition-colors">
          View all →
        </Link>
      </div>

      {isLoading ? (
        <PaperGridSkeleton count={4} />
      ) : data && data.papers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.papers.map((paper) => (
            <PaperCard key={paper._id} paper={paper} />
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-ink-faint">
          No approved papers yet — be the first to submit one.
        </p>
      )}
    </Container>
  );
}