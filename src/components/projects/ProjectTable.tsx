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

type ProjectTableProps = {
  data: Tables<"projects">[] | null | undefined;
  error: Error | null;
};

export default function ProjectTable({ ...props }: ProjectTableProps) {
  const { data, error } = props;

  return (
    <Card className="w-[95%] p-6">
      <CardTitle className="pl-2">PROJECTS</CardTitle>
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
                  <DtData>{d.project_id}</DtData>
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
