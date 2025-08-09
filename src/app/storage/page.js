"use client";

import React from "react";

import Navbar from "@/components/navbar";
import EditModal from "@/components/EditModal";
import AddModal from "@/components/AddModal";
import CardModal from "@/components/CardModal";

import { addWord } from "@/lib/db";

const initialWords = [
  {
    id: 1,
    german: "Loading",
    meaning: "Loading",
    example: "Loading",
    english: "Loading",
    tags: ["Loading"],
  },
];
const initialPhrases = [
  {
    id: 1,
    phrase: "Loading",
    translation: "Loading",
    usage: "Loading",
    context: "Loading",
    category: "Loading",
    tags: ["Loading"],
  },
];
const initialSentences = [
  {
    id: 1,
    sentence: "Loading",
    translation: "Loading",
    notes: "Loading",
    source: "Loading",
    tags: ["Loading"],
  },
];

export default function Home() {
  const [mode, setMode] = React.useState("word");
  const [words, setWords] = React.useState(initialWords);
  const [phrases, setPhrases] = React.useState(initialPhrases);
  const [sentences, setSentences] = React.useState(initialSentences);
  const [viewMode, setViewMode] = React.useState("table");

  // Modal state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);

  // Card view state
  const [cardOpen, setCardOpen] = React.useState(null);
  const [opencard, setOpencard] = React.useState(null);

  // Add form state
  const [newFields, setNewFields] = React.useState({});

  // Helper to get current data and setters based on mode
  const getData = () => {
    if (mode === "word") return [words, setWords, "word"];
    if (mode === "phrase") return [phrases, setPhrases, "phrase"];
    return [sentences, setSentences, "sentence"];
  };
  const [data, setData] = getData();

  // Schema fields for each mode
  const fields = {
    word: [
      { key: "german", label: "German" },
      { key: "meaning", label: "Meaning" },
      { key: "example", label: "Example" },
      { key: "english", label: "English" },
      { key: "tags", label: "Tags" },
    ],
    phrase: [
      { key: "phrase", label: "Phrase" },
      { key: "translation", label: "Translation" },
      { key: "usage", label: "Usage" },
      { key: "context", label: "Context" },
      { key: "category", label: "Category" },
      { key: "tags", label: "Tags" },
    ],
    sentence: [
      { key: "sentence", label: "Sentence" },
      { key: "translation", label: "Translation" },
      { key: "notes", label: "Notes" },
      { key: "source", label: "Source" },
      { key: "tags", label: "Tags" },
    ],
  };

  // Add new item
  const handleAdd = async () => {
    if (
      !fields[mode].every(
        (f) => newFields[f.key] && newFields[f.key].toString().trim() !== ""
      )
    )
      return;

    let addedItem;
    if (mode === "word") {
      const res = await fetch("/api/storage/word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          german: newFields.german,
          meaning: newFields.meaning,
          example: newFields.example,
          english: newFields.english,
          tags: newFields.tags
            ? newFields.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
        }),
      });
      if (res.ok) {
        const addedItem = await res.json();
        setWords([...words, addedItem]);
      }
    } else if (mode === "phrase") {
      addedItem = await fetch("/api/storage/phrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phrase: newFields.phrase,
          translation: newFields.translation,
          usage: newFields.usage,
          context: newFields.context,
          category: newFields.category,
          tags: newFields.tags
            ? newFields.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
        }),
      }).then((res) => res.json());
      setPhrases([...phrases, addedItem]);
    } else if (mode === "sentence") {
      addedItem = await fetch("/api/storage/sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentence: newFields.sentence,
          translation: newFields.translation,
          notes: newFields.notes,
          source: newFields.source,
          tags: newFields.tags
            ? newFields.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
        }),
      }).then((res) => res.json());
      setSentences([...sentences, addedItem]);
    }

    setNewFields({});
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    // Remove from local state
    // setData(data.filter((item) => item.id !== id));
    //make API call to delete from server
    const res = await fetch(`/api/storage/${mode}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (res.ok) {
      const status = await res.json();
      console.log("Delete status:", status);
      fetchData(); // Refresh data after deletion
    }
  };

  // Open modal for editing
  const handleEdit = async (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  // Save edit
  const handleSave = async () => {
    console.log("Saving item:", editingItem);
    if (!editingItem) return;
    const res = await fetch(`/api/storage/${mode}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });

    if (!res.ok) {
      console.error("Failed to save item:", res.statusText);
      return;
    }

    setEditingItem(null);
    setModalOpen(false);
    fetchData(); // Refresh data after saving
  };

  // Cancel edit
  const handleCancel = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  // Open card view
  const handleOpenCard = (item) => {
    setOpencard(item);
    setCardOpen("card");
  };

  const fetchData = async () => {
    if (mode === "word") {
      const res = await fetch("/api/storage/word");
      if (res.ok) {
        const data = await res.json();

        setWords(data);
      }
    }
    if (mode === "phrase") {
      const res = await fetch("/api/storage/phrase");
      if (res.ok) {
        const data = await res.json();

        setPhrases(data);
      }
    }
    if (mode === "sentence") {
      const res = await fetch("/api/storage/sentence");
      if (res.ok) {
        const data = await res.json();

        setSentences(data);
      }
    }
  };
  // Use effect
  React.useEffect(() => {
    console.log("Mode changed to:", mode);
    fetchData();

    setNewFields({});
  }, [mode]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#4b3b26] to-[var(--luxury-gold)]">
      <CardModal
        open={cardOpen === "card"}
        item={opencard}
        fields={fields[mode]}
        onClose={() => setCardOpen(null)}
      />
      <Navbar />
      <div className="flex flex-col items-center  w-full pt-32 pb-12">
        <h1 className="relative text-3xl text-left font-extrabold text-[var(--luxury-gold-light)] mb-2">
          Storage for German Learner
        </h1>
        {/* Toggle */}
        <div className="flex gap-4 m-6">
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              mode === "word"
                ? "bg-[var(--luxury-gold)] text-black"
                : "bg-neutral-800 text-[var(--luxury-gold-light)]"
            }`}
            onClick={() => setMode("word")}
          >
            Word
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              mode === "phrase"
                ? "bg-[var(--luxury-gold)] text-black"
                : "bg-neutral-800 text-[var(--luxury-gold-light)]"
            }`}
            onClick={() => setMode("phrase")}
          >
            Phrase
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              mode === "sentence"
                ? "bg-[var(--luxury-gold)] text-black"
                : "bg-neutral-800 text-[var(--luxury-gold-light)]"
            }`}
            onClick={() => setMode("sentence")}
          >
            Sentence
          </button>
        </div>

        {/* Center box */}
        <div className="bg-[var(--transparent-50)] backdrop-blur-md backdrop-hue-rotate-5 rounded-3xl shadow-2xs hover:shadow-amber-400 transition-shadow duration-350 border border-neutral-800 p-12 sm:p-15 flex flex-col items-center gap-8 max-w-4xl w-full">
          <div className="flex justify-between w-full">
            {/* Search section */}
            <div className="w-full mb-4">
              <input
                type="text"
                placeholder={`Search ${mode}s...`}
                className="w-full px-4 py-2 rounded border border-neutral-700 bg-transparent text-[var(--luxury-gold-light)] focus:outline-none focus:border-[var(--luxury-gold)] transition-colors"
              />
            </div>
            {/* Add Button to open AddModal */}
            <div className="flex justify-end w-full mb-2">
              <button
                className="bg-[var(--transparent-50)] text-[var(--luxury-gold)] px-4 py-2 rounded border-b-2 hover:bg-[var(--luxury-black-2)] font-semibold"
                onClick={() => setModalOpen("add")}
              >
                + {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            </div>
          </div>
          {/* View mode toggle */}
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                viewMode === "table"
                  ? "bg-[var(--luxury-gold)] text-black"
                  : "bg-neutral-800 text-[var(--luxury-gold-light)]"
              }`}
              onClick={() => setViewMode("table")}
            >
              Table View
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                viewMode === "card"
                  ? "bg-[var(--luxury-gold)] text-black"
                  : "bg-neutral-800 text-[var(--luxury-gold-light)]"
              }`}
              onClick={() => setViewMode("card")}
            >
              Card View
            </button>
          </div>
          <AddModal
            open={modalOpen === "add"}
            fields={fields[mode]}
            newFields={newFields}
            setNewFields={setNewFields}
            onAdd={() => {
              handleAdd();
              setModalOpen(false);
            }}
            onCancel={() => {
              setNewFields({});
              setModalOpen(false);
            }}
            mode={mode}
          />
          {/* Table */}
          {viewMode === "table" ? (
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr>
                    {fields[mode].map((f) => (
                      <th key={f.key} className="px-4 py-2 capitalize">
                        {f.label}
                      </th>
                    ))}
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-t">
                      {fields[mode].map((f) => (
                        <td
                          key={f.key}
                          className="max-w-[75px] px-4 py-2 whitespace-normal break-words"
                        >
                          {Array.isArray(item[f.key])
                            ? item[f.key].join(", ")
                            : item[f.key] || ""}
                        </td>
                      ))}
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="bg-amber-200 text-black px-2 py-1 rounded"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-black px-2 py-1 rounded"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td
                        colSpan={fields[mode].length + 1}
                        className="text-center py-4 text-gray-400"
                      >
                        No {mode}s yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-[var(--luxury-black-2)] rounded-xl p-6 shadow flex flex-col gap-2 cursor-pointer hover:bg-[var(--transparent-50)]  transition-colors"
                >
                  {fields[mode].map((f) => (
                    <div
                      key={f.key}
                      onClick={() => handleOpenCard(item)}
                      className=""
                    >
                      <span className="font-semibold">{f.label}:</span>{" "}
                      <span>
                        {Array.isArray(item[f.key])
                          ? item[f.key].join(", ")
                          : item[f.key] || ""}
                      </span>
                    </div>
                  ))}

                  {/* <div className="flex items-center justify-around gap-2 mt-2">
                    <button
                      className="bg-amber-200 text-black px-2 py-1 rounded"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-black px-2 py-1 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              ))}
              {data.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-4">
                  No {mode}s yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Edit Modal */}
      <EditModal
        open={modalOpen}
        fields={fields[mode]}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onSave={handleSave}
        onCancel={handleCancel}
        mode={mode}
      />
    </div>
  );
}
