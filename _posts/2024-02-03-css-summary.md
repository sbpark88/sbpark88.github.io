---
layout: post
title: CSS Summary
subtitle: Short Book about the grammar of the CSS Styles
excerpt_image: NO_EXCERPT_IMAGE
categories: [css]
tags: [w3c, web standards, css, combinators, pseudo-classes, pseudo-elements, css inheritances, flex, grid, transition, transform, easing function, cubic-bezier, gasp]
---

### 1. CSS Declarations 👩‍

- 내장 방식
- 링크 방식
- 인라인 방식
- @import 방식

1. 내장 방식 : HTML 의 head 안에 `style` 엘리먼트의 content 로 작성하는 방식.
2. 인라인 방식 : HTML 의 엘리먼트에 속성으로 작성하는 방식.
3. 링크 방식 : HTML 의 head 안에 `link` 엘리먼트를 사용해 외부 CSS 파일을 불러오는 방식.
4. @import 방식 : `@import "reset.css"` 또는 `@import url("reset.css")`와 같이 사용한다.

> `링크`방식은 HTML 이 해석되며 `async`로 작동해 여러 개를 동시에 요청하고, 수신 하는 대로 해석한다. 반면 `@import`방식은
> 먼저 요청한 CSS 의 수신이 끝나고 해석을 하는 과정에 `@import`를 보고 요청을 한다. **including** 되는 방식이 아니고
> **lazy loading** 되는 방식이라 일부러 연결을 지연시키는 목적으로 사용될 수 있으나, 제어할 수 없기 때문에 일반적으로 사용되는
> 방법은 아니다. 별도의 번들링이나 빌드 도구를 사용해 **include** 시키고 지연 실행이 필요하면 **JavaScript** 로 제어를 해야 한다.

---

### 2. CSS Selectors 👩‍

#### 1. Basic Selectors

- Universal Selector(전체 선택자)

```css
* {
  color: red;
}
```

- Type Selector(태그 선택자)

```css
li {
  color: red;
}
```

- Class Selector(클래스 선택자)

```css
.orange {
  color: orange;
}
```

- ID Selector(아이디 선택자)

```css
#orange {
  color: orange;
}
```

> Universal > Type > Class > ID 순서로 적용된다. 좀 더 자세한 CSS 우선 순위는 [CSS Specificity](#h-3-css-specificity)를 
> 참고한다.

#### 2. Combinators

- Basic Combinator(일치 선택자)

```css
span.orange {
  color: orange;
}
```

- Child Combinator(자식 선택자)

```css
ul > .orange {
  color: orange;
}
```

- Descendant Combinator(자손 선택자)

```css
div .orange {
  color: orange;
}
```

- Adjacent Sibling Combinator(인접 형제 선택자)

```css
.orange + li {
  color: orange;
}
```

다음 형제 엘리먼트 <span style="color: red;">하나</span>만 선택.

- General Sibling Combinator(일반 형제 선택자)

```css
.orange ~ li {
  color: red;
}
```

다음 형제 엘리먼트를 모두를 선택.

#### 3. Pseudo-class

가상 클래스 선택자는 동작과 관련된 것과 그렇지 않은 것 두 가지로 분류할 수 있다.

__1 ) 동작과 관련된 가상 클래스 선택자__

- hover

마우스를 올려 놓은 상태.

```css
.box {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s;
}

.box:hover {
  width: 300px;
  background-color: cornflowerblue;
}
```

- active

마우스로 클릭을 유지 중인 상태.

```css
.box {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s;
}

.box:hover {
  width: 300px;
  background-color: cornflowerblue;
}
```

- focus

마우스나 `Tab`키에 의해 <span style="color: red;">**HTML 대화형 콘텐츠**([Interactive Content])</span>가 
포커스 된 상태.

```css
input:focus {
  background-color: darkseagreen;
}
```

`input`, `a`, `button`, `label`, `select`와 같은 엘리먼트가 해당되며, **HTML 대화형 콘텐츠**가 아니더라도
<span style="color: red;">tabindex</span> 속성을 사용한 엘리먼트도 `focus`가 될 수 있다.

```html
<div class="box" tabindex="-1"></div>
```

`tabindex="-1"` 속성을 주면 강제로 포커스가 가능하도록 허용한다. 키보드의 `Tab`키로 포커스 가능한 대상의 `index`를
강제로 지정하는 것으로, `-1`이 아닌 다른 값을 주면 `Tab`키에 선택되므로 논리적 흐름을 방해한다. 따라서 키보드의 `Tab`키에
의헤 포커스 될 필요가 없다면 `-1`을 주어 흐름을 방해하지 않도록 해야한다.

<br>

__2 ) 동작과 관련되지 않은 가상 클래스 선택자__

- first-child, last-child, nth-child, ..., nth-of-type

```html
<div class="fruits">
  <span>딸기</span>
  <span>수박</span>
  <div>배</div>
  <p>망고</p>
  <div>오렌지</div>
  <h3>사과</h3>
</div>
```

```css
.fruits span:first-child {
  color: orange;
}
```

`first-child`가 의미하는 것은 다음과 같다.

```css
.fruits span {
  &:first-child {
    color: orange;
  }
}
```

`.fruits`의 자식 중 `span`인 것 중 첫 번째가 아니라, `.fruits`의 자식 중 `span`이면서 첫 번째 자식인 것. 즉 `And`의
개념이다. 따라서 **딸기**가 선택된다.

다음과 같은 경우를 살펴보자.

```css
.fruits div:first-child {
  color: orange;
}
```

`.fruits`의 자식 중 `div`인 것은 찾았으나, 이것이 첫 번째 자식이 아니기 때문에 일치하는 대상이 존재하지 않는다.
만약, `.fruits`의 자식 중 `div`인 것 중 첫 번째를 선택하고자 한다면 `first-of-type`을 사용해야한다.

```css
.fruits div:first-of-type {
  color: orange;
}
```

따라서 **배**가 선택된다.

마찬가지로 `last-child` 역시 `.fruits`의 자식 중 `h3`이면서 마지막 자식인 것을 선택한다.

```css
.fruits h3:last-child {
  color: orange;
}
```

따라서 **사과**가 선택된다.

<br>

`nth-child`, `nth-of-type`에 `*`를 함께 사용하면 다음과 같은 것들을 할 수 있다.

```css
.fruits *:nth-child(even) {
  color: orange;
}

/* Same with
.fruits :nth-child(even) {
  color: orange;
}*/

```

`.fruits`의 자식 중 짝수번째 엘리먼트를 모두 선택한다. 따라서, **수박**, **망고**, **사과**가 선택된다.

> 사실 `.fruits :nth-child(even)`와 같이 공백을 주고 가상 선택자를 사용해도 동일한 대상을 선택한다. 하지만 이 경우
> `.fruits:nth-child(even)`와 같이 실수로 공백이 누락될 경우 전혀 다른 대상을 찾는다.  
> 따라서 `.fruits *:nth-child(even)`와 같이 명확히 의도를 표현하는 것이 좋다.

```css
.fruits *:nth-of-type(even) {
  color: orange;
}

/* Same with
.fruits :nth-of-type(even) {
  color: orange;
}*/

```

`.fruits`의 자식 중 각 타입의 두 번째를 선택하므로, **수박**과 **오렌지**가 선택된다.

> `nth-child`, `first-child`, `last-child`는 `<br />`과 같은 엘리먼트도 모두 자식 엘리먼트이기 때문에 선택에 주의해야한다.
> 반면, `nth-of-type`, `first-of-type`, `last-of-type`은 해당 타입 엘리먼트만 선택한다.
>
> `nth-child`와 `nth-of-type`은 모두 **등차수열(Arithmetic Sequence)**을 포함할 수 있으며, CSS 선택자 자체는
> `1-based index`를 갖는 것과 달리 산술식에 포함되는 `n`은 **0을 포함하는 자연수**로 `0, 1, 2, 3, ...`을 갖는다.

- not(negation selector)

```css
.fruits *:not(div) {
  color: orange;
}

/* Same with
.fruits :not(div) {
  color: orange;
}*/
```

`.fruits`의 자식 중 `span`이 아닌 것을 모두 선택한다. 따라서, **딸기**, **수박**, **망고**, **사과**가 선택된다.

#### 4. Pseudo-element

가상 엘리먼트 선택자는 `::`를 붙인다(`:` 하나만 붙여도 브라우저가 해석은 하지만 표준이 아니다).

- before && content

엘리먼트의 content 의 앞쪽에 가상의 **인라인** 속성의 content 를 삽입한다. `insertAdjacentElement()`메서드의 
포지션 `afterbegin`이 삽입되는 위치와 동일하다.

