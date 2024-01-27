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
import { createTask } from "../tasks/actions";
interface Props {
  model: "goal" | "task";
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  goalId?: number;
  updateList: () => void;
  status: { itsNew: boolean; itsEdited: boolean };
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
      if (model === "task" && goalId) await createTask(text, goalId);
      else await createGoal(text);
      setLoading({ ...loading, save: false });

      updateList();
      callBack && callBack();
    } else if (id && !done) {
      setLoading({ ...loading, save: true });

      await changeGoalTitle(id, text);
      setLoading({ ...loading, save: false });
      updateList();
    }
  };
  const onResume = async () => {
    if (model === "task") return null;
    if (done && id) {
      setLoading({ ...loading, resume: true });

      await resumeGoal(id);
      setLoading({ ...loading, resume: true });

      updateList();
    }
  };
  const onDone = async () => {
    if (model === "task") return null;

    if (id && !done) {
      setLoading({ ...loading, done: true });

      await doneGoal(id);
      setLoading({ ...loading, done: false });
      updateList();
    }
  };
  const onDelete = async () => {
    if (model === "task") return null;

    if (id) {
      await deleteGoal(id);
      updateList();
    }
  };
  const onIncreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      if (model === "goal") await increaseGoalIndex(id, index);
      setLoading({ ...loading, increaseIndex: false });

      updateList();
    }
  };
  const onDecreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      if (model === "goal") await decreaseGoalIndex(id, index);
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
