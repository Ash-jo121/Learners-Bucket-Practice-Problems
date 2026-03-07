import { useModalContext } from "../contexts/ModalContext";
import { Modal } from "./Modal";
import { useEffect } from "react";

export function Dashboard() {
  const { modalStack, removeModal, addModal } = useModalContext();

  const handleOpenModal = () => {
    addModal();
  };

  useEffect(() => {
    let n = modalStack.length;
    if (n === 0) return;
    console.log(modalStack);
    let topPriority = modalStack[n - 1].priority;
    let removals = [];
    for (let i = n - 2; i >= 0; i--) {
      if (modalStack[i].priority < topPriority) {
        removals.push(modalStack[i].id);
      }
    }
    removeModal(removals);
  }, [modalStack.length]);

  return (
    <>
      {modalStack.map((item) => (
        <Modal onClose={() => removeModal([item.id])} />
      ))}
      <div>
        <button onClick={handleOpenModal}>Open Modal</button>
      </div>
    </>
  );
}
