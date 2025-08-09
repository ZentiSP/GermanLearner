"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function RandomFlashcards() {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // "known" or "unknown"

  // Fetch 10 random flashcards
  async function fetchRandomCards() {
    setLoading(true);
    setAnswers([]);
    setCurrent(0);
    setShowBack(false);
    const res = await fetch("/api/flashcards/random");
    if (res.ok) {
      const data = await res.json();
      setCards(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRandomCards();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
        <Navbar />
        <div className="text-xl text-[var(--luxury-gold)]">Loading...</div>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
        <Navbar />
        <div className="text-xl text-[var(--luxury-gold)]">
          No flashcards found!
        </div>
      </div>
    );
  }

  const card = cards[current];

  function handleNext() {
    setShowBack(false);
    if (current + 1 < cards.length) {
      setCurrent((prev) => prev + 1);
    }
  }

  function handleKnown() {
    setAnswers((prev) => [...prev, "known"]);
    handleNext();
  }
  function handleUnknown() {
    setAnswers((prev) => [...prev, "unknown"]);
    handleNext();
  }

  // Score calculation
  const knownCount = answers.filter((a) => a === "known").length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full pt-32 pb-12">
        <div className="bg-[var(--transparent-50)] backdrop-blur-md rounded-3xl shadow-2xs border border-neutral-800 p-12 sm:p-15 flex flex-col items-center gap-8 max-w-4xl w-full">
          {answers.length === cards.length ? (
            <div className="flex flex-row gap-8 w-full">
              {/* Left: Summary */}
              <div className="flex-1 flex flex-col items-start gap-4">
                <h2 className="text-2xl font-bold text-[var(--luxury-gold-light)]">
                  Summary
                </h2>
                <div className="text-lg text-[var(--luxury-gold)]">
                  Known: {knownCount} / {cards.length}
                </div>
                <div className="text-lg text-red-400">
                  Unknown: {answers.filter((a) => a === "unknown").length} / {cards.length}
                </div>
                <div className="text-lg text-[var(--luxury-gold-light)]">
                  Score: {Math.round((knownCount / cards.length) * 100)}%
                </div>
                <button
                  className="mt-4 bg-[var(--luxury-gold)] text-black px-6 py-2 rounded-full font-semibold"
                  onClick={fetchRandomCards}
                >
                  Try Another 10
                </button>
              </div>
              {/* Right: Flashcards */}
              <div className="flex-1 w-full">
                <h3 className="text-2xl font-semibold mb-2 text-[var(--luxury-gold-light)]">
                  Your Flashcards:
                </h3>
                <ul className="space-y-2">
                  {cards.map((fc, idx) => (
                    <li
                      key={fc.id}
                      className="bg-black/50 backdrop-blur-2xl backdrop-hue-rotate-15 rounded-xl p-5 flex flex-col"
                    >
                      <span>
                        <span className="font-bold">{fc.type?.toUpperCase()}:</span>{" "}
                        {fc.german || fc.phrase || fc.sentence}
                      </span>
                      <span>
                        <span className="font-semibold">Meaning:</span> {fc.meaning || fc.translation}
                      </span>
                      <span>
                        <span className="font-semibold">Your answer:</span>{" "}
                        <span
                          className={
                            answers[idx] === "known"
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {answers[idx]}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div
                className="w-full h-64 rounded-2xl bg-black/50 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setShowBack((b) => !b)}
              >
                {!showBack ? (
                  <span className="text-4xl font-bold text-[var(--luxury-gold-light)]">
                    {card.german || card.phrase || card.sentence}
                  </span>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl text-[var(--luxury-gold)]">
                      {card.meaning || card.translation}
                    </span>
                    {card.example && (
                      <span className="text-lg text-neutral-400 mt-2">
                        {card.example || "No example provided"} 
                      </span>
                    )}
                  </div>
                )}
                <span className="text-md text-neutral-400 mt-4">
                  (Click card to flip)
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                
                <button
                  className="bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-red-600"
                  onClick={handleUnknown}
                >
                  Unknown
                </button>
                <button
                  className="bg-[var(--luxury-gold-light)]/80 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[var(--luxury-gold-light)]/20"
                  onClick={handleKnown}
                >
                  Known
                </button>
              </div>
              <div className="text-sm text-neutral-400 mt-2">
                Card {current + 1} of {cards.length}
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 rounded-full h-3 mb-4">
                <div
                  className="bg-[var(--luxury-gold)] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((current + 1) / cards.length) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}