```html
<!-- beforebegin -->
<div class="box">
  <!-- afterbegin -->
  foo content
  <!-- beforeend -->
</div>
<!-- afterend -->
```

```css
.box::before {
  content: "before!!";
}
```

```javascript
document.querySelector('.box').childNodes[0]  // foo content
```

가상 엘리먼트는 <span style="color: red;">Node 의 자식 엘리먼트가 아니다</span>.

- after && content

`before`와 마찬가지로 content 의 뒷쪽에 가상의 **인라인** 속성의 content 를 삽입한다. 위치는 `beforeend`가 삽입되는 
위치와 동일하다.

```css
.box::after {
  content: "after!!";
}
```

> `before`와 `after`는 반드시 `content` 속성을 가져야한다.

<br>

가성 엘리먼트 선택자는 단지 인라인 텍스트를 삽입하는 것 뿐 아니라 다음과 같이 활용할 수 있다.

```html
<div class="container">
  <div class="box">foo</div>
  <div class="box">bar</div>
  <div class="box">baz</div>
</div>
```

```css
.container {
  display: flex;
  gap: 50px;

  .box {
    width: 200px;
    height: 200px;
    background-color: orange;

    &:nth-of-type(1)::after {
      content: "";
      width: 50px;
      height: 50px;
      background-color: blueviolet;
    }
    &:nth-of-type(2):after {
      content: "wow!";
      width: 50px;
      height: 50px;
      background-color: blueviolet;
    }
    &:nth-of-type(3):after {
      content: "";
      display: block;
      width: 50px;
      height: 50px;
      background-color: blueviolet;
    }
  }
}
```

![Pseudo element after](/assets/images/posts/2024-02-03-css-summary/css-pseudo-element-after.png)

- 첫 번째 box 의 after 가상 엘리먼트는 인라인 엘리먼트에 width, height 를 주었기 때문에 아무런 효과도 적용되지 않는다.
- 두 번째 box 의 after 가상 엘리먼트 역시 인라인 엘리먼트이므로 width, height 는 무시되나, 입력된 content 영역 만큼 
  크기를 가질 수 있어 글자가 포함된 영역 만큼 적용된다.
- 세 번째 box 의 after 가상 엘리먼트는 아무런 글자로 입력되지 않았지만, `display: block`으로 블럭 엘리먼트로 속성을 변경했기 
  때문에 content 의 아래 새 블럭을 갖고, 주어진 width, height 만큼 효과가 적용된다.

#### 5. Attribute Selectors

-

```html
<input type="text" data-fruits-apple="apple" />
<input type="password" />
<input type="text"  disabled />
```

```css
[data-fruits-apple] {
  background-color: lightgreen;
}

input[type="password"] {
  background-color: lightsalmon;
}

input[disabled] {
  background-color: lightskyblue;
}
```

`[type]`, `[disabled]`와 같이 사용할 수 있으나 너무 많은 범위를 선택한다. 다수의 대상을 선택할 때는 `class` 속성을 사용해야하며, 
위와 같이 <span style="color: red;">어떤 엘리먼트 중 특정 속성을 선택하기 위해 사용</span>하거나 `[data-fruits-apple]`와 
같이 <span style="color: red;">기본 속성이 아닌 특정 속성을 선택하기 위해 사용</span>한다.

---

### 3. CSS Inheritances 👩‍

#### 1. Auto Inheritance

CSS 스타일 속성 중 글자/문자와 관련된 대부분의 속성(`color`, `font-style`, `font-weight`, `font-size`, `line-height`, 
`font-family`, `text-align`, ...)은 컨테이너 내 자식에게 상속된다(모든 글자/문자 속성이 상속되는 것은 아님).

#### 2. Force Inheritance

```html
<div class="parent">
  <div class="child">
    <div class="descendent"></div>
  </div>
</div>
```

```css
.parent {
  position: relative;
  width: 500px;
  height: 200px;
  background-color: red;
}

.child {
  width: 450px;
  height: 100%;
  margin: 0 auto;
  background-color: lightgreen;
}

.descendent {
  width: 400px;
  height: inherit;
  margin: inherit;
  background-color: blueviolet;
}
```

![CSS Inheritance 1](/assets/images/posts/2024-02-03-css-summary/css-inheritance-1.png){: width="600"}

너비나 높이같은 경우 대부분 부모의 값을 상속 받아 사용하는 게 유리할 경우 `100%`라는 값을 주어 사용할 수 있다. 하지만 `background-color`, 
`margin`, `padding`과 같은 속성은 이러한 값을 선택할 수 없다. 이런 속성 역시 값으로 `inherit`을 주면 강제 상속을 지정할 수 있다.

#### 3. CSS Specificity

동일 CSS 가 여러 개 선언된 경우, 적용 우선순위에 따라 실제 적용되는 속성값이 정해진다.

1. 우선 순위가 높은 선언이 적용된다.
2. 동일 우선순위 내에서는 마지막에 해석된 선언이 적용된다.

> `Inheritance` > Universal(`*`) > Type(`div`) > `Class` > `ID` > `Inline` > `!important` 순서로 적용된다. 

다음과 같은 경우 CSS 우선 순위 계산에 유의해야한다.

```css
.hello {
  color: red;
}

.hello {
  color: green;
}
```

동일 우선순위가 선언되었고, 녹색이 나중에 해석되므로 글자는 녹색이 된다.

```css
div.hello {
  color: red;
}

.hello {
  color: green;
}
```

같은 `Class` 레벨의 CSS 지만 `div.hello`라는 더 *specific* 한 선택자가 존재하기 때문에 글자는 빨간색이 된다.

```css
div .hello {
  color: red;
}

.hello {
  color: green;
}
```

> `div` 이면서 `.hello`여야 하는 `div.hello`와 달리 `div` 하위에 `.hello`는 같은 레벨에 존재하는 `.hello`와 
> 우선 순위가 같다. 따라서 동일 우선순위 중 녹색이 나중에 해석되므로 글자는 녹색이 된다. 

---

### 4. CSS Attributes 👩‍

#### 1. Box Model

__1 ) Box Model__

HTML 은 기본적으로 `Box Model`을 사용한다. 초창기 웹은 워드 문서와 크게 다르지 않았다. 글과 사진 글과 사진... 따라서
인라인 속성과 블럭 속성 엘리먼트의 박스를 쌓아 나아가는 과정의 연속이다.

__2 ) width, height__

> - `auto`: default
> - 단위값: px, em, vw 등 단위를 지정한다.

기본값 `auto`일 때
- 박스 엘리먼트: *width* 는 부모 엘리먼트의 크기만큼 늘어나고, *height* 는 content 크기 만큼 줄어든다.  
- 인라인 엘리먼트: *width* 와 *height* 는 content 크기 만큼 줄어든다. 

> 엘리먼트가 <span style="color: red;">명시적인 **width**, **height** 값</span>을 가지려면
> 
> - [display](#h-9-display): block, inline-block
> - [position](#h-1-position): absolute, fixed
> - [flex-items](#h-6-css-flex-layout-)
> 
> 가 되어야 한다.

__3 ) max-✱__

max-height, max-width 는 <span style="color: red;">width, height 의 `!important` 보다도 
높은 우선순위</span>를 갖는다.

> - `none`: default, 제한 없음.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - ~~`auto`~~: <span style="color: red;">auto 는 의미를 갖지 못 한다</span>.

__4 ) min-✱__

min-height, min-width 는 <span style="color: red;">width, height 의 `!important` 보다도
높은 우선순위</span>를 갖는다.

> - `0`: default, 제한 없음.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - ~~`auto`~~: <span style="color: red;">auto 는 의미를 갖지 못 한다</span>.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  width: 300px;
  height: 200px;
  background-color: royalblue;
}

