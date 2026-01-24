import ProjectTable from "@/components/projects/ProjectTable";
import IndexStyling from "@/components/ui/layout/IndexStyling";
import { useAdditionalUserContext } from "@/Context/AdditionalUserContext";
import {
  useAllProjects,
} from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/")({
  component: ProjectPage,
});

function ProjectPage() {
  const { org_uuid } = useAdditionalUserContext();

  const { error, data: projectData } = useAllProjects(org_uuid!);

  return (
    <IndexStyling>
      <ProjectTable data={projectData} error={error} />
    </IndexStyling>
  );
}
