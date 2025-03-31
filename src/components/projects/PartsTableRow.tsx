import { AllProjectPartTableRows } from "@/services/queries/partsQueries";
import { EyeIcon, Pen, Trash } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

export default function PartsTableRow({
  part: p,
}: {
  part: AllProjectPartTableRows;
}) {
  function formatPartNumber(number: number) {
    return String(number).padStart(4, "0");
  }

  return (
    <TableRow>
      <TableCell className="w-10 md:w-max">
        {p.project_id}-{p.sub_system}-{formatPartNumber(p.part_number)}
      </TableCell>
      <TableCell>{p.description}</TableCell>
      <TableCell className="hidden md:table-cell md:align-middle">
        Created By
      </TableCell>
      <TableCell className="hidden md:table-cell md:align-middle">
        Created Date
      </TableCell>
      <TableCell>
        <EyeIcon className="size-5" />
      </TableCell>
      <TableCell>
        <Pen className="size-5" />
      </TableCell>
      <TableCell>
        <Trash className="size-5" />
      </TableCell>
    </TableRow>
  );
}
