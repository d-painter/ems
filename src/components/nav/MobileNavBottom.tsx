import { ReactNode } from "@tanstack/react-router";
import { Menu } from "lucide-react";

export default function MobileNavBottom({ children }: { children: ReactNode }) {
  return (
    <div className="md:hidden bg-background fixed bottom-0 border h-12 border-t-2 border-t-primary w-full text-xs">
      <div className="flex flex-row items-center justify-around w-full h-full [&_*]:grow [&_*]:max-w-28 [&_*]:gap-2 [&_*]:[&.active]:text-background [&_*]:[&.active]:bg-primary">
        <button className="h-full hover:cursor-pointer flex items-center justify-center!p-0">
          <Menu className="size-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
