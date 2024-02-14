"use client";
import TextareaIndexChng from "@/app/ui/goalAndTaskTextarea/TextareaIndexChng";
import { direction } from "direction";
import { useEffect, useState } from "react";

import { SaveBtn } from "@/app/ui/goalAndTaskTextarea/actionButtons";
import useGoalOperations from "../../../../hooks/goal/useGoalOperations";
import { DeleteGoal, DoneGoal, ResumeGoalBtn } from "./ActionButtons";
import GoalDetail from "./GoalDetail/GoalDetail";
import Link from "./Link";
import Renderer from "@/app/ui/Renderer";

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
        itsNew={status.itsNew}
        className={status.itsNew ? "!rounded-b-2xl" : ""}
      />
      <Renderer condition={Boolean(id)}>
        <div className="flex gap-x-1">
          <GoalDetail />
          <Link />
          <div
            className={`flex justify-end flex-1 gap-x-1  ${
              !done && "pr-[30px]"
            }`}
          >
            <ResumeGoalBtn
              loading={loading.resume}
              display={done}
              onClick={onResume}
            />
            <DeleteGoal title={title} onClick={onDelete} display={done} />
            <DoneGoal
              loading={loading.done}
              onClick={onDone}
              display={!done && !status.itsNew}
            />
            <DeleteGoal
              title={title}
              onClick={onDelete}
              display={!done && !status.itsNew}
            />
          </div>
        </div>
      </Renderer>

      <div className="flex w-full gap-x-1 mt-2"></div>
      <div
        className={`flex w-full gap-x-1 ${
          (status.itsEdited || status.itsNew) && "mb-1"
        }`}
      ></div>
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
