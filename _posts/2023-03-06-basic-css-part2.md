---
layout: post
title: Basic CSS - 
subtitle: Basic CSS Style - Part 2
categories: css
tags: [css, media query]
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

다시 *flex* 로 변경하고 크기를 줄여보자.

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

### 12.  👩‍💻

---

### 13.  👩‍💻

---

### 14.  👩‍💻

---

### 15.  👩‍💻

---

### 16.  👩‍💻

---

### 17.  👩‍💻

---

### 18.  👩‍💻

---

### 19.  👩‍💻

---

### 20.  👩‍💻

---



<br><br>

---
Reference

1. “Do it! 인터랙티브 웹 페이지 만들기.” Youtube. Feb. 09, 2022, [Do it! 인터랙티브 웹 페이지 만들기](https://youtube.com/playlist?list=PLG7te9eYUi7tQydFHAv3h2YT1syQaQs1W).
