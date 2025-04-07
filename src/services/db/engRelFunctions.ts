import { Tables } from "../supabase/supabaseTypes";

export function getNewEngRelNumber(engRels: Tables<"eng_rels">[]) {
  return Math.max(...engRels.map((e) => e.release_id)) + 1;
}
