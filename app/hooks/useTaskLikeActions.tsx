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
interface Props {
  model: "goal" | "task";
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  updateList: () => void;
  status: { itsNew: boolean; itsEdited: boolean };
}

const useTaskLikeActions = ({
  done,
  id,
  index,
  status,
  text,
  updateList,
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
    if (status.itsNew) {
      setLoading({ ...loading, save: true });

      await createGoal(text);
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
    if (done && id) {
      setLoading({ ...loading, resume: true });

      await resumeGoal(id);
      setLoading({ ...loading, resume: true });

      updateList();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      setLoading({ ...loading, done: true });

      await doneGoal(id);
      setLoading({ ...loading, done: false });
      updateList();
    }
  };
  const onDelete = async () => {
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

export default useTaskLikeActions;
