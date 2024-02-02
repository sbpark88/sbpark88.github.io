---
layout: post
title: Basic CSS Style 2
subtitle: media query, responsive, flex, justify, align, order
categories: [css]
tags: [css, media query, responsive, flex, justify, align, order]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 10. Responsive Web Design - Media Queries 👩‍💻

`@media`를 사용하면 화면 크기에 따라 다른 CSS 를 적용할 수 있개 해준다. 이를 반응형 웹 디자인이라 한다.

```html
<article></article>
```

```css
article {
  width: 200px;
  height: 200px;
  background: pink;
  margin: 100px auto;
}

@media screen and (max-width: 900px) {
  article {
    background: orange;
  }
}

@media screen and (max-width: 400px) {
  article {
    background: aqua;
  }
}
```

위 CSS 는 화면의 가로 pixel 값에 따라 article 의 배경색이 변경된다.

- ~ 400px : aqua
- 401px ~ 900px : orange
- 901px ~ : pink

<br>

이때 주의해야 할 것이 아래 있는 CSS 가 위에 있는 CSS 보다 우선순위가 높다는 것이다. *Media Query* 는 !important 와 같은 절대적인 
조건을 주는 것이 아니고 `if`와 같이 조건이 맞을 때만 활성화되는 것이다. 예를 들어 다음과 같은 순서로 적용하면 제대로 분리가 되지 않는다.

```css
article {
	width: 200px;
	height: 200px;
	background: pink;
	margin: 100px auto;
}

@media screen and (max-width:400px) {
  article {
    background:aqua;
  }
}

@media screen and (max-width: 900px) {
	article {
		background: orange;
	}
}
```

- ~ 400px : orange
- 401px ~ 900px : orange
- 901px ~ : pink

> 400px 이하일 때 `@media screen and (max-width:400px)`의 조건이 true 이므로 배경색이 `aqua`가 된다. 그런데 다음에 오는 
> `@media screen and (max-width: 900px)` 조건  역시 true 이므로 배경색은 다시 `orange`로 변경된다.

---

### 11. Flex 👩‍💻

#### 1. flex

`float` 은 웹 layout 을 만들기 위한 문법이라기 보다는 `글, 이미지를 배치하기 위한 문법`이었다. 하지만 당시에는 레이아웃을 위한 별도의 문법이 
없었기 때문에 *float* 을 이용해서 layout 작업을 했던 것이고, 지금은 ***`flex`라는 표준 layout 문법***이 존재한다.

```html
<main>
  <section>
    <article></article>
    <article></article>
    <article></article>
    <article></article>
    <article></article>
  </section>
</main>
```

```css
* {
  margin: 0;
  padding: 0;
}

main {
  width: 100%;
  height: 100vh;
  background: lightcyan;
}

section {
  border: 10px solid blue;
}

section article {
  width: 100px;
  height: 100px;
  background: aqua;
  border: 1px solid #000;
}
```

![Without Flex Layout](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-1.png){: width="600"}

<br>

*article* 의 부모인 *section* 에 `flex`를 적용해보자.

```css
section {
  border: 10px solid blue;
  display: flex;
}
```

![With Flex Layout](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-2.png){: width="600" height="74"}

![With Flex Attributes](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-3.png){: width="400"}

`float`을 이용할 때는 `모든 자식 elements 에 float 을 적용 후 부모에서 clear`해야하므로 코딩량이 매우 많았다. 하지만 `display: flex;`는 
손쉽게 처리한다.

> 부모 element 에 `display: flex;`을 적용하면, 자식이 `block`이든 `inline`이든 상관 없이 `inline-block`으로 다룬다.

#### 2. inline-flex

이번에는 `flex` 대신 `inline-flex`를 주어보자.

```css
section {
  border: 10px solid blue;
  display: inline-flex;
}
```

![With Inline-Flex Layout](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-4.png){: width="600" height="74"}

