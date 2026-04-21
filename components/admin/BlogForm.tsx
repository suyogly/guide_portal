"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ChevronDown } from "lucide-react";
import {
  toSlug,
  type AdminBlog,
} from "@/lib/admin-store";
import ImageUpload from "@/components/admin/ImageUpload";

// ─── Shared primitives ────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-slate-900 border border-white/10 px-3.5 py-2.5 text-white placeholder:text-gray-600 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm";
const selectCls =
  "w-full rounded-xl bg-slate-900 border border-white/10 px-3.5 py-2.5 text-white focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm appearance-none";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block uppercase tracking-widest text-[10px] text-gray-400 mb-1.5 font-semibold">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-600 mt-1">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-5">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">{title}</h2>
      {children}
    </section>
  );
}

const CATEGORIES = [
  { value: "TREKKING_TIPS", label: "Trekking Tips" },
  { value: "CULTURE", label: "Culture" },
  { value: "SOLO_TRAVEL", label: "Solo Travel" },
  { value: "GEAR_GUIDE", label: "Gear Guide" },
];

// ─── BlogForm ─────────────────────────────────────────────────────────────────

export default function BlogForm({ blogId, initialData }: { blogId?: string; initialData?: AdminBlog }) {
  const router = useRouter();
  const isEditing = !!blogId;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState<AdminBlog["category"]>(initialData?.category ?? "TREKKING_TIPS");
  const [authorName, setAuthorName] = useState(initialData?.authorName ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt ?? new Date().toISOString().split("T")[0]
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [saving, setSaving] = useState(false);

  // Only fetch if editing and no SSR data was provided
  useEffect(() => {
    if (!blogId || initialData !== undefined) return;
    fetch(`/api/blogs/${blogId}`)
      .then((r) => r.json())
      .then((b: AdminBlog) => {
        setTitle(b.title);
        setSlug(b.slug);
        setCategory(b.category);
        setAuthorName(b.authorName);
        setPublishedAt(b.publishedAt);
        setCoverImage(b.coverImage);
        setExcerpt(b.excerpt);
        setContent(b.content);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  async function handleSave() {
    if (!title.trim()) return;
    setSaving(true);

    const payload = {
      slug: slug.trim() || toSlug(title),
      title: title.trim(),
      category,
      authorName: authorName.trim(),
      publishedAt,
      coverImage,
      excerpt: excerpt.trim(),
      content: content.trim(),
    };

    try {
      const url = isEditing ? `/api/blogs/${blogId}` : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Blog Posts</p>
            <h1 className="text-base font-display font-bold text-white leading-tight">
              {isEditing ? `Edit — ${title || "Post"}` : "New Blog Post"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          {isEditing ? "Update Post" : "Publish Post"}
        </button>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* ── Info ── */}
        <Section title="Post Info">
          <Field label="Title">
            <input
              className={inputCls}
              placeholder="The Ultimate Guide to Solo Trekking in Nepal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => { if (!isEditing && title && !slug) setSlug(toSlug(title)); }}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Slug" hint="URL path identifier">
              <input
                className={inputCls}
                placeholder="solo-trekking-guide-2024"
                value={slug}
                onChange={(e) => setSlug(toSlug(e.target.value))}
              />
            </Field>
            <Field label="Category">
              <div className="relative">
                <select
                  className={selectCls}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AdminBlog["category"])}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author Name">
              <input
                className={inputCls}
                placeholder="Pasang Sherpa"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </Field>
            <Field label="Published Date">
              <input
                type="date"
                className={inputCls}
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </Field>
          </div>
        </Section>

        {/* ── Cover Image ── */}
        <Section title="Cover Image">
          <ImageUpload
            label="Cover Photo"
            value={coverImage}
            onChange={setCoverImage}
            folder="blogs/cover"
            ratio="16/9"
            ratioLabel="16:9"
            recommendedSize="1600 × 900 px"
            maxPx={1400}
          />
        </Section>

        {/* ── Content ── */}
        <Section title="Content">
          <Field label="Excerpt" hint="Short teaser shown on the blog listing page">
            <textarea
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="A brief, compelling summary of this post…"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </Field>

          <Field
            label="Body (HTML)"
            hint="Supports <p>, <h3>, <h4>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>"
          >
            <textarea
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              rows={22}
              placeholder={"<p>Start writing your blog post here…</p>\n\n<h3>Section Title</h3>\n<p>Body content goes here.</p>\n\n<ul>\n  <li>Point one</li>\n  <li>Point two</li>\n</ul>"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>
        </Section>
      </div>
    </div>
  );
}
