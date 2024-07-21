"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import NewTableForm from "./NewTableForm";
import { Plus } from "lucide-react";

const NewTableModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="border-[2px] border-gray-800 font-semibold py-2 px-4 flex items-center gap-2"
      >
        ثبت میز جدید
        <Plus />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="ثبت میز جدید"
        size="medium"
      >
        {/* Content inside the modal */}
        <NewTableForm
          onModalClose={closeModal}
    
        />
      </Modal>
    </div>
  );
};

export default NewTableModal;
