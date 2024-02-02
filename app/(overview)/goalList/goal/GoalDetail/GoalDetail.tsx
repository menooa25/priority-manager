"use client";

import Modal from "@/app/ui/Modal";
import useModal from "@/app/lib/hooks/useModal";
import { Detail } from "@prisma/client";
import { useState } from "react";
import { getDetail } from "../../actions";
import DetailForm from "./DetailForm/DetailForm";
import Eskeleton from "./DetailForm/Eskeleton";
import AllowedOptionsProvider from "./AllowedOptionsProvider";
import classNames from "classnames";

interface Props {
  goalId: number;
  goalIsDone: boolean;
  goalTitle: string;
}
const GoalDetail = ({ goalId, goalIsDone, goalTitle }: Props) => {
  const { modalId, openModal, closeModal, isOpen } = useModal();
  const [lastDetail, setLastDetail] = useState<Detail | null>(null);
  const [onFetching, setOnFetching] = useState(false);
  const openModalBtnClass = classNames({
    "!bg-base-300 !border-base-300": goalIsDone,
  });
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
        className={`tag-button ` + openModalBtnClass}
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
                <span className="block text-center">{goalTitle}</span>
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
