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
<html lang="en">
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
<html lang="en">
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
<html lang="en">
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
<html lang="en">
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

### 3. HTML Attributes 👩‍💻

#### 1. Attributes

`HTML Attributes`는 `HTML Elements`에 추가적인 정보를 제공한다.

- 모든 `HTML Elements`는 `Attributes`를 가질 수 있다.
- `Attributes`는 해당 `Elements`에 대한 추가적인 정보를 제공한다.
- `Attributes`는 항상 시작 태그에 작성한다.
- `Attributes`는 항상 `Name-Value` 쌍으로 작성한다(i.e. `name="value"`).

<br>

__1 ) href__

```html
<a href="https://sbpark88.github.io">This link is my blog</a>
```

`a` 태그는 `hyperlink`를 정의하며, `href` attribute 를 이용해 페이지 경로를 제공한다.


<br>

__2 ) src__

`img` 태그는 `HTML` 페이지에 이미지를 `embed`한다. 이 때 `src` attribute 를 사용해 이미지 경로를 제공한다.

- Absolute URL : `https://sbpark88.github.io/assets/images/favicon/greendreamtree.png`
- Relative URL : `/assets/images/favicon/greendreamtree.png` 와 같은 형태로 같은 도메인 내 이미지는 
  도메인 경로를 생략할 수 있다.

<br>

__3 ) width and height__

`img` 태그는 이미지 크기를 정의하기 위해 `width`와 `height` attributes 를 사용하며, `pixel` 단위를 사용한다.

```html
<img src="https://sbpark88.github.io/assets/images/favicon/greendreamtree.png" 
     alt="greendreamtree's favicon" 
     width="150" height="150">
```

<br>

__4 ) alt__

`img` 태그의 `alt` attribute 는 이미지 파일이 없을 경우 대체할 텍스트로, 시각 장애인이 사용하는 `스크린 리더` 
프로그램은 물론 `SEO`에도 사용되므로 생략하지 않는 것이 좋다.

<br>

__5 ) style__

`style` attribute 는 태그에 `CSS` 스타일을 제공하기 위해 사용하며, 스타일 중 우선순위가 높지만 권장되는 방식은 아니다.

```html
<p style="color:red;">This is a red paragraph.</p>
```

<br>

__6 ) lang__

`html` 태그의 `lang` attribute 는 검색 엔진과 브라우저에 언어 정보를 제공하므로 반드시 작성하도록 한다.

```html
<!DOCTYPE html>
<html lang="en">
<body>
...
</body>
</html>
```

`en-US`와 같이 `'language code'-'country code'` 형태로 작성할 수도 있다. 이 때 `lang` attribute 는 
앞의 두 글자 `en`을 인식해 영어로 정의한다.

<br>

__7 ) title__

`title` attribute 는 마우스 오버 시 `tooltip`에 보여지는 것으로, 해당 `element`에 대한 추가적인 정보를 제공한다. 

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gOKqodG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/gOKqodG">
  title Attribute</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 2. Recommendations

__1 ) Always Use Lowercase Attributes__

`Attributes` 역시 대소문자의 구분이 없지만 `XHTML`은 소문자를 요구한다. 따라서 `HTML` 역시 소문자 작성이 권장된다.

<br>

__2 ) Always Quote Attribute Values__

- Good

```html
<a href="https://sbpark88.github.io">This link is my blog</a>
```

- Bad

```html
<a href=https://sbpark88.github.io>This link is my blog</a>
```

> `HTML`은 `"`를 안 써도 무방하지만, `XHTML`은 `"`가 요구된다. 따라서 `"`를 사용하는 것이 권장된다.

---

### 4. HTML Headings 👩‍💻

#### 1. Heading Sizes

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNyPXGw" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNyPXGw">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

앞에서도 설명했지만 `h1` 태그가 가장 크고, `h6` 태그가 가장 작다.

