"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const useModal = () => {
  const [modalId, setModalId] = useState("");
  const openModal = () => {
    const target: any = document?.getElementById(modalId);
    target.showModal();
  };
  const closeModal = () => {
    const target: any = document?.getElementById(modalId);
    target.close();
  };
  useEffect(() => {
    setModalId(uuidv4());
  }, []);
  return { modalId, openModal, closeModal };
};

export default useModal;
