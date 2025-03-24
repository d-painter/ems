import { useQuery } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Database } from "../supabase/supabaseTypes";
import { PostgrestError } from "@supabase/supabase-js";

const supabase = supabaseClient;

export async function fetchProjects(): Promise<Database[] | PostgrestError> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .order("project_id");
  console.log(data);

  if (data) {
    return data;
  }

  return error;
}

export function useProjects() {
  return useQuery({
    queryKey: ["allProjects"],
    queryFn: fetchProjects,
  });
}
