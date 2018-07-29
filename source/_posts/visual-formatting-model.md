---
title: 视觉格式化模型
date: 2018-07-17 09:45:50
tags:
---

# 视觉格式化模型简介

CSS 视觉格式化模型（visual formatting model）是用户代理处理文档树所使用的计算规则。

视觉格式化模型会根据CSS盒子模型将文档中的元素转换为一个个盒子，每个盒子的布局由以下因素决定：
* 盒子的尺寸
* 盒子的类型：块级盒子，块容器盒子，行内级盒子等
* 定位方案（positioning scheme）：普通流定位、浮动定位或绝对定位
* 文档树中元素之间的关系
* 其他外部因素（视口大小，图片大小等）

## 包含块

**包含块**：containing block，包含其他盒子的块称为包含块。

# 盒子

盒子的生成是 CSS 视觉格式化模型的一部分，用于从文档元素生成盒子。盒子有不同的类型，不同类型的盒子的格式化方法也有所不同。盒子的类型取决于 CSS display 属性。

## 块级元素与块盒子

* **块级元素**：block-level element，元素的 display 为 block、list-item、table 时，该元素将成为块级元素。
* **块级盒子**：block-level box，由块级元素生成。一个块级元素至少会生成一个块级盒子，但也有可能生成多个（例如列表项元素）。 块级盒子会参与到块格式上下文中。
* **块级元素**：block-level element，元素的 display 为 block、list-item、table 时，该元素将成为块级元素。
* **块容器元素**：block container element，元素为不可替换元素，且display为 block、list-item、inline-block时，该元素将成为块容器元素。
* **块容器盒子**：block container box，由块容器元素生成。
* **块盒子**：block box，如果一个块级盒子同时也是一个块容器盒子，则称其为块盒子。 （注意：盒子有“块盒子”、“块级盒子”、“块容器盒子”，但元素只有“块级元素”和“块容器元素”，而没有“块元素”。下面的“行内级元素”也是一样）

一个元素可以是块级元素，可以是块容器元素，也可以即是块级元素又是块容器元素。块级元素生成块级盒子，块容器元素生成块容器盒子，如果一个元素即是块级元素又是块容器元素， 那么它生成的盒子即是块级盒子又是块容器盒子，这种盒子叫做块盒子。

块级盒子与块容器盒子的作用是不同的。 块级盒子参与到块格式式化上下文中，描述了元素与其父元素和兄弟元素之间的行为，即布局与定位； 块容器盒子侧重于当前盒子作为“容器”的这一角色，它不参与当前块的布局和定位，它所描述的仅仅是当前盒子与其后代之间的关系。

### 匿名块盒子

考虑以下代码，假设 div 和 p 都保持默认的样式（即它们的 display 为 block）：
```html
<div>Some inline text <p>followed by a paragraph</p> followed by more inline text.</div>
```

这个div中包含了三个盒子，其中一个是p生成的块级盒子，还有两个匿名块盒子。如下图：
![anonymous block-level boxes](/images/anonymous_block-level_boxes.png)

为什么生成匿名块盒子，这是为了更方便布局。换句话说，如果一个块容器盒子中，包含了一个块级盒子，那我们将强制让它只包含块级盒子。

更详细的说法是：块容器盒子可能只包含行内级盒子，也可能只包含块级盒子，但通常的文档都会同时包含两者，在这种情况下，就会在相邻的行内级盒子外创建匿名块盒子。

下面看一个更复杂的例子，**行内盒子中包含一或多个块盒子**。

当行内盒子中有一个块级盒子，此时行内盒子会被这个块级盒子拆分为两个行内盒子，分别位于块级盒子的前面和后面。 块盒子前面的所有行内盒子会被一个匿名块盒子包裹，块盒子后面的行内盒子也是一样。因此，块盒子将成为这两个匿名块盒子的兄弟盒子。

考虑下面的HTML代码，假设 p 的 display 为 inline，span 的 display 为 block：
```html
<p>Some <em>inline</em> text <span>followed by a paragraph</span> followed by more inline text.</p>
```
此时会产生两个匿名块盒子：一个是` <span> `元素前面的文本（`Some inline text`），另一个是其之后的文本（`followed by more inline text.`）。此时会生成下面的块结构：
![anonymous block box break](/images/anonymous_block_box_break.png)

