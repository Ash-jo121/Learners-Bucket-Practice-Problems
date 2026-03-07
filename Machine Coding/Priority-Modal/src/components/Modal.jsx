import { useModalContext } from "../contexts/ModalContext";
import "../styles/modal.css";

export function Modal({ onClose }) {
  const { addModal } = useModalContext();

  const handleClose = () => {
    onClose();
  };

  const handleCreateModal = () => {
    addModal();
  };

  return (
    <div className="modal-background">
      <div className="modal" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h3>Modal</h3>
          <button aria-label="close" onClick={handleClose}>
            X
          </button>
        </div>
        <div>
          <button onClick={handleCreateModal}>Open Modal</button>
        </div>

        <button>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