![With Inline-Flex Attributes](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-5.png){: width="400"}

- flex : 부모 element 는 `block`을 유지하며, 자식 elements 는 `inline-block`으로 다룬다.
- inline-flex : 부모 element 와 자식 elements 모두 `inline-block`으로 다룬다.

#### 3. flex-direction

`flex-direction`의 기본값은 `row`다. 이를 `column`으로 변경해보자.

```css
section {
  border: 10px solid blue;
  display: inline-flex;
  flex-direction: column;
}
```

![With Inline-Flex Column Direction Layout](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-6.png){: width="600"}

![With Inline-Flex Column Direction Attributes](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-7.png){: width="400"}

#### 4. flex-wrap

```css
section {
  border: 10px solid blue;
  display: flex;
}
```

다시 `flex` 로 변경하고 크기를 줄여보자.

![With Flex Layout Narrow Width](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-8.png){: width="200" height="74"}

*float 은 공간이 부족하면 다음 라인으로 자식 elements 가 내려가 새 block 라인을 만들었는데* `flex 는 그대로 부모와 함께 자식이 찌그러진다`. 
만약 *float 에서와 같이 자동으로 라인 바꿈을 처리하려면* `flex-wrap: wrap;` attribute 를 주어 처리할 수 있다.

```css
section {
  /*width: 100%;*/
  border: 10px solid blue;
  /*box-sizing: border-box;*/
  display: flex;
  flex-wrap: wrap;
}
```

![With Flex Layout Wrapping](/assets/images/posts/2023-03-06-basic-css-part2/layout-flex-9.png){: width="200"}

#### 5. flex-flow

`flex-flow` =  `flex-direction` + `flex-wrap` 을 한 번지 정의할 수 있다.

```css
section {
  border: 10px solid blue;
  display: flex;
  flex-flow: row wrap;
}
```

```css
section {
  border: 10px solid blue;
  display: flex;
  flex-flow: column wrap;
}
```

---

### 12. Alignment children of the Flex Parent 👩‍💻

`flex`를 적용한 부모의 자식 elements 를 정렬해보자.

우선 정렬을 처리할 수 있도록 영역을 키워주기 위해 *section* 의 크기를 100% 로 바꾼다.

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  display: flex;
  flex-flow: row wrap;
}
```

![Alignment 1](/assets/images/posts/2023-03-06-basic-css-part2/alignment-1.png){: width="600"}

*border 의 굵기로 인해 view page 를 넘어간다*. border 를 box 에 포함시키기 위해 `box-sizing: border-box;`를 추가해준다.

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
}
```

![Alignment 2](/assets/images/posts/2023-03-06-basic-css-part2/alignment-2.png){: width="600"}

#### 1. justify-content

이제 정렬을 시작해보자. 현재 *flex-direction* 은 *row* 다. 이 `flex-direction 내 content elements 의 정렬`은 
`justify-content`를 사용한다. 이 경우 *flex-direction* 이 *row* 이므로 자식 elements 들의 가로 정렬이 이루어진다.

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: start; /* flex-start */
}
```

![Alignment 2](/assets/images/posts/2023-03-06-basic-css-part2/alignment-2.png){: width="600"}

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
```

![Alignment 3](/assets/images/posts/2023-03-06-basic-css-part2/alignment-3.png){: width="600"}

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
```

![Alignment 4](/assets/images/posts/2023-03-06-basic-css-part2/alignment-4.png){: width="600"}

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: end; /* flex-end */
}
```

![Alignment 5](/assets/images/posts/2023-03-06-basic-css-part2/alignment-5.png){: width="600"}

#### 2. align-items

이제 이 `flex-direction 축` 자체를 이동시켜보자. 이 경우 *flex-direction* 이 *row* 이므로 이 축은 세로로 움직인다.

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: start; /* flex-start */
}
```

![Alignment 3](/assets/images/posts/2023-03-06-basic-css-part2/alignment-3.png){: width="600"}

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
```

