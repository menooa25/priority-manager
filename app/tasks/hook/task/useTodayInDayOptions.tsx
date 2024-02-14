"use client";

import { useMemo } from "react";
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

const useTodayInDayOptions = () => {
  const todayInDayOtions = useMemo(() => {
    const today = new Date().getDay().toString();
    let indexOfDay: number;

    const addedToday = dayOptions.map((day, i) => {
      if (day.searchParam !== today) return day;
      indexOfDay = i;
      return { searchParam: today, title: "امروز" };
    });
    return [
      ...addedToday.slice(indexOfDay!),
      ...addedToday.slice(0, indexOfDay!),
    ];
  }, []);
  return todayInDayOtions;
};

export default useTodayInDayOptions;
