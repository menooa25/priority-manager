"use server"

import prisma from "@/prisma/client"
export const addTask = async (title:string) => {
    await prisma.task.create({data:{title}})
}

export const resumeTask = async (id:number) => {
    await prisma.task.update({where:{id},data:{done:false}})
}
export const doneTask = async (id:number) => {
    await prisma.task.update({where:{id},data:{done:true}})
}
export const deleteTask = async (id:number) => {
    await prisma.task.delete({where:{id}})
}