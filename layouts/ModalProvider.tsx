"use client";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type Value = {
  isModalOpen: boolean;
  modalBody: React.ReactNode;
  openModal: ({ content }: { content: React.ReactNode }) => void;
  closeModal: () => void;
};

const ModalContext = createContext<Value | undefined>(undefined);
const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState<React.ReactNode>(null);

  const openModal = ({ content }: { content: React.ReactNode }) => {
    setIsModalOpen(true);
    setModalBody(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalBody(null);
  };

  const value = {
    isModalOpen,
    modalBody,
    openModal,
    closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw Error("use modal context within the provider");
  }

  return {
    ...context,
  };
};

export { useModal };

export default ModalProvider;