这些匿名块盒子无法被选择符选中，它们从父元素那里继承那些可继承的属性，其他属性保持默认值 initial。

## 行内级元素和行内盒子

* **行内级元素**：inline-level element，display 为 inline、inline-block、inline-table 的元素称为行内级元素。行内级元素并不形成新的内容块（这句话不知道如何理解）。
* **行内级盒子**：inline-level box，由行内级元素生成，它参与行内格式化上下文。
* **行内盒子**：inline box，由display 为inline的非替换元素所生成的盒子。 行内盒子是行内级盒子，并且它的内容参与了它所包含的行内格式化上下文。
* **原子行内级盒子**：atomic inline-level box，行内级盒子中不是行内盒子的，就是原子行内级盒子。 例如可替换行内级元素、inline-block元素和inline-table元素所生成的盒子就是原子行内级盒子。 原子行内级盒子作为一个不透明盒子参与行内格式化上下文（什么叫不透明盒子？）。

### 匿名行内盒子

任何被块容器盒子直接包含的文本，必须视为块容器盒子生成了一个匿名行内盒子来包含这些文本。如下例子：
```html
<p>Some <em>emphasized</em> text</p>
```

上述代码中，p元素生成了一个块盒，块盒里面有几个行内盒。 em元素生成了一个行内盒，这个盒子包裹着“emphasized”文字，“Some”和“text”也分别被行内盒包裹，这里的行内盒是匿名行内盒，因为它们并不是直接由对应的行内级元素生成。

这些行内盒子无法被选择符选中，它们从父元素那里继承那些可继承的属性，其他属性保持默认值 initial。

## Run-in 盒子

略

# 定位规则

一旦生成了盒子以后，CSS引擎就需要定位它们以完成布局。下面是定位盒子时所使用的规则
* 普通流（正常流）：css2.2中普通流包含块级元素的块格式化上下文，行内级元素的行内格式化上下文，以及块级元素与行内级元素的相对定位
* 浮动：将盒子从普通流中单独拎出来，将其放到外层盒子的某一边
* 绝对定位：按照绝对位置来定位盒子，其位置根据其父容器来计算，因此绝对定位元素有可能会覆盖其他元素

## 普通流

在普通流中，盒子会依次放置。在块格式化上下文中，盒子在垂直方向依次排列；而在行内格式化上下文中，盒子则水平排列。当CSS的 position 属性为 static 或 relative，并且 float 为 none 时，其布局方式为普通流。

### 块格式化上下文

在块格式化上下文中，盒子从包含块的顶部开始，在垂直方向上依次排列，每一个盒子都独占一行。垂直方向上距离由top margin 与bottom margin控制。 其中垂直方向上的相邻元素的margin会发生margin合并。

float元素，绝对定位元素，非块盒的块容器元素(such as inline-blocks, table-cells, and table-captions)，overflow属性不是visible的元素，它们将生成新的块格式化上下文。

### 行内格式化上下文

一个行内格式化上下文，由不包含任何的块级盒子的块容器盒子生成。 在一个行内格式化上下文中，从包含块的顶部开始，盒子在水平方向上依次排列。 同一行内的多个盒子会被一个方形区域包裹形成一个行，这个方形区域叫做**行盒（line box）。

行盒的宽度由包含块或者是否有float属性决定。行盒从包含块的左边一直延伸到最右边，如果具有float属性那么宽度就只剩下包裹子盒子的宽度。

当行盒中的子行内盒子们的总宽度小于行盒的宽度时，水平方向上的布局受 'text-align' 控制。

如果某个行内级盒子的宽度超过了行盒，那么超过的部分就会被分配到下一个行盒，类似换行。如果这个行内盒子不允许拆分，这种情况下，这个行内盒子会溢出到行盒的外面。

