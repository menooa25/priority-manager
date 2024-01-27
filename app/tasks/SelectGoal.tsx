"use client";

import { Goal } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGoalList } from "./actions";
import classNames from "classnames";
import { direction } from "direction";

interface Props {
  setGoalId: (id: number) => void;
  goalId: number | undefined;
}
const SelectGoal = ({ setGoalId, goalId }: Props) => {
  const goal = useSearchParams().get("goal");
  const [goalTitle, setGoalTitle] = useState<string>();
  const [itsPreSet, setItsPreSet] = useState(false);
  const [goalList, setGoalList] = useState<Goal[]>();
  const fetchGoals = async () => {
    const fetchedGoalList = await getGoalList();
    if (fetchedGoalList) setGoalList(fetchedGoalList);
  };
  useEffect(() => {
    if (goal && !isNaN(+goal)) {
      setGoalId(+goal);
      setItsPreSet(true);
    }
  }, [goal]);
  useEffect(() => {
    fetchGoals();
  }, []);
  useEffect(() => {
    if (goalId) {
      setGoalTitle(goalList?.find(({ id }) => id === goalId)?.title);
    }
  }, [goalId]);
  if (itsPreSet && goalTitle)
    return (
      <div
        dir={direction(goalTitle ?? "")}
        className="btn  btn-sm rounded-lg font-normal rounded-t-none "
      >
        {goalTitle}
      </div>
    );
  return (
    <>
      <div className={"dropdown dropdown-left "}>
        <div
          dir={direction(goalTitle ?? "")}
          tabIndex={0}
          role="button"
          className="btn  btn-sm rounded-lg font-normal rounded-t-none "
        >
          {goalTitle ? goalTitle : "هدفی را برای این فعالیت انتخاب کنید"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-2xl rounded-tr-none mr-2 x w-52"
        >
          {goalList?.map(({ id, title }) => (
            <li key={id}>
              <span onClick={() => setGoalId(id)}>{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectGoal;
