"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDetail, setOpenDetail] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      const res = await fetch("/api/flashcards/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[var(--luxury-black-1)] to-[var(--luxury-black-2)]">
      <Navbar />
      <div className="flex flex-col items-center w-full pt-32 pb-12">
        <h1 className="text-3xl font-extrabold text-[var(--luxury-gold-light)] mb-8">
          Daily Flashcard Progress
        </h1>
        <div className="bg-[var(--transparent-50)] rounded-3xl shadow-2xs border border-neutral-800 p-10 flex flex-col items-center gap-6 max-w-2xl w-full">
          {loading ? (
            <div className="text-xl text-[var(--luxury-gold)]">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-lg text-neutral-400">No history yet.</div>
          ) : (
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Known</th>
                  <th className="px-4 py-2">Unknown</th>
                  <th className="px-4 py-2">Score (%)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => (
                  <React.Fragment key={entry.id}>
                    <tr
                      className="border-t cursor-pointer"
                      onClick={() =>
                        setOpenDetail(openDetail === idx ? null : idx)
                      }
                    >
                      <td className="px-4 py-2">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-green-400">{entry.known}</td>
                      <td className="px-4 py-2 text-red-400">{entry.unknown}</td>
                      <td className="px-4 py-2 text-[var(--luxury-gold)]">
                        {entry.score}
                      </td>
                    </tr>
                    {openDetail === idx && entry.flashcards && (
                      <tr>
                        <td
                          colSpan={4}
                          className="bg-[var(--luxury-black-2)] p-4"
                        >
                          <ul className="space-y-2">
                            {entry.flashcards.map((fc, i) => (
                              <li key={fc.id} className="mb-2">
                                <span className="font-bold">
                                  {fc.type.toUpperCase()}:
                                </span>{" "}
                                {fc.front} <br />
                                <span className="font-semibold">Meaning:</span>{" "}
                                {fc.back} <br />
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
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}