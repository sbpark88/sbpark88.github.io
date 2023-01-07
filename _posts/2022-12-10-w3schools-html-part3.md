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
<a href="#button-as-a-link">'button' 태그를 이용한 'Hyperlinks' 구현</a> 과 비교해보자.

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

#### 4. HTML Image Maps

__1 ) Image Maps__

이미지 위에 클릭 가능한 영역을 지도를 표시하듯 정의한다.

```html
<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/workplace.jpg" alt="Workplace" usemap="#workmap">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="https://www.w3schools.com/html/computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="https://www.w3schools.com/html/phone.htm">
  <area shape="circle" coords="337,300,44" alt="Coffee" href="https://www.w3schools.com/html/coffee.htm">
</map>
```

아래 이미지의 `랩탑`, `스마트폰`, `커피`는 각각 클릭 가능한 영역을 정의하고있다.

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/workplace.jpg" alt="Workplace" usemap="#workmap">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="https://www.w3schools.com/html/computer.htm" target="_blank">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="https://www.w3schools.com/html/phone.htm" target="_blank">
  <area shape="circle" coords="337,300,44" alt="Coffee" href="https://www.w3schools.com/html/coffee.htm" target="_blank">
</map>

> - img > usemap : `usemap` attribute 는 `#[map-name]`을 이용해 이미지 맵에 연결한다(# 을 붙여서 id 값일 것 같지만 name 이다).
> - map : `<map>` 태그는 반드시 `name` attribute 를 가져야한다.
> - area : `<map>` 태그의 `children`으로 1 ~ n 개로 정의하며, 각각의 클릭 가능한 영역을 정의한다. 
>          `<area>` 태그는 `shape`와 `coords` attributes 를 제외하면, `<a>` 태그와 동일하다.

<br>

__2 ) Shape & Coords Attributes__

클릭 가능한 영역의 모양을 정의하는 `shape`는 다음 4 가지로 분류되며, `shape`에 따라 `coords`는 각각 다른 형태로 정의된다.

> - default : 이미지 전체 영역
> - rect : 사각형
> - circle : 원
> - poly : 다각형

<br>

- Shape="rect"

`shape`의 값이 `rect`일 때, `coords`는 (x, y) 좌표계를 이용해 (x<sub>1</sub>, y<sub>1</sub>) ~
(x<sub>2</sub>, y<sub>2</sub>) 로 클릭 가능한 영역을 정의한다.

<p class="center">From</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/rectangular1.png" style="width: 400px;">

<p class="center">To</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/rectangular2.png" style="width: 400px;">

<p class="center">Rectangular Shape</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/rectangular3.png" style="width: 400px;">

```html
<area shape="rect" coords="34,44,270,350" alt="Computer" href="https://www.w3schools.com/html/computer.htm">
```

<br>

- Shape="circle"

`shape`의 값이 `circle`일 때, `coords`는 (x, y) 좌표계를 이용해 원의 중심과 반지름으로 클릭 가능한 영역을 정의한다.

<p class="center">Center</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/circular1.png" style="width: 400px;">

<p class="center">Radius</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/circular2.png" style="width: 400px;">

<p class="center">Circular Shape</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/circular3.png" style="width: 400px;">

```html
<area shape="circle" coords="337,300,44" alt="Coffee" href="https://www.w3schools.com/html/coffee.htm">
```

<br>

- Shape="poly"

포토샵 다각형 도구를 사용하듯 여러 점을 잡아 다각형을 포착한다.

<p class="center">All edges</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/polygonal1.png" style="width: 400px;">

<p class="center">Polygonal Shape</p>

<img src="/assets/images/posts/2022-12-10-w3schools-html-part3/polygonal2.png" style="width: 400px;">

```html
<area shape="poly" 
      coords="140,121,181,116,204,160,204,222,191,270,140,329,85,355,58,352,37,322,40,259,103,161,128,147" 
      alt="Bread" 
      href="https://www.w3schools.com/html/croissant.htm">
```

#### 5. HTML Background Images

__1 ) Background Image on a HTML Element__

`HTML` 의 거의 모든 elements 는 `Background Image`를 가질 수 있으며, `Background Image`는 `style` attribute 의 
`background-image` property 를 이용해 삽입한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKeLJKy" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/KKeLJKy">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

