import SupplierTableRow from "@/components/supplier/SupplierTableRow";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supplierData } from "@/services/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/suppliers")({
  component: RouteComponent,
});

const suppliers = supplierData;

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col p-2 justify-center items-center">
      <div className="w-full max-w-3xl">
        <Card>
          <CardTitle className="pl-4">SUPPLIERS</CardTitle>
          <CardContent className="px-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Map</TableHead>
                  <TableHead>Supplier Type</TableHead>
                  <TableHead className="max-sm:hidden">Tags</TableHead>
                  <TableHead className="text-center w-8">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!suppliers?.length ? (
                  <TableRow>
                    <TableCell colSpan={100}>No Suppliers</TableCell>
                  </TableRow>
                ) : (
                  suppliers.map((s) => (
                    <SupplierTableRow key={s.id} supplier={s} />
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
