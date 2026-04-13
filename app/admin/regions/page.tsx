"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Mountain,
  Map,
  Search,
} from "lucide-react";
import { getRegions, saveRegions, type AdminRegion, type AdminRoute } from "@/lib/admin-store";

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "text-emerald-400 bg-emerald-400/10",
  MODERATE: "text-blue-400 bg-blue-400/10",
  DIFFICULT: "text-amber-400 bg-amber-400/10",
  STRENUOUS: "text-red-400 bg-red-400/10",
};

function DeleteModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
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
          <h2 className="font-display font-bold text-white text-base">Confirm Delete</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-full border border-white/20 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:border-white/40 transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

function RegionCard({
  region,
  onDeleteRegion,
  onDeleteRoute,
}: {
  region: AdminRegion;
  onDeleteRegion: (r: AdminRegion) => void;
  onDeleteRoute: (regionId: string, routeId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
      {/* Region header */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="p-2 rounded-xl bg-nepal-orange/10 shrink-0">
          <Mountain className="w-4 h-4 text-nepal-orange" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-white">{region.title}</p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{region.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500 hidden sm:inline">
            {region.routes.length} {region.routes.length === 1 ? "route" : "routes"}
          </span>
          <Link
            href={`/admin/regions/${region.id}/edit`}
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); onDeleteRegion(region); }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>

      {/* Routes list */}
      {expanded && (
        <div className="border-t border-white/5">
          {region.routes.map((route: AdminRoute) => (
            <div
              key={route.id}
              className="flex items-center gap-3 px-5 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-white/5 shrink-0">
                <Map className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">{route.title}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[route.difficulty] ?? "text-gray-400 bg-gray-400/10"}`}>
                    {route.difficulty.charAt(0) + route.difficulty.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {route.durationDays}d · {route.maxAltitudeM.toLocaleString()}m
                  </span>
                  {route.itinerary.length > 0 && (
                    <span className="text-xs text-gray-600">· {route.itinerary.length} days</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/regions/${region.id}/routes/${route.id}/edit`}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => onDeleteRoute(region.id, route.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add route */}
          <Link
            href={`/admin/regions/${region.id}/routes/new`}
            className="flex items-center gap-2 px-5 py-3 text-sm text-gray-500 hover:text-nepal-orange hover:bg-nepal-orange/5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Trek Route
          </Link>
        </div>
      )}
    </div>
  );
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<AdminRegion[]>([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ message: string; onConfirm: () => void } | null>(null);

  useEffect(() => { setRegions(getRegions()); }, []);

  const filtered = regions.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
  );

  function handleDeleteRegion(region: AdminRegion) {
    setDeleteTarget({
      message: `Delete "${region.title}" and all its routes? This cannot be undone.`,
      onConfirm: () => {
        const updated = regions.filter((r) => r.id !== region.id);
        saveRegions(updated);
        setRegions(updated);
        setDeleteTarget(null);
      },
    });
  }

  function handleDeleteRoute(regionId: string, routeId: string) {
    const region = regions.find((r) => r.id === regionId);
    const route = region?.routes.find((r) => r.id === routeId);
    if (!route) return;
    setDeleteTarget({
      message: `Delete route "${route.title}"? This cannot be undone.`,
      onConfirm: () => {
        const updated = regions.map((r) =>
          r.id !== regionId ? r : { ...r, routes: r.routes.filter((rt) => rt.id !== routeId) }
        );
        saveRegions(updated);
        setRegions(updated);
        setDeleteTarget(null);
      },
    });
  }

  const totalRoutes = regions.reduce((acc, r) => acc + r.routes.length, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="uppercase tracking-widest text-xs text-gray-500 mb-1">Content</p>
          <h1 className="text-2xl font-display font-bold text-white">Trek Regions</h1>
        </div>
        <Link
          href="/admin/regions/new"
          className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Region
        </Link>
      </div>

      <div className="flex gap-4 mb-5 text-sm text-gray-500">
        <span>{regions.length} regions</span>
        <span>·</span>
        <span>{totalRoutes} routes total</span>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          className="w-full rounded-xl bg-slate-900 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm"
          placeholder="Search regions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((region) => (
          <RegionCard
            key={region.id}
            region={region}
            onDeleteRegion={handleDeleteRegion}
            onDeleteRoute={handleDeleteRoute}
          />
        ))}
        {filtered.length === 0 && (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
            <Mountain className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {search ? "No regions match your search." : "No regions yet."}
            </p>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          message={deleteTarget.message}
          onConfirm={deleteTarget.onConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
