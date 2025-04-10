import { Tables } from "@/services/supabase/supabaseTypes";
import EngRelPartsTable from "./EngRelPartsTable";
import EditEngRelParts from "./EditEngRelParts";
import { useEngRelParts } from "@/services/queries/engRelQueries";

export default function EngRelParts({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  let partIdArray: number[] = [];
  if (engRel.part_numbers) {
    partIdArray = engRel.part_numbers.split(";").map((n) => Number(n));
  }

  const { data: engParts } = useEngRelParts(partIdArray);
  console.log(engParts);

  return (
    <div className="flex flex-row gap-2">
      <EngRelPartsTable parts={engParts} />
      <div className="h-full flex flex-col justify-evenly mx-auto gap-2">
        <EditEngRelParts
          engRel={engRel}
        />
        <div className="size-24 rounded-2xl text-center bg-black/10">CSV</div>
      </div>
    </div>
  );
}