行盒的高度参考[line height calculations](https://www.w3.org/TR/CSS22/visudet.html#line-height)。

### 相对定位

当一个元素是相对定位的时候，可以通过'left''right''top''bottom'属性来调节它相对于原来位置的偏移量。偏移后，元素依然占据流中的位置，这对于兄弟元素或父元素的定位布局来说就好像它从来没有偏移过。

如下例子：
```css
#div2 {
  position: relative;
  left: 100px;
  top: 80px;
}
```

示意图为：
![position relative](/images/position-relative.jpg)

## 浮动

见：[浮动](./float.html)

## 绝对定位

一个盒子的 position 值为 absolute 或者 fixed，该盒子为绝对定位。绝对定位使元素完全脱离了普通流。

# 'display', 'position', 和 'float'的比较

'display', 'position', 和 'float'影响了盒子的生成与布局，它们存在相互作用：
* 如果 'display'是 'none' ，'position' 和 'float'不起作用。这种情况下，元素不生成任何盒子，相当于不存在。
* 除上述情况之外，如果'position' 是 'absolute' 或者 'fixed'，'float'不起作用，'display'的最终属性根据下表决定。此盒子将根据 'top', 'right', 'bottom' and 'left' 和包含块进行定位。
* 除上述情况之外，如果'float'不是'none'，'display'的最终属性根据下表决定。

|指定值 | 最终值 |
|---|---|
|inline-table|table|
|inline, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, table-caption, inline-block|block|
|others|same as specified|

# 普通流，浮动 和 绝对定位 的比较

我们通过以下代码来演示普通流，浮动和绝对定位。
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<HTML>
  <HEAD>
    <TITLE>Comparison of positioning schemes</TITLE>
  </HEAD>
  <BODY>
    <P>Beginning of body contents.
      <SPAN id="outer"> Start of outer contents.
      <SPAN id="inner"> Inner contents.</SPAN>
      End of outer contents.</SPAN>
      End of body contents.
    </P>
  </BODY>
</HTML>
```

```css
body { display: block; font-size:12px; line-height: 200%; 
       width: 400px; height: 400px }
p    { display: block }
span { display: inline }
```

## 普通流

考虑以下css代码：
```css
#outer { color: red }
#inner { color: blue }
```

`p`元素包含的内容全是行内内容：一些匿名文本与2个`span`元素。因此，`p`元素中的所有内容将会分布在同一个行内格式化上下文中，并且`p`元素生成了一个包含块。显示效果类似：
![flow-generic](/images/flow-generic.png)

## 相对定位

为了观察相对定位，我们使用以下代码：
```css
#outer { position: relative; top: -12px; color: red }
#inner { position: relative; top: 12px; color: blue }
```

__outer__元素包含的文本（分布在第一行到第三行）均向上偏移了`-12px`。
__inner__元素中的文本，在__outer__元素定位完成后进行定位。__inner__元素的父元素是__outer__，它的行为是先随着父元素向上偏移了`-12px`，然后自己偏移了`12px`，于是它回到了原来的位置。
显示效果类似：
![flow-relative](/images/flow-relative.png)

## 浮动

为了观察浮动，我们浮动__inner__元素，考虑以下代码：
```css
#outer { color: red }
#inner { float: right; width: 130px; color: blue }
```

元素右浮动，效果类型：
![flow-float](/images/flow-float.png)

## 绝对定位 

为了观察绝对定位，考虑以下代码：
```css
#outer { 
    position: absolute; 
    top: 200px; left: 200px; 
    width: 200px; 
    color: red;
}
#inner { color: blue }
```

上述情况中，__outer__元素为绝对定位，它将根据它的包含块来定位，这里离它最近的包含块为初始包含块（initial containing block）。效果类似：
![flow-absolute](/images/flow-absolute.png)

假如绝对定位元素是行内元素的子元素的情况，我们考虑以下代码：
```css
#outer { 
  position: relative; 
  color: red 
}
#inner { 
  position: absolute; 
  top: 200px; left: -100px; 
  height: 130px; width: 130px; 
  color: blue;
}
```
__inner__为绝对定位，__outer__为相对定位，所以__outer__是__inner__的包含块。outer元素被拆分成了三行，inner元素根据第一行的位置来进行定位。效果类似：
![flow-abs-rel](/images/flow-abs-rel.png)

如果不设置__outer__相对定位，考虑如下代码：
```css
#outer { color: red }
#inner {
  position: absolute; 
  top: 200px; left: -100px; 
  height: 130px; width: 130px; 
  color: blue;
}
```
此时__inner__的包含块为初始包含块（initial containing block），定位效果类似：
![flow-static](/images/flow-static.png)
