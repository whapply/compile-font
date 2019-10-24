const compressing = require("compressing");
export function zip(filePath, oupPath, fileName = "font") {
  return compressing.zip
    .compressDir(filePath, `${oupPath}/${fileName}.zip`)
    .then(() => {
      return "";
    })
    .catch(err => {
      console.error(err);
    });
}
