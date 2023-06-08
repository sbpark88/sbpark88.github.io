---
layout: post
title: Basic CSS - root, font, background, css initialize, float, clear, object-fit, shadow, gradient, animation, svg
subtitle: Basic CSS Style - Part 1
categories: css
tags: [css, font, basic ccss, float, position relative, position absolute, object-fit, z-index, opacity, shadow, radius, gradient, filter, animation, svg, stroke-dasharray, stroke-dashoffset]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 1. Base Settings 👩‍💻

#### 1. Charset

`CSS`를 하기 위해 전역으로 설정하는 것들이 있다.

```css
@charset "utf-8";
```

html 처럼 `charset`을 누락하면 브라우저가 기본값으로 `utf-8`을 사용하겠지만 명시해주는 것이 좋다.

#### 2. Global Settings `:root`

그리고 전역으로 설정을 하고 시작해야 하는 것들이 존재하는데 다음과 같이 `Pseudo-classes` 중 `:root` 사용해 전역 변수로 사용할 수 있다.

```css
:root {
  --emphasis-color: hotpink;
}
```

`:root`에 변수와 값을 정의한 다음

```css
ul li:nth-of-type(2) {
  color: var(--emphasis-color);
}
```

`var()`함수를 이용해 변수를 가져다 사용한다.


#### 3. Universal Selectors `*`

위에서 `:root`가 전역에 사용할 값을 변수로 처리할 수 있었다면 `*`는 모든 `elements`에 대해 값을 아예 지정한다.

- `ns|*` : 네임스페이스 ns 안의 모든 요소 선택
- `*|*` : 모든 요소 선택
- `|*` : 네임스페이스 없는 모든 요소 선택

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rNZyBzq" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/rNZyBzq">
  Universal Selectors</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 2. Selectors 👩‍💻

#### 1. Elements & Class

Elements 와 Class 2가지 조건을 모두 주어 `&&` 연산을 통해 좀 더 세분화된 선택을 할 수 있다.

- `p` elements 중 `some__class`인 것

````css
p.some__class { }
````

#### 2. Elements & Attributes with Value

Elements 와 Attributes 와 Values 를 주어 `&&` 연산을 통해 세분화된 선택을 한다.

```css
input[type="text"] { }
input[type="password"] { }
```

#### 3. `:nth-of-type` & `:nth-of-child`

- `ul` elements 의 모든 자식 중 `n`번째 `li`

```css
ul li:nth-of-type(1) { }
ul li:nth-of-type(2n+1) { }
ul li:nth-of-type(even) { }
ul li:nth-of-type(odd) { }
ul li:nth-of-type(1) { }
ul li:first-of-type { }
ul li:last-of-type { }
```

- `ul` elements 의 직계 자식 중 `n`번째 `li`

```css
ul > li:nth-of-type(1) { }
ul > li:nth-of-type(2n+1) { }
ul > li:nth-of-type(even) { }
ul > li:nth-of-type(odd) { }
ul > li:nth-of-type(1) { }
ul > li:first-of-type { }
ul > li:last-of-type { }
```

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="XWPMrBG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/XWPMrBG">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

- `ul` elements 의 모든 자식 중 `li`를 찾은 다음 그 `li`의 부모를 기준으로 `n`번째 자식을 찾는다.

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="ExeWYrq" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ExeWYrq">
  Style : nth-of-child</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `:nth-of-type`은 `ul li`의 경우 `li`를 기준으로 `n`번째를 찾지만, `:nth-of-child`는 `ul li`를 먼저 찾은 다음 그 
> `li`의 부모의 `n`번째 자식을 찾는다. 따라서 HTML 이 변경될 경우 CSS 가 엉뚱한 곳에 적용될 수 있으며 예측하기가 힘들다.

#### 3. Pseudo Classes

```css
h1:hover {
  border: 1px solid red;
}
h1::before {
  content: "before content";
  color: blue;
}
h1::after {
  content: "after content";
  color: green;
}
```

![Pseudo Classes before after](/assets/images/posts/2023-03-01-basic-css/pseudo-classes-before-after.png){: width="800"}

> `:before`, `:after`를 이용하면 HTML 의 수정 없이도 `content`를 가상으로 삽입할 수 있다.  
> 뿐만 아니라 `:enabled`, `:disabled`를 이용하면 attributes 의 추가 없이 간단하게 상태값을 변경할 수 있다. CSS 를 잘 다룰 수 
> 있게 되면 DOM 을 수정하거나 JavaScript 에 의존하지 않고도 더 쉽고 간결하게 또한 더 높은 퍼포먼스를 갖도록 기능적인 것들을 
> 처리하는 것도 가능하다.

---

### 3. Fonts 👩‍💻

#### 1. HTML 을 기준으로 설정하기

```css
/* HTML 기준 */
html {
  font-size: 16px; /* default 16px */
}
article h1 {
  font-size: 3rem; /* radio */
}
article p {
  font-size: 1rem;
}
article a {
  font-size: 0.8rem;
}
```

#### 2. 부모를 기준으로 설정하기

```css
/* 부모 기준 */
article {
  font-size: 30px; /* default 16px */
}
article h1 {
  font-size: 3em; /* radio */
}
article p {
  font-size: 2em;
}
article a {
  font-size: 0.8em;
}
```

비슷하게 절대값이 아닌 상대값을 사용하는 단위로 `em`도 존재한다. 근데 프로젝트가 커지면 부모 추적이 어려움. `rem` 을 쓰는게 낫다.

#### 3. 반응형으로 설정하기

하지만 `rem`, `em` 모두 데스크탑 페이지를 기준으로 사용할 때 잘 어울리는 단위이다. 하지만 모바일 기준의 페이지를 만들 경우는 모바일 
기기마다 화면 크기가 다르기 때문에 글씨 크기 역시 화면 크기에 맞게 유동적인게 더 유용한 경우가 있다.  
이를 위해 `vw`, `vh`, `vmin`, `vmax`를 사용하면 화면 크기에 따라 글씨 크기가 반응하도록 할 수 있다.

```css
article h1 {
  font-size: 6vw;
}
article p {
  font-size: 3.5vw;
}
article a {
  font-size: 3vw;
}
```

#### 4. System Fonts

```css
/* 한글 */
ul li:first-of-type {
  font-family: "바탕";
}
ul li:nth-of-type(2) {
  font-family: "굴림";
}

/* 영어 */
ul li:nth-of-type(3) {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
ul li:nth-of-type(4) {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
```

