"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";

const GoalDetail = () => {
  const { modalId, openModal } = useModal();
  return (
    <>
      <button
        onClick={() => openModal()}
        className="bg-base-200 rounded-b-lg rounded-t-none  px-7 "
      >
        جزئیات
      </button>
      <Modal id={modalId}>ss</Modal>
    </>
  );
};

export default GoalDetail;