물론, `CSS` 로 빼서 사용하는 것도 가능하다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PoavVwG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/PoavVwG">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__2 ) Background Image on a Page__

`<body>` element 에 추가하면 웹 페이지의 배경으로 사용할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LYroqVK" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/LYroqVK">
  Background-Image on a Page</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__3 ) Background Repeat__

하지만 사진 크기가 작을 경우 화면이 반복된다. `CSS`의 `background-repeat` property 를 이용해 제어할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eYKaxpL" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/eYKaxpL">
  Background-Image No-Repeat</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__4 ) Background Cover__

반복은 멈췄지만 사진이 화면을 채우지 못 한다. `Background` 관련된 몇 가지 `CSS` properties 를 추가로 정의해주면 이를 제어할 
수 있다.


- 원본 비율 유지

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bGKyzpR" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/bGKyzpR">
  Background Cover</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- 풀커버

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYrwbXL" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYrwbXL">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 6. HTML Picture Element

__1 ) HTML Picture Element__

`picture` 태그는 이미지를 하나의 블럭에 조건에 따라 전환시켜준다. 즉, 이미지를 위한 `switch-case`와 같다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZEjzXYe" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ZEjzXYe">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

화면 폭이 650 이상이면 음식 이미지, 화면 폭이 465 이상 ~ 650 미만이면 자동차 이미지, 그 외(source 미지원 또는 465 미만)는 
소녀의 이미지를 보여준다.

> - `picture`는 하나 또는 그 이상의 `source` 태그를 자식으로 갖는다.
> - `source` 태그의 조건은 `media` attribute 에 의해 정의되며, 그때 매칭할 사진은 `srcset` attribute 에 정의한다.
> - `img` 태그는 반드시 포함되어야하는 태그로, 매칭되는 케이스가 없거나 `source` 를 지원하지 않는 경우에 `default`로 사용된다.
> 
> 즉, `picture` 태그 는 `switch`, `source` 태그는 각 `case`, `media` attribute 는 조건, 
> `srcset` attribute 는 매칭 될 경우의 이미지, `img` 태그는 `default`에 해당한다.

<br>

> `picture` 태그는 이미지를 조건에 따라 다르게 보여주지만 `HTML` 태그에 여러 개를 뿌려 놓고 `display: none;` 또는 
> `visibility: hidden;` 처리를 하는 것이 아니다. `CSS`태그를 제어하는 것이 아닌 브라우저의 `Web API`에 의해 제어된다. 
> 따라서 이미지 전환이 `CSS`의 영향으로부터 자유롭다. 

<br>

__2 ) When to use the Picture Element__

- 화면 크기에 따라 구별 : 화면이 작을 경우 굳이 큰 이미지가 필요하지 않다. 따라서 작은 화면에는 작은 이미지를 제공해 대역폭을 
  절약할 수 있다. 또한, 이미지에 텍스트가 포함된 경우 작은 화면에서 보여주기 어려운 경우 작은 화면에 맞춘 별도의 이미지를 만들어 
  화면 크기에 맞는 이미지를 제공할 수 있다.
- 포맷 미지원 문제 해결 : 브라우저에 따라 지원되는 이미지 포맷이 다르다. 보통 `jpeg`, `png` 같은 것들은 문제가 되지 않지만, 
  일부 브라우저가 지원하지 못 하는 이미지 포맷일 가능성이 있는 경우, `picutre` 태그를 이용해 여러 이미지를 제공하면, 브라우저는
  인식 가능한 첫 번째 이미지를 사용한다.

---

### 14. HTML Favicon 👩‍💻

`favicon`은 브라우저의 탭에 해당 웹 페이지를 나타낼 수 있는 작은 이미지다. 일반적으로 웹 서버의 `root` 또는 별도의 이미지 
디렉토리를 만들고 이미지 디렉토리의 `root`에 저장하며, 이름은 `favicon.ico`를 사용한다.

![Favicon - My Blog](/assets/images/posts/2022-12-10-w3schools-html-part3/favicon-my-blog.png)

![Favicon - Apple](/assets/images/posts/2022-12-10-w3schools-html-part3/favicon-apple.png)

![Favicon - Google](/assets/images/posts/2022-12-10-w3schools-html-part3/favicon-google.png)

> `favicon`의 위치나 이름, 확장자는 고정된 것이 아니다. 실제로 이 블로그가 사용하는 `favicon`의 위치와 이름은 다음과 같다.  
> `assets/images/favicon/greendreamtree.png`

