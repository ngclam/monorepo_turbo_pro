type LoadingProps = {
  text?: string;
};

export function Loading({ text = "Đang tải..." }: LoadingProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" />
      <span>{text}</span>
    </div>
  );
}
