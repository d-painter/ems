import InfoDialog from "@/components/info/InfoDialog";
import ReleaseCardInfo from "@/components/info/ReleaseCardInfo";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { releases } from "@/services/data/dashboardData";

export default function ReleaseOverview() {
  const projectReleases = releases;
  return (
    <Card className="max-md:w-full max-w-2xl grow">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
              RELEASE OVERVIEW
            </div>
            <InfoDialog
              type="info"
              title="Release Overview Information"
              description="About the Release Overview Card."
            >
              <ReleaseCardInfo />
            </InfoDialog>
          </div>
        </CardTitle>
        <CardDescription>Overview of Project Releases</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableHead>Release Title</TableHead>
            <TableHead>Req. Release Date</TableHead>
            <TableHead>Status</TableHead>
          </TableHeader>
          <TableBody>
            {projectReleases.map((r) => (
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
  );
}
