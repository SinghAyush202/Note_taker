import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isAuthed } from "@/lib/auth";
import { logout } from "@/lib/auth";
export default function Layout({ children, onLogout }) {
    const handleLogout = () => {
        logout();
        onLogout?.();
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx("header", { className: "bg-white border-b", children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("svg", { className: "h-8 w-8 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" }), _jsx("path", { d: "M8,12V14H16V12H8M8,16V18H13V16H8Z" })] }), _jsx("span", { className: "font-semibold text-lg", children: "Notes" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [isAuthed() && (_jsx("button", { onClick: handleLogout, className: "text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors", children: "Logout" })), _jsx("a", { className: "text-sm text-gray-500", href: "#", "aria-disabled": "true", children: "Help" })] })] }) }), _jsx("main", { className: "flex-1", children: children }), _jsxs("footer", { className: "py-6 text-center text-sm text-gray-500", children: ["\u00A9 ", new Date().getFullYear(), " Notes"] })] }));
}
