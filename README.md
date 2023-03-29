# 超级跑跑

> 官网、活动页效果练习

- started on 2022/07/12

### 变动

- 2022/09/06 css文件通过sass处理了，不能直接扒，需要找源文件并美化
- [aos.js](https://michalsnik.github.io/aos/)   css3页面滚动动画插件
- 2023/03/29 gsap滚屏动画scroll https://greensock.com

### 更近

- 需要把项目scss工程化(最近有点忙，找个一天处理这个任务才行)

### 遇到的问题

1. aos配置麻烦看一下文档 class不需要配置aos样式，默认生效
   
   ```html
   <div
       class="section02" 
       data-aos="fade-in" 
       data-aos-duration="1000" 
       data-aos-delay="300" 
       data-aos-once="true">
   </div> <!-- √ -->
   
   <div
       class="section02 aos-init aos-animate" 
       data-aos="fade-in" 
       data-aos-duration="1000" 
       data-aos-delay="300" 
       data-aos-once="true">
   </div> <!-- × -->
   ```

2. display:inline-flex和flex的区别介绍
   
   > [CSS中flex和inline-flex的区别_早起的年轻人的博客-CSDN博客_inline-flex](https://blog.csdn.net/zl18603543572/article/details/108309273)

3. 
