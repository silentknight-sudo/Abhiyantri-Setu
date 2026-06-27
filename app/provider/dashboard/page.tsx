import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getProviderDashboardData } from "@/lib/provider-dashboard";
import ProviderDashboard from "./providerDashboard";

export default async function ProviderDashboardPage() {
  // Provider Auth check 
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session?.user){
    redirect("/auth");
  }
  console.log("PROVIDER SESSION", session.user);

  if(session.user.role?.toLowerCase() !== "provider"){
    redirect("/client/dashboard");
  }

  // Fetch all dashboard data in parallel 
 try {
  const dashboardData =
    await getProviderDashboardData(session.user.id);

  console.log("DASHBOARD OK");
  console.log(dashboardData);

  return (
    <ProviderDashboard
      // User session
      userName={session.user.name ?? "Provider"}
      userEmail={session.user.email ?? ""}
      userImage={session.user.image ?? null}
      // Dynamic data
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
} catch (err) {
  console.error("PROVIDER DASHBOARD ERROR:", err);

  return (
    <div className="p-10">
      Dashboard Error
    </div>
  );
}
}