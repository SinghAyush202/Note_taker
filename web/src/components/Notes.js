import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getUser } from "@/lib/storage";
export default function Notes({ onError, onLogout }) {
    const user = getUser();
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showUserMenu, setShowUserMenu] = useState(false);
    async function load() {
        try {
            const { data } = await api.get("/notes");
            setNotes(data.notes);
        }
        catch (e) {
            onError(e?.response?.data?.error || "Failed to load notes");
        }
    }
    useEffect(() => {
        load();
    }, []);
    async function createNote() {
        try {
            if (!content.trim())
                return;
            const { data } = await api.post("/notes", {
                title: title || undefined,
                content,
            });
            setNotes([data.note, ...notes]);
            setTitle("");
            setContent("");
        }
        catch (e) {
            onError(e?.response?.data?.error || "Failed to create note");
        }
    }
    async function remove(id) {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((n) => n._id !== id));
        }
        catch (e) {
            onError(e?.response?.data?.error || "Failed to delete");
        }
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs("div", { className: "card mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h2", { className: "font-semibold text-lg", children: ["Welcome, ", user?.name || user?.email] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowUserMenu(!showUserMenu), className: "flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors", children: [user?.picture ? (_jsx("img", { src: user.picture, alt: "Profile", className: "w-6 h-6 rounded-full" })) : (_jsx("div", { className: "w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium", children: (user?.name || user?.email || "U")[0].toUpperCase() })), _jsx("svg", { className: `w-4 h-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), showUserMenu && (_jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10", children: [_jsx("div", { className: "px-4 py-2 text-xs text-gray-500 border-b", children: "Signed in as" }), _jsx("div", { className: "px-4 py-2 text-sm font-medium truncate", children: user?.email }), _jsx("hr", { className: "my-1" }), _jsx("button", { onClick: () => {
                                                    setShowUserMenu(false);
                                                    onLogout?.();
                                                }, className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors", children: "Sign out" })] }))] })] }), showUserMenu && (_jsx("div", { className: "fixed inset-0 z-0", onClick: () => setShowUserMenu(false) })), _jsxs("div", { className: "grid gap-3", children: [_jsx("input", { className: "input", placeholder: "Title (optional)", value: title, onChange: (e) => setTitle(e.target.value) }), _jsx("textarea", { className: "input min-h-[100px]", placeholder: "Write a note...", value: content, onChange: (e) => setContent(e.target.value) }), _jsx("button", { className: "btn self-start", onClick: createNote, children: "Add Note" })] })] }), _jsxs("div", { className: "grid gap-3", children: [notes.map((n) => (_jsxs("div", { className: "card", children: [n.title && _jsx("div", { className: "font-semibold mb-1", children: n.title }), _jsx("div", { className: "text-gray-700 whitespace-pre-wrap", children: n.content }), _jsxs("div", { className: "mt-3 flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: new Date(n.createdAt).toLocaleString() }), _jsx("button", { className: "text-red-600 hover:text-red-800 transition-colors", onClick: () => remove(n._id), children: "Delete" })] })] }, n._id))), notes.length === 0 && (_jsx("div", { className: "text-center text-gray-500 py-8", children: "No notes yet. Create your first note above!" }))] })] }));
}
