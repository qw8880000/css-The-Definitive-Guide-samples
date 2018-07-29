---
title: 视觉格式化模型详情
date: 2018-07-17 14:56:50
tags:
categories: css specification
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
* 最后根据下面的规则3计算'width'与'right'

'left', 'width', and 'right' 都不是 'auto'，且'margin-left' and 'margin-right' 全是 'auto'，那么根据公式求出剩余空间，然后'margin-left' and 'margin-right'平分空间；
如果计算结果为负数，那么'margin-left'设置为0，'margin-right'重新计算。

'left', 'width', and 'right' 都不是 'auto'，'margin-left' and 'margin-right' 其中之一是 'auto'，直接根据公式即可求得auto的最终使用值。

'left', 'width', 'right', 'margin-left' 和 'margin-right' 都不为'auto'，此时就会出现过度受限的情况。 此时会重新计算right的值来使公式成立。

除上述情况之外，把值为'auto'的'margin-left' 或 'margin-right' 设置为0，然后套用以下规则：
1. 'left' 和 'width' 是 'auto' 且 'right' 不是 'auto'，'width' 设置为刚好容纳内容，然后根据公式计算 'left'
2. 'left' 和 'right' 是 'auto' 且 'width' 不是 'auto'，'left' 设置为元素在static positon时的值，然后根据公式计算 'right'
3. 'width' 和 'right' 是 'auto' 且 'left' 不是 'auto'，'width' 设置为刚好容纳内容，然后根据公式计算 'right'
4. 'left' 是 'auto', 'width' 和 'right' 不是 'auto', 根据公式直接计算 'left'
5. 'width' 是 'auto', 'left' 和 'right' 不是 'auto', 根据公式直接计算 'width'
6. 'right' 是 'auto', 'left' 和 'width' 不是 'auto', 根据公式直接计算 'right'

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

## 普通流，行内可替换元素，块级可替换元素，'inline-block'可替换元素 得 浮动的可替换元素

'margin-left' 与 'margin-bottom' 为 'auto'时，最终使用值为 0。

'height' 为 'auto' 时，如果：
* 'width' 为 'auto' 且 元素内容有指定高度，那么元素的高度等于内容的高度
* 'width' 为 'auto' 且 元素内空没有指定高度，但是元素内容有指定宽度与长宽比(ratio)，那么元素的高度等于：`(内容的width) / ratio`
* 'height'不为'auto' 且 元素的内容有指定长宽比(ratio)，那么元素的宽度等于`width / ratio`
* 如果以上情况都不符合，那按照2:1的长宽比使'height'尽可能的大，'height'不能超过150px，且计算出来的width不能超过设备的宽度

<iframe width="100%" height="300" src="//jsfiddle.net/qw8880000/d6xtpqk1/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 普通流中，'overflow'最终使用值为'visible'的块级非替换元素

'margin-left' 与 'margin-bottom' 为 'auto'时，最终使用值为 0。

'height'为auto时，高度根据它包含的子元素还有它自身的padding与border来计算。高度的计算是从元素的上内容边距到以下其中一种情况的距离：
1. 最后一个行盒的底边
1. 最后一个元素的外边界，如果没有发生外边距合并的话
1. 最后一个元素的边框，如果发生外边距合并的话

总的来说，'heigh'为'auto'的目的是元素的高度刚好包裹子元素。

上述计算的是普通流中的子元素，float与绝对定位的不考虑。

## 绝对定位的非替换元素

以下说到的static positon为元素未绝对定位前，在普通流中的位置。

绝对定位的非替换元素在垂直方向上的尺寸有以下规则：
> 'top' + 'margin-top' + 'border-top-width' + 'padding-top' + 'height' + 'padding-bottom' + 'border-bottom-width' + 'margin-bottom' + 'bottom' = 包含块的高度

如果 'top', 'height' 和 'bottom' 都是 auto ， 设置'top'为static position时的位置，然后根据下面的规则 3计算出'height'与'bottom'。

如果 'top', 'height' 和 'bottom' 都不是 auto ，且 'margin-top' 和 'margin-bottom' 都是 'auto'，使用公式计算出剩余空间然后二者平分剩余空间。

如果 'top', 'height' 和 'bottom' 都不是 auto ，且 'margin-top' 和 'margin-bottom' 之一是 'auto'，直接使用公式计算出该auto的最终使用值。

如果 'top', 'height' 和 'bottom' 都不是 auto ，且 'margin-top' 和 'margin-bottom' 也都不是 'auto'，这种情况称为过分约束，'bottom'将会重新计算从而使公式成立。

除以上情况之外，把值为'auto'的'margin-top' 或 'margin-bottom'置为0，然后套用以下规则计算：
1. 'top' 和 'height' 是 'auto' 且 'bottom' 不是 'auto'， 'height'为刚好容纳内容，然后计算出'top'
2. 'top' 和 'bottom' 是 'auto' 且 'height' 不是 'auto'， 'top' 置为它在static position时的位置，然后用公式计算出'bottom'
3. 'height' 和 'bottom' 是 'auto' 且 'top' 不是 'auto'， 'height'为刚好容纳内容，然后计算出'bottom'
4. 'top' 是 'auto', 'height' 和 'bottom' 不是 'auto'，直接用公式计算出'top'
5. 'height' 是 'auto', 'top' 和 'bottom' 不是 'auto'，直接用公式计算出'height'
6. 'bottom' 是 'auto', 'top' 和 'height' 不是 'auto'，直接用公式计算出'bottom'

以上'height'为刚好容纳内容的计算方法参考 块级格式化上下文的auto height。

## 绝对定位的可替换元素

'height'的计算参考行内可替换元素的计算方法，然后 绝对定位的非可替换元素 的规则与约束条件基本适用。

## 复杂情况

本章节适用于：
* 普通流中，'overflow'最终使用值不是'visible' 的块级非替换元素（除了'overflow'是作用在viewport上的情况）
* 'Inline-block'，非替换元素
* 浮动的非替换元素

'margin-left' 与 'margin-bottom' 为 'auto'时，最终使用值为 0。

'height' 参考 块级格式化上下文的auto height。

对于'inline-block'元素，它的margin有用于计算它在行盒中占的高度。

## 块级格式化上下文的auto height

对于一个发布了块格式化上下文的元素(如绝对定位非替换元素，float，inline-block等)，它的'height'为'auto'时，高度的计算方法如下：

* 如果子元素都是包含行内级元素，那么高度是从最顶上的行盒的顶端到最底下的行盒的底端
* 如果子元素包含块级元素，那么高度是从最顶上的子元素的上边界到最底下的子元素的下边界
* 忽略绝对定位的子元素，相对定位子元素看成是没有发生过偏移
* 除此之外，如果有浮动的子元素，它的下外边界在元素的内容边界之外，那么元素的高度需要增加以容纳浮动元素的下外边界。

# line-height 与 vertical-align

略
