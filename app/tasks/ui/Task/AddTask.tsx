"use client";
import { useState } from "react";
import Task from "./Task";
import useClickedOutside from "../../../lib/hooks/useClickedOutside";

const AddTask = () => {
  const [showTextarea, setShowTextarea] = useState(false);
  const onOutsdieClick = () => {
    setShowTextarea(false);
  };
  const { ref } = useClickedOutside(onOutsdieClick);

  return (
    <div ref={ref}>
      {showTextarea && (
        <Task
          currentDay={null}
          selectedDay={null}
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
          افزودن فعالیت
        </button>
      )}
    </div>
  );
};

export default AddTask;
