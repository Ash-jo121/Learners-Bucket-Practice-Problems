import { createContext, useContext, useState, useMemo } from "react";

const ModalContext = createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const addModal = () => {
    const newModal = {
      priority: Math.random() * 100,
      id: Date.now(),
    };
    setModalStack((prev) => [...prev, newModal]);
  };

  const removeModal = (listIds) => {
    setModalStack((prev) => prev.filter((item) => !listIds.includes(item.id)));
  };

  const value = useMemo(
    () => ({
      modalStack,
      addModal,
      removeModal,
    }),
    [modalStack],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider",
    );
  }
  return context;
};
