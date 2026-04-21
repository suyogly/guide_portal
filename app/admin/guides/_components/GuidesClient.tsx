"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Star,
  AlertTriangle,
} from "lucide-react";
import type { AdminGuideListItem } from "@/lib/admin-store";

const STATUS_BADGE: Record<
  string,
  { label: string; cls: string; icon: React.ElementType }
> = {
  AVAILABLE: { label: "Available", cls: "text-emerald-400 bg-emerald-400/10", icon: CheckCircle2 },
  UNAVAILABLE: { label: "Unavailable", cls: "text-red-400 bg-red-400/10", icon: XCircle },
  AVAILABLE_SOON: { label: "Available Soon", cls: "text-amber-400 bg-amber-400/10", icon: Clock },
};

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-red-500/10">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="font-display font-bold text-white text-base">Delete Guide</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">{name}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border border-white/20 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:border-white/40 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidesClient({ initialGuides }: { initialGuides: AdminGuideListItem[] }) {
  const [guides, setGuides] = useState<AdminGuideListItem[]>(initialGuides);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminGuideListItem | null>(null);

  const filtered = guides.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.specialty.toLowerCase().includes(search.toLowerCase()) ||
      g.region.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(guide: AdminGuideListItem) {
    try {
      await fetch(`/api/guides/${guide.id}`, { method: "DELETE" });
      setGuides((prev) => prev.filter((g) => g.id !== guide.id));
    } catch (err) {
      console.error(err);
    }
    setDeleteTarget(null);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="uppercase tracking-widest text-xs text-gray-500 mb-1">Content</p>
          <h1 className="text-2xl font-display font-bold text-white">Guides</h1>
        </div>
        <Link
          href="/admin/guides/new"
          className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Guide
        </Link>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          className="w-full rounded-xl bg-slate-900 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm"
          placeholder="Search by name, specialty or region…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-5 text-sm text-gray-500">
        <span>{filtered.length} guides</span>
        <span>·</span>
        <span>{guides.filter((g) => g.availabilityStatus === "AVAILABLE").length} available</span>
        <span>·</span>
        <span>{guides.filter((g) => g.isVerified).length} verified</span>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Guide", "Specialty", "Region", "Rate", "Status", "Trust", ""].map((h) => (
                  <th key={h} className="text-left px-4 first:px-5 py-3.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((guide) => {
                const status = STATUS_BADGE[guide.availabilityStatus] ?? STATUS_BADGE.AVAILABLE;
                const StatusIcon = status.icon;
                return (
                  <tr key={guide.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                          {guide.image && !guide.image.startsWith("/") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                              {guide.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white leading-tight">{guide.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-gray-500">{guide.rating.toFixed(1)}</span>
                            <span className="text-gray-700 mx-1">·</span>
                            <span className="text-xs text-gray-500">{guide.experience}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{guide.specialty || "—"}</td>
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{guide.region || "—"}</td>
                    <td className="px-4 py-3.5 text-white font-semibold text-sm">
                      ${guide.ratePerDay}<span className="text-gray-500 font-normal">/day</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.cls}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {guide.isVerified && (
                          <span aria-label="Verified"><CheckCircle2 className="w-4 h-4 text-blue-400" /></span>
                        )}
                        {!guide.isVerified && (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/guides/${guide.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteTarget(guide)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-500 text-sm">
                    {search ? "No guides match your search." : "No guides yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-white/5">
          {filtered.map((guide) => {
            const status = STATUS_BADGE[guide.availabilityStatus] ?? STATUS_BADGE.AVAILABLE;
            const StatusIcon = status.icon;
            return (
              <div key={guide.id} className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                  {guide.image && !guide.image.startsWith("/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                      {guide.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{guide.name}</p>
                  <p className="text-xs text-gray-500 truncate">{guide.specialty}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.cls}`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {status.label}
                    </span>
                    <span className="text-xs text-gray-500">${guide.ratePerDay}/day</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Link href={`/admin/guides/${guide.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={() => setDeleteTarget(guide)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-gray-500 text-sm">
              {search ? "No guides match your search." : "No guides yet."}
            </p>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
