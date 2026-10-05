import Link from "next/link";
import Image from "next/image";
import { listProviders } from "@/lib/queries";
import { SPECIALTIES, initials } from "@/lib/format";
import Reveal from "@/components/motion/Reveal";
import Tilt3D from "@/components/motion/Tilt3D";

export const dynamic = "force-dynamic";

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; specialty?: string; city?: string }>;
}) {
  const { q, specialty, city } = await searchParams;
  const providers = await listProviders({ q, specialty, city }).catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section data-no-reveal className="bg-[#1A2332] px-4 py-14 text-center">
        <Reveal>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Find a Professional</h1>
          <p className="mx-auto mt-3 max-w-lg text-gray-400">Verified contractors, architects, engineers and more near you</p>
        </Reveal>
        <form className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name or service..."
            className="flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none ring-yellow-400 focus:ring-2 bg-white"
          />
          <select name="specialty" defaultValue={specialty ?? ""} className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700 outline-none">
            <option value="">All specialties</option>
            {SPECIALTIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            name="city"
            defaultValue={city}
            placeholder="City"
            className="rounded-xl bg-white px-4 py-3 text-sm text-gray-900 outline-none sm:w-36"
          />
          <button className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-500">Search</button>
        </form>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-gray-500">
          {providers.length} professional{providers.length === 1 ? "" : "s"} found
        </p>

        {providers.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">
            <p className="text-lg font-bold text-gray-900">No professionals match your search</p>
            <p className="mt-2 text-sm text-gray-400">Try a different specialty, or post a job and let professionals come to you.</p>
            <Link href="/jobs/post" className="mt-6 inline-block rounded-xl bg-[#1A2332] px-6 py-3 text-sm font-semibold text-white">
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <Tilt3D className="h-full">
                  <Link
                    href={`/providers/${p.user.id}`}
                    data-no-tilt
                    className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4" style={{ transform: "translateZ(30px)" }}>
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-yellow-400 text-lg font-bold text-gray-900">
                        {p.user.image ? <Image src={p.user.image} alt={p.user.name} width={56} height={56} className="object-cover" /> : initials(p.user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 truncate font-bold text-gray-900">
                          {p.user.name}
                          {p.isVerified && <span title="Verified" className="text-blue-500">✔</span>}
                        </p>
                        <p className="text-sm text-gray-500">{p.specialty}</p>
                      </div>
                    </div>
                    <p className="mt-4 line-clamp-2 flex-1 text-sm text-gray-500">{p.bio || "Experienced professional on Abhiyantri Setu."}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span>⭐ {p.rating ? p.rating.toFixed(1) : "New"} ({p.totalReviews})</span>
                      <span>{p.experience ?? 0}+ yrs</span>
                      <span>📍 {p.location ?? "—"}</span>
                    </div>
                  </Link>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
