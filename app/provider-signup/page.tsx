import { redirect } from "next/navigation";

export default function ProviderSignupPage() {
  redirect("/auth?mode=signup&role=provider");
}
