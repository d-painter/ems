import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";

const supabase = supabaseClient;

// Queries
// Get all parts for a project
export type AllProjectPartTableRows = Omit<Tables<"part_numbers">, "owner_id">;
export async function fetchProjectParts(
  projectId: string
): Promise<AllProjectPartTableRows[] | null> {
  const { data, error } = await supabase
    .from("part_numbers")
    .select("project_id, sub_system, part_number, description, id")
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

// Mutations
// Add parts
export function useAddNewParts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewParts,
    onError: (error) => {
      console.error("part mutation error", error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjectParts"] });
    },
  });
}

async function addNewParts(parts: Omit<AllProjectPartTableRows, "owner_id">) {
  console.log(parts);
  
  const { data, error } = await supabase
    .from("part_numbers")
    .insert([{ some_column: "someValue" }])
    .select();

  if (error) {
    throw error;
  }

  return data
}
