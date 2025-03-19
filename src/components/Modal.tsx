import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    ariaLabelledby: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, ariaLabelledby }) => {
    if (!isOpen) return null;

    return (
        <div className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledby}
            aria-label="Mortgage Calculator Dialog">
            {children}
        </div>
    );
};

export default Modal;