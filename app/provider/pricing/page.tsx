import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import ProviderHeader from "@/components/shared/ProviderHeader";
import PricingEditor from "./PricingEditor";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const user = await requireProvider();
  const services = await prisma.providerService.findMany({ where: { providerId: user.id }, orderBy: { createdAt: "asc" } });
  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Services & Pricing" subtitle="Clients see these rates on your public profile" />
      <PricingEditor initial={services.map((s) => ({ name: s.name, price: s.price, unit: s.unit }))} />
    </div>
  );
}
