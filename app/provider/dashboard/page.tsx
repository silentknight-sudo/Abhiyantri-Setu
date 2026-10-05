import { getProviderDashboardData } from "@/lib/provider-dashboard";
import { requireProvider } from "@/lib/session";
import ProviderDashboard from "./providerDashboard";

export const dynamic = "force-dynamic";

export default async function ProviderDashboardPage() {
  const user = await requireProvider();
  const dashboardData = await getProviderDashboardData(user.id);

  return (
    <ProviderDashboard
      userName={user.name ?? "Provider"}
      userEmail={user.email ?? ""}
      userImage={user.image ?? null}
      stats={dashboardData.stats}
      recentLeads={dashboardData.recentLeads}
      activeJobs={dashboardData.activeJobs}
      upcomingJobs={dashboardData.upcomingJobs}
      profileCompletion={dashboardData.profileCompletion}
      walletBalance={dashboardData.walletBalance}
      initialIsOnline={dashboardData.isOnline}
      specialty={dashboardData.specialty}
    />
  );
}
