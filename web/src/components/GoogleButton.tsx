import { useEffect, useRef } from "react";
import { api, setAuth } from "@/lib/api";
import { saveUser } from "@/lib/storage";

declare global { interface Window { google: any; } }

export default function GoogleButton({ onSuccess, onError }:{
  onSuccess?: () => void; onError?: (m: string) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (resp: any) => {
        try {
          const { data } = await api.post("/auth/google-verify", { credential: resp.credential });
          setAuth(data.token); saveUser(data.user); onSuccess?.();
        } catch (e: any) { onError?.(e?.response?.data?.error || "Google login failed"); }
      }
    });

    window.google.accounts.id.renderButton(divRef.current, {
      theme: "filled_blue", size: "large", shape: "pill", width: 320, text: "continue_with"
    });
  }, []);

  return <div ref={divRef} />;
}
