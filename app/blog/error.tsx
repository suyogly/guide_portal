"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function BlogError({
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
          Failed to load articles
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          We couldn&apos;t fetch the blog posts. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-6 py-3 font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
