import { requireProvider } from "@/lib/session";
import ProviderHeader from "@/components/shared/ProviderHeader";
import SupportForm from "./SupportForm";

const FAQ = [
  { q: "How do I get more leads?", a: "Complete your profile to 100% — add services & pricing, work photos, ID and bank details. Stay Online so you appear in searches, and reply to clients quickly." },
  { q: "How do quotations work?", a: "Open a lead, enter your price and a short message, and send. The client is notified and can accept, decline or chat with you." },
  { q: "When do I get paid?", a: "When a job is marked completed, the agreed amount is added to your wallet. Withdraw anytime from Earnings once bank details are saved." },
  { q: "Can I change my specialty?", a: "Yes — go to Profile → Basic information. Leads are matched to your specialty." },
];

export default async function SupportPage() {
  const user = await requireProvider();
  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Help & Support" subtitle="Hum madad ke liye yahan hain" />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer list-none text-sm font-semibold text-gray-900">
                <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{f.a}</p>
            </details>
          ))}
          <div className="flex gap-3">
            <a href="https://wa.me/919289553069" target="_blank" rel="noopener noreferrer" className="tilt-3d flex-1 rounded-2xl bg-emerald-500 p-4 text-center text-sm font-bold text-white shadow">
              WhatsApp us
            </a>
            <a href="tel:+919289553069" className="tilt-3d flex-1 rounded-2xl bg-[#111827] p-4 text-center text-sm font-bold text-white shadow">
              Call support
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" data-no-tilt>
          <h2 className="mb-3 text-sm font-bold text-gray-900">Raise a ticket</h2>
          <SupportForm name={user.name ?? "Provider"} email={user.email ?? ""} />
        </div>
      </div>
    </div>
  );
}
