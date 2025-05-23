import { Tables } from "@/services/supabase/supabaseTypes";

export default function getNextProjectNumber(
  data: Tables<"projects">[] | null | undefined
) {
  if (!data?.length) {
    return "P001";
  }

  if (Array.isArray(data) && data.length) {
    let lastProjectID = Number(data.pop()?.["project_id"]?.slice(-3));
    lastProjectID++;
    return `P${String(lastProjectID).padStart(3, "0")}`;
  }
  throw new Error("There was an error ");
}
