import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { useState } from "react";
// import { api, setAuth } from "@/lib/api";
// import { saveUser } from "@/lib/storage";
// export default function OtpForm({
//   onLoggedIn,
//   onError,
// }: {
//   onLoggedIn?: () => void;
//   onError?: (m: string) => void;
// }) {
//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   async function requestOtp() {
//     if (!email.trim()) {
//       onError?.("Email is required");
//       return;
//     }
//     setLoading(true);
//     try {
//       console.log("[DEBUG] Requesting OTP for:", email);
//       await api.post("/auth/request-otp", {
//         email: email.trim().toLowerCase(),
//       });
//       setStep("otp");
//     } catch (e: any) {
//       console.error("[ERROR] OTP request failed:", e);
//       onError?.(e?.response?.data?.error || e.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   }
//   async function verifyOtp() {
//     // Clean and validate the code
//     const cleanCode = code.replace(/\D/g, "");
//     console.log("[DEBUG] Original code:", code);
//     console.log("[DEBUG] Cleaned code:", cleanCode);
//     console.log("[DEBUG] Code length:", cleanCode.length);
//     if (!cleanCode || cleanCode.length !== 6) {
//       onError?.("Please enter a valid 6-digit OTP");
//       return;
//     }
//     setLoading(true);
//     try {
//       console.log("[DEBUG] Verifying OTP:", { email, code: cleanCode, name });
//       const { data } = await api.post("/auth/verify-otp", {
//         email: email.trim().toLowerCase(),
//         code: cleanCode,
//         name: name.trim() || undefined,
//       });
//       console.log("[DEBUG] OTP verification successful");
//       setAuth(data.token);
//       saveUser(data.user);
//       onLoggedIn?.();
//     } catch (e: any) {
//       console.error("[ERROR] OTP verification failed:", e);
//       const errorMessage =
//         e?.response?.data?.error || e.message || "OTP verification failed";
//       onError?.(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }
//   const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Only allow digits and limit to 6 characters
//     const cleaned = value.replace(/\D/g, "").slice(0, 6);
//     setCode(cleaned);
//   };
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       if (step === "email") {
//         requestOtp();
//       } else {
//         verifyOtp();
//       }
//     }
//   };
//   return (
//     <div className="space-y-4">
//       {step === "email" ? (
//         <>
//           <div>
//             <label className="label">Full name</label>
//             <input
//               className="input"
//               placeholder="Jane Doe"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label className="label">Email</label>
//             <input
//               className="input"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               disabled={loading}
//               required
//             />
//           </div>
//           <button
//             className="btn w-full"
//             disabled={loading || !email.trim()}
//             onClick={requestOtp}
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </>
//       ) : (
//         <>
//           <div className="text-sm text-gray-600">
//             OTP sent to <b>{email}</b>. Check your inbox (or MailDev at
//             http://localhost:1080).
//           </div>
//           <div>
//             <label className="label">Enter OTP</label>
//             <input
//               className="input text-center text-lg font-mono tracking-widest"
//               placeholder="123456"
//               value={code}
//               onChange={handleCodeChange}
//               onKeyPress={handleKeyPress}
//               maxLength={6}
//               inputMode="numeric"
//               pattern="[0-9]*"
//               autoComplete="one-time-code"
//               disabled={loading}
//               autoFocus
//             />
//             <div className="text-xs text-gray-500 mt-1">
//               Enter the 6-digit code ({code.length}/6)
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               className="btn flex-1"
//               disabled={loading || code.replace(/\D/g, "").length !== 6}
//               onClick={verifyOtp}
//             >
//               {loading ? "Verifying..." : "Verify & Continue"}
//             </button>
//             <button
//               className="px-4 py-2 rounded-md border"
//               onClick={() => {
//                 setStep("email");
//                 setCode("");
//               }}
//               disabled={loading}
//             >
//               Change email
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { api, setAuth } from "@/lib/api";
import { saveUser } from "@/lib/storage";
export default function OtpForm({ isSignUp, onLoggedIn, onError, }) {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    async function requestOtp() {
        if (!email.trim()) {
            onError?.("Email is required");
            return;
        }
        setLoading(true);
        try {
            console.log("[DEBUG] Requesting OTP for:", email);
            await api.post("/auth/request-otp", {
                email: email.trim().toLowerCase(),
            });
            setStep("otp");
        }
        catch (e) {
            console.error("[ERROR] OTP request failed:", e);
            onError?.(e?.response?.data?.error || e.message || "Failed to send OTP");
        }
        finally {
            setLoading(false);
        }
    }
    async function verifyOtp() {
        const cleanCode = code.replace(/\D/g, "");
        console.log("[DEBUG] Original code:", code);
        console.log("[DEBUG] Cleaned code:", cleanCode);
        console.log("[DEBUG] Code length:", cleanCode.length);
        if (!cleanCode || cleanCode.length !== 6) {
            onError?.("Please enter a valid 6-digit OTP");
            return;
        }
        setLoading(true);
        try {
            console.log("[DEBUG] Verifying OTP:", { email, code: cleanCode, name });
            const { data } = await api.post("/auth/verify-otp", {
                email: email.trim().toLowerCase(),
                code: cleanCode,
                // Only send name for sign up
                name: isSignUp ? name.trim() || undefined : undefined,
            });
            console.log("[DEBUG] OTP verification successful");
            setAuth(data.token);
            saveUser(data.user);
            onLoggedIn?.();
        }
        catch (e) {
            console.error("[ERROR] OTP verification failed:", e);
            const errorMessage = e?.response?.data?.error || e.message || "OTP verification failed";
            onError?.(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }
    const handleCodeChange = (e) => {
        const value = e.target.value;
        const cleaned = value.replace(/\D/g, "").slice(0, 6);
        setCode(cleaned);
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (step === "email") {
                requestOtp();
            }
            else {
                verifyOtp();
            }
        }
    };
    return (_jsx("div", { className: "space-y-4", children: step === "email" ? (_jsxs(_Fragment, { children: [isSignUp && (_jsxs("div", { children: [_jsx("label", { className: "label", children: "Full name" }), _jsx("input", { className: "input", placeholder: "Jane Doe", value: name, onChange: (e) => setName(e.target.value), onKeyPress: handleKeyPress, disabled: loading })] })), _jsxs("div", { children: [_jsx("label", { className: "label", children: "Email" }), _jsx("input", { className: "input", type: "email", placeholder: "you@example.com", value: email, onChange: (e) => setEmail(e.target.value), onKeyPress: handleKeyPress, disabled: loading, required: true })] }), _jsx("button", { className: "btn w-full", disabled: loading || !email.trim(), onClick: requestOtp, children: loading ? "Sending..." : "Send OTP" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-sm text-gray-600", children: ["OTP sent to ", _jsx("b", { children: email }), ". Check your inbox (or MailDev at http://localhost:1080)."] }), _jsxs("div", { children: [_jsx("label", { className: "label", children: "Enter OTP" }), _jsx("input", { className: "input text-center text-lg font-mono tracking-widest", placeholder: "123456", value: code, onChange: handleCodeChange, onKeyPress: handleKeyPress, maxLength: 6, inputMode: "numeric", pattern: "[0-9]*", autoComplete: "one-time-code", disabled: loading, autoFocus: true }), _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: ["Enter the 6-digit code (", code.length, "/6)"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { className: "btn flex-1", disabled: loading || code.replace(/\D/g, "").length !== 6, onClick: verifyOtp, children: loading
                                ? "Verifying..."
                                : `${isSignUp ? "Verify & Sign Up" : "Verify & Sign In"}` }), _jsx("button", { className: "px-4 py-2 rounded-md border", onClick: () => {
                                setStep("email");
                                setCode("");
                            }, disabled: loading, children: "Change email" })] })] })) }));
}
