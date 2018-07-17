---
title: 浮动
date: 2018-07-17 17:10:02
tags:
---

# 浮动简介

一个盒子的 'float' 值不为 'none'，并且其 'position' 为 'static' 或 'relative' 时，该盒子为浮动定位。浮动定位使元素脱离了普通流。

在正常流中，一个盒子float后便脱离了该流，其他盒子的定位布局不再受它影响就好像它不存在一样。
但是浮动盒子周围的行盒（line box）会受影响，就好像行盒的空间被占据了一样，导致行盒看起来是围绕着浮动盒子排列。

如下例子：
<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/shgbunqc/3/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
`<div>`浮动后可以看到，`<p>`元素跑到了`<div>`的下方，因为`<div>`脱离了普通流；还有一个现象是文字围绕着`<div>`，因为行盒受到浮动元素的影响被压缩了，如下示意图：
![float before](images/float-before.jpg)
![float after](images/float-after.jpg)

如果行盒被压缩的太小了，不能再容纳里面的内容，那么行盒会向下走，直到有合适的空间。如下例子：
<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/tvo6w5en/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

一个浮动的盒子，会向左移动或向右移动直到它的**外边界**碰到包含块的**内边界**或者其他浮动盒子的**外边界**。
<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/f2eo96gb/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

如果水平方向上没有足够的空间容纳一个浮动盒子，那么它会向下走直到能容纳下它或者没有其他浮动盒子。

一个行内级盒子浮动后，它将变成块级盒子。？？？

如果float盒子处于一个行盒中，那么该盒子的上外边界与行盒顶端对齐。

# 浮动的详细规则

float的行为遵守以下规则：
1. 左浮动元素的左外边界一般不能超出其包含块的左内边界。右浮动同理
1. 如果当前元素为左浮动，且源文档有比它更早的左浮动元素，这种情况下，当前元素的左外边界必须靠着更早的浮动元素的右外边界，或者当前元素的上外边界必须低于更早的浮动元素的下外边界。右浮动同理。
1. 左浮动元素的右外边界一般不能超过其相邻的右浮动元素的左外边界。右浮动元素的左外边界一般不能超过左浮动元素的右外边界。
1. 浮动元素的上外边界一般不能超出其包含块的顶端。
1. 浮动元素的上外边界一般不能比源文档中更早出现的所有浮动元素或块级元素的顶端更高。
1. 浮动元素的上外边界一般不能比源文档中更早出现的行盒的顶端更高
1. 当前左浮动元素的左边有其他左浮动元素，这种情况下，当前元素的右外边界不能超出包含块的右边界
1. 浮动元素必须尽可能高的放置。但是受上述7条规则限制
1. 左浮动元素必须尽可能左移，右浮动元素尽可能右移。但是受上述7条规则限制

**以上规则都是为了防止浮动元素的重叠。**
