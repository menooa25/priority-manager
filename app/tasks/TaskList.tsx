"use client";

import { Task as TaskSchema } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { TopLoadingContext } from "../components/TopLoading";
import { getTaskList } from "./actions";
import Skeleton from "../components/goalAndTask/Skeleton";
import AddTask from "./AddTask";

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
  const requestForGoalList = async () => {
    startLoading();

    const resp = await getTaskList();
    if (resp) {
      setTaskList(resp);
      endLoading();
    }
  };
  useEffect(() => {
    requestForGoalList();
  }, []);
  if (loading && taskList.length === 0) return <Skeleton />;

  return (
    <div className={"flex  w-full flex-col gap-y-3 "}>
      <AddTask />
    </div>
  );
};

export default TaskList;
