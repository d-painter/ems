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

export default function EngRelTable({
  engRels,
}: {
  engRels: Tables<"eng_rels">[] | null | undefined;
}) {
  return (
    <div className="w-[95%] sm:w-[550px]">
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
                No Engineering Releases for this project.
              </TableCell>
            </TableRow>
          ) : (
            engRels.map((e, i) => <EngRelTableRow engRel={e} key={i} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}
