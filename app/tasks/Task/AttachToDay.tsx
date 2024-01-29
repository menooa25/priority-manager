"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { useState } from "react";
import { dayOptions } from "../Filters";
import { attachTaskToDay } from "../actions";
import { getNearestDayOfWeek } from "@/app/utils";

interface Props {
  taskTitle: string;
  currentDay: null | number;
  taskId: number;
}
const AttachToDay = ({ taskTitle, currentDay, taskId }: Props) => {
  const { openModal, modalId, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(currentDay || -1);
  const submitText = currentDay === null ? "ثبت" : "ثبت تغییرات";
  const onSubmit = async () => {
    setLoading(true);
    let cleanedDayNum = selected;
    if (selected === -1) cleanedDayNum = new Date().getDay();
    console.log(getNearestDayOfWeek(cleanedDayNum));
    await attachTaskToDay(taskId, cleanedDayNum);
    setLoading(false);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal} className="tag-button">
        برنامه ریزی
      </button>
      <Modal id={modalId}>
        <div>
          <p className="flex flex-col items-center" dir="rtl">
            مایلید <span className="font-bold">{taskTitle}</span> را در چه روزی
            انجام دهید ؟
          </p>
          <select
            onChange={({ target: { value } }) => setSelected(+value)}
            value={selected}
            className="select select-bordered select-sm w-full mt-2 focus-visible:outline-none"
          >
            <option className="text-right " value={"-1"}>
              امروز
            </option>
            {dayOptions.map(({ searchParam, title }) => (
              <option
                className="text-right "
                key={searchParam}
                value={searchParam}
              >
                {title}
              </option>
            ))}
          </select>
          {currentDay !== +selected && (
            <button
              disabled={loading}
              onClick={onSubmit}
              className={`btn btn-sm mt-2 btn-primary w-full ${
                loading && "!cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="loading loading-xs loading-spinner" />
              ) : (
                submitText
              )}
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AttachToDay;
