"use client";
import { useState } from "react";
import Task from "./Task";
import useClickedOutside from "../../lib/hooks/useClickedOutside";
import { scrollToPageBottom } from "@/app/lib/utils";

const AddTask = () => {
  const [newClicked, setNewClicked] = useState(false);
  const onOutsdieClick = () => {
    setNewClicked(false);
  };
  const { ref } = useClickedOutside(onOutsdieClick);

  return (
    <div ref={ref}>
      {newClicked && (
        <Task
          currentDay={null}
          selectedDay={null}
          done={false}
          onSaved={() => setNewClicked(!newClicked)}
          title=""
        />
      )}
      {!newClicked && (
        <button
          onClick={() => {
            setNewClicked(!newClicked);
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
