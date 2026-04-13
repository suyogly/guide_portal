"use client";

import { useRef } from "react";
import { Upload, RefreshCw, X } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;           // base64 data-URL or https:// URL
  onChange: (v: string) => void;
  ratio?: string;          // CSS aspect-ratio, e.g. "16/9" or "1/1"
  ratioLabel?: string;     // shown to user, e.g. "16:9"
  recommendedSize?: string;// e.g. "1600 × 900 px"
  maxPx?: number;          // max width or height after compression
  className?: string;
}

async function compressImage(file: File, maxPx: number): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxPx || height > maxPx) {
          if (width >= height) {
            height = Math.round((height * maxPx) / width);
            width = maxPx;
          } else {
            width = Math.round((width * maxPx) / height);
            height = maxPx;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({
  label,
  value,
  onChange,
  ratio = "16/9",
  ratioLabel,
  recommendedSize,
  maxPx = 1200,
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, maxPx);
    onChange(compressed);
    e.target.value = ""; // allow same file to be re-picked
  }

  const metaLabel = [ratioLabel && `Ratio ${ratioLabel}`, recommendedSize]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={className}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="uppercase tracking-widest text-[10px] text-gray-400 font-semibold">
          {label}
        </span>
        {metaLabel && (
          <span className="text-[10px] text-gray-600">{metaLabel}</span>
        )}
      </div>

      {value ? (
        /* Preview state */
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-full object-cover"
            style={{ aspectRatio: ratio }}
          />
          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500/80 backdrop-blur-md border border-red-500/40 rounded-full p-1.5 text-white hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty / upload state */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-white/10 hover:border-nepal-orange/50 rounded-xl flex flex-col items-center justify-center gap-2.5 transition-colors cursor-pointer group"
          style={{ aspectRatio: ratio }}
        >
          <div className="p-3 rounded-xl bg-white/5 group-hover:bg-nepal-orange/10 transition-colors">
            <Upload className="w-5 h-5 text-gray-500 group-hover:text-nepal-orange transition-colors" />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
              Click to upload
            </p>
            {recommendedSize && (
              <p className="text-xs text-gray-600 mt-0.5">
                {recommendedSize} · JPEG or PNG
              </p>
            )}
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
