const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");

import { remote } from "electron";

export function getAppPath(dirname = "fontFile") {
  const currPath = path.dirname(remote.app.getPath("exe"));
  const appPath = path.join(currPath, dirname); //
  return appPath;
}

export function getBasename(file, ext = ".ttf") {
  return path.basename(file, ext);
}

export function exitFiles(dirPath) {
  return fs.existsSync(dirPath);
}

export function readFiles(dirPath, cb) {
  const isExitDir = exitFiles(dirPath);
  if (isExitDir) {
    fs.readdir(dirPath, function(err, files) {
      if (err) {
        console.log("读取失败");
      } else {
        cb && cb(files);
      }
    });
  } else {
    cb && cb(false);
  }
}

export function writeFile(outFilePath, content) {
  return new Promise((reslove, reject) => {
    fs.writeFile(outFilePath, content, function(err) {
      console.log(err, "err write ");
      if (!err) {
        reslove();
      } else {
        console.log("writeFile", err);
        reject(err);
      }
    });
  });
}

export function copyFile(entryPath, outPath, options = {}) {
  try {
    fsExtra.copySync(entryPath, outPath, options);
  } catch (e) {
    console.log("copyFile fail", e);
  }
}

export function removeFile(path) {
  return fsExtra.remove(path);
}
