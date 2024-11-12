import { existsSync, unlinkSync } from "fs";

const cleanupFile = (filePath: string) => {
  if (existsSync(filePath)) unlinkSync(filePath);
};

export default cleanupFile;