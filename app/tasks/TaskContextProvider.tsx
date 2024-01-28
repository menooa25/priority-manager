"use client";

import { ReactNode, createContext } from "react";

export const TaskContext = createContext({
  updateTaskList: () => {},
  isGoalFiltered: false,
});
interface Props {
  updateTaskList: () => void;
  isGoalFiltered: boolean;
  children: ReactNode;
}
const TaskContextProvider = ({
  updateTaskList,
  children,
  isGoalFiltered,
}: Props) => {
  return (
    <TaskContext.Provider value={{ updateTaskList, isGoalFiltered }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
