"use client";

import React from "react";

export default function CardModal({ open, item, fields, onClose }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 bg-[var(--transparent-50)] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-[var(--luxury-black-1)] rounded-xl p-8 min-w-[320px] max-w-lg w-full shadow-2xl relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-200 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[var(--luxury-gold-light)]">
          Details
        </h2>
        <div className="flex flex-col gap-3">
          {fields.map((f) => (
            <div key={f.key}>
              <span className="font-semibold text-[var(--luxury-gold)]">{f.label}:</span>{" "}
              <span className="text-[var(--luxury-gold-light)]">
                {Array.isArray(item[f.key])
                  ? item[f.key].join(", ")
                  : item[f.key] || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}