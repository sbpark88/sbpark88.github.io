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
<br>

> `display: block`, `width`, `margin: 0 auto`

> <span style="color: red;">**block**</span> 속성과 <span style="color: red;">**width**</span>를 
> 가질 때만 적용이 가능하며, <span style="color: red;">**가로 정렬만 가능**</span>하다(inline 엘리먼트일 경우 
> `displya: block;`으로 속성을 바꿔야 한다).  
> 크기를 가질 수 있는 부모 block 엘리먼트의 가로 중앙에 위치시키는 방법으로 가로 가운데 정렬만 필요할 경우 손쉽게 정렬이 가능해 
> 많이 사용된다.

---

## 2. position: absolute 👩‍

`position: absolute`를 사용함으로 별도로 명시하지 않아도 `block` 속성을 갖게 되며, 좌측, 우측, 가운데 정렬이 모두 가능하다. 
또한 가운데 정렬을 제외하면 `width`나 `height`를 갖지 않아도 정렬이 가능하다.

### 1. Horizontal Alignment

#### 1. left: default

다음과 같이 강제로 지정할 수 있지만 기본적으로 왼쪽에 정렬되기 때문에, 전역에서 중앙 또는 우측에 정렬되게 작성된 속성이 존재해 
더 높은 우선순위로써 덮어 써야 하는 경우가 아니라면 별도의 정렬이 필요하지 않다.

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    left: 0;
  }
}
```

<div class="green-box">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `position: absolute`, `left: 0`

#### 2. right

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    right: 0;
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0; position: absolute; right: 0;">
</div>
<br>

> `position: absolute`, `right: 0`

> <span style="color: red;">**absolute**</span> 를 사용한 <span style="color: red;">정렬은 가운데 
> 정렬을 제외</span>하면 **width** 를 가질 필요가 <span style="color: red;">없다</span>.

#### 3. center

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

<br>

__1 ) margin auto__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    width: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; width: 100px; left: 0; right: 0; margin: 0 auto;">
</div>
<br>

> `position: absolute`, `width`, `left: 0`, `right: 0`, `margin: 0 auto`

> [margin: auto](#h-1-margin-auto-) 와 마찬가지로, `absolute` 속성에 의해 `block` 속성을 가지게 되므로 
> `width`와 `margin: 0 auto`만 주어도 가운데 정렬이 될 것 같지만, <span style="color: red;">반드시 
> `left: 0`, `right: 0`이 추가로 주어져야만 가운데 정렬이 가능</span>하다.

<br>

__2 ) percentage & margin calc__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    width: 100px;
    left: 50%;
    margin-left: calc(100px / -2);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; width: 100px; left: 50%; margin-left: calc(100px / -2);">
</div>
<br>

> `position: absolute`, `width`, `left: 50%`, `margin-left: calc(width / -2)`

> `px` 단위로 `margin-left`를 계산하기 위해 정확한 <span style="color: red;">**width**</span> 가 필요하다. 
> width 가 변경되면 calc 역시 변경해줘야 하기 때문에 **SCSS** 를 사용해 변수로 관리하는 것이 좋다.
> ```scss
> .outer {
>   position: relative;
>   
>   .inner {
>     $box-width: 100px;
>     position: absolute;
>     width: $box-width;
>     left: 50%;
>     margin-left: calc($box-width / -2);
>   }
> }
> ```

<br>

__3 ) percentage & translate__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0; position: absolute; left: 50%; transform: translateX(-50%);">
</div>
<br>

> `position: absolute`, `left: 50%`, `transform: translateX(-50%)`

> 위 **calc** 를 사용한 것과 같은 방법이지만, `margin-left`는 부모의 **width** 를 100% 로 하기** 때문**에, 
> 비율로 가운데 지점을 계산하는 것이 불가능하기 때문에 자신의 크기의 절반 만큼 `px` 단위로 이동해야했다. 
> 반면, <span style="color: red;">**translate**</span> 는 **margin** 과 달리 
> <span style="color: width, red;">**엘리먼트 자신의 width**</span> 를 100% 로 하기 때문에, 비율을 사용하는 것이 
> 가능해 **width** 와 **width** 는 필요가 없다.
> 
> <span style="color: red;">**absolute**</span> 를 사용한 <span style="color: red;">가운데 정렬</span>
> 중 유일하게 <span style="color: red;">**width 가 필요 없는**</span> 정렬 방법이다.

### 2. Vertical Alignment

#### 1. top: default

다음과 같이 강제로 지정할 수 있지만 기본적으로 상단에 정렬되기 때문에, 전역에서 중앙 또는 하단에 정렬되게 작성된 속성이 존재해
더 높은 우선순위로써 덮어 써야 하는 경우가 아니라면 별도의 정렬이 필요하지 않다.

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    top: 0;
  }
}
```