브라우저의 `favicon` 포맷 지원 현황

| Browser | 	ICO | 	PNG | 	GIF | 	JPEG | 	SVG |
|---------|------|------|------|-------|------|
| Edge    | 	Yes | 	Yes | 	Yes | 	Yes  | 	Yes |
| Chrome  | 	Yes | 	Yes | 	Yes | 	Yes  | 	Yes |
| Firefox | 	Yes | 	Yes | 	Yes | 	Yes  | 	Yes |
| Opera   | 	Yes | 	Yes | 	Yes | 	Yes  | 	Yes |
| Safari  | 	Yes | 	Yes | 	Yes | 	Yes  | 	Yes |

---

### 15. HTML Tables 👩‍💻

#### 1. HTML Tables

[Tables Generator - HTML](https://www.tablesgenerator.com/html_tables) 을 이용하면 좋다.

`table` 태그는 `tr`태그로 이루어지고, `tr`태그는 다시 `th` 태그 또는 `td`태그로 이루어진다.

- table : 테이블 블럭을 정의
- tr : 테이블 row 를 정의
- th : 테이블 header cell 을 정의
- td : 테이블 cell 을 정의

> 즉, 테이블은 row 가 기본 구조이며, th, td 어떤 셀을 어느 위치에 생성하냐에 따라 가로 테이블이 될 수도 있고, 
> 세로 테이블이 될 수도 있다.

위 4개의 태그가 테이블을 구성하는 가장 기본적인 태그이고, 추가적으로 다음 태그를 사용할 수 있다.

- caption : 테이블 설명을 정의
- colgroup : 아래 `col` 태그를 children 으로 갖는 태그로 `col` 태그를 하나의 그룹으로 묶는다.
- col : 테이블의 column 에 특정 스타일을 적용한다.
- thead : 테이블의 header 콘텐츠를 그룹화 한다.
- tbody : 테이블의 body 콘텐츠를 그룹화 한다.
- tfoot : 테이블의 foot 콘텐츠를 그룹화 한다.

<br>

- caption

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKBPbaj" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/KKBPbaj">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>


- thead, tbody, tfoot

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VwBZqXQ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/VwBZqXQ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 2. Table Borders

__1 ) Table Borders and Collapsing__

테이블의 `border`는 전체 테이블을 구성하는 `table` 태그와 각 셀을 구성하는 `th`, `td` 태그에 적용한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOpNXvO" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOpNXvO">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

Margin 은 `Collapsing`이 기본값이지만 ([Margin Collapsing](/2022/12/08/w3schools-html-part2.html#h-5-css-margin)) 
`Table Borders`는 중복을 피하기 위해 명시적으로 `border-collapse: collpased;` 스타일을 주어 `Collapsing`을 해줘야한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bGjbOQP" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/bGjbOQP">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__2 ) `border-style` property__

`border-style` property 는 주로 사용되는 `solid` 외에도 다양한 값을 가질 수 있다.

<ul>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">dotted</code></span> <span style="xborder:2px solid black;border-style:dotted">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">dashed</code></span> <span style="xborder:2px solid black;border-style:dashed">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">solid</code></span> <span style="xborder:2px solid black;border-style:solid">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">double</code></span> <span style="xborder:2px solid black;border-style:double">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">groove</code></span> <span style="xborder:2px solid black;border-style:groove">&nbsp;&nbsp;&nbsp;&nbsp;</span> </li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">ridge</code></span> <span style="xborder:2px solid black;border-style:ridge">&nbsp;&nbsp;&nbsp;&nbsp;</span> </li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">inset</code></span> <span style="xborder:2px solid black;border-style:inset">&nbsp;&nbsp;&nbsp;&nbsp;</span> </li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">outset</code></span> <span style="xborder:2px solid black;border-style:outset">&nbsp;&nbsp;&nbsp;&nbsp;</span> </li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">none</code></span> <span style="xborder:2px solid black;border-style:none">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
<li><span style="display:inline-block;width:70px;"><code class="w3-codespan">hidden</code></span> <span style="xborder:2px solid black;border-style:hidden">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
</ul>

<br>

__3 ) `border-radius` property__

`border-radius` property 를 이용하면 border 를 둥글게 표현할 수 있다. 

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOpNXdE" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOpNXdE">
  Table with Rounded Borders</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3. Table Sizes

