import { Tables } from "@/services/supabase/supabaseTypes";
import EngRelHeader from "./EngRelHeader";
import EngRelParts from "./EngRelParts";

export default function EngRel({ engRel }: { engRel: Tables<"eng_rels"> }) {
  return (
    <div className="w-full h-full space-y-2">
      <EngRelHeader engRel={engRel} />
      <EngRelParts engRel={engRel} />
    </div>
  );
}
