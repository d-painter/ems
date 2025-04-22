import { Map } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { Supplier } from "@/services/data";

export default function SupplierTableRow({
  supplier: s,
}: {
  supplier: Supplier;
}) {
  const hasGoogleMapsLink = !!s.location;
  return (
    <TableRow>
      <TableCell>{s.name}</TableCell>
      <TableCell>
        <button
          disabled={!hasGoogleMapsLink}
          className={`underline  ${!hasGoogleMapsLink ? " hover:cursor-default text-black/30" : "hover:cursor-pointer"}`}
          onClick={() => window.open(s.location!, "_blank")}
        >
          <Map size={20} />
        </button>
      </TableCell>
      <TableCell>{s.type}</TableCell>
      <TableCell className="max-sm:hidden">{s.tags.length ? s.tags.join(", ") : "-"}</TableCell>
      <TableCell className="text-center">{s.rating}</TableCell>
    </TableRow>
  );
}
