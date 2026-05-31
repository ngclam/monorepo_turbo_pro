import { useState } from "react";
import { Button, Card, PageHeader } from "@remix/components";

export function App() {
  const [counter, setCounter] = useState(0);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-xl">
        <PageHeader title="Game Counter" description="Mini game đơn giản để học state trong React." />
        <Card>
          <div className="text-center">
            <p className="text-sm text-slate-500">Điểm hiện tại</p>
            <p className="my-6 text-6xl font-semibold text-slate-950">{counter}</p>
            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={() => setCounter((value) => value - 1)}>
                Giảm
              </Button>
              <Button onClick={() => setCounter((value) => value + 1)}>Tăng</Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
