"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const loggedOutLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const loggedInLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/papers/add", label: "Add paper" },
  { href: "/dashboard/manage", label: "Manage papers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const links = session ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-navy-dark bg-navy">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-parchment">
          ScholarAI
        </Link>

        <nav className="hidden items-center gap-7 text-[16px] font-medium text-[#B9C2CB] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-amber" : "hover:text-parchment transition-colors"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-white/10" />
          ) : session ? (
            <>
              <span className="hidden text-[15px] font-medium text-[#B9C2CB] sm:inline">{session.user.name}</span>
              <Button
                variant="outline-light"
                size="md"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                  router.refresh();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" size="md" href="/login">
                Log in
              </Button>
              <Button variant="primary" size="md" href="/register">
                Sign up
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}