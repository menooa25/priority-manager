"use client";

import useModal from "@/app/lib/hooks/useModal";
import Modal from "@/app/ui/Modal";
import { useContext, useState } from "react";
import { deleteTime, setTimeForTask } from "../../../lib/actions";
import { TaskContext } from "../../TaskContextProvider";
import ShowTime from "./ShowTime";
interface Props {
  id: number;
  taskTime: {
    from: string;
    to: string;
  } | null;
}
const Time = ({ taskTime, id }: Props) => {
  const { modalId, openModal, closeModal } = useModal();
  const [toTime, setToTime] = useState(taskTime?.to ?? "");
  const { updateTaskList } = useContext(TaskContext);
  const [fromTime, setFromTime] = useState(taskTime?.from ?? "");
  const updateTime = async (from: string, to: string) => {
    await setTimeForTask(id, from, to);
  };
  const requestDeleteTime = async () => {
    await deleteTime(id);
    closeModal();
    updateTaskList();
  };

  const onChange = (type: "from" | "to", value: string) => {
    if (type === "to") {
      setToTime(value);
      updateTime(fromTime, value);
    } else {
      setFromTime(value);
      updateTime(value, toTime);
    }
    updateTaskList();
  };
  return (
    <div className="flex justify-center">
      <button
        dir="rtl"
        onClick={openModal}
        className=" btn btn-xs btn-ghost text-center"
      >
        <ShowTime from={taskTime?.from ?? ""} to={taskTime?.to ?? ""} />
      </button>
      <Modal id={modalId}>
        <div>
          <div className="flex  flex-col sm:flex-row-reverse justify-center items-center sm:gap-x-1">
            <div className="flex ">
              <input
                className="input input-sm focus-visible:outline-none"
                type="time"
                onChange={({ target: { value } }) => onChange("from", value)}
                value={fromTime}
              />
              <span className="flex items-center">از ساعت</span>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex ">
              <input
                className="input input-sm focus-visible:outline-none"
                type="time"
                value={toTime}
                onChange={({ target: { value } }) => onChange("to", value)}
              />
              <span className="flex items-center">تا ساعت</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={requestDeleteTime}
              className="btn btn-accent btn-sm mt-2 w-full"
            >
              حذف زمان
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Time;
