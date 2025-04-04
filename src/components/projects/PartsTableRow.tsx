import { AllProjectPartTableRows } from "@/services/queries/partsQueries";
import { TableCell, TableRow } from "../ui/table";
import EditPartDialog from "./EditPartDialog";

export default function PartsTableRow({
  part: p,
}: {
  part: AllProjectPartTableRows;
}) {
  function formatPartNumber(number: number) {
    return String(number).padStart(4, "0");
  }

  const createdDate = new Date(p.created_date!);
  const isT = () => p.sub_system === "T" && p.part_number === 9000;
  return (
    <TableRow>
      <TableCell className="pl-4">
        {p.project_id}-{p.sub_system}-{formatPartNumber(p.part_number)}
      </TableCell>
      <TableCell className="min-w-24 !max-w-36 !truncate">
        {p.description}
      </TableCell>
      <TableCell className="max-sm:hidden">Created By</TableCell>
      <TableCell className="max-sm:hidden">
        {createdDate.toLocaleDateString()}
      </TableCell>
      <TableCell className="!max-w-16 md:max-w-8 p-0 text-center">
        <EditPartDialog id={p.id} description={p.description} isT={isT()} />
      </TableCell>
    </TableRow>
  );
}
