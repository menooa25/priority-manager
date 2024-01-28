"use server";
import prisma from "@/prisma/client";
import { getUserId } from "../actions";

export const getTaskList = async () => {
  const userId = await getUserId();
  if (!userId) return null;

  return await prisma.task.findMany({
    where: { goal: { userId } },
    orderBy: [{ done: "asc" }, { index: "desc" }],
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

export const getGoalList = async () => {
  const userId = await getUserId();
  if (!userId) return null;
  const goalList = await prisma.goal.findMany({ where: { userId } });
  return goalList;
};

export const increaseTaskIndex = async (id: number, currentIndex: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperTask = await prisma.task.findFirst({
    where: {
      goal: { userId },
      index: { gt: currentIndex },
    },
    orderBy: { index: "asc" },
  });
  if (upperTask) {
    await prisma.task.update({
      where: { id, goal: { userId } },
      data: { index: upperTask.index },
    });
    await prisma.task.update({
      where: { id: upperTask.id, goal: { userId } },
      data: { index: currentIndex },
    });
  }
};
export const decreaseTaskIndex = async (id: number, currentIndex: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const downerTask = await prisma.task.findFirst({
    where: { index: { lt: currentIndex, not: -1 }, goal: { userId } },
    orderBy: { index: "desc" },
  });

  if (downerTask) {
    await prisma.task.update({
      where: { id, goal: { userId } },
      data: { index: downerTask.index },
    });
    await prisma.task.update({
      where: { id: downerTask.id, goal: { userId } },
      data: { index: currentIndex },
    });
  }
};

export const changeTaskDone = async (id: number, isDone: boolean) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.task.update({
    where: { id, goal: { userId } },
    data: { done: isDone },
  });
};

export const deleteTask = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.task.delete({
    where: { id, goal: { userId } },
  });
};
