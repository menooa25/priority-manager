"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/client";

export const getUserId = async () => {
  const userEmail = (await auth())?.user?.email;
  if (!userEmail) return null;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  return user?.id;
};

export const getServerTime = async () => {
  return new Date();
};
