"use client";

import { ReactNode, createContext } from "react";

export const TaskContext = createContext({ updateTaskList: () => {} });
interface Props {
  updateTaskList: () => void;
  children: ReactNode;
}
const TaskContextProvider = ({ updateTaskList, children }: Props) => {
  return (
    <TaskContext.Provider value={{ updateTaskList }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
