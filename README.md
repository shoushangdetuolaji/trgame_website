# 超级跑跑

> 官网、活动页效果练习

- started on 2022/07/12

### 变动

- 2022/09/06 css文件通过sass处理了，不能直接扒，需要找源文件并美化
- [aos.js](https://michalsnik.github.io/aos/)   css3页面滚动动画插件

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
   
   
