import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
  className?: string;
};

export function DataTable({ children }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function DataTableHead({ children }: TableProps) {
  return <thead className="[&_tr]:border-b">{children}</thead>;
}

export function DtHeaderRow({ children }: TableProps) {
  return <tr className="text-left ">{children}</tr>;
}

export function DataTableBody({ children }: TableProps) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
}

export function DtHeader({ children, className }: TableProps) {
  return <th className={`p-2 ${className && className}`}>{children}</th>;
}

export function DtContentRow({ children }: TableProps) {
  return <tr className="border-b hover:bg-black/10">{children}</tr>;
}

export function DtData({ children, className = "" }: TableProps) {
  return <td className={`p-2 ${className}`}>{children}</td>;
}
