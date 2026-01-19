import { Tables } from "../supabase/supabaseTypes";

export function getNewEngRelNumber(
  engRels: Tables<"eng_rels">[] | null | undefined
) {
  if (!engRels?.length) {
    return 1;
  } else {
    return Math.max(...engRels.map((e) => e.release_id)) + 1;
  }
}
