---
layout: post
title: HTML Basic - Part 5
subtitle: HTML Head, Layout, Responsive, Computercode, Semantics, Style Guide
categories: html
tags: [w3school, head, layout, responsive, computer code, semantics, style guide]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 22. HTML Head 👩‍💻

`HTML`의 `<head>` element 는 `metadata`를 담는 컨테이너로 다음 elements 를 포함한다
(`body` 태그와 동일 레벨에 선언하므로 `body`에 포함되지 않는다. 즉, 화면에 보이지 않는다).

- title : document 의 제목으로, 문자만 포함할 수 있다. title 은 브라우저의 `타이틀 바` 또는 `페이지 탭`에 보여진다. 
          또한 페이지 북마크 시 default 값으로 제공되며, `SEO`에 사용된다.
- meta : `character set`, `keywords`, `page description`, `author`, `viewport` 등을 정의한다.
         `keywords`와 같은 정보는 `SEO`에 사용된다.
- style : document 페이지 내에 `CSS`를 정의할 수 있다. 
- link : 현재 `HTML` document 와 `External Resource`의 관계를 정의하며, 주로 `stylesheet`를 연결하는데 사용된다.
- script : document 페이지 내에 `JavaScript`를 정의할 수 있다.
- base : `base` element 를 사용하면 document 내 `relative path`를 변경하거나 링크 규칙을 변경할 수 있다. 
         `base` 태그는 반드시 `href` 또는 `target` 를 하나 이상 포함해야한다.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="description" content="Free Web tutorials">
  <meta name="author" content="Hogwarts">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="refresh" content="30">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Welcome to Hogwarts</title>
  <link rel="stylesheet" href="mystyle.css">
  <style>
    body {background-color: powderblue;}
    h1 {color: red;}
    p {color: blue;}
  </style>
</head>
<body>
  
</body>
</html>
```

> - `<meta http-equiv="refresh" content="30">` : 30초마다 페이지를 갱신한다.
> - `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">` : 
>   디바이스에 따라 어떤 모양으로 보이게 할 지에 대한 기본값이다.

<br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mdjEVWg" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/mdjEVWg">
  HTML Head base Element</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `base` 태그를 사용하면 `relative path`의 base 를 `https://www.w3schools.com/`로 변경했다. 또한 링크 규칙을 
> `_blank`를 기본값으로 지정했다.

---

### 23. HTML Layout 👩‍💻

#### 1. Layout Elements

절대적으로 정해진 규칙이 있는 것은 아니지만 일반적으로 `HTML`은 `semantic` elements 를 이용해 다음과 같이 구성된다.

![HTML Layout Elements](/assets/images/posts/2022-12-30-w3schools-html-part5/img_sem_elements.gif)

- header : 전체 문서 또는 부분 콘텐츠(section)를 위한 header 를 정의한다.
- nav : navigation links 를 정의한다.
- section : 문서의 콘텐츠를 정의한다.
- article : 문서와 독립된 콘텐츠를 정의한다.
- aside : 페이지에 콘텐츠 외 부가 정보를 위한 사이드바를 정의한다.
- details : 사용자에 의해 열고 닫을 수 있는 추가적인 정보를 정의한다.
- summary : details 를 위한 제목을 정의한다.
- footer : header 와 반대대는 개념으로 마무리를 위한 footer 를 정의한다.

> `semantic` elements 에 대해서는 [26. HTML Semantics](#h-26-html-semantics-) 에서 다시 자세히 설명한다.

#### 2. Layout Techniques

`Layout`을 다루는 방법은 여러 가지가 있으며, 대표적인 4 가지 방법을 소개한다.

<br>

__1 ) CSS Frameworks__

1. [Bootstrap](https://getbootstrap.com)
2. [Tailwind CSS](https://tailwindcss.com)
3. [Foundation](https://get.foundation)
4. [Bulma](https://bulma.io)
5. [Skeleton](http://getskeleton.com)

와 같은 `CSS Frameworks`를 사용하는 것이다. 위 frameworks 에 대한 비교는 
[Top 5 CSS Frameworks][Top 5 CSS Frameworks] 를 참고한다.

<br>

__2 ) CSS Float Layout__

[CSS Float and Clear](https://www.w3schools.com/css/css_float.asp) 이 어떻게 작동하는지만 기억하면 
전체 웹 레이아웃을 쉽게 다룰 수 있다. 단, `float` element 는 전체 문서 흐름의 유연성을 해치는 문제를 갖는다. 
즉, 다양한 디바이스를 커버하도록 반응형 디자인을 구현할 때 잘못 만들면 레이아웃이 깨질 위험이 있다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="abjZNOP" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/abjZNOP">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__3 ) CSS Flexbox Layout__

다른 방법으로는 [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) 를 사용하는 것이다.
`Flexbox`는 다양한 화면 크기와 장치를 커버하는 데 예측 가능한 방식으로 반응형 디자인을 구현하는 데 유용하다.

위 `Float`과 공통된 `CSS`는 `HTML`의 `head`에 포함시키고, 서로 다른 부분만 `CodePen`의 `CSS` 탭에 넣어두었으니 비교해보자. 

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="vYaKGLO" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYaKGLO">
  CSS Layout Flexbox</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__4 ) CSS Grid Layout__

마지막으로 `Grid` 타입 디자인의 경우 `CSS`의 `display` property 의 `grid` 또는 `inline-grid` value 를 
사용해 `Container`와 `Items`의 개념으로 모듈화 하는 것이다.

[CSS Grid Layout Module](https://www.w3schools.com/css/css_grid.asp)

---

### 24. HTML Responsive 👩‍💻

---

### 25. HTML Computercode 👩‍💻

---

### 26. HTML Semantics 👩‍💻

---

### 27. HTML Style Guide 👩‍💻

<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, last modified latest(Unknown), accessed Dec. 30, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
2. "Top 5 CSS Frameworks for Developers and Designers", Browserstack, last modified Mar. 25, 2022, accessed Jan. 1, 2023, [Top 5 CSS Frameworks][Top 5 CSS Frameworks]

[Top 5 CSS Frameworks]:https://www.browserstack.com/guide/top-css-frameworks
