import InfoDialog from "@/components/info/InfoDialog";
import OpenIssuesCardInfo from "@/components/info/OpenIssuesCardInfo";
import ReleasesCardInfo from "@/components/info/ReleasesCardInfo";
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
  const infoProps = {
    title: "Releases Information",
    description: "About the Releases card.",
    content: <div>testing</div>,
  };
  return (
    <IndexStyling>
      <div className="flex flex-wrap w-full h-full items-stretch justify-around gap-4 pb-4">
        <div className="my-auto w-full">
          <ProjectTable data={projectData} error={error} />
        </div>
        <Card className="grow">
          <CardHeader className="px-4">
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4 items-center">RELEASES</div>
                <InfoDialog
                  type="info"
                  title={infoProps.title}
                  description={infoProps.description}
                >
                  <ReleasesCardInfo />
                </InfoDialog>
              </div>
            </CardTitle>
            <CardDescription>
              Overview of releases owned by you.
            </CardDescription>
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
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-4 items-center">
                  OPEN ISSUES
                </div>
                <InfoDialog
                  type="info"
                  title="Open Issues Information"
                  description="About the Open Issues card."
                >
                  <OpenIssuesCardInfo />
                </InfoDialog>
              </div>
            </CardTitle>
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
