/**
 * 应用顶部的系统菜单设置
 */
import { app, Menu } from "electron";
import is from "electron-is";
// 初始化
export function init() {
  // 开发环境还是显示菜单
  if (is.dev()) {
    return;
  }
  // 隐藏菜单栏
  // 由于macOS的特殊性，顶部菜单栏无法删除，所以我们针对macOS特殊处理，把菜单栏只保留“关于”和“退出”
  if (is.macOS()) {
    const template = [
      {
        label: app.getName(),
        submenu: [
          {
            role: "about"
          },
          {
            role: "quit"
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}
