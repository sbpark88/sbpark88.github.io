---
layout: post
title: HTML Basic - Part 3
subtitle: HTML Links, Images, Favicon, Tables, Lists, Block, Inline
categories: html
tags: [w3school, image, favicon, table, list, block, inline]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 12. HTML Links 👩‍💻

#### 1. Hyperlinks

사용자의 클릭에 의해 `page`를 이동시킨다.

<br>

__Syntax__

```html
<a href="[Address]">
    [Text | HTML element]
</a>
```

<br>

__1 ) Hyperlinks with A Text__

```html
<a href="https://sbpark88.github.io">This link is my blog</a>
```

<a href="https://sbpark88.github.io">This link is my blog</a>

<br>

__2 ) Hyperlinks with An Element__

`Links`는 단순 텍스트 뿐 아니라 `HTML element`와 사용하는 것이 가능하다.

```html
<a href="https://sbpark88.github.io">
  <img src="/assets/images/banners/home.jpeg" alt="My Blog Main Image" style="width:300px">
</a>
```

<a href="https://sbpark88.github.io">
  <img src="/assets/images/banners/home.jpeg" alt="My Blog Main Image" style="width:300px">
</a>

<br>

__3 ) Link to an Email Address__

`href` attribute 의 주소를 `mailto:[E-mail Address]`로 작성하면, 해당 이메일 주소로 새 메일을 보내도록 `메일 앱`을 연다.

```html
<a href="mailto:someone@example.com">Send email</a>
```

<a href="mailto:someone@example.com">Send email</a>

<br>

<span id="button-as-a-link">__4 ) Button as a Link__</span>

`Button` elements 에 `JavaScript`를 이용해 `Link` elements 의 기능을 구현할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwJOmjV" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/RwJOmjV">
  Link to an Email Address</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>
<a href="#hyperlinks-with-button-style">'CSS' 를 이용한 버튼 모양의 'Links'</a> 와 비교해보자.

#### 2. Link `target` attribute

- _self : 기본값으로 현재 `document`와 동일한 `window/tab`에서 연다.
- _blank : 새 `window` 또는 새 `tab`에서 연다.
- _parent : `nested frame` 구조에서 하나 위 frame, 즉, `parent frame`에서 연다.
- _top : `nested frame` 구조에서 최상위 frame, 즉, `_parent`를 여러 번 해 최상위 `docuemnt`에서 `_self`로 여는 `window`의 `full body`로 연다.
 것과 같다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poKBYjz" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/poKBYjz">
  HTML Target</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

(`CodePen` 구조상 `_self`는 작동하지 않으며, 위 `embed`의 `_parent`는 이 페이지가 아니라 `CodePen` `Pens` 의 페이지다.)

#### 3. Link Titles

`title` attribute 는 `Link` elements 와 자주 사용되어 마우스 오버 시 툴팁으로 추가적인 정보를 제공한다.

```html
<a href="https://sbpark88.github.io" title="Go to My Blog Main Page">This link is my blog</a>
```

<a href="https://sbpark88.github.io" title="Go to My Blog Main Page">This link is my blog</a>

```html
<a href="https://sbpark88.github.io" title="Go to My Blog Main Page">
  <img src="/assets/images/banners/home.jpeg" alt="My Blog Main Image" style="width:300px">
</a>
```

<a href="https://sbpark88.github.io" title="Go to My Blog Main Page">
  <img src="/assets/images/banners/home.jpeg" alt="My Blog Main Image" style="width:300px">
</a>

#### 4. Link with CSS

__1 ) Default Hyperlinks__

`HTML Links`는 기본적으로 `기방문`, `미방문`, `클릭 상태`를 다르게 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBKwKdB" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/qBKwKdB">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- link(미방문) : 밑줄 & 파란색
- visited(기방문) : 밑줄 & 보라색
- active(클릭) : 밑줄 & 빨간색

<br>

__2 ) Hyperlinks with CSS__

물론, `CSS`를 이용해 사용자화 할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZERZwZz" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ZERZwZz">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- link(미방문) : 밑줄 X & 녹색 & 배경 X
- visited(기방문) : 밑줄 X & 분홍색 & 배경 X
- hover(마우스오버) : 밑줄 O & 빨간색 & 배경 X
- active(클릭) : 밑줄 O & 노란색 & 배경 X


