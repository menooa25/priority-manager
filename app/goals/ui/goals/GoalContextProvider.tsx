"use client";

import { getGoalList } from "@/app/goals/lib/actions";
import { TopLoadingContext } from "@/app/ui/TopLoading";
import { Goal } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextType {
  updateGoalList: () => void;
  goalList: Goal[];
  loading: boolean;
}
export const GoalContext = createContext<ContextType>({
  updateGoalList: () => {},
  goalList: [],
  loading: false,
});
interface Props {
  children: ReactNode;
}
const GoalContextProvider = ({ children }: Props) => {
  const [goalList, setGoalList] = useState<Goal[]>([]);
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
  const updateGoalList = async () => {
    startLoading();

    const resp = await getGoalList();
    if (resp) {
      setGoalList(resp);
      endLoading();
    }
  };

  return (
    <GoalContext.Provider value={{ goalList, updateGoalList, loading }}>
      {children}
    </GoalContext.Provider>
  );
};

export default GoalContextProvider;
