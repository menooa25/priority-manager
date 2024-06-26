import { useContext, useState } from "react";
import {
  changeGoalTitle,
  createGoal,
  decreaseGoalIndex,
  deleteGoal,
  doneGoal,
  increaseGoalIndex,
  resumeGoal,
} from "../../lib/actions";
import { GoalContext } from "../../ui/goals/GoalContextProvider";
interface Props {
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  status: { itsNew: boolean; itsEdited: boolean };
}

const useGoalOperations = ({ done, id, index, status, text }: Props) => {
  const { updateGoalList } = useContext(GoalContext);
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
      await createGoal(text);
      setLoading({ ...loading, save: false });

      updateGoalList();
      callBack && callBack();
    } else if (id && !done) {
      setLoading({ ...loading, save: true });
      await changeGoalTitle(id, text);
      setLoading({ ...loading, save: false });
      updateGoalList();
    }
  };
  const onResume = async () => {
    if (done && id) {
      setLoading({ ...loading, resume: true });
      await resumeGoal(id);
      setLoading({ ...loading, resume: false });

      updateGoalList();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      setLoading({ ...loading, done: true });
      await doneGoal(id);
      setLoading({ ...loading, done: false });
      updateGoalList();
    }
  };
  const onDelete = async () => {
    if (id) {
      await deleteGoal(id);
      updateGoalList();
    }
  };

  const onIncreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      await increaseGoalIndex(id, index);

      setLoading({ ...loading, increaseIndex: false });

      updateGoalList();
    }
  };
  const onDecreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      await decreaseGoalIndex(id, index);

      setLoading({ ...loading, decreaseIndex: false });

      updateGoalList();
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

export default useGoalOperations;
