import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-[var(--luxury-gold)] text-black font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors"
    >
      Sign Out
    </button>
  );
}