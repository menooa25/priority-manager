"use server";
import { getUserId } from "@/app/lib/actions";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export const getTaskList = async (
  goalId: number | undefined = undefined,
  day: Date | undefined
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const orderBy: Prisma.TaskOrderByWithRelationInput = goalId
    ? { indexInGoal: "desc" }
    : { index: "desc" };
  return await prisma.task.findMany({
    where: { goal: { userId }, goalId, day: day?.toISOString() },
    orderBy: [{ done: "asc" }, { ...orderBy }],
    include: {
      goal: { select: { title: true } },
      Time: { select: { from: true, to: true } },
    },
  });
};

export const createTask = async (title: string, goalId: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperTask = await prisma.task.findFirst({
    orderBy: { index: "desc" },
    where: { goal: { userId } },
  });
  const upperTaskInGoal = await prisma.task.findFirst({
    orderBy: { indexInGoal: "desc" },
    where: { goal: { userId }, goalId },
  });
  await prisma.task.create({
    data: {
      title,
      goalId,
      index: upperTask ? upperTask.index + 1 : 0,
      indexInGoal: upperTaskInGoal ? upperTaskInGoal.indexInGoal + 1 : 0,
    },
  });
};

export const getGoalList = async () => {
  const userId = await getUserId();
  if (!userId) return null;
  const goalList = await prisma.goal.findMany({ where: { userId } });
  return goalList;
};

export const increaseTaskIndex = async (
  id: number,
  currentIndex: number,
  day: Date | undefined = undefined
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperTask = await prisma.task.findFirst({
    where: {
      goal: { userId },
      index: { gt: currentIndex },
      day: day?.toISOString(),
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

export const increaseTaskGoalIndex = async (
  id: number,
  currentGoalIndex: number,
  day: Date | undefined = undefined
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const upperTask = await prisma.task.findFirst({
    where: {
      goal: { userId },
      indexInGoal: { gt: currentGoalIndex },
      day: day?.toISOString(),
    },
    orderBy: { indexInGoal: "asc" },
  });
  if (upperTask) {
    await prisma.task.update({
      where: { id, goal: { userId } },
      data: { indexInGoal: upperTask.indexInGoal },
    });
    await prisma.task.update({
      where: { id: upperTask.id, goal: { userId } },
      data: { indexInGoal: currentGoalIndex },
    });
  }
};

export const decreaseTaskIndex = async (
  id: number,
  currentIndex: number,
  day: Date | undefined = undefined
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const downerTask = await prisma.task.findFirst({
    where: {
      index: { lt: currentIndex, not: -1 },
      goal: { userId },
      day: day?.toISOString(),
    },
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

export const decreaseTaskGoalIndex = async (
  id: number,
  currentGoalIndex: number,
  day: Date | undefined = undefined
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const downerTask = await prisma.task.findFirst({
    where: {
      indexInGoal: { lt: currentGoalIndex, not: -1 },
      goal: { userId },
      day: day?.toISOString(),
    },
    orderBy: { indexInGoal: "desc" },
  });

  if (downerTask) {
    await prisma.task.update({
      where: { id, goal: { userId } },
      data: { indexInGoal: downerTask.indexInGoal },
    });
    await prisma.task.update({
      where: { id: downerTask.id, goal: { userId } },
      data: { indexInGoal: currentGoalIndex },
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

export const changeTaskTitle = async (id: number, title: string) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.task.update({
    where: { id, goal: { userId } },
    data: { title },
  });
};

export const attachTaskToDay = async (
  id: number,
  day: Date,
  selectedDay: number
) => {
  const userId = await getUserId();
  if (!userId) return null;
  await prisma.task.update({
    where: { id, goal: { userId } },
    data: {
      day: day.toISOString(),
      selectedDay,
    },
  });
};

export const setTimeForTask = async (id: number, from: string, to: string) => {
  const userId = await getUserId();
  if (!userId) return null;
  const time = await prisma.time.findUnique({
    where: { taskId: id, task: { goal: { userId } } },
  });
  if (time)
    return await prisma.time.update({
      where: { taskId: id, task: { goal: { userId } } },
      data: { from, to },
    });
  return await prisma.time.create({
    data: { from, to, taskId: id },
  });
};

export const deleteTime = async (id: number) => {
  const userId = await getUserId();
  if (!userId) return null;
  const time = await prisma.time.count({
    where: {
      task: { goal: { userId } },
      taskId: id,
    },
  });
  if (time === 0) return null;
  return await prisma.time.delete({
    where: {
      task: { goal: { userId } },
      taskId: id,
    },
  });
};

export const updateTimeFromText = async (
  id: number,
  from: string,
  to: string
) => {
  const userId = await getUserId();
  if (!userId) return null;
  const time = await prisma.time.findUnique({
    where: { taskId: id, task: { goal: { userId } } },
  });
  if (time) {
    if (from && !time.from)
      return await prisma.time.update({
        where: { taskId: id, task: { goal: { userId } } },
        data: { from },
      });
    if (to && !time.to)
      return await prisma.time.update({
        where: { taskId: id, task: { goal: { userId } } },
        data: { to },
      });
    return null;
  }
  return await prisma.time.create({
    data: { from, to, taskId: id },
  });
};
