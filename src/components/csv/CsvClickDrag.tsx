// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// @ts-expect-error because error

import { useCSVReader, formatFileSize } from "react-papaparse";

export default function CsvClickDrag() {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        console.log("---------------------------");
        console.log(results);
        console.log("---------------------------");
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div
            className="items-center border-2 border-dashed bg-secondary p-2 rounded-2xl flex flex-col justify-center hover:bg-secondary hover:cursor-pointer"
            {...getRootProps()}
          >
            {acceptedFile ? (
              <>
                <div className="p-1 size-28 flex flex-col items-center justify-center gap-4 hover:cursor-default bg-primary relative rounded-xl">
                  <div className="items-center flex flex-col px-2.5">
                    <span className="rounded-sm text-xs text-white mb-0.5 text-nowrap">
                      {acceptedFile.name}
                    </span>
                    <span className="rounded-sm flex text-white text-xs justify-center">
                      {formatFileSize(acceptedFile.size)}
                    </span>
                  </div>
                  <div className="min-h-3 px-2.5 w-full">
                    <ProgressBar />
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
