import { AllProjectPartTableRows } from "@/services/queries/partsQueries";
import PartsTableRow from "./PartsTableRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AddPartDialog from "./AddPartDialog";

type PartsTableProps = {
  main: AllProjectPartTableRows;
  assemblies: AllProjectPartTableRows[] | null;
  parts: AllProjectPartTableRows[] | null;
};

export default function PartsTable({ ...props }: PartsTableProps) {
  const { main, assemblies, parts } = { ...props };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="text-left">
            <TableHead className="text-left">Part Number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="max-sm:hidden">
              Created By
            </TableHead>
            <TableHead className="max-sm:hidden">Created Date</TableHead>
            <TableHead className="!max-w-16 !text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {main && <PartsTableRow part={main} />}

          <TableRow className="hover:bg-transparent border-b border-b-primary">
            <TableCell className="!text-xs pt-6">ASSEMBLIES</TableCell>
            <TableCell colSpan={100} className="pt-6">
              <AddPartDialog partType="assembly" main={main} />
            </TableCell>
          </TableRow>
          {!assemblies?.length ? (
            <TableRow className="border-b-transparent">
              <TableCell>No Assemblies </TableCell>
            </TableRow>
          ) : (
            assemblies.map((d, i) => <PartsTableRow part={d} key={i} />)
          )}
          <TableRow className="hover:bg-transparent border-b border-b-primary">
            <TableCell className="!text-xs pt-6">PARTS</TableCell>
            <TableCell colSpan={100} className="pt-6">
              <AddPartDialog partType="part" main={main} />
            </TableCell>
          </TableRow>
          {!parts?.length ? (
            <TableRow>
              <TableCell>No Parts</TableCell>
            </TableRow>
          ) : (
            parts?.map((d, i) => <PartsTableRow part={d} key={i} />)
          )}
        </TableBody>
      </Table>
    </>
  );
}
