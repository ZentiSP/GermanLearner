// src/app/auth/signin/page.js
"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]">
      <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xl border border-neutral-800 p-10 sm:p-16 flex flex-col items-center gap-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">
          Sign In
        </h1>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-[var(--luxury-gold)] text-black font-semibold py-3 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors text-lg mb-4"
        >
          Sign in with Google
        </button>
        <div className="w-full border-t border-neutral-700 my-2"></div>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            await signIn("credentials", {
              email,
              password,
              callbackUrl: "/",
            });
          }}
        >
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-[var(--luxury-gold)] transition"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-[var(--luxury-gold)] transition"
          />
          <button
            type="submit"
            className="w-full bg-[var(--luxury-gold)] text-black font-semibold py-3 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors text-lg mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
