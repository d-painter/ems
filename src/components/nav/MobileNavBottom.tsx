import { ReactNode } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserAuth } from "../auth/AuthContext";
import NavContent from "./NavContent";
import LogoutButton from "./LogoutButton";

export default function MobileNavBottom({ children }: { children: ReactNode }) {
  const { session } = UserAuth();
  return (
    <div className="md:hidden bg-background fixed bottom-0 border h-12 border-t-2 border-t-primary w-full text-xs">
      <div className="flex flex-row items-center justify-around w-full h-full [&_*]:text-center [&_*]:min-w-16 [&_*]:hover:bg-black/10 [&_*]:max-w-28 [&_*]:gap-2 [&_*]:[&.active]:text-background [&_*]:[&.active]:bg-primary">
        <Sheet>
          <SheetTrigger>
            <div className="h-full hover:cursor-pointer flex items-center justify-center!p-0 hover:bg">
              <Menu className="size-6 !hover:bg-transparent" />
            </div>
          </SheetTrigger>
          <SheetContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            aria-describedby={undefined}
            side="bottom"
            className="h-fit"
          >
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="p-2 flex flex-col gap-8 mt-auto w-fit">
              <div className="flex flex-col h-fit w-full">
                <NavContent navType="drawer" />
              </div>
              <div className="w-full max-w-54 space-y-1">
                <p className="text-xs">{session?.user?.email}</p>
                <LogoutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {children}
      </div>
    </div>
  );
}