.child {
  height: 100px;
  background: orange;
}
```

기본값으로 min-width 는 `0`, max-width 는 `none`, width 는 `auto`를 갖는다. 블럭 엘리먼트이므로 부모의 크기 만큼 늘어난다.

![CSS width 1](/assets/images/posts/2024-02-03-css-summary/css-width-1.png){: width="400"}

<br>

```css
.child {
  max-width: 200px;
  height: 100px;
  background: orange;
}
```

max-width 가 제한됨에 따라 너비가 200으로 제한된다.

![CSS width 2](/assets/images/posts/2024-02-03-css-summary/css-width-2.png){: width="400"}

<br>

```css
.child {
  width: 500px !important;
  max-width: 200px;
  height: 100px;
  background: orange;
}
```

```css
.child {
  min-width: 200px;
  width: 100px !important;
  height: 100px;
  background: orange;
}
```

![CSS width 2](/assets/images/posts/2024-02-03-css-summary/css-width-2.png){: width="400"}

위 두 케이스는 모두 너비가 200이 된다. width 에 `!important`를 주더라도 `max-width`, `min-width`의 우선 순위가 더 높기 때문이다.

#### 2. Units

> - px: 픽셀. 가장 많이 사용되며, 일반적으로 절대 단위로 인식하는 데, 디바이스 상황에 따라서 픽셀에 대한 기준이 조금씩 달라질 수 있기 때문에 
>       따지면 상대 단위로 보는 편이 맞다. 아무런 설정을 하지 않았을 때, 
>       <span style="color: red;">엘리먼트의 **font-size** 기본값은 `16px`</span>이다.
> - %: 상대적 백분율.
> - em: 엘리먼트의 글꼴 크기에 대한 비율. 엘리먼트의 글꼴 크기가 `10px`이면, `1em`은 `10px`이 된다. font-size 가 상속에 의해 영향을 
>       받기 때문에 주의해 사용해야하며 관리가 필요하다.
> - rem: root 엘리먼트(=html)의 글꼴 크기, 각 엘리먼트의 글꼴 크기를 기준으로 하는 `em`과 다르게 *html 의 글꼴 크기를 기준*으로 한다.
> - vw: viewport 가로 너비의 백분율.
> - vh: viewport 세로 높이의 백분율.

```css
.parent {
  width: 300px;
  height: 200px;
  background-color: royalblue;
}

.child {
  width: 20em;
  height: 50%;
  background: orange;
}
```

별도의 font-size 설정을 하지 않았으므로, 기본 font-size 는 `16px`이고, `.child`의 `1em`은 `16px`이다. 그런데 `20em`을 주었으므로, 
너비는 `320px`이 된다.

![CSS unit 1](/assets/images/posts/2024-02-03-css-summary/css-unit-1.png){: width="400"}

<br>

```css
.parent {
  width: 300px;
  height: 200px;
  background-color: royalblue;
  font-size: 10px;
}
```

만약, 부모의 font-size 를 `10px`로 주면 상속되어 `.child`의 `1em`은 `10px`이 되고, `20em`은 `200px`이 된다.

![CSS unit 2](/assets/images/posts/2024-02-03-css-summary/css-unit-2.png){: width="400"}

<br>

```css
.child {
  width: 20rem;
  height: 50%;
  background: orange;
}
```

![CSS unit 1](/assets/images/posts/2024-02-03-css-summary/css-unit-1.png){: width="400"}

`em`은 부모 또는 조상의 font-size 가 달라지면, 상속에 의해 크기가 변할 수 있기 때문에 
<span style="color: red;">혼란스러운 단위가 될 수 있어 관리가 필요</span>하다.

반면 `rem`은 항상 root 엘리먼트인 html 의 font-size 를 기준으로 하기 때문에 
<span style="color: red;">상속에 영향을 받지 않아 안정적</span>이며, 
<span style="color: red;">html 의 font-size 를 변경</span>하는 것 만으로
<span style="color: red;">웹 전체의 크기를 비율로 제어</span>할 수 있다는 장점을 갖는다.

#### 3. Margin

엘리먼트의 외부 여백을 지정하는 단축 속성.

> - `0`: default, 외부 여백 없음.
> - `auto`: 브라우저가 여백을 계산(<span style="color: red;">블럭 엘리먼트 & 가로 너비가 있는 엘리먼트의 
>   가운데 정렬에 활용</span>)(세로 정렬은 안 됨).
> - 단위값: px, em, vw 등 단위를 지정한다(<span style="color: red;">음수</span>값 사용 가능).
> - ~~%~~: <span style="color: red;">부모 엘리먼트의 **가로 너비**에 대한 비율</span>로 지정하지만 
>          실제 사용되는 방식은 아니다.

> `margin-collapsing`이 발생된다.

#### 4. Padding

엘리먼트의 내부 여백을 지정하는 단축 속성.

> - `0`: default, 내부 여백 없음.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - %: <span style="color: red;">부모 엘리먼트의 **가로 너비**에 대한 비율</span>로 지정한다.

> 엘리먼트의 크기가 커진다.

<br>

> **Margin** 과 **Padding** 모두 `%`를 사용하면 부모 엘리먼트의 **가로 너비**에 대한 비율로 지정한다고 했다. 
> 이 부분에서 <span style="color: red;">주의</span>해야 할 것이 `left`와 `right`는 부모 엘리먼트의 `width`에 
> 영향을 받고, `top`과 `bottom`은 부모 엘리먼트의 `height`에 영향을 받을 것 같지만, 부모 엘리먼트의 `height`가 0으로 
> 존재하지 않든, 매우 큰 값을 가지든 상관 없이 <span style="color: red;">**top, right, bottom, left**</span> 
> 모두 <span style="color: red;">부모 엘리먼트의 **가로 너비**에 대한 비율</span>을 참조한다는 것이다.
> 
> 예를 들어
> 
> ```html
> <div class="container">
>   <div class="item"></div>
> </div>
> ```
> 
> 와 같은 구조를 정의하고, 다음과 같이 CSS 를 정의하면, 높이를 지정하지 않아도 항상 16:9 비율의 공간이 생겨난다.
> 
> ```css
> .container {
>   width: 800px;
>   background-color: grey;
>   
>   .item {
>     padding-top: 56.25%;  /* 16:9 */
>   }
> }
> ```
> 
> 그리고 위와 같이 디자인을 위해 불필요한 **item** 이라는 구조를 추가로 생성하지 않고 [Pseudo-element](#h-4-pseudo-element) 
> `before` 또는 `after`를 사용해 다음과 같이 영역을 설정하는 데 사용할 수 있다.
> 
> ```scss
> .container {
>   width: 800px;
>   background-color: grey;
>   
>   &::before {
>     content: "";
>     display: block;
>     padding-top: 56.25%;  /* 16:9 */
>   }
> }
> ```

#### 5. border

엘리먼트의 테두리 선을 지정하는 단축 속성.

- border-width
> - `medium`: default, 중간 두께(<span style="color: red;">medium, thin, thick</span>는 브라우저에 따라 
>   다르게 구현될 수 있어 사용하지 않는다).
> - 단위값: px, em, vw 등 단위를 지정한다.

- border-style
> - `none`: default, 선 없음.
> - `solid`: 실선.
> - `dashed`: 파선(한국에서 점선이라 표현하는 것은 영어로는 dotted 가 아니라 dashed 다).
> - 그 외 dotted, double, groove, ridge, inset, outset 은 일반적으로 사용되지 않는다.

- border-color
> - `black`: default.
> - 색상값: CSS 색상값을 사용한다(red, tomato 와 같은 값은 브라우저마다 다를 수 있어 권장되지 않는다. 일반적으로 `#`을 사용한 
>   HEX 색상코드를 사용하며, RGB 또는 RGBA 를 사용한다).
> - `transparent`: 투명한 border 를 구현한다.

> border: 두께, 종류, 색상; 으로 정의한다(기본값은 medium none black).

> 엘리먼트의 크기가 커진다.

#### 6. border-radius

엘리먼트의 모서리를 둥글게 깎는 단축 속성.

> - `0`: default, 모서리 각짐.
> - 단위값: px, em, vw 등 단위를 지정한다.

> 단축 속성은 10시 방향부터 시계 방향으로 돌며 적용된다(i.e. `border-radius: 0 20px 0 0;`).

#### 7. box-sizing

엘리먼트의 크기 계산 기준을 지정하는 속성

> - `content-box`: default, content 로 크기 계산.
> - `border-box`: `content + padding + border`로 크기 계산.

```html
<div class="item"></div>
<div class="item"></div>
```

```css
.item {
  width: 100px;
  height: 100px;
  background-color: orange;
}
```

- content-box

```css
.item:first-child {
  border: 4px solid red;
  padding: 10px;
}
```

![Box-Sizing Content-Box](/assets/images/posts/2024-02-03-css-summary/box-sizing-content-box.png){: width="300"}

content 에 padding, border 를 합한 영역의 크기는 
`100px(content) + 2 * 10px(padding) + 2 * 4px(border) = 128px`이 된다.

<br>

- border-box

```css
.item:first-child {
  border: 4px solid red;
  padding: 10px;
  box-sizing: border-box;
}
```

![Box-Sizing Border-Box](/assets/images/posts/2024-02-03-css-summary/box-sizing-border-box.png){: width="300"}

