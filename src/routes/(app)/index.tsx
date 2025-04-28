import ProjectTable from "@/components/projects/ProjectTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IndexStyling from "@/components/ui/layout/IndexStyling";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { releases } from "@/services/data/dashboardData";
import { useAllProjects } from "@/services/queries/projectQueries";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { error, data: projectData } = useAllProjects();

  const useReleases = releases;

  return (
    <IndexStyling>
      <div className="flex flex-wrap w-full h-full items-stretch justify-around gap-4 pb-4">
        <div className="my-auto w-full">
          <ProjectTable data={projectData} error={error} />
        </div>
        <Card className="grow">
          <CardHeader className="px-4">
            <CardTitle>RELEASES</CardTitle>
            <CardDescription>Overview of releases owned by you.</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <Table>
              <TableHeader>
                <TableHead>Release Title</TableHead>
                <TableHead>Req. Release Date</TableHead>
                <TableHead>Status</TableHead>
              </TableHeader>
              <TableBody>
                {useReleases.map((r) => (
                  <TableRow>
                    <TableCell>{r.title}</TableCell>
                    <TableCell>{r.reqReleaseDate}</TableCell>
                    <TableCell>{r.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="grow">
          <CardHeader className="px-4">
            <CardTitle>OPEN ISSUES</CardTitle>
            <CardDescription>Overview of issues owned by you.</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <Table>
              <TableHeader>
                <TableHead>Issue Title</TableHead>
                <TableHead>Req. Resolution Date</TableHead>
                <TableHead>Status</TableHead>
              </TableHeader>
              <TableBody>
              <TableRow>
                    <TableCell colSpan={100}>No current issues.</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </IndexStyling>
  );
}
