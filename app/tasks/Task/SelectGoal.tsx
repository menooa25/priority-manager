"use client";

import { Goal } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGoalList } from "../actions";
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
  }, [goalId, goalList]);
  if (itsPreSet && goalTitle)
    return (
      <>
        <div
          dir={direction(goalTitle ?? "")}
          className="btn flex justify-center min-w-56 max-w-[80%] overflow-hidden text-right btn-sm rounded-lg  rounded-t-none align-middle h-6 min-h-6 font-normal text-base"
        >
          {goalTitle}
        </div>
      </>
    );
  return (
    <>
      {/* <div className={"dropdown dropdown-top md:dropdown-left  "}> */}
      <select className="bg-base-200 select select-sm rounded-lg rounded-t-none h-6 min-h-6 font-normal text-base min-w-56 max-w-[80%] overflow-auto focus-visible:outline-none focus-visible:border-none">
        {goalList?.map(({ id, title }) => (
          <option className="text-center" key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
      {/* <div
          dir={direction(goalTitle ?? "")}
          tabIndex={0}
          role="button"
          className="btn flex flex-col justify-center min-w-56 max-w-[80%] overflow-auto text-right btn-sm rounded-lg font-normal rounded-t-none p-1 align-middle px-7"
        >
          {goalTitle ? goalTitle : "هدفی را برای این فعالیت انتخاب کنید"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-2xl rounded-tr-none mr-2 x w-52"
        >
          {goalList?.map(({ id, title }) => (
            <li dir={direction(title)} key={id}>
              <span onClick={() => setGoalId(id)}>{title}</span>
            </li>
          ))}
        </ul> */}
      {/* </div> */}
    </>
  );
};

export default SelectGoal;
