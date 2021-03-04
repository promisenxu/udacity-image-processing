import fs from "fs";

export const checkIfFileExist = async (filepath: string) => {
  return await new Promise<boolean>((resolve) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
};
