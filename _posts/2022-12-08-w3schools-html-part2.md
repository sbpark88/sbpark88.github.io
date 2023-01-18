---
layout: post
title: HTML Basic - Part 2
subtitle: HTML Styles, Formatting, Quotations, Comments, Color, CSS
categories: html
tags: [w3school, style, formatting, quotation, comment, color, css]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

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

`Formatting` elements 는 `text`에 특별한 타입을 표현한다. 특히 `importnace` 표현은 시각 장애인이 사용하는 
`스크린 리더` 프로그램에서 강조하여 읽으므로 구분지어 주는 것이 좋다.

#### 1. HTML `b` and `strong` Elements

글씨를 굵게 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poKGGYj" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/poKGGYj">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- `<b>` : bold
- `<strong>` : bold & importance

#### 2. HTML `i` and `em` Elements

글씨를 기울임꼴로 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wvXOvra" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/wvXOvra">
  HTML i an em</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- `<i>` : italic
- `<em>` : italic & importance

> `<i>` 와 `<em>` 태그는 `음성`이나 `분위기`를 전달하거나 `기술 용어`, `다른 언어의 문구`, `생각`, 
> `선박 이름`과 같은 것들을 구분해 표현하기 위해 사용된다.

#### 3. HTML `small` Element

글씨를 조금 작게 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWXxWro" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/MWXxWro">
  HTML small</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 4. HTML `mark` Element

글씨를 `형광펜` 마킹처럼 강조해 표현한다. `Markdown`에서 \`markdown\` 로 표현하는 것과 같다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eYKXYVG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/eYKXYVG">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 5. HTML `del` Element

삭제된 텍스트를 정의하며, 브라우저는 글씨를 취소선으로 표현한다. `Markdown`에서 \~~markdown\~~ 로 표현하는 것과 같다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNyVNdJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/oNyVNdJ">
  HTML del</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 6. HTML `ins` Element

삽입된 텍스트를 정의하며, 브라우저는 글씨에 밑줄을 삽입한다. `Markdown`에서 \*markdown\* 또는 \_markdown\_ 로 현하는 것과 같다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyKryea" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/dyKryea">
  HTML del</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 7. HTML `sub` Element

글씨를 아래 첨자`subscript`로 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="LYraYXq" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/LYraYXq">
  HTML ins</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 8. HTML `sup` Element

글씨를 위 첨자`superscript`로 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="gOKEOEp" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/gOKEOEp">
  HTML sup</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 8. HTML Quotations 👩‍💻

#### 1. HTML `q` and `blockquote` Elements

인용구`quotations`를 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NWzJGRP" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/NWzJGRP">
  Quotations</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- `<q>` : 짧은 인용문에 사용하며, 브라우저는 따옴표(quotation marks)로 감싸 표현한다.
- `<blockquote>` : 외부 소스로부터 하나의 섹션을 인용할 때 사용하며, 브라우저는 들여쓰기를 한다.

#### 2. HTML `abbr` Element

`HTML`, `CSS`, `Mr.`, `Dr`, `ASAP`, `ATM`과 같은 약어`abbreviation` 또는 머리글자`acronym`을 표현한다.  
`title` attribute 와 함께 사용해 마우스 오버 툴팁에 약어에 대한 설명을 제공한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjZzYWv" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/JjZzYWv">
  Abbreviations</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `<abbr>` 태그는 브라우저와 번역 시스템 및 검색 엔진에 유용한 정보를 제공한다.

#### 3. HTML `address` Element

사람, 소유자, 기사 등에 대한 연락처 정보`contact information`를 제공한다. 연락처 정보는 email, URL, 물리 주소, 
전화번호, 소셜 미디어 등 다양한 것이 될 수 있다. 브라우저는 기울임꼴로 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="eYKXpRR" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/eYKXpRR">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 4. HTML `cite` Element

무언가를 생산하는 `Work Title`을 위해 사용되는 태그로 `book`, `poem`, `song`, `movie`, `painting` 등이 될 수 있다. 
브라우저는 기울임꼴로 표현한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWYGmVV" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/XWYGmVV">
  Cite</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> 사람 이름은 `<cite>` 태그의 대상이 아니다.

#### 5. HTML `bdo` Element

`Bi-Directional text Override`의 약자로 글씨의 방향을 지정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOKJbZV" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOKJbZV">
  BDO</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `dir` property 와 함께 사용하며, 깂은 `ltr`(left to right)과 `trl`(right to left) 두 가지 옵션이 있다. 

---

### 9. HTML Comments 👩‍💻

주석은 사용자 웹 화면에 보여주지 않기 때문에 정보를 기록하거나 일시적으로 내용을 감추는 데 사용된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJEqMjp" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/OJEqMjp">
  Comments</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 10. HTML Color 👩‍💻

`미리 정의된 컬러 이름`, `RGB`, `HEX`, `HSL`, `RGBA`, `HSLA` 값을 사용할 수 있다.

#### 1. Color Names

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYrPLpG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYrPLpG">
  Color Names</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

[Color Names Supported by All Browsers](https://www.w3schools.com/colors/colors_names.asp) 에 
모든 브라우저에서 사용 가능한 미리 정의된 컬러 이름이 정리되어있다.

#### 2. RGB and RGBA

__1 ) RGB__

`8 bit RGB` 3원색을 이용한 조합으로 각 색상을 `0 ~ 255`로 표현한다.

__Syntax__

```css
p {
    color: rgb(red, green, blue);
}
```

> - `rgb(0, 0, 0)`은 검정색, `rgb(255, 255, 255)`는 하얀색이 된다.
> - `rgb(60, 60, 60)`, `rgb(100, 100, 100)`와 같이 3원색을 값을 동일하게 주면 회색이 된다.

<br>

__2 ) RGBA__

`RGB` 컬러값에 `Alpha channel`이라는 값을 추가해 불투명도`opacity`를 추가적으로 표현한다.

__Syntax__

```css
p {
    color: rgba(red, green, blue, alpha);
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZERPQoV" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/ZERPQoV">
  RGBA</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3. HEX

`RGB`와 동일하나 10진수가 아닌 `16진수`를 사용한다.

__Syntax__

```css
p {
    color: #ff7433;
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWXxKPZ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/MWXxKPZ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `10: A`, `11: B`, ..., `15: F`이므로  
> FF = F x 16<sup>1</sup> + F x 16<sup>0</sup>  
> = 15 x 16<sup>1</sup> + 15 x 16<sup>0</sup> = 255
> 
> 따라서, `#000000`은 검정색, `#FFFFFF`는 하얀색이된다.

<br>

그리고 `HEX` 컬러는 각 3원색의 2자리 값이 동일할 때 축약형 표현이 가능하다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="YzvgqLY" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/YzvgqLY">
  Hex Color Abbreviation</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

만약 `#33bb71`일 경우는 `33`, `bb`는 동일하지만 `71`은 두 자리수 값이 동일하지 않으므로 축약이 불가능하다.

> - `HEX` 컬러는 각 3원색의 2자리 값이 동일할 때 이를 축약할 수 있다.
> - `HEX` 컬러는 `RGB` 컬러를 대체할 수 있으나 `RGBA`는 대체할 수 없다.

#### 4. HSL and HSLA

__1 ) HSL__

`HSL`은 색깔`hue`, 포화도`saturation`, 명도`lightness`로 표현한다.

__Syntax__

```css
p {
    color: hsl(hue, saturation%, lightness%);
}
```

- `hue`는 원의 각도로 색을 표현한다.

> - 0 degree : <span style="color: red;">Red</span>
> - 120 degree : <span style="color: green;">Green</span>
> - 240 degree : <span style="color: blue;">Blue</span>

- `saturation`은 백분위로 색 포화도를 표현한다.

> - 0% : 회색 음영(컬러 표현이 불가능하다)
> - 100% : full color

- `lightness`는 백분위로 색 밝기를 표현한다.

