import { renameSync, existsSync } from "fs";
import { dirname, basename, join } from "path";

const postfix = ".lock";

const moveAsync = (sourcePath: string, destinationPath: string): Promise<string> => {
  if (!existsSync(sourcePath)) {
    return Promise.reject(`Can't find file '${sourcePath}'`);
  }
  const promise = new Promise<string>((resolve, reject) => {
    try {
      renameSync(sourcePath, destinationPath);
      resolve(`Success '${sourcePath}' moved to '${destinationPath}'`);
    } catch (err) {
      reject(`Unable to move '${sourcePath}' to '${destinationPath}'. Error: '${err.message}'`)
    }
  });
  return promise;
}

export const lock = (filePath: string): Promise<string> => {
  return moveAsync(filePath, `${filePath}${postfix}`);
};

export const unlock = (filePath: string): Promise<string> => {
  const dir = dirname(filePath);
  const name = basename(filePath, postfix)
  const targetPath = join(dir, name);
  return moveAsync(filePath, targetPath);
};

export const move = (filePath: string, targetDir: string): Promise<string> => {
  const name = basename(filePath);
  const targetPath = join(targetDir, name);
  return moveAsync(filePath, targetPath);
};