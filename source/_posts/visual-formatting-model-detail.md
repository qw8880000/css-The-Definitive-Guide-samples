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

# width 与 margin 的计算

## 行内非可替换元素

'width'属性对行内非可替换元素不起作用。如果'margin-left' 或 'margin-right' 设置为 'auto'，那最终使用值为0。

# 内容高度：'height'属性

# height 与 margin 的计算

# line-height 与 vertical-align
