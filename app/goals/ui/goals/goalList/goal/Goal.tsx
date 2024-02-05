"use client";
import TextareaIndexChng from "@/app/ui/goalAndTaskTextarea/TextareaIndexChng";
import { direction } from "direction";
import { useEffect, useState } from "react";

import { SaveBtn } from "@/app/ui/goalAndTaskTextarea/actionButtons";
import useGoalOperations from "../../../../hooks/goal/useGoalOperations";
import { DeleteGoal, DoneGoal, ResumeGoalBtn } from "./ActionButtons";
import GoalDetail from "./GoalDetail/GoalDetail";
import Link from "./Link";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  index?: number;
  onSaved?: () => void;
}

const Goal = ({ title, onSaved, done, id, index }: Props) => {
  const [text, setText] = useState(title);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const {
    loading,
    onSave,
    onResume,
    onDone,
    onDelete,
    onDecreaseIndex,
    onIncreaseIndex,
  } = useGoalOperations({
    done,
    id,
    index,
    status,
    text,
  });

  useEffect(() => {
    setStatus({
      itsNew: title === "",
      itsEdited: text !== title,
    });
  }, [title, text]);
  return (
    <div>
      <TextareaIndexChng
        defaultValue={title}
        dir={direction(text)}
        done={done}
        onChange={setText}
        loading={{
          decrease: loading.decreaseIndex,
          increase: loading.increaseIndex,
        }}
        onClick={{ decrease: onDecreaseIndex, increase: onIncreaseIndex }}
        className={!id ? "!rounded-bl-2xl" : ""}
        itsNew={status.itsNew}
      />
      {id && (
        <div className="flex gap-x-1">
          <GoalDetail />
          <Link />
        </div>
      )}
      <div className="flex w-full gap-x-1 mt-2">
        <DeleteGoal title={title} onClick={onDelete} display={done} />
        <ResumeGoalBtn
          loading={loading.resume}
          display={done}
          onClick={onResume}
        />
      </div>
      <div
        className={`flex w-full gap-x-1 ${
          (status.itsEdited || status.itsNew) && "mb-1"
        }`}
      >
        <DeleteGoal
          title={title}
          onClick={onDelete}
          display={!done && !status.itsNew}
        />
        <DoneGoal
          loading={loading.done}
          onClick={onDone}
          display={!done && !status.itsNew}
        />
      </div>
      <SaveBtn
        disabled={!Boolean(text)}
        loading={loading.save}
        display={status.itsEdited || status.itsNew}
        onClick={() => onSave(onSaved)}
      />
    </div>
  );
};

export default Goal;
