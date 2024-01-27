"use client";
import { useState } from "react";
import Task from "./Task";

const AddTask = () => {
  const [newClicked, setNewClicked] = useState(false);
  return (
    <div>
      {newClicked && (
        <Task
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
          افزودن فعالیت
        </button>
      )}
    </div>
  );
};

export default AddTask;
