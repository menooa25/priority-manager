"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useContext, useEffect, useRef, useState } from "react";
import { GoalContext } from "../GoalContextProvider";
import {
  DecreaseIndexBtn,
  DeleteGoal,
  DoneGoal,
  IncreaseIndexBtn,
  ResumeGoalBtn,
  SaveBtn,
} from "./ActionButtons";
import useActions from "./useActions";
import GoalDetail from "./GoalDetail";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  index?: number;
  onSaved?: () => void;
}

const Goal = ({ title, onSaved, done, id, index }: Props) => {
  const textareaRef: any = useRef();
  const [text, setText] = useState(title);
  const { onScroll } = useNoScroll(textareaRef);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const { updateGoalList } = useContext(GoalContext);
  const {
    loading,
    onSave,
    onResumeGoal,
    onDone,
    onDelete,
    onDecreaseIndex,
    onIncreaseIndex,
  } = useActions({
    updateGoalList,
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
      <div className="flex items-stretch ">
        <textarea
          disabled={done}
          onScroll={(e) => onScroll(e)}
          onChange={({ target: { value } }) => setText(value)}
          ref={textareaRef}
          dir={direction(text)}
          className={`textarea rounded-2xl ${
            !done && "rounded-r-none"
          }  overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered ${
            id && "rounded-bl-none"
          }`}
          defaultValue={title}
        />

        <div className="flex flex-col rounded-2xl rounded-l-none">
          <IncreaseIndexBtn
            display={!done}
            onClick={onIncreaseIndex}
            loading={loading.increaseIndex}
          />
          <hr />
          <DecreaseIndexBtn
            display={!done}
            onClick={onDecreaseIndex}
            loading={loading.decreaseIndex}
          />
        </div>
      </div>
      {id && (
        <div className="flex ">
          <GoalDetail />
        </div>
      )}
      <div className="flex w-full gap-x-1 mt-1">
        <DeleteGoal title={title} onClick={onDelete} display={done} />
        <ResumeGoalBtn
          loading={loading.resume}
          display={done}
          onClick={onResumeGoal}
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