<br>

<span id="hyperlinks-with-button-style">__3 ) Hyperlinks with Button Style__</span>

`Button` elements 를 사용하지 않고 `CSS`를 이용해 `Link` elements 를 `Button` elements 처럼 보이게 할 수 있다.  
사용자가 볼 때는 `Link` elements 로 구현한 버튼과 `Button` elements 로 구현한 버튼에 차이는 없겠지만 `Link` elements 를 
이용하면 `HTML` 문서를 분석할 때 화면의 버튼이 페이지 이동을 위한 것임을 좀 더 명확히 할 수 있다. 

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BaVEMEP" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/BaVEMEP">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>
<a href="#button-as-a-link">'Button' 태그를 이용한 'Hyperlinks' 구현</a> 과 비교해보자.

#### 5. Link Bookmarks

`Link` elements 는 `URL`을 이용해 페이지를 이동하는 것 뿐 아니라, `id` attribute 를 인식해 페이지 내 해당 `id`와 
일치하는 `HTML` element 로 이동시킨다.

<br>

__Syntax__

```html
<!-- Other page -->
<a href="[URL][#ID]"></a>
<!-- Same page -->
<a href="[#ID]"></a>
```

<br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PoagLYB" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/PoagLYB">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 13. HTML Images 👩‍💻

#### 1. HTML Images Syntax

- src : 이미지 파일 위치
- alt : 이미지 파일이 없을 경우 대체할 텍스트로, 시각 장애인이 사용하는 `스크린 리더` 프로그램은 물론 `SEO`에도 사용되므로 생략하지 않는 것이 좋다.
- width : 이미지 너비(pixel), width 와 height 를 attributes 로 설정하는 방법은 권장되지 않는다. `CSS`를 이용하는 것이 권장된다.
- height : 이미지 높이(pixel), width 와 height 를 attributes 로 설정하는 방법은 권장되지 않는다. `CSS`를 이용하는 것이 권장된다.

> - `<img>` 태그는 웹 페이지에 이미지를 `embed`하기 위해 사용된다. 하지만 기술적으로는 실제로 이미지를 페이지에 삽입하는 것이 아니라, 
>   참조된 이미지(referenced image)를 위한 공간을 생성하고 유지한다.
> - `<img>` 태그는 `<br>` 태그나 `<hr>` 태그와 마찬가지로 `Empty Elements`로 종료 태그가 없다.

```html
<img src="/assets/images/banners/home.jpeg" alt="My Blog Main Image" style="width:300px">
```

#### 2. Image Size

이미지의 크기를 지정하는 우선순위는 다음과 같다.

HTML `attributes` < Internal/External `CSS` < `Inline CSS`

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poKBXvM" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/poKBXvM">
  Link with Title</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

따라서, HTML attributes 로 크기를 지정하면, Internal/External `CSS` 이 우선순위가 높아 설정값 일부를 덮어쓰게된다.

> 이미지 크기는 항상 지정해주는 것이 권장된다. 이미지를 크기를 미리 지정하지 않으면, 이미지가 로딩됨에 따라 페이지 레이아웃이 고정되지 않아 
> 페이지가 로드되는 동안 레이아웃이 변경되며 화면이 깜빡일 수 있어 사용성이 떨어진다.

#### 3. Image Floating

`CSS`의 `float` property 를 이용하면 element 를 글씨의 왼쪽 또는 오른쪽에 별도의 레이어로 띄운다.  
정확한 `CSS Properties`로 이야기하자면, `display: inline-block;` 속성이 된다(즉, `float`을 사용하면 
`display: absolute;`와 동시에 사용될 수 없다).

<br>

- float: none; (default)

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxzNVrx" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/xxzNVrx">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- float: left;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRGaZxv" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/GRGaZxv">
  Float left</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- float: right;

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNyBwzK" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNyBwzK">
  Float right</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 14. HTML Favicon 👩‍💻

---

### 15. HTML Tables 👩‍💻

---

### 16. HTML Lists 👩‍💻

---

### 17. HTML Block & Inline 👩‍💻


<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, last modified latest(Unknown), accessed Dec. 10, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
