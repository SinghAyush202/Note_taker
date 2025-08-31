
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
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

  return (
    <Layout onLogout={handleLogout}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {!authed ? (
          <AuthCard onLoggedIn={() => setAuthed(true)} onError={setError} />
        ) : (
          <Notes onError={setError} onLogout={handleLogout} />
        )}
      </div>
      <ErrorToast message={error} />
    </Layout>
  );
}

