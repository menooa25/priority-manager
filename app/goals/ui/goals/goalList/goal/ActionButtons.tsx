"use client";

import Modal from "@/app/ui/Modal";
import useModal from "@/app/lib/hooks/useModal";

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

export const DoneGoal = ({ display, onClick, loading }: ButtonsProps) => {
  if (!display) return null;

  return (
    <button onClick={onClick} className="btn flex-1 btn-primary w-full btn-sm">
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        "به هدفم رسیدم"
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