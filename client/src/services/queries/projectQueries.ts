import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";
import { toast } from "sonner";

const supabase = supabaseClient;

const apiUrl = import.meta.env.DEV
  ? "http://localhost:3010"
  : (import.meta.env.VITE_RENDER_API_URL as string);

// Queries
// Get all projects

type ResponseData = { data: Tables<"projects">[] | [], error: string | null };

async function fetchProjects(
  org_uuid: string
): Promise<Tables<"projects">[] | null> {
  const response = await fetch(`${apiUrl}/api/projects/${org_uuid}`);
  const {data, error}  = await response.json() as ResponseData;

  if (error) {
    throw new Error(error);
  } else {
    return data;
  }
}

export const allProjectsQuery = (org_uuid: string) => ({
  queryKey: ["allProjects", org_uuid],
  queryFn: () => fetchProjects(org_uuid),
});

export function useAllProjects(org_uuid: string) {
  return useQuery(allProjectsQuery(org_uuid));
}

// Mutations
// Add new project
export function useAddNewProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNewProject,
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
    onSuccess: async (_, variables) => {
      toast.success(
        `${variables.project_id}-${variables.project_description} added.`
      );
      await queryClient.invalidateQueries({ queryKey: ["allProjects"] });
    },
  });
}

type NewProjectProps = Omit<Tables<"projects">, "id" | "owner_id">;

async function addNewProject(project: NewProjectProps) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select();
  if (error) {
    throw error;
  }
  return data as Tables<"projects">[];
}
