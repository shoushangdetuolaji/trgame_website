/**
 * 🔨 部分为别更的地方
 * 为什么要这么做，是因为nodejs的请求响应不到该网站，毕竟是外国网，所以一些asp内置的img标签属性连接只能人为去引入
 */
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const BASE_IMG_URL = 'https://tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/section03-item/'; // 🔨
const outputDir = './downloads';

const LEN = 12 // 🔨

async function downloadImagesFromCss() {
  try {
    // 检查输出目录是否存在，如果不存在则创建
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // https://tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/section03-item/item-07.png

    let urls = []
    for(var i = 1; i < LEN+1; i++) {
      if (i < 10) {
        i = '0'+i
      }
      urls.push({
        url: `${BASE_IMG_URL}item-${i}.png`, // 🔨
        imageName: `images/section03-item/item-${i}.png` // 🔨
      })
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
        responseType: 'stream'
      });

      imageResponse.data.pipe(fs.createWriteStream(imagePath));

      // console.log(`Downloaded ${imageName}`);
    }

    console.log('All images downloaded successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadImagesFromCss();
