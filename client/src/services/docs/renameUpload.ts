export function renameFile(fileName: string, type?: "removeUnique") {
  const deliminator = "---";
  if (type === "removeUnique") {
    return fileName.split(deliminator)[1];
  } else {
    return `${+new Date()}${deliminator}${fileName}`;
  }
}
