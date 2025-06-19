"use client";

import { SessionProvider } from "next-auth/react";

// This wraps the whole app with the session context on the client
export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
