"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X, ChevronDown } from "lucide-react";
import {
  genId,
  toSlug,
  type AdminRoute,
  type AdminFaq,
  type AdminItineraryDay,
} from "@/lib/admin-store";
import ImageUpload from "@/components/admin/ImageUpload";

// ─── Primitives ───────────────────────────────────────────────────────────────

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

// ─── FAQ editor ───────────────────────────────────────────────────────────────

function FaqEditor({ faqs, onChange }: { faqs: AdminFaq[]; onChange: (f: AdminFaq[]) => void }) {
  function add() { onChange([...faqs, { id: genId(), question: "", answer: "" }]); }
  function remove(id: string) { onChange(faqs.filter((f) => f.id !== id)); }
  function update(id: string, key: keyof AdminFaq, value: string) {
    onChange(faqs.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  }
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={faq.id} className="bg-slate-950 border border-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">FAQ {i + 1}</span>
            <button type="button" onClick={() => remove(faq.id)} className="text-gray-600 hover:text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <input className={inputCls} placeholder="Question" value={faq.question} onChange={(e) => update(faq.id, "question", e.target.value)} />
          <textarea className={`${inputCls} resize-none`} rows={2} placeholder="Answer" value={faq.answer} onChange={(e) => update(faq.id, "answer", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-xs text-nepal-orange hover:text-orange-400 transition-colors">
        <Plus className="w-3.5 h-3.5" />Add FAQ
      </button>
    </div>
  );
}

// ─── Itinerary editor ─────────────────────────────────────────────────────────

function ItineraryEditor({
  days,
  onChange,
}: {
  days: AdminItineraryDay[];
  onChange: (d: AdminItineraryDay[]) => void;
}) {
  function add() {
    onChange([
      ...days,
      {
        id: genId(),
        dayNumber: days.length + 1,
        title: "",
        description: "",
        distanceKm: "",
        elevationGainM: "",
        estimatedTime: "",
        altitudeM: "",
        isRestDay: false,
        guideTip: "",
        flexNote: "",
      },
    ]);
  }

  function remove(id: string) {
    onChange(
      days.filter((d) => d.id !== id).map((d, i) => ({ ...d, dayNumber: i + 1 }))
    );
  }

  function update(id: string, key: keyof AdminItineraryDay, value: string | boolean | number) {
    onChange(days.map((d) => (d.id === id ? { ...d, [key]: value } : d)));
  }

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <div key={day.id} className="bg-slate-950 border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400">Day {day.dayNumber}</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded accent-[#FF671F]"
                  checked={day.isRestDay}
                  onChange={(e) => update(day.id, "isRestDay", e.target.checked)}
                />
                Rest Day
              </label>
              <button type="button" onClick={() => remove(day.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <input className={inputCls} placeholder="Day title (e.g. Fly to Lukla, Trek to Phakding)" value={day.title} onChange={(e) => update(day.id, "title", e.target.value)} />
          <textarea className={`${inputCls} resize-none`} rows={2} placeholder="What happens this day…" value={day.description} onChange={(e) => update(day.id, "description", e.target.value)} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <input className={inputCls} placeholder="Distance km" value={day.distanceKm} onChange={(e) => update(day.id, "distanceKm", e.target.value)} />
            <input className={inputCls} placeholder="Elev. gain m" value={day.elevationGainM} onChange={(e) => update(day.id, "elevationGainM", e.target.value)} />
            <input className={inputCls} placeholder="Est. time" value={day.estimatedTime} onChange={(e) => update(day.id, "estimatedTime", e.target.value)} />
            <input className={inputCls} placeholder="Altitude m" value={day.altitudeM} onChange={(e) => update(day.id, "altitudeM", e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input className={inputCls} placeholder="Guide tip (optional)" value={day.guideTip} onChange={(e) => update(day.id, "guideTip", e.target.value)} />
            <input className={inputCls} placeholder="Flex note (optional)" value={day.flexNote} onChange={(e) => update(day.id, "flexNote", e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-xs text-nepal-orange hover:text-orange-400 transition-colors">
        <Plus className="w-3.5 h-3.5" />Add Itinerary Day
      </button>
    </div>
  );
}

// ─── RouteForm ────────────────────────────────────────────────────────────────

const DIFFICULTY_OPTS = ["EASY", "MODERATE", "DIFFICULT", "STRENUOUS"] as const;

export default function RouteForm({
  regionId,
  routeId,
}: {
  regionId: string;
  routeId?: string;
}) {
  const router = useRouter();
  const isEditing = !!routeId;

  // ── Region metadata ──
  const [regionTitle, setRegionTitle] = useState("");

  // ── Form state ──
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [difficulty, setDifficulty] = useState<AdminRoute["difficulty"]>("MODERATE");
  const [maxAltitudeM, setMaxAltitudeM] = useState(0);
  const [durationDays, setDurationDays] = useState(0);
  const [bestSeason, setBestSeason] = useState("");
  const [authorName, setAuthorName] = useState("TrekGuide Hub");
  const [publishedAt, setPublishedAt] = useState(() => new Date().toISOString().split("T")[0]);
  const [faqs, setFaqs] = useState<AdminFaq[]>([]);
  const [itinerary, setItinerary] = useState<AdminItineraryDay[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load region title
    fetch(`/api/regions/${regionId}`)
      .then((r) => r.json())
      .then((r: { title: string }) => setRegionTitle(r.title))
      .catch(console.error);

    if (!routeId) return;

    // Load route data for editing
    fetch(`/api/regions/${regionId}/routes/${routeId}`)
      .then((r) => r.json())
      .then((route: AdminRoute) => {
        setTitle(route.title);
        setSlug(route.slug);
        setDescription(route.description);
        setBody(route.body);
        setCoverImage(route.coverImage);
        setDifficulty(route.difficulty);
        setMaxAltitudeM(route.maxAltitudeM);
        setDurationDays(route.durationDays);
        setBestSeason(route.bestSeason);
        setAuthorName(route.authorName);
        setPublishedAt(route.publishedAt ? route.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0]);
        setFaqs(route.faqs ?? []);
        setItinerary(route.itinerary ?? []);
      })
      .catch(console.error);
  }, [regionId, routeId]);

  async function handleSave() {
    if (!title.trim()) return;
    setSaving(true);

    const payload = {
      slug: slug.trim() || toSlug(title),
      title: title.trim(),
      description: description.trim(),
      body: body.trim(),
      coverImage,
      difficulty,
      maxAltitudeM,
      durationDays,
      bestSeason: bestSeason.trim(),
      authorName: authorName.trim(),
      publishedAt,
      faqs,
      itinerary,
    };

    try {
      const url = isEditing
        ? `/api/regions/${regionId}/routes/${routeId}`
        : `/api/regions/${regionId}/routes`;
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
            <p className="text-[10px] uppercase tracking-widest text-gray-500">
              {regionTitle || "Trek Region"} → Routes
            </p>
            <h1 className="text-base font-display font-bold text-white leading-tight">
              {isEditing ? `Edit — ${title || "Route"}` : "New Trek Route"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          {isEditing ? "Update Route" : "Add Route"}
        </button>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {/* ── Identity ── */}
        <Section title="Route Info">
          <Field label="Route Title">
            <input
              className={inputCls}
              placeholder="Everest Base Camp Trek"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!isEditing) setSlug(toSlug(e.target.value));
              }}
            />
          </Field>
          <Field label="Slug">
            <input className={inputCls} placeholder="everest-base-camp-trek" value={slug} onChange={(e) => setSlug(toSlug(e.target.value))} />
          </Field>
          <Field label="Short Description" hint="Shown on listing cards">
            <textarea className={`${inputCls} resize-none`} rows={2} placeholder="A brief teaser for the route listing…" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>
        </Section>

        {/* ── Cover Image ── */}
        <Section title="Cover Image">
          <ImageUpload label="Route Cover Photo" value={coverImage} onChange={setCoverImage} folder="routes/cover" ratio="16/9" ratioLabel="16:9" recommendedSize="1600 × 900 px" maxPx={1400} />
        </Section>

        {/* ── Metadata ── */}
        <Section title="Route Metadata">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Difficulty">
              <div className="relative">
                <select className={selectCls} value={difficulty} onChange={(e) => setDifficulty(e.target.value as AdminRoute["difficulty"])}>
                  {DIFFICULTY_OPTS.map((d) => (
                    <option key={d} value={d}>{d.charAt(0) + d.slice(1).toLowerCase()}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </Field>
            <Field label="Duration (Days)">
              <input type="number" min={1} className={inputCls} value={durationDays} onChange={(e) => setDurationDays(Number(e.target.value))} />
            </Field>
            <Field label="Max Altitude (m)">
              <input type="number" min={0} className={inputCls} value={maxAltitudeM} onChange={(e) => setMaxAltitudeM(Number(e.target.value))} />
            </Field>
            <Field label="Best Season">
              <input className={inputCls} placeholder="Mar–May, Sep–Nov" value={bestSeason} onChange={(e) => setBestSeason(e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author Name">
              <input className={inputCls} placeholder="TrekGuide Hub" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
            </Field>
            <Field label="Published Date">
              <input type="date" className={inputCls} value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
            </Field>
          </div>
        </Section>

        {/* ── Full Body ── */}
        <Section title="Full Body (HTML)">
          <Field label="Content" hint="Supports <p>, <h3>, <h4>, <ul>, <ol>, <li>, <blockquote>">
            <textarea
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              rows={14}
              placeholder={"<p>Detailed route description…</p>\n\n<h3>Highlights</h3>\n<ul>\n  <li>Point one</li>\n</ul>"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Field>
        </Section>

        {/* ── Itinerary ── */}
        <Section title="Itinerary Days">
          <p className="text-xs text-gray-500 -mt-2">
            Add day-by-day breakdown of the trek. Days are numbered automatically.
          </p>
          <ItineraryEditor days={itinerary} onChange={setItinerary} />
        </Section>

        {/* ── FAQs ── */}
        <Section title="Route FAQs">
          <FaqEditor faqs={faqs} onChange={setFaqs} />
        </Section>
      </div>
    </div>
  );
}
