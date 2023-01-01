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

#### 1. Setting The Viewport

화면 크기와 사용성이 다른 여러 디바이스(컴퓨터, 태블릿, 스마트폰)에 따라 각 화면을 최적화 하기 위해 사용하는 방법으로, 
`HTML`과 `CSS`를 화면에 맞게 자동으로 확대, 축소하거나 디자인을 변경하는 등 자동으로 화면 크기에 반응하도록 하는 
디자인 `Layout`을 말한다.

반응형 웹을 위해서 기본적으로 다음 `meta` 태그를 포함한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

![Setting The Viewport](/assets/images/posts/2022-12-30-w3schools-html-part5/responsive-viewport.png)

> 동일한 사이트를 스마트폰으로 볼 때 `viewport`를 적용하지 않은 경우(왼쪽)와, `viewport`를 적용한 경우(오른쪽)의 차이를 볼 수 있다.

#### 2. Responsive Images

반응형에서 이미지의 `CSS`에 `width: 100%;`를 주면 이미지가 포함된 `HTML` element 의 폭에 맞게 자동으로 
확대(scale up) 또는 축소(scale down)되어 폭을 전부 채운다. 

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="XWBKdZG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/XWBKdZG">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

하지만 위와 같이 세로 이미지의 경우 주로 화면을 세로로 사용하는 스마트폰은 문제가 없지만, 주로 가로로 사용하는 컴퓨터 
환경에서는 `UX`가 매우 떨어진다. 이 때 `max-width`를 이용하면 폭에 맞게 자동으로 확대/축소가 되지만 확대 되는 
크기를 제한할 수 있다. `px`를 이용해 고정값을 줄 수도 있고, `max-width: 100%;`를 주게 되면 이미지의 원본 
크기보다 더 확대되지 않도록 크기를 제한한다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="rNrLevR" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/rNrLevR">
  Responsive Image with max-width</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

#### 3. Different Images with Picture Element

[HTML Picture Element](/html/2022/12/10/w3schools-html-part3.html#h-6-html-picture-element) 에서 
살펴본 것처럼, `pciture` 태그를 이용해 반응형 웹에서 화면 크기에 따라 서로 다른 이미지를 보여줄 수 있다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="jOprqpK" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOprqpK">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 4. Responsive Text Size

반응형 디자인에서 각 요소들의 위치를 지정하는 `Layout`과 이미지 크기와 같은 것만 능동적으로 변화하는 것은 컴퓨터와 
스마트폰에서 눈과의 거리가 비슷해 글씨 크기에 큰 변화가 없다는 전제 조건을 가정한 경우다. 화면 크기의 변화가 크거나, 
내용에 해당하는 글씨 크기가 아닌 제목과 같은 글시 크기는 이미지 크기와 마찬가지로 적극적으로 반응할 필요가 있다.

이를 위해서 글씨 크기를 고정값이 아닌 화면 폭을 기준으로 자동으로 확대/축소 되도록 `vw`를 사용한다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="RwBRaeK" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/RwBRaeK">
  Responsive Text</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `vw`를 단위로 사용해 화면 폭을 기준으로 자동으로 확대/축소되어 크기가 일정하게 유지되는 1, 2번째 문장과 달리 
> 3, 4번째 문장은 고정값으로 작동하는 것을 확인할 수 있다.

#### 5. Media Queries

반응형 디자인을 할 때 가장 많이 사용하는 방법 중 하나가 `CSS`에 `@media`를 이용해 `Media Queries`를 작성하는 것이다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="PoBzNVJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/PoBzNVJ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 6. With Frameworks

[CSS Framworks](#h-2-layout-techniques) 를 사용하면, 반응형 디자인을 쉽게 구현할 수 있다.

<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="ExpyKJx" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ExpyKJx">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>
<p class="codepen" data-height="500" data-default-tab="html,result" data-slug-hash="rNrLegE" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/rNrLegE">
  Responsive</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 25. HTML Computercode 👩‍💻

컴퓨터의 코드와 연관된 정보를 표현하기 위해 다음과 같은 `HTML` elements 가 있다.

- kdb : Keyboard Input
- samp : Sample Output From a Computer Program
- code : Code Block
- var : 'Variable in Programming' or 'Mathematical Expression' 
- pre : Preformatted Text

> 이 코드들은 브라우저에서 기본적으로 `고정 너비 폰트(monospace font)`로 표현된다.

#### 1. Keyboard Input

```html
<p>Save the document by pressing "<kbd>Command + S</kbd>"</p>
```

Output:

<p>Save the document by pressing "<kbd>Command + S</kbd>"</p>

#### 2. Program Output

콘솔창에 출력되는 것을 표현하기 위한 것이라 보면 된다.

```html
<p>Message from my computer:</p>
<p><samp>File not found.<br>Press F1 to continue</samp></p>
```

Output:

<p>Message from my computer:</p>
<p><samp>File not found.<br>Press F1 to continue</samp></p>


#### 3. Computer Code(Code Block)

`Markdown`에서 \` 3개로 감싸 코드블럭을 만드는 것의 `HTML` 버전이다.

```html
<code>
x = 5;
y = 6;
z = x + y;
</code>
```

Output: 

<code>
x = 5;
y = 6;
z = x + y;
</code>

<br>

- `<pre>` element

`code` element 는 기본적으로 여러 개의 공백과 개행을 전부 무시한다. 따라서 코드 블럭 내에서 이를 허용하려면 
`pre`(preformatted text) 태그로 감싸 작성된 포맷 한다.

```html
<pre>
<code>
x = 5;
y = 6;
z = x + y;
</code>
</pre>
```

Output:

<pre>
<code>
x = 5;
y = 6;
z = x + y;
</code>
</pre>

#### 4. Variable

컴퓨터 프로그래밍 변수 또는 수학식의 변수를 표현하기 위한 태그로, 다른 `Computercode`들과 달리 브라우저에서 기본적으로 
`italic`으로 표현된다.

```html
<p>The area of a triangle is: 1/2 x <var>b</var> x <var>h</var>, where <var>b</var> is the base, and <var>h</var> is the vertical height.</p>
```

Output:

<p>The area of a triangle is: 1/2 x <var>b</var> x <var>h</var>, where <var>b</var> is the base, and <var>h</var> is the vertical height.</p>

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
