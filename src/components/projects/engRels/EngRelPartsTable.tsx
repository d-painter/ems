import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tables } from "@/services/supabase/supabaseTypes";

export default function EngRelPartsTable({
  parts,
}: {
  parts: Tables<"part_numbers">[] | undefined;
}) {
  if (!parts?.length) {
    return (
      <div className="w-full space-y-2">
        <div>No parts associated with this release.</div>
      </div>
    );
  }
  return (
    <div className="w-96">
      <Table>
        <TableHeader>
          <TableRow className="text-left">
            <TableHead className="text-left">Part Number</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map((p, i) => (
            <TableRow key={i}>
                  <TableCell className="pl-4">
                    {p.project_id}-{p.sub_system}-{String(p.part_number).padStart(4,"0")}
                  </TableCell>
                  <TableCell className="min-w-24 !max-w-36 !truncate">
                    {p.description}
                  </TableCell>
                </TableRow>
          ))}     
        </TableBody>
      </Table>
    </div>
  );
}
