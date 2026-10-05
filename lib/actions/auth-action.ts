"use server";
import { auth } from "../auth";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";

// for Sign Up
export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: "client" | "provider",
  specialty?: string,
  experience?: string,
  phone?: string,
  location?: string
) => {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: email.trim().toLowerCase(),
        password,
        name: name.trim(),
        role,
        phone: phone?.trim() || undefined,
      },
    });

    if (role === "provider" && result?.user?.id) {
      await prisma.providerProfile.create({
        data: {
          userId: result.user.id,
          specialty: specialty || "Contractor",
          experience: experience ? parseInt(experience) || 0 : 0,
          location: location?.trim() || "Greater Noida",
        },
      });
    }

    return { success: true as const };
  } catch (error) {
    return {
      error: {
        message: error instanceof Error ? error.message : "Registration failed.",
      },
    };
  }
};

// for Sign In
export const signIn = async (
  email: string,
  password: string
) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Login failed",
    };
  }
};

//for Sign In Social 
export const signInSocial = async (
  provider: "google",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  role: "client" | "provider"
) => {
  const callbackURL = "/dashboard";
  const result = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL,
    },
  });

  return {
    url: result?.url ?? null,
  };
};

// for Sign Out
export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  return result;
};