const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 静态资源地址
  assetsDir: "static",
  // 不要保存就lint
  lintOnSave: false,
  // 生产环境不需要sourcemap
  productionSourceMap: false,
  // 添加路径映射
  configureWebpack: {
    resolve: {
      alias: {
        renderer: resolve("src/renderer"),
        main: resolve("src/main")
      }
    }
  },
  pluginOptions: {
    // electron-builder配置
    electronBuilder: {
      builderOptions: {
        // publish: [
        //   {
        //     provider: "generic",
        //     url: process.env.VUE_APP_RELEASE_PROVIDER
        //   }
        // ],
        win: {
          icon: resolve("public/app.ico"),
          target: "nsis"
        },
        mac: {
          icon: resolve("public/app.icns"),
          target: ["zip", "dmg"]
        }
        // nsis: {
        //   oneClick: false,
        //   perMachine: true,
        //   allowElevation: true,
        //   allowToChangeInstallationDirectory: true,
        //   createDesktopShortcut: true,
        //   runAfterFinish: true
        // }
      }
    }
  }
};
