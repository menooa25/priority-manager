"use client";

import { useRef } from "react";

import useNoScroll from "../../lib/hooks/useNoScroll";
import classNames from "classnames";
import { DecreaseIndexBtn, IncreaseIndexBtn } from "./actionButtons";

interface Props {
  onChange: (value: any) => void;
  dir: string;
  className?: string;
  defaultValue: string;
  onClick: { increase: () => void; decrease: () => void };
  done: boolean;
  loading: { increase: boolean; decrease: boolean };
  itsNew?: boolean;
}
const TextareaIndexChng = ({
  className,
  defaultValue,
  dir,
  done,
  onChange,
  onClick,
  loading,
  itsNew,
}: Props) => {
  const textareaRef: any = useRef();
  const { onScroll } = useNoScroll(textareaRef);
  const textareaClass = classNames({
    "textarea rounded-2xl": true,
    "rounded-r-none": !done && !itsNew,
    "overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered rounded-bl-none rounded-br-none":
      true,
    [className ?? ""]: className,
  });
  return (
    <div className="flex items-stretch ">
      <textarea
        disabled={done}
        onScroll={(e) => onScroll(e)}
        onChange={({ target: { value } }) => onChange(value)}
        ref={textareaRef}
        dir={dir}
        className={textareaClass}
        defaultValue={defaultValue}
      />

      <div className="flex flex-col rounded-2xl rounded-l-none">
        <IncreaseIndexBtn
          display={!done && !itsNew}
          onClick={onClick.increase}
          loading={loading.increase}
        />
        <hr />
        <DecreaseIndexBtn
          display={!done && !itsNew}
          onClick={onClick.decrease}
          loading={loading.decrease}
        />
      </div>
    </div>
  );
};

export default TextareaIndexChng;