일반적으로 시스템에 기본 설치된 폰트를 말하며, 언어에 따라 설치된 폰트가 다르다.

#### 5. Web Fonts

시스템에 폰트 설치 유무와 상관 없이 어느 시스템에서나 동일 폰트를 사용할 수 있으면서 다양한 폰트를 사용할 수 있도록 웹 폰트를 사용하도록 
설정할 수 있다.

[Google Fonts](https://fonts.google.com/) 를 방문해보자.

![Google Fonts Web Site](/assets/images/posts/2023-03-01-basic-css/google-fonts.png){: width="1000"}

```css
ul li:last-of-type {
  font-family: 'Monoton', cursive;
}
```

![Google Font Sample](/assets/images/posts/2023-03-01-basic-css/google-font-sample.png){: width="600"}

#### 6. Font Awesome

Font Awesome 은 폰트를 이용해 Icons 이미지처럼 보이게 디자인 가능한 외부 라이브러리다.

예를 들어 😀🫠👏☀ ︎⚄ ❆ 이런 아이들은 폰트 아이콘이다. `images` 요소는 아니지만 이미지처럼 사용할 수 있는 특수문자 폰트다. 
이런 것을 가능하게 해주는 라이브러리라 생각하면 된다. 문제는 애플 기기나 최신 안드로이드 기기에서는 정상적으로 표현이 되지만 윈도우 기기는 
아이콘이 투박하게 보이기도 하고 웹에서 디자인을 위해 사용하기에는 아이콘 종류가 턱없이 부족하다.

Font Awesome 의 `.js` 라이브러리를 추가하면 `i` 태그의 class 에 `fab fa-`를 치면 자동완성이 되며 목록을 보여준다(근데 막상 
해보니 `fab fa-` 뒤에 abc 등을 작성해야 자동완성이 뜨고 자동완성 단축키 또는 한 글자만 더 쳤을때는 잘 안 뜬다. 자동완성 목록은 
나오는데 아이콘 미리보기가 안 될 때는 `control + space`를 치면 미리보기 자동완성이 뜬다.).

![Font Awesome Auto Complete](/assets/images/posts/2023-03-01-basic-css/font-awesome-auto-complete.png){: width="1000"}

```html
<p>
  <i class="fab fa-apple"></i>
</p>
<p>
  <i class="fab fa-apple">apple</i>
</p>
<p>
  <i class="fab fa-apple"> apple</i>
</p>
<p>
  <i class="fab fab fa-android"></i>
</p>
```

![Font Awesome Result](/assets/images/posts/2023-03-01-basic-css/font-awesome-result.png){: width="600"}

폰트인 만큼 크기 조절이나 좌우 배치, 색상 조정 역시 쉽다는 장점이 있다.

```css
p i.fa-apple {
  font-size: 50px;
  color: darkslategray
}
```

#### 7. Line Height

```css
.text1 {
  font-size: 20px;
  line-height: 40px;
  border: 1px solid red;
}
.text2 {
  font-size: 20px;
  line-height: 1.5;
  border: 1px solid red;
}
```

`line-height`를 비율로 줄 수 있다. `1`은 위아래 글자 사이의 간격이 없음을 의미하고, `1.5`는 글자 크기의 1.5 배, 그러니까 
이 경우 `30px`이 되어 글자 자신의 크기인 20px 를 제외하면 10px 이 위아래로 각각 5px 씩 여백을 차지한다.  
그리고 디자인 적으로는 `padding`요소처럼 글자 사이 간격이 조절되어 `margin collapse`와 같이 중복이 무시되지는 않는 것으로 보인다.

![Line Height](/assets/images/posts/2023-03-01-basic-css/line-height.png){: width="600"}

#### 8. Letter Spacing

```css
p:nth-of-type(1) {
  letter-spacing: 0px;
}
p:nth-of-type(2) {
  letter-spacing: 2px;
}
p:nth-of-type(3) {
  letter-spacing: -2px;
}
```

![Letter Spacing](/assets/images/posts/2023-03-01-basic-css/letter-spacing.png){: width="800"}

#### 9. Block Size

```css
article {
  border: 1px solid red;
  margin: 10px 0;
}
article:nth-of-type(1) {
  width: 100px;
  height: 100px;
}
article:nth-of-type(2) {
  width: 20%;
  height: 20%;
}
article:nth-of-type(3) {
  width: 20vw;
  height: 20vw;
}
article:nth-of-type(4) {
  width: 20vh;
  height: 20vh;
}
article:nth-of-type(5) {
  width: 20vmin;
  height: 20vmin;
}
article:nth-of-type(6) {
  width: 20vmax;
  height: 20vmax;
}
```

![Block Size](/assets/images/posts/2023-03-01-basic-css/block-size.png){: width="600"}

> `%`는 높이를 지정할 때 부모의 크기가 없다면 무시된다.

#### 10. Box Sizing

```html
<article><div>box1</div></article>
<article><div>box2</div></article>
<article><div>box3</div></article>
```

```css
article {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
article > div {
  width: 100%;
  height: 100%;
  background-color: bisque;
}
article:nth-of-type(1) {
  padding: 0;
}
article:nth-of-type(2) {
  padding: 20px;
}
article:nth-of-type(3) {
  padding: 20px;
  box-sizing: border-box;
}
```

![Box Sizing](/assets/images/posts/2023-03-01-basic-css/box-sizing.png){: width="600"}

`padding`을 주면 의도치 않게 `margin`을 줄때마냥 화면에서 차지하는 공간의 크기가 변경되는 문제가 있었는데, 이럴때 이 block 요소의 
box 크기를 `box-sizing: border-box;`를 주어 고정할 수 있다.  

#### 11. Inline

```html
<p>
  블록 요소 태그는 자동 줄 바꿈 됩니다.
</p>
<p>
  <span>
    <strong>인라인 요소 태그</strong> 등은 <em>좌우로</em> 배치됩니다.
  </span>
</p>
```

```css
p {
  border: 1px solid red;
  height: 100px;
}
strong, em {
  border: 1px solid blue;
  width: 50px;
  height: 50px;
}
```

![Inline 1](/assets/images/posts/2023-03-01-basic-css/inline-1.png){: width="700"}

> `block` 요소 태그와 달리 `inline` 요소 태그는 영역을 잡기 위함이 아니라 글자를 꾸며주거나 서식의 기능을 배치하기 위한 것이기 
> 때문에 기본적으로 `widht`, `height`와 같은 `block`을 다루는 설정은 무시된다.

우리는 이 `display` 설정을 변경할 수 있다.

```css
strong, em {
  border: 1px solid blue;
  display: inline-block;
}
```

`display` 속성값을 `inline-block`으로 주면 기본적으로 `inline`으로 작동하고,

![Inline 1](/assets/images/posts/2023-03-01-basic-css/inline-1.png){: width="700"}

`width`나 `height`같은 `block` 속성을 주게되면 `inline`과 `block`의 속성을 모두 갖는다.

```css
strong, em {
  border: 1px solid blue;
  display: inline-block;
  width: 150px;
  height: 150px;
}
```

![Inline 2](/assets/images/posts/2023-03-01-basic-css/inline-2.png){: width="700"}

만약, `display`의 속성값을 `block`으로 주게되면 `inline` 요소는 무시되고 `block` 요소처럼 작동한다.

```css
strong, em {
  border: 1px solid blue;
  display: block;
  width: 150px;
  height: 150px;
}
```

![Inline 3](/assets/images/posts/2023-03-01-basic-css/inline-3.png){: width="700"}

---

### 4. Backgrounds 👩‍💻

기본적으로 CSS 를 이용해 배경 이미지를 다음과 같이 줄 수 있다.

```css
section {
  width: 300px;
  height: 200px;
  border: 1px solid black;
  background-image: url("../asstes/images/greendreamtree.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
}
```

`background-position`은 가로축, 세로축 순으로 설정하며, `px, %, vw, vh, vmin, vmax`와 같은 단위는 물론이고, 
`left/center/right`와 `top/center/bottom`을 사용할 수도 있다.

<br>

그리고 이미지 2장을 이용해 다음과 같은 처리를 하는 것이 가능하다. 다음 2 이미지를 이용해 하나의 이미지처럼 합쳐서 표현해본다.

![Car 1](/assets/images/posts/2023-03-01-basic-css/car1.jpg){: width="400"}

![Car 2](/assets/images/posts/2023-03-01-basic-css/car2.jpg){: width="400"}

```html
<section>
  <article></article>
  <article></article>
</section>
```

```css
section {
  width: 90vw;
  height: 90vh;
  margin: 5vh auto;
  border: 1px solid #000;
}
section article {
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center center;
}
section article:nth-of-type(1) {
  background-image: url("../img/car1.jpg");
}
section article:nth-of-type(2) {
  background-image: url("../img/car2.jpg");
}
section article {
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center center;
}
```

이렇게 하면 각 `section`의 이미지가 가운데 온다.

![Car not Fixed](/assets/images/posts/2023-03-01-basic-css/car-not-fixed.png){: width="800"}

```css
section {
  width: 90vw;
  height: 90vh;
  margin: 5vh auto;
  border: 1px solid #000;
}
section article {
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center center;
}
section article:nth-of-type(1) {
  background-image: url("../img/car1.jpg");
}
section article:nth-of-type(2) {
  background-image: url("../img/car2.jpg");
}
section article {
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}
```

이미지 하나에 `background-attachment: fixed;`를 주어 하나를 다른 background 요소와 영향을 미치지 않도록 고정시켜주면 
다른 하나 역시 영향을 미치는 background 가 없으므로 아래와 같이 하나의 이미지로 합쳐진 것처럼 보이게 할 수 있다.

![Car Fixed](/assets/images/posts/2023-03-01-basic-css/car-fixed.png){: width="800"}

> `position: fixed;`처럼 화면에 아예 고정되지 않는다. 스크롤 하면 태그가 움직이니 같이 따라간다. 

---

### 5. CSS Initialize 👩‍💻

```html
<article>
  <ul>
    <li>list</li>
    <li>list</li>
  </ul>
  <a href="#">link</a>
</article>
```

```css
article {
  border: 1px solid red;
}
ul li {
  border: 1px solid blue;
}
```

우리가 별도의 스타일을 지정하지 않아도 브라우저마다 특정 태그들의 스타일을 표현해주는 스타일이 존재한다.

![Default Style by Browser](/assets/images/posts/2023-03-01-basic-css/default-style-by-browser.png){: width="800"}

물론 이것들이 기본적인 디자인을 도와주지만 디자인을 하다보면 커스텀에 방해가 되는 상황이 발생한다. 이런 기본 디자인을 없애는 것을 
`CSS 초기화`라고 부른다.

위에서 `a`태그의 밑줄을 제거하고, 모든 태그의 기본 `padding, margin`을 제거하고, `ul, ol`과 같은 태그의 꾸미기 스타일을 제거 
하도록 해보자.

```css
* {
  margin: 0px;
  padding: 0px;
}
ul, ol {
  list-style: none;
}
a {
  text-decoration: none;
}
```

![CSS Initialization](/assets/images/posts/2023-03-01-basic-css/css-initialize.png){: width="800"}

---

### 6. Layout Positions 👩‍💻

#### 1. Float & clear

`block`은 기본적으로 자신의 `block` 내에서 좌우 공간을 모두 사용한다. 그리고 이런 `block` 요소들은 `inline` 속성을 갖는 
`span` 태그로 감싸는 것이 불가능하다(강제로 감싸봤자 잘못된 것으로 인식하고 브라우저는 이를 무시한다).

이런 `block` 요소들을 강제로 좌우 배치하기위해 사용하는 것이 `float`이다.

- block 요소의 기본 상하 배치

```html
<div class="wrap">
  <section class="left"></section>
  <section class="right"></section>
</div>
```

```css
.wrap {
  width: 800px;
  margin: 100px auto;
  border: 5px solid black;
}
.wrap .left {
  width: 400px;
  height: 400px;
  background-color: pink;
}
.wrap .right {
  width: 400px;
  height: 400px;
  background-color: lightblue;
}
```

![float-1](/assets/images/posts/2023-03-01-basic-css/float-1.png){: width="600"}

```css
.wrap .left {
  width: 400px;
  height: 400px;
  background-color: pink;
  float: left;
}
.wrap .right {
  width: 400px;
  height: 400px;
  background-color: lightblue;
  float: left;
}
```

여기에 위와 같이 `float`을 추가하면 `float`은 기본 레이어에서 분리되어 `float`의 레이어 공간에서 `inline` 요소처럼 움직인다.

![float-2](/assets/images/posts/2023-03-01-basic-css/float-2.png){: width="600"}

하지만 또 다른 문제가 생겼다. `warp`이 자식 요소들이 `float` 레이어에 배치되는 바람에 자신의 자식이 없는 것으로 인식해 높이가 
작동하지 않는다.

<span style="color: red;">float 을 부모 태그에 가두려면 반드시 가두려는 부모에서 float 을 **clear** 해줘야한다.</span> 일반적으로 
이를 해결하는 방법은 2가지가 존재한다.

<br>

__1 ) 부모의 `::after`에 `content: ''; display: block; clear: both;` 적용하기__

