import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";

const supabase = supabaseClient;

// Queries
// Get all engineering releases for a project
async function fetchProjectEngRels(
  projectId: string
): Promise<Tables<"eng_rels">[] | null> {
  const { data } = await supabase
    .from("eng_rels")
    .select("*")
    .eq("project_id", projectId)
    .throwOnError();
  return data as Tables<"eng_rels">[];
}

export function useProjectEngRels(projectId: string) {
  return useQuery({
    queryKey: ["allProjectEngRels", projectId],
    queryFn: () => fetchProjectEngRels(projectId),
  });
}

// Mutations
// Add a new engineering release
export function useAddNewEngRel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewEngRel,
    onError: (error) => {
      throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjectEngRels"] });
    },
  });
}
async function addNewEngRel(engRel: {
  project_id: string;
  release_id: number;
}) {
  const { data } = await supabase
    .from("eng_rels")
    .insert(engRel)
    .select()
    .throwOnError();

  return data[0] as Tables<"eng_rels">;
}
