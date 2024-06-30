"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "react-js-pagination";
import styles from "../../tables/pagination.module.css";
import { Loader2, Pencil, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AllOtherSales = () => {
  const [productSell, setProductSell] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("daily");

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [, setData] = useState<any>([]);

  const router = useRouter();
  const { data: session } = useSession();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/otherProduct/getAll");
      setProductSell(data);
    } catch (error) {
      toast.error("ببخشید فروشات  گرفته نشد");
    }
  };
  const filterData = useCallback(
    (filter: any) => {
      const currentDate = new Date();
      let filteredData = [];

      if (filter === "daily") {
        filteredData = productSell.filter((item: any) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getDate() === currentDate.getDate() &&
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "monthly") {
        filteredData = productSell.filter((item: any) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "yearly") {
        filteredData = productSell.filter((item: any) => {
          const itemDate = new Date(item.createdAt);
          return itemDate.getFullYear() === currentDate.getFullYear();
        });
      }

      setFilteredData(filteredData);
    },
    [productSell]
  );

  const handleFilterClick = (filter: any) => {
    setFilterType(filter);
    filterData(filter);
  };

  useEffect(() => {
    filterData(filterType); // Call filterData whenever filterType changes
  }, [filterType, filterData]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // code for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = productSell.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const allSales = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full mr-auto">
          <button className="bg-green-500 px-3 py-2 text-white mr-auto mb-5">
            فروشات قبلی
          </button>
          <button
            className="bg-green-500 px-3 py-2 mr-5 text-white mb-5"
            onClick={() => router.back()}
          >
            ایجاد فروشات متفرقه
          </button>
        </div>
        <div className="mb-5 flex items-center md:pl-16">
          <button
            className="bg-green-500 px-3 text-white py-2 mx-2"
            onClick={() => handleFilterClick("daily")}
          >
            روزانه
          </button>
          <button
            className="bg-green-500 px-3 text-white py-2 mx-2"
            onClick={() => handleFilterClick("monthly")}
          >
            ماهانه
          </button>
          <button
            className="bg-green-500 px-3 text-white py-2 mx-2"
            onClick={() => handleFilterClick("yearly")}
          >
            سالانه
          </button>
        </div>
      </div>
      <div className="w-10/12">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-green-500">اسم محصول</th>
              <th className="px-4 py-2 border text-green-500">اسم مشتری </th>
              <th className="px-4 py-2 border text-green-500">تعداد فروش</th>
              <th className="px-4 py-2 border text-green-500">قیمت مجموعی</th>
              {/* {user?.role === "ADMIN" && ( */}
              {/* <th className="px-4 py-2 border text-green-500">عملیات</th> */}
              {/* )} */}
            </tr>
          </thead>
          {allSales.length > 0 ? (
            allSales.map((sell: any) => (
              <tbody key={sell.id}>
                <tr key={sell.id} className="text-center">
                  <td className="px-4 py-2 border">{sell?.menuItem?.name}</td>
                  <td className="px-4 py-2 border">{sell.customerName}</td>
                  <td className="px-4 py-2 border">{sell.amount}</td>
                  <td className="px-4 py-2 border">{sell.price}</td>

                  {/* <td className="text-center px-20 py-2 border ">
                    <Trash2 color="#db0000" size={20} />
                  </td> */}
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td className="p-5">هیچ فروش محصول وجود ندارد</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="mt-12 pb-12 ">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5} // Number of page links to display
          onChange={handlePageChange}
          itemClass={styles["pagination-button"]}
          activeClass={styles["active-page"]}
          disabledClass={styles["disabled-button"]}
          firstPageText="اول"
          prevPageText="گذشته"
          lastPageText="اخری"
          nextPageText="بعدی"
          innerClass={styles["pagination-inner"]}
        />
      </div>
    </div>
  );
};

export default AllOtherSales;