content + padding + border 를 합한 영역의 크기가 100px 이므로 
`100px = 2 * 10px(padding) + 2 * 4px(border) + ?(content)`에서 content 의 크기는 `72px`이 된다.

> 위에서 padding 과 border 를 주면 엘리먼트의 크기가 커진다고 했다. 이것은 `box-sizing`이 기본값인 
> `content-box`일 때 행동이다. 위와 같이 `border-box`로 속성을 변경하면,
> <span style="color: red;">width 값이 box 의 크기</span>가 되므로, 
> <span style="color: red;">padding 과 border 를 적용한 만큼 역으로 content 의 크기가 줄어든다</span>.

#### 8. overflow

엘리먼트의 크기 이상으로 content 가 넘쳤을 때, 보여짐을 지정하는 단축 속성으로 
<span style="color: red;">부모 엘리먼트에 적용</span>하는 속성.

> - `visiable`: default, 넘친 내용을 그대로 보여줌.
> - `hidden`: 넘친 내용을 잘라냄.
> - ~~`scroll`~~: 넘친 내용을 잘라냄. 스크롤바 생성(브라우저에 따라 가로 스크롤만 생겨야 하는데 세로 스크롤바까지 
>   같이 생기는 경우가 있어 필요시 auto 를 사용한다).
> - `auto`: 넘친 내용이 있는 경우에만 잘래내고 스크롤바 생성.

#### 9. display

엘리먼트의 화면 출력(보여짐) 특성을 지정하는 속성.

- Type 에 기본으로 지정된 값
> - `block`: default, 상자(레이아웃) 엘리먼트. i.e. `div`
> - `inline`: default, 글자 엘리먼트. i.e. `span`
> - `inline-block`: default, <span style="color: red;">인라인 엘리먼트지만 width, height 속성을 
>   적용할 수 있는 등 일부 블럭 엘리먼트 속성을 추가로 갖는다</span>. i.e. `img`, `button`, `input`, 
>   `label`, `textarea`, `select` 등

- Type 에 기본으로 지정되지 않는 값
> - `flex`: 플렉스 박스(1차원 레이아웃).
> - `grid`: 그리드(2차원 레이아웃).
> - `none`: 보여짐 특성 없음. 화면에서 사라짐.
> - `table`, `table-row`, `table-cell` 등 다양한 속성값이 존재한다.

#### 10. opacity

엘리먼트의 투명도를 지정하는 속성.

> - `1`: default, 불투명.
> - `0..<1`: 1을 100으로 백분율로 환산되어는 값.  

#### 11. font

브라우저가 가지고 있는 기본 CSS 를 초기화 하기 위해 직접 정의한 reset 이 아닌 `reset.css` 라이브러리를 사용하면 `h1`의 크기와 같은 
스타일도 제거되어 필요시 정의해줘야한다.

- font-style
> - `normal`: default, 기울기 없음.
> - `italic`: 이텔릭체.
> - ~~`oblique`~~: 명확하게 기울임이라는 스타일이지만 일반적으로 italic 을 사용함.

- font-weight
> - `normal, 400`: default, 기본 두께
> - `bold, 700`: 두껍게(일반적으로 700이 bold 를 의미하지만 폰트마다 다를 수 있다).
> - ~~`bolder`~~: 부모 엘리먼트보다 더 두껍게(상속에 영향을 받기 때문에 일반적으로 잘 사용하지 않는다).
> - ~~`lighter`~~: 부모 엘리먼트보다 더 얇게(상속에 영향을 받기 때문에 일반적으로 잘 사용하지 않는다).
> - `100...900`: 100 단위 숫자 9개로 표현 가능.

- font-size
> - `16px`: default.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - %: 부모 엘리먼트의 **폰트 크기**에 대한 비율로 지정한다.
> - ~~`larger`~~: 부모 엘리먼트보다 더 크게(상속에 영향을 받기 때문에 일반적으로 잘 사용하지 않는다).
> - ~~`smaller`~~: 부모 엘리먼트보다 더 작게(상속에 영향을 받기 때문에 일반적으로 잘 사용하지 않는다).
> - ~~`xx-small...xx-large`~~: 7단계로 크기 표현 가능.

- line-height: 한 줄의 높이, 행간과 유사(완전히 일치하는 개념 아님).  
  과거 flex 가 없던 시절에는 수직 정렬을 시키기 위해 line-height 를 사용하곤 했는데 지금은 flex 가 존재하기 때문에 정말 line-height 를 
  다루는 목적으로만 사용한다.
> - `normal, 1`: default.
> - 숫자: 엘리먼트 글꼴 크기의 배수로 지정.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - ~~%~~: 엘리먼트 글꼴 크기의 비율로 지정(숫자만으로 표현 가능).
> 
> ![Line-Height](/assets/images/posts/2024-02-03-css-summary/line-height.png){: width="700"}

- font-family
> - Font, `font-family: Arial, "Helvetica Neue", sans-serif;` 와 같이 작성한다.
> - 폰트는 일반적으로 대문자로 작성하고, 공백이나 특수문자가 포함되면 반드시 `" "`로 묶어준다(실제로 대소문자를 구분하는 것은 아님).
> - 마지막으로 <span style="color: red;">폰트 계열(serif, sans-serif, monospace, cursive, fantasy)를 반드시 작성</span>한다.
> 
> ![Font-Family](/assets/images/posts/2024-02-03-css-summary/font-family.png){: width="700"}

<br>

위 속성들은 다음과 같이 따로 사용하기도 하지만, 여러 속성을 모두 선언할 경우 단축 속성으로 정의하기도 한다.

```css
.nanum-gothic-regular {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 1.5;
  font-family: "Nanum Gothic", sans-serif;
}
```

```css
.nanum-gothic-regular {
  font: 400 normal 16px/1.5 "Nanum Gothic", sans-serif;
}
```

<br>

- text-align
> - `left`: default, 왼쪽 정렬.
> - `right`: 오른쪽 정렬.
> - `center`: 가운데 정렬.
> - ~~`justify`~~: 양쪽 정렬. 사실상 왼쪽 정렬과 같다.

- text-decoration
> - `none`: default, 장식 없음.
> - `underline`: 밑줄(a 태그의 경우는 underline 이 기본값, 일반적으로 reset 으로 제거한다).
> - ~~`overline`~~: 윗줄.
> - ~~`line-through`~~: 중앙선. HTML 의 `del`, `ins` 태그와 함께 사용되곤 한다.

- text-indent
- `0`: default, 들여쓰기/내어쓰기 없음.
- `양수`: 들여쓰기.
- `음수`: 내어쓰기.
- `-9999px`: `img` 엘리먼트는 `alt` 속성이 있다. 하지만 `img`엘리먼트가 아닌 다른 엘리먼트에 `background-image`를
             사용해 이미지를 제공하고, **alternative text** 를 제공하기 위해 `text-indent`로 텍스트를 충분히 내어쓰기 해 
             화면에 보이지 않도록 할 수 있는데, 이때 <span style="color: red;">**-9999px**</span> 을 사용한다(자식에게 
             상속되므로, 부모에게 적용해 하위 모든 엘리먼트의 텍스트를 **alternative text** 로 사용하고 전부 
             `background-image`로 대체할 수 있다).
- ~~%~~: 엘리먼트의 *가로 너비**에 대한 비율로 지정하지만 실제 사용되는 방식은 아니다.

#### 12. background

