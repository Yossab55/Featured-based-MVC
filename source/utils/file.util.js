import path from "path";
import fs from "fs";
// import { mkdir, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { appError } from "../error/app.error.js";
import { getStack } from "./helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDir = getMainDir(__dirname);
console.log(__filename, __dirname);

function getMainDir(dir) {
  if (fs.existsSync(path.join(dir, "package.json"))) {
    return dir;
  }
  const parent = path.resolve(dir, "..");
  if (parent == dir) return null; // we reached to the end and didn't find import
  return getMainDir(parent);
}

const joinPath = path.join;

function getExtensionName(filename) {
  const extension = path.extname(filename);
  if ((extension = "." || !extension)) {
    throw appError.custom(
      "filename doesn't hav extension",
      filename,
      "http://test",
      getStack(),
    );
  }

  return extension;
}
export { mainDir, joinPath, getExtensionName };
