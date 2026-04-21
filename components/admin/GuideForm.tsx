"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Save, ChevronDown } from "lucide-react";
import {
  genId,
  toSlug,
  computeAvailability,
  type AdminGuide,
  type AdminLanguage,
} from "@/lib/admin-store";
import ImageUpload from "@/components/admin/ImageUpload";
import AvailabilityCalendar from "@/components/admin/AvailabilityCalendar";

// ─── Shared form primitives ───────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-slate-900 border border-white/10 px-3.5 py-2.5 text-white placeholder:text-gray-600 focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm";
const selectCls =
  "w-full rounded-xl bg-slate-900 border border-white/10 px-3.5 py-2.5 text-white focus:border-nepal-orange focus:ring-1 focus:ring-nepal-orange focus:outline-none transition-colors text-sm appearance-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
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

// ─── GuideForm ────────────────────────────────────────────────────────────────

async function compressAndUploadGallery(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load failed"));
      img.onload = () => {
        const MAX = 900;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width >= height) { height = Math.round((height * MAX) / width); width = MAX; }
          else { width = Math.round((width * MAX) / height); height = MAX; }
        }
        const c = document.createElement("canvas");
        c.width = width; c.height = height;
        c.getContext("2d")!.drawImage(img, 0, 0, width, height);
        c.toBlob(async (blob) => {
          if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
          try {
            const form = new FormData();
            form.append("file", blob, `gallery-${Date.now()}.jpg`);
            form.append("folder", "guides/gallery");
            const res = await fetch("/api/admin/upload", { method: "POST", body: form });
            if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
            const { url } = await res.json() as { url: string };
            resolve(url);
          } catch (err) { reject(err); }
        }, "image/jpeg", 0.80);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

type CatalogTrekRoute = { id: string; slug: string; title: string; regionTitle: string };
type RouteRateRow = { id: string; trekRouteId: string; ratePerDay: number };

