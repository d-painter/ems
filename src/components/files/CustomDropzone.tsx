import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function CustomDropzone({
  handleFiles,
}: {
  handleFiles: (files: File[]) => Promise<void>;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    void handleFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-full max-w-full overflow-hidden">
      <input {...getInputProps()} className="hidden"/>
      {isDragActive ? (
        <div className=" p-2 text-xs border-dashed border-2 border-primary hover:cursor-pointer h-12 flex items-center w-full">
          <p>Drop file to upload</p>
        </div>
      ) : (
        <div className="bg-secondary p-2 text-xs border-dashed border-2 hover:cursor-pointer h-12 flex items-center w-full">
          <p>Click or drop files to upload.</p>
        </div>
      )}
    </div>
  );
}