HTML 은 [Box Model](#h-1-box-model)을 채택하고 있으며, 엘리먼트의 배경 정보를 지정하는 속성.

- background-color
> - `transparent`: default, 투명함.
> - 색상값: CSS 색상값을 사용한다.

- background-image
> - `none`: default, 이미지 없음.
> - `url("path")`: 이미지 경로.

- background-size
> - `auto`: default, 이미지의 실제 크기.
> - 단위값: px, em, rem 등 단위를 지정한다.
> - `cover`: 비율을 유지, 엘리먼트의 더 넒은 너비에 맞춘다.
> - `contain`: 비율을 유지, 엘리먼트의 더 짧은 너비에 맞춘다.

- background-repeat
> - `repaet`: default, 바둑판식 반복.
> - `repeat-x`: X축 반복.
> - `repeat-y`: Y축 반복.
> - `no-repeat`: 반복 없음.

- background-position
> - `0% 0%`: (X축, Y축)의 백분율.
> - 방향: `top`, `bottom`, `left`, `right`, `center`는 물론이고, `top right`와 같이 복합으로 사용 가능하다.
> - 단위값: (X축, Y축)의 px, em, rem 등 단위를 지정한다.

이미지의 좌측 상단 모서리를 원점으로 하는 XY축 2차원 평면에 올려두고,
<span style="color: red;">**배경 이미지를 얼마나 X축, Y축으로 평행이동**</span>시키냐에 따라 이미지 위치가 결정된다.

![Background Position 1](/assets/images/posts/2024-02-03-css-summary/background-position.png){: width="400"}

위 이미지는 `400px, 400px`의 크기를 가지고 있다. `100px, 100px`로 제한하면 하나의 사각형(1번)만 보일 것이다.

```html
<div class="bg-item"></div>
```

```css
.bg-item {
  width: 100px;
  height: 100px;
  background-image: url("/assets/images/posts/2024-02-03-css-summary/background-position.png");
}
```

<div style="width: 200px; height: 200px;
     background-image: url('/assets/images/posts/2024-02-03-css-summary/background-position.png');
     transform: scale(0.5); margin: -50px;"></div>

<br>

`background-position`은 배경 이미지를 평행이동시킨다고 했다. 즉, 7번을 보이게 하고 싶다면, <span style="color: red;">
X축으로 **-200px**, Y축으로 **-100px** 만큼 이동</span>시켜야 한다. 즉, `div`라는 영역은 고정된 위치에 `100px, 100px`만큼의 
영역을 가지고 있고, 그 뒤에 배경 이미지가 `-200px, -100px`만큼 이동해 7번이 보이게 되는 것이다.

```css
.bg-item {
  width: 100px;
  height: 100px;
  background-image: url("/assets/images/posts/2024-02-03-css-summary/background-position.png");
  background-position: -200px -100px;
}
```

<div style="width: 200px; height: 200px;
     background-image: url('/assets/images/posts/2024-02-03-css-summary/background-position.png');
     transform: scale(0.5); margin: -50px;
     background-position: -400px -200px;"></div>

<br>

마찬가지로, 현재 `div`의 **width** 와 **height** 가 각각 `100%`이므로, `-200%, -100%`와 같이 백분율을 사용해 표현할 수 있다.

```css
.bg-item {
  width: 100px;
  height: 100px;
  background-image: url("/assets/images/posts/2024-02-03-css-summary/background-position.png");
  background-position: -200% -100%;
}
```

<div style="width: 200px; height: 200px;
     background-image: url('/assets/images/posts/2024-02-03-css-summary/background-position.png');
     transform: scale(0.5); margin: -50px;
     background-position: -200% -100%;"></div>

<br>

- background-attachment
> - `scroll`: 이미지가 엘리먼트를 따라서 같이 스크롤 된다.
> - `fixed`: 이미지가 viewport 에 고정. 스크롤 되지 않는다(position fixed 와 유사하다).
> - ~~`local`~~: 엘리먼트 내 스크롤 시 이미지가 같이 된다.

---

### 5. CSS Layout Attributes 👩‍

[background](#h-12-background) 속성에서의 `background-position`은 엘리먼트 내 위치를 지정하는 속성이었다. 
이것은 <span style="color: #F19F05;">엘리먼트 내부라는 기준이 정해져 있기 때문에</span> 따로 기준을 설정할 필요 없이 
<span style="color: #1794E6;">위치만 지정</span>하면 됐다.

**하지만 HTML 엘리먼트들의 위치를 지정할 때는 반드시 <span style="color: #F19F05;">① 위치의 기준을 지정</span>하고,
<span style="color: #1794E6;">② 위치를 지정</span>해야한다**.

#### 1. position

엘리먼트의 <span style="color: #F19F05;">① 위치의 기준을 지정</span>하는 속성.
<span style="color: #F19F05;"></span>

> - `static`: default, 기준 없음.
> - `relative`: 엘리먼트 자신을 기준점으로 지정(<span style="color: red;">relative 에 의해 이동한 것은 
>               [Flex - Order] 처럼 시각적으로만 이동된 것일 뿐 처럼 실제 배치가 이동한 것은 아니기 때문에 
>               형제 엘리먼트의 배치에 영향을 주지 않는다</span>).
> - `absolute`: 기준점이 존재하는 부모 엘리먼트를 기준(relative 와 같이 기준점이 지정된 부모를 찾아 올라간다. 
>               위치 기준점이 없다면 root 인 HTML 로 올라간다).
> - `fixed`: viewport(브라우저)를 기준.
> - `sticky`: 스크롤 영역 기준.

> `position`과 함께 사용하는 CSS 속성은 `top`, `bottom`, `left`, `right`, `z-index` 등이 있으며, 음수값이 가능하다.
> - `auto`: default, 브라우저가 계산.
> - 단위값: px, em, rem 등 단위를 지정한다.

> `position`의 속성값으로 <span style="color: red;">**absolute, fixed**</span>가 지정된 엘리먼트는 
> <span style="color: red;">display 속성이 **block** 으로 변경</span>된다. 하지만 주의해야 할 것이 기본적으로 
> **block** 엘리먼트는 부모 엘리먼트의 크기만큼 **width** 가 늘어나지만, **absolute, fixed** 가 지정되면 **inline** 
> 엘리먼트와 같이 <span style="color: red;">**width** 가 content 크기 만큼 줄어</span>든다. 따라서, `header`와 같은 
> 엘리먼트에 `fixed`를 지정하면서 너비를 다 사용하기를 원한다면 `width: 100%;`를 명시적으로 지정해야한다.

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  width: 300px;
  background-color: royalblue;
}

.container .item {
  border: 4px dashed red;
  background-color: orange;
  
  &:nth-child(1) {
    width: 100px;
    height: 100px;
  }
  
  &:nth-child(2) {
    width: 140px;
    height: 70px;
  }
  
  &:nth-child(3) {
    width: 70px;
    height: 120px;
  }
}
```

![Position Relative 1](/assets/images/posts/2024-02-03-css-summary/position-relative-1.png){: width="300"}

위와 같이 블럭 엘리먼트 `div`가 차례대로 쌓여 있다. 여기서 2번 상자를 relative 를 이용해 이동시켜보자.

```css
&:nth-child(2) {
  width: 140px;
  height: 70px;
  position: relative;
  top: 30px;
  left: 120px;
}
```

![Position Relative 2](/assets/images/posts/2024-02-03-css-summary/position-relative-2.png){: width="300"}

2번 상자의 공간이 비었지만, [Flex - Order] 처럼 시각적으로만 이동된 것일 뿐 처럼 실제 배치가 이동한 것은 아니기 때문에
3번 상자의 배치에 영향을 주지 않는다.

`relative`는 [Position - Relative]와 같이 자신의 위치를 상대값으로 적용하기 위해서도 사용하지만 이런식의 배치는 시각적으로 
빈 공간을 만들어내고, 사용자에게 무언가 누락된 느낌을 줄 수 있기 때문에 거의 사용되지 않는다. 주로 자식의 `absolute`에 적용될 
<span style="color: #F19F05;">① 위치를 기준을 지정</span>하기 위해 사용된다.

```css
.container {
  width: 300px;
  background-color: royalblue;
  position: relative;
}

.container .item {
  border: 4px dashed red;
  background-color: orange;
  
  &:nth-child(1) {
    width: 100px;
    height: 100px;
  }
  
  &:nth-child(2) {
    width: 140px;
    height: 70px;
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
  
  &:nth-child(3) {
    width: 70px;
    height: 120px;
  }
}
```

![Position Relative 3](/assets/images/posts/2024-02-03-css-summary/position-relative-3.png){: width="300"}

#### 2. Stack Order ⭐️

1. 엘리먼트에 **position 속성의 값이 있는 경우 더 위에 쌓인다**
   (<span style="color: red;">default 값 인 static 은 제외</span>).
2. 1번 조건이 동일한 경우, `z-index`**값이 높을 수록 위에 쌓인다**.
3. 2번까지 조건이 동일한 경우, **HTML 이 나중에 작성될 수록 위에 쌓인다**.

#### 3. z-index

엘리먼트의 Z축 높이를 지정하는 속성.

> - `auto, 0`: default.
> - `양수`: 숫자가 높을 수록 위에 쌓임.
> - `음수`: 음수가 가능하나, 일반적으로 `-1` 외 더 작은 음수값은 사용되지 않는다. 복잡하고 중첩된 z-index 구조가 필요하면 양수 사용.

> `z-index`를 관리할 때, `999`와 같은 값은 사용하지 않는 것이 좋다. 추후 더 위에 쌓여야 한다면 이것보다 더 큰 값이 필요하게되고, 
> 관리가 힘들어진다. 가급적 1부터 순차적으로 사용해 나아가도록 한다.

---

### 6. CSS Flex Layout 👩‍

`Flex`는 container 에 지정하는 속성과 `Item`에 지정하는 속성으로 나뉜다.

#### 1. flex direction and wrap(container)

- display
> - `flex`: 블럭 엘리먼트 속성을 갖는 flex 컨테이너를 정의한다.
> - `inline-flex`: 인라인 엘리먼트 속성을 갖는 flex 컨테이너를 정의한다.

- flex-direction: main-axis 의 방향을 지정하는 속성. 단순히 row, column 만 지정하는 게 아니라 축과 
  <span style="color: red;">방향</span>을 지정하는 것임을 기억해야한다.
> - `row`: default, left -> right
> - `row-reverse`: right -> left
> - `column`: top -> bottom
> - `column-reverse`: bottom -> top

- flex-wrap: 컨테이너에 지정하는 속성으로, 아이템의 줄바꿈 여부를 지정하는 속성.
> - `nowrap`: 줄바꿈 없음.
> - `wrap`: 여러 줄을 하나의 컨테이너로 wrapping. 줄바꿈 있음.
> - `wrap-reverse`: wrap 의 반대 방향으로 wrapping.

> 만약 **bottom-right** 에서 시작해서 **top-left** 로 완전 역순으로 쌓고자 한다면, `flex-flow: row-reverse wrap-reverse;` 
> 또는 `flex-flow: column-reverse wrap-reverse;`를 사용해 완전한 역순을 만들어 낼 수 있다.

#### 2. justify-content(container)

**main-axis** 의 정렬 방법을 지정하는 속성.

> - `flex-start`: 시작점 정렬.
> - `flex-end`: 끝점 정렬.
> - `center`: 가운데 정렬.
> - `space-around`: 양 끝이 붙지 않는다. 이름과 같이 <span style="color: red;">아이템 주변으로 공간</span>이 생긴다. 
>   이것은 각 아이템에 동일한 <span style="color: red;">**padding**</span> 을 준 것과 같다(padding 은 collapsing 이 없으므로, 
>   `아이템-아이템`의 간격은 `아이템-시작점/끝점` 간격의 2배가 된다).
>   ![Space-Around](/assets/images/posts/2024-02-03-css-summary/flex-justify-content-space-around.png){: width="500"}
> - `space-evenly`: 양 끝이 붙지 않는다. 이름과 같이 <span style="color: red;">모든 공간이 동일한 크기</span>를 갖는다. 이것은 각 
>   아이템에 동일한 <span style="color: red;">**margin**</span> 을 준 것과 같다(margin-collapsing 이 발생하듯 `아이템-아이템` 
>   간격이 2배가 아닌 1배로 상쇄된다).
>   ![Space-Evenly](/assets/images/posts/2024-02-03-css-summary/flex-justify-content-space-evenly.png){: width="500"}
> - `space-between`: <span style="color: red;">양 끝이 시작점과 끝점에 붙는다</span>. 이름과 같이 아이템 
>   <span style="color: red;">사이에</span> 배치된다. 2개까지는 양 끝점으로 배치되고, 3개째부터 두 아이템 사이에 내부 여백을 균등하게 
>   갖도록 배치된다.
>   ![Space-Between](/assets/images/posts/2024-02-03-css-summary/flex-justify-content-space-between.png){: width="500"}

#### 3. align-content, align-items(container)

- align-content: cross-axis 의 정렬 방법을 지정하는 속성. stretch 를 제외하면 `justify-content`와 완전히 동일한 배치 특성을 가지며, 
  일반적으로 wrapping 되어 **2줄 이상일 때 사용**된다.
> - `stretch`: default, 아이템의 높이가 지정되지 않았을 경우, 아이템의 height 는 `auto`가 되어 **컨테이너 높이 만큼 공간을 채운다**. 
>   반면, 아이템 높이가 지정되었을 경우 사실상 `flex-start`와 같다. 
> - 그 외 `flex-start`, `flex-end`, `center`, `space-around`, `space-evenly`, `space-between`은 justify-content 와 같다.

- align-items: cross-axis 의 정렬 방법을 지정하는 속성. `align-content: stretch;`라는 가정 하에 적용되는 속성으로,
  <span style="color: red;">align-content</span> 가 stretch 가 아닌 다른 값을 가지면 
  <span style="color: red;">align-items 의 `!important` 보다도 높은 우선순위</span>를 가져 align-items 는 무시된다. 
  일반적으로, **1줄일 때 사용**된다.
> - `stretch`: default, 아이템의 높이가 지정되지 않았을 경우, 아이템을 height 는 `auto`가 되어 **컨테이너 높이 만큼 공간을 채운다**. 
>   반면, 아이템 높이가 지정되었을 경우 사실상 `flex-start`와 같다.
> - `flex-start`, `flex-end`, `center`는 align-content 가 1줄일 때 적용한 것과 동일한 효과를 갖는다.
> - align-content 와 달리 `space-around`, `space-evenly`, `space-between`이 존재하지 않는다.

<br>

__align-content, align-items 어떤걸 사용할까?__

- 일반적으로 1줄이면 align-items, 2줄 이상이면 align-content 를 사용한다. 하지만 1줄이라고 align-content 를 사용하지 못하는 것은 아니다.
  align-items 는 wrap, no-wrap 모두에 사용 가능하고, <span style="color: red;">align-content 는 wrap 일 경우만 사용 가능</span>
  한 것이 중요한 차이점이다. wrap 이면서 실제로 그려지는 엘리먼트가 2줄이 되었을 때의 정렬 모양이 다르므로 용도에 맞게 사용하면 된다.  
- 1줄일 때 align-items 와 align-content 의 `stretch`, `flex-start`, `flex-end`, `center`는 동일한 효과를 갖는다.
- 2줄일 때 align-items 와 align-content 의 `stretch`는 동일하지만 `flex-start`, `flex-end`, `center`는 다른 효과를 갖는다
  (<span style="color: red;">2줄일 때 align-items 적용이 불가능함이 아님에 유의</span>).
- <span style="color: red;">align-items</span> 는 2줄 이상일 때만 적용 가능한 `space-around`, `space-evenly`, 
  `space-between`이 <span style="color: red;">존재하지 않는다</span>. 이 효과를 사용하려면 align-content 를 사용해야한다.
- <span style="color: red;">align-content</span> 가 stretch 가 아닌 다른 값을 가지면, <span style="color: red;">
  align-items 의 `!importnat` 보다도 높은 우선순위</span>를 갖는다.

![align-items flex-start](/assets/images/posts/2024-02-03-css-summary/align-items-flex-start.png){: width="500"}

<p class="center">- align-items: flex-start -</p>

![align-content flex-start](/assets/images/posts/2024-02-03-css-summary/align-content-flex-start.png){: width="500"}

<p class="center">- align-content: flex-start -</p>

<br>

![align-items center](/assets/images/posts/2024-02-03-css-summary/align-items-center.png){: width="500"}

<p class="center">- align-items: center -</p>

![align-content center](/assets/images/posts/2024-02-03-css-summary/align-content-center.png){: width="500"}

<p class="center">- align-content: center -</p>

많은 경우 다음과 같은 CSS 를 적용해 

> `justify-content`, `align-content`와 같이 **content** 를 정렬한다는 것은, main-axis 가 되었든 cross-axis 가 되었든 
> <span style="color: red;">각 축의 아이템들이 어떤 분포로 배치되는지를 지정</span>하는 것이다. 반면, `align-items`는 
> `align-content`와 마찬가지로 cross-axis 에 대한 정렬을 지정하지만, **wrap** 상태이든, **nowrap** 상태이든 
> <span style="color: red;">아이템들의 묶음이 컨테이너 라인에서 어느 위치에 분포할지를 지정</span>하는 것이다. 즉, cross-axis 축의 
> 아이템의 분포가 아닌 main-axis 의 축 자체를 cross-axis 방향의 어디에 위치할건지 평행이동 시키는 개념에 근접한다.

#### 4. align-self(item)

아이템을 개별적으로 cross-axis 의 정렬 방법을 지정하는 속성. 컨테이너가 아닌 아이템에 지정하는 속성이다.

```css
.container {
  width: 100vw;
  height: 100vh;
  background-color: royalblue;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100px;
    height: 100px;
    border: 4px dashed red;
    background-color: orange;

    &:nth-child(1) {
      align-self: center;
    }

    &:nth-child(even) {
      align-self: flex-end;
    }
  }
}
```

![align-self 1](/assets/images/posts/2024-02-03-css-summary/align-self-1.png){: width="500"}

```css
.container {
  width: 100vw;
  height: 100vh;
  background-color: royalblue;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100px;
    height: 100px;
    border: 4px dashed red;
    background-color: orange;

    &:nth-child(even) {
      align-self: flex-end;
    }
  }
}
```

![align-self 2](/assets/images/posts/2024-02-03-css-summary/align-self-2.png){: width="500"}

#### 5. order(item)

아이템의 정렬 순서를 지정하는 속성.

> - `0`: default, 순서 없음.
> - 숫자: 숫자가 작을수록 시작점에, 클 수록 끝점에 위치한다(양수, 음수 모두 사용 가능).

HTML 의 수정 없이 아이템 정렬 순서를 바꿀 수 있다.

```css
.container {
  width: 100vw;
  height: 100vh;
  background-color: royalblue;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100px;
    height: 100px;
    border: 4px dashed red;
    background-color: orange;

    &:nth-child(1) {
      order: 2;
    }
    
    &:nth-child(3) {
      order: 1;
    }
    
    &:nth-child(5) {
      order: -1;
    }
  }
}
```

![flex order](/assets/images/posts/2024-02-03-css-summary/flex-order.png){: width="500"}

#### 6. flex-grow & flex-basis(item)

아이템의 너비가 증가되는 비율을 지정하는 속성.

flex 를 사용할 때 컨테이너의 너비를 아이템의 너비가 정확히 정수배로 일치해 빈 공간 없이 가득 채우지 않는 한 항상 빈 공간이 
남게 된다. 컨테이너의 크기가 고정되어 있다면 아이템이 지정된 자신의 크기보다 더 커지도록 늘어나야한다.

> - `0`: default, 증가 비율 없음.
> - 숫자: 증가 비율 지정.

- 아이템 전체를 균일하게 늘리기

```css
.container {
  width: 100vw;
  height: 100vh;
  background-color: royalblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .item {
    width: 100px;
    height: 100px;
    border: 4px dashed red;
    background-color: orange;
    flex-grow: 1;
  }
}
```

![flex-grow 1](/assets/images/posts/2024-02-03-css-summary/flex-grow-1.png){: width="500"}

아이템 전체에 flex-grow 를 0이 아닌 다른 값을 주면 같은 비율로 늘어난다.

- 서로 다른 비율로 늘리기(<span style="color: red;">반드시 `flex-basis: 0;` 속성</span>을 줘야 한다)

```css
.container {
  width: 100vw;
  height: 100vh;
  background-color: royalblue;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .item {
    width: 100px;
    height: 100px;
    border: 4px dashed red;
    background-color: orange;
    flex-grow: 1;
    flex-basis: 0;

    &:nth-child(3) {
      flex-grow: 2;
    }
  }
}
```

![flex-grow 2](/assets/images/posts/2024-02-03-css-summary/flex-grow-2.png){: width="500"}

모든 아이템에 동일한 1의 비율을 준 다음 3번째 아이템만 2가 덮어 썼기 때문에 `1:1:2`로 늘어난다.

> 기본적으로 flex-grow 와 flex-shrink 이 늘어나고 줄어드는 비율은 아이템의 크기 비율을 지정하는 것이 아닌, 
> <span style="color: red;">아이템의 content 를 제외한 여백이 늘어나거나 줄어드는 비율</span>을 설정하는 것이다. 
> 따라서 내부 content 에 영향을 받기 때문에 시각적으로 아이템의 크기 자체의 비율로 계산되도록 하기 위해 
> <span style="color: red;">content 를 `0`으로 고정시키는 속성값이 `flex-basis: 0;`이다</span>.

<br>

- flex-basis: 0 을 설정하지 않았을 때 content 를 제외한 여백의 비율대로 늘어나는 모습

```css
section article:nth-of-type(1) {
  flex-grow: 1;
}
section article:nth-of-type(2) {
  flex-grow: 2;
}
section article:nth-of-type(3) {
  flex-grow: 3;
}
```

![Flew Grow 3](/assets/images/posts/2023-03-06-basic-css-part2/flex-grow-3.png){: width="600"}

아이템이 아닌 content 를 제외한 여백이 `1:2:3` 비율로 늘어난다.

#### 7. flex-shrink(item)

아이템의 너비가 감소되는 비율을 지정하는 속성.

flex-grow 는 컨테이너를 채우기 위해 아이템이 지정된 자신의 크기보다 더 커지도록 늘어났다. 이번엔 반대로 컨테이너가 아이템이 
크기를 유지하기 위해 필요한 공간보다 작을 때 컨테이너 내부에 존재할 수 있도록 하려면 ① wrapping 시켜 줄이 나뉘더라도 
하나의 컨테이너로 묶이도록 여러 줄을 만들거나, ② <span style="color: red;">아이템이 줄어든 컨테이너에 맞게 함께 줄어야</span>한다.

> - `1`: default, 너비에 따라 감소 비율 적용.
> - 숫자: 감소 비율 지정.
> - `0`: <span style="color: red;">감소 너비 없음</span>.

- flex-shrink 가 0 이면 컨테이너가 아이템이 차지하는 공간보다 줄어들면 아이템이 컨테이너 밖으로 나가게 된다.

![flex-shrink](/assets/images/posts/2024-02-03-css-summary/flex-shrink.png){: width="500"}

일반적이지는 않지만 때로는 flex-wrap 대신 아이템이 크기를 유지하도록 하기 위해 flex-shrink 에 `0`을 주기도 한다.

> flex-grow 와 마찬가지로 아이템의 크기 비율이 아닌 아이템의 content 를 제외한 여백이 줄어드는 비율을 설정하는 것이다. 
> 단, flex-grow 와 다르게 flex-basis 를 `0`으로 주게 되면 최소한의 content 영역이 보장되지 않기 때문에 실제 content 
> 공간을 제외한 모든 여백이 완전히 줄어들게 된다. 즉, 항상 아이템 너비값이 `auto`인 것과 같아져버린다. 따라서 flex-shrink 는 
> flex-grow 와 달리 아이템의 비율을 시각적으로 맞추기가 어렵다.

<br>

- 일반적으로 flex-shrink 가 줄어드는 방식

```css
section article:nth-of-type(1) {
  flex: 3;
}
section article:nth-of-type(2) {
  flex: 2;
}
section article:nth-of-type(3) {
  flex: 1;
}
```

![Flex Shrink 3](/assets/images/posts/2023-03-06-basic-css-part2/flex-shrink-3.png){: height="45"}

아이템이 아닌 content 를 제외한 여백이 `1/3 : 1/2 : 1`의 비율로 줄어든다.

#### 8. flex-basis(item)

아이템 공간 배분 전 기본 너비

> - `auto`: 엘리먼트의 content 너비.
> - 단위값: px, em, rem 등 단위를 지정한다.

일반적으로 content 의 크기를 CSS 로 정의할 일이 거의 없다. 정의한다 하더라도 실제 HTML 에 존재하는 content 의 크기가 우선 되기 
때문이다. 이것은 [flex-grow](#h-6-flex-grow--flex-basisitem) 에서 본 것처럼 주로 flex-grow 의 늘어나는 비율이 시각적으로 
아이템 비율과 일치하도록 content 크기를 `0`으로 고정 후 계산하기 위해 사용된다.

---

### 7. Animation - Transition 👩‍

엘리먼트의 전환(시작과 끝) 효과를 지정하는 단축 속성.

> transition: property <span style="color: red;">duration</span> timing-function delay
> 와 같이 작성하며, 단축 속성으로 정의시 <span style="color: red;">지속시간</span>은 반드시 반드시 작성해야한다.

#### 1. transition-property

전환 효과를 사용할 속성 이름을 지정.

> - `all`: default, 모든 속성에 적용.
> - 속성명: 전환 효과를 사용할 속성 이름 명시.

#### 2. transition-duration

전환 효과의 지속시간을 지정하는 속성.

> - `0`: default, 전환 효과 없음.
> - 시간: 지속시간을 `1s`와 같이 초 단위로 지정.

```css
div {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s;
}

