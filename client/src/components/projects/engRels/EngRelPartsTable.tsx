import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ParsedCsvPartParams } from "@/services/csv/ernData";

export default function EngRelPartsTable({
  parts,
}: {
  parts: ParsedCsvPartParams[] | undefined;
}) {
  if (!parts?.length) {
    return (
      <>
        <div>No parts associated with this release.</div>
      </>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-0">Part Number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td]:!text-xs">
          {parts.map((p, i) => (
            <TableRow key={i} className="pl-4">
              <TableCell className="text-left pl-0">{p.partNumber}</TableCell>
              <TableCell className="min-w-24 !max-w-36 !truncate">
                {p.description}
              </TableCell>
              <TableCell className=" !max-w-36 !truncate">
                {p.qty}
              </TableCell>
              <TableCell className="min-w-24 !max-w-36 !truncate">
                {p.Supplier}
              </TableCell>
              <TableCell className="min-w-24 !max-w-36 !truncate">
                {p.BomItemType}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