![Alignment 6](/assets/images/posts/2023-03-06-basic-css-part2/alignment-6.png){: width="600"}

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: end; /* flex-end */
}
```

![Alignment 7](/assets/images/posts/2023-03-06-basic-css-part2/alignment-7.png){: width="600"}

#### 3. align-content

이제 이 `flex-direction 축` 자체를 이동시키는 방법으로 `align-content`가 추가로 존재한다. 라인이 하나일 때는 둘이 동일한 모양으로 
정렬을 하지만, 두 줄 이상일 경우는 모양이 달라진다.

- align-items

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
```

![Alignment 8](/assets/images/posts/2023-03-06-basic-css-part2/alignment-8.png){: width="300"}

- align-content

```css
section {
  width: 100%;
  height: 100%;
  border: 10px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-content: center;
}
```

![Alignment 9](/assets/images/posts/2023-03-06-basic-css-part2/alignment-9.png){: width="300"}

원하는 모양에 따라 `align-items` 또는 `align-content`을 적절히 사용해야한다.

> `align-content`를 사용할 때는 반드시 `flex-wrap: wrap;`을 적용해줘야한다.

#### 4. order

기존에 DOM 의 보여지는 순서를 변경하려면 `transform`을 이용해 위치를 직접 지정해 눈속임 하지 않는 한 반드시 DOM 을 수정해야했다. 하지만 `flex`를 
사용하면 container 안에 포함된 elements 가 보여지는 순서를 `DOM 의 제어 없이 CSS 만을 이용해 변경`할 수 있다.

```html
<section>
  <article>1</article>
  <article>2</article>
  <article>3</article>
</section>
```

```css
* {
  margin: 0;
  padding: 0;
}

section {
  width: 100%;
  background: lightcyan;
  display: flex;
}

section article {
  width: 100px;
  height: 100px;
  background: aqua;
  border: 1px solid #000;
  font-size: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 5s;
}
```

![Flex Order 1](/assets/images/posts/2023-03-06-basic-css-part2/flex-order-1.png){: width="300"}

<br>

```css
section article:nth-of-type(1) {
  order: 2;
}
section article:nth-of-type(2) {
  order: 3;
}
section article:nth-of-type(3) {
  order: 1;
}
```

![Flex Order 2](/assets/images/posts/2023-03-06-basic-css-part2/flex-order-2.png){: width="300"}

> `order 에 들어가는 숫자`는 elements 의 순서나 이런 값이 아니다. `z-index 와 마찬가지로 단지 우선순위`일 뿐이며, 기본값은 `0`이다. 
> 따라서 모든 **order** 값을 동일하게 주면 순서가 변경되지 않으며, 동일 order 값일 경우 DOM 순서대로 정렬된다.

#### 5. flex-grow

```html
<section>
  <article>FLEX GROW</article>
  <article>FLEX GROW</article>
  <article>FLEX GROW</article>
</section>
```

```css
section {
  width: 100%;
  background: lightcyan;
  display: flex;
}

section article {
  background: aqua;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 50px;
  color: #fff;
}
```

![Flex Glow 1](/assets/images/posts/2023-03-06-basic-css-part2/flex-grow-1.png){: width="600"}

*section* 에 `flex`를 주어 *section* 은 `block`이므로 라인을 차지하고, 그리고 자식 *article* 은 `flex`가 되어 
content 크기만큼 공간을 차지하고 있다.

<br>

그런데 만약 `flex`를 사용하면서 부모의 `block`을 채우고 싶을 경우는 어떻게 해야할까? 이때 사용할 수 있는 것이 `flex-grow`다. 

```css
section article:nth-of-type(1) {
  flex-grow: 1;
}
section article:nth-of-type(2) {
  flex-grow: 1;
}
section article:nth-of-type(3) {
  flex-grow: 1;
}
```

