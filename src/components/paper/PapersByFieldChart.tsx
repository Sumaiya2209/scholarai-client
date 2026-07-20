"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getPlatformStats } from "@/lib/api/home";

export function PapersByFieldChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: getPlatformStats,
  });

  if (isLoading) {
    return <div className="h-72 animate-pulse rounded-lg bg-parchment-line/60" />;
  }

  if (!data || data.fieldBreakdown.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg border border-dashed border-parchment-line">
        <p className="text-[13px] text-ink-faint">No approved papers yet to chart.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-parchment-line bg-white p-5">
      <h3 className="mb-4 font-display text-[15px] font-semibold text-ink">Approved papers by field</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data.fieldBreakdown} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD6C4" vertical={false} />
          <XAxis dataKey="field" tick={{ fontSize: 11, fill: "#6B6858" }} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 11, fill: "#6B6858" }} allowDecimals={false} />
          <Tooltip cursor={{ fill: "#1C2B3A0D" }} contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#DDD6C4" }} />
          <Bar dataKey="count" fill="#D98E2B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}