import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-28 h-28 border-t-4 border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
