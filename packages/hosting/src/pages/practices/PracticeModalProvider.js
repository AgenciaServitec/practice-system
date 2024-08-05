import React, { createContext, useContext, useState } from "react";
import { Modal } from "../../components";

const PracticeModalContext = createContext({
  onShowPracticeModal: () => console.log(),
  onClosePracticeModal: () => console.log(),
});

export const PracticeModalProvider = ({ children, drivers }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalProps, setModalProps] = useState();

  const onShowPracticeModal = (modalProps) => {
    setVisibleModal(true);
    setModalProps(modalProps);
  };

  const onClosePracticeModal = () => {
    setVisibleModal(false);
    setModalProps(undefined);
  };

  return (
    <PracticeModalContext.Provider
      value={{ onShowPracticeModal, onClosePracticeModal }}
    >
      {children}
      <Modal
        open={visibleModal}
        onCancel={onClosePracticeModal}
        title={modalProps?.title}
        closable
        width={modalProps?.width}
        centered={false}
        destroyOnClose
      >
        {modalProps?.onRenderBody && modalProps.onRenderBody(drivers)}
      </Modal>
    </PracticeModalContext.Provider>
  );
};

export const usePracticeModal = () => useContext(PracticeModalContext);
