"use client";

import { useEffect, useState } from "react";
import useFilters from "./useFilters";
import { Goal } from "@prisma/client";
import { getGoalList } from "../lib/actions";
import { direction } from "direction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterAsGoal = () => {
  const { goalIdNum } = useFilters();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedGoal, setSelectedGoal] = useState(0);
  const [goalList, setGoalList] = useState<Goal[]>([]);
  const searchParams = useSearchParams();
  const changeSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(pathname + "?" + params);
  };
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
      className="select select-bordered select-sm w-full text-center"
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
