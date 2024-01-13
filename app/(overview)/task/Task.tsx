"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useRef, useState } from "react";

interface Props {
  title: string;
}

const Task = ({ title }: Props) => {
  const textareaRef: any = useRef();
  const [text, setText] = useState(title);
  const { onScroll } = useNoScroll(textareaRef);
  console.log({ text, title });
  return (
    <div>
      <textarea
        onScroll={(e) => onScroll(e)}
        onChange={({ target: { value } }) => setText(value)}
        ref={textareaRef}
        dir={direction(title)}
        className="textarea overflow-hidden w-full textarea-bordered"
        defaultValue={title}
      />
      {text === title && (
        <div className="flex w-full gap-x-1 ">
          <button className="btn flex-1 btn-accent  btn-sm">حذف</button>
          <button className="btn flex-1 btn-primary  btn-sm">انجام دادم</button>
        </div>
      )}
      {text !== title && (
        <button className="btn btn-neutral  w-full btn-sm">ذخیره</button>
      )}
    </div>
  );
};

export default Task;
