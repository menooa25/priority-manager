"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { Detail } from "@prisma/client";
import { useState } from "react";
import { getDetail } from "../../actions";
import DetailForm from "./DetailForm/DetailForm";
import Eskeleton from "./DetailForm/Eskeleton";

interface Props {
  goalId: number;
}
const GoalDetail = ({ goalId }: Props) => {
  const { modalId, openModal } = useModal();
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
        className="bg-base-200 rounded-b-lg rounded-t-none  px-7 "
      >
        جزئیات
      </button>
      <Modal id={modalId}>
        {onFetching ? (
          <Eskeleton />
        ) : (
          <DetailForm init={lastDetail} goalId={goalId} />
        )}
      </Modal>
    </>
  );
};

export default GoalDetail;
