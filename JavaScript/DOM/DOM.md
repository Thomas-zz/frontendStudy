# DOM

## 浏览器环境，规格

主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。

下面是 JavaScript 在浏览器中运行时的鸟瞰示意图：

![image-20210426145400462](C:\Users\Mr.Zhang\AppData\Roaming\Typora\typora-user-images\image-20210426145400462.png)

window为“根”对象，是JavaScript代码的全队对象，也代表了“浏览器窗口”，并提供了控制它的方法

### 文档对象模型（DOM）

> 将所有页面内容表示为可以修改的对象。



### 浏览器对象模型（BOM）

> 表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象。



## DOM树

*HTML 文档的主干是标签（tag）。*

*根据文档对象模型（DOM），每个 HTML 标签都是一个对象。嵌套的标签是闭合标签的“子标签（children）”。标签内的文本也是一个对象。*

- 树的每个节点都是一个对象
- 标签被称为**元素节点**
- 元素内的文本形成**文本节点**，一个文本节点只包含一个字符串，且没有子项
  - 换行符和空格都是完全有效的字符，能够形成文本节点并成为DOM的一部分
  - 只有两个顶级排除项：
    1. 由于历史原因，`<head>` 之前的空格和换行符均被忽略。
    2. 如果我们在 `</body>` 之后放置一些东西，那么它会被自动移动到 `body` 内，并处于 `body` 中的最下方，因为 HTML 规范要求所有内容必须位于 `<body>` 内。所以 `</body>` 之后不能有空格。
- 按照DOM规范，表格必须有`<tbody>`,若没有，则浏览器创建DOM时会自从创建`<tbody>`
- 注释也会成为DOM的一部分



### 节点类型