<div class="green-box">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `position: absolute`, `top: 0`

#### 2. bottom

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    bottom: 0;
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0; position: absolute; bottom: 0;">
</div>
<br>

> `position: absolute`, `bottom: 0`

> <span style="color: red;">**absolute**</span> 를 사용한 <span style="color: red;">정렬은 가운데
> 정렬을 제외</span>하면 **height** 를 가질 필요가 <span style="color: red;">없다</span>.

#### 3. center

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

<br>

__1 ) margin auto__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    height: 100px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; height: 100px; top: 0; bottom: 0; margin: auto 0;">
</div>
<br>

> `position: absolute`, `height`, `top: 0`, `bottom: 0`, `margin: auto 0`

> 반드시 `height`를 가져야 가운데 정렬이 가능하다.

<br>

__2 ) percentage & margin calc__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    height: 100px;
    top: 50%;
    margin-top: calc(100px / -2);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; top: 50%; margin-top: calc(100px / -2);">
</div>
<br>

> `position: absolute`, `height`, `top: 50%`, `margin-top: calc(height / 2)`

> `px` 단위로 `margin-top`을 계산하기 위해 정확한 <span style="color: red;">**height**</span> 가 필요하다.
> height 가 변경되면 calc 역시 변경해줘야 하기 때문에 **SCSS** 를 사용해 변수로 관리하는 것이 좋다.
> ```scss
> .outer {
>   position: relative;
>   
>   .inner {
>     $box-height: 100px;
>     position: absolute;
>     height: $box-height;
>     top: 50%;
>     margin-top: calc($box-height / -2);
>   }
> }
> ```

<br>

__3 ) percentage & translate__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0; position: absolute; top: 50%; transform: translateY(-50%)">
</div>
<br>

> `position: absolute`, `top: 50%`, `transform: translateY(-50%)`

> 위 **calc** 를 사용한 것과 같은 방법이지만, `margin-top`은 부모의 **height** 를 100% 로 하기** 때문**에, 
> 비율로 가운데 지점을 계산하는 것이 불가능하기 때문에 자신의 크기의 절반 만큼 `px` 단위로 이동해야했다. 
> 반면, <span style="color: red;">**translate**</span> 는 **margin** 과 달리
> <span style="color: width, red;">**엘리먼트 자신의 height**</span> 를 100% 로 하기 때문에, 비율을 사용하는 것이
> 가능해 **width** 와 **height** 는 필요가 없다.
> 
> <span style="color: red;">**absolute**</span> 를 사용한 <span style="color: red;">가운데 정렬</span>
> 중 유일하게 <span style="color: red;">**height 가 필요 없는**</span> 정렬 방법이다.

### 3. Center Alignment

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

<br>

__1 ) margin auto__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    width: 100px;
    height: 100px;
    inset: 0;
    margin: auto;
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; width: 100px; height: 100px; inset: 0; margin: auto;">
</div>
<br>

> `position: absolute`, `width`, `height`, `inset: 0`, `margin: auto`

> 반드시 `width`와 `height`를 가져야 가운데 정렬이 가능하다.

<br>

