"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import DetailInput from "../DetailInput";
import { updateGoalDetail } from "../../../actions";
import { Detail } from "@prisma/client";
import { useEffect } from "react";
type Inputs = {
  why: string;
  how: string;
  when: string;
};
interface Props {
  goalId: number;
  init: Detail | null;
}
const DetailForm = ({ goalId, init }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updateGoalDetail({ ...data, goalId });
  };

  useEffect(() => {
    if (init?.goalId) {
      const placeHolder = {
        why: init.why,
        how: init.how,
        when: init.when,
      };
      type PlaceHolderKey = keyof typeof placeHolder;
      for (let key in placeHolder) {
        setValue(
          key as PlaceHolderKey,
          placeHolder[key as PlaceHolderKey] as string
        );
      }
    }
  }, [init]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <DetailInput
        label="به چه دلیلی این هدف را انتخاب کردید ؟"
        register={{ ...register("why") }}
        placeholder="چرا ؟"
      />
      <DetailInput
        label="در چه زمانی یا در چه بازه زمانی می‌خواهید به هدفتان برسید ؟"
        register={{ ...register("when") }}
        placeholder="چه زمانی ؟"
      />
      <DetailInput
        label="چطور می‌خواهید به هدفتان برسید ؟"
        register={{ ...register("how") }}
        placeholder="چطور ؟"
      />

      <button type="submit" className="btn btn-sm btn-primary mt-3">
        ثبت تغییرات
      </button>
    </form>
  );
};

export default DetailForm;
