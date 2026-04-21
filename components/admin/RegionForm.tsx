"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import {
  genId,
  toSlug,
  type AdminFaq,
} from "@/lib/admin-store";
import ImageUpload from "@/components/admin/ImageUpload";

// ─── Primitives ───────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-slate-900 border border-white/10 px-3.5 py-2.5 text-white placeholder:text-gray-600 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm";

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

// ─── FAQ editor (inline) ──────────────────────────────────────────────────────

function FaqEditor({ faqs, onChange }: { faqs: AdminFaq[]; onChange: (f: AdminFaq[]) => void }) {
  function add() {
    onChange([...faqs, { id: genId(), question: "", answer: "" }]);
  }
  function remove(id: string) {
    onChange(faqs.filter((f) => f.id !== id));
  }
  function update(id: string, key: keyof AdminFaq, value: string) {
    onChange(faqs.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={faq.id} className="bg-slate-950 border border-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
              FAQ {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(faq.id)}
              className="text-gray-600 hover:text-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            className={inputCls}
            placeholder="Question"
            value={faq.question}
            onChange={(e) => update(faq.id, "question", e.target.value)}
          />
          <textarea
            className={`${inputCls} resize-none`}
            rows={2}
            placeholder="Answer"
            value={faq.answer}
            onChange={(e) => update(faq.id, "answer", e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-nepal-orange hover:text-orange-400 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add FAQ
      </button>
    </div>
  );
}

// ─── RegionForm ───────────────────────────────────────────────────────────────

type RegionInitialData = {
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  publishedAt: string;
  faqs: AdminFaq[];
};

export default function RegionForm({ regionId, initialData }: { regionId?: string; initialData?: RegionInitialData }) {
  const router = useRouter();
  const isEditing = !!regionId;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [heroImage, setHeroImage] = useState(initialData?.heroImage ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt ? initialData.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  const [faqs, setFaqs] = useState<AdminFaq[]>(initialData?.faqs ?? []);
  const [saving, setSaving] = useState(false);

  // Only fetch if editing and no SSR data was provided
  useEffect(() => {
    if (!regionId || initialData !== undefined) return;
    fetch(`/api/regions/${regionId}`)
      .then((r) => r.json())
      .then((r: { title: string; slug: string; description: string; heroImage: string; publishedAt: string; faqs: AdminFaq[] }) => {
        setTitle(r.title);
        setSlug(r.slug);
        setDescription(r.description);
        setHeroImage(r.heroImage);
        setPublishedAt(r.publishedAt ? r.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0]);
        setFaqs(r.faqs ?? []);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  async function handleSave() {
    if (!title.trim()) return;
    setSaving(true);

    const payload = {
      slug: slug.trim() || toSlug(title),
      title: title.trim(),
      description: description.trim(),
      heroImage,
      publishedAt,
      faqs,
    };

    try {
      const url = isEditing ? `/api/regions/${regionId}` : "/api/regions";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/regions");
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
            href="/admin/regions"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Trek Regions</p>
            <h1 className="text-base font-display font-bold text-white leading-tight">
              {isEditing ? `Edit — ${title || "Region"}` : "New Trek Region"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          {isEditing ? "Update Region" : "Create Region"}
        </button>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* ── Identity ── */}
        <Section title="Region Info">
          <Field label="Region Title">
            <input
              className={inputCls}
              placeholder="Everest Region"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isEditing) setSlug(toSlug(e.target.value));
              }}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Slug">
              <input
                className={inputCls}
                placeholder="everest-region"
                value={slug}
                onChange={(e) => setSlug(toSlug(e.target.value))}
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
          <Field label="Description">
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              placeholder="Brief overview of the region for trekkers…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </Section>

        {/* ── Hero Image ── */}
        <Section title="Hero / Banner Image">
          <ImageUpload
            label="Banner Photo"
            value={heroImage}
            onChange={setHeroImage}
            ratio="21/9"
            ratioLabel="21:9"
            recommendedSize="2100 × 900 px"
            maxPx={1600}
          />
        </Section>

        {/* ── FAQs ── */}
        <Section title="Frequently Asked Questions">
          <p className="text-xs text-gray-500 -mt-2">
            Add common questions about this region. These appear on the region page.
          </p>
          <FaqEditor faqs={faqs} onChange={setFaqs} />
        </Section>
      </div>
    </div>
  );
}
