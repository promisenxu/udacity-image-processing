import fs from "fs";

export const checkIfFileExist = async (filepath: string): Promise<boolean> => {
  return await new Promise<boolean>((resolve): void => {
    fs.access(filepath, fs.constants.F_OK, (err): void => {
      resolve(!err);
    });
  });
};
