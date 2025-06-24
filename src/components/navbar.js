"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  // console.log("Session:", session);

  const user = session?.user;

  // console.log("Session in Navbar:", session);
  // console.log("Status in Navbar:", status);

  return (
    <nav className="w-full max-w-5xl mx-auto flex justify-center items-center py-6 bg-[var(--transparent-50)] rounded-b-2xl shadow-lg border-b border-neutral-800 fixed top-0 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center space-x-8 justify-center w-full max-w-5xl px-6">
        <div>
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white tracking-wide hover:text-[var(--luxury-gold)] transition-colors"
          >
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={32}
              height={32}
              className="dark:invert"
            />
            German Learner
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#Flashcards"
            className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-1 rounded"
          >
            Flashcards
          </a>
          <a
            href="#Storage"
            className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-1 rounded"
          >
            Storage
          </a>
          <a
            href="/about"
            className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-1 rounded"
          >
            About
          </a>

          {status === "authenticated" && (
            <>
              <span className="text-sm text-neutral-400 sm:inline">
                {user?.id || "User"}
              </span>
              <button
                onClick={() => signOut()}
                className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-1 rounded border border-neutral-700 hover:border-[var(--luxury-gold)]"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
