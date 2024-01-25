"use client";
import { Detail } from "@prisma/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGear } from "react-icons/fa6";
import { updateGoalDetail } from "../../../actions";
import DetailInput from "../DetailInput";
import Options from "./Options";
type Inputs = {
  why: string;
  how: string;
  when: string;
};
interface Props {
  goalId: number;
  init: Detail | null;
  closeModal: () => void;
}
const DetailForm = ({ goalId, init, closeModal }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
 
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    await updateGoalDetail({ ...data, goalId });
    setLoading(false);
    closeModal();
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
      <Options/>
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
