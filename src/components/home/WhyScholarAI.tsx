import { Globe, ShieldCheck, Sparkles } from "@gravity-ui/icons";
import { Container } from "@/components/ui/Container";

const features = [
  { icon: Globe, title: "Open access", description: "Every approved paper is free to read — no paywall, no login required to browse." },
  { icon: ShieldCheck, title: "Admin reviewed", description: "Nothing goes public without a human checking it first, keeping the archive credible." },
  { icon: Sparkles, title: "AI-powered reading", description: "Get a summary and key points instantly, or ask the paper questions directly." },
];

export function WhyScholarAI() {
  return (
    <div className="border-y border-parchment-line bg-white">
      <Container className="py-14">
        <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Why ScholarAI</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber/15 text-amber-dark">
                <f.icon width={22} height={22} />
              </div>
              <h3 className="mb-1.5 font-display text-[16px] font-semibold text-ink">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-ink-faint">{f.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}