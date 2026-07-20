"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function AuthGuard({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (requireAdmin && (session.user as { role?: string }).role !== "admin") {
      router.replace("/");
    }
  }, [session, isPending, requireAdmin, router]);

  if (isPending || !session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-parchment-line border-t-navy" />
      </div>
    );
  }

  return <>{children}</>;
}