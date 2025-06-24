import React from "react";

export default function EditModal({ open, fields, editingItem, setEditingItem, onSave, onCancel, mode }) {
  if (!open || !editingItem) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[var(--luxury-black-1)] rounded-xl p-8 min-w-[320px] max-w-lg w-full shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Edit {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave();
          }}
          className="flex flex-col gap-3"
        >
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-700">{f.label}</label>
              <input
                className="px-2 py-1 rounded border"
                value={
                  Array.isArray(editingItem[f.key])
                    ? editingItem[f.key].join(", ")
                    : editingItem[f.key] || ""
                }
                onChange={e =>
                  setEditingItem((prev) => ({
                    ...prev,
                    [f.key]:
                      f.key === "tags"
                        ? e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                        : e.target.value,
                  }))
                }
              />
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
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