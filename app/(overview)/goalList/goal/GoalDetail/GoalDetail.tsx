"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import DetailInput from "./DetailInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { getDetail, updateGoalDetail } from "../../actions";
import { useEffect, useState } from "react";
import DetailForm from "./DetailForm/DetailForm";
import { Detail } from "@prisma/client";
import Eskeleton from "./DetailForm/Eskeleton";

type Inputs = {
  why: string;
  how: string;
  when: string;
};
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
