import { useState } from "react";
import {
  changeGoalTitle,
  createGoal,
  decreaseGoalIndex,
  deleteGoal,
  doneGoal,
  increaseGoalIndex,
  resumeGoal,
} from "../(overview)/goalList/actions";
import {
  createTask,
  decreaseTaskIndex,
  deleteTask,
  increaseTaskIndex,
  changeTaskDone,
  increaseTaskGoalIndex,
  decreaseTaskGoalIndex,
  changeTaskTitle,
} from "../tasks/actions";
interface Props {
  model: "goal" | "task";
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  goalId?: number;
  updateList: () => void;
  status: { itsNew: boolean; itsEdited: boolean };
  isGoalFiltered?: boolean;
  indexInGoal?: number;
}

const useTaskGoalActions = ({
  done,
  id,
  index,
  status,
  text,
  updateList,
  goalId,
  model,
  isGoalFiltered,
  indexInGoal,
}: Props) => {
  const [loading, setLoading] = useState({
    increaseIndex: false,
    decreaseIndex: false,
    done: false,
    resume: false,
    save: false,
  });
  const onSave = async (callBack?: () => void) => {
    if (status.itsNew && text) {
      setLoading({ ...loading, save: true });
      if (model === "task") {
        if (goalId) await createTask(text, goalId);
      } else await createGoal(text);
      setLoading({ ...loading, save: false });

      updateList();
      callBack && callBack();
    } else if (id && !done) {
      setLoading({ ...loading, save: true });
      if (model === "task") {
        await changeTaskTitle(id, text);
      } else await changeGoalTitle(id, text);
      setLoading({ ...loading, save: false });
      updateList();
    }
  };
  const onResume = async () => {
    if (done && id) {
      setLoading({ ...loading, resume: true });
      if (model === "task") await changeTaskDone(id, false);
      else await resumeGoal(id);
      setLoading({ ...loading, resume: false });

      updateList();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      setLoading({ ...loading, done: true });
      if (model === "task") await changeTaskDone(id, true);
      else await doneGoal(id);
      setLoading({ ...loading, done: false });
      updateList();
    }
  };
  const onDelete = async () => {
    if (id) {
      if (model === "task") await deleteTask(id);
      else await deleteGoal(id);
      updateList();
    }
  };

  const onIncreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      if (model === "goal") await increaseGoalIndex(id, index);
      else {
        if (isGoalFiltered && indexInGoal !== undefined)
          await increaseTaskGoalIndex(id, indexInGoal);
        else await increaseTaskIndex(id, index);
      }
      setLoading({ ...loading, increaseIndex: false });

      updateList();
    }
  };
  const onDecreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      if (model === "goal") await decreaseGoalIndex(id, index);
      else {
        if (isGoalFiltered && indexInGoal !== undefined)
          await decreaseTaskGoalIndex(id, indexInGoal);
        else await decreaseTaskIndex(id, index);
      }
      setLoading({ ...loading, decreaseIndex: false });

      updateList();
    }
  };
  return {
    loading,
    onSave,
    onResume,
    onDone,
    onDelete,
    onIncreaseIndex,
    onDecreaseIndex,
  };
};

export default useTaskGoalActions;
