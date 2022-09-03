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
  if (w > h) {
    // 横板
    return [l, s];
  } else {
    // 竖版
    return [s, l];
  }
}

/**
 * 图片添加水印
 * @param  { string } inputPath 输入路径
 * @param  { string } outputPath 输出路径
 * @param  { object } fontConfig 字体样式，属性一个也不能缺
 */
function remarkImage(inputPath, outputPath, fontConfig) {
  return new Promise((resolve, reject) => {
    const {
      font, // 字体文件
      txt, // 文本
      size, // 字体大小
      x, // x轴偏移
      y, // y轴偏移
      gravity, // 方位 NorthWest|North|NorthEast|West|Center|East|SouthWest|South|SouthEast
      strokeWidth, // 描边宽度
      strokeColor, // 描边颜色
      fillColor, // 填充颜色
    } = fontConfig;
    if (
      font === undefined ||
      txt === undefined ||
      size === undefined ||
      x === undefined ||
      y === undefined ||
      gravity === undefined ||
      strokeWidth === undefined ||
      strokeColor === undefined ||
      fillColor === undefined
    ) {
      reject("fontConfig 有误");
    }

    gm(inputPath) //指定添加水印的图片
      .stroke(strokeColor, strokeWidth)
      .fill(fillColor) //字体内围颜色（不设置默认为黑色）
      .font(font, size) //字库所在文件夹和字体大小
      .drawText(x, y, txt, gravity)
      .write(outputPath, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(outputPath);
        }
      });
  });
}

module.exports = exports = {
  getImageSize,
  resizeImage,
  getSizeConfig,
  remarkImage,
};
