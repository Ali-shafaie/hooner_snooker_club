"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import axios from "axios";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { columns } from "./components/columns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const queryClient = new QueryClient();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("auth/signin");
  //   }
  // }, [router, session]);

  const {
    data: menuItem,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    "products",
    async () => {
      const response = await axios.get("api/product");
      return response.data;
    },
    {
      staleTime: 4000,
      refetchInterval: 4000,
    }
  );
  const { data: productSell } = useQuery(
    "productSell",
    async () => {
      const response = await axios.get("api/product/productSell");
      return response.data;
    },
    {
      staleTime: 4000,
      refetchInterval: 4000,
    }
  );

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory === "All" ? menuItem : productSell;

  // PRINT
  const handlePrint = (
    amount: any,
    customerName: any,
    selectedOption: any,
    price: any
  ) => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Print Bill</title>
          <style>
            /* Add your print styles here */
            body {
              font-family: Arial, sans-serif;
              direction: rtl;
              padding-bottem:20px;
            }
            .print-title {
              text-align: center;
              font-size: 20px;
              font-weight: bold;
            }
            .print-logo {
              text-align: center;
              -margin-top:20px
            }
            .print-list {
              margin-top: 10px;
            }
            .span-list {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              white-space: nowrap;
              border-bottom:1px dashed black;
            }
            .span-sign{
              margin-top:30px;
              margin-bottom:20px;
              display:flex;
              justify-content: space-between;
              border-top: 1px dashed #000
            }
            .span-down{
              margin-top:30px;
              margin-bottom:20px;
              display:flex;
              justify-content: space-between;
              border-top: 0.2px dashed #ddd;
            }
            
          </style>
        </head>
        <body>
        <div class="print-logo">
        <img src='/assets/logopng.png' alt="Logo" width="100" height="100"/>
      </div>
      <div style="padding-right:20px; padding-left:20px">
      <div class="print-title" >${" بل فروش محصولات  "}</div>
      <div class="print-list">
      <div class="span-list">
      <span class="">اسم منیو : </span>
      <span class="">${selectedOption}</span>
      </div>
      <div class="span-list">
      <span class="">اسم مشتری : </span>
      <span class="">${customerName}</span>
      </div>
      <div class="span-list">
      <span class=""> تعداد : </span>
      <span class="" style="font-size:13px" dir="ltr">${amount}</span>
      </div>
      <div class="span-list">
      <span class="">قیمت مجموعی : </span>
      <span class="" style="font-size:13px" dir="ltr">${price * amount}</span>
      </div>
      <div class="span-sign " style="padding-bottom:10px">
      <span class=""></span>
  
  
      </div> 
      <div class="span-down " style="padding-bottom:10px">
      <span class=""></span>
      <span class="" style="font-size:13px"> </span>
      </div>
      </div>
      </div>
      </body>
      </html>
      `;

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <main className="h-full overflow-y-auto">
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
                  این لیست از محصولات های شما میباشد
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
                handlePrint={handlePrint}
              />
            )}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default ProductPage;
