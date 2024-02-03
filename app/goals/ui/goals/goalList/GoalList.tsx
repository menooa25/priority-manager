"use client";
import { useContext, useEffect } from "react";
import AddGoal from "./AddGoal";
import Goal from "./goal/Goal";

import Skeleton from "@/app/ui/goalAndTaskTextarea/Skeleton";
import { GoalContext } from "../GoalContextProvider";
import SingleGoalContextProvider from "./SingleGoalContextProvider";

const GoalList = () => {
  const { goalList, loading, updateGoalList } = useContext(GoalContext);
  useEffect(() => {
    updateGoalList();
  }, []);

  if (loading && goalList.length === 0) return <Skeleton />;
  return (
    <div className={"flex  w-full flex-col gap-y-3 "}>
      <AddGoal />
      {goalList.map((goal, i) => (
        <SingleGoalContextProvider goal={goal} key={goal.id}>
          <div>
            <Goal
              done={goal.done}
              id={goal.id}
              index={goal.index}
              title={goal.title}
            />
            {goalList.length - 1 !== i && <hr className="mt-2" />}
          </div>
        </SingleGoalContextProvider>
      ))}
    </div>
  );
};

export default GoalList;
