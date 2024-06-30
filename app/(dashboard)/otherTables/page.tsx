"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useState } from "react";
import AddNewTable from "./components/AddNewTable";

const OtherTables = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center ml-36">
      <div className="w-[500px]  pb-7 relative flex items-center justify-center">
        <Image
          src={"/images/table.jpg"}
          alt="Table "
          width={400}
          height={500}
          className="w-full h-96"
        />
        <button
          className="text-green-500 bg-white px-4 py-3 text-lg absolute"
          onClick={openModal}
        >
          ثبت میز متفرقه
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`ثبت میز متفرقه`}
        size="large"
      >
        <AddNewTable closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default OtherTables;
