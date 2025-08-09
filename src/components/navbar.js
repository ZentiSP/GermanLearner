"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Install lucide-react if not already

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = session?.user;

  return (
    <nav className="w-full max-w-5xl mx-auto flex justify-between items-center py-4 px-6 bg-black/35 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-neutral-800 fixed top-0 left-1/2 -translate-x-1/2 z-10">
      {/* Logo */}
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

      {/* Hamburger button (Mobile only) */}
      <button
        className="sm:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Nav Links */}
      <div
        className={`flex-col sm:flex-row sm:flex items-center gap-4 absolute sm:static top-16 left-0 w-full sm:w-auto bg-[var(--transparent-50)] sm:bg-transparent px-6 sm:px-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <a
          href="/flashcards"
          className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-2"
        >
          Flashcards
        </a>
        <a
          href="/storage"
          className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-2"
        >
          Storage
        </a>
        <a
          href="/about"
          className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-2"
        >
          About
        </a>

        {status === "authenticated" && (
          <>
            <span className="text-sm text-neutral-400">{user?.id}</span>
            <button
              onClick={() => signOut()}
              className="text-base text-neutral-300 hover:text-[var(--luxury-gold)] transition-colors px-3 py-1 border border-neutral-700 hover:border-[var(--luxury-gold)] rounded"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
