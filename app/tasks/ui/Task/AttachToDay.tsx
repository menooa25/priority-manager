"use client";

import Modal from "@/app/ui/Modal";
import useModal from "@/app/lib/hooks/useModal";
import { getNearestDayOfWeek } from "@/app/lib/utils";
import { useContext, useEffect, useState } from "react";
import { dayOptions } from "../FilterAsDay";
import { TaskContext } from "../TaskContextProvider";
import { attachTaskToDay } from "../../lib/actions";

interface Props {
  taskTitle: string;
  selectedDay: null | number;
  taskId: number;
}
const AttachToDay = ({ taskTitle, selectedDay, taskId }: Props) => {
  const { updateTaskList } = useContext(TaskContext);
  const { openModal, modalId, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [cleanedDayNum, setCleanedDayNum] = useState(-1);
  const submitText = selectedDay === null ? "ثبت" : "ثبت تغییرات";
  const onSubmit = async () => {
    setLoading(true);

    await attachTaskToDay(
      taskId,
      getNearestDayOfWeek(cleanedDayNum).toLocaleDateString(),
      cleanedDayNum
    );
    setLoading(false);
    closeModal();
    updateTaskList();
  };
  useEffect(() => {
    let cleanedDayNum = selected;
    if (selected === -1) cleanedDayNum = new Date().getDay();
    setCleanedDayNum(cleanedDayNum);
  }, [selected]);

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
          {selectedDay !== cleanedDayNum && (
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
