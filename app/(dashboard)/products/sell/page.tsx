"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Pagination from "react-js-pagination";
import styles from "../../tables/pagination.module.css";
import { Loader2, Pencil, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProductSellPage = () => {
  const [productSell, setProductSell] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState("daily"); // Default to 'daily'

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [data, setData] = useState<any>([]);

  const router = useRouter();
  const { data: session } = useSession();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/productSell");
      setProductSell(data);
      // filterData(filterType);
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
    fetchProducts();
  }, []);

  useEffect(() => {
    filterData(filterType); // Call filterData whenever filterType changes
  }, [filterType, filterData]);

  const handleDeleteProductSell = async (id: any) => {
    setLoading(true);
    try {
      await axios.delete("/api/product/deleteSell", {
        data: id,
      });

      fetchProducts();
      toast.success("فروش محصول موفقانه حذف شد");
      setLoading(false);
    } catch (error) {
      toast.error("ببخشید محصول فروش شما حذف نشد");
      setLoading(false);
    }
  };
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

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (id: any) => {
    openUpdateModal();
    const { data } = await axios.post("/api/product/getSellProduct", { id });
    setData(data);
  };

  return (
    <div className="">
      <div className="w-full mr-auto flex flex-col md:flex-row items-center justify-between ">
        <div>
          <button className="bg-green-500 px-3 py-2 text-white mr-auto mb-5">
            لیست فروشات
          </button>
          <button
            className="bg-green-500 px-3 py-2 mr-5 text-white mb-5"
            onClick={() => router.back()}>
            لیست محصولات{" "}
          </button>
        </div>
        <div className="mb-5 md:pl-16">
          <button
            className="bg-green-500 px-3 text-white py-2 m-[1px]"
            onClick={() => handleFilterClick("daily")}>
            روزانه
          </button>
          <button
            className="bg-green-500 px-3 text-white py-2 m-[1px]"
            onClick={() => handleFilterClick("monthly")}>
            ماهانه
          </button>
          <button
            className="bg-green-500 px-3 text-white py-2 m-[1px]"
            onClick={() => handleFilterClick("yearly")}>
            سالانه
          </button>
        </div>
      </div>
      <div className="max-w-xs mx-auto md:max-w-5xl mt-7 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-green-500 text-white">
                اسم محصول
              </th>
              <th className="px-4 py-2 border bg-green-500 text-white">
                اسم مشتری{" "}
              </th>
              <th className="px-4 py-2 border bg-green-500 text-white">
                تعداد فروش
              </th>
              <th className="px-4 py-2 border bg-green-500 text-white">
                قیمت مجموعی
              </th>
              {/* {user?.role === "ADMIN" && ( */}
              <th className="px-4 py-2 border bg-green-500 text-white">
                عملیات
              </th>
              {/* )} */}
            </tr>
          </thead>
          {allSales.length > 0 ? (
            allSales.map((sell: any) => (
              <tbody key={sell.id}>
                <tr key={sell.id} className="text-center">
                  <td className="px-4 py-2 border">{sell?.product?.name}</td>
                  <td className="px-4 py-2 border">{sell.customerName}</td>
                  <td className="px-4 py-2 border">{sell.countStock}</td>
                  <td className="px-4 py-2 border">{sell.price}</td>
                  {/* {user?.role === "ADMIN" && ( */}
                  <td
                    className="px-4 py-2 border text-center"
                    onClick={() => handleDeleteProductSell(sell.id)}>
                    <Trash2 color="#ff0000" size="19" className="mr-12" />
                  </td>
                  {/* )} */}
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

export default ProductSellPage;
