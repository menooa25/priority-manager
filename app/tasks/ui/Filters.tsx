"use client";
import useModal from "@/app/lib/hooks/useModal";
import Modal from "@/app/ui/Modal";
import FilterAsGoal from "./FilterAsGoal";
import FilterAsDay from "./FilterAsDay";

const Filters = () => {
  const { openModal, modalId } = useModal();
  return (
    <>
      <button onClick={openModal} className="btn btn-outline btn-sm w-full">
        فیلتر ها
      </button>
      <Modal id={modalId}>
        <div className="flex flex-col gap-y-2">
          <FilterAsDay />
          <FilterAsGoal />
        </div>
      </Modal>
    </>
  );
};

export default Filters;
