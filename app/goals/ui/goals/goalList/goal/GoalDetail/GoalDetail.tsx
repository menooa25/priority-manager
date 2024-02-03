"use client";

import Modal from "@/app/ui/Modal";
import useModal from "@/app/lib/hooks/useModal";
import { Detail } from "@prisma/client";
import { useContext, useState } from "react";
import DetailForm from "./DetailForm/DetailForm";
import Eskeleton from "./DetailForm/Eskeleton";
import AllowedOptionsProvider from "./AllowedOptionsProvider";
import classNames from "classnames";
import { getDetail } from "@/app/goals/lib/actions";
import { SingleGoalContext } from "../../SingleGoalContextProvider";

const GoalDetail = () => {
  const {id,done,title} = useContext(SingleGoalContext)!
  const { modalId, openModal, closeModal, isOpen } = useModal();
  const [lastDetail, setLastDetail] = useState<Detail | null>(null);
  const [onFetching, setOnFetching] = useState(false);
  const openModalBtnClass = classNames({
    "!bg-base-300 !border-base-300": done,
  });
  const fetchDetail = async () => {
    setOnFetching(true);
    const savedDetails = await getDetail(id);
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
                <span className="block text-center">{title}</span>
                <DetailForm
                  closeModal={closeModal}
                  init={lastDetail}
                  goalId={id}
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
