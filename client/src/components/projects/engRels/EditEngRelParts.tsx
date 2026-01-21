import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useUpdateEngRel } from "@/services/queries/engRelQueries";
import { useProjectParts } from "@/services/queries/partsQueries";
import { Tables } from "@/services/supabase/supabaseTypes";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EditEngRelParts({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  const { data: allParts } = useProjectParts(engRel.project_id);
  let partIdArray: number[] = [];
  if (engRel.part_numbers) {
    partIdArray = engRel.part_numbers.split(";").map((n) => Number(n));
  }

  const [open, setOpen] = useState(false);
  const [updateParts, setUpdateParts] = useState(partIdArray);

  const updateEngRelMutation = useUpdateEngRel();

  const updatedPartsList = allParts?.filter((p) => updateParts.includes(p.id));

  async function updateEngRel() {
    try {
      await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { part_numbers: updateParts.join(";") },
      });
      setOpen(false);
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="xs" onClick={() => setOpen(true)}>
          Edit Parts
        </Button>
      </DialogTrigger>
      <DialogContent
        className="min-h-[95%] flex flex-col justify-between"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Add Parts</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 h-full p-0 m-0">
          <div>
            <p>Parts</p>
            <ScrollArea className="h-54 w-full rounded-md text-xs border">
              <div className="p-4 h-fit flex flex-col gap-1 ">
                {updatedPartsList?.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center justify-between text-left w-full border-b-1 hover:bg-black/10"
                  >
                    <div>
                      {p.project_id}-{p.sub_system}-
                      {String(p.part_number).padStart(4, "0")} - {p.description}
                    </div>
                    <Button
                      variant={"ghost"}
                      size={"xs"}
                      onClick={() =>
                        setUpdateParts(
                          updateParts.filter((part) => part !== p.id)
                        )
                      }
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div>
            <p>Add Parts</p>
            <ScrollArea className="h-54 w-full rounded-md text-xs border">
              <div className="flex p-4 flex-col gap-1 ">
                {allParts
                  ?.filter((p) => !updateParts.includes(p.id))
                  .map((p, i) => (
                    <button
                      key={i}
                      className="p-1 text-left hover:cursor-pointer border-b-1 hover:bg-black/10"
                      onClick={() => setUpdateParts([...updateParts, p.id])}
                    >
                      {p.project_id}-{p.sub_system}-
                      {String(p.part_number).padStart(4, "0")} - {p.description}
                    </button>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:ml-auto relative bottom-0">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setOpen(false);
              setUpdateParts(partIdArray);
            }}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => void updateEngRel()}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
{
  /* <Table>
              <TableHeader>
                <TableRow className="text-left">
                  <TableHead className="text-left">Part Number</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updatedPartsList?.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-4 text-xs">
                      {p.project_id}-{p.sub_system}-
                      {String(p.part_number).padStart(4, "0")}
                    </TableCell>
                    <TableCell className="min-w-24 !max-w-36 !truncate">
                      {p.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"ghost"}
                        size={"xs"}
                        onClick={() =>
                          setUpdateParts(
                            updateParts.filter((part) => part !== p.id)
                          )
                        }
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */
}
