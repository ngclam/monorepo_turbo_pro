import { sleep } from "@remix/commons";

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export const mockProducts: Product[] = [
  { id: "p-1", name: "Bàn phím cơ", price: 1200000, stock: 12 },
  { id: "p-2", name: "Chuột không dây", price: 450000, stock: 30 },
  { id: "p-3", name: "Màn hình 27 inch", price: 5200000, stock: 6 }
];

export async function getProducts(): Promise<Product[]> {
  await sleep(300);
  return mockProducts;
}