一共有 [12 种节点类型](https://dom.spec.whatwg.org/#node)。实际上，我们通常用到的是其中的 4 种：

1. `document` — DOM 的“入口点”。
2. 元素节点 — HTML 标签，树构建块。
3. 文本节点 — 包含文本。
4. 注释 — 有时我们可以将一些信息放入其中，它不会显示，但 JS 可以从 DOM 中读取它。



### 遍历DOM

![image-20210426151033744](C:\Users\Mr.Zhang\AppData\Roaming\Typora\typora-user-images\image-20210426152216661.png)

**纯元素导航：**

![image-20210426152223010](C:\Users\Mr.Zhang\AppData\Roaming\Typora\typora-user-images\image-20210426152223010.png)



**最顶层的树节点可以直接作为 `document` 的属性来使用：**

- `<html>` = `document.documentElement`

  最顶层的 document 节点是 `document.documentElement`。这是对应 `<html>` 标签的 DOM 节点。

- `<body>` = `document.body`

  另一个被广泛使用的 DOM 节点是 `<body>` 元素 — `document.body`。

- `<head>` = `document.head`

  `<head>` 标签可以通过 `document.head` 访问。

> **这里有个问题：**`document.body` **的值可能是** `null`
>
> 脚本无法访问在运行时不存在的元素。
>
> 尤其是，如果一个脚本是在 `<head>` 中，那么脚本是访问不到 `document.body` 元素的，因为浏览器还没有读到它。



### 子节点

- **子节点（或者叫作子）** — 对应的是直系的子元素。换句话说，它们被完全嵌套在给定的元素中。例如，`<head>` 和 `<body>` 就是 `<html>` 元素的子元素。
- **子孙元素** — 嵌套在给定元素中的所有元素，包括子元素，以及子元素的子元素等。

#### 方法：

1. `childNodes` 集合列出了所有子节点，包括文本节点。
2. `firstChild` 和 `lastChild` 属性是访问第一个和最后一个子元素的快捷方式。
3. `elem.hasChildNodes()` 用于检查节点是否有子节点。

#### DOM集合

childNodes并不是数组，而是一个集合——一个类数组的可迭代对象

> DOM集合是**只读**的，是**实时**的

- 可使用for...of迭代
  - 不要用for...in，因为其循环遍历的是所有可枚举的属性
- 无法使用数组的方法，但可以使用Array.from方法从集合创建一个“真”数组

### 兄弟节点和父节点

下一个兄弟节点在 `nextSibling` 属性中，上一个是在 `previousSibling` 属性中。

可以通过 `parentNode` 来访问父节点。



### 表格

`<table>` 元素支持 (除了上面给出的，之外) 以下这些属性:

- table.rows — `<tr>` 元素的集合。
- table.caption/tHead/tFoot — 引用元素` <caption>，<thead>，<tfoot>`。
- table.tBodies — `<tbody> `元素的集合（根据标准还有很多元素，但是这里至少会有一个 — 即使没有被写在 HTML 源文件中，浏览器也会将其放入 DOM 中）。

`<thead>，<tfoot>，<tbody> `元素提供了 rows 属性：

- tbody.rows — 表格内部` <tr> `元素的集合。

`<tr>`：

- tr.cells — 在给定 `<tr> `中的 `<td> `和` <th> `单元格的集合。
- tr.sectionRowIndex — 给定的` <tr>` 在封闭的` <thead>/<tbody>/<tfoot> `中的位置（索引）。
- tr.rowIndex — 在整个表格中 `<tr>` 的编号（包括表格的所有行）。

`<td>` 和` <th>`：

- td.cellIndex — 在封闭的` <tr>` 中单元格的编号。



## getElement\*, querySelector\*

### querySelectorAll

它返回 `elem` 中与给定 CSS 选择器匹配的所有元素，可以使用任何 CSS 选择器，甚至伪类

```javascript
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

> **也可以使用伪类**
>
> CSS 选择器的伪类，例如 `:hover` 和 `:active` 也都是被支持的。例如，`document.querySelectorAll(':hover')` 将会返回鼠标指针现在已经结束的元素的集合（按嵌套顺序：从最外层 `<html>` 到嵌套最多的元素）。



### matches

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) 不会查找任何内容，它只会检查 `elem` 是否与给定的 CSS 选择器匹配。它返回 `true` 或 `false`。

当我们遍历元素（例如数组或其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很有用。

例如：

```javascript
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // 不一定是 document.body.children，还可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```



### closest

`elem.closest(css)` 方法会查找与 CSS 选择器匹配的最近的祖先。`elem` 自己也会被搜索。

```javascript
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

### getElementsBy\*

所有的 `"getElementsBy*"` 方法都会返回一个 **实时的（live）** 集合。这样的集合始终反映的是文档的当前状态，并且在文档发生更改时会“自动更新”。

![image-20210426154250183](E:\frontendStudy\JavaScript\DOM\DOM.assets\image-20210426154250183.png)



## 节点属性

![image-20210426154929898](E:\frontendStudy\JavaScript\DOM\DOM.assets\image-20210426154929898.png)

给定节点的全部属性和方法都是继承的结果，DOM节点是常规的JavaScript对象

> **`console.dir(elem)` 与 `console.log(elem)`**
>
> 大多数浏览器在其开发者工具中都支持这两个命令：`console.log` 和 `console.dir`。它们将它们的参数输出到控制台中。对于 JavaScript 对象，这些命令通常做的是相同的事。
>
> 但对于 DOM 元素，它们是不同的：
>
> - `console.log(elem)` 显示元素的 DOM 树。
> - `console.dir(elem)` 将元素显示为 DOM 对象，非常适合探索其属性。

> **规范中的 IDL**
>
> 在规范中，DOM 类不是使用 JavaScript 来描述的，而是一种特殊的 [接口描述语言（Interface description language）](https://en.wikipedia.org/wiki/Interface_description_language)，简写为 IDL，它通常很容易理解。
>
> 在 IDL 中，所有属性以其类型开头。例如，`DOMString` 和 `boolean` 等。
>
> 以下是摘录（excerpt），并附有注释：
>
> ```javascript
> // 定义 HTMLInputElement
> // 冒号 ":" 表示 HTMLInputElement 继承自 HTMLElement
> interface HTMLInputElement: HTMLElement {
>   // 接下来是 <input> 元素的属性和方法
> 
>   // "DOMString" 表示属性的值是字符串
>   attribute DOMString accept;
>   attribute DOMString alt;
>   attribute DOMString autocomplete;
>   attribute DOMString value;
> 
>   // 布尔值属性（true/false）
>   attribute boolean autofocus;
>   ...
>   // 现在方法："void" 表示方法没有返回值
>   void select();
>   ...
> }
> ```



### nodeType属性

`nodeType` 属性提供了另一种“过时的”用来获取 DOM 节点类型的方法。

它有一个数值型值（numeric value）：

- 对于元素节点 `elem.nodeType == 1`，
- 对于文本节点 `elem.nodeType == 3`，
- 对于 document 对象 `elem.nodeType == 9`，



### nodeName和tagName

- `tagName` 属性仅适用于 `Element` 节点。
- nodeName是为任意Node定义的：
  - 对于元素，它的意义与 `tagName` 相同。
  - 对于其他节点类型（text，comment 等），它拥有一个对应节点类型的字符串。



### outerHTML

`outerHTML` 属性包含了元素的完整 HTML。就像 `innerHTML` 加上元素本身一样。

```html
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

**注意：与 `innerHTML` 不同，写入 `outerHTML` 不会改变元素。而是在 DOM 中替换它。**



### innerHTML和textContent

`textContent` 提供了对元素内的 **文本** 的访问权限：仅文本，去掉所有 `<tags>`。

- 使用 `innerHTML`，我们将其“作为 HTML”插入，带有所有 HTML 标签。
- 使用 `textContent`，我们将其“作为文本”插入，所有符号（symbol）均按字面意义处理。



### nodeValue/data

非元素节点（文本、注释）的内容。两者几乎一样，我们通常使用 `data`。可以被修改。

```html
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello

    let comment = text.nextSibling;
    alert(comment.data); // Comment
  </script>
</body>
```

