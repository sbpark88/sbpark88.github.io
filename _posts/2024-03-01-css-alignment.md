---
layout: post
title: CSS Alignment
subtitle: How to align elements using CSS?
excerpt_image: NO_EXCERPT_IMAGE
categories: [css]
tags: [margin auto, absolute, flex, translate]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<style>
.green-box {
  width: 500px;
  height: 300px;
  background-color: mediumseagreen;
}
.green-box__coral-box {
  width: 100px;
  height: 100px;
}
</style>

## 1. margin: auto 👩‍

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.inner {
  display: block;
  width: 100px;
  margin: 0 auto;
}
```

<div class="green-box">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: initial; display: block; width: 100px; margin: 0 auto;">
</div>

> `display: block`, `width`, `margin: 0 auto`

> <span style="color: red;">**block**</span> 엘리먼트가 <span style="color: red;">**너비**</span>를 
> 가질 때만 적용이 가능하며, <span style="color: red;">**가로 정렬만 가능**</span>하다.  
> 크기를 가질 수 있는 부모 block 엘리먼트의 가로 중앙에 위치시키는 방법으로 가로 중앙 정렬만 필요할 경우 손쉽게 정렬이 가능해 
> 많이 사용된다.

