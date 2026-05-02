"use server"
import { PrismaClient } from "@prisma/client"
import { auth } from "../auth";
import { headers } from "next/headers";


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



// getProfile data from db through id
export const getProfile = async ()=>{
try {
   const session =  await auth.api.getSession({
    headers: await headers(),
   });
   if(!session?.user){
    return {error:"not logged in"};
   }

   const profile = await prisma.user.findUnique({
    where:{
        id: session.user.id,
    }
   })
   return {profile};
} catch (error) {
    console.log(error);
    return {error: "failed to fetch profile"}
}
}


// update the profile data
export const updateProfile = async (data:{
    name?:string;
    location?: string
    bio?:string;
    phone?: string;
    
})=>{
   try {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session?.user){
        return {error:"not logged in"}
    }
    const updateUser = await prisma.user.update({
        where:{
            id:session.user.id,
        },
        data:{
            name: data.name,
            location: data.location,
            bio: data.bio,
            phone: data.phone
        },
    });
    return {success: true, user:updateUser};
   } catch (error) {
    console.log(error);
    return {error: "failed to update profile"}
   }
}