

import React from "react";
import { isAuthed } from "@/lib/auth";
import { logout } from "@/lib/auth";

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export default function Layout({ children, onLogout }: LayoutProps) {
  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Notes Icon SVG */}
            <svg
              className="h-8 w-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              <path d="M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            <span className="font-semibold text-lg">Notes</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthed() && (
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            )}
            <a className="text-sm text-gray-500" href="#" aria-disabled="true">
              Help
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Notes
      </footer>
    </div>
  );
}
