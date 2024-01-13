"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useEffect, useRef, useState } from "react";
import { addTask, deleteTask, doneTask, resumeTask } from "../actions";
import { useRouter } from "next/navigation";
import { DeleteTask, DoneTask, ResumeTaskBtn, SaveBtn } from "./ActionButtons";

interface Props {
  id?: number;
  title: string;
  done: boolean;
  onSaved?: () => void;
}

const Task = ({ title, onSaved, done, id }: Props) => {
  const textareaRef: any = useRef();
  const [text, setText] = useState(title);
  const router = useRouter();
  const { onScroll } = useNoScroll(textareaRef);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const onSave = async () => {
    if (status.itsNew) {
      await addTask(text);
      router.refresh();
      onSaved && onSaved();
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
  useEffect(() => {
    setStatus({
      itsNew: title === "",
      itsEdited: text !== title,
    });
  }, [title, text]);
  return (
    <div>
      <textarea
        disabled={done}
        onScroll={(e) => onScroll(e)}
        onChange={({ target: { value } }) => setText(value)}
        ref={textareaRef}
        dir={direction(text)}
        className="textarea rounded-2xl overflow-hidden w-full textarea-bordered"
        defaultValue={title}
      />
      <div className="flex w-full gap-x-1">
        <DeleteTask title={title} onClick={onDelete} display={done} />

        <ResumeTaskBtn display={done} onClick={onResumeTask} />
      </div>
      <div
        className={`flex w-full gap-x-1 ${
          (status.itsEdited || status.itsNew) && "mb-1"
        }`}
      >
        <DoneTask onClick={onDone} display={!done && !status.itsNew} />
        <DeleteTask
          title={title}
          onClick={onDelete}
          display={!done && !status.itsNew}
        />
      </div>
      <SaveBtn display={status.itsEdited || status.itsNew} onClick={onSave} />
    </div>
  );
};

export default Task;
