"use client";

import { getNearestDayOfWeek } from "@/app/lib/utils";
import useTodayInDayOptions from "@/app/tasks/hook/task/useTodayInDayOptions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
  setDay: (day: string) => void;
  setNewSelectedDay: (day: number) => void;
}
const SelectingDay = ({ setDay, setNewSelectedDay }: Props) => {
  const dayFilter = useSearchParams().get("day");
  const [selected, setSelected] = useState(
    [null, "-1"].includes(dayFilter) ? "" : (dayFilter as string)
  );
  const todayInDayOtions = useTodayInDayOptions();

  const onChange = (value: string) => {
    setSelected(value);
  };
  useEffect(() => {
    if (selected) {
      const cleanedDayNum = +selected;
      setNewSelectedDay(cleanedDayNum);
      setDay(getNearestDayOfWeek(cleanedDayNum).toLocaleDateString());
    }
  }, [selected]);
  return (
    <>
      <select
        value={selected}
        onChange={({ target: { value } }) => onChange(value)}
        className="select select-bordered select-sm w-full focus-visible:outline-none text-center"
      >
        <option className="text-right " value={""}>
          بدون روز مشخص
        </option>

        {todayInDayOtions.map(({ searchParam, title }) => (
          <option className="text-right " key={searchParam} value={searchParam}>
            {title}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectingDay;
