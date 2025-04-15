import { Link } from "@tanstack/react-router";
import { TableCell, TableRow } from "../ui/table";
import { Tables } from "@/services/supabase/supabaseTypes";

export default function EngRelTableRow({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  function formatEngRelNumber(number: number) {
    return String(number).padStart(4, "0");
  }

  return (
    <TableRow>
      <TableCell>
        <Link
          className="underline"
          to="/projects/$projectId/eng-rels/$engRel"
          params={{
            projectId: engRel.project_id,
            engRel: `${engRel.project_id}-ER-${formatEngRelNumber(engRel.release_id)}`,
          }}
        >
          {engRel.project_id}-ER-{engRel.release_id}-
          {formatEngRelNumber(engRel.release_id)}{" "}
        </Link>
      </TableCell>
      <TableCell className="min-w-24 !max-w-36 !truncate">
        {engRel.title ?? "-"}
      </TableCell>
      <TableCell className="min-w-24 !max-w-36 !truncate">
        {engRel.description ?? "-"}
      </TableCell>
    </TableRow>
  );
}
