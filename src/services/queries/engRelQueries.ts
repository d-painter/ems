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

async function getEngRelFiles(fileIds: string[] | null) {
  if (!fileIds) {
    return [];
  }
  const { data, error } = await supabase.storage
    .from("ems-eng-rel-docs")
    .list("private");
  if (error) {
    console.error("Error fetching items:", error);
  }
  if (!data?.length) {
    return data;
  }
  const filteredData = data.filter((d) => fileIds.includes(d.id));
  return filteredData;
}

export function useEngRelFiles(fileIds: string[] | null) {
  return useQuery(allEngRelFilesQuery(fileIds));
}
function allEngRelFilesQuery(fileIds: string[] | null) {
  return {
    queryKey: ["allEngRelFiles", fileIds],
    queryFn: () => getEngRelFiles(fileIds),
  };
}

// Get Public Files
export function usePublicFiles() {
  return useQuery({ queryFn: getPublicFiles, queryKey: ["allPublicFiles"] });
}

async function getPublicFiles() {
  const { data, error } = await supabase.storage.from("general").list();
  if (error) {
    console.error(error);
  }
  return data;
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
  title?: string;
  description?: string;
}) {
  const { data } = await supabase
    .from("eng_rels")
    .insert(engRel)
    .select()
    .throwOnError();

  return data[0] as Tables<"eng_rels">;
}

// Update an engineering release
export function useUpdateEngRel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEngRel,
    onError: (error) => {
      throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allProjectEngRels"] });
    },
  });
}

type UpdateEngRelParams = {
  columnToMatch: string;
  matchValue: number;
  updates: { [key: string]: string | string[] };
};

async function updateEngRel({ ...params }: UpdateEngRelParams) {
  const { columnToMatch, matchValue, updates } = { ...params };

  const { data } = await supabase
    .from("eng_rels")
    .update(updates)
    .eq(columnToMatch, matchValue)
    .select()
    .throwOnError();

  return data as Tables<"eng_rels">[];
}