export default function GuideForm({
  guideId,
  initialData,
  initialCatalogRoutes,
}: {
  guideId?: string;
  initialData?: AdminGuide;
  initialCatalogRoutes?: CatalogTrekRoute[];
}) {
  const router = useRouter();
  const isEditing = !!guideId;
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // ── State — seeded from SSR props when available ──
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [specialty, setSpecialty] = useState(initialData?.specialty ?? "");
  const [quote, setQuote] = useState(initialData?.quote ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [gender, setGender] = useState<"MALE" | "FEMALE">(initialData?.gender ?? "MALE");
  const [region, setRegion] = useState(initialData?.region ?? "");

  const [image, setImage] = useState(initialData?.image ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [photos, setPhotos] = useState<string[]>(initialData?.photos ?? []);

  const [experienceYears, setExperienceYears] = useState(initialData?.experienceYears ?? 0);
  const [experience, setExperience] = useState(initialData?.experience ?? "");
  const [licenseNumber, setLicenseNumber] = useState(initialData?.licenseNumber ?? "");
  const [kycVerified, setKycVerified] = useState(initialData?.kycVerified ?? false);
  const [isVerified, setIsVerified] = useState(initialData?.isVerified ?? false);
  const [ratePerDay, setRatePerDay] = useState(initialData?.ratePerDay ?? 30);
  const [rating, setRating] = useState(initialData?.rating ?? 5.0);

  const [catalogRoutes, setCatalogRoutes] = useState<CatalogTrekRoute[]>(initialCatalogRoutes ?? []);
  const [routeRates, setRouteRates] = useState<RouteRateRow[]>(
    (initialData?.routeRates ?? []).map((rr) => ({
      id: rr.id,
      trekRouteId: rr.trekRouteId,
      ratePerDay: rr.ratePerDay,
    }))
  );

  const [unavailableDates, setUnavailableDates] = useState<string[]>(initialData?.unavailableDates ?? []);
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AdminGuide["availabilityStatus"]>(initialData?.availabilityStatus ?? "AVAILABLE");
  const [availableFromDate, setAvailableFromDate] = useState(initialData?.availableFromDate ?? "");

  const [languages, setLanguages] = useState<AdminLanguage[]>(initialData?.languages ?? []);
  const [tags, setTags] = useState(initialData?.tags ?? "");
  const [specializedRoutes, setSpecializedRoutes] = useState(initialData?.specializedRoutes ?? "");

  const [saving, setSaving] = useState(false);

  // ── Trek route catalog — only fetch if not supplied by SSR ──
  useEffect(() => {
    if (initialCatalogRoutes !== undefined) return;
    fetch("/api/trek-routes")
      .then((r) => r.json())
      .then(
        (data: {
          routes?: { id: string; slug: string; title: string; region: { title: string } }[];
        }) => {
          setCatalogRoutes(
            (data.routes ?? []).map((rt) => ({
              id: rt.id,
              slug: rt.slug,
              title: rt.title,
              regionTitle: rt.region?.title ?? "",
            }))
          );
        }
      )
      .catch(() => setCatalogRoutes([]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load existing guide — only if editing AND no SSR data provided ──
  useEffect(() => {
    if (!guideId || initialData !== undefined) return;
    fetch(`/api/guides/${guideId}`)
      .then((r) => r.json())
      .then((g: AdminGuide) => {
        setName(g.name);
        setSlug(g.slug);
        setSpecialty(g.specialty);
        setQuote(g.quote);
        setDescription(g.description);
        setGender(g.gender);
        setRegion(g.region);
        setImage(g.image);
        setCoverImage(g.coverImage);
        setPhotos(g.photos);
        setExperienceYears(g.experienceYears);
        setExperience(g.experience);
        setLicenseNumber(g.licenseNumber);
        setKycVerified(g.kycVerified);
        setIsVerified(g.isVerified);
        setRatePerDay(g.ratePerDay);
        setRating(g.rating);
        setUnavailableDates(g.unavailableDates);
        setAvailabilityStatus(g.availabilityStatus);
        setAvailableFromDate(g.availableFromDate);
        setLanguages(g.languages);
        setTags(g.tags);
        setSpecializedRoutes(g.specializedRoutes);
        setRouteRates(
          (g.routeRates ?? []).map((rr) => ({
            id: rr.id,
            trekRouteId: rr.trekRouteId,
            ratePerDay: rr.ratePerDay,
          }))
        );
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideId]);

  // ── Availability change from calendar ──
  function handleAvailabilityChange(
    dates: string[],
    status: AdminGuide["availabilityStatus"],
    fromDate: string
  ) {
    setUnavailableDates(dates);
    setAvailabilityStatus(status);
    setAvailableFromDate(fromDate);
  }

  // ── Languages ──
  function addLanguage() {
    setLanguages((prev) => [...prev, { id: genId(), language: "", proficiency: "FLUENT" }]);
  }
  function removeLanguage(id: string) {
    setLanguages((prev) => prev.filter((l) => l.id !== id));
  }
  function updateLanguage(id: string, key: keyof AdminLanguage, value: string) {
    setLanguages((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  }

  // ── Gallery photos ──
  async function handleGalleryAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const urls = await Promise.all(files.map(compressAndUploadGallery));
    setPhotos((prev) => [...prev, ...urls].slice(0, 8));
    e.target.value = "";
  }
  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  function addRouteRateRow() {
    setRouteRates((prev) => [
      ...prev,
      { id: genId(), trekRouteId: "", ratePerDay: ratePerDay || 30 },
    ]);
  }
  function removeRouteRateRow(rowId: string) {
    setRouteRates((prev) => prev.filter((r) => r.id !== rowId));
  }
  function updateRouteRateRow(rowId: string, patch: Partial<RouteRateRow>) {
    setRouteRates((prev) => prev.map((r) => (r.id === rowId ? { ...r, ...patch } : r)));
  }

  function catalogOptionsForRow(rowId: string) {
    const taken = new Set(
      routeRates.filter((r) => r.id !== rowId && r.trekRouteId).map((r) => r.trekRouteId)
    );
    return catalogRoutes.filter((r) => !taken.has(r.id));
  }

  // ── Save ──
  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);

    const fluency = languages
      .filter((l) => l.language.trim())
      .map((l) => `${l.language} (${l.proficiency.charAt(0) + l.proficiency.slice(1).toLowerCase()})`)
      .join(", ");

    const { status, availableFromDate: autoFrom } = computeAvailability(unavailableDates);

    const payload = {
      slug: slug.trim() || toSlug(name),
      name: name.trim(),
      specialty: specialty.trim(),
      quote: quote.trim(),
      description: description.trim(),
      gender,
      region: region.trim(),
      image,
      coverImage,
      photos,
      experienceYears,
      experience: experience.trim(),
      licenseNumber: licenseNumber.trim(),
      kycVerified,
      isVerified,
      ratePerDay,
      rating,
      unavailableDates,
      availabilityStatus: status,
      availableFromDate: autoFrom,
      languages,
      tags: tags.trim(),
      specializedRoutes: specializedRoutes.trim(),
      fluency,
      routeRates: routeRates
        .filter((r) => r.trekRouteId)
        .map(({ trekRouteId, ratePerDay: d }) => ({ trekRouteId, ratePerDay: d })),
    };

    try {
      const url = isEditing ? `/api/guides/${guideId}` : "/api/guides";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/guides");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  const pageTitle = isEditing ? `Edit — ${name || "Guide"}` : "New Guide";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/guides"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Guides</p>
            <h1 className="text-base font-display font-bold text-white leading-tight">
              {pageTitle}
            </h1>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="flex items-center gap-2 rounded-full bg-nepal-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nepal-orange/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          {isEditing ? "Update Guide" : "Create Guide"}
        </button>
      </div>

      {/* Form body */}
      <div className="p-6 space-y-6 pb-20">
        {/* ── Identity ── */}
        <Section title="Identity">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                className={inputCls}
                placeholder="Tulasi Ram Paudel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => {
                  if (!isEditing && name && !slug) setSlug(toSlug(name));
                }}
              />
            </Field>
            <Field label="Slug" hint="Auto-generated from name, used in the public URL">
              <input
                className={inputCls}
                placeholder="tulasi-ram-paudel"
                value={slug}
                onChange={(e) => setSlug(toSlug(e.target.value))}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Specialty">
              <input
                className={inputCls}
                placeholder="Trek / Tour / Birding Guide"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </Field>
            <Field label="Gender">
              <div className="relative">
                <select
                  className={selectCls}
                  value={gender}
                  onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                >
                  <option value="MALE">Male Guide</option>
                  <option value="FEMALE">Female Guide</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </Field>
          </div>

          <Field label="Region">
            <input
              className={inputCls}
              placeholder="Annapurna Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </Field>

          <Field label="Personal Quote">
            <input
              className={inputCls}
              placeholder="What drives you to guide?"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </Field>

          <Field label="Bio / Description">
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              placeholder="Tell trekkers about this guide's experience, personality, and approach…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </Section>

        {/* ── Media ── */}
        <Section title="Media">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUpload
              label="Profile Photo"
              value={image}
              onChange={setImage}
              folder="guides/avatar"
              ratio="1/1"
              ratioLabel="1:1"
              recommendedSize="400 × 400 px"
              maxPx={600}
            />
            <ImageUpload
              label="Cover / Hero Image"
              value={coverImage}
              onChange={setCoverImage}
              folder="guides/cover"
              ratio="16/9"
              ratioLabel="16:9"
              recommendedSize="1600 × 900 px"
              maxPx={1400}
            />
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="uppercase tracking-widest text-[10px] text-gray-400 font-semibold">
                Gallery Photos
              </span>
              <span className="text-[10px] text-gray-600">
                Ratio 4:3 · 800 × 600 px · max 8
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden border border-white/10"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 8 && (
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 hover:border-nepal-orange/50 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Plus className="w-5 h-5 text-gray-600 group-hover:text-nepal-orange transition-colors" />
                  <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">
                    Add Photo
                  </span>
                </button>
              )}
            </div>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryAdd}
            />
          </div>
        </Section>

        {/* ── Professional ── */}
        <Section title="Professional Details">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Exp. Years">
              <input
                type="number"
                min={0}
                className={inputCls}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
              />
            </Field>
            <Field label="Display (e.g. 15+ Years)">
              <input
                className={inputCls}
                placeholder="15+ Years"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Field>
            <Field label="Rating (0–5)">
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                className={inputCls}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </Field>
            <Field
              label="Base rate / day (USD)"
              hint="Used when no per-route prices are set below. When routes are set, this should be your typical fallback; the site lists the lowest route rate."
            >
              <input
                type="number"
                min={0}
                className={inputCls}
                value={ratePerDay}
                onChange={(e) => setRatePerDay(Number(e.target.value))}
              />
            </Field>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Per-route pricing</p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Pick treks from your catalog and set USD/day for each. Optional — leave empty to use only the base rate above.
                </p>
              </div>
              <button
                type="button"
                onClick={addRouteRateRow}
                disabled={catalogRoutes.length === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-nepal-orange/40 bg-nepal-orange/10 px-3 py-1.5 text-xs font-bold text-nepal-orange hover:bg-nepal-orange/20 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add route
              </button>
            </div>
            {catalogRoutes.length === 0 && (
              <p className="text-xs text-amber-500/90">
                No trek routes in the database yet. Add regions & routes under Admin → Regions first.
              </p>
            )}
            {routeRates.length > 0 && (
              <div className="space-y-2">
                {routeRates.map((row) => {
                  const opts = catalogOptionsForRow(row.id);
                  const selected = catalogRoutes.find((c) => c.id === row.trekRouteId);
                  return (
                    <div
                      key={row.id}
                      className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 rounded-lg border border-white/5 bg-slate-900/80 p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                          Trek route
                        </label>
                        <div className="relative">
                          <select
                            className={selectCls}
                            value={row.trekRouteId}
                            onChange={(e) =>
                              updateRouteRateRow(row.id, { trekRouteId: e.target.value })
                            }
                          >
                            <option value="">Select route…</option>
                            {(row.trekRouteId
                              ? [
                                  ...opts,
                                  ...(selected && !opts.find((o) => o.id === selected.id)
                                    ? [selected]
                                    : []),
                                ]
                              : opts
                            ).map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.regionTitle ? `${c.regionTitle} · ` : ""}
                                {c.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                      <div className="w-full sm:w-28">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                          $ / day
                        </label>
                        <input
                          type="number"
                          min={0}
                          className={inputCls}
                          value={row.ratePerDay}
                          onChange={(e) =>
                            updateRouteRateRow(row.id, { ratePerDay: Number(e.target.value) })
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRouteRateRow(row.id)}
                        className="self-end sm:self-center p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label="Remove route row"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Field label="License Number" hint="Leave blank if no license held">
            <input
              className={inputCls}
              placeholder="NTB-22522"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </Field>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#FF671F]"
                checked={kycVerified}
                onChange={(e) => setKycVerified(e.target.checked)}
              />
              <span className="text-sm text-gray-300">KYC Verified</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#FF671F]"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
              />
              <span className="text-sm text-gray-300">Platform Verified</span>
            </label>
          </div>
        </Section>

        {/* ── Availability ── */}
        <Section title="Availability Calendar">
          <p className="text-xs text-gray-500 -mt-2">
            Click any future date to mark it as unavailable. The availability
            status is computed automatically from your selections.
          </p>
          <AvailabilityCalendar
            unavailableDates={unavailableDates}
            onChange={handleAvailabilityChange}
          />
        </Section>

        {/* ── Languages ── */}
        <Section title="Languages Spoken">
          <div className="space-y-2.5">
            {languages.map((lang) => (
              <div key={lang.id} className="flex gap-2 items-center">
                <input
                  className={`${inputCls} flex-1`}
                  placeholder="Language (e.g. English)"
                  value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                />
                <div className="relative w-36 shrink-0">
                  <select
                    className={selectCls}
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                  >
                    <option value="NATIVE">Native</option>
                    <option value="FLUENT">Fluent</option>
                    <option value="BASIC">Basic</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLanguage}
              className="flex items-center gap-1.5 text-xs text-nepal-orange hover:text-orange-400 transition-colors mt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Language
            </button>
          </div>
        </Section>

        {/* ── Tags & Specialization ── */}
        <Section title="Tags & Specialization">
          <Field label="Tags" hint="Comma-separated — shown as badges on the guide profile">
            <input
              className={inputCls}
              placeholder="Birding Expert, Trek & Tour, Solo Female"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Field>
          <Field
            label="Specialized Routes"
            hint="Comma-separated route names"
          >
            <input
              className={inputCls}
              placeholder="Annapurna Base Camp, Poon Hill Trek, Mardi Himal Trek"
              value={specializedRoutes}
              onChange={(e) => setSpecializedRoutes(e.target.value)}
            />
          </Field>
        </Section>
      </div>
    </div>
  );
}