div:active {
  width: 300px;
  background-color: royalblue;
}
```

<div style="width: 100px; height: 100px; background-color: orange; transition: 1s;" onmousedown="this.style.width='300px'; this.style.backgroundColor='royalblue';" onmouseup="this.style.width='100px'; this.style.backgroundColor='orange';"></div>

width, background-color 모두에 전환 효과 duration `1s`가 적용되었다.

<br>

```css
div {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: width 1s;
}

div:active {
  width: 300px;
  background-color: royalblue;
}
```

<div style="width: 100px; height: 100px; background-color: orange; transition: width 1s;" onmousedown="this.style.width='300px'; this.style.backgroundColor='royalblue';" onmouseup="this.style.width='100px'; this.style.backgroundColor='orange';"></div>

width 에만 전환 효과 duration `1s`가 적용되었다.

<br>

```css
div {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition:
      background-color 1s,
      width 2s;
}

div:active {
  width: 300px;
  background-color: royalblue;
}
```

<div style="width: 100px; height: 100px; background-color: orange; transition: background-color 1s, width 2s;" onmousedown="this.style.width='300px'; this.style.backgroundColor='royalblue';" onmouseup="this.style.width='100px'; this.style.backgroundColor='orange';"></div>

background-color 에는 전환 효과 duration `1s`가, width 에는 전환 효과 duration `2s`가 적용되었다. 

#### 3. transition-timing-function

전환 효과의 타이밍(Easing) 함수를 지정하는 속성.

> - `ease`: default, **느리게 - 빠르게 - 느리게** = `cubic-bezier(0.25, 0.1, 0.25, 1)`
> - `linear`: **일정하게** = `cubic-bezier(0, 0, 1, 1)`
> - `ease-in`: **느리게 - 빠르게** = `cubic-bezier(0.42, 0.1, 1)`
> - `ease-out`: **빠르게 - 느리게** = `cubic-bezier(0, 0, 0.58, 1)`
> - `ease-in-out`: **느리게 - 빠르게 - 느리게** = `cubic-bezier(0.42, 0, 0.58, 1)`
> - `steps(n)`: n 번 분할된 애니메이션.

```css
div {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s steps(10);
}