`CSS`의 `width`와 `height` properties 를 이용해 테이블의 전체 크기 및 각 row, column 의 크기를 조절할 수 있다. 

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxJKmML" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/xxJKmML">
  Table width and height</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 4. Table Headers

`th`, `td` 태그는 셀을 생성하는 태그로 horizontal 이든 vertical 이든 `header`로 생성하기를 원하는 셀에 
`td` 태그 대신 `th`태그를 사용하면 된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zYLOeOz" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/zYLOeOz">
  Table Headers</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

위 시간표의 `Weekday`, `Weekend`, `Mon` ~ `Sun`, `Morning`, `Afternoon`, `Evening`은 `th` 태그에 의해 
생성된 `header cell`이다.

추가로 위 시간표는 `thead`, `tbody`, `tfoot`으로 나뉘어있다.

#### 5. Padding & Spacing

__1 ) Cell padding__

글씨가 테이블 border 에 딱 달라붙지 않도록 셀에 padding 을 주기를 원한다면, `th`, `td` 태그에 `padding`을 준다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWBgRZK" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/MWBgRZK">
  Table Padding</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__2 ) Cell margin__

셀에 margin 을 주고 싶을 경우, `th`, `td` 태그에 적용한 `margin`을 주는 것이 아니라 `table` 태그에 
`border-spacing`을 준다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNKeWBN" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNKeWBN">
  Table border-spacing</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 6. Colspan & Rowspan

테이블 셀을 합치고 싶을 경우, `th`, `td` 태그에 `colspan`, `rowspan` attribute 를 사용한다.

- colspan : column 을 합친다.
- rowspan : row 를 합친다.

예제는 [4. Table Headers](#h-4-table-headers) 를 참고한다.

#### 7. Table Styling

__1 ) Zebra Stripes__

```css
tr:nth-child(even) {
  background-color: #D6EEEE;
}
```
![Zebra Stripes](/assets/images/posts/2022-12-10-w3schools-html-part3/zebra-stripes.png)
<br>

__2 ) Vertical Zebra Stripes__

```css
td:nth-child(even), th:nth-child(even) {
  background-color: #D6EEEE;
}
```

![Vertical Zebra Stripes](/assets/images/posts/2022-12-10-w3schools-html-part3/vertical-zebra-stripes.png)
<br>

__3 ) Combine Vertical and Horizontal Zebra Stripes__

```css
tr:nth-child(even) {
  background-color: rgba(150, 212, 212, 0.4);
}

th:nth-child(even),td:nth-child(even) {
  background-color: rgba(150, 212, 212, 0.4);
}
```

![Combine Vertical and Horizontal Zebra Stripes](/assets/images/posts/2022-12-10-w3schools-html-part3/combine-vertical-and-horizontal-zebra-stripes.png)
<br>

__4 ) Horizontal Dividers__

```css
tr {
  border-bottom: 1px solid #ddd;
}
```

![Horizontal Dividers](/assets/images/posts/2022-12-10-w3schools-html-part3/horizontal-dividers.png)
<br>

__5 ) Hoverable Table__

`:hober` 셀렉터를 이용해 마우스 오버시 하이라이트를 줄 수 있다.

```css
tr:hover {background-color: #D6EEEE;}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ExpYzVw" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ExpYzVw">
  Hoverable Table</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 8. Table Colgroup

__1 ) Colgroup Syntax__

`colgroup` 태그는 `col` 태그와 함께 테이블의 column 에 특정 스타일을 적용하며, `colgroup`의 위치는 다음과 같다.

```html
<table>
    <caption></caption>
    <colgroup>
        <col>
        <col>
    </colgroup>
    <thead></thead>
    <tbod></tbod>
    <tfoot></tfoot>
</table>
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poZzqpo" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/poZzqpo">
  Table Colgroup and Col</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__2 ) Prefer CSS to Colgroup__

하지만 `colgroup`과 `col`은 제한된 `CSS`(width, visibility, background, border)만 지원하며, 
우선순위가 `CSS`에 비해 낮으므로 `CSS`를 사용하는 것이 더 좋다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyjbwJZ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/dyjbwJZ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `:nth-col`은 `CSS pseudo-class`로 아직 `experimental`로 지원되는 브라우저가 없으므로 `nth-child`를 사용한다.

---

### 16. HTML Lists 👩‍💻

