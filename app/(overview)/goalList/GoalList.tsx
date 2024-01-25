"use client";
import Goal from "./goal/Goal";
import AddGoal from "./AddGoal";
import { useEffect, useState } from "react";
import { Goal as GoalSchima } from "@prisma/client";
import { getGoalList } from "./actions";
import { useSession } from "next-auth/react";
import GoalContextProvider from "./GoalContextProvider";
import Skeleton from "./Skeleton";

const GoalList = () => {
  const [goalList, setGoalList] = useState<GoalSchima[]>([]);
  const [loading, setLoading] = useState(true);
  const [noAnimation, setNoAnimation] = useState("");
  const userEmail = useSession().data?.user?.email;
  const requestForGoalList = async () => {
    setNoAnimation("no-animation");
    setLoading(true);
    if (!userEmail) {
      setLoading(false);
      setTimeout(() => setNoAnimation(""), 210);
      return null;
    }
    const resp = await getGoalList();
    if (resp) {
      setGoalList(resp);
      setLoading(false);
      setTimeout(() => setNoAnimation(""), 210);
    }
  };
  useEffect(() => {
    requestForGoalList();
  }, [userEmail]);

  if (loading && goalList.length === 0) return <Skeleton />;
  return (
    <GoalContextProvider updateGoalList={requestForGoalList}>
      <div className={"flex  w-full md:w-96 flex-col gap-y-3 " + noAnimation}>
        {goalList.map((t, i) => (
          <div key={t.id}>
            <Goal done={t.done} id={t.id} index={t.index} title={t.title} />
            {goalList.length - 1 !== i && <hr className="mt-2" />}
          </div>
        ))}
        <AddGoal />
      </div>
    </GoalContextProvider>
  );
};

export default GoalList;
