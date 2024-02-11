---
layout: post
title: HTML Basic 4
subtitle: Classes, Id, Iframes, File Paths
excerpt_image: NO_EXCERPT_IMAGE
categories: [html]
tags: [w3school, class, id, iframe, file path]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 18. HTML Classes 👩‍💻

- `class` attribute 는 *모든 HTML elements 에 사용*할 수 있다.
- `class` attribute 는 *동일한 class 가 여러 HTML elements 에 존재*하거나 *하나의 HTML element 에 여러 classes 가 
  존재*할 수 있다.
- `class` name 은 `case sensitive` 하다.
- `CSS`로 동일한 속성을 주거나, `JavaScript`를 이용해 iterator 를 사용해 동일한 작동을 하기 위해 사용한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LYBGxWQ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/LYBGxWQ">
  HTML Class Attribute</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

<p class="codepen" data-height="450" data-default-tab="html,result" data-slug-hash="WNKrREN" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNKrREN">
  HTML Class Attribute for JavaScript</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

`case sensitive` 하기 때문에 `Seoul`은 버튼을 눌러도 사라지지 않는다. 

---

### 19. HTML Id 👩‍💻

- `id` attribute 역시 *모든 HTML elements 에 사용*할 수 있다.
- `id` attribute 는 `unique` 하다(= HTML document 내에 중복이 없다).
- `id` name 역시 `case sensitive` 하다.
- `class` attribute 와 마찬가지로 `CSS`나 `JavaScript`를 연결할 수 있으나 일반적이지 않은 특정한 것을 위해 사용한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjBGWPa" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/JjBGWPa">
  HTML Id Attribute for CSS</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

또한 `id` attribute 를 이용해 *페이지의 특정 위치로 이동*이 가능하다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PoagLYB" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/PoagLYB">
  Link Bookmarks</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 20. HTML Iframes 👩‍💻

#### 1. Embed Other Documents

`iframe` 태그는 현재 HTML document 에 *다른 HTML document 를 `inline frame`으로 `embed` 시킨다*.

__Syntax__

```html
<iframe src="url" title="description"></iframe>
```

<br>

- Iframe Size with HTML attributes

```html
<iframe src="/categories.html#h-html" height="400" width="800" title="Iframe Example 1"></iframe>
```

<iframe src="/categories.html#h-html" height="400" width="800" title="Iframe Example 1"></iframe>

<br>

- Iframe Size with CSS

```html
<iframe src="/categories.html#h-html" style="height:400px;width:100%;" title="Iframe Example 2"></iframe>
```

<iframe src="/categories.html#h-html" style="height:400px;width:100%;" title="Iframe Example 2"></iframe>

<br>

- Iframe with removed border

```html
<iframe src="/categories.html#h-html" style="height:400px;width:100%;border:none;" title="Iframe Example 3"></iframe>
```

<iframe src="/categories.html#h-html" style="height:400px;width:100%;border:none;" title="Iframe Example 3"></iframe>

<br>

> 일반적으로 `iframe` 인 것을 속이기 위해 `CSS`에 `border: none;`과 함께 사용한다.

#### 2. Iframe with HTML Link target attribute 

[Link target attribute](/html/2022/12/10/w3schools-html-part3.html#h-2-link-target-attribute) 에서 
`target` attribute 가 갖는 4가지 값 `_self`, `_blank`, `_parent`, `_top`을 살펴봤다. 그런데 이 *a 태그의 target 
attribute 가 iframe 과 사용되면*, 브라우저가 아닌 `iframe 을 대상으로 제어`하는 것이 가능하다.

> `iframe 의 name attribute` 가 `a 태그의 target attribute` 와 **같으면** 브라우저가 아닌 `iframe 의 위치가 제어`된다.

```html
<iframe src="/categories.html#h-html" name="iframe_a" style="height:400px;width:100%;" title="Iframe Example 4"></iframe>

<p>
  <a href="https://sbpark88.github.io"
     style="background-color: cornflowerblue;
            color: white;
            padding: 15px 25px;
            text-align: center;
            text-decoration: none;
            display: inline-block;"
     target="iframe_a">Go to Home</a>
</p>
```

<iframe src="/categories.html#h-html" name="iframe_a" style="height:400px;width:100%;" title="Iframe Example 4"></iframe>
<br>
<p>
  <a href="https://sbpark88.github.io"
     style="background-color: cornflowerblue;
            color: white;
            padding: 15px 25px;
            text-align: center;
            text-decoration: none;
            display: inline-block;"
     target="iframe_a">Go to Home</a>
</p>

> 외부 사이트 연결은 안 되는 것 같다.

---

### 21. HTML File Paths 👩‍💻

`Unix` like 경로 시스템과 동일하게 작동한다.

#### 1. Same Directory as The Current Page

```html
<img src="picture.jpg">
```

현재 페이지와 동일 디렉토리에 있는 `picture.jpg`를 가리킨다.

#### 2. Sub Directory of The Current Page

```html
<img src="images/picture.jpg">
```

현재 페이지가 존재하는 디렉토리 내에 `images` 디렉토리 안에 있는 `picture.jpg`를 가리킨다.

#### 3. Root Directory of The Current Page

```html
<img src="/public/assets/images/picture.jpg">
```

`/`로 시작하면 `root`를 의미한다. `root`를 기준으로 파일까지의 전체 절대 경로를 명시한다.

#### 4. Super Directory of The Current Page

```html
<img src="../picture.jpg">
```

현재 페이지의 상위 디렉토리 내에 있는 `picture.jpg`를 가리킨다.

<br><br>

---
Reference

1. "HTML Tutorial." W3Schools. accessed Dec. 23, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp).
