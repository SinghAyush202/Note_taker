import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import OtpForm from "./OtpForm";
import GoogleButton from "./GoogleButton";
import { useState } from "react";
export default function AuthCard({ onLoggedIn, onError, }) {
    const [isSignUp, setIsSignUp] = useState(true);
    return (_jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [_jsx("div", { className: "hidden md:block", children: _jsxs("div", { className: "relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800", children: [_jsx("div", { className: "absolute inset-0", children: _jsxs("svg", { viewBox: "0 0 400 400", className: "w-full h-full", style: {
                                    background: "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3), transparent 50%)",
                                }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "grad1", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: {
                                                        stopColor: "rgba(59, 130, 246, 0.8)",
                                                        stopOpacity: 1,
                                                    } }), _jsx("stop", { offset: "50%", style: {
                                                        stopColor: "rgba(147, 51, 234, 0.8)",
                                                        stopOpacity: 1,
                                                    } }), _jsx("stop", { offset: "100%", style: {
                                                        stopColor: "rgba(29, 78, 216, 0.8)",
                                                        stopOpacity: 1,
                                                    } })] }) }), _jsx("path", { d: "M 50,200 C 150,100 200,300 300,200 C 350,150 380,250 400,200 L 400,400 L 0,400 Z", fill: "url(#grad1)", className: "animate-pulse" }), _jsx("path", { d: "M 0,250 C 100,200 150,350 250,250 C 300,200 350,300 400,250 L 400,400 L 0,400 Z", fill: "rgba(59, 130, 246, 0.3)", className: "animate-pulse", style: { animationDelay: "1s" } })] }) }), _jsx("div", { className: "absolute inset-0 flex flex-col justify-center items-center text-white p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Welcome to Notes" }), _jsx("p", { className: "text-blue-100 text-lg", children: "Organize your thoughts, capture your ideas" })] }) }), _jsx("div", { className: "absolute inset-0 opacity-10", style: {
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            } })] }) }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsxs("div", { className: "bg-gray-100 rounded-lg p-1 flex", children: [_jsx("button", { onClick: () => setIsSignUp(true), className: `px-6 py-2 rounded-md text-sm font-medium transition-all ${isSignUp
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"}`, children: "Sign Up" }), _jsx("button", { onClick: () => setIsSignUp(false), className: `px-6 py-2 rounded-md text-sm font-medium transition-all ${!isSignUp
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"}`, children: "Sign In" })] }) }), _jsx("h1", { className: "text-2xl font-semibold mb-2", children: isSignUp ? "Create your account" : "Welcome back" }), _jsx("p", { className: "text-gray-600 mb-6", children: isSignUp
                            ? "Sign up with email + OTP or continue with Google."
                            : "Sign in to your account using email + OTP or Google." }), _jsx(OtpForm, { isSignUp: isSignUp, onLoggedIn: onLoggedIn, onError: onError }), _jsxs("div", { className: "my-6 flex items-center gap-4", children: [_jsx("div", { className: "h-px bg-gray-200 flex-1" }), _jsx("span", { className: "text-xs text-gray-500", children: "OR" }), _jsx("div", { className: "h-px bg-gray-200 flex-1" })] }), _jsx(GoogleButton, { onSuccess: onLoggedIn, onError: onError })] })] }));
}
