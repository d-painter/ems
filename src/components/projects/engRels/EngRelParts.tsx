import { Tables } from "@/services/supabase/supabaseTypes";
import EngRelPartsTable from "./EngRelPartsTable";
import { useUpdateEngRel } from "@/services/queries/engRelQueries";
import CsvClickDrag from "@/components/csv/CsvClickDrag";
import { getReleaseParts, ParsedCsvPartParams } from "@/services/csv/ernData";
import type { ParseResult } from "papaparse";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pen, X } from "lucide-react";

export default function EngRelParts({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  const updateEngRelMutation = useUpdateEngRel();
  const [edit, setEdit] = useState(false);

  async function csvPartsFromFile(results: ParseResult<string[]>) {
    if (!results) {
      toast.error("There is no usable data in that file.");
      return;
    }
    try {
      const csvParts = getReleaseParts(results.data);
      await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { part_numbers: JSON.stringify(csvParts) },
      });
      toast.success("Release updated.");
      setEdit(false);
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  let engParts;
  if (engRel.part_numbers) {
    engParts = JSON.parse(engRel?.part_numbers) as ParsedCsvPartParams[];
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex items-center my-auto min-h-12 gap-4 border-b-2 border-b-primary">
        {!edit && (
          <>
            <h1>PARTS</h1>
            <Button
              size={"icon"}
              variant="engRel"
              type="button"
              onClick={() => setEdit(true)}
            >
              <Pen className="size-4" />
            </Button>
          </>
        )}
        {edit && (
          <>
            <CsvClickDrag csvPartsFromFile={csvPartsFromFile} />
            <Button
              size={"icon"}
              variant="engRel"
              type="button"
              onClick={() => setEdit(false)}
            >
              <X className="size-4" />
            </Button>
          </>
        )}
      </div>
      <div className="flex flex-col-reverse items-center md:flex-row justify-around w-full gap-2">
        <div className="w-full ">
          <EngRelPartsTable parts={engParts} />
        </div>
      </div>
    </div>
  );
}
