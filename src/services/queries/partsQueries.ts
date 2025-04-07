import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";
import { toast } from "sonner";

const supabase = supabaseClient;

// Queries
// Get all parts for a project
export type AllProjectPartTableRows = Omit<Tables<"part_numbers">, "owner_id">;
async function fetchProjectParts(
  projectId: string
): Promise<AllProjectPartTableRows[] | null> {
  const { data, error } = await supabase
    .from("part_numbers")
    .select(
      "project_id, sub_system, part_number, description, id, created_date"
    )
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
      throw error;
    },
    onSuccess: async (_, variables) => {
      variables.map((v) =>
        toast.success(
          `${v.project_id}-${v.sub_system}-${v.part_number} - ${v.description} added.`
        )
      );
      await queryClient.invalidateQueries({ queryKey: ["allProjectParts"] });
    },
  });
}

async function addNewParts(
  parts: Omit<AllProjectPartTableRows, "owner_id" | "id" | "created_date">[]
) {
  const { data, error } = await supabase
    .from("part_numbers")
    .insert(parts)
    .select();

  if (error) {
    throw error;
  }
  return data as Tables<"part_numbers">[];
}

//Update Part
export function useUpdatePart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePart,
    onError: (error) => {
      throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjectParts"] });
    },
  });
}

type UpdatePartParams = {
  columnToMatch: string;
  matchValue: number;
  updates: { [key: string]: string | number };
};

async function updatePart({ ...params }: UpdatePartParams) {
  const { columnToMatch, matchValue, updates } = { ...params };
  const { data, error } = await supabase
    .from("part_numbers")
    .update(updates)
    .eq(columnToMatch, matchValue)
    .select();

  if (error) {
    throw error;
  }
  return data as Tables<"part_numbers">[];
}
