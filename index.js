const gm = require("gm").subClass({
  imageMagick: true,
});

/** 获取图片大小
 * @param  { string } filePath 文件路径
 * @return { promise }
 */
function getImageSize(filePath) {
  return new Promise((resolve, reject) => {
    gm(filePath).size((err, size) => {
      if (err) {
        reject(err);
      } else {
        resolve(size);
      }
    });
  });
}

// 调整图片大小
/**
 * @param  { string } inputPath 输入路径
 * @param  { string } outputPath 输出路径
 * @param  { array } sizeConfig [宽,高]
 * @return { promise }
 */
function resizeImage(inputPath, outputPath, sizeConfig) {
  return new Promise((resolve, reject) => {
    gm(inputPath)
      .resize(sizeConfig[0], sizeConfig[1], "!")
      .write(outputPath, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(outputPath);
        }
      });
  });
}

/** 判定图片版式，配置输出宽高
 * @param  { number } l
 * @param  { number} s
 * @param  { number} w
 * @param  { number } h
 * @return { array }
 */
function getSizeConfig(l, s, w, h) {
  if (w > h) {// 横板
    return [l, s];
  } else {// 竖版
    return [s, l];
  }
}

module.exports = exports = {
  getImageSize,
  resizeImage,
  getSizeConfig
}