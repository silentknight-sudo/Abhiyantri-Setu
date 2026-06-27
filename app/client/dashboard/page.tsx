import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ClientDashboardClient from "./clientDashboard";
import { getMyJobs } from "@/lib/actions/job-action";
export const dynamic = "force-dynamic";


export default async function ClientDashboardPage({searchParams}:any) {
  const params = await searchParams;
  const success =  params?.success || null;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

 //@ts-ignore
  const { jobs } = await getMyJobs(auth.api.getSession);

  
  if(!session?.user){
    redirect("/auth");
  }

  console.log("CLIENT SESSION", session.user);

  if(session.user.role?.toLowerCase() !== "client"){
    redirect("/provider/dashboard");
  }
   
 
  return (
    <ClientDashboardClient
      userName={session.user.name ?? "User"}
      userEmail={session.user.email ?? ""}
      userImage={session.user.image ?? null}
      // @ts-ignore
     jobs = {jobs}
     success = {success}
    />
  );
}