[Pseudo Classes](#h-3-pseudo-classes) 중 `::after`를 이용해 빈 *content* 를 넣어주고, `block` 요소로 정의한 다음 
`clear:both`를 넣어주면 가상의 공간을 강제로 인식하도록 해 정상적인 표현이 가능해진다.

```css
.wrap::after {
  content: '';
  display: block;
  clear: both;
}
```

![float-3](/assets/images/posts/2023-03-01-basic-css/float-3.png){: width="600"}

> ```css
> .wrap::after {
>   content: '';
>   display: block;
>   clear: both;
> }
> ```
> 
> 는 거의 상용구처럼 사용되는 용법이니 외웠다 그대로 사용해도 무방하다.

<br>

__2 ) 부모에 `display: flow-root;` 적용하기__

```css
.wrap {
  width: 800px;
  margin: 100px auto;
  border: 5px solid black;
  display: flow-root;
}
```

별도의 Pseudo Classes 를 추가로 삽입할 필요 없이 부모에게 `display: flow-root;` 속성을 주기만 하면 된다. 이것을 이용하면 `after`나 
`content`가 영향을 받지 않으므로 필요시 자유롭게 사용이 가능하다. 단, `IE`에서는 안 된다고 한다.



#### 2. Position - Relative

```html
<section></section>
<section></section>
```

