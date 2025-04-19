import { ReactNode } from "@tanstack/react-router";
import { Menu } from "lucide-react";

export default function MobileNavBottom({ children }: { children: ReactNode }) {
  return (
    <div className="md:hidden fixed bottom-0 border border-t-2 border-t-primary w-full ">
      <div className="flex flex-row items-center justify-around w-full [&_*]:p-2 [&_*]:gap-2 [&_*]:[&.active]:font-bold [&_*]:[&.active]:text-background [&_*]:[&.active]:bg-primary">
        <button className="h-full hover:cursor-pointer !p-0">
          <Menu className="size-10" />
        </button>
        {children}
      </div>
    </div>
  );
}
