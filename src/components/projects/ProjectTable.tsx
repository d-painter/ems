import { Tables } from "@/services/supabase/supabaseTypes";
import { Card, CardContent, CardTitle } from "../ui/card";

import { Link } from "@tanstack/react-router";
import AddProjectDialog from "./AddProjectDialog";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ProjectTableProps = {
  data: Tables<"projects">[] | null | undefined;
  error: Error | null;
};

export default function ProjectTable({ ...props }: ProjectTableProps) {
  const { data, error } = props;

  return (
    <Card className="w-full my-auto">
      <CardTitle className="pl-4">
        <div className="flex flex-row gap-4 items-center">
          PROJECTS
          <AddProjectDialog />
        </div>
      </CardTitle>
      <CardContent className="p-2">
        <Table>
          <TableHeader>
            <TableHead>Project</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Project Description</TableHead>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell>Error loading data</TableCell>
              </TableRow>
            ) : !data ? (
              <TableRow>
                <TableCell>
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell>No projects.</TableCell>
              </TableRow>
            ) : (
              data.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <Link
                      className="hover:underline"
                      to="/projects/$projectId/"
                      params={{ projectId: d.project_id }}
                    >
                      {d.project_id}
                    </Link>
                  </TableCell>
                  <TableCell>{d.project_title}</TableCell>
                  <TableCell>{d.project_description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