```css
section {
  width: 600px;
  height: 200px;
}
section:nth-of-type(1) {
  background-color: pink;
}
section:nth-of-type(2) {
  background-color: lightblue;
  position: relative;
  top: -100px;
  left: 100px;
}
```

![Position - Relative](/assets/images/posts/2023-03-01-basic-css/position-relative.png){: width="600"}

#### 3. Position - Absolute

```html
<div class="left"></div>
<div class="right">
  <p class="box"></p>
</div>
<div class="bottom"></div>
```

```css
.wrap {
  width: 800px;
  border: 5px solid black;
  margin: 50px auto;
}
.wrap::after {
  content: "";
  display: block;
  clear: both;
}
.wrap .left {
  width: 400px;
  height: 400px;
  background-color: lightgreen;
  float: left;
}
.wrap .right {
  width: 400px;
  height: 400px;
  background-color: lightblue;
  float: left;
}
.wrap .right .box {
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  bottom: 30px;
  right: 20px;
}
.wrap .bottom {
  width: 800px;
  height: 100px;
  background-color: pink;
  float: left;
}
```

![Position - Absolute without Relative](/assets/images/posts/2023-03-01-basic-css/position-absolute-without-relative.png){: width="800"}

`position: absolute;`를 주지 않으면 `bottom, right`가 적용되지 않아 속성값을 주었으나 전체 페이지를 기준으로 
`bottom: 30px; right: 20px;`가 적용되었다.

> 정확히는 `position: absolute`는 `position`이 존재하는 부모를 절대위치(absolute)로 계산한다. 그런데 `.wrap .right .box` 
> 의 부모인 `.wrap .right` 역시 position 이 존재하지 않으며, 그 부모인 `.wrap` 역시 존재하지 않아 `body`까지 올라간 것이다.

