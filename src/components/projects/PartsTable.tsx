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
            <TableHead className="!max-w-3">Description</TableHead>
            <TableHead className="hidden md:table-cell md:align-middle">
              Created By
            </TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="!max-w-16 !text-center">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {main && <PartsTableRow part={main} />}

          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={100}>ASSEMBLIES</TableCell>
          </TableRow>
          {!assemblies?.length ? (
            <TableRow>
              <TableCell>No Assemblies</TableCell>
            </TableRow>
          ) : (
            assemblies.map((d, i) => <PartsTableRow part={d} key={i} />)
          )}
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={100}>PARTS</TableCell>
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
