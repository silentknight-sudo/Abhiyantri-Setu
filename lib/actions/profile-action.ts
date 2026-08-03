"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "../auth";
import { headers } from "next/headers";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Get profile data
export const getProfile = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Not logged in" };
    }

    const profile = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        providerProfile: true,
      },
    });

    return { profile };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch profile" };
  }
};

// Update profile
export const updateProfile = async (data: {
  name?: string;
  location?: string;
  bio?: string;
  phone?: string;
}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: "Not logged in" };
    }

    // Update User table
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
        phone: data.phone,
      },
    });

    // Check if ProviderProfile exists
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // Update ProviderProfile if it exists
    if (providerProfile) {
      await prisma.providerProfile.update({
        where: {
          userId: session.user.id,
        },
        data: {
          location: data.location,
          bio: data.bio,
        },
      });
    }

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to update profile",
    };
  }
};