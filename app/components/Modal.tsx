"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: string;
}
const Modal = ({ id, children }: Props) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
