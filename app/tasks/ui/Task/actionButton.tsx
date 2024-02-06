import Modal from "@/app/ui/Modal";
import useModal from "@/app/lib/hooks/useModal";

interface ButtonsProps {
  display: boolean;
  onClick: () => void;
  loading?: boolean;
}

export const DoneTask = ({ display, onClick, loading }: ButtonsProps) => {
  if (!display) return null;

  return (
    <button onClick={onClick} className="tag-button !btn-primary">
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
    <button onClick={onClick} className="tag-button !btn-neutral">
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
      <button onClick={() => openModal()} className="tag-button !btn-accent ">
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
