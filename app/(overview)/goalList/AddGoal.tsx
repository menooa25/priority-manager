"use client";
import useClickedOutside from "@/app/hooks/useClickedOutside";
import { useState } from "react";
import Goal from "./goal/Goal";
import { scrollToPageBottom } from "@/app/utils";

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
            setTimeout(scrollToPageBottom, 100);
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
