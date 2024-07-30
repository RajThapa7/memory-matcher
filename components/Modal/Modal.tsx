"use client";
import { useModal } from "@/layouts/ModalProvider";
import ReactModal from "react-modal";

const Modal = () => {
  const { isModalOpen, closeModal, modalBody } = useModal();
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60"
      closeTimeoutMS={200}
    >
      {modalBody}
    </ReactModal>
  );
};

export default Modal;
