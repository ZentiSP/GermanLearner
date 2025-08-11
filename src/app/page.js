import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import GetStartBtn from "@/components/getStartBtn";
import Navbar from "@/components/navbar.js";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // 🔒 If user is already logged in, redirect
  if (session) {
    redirect("/start");
  }

  return (
    // Main Container
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]">
      {/* Center Grid Box */}
      <div>
        <Navbar />
      </div>
      <main className="flex flex-1 items-center justify-center w-full pt-32 pb-12">
        <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-20 flex flex-col items-center gap-8 max-w-4xl w-full">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center tracking-tight">
            Willkommen zum{" "}
            <span className="block text-[var(--luxury-gold)]">
              German Learner
            </span>
          </h1>
          <p className="text-[18px] text-neutral-500 hover:text-[var(--luxury-gold)] transition-colors duration-400 text-center mb-6">
            Start your journey to mastering German with our comprehensive
            flashcard system. Whether you&apos;re a beginner{" "}
            <span className="text-[22px] text-[var(--luxury-gold-light)]">
              [ Because I&apos;m a beginner ]
            </span>{" "}
            or looking to refine your skills, German Learner is designed to help
            you learn effectively
          </p>
          <GetStartBtn />
        </div>
      </main>
    </div>
  );
}
