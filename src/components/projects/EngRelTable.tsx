import { Tables } from "@/services/supabase/supabaseTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EngRelTableRow from "./EngRelTableRow";
import { useParams } from "@tanstack/react-router";

export default function EngRelTable({
  engRels,
}: {
  engRels: Tables<"eng_rels">[] | null | undefined;
}) {
  const { projectId } = useParams({ strict: false });

  return (
    <div className="w-full h-full max-w-4xl overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="text-left">
            <TableHead className="text-left">Release</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!engRels?.length ? (
            <TableRow>
              <TableCell colSpan={100}>
                No Engineering Releases for this project.{" "}
                {projectId === "P002" &&
                  "We suggest creating the first release using the button located in the info popup window."}

              </TableCell>
            </TableRow>
          ) : (
            engRels
              .sort((a, b) => a.release_id - b.release_id)
              .map((e, i) => <EngRelTableRow engRel={e} key={i} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}
