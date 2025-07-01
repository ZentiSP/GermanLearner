import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]">
      {/* Navbar Placeholder */}
      <Navbar />

      {/* Main Container */}
      <div className="bg-[var(--transparent-50)] backdrop-blur-md backdrop-hue-rotate-180 rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-15 flex flex-col items-center gap-8 max-w-4xl w-full">
        <h1 className="text-3xl font-extrabold text-[var(--luxury-gold-light)] mb-2">
          Welcome to German Learner!
        </h1>
        <p className="text-[18px] text-neutral-500 hover:text-[var(--luxury-gold)] transition-colors duration-400 text-center mb-2">
          Start your journey to mastering German vocabulary. Choose an option
          below to manage your words or practice with flashcards.
        </p>
        <div className="flex gap-4 w-full justify-center">
          <Link href="/storage" className="block flex-1 max-w-xs group">
            <div className="w-min[200px] h-56 bg-[var(--luxury-black-2)] hover:bg-[var(--luxury-black-1)] border-[var(--luxury-black-2)] border-2 hover:border-[var(--luxury-gold)] transition-all duration-500 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer">
              {/* Storage Icon */}
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-3"
              >
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="10"
                  rx="2"
                  fill="#e5c97b"
                />
                <rect
                  x="7"
                  y="11"
                  width="10"
                  height="2"
                  rx="1"
                  fill="#23232a"
                />
                <rect
                  x="9"
                  y="13.5"
                  width="6"
                  height="1"
                  rx="0.5"
                  fill="#23232a"
                />
              </svg>
              <span className="text-2xl font-bold text-[var(--luxury-gold-light)] mb-1 transition-all duration-500">
                Storage
              </span>
              <span className="text-[var(--luxury-gold)] mb-2 transition-all duration-100">
                Manage your words
              </span>
            </div>
          </Link>
          <Link href="/flashcards" className="block flex-1 max-w-xs group">
            <div className="w-full h-56 bg-[var(--luxury-black-2)] hover:bg-[var(--luxury-black-1)] border-[var(--luxury-black-2)] border-2 hover:border-[var(--luxury-gold)] transition-all duration-500 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer p-6">
              {/* Flashcard Icon */}
              <svg
                className="mb-3 w-12 h-12 fill-current text-[var(--luxury-gold)] "
                viewBox="0 0 24 24"
              >
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <rect x="7" y="10" width="10" height="2" rx="1" />
                <rect x="9" y="13.5" width="6" height="1" rx="0.5" />
              </svg>
               <span className="text-2xl font-bold text-[var(--luxury-gold-light)] mb-1 transition-all duration-500">
                Flashcards
              </span>
              <span className="text-[var(--luxury-gold)] mb-2 transition-all duration-100">
                Learn and practice
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
