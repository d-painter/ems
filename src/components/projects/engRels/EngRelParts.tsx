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
    <div className="flex justify-center w-full">
      <div className="flex flex-col-reverse items-center md:flex-row justify-around w-full gap-2 max-w-[900px]">
        <div className="w-96 ">
          <EngRelPartsTable parts={engParts} />
        </div>
        <div className="h-full w-full justify-center md:w-fit items-center flex md:flex-col  gap-10">
          <EditEngRelParts engRel={engRel} />
          <div className="hidden md:flex w-full  border-b"></div>
          <div className="size-24 rounded-2xl text-center bg-black/10">CSV</div>
        </div>
      </div>
    </div>
  );
}
