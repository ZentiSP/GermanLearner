import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)]">
      <h1 className="text-5xl font-bold text-[var(--luxury-gold)] mb-4">404</h1>
      <p className="text-xl text-[var(--luxury-black-2)] mb-8">Page Not Found</p>
      <Link href="/" className="text-[var(--luxury-gold-light)] underline">Go Home</Link>
    </div>
  );
}