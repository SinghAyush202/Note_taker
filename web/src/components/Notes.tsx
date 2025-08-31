
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getUser } from "@/lib/storage";

type Note = { _id: string; title?: string; content: string; createdAt: string };

interface NotesProps {
  onError: (m: string) => void;
  onLogout?: () => void;
}

export default function Notes({ onError, onLogout }: NotesProps) {
  const user = getUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  async function load() {
    try {
      const { data } = await api.get("/notes");
      setNotes(data.notes);
    } catch (e: any) {
      onError(e?.response?.data?.error || "Failed to load notes");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createNote() {
    try {
      if (!content.trim()) return;
      const { data } = await api.post("/notes", {
        title: title || undefined,
        content,
      });
      setNotes([data.note, ...notes]);
      setTitle("");
      setContent("");
    } catch (e: any) {
      onError(e?.response?.data?.error || "Failed to create note");
    }
  }

  async function remove(id: string) {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (e: any) {
      onError(e?.response?.data?.error || "Failed to delete");
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg">
            Welcome, {user?.name || user?.email}
          </h2>

          {/* User menu dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors"
            >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                  {(user?.name || user?.email || "U")[0].toUpperCase()}
                </div>
              )}
              <svg
                className={`w-4 h-4 transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  Signed in as
                </div>
                <div className="px-4 py-2 text-sm font-medium truncate">
                  {user?.email}
                </div>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout?.();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close menu */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setShowUserMenu(false)}
          />
        )}

        <div className="grid gap-3">
          <input
            className="input"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input min-h-[100px]"
            placeholder="Write a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn self-start" onClick={createNote}>
            Add Note
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        {notes.map((n) => (
          <div key={n._id} className="card">
            {n.title && <div className="font-semibold mb-1">{n.title}</div>}
            <div className="text-gray-700 whitespace-pre-wrap">{n.content}</div>
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>{new Date(n.createdAt).toLocaleString()}</span>
              <button
                className="text-red-600 hover:text-red-800 transition-colors"
                onClick={() => remove(n._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notes yet. Create your first note above!
          </div>
        )}
      </div>
    </div>
  );
}
