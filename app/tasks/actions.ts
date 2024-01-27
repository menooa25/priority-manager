"use server";
import prisma from "@/prisma/client";
import { getUserId } from "../actions";

export const getTaskList = async () => {
  const userId = await getUserId();
  if (!userId) return null;

  return await prisma.task.findMany({
    where: { goal: { userId } },
    orderBy: [{ done: "asc" }, { goal: { index: "desc" } }],
  });
};
