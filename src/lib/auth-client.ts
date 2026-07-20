import { createAuthClient } from "better-auth/react";

// NEXT_PUBLIC_* vars are baked into the bundle at Vercel build time.
// The fallback ensures auth works in production even if the env var is missing.
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://scholarai-server.vercel.app";

export const authClient = createAuthClient({
  baseURL: apiBaseUrl,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
