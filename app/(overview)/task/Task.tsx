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
      <button className="btn btn-primary w-full btn-sm">ذخیره</button>
    </div>
  );
};

export default Task;
