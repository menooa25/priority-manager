"use server";
import prisma from "@/prisma/client";

export const createTask = async (title: string, userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user?.id) return null;
  const upperTask = await prisma.task.findFirst({
    orderBy: { index: "desc" },
  });
  await prisma.task.create({
    data: {
      title,
      userId: user?.id,
      index: upperTask?.index && upperTask?.index + 1,
    },
  });
};

export const changeTaskTitle = async (id: number, title: string) => {
  await prisma.task.update({ where: { id }, data: { title } });
};

export const resumeTask = async (id: number) => {
  const upperTask = await prisma.task.findFirst({
    orderBy: { index: "desc" },
  });
  await prisma.task.update({
    where: { id },
    data: { done: false, index: upperTask?.index && upperTask?.index + 1 },
  });
};
export const increaseTaskIndex = async (id: number, currentIndex: number) => {
  const upperTask = await prisma.task.findFirst({
    where: { index: { gt: currentIndex } },
    orderBy: { index: "asc" },
  });

  if (upperTask) {
    await prisma.task.update({
      where: { id },
      data: { index: upperTask.index },
    });
    await prisma.task.update({
      where: { id: upperTask.id },
      data: { index: currentIndex },
    });
  }
};
export const decreaseTaskIndex = async (id: number, currentIndex: number) => {
  const downerTask = await prisma.task.findFirst({
    where: { index: { lt: currentIndex, not: -1 } },
    orderBy: { index: "desc" },
  });

  if (downerTask) {
    await prisma.task.update({
      where: { id },
      data: { index: downerTask.index },
    });
    await prisma.task.update({
      where: { id: downerTask.id },
      data: { index: currentIndex },
    });
  }
};
export const doneTask = async (id: number) => {
  await prisma.task.update({ where: { id }, data: { done: true, index: -1 } });
};
export const deleteTask = async (id: number) => {
  await prisma.task.delete({ where: { id } });
};

export const getTaskList = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user?.id) return null;
  return await prisma.task.findMany({ where: { userId: user.id } });
};
