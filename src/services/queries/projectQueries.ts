import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase as supabaseClient } from "../supabase/supabaseClient";
import { Tables } from "../supabase/supabaseTypes";
import { toast } from "sonner";

const supabase = supabaseClient;

// Queries
// Get all projects
async function fetchProjects(): Promise<Tables<"projects">[] | null> {
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
  const { data, error } = await supabase.from("projects").insert(project).select();
  if (error) {
    throw error;
  }
  return data as Tables<"projects">[]
}
