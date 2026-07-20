"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PaperCard } from "@/components/ui/PaperCard";
import { PaperGridSkeleton } from "@/components/ui/PaperCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";
import { Input, Select } from "@/components/ui/Fields";
import { RESEARCH_FIELDS } from "@/lib/constants";
import { usePapers } from "@/hooks/usePapers";

type SortOption = "newest" | "oldest" | "mostViewed";
type DateRange = "" | "week" | "month" | "year";

export default function ExplorePage() {
  return (
    <Suspense fallback={<Container className="py-10"><PaperGridSkeleton count={12} /></Container>}>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [field, setField] = useState(searchParams.get("field") || "");
  const [dateRange, setDateRange] = useState<DateRange>((searchParams.get("dateRange") as DateRange) || "");
  const [sort, setSort] = useState<SortOption>((searchParams.get("sort") as SortOption) || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  function handleFieldChange(value: string) {
    setField(value);
    setPage(1);
  }

  function handleDateRangeChange(value: DateRange) {
    setDateRange(value);
    setPage(1);
  }

  function handleSortChange(value: SortOption) {
    setSort(value);
    setPage(1);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (field) params.set("field", field);
    if (dateRange) params.set("dateRange", dateRange);
    if (sort !== "newest") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    router.replace(`/explore${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }, [debouncedSearch, field, dateRange, sort, page, router]);

  const { data, isLoading, isFetching } = usePapers({
    search: debouncedSearch,
    field,
    dateRange,
    sort,
    page,
    limit: 12,
  });

  return (
    <Container className="py-10">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink">Explore papers</h1>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_180px_170px_170px]">
        <Input
          placeholder="Search by title, author, or field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={field} onChange={(e) => handleFieldChange(e.target.value)}>
          <option value="">All fields</option>
          {RESEARCH_FIELDS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </Select>
        <Select value={dateRange} onChange={(e) => handleDateRangeChange(e.target.value as DateRange)}>
          <option value="">Any time</option>
          <option value="week">Past week</option>
          <option value="month">Past month</option>
          <option value="year">Past year</option>
        </Select>
        <Select value={sort} onChange={(e) => handleSortChange(e.target.value as SortOption)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="mostViewed">Most viewed</option>
        </Select>
      </div>

      {isLoading ? (
        <PaperGridSkeleton count={12} />
      ) : data && data.papers.length > 0 ? (
        <>
          <p className="mb-4 text-[13px] text-ink-faint">
            {data.pagination.total} paper{data.pagination.total !== 1 ? "s" : ""} found
            {isFetching && " · updating…"}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.papers.map((paper) => (
              <PaperCard key={paper._id} paper={paper} />
            ))}
          </div>
          <Pagination page={page} totalPages={data.pagination.totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-parchment-line py-16 text-center">
          <p className="text-[14px] text-ink-faint">No papers match your search. Try a different filter.</p>
        </div>
      )}
    </Container>
  );
}