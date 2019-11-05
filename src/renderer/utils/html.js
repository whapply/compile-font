import { getAppPath, writeFile, copyFile } from "./file";
import { compile } from "./shell";
const fsExtra = require("fs-extra");

const path = require("path");

export function htmlHeade(textArr) {
  const style = getStyle(textArr);
  const htmlHeade = `<head>
  <style>
    ${style}
  </style>
</head>`;
  return htmlHeade;
}

function getStyle(fontArr) {
  // const fontPath = getAppPath();
  let css = "";
  fontArr.map(item => {
    // const ttfUrl = path.join(fontPath, item.type + ".ttf");
    // const ttfUrl = `${item.type}`;
    css += `
     @font-face {
         font-family: '${item.type}';
         src: url('./font/${item.type}.eot');
         src: url('./font/${item.type}.eot?#fonts-spider') format('embedded-opentype'), url('./font/${item.type}.woff') format('woff'), url('./font/${item.type}.ttf') format('truetype'), url('./font/${item.type}.svg') format('svg');
         font-weight: normal;
         font-style: normal;
       }
       .${item.type} {
         font-family: ${item.type};
       }
    `;
  });
  return css;
}
export function getBody(textArr) {
  const content = getBodyContent(textArr);

  const htmlHeade = `<body>
    ${content}
</body>`;
  return htmlHeade;
}

function getBodyContent(textArr) {
  let content = "";
  textArr.map(item => {
    content += `<div class="${item.type}">
      ${item.value}
    </div>`;
  });
  return content;
}

export function fillHtml(textArr) {
  return new Promise(reslove => {
    const heade = htmlHeade(textArr);
    const body = getBody(textArr);
    const html = heade + body;
    copyFont(textArr, html);
    reslove();
  });
}

function copyFont(textArr, html) {
  const htmlDirPath = getAppPath("fontHtml");
  fsExtra.emptyDir(htmlDirPath, err => {
    if (!err) {
      const entryFontDirPath = getAppPath("fontFile");
      const outFontDirPath = path.join(htmlDirPath, "font");
      for (let x = 0; x < textArr.length; x++) {
        const fontPath = path.join(entryFontDirPath, `${textArr[x].type}.ttf`);
        copyFile(fontPath, `${outFontDirPath}/${textArr[x].type}.ttf`);
      }
      createHtml(html);
    }
  });
}

function createHtml(html) {
  const htmlDirPath = getAppPath("fontHtml");
  fsExtra.ensureDirSync(htmlDirPath);
  const compileFoteHtml = path.join(htmlDirPath, "index13.html"); //
  writeFile(compileFoteHtml, html)
    .then(() => {
      // 开始执行编译脚本
      compile(compileFoteHtml);
    })
    .catch(err => {
      console.log(err);
    });
}
