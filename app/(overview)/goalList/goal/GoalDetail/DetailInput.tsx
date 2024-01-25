"use client";
import useNoScroll from "@/app/hooks/useNoScroll";
import { direction } from "direction";
import { useRef } from "react";

interface Props {
  placeholder: string;
  register: any;
  label: string;
  display: boolean;
}
const DetailInput = ({ placeholder, register, label, display }: Props) => {
  const ref: any = useRef();
  const { onScroll } = useNoScroll(ref);
  if (!display) return null;
  return (
    <label className="form-control">
      <span className="label-text-alt text-right border-r-2 pr-1 border-r-primary mb-1">
        {label}
      </span>
      <textarea
        {...register}
        onScroll={onScroll}
        dir={direction("آ")}
        className="textarea textarea-bordered rounded-md w-full mr-auto "
        placeholder={placeholder}
      />
    </label>
  );
};

export default DetailInput;
