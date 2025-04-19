import { Tables } from "@/services/supabase/supabaseTypes";
import EngRelPartsTable from "./EngRelPartsTable";
import EditEngRelParts from "./EditEngRelParts";
import { useUpdateEngRel } from "@/services/queries/engRelQueries";
import CsvClickDrag from "@/components/csv/CsvClickDrag";
import { getReleaseParts, ParsedCsvPartParams } from "@/services/csv/ernData";
import type { ParseResult } from "papaparse";
import { toast } from "sonner";

export default function EngRelParts({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  const updateEngRelMutation = useUpdateEngRel();
  async function csvPartsFromFile(results: ParseResult<string[]>) {
    const csvParts = getReleaseParts(results.data);

    try {
      await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { part_numbers: JSON.stringify(csvParts) },
      });
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
    <div className="flex justify-center w-full">
      <div className="flex flex-col-reverse items-center md:flex-row justify-around w-full gap-2">
        <div className="w-full ">
          <EngRelPartsTable parts={engParts} />
        </div>
        <div className="h-full w-full justify-center md:w-fit items-center flex md:flex-col gap-10">
          <EditEngRelParts engRel={engRel} />
          <div className="hidden md:flex w-full  border-b"></div>
          <CsvClickDrag csvPartsFromFile={csvPartsFromFile} />
        </div>
      </div>
    </div>
  );
}
