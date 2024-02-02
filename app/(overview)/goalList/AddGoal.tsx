"use client";
import useClickedOutside from "@/app/lib/hooks/useClickedOutside";
import { useState } from "react";
import Goal from "./goal/Goal";
import { scrollToPageBottom } from "@/app/lib/utils";

const AddGoal = () => {
  const [newClicked, setNewClicked] = useState(false);
  const onOutsdieClick = () => {
    setNewClicked(false);
  };
  const { ref } = useClickedOutside(onOutsdieClick);
  return (
    <div ref={ref}>
      {newClicked && (
        <Goal
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
          افزودن هدف
        </button>
      )}
    </div>
  );
};

export default AddGoal;
