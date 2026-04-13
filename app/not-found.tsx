import Link from "next/link";
import { Mountain, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nepal-orange/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nepal-orange/10 border border-nepal-orange/20 mb-6">
          <Mountain className="w-8 h-8 text-nepal-orange" />
        </div>

        <p className="text-nepal-orange font-bold tracking-[0.3em] uppercase text-sm mb-4">
          404 — Lost on the Trail
        </p>

        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          Page not found
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed mb-10">
          Looks like this trail doesn&apos;t exist. Head back to base camp and
          explore from there.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
