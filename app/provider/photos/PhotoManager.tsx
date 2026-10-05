"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { addWorkPhoto, deleteWorkPhoto } from "@/lib/actions/provider-action";

// Resize in the browser so uploads stay small (max 1200px, JPEG)
async function compress(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export default function PhotoManager({ photos }: { photos: { id: string; url: string; caption: string | null }[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setErr("");
    for (const file of Array.from(files).slice(0, 6)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const r = await addWorkPhoto(await compress(file), caption);
        if (r.error) {
          setErr(r.error);
          break;
        }
      } catch {
        setErr("Could not read that image.");
      }
    }
    setBusy(false);
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div data-no-tilt className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-6 text-center">
        <p className="text-3xl">📷</p>
        <p className="mt-2 text-sm font-semibold text-gray-700">Upload photos of your best work</p>
        <p className="text-xs text-gray-400">JPG or PNG · up to 24 photos</p>
        <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-yellow-400"
          />
          <button disabled={busy} onClick={() => fileRef.current?.click()} className="rounded-xl bg-yellow-400 px-5 py-2 text-sm font-bold text-gray-900 hover:bg-yellow-500 disabled:opacity-60">
            {busy ? "Uploading..." : "Choose photos"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
        </div>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <figure key={p.id} className="tilt-3d group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt={p.caption ?? "Work photo"} className="aspect-square w-full object-cover" />
              {p.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 p-2 text-xs text-white">{p.caption}</figcaption>}
              <button
                onClick={async () => {
                  if (!confirm("Delete this photo?")) return;
                  await deleteWorkPhoto(p.id);
                  router.refresh();
                }}
                className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-red-600 opacity-0 transition group-hover:opacity-100"
              >
                Delete
              </button>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
