import { getAppPath, removeFile } from "./file";

import { zip } from "./zip";
import { remote } from "electron";
import { ipcRenderer } from "electron";

const path = require("path");

var cmd = require("node-cmd");

export function compile(fontHtmlPath) {
  // 开始编译
  cmd.get(`font-spider ${fontHtmlPath}`, () => {
    const compiledFondPath = getCompiledFondPath();
    const pristineFontFile = path.join(compiledFondPath, ".font-spider");
    //   删除字体源文件
    removeFile(pristineFontFile)
      .then(() => {
        zip(compiledFondPath, remote.app.getPath("downloads"))
          .then(() => {
            ipcRenderer.send("saveHistory");
            // saveHistory(textArr);
          })
          .catch(e => {
            console.log("zip fail", e);
          });
      })
      .catch(e => {
        console.log("remove fail", e);
      });
  });
}

function getCompiledFondPath() {
  const htmlDirPath = getAppPath("fontHtml");
  const compiledFontPath = path.join(htmlDirPath, "font");
  return compiledFontPath;
}
