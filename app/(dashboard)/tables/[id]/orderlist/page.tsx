"use client";

// Import necessary dependencies and components
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const OrderList: React.FC = () => {
  const params = useParams();
  const tableId = params.id; // Get the tableId from params

  const [orderlist, setOrderList] = useState<any[]>([]);
  // Inside the useEffect hook
  useEffect(() => {
    // Define a function to fetch order items for a specific table ID
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`/api/tables/order`);

        // Assuming the API response contains an array of order items
        const orderItems = response.data;

        // Update the state with the fetched order items
        setOrderList(orderItems);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching order items:", error);
      }
    };

    // Call the fetchOrderItems function when the tableId changes
    fetchOrderItems();
  }, [tableId]);

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between space-y-2 py-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">خوش آمدید !</h2>
          <p className="text-muted-foreground text-sm">
            این یک لیست از فرمایشات هر میز شما میباشد
          </p>
        </div>
        <div className="mx-6">
          <h4 className="text-g">
            مجموع فرمایشات:{" "}
            <Badge variant={"outline"} className="font-bold">
              {orderlist.length}
            </Badge>
          </h4>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-green-600">
          <TableRow>
            <TableHead className="w-[100px]">نام</TableHead>
            <TableHead>تعداد</TableHead>
            <TableHead>جمله</TableHead>
            <TableHead>میز</TableHead> {/* Added a column for tableId */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderlist?.map((order) =>
            // Map through orderItems within each order
            order.orderItems.map((orderItem: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-black">
                  {/* Display the menu item name from the orderItem */}
                  {orderItem.menuItem?.name}
                </TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
                <TableCell>{orderItem.subtotal}</TableCell>
                <TableCell>{order.tableId}</TableCell>{" "}
                {/* Display the tableId */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
