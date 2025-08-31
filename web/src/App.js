import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import AuthCard from "@/components/AuthCard";
import Notes from "@/components/Notes";
import ErrorToast from "@/components/ErrorToast";
import { isAuthed } from "@/lib/auth";
import { api, setAuth } from "@/lib/api";
import { getUser, saveUser } from "@/lib/storage";
export default function App() {
    const [authed, setAuthed] = useState(isAuthed());
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!authed)
            return;
        // set axios header if reloading
        setAuth(localStorage.getItem("token"));
        if (!getUser()) {
            api
                .get("/auth/me")
                .then((r) => saveUser(r.data.user))
                .catch(() => {
                setAuth(null);
                saveUser(null);
                setAuthed(false);
            });
        }
    }, [authed]);
    const handleLogout = () => {
        setAuthed(false);
        setError(null); // Clear any existing errors
    };
    return (_jsxs(Layout, { onLogout: handleLogout, children: [_jsx("div", { className: "mx-auto max-w-6xl px-4 py-10", children: !authed ? (_jsx(AuthCard, { onLoggedIn: () => setAuthed(true), onError: setError })) : (_jsx(Notes, { onError: setError, onLogout: handleLogout })) }), _jsx(ErrorToast, { message: error })] }));
}
