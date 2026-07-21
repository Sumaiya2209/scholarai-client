import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL is omitted so it defaults to relative "/api/auth" on the same origin.
  // Next.js rewrites in next.config.ts will proxy these requests to the backend.
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
