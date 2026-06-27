import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }

  const role = session.user.role?.toLowerCase();

  console.log("DASHBOARD REDIRECT ROLE:", role);

  if (role === "provider") {
    redirect("/provider/dashboard");
  }

  redirect("/client/dashboard");
}