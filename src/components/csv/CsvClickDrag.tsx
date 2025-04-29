import { useCSVReader, formatFileSize } from "react-papaparse";
import type { ParseResult } from "papaparse";

export default function CsvClickDrag({
  csvPartsFromFile,
}: {
  csvPartsFromFile: (results: ParseResult<string[]>) => Promise<void>;
}) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: ParseResult<string[]>) => {
        void csvPartsFromFile(results);
      }}
    >
      {({ getRootProps, acceptedFile, getRemoveFileProps, Remove }: any) => (
        <>
          <div
            className="items-center border-2 h-10 w-64 text-sm border-dashed bg-secondary p-2 flex flex-col justify-center hover:bg-secondary hover:cursor-pointer"
            {...getRootProps()}
          >
            {acceptedFile ? (
              <>
                <div className="p-1 h-8 w-full flex flex-col items-center justify-center gap-4 hover:cursor-default rounded-sm bg-primary relative">
                  <div className="items-center flex flex-col p-2.5">
                    <span className="rounded-sm text-xs text-white mb-0.5 text-nowrap">
                      {acceptedFile.name}
                    </span>
                    <span className="rounded-sm flex text-white text-xs justify-center">
                      {formatFileSize(acceptedFile.size)}
                    </span>
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    className="h-6 absolute -right-1.5 -top-1.5 w-6 hover:cursor-pointer"
                  >
                    <Remove color={"#A01919"} />
                  </div>
                </div>
              </>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}
