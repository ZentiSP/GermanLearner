import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div>
        {/* Navbar Placeholder */}
        <Navbar />
      </div>
      {/* Main Container */}
      <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-15 flex flex-col items-center gap-8 max-w-4xl w-full">
        <h1 className="text-3xl font-extrabold text-[var(--luxury-gold-light)] mb-2">
          Welcome to German Learner!
        </h1>
        <p className="text-[18px] text-neutral-500 hover:text-[var(--luxury-gold)] transition-colors duration-400 text-center mb-2">
          Start your journey to mastering German vocabulary. Choose an option
          below to manage your words or practice with flashcards.
        </p>
        <div className="flex gap-10 w-full justify-center">
          <Link href="/storage" className="block flex-1 max-w-xs group">
            <div className="w-full h-56 bg-[var(--luxury-black-2)] hover:bg-[var(--luxury-gold-light)] transition-all duration-350 rounded-xl shadow-lg flex flex-col justify-center items-center hover:scale-105 cursor-pointer p-6">
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
              <span className="text-2xl font-bold text-[var(--luxury-gold-light)] mb-1 group-hover:text-[var(--luxury-black-1)] transition-all duration-100">
                Storage
              </span>
              <span className="text-[var(--luxury-gold)] mb-2 group-hover:text-[var(--luxury-black-1)] transition-all duration-100">
                Manage your words
              </span>
            </div>
          </Link>
          <Link href="/flashcard" className="block flex-1 max-w-xs group">
            <div className="w-full h-56 bg-[var(--luxury-black-2)] rounded-xl shadow-lg flex flex-col justify-center items-center p-6 hover:bg-[var(--luxury-gold-light)] hover:scale-105 transition-all duration-350 cursor-pointer">
              {/* Flashcard Icon */}
              <svg
                className="mb-3 w-12 h-12 fill-current text-[var(--luxury-gold)] group-hover:text-[var(--luxury-black-1)] transition-colors duration-300"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <rect x="7" y="10" width="10" height="2" rx="1" />
                <rect x="9" y="13.5" width="6" height="1" rx="0.5" />
              </svg>
              <span className="text-2xl font-bold text-[var(--luxury-gold-light)] mb-1 group-hover:text-[var(--luxury-black-1)] transition-all duration-100">
                Flash Card
              </span>
              <span className="text-[var(--luxury-gold)] mb-2 group-hover:text-[var(--luxury-black-1)] transition-all duration-100">
                Practice & Learn
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
