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
    <Card className="md:max-w-[500px] w-full">
      <CardHeader>
        <CardTitle>Release Overview</CardTitle>
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
