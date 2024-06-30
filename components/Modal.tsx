import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: any;
  size: string;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size,
  children,
  title,
}) => {
  const modalSizeClasses: any = {
    small: "w-64",
    medium: "w-[34rem]",
    large: "w-1/2",
    full: "w-full",
  };

  // Calculate the modal size class based on the "size" prop
  const modalSizeClass = modalSizeClasses[size] || "w-[34rem]";

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 ">
      <div className={`bg-white rounded-lg shadow-lg p-6 ${modalSizeClass}`}>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold mb-4">{title}</div>
          <X className="w-4 h-4 cursor-pointer" onClick={onClose} />
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
