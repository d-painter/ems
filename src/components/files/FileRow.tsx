import type { FileObject } from "@supabase/storage-js";
import { TableCell, TableRow } from "../ui/table";
import { File, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "@/services/supabase/supabaseClient";
import { renameFile } from "@/services/docs/renameUpload";
import { toast } from "sonner";

type FileRowProps = {
  file: FileObject;
  deleteFile: (id: string) => Promise<void>;
};

export default function FileRow({ file: f, deleteFile }: FileRowProps) {
  async function showFile() {
    const { data, error } = await supabase.storage
      .from("ems-eng-rel-docs")
      .createSignedUrl(`private/${f.name}`, 3600);
    if (data) {
      setTimeout(() => {
        window.open(data.signedUrl, "_blank");
      });
    }
    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <File size={15} />
        </TableCell>
        <TableCell>
          <button
            className="hover:cursor-pointer hover:underline"
            onClick={() => void showFile()}
          >
            {renameFile(f.name, "removeUnique")}
          </button>
        </TableCell>
        <TableCell className="text-center items-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"xs"}
            onClick={() => void deleteFile(f.id)}
          >
            <div className="flex flex-row">
              <Trash size={15} />
            </div>

          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