![Flew Grow 2](/assets/images/posts/2023-03-06-basic-css-part2/flex-grow-2.png){: width="600"}

<br>

```css
section article:nth-of-type(1) {
  flex-grow: 1;
}
section article:nth-of-type(2) {
  flex-grow: 2;
}
section article:nth-of-type(3) {
  flex-grow: 3;
}
```

![Flew Grow 3](/assets/images/posts/2023-03-06-basic-css-part2/flex-grow-3.png){: width="600"}

> `flex-grow 에 들어가는 숫자` 역시 비율값이다. 단, 주의해야 할 것이 **자식 elements block 의 크기 비율이 아니고** 
> <span style="color: red;">자식에 넣을 여백의 비율</span>이다. 따라서 elements 자체 크기의 비율을 맞출 수는 없다.

#### 6. flex-shrink

`flex-grow`의 반대되는 개념으로 여백을 줄이는 `flex-shrink`가 있다.

```html
<section>
  <article>SHRINK</article>
  <article>SHRINK</article>
  <article>SHRINK</article>
</section>
```

```css
section {
  width: 100%;
  background: lightcyan;
  display: flex;
}

section article {
  width: 300px;
  background: aqua;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 50px;
  color: #fff;
}
```

이번에는 `flex-shrink`를 적용을 구분하기 위해 기본 크기를 *300px* 로 주었다.

![Flex Shrink 1](/assets/images/posts/2023-03-06-basic-css-part2/flex-shrink-1.png){: height="45"}

<br>

```css
section article:nth-of-type(1) {
  flex: 3;
}
section article:nth-of-type(2) {
  flex: 2;
}
section article:nth-of-type(3) {
  flex: 1;
}
```

![Flex Shrink 2](/assets/images/posts/2023-03-06-basic-css-part2/flex-shrink-2.png){: height="45"}

아직 부모의 `block` 크기가 자식의 전체 크기보다 커 아무련 효과도 나타나지 않는다.

<br>

![Flex Shrink 3](/assets/images/posts/2023-03-06-basic-css-part2/flex-shrink-3.png){: height="45"}

부모의 `block` 크기가 자식의 전체 크기보다 작아지자 주어진 비율대로 여백을 줄인다.

> - `flex-grow` : 부모의 `block`에 맞게 자식의 여백을 주어진 비율에 여백을 넣어 부모의 `block`을 채운다.
> - `flex-shrink` : 부모의 `block`이 자식의 전체 크기보다 작아질 때 자식의 여백을 주어진 비율에 맞게 줄인다.

#### 7. flex

`flex-grow`와 `flex-shrink` 모두 부모가 `display: flex;` 속성을 갖는 container 안에서 부모의 `block` 크기와 상호 
작용을 했다. 하지만 elements 의 크기가 아닌 여백의 크기를 조절하기 때문에 UI 적으로 좋지 않아 잘 사용되지 않는다.

이번에는 `flex`를 attribute 로 줘보자. 이것은 앞의 두 attributes 와 다르게 자식 elements 자체의 크기를 비율로써 조절한다. 
위 두 attributes 와 마찬가지로 숫자는 비율을 나타낸다.

```css
section article:nth-of-type(1) {
  flex: 1;
}

section article:nth-of-type(2) {
  flex: 2;
}

section article:nth-of-type(3) {
  flex: 1;
}
```

![Flex Attribute](/assets/images/posts/2023-03-06-basic-css-part2/flex-attribute.png){: width="600"}

> 부모에게 설정하는 `display attribute 의 value 로써의 flex`와, 자식에게 설정하는 `flex attribute`는 **서로 다른 것**이다!!


<br><br>

---
Reference

1. “Do it! 인터랙티브 웹 페이지 만들기.” Youtube. Feb. 09, 2022, [Do it! 인터랙티브 웹 페이지 만들기](https://youtube.com/playlist?list=PLG7te9eYUi7tQydFHAv3h2YT1syQaQs1W).
