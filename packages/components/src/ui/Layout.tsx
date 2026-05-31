import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
};

export function Layout({ children, header, sidebar }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {header}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {sidebar ? <aside className="hidden w-60 shrink-0 md:block">{sidebar}</aside> : null}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
