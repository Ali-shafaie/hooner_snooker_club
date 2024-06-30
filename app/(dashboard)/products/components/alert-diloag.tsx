import React, { useState } from "react";

function AlertDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };
  const handleDelete = () => {
    closeDialog();
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Item
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          {/* ... (the rest of the dialog code remains the same) */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleDelete} // Call handleDelete on delete button click
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Delete
            </button>
            <button
              onClick={closeDialog}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlertDialog;
