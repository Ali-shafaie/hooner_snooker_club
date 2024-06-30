import { TableStatus } from "@prisma/client";

export interface MenuItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  subtotal: number | null;
  profitOrder: number | null;
  createdAt: Date; // Use Date for createdAt
}

export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  subtotal: number;
  profitOrder: number | null;
  createdAt: Date; // Use Date for createdAt
  menuItem: MenuItem;
}

export interface Order {
  id: number;
  total: number;
  createdAt: Date; // Use Date for createdAt
  tableId: number;
  customerId: number;
  orderItems: OrderItem[];
}

export interface Customer {
  id: number;
  name: string;
  Order: Order[];
}

export interface Booking {
  id: number;
  customerName: string | null;
  startTime: Date | null; // Use Date | null for startTime
  endTime: Date | null; // Use Date | null for endTime
  duration: string | null; // Assuming duration can be null
  amountEarned: number;
  createdAt: Date; // Use Date for createdAt
  tableId: number;
  customerId: number;
  customer: Customer | null; // Allow customer to be null
}

export interface TableType {
  id: number;
  name: string;
  status: TableStatus;
  createdAt: Date;
  updatedAt: Date;
  bookingHistory: Booking[];
}