우리는 이 문제를 해결하기 위해 `position: relative;`를 함께 사용한다. `position: relative;`는 
[Position - Relative](#h-2-position---relative) 에서 처럼 자신의 위치를 상대값으로 적용하기 위해서도 사용하지만 자식의 
`absolute`에게 자신의 `position`을 제공하기 위해서 사용하기도 한다.

```css
.wrap .right {
  width: 400px;
  height: 400px;
  background-color: lightblue;
  float: left;
  position: relative;
}
```

와 같이 바로 위 부모에게 `position: relative;`를 주면 의도한대로 표현이 가능하다.

![Position - Absolute with Relative](/assets/images/posts/2023-03-01-basic-css/position-absolute-with-relative.png){: width="800"}

#### 4. Position - Fixed

```html
<section>
  <article></article>
</section>
<section></section>
<section></section>
```

```css
section {
  width: 100%;
  height: 100vh;
}
section:nth-of-type(1) {
  background-color: orange;
}
section:nth-of-type(2) {
  background-color: lightblue;
}
section:nth-of-type(3) {
  background-color: pink;
}
```

3개의 `section`는 viewport 를 가득 채우는 배경을 순서대로 배치한다. 이번에는 `absolute`가 아닌 `fixed`를 사용해보자.

```css
section article {
  width: 10vw;
  height: 10vw;
  background-color: #000;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
```

<p class="codepen" data-height="450" data-default-tab="css,result" data-slug-hash="OJopqaw" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/OJopqaw">
  CSS display fixed</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

`fixed`는 다른 요소와 완전히 무관하게 무조건 브라우저의 viewport 를 기준으로 고정된다. 즉, 화면 크기가 바뀌어 viewport 영역 자체가 
변경되지 않는 한 HTML 내 어떤 요소들이 움직이든 `viewport 에 fixed`되어있다.

#### 5. object-fit

![Car 1](/assets/images/posts/2023-03-01-basic-css/car1.jpg){: width="600"}

이미지를 `div`로 만든 box 에 넣어보자.

```html
<div class="box1">
  <img src="img/car1.jpg" alt="자동차">
</div>
<div class="box2">
  <img src="img/car1.jpg" alt="자동차">
</div>
<div class="box3">
  <img src="img/car1.jpg" alt="자동차">
</div>
```

```css
div {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  float: left;
  margin: 50px;
}
div img {
  width: 100%;
  height: 100%;
}
```

![Image in Box](/assets/images/posts/2023-03-01-basic-css/image-in-box.png){: width="800"}

영역 크기에 맞춰 이미지가 찌그러진다.

이를 제어하기 위해 `img` 태그에 `object-fit` 속성을 줘보자.

```css
.box1 img {
  object-fit: fill;
}
.box2 img {
  object-fit: cover;
}
.box3 img {
  object-fit: contain;
}
```


이는 `background-image: url("");`를 사용해 삽입한 태그의 배경을 제어하기 위해 사용했던 `background-size` 속성값의으로 
*cover*, *contain* 등의 값을 사용하는 것과 같다. 단, background-image 가 아니라 `img`태그로 삽입된 이미지를 제어한다. 

![Image in Box with object-fit](/assets/images/posts/2023-03-01-basic-css/image-in-box-object-fit.png){: width="800"}

#### 6. z-index

```html
<div class="wrap">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

```css
.wrap {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  margin: 100px auto;
  position: relative;
}
.wrap .left {
  width: 200px;
  height: 200px;
  background-color: blue;
  position: absolute;
  top: 50px;
  left: 50px;
}
.wrap .right {
  width: 200px;
  height: 200px;
  background-color: red;
  position: absolute;
  bottom: 50px;
  right: 50px;
}
```

![Z-Index 1](/assets/images/posts/2023-03-01-basic-css/z-index-1.png){: width="400"}

렌더링 순서에 의해 파란 상자 위에 빨간 상자가 그려지게된다. 하지만 우리는 `z-index`를 이용해 `z-axis`의 값을 임의로 조정해 
순서를 컨트롤 할 수 있다.

`z-index`의 default 값은 `0` 이므로 파란 상자에 `z-index: 1;`만 주어도 빨간 상자보다 위로 오게 된다.

```css
.wrap .left {
  width: 200px;
  height: 200px;
  background-color: blue;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1;
}
```

하지만 이런식으로 상대적인 값을 정의할 때는 두 요소 모두 정의를 해 명확한 의도로 표현하고 다른 속성이 방해하지 않도록 하는 것이 
더 좋다. 따라서 파란 상자와 빨간 상자의 `z-index`를 각각 2와 1로 주는 것이 더 좋다.

```css
.wrap .left {
  width: 200px;
  height: 200px;
  background-color: blue;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 2;
}
.wrap .right {
  width: 200px;
  height: 200px;
  background-color: red;
  position: absolute;
  bottom: 50px;
  right: 50px;
  z-index: 1;
}
```

![Z-Index 2](/assets/images/posts/2023-03-01-basic-css/z-index-2.png){: width="400"}

#### 7. Opacity & RGBA

```html
<div class="wrap">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

```css
.wrap {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  margin: 100px auto;
  position: relative;
}
.wrap .left {
  width: 200px;
  height: 200px;
  background-color: blue;
  position: absolute;
  top: 50px;
  left: 50px;
}
.wrap .right {
  width: 200px;
  height: 200px;
  background-color: red;
  position: absolute;
  bottom: 50px;
  right: 50px;
  opacity: 0.5;
}
```

우리는 `opacity`를 이용해 대상의 투명도를 조절할 수 있다. 이것은 `rgba`의 4번째 parameter 와 동일하다.

```css
.wrap .right {
  width: 200px;
  height: 200px;
  background-color: rgba(255, 0, 0, 0.5);
  position: absolute;
  bottom: 50px;
  right: 50px;
}
```

![Opacity](/assets/images/posts/2023-03-01-basic-css/opacity.png){: width="400"}

---

### 7. Graphic Styling 👩‍💻

#### 1. box-shadow

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
  width: 300px;
  height: 300px;
  background: blue;
  margin: 100px;
  float: left;
  box-shadow: 20px 10px 30px black;
}
.box2 {
  width: 300px;
  height: 300px;
  background: red;
  margin: 100px;
  float: left;
  box-shadow: -20px -20px 0 pink;
}
```

`x-axis, y-axis, blur, color` 순으로 지정한다.

![Box Shadow](/assets/images/posts/2023-03-01-basic-css/box-shadow.png){: width="600"}

#### 2. text-shadow

```html
<p>HELLO WORLD!!</p>
```

```css
p {
  font-weight: bold;
  font-size: 100px;
  font-family: "arial";
  color: #111;
  margin: 100px;
  text-shadow: 30px 30px 10px #aaa;
}
```

`box-shadow`와 속성값을 주는 방식은 동일하다.

![Text Shadow](/assets/images/posts/2023-03-01-basic-css/text-shadow.png){: width="800"}

#### 3. border-radius

```html
<div class="box1"></div>
<div class="box2"></div>
```

```css
.box1 {
  width: 200px;
  height: 200px;
  background-color: blue;
  margin: 100px;
  float: left;
  border-radius: 30px;
}

.box2 {
  width: 200px;
  height: 200px;
  background-color: red;
  margin: 100px;
  float: left;
  border-radius: 50%;
}
```

`border-radius`의 속성값은 *radius*. 즉, 반지름의 값을 주면 된다.

![Border Radius](/assets/images/posts/2023-03-01-basic-css/border-radius.png){: width="400"}

#### 4. linear-gradient

````html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
````

```css
div {
  width: 200px;
  height: 200px;
  float: left;
  margin: 50px;
}
div:nth-of-type(1) {
  background: linear-gradient(to bottom, blue, red);
}
div:nth-of-type(2) {
  background: linear-gradient(to top, blue, red);
}
div:nth-of-type(3) {
  background: linear-gradient(to right, blue, red);
}
div:nth-of-type(4) {
  background: linear-gradient(to left, blue, red);
}
div:nth-of-type(5) {
  background: linear-gradient(45deg, blue, red);
}
```

`direction, start color, end color` 순으로 지정한다.

![Linear Gradient](/assets/images/posts/2023-03-01-basic-css/linear-gradient.png){: width="1000"}

#### 5. radial-gradient

```html
<div></div>
<div></div>
```

```css
div:nth-of-type(1) {
  background: radial-gradient(blue, red);
}
div:nth-of-type(2) {
  border-radius: 50%;
  background: radial-gradient(blue, red);
}
```

`start color, end color`만 지정한다. 방향은 자동으로 중심에서 바깥을 향한다.

![Radial Gradient](/assets/images/posts/2023-03-01-basic-css/radial-gradient.png){: width="1000"}

#### 6. filter

```html
<div>
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
  <img src="img/rose.jpg" alt="장미">
</div>
```

```css
/* 필터를 이용한 특수 효과 지정하기 */
div {
  width: 650px; margin: 100px auto;
  border: 1px solid #ccc;
  padding: 10px;
}
div img {
  width: 200px; margin: 6px;
}
/* 수치값이 커질수록 blur 효과 증가 */
div img:nth-of-type(2) {
  filter: blur(3px);
}

/* 1보다 작아지면 어두워지고 커지면 밝아짐 */
div img:nth-of-type(3) {
  filter: brightness(0.5);
}

/* 100%작아지면 대비효과가 낮아지고 높아지면 대비증가 */
div img:nth-of-type(4) {
  filter: contrast(150%);
}

/* 100%로 근접할수록 흑백으로 전환 */
div img:nth-of-type(5) {
  filter: grayscale(100%);
}

