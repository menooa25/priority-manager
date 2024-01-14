import { useEffect, useState } from "react";
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
  status: { itsNew: boolean; itsEdited: boolean };
}

const useActions = ({ done, id, index, status, text }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    increaseIndex: false,
    decreaseIndex: false,
  });

  const onSave = async (callBack?: () => void) => {
    if (status.itsNew) {
      await createTask(text);
      router.refresh();
      callBack && callBack();
    } else if (id && !done) {
      await changeTaskTitle(id, text);
      router.refresh();
    }
  };
  const onResumeTask = async () => {
    if (done && id) {
      await resumeTask(id);
      router.refresh();
    }
  };
  const onDone = async () => {
    if (id && !done) {
      await doneTask(id);
      router.refresh();
    }
  };
  const onDelete = async () => {
    if (id) {
      await deleteTask(id);
      router.refresh();
    }
  };
  const onIncreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, increaseIndex: true });
      await increaseTaskIndex(id, index);
      setLoading({ ...loading, increaseIndex: false });

      router.refresh();
    }
  };
  const onDecreaseIndex = async () => {
    if (id && !done && index !== undefined) {
      setLoading({ ...loading, decreaseIndex: true });
      await decreaseTaskIndex(id, index);
      setLoading({ ...loading, decreaseIndex: false });

      router.refresh();
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
