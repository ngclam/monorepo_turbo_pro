import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { formatCurrency } from "@remix/commons";
import { getProducts } from "@remix/modules";
import { userStore } from "@remix/stores";
import { Button, Card, Input, Layout, Loading, PageHeader } from "@remix/components";

type Page = "dashboard" | "users" | "settings";

const menuItems: Array<{ key: Page; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" }
];

export const App = observer(function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // App gọi services/stores và services/modules thay vì tự tạo dữ liệu trong UI.
    userStore.fetchUsers();
    getProducts().then((products) => setProductCount(products.length));
  }, []);

  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar activePage={page} onChange={setPage} />}
    >
      {page === "dashboard" ? <Dashboard productCount={productCount} /> : null}
      {page === "users" ? <UsersPage /> : null}
      {page === "settings" ? <SettingsPage /> : null}
    </Layout>
  );
});

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div>
          <p className="text-sm text-slate-500">Monorepo demo</p>
          <strong className="text-lg text-slate-950">Admin</strong>
        </div>
        <Button variant="secondary">Tài khoản</Button>
      </div>
    </header>
  );
}

function Sidebar({ activePage, onChange }: { activePage: Page; onChange: (page: Page) => void }) {
  return (
    <nav className="rounded-lg border border-slate-200 bg-white p-3">
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`mb-1 block w-full rounded-md px-3 py-2 text-left text-sm ${
            activePage === item.key ? "bg-sky-50 font-medium text-sky-700" : "text-slate-700 hover:bg-slate-50"
          }`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function Dashboard({ productCount }: { productCount: number }) {
  return (
    <>
      <PageHeader title="Dashboard" description="Ví dụ dashboard dùng Card từ packages/components." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Tổng User" value={userStore.users.length} />
        <MetricCard title="Tổng Product" value={productCount} />
        <MetricCard title="Tổng Order" value={18} />
      </div>
    </>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
    </Card>
  );
}

function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Trang này dùng MobX UserStore từ services/stores." />
      <Card>
        {userStore.loading ? <Loading /> : null}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="py-3">Tên</th>
                <th className="py-3">Email</th>
                <th className="py-3">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {userStore.users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Form demo dùng Input và Button từ shared components." />
      <Card title="Cấu hình cửa hàng">
        <div className="grid max-w-xl gap-4">
          <Input label="Tên cửa hàng" defaultValue="Remix Demo Shop" />
          <Input label="Ngân sách demo" defaultValue={formatCurrency(5000000)} />
          <Button className="w-fit">Lưu cấu hình</Button>
        </div>
      </Card>
    </>
  );
}
