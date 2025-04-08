import { Tables } from "@/services/supabase/supabaseTypes";
import EngRelHeader from "./EngRelHeader";

export default function EngRel({ engRel }: { engRel: Tables<"eng_rels"> }) {
  return (
    <div className="w-full h-full">
        <EngRelHeader engRel={engRel}/>
        </div>
  );
}
