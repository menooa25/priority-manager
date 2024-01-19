"use client";
import Task from "./task/Task";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";
import { Task as TaskSchima } from "@prisma/client";
import { getTaskList } from "./actions";
import { useSession } from "next-auth/react";
import TaskContextProvider from "./TaskContextProvider";

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskSchima[]>([]);
  const userEmail = useSession().data?.user?.email;
  const requestForTaskList = async () => {
    if (!userEmail) return null;
    const resp = await getTaskList();
    if (resp) setTaskList(resp);
  };
  useEffect(() => {
    requestForTaskList();
  }, [userEmail]);
  return (
    <TaskContextProvider updateTaskList={requestForTaskList}>
      <div className="flex  w-full md:w-96 flex-col gap-y-3">
        {taskList.map((t, i) => (
          <div key={t.id}>
            <Task done={t.done} id={t.id} index={t.index} title={t.title} />
            {taskList.length - 1 !== i && <hr className="mt-2" />}
          </div>
        ))}
        <AddTask />
      </div>
    </TaskContextProvider>
  );
};

export default TaskList;
