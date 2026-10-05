import { requireProvider } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import ProviderHeader from "@/components/shared/ProviderHeader";
import PhotoManager from "./PhotoManager";

export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const user = await requireProvider();
  const photos = await prisma.workPhoto.findMany({
    where: { providerId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, url: true, caption: true },
  });
  return (
    <div className="p-4 lg:p-6">
      <ProviderHeader title="Work Photos" subtitle="Photos build trust with clients" />
      <PhotoManager photos={photos} />
    </div>
  );
}
