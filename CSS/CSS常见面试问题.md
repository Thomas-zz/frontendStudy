# CSS 经典布局问题

## 一、让一个元素水平垂直居中，到底有多少种方案？

### 水平居中

1. 对于行内元素：text-align:center
2. 对于宽度已知的块级元素：
   1. margin: 0 auto;
   2. 绝对定位：left:50%; transform: translateX(-50%);
3. 对于宽度未知的块级元素：
   1. 绝对定位+transformX()
   2. 子元素设置 inline-block，父元素 text-align:center。可实现多个子元素水平居中
   3. 使用 table 标签配合 margin 左右 auto 实现水平居中。或将块级元素设置为 display: table
   4. flex 布局,父元素设置 display:flex;justify-content:center;
      - 设置 display:flex 容器被渲染为一个块级元素，其内部元素都会变为 flex 项目
      - 设置 display:inline-flex 容器被渲染为一个行内元素

### 垂直居中

1. 绝对定位
   1. 绝对定位+transform()
   2. 绝对定位+margin:将元素的 top 和 left 属性都设为 50%，再利用 margin 边距，将元素回拉它本身高宽的一半
   3. 绝对定位+margin：top,bottom,left,right 都设为 0，margin:auto
2. 弹性布局 flex：
   1. 父元素设置 display:flex;子元素设置 margin:auto 实现自适应居中
   2. 父元素设置 display:flex;子元素设置 align-items: center;
3. 纯文字的文本居中：line-height = 元素高度
4. table 布局，当要被居中的元素为内联元素或 display:table-cell 的元素时，可以将父级元素设置为 display:table-cell，配合 text-align:center 和 vertical-align:middle 实现子元素水平垂直居中

## 二、浮动布局的优缺点

**优点**
图文混排的时候可以让文字环绕在图片周围，且元素有着块级元素的性质

- 与 inline-block 的区别
  - 第一个就是关于横向排序的时候，float 可以设置方向而 inline-block 方向是固定的；
  - 还有一个就是 inline-

**缺点**
元素会脱离文档流，无法撑起父元素，造成父元素高度塌陷

清除浮动的方式：

1. 添加额外标签

```js
<div class="parent">
    //添加额外标签并且添加clear属性
    <div style="clear:both"></div>
    //也可以加一个br标签
    <br>
</div>
```

2. 父级给定高度
3. 设置 overflow:hidden(推荐);
   原理：BFC

```js
<div class="parent" style="overflow:hidden">
  //auto 也可以 //将父元素的overflow设置为hidden
  <div class="f"></div>
</div>
```

4. 设置伪类(推荐)

```js
//在css中添加:after伪元素
.parent:after{
    /* 设置添加子元素的内容是空 */
      content: '';
      /* 设置添加子元素为块级元素 */
      display: block;
      /* 设置clear：both */
      clear: both;

// 以上三句必须写

      /* 设置添加的子元素的高度0 */
      height: 0;
      /* 设置添加子元素看不见 */
      visibility: hidden;

}
<div class="parent">
    <div class="f"></div>
</div>

```

## 三、 使用 display:inline-block 会产生什么问题？解决方法？

### 问题复现

问题: 两个 display：inline-block 元素放到一起会产生一段空白。

如代码:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      .container {
        width: 800px;
        height: 200px;
      }

      .left {
        font-size: 14px;
        background: red;
        display: inline-block;
        width: 100px;
        height: 100px;
      }

      .right {
        font-size: 14px;
        background: blue;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        左
      </div>
      <div class="right">
        右
      </div>
    </div>
  </body>
</html>
复制代码
```

效果如下:

![img](E:\frontendStudy\CSS\CSS常见面试问题.assets\16dc2f7d81886473)

### 产生空白的原因

元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据 CSS 中 white-space 属性的处理方式（默认是 normal，合并多余空白），原来`HTML代码中的回车换行被转成一个空白符`，在字体不为 0 的情况下，空白符占据一定宽度，所以 inline-block 的元素之间就出现了空隙。

### 解决办法

#### 1. 将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行

```
<div class="container">
  <div class="left">
      左
  </div><div class="right">
      右
  </div>
</div>
复制代码
```

#### 2. 父元素中设置 font-size: 0，在子元素上重置正确的 font-size

```
.container{
  width:800px;
  height:200px;
  font-size: 0;
}
复制代码
```

#### 3. 为子元素设置 float:left

```
.left{
  float: left;
  font-size: 14px;
  background: red;
  display: inline-block;
  width: 100px;
  height: 100px;
}
//right是同理
```

## 四、布局题：div 垂直居中，左右 10px，高度始终为宽度一半

> 问题描述: 实现一个 div 垂直居中, 其距离屏幕左右两边各 10px, 其高度始终是宽度的 50%。同时 div 中有一个文字 A，文字需要水平垂直居中。

### 思路一：利用height:0; padding-bottom: 50%;

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      html, body {
        height: 100%;
        width: 100%;
      }
      .outer_wrapper {
        margin: 0 10px;
        height: 100%;
        /* flex布局让块垂直居中 */
        display: flex;
        align-items: center;
      }
      .inner_wrapper{
        background: red;
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 50%;
      }
      .box{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="outer_wrapper">
      <div class="inner_wrapper">
        <div class="box">A</div>
      </div>
    </div>
  </body>
</html>
复制代码
```

强调两点:

1. padding-bottom究竟是相对于谁的？

答案是相对于`父元素的width值`。

那么对于这个out_wrapper的用意就很好理解了。 CSS呈流式布局，div默认宽度填满，即100%大小，给out_wrapper设置margin: 0 10px;相当于让左右分别减少了10px。

2. **父元素相对定位，那绝对定位下的子元素宽高若设为百分比，是相对谁而言的？**

相对于父元素的(content + padding)值, 注意不含border

> 延伸：如果子元素不是绝对定位，那宽高设为百分比是相对于父元素的宽高，标准盒模型下是content, IE盒模型是content+padding+border。

### 思路二: 利用calc和vw
- calc() 函数用于动态计算长度值
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        width: 100%;
        height: 100%;
      }

      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .box {
        margin-left: 10px;
        /* vw是视口的宽度， 1vw代表1%的视口宽度 */
        width: calc(100vw - 20px);
        /* 宽度的一半 */
        height: calc(50vw - 10px);
        position: absolute;
        background: red;
        /* 下面两行让块垂直居中 */
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="box">A</div>
    </div>
  </body>
</html>
```

## 五、什么是BFC？什么条件下会触发？渲染规则？应用场景有哪些？

### 1.什么是BFC？

> W3C对BFC的定义如下： 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为"visiable"的块级盒子，都会为他们的内容创建新的BFC（Block Fromatting Context， 即块级格式上下文）。

### 2.触发条件

一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可： 下列方式会创建块格式化上下文：

- 根元素()
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素 -弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素） 等等。

### 3.BFC渲染规则

（1）BFC垂直方向边距重叠

（2）BFC的区域不会与浮动元素的box重叠

（3）BFC是一个独立的容器，外面的元素不会影响里面的元素

（4）计算BFC高度的时候浮动元素也会参与计算

### 4.应用场景

#### 1. 防止浮动导致父元素高度塌陷

#### 2. 避免外边距重叠

>  部分参考
>
> 作者：神三元
> 链接：https://juejin.cn/post/6844903962529759239
> 来源：掘金