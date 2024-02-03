import { useState } from "react";

import {
  createTask,
  decreaseTaskIndex,
  deleteTask,
  increaseTaskIndex,
  changeTaskDone,
  increaseTaskGoalIndex,
  decreaseTaskGoalIndex,
  changeTaskTitle,
} from "../lib/actions";
interface Props {
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  goalId?: number;
  updateList: () => void;
  status: { itsNew: boolean; itsEdited: boolean };
}

const useTaskOperations = ({
  done,
  id,
  index,
  status,
  text,
  updateList,
  goalId,
}: Props) => {
  const [loading, setLoading] = useState({
    increaseIndex: false,
    decreaseIndex: false,
    done: false,
    resume: false,
    save: false,
  });
  const onSave = async (callBack?: () => void) => {
    if (status.itsNew && text && goalId) {
      setLoading({ ...loading, save: true });
      await createTask(text, goalId);
      setLoading({ ...loading, save: false });
      updateList();
      callBack && callBack();
    } else if (id && !done) {
      setLoading({ ...loading, save: true });
      await changeTaskTitle(id, text);
      setLoading({ ...loading, save: false });
      updateList();
    }
  };
  const onResume = async () => {
    if (done && id) {
      setLoading({ ...loading, resume: true });
      await changeTaskDone(id, false);
      setLoading({ ...loading, resume: false });

      updateList();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      setLoading({ ...loading, done: true });
      await changeTaskDone(id, true);
      setLoading({ ...loading, done: false });
      updateList();
    }
  };
  const onDelete = async () => {
    if (id) {
      await deleteTask(id);
      updateList();
    }
  };

  const onIncreaseIndex = async (
    taskFunc: (id: number, index: number, dayFilterDate?: Date) => Promise<any>,
    customIndex: number,
    dayFilterDate?: Date
  ) => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      await taskFunc(id, customIndex, dayFilterDate);
      setLoading({ ...loading, increaseIndex: false });
      updateList();
    }
  };
  const onDecreaseIndex = async (
    taskFunc: (id: number, index: number, dayFilterDate?: Date) => Promise<any>,
    customIndex: number,
    dayFilterDate?: Date
  ) => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      await taskFunc(id, customIndex, dayFilterDate);
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

export default useTaskOperations;
