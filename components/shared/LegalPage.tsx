import Reveal from "@/components/motion/Reveal";

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section data-no-reveal className="bg-[#1A2332] px-4 py-14 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-400">Last updated {updated}</p>
      </section>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        {sections.map((s, i) => (
          <Reveal key={s.heading} delay={i * 0.03}>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-2 font-bold text-gray-900">{s.heading}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
