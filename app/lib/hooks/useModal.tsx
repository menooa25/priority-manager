"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const useModal = () => {
  const [modalId, setModalId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    const target: any = document?.getElementById(modalId);
    target.showModal();
    setIsOpen(true);
  };
  const closeModal = () => {
    const target: any = document?.getElementById(modalId);
    target.close();
    setIsOpen(false);
  };
  useEffect(() => {
    setModalId(uuidv4());
  }, []);
  return { modalId, openModal, closeModal, isOpen };
};

export default useModal;
