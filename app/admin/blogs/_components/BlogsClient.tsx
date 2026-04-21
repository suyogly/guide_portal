"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, AlertTriangle, FileText } from "lucide-react";
import type { AdminBlogListItem } from "@/lib/admin-store";

const CATEGORIES = [
  { value: "TREKKING_TIPS", label: "Trekking Tips" },
  { value: "CULTURE", label: "Culture" },
  { value: "SOLO_TRAVEL", label: "Solo Travel" },
  { value: "GEAR_GUIDE", label: "Gear Guide" },
];

const CATEGORY_COLORS: Record<string, string> = {
  TREKKING_TIPS: "text-blue-400 bg-blue-400/10",
  CULTURE: "text-purple-400 bg-purple-400/10",
  SOLO_TRAVEL: "text-amber-400 bg-amber-400/10",
  GEAR_GUIDE: "text-emerald-400 bg-emerald-400/10",
};

function DeleteModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
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
          <h2 className="font-display font-bold text-white text-base">Delete Post</h2>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Delete <span className="text-white font-semibold">&ldquo;{title}&rdquo;</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-full border border-white/20 py-2.5 text-sm font-semibold text-gray-300 hover:text-white hover:border-white/40 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlogsClient({ initialBlogs }: { initialBlogs: AdminBlogListItem[] }) {
  const [blogs, setBlogs] = useState<AdminBlogListItem[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminBlogListItem | null>(null);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.authorName.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(blog: AdminBlogListItem) {
    try {
      await fetch(`/api/blogs/${blog.id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
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
          <h1 className="text-2xl font-display font-bold text-white">Blog Posts</h1>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          className="w-full rounded-xl bg-slate-900 border border-white/10 pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm"
          placeholder="Search by title, author or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Title", "Category", "Author", "Published", ""].map((h) => (
                  <th key={h} className="text-left px-4 first:px-5 py-3.5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((blog) => {
                const catLabel = CATEGORIES.find((c) => c.value === blog.category)?.label ?? blog.category;
                const catColor = CATEGORY_COLORS[blog.category] ?? "text-gray-400 bg-gray-400/10";
                return (
                  <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                          {blog.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white leading-tight line-clamp-1">{blog.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{blog.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${catColor}`}>{catLabel}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{blog.authorName}</td>
                    <td className="px-4 py-3.5 text-gray-400 text-sm">{blog.publishedAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/blogs/${blog.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteTarget(blog)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    {search ? "No posts match your search." : "No blog posts yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-white/5">
          {filtered.map((blog) => {
            const catLabel = CATEGORIES.find((c) => c.value === blog.category)?.label ?? blog.category;
            const catColor = CATEGORY_COLORS[blog.category] ?? "text-gray-400 bg-gray-400/10";
            return (
              <div key={blog.id} className="p-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                  {blog.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm line-clamp-1">{blog.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColor}`}>{catLabel}</span>
                    <span className="text-xs text-gray-500">{blog.authorName}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={() => setDeleteTarget(blog)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-gray-500 text-sm">
              {search ? "No posts match your search." : "No blog posts yet."}
            </p>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
