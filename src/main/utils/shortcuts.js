const electronLocalshortcut = require("electron-localshortcut");
export default function setShortsCut(mainWindow) {
  electronLocalshortcut.register(mainWindow, "CmdOrCtrl+K", () => {
    if (mainWindow != null) {
      mainWindow.openDevTools();
    }
  });
}
