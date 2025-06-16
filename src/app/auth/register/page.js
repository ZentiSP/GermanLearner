"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/auth/signin");
    } catch (err) {
      
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]">
      <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xl border border-neutral-800 p-10 sm:p-16 flex flex-col items-center gap-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">
          Register
        </h1>
        {error && (
          <div className="w-full bg-red-500/20 text-red-300 px-4 py-2 rounded mb-2 text-center text-sm">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4 w-full" onSubmit={handleRegister}>
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
            minLength={6}
            className="px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-[var(--luxury-gold)] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--luxury-gold)] text-black font-semibold py-3 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors text-lg mt-2 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-neutral-400 text-sm mt-2">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-[var(--luxury-gold)] hover:underline"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
