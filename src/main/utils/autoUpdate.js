import { ipcMain } from "electron";

const { autoUpdater } = require("electron-updater");
const feedUrl = process.env.VUE_APP_RELEASE_PROVIDER; // 更新包位置
export default function checkForUpdates(webContents) {
  autoUpdater.setFeedURL(feedUrl);
  autoUpdater.on("error", function(message) {
    sendUpdateMessage(webContents, "error", message);
  });
  autoUpdater.on("checking-for-update", function(message) {
    sendUpdateMessage(webContents, "checking-for-update", message);
  });
  autoUpdater.on("update-available", function(message) {
    sendUpdateMessage(webContents, "update-available", message);
  });
  autoUpdater.on("update-not-available", function(message) {
    sendUpdateMessage(webContents, "update-not-available", message);
  });

  autoUpdater.on("download-progress", function(progressObj) {
    sendUpdateMessage(webContents, "downloadProgress", progressObj);
  });
  // event,
  //   releaseNotes,
  //   releaseName,
  //   releaseDate,
  //   updateUrl,
  //   quitAndUpdate
  autoUpdater.on("update-downloaded", function() {
    sendUpdateMessage(webContents, "isUpdateNow");
    ipcMain.on("updateNow", () => {
      // e, arg
      autoUpdater.quitAndInstall();
    });
  });

  // 执行自动更新检查
  autoUpdater.checkForUpdates();
}

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage(webContents, message, data) {
  webContents.send("message", { message, data });
}
