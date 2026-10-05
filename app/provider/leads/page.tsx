import { getProviderLeads } from "@/lib/provider-leads";
import { requireProvider } from "@/lib/session";
import ProviderLeads from "./providerLeads";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const user = await requireProvider();
  const leads = await getProviderLeads(user.id);

  return (
    <ProviderLeads
      userName={user.name ?? ""}
      userEmail={user.email ?? ""}
      userImage={user.image ?? null}
      leads={leads}
      initialIsOnline={true}
    />
  );
}
