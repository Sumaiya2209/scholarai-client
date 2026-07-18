"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlatformStats } from "@/lib/api/home";
import { Container } from "@/components/ui/Container";
import { useCountUp } from "@/hooks/useCountUp";

export function PlatformStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: getPlatformStats,
  });

  const items = [
    { label: "Papers approved", value: data?.approvedPapers ?? 0 },
    { label: "Research fields covered", value: data?.fieldsCount ?? 0 },
    { label: "Total paper views", value: data?.totalViews ?? 0 },
    { label: "AI summaries generated", value: data?.summariesGenerated ?? 0 },
  ];

  return (
    <div className="bg-navy">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} active={!isLoading} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function StatCard({ value, label, active }: { value: number; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="rounded-lg bg-white/5 p-6 text-center">
      <div className="font-display text-4xl font-semibold text-parchment">{count.toLocaleString()}</div>
      <div className="mt-1.5 text-[13px] text-[#9AA5B1]">{label}</div>
    </div>
  );
}