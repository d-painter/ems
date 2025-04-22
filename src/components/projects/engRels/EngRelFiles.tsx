import CustomDropzone from "@/components/files/CustomDropzone";
import FileRow from "@/components/files/FileRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renameFile } from "@/services/docs/renameUpload";
import {
  useEngRelFiles,
  useUpdateEngRel,
} from "@/services/queries/engRelQueries";
import { supabase } from "@/services/supabase/supabaseClient";
import { Tables } from "@/services/supabase/supabaseTypes";
import { toast } from "sonner";

export default function EngRelFiles({
  engRel,
}: {
  engRel: Tables<"eng_rels">;
}) {
  const { data, error: retrievingEngRelFileError } = useEngRelFiles(
    engRel.file_ids
  );
  const updateEngRelMutation = useUpdateEngRel();

  if (retrievingEngRelFileError) {
    toast.error(
      "There was an error retrieving files associated with this release"
    );
  }

  async function handleFiles(files: File[]): Promise<void> {
    const renamedAcceptedFiles = files.map(
      (file) => new File([file], renameFile(file.name), { type: file.type })
    );
    const results = await uploadMultipleFiles(renamedAcceptedFiles);
    const newFileIds: string[] = [];
    if (!results?.length) {
      toast.error("There was an error, no files uploaded.");
    }
    results.forEach((r) => {
      if (r.data) {
        newFileIds.push(r.data?.id);
      }
    });
    let combinedFileIds: string[] = [];
    if (!engRel.file_ids?.length) {
      combinedFileIds = newFileIds;
    } else {
      combinedFileIds = [...engRel.file_ids, ...newFileIds];
    }
    await updateEngRelFiles(combinedFileIds);
  }

  async function updateEngRelFiles(combinedFileIds: string[]) {
    try {
      return await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { file_ids: combinedFileIds },
      });
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  async function uploadMultipleFiles(files: File[]) {
    try {
      const uploadPromises = Array.from(files).map((file) => {
        return supabase.storage
          .from(import.meta.env.VITE_SUPABASE_BUCKET_NAME as string)
          .upload(`private/${file.name}`, file);
      });
      const results = await Promise.all(uploadPromises);
      results.forEach((result, index) => {
        if (result.error) {
          console.error(
            `Error uploading file ${files[index].name}:`,
            result.error
          );
          toast.error(`Error uploading file ${files[index].name}`);
        } else {
          toast.success(`File ${files[index].name} uploaded successfully.`);
        }
      });
      return results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function deleteFile(fileId: string): Promise<void> {
    const filteredIds: string[] = engRel.file_ids!.filter((f) => f !== fileId);

    try {
      await updateEngRelMutation.mutateAsync({
        columnToMatch: "id",
        matchValue: engRel.id,
        updates: { file_ids: filteredIds },
      });
    } catch (error) {
      // TODO: individual error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("There was an error completing this task.");
      }
    }
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-xl">
      <div className="flex items-center my-auto min-h-10 gap-4">FILES</div>
      <CustomDropzone handleFiles={handleFiles} />
      <div>
        <Table>
          <TableHeader>
            <TableRow className="text-left">
              <TableHead className="text-left"></TableHead>
              <TableHead>Document</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length ? (
              data.map((f) => (
                <FileRow key={f.id} file={f} deleteFile={deleteFile} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={100}>
                  No files associated with this project.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
