"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/forgotPassword`, {
        email,
      });
      setLoading(false);
      console.log("asdf", data);

      toast.success(data);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col w-[100%] h-[90vh]">
      <p className="text-3xl font-bold mt-12 pt-5">Forgot Password</p>
      <form
        onSubmit={submitHandler}
        className="px-9 pt-6 mt-7 pb-5 shadow-xl bg-white rounded-md w-[430px]"
      >
        <label htmlFor="email">ایمیل خود را اینجا وارد کنید</label>
        <input
          type="email"
          // id='email'
          className="px-3 py-2 rounded-md mb-5 mt-1 w-[100%] border-[1px] border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />

        <button
          type="submit"
          className="w-[100%] bg-[#11a623] px-4 py-3 text-white rounded-md mt-5"
        >
          {loading ? "loading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
