"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewPassword = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { token } = params;

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/resetPassword`, {
        password,
        confirmPassword,
        token,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col w-[100%] h-[90vh]">
      <p className="text-3xl font-bold mt-12 pt-5">رمز جدید </p>
      <form
        onSubmit={submitHandler}
        className="px-9 pt-6 mt-7 pb-5 shadow-xl bg-white rounded-md w-[430px]"
      >
        <label htmlFor="email">رمز </label>
        <input
          type="password"
          // id='email'
          className="px-3 py-2 rounded-md mb-5 mt-1 w-[100%] border-[1px] border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز را اینجا وارد کنید"
          required
        />
        <label htmlFor="email">تاییدی رمز</label>
        <input
          type="password"
          // id='email'
          className="px-3 py-2 rounded-md mb-5 mt-1 w-[100%] border-[1px] border-gray-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="رمز تاییدی را اینجا وارد کنید"
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

export default NewPassword;
