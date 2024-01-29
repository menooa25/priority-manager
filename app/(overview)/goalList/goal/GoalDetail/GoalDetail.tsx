"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { Detail } from "@prisma/client";
import { useState } from "react";
import { getDetail } from "../../actions";
import DetailForm from "./DetailForm/DetailForm";
import Eskeleton from "./DetailForm/Eskeleton";
import AllowedOptionsProvider from "./AllowedOptionsProvider";

interface Props {
  goalId: number;
  goalIsDone: boolean;
}
const GoalDetail = ({ goalId, goalIsDone }: Props) => {
  const { modalId, openModal, closeModal, isOpen } = useModal();
  const [lastDetail, setLastDetail] = useState<Detail | null>(null);
  const [onFetching, setOnFetching] = useState(false);

  const fetchDetail = async () => {
    setOnFetching(true);
    const savedDetails = await getDetail(goalId);
    setLastDetail(savedDetails);
    setOnFetching(false);
  };
  return (
    <>
      <button
        onClick={() => {
          openModal();
          fetchDetail();
        }}
        className={`tag-button ${goalIsDone && "bg-base-300"}`}
      >
        جزئیات
      </button>
      <Modal id={modalId}>
        {onFetching ? (
          <Eskeleton />
        ) : (
          <>
            {isOpen && (
              <AllowedOptionsProvider>
                <DetailForm
                  closeModal={closeModal}
                  init={lastDetail}
                  goalId={goalId}
                />
              </AllowedOptionsProvider>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default GoalDetail;
