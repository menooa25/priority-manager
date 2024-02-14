"use client";

import { useEffect, useState } from "react";
import useQueryParams from "../../../../hook/useQueryParams";
import useTodayInDayOptions from "../../../hook/task/useTodayInDayOptions";

const FilterAsDay = () => {
  const { changeSearchParams, searchParams } = useQueryParams();
  const initDay = () =>
    searchParams.get("day") !== null ? +searchParams.get("day")! : -1;
  const [selected, setSelected] = useState(initDay);
  const todayInDayOtions = useTodayInDayOptions();
  useEffect(() => {
    changeSearchParams("day", selected.toString());
  }, [selected]);
  return (
    <>
      <select
        onChange={({ target: { value } }) => setSelected(+value)}
        value={selected}
        className="select select-bordered select-sm w-full focus-visible:outline-none"
      >
        <option className="text-center" value={"-1"}>
          همه روز ها
        </option>
        {todayInDayOtions.map(({ searchParam, title }) => (
          <option className="text-center" key={searchParam} value={searchParam}>
            {title}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterAsDay;
