"use client";
import { useState } from "react";
import Goal from "./goal/Goal";

const AddGoal = () => {
  const [newClicked, setNewClicked] = useState(false);
  return (
    <div>
      {newClicked && (
        <Goal
          done={false}
          onSaved={() => setNewClicked(!newClicked)}
          title=""
        />
      )}
      {!newClicked && (
        <button
          onClick={() => setNewClicked(!newClicked)}
          className="btn  btn-outline btn-sm w-full"
        >
          افزودن هدف
        </button>
      )}
    </div>
  );
};

export default AddGoal;
