import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <Container className="py-16">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-navy px-8 py-14 text-center">
        <h2 className="max-w-md font-display text-3xl font-semibold text-parchment">
          Have research worth sharing?
        </h2>
        <p className="max-w-sm text-[14px] text-[#B9C2CB]">
          Submit your paper and let readers discover it — with an AI summary and chat built in.
        </p>
        <Button href="/papers/add" size="md" className="mt-2">
          Submit your paper
        </Button>
      </div>
    </Container>
  );
}