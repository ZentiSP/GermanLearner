// filepath: src/app/about/page.js
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)] flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0">
      {/* Center Grid Box */}
      <main className="flex flex-1 items-center justify-center w-full pt-32 pb-12">
        <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-20 flex flex-col items-center gap-8 max-w-4xl w-full">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-center tracking-tight">
            About{" "}
            <span className="block text-[var(--luxury-gold)]">
              German Learner
            </span>
          </h1>

          <p className="text-lg text-neutral-500 hover:text-[var(--luxury-gold)] transition-colors duration-400 text-center mb-6">
            German Learner is a comprehensive flashcard system designed to help
            you master the German language. Whether you're a beginner or an
            advanced learner, our platform offers a wide range of features to
            enhance your learning experience. From customizable flashcards to
            spaced repetition algorithms, we provide the tools you need to
            succeed in your language journey.
          </p>
          <div className="flex gap-6 mt-4">
            <a
              href="#get-started"
              className="bg-[var(--luxury-gold)] text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors text-lg"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="border border-[var(--luxury-gold)] text-[var(--luxury-gold)] font-semibold px-8 py-3 rounded-full hover:bg-[color-mix(in_srgb,var(--luxury-gold)_10%,transparent)] transition-colors text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
