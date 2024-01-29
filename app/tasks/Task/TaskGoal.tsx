"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import classNames from "classnames";
import { direction } from "direction";

interface Props {
  goalTitle: string;
  taskIsDone: boolean;
}
const TaskGoal = ({ goalTitle, taskIsDone }: Props) => {
  const { modalId, openModal } = useModal();
  const btnClass = classNames({
    "!bg-base-300 !border-base-300": taskIsDone,
  });
  return (
    <div>
      <button onClick={() => openModal()} className={`tag-button ` + btnClass}>
        هدف
      </button>
      <Modal id={modalId}>
        <p dir={direction(goalTitle)}>{goalTitle}</p>
      </Modal>
    </div>
  );
};

export default TaskGoal;
