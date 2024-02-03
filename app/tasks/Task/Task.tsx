"use client";

import { useContext, useEffect, useState } from "react";

import { direction } from "direction";
import TextareaIndexChng from "../../ui/goalAndTaskTextarea/TextareaIndexChng";
import { SaveBtn } from "../../ui/goalAndTaskTextarea/actionButtons";
import { TaskContext } from "../TaskContextProvider";
import {
  decreaseTaskGoalIndex,
  decreaseTaskIndex,
  increaseTaskGoalIndex,
  increaseTaskIndex,
} from "../actions";
import useTaskOperations from "../useTaskOperations";
import AttachToDay from "./AttachToDay";
import SelectGoal from "./SelectGoal";
import TaskGoal from "./TaskGoal";
import { DeleteTask, DoneTask, ResumeTaskBtn } from "./actionButton";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  index?: number;
  onSaved?: () => void;
  indexInGoal?: number;
  goalTitle?: string;
  currentDay: null | Date;
  dayFilterDate?: Date;
  selectedDay: null | number;
}

const Task = ({
  done,
  title,
  id,
  index,
  onSaved,
  indexInGoal,
  goalTitle,
  dayFilterDate,
  selectedDay,
}: Props) => {
  const [text, setText] = useState(title);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const { updateTaskList, isGoalFiltered } = useContext(TaskContext);
  const [goalId, setGoalId] = useState<number>();
  const {
    loading,
    onSave,
    onResume,
    onDone,
    onDelete,
    onDecreaseIndex,
    onIncreaseIndex,
  } = useTaskOperations({
    updateList: updateTaskList,
    done,
    id,
    index,
    goalId,
    status,
    text,
  });
  const getIncreseIndexFuncArgs = () => {
    if (isGoalFiltered && indexInGoal !== undefined)
      return { func: increaseTaskGoalIndex, index: indexInGoal, dayFilterDate };
    return { func: increaseTaskIndex, index: index as number, dayFilterDate };
  };
  const getDecreaseIndexFuncArgs = () => {
    if (isGoalFiltered && indexInGoal !== undefined)
      return { func: decreaseTaskGoalIndex, index: indexInGoal, dayFilterDate };
    return { func: decreaseTaskIndex, index: index as number, dayFilterDate };
  };
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
        onClick={{
          decrease: () =>
            onDecreaseIndex(
              getDecreaseIndexFuncArgs().func,
              getDecreaseIndexFuncArgs().index,
              getDecreaseIndexFuncArgs().dayFilterDate
            ),
          increase: () =>
            onIncreaseIndex(
              getIncreseIndexFuncArgs().func,
              getIncreseIndexFuncArgs().index,
              getIncreseIndexFuncArgs().dayFilterDate
            ),
        }}
        itsNew={status.itsNew}
      />
      <div className="flex gap-x-1 ">
        {status.itsNew && <SelectGoal goalId={goalId} setGoalId={setGoalId} />}
        {!status.itsNew && goalTitle && (
          <TaskGoal taskIsDone={done} goalTitle={goalTitle} />
        )}
        {!status.itsNew && id && !done && (
          <AttachToDay
            taskId={id}
            selectedDay={selectedDay}
            taskTitle={title}
          />
        )}
      </div>
      <div className="flex w-full gap-x-1 mt-1">
        <DeleteTask title={title} onClick={onDelete} display={done} />
        <ResumeTaskBtn
          loading={loading.resume}
          display={done}
          onClick={onResume}
        />
      </div>
      <div className={"flex w-full gap-x-1 mt-1"}>
        <DeleteTask
          title={title}
          onClick={onDelete}
          display={!done && !status.itsNew}
        />
        <DoneTask
          loading={loading.done}
          onClick={onDone}
          display={!done && !status.itsNew}
        />
      </div>
      <div className={status.itsEdited ? "mt-1" : ""}>
        <SaveBtn
          disabled={
            !Boolean(
              (!status.itsNew || goalId) && (status.itsNew || id) && text
            )
          }
          loading={loading.save}
          display={status.itsEdited || status.itsNew}
          onClick={() => onSave(onSaved)}
        />
      </div>
    </div>
  );
};

export default Task;
