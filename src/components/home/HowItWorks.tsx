import { FileArrowUp, CircleCheck, Sparkles, Comment } from "@gravity-ui/icons";
import { Container } from "@/components/ui/Container";

const steps = [
  { icon: FileArrowUp, title: "Upload your paper", description: "Submit your PDF along with a title, abstract, authors, and field." },
  { icon: CircleCheck, title: "Admin review", description: "An admin checks the submission before it goes public." },
  { icon: Sparkles, title: "AI summary & key points", description: "Once approved, AI generates a summary and key findings automatically." },
  { icon: Comment, title: "Readers can chat with it", description: "Visitors ask questions and get answers grounded in the paper's text." },
];

export function HowItWorks() {
  return (
    <Container className="py-14">
      <h2 className="mb-8 font-display text-2xl font-semibold text-ink">How it works</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-lg border border-parchment-line bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-parchment">
              <step.icon width={18} height={18} />
            </div>
            <div className="mb-1 font-mono text-[11px] text-ink-faint">STEP {i + 1}</div>
            <h3 className="mb-1.5 font-display text-[15px] font-semibold text-ink">{step.title}</h3>
            <p className="text-[13px] leading-relaxed text-ink-faint">{step.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}