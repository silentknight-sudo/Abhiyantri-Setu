import { getProfile } from "@/lib/actions/profile-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfilePage from "./profileClient";

// server page for profile
export default async function ProfileDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return <div>Not logged in</div>;
  }

  const {profile} = await getProfile();

  return (
    <ProfilePage profile = {profile}/>
  )
}


