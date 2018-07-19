---
title: 视觉格式化模型详情
date: 2018-07-17 14:56:50
tags:
---

# 包含块的定义

一个元素的**包含块（containing block）**是一个方形区域，是这个元素计算布局与大小的参照物。包含块有以下定义：

* 根元素（root element）的包含块叫做**初始包含块（initial containing block）**。
* 对于除了根元素外的其他元素，如果元素的 position 是 'relative' 或者 'static'，它的包含块由最近的父元素的内容边界形成。
* 如果一个元素'position: fixed'，那么包含块由连续媒体的视口生成或者分页媒体的页区域生成。
* 如果一个元素'position: absolute'，那么包含块由最近的 'position' 是 'absolute', 'relative' or 'fixed' 的父元素生成，按照以下方式：
    + 如果此父元素是行内元素，那么包含块就是此行内元素发布的一个包围第一个行内盒子与最后一个行内盒子的盒子。css2.2中，如果此行内元素拆分成多行，那么包含块是没有定义的。
    + 除此之外，包含块由此父元素的内边界生成
    + 如果找不到符合规则的父元素，那么包含块是初始包含块

# 内容宽度：'width'属性

略

# width 与 margin 的计算

## 行内非可替换元素

'margin-left' 或 'margin-right' 设置为 'auto'，那最终使用值为0。

'width'属性对行内非可替换元素不起作用。

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/2dkbef4q/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 行内可替换元素

'margin-left' 或者 'margin-right' 为 auto时，最终使用值为 0。

'width' 为 'auto'时，如果：
* 'height'为'auto'且可替换元素的内容自身有指定宽度，那么元素的宽度等于内容的宽度。
* 'height'为'auto'，可替换元素的内容自身没有指定宽度，但是可替换元素的内容具有长宽比(ratio)和指定高度，那么元素的宽度等于`(内容的height) x ratio`。
* 'height'为'auto'，可替换元素的内容自身没有指定宽度和指定高度，此情况在css2.2中没有定义。css规范建议当作块级不可替换元素进行处理。
* 'height'不为'auto'，可替换元素的内容有指定长宽比(ratio)，那么元素的宽度等于`height x ratio`。
* 如果上述情况都不符合，那么'width'被设置成300px。如果300px太宽不能被设备所容纳，那么有采取适应2：1长宽比适合设备宽度的策略。

'width'为指定值时，元素宽度为此值。

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/tjx2m1dz/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 普通流中，块级非可替换元素

普通流中，块级非可替换元素在水平方向上有如下规则 ：
> 'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' = 包含块的宽度

水平7大属性中，width,margin-left,margin-right这3个属性可以设置为auto，其余必须设置值，或者默认为0。

**以下讨论均考虑'direction'是'ltr'（从左向右排列）的情况，'rtl'的情况同理**。

'margin-left'，'margin-right'与'width'均为'auto'时，'margin-left'与'margin-right'的最终值为0，width的值可利用上述等式求解。

'width'为'auto'，'margin-left'与'margin-right'其一为'auto'时，'auto'的最终值为0，width的值可利用上述等式求解。

'margin-left'，'margin-right'为'auto'，'width'不为'auto'时，那么根据公式求出剩余空间，然后'margin-left' and 'margin-right'平分空间，
'margin-left'与'margin-right'的最终值为相等的数值，元素在水平方向上居中了；如果计算的值为负数，设置'margin-left'为0，'margin-right'重新计算。

'margin-left'，'margin-right'，'width'其中之一为'auto'时，直接利用上述等式即可求出该auto的值。

'margin-left'，'margin-right'，'width'都不是'auto'时，叫做过分约束，'margin-right'总是被重新计算以符合等式约束。
 
'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' 大于 包含块的宽度 时，'margin-right'总是被重新计算以符合等式约束。

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/3az6xLoj/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 普通流中，块级可替换元素

'width'的计算参考行内可替换元素的计算方法。

'margin'的计算参考块级非可替换元素的计算方法。

## 浮动的非替换元素

'margin-left', or 'margin-right' 为 'auto'时，最终使用值为0。

'width' 为 'auto' 时，宽度自动设置为刚好容纳内容。

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/o52jLgpe/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 浮动的可替换元素

'margin-left', or 'margin-right' 为 'auto'时，最终使用值为0。

'width'的计算参考行内可替换元素的计算方法。

## 绝对定位，非可替换元素

水平方向上的计算规则：
> 'left' + 'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' + 'right' = width of containing block

**以下讨论均考虑'direction'是'ltr'（从左向右排列）的情况，'rtl'的情况同理**。以下说到的static positon为元素未绝对定位前，在普通流中的位置。

'left', 'width', and 'right' 都是 'auto'：
* 首先，把是auto的'margin-left' 和 'margin-right' 计算为0；
* 然后'left'计算为元素在static positon时的值
* 接着'width'设置为刚好容纳元素内容的值
* 最后按公式计算出'right'的值

'left', 'width', and 'right' 都不是 'auto'，且'margin-left' and 'margin-right' 全是 'auto'，那么根据公式求出剩余空间，然后'margin-left' and 'margin-right'平分空间；
如果计算结果为负数，那么'margin-left'设置为0，'margin-right'重新计算。

'left', 'width', and 'right' 都不是 'auto'，'margin-left' and 'margin-right' 其中之一是 'auto'，直接根据公式即可求得auto的最终使用值。

'left', 'width', 'right', 'margin-left' 和 'margin-right' 都不为'auto'，此时就会出现过度受限的情况。 此时会修改right的值，或者忽略right值。

除上述情况之外，把值为'auto'的'margin-left' 或 'margin-right' 设置为0，然后套用以下规则：
* 'left' 和 'width' 是 'auto' 且 'right' 不是 'auto'，'width' 设置为刚好容纳内容，然后根据公式计算 'left'
* 'left' 和 'right' 是 'auto' 且 'width' 不是 'auto'，'left' 设置为元素在static positon时的值，然后根据公式计算 'right'
* 'width' 和 'right' 是 'auto' 且 'left' 不是 'auto'，'width' 设置为刚好容纳内容，然后根据公式计算 'right'
* 'left' 是 'auto', 'width' 和 'right' 不是 'auto', 根据公式直接计算 'left'
* 'width' 是 'auto', 'left' 和 'right' 不是 'auto', 根据公式直接计算 'width'
* 'right' 是 'auto', 'left' 和 'width' 不是 'auto', 根据公式直接计算 'right'

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/78rs9jz6/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 绝对定位，可替换元素

'width'的计算参考行内可替换元素的计算方法，然后 绝对定位的非可替换元素 的规则与约束条件基本适用。

## 普通流中，'inline-block'，非替换元素

'width' 为 'auto' 时，最终值为刚好容纳内容。

'margin-left', or 'margin-right' 为 'auto'时，最终使用值为0。

## 普通流中，'inline-block'，可替换元素

参考 行内可替换元素。

# 内容高度：'height'属性

略

# height 与 margin 的计算

## 行内非可替换元素

'height'不起作用。内容部分的高度由font决定。

'margin-left' 与 'margin-bottom' 不起作用。

垂直方向上的margin，border 与 padding对行盒的高度没有影响，行盒高度的计算只与 'line-height' 有关。

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/n6ywtze4/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

# line-height 与 vertical-align
