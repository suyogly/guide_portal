"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Mountain,
  Map,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import {
  getGuides,
  getBlogs,
  getRegions,
  type AdminGuide,
  type AdminBlog,
} from "@/lib/admin-store";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
      <div className={`p-3 rounded-xl shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-3xl font-display font-bold text-white">{value}</p>
        <p className="text-sm font-semibold text-gray-300 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const STATUS_MAP = {
  AVAILABLE: {
    label: "Available",
    icon: CheckCircle2,
    cls: "text-emerald-400",
  },
  UNAVAILABLE: { label: "Unavailable", icon: XCircle, cls: "text-red-400" },
  AVAILABLE_SOON: {
    label: "Available Soon",
    icon: Clock,
    cls: "text-amber-400",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  TREKKING_TIPS: "Trekking Tips",
  CULTURE: "Culture",
  SOLO_TRAVEL: "Solo Travel",
  GEAR_GUIDE: "Gear Guide",
};

export default function DashboardPage() {
  const [guides, setGuides] = useState<AdminGuide[]>([]);
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const [routeCount, setRouteCount] = useState(0);
  const [regionCount, setRegionCount] = useState(0);

  useEffect(() => {
    const g = getGuides();
    const b = getBlogs();
    const r = getRegions();
    setGuides(g);
    setBlogs(b);
    setRegionCount(r.length);
    setRouteCount(r.reduce((acc, reg) => acc + reg.routes.length, 0));
  }, []);

  const availableGuides = guides.filter(
    (g) => g.availabilityStatus === "AVAILABLE"
  ).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <p className="uppercase tracking-widest text-xs text-gray-500 mb-1">
          Overview
        </p>
        <h1 className="text-2xl font-display font-bold text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Users}
          label="Total Guides"
          value={guides.length}
          sub={`${availableGuides} available now`}
          color="bg-nepal-orange/10 text-nepal-orange"
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          value={blogs.length}
          sub="Published articles"
          color="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          icon={Mountain}
          label="Trek Regions"
          value={regionCount}
          sub="Managed regions"
          color="bg-purple-500/10 text-purple-400"
        />
        <StatCard
          icon={Map}
          label="Trek Routes"
          value={routeCount}
          sub="Across all regions"
          color="bg-emerald-500/10 text-emerald-400"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/admin/guides",
            label: "Manage Guides",
            icon: Users,
            desc: "Add, edit or remove guide profiles",
          },
          {
            href: "/admin/blogs",
            label: "Write a Blog Post",
            icon: FileText,
            desc: "Publish trekking articles and guides",
          },
          {
            href: "/admin/regions",
            label: "Edit Trek Regions",
            icon: Mountain,
            desc: "Manage regions, routes & itineraries",
          },
        ].map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="group bg-slate-900 border border-white/10 hover:border-nepal-orange/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-200"
          >
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-nepal-orange/10 transition-colors">
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-nepal-orange transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-nepal-orange group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>

      {/* Recent section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent guides */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-nepal-orange" />
              <h2 className="text-sm font-semibold text-white">
                Recent Guides
              </h2>
            </div>
            <Link
              href="/admin/guides"
              className="text-xs text-gray-500 hover:text-nepal-orange transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {guides.slice(0, 5).map((guide) => {
              const s = STATUS_MAP[guide.availabilityStatus];
              const StatusIcon = s.icon;
              return (
                <div
                  key={guide.id}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                    {guide.image && !guide.image.startsWith("/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px] font-bold">
                        {guide.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {guide.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {guide.specialty}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${s.cls}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                </div>
              );
            })}
            {guides.length === 0 && (
              <p className="px-5 py-6 text-sm text-gray-500 text-center">
                No guides yet.{" "}
                <Link
                  href="/admin/guides"
                  className="text-nepal-orange hover:underline"
                >
                  Add one
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Recent blogs */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">
                Recent Blog Posts
              </h2>
            </div>
            <Link
              href="/admin/blogs"
              className="text-xs text-gray-500 hover:text-nepal-orange transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {blogs.slice(0, 5).map((blog) => (
              <div key={blog.id} className="px-5 py-3">
                <p className="text-sm font-semibold text-white leading-tight line-clamp-1">
                  {blog.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {CATEGORY_LABELS[blog.category] ?? blog.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    by {blog.authorName}
                  </span>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <p className="px-5 py-6 text-sm text-gray-500 text-center">
                No posts yet.{" "}
                <Link
                  href="/admin/blogs"
                  className="text-nepal-orange hover:underline"
                >
                  Write one
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
