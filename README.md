# 超级跑跑

> 官网、活动页效果练习

- started on 2022/07/12

### 变动

- 2022/09/06 css 文件通过 sass 处理了，不能直接扒，需要找源文件并美化
- [aos.js](https://michalsnik.github.io/aos/) css3 页面滚动动画插件
- 2023/03/29 gsap 滚屏动画 scroll https://greensock.com

### 更近

- 需要把项目 scss 工程化(最近有点忙，找个一天处理这个任务才行)

### 遇到的问题

1. aos 配置麻烦看一下文档 class 不需要配置 aos 样式，默认生效

   ```html
   <div
     class="section02"
     data-aos="fade-in"
     data-aos-duration="1000"
     data-aos-delay="300"
     data-aos-once="true"
   ></div>
   <!-- √ -->

   <div
     class="section02 aos-init aos-animate"
     data-aos="fade-in"
     data-aos-duration="1000"
     data-aos-delay="300"
     data-aos-once="true"
   ></div>
   <!-- × -->
   ```

2. display:inline-flex 和 flex 的区别介绍

   > [CSS 中 flex 和 inline-flex 的区别\_早起的年轻人的博客-CSDN 博客\_inline-flex](https://blog.csdn.net/zl18603543572/article/details/108309273)

3. 其实一些字体特性也挺屌的，如果原生字体可能 span 标签内的字体会塌陷，引入韩方的字体就不会出现这种问题
