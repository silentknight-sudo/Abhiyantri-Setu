import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProviderLeads } from "@/lib/provider-leads";
import ProviderLeads from "./providerLeads";

export default async function LeadsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }

  if (session.user.role?.toLowerCase() !== "provider") {
    redirect("/client/dashboard");
  }

  const leads = await getProviderLeads(
    session.user.id
  );

  console.log("LEADS PAGE DATA:", leads);

  return (
    <ProviderLeads
      userName={session.user.name ?? ""}
      userEmail={session.user.email ?? ""}
      userImage={session.user.image ?? null}
      leads={leads}
      initialIsOnline={true}
    />
  );
}