"use client";

import { getNearestDayOfWeek } from "@/app/lib/utils";
import { useState } from "react";
import { dayOptions } from "../../FilterAsDay";
interface Props {
  setDay: (day: string) => void;
  setNewSelectedDay: (day: number) => void;
}
const SelectingDay = ({ setDay, setNewSelectedDay }: Props) => {
  const [selected, setSelected] = useState("");

  const onChange = (value: string) => {
    setSelected(value);
    if (value) {
      const cleanedDayNum = +value;
      setNewSelectedDay(cleanedDayNum);
      setDay(getNearestDayOfWeek(cleanedDayNum).toLocaleDateString());
    }
  };
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
        <option className="text-right " value={"-1"}>
          امروز
        </option>
        {dayOptions.map(({ searchParam, title }) => (
          <option className="text-right " key={searchParam} value={searchParam}>
            {title}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectingDay;
