"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  changeTaskTitle,
  createTask,
  decreaseTaskIndex,
  deleteTask,
  doneTask,
  increaseTaskIndex,
  resumeTask,
} from "../actions";
import {
  DecreaseIndexBtn,
  DeleteTask,
  DoneTask,
  IncreaseIndexBtn,
  ResumeTaskBtn,
  SaveBtn
} from "./ActionButtons";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  index?: number;
  onSaved?: () => void;
}

const Task = ({ title, onSaved, done, id, index }: Props) => {
  const textareaRef: any = useRef();
  const [text, setText] = useState(title);
  const router = useRouter();
  const { onScroll } = useNoScroll(textareaRef);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const [loading, setLoading] = useState({
    increaseIndex: false,
    decreaseIndex: false,
  });
  const onSave = async () => {
    if (status.itsNew) {
      await createTask(text);
      router.refresh();
      onSaved && onSaved();
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
  useEffect(() => {
    setStatus({
      itsNew: title === "",
      itsEdited: text !== title,
    });
  }, [title, text]);
  return (
    <div>
      <div className="flex items-stretch mb-1">
        <textarea
          disabled={done}
          onScroll={(e) => onScroll(e)}
          onChange={({ target: { value } }) => setText(value)}
          ref={textareaRef}
          dir={direction(text)}
          className={`textarea rounded-2xl ${
            !done && "rounded-r-none"
          }  overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered`}
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
      <div className="flex w-full gap-x-1">
        <DeleteTask title={title} onClick={onDelete} display={done} />
        <ResumeTaskBtn display={done} onClick={onResumeTask} />
      </div>
      <div
        className={`flex w-full gap-x-1 ${
          (status.itsEdited || status.itsNew) && "mb-1"
        }`}
      >
        <DeleteTask
          title={title}
          onClick={onDelete}
          display={!done && !status.itsNew}
        />
        <DoneTask onClick={onDone} display={!done && !status.itsNew} />
      </div>
      <SaveBtn display={status.itsEdited || status.itsNew} onClick={onSave} />
    </div>
  );
};

export default Task;
