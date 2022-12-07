---
layout: post
title: HTML Basic
subtitle: elements, attributes, styles, tables, lists, classes, id, head, layout, ... etc
categories: swift
tags: [w3school, elements, attributes, styles, tables, lists, classes, id, head, layout]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 1. HTML Basic 👩‍💻

#### 1. HTML Documents

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

- `<!DOCTYPE html>` : 모든 HTML Documents 는 이 정의로 시작되어야한다(대소문자 구분이 없다, `HTML5`는 `<!DOCTYPE>`만 작성한다).  
- `<html> ~ </html>` : HTML Document 자기 자신을 감싸는 태그.
- `<body> ~ </body>` : `Visible` 영역.

#### 2. HTML Headings

`HTML Headings`는 `<h1>`부터 `<h6>`까지 정의되며 `<h1>`이 가장 크다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNyPXGw" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNyPXGw">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

#### 3. HTML Paragraphs

`HTML Paragraphs`는 `<p>` 태그로 정의된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gOKqXGO" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/gOKqXGO">
  Paragraphs</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

#### 4. HTML Links

`HTML Links`는 `<a>` 태그로 정의된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWYOzzE" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/XWYOzzE">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

`href` attribute 와 함께 사용된다.

#### 5. HTML Images

`HTML Images`는 `<img>` 태그로 정의된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eYKxeMV" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/eYKxeMV">
  Images</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- src : 이미지 파일 위치
- alt : 이미지 파일이 없을 경우 대체할 텍스트로, 시각 장애인이 사용하는 `스크린 리더` 프로그램은 물론 `SEO`에도 사용되므로 생략하지 않는 것이 좋다. 
- width : 이미지 너비
- height : 이미지 높이

---

### 2. HTML Elements 👩‍💻

#### 1. Elements

__Syntax__

```html
<tagname>Content goes here...</tagname>
```

거의 모든 `HTML Elements`는 시작 태그와 종료 태그의 쌍으로 이루어진다.

> `<br>`은 종료 태그가 없다. 이를 `Empty Elements`라 한다.

#### 2. Nested HTML Elements

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

`HTML Elements`는 `Elements` 안에 다른 `Elements`를 포함할 수 있다. 즉, `hierarchy` 구조를 갖는다.  
즉, 하위 계층은 상위 게층 내에서 반드시 열리고 닫혀야한다.

- 상위 계층이 끝난 다음 닫히는 태그는 불가능하다

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.

</body>
</p>
</html>
```

- 상위 계층이 끝나기 전에 닫히는 태그가 누락되면 안 된다

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.

</body>
</html>
```

<br>

#### 3. HTML is Not Case Sensitive

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNyPdrX" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNyPdrX">
  HTML is Not Case Sensitive</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

`HTML tags`는 대소문자 구분이 없다. 단, `XHTML`같이 더 엄격한 `Document Types`같은 경우는 소문자를 요구한다. 
따라서 `W3Schools`는 소문자를 권장한다.  

---

### 3.  👩‍💻

---

### 4.  👩‍💻

---

### 5.  👩‍💻

---

### 6.  👩‍💻

---

### 7.  👩‍💻

<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, last modified latest(Unknown), accessed Dec. 7, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
