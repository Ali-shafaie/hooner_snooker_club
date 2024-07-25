import { MenuCategory } from "@prisma/client";

enum MenuItemCategory {
  FOOD = "FOOD",
  DRINK = "DRINK",
}

// Interface for MenuItem
export interface MenuItemType {
  id: number;
  name: string;
  buyPrice: number | null;
  price: number;
  countStock: number | null;
  category: MenuCategory;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface InputItem {
  name: string;
  quantity: string;
}
// Interface for OrderItem
export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  subtotal: number;
  profitOrder: number | null;
  createdAt: string; // ISO date string
  menuItem: MenuItemType;
}

// Interface for Customer
interface Customer {
  id: number;
  name: string;
}

// Interface for Order
export interface OrderTypes {
  id: number;
  total: number;
  createdAt: string; // ISO date string
  tableId: number;
  customerId: number;
  orderItems: OrderItem[];
  customer: Customer;
}