div:active {
  width: 300px;
  background-color: royalblue;
}
```

<div style="width: 100px; height: 100px; background-color: orange; transition: 1s steps(10);" onmousedown="this.style.width='300px'; this.style.backgroundColor='royalblue';" onmouseup="this.style.width='100px'; this.style.backgroundColor='orange';"></div>

전환 효과 easing 함수 `steps(10)`가 적용도어 10단계로 나뉘어 전환된다.

> `cubic-bezier(n, n, n, n)`을 직접 정의할 수도 있는데, 이때 n 에 들어갈 숫자값은 직접 계산할 필요는 없고 [easings.net] 에 
> 방문에 사전에 정의된 다양한 함수를 가져다 사용하거나, [cubic-bezier.com] 사이트에 접속해 그래프를 이용해 함수를 얻을 수 있다.

> Easing Functions 에 대해서는 [GSAP - Easing] 와 [MDN - easing-function] 에서 자세한 정보를 얻을 수 있다.

#### 4. transition-delay

전환 효과가 몇 초 뒤에 시작할지 대기시간을 지정하는 속성.

> - `0`: default, 대기 시간 없음.
> - 시간: 대기시간을 `1s`와 같이 초 단위로 지정. 

```css
div {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s;
}

div:hover {
  width: 300px;
  background-color: royalblue;
  transition: 1s .5s;
}
```

<style>
div.my-hover {
  width: 100px;
  height: 100px;
  background-color: orange;
  transition: 1s;
}

div.my-hover:hover {
  width: 300px;
  background-color: royalblue;
  transition: 1s .5s;
}
</style>

<div class="my-hover"></div>

hover 가 적용될 때는 delay `0.5s`에 duration `1s`가 적용되고, 해제될 때는 딜레이 없이 duration `1s`만 적용되어 전환된다.

---

### 8. Animation - Transform 👩‍

#### 1. Transform 2D

2D 애니메이션을 지정하는 속성으로 주로 사용되는 함수는 다음과 같다.

> - translate(x, y): 이동(X축, Y축)
> - translateX(x): 이동(X축)
> - translateY(y): 이동(Y축)
> - scale(x, y): 크기(X축, Y축)

> - rotate(degree): 회전(각도), 회전축은 정 중앙이며, `transform-origin`을 사용해 변환할 수 있다.
> - skewX(x): 기울임(X축)
> - skewY(y)): 기울임(Y축)

위 함수들은 모두 `matrix(n, n, n, n, n, n)`이라는 함수로 변환되어 실행된다. 직접 matrix 함수를 작성해 사용하는 것이 어렵다보니 
나온 함수들이다.

#### 2. Transform 3D

3D 애니메이션을 지정하는 속성으로 주로 사용되는 함수는 다음과 같다.

> - perspective(n): 원근법(거리)
> - rotateX(x): 회전(X축)
> - rotateY(y): 회전(Y축)

> 단축 속성으로 정의시 반드시 `transform: perspective(500px) rotateX(45deg)`와 같이 perspective 함수가 첫 번째로 와야 한다.

2D 애니메이션에서 자주 사용되던 함수들의 Z축 버전 `translateZ(z)`, `translate3d(x, y, z)`, `scaleZ(z)`, 
`scale3d(x, y, z)`, `rotateZ(z)`, `rotate3d(x, y, z, a)`가 존재한다. 하지만 실제로 Z축을 컨트롤을 잘 사용하진 않는다. 
<span style="color: red;">perspective(n)</span> 으로 원근법을 주며 X축과 Y축을 회전시키는 정도로 사용된다.

마찬가지로 위 함수들은 모두 `matrix3d` 함수로 변환되어 실행되는데, 2D에서는 6개였던 파라미터가 3D에서는 16개로 늘어난다. 따라서 직접 
matrix 함수를 작성해 사용할 일은 없다고 봐도 된다.

#### 3. Perspective Attributes and Functions

perspective 는 속성과 함수 두 가지가 존재한다. 둘은 단순히 단축 속성의 관계가 아니라 관측 지점이 다르기 때문에 실제 결과물 자체가 다르다.
속성으로 사용시 transform 을 적용하려는 대상의 부모에 속성값을 주어야하고, 함수로 사용시 transform 을 적용하려는 대상에게 주어야한다.

| Type                   | Syntax                        | Apply Target | Change Observing Point |
|------------------------|-------------------------------|--------------|------------------------|
| Perspective Attributes | perspective: 600px            | Parent       | perspective-origin     |
| Perspective Functions  | transform: perspective(600px) | Self         | transform-origin       |

- Perspective Attributes

```html
<section>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</section>
```

```css
section {
  width: 400px;
  height: 100px;
  border: 1px solid #000;
  background-color: #90acfa;
  perspective: 200px;
  display: flex;

  div {
    box-sizing: border-box;
    width: 100px;
    height: 100px;

    &:nth-of-type(1) {
      background-color: #ffa500cc;
      transform: rotateY(45deg);
    }

    &:not(:nth-of-type(1)) {
      border: 1px dashed red;
    }
  }
}

