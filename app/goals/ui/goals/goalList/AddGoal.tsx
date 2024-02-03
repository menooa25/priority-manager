"use client";
import useClickedOutside from "@/app/lib/hooks/useClickedOutside";
import { useState } from "react";
import Goal from "./goal/Goal";


const AddGoal = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const onOutsdieClick = () => {
    setShowTextarea(false);
  };
  const { ref } = useClickedOutside(onOutsdieClick);
  return (
    <div ref={ref}>
      {showTextarea && (
        <Goal
          done={false}
          onSaved={() => setShowTextarea(!showTextarea)}
          title=""
        />
      )}
      {!showTextarea && (
        <button
          onClick={() => {
            setShowTextarea(!showTextarea);
          }}
          className="btn  btn-outline btn-sm w-full"
        >
          افزودن هدف
        </button>
      )}
    </div>
  );
};

export default AddGoal;
