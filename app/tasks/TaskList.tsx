"use client";

import { Task as TaskSchema } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { TopLoadingContext } from "../components/TopLoading";
import { getTaskList } from "./actions";
import Skeleton from "../components/goalAndTask/Skeleton";
import AddTask from "./AddTask";
import TaskContextProvider from "./TaskContextProvider";
import Task from "./Task";

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
        {taskList.map(({ id, done, index, title }, i) => (
          <div key={id}>
            <Task id={id} done={done} title={title} index={index} />
            {taskList.length - 1 !== i && <hr className="mt-2" />}
          </div>
        ))}
        <AddTask />
      </div>
    </TaskContextProvider>
  );
};

export default TaskList;
