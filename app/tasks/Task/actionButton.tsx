import Modal from "@/app/components/Modal";
import useModal from "@/app/hooks/useModal";

interface ButtonsProps {
  display: boolean;
  onClick: () => void;
  loading?: boolean;
}

export const DoneTask = ({ display, onClick, loading }: ButtonsProps) => {
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
export const ResumeTaskBtn = ({ display, onClick, loading }: ButtonsProps) => {
  if (!display) return <></>;
  return (
    <button onClick={onClick} className="btn btn-neutral flex-1  w-full btn-sm">
      {loading ? (
        <span className="loading loading-xs loading-spinner" />
      ) : (
        "ادامه دادن فعالیت"
      )}
    </button>
  );
};

export const DeleteTask = ({
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