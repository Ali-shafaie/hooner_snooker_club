"use client";

import React, { useEffect, useState } from "react";

import NewModalForm from "./components/NewModalExpense";
import { Button } from "@/components/ui/button";
import TabListExpense from "./components/TabExpance";
// import axios from "axios";
import axios from "@/app/utils/axiosConfig";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NewModalStaff from "./components/NewModalStaff";
interface Staff {
  id: number;
  name: string;
  job: string;
  phone: string;
  salary: number;
}
const ExpensePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalStaff, setIsOpenModalStaff] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState<any>({});

  // useEffect(() => {
  //   if (!session) {
  //     router.push("auth/signin");
  //   }
  // }, [router, session]);

  useEffect(() => {
    const email = session?.user?.email;
    const fetchUser = async () => {
      const { data } = await axios.post("/api/auth/getUserByEmail", {
        email,
      });
      setUser(data);
    };
    if (session?.user) {
      fetchUser();
    }
  }, [session?.user]);

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const [staffs, setStaff] = useState<Staff[]>([]);

  const fetchStaff = async () => {
    try {
      await axios.get<Staff[]>("/api/staff").then((res) => {
        setStaff(res.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchData = async () => {
    await axios
      .get("api/expense")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updateFetch = () => {
    fetchData();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalStaff = () => {
    setIsOpenModalStaff(true);
  };
  const handleCloseModalStaff = () => {
    setIsOpenModalStaff(false);
  };

  return (
    <div className="bg-white h-full overflow-y-auto">
      <div className="h-20 px-10 flex justify-between items-center ">
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-2">
            <h2 className="text-xl  md:text-2xl font-bold tracking-tight">
              خوش آمدید !
            </h2>
            <p className="text-muted-foreground text-[12px] md:text-[14px]">
              این یک لیست از مصارف های شما میباشد
            </p>
          </div>
        </div>
        {isModalOpen && (
          <NewModalForm
            staffs={staffs}
            onClose={handleCloseModal}
            updateFetch={updateFetch}
          />
        )}
        {isOpenModalStaff && (
          <NewModalStaff
            onClose={handleCloseModalStaff}
            updateFetch={updateFetch}
          />
        )}
        <div className="flex">
          <Button
            variant={"green"}
            className="mx-1 whitespace-nowrap text-[12px]"
            onClick={handleOpenModal}
          >
            ثبت مصارف
          </Button>{" "}
          <Button
            variant={"green"}
            onClick={handleOpenModalStaff}
            className="mx-1 whitespace-nowrap text-[12px]"
          >
            ثبت کارمند
          </Button>
        </div>
      </div>
      <TabListExpense
        onClick={handleOpenModal}
        isModalOpen={isModalOpen}
        currentTable={data}
        staffs={staffs}
        updateFetch={updateFetch}
      />
    </div>
  );
};

export default ExpensePage;
