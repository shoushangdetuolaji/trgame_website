const axios = require("axios");
const path = require("path");
const fs = require("fs");

// 图片的前缀资源路径
const BASE_IMG_URL = "";
// 要爬取的css文件
const cssUrl = "";
const outputDir = "./downloads";

async function downloadImagesFromCss() {
  try {
    // 检查输出目录是否存在，如果不存在则创建
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // 1. 获取 CSS 文件内容
    const cssResponse = await axios.get(cssUrl);
    const cssContent = cssResponse.data;

    // 2. 解析 CSS 文件内容，找到所有的 background 属性
    // const backgroundUrls = cssContent.match(/background: url\(['"]?([^'")]+)['"]?\)/gi);

    // 使用正则表达式匹配 CSS 中的 url 链接
    const regex = /background:\s*url\(['"]?([^'"\)]+)['"]?\)/g;
    let match;
    const urls = [];

    while ((match = regex.exec(cssContent)) !== null) {
      // 去掉前面2个点 和 后面的参数
      let imageUrl = match[1].replace(/^(\.\.[/\/])+/, "").split("?")[0];
      // 去掉参数
      urls.push({
        url: BASE_IMG_URL + imageUrl,
        imageName: imageUrl,
      });
    }
    // 3. 下载每个图片，并保存到本地
    for (const item of urls) {
      // const imageName = path.basename(item.imageName); // 这是文件名 images/popup/bg_youtube.png => bg_youtube.png
      const imagePath = path.join(outputDir, item.imageName); // outputDir 是 下载文件目录， 第二个参数是文件名
      // 如果输出目录中不存在该文件夹，则创建
      if (!fs.existsSync(path.dirname(imagePath))) {
        // path.dirname(imagePath) => downloads\images\section02-item\ 获取目录
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      }

      const imageResponse = await axios.get(item.url, {
        responseType: "stream",
      });

      imageResponse.data.pipe(fs.createWriteStream(imagePath));

      console.log(`Downloaded ${item.imageName}`);
    }

    console.log("All images downloaded successfully.");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

downloadImagesFromCss();