__2 ) percentage & margin calc__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    margin-top: calc(100px / -2);
    margin-left: calc(100px / -2);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; position: absolute; width: 100px; height: 100px; top: 50%; left: 50%; margin-top: calc(100px / -2); margin-left: calc(100px / -2)">
</div>
<br>

> `position: absolute`, `width`, `height`, `top: 50%`, `left: 50%`,  
> `margin-top: calc(height / 2)`, `margin-left: calc(width / -2)`

> `px` 단위로 `margin-top`과 `margin-left`를 계산하기 위해 정확한 
> <span style="color: red;">**width 와 height**</span> 가 필요하다.
> width 또는 height 가 변경되면 calc 역시 변경해줘야 하기 때문에 **SCSS** 를 사용해 변수로 관리하는 것이 좋다.
> ```scss
> .outer {
>   position: relative;
>   
>   .inner {
>     $box-width: 100px;
>     $box-height: 100px;
>     position: absolute;
>     width: $box-width;
>     height: $box-height;
>     top: 50%;
>     left: 50%;
>     margin-top: calc($box-height / -2);
>     margin-left: calc($box-width / -2);
>   }
> }
> ```

<br>

<span id="do-not-need-size-1"></span>
__3 ) percentage & translate__

```css
.outer {
  position: relative;
  
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

<div class="green-box" style="position: relative;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
</div>
<br>

> `position: absolute`, `top: 50%`, `left: 50%`. `transform: translate(-50%, -50%)`

> 위 **calc** 를 사용한 것과 같은 방법이지만, `margin-top`과 `margin-left`는 부모의 **width** 와 **height** 를 
> 100% 로 하기 때문에, 비율로 가운데 지점을 계산하는 것이 불가능하기 때문에 자신의 크기의 절반 만큼 `px` 단위로 이동해야했다.
> 반면, <span style="color: red;">**translate**</span> 는 **margin** 과 달리
> <span style="color: red;">**엘리먼트 자신의 width, height**</span> 를 100% 로 하기 때문에, 비율을 사용하는 것이
> 가능해 **width** 와 **height** 는 필요가 없다.
> 
> <span style="color: red;">**absolute**</span> 를 사용한 <span style="color: red;">가운데 정렬</span>
> 중 유일하게 <span style="color: red;">**width 와 height 가 필요 없는**</span> 정렬 방법이다.

---

## 3. display: flex 👩‍

`flex`를 이용한 정렬은 <span style="color: red;">**width**, **height** 가 지정되지 않은 경우 또는, 
inline 속성에도 모두 적용할 수 있는 정렬</span>방법이다. 물론, <span style="color: red;">cross-axis</span> 
정렬을 명시하지 않을 경우, **width**, **height** 가 지정되지 않는 엘리먼트는 그것이 block 속성이든, inline 속성이든 
*cross-axis 방향으로 늘어나기 때문에* 실제로 이런식으로 사용하진 않겠지만 flex 를 이용한 정렬 자체는 **width**, 
**height** 가 필요 없는 정렬이라는 것이 중요하다.

### 1. Horizontal Alignment

#### 1. left: default

다음과 같이 강제로 지정할 수 있지만 기본적으로 왼쪽에 정렬되기 때문에, 전역에서 중앙 또는 우측에 정렬되게 작성된 속성이 존재해
더 높은 우선순위로써 덮어 써야 하는 경우가 아니라면 별도의 정렬이 필요하지 않다.

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  display: flex;
  justify-content: flex-start;
}
```

<div class="green-box">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `justify-content: flex-start`

#### 2. right

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  display: flex;
  justify-content: flex-end;
}
```

<div class="green-box"
     style="display: flex; justify-content: flex-end;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `justify-content: flex-end`

#### 3. center

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```

```css
.outer {
  display: flex;
  justify-content: center;
}
```

<div class="green-box"
     style="display: flex; justify-content: center;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `justify-content: flex-end`

### 2. Vertical Alignment

#### 1. top: default

