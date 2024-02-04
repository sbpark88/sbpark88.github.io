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

다음 형제 요소 <span style="color: red;">하나</span>만 선택.

- General Sibling Combinator(일반 형제 선택자)

```css
.orange ~ li {
  color: red;
}
```

다음 형제 요소 모두를 선택.

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




<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)

[Interactive Content]:https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content