HTML 은 `Unordered Lists`, `Ordered Lists`, `Description Lists` 를 사용할 수 있다.

#### 1. Unordered Lists

__1 ) Unordered Lists Syntax__

```html
<ul>
  <li></li>
  <li></li>
</ul>
```

`ul` 태그는 `list-style-type`을 style property 로 갖는다.

- disc : default, bullet `●` 으로 표현된다.
- circle : 속이 빈 bullet 과 같다. `○` 으로 표현된다.
- square : `■` 로 표현된다.
- none : 아무런 표시도 하지 않는다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eYjYOgR" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/eYjYOgR">
  Unordered Lists</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__2 ) Nested Unordered Lists__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKBKPQa" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/KKBKPQa">
  Nested Unordered Lists</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__3 ) Horizontal Unordered Lists with CSS__

`CSS`를 이용하면 리스트의 방향을 세로에서 가로로 바꿀 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNMNvEJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/oNMNvEJ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 2. Ordered Lists

__1 ) Ordered Lists Syntax__

```html
<ol>
  <li></li>
  <li></li>
</ol>
```

`ol` 태그는 `type` attribute 를 갖는다.

- 1 : default, 숫자로 표현된다.
- A : 알파벳 대문자로 표현된다.
- a : 알파벨 소문자로 표현된다.
- I : 대문자 로마 숫자로 표현된다.
- i : 소문자 로마 숫자로 표현된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYaYBeM" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYaYBeM">
  Ordered Lists</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__2 ) Control Ordered List Counting__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYaYBRw" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYaYBRw">
  Control Ordered Lists Counting</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__3 ) Nested Ordered Lists__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rNrNBvp" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/rNrNBvp">
  Nested Ordered Lists</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3. Description Lists

HTML Lists 는 `ul`과 `ol` 외에도 `dl`을 사용할 수 있다.

__Syntax__

```html
<dl>
  <dt></dt>
  <dd></dd>
  <dt></dt>
  <dd></dd>
</dl>
```

- dl : description lists 를 정의한다.
- dt : description term 을 정의한다.
- dd : description term 을 설명한다(describe).

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BaPaBPj" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/BaPaBPj">
  Description Lists</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 17. HTML Block & Inline 👩‍💻

모든 HTML Elements 는 `CSS display` property 의 값으로 `block` 또는 `inline`을 기본으로 갖는다.

#### 1. Block-level Elements

- 가능하다면 항상 라인 하나를 차지한다(new line, full width).
- 브라우저는 자동으로 앞, 뒤에 `margin`을 일부 추가한다.

대표적으로 `p`, `div` 태그가 해당되며, 리스트는 다음과 같다.

<div style="font-size: 20px; color: darkkhaki;">
  <div>
    <span style="color:darkmagenta">&lt;</span>address<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>article<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>aside<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>blockquote<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>canvas<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>dd<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>div<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>dl<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>dt<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>fieldset<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>figcaption<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>figure<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>footer<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>form<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>h6<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>header<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>hr<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>li<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>main<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>nav<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>noscript<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>ol<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>p<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>pre<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>section<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>table<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>tfoot<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>ul<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>video<span style="color:darkmagenta">&gt;</span>
  </div>
</div> 

#### 2. Inline Elements

`Inline Elements`는 대표적으로 `span` 태그가 해당되며, `Block-level Elements`와 반대로 `new line`을 생성하지 않으며, 
`width` 역시 필요한 만큼만 사용한다.

리스트는 다음과 같다.

<div style="font-size: 20px; color: darkkhaki;">
  <div>
    <span style="color:darkmagenta">&lt;</span>a<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>abbr<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>acronym<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>b<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>bdo<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>big<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>br<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>button<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>cite<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>code<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>dfn<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>em<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>i<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>img<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>input<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>kbd<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>label<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>map<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>object<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>output<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>q<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>samp<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>script<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>select<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>small<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>span<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>strong<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>sub<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>sup<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>textarea<span style="color:darkmagenta">&gt;</span>
  </div>
  <div>
    <span style="color:darkmagenta">&lt;</span>time<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>tt<span style="color:darkmagenta">&gt;</span>
    <span style="color:darkmagenta">&lt;</span>var<span style="color:darkmagenta">&gt;</span>
  </div>
</div>


<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, last modified latest(Unknown), accessed Dec. 10, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
