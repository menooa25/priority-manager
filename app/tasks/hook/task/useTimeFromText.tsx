"use client";
import { extractTimeAndTranslate } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { updateTimeFromText } from "../../lib/actions";

const useTimeFromText = (id: number, text: string) => {
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const fromDetector = "از ساعت";
  const toDetector = "تا ساعت";
  const extractFromTime = () =>
    setFromTime(extractTimeAndTranslate(text)?.[0] ?? "");
  const extractToTime = () =>
    setToTime(extractTimeAndTranslate(text)?.[0] ?? "");
  const putTime = async () => {
    if (fromTime || toTime) {
      await updateTimeFromText(id, fromTime, toTime);
    }
  };
  useEffect(() => {
    if (text.includes(fromDetector)) extractFromTime();
    if (text.includes(toDetector)) extractToTime();
  }, [text]);
  useEffect(() => {
    putTime();
  }, [fromTime, toTime]);
  return null;
};

export default useTimeFromText;