/* 0deg는 원래 이미지 색상 0~360deg까지 변경할수록 색상 변경 */
div img:nth-of-type(6) {
  filter: hue-rotate(180deg);
}

/* 100%로 근접할 수록 색감이 정 반대로 전환 */
div img:nth-of-type(7) {
  filter: invert(100%);
}

/* 0으로 근접할 수록 색감의 채도가 낮아짐 */
div img:nth-of-type(8) {
  filter: saturate(0.5);
}

/* 100%로 근접할 수록 갈색톤으로 색감이 변경 */
div img:nth-of-type(9) {
  filter: sepia(100%);
}
```

![CSS Filter](/assets/images/posts/2023-03-01-basic-css/css-filter.png){: width="800"}

---

### 8. Animations 👩‍💻

#### 1. transform 2D

`transform`은 대상의 크기의 비율을 조절하거나 x/y 축으로 틀거나 이동 또는 회전 등의 효과를 줄 수 있다. `transform`을 적용하려면 반드시 
<span style="color: red;">block 또는 inline-block</span> elements 이어야한다. 따라서 단순 `inline` elements 일 경우 
CSS 를 이용해 `display: inline-block;`를 주어야 한다.

```html
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
```

```css
section {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  float: left;
  margin: 50px;
}
section article {
  width: 100%;
  height: 100%;
  background: blue;
  opacity: 0.3;
}
section:nth-of-type(1) article {
  transform: scale(1.3);
}
section:nth-of-type(2) article {
  transform: skewX(20deg);
}
section:nth-of-type(3) article {
  transform: translateY(50px);
}
section:nth-of-type(4) article {
  transform: rotate(20deg);
}
```

![CSS Transform 2D](/assets/images/posts/2023-03-01-basic-css/css-transform-2d.png){: width="1000"}

#### 2. transform 3D

마찬가지로 <span style="color: red;">block 또는 inline-block</span> elements 이어야한다. 그리고 3D 효과를 주기 위해서 원근법 
설정을 해야하는데 `perspective`를 이용해 효과를 준다. 대상으로부터 관찰자가 얼마만큼 떨어져 있는지를 정의하며 일반적으로 block elements 의 
2배 정도면 적당하다.

이미지의 정 중앙앙을 기준으로 x, y, z축이 설정된다. `rotateX`는 x축을 기준으로 회전시키고, `translateX`는 x축 방향으로 밀어버린다고 
생각하면 된다.

```html
<div>
  <section>
    <article></article>
  </section>
  <section>
    <article></article>
  </section>
</div>
<div>
  <section>
    <article></article>
  </section>
  <section>
    <article></article>
  </section>
</div>
<div>
  <section>
    <article></article>
  </section>
  <section>
    <article></article>
  </section>
  <section>
    <article></article>
  </section>
</div>
```

```css
div {
  display: flow-root;
}
section {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  float: left;
  margin: 50px;
  perspective: 400px;
}
section article {
  width: 100%;
  height: 100%;
  background: blue;
  opacity: 0.3;
}
div:nth-of-type(1) section:nth-of-type(1) article {
  transform: rotateX(45deg);
}
div:nth-of-type(1) section:nth-of-type(2) article {
  transform: translateX(30px);
}
div:nth-of-type(2) section:nth-of-type(1) article {
  transform: rotateY(45deg);
}
div:nth-of-type(2) section:nth-of-type(2) article {
  transform: translateY(30px);
}
div:nth-of-type(3) section:nth-of-type(1) article {
  transform: rotateZ(30deg);
}
div:nth-of-type(3) section:nth-of-type(2) article {
  transform: translateZ(100px);
}
div:nth-of-type(3) section:nth-of-type(3) article {
  transform: translateZ(-100px);
}
```

![CSS Transform 3D](/assets/images/posts/2023-03-01-basic-css/css-transform-3d.png){: width="1000"}

<br>

추가로 중심축을 이동하고 싶다면 `transform-origin` attribute 를 이용해 옮길 수 있다. 기본값은 `center center`다.

```html
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
```

```css
section {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  float: left;
  margin: 100px;
  perspective: 600px;
}
section article {
  width: 100%;
  height: 100%;
  background: blue;
  opacity: 0.3;
}
section:nth-of-type(1) article {
  transform: rotateY(120deg);
  transform-origin: center center;
}
section:nth-of-type(2) article {
  transform: rotateY(120deg);
  transform-origin: right center;
}
```

![CSS Transform 3D Move Origin](/assets/images/posts/2023-03-01-basic-css/css-transform-3d-move-origin.png){: width="1000"}

#### 3. transition

`transition` attribute 를 사용하면 이미지에 움직이는 효과를 줄 수 있다.

```html
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
```

```css
section {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  float: left;

  margin: 50px;
  perspective: 400px;
}
section article {
  width: 100%;
  height: 100%;
  background: blue;
  opacity: 0.3;
  transform: rotateX(30deg);
  transform-origin: top left;
}
section:not(:last-of-type) article {
  transition-property: transform, background-color;
  transition-duration: 1s;
  transition-delay: 0s;
}
section:nth-of-type(1) article {
  transition-timing-function: steps(5);
}
section:nth-of-type(2) article {
  transition-timing-function: ease; /* slow -> fast -> slow */
}
section:nth-of-type(3) article {
  transition-timing-function: ease-in; /* slow -> fast */
}
section:nth-of-type(4) article {
  transition-timing-function: ease-out; /* fast -> slow */
}
section:nth-of-type(1) article {
  transition-timing-function: steps(5);
}
section:nth-of-type(5) article {
  transition-timing-function: cubic-bezier(0.46, -0.64, 0.58, 1.39);
}
section:last-of-type article {
  transition: all 2s cubic-bezier(.46, -0.64, .58, 1.39) 0s;
}
section:hover article {
  transform: rotateY(45deg);
  background: red;
}
```

<p class="codepen" data-height="700" data-default-tab="result" data-slug-hash="qBMjjKd" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/qBMjjKd">
  CSS Transition</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

> `cubic-bezier`의 함수에 넣을 parameters 는 [cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67) 에서 만들 수 있다.

#### 4. animation with `@keyframes`

```html
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
<section>
  <article></article>
