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

  if (role === "provider") {
    redirect("/provider/dashboard");
  }

  redirect("/client/dashboard");
}