하지만 `HTML Headings` 태그가 가지고 있는 기본 폰트 크기는 `CSS` 스타일에 의해 변경될 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKeJQgj" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/KKeJQgj">
  Headings with CSS</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 2. Headings Are Important

`Headings`는 제목을 나타내는 태그이면서 중요도를 표현할 수 있는 중요한 태그로 `<h1>`이 가장 중요하고, 
`<h6>`가 중요도가 가장 낮다. 이 태그가 중요한 이유는 검색 엔진이 이 태그를 이용해 웹 페이지의 구조와 내용을 인덱싱한다.

> 따라서 절대로 일반 텍스트를 크게 하거나 굵게 표현하기 위해 제목이 아닌 곳에 `Headings` 태그를 사용하지 않도록 한다.

---

### 5. HTML Paragraphs 👩‍💻

#### 1. Paragraphs Make a Block of Text

`Paragraphs` 태그는 `text block`을 생성하므로 항상 `new line`을 만들어낸다.

```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

#### 2. HTML Display

`HTML` 내 텍스트는 별도의 태그가 없을 경우 공백과 개행을 브라우저가 처리하기 때문에 작성한 텍스트와 다르게 표현된다.  
이것은 화면의 크기에 따라 브라우저가 능동적으로 처리하기 때문이다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wvXNyOL" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/wvXNyOL">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

#### 3. HTML Horizontal Rules

`Horizontal Rules` 태그는 `HTML` 페이지 내 콘텐츠를 분리하거나 변경 사항을 정의하는데 사용된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWYOEJa" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/XWYOEJa">
  Horizontal Rules</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `<hr>` 태그는 `<br>` 태그와 마찬가지로 `Empty Elements`로 종료 태그가 없다.

#### 4. HTML Line Breaks

`<br>` 태그는 `new line`을 만들어낸다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LYrqdxJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/LYrqdxJ">
  Line Breaks</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 5. HTML Preformatted

`<pre>` 태그는 

```typescript
const formattedString: string = `
  My Bonnie lies over the ocean.

  My Bonnie lies over the sea.

  My Bonnie lies over the ocean.

  Oh, bring back my Bonnie to me.
`
```

또는 

```swift
let formattedString: String = """
  My Bonnie lies over the ocean.

  My Bonnie lies over the sea.

  My Bonnie lies over the ocean.

  Oh, bring back my Bonnie to me.
"""
```

처럼 포맷을 유지한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxzMWPJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/xxzMWPJ">
  Preformatted</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 6. HTML Styles 👩‍💻

#### 1. HTML Style Attribute

`style` attribute 는 `HTML` 태그의 elements 에 색, 크기, 위치 등의 정보를 제공한다.

<br>

__Syntax__

```html
<tagname style="property:value;">
```

`Attributes`는 항상 `Name-Value` 쌍으로 작성했던 것 처럼(i.e. `name="value"`)  
`style` attribute 의 `CSS` Styles 정보는 항상 `Property-Value` 쌍으로 작성한다(i.e. `property:value;`).

#### 2. Color

배경색은 `background-color` property 를 사용하고, 텍스트와 같은 `elements`의 색은 `color` property 를 사용한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZERwVgd" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ZERwVgd">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `text`에 `background-color`를 사용하면 글씨의 배경색이 되고, `color`를 사용하면 글씨 자체의 색이 된다.

#### 3. Texts

__1 ) Font Family__

어떤 폰트를 사용할 것인지를 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="zYaeeKr" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/zYaeeKr">
  Font Family</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__2 ) Font Size__

폰트 크기를 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BaVMMWq" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/BaVMMWq">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

__3 ) Text align__

텍스트의 가로 위치를 설정한다

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BaVMMZq" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/BaVMMZq">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 7. HTML Formatting 👩‍💻



---

### 8.  👩‍💻



---

### 9.  👩‍💻



---

### 10.  👩‍💻



---

### 11.  👩‍💻



---

### 12.  👩‍💻



---

### 13.  👩‍💻



<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, last modified latest(Unknown), accessed Dec. 7, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
