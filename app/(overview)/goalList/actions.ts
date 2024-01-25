"use server";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Detail } from "@prisma/client";
const getUserId = async () => {
  const userEmail = (await auth())?.user?.email;
  if (!userEmail) return null;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  return user?.id;
};

export const createGoal = async (title: string) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperGoal = await prisma.goal.findFirst({
    orderBy: { index: "desc" },
    where: { userId },
  });
  await prisma.goal.create({
    data: {
      title,
      userId,
      index: upperGoal ? upperGoal.index + 1 : 0,
    },
  });
};

export const changeGoalTitle = async (id: number, title: string) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.goal.update({ where: { id, userId }, data: { title } });
};

export const resumeGoal = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperGoal = await prisma.goal.findFirst({
    orderBy: { index: "desc" },
    where: { userId },
  });
  await prisma.goal.update({
    where: { id, userId },
    data: { done: false, index: upperGoal?.index && upperGoal?.index + 1 },
  });
};
export const increaseGoalIndex = async (id: number, currentIndex: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperGoal = await prisma.goal.findFirst({
    where: {
      userId,
      index: { gt: currentIndex },
    },
    orderBy: { index: "asc" },
  });
  if (upperGoal) {
    await prisma.goal.update({
      where: { id, userId },
      data: { index: upperGoal.index },
    });
    await prisma.goal.update({
      where: { id: upperGoal.id, userId },
      data: { index: currentIndex },
    });
  }
};
export const decreaseGoalIndex = async (id: number, currentIndex: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const downerGoal = await prisma.goal.findFirst({
    where: { index: { lt: currentIndex, not: -1 }, userId },
    orderBy: { index: "desc" },
  });

  if (downerGoal) {
    await prisma.goal.update({
      where: { id, userId },
      data: { index: downerGoal.index },
    });
    await prisma.goal.update({
      where: { id: downerGoal.id, userId },
      data: { index: currentIndex },
    });
  }
};
export const doneGoal = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.goal.update({
    where: { id, userId },
    data: { done: true, index: -1 },
  });
};
export const deleteGoal = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.goal.delete({ where: { id, userId } });
};

export const getGoalList = async () => {
  const userId = await getUserId();
  if (!userId) return null;

  return await prisma.goal.findMany({
    where: { userId },
    orderBy: [{ done: "asc" }, { index: "desc" }],
  });
};

export const updateGoalDetail = async ({
  goalId,
  how,
  when,
  why,
}: {
  why: string | null;
  when: string | null;
  how: string | null;
  goalId: number;
}) => {
  const detail = await prisma.detail.count({ where: { goalId } });
  if (detail)
    return await prisma.detail.update({
      where: { goalId },
      data: { why, when, how },
    });
  return await prisma.detail.create({
    data: { why, when, how, goalId },
  });
};

export const getDetail = async (goalId: number) => {
  return await prisma.detail.findUnique({ where: { goalId } });
};
