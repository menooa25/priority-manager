import { Goal } from "@prisma/client";
import { ReactNode, createContext } from "react";

export const SingleGoalContext = createContext<Goal | undefined>(undefined);
interface Props {
  goal: Goal;
  children: ReactNode;
}
const SingleGoalContextProvider = ({ goal, children }: Props) => {
  return (
    <SingleGoalContext.Provider value={goal}>
      {children}
    </SingleGoalContext.Provider>
  );
};

export default SingleGoalContextProvider;
