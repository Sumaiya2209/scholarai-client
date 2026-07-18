import Link from "next/link";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-parchment-line bg-navy text-parchment">
      <Container className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 font-display text-2xl font-bold">ScholarAI</div>
          <p className="text-[14px] leading-relaxed text-[#B0BAC5]">
            An open archive for student and early-career research, reviewed by admins and
            summarized by AI.
          </p>
        </div>

        <div>
          <div className="mb-4 text-[15px] font-semibold text-parchment">Platform</div>
          <ul className="flex flex-col gap-2.5 text-[15px] text-[#C7CDD5]">
            <li><Link href="/explore" className="hover:text-amber transition-colors">Explore papers</Link></li>
            <li><Link href="/papers/add" className="hover:text-amber transition-colors">Submit a paper</Link></li>
            <li><Link href="/about" className="hover:text-amber transition-colors">About</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-[15px] font-semibold text-parchment">Support</div>
          <ul className="flex flex-col gap-2.5 text-[15px] text-[#C7CDD5]">
            <li><Link href="/contact" className="hover:text-amber transition-colors">Contact us</Link></li>
            <li><a href="mailto:hello@scholarai.app" className="hover:text-amber transition-colors">hello@scholarai.app</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-[15px] font-semibold text-parchment">Follow</div>
          <ul className="flex flex-col gap-2.5 text-[15px] text-[#C7CDD5]">
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber transition-colors">GitHub</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-amber transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container>
          <p className="text-[13px] text-[#8B95A3]">© {new Date().getFullYear()} ScholarAI. Built as a course project.</p>
        </Container>
      </div>
    </footer>
  );
}