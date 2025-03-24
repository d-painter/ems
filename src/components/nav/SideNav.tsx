import { ReactNode } from "react";

export default function SideNav({ children }: { children: ReactNode }) {
  return (
    <div className="w-48 h-full hidden md:flex-col md:flex p-4 bg-red-200">
      {children}
    </div>
  );
}
