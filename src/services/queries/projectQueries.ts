import { useQuery } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";

const supabase = supabaseClient;

export async function fetchProjects(): Promise<Tables<"projects">[] | null> {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .order("project_id");
  if (error) {
    throw error;
  } else {
    return data as Tables<"projects">[] | null;
  }
}

export function useAllProjects() {
  return useQuery({
    queryKey: ["allProjects"],
    queryFn: fetchProjects,
  });
}
