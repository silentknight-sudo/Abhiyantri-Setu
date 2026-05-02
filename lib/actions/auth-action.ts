"use server";
import { auth } from "../auth";
import { headers } from "next/headers";

// for Sign Up 
export const signUp = async (
  email: string,
  password: string,
  name: string
) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/client/dashboard",
    },
  });
  return result;
};

// for Sign In
export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/client/dashboard",
    },
  });
  return result;
};

//for Sign In Social 
export const signInSocial = async (provider: "google") => {
  const result = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/client/dashboard",
    },
  });

  return { url: result?.url ?? null };
};

// for Sign Out
export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  return result;
};