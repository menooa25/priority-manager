"use client";

import { useContext, useEffect } from "react";
import Skeleton from "../../ui/goalAndTaskTextarea/Skeleton";
import AddTask from "./Task/AddTask";
import Task from "./Task/Task";
import { TaskContext } from "./TaskContextProvider";
import useFilters from "../hook/task/useFilters";

const TaskList = () => {
  const { dayFilterDate, goalIdNum, dayFilter } = useFilters();

  const { taskList, updateTaskList, loading } = useContext(TaskContext);
  useEffect(() => {
    updateTaskList();
  }, [goalIdNum, dayFilter]);
  if (loading && taskList.length === 0) return <Skeleton />;
  return (
    <div className={"flex w-full flex-col gap-y-3"}>
      <AddTask />

      {taskList.map(
        (
          { id, done, index, title, indexInGoal, goal, day, selectedDay, Time ,goalId},
          i
        ) => (
          <div key={id}>
            <Task
              taskGoalId={goalId}
              Time={Time}
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
    </div>
  );
};

export default TaskList;
