import { useQuery } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";

const supabase = supabaseClient;

export type AllProjectPartTableRows = {
  description: string | null;
  part_number: number;
  project_id: string;
  sub_system: string;
};

export async function fetchProjectParts(
  projectId: string
): Promise<AllProjectPartTableRows[] | null> {
  const { data, error } = await supabase
    .from("part_numbers")
    .select("project_id, sub_system, part_number, description")
    .eq("project_id", projectId);

  if (error) {
    throw error;
  } else {
    return data;
  }
}

export function useProjectParts(projectId: string) {
  return useQuery({
    queryKey: ["allProjectParts", projectId],
    queryFn: () => fetchProjectParts(projectId),
  });
}