```

![Perspective Attributes](/assets/images/posts/2024-02-03-css-summary/perspective-attributes.png){: width="500"}

부모(파란색 컨테이너)의 중심이 origin(관측 지점) 이고, 이 지점에서 200px 떨어진 지점에서 관찰한다.

- Perspective Functions

```css
section {
  width: 400px;
  height: 100px;
  border: 1px solid #000;
  background-color: #90acfa;
  display: flex;

  div {
    box-sizing: border-box;
    width: 100px;
    height: 100px;

    &:nth-of-type(1) {
      background-color: #ffa500cc;
      transform: perspective(200px) rotateY(45deg);
    }

    &:not(:nth-of-type(1)) {
      border: 1px dashed red;
    }
  }
}
```

![Perspective Functions](/assets/images/posts/2024-02-03-css-summary/perspective-functions.png){: width="500"}

엘리먼트(노란색 면)의 중심이 origin(관측 지점) 이고, 이 지점에서 200px 떨어진 지점에서 관찰한다.

#### 4. backface-visibility

3D 변환으로 회전된 엘리먼트의 뒷면 숨김 여부를 지정하는 속성.

> - `visible`: default, 뒷면 보임.
> - `hidden`: 뒷면 숨김(0~360도를 기준으로 보면, `0...<90: 보임`, `90...270: 숨김`, `271...360: 보임`의 패턴이 연속된다).


<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)

[Interactive Content]:https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content
[Flex - Order]:/css/2023/03/06/basic-css-part2.html#h-4-order
[Position - Relative]:/css/2023/03/01/basic-css-part1.html#h-2-position---relative
[Position - Absolute]:/css/2023/03/01/basic-css-part1.html#h-3-position---absolute
[easings.net]:https://easings.net
[cubic-bezier.com]:https://cubic-bezier.com/
[GSAP - Easing]:https://gsap.com/docs/v3/Eases
[MDN - easing-function]:https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
