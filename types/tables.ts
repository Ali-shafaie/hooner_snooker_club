interface Customer {
  id: number;
  name: string;
  // Add more properties as needed
}

interface Booking {
  id: number;
  startTime: string; // Consider using Date type if you're parsing this string to Date
  endTime: string; // Consider using Date type if you're parsing this string to Date
  duration?: number; // Optional if you calculate duration
  amountEarned: number;
  createdAt: string; // Consider using Date type if you're parsing this string to Date
  customer: Customer;
  customerId: number;
  customerName?: string; // Optional if available
  tableId: number;
}

interface Table {
  id: number;
  name: string;
  // Add more properties as needed
}

export interface TablesType {
  id: number;
  name: string;
  status: string;
  createdAt: string; // Consider using Date type if you're parsing this string to Date
  updatedAt: string; // Consider using Date type if you're parsing this string to Date
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
