import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProvider } from "@/lib/queries";
import { getSession } from "@/lib/session";
import { formatDate, formatINR, initials } from "@/lib/format";
import MessageButton from "@/components/shared/MessageButton";
import Reveal from "@/components/motion/Reveal";
import Tilt3D from "@/components/motion/Tilt3D";

export const dynamic = "force-dynamic";

export default async function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [provider, session] = await Promise.all([getPublicProvider(id), getSession().catch(() => null)]);
  if (!provider || !provider.providerProfile) notFound();
  const p = provider.providerProfile;
  const viewer = session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <section data-no-reveal className="bg-[#1A2332] px-4 pb-24 pt-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Tilt3D max={15} className="h-28 w-28 flex-shrink-0">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-yellow-400 text-3xl font-bold text-gray-900 shadow-2xl">
              {provider.image ? <Image src={provider.image} alt={provider.name} width={112} height={112} className="object-cover" /> : initials(provider.name)}
            </div>
          </Tilt3D>
          <div className="flex-1">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-white sm:justify-start">
              {provider.name}
              {p.isVerified && <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs">Verified</span>}
            </h1>
            <p className="mt-1 text-yellow-300">{p.specialty}</p>
            <p className="mt-2 text-sm text-gray-400">
              📍 {p.location} · {p.experience ?? 0}+ years experience · Member since {formatDate(provider.createdAt)}
            </p>
          </div>
          {viewer?.id !== provider.id && (
            <MessageButton
              userId={provider.id}
              viewerRole={viewer?.role ?? null}
              className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-500"
            >
              💬 Message
            </MessageButton>
          )}
        </div>
      </section>

      <div className="mx-auto -mt-14 max-w-5xl space-y-6 px-4 pb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Rating", value: p.rating ? `${p.rating.toFixed(1)} ⭐` : "New" },
            { label: "Reviews", value: p.totalReviews },
            { label: "Jobs completed", value: provider._count.providerBids },
          ].map((s) => (
            <div key={s.label} className="tilt-3d rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-lg">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-2 font-bold text-gray-900">About</h2>
            <p className="whitespace-pre-line text-sm text-gray-600">{p.bio || "This professional hasn't added a bio yet."}</p>
          </div>
        </Reveal>

        {provider.services.length > 0 && (
          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900">Services & Pricing</h2>
              <div className="divide-y divide-gray-100">
                {provider.services.map((s) => (
                  <div key={s.id} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-700">{s.name}</span>
                    <span className="font-semibold text-gray-900">
                      {formatINR(s.price)} <span className="font-normal text-gray-400">{s.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {provider.workPhotos.length > 0 && (
          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900">Work Photos</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {provider.workPhotos.map((ph) => (
                  <figure key={ph.id} className="tilt-3d overflow-hidden rounded-xl bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ph.url} alt={ph.caption ?? "Work photo"} className="aspect-square w-full object-cover" />
                    {ph.caption && <figcaption className="p-2 text-xs text-gray-500">{ph.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">Reviews</h2>
            {provider.reviewsReceived.length === 0 ? (
              <p className="text-sm text-gray-400">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {provider.reviewsReceived.map((r) => (
                  <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">{r.client.name}</span>
                      <span className="text-sm text-yellow-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-gray-600">{r.comment}</p>}
                    <p className="mt-1 text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <div className="text-center">
          <Link href="/jobs/post" className="inline-block rounded-xl bg-[#1A2332] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2C3E55]">
            Post a job to get quotations
          </Link>
        </div>
      </div>
    </div>
  );
}
