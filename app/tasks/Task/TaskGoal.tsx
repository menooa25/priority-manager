"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { direction } from "direction";

interface Props {
  goalTitle: string;
}
const TaskGoal = ({ goalTitle }: Props) => {
  const { modalId, openModal } = useModal();
  return (
    <div>
      <button
        onClick={() => openModal()}
        className="btn btn-sm rounded-lg rounded-t-none font-normal"
      >
        هدف
      </button>
      <Modal id={modalId}>
        <p dir={direction(goalTitle)}>{goalTitle}</p>
      </Modal>
    </div>
  );
};

export default TaskGoal;
