"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import DetailInput from "../DetailInput";
import { updateGoalDetail } from "../../../actions";
import { Detail } from "@prisma/client";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await updateGoalDetail({ ...data, goalId });
    setLoading(false);
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

      <button
        type="submit"
        disabled={loading}
        className="btn btn-sm btn-primary mt-3 "
      >
        {loading ? (
          <span className="loading loading-xs loading-spinner" />
        ) : (
          "ثبت تغییرات"
        )}
      </button>
    </form>
  );
};

export default DetailForm;