다음과 같이 강제로 지정할 수 있지만 기본적으로 상단에 정렬되기 때문에, 전역에서 중앙 또는 하단에 정렬되게 작성된 속성이 존재해
더 높은 우선순위로써 덮어 써야 하는 경우가 아니라면 별도의 정렬이 필요하지 않다. 단, 자식 엘리먼트가 *cross-axis* 방향의 
크기를 지정하지 않으면 엘리먼트가 늘어나기 때문에, 이 경우 직접 정렬이 필요할 수 있다(물론, 가능하면 크기를 지정해주는 것이 
더 좋은 방법이다).

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```
<br>

__1 ) align-items__

```css
.outer {
  display: flex;
  align-items: flex-start
}
```

<div class="green-box"
     style="display: flex; align-items: flex-start;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `align-items: flex-start`

<br>

__2 ) wrap & align-content__

```css
.outer {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
```

<div class="green-box"
     style="display: flex; flex-wrap: wrap; align-content: flex-start">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `flex-wrap: wrap`, `align-content: flex-start`

#### 2. bottom

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```
<br>

__1 ) align-items__

```css
.outer {
  display: flex;
  align-items: flex-end;
}
```

<div class="green-box"
     style="display: flex; align-items: flex-end;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `align-items: flex-end`

<br>

__2 ) wrap & align-content__

```css
.outer {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}
```

<div class="green-box"
     style="display: flex; flex-wrap: wrap; align-content: flex-end;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `flex-wrap: wrap`, `align-content: flex-end`

#### 3. center

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```
<br>

__1 ) align-items__

```css
.outer {
  display: flex;
  align-items: center;
}
```

<div class="green-box"
     style="display: flex; align-items: center;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `align-items: center`

<br>

__2 ) wrap & align-content__

```css
.outer {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
```

<div class="green-box"
     style="display: flex; flex-wrap: wrap; align-content: center;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `flex-wrap: wrap`, `align-content: center`

### 3. Center Alignment

```html
<div class="outer">
  <img src="coral-box.png" alt="coral box" class="inner">
</div>
```
<br>

__1 ) justify-content & align-items__

```css
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

<div class="green-box"
     style="display: flex; justify-content: center; align-items: center;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `justify-content: center`, `align-items: center`

<br>

__2 ) justify-content & wrap & align-content__

```css
.outer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
```

<div class="green-box"
     style="display: flex; flex-wrap: wrap; justify-content: center; align-content: center;">
  <img src="/assets/images/posts/2024-03-01-css-alignment/coral-box.png" 
       alt="coral box"
       class="green-box__coral-box"
       style="vertical-align: center; margin: 0;">
</div>
<br>

> `display: flex`, `flex-wrap: wrap`, `justify-content: center`, `align-content: center`

<br><br>

> 엘리먼트의 정확한 크기를 지정할 수 없는 경우, **width** 또는 **height** 의 값이 없어도 적용할 수 있는 정렬 방법이 필요한데, 
> <span style="color: red;">가운데 정렬이 필요할 때</span> 사용할 수 있는 방법은 두 가지가 있다.
> 
> 1. <span style="color: red;">absolute</span> 와 <span style="color: red;">translate</span> 를 
>    사용한 방법 (e.g. 가로, 세로 모두 가운데 정렬을 예로 들면
>    [position: absolute 를 사용한 가운데 정렬](#do-not-need-size-1) 을 이야기한다).
> 2. <span style="color: red;">flex</span> 를 사용한 방법 (e.g. 가로, 세로 모두 가운데 정렬을 예로 들면 
>    [display: flex 를 사용한 가운데 정렬](#h-3-center-alignment-1) 을 이야기한다).
> 
> 차이점은, <span style="color: red;">**absolute**</span> 와 <span style="color: red;">**translate**</span> 
> 를 사용한 첫 번째 방법은 <span style="color: red;">엘리먼트에 적용하는 속성</span>인 반면, 
> <span style="color: red;">**flex**</span> 를 사용한 두 번째 방법은 
> <span style="color: red;">부모에게 적용하는 속성</span>이다. 
