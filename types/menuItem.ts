import { MenuCategory } from "@prisma/client";

export type MenuItem = {
  id: number;
  name: string;
  buyPrice: number | null; // Allow null for buyPrice
  price: number;
  countStock: number | null; // Allow null for countStock
  category: MenuCategory;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  subtotal: number | null;
  profitOrder: number | null;
  createdAt: Date;
}

export interface MenuCategoryTotals {
  foodSubtotal: number;
  drinkSubtotal: number;
  drinkItemTotalFixedPrice: number;
  totalMenuItems: number;
}
