"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again — if the problem
          persists, contact support.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-6 py-3 font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
