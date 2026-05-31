import { useEffect, useState } from "react";
import { formatCurrency } from "@remix/commons";
import { Card, PageHeader } from "@remix/components";
import { getProducts, type Product } from "@remix/modules";

export function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Demo1" description="App nhỏ để học cách chia sẻ Product Card và mock product." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} title={product.name}>
              <p className="text-2xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
              <p className="mt-2 text-sm text-slate-600">Tồn kho: {product.stock}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
