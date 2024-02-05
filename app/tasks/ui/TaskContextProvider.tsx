"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import useFilters from "../hook/task/useFilters";
import { TopLoadingContext } from "@/app/ui/TopLoading";
import { getTaskList } from "../lib/actions";
import { Task } from "@prisma/client";

interface ContextType {
  updateTaskList: () => void;
  isGoalFiltered: boolean;
  taskList: (Task & { goal: { title: string } })[];
  loading: boolean;
}

export const TaskContext = createContext<ContextType>({
  updateTaskList: () => {},
  isGoalFiltered: false,
  taskList: [],
  loading: false,
});
interface Props {
  children: ReactNode;
}
const TaskContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState<
    (Task & { goal: { title: string } })[]
  >([]);
  const { completeLoading, startLoading: startTopLoading } =
    useContext(TopLoadingContext);
  const { dayFilterDate, goalIdNum } = useFilters();

  const startLoading = () => {
    startTopLoading();
    setLoading(true);
  };
  const endLoading = () => {
    setLoading(false);
    completeLoading();
  };
  const updateTaskList = async () => {
    startLoading();

    const resp = await getTaskList(goalIdNum, dayFilterDate);
    if (resp) {
      setTaskList(resp);
      endLoading();
    }
  };
  return (
    <TaskContext.Provider
      value={{
        updateTaskList,
        isGoalFiltered: Boolean(goalIdNum),
        taskList,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
