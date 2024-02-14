"use client";

import useModal from "@/app/lib/hooks/useModal";
import { getNearestDayOfWeek } from "@/app/lib/utils";
import Modal from "@/app/ui/Modal";
import { useContext, useState } from "react";
import useTodayInDayOptions from "../../hook/task/useTodayInDayOptions";
import { attachTaskToDay } from "../../lib/actions";
import { TaskContext } from "../TaskContextProvider";

interface Props {
  taskTitle: string;
  selectedDay: null | number;
  taskId: number;
}
const AttachToDay = ({ taskTitle, selectedDay, taskId }: Props) => {
  const { updateTaskList } = useContext(TaskContext);
  const { openModal, modalId, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(
    selectedDay?.toString() || new Date().getDay().toString()
  );
  const todayInDayOtions = useTodayInDayOptions();

  const submitText = selectedDay === null ? "ثبت" : "ثبت تغییرات";
  const onSubmit = async () => {
    setLoading(true);

    await attachTaskToDay(
      taskId,
      getNearestDayOfWeek(+selected).toLocaleDateString(),
      +selected
    );
    setLoading(false);
    closeModal();
    updateTaskList();
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
            onChange={({ target: { value } }) => setSelected(value)}
            value={selected}
            className="select select-bordered select-sm w-full mt-2 focus-visible:outline-none"
          >
            {todayInDayOtions.map(({ searchParam, title }) => (
              <option
                className="text-right "
                key={searchParam}
                value={searchParam}
              >
                {title}
              </option>
            ))}
          </select>
          {selectedDay !== +selected && (
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
