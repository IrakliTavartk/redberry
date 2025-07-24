import { EmployeeModalProps } from "@/types/propTypes";
import Modal from "react-modal";
import CustomForm from "../CustomForm/CustomForm";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "12px",
    padding: "0",
    width: "500px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflow: "visible",
  },
};

const EmployeeModal = ({ isOpen, onClose, onSubmit }: EmployeeModalProps) => {
  const handleClose = (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>,
  ): void => {
    event.stopPropagation?.();
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="თანამშრომლის შექმნა"
    >
      <div className="p-20">
        <h2 className="text-c-grey text-center text-[32px] font-medium">
          თანამშრომლის დამატება
        </h2>
        <CustomForm />
      </div>
    </Modal>
  );
};

export default EmployeeModal;
