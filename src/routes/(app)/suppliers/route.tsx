import InfoDialog from "@/components/info/InfoDialog";
import SupplierCardInfo from "@/components/info/SupplierCardInfo";
import SupplierTableRow from "@/components/supplier/SupplierTableRow";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import IndexStyling from "@/components/ui/layout/IndexStyling";
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
function RouteComponent() {
  const suppliers = supplierData;

  return (
    <IndexStyling>
      <Card className="w-full my-auto">
        <CardTitle className="px-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-4 items-center">SUPPLIERS</div>
            <InfoDialog
              type="info"
              title="Supplier Information"
              description="About the Supplier card."
            >
              <SupplierCardInfo />
            </InfoDialog>
          </div>
        </CardTitle>
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
    </IndexStyling>
  );
}
