import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";
import { toast } from "sonner";

const supabase = supabaseClient;
const apiUrl = import.meta.env.DEV
  ? "http://localhost:3010"
  : (import.meta.env.VITE_RENDER_API_URL as string);

// Queries

//Get all parts
export function allPartsQuery(org_uuid: string, project_id: string) {
  return {
    queryKey: ["All parts", org_uuid, project_id],
    queryFn: () => fetchAllParts(org_uuid, project_id),
  };
}

async function fetchAllParts(
  org_uuid: string,
  project_id: string
): Promise<Tables<"part_numbers">[]> {
  const response = await fetch(`${apiUrl}/api/parts/${org_uuid}/${project_id}`);
  const { data, error } = (await response.json()) as {
    data: Tables<"part_numbers">[];
    error: string | null;
  };
  if (error) {
    throw new Error(error);
  } else {
    return data;
  }
}

export function useAllParts(org_uuid: string, project_id: string) {
  return useQuery(allPartsQuery(org_uuid, project_id));
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
  parts: Omit<Tables<"part_numbers">, "id" | "owner_id" | "created_date">[]
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
