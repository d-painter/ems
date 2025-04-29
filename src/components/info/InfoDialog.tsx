import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { ReactNode } from "react";

export type InfoProps = {
  title: string;
  description: string;
  children: ReactNode;
  type: "info" | "action";
};

export default function InfoDialog({
  title,
  description,
  children,
  type,
}: InfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="hover:bg-transparent">
          <Info
            size={30}
            fill={type === "action" ? "blue" : "black"}
            stroke="white"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[95%] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description} </DialogDescription>
        </DialogHeader>
        <div className="space-x-2">{children}</div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
