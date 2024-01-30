"use client";

import { Task as TaskSchema } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { TopLoadingContext } from "../components/TopLoading";
import { getTaskList } from "./actions";
import Skeleton from "../components/goalAndTask/Skeleton";
import AddTask from "./Task/AddTask";
import TaskContextProvider from "./TaskContextProvider";
import Task from "./Task/Task";
import useFilters from "./useFilters";

const TaskList = () => {
  const [taskList, setTaskList] = useState<
    (TaskSchema & { goal: { title: string } })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { completeLoading, startLoading: startTopLoading } =
    useContext(TopLoadingContext);
  const { dayFilterDate, goalIdNum, dayFilter } = useFilters();
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

    const resp = await getTaskList(goalIdNum, dayFilterDate);
    if (resp) {
      setTaskList(resp);
      endLoading();
    }
  };
  useEffect(() => {
    requestForTaskList();
  }, [goalIdNum, dayFilter]);
  if (loading && taskList.length === 0) return <Skeleton />;
  return (
    <TaskContextProvider
      isGoalFiltered={Boolean(goalIdNum)}
      updateTaskList={requestForTaskList}
    >
      <div className={"flex w-full flex-col gap-y-3"}>
        {taskList.map(
          (
            { id, done, index, title, indexInGoal, goal, day, selectedDay },
            i
          ) => (
            <div key={id}>
              <Task
              dayFilterDate={dayFilterDate}
                selectedDay={selectedDay ?? null}
                currentDay={day ?? null}
                id={id}
                done={done}
                title={title}
                indexInGoal={indexInGoal}
                index={index}
                goalTitle={goal.title}
              />
              {taskList.length - 1 !== i && <hr className="mt-2" />}
            </div>
          )
        )}
        <AddTask />
      </div>
    </TaskContextProvider>
  );
};

export default TaskList;
