"use client";
import TaskareaIndexChng from "@/app/components/TaskareaIndexChng/TaskareaIndexChng";
import { direction } from "direction";
import { useContext, useEffect, useState } from "react";
import useTaskGoalActions from "../../../hooks/useTaskGoalActions";
import { GoalContext } from "../GoalContextProvider";
import { DeleteGoal, DoneGoal, ResumeGoalBtn, SaveBtn } from "./ActionButtons";
import GoalDetail from "./GoalDetail/GoalDetail";

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
  const { updateGoalList } = useContext(GoalContext);
  const {
    loading,
    onSave,
    onResume,
    onDone,
    onDelete,
    onDecreaseIndex,
    onIncreaseIndex,
  } = useTaskGoalActions({
    model: "goal",
    updateList: updateGoalList,
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
      <TaskareaIndexChng
        defaultValue={title}
        dir={direction(text)}
        done={done}
        onChange={setText}
        loading={{
          decrease: loading.decreaseIndex,
          increase: loading.increaseIndex,
        }}
        onClick={{ decrease: onDecreaseIndex, increase: onIncreaseIndex }}
        className={id ? "rounded-bl-none" : ""}
      />
      {id && (
        <div className="flex ">
          <GoalDetail goalId={id} goalIsDone={done} />
        </div>
      )}
      <div className="flex w-full gap-x-1 mt-1">
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
        loading={loading.save}
        display={status.itsEdited || status.itsNew}
        onClick={() => onSave(onSaved)}
      />
    </div>
  );
};

export default Goal;
