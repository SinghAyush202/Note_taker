import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { api, setAuth } from "@/lib/api";
import { saveUser } from "@/lib/storage";
export default function GoogleButton({ onSuccess, onError, }) {
    const divRef = useRef(null);
    useEffect(() => {
        if (!window.google || !divRef.current)
            return;
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: async (resp) => {
                try {
                    const { data } = await api.post("/auth/google-verify", {
                        credential: resp.credential,
                    });
                    setAuth(data.token);
                    saveUser(data.user);
                    onSuccess?.();
                }
                catch (e) {
                    onError?.(e?.response?.data?.error || "Google login failed");
                }
            },
        });
        window.google.accounts.id.renderButton(divRef.current, {
            theme: "filled_blue",
            size: "large",
            shape: "pill",
            width: 320,
            text: "continue_with",
        });
    }, []);
    return _jsx("div", { ref: divRef });
}
