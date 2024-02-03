"use client";
import { Detail } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGear } from "react-icons/fa6";
import DetailInput from "../DetailInput";
import Options from "./Options";
import { AllowedOptionsContext } from "../AllowedOptionsProvider";
import { updateGoalDetail } from "@/app/goals/lib/actions";
type Inputs = {
  why: string | null;
  how: string | null;
  when: string | null;
};
type InputKeys = keyof Inputs;

interface Props {
  goalId: number;
  init: Detail | null;
  closeModal: () => void;
}
const DetailForm = ({ goalId, init, closeModal }: Props) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const { allow, allowedOptions } = useContext(AllowedOptionsContext);

  const makeNullIfNotAllowed = (data: Inputs) => {
    const cleanedData = { ...data };
    for (let key in allowedOptions) {
      const allowStatus = allowedOptions[key as InputKeys];
      if (!allowStatus) {
        cleanedData[key as InputKeys] = null;
      }
    }
    return cleanedData;
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const cleanedData = makeNullIfNotAllowed(data);
    await updateGoalDetail({ ...cleanedData, goalId });
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
      for (let key in placeHolder) {
        const lastValue = placeHolder[key as InputKeys];
        setValue(key as InputKeys, lastValue as string);
        if (lastValue === null) {
          allow(key as InputKeys, false);
        }
      }
    }
  }, [init]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <Options />
      <DetailInput
        display={allowedOptions.why}
        label="به چه دلیلی این هدف را انتخاب کردید ؟"
        register={{ ...register("why") }}
        placeholder="چرا ؟"
      />
      <DetailInput
        display={allowedOptions.when}
        label="در چه زمانی یا در چه بازه زمانی می‌خواهید به هدفتان برسید ؟"
        register={{ ...register("when") }}
        placeholder="چه زمانی ؟"
      />
      <DetailInput
        display={allowedOptions.how}
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
