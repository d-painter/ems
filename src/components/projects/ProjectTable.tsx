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
import AddProjectDialog from "./AddProjectDialog";
import LoadingSpinner from "../ui/LoadingSpinner";

type ProjectTableProps = {
  data: Tables<"projects">[] | null | undefined;
  error: Error | null;
};

export default function ProjectTable({ ...props }: ProjectTableProps) {
  const { data, error } = props;

  return (
    <Card className="w-[95%] ">
      <CardTitle className="pl-4">
        <div className="flex flex-row gap-4 items-center">
          PROJECTS
          <AddProjectDialog />
        </div>
      </CardTitle>
      <CardContent className="p-2">
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
                <DtData>
                  <LoadingSpinner />
                </DtData>
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
                      to="/projects/$projectId/"
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
