import ProviderSidebar from "@/components/navbar/providerSidebar";
import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireProvider();
  const profile = await prisma.providerProfile.findUnique({
    where: { userId: user.id },
    select: { isOnline: true },
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F7FB]">
      <ProviderSidebar
        userName={user.name ?? ""}
        userEmail={user.email ?? ""}
        userImage={user.image ?? null}
        initialIsOnline={profile?.isOnline ?? true}
      />
      <main className="flex-1 h-screen overflow-y-auto min-w-0 pt-14.25 lg:pt-0 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
