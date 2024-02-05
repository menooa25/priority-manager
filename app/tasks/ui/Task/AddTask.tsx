"use client";
import { useState } from "react";
import Task from "./Task";
import useClickedOutside from "../../../lib/hooks/useClickedOutside";

const AddTask = () => {
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
        <Task
          time={null}
          currentDay={null}
          selectedDay={null}
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
      افزودن فعالیت
    </button>
  );
};

export default AddTask;
