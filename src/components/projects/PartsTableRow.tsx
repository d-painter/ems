import { AllProjectPartTableRows } from "@/services/queries/partsQueries";
import { TableCell, TableRow } from "../ui/table";
import EditPartDialog from "./EditPartDialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Link } from "@tanstack/react-router";

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
  const fullPartNumber = `${p.project_id}-${p.sub_system}-${formatPartNumber(p.part_number)}`;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TableRow>
          <TableCell className="pl-4 max-md:underline hover:underline hover:cursor-pointer">
            <Link to={"/parts/$partId/"} params={{ partId: fullPartNumber }}>
              {fullPartNumber}
            </Link>
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
      </ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        <ContextMenuLabel className="font-bold">Copy</ContextMenuLabel>
        <ContextMenuItem
          onClick={() =>
            void navigator.clipboard.writeText(
              `${p.project_id}-${p.sub_system}-${formatPartNumber(p.part_number)}-01A - ${p.description}`
            )
          }
        >
          {`${p.project_id}-${p.sub_system}-${formatPartNumber(p.part_number)}-01A - ${p.description}`}{" "}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
