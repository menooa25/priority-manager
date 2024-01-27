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

export const createTask = async (title: string, goalId: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperTask = await prisma.task.findFirst({
    orderBy: { index: "desc" },
    where: { goal: { userId } },
  });
  await prisma.task.create({
    data: {
      title,
      goalId,
      index: upperTask ? upperTask.index + 1 : 0,
    },
  });
};
