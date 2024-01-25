"use client";

import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface ButtonsProps {
  display: boolean;
  onClick: () => void;
  loading?: boolean;
}

export const ResumeGoalBtn = ({ display, onClick, loading }: ButtonsProps) => {
  if (!display) return <></>;
  return (
    <button onClick={onClick} className="btn btn-neutral flex-1  w-full btn-sm">
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        "ادامه دادن هدف"
      )}
    </button>
  );
};

export const SaveBtn = ({ onClick, display = true, loading }: ButtonsProps) => {
  if (!display) return null;
  return (
    <button onClick={onClick} className="btn flex-1 btn-neutral  w-full btn-sm">
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        "ذخیره"
      )}
    </button>
  );
};
export const DoneGoal = ({ display, onClick, loading }: ButtonsProps) => {
  if (!display) return null;

  return (
    <button onClick={onClick} className="btn flex-1 btn-primary w-full btn-sm">
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        "انجام دادم"
      )}
    </button>
  );
};
export const DeleteGoal = ({
  display,
  onClick,
  title,
}: ButtonsProps & { title: string }) => {
  const { modalId, closeModal, openModal } = useModal();
  if (!display) return null;

  return (
    <>
      <button
        onClick={() => openModal()}
        className="btn flex-1  btn-accent w-full btn-sm"
      >
        حذف
      </button>
      <Modal id={modalId}>
        <div className="text-right">
          <div dir="rtl" className="flex flex-col justify-center items-center">
            <span>آیا مایل به حذف</span>
            <span className="font-bold">&nbsp;{title}&nbsp;</span>
            <span>هستید؟</span>
          </div>
          <div className="flex gap-x-1 mt-2">
            <button
              onClick={() => {
                onClick();
                closeModal();
              }}
              className="flex-1 btn btn-primary btn-sm"
            >
              بله
            </button>
            <button
              onClick={() => closeModal()}
              className="flex-1 btn btn-accent btn-sm"
            >
              خیر
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const IncreaseIndexBtn = ({
  display,
  onClick,
  loading,
}: ButtonsProps) => {
  if (!display) return null;
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="btn  p-2 flex-1 rounded-2xl rounded-l-none rounded-b-none"
    >
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        <IoIosArrowUp />
      )}
    </button>
  );
};
export const DecreaseIndexBtn = ({
  display,
  onClick,
  loading,
}: ButtonsProps) => {
  if (!display) return null;
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="btn p-2 flex-1 rounded-2xl  rounded-l-none rounded-t-none"
    >
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        <IoIosArrowDown />
      )}
    </button>
  );
};
