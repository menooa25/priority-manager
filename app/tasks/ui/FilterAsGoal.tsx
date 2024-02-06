"use client";

import { useEffect, useState } from "react";
import useFilters from "../hook/task/useFilters";
import { Goal } from "@prisma/client";
import { getGoalList } from "../lib/actions";
import { direction } from "direction";
import useQueryParams from "../../hook/useQueryParams";

const FilterAsGoal = () => {
  const { goalIdNum } = useFilters();

  const [selectedGoal, setSelectedGoal] = useState(0);
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const { changeSearchParams } = useQueryParams();
  const onChange = (value: number) => {
    if (value === 0) {
      changeSearchParams("goal", "");
    } else {
      changeSearchParams("goal", value.toString());
    }
    setSelectedGoal(value);
  };
  const fetchGoalList = async () => {
    const goals = await getGoalList();
    if (goals) setGoalList(goals);
  };
  useEffect(() => {
    fetchGoalList();
    if (goalIdNum) setSelectedGoal(goalIdNum);
  }, []);
  return (
    <select
      value={selectedGoal}
      onChange={({ target: { value } }) => onChange(+value)}
      className="select select-bordered select-sm w-full text-center focus-visible:outline-none"
    >
      <option className="w-full" dir="rtl" value={0}>
        فعالیت های همه هدف ها
      </option>
      {goalList.map(({ id, title }) => (
        <option dir={direction(title)} value={id} key={id}>
          {title}
        </option>
      ))}
    </select>
  );
};

export default FilterAsGoal;
