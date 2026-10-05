"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function currentProvider() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user || user.role !== "provider") return null;
  return user;
}

function refresh() {
  revalidatePath("/provider/profile");
  revalidatePath("/provider/dashboard");
}

export const setOnline = async (isOnline: boolean) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  await prisma.providerProfile.updateMany({ where: { userId: user.id }, data: { isOnline } });
  return { success: true };
};

export const updateProviderProfile = async (data: {
  name: string;
  phone?: string;
  specialty: string;
  experience?: number;
  bio?: string;
  location?: string;
}) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  if (!data.name?.trim()) return { error: "Name is required." };
  if (!data.specialty?.trim()) return { error: "Specialty is required." };

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { name: data.name.trim(), phone: data.phone?.trim() || null } }),
    prisma.providerProfile.upsert({
      where: { userId: user.id },
      update: {
        specialty: data.specialty.trim(),
        experience: data.experience ?? 0,
        bio: data.bio?.trim() || null,
        location: data.location?.trim() || "Greater Noida",
        hasBasicInfo: true,
      },
      create: {
        userId: user.id,
        specialty: data.specialty.trim(),
        experience: data.experience ?? 0,
        bio: data.bio?.trim() || null,
        location: data.location?.trim() || "Greater Noida",
      },
    }),
  ]);
  refresh();
  return { success: true };
};

export const saveServices = async (services: { name: string; price: number; unit: string }[]) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  const clean = services
    .map((s) => ({ name: s.name.trim(), price: Number(s.price), unit: s.unit.trim() || "per job" }))
    .filter((s) => s.name && Number.isFinite(s.price) && s.price > 0)
    .slice(0, 30);

  await prisma.$transaction([
    prisma.providerService.deleteMany({ where: { providerId: user.id } }),
    prisma.providerService.createMany({ data: clean.map((s) => ({ ...s, providerId: user.id })) }),
    prisma.providerProfile.updateMany({ where: { userId: user.id }, data: { hasServicesPricing: clean.length > 0 } }),
  ]);
  refresh();
  revalidatePath("/provider/pricing");
  return { success: true };
};

// Photos arrive as compressed data URLs (resized in the browser) or https URLs
export const addWorkPhoto = async (url: string, caption?: string) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  const isData = url.startsWith("data:image/");
  if (!isData && !/^https:\/\//.test(url)) return { error: "Invalid image." };
  if (url.length > 1_500_000) return { error: "Image is too large." };
  const count = await prisma.workPhoto.count({ where: { providerId: user.id } });
  if (count >= 24) return { error: "You can upload up to 24 photos." };

  await prisma.$transaction([
    prisma.workPhoto.create({ data: { url, caption: caption?.trim() || null, providerId: user.id } }),
    prisma.providerProfile.updateMany({ where: { userId: user.id }, data: { hasWorkPhotos: true } }),
  ]);
  refresh();
  revalidatePath("/provider/photos");
  return { success: true };
};

export const deleteWorkPhoto = async (id: string) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  await prisma.workPhoto.deleteMany({ where: { id, providerId: user.id } });
  const left = await prisma.workPhoto.count({ where: { providerId: user.id } });
  await prisma.providerProfile.updateMany({ where: { userId: user.id }, data: { hasWorkPhotos: left > 0 } });
  refresh();
  revalidatePath("/provider/photos");
  return { success: true };
};

export const saveIdVerification = async (idType: string, idNumber: string) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  const num = idNumber.replace(/\s+/g, "").toUpperCase();
  if (!idType || num.length < 6) return { error: "Enter a valid ID number." };
  await prisma.providerProfile.updateMany({
    where: { userId: user.id },
    data: { idType, idNumber: num, hasIdVerification: true },
  });
  refresh();
  return { success: true };
};

export const saveBankDetails = async (data: {
  accountName: string;
  accountNumber: string;
  ifsc: string;
  upiId?: string;
}) => {
  const user = await currentProvider();
  if (!user) return { error: "Not allowed." };
  const ifsc = data.ifsc.trim().toUpperCase();
  const acc = data.accountNumber.replace(/\s+/g, "");
  if (!data.accountName.trim()) return { error: "Account holder name is required." };
  if (!/^\d{9,18}$/.test(acc)) return { error: "Enter a valid account number." };
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) return { error: "Enter a valid IFSC code." };

  await prisma.providerProfile.updateMany({
    where: { userId: user.id },
    data: {
      bankAccountName: data.accountName.trim(),
      bankAccountNumber: acc,
      bankIfsc: ifsc,
      upiId: data.upiId?.trim() || null,
      hasBankDetails: true,
    },
  });
  refresh();
  return { success: true };
};
