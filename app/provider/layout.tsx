import ProviderSidebar from "@/components/navbar/providerSidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FB]">
      <ProviderSidebar
        userName={session?.user?.name ?? ""}
        userEmail={session?.user?.email ?? ""}
        userImage={session?.user?.image ?? null}
        initialIsOnline={true}
      />
      <main className="flex-1 h-screen overflow-y-auto min-w-0 pt-14.25 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}