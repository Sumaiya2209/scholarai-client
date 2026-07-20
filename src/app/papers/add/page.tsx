"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/ui/AuthGuard";
import { Container } from "@/components/ui/Container";
import { Input, TextArea, Select } from "@/components/ui/Fields";
import { Button } from "@/components/ui/Button";
import { RESEARCH_FIELDS } from "@/lib/constants";
import { useCreatePaper } from "@/hooks/usePaperActions";

export default function AddPaperPage() {
  return (
    <AuthGuard>
      <AddPaperForm />
    </AuthGuard>
  );
}

function AddPaperForm() {
  const router = useRouter();
  const createPaper = useCreatePaper();

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are accepted");
      return;
    }
    if (selected.size > 15 * 1024 * 1024) {
      setError("File must be under 15MB");
      return;
    }
    setError("");
    setFile(selected);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!title || !abstract || !authors || !field || !file) {
      setError("All fields, including the PDF, are required");
      return;
    }

    try {
      const { paper } = await createPaper.mutateAsync({ title, abstract, authors, field, file });
      router.push(`/papers/${paper._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Container className="mx-auto max-w-2xl py-12">
      <h1 className="mb-1.5 font-display text-3xl font-semibold text-ink">Submit a paper</h1>
      <p className="mb-8 text-[13px] text-ink-faint">
        Your paper goes to an admin for review before it&apos;s published. You&apos;ll be notified once it&apos;s approved.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Attention Sparsity in Low-Resource Bengali NLP" />

        <TextArea label="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="A short summary of what your paper covers..." />

        <Input label="Authors" value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Md. Rahman , Mst Muskan(comma-separated)" />

        <Select label="Field" value={field} onChange={(e) => setField(e.target.value)}>
          <option value="">Select a field</option>
          {RESEARCH_FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </Select>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-ink-muted">Paper (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full rounded-md border border-dashed border-parchment-line bg-white px-3.5 py-3 text-[13px] text-ink-muted file:mr-3 file:rounded-md file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-[12px] file:font-medium file:text-parchment"
          />
          {file && <span className="text-[12px] text-teal">{file.name} selected</span>}
        </div>

        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <Button type="submit" disabled={createPaper.isPending} className="mt-2 w-full">
          {createPaper.isPending ? "Submitting…" : "Submit for review"}
        </Button>
      </form>
    </Container>
    </div>
  );
}