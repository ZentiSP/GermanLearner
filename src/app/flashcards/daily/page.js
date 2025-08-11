"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

function isToday(dateString) {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export default function DailyFlashcards() {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // "known" or "unknown"
  const [todayHistory, setTodayHistory] = useState(null);

  // Fetch daily history and cards
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // 1. Check if user did daily
      const historyRes = await fetch("/api/flashcards/history");
      let todayEntry = null;
      if (historyRes.ok) {
        const history = await historyRes.json();
        todayEntry = history.find((h) => isToday(h.date));
        setTodayHistory(todayEntry || null);
      }

      // 2. If not done, fetch cards
      if (!todayEntry) {
        const res = await fetch("/api/flashcards/daily");
        if (res.ok) {
          const data = await res.json();
          setCards(data);
        }
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  // Save result to history after finishing
  useEffect(() => {
    if (answers.length && answers.length === cards.length) {
      // Only save if not already done today
      if (!todayHistory) {
        fetch("/api/flashcards/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: new Date(),
            known: answers.filter((a) => a === "known").length,
            unknown: answers.filter((a) => a === "unknown").length,
            score: Math.round(
              (answers.filter((a) => a === "known").length / cards.length) * 100
            ),
            flashcards: cards.map((c, i) => ({
              id: c.id,
              type: c.type,
              front: c.german || c.phrase || c.sentence,
              back: c.meaning || c.translation,
              answer: answers[i],
            })),
          }),
        }).then(() => {
          // Optionally, refetch today's history
          fetchData();
        });
      }
    }
    // eslint-disable-next-line
  }, [answers, cards, todayHistory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Navbar />
        <div className="text-xl text-[var(--luxury-gold)]">Loading...</div>
      </div>
    );
  }

  // If already did daily, show summary
  if (todayHistory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full pt-32 pb-12">
          {/* <h1 className="text-3xl font-extrabold text-[var(--luxury-gold-light)] mb-8">
            Daily Flashcards
          </h1> */}
          <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-20 flex flex-row items-center gap-6 max-w-4xl w-full h-150">
            {/* Left: Summary */}
            <div className="flex-1 flex flex-col items-start gap-4">
              <h2 className="text-2xl font-bold text-[var(--luxury-gold-light)] mb-2">
                You already completed today&apos;s session!
              </h2>
              <div className="flex flex-col gap-2 w-full">
                <div className="text-lg text-[var(--luxury-gold)]">
                  Known: {todayHistory.known} /{" "}
                  {todayHistory.known + todayHistory.unknown}
                </div>
                <div className="text-lg text-red-400">
                  Unknown: {todayHistory.unknown} /{" "}
                  {todayHistory.known + todayHistory.unknown}
                </div>
                <div className="text-lg text-[var(--luxury-gold-light)]">
                  Score: {todayHistory.score}%
                </div>
              </div>
              <a
                href="/flashcards/dashboard"
                className="bg-[var(--luxury-gold)] text-black px-6 py-2 rounded-full font-semibold mt-2"
              >
                View Dashboard
              </a>
            </div>
            {/* Right: Flashcards */}
            {todayHistory.flashcards && (
              <div className="flex-1 w-full ">
                <h3 className="text-lg font-semibold mb-2 text-[var(--luxury-gold-light)]">
                  Your Flashcards:
                </h3>
                <div className="mt-8 md:mt-0 max-h-96 overflow-y-auto pr-2 scrollbar-black">
                  <ul className="space-y-2">
                    {todayHistory.flashcards.map((fc, idx) => (
                      <li
                        key={fc.id}
                        className="bg-black/50 backdrop-blur-2xl backdrop-hue-rotate-15 rounded-xl p-5 flex flex-col"
                      >
                        <span>
                          <span className="font-bold">
                            {fc.type.charAt(0).toUpperCase() + fc.type.slice(1)}
                            :
                          </span>{" "}
                          {fc.front}
                        </span>
                        <span>
                          <span className="font-semibold">Meaning:</span>{" "}
                          {fc.back}
                        </span>
                        <span>
                          <span className="font-semibold">Your answer:</span>{" "}
                          <span
                            className={
                              fc.answer === "known"
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {fc.answer}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Navbar />
        <div className="text-xl text-[var(--luxury-gold)]">
          No flashcards for today!
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] p-0 bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full pt-32 pb-12">
        {/* <h1 className="text-3xl font-extrabold text-[var(--luxury-gold-light)] mb-8">
          Daily Flashcards
        </h1> */}

        <div className="bg-[var(--transparent-50)] backdrop-blur-md rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-15 flex flex-col items-center gap-8 max-w-4xl w-full">
          {answers.length === cards.length ? (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold text-[var(--luxury-gold-light)]">
                Summary
              </h2>
              <div className="text-lg text-[var(--luxury-gold)]">
                Known: {answers.filter((a) => a === "known").length} /{" "}
                {cards.length}
              </div>
              <div className="text-lg text-red-400">
                Unknown: {answers.filter((a) => a === "unknown").length} /{" "}
                {cards.length}
              </div>
              <button
                className="mt-4 bg-[var(--luxury-gold)] text-black px-6 py-2 rounded-full font-semibold"
                onClick={() => {
                  setCurrent(0);
                  setAnswers([]);
                }}
              >
                Retry
              </button>
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
                    {card.example || card.notes (
                      <span className="text-xl text-neutral-400 mt-2">
                        {card.example || card.notes}
                      </span>
                    )}
                  </div>
                )}
                <span className="text-xs text-neutral-400 mt-4">
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
