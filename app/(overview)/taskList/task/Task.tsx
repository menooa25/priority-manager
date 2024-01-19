"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useContext, useEffect, useRef, useState } from "react";
import {
  DecreaseIndexBtn,
  DeleteTask,
  DoneTask,
  IncreaseIndexBtn,
  ResumeTaskBtn,
  SaveBtn,
} from "./ActionButtons";
import useActions from "./useActions";
import { useSession } from "next-auth/react";
import { TaskContext } from "../TaskContextProvider";

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
  const { onScroll } = useNoScroll(textareaRef);
  const [status, setStatus] = useState({ itsNew: false, itsEdited: false });
  const { updateTaskList } = useContext(TaskContext);
  const {
    loading,
    onSave,
    onResumeTask,
    onDone,
    onDelete,
    onDecreaseIndex,
    onIncreaseIndex,
  } = useActions({
    updateTaskList,
    done,
    id,
    index,
    status,
    text,
  });

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
        <ResumeTaskBtn
          loading={loading.resume}
          display={done}
          onClick={onResumeTask}
        />
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
        <DoneTask
          loading={loading.done}
          onClick={onDone}
          display={!done && !status.itsNew}
        />
      </div>
      <SaveBtn
        loading={loading.save}
        display={status.itsEdited || status.itsNew}
        onClick={() => onSave(onSaved)}
      />
    </div>
  );
};

export default Task;