> - 0% : 검정색
> - 100% : 하얀색

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwJdaEJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/RwJdaEJ">
  HSL Color</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__2 ) HSLA__

`RGBA`와 마찬가지로 `HSL`은 `Alpha channel`을 추가해 `HSLA`로 표현할 수 있다.

__Syntax__

```css
p {
    color: hsl(hue, saturation%, lightness%, alpha);
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOKJVdN" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOKJVdN">
  HSLA Color</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 5. Background Color

`HTML` elements 의 배경색을 설정한다. 대상이 텍스트일 경우 글씨의 배경색이 된다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRGeZzY" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/GRGeZzY">
  Background Color</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 6. Text Color

텍스트 컬러를 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjZzXzy" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/JjZzXzy">
  Text Color</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 7. Border Color

`border`의 색상, 즉, `elements`의 테두리 색상을 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="OJEqNqd" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/OJEqNqd">
  Border Color</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

> `border`의 `width`는 기본값이 `medium`으로 `3px`이지만, `style`은 기본값이 `none`이므로 표현을 위해서는 
> 반드시 설정되어야한다.  
> cf. `thin`: 1px, `medium`: 3px, `thick`: 5px

#### 8. Color Values

- `RGB`, `HEX`, `HSL`은 같은 값을 표현할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="vYrPKBz" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/vYrPKBz">
  RGB and HEX and HSL are equal</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- `RGBA`, `HSLA`는 같은 값을 표현할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwJdoxQ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/RwJdoxQ">
  RGBA and HSLA are equal</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 11. HTML CSS 👩‍💻

#### 1. Cascading Style Sheets

`Parent Element`에 적용된 스타일이 `Children Elements`에 적용된다. 즉, `Children`에서 변경하지 않는 한 스타일을 
상속한다.

스타일은 다음 3가지 방법을 통해 `HTML documents`에 적용된다.

> - Inline : `HTML` elements 에 `style` attribute 를 사용
> - Internal : `<head>`에 `<style>` element 를 사용
> - External : `<link>` element 를 사용해 외부 `CSS` 파일을 링크해 사용

<br>

__1 ) Inline CSS__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNymgWz" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNymgWz">
  Inline CSS</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__2 ) Internal CSS__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyKrqEM" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/dyKrqEM">
  Internal CSS</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__3 ) External CSS__

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNymgBJ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/WNymgBJ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br>

- Full URL

```html
<head>
  <link rel="stylesheet" href="https://www.w3schools.com/html/styles.css">    
</head>
```

- Relative URL(동일 웹 페이지)

```html
<head>
  <link rel="stylesheet" href="/html/styles.css">    
</head>
```

- Just File Name(동일 디렉토리)

```html
<head>
  <link rel="stylesheet" href="styles.css">    
</head>
```

#### 2. CSS Colors, Fonts, and Sizes

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="KKeEGPG" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/KKeEGPG">
  CSS Colors, Fonts and Sizes</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 3. CSS Border

`elements`의 테두리애 대한 스타일을 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyKrgyX" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/dyKrgyX">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 4. CSS Padding

[Box Model]:/assets/images/posts/2022-12-08-w3schools-html-part2/html-element-box-model.png

![Box Model][Box Model]

`Padding`은 `element`와 `border` 사이의 간격을 조절한다. 즉, `border` 안쪽 여백을 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="poKYxvQ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/poKYxvQ">
  CSS Padding</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### 5. CSS Margin

`Margin`은 `border`와 다른 `element`의 `border` 사이의 간격을 조절한다. 즉, `border` 바깥쪽 여백을 설정해 
`elements` 간 간격과 위치를 조절하는데 매우 중요하다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwJdepZ" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/RwJdepZ">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<br>

__Margin Collapsing__

![Margin Collapsing](/assets/images/posts/2022-12-08-w3schools-html-part2/margin-collapsing.jpg)

`Margin`은 중복되지 않는다. 겹쳐지며 더 큰 쪽의 값 하나만 적용된다.

<br><br>

---
Reference

1. "HTML Tutorial", W3Schools, accessed Dec. 8, 2022, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)
