"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initDay = () =>
    searchParams.get("day") !== null ? +searchParams.get("day")! : -1;
  const [selected, setSelected] = useState(initDay);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    router.push(pathname + "?" + createQueryString("day", selected.toString()));
  }, [selected]);
  return (
    <>
      <select
        onChange={({ target: { value } }) => setSelected(+value)}
        value={selected}
        className="select select-bordered select-sm w-full"
      >
        <option className="text-center" value={"-1"}>
          همه
        </option>
        {dayOptions.map(({ searchParam, title }) => (
          <option className="text-center" key={searchParam} value={searchParam}>
            {title}
          </option>
        ))}
      </select>
      {/* <div role="tablist" className="tabs tabs-boxed tabs-sm">
        <span role="tab" className="tab ">
          شنبه
        </span>
        <span role="tab" className="tab ">
          یک‌شنبه
        </span>
        <span role="tab" className="tab">
          دو‌شنبه
        </span>
      </div> */}
    </>
  );
};

export default Filters;
