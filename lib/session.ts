import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) redirect("/auth");
  return session.user;
}

export async function requireProvider() {
  const user = await requireUser();
  if (user.role?.toLowerCase() !== "provider") redirect("/client/dashboard");
  return user;
}

export async function requireClient() {
  const user = await requireUser();
  if (user.role?.toLowerCase() === "provider") redirect("/provider/dashboard");
  return user;
}