</section>
```

```css
section {
  width: 250px;
  height: 250px;
  margin: 20px;
  border: 1px solid #000;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
article {
  width: 200px;
  height: 100px;
  background-color: blue;
  background-size: contain;
  background-repeat: no-repeat;
  animation-name: rotation;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-delay: 0s;
}
section:nth-of-type(1) article {
  animation-iteration-count: 2;
}
section:nth-of-type(2) article {
  /*animation 축약문*/
  animation: rotation 5s linear infinite 0s;
}

section:nth-of-type(3) article {
  animation-iteration-count: infinite;
  animation-play-state: paused;
}
/* 마우스 커서를 올리면 재생하기 */
section:nth-of-type(3) article:hover {
  animation-play-state: running;
}
section:nth-of-type(4) article {
  animation-iteration-count: infinite;
}
/* 마우스 커서를 올리면 일시 정지하기 */
section:nth-of-type(4) article:hover {
  animation-play-state: paused;
}
```

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="MWqovyN" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/MWqovyN">
  CSS Animation with @keyframes</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 9. Vector Images 👩‍💻

#### 1. SVG Images

대표적인 Bitmap 기반 이미지는 `jpg`가 있으며 `pixel` 단위로 저장된다. 반면 대표적인 Vector 기반 이미지는 `svg`가 있으며 `vector`
함수를 이용해 vector 함수를 저장한다.

Bitmap 기반 이미지는 사진과 같이 디테일이 많고 색상이 풍부한 실제 사진 같은 것을 저장하는데 적합하고, Vector 기반 이미지는 수학을 이용해
실시간으로 그려내므로 디테일이 많이 필요하지 않은 애니메이션이나 일러스트 같은 것을 저장하는데 적합하다.

```html
<article>
  <svg viewBox="0 0 448 512">
    <path
        d="M350.85 129c25.97 4.67 47.27 18.67 63.92 42 14.65 20.67 24.64 46.67 29.96 78 4.67 28.67 4.32 57.33-1 86-7.99 47.33-23.97 87-47.94 119-28.64 38.67-64.59 58-107.87 58-10.66 0-22.3-3.33-34.96-10-8.66-5.33-18.31-8-28.97-8s-20.3 2.67-28.97 8c-12.66 6.67-24.3 10-34.96 10-43.28 0-79.23-19.33-107.87-58-23.97-32-39.95-71.67-47.94-119-5.32-28.67-5.67-57.33-1-86 5.32-31.33 15.31-57.33 29.96-78 16.65-23.33 37.95-37.33 63.92-42 15.98-2.67 37.95-.33 65.92 7 23.97 6.67 44.28 14.67 60.93 24 16.65-9.33 36.96-17.33 60.93-24 27.98-7.33 49.96-9.67 65.94-7zm-54.94-41c-9.32 8.67-21.65 15-36.96 19-10.66 3.33-22.3 5-34.96 5l-14.98-1c-1.33-9.33-1.33-20 0-32 2.67-24 10.32-42.33 22.97-55 9.32-8.67 21.65-15 36.96-19 10.66-3.33 22.3-5 34.96-5l14.98 1 1 15c0 12.67-1.67 24.33-4.99 35-3.99 15.33-10.31 27.67-18.98 37z"></path>
  </svg>
</article>
```

```css
article {
  width: 500px;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 50px;
  margin: 50px auto;
}
article svg {
  width: 100%;
}
```

> `svg`에서 반드시 필요한 값은 `viewBox`와 path 의 `d` 2가지다.

![SVG Apple Origin](/assets/images/posts/2023-03-01-basic-css/svg-apple-origin.png){: width="300"}

#### 2. Modify SVG Images

CSS 를 이용해 SVG 를 수정해보자.

```css
article svg path {
  fill: transparent;  /* background-color */
  stroke: red;       /* border-color */
  stroke-width: 2;   /* border-width */
}
```

기본적으로 CSS 에서 사용하는 attributes 가 아니라 svg 가 정의하는 attributes 에 맞게 해줘야한다.

![SVG Apple Clipping 1](/assets/images/posts/2023-03-01-basic-css/svg-apple-clipping-1.png){: width="300"}

그런데 이미지 가장자리가 잘리는 것을 볼 수 있다.

`svg`를 보면 `viewBox="0 0 448 512"`인 것을 알 수 있다. 즉, 도화지의 크기가 `(0, 0) ~ (448, 512)` 사이의 공간에서 그려지는
것이다. 그런데 article 내에 svg 이미지가 담인 영역의 공간을 계산해보면
`width = 500px(box size) - 2 * 1px(border) - 2 * 50px(padding)` 즉, `398px`밖에 안 되는 것이다. 마찬가지로 height
역시 잘리게 된다.

![SVG Apple Clipping 2](/assets/images/posts/2023-03-01-basic-css/svg-apple-clipping-2.png){: width="300"}

![SVG Apple Clipping 3](/assets/images/posts/2023-03-01-basic-css/svg-apple-clipping-3.png){: width="400"}

`svg`의 값을 수정에 정상으로 만들어보자. `viewBox="0 0 448 512"`의 크기를 `viewBox="-5 -5 458 522"`로 바꿔보자. 이것은
도화지의 시작점을 `(-5, -5)`만큼 이동한다는 것이다. 따라서 이전과 동일하게 이미지가 중앙에 위치하려면 끝점은 `(+5, +5)`만큼 이동해야한다.
그런데 svg 가 Vector 기반이므로 이 도화지의 시작점과 끝점은 Cartesian Coordinates 의 절대 기준점이 아닌 Vector 함수를 이용한
상태값이다. 따라서 변경된 시작점으로부터 종료점 위치까지 가려면 `(+10, +10)`을 해줘야 하는 것이다.

![SVG Apple Clipping Modified](/assets/images/posts/2023-03-01-basic-css/svg-apple-clipping-modified.png){: width="300"}

이제 이미지의 가장자리까지 정상적으로 표현이 된다.

#### 3. stroke-dasharray

SVG 이미지는 기본적으로 수많은 Vector 의 조합으로 이루어진 선으로 정의된다. 그런데 이 선을 `- - - -`와 같은 `dash` 형태로 만들고 
싶을 때는 어떻게 할 수 있을까? 이때 사용되는 속성이 `stroke-dasharray`와 `stroke-dashoffset`다. 

SVG 이미지는 Vector 이미지이므로 Bitmap 이미지처럼 모든 좌표점을 개별적으로 표현하지 않는다. 이것은 수많은 Vector 값의 조합으로 이루어지는 
만큼 각 Vector 가 도화지에 보여지는 `가시 영역(viewBox)`과 `비가시 영역`으로 나뉜다.

<br>

__*stroke-dasharray* 의 값은 `가시 영역`과 `비가시 영역`의 연속으로 정의된다__

예를 들어 `stroke-dasharray="4"`일 경우 `가시(4) - 비가시(4) - 가시(4) - 비가시(4)`가 연속된다.
만약 `stroke-dasharray="4 1"`일 경우 `가시(4) - 비가시(1) - 가시(4) - 비가시(1)`가 연속된다.
그 이상일 때 역시 마찬가지다. `stroke-dasharray="4 1 2"`일 경우 `가시(4) - 비가시(1) - 가시(2) - 비가시(4)`가 연속된다.
<br>

- No dashes nor gaps

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" />
</svg>
<br>

- Dashes and gaps of the same size

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4" />
</svg>
<br>

- Dashes and gaps of different sizes

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1" />
</svg>
<br>

- Dashes and gaps of various sizes with an odd number of values

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1 2" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1 2" />
</svg>
<br>

- Dashes and gaps of various sizes with an even number of values

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1 2 3" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="4 1 2 3" />
</svg>
<br>

- Dashes starting with a gap

```xml
<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="0 4 0" />
</svg>
```

<svg viewBox="0 0 30 2" xmlns="http://www.w3.org/2000/svg">
  <style>svg { background-color: lightgray; }</style>
  <line x1="0" y1="1" x2="30" y2="1" stroke="red" stroke-dasharray="0 4 0" />
</svg>
<br>

#### 4. stroke-dashoffset

*stroke-dasharray* 가 각각의 선을 표현하는 Vector 와 Vector 사이의 간격을 정의했다면, `stroke-dashoffset`은 
선의 시작 위치를 `shift`한다. 즉, `offset`이란 이름답게 어느 지점부터 시작하는 것이 아닌 Vector 자체를 주어진 값 평행이동 시키듯 라인 내에서 
밀어버린다. 따라서 가시 영역에 있는 Vector 가 일부 비가시 영역으로 넘어가면 그 부분은 표현이 되지 않게 된다.

![SVG Stroke Dash Offset](/assets/images/posts/2023-03-01-basic-css/svg-stroke-dashoffset.png){: width="800"}

#### 5. SVG stroke-dasharray Examples

아까 전 사과 그림에 이어서 진행한다.

```html
<article>
  <svg viewBox="0 0 448 512">
    <path
        d="M350.85 129c25.97 4.67 47.27 18.67 63.92 42 14.65 20.67 24.64 46.67 29.96 78 4.67 28.67 4.32 57.33-1 86-7.99 47.33-23.97 87-47.94 119-28.64 38.67-64.59 58-107.87 58-10.66 0-22.3-3.33-34.96-10-8.66-5.33-18.31-8-28.97-8s-20.3 2.67-28.97 8c-12.66 6.67-24.3 10-34.96 10-43.28 0-79.23-19.33-107.87-58-23.97-32-39.95-71.67-47.94-119-5.32-28.67-5.67-57.33-1-86 5.32-31.33 15.31-57.33 29.96-78 16.65-23.33 37.95-37.33 63.92-42 15.98-2.67 37.95-.33 65.92 7 23.97 6.67 44.28 14.67 60.93 24 16.65-9.33 36.96-17.33 60.93-24 27.98-7.33 49.96-9.67 65.94-7zm-54.94-41c-9.32 8.67-21.65 15-36.96 19-10.66 3.33-22.3 5-34.96 5l-14.98-1c-1.33-9.33-1.33-20 0-32 2.67-24 10.32-42.33 22.97-55 9.32-8.67 21.65-15 36.96-19 10.66-3.33 22.3-5 34.96-5l14.98 1 1 15c0 12.67-1.67 24.33-4.99 35-3.99 15.33-10.31 27.67-18.98 37z"></path>
  </svg>
</article>
```

```css
article {
  width: 500px;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 50px;
  margin: 50px auto;
}
article svg {
  width: 100%;
}
```

다음 CSS 를 추가하자.

```css
article svg path {
  fill: transparent;
  stroke: red;
  stroke-width: 2;
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
}
```

![SVG Apple Stroke Dasharray 1](/assets/images/posts/2023-03-01-basic-css/svg-apple-stroke-dasharray-1.png){: width="300"}

크롬 개발자 도구 창을 열고 값을 계속 증가시키다보면 전체 길이와 같아져 `stroke-dasharray: 0;`일때와 같아지는 순간이 온다. 그 지점을 찾아보자.

![SVG Apple Stroke Dasharray 2](/assets/images/posts/2023-03-01-basic-css/svg-apple-stroke-dasharray-2.png){: width="300"}

![SVG Apple Stroke Dasharray 3](/assets/images/posts/2023-03-01-basic-css/svg-apple-stroke-dasharray-3.png){: width="300"}

```css
article svg path {
  fill: transparent;
  stroke: red;
  stroke-width: 2;
  stroke-dasharray: 1420;
  stroke-dashoffset: 0;
}
```

![SVG Apple Stroke Dasharray 4](/assets/images/posts/2023-03-01-basic-css/svg-apple-stroke-dasharray-4.png){: width="300"}

1420 에서 전체 길이와 첫 번째 viewBox Vector 의 길이가 같아졌다.

그리고 이제 이 `stroke-dasharray: 1420;`의 크기 만큼 반대 방향으로 `stroke-dashoffset: 0;`을 이동해보자. 값은 -1420 이 될 것이다.

```css
article svg path {
  fill: transparent;
  stroke: red;
  stroke-width: 2;
  stroke-dasharray: 1420;
  stroke-dashoffset: -1420;
}
```

![SVG Apple Stroke Dasharray 5](/assets/images/posts/2023-03-01-basic-css/svg-apple-stroke-dasharray-5.png){: width="300"}

다시 반대 방향으로 동일한 크기 만큼 shift 시켰으니 이미지가 보이지 않는다.

여기에 `transition` 효과를 주고, 마우스를 올리면 `stroke-dashoffset: 0;`를 다시 0 으로 돌아가게 해보자.

<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="dyqRBBX" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/dyqRBBX">
  SVG Stroke Control</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>


<br><br>

---
Reference

1. “Do it! 인터랙티브 웹 페이지 만들기.” Youtube. Feb. 09, 2022, [Do it! 인터랙티브 웹 페이지 만들기](https://youtube.com/playlist?list=PLG7te9eYUi7tQydFHAv3h2YT1syQaQs1W).
2. "Universal selectors." MDN Web Docs. Feb. 21, 2023, [MDN - Universal selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors).
3. "stroke-dasharray." MDN Web Docs. Mar. 06, 2023, [MDN - stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
