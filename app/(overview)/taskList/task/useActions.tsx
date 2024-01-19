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
import { useRouter } from "next/navigation";

interface Props {
  id?: number;
  done: boolean;
  index?: number;
  text: string;
  updateTaskList: () => void;
  userEmail?: string | null;
  status: { itsNew: boolean; itsEdited: boolean };
}

const useActions = ({
  done,
  id,
  index,
  status,
  text,
  userEmail,
  updateTaskList,
}: Props) => {
  const [loading, setLoading] = useState({
    increaseIndex: false,
    decreaseIndex: false,
    done: false,
    resume: false,
  });

  const onSave = async (callBack?: () => void) => {
    if (status.itsNew && userEmail) {
      await createTask(text, userEmail);
      updateTaskList();
      callBack && callBack();
    } else if (id && !done) {
      await changeTaskTitle(id, text);
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
