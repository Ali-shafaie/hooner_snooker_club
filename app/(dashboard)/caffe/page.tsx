"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { columns } from "./components/columns";

const CafePage = () => {
  const queryClient = new QueryClient();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: menuItem,
    isLoading,
    isError,
    refetch,
  } = useQuery("menuItems", async () => {
    const response = await axios.get("api/menuItem");
    return response.data;
  });

  // Filter menu items based on selected category
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItem
      : menuItem.filter((item: any) => item.category === selectedCategory);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="">
        <div className="container mx-auto p-5 ">
          <div className="md:hidden">
            شما نمی توانید دیتا تیبل خود را در حالت موبایل ببینید
          </div>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  خوش آمدید !
                </h2>
                <p className="text-muted-foreground text-sm">
                  این لیست از منیو های شما میباشد
                </p>
              </div>
            </div>
            {isLoading ? (
              <p className="w-full flex h-full place-content-center items-center">
                Loading...
              </p>
            ) : isError ? (
              <p>Error fetching data</p>
            ) : (
              <DataTable
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                data={filteredMenuItems}
                columns={columns}
              />
            )}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default CafePage;
