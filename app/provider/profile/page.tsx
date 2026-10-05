import Link from "next/link";
import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import ProviderHeader from "@/components/shared/ProviderHeader";
import { BankForm, BasicInfoForm, IdForm, ShareProfile } from "./ProfileForms";

export const dynamic = "force-dynamic";

export default async function ProviderProfilePage() {
  const user = await requireProvider();
  const [dbUser, p] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id }, select: { name: true, phone: true } }),
    prisma.providerProfile.findUnique({ where: { userId: user.id } }),
  ]);

  const steps = [
    { label: "Basic info", done: p?.hasBasicInfo ?? true, href: "#" },
    { label: "Services & pricing", done: !!p?.hasServicesPricing, href: "/provider/pricing" },
    { label: "Work photos", done: !!p?.hasWorkPhotos, href: "/provider/photos" },
    { label: "ID verification", done: !!p?.hasIdVerification, href: "#id" },
    { label: "Bank details", done: !!p?.hasBankDetails, href: "#bank" },
  ];
  const pct = steps.filter((s) => s.done).length * 20;

  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="My Profile" subtitle="Complete profile = zyada leads" action={<ShareProfile url={`/providers/${user.id}`} />} />

      <div className="mb-5 rounded-2xl bg-[#111827] p-5 text-white shadow-lg">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-bold">Profile {pct}% complete</span>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex flex-wrap gap-2">
          {steps.map((s) => (
            <Link key={s.label} href={s.href} className={`rounded-full px-3 py-1 text-xs font-semibold ${s.done ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}>
              {s.done ? "✓" : "○"} {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <BasicInfoForm
          name={dbUser?.name ?? ""}
          phone={dbUser?.phone ?? ""}
          specialty={p?.specialty ?? "Contractor"}
          experience={p?.experience ?? 0}
          bio={p?.bio ?? ""}
          location={p?.location ?? "Greater Noida"}
        />
        <IdForm idType={p?.idType ?? ""} idNumber={p?.idNumber ?? ""} verified={!!p?.hasIdVerification} />
        <BankForm
          accountName={p?.bankAccountName ?? ""}
          last4={p?.bankAccountNumber?.slice(-4) ?? ""}
          ifsc={p?.bankIfsc ?? ""}
          upiId={p?.upiId ?? ""}
          saved={!!p?.hasBankDetails}
        />
      </div>
    </div>
  );
}
