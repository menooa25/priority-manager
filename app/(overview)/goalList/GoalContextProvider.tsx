"use client";

import { ReactNode, createContext } from "react";

export const GoalContext = createContext({ updateGoalList: () => {} });
interface Props {
  updateGoalList: () => void;
  children: ReactNode;
}
const GoalContextProvider = ({ updateGoalList, children }: Props) => {
  return (
    <GoalContext.Provider value={{ updateGoalList }}>
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContextProvider;
