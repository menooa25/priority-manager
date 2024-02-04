"use client";
import useClickedOutside from "@/app/lib/hooks/useClickedOutside";
import { useState } from "react";
import Goal from "./goal/Goal";

const AddGoal = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const onOutsdieClick = () => {
    const elem = ref.current;
    if (elem) {
      const firstTextarea = elem.querySelector("textarea");
      const textareaValue = firstTextarea ? firstTextarea.value : "";

      setShowTextarea(textareaValue !== "");
    }
  };
  const { ref } = useClickedOutside(onOutsdieClick);
  if (showTextarea)
    return (
      <div ref={ref}>
        <Goal
          done={false}
          onSaved={() => setShowTextarea(!showTextarea)}
          title=""
        />
      </div>
    );
  return (
    <button
      onClick={() => {
        setShowTextarea(true);
      }}
      className="btn  btn-outline btn-sm w-full"
    >
      افزودن هدف
    </button>
  );
};

export default AddGoal;
