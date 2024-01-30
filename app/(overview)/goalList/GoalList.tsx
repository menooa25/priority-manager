"use client";
import Goal from "./goal/Goal";
import AddGoal from "./AddGoal";
import { useContext, useEffect, useState } from "react";
import { Goal as GoalSchima } from "@prisma/client";
import { getGoalList } from "./actions";
import GoalContextProvider from "./GoalContextProvider";
import Skeleton from "../../components/goalAndTask/Skeleton";
import { TopLoadingContext } from "@/app/components/TopLoading";

const GoalList = () => {
  const [goalList, setGoalList] = useState<GoalSchima[]>([]);
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
  const requestForGoalList = async () => {
    startLoading();

    const resp = await getGoalList();
    if (resp) {
      setGoalList(resp);
      endLoading();
    }
  };
  useEffect(() => {
    requestForGoalList();
  }, []);

  if (loading && goalList.length === 0) return <Skeleton />;
  return (
    <GoalContextProvider updateGoalList={requestForGoalList}>
      <div className={"flex  w-full flex-col gap-y-3 "}>
        <AddGoal />

        {goalList.map((t, i) => (
          <div key={t.id}>
            <Goal done={t.done} id={t.id} index={t.index} title={t.title} />
            {goalList.length - 1 !== i && <hr className="mt-2" />}
          </div>
        ))}
      </div>
    </GoalContextProvider>
  );
};

export default GoalList;
