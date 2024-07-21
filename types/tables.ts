import { TableStatus } from "@prisma/client";

export interface Customer {
  id: number;
  name: string;
  // Add more properties as needed
}

export interface Booking {
  id: number;
  startTime: Date | null;
  endTime: Date | null;
  duration?: number;
  amountEarned: number;
  createdAt: Date | null;
  customer: Customer | null;
  customerId: number | null; // Change undefined to null if it can be null
  customerName: string | null;
  tableId: number;
}

export interface TablesType {
  id: number;
  name: string;
  status: TableStatus; // Assuming TableStatus comes from Prisma
  createdAt: Date | null; // Use Date type for timestamps
  updatedAt: Date | null; // Use Date type for timestamps
  bookingHistory: Booking[];
}

export interface TableListResult {
  totalAmountEarned: number;
  totalTables: number;
}

export interface AllTableListType {
  id: number;
  name: string;
  status: "FREE" | "OCCUPIED" | "RESERVED" | "OTHER_STATUS"; // Replace with all possible statuses
  createdAt: Date;
  updatedAt: Date;
}
