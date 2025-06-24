import React from "react";

export default function AddModal({
  open,
  fields,
  newFields,
  setNewFields,
  onAdd,
  onCancel,
  mode,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[var(--luxury-black-1)] rounded-xl p-8 min-w-[320px] max-w-lg w-full shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Add {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAdd();
          }}
          className="flex flex-col gap-3"
        >
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-700">
                {f.label}
              </label>
              <input
                className="px-2 py-1 rounded border"
                value={newFields[f.key] || ""}
                onChange={(e) =>
                  setNewFields((prev) => ({
                    ...prev,
                    [f.key]: e.target.value,
                  }))
                }
                placeholder={f.label}
              />
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
            >
              Add
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onCancel}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
