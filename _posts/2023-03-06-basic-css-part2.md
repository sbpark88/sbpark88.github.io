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

### 11.  👩‍💻

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
