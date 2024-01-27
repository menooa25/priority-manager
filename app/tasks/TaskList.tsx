"use client";

import { Task as TaskSchema } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { TopLoadingContext } from "../components/TopLoading";
import { getTaskList } from "./actions";
import Skeleton from "../components/goalAndTask/Skeleton";
import AddTask from "./AddTask";
import TaskContextProvider from "./TaskContextProvider";

const TaskList = () => {
  const [taskList, setTaskList] = useState<TaskSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const { completeLoading, startLoading: startTopLoading } =
    useContext(TopLoadingContext);
  const startLoading = () => {
    startTopLoading();
    setLoading(true);
  };
  const endLoading = () => {
    setLoading(false);
    completeLoading();
  };
  const requestForTaskList = async () => {
    startLoading();

    const resp = await getTaskList();
    if (resp) {
      setTaskList(resp);
      endLoading();
    }
  };
  useEffect(() => {
    requestForTaskList();
  }, []);
  if (loading && taskList.length === 0) return <Skeleton />;

  return (
    <TaskContextProvider updateTaskList={requestForTaskList}>
      <div className={"flex w-full flex-col gap-y-3"}>
        <AddTask />
      </div>
    </TaskContextProvider>
  );
};

export default TaskList;
