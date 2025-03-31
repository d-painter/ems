import { Tables } from "@/services/supabase/supabaseTypes";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  DataTable,
  DataTableHead,
  DataTableBody,
  DtContentRow,
  DtData,
  DtHeader,
  DtHeaderRow,
} from "../ui/DataTable";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAddNewProject } from "@/services/queries/projectQueries";

type ProjectTableProps = {
  data: Tables<"projects">[] | null | undefined;
  error: Error | null;
};

export default function ProjectTable({ ...props }: ProjectTableProps) {
  const { data, error } = props;

  const addNewProjectMutation = useAddNewProject();

  const newProject = {
    owner_id: "94e826c2-78f3-4ce2-9ed9-d517c48eaaaa",
    project_description: "Test Desc",
    project_id: "P015",
    project_title: "P005 Title",
  };


  return (
    <Card className="w-[95%] p-6">
      <CardTitle className="pl-2">
        <div className="flex flex-row gap-4 items-center">
          PROJECTS
          <Button
            size={"sm"}
            onClick={() => addNewProjectMutation.mutateAsync(newProject)}
          >
            Add Project
          </Button>
        </div>
      </CardTitle>
      <CardContent className="rounded-lg border p-0">
        <DataTable>
          <DataTableHead>
            <DtHeaderRow>
              <DtHeader>Project</DtHeader>
              <DtHeader>Project Name</DtHeader>
              <DtHeader>Project Description</DtHeader>
            </DtHeaderRow>
          </DataTableHead>
          <DataTableBody>
            {error ? (
              <DtContentRow>
                <DtData>Error loading data</DtData>
              </DtContentRow>
            ) : !data ? (
              <DtContentRow>
                <DtData>Loading...</DtData>
              </DtContentRow>
            ) : data.length === 0 ? (
              <DtContentRow>
                <DtData>No projects.</DtData>
              </DtContentRow>
            ) : (
              data.map((d) => (
                <DtContentRow key={d.id}>
                  <DtData>
                    <Link
                      className="hover:underline"
                      to="/projects/$projectId"
                      params={{ projectId: d.project_id }}
                    >
                      {d.project_id}
                    </Link>
                  </DtData>
                  <DtData>{d.project_title}</DtData>
                  <DtData>{d.project_description}</DtData>
                </DtContentRow>
              ))
            )}
          </DataTableBody>
        </DataTable>
      </CardContent>
    </Card>
  );
}
