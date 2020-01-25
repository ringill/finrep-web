import { lock, move, unlock } from "./mover";
import { resolve, join, dirname } from "path";
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from "fs";
import rimraf from "rimraf";

const testFileName = "file.test.txt";
const testFilePath = resolve(__dirname, testFileName);
const lockfilePath = `${testFilePath}.lock`;
const tempDir = join(dirname(testFilePath), "tmp");

/** create file (if not exists) */
const createFile = (path: string) => {
  if (!existsSync(path)) {
    writeFileSync(path, 'somedata', 'utf8');
  }
};

/** delete file (if exists) */
const deleteFile = (path: string) => {
  if (existsSync(path)) {
    unlinkSync(path);
  }
};

/** create dir (if not exists) */
const createDir = (path: string) => {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
};

/** delete dir (if exists) */
const deleteDir = (path: string) => {
  if (existsSync(path)) {
    rimraf.sync(path);
  }
};

/** delete all dirs and files used in tests */
const deleteAll = () => {
  // files
  [testFilePath, lockfilePath].forEach(path => {
    deleteFile(path);
  });
  // dirs
  [tempDir].forEach(path => {
    deleteDir(path);
  });
};

describe('Rename to .lock', () => {
  beforeEach(deleteAll);
  afterEach(deleteAll);

  it('rename to .lock-file (if file exists)', () => {
    createFile(testFilePath);
    return expect(lock(testFilePath)).resolves.toBe(`Success '${testFilePath}' moved to '${testFilePath}.lock'`);
  });

  it('throw err (if file not exists)', () => {
    const notExistsPath = "not exist path";
    return lock(notExistsPath)
      .catch(e => {
        expect(e).toMatch(`Can't find file '${notExistsPath}'`);
      });
  });

  it("move file to other folder", () => {
    createFile(testFilePath);
    createDir(tempDir);
    const resultPath = join(tempDir, testFileName);
    return expect(move(testFilePath, tempDir)).resolves.toBe(`Success '${testFilePath}' moved to '${resultPath}'`);
  });

  it("can`t move file to not exists folder", () => {
    createFile(testFilePath);
    const notExistsDir = "notExistsDir";
    return move(testFilePath, notExistsDir)
      .catch(e => {
        expect(e).toMatch(/no such file or directory/);
      });
  });

  it("rename to origin (remove .lock from filename", () => {
    createFile(lockfilePath);
    return expect(unlock(lockfilePath)).resolves.toBe(`Success '${lockfilePath}' moved to '${testFilePath}'`);
  });
});