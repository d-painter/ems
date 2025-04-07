import { Tables } from "@/services/supabase/supabaseTypes";

export default function EngRel({engRel}:{engRel:Tables<"eng_rels">}){
  

    return <>{JSON.stringify(engRel)}</>
}