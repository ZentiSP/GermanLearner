import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

import GetStartBtn from "@/components/getStartBtn";
import Navbar from "@/components/navbar.js";

export default async function Flashcards() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    // Main Container
    <div
      className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]"
    >
     
      <div>
        <Navbar />
      </div>
      <main className="flex flex-1 items-center justify-center w-full pt-32 pb-12">
        <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-20 flex flex-col items-center gap-6 max-w-4xl w-full">
          {/* Custom Grid: 2 boxes on first row, 1 on second */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* First Box */}
            <Link
              href="/flashcards/daily"
              className="bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)] rounded-xl p-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-[var(--luxury-black-2)] hover:to-[var(--luxury-gold-light)] transition duration-700 focus:outline-none w-full min-w-[200px]"
            >
              <span className="text-2xl font-semibold text-[var(--luxury-gold-light)]">
                Daily Flashcards
              </span>
            </Link>
            {/* Second Box */}
            <Link
              href="/flashcards/random"
              className="bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)] rounded-xl p-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-[var(--luxury-black-2)] hover:to-[var(--luxury-gold)] transition duration-700 focus:outline-none w-full min-w-[200px]"
              tabIndex={0}
            >
              <span className="text-2xl font-semibold text-[var(--luxury-gold-light)]">
                Random Flashcards
              </span>
            </Link>
          </div>
          {/* Second row: single box centered */}
          <div className="flex justify-center w-full">
            <Link
              href="/flashcards/custom"
              className="bg-[var(--luxury-gold-light)] rounded-xl p-8 flex flex-col items-center justify-center w-full min-w-[200px]"
            >
              <span className="text-lg font-semibold text-[var(--luxury-black-2)]">
                Custom Flashcards
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
