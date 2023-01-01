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
