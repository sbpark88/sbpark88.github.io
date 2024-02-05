---
layout: post
title: CSS Selectors
subtitle: Everything about the CSS Selectors.
categories: [css]
tags: [w3c, web standards, css, combinators, pseudo-classes, pseudo-elements]
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
> 먼저 요청한 CSS 의 수신이 끝나고 해석을 하는 과정에 `@import`를 보고 요청을 한다. **include** 되는 방식이 아니고
> **lay load** 되는 방식이라 일부러 연결을 지연시키는 목적으로 사용될 수 있으나, 제어할 수 없기 때문에 일반적으로 사용되는
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

![Pseudo element after](/assets/images/posts/2024-02-03-css-selectors/css-pseudo-element-after.png)

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

![CSS Inheritance 1](/assets/images/posts/2024-02-03-css-selectors/css-inheritance-1.png){: width="600"}

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
<br>

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

![CSS width 1](/assets/images/posts/2024-02-03-css-selectors/css-width-1.png){: width="400"}

<br>

```css
.child {
  max-width: 200px;
  height: 100px;
  background: orange;
}
```

max-width 가 제한됨에 따라 너비가 200으로 제한된다.

![CSS width 2](/assets/images/posts/2024-02-03-css-selectors/css-width-2.png){: width="400"}

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

![CSS width 2](/assets/images/posts/2024-02-03-css-selectors/css-width-2.png){: width="400"}

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

![CSS unit 1](/assets/images/posts/2024-02-03-css-selectors/css-unit-1.png){: width="400"}

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

![CSS unit 2](/assets/images/posts/2024-02-03-css-selectors/css-unit-2.png){: width="400"}

<br>

```css
.child {
  width: 20rem;
  height: 50%;
  background: orange;
}
```

![CSS unit 1](/assets/images/posts/2024-02-03-css-selectors/css-unit-1.png){: width="400"}

`em`은 부모 또는 조상의 font-size 가 달라지면, 상속에 의해 크기가 변할 수 있기 때문에 
<span style="color: red;">혼란스러운 단위가 될 수 있어 관리가 필요</span>하다.

반면 `rem`은 항상 root 엘리먼트인 html 의 font-size 를 기준으로 하기 때문에 
<span style="color: red;">상속에 영향을 받지 않아 안정적</span>이며, 
<span style="color: red;">html 의 font-size 를 변경</span>하는 것 만으로
<span style="color: red;">웹 전체의 크기를 비율로 제어</span>할 수 있다는 장점을 갖는다.

#### 3. Margin

엘리먼트의 외부 여백을 지정하는 단축 속성.

> - `0`: default, 외부 여백 없음.
> - `auto`: 브라우저가 여백을 계산(<span style="color: red;">가로/세로 너비가 있는 엘리먼트의 가운데 정렬에 활용</span>).
> - 단위값: px, em, vw 등 단위를 지정한다(<span style="color: red;">음수</span>값 사용 가능).
> - ~~%~~: 부모 엘리먼트의 **가로 너비**에 대한 비율로 지정하지만 실제 사용되는 방식은 아니다.

> `margin-collapsing`이 발생된다.

#### 4. Padding

엘리먼트의 내부 여백을 지정하는 단축 속성.

> - `0`: default, 내부 여백 없음.
> - 단위값: px, em, vw 등 단위를 지정한다.
> - %: 부모 엘리먼트의 **가로 너비**에 대한 비율로 지정한다.

> 엘리먼트의 크기가 커진다.

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

![Box-Sizing Content-Box](/assets/images/posts/2024-02-03-css-selectors/box-sizing-content-box.png){: width="300"}

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

![Box-Sizing Border-Box](/assets/images/posts/2024-02-03-css-selectors/box-sizing-border-box.png){: width="300"}

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
> ![Line-Height](/assets/images/posts/2024-02-03-css-selectors/line-height.png){: width="700"}

- font-family
> - Font, `font-family: Arial, "Helvetica Neue", sans-serif;` 와 같이 작성한다.
> - 폰트는 일반적으로 대문자로 작성하고, 공백이나 특수문자가 포함되면 반드시 `" "`로 묶어준다(실제로 대소문자를 구분하는 것은 아님).
> - 마지막으로 <span style="color: red;">폰트 계열(serif, sans-serif, monospace, cursive, fantasy)를 반드시 작성</span>한다.
> 
> ![Font-Family](/assets/images/posts/2024-02-03-css-selectors/font-family.png){: width="700"}

- text-align
> - `left`: default, 왼쪽 정렬.
> - `right`: 오른쪽 정렬.
> - `center`: 가운데 정렬.
> - ~~`justify`~~: 양쪽 정렬.

- text-decoration
> - `none`: default, 장식 없음.
> - `underline`: 밑줄(a 태그의 경우는 underline 이 기본값, 일반적으로 reset 으로 제거한다).
> - ~~`overline`~~: 윗줄.
> - ~~`line-through`~~: 중앙선. HTML 의 `del`, `ins` 태그와 함께 사용되곤 한다.

- text-indent
- `0`: default, 들여쓰기/내어쓰기 없음.
- `양수`: 들여쓰기.
- `음수`: 내어쓰기.
- ~~%~~: 엘리먼트의 *가로 너비**에 대한 비율로 지정하지만 실제 사용되는 방식은 아니다.

#### 12. background

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

- background-attachment
> - `scroll`: 이미지가 엘리먼트를 따라서 같이 스크롤 된다.
> - `fixed`: 이미지가 viewport 에 고정. 스크롤 되지 않는다(position fixed 와 유사하다).
> - ~~`local`~~: 엘리먼트 내 스크롤 시 이미지가 같이 된다.


<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)

[Interactive Content]:https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content
