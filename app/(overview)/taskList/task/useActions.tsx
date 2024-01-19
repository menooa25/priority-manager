import { useState } from "react";
import {
  changeTaskTitle,
  createTask,
  decreaseTaskIndex,
  deleteTask,
  doneTask,
  increaseTaskIndex,
  resumeTask,
} from "../actions";
import { useSession } from "next-auth/react";
interface Props {
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  updateTaskList: () => void;
  status: { itsNew: boolean; itsEdited: boolean };
}

const useActions = ({
  done,
  id,
  index,
  status,
  text,
  updateTaskList,
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

      await createTask(text);
      setLoading({ ...loading, save: false });

      updateTaskList();
      callBack && callBack();
    } else if (id && !done) {
      setLoading({ ...loading, save: true });

      await changeTaskTitle(id, text);
      setLoading({ ...loading, save: false });
      updateTaskList();
    }
  };
  const onResumeTask = async () => {
    if (done && id) {
      setLoading({ ...loading, resume: true });

      await resumeTask(id);
      setLoading({ ...loading, resume: true });

      updateTaskList();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      setLoading({ ...loading, done: true });

      await doneTask(id);
      setLoading({ ...loading, done: false });
      updateTaskList();
    }
  };
  const onDelete = async () => {
    if (id) {
      await deleteTask(id);
      updateTaskList();
    }
  };
  const onIncreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      await increaseTaskIndex(id, index);
      setLoading({ ...loading, increaseIndex: false });

      updateTaskList();
    }
  };
  const onDecreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      await decreaseTaskIndex(id, index);
      setLoading({ ...loading, decreaseIndex: false });

      updateTaskList();
    }
  };
  return {
    loading,
    onSave,
    onResumeTask,
    onDone,
    onDelete,
    onIncreaseIndex,
    onDecreaseIndex,
  };
};

export default useActions;
