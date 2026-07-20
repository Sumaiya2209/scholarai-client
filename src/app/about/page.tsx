import { Container } from "@/components/ui/Container";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <Container className="max-w-3xl">
        <div className="space-y-8">
          <div>
            <h1 className="mb-2 font-display text-4xl font-bold text-ink">About ScholarAI</h1>
            <p className="text-ink-faint">Revolutionizing how researchers discover and understand academic papers</p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-ink">Our Mission</h2>
            <p className="leading-relaxed text-ink-muted">
              ScholarAI is dedicated to democratizing access to research knowledge. We believe that groundbreaking discoveries should be easily discoverable and understandable to everyone, regardless of their academic background. By combining powerful search capabilities with AI-powered summarization, we help researchers and students quickly find, understand, and learn from academic papers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-ink">What We Offer</h2>
            <ul className="space-y-3 text-ink-muted">
              <li className="flex gap-3">
                <span className="text-amber">✓</span>
                <span><strong>Paper Repository:</strong> A curated collection of peer-reviewed research papers across multiple fields</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber">✓</span>
                <span><strong>AI Summaries:</strong> Get instant AI-generated summaries of complex papers in plain language</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber">✓</span>
                <span><strong>Smart Search:</strong> Find papers by keywords, research fields, or topics with powerful filtering</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber">✓</span>
                <span><strong>Interactive Chat:</strong> Ask questions about papers and get answers grounded in the research</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber">✓</span>
                <span><strong>Community Contributions:</strong> Researchers can upload their own papers for peer review</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-ink">Why ScholarAI?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-parchment-line bg-parchment p-4">
                <h3 className="mb-2 font-semibold text-ink">Fast & Intuitive</h3>
                <p className="text-sm text-ink-muted">Find what you're looking for in seconds, not hours</p>
              </div>
              <div className="rounded-lg border border-parchment-line bg-parchment p-4">
                <h3 className="mb-2 font-semibold text-ink">AI-Powered Insights</h3>
                <p className="text-sm text-ink-muted">Get intelligent summaries and answers powered by advanced AI</p>
              </div>
              <div className="rounded-lg border border-parchment-line bg-parchment p-4">
                <h3 className="mb-2 font-semibold text-ink">Accessible to All</h3>
                <p className="text-sm text-ink-muted">Whether you're a student, researcher, or enthusiast, we make research accessible</p>
              </div>
              <div className="rounded-lg border border-parchment-line bg-parchment p-4">
                <h3 className="mb-2 font-semibold text-ink">Community Driven</h3>
                <p className="text-sm text-ink-muted">Built by researchers, for researchers worldwide</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-ink">How It Works</h2>
            <ol className="space-y-3 text-ink-muted">
              <li className="flex gap-3">
                <span className="font-semibold text-navy">1.</span>
                <span><strong>Explore:</strong> Browse through thousands of research papers across various fields</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-navy">2.</span>
                <span><strong>Understand:</strong> Read AI-generated summaries to quickly grasp the paper's key findings</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-navy">3.</span>
                <span><strong>Chat:</strong> Ask specific questions about the paper and get detailed answers</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-navy">4.</span>
                <span><strong>Share:</strong> Upload your own research for community discovery and peer review</span>
              </li>
            </ol>
          </section>

          <section className="rounded-lg border border-amber bg-amber/5 p-6">
            <h2 className="mb-2 font-display text-xl font-semibold text-ink">Join Our Community</h2>
            <p className="text-ink-muted">
              Whether you're a student looking to learn, a researcher sharing your work, or an academic exploring new fields, ScholarAI is your platform. Sign up today and start your research journey with us.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
