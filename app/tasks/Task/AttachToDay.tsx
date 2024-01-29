"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { useState } from "react";
import { dayOptions } from "../Filters";

interface Props {
  taskTitle: string;
  currentDay: null | number;
}
const AttachToDay = ({ taskTitle, currentDay }: Props) => {
  const { openModal, modalId } = useModal();
  const [selected, setSelected] = useState(currentDay || -1);
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
            <button className="btn btn-sm mt-2 btn-primary w-full">
              {currentDay === null ? "ثبت" : "ثبت تغییرات"}
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AttachToDay;
