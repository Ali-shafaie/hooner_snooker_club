export interface MenuItem {
  id: number;
  name: string;
  buyPrice: number | null;
  price: number;
  countStock: number;
  category: "FOOD" | "DRINK";
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}

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
