export type ProfitProduct = {
  id: number;
  countStock: number | null;
  customerName: string;
  price: number;
  productProfit: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
};
export type ProfitProductType = {
  totalAmountMixedProduct: number;
  totalProductFixedProfit: number;
};
