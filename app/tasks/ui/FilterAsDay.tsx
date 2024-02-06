"use client";

import { useEffect, useState } from "react";
import useQueryParams from "../../hook/useQueryParams";

export const dayOptions = [
  {
    searchParam: "6",
    title: "شنبه",
  },
  {
    searchParam: "0",
    title: "یک‌شنبه",
  },
  {
    searchParam: "1",
    title: "دو‌شنبه",
  },
  {
    searchParam: "2",
    title: "سه‌شنبه",
  },
  {
    searchParam: "3",
    title: "چهارشنبه",
  },
  {
    searchParam: "4",
    title: "پنج‌شنبه",
  },
  {
    searchParam: "5",
    title: "جمعه",
  },
];

const FilterAsDay = () => {
  const { changeSearchParams, searchParams } = useQueryParams();
  const initDay = () =>
    searchParams.get("day") !== null ? +searchParams.get("day")! : -1;
  const [selected, setSelected] = useState(initDay);

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
        {dayOptions.map(({ searchParam, title }) => (
          <option className="text-center" key={searchParam} value={searchParam}>
            {title}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterAsDay;
