---
layout: post
title: SCSS List(Array), Loops, Variables, Mixins
subtitle: SCSS Make the CSS likes JavaScript
excerpt_image: NO_EXCERPT_IMAGE
categories: [css]
tags: [scss, css, for, each, while, through, to, map, list, hof, find, reduce, filter, if, switch, css pre processor]
---

### 1. What is SCSS? 👩‍💻

#### 1. SCSS is Superset

SCSS(Sassy CSS) 는 `CSS Pre Processor(전처리기)` 중 하나로 CSS 의 기능을 확장하는 `Script Language`다. 
기존 CSS 가 가진 한계를 극복하기 위해 나왔으며, 스크립트 언어, 즉, 프로그래밍 언어에 해당한다!

따라서 다양한 자료형은 기본이고 변수, 함수, 반복문, 조건문 확장과 같은 기능 역시 제공한다.

하지만 브라우저는 CSS 만 인식한다. 따라서 웹에 배포되기 전 SCSS 를 CSS 로 변경해야한다. 이것은 JavaScript 의 문제를 해결하기 
위해 TypeScript 를 만들었지만, 브라우저 상에서 JavaScript 만 동작하다보니 TypeScript 를 JavaScript 로 트랜스파일 해서 
배포하는 것처럼 SCSS 역시 CSS 로 트랜스파일 해서 배포해야한다.

#### 2. SCSS? SASS?

SCSS 와 SASS 는 모두 CSS 전처리기로 같은 역할을 한다. 실제로 SCSS 의 홈페이지는 SASS 와 같다. SASS 에 기존의 SASS 표기법과 
새로운 SCSS 표기법 두 가지가 있는 것이다. 그리고 SASS 3.0 부터는 SCSS 표기법이 기본 표기법이 되었다.

- SASS : Python, Yaml 파일과 같이 indent 로 구분하며 `;`로 종료하지 않는다.
- SCSS : CSS 문법과 더 유사하며, `{ }`로 구분하고 `;`로 종료를 한다.

---

### 2. Installation and Watch 👩‍💻

기존의 Ruby 나 Node 버전의 SASS 는 오류로 인해 Dart 버전의 SCSS 설치를 권장하고있다.

```shell
npm i -g sass

sass --version
1.59.3 compiled with dart2js 2.19.4
```

SCSS 파일을 변화가 있을 때마다 CSS 파일로 변환되도록 Watch 설정을 해주도록 하자.

```shell
# 서로 다른 디렉토리를 사용하는 경우
sass --watch scss/style.scss:css/style.css
# 같은 디렉토리를 사용하는 경우
sass --watch css/style.scss:css/style.css
```

---

### 3. SCSS Variable Declaration and Scope 👩‍💻

여기서 소개하는 모든 내용은 SCSS 가 트랜스파일 되어 어떻게 CSS 로 변환되는지를 보여준다.

#### 1. Nesting

```scss
.enlarge {
  font-size: 14px;
  transition: {
    property: font-size;
    duration: 4s;
    delay: 2s;
  }

  &:hover { font-size: 36px; }
}
```

```css
.enlarge {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
.enlarge:hover {
  font-size: 36px;
}
```

<br>

```scss
.info-page {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
}
```

```css
.info-page {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 2px;
}
```

#### 2. Hidden Declarations

다음과 같이 조건을 주어 CSS 로 트랜스파일 할지, 하지 않을지 조건을 줄 수 있다.

```scss
$rounded-corners: false;

.button {
  border: 1px solid black;
  border-radius: if($rounded-corners, 5px, null);
}
```

```css
.button {
  border: 1px solid black;
}
```

#### 3. Custom Properties

다음과 같이 SCSS 변수를 CSS 의 `:root`에 전역화 할 수 있다.

```scss
$primary: #81899b;
$accent: #302e24;
$warn: #dfa612;

:root {
  --primary: #{$primary};
  --accent: #{$accent};
  --warn: #{$warn};

  // Even though this looks like a Sass variable, it's valid CSS so it's not
  // evaluated.
  --consumed-by-js: $primary;
}
```

```css
:root {
  --primary: #81899b;
  --accent: #302e24;
  --warn: #dfa612;
  --consumed-by-js: $primary;
}
```

#### 4. Variable Scope

```scss
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}

.sidebar {
  global: $global-variable;

  // This would fail, because $local-variable isn't in scope:
  // local: $local-variable;
}
```

```css
.content {
  global: global value;
  local: local value;
}

.sidebar {
  global: global value;
}
```

<br>

```scss
$variable: global value;

.content {
  $variable: local value;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```

```css
.content {
  value: local value;
}

.sidebar {
  value: global value;
}

```

<br>

```scss
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning");
}
```

```css
.alert {
  background-color: #ffc107;
}
```

#### 5. Flow Control Scope

```scss
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```

```css
.button {
  background-color: #750c30;
  border: 1px solid #f5ebfc;
  border-radius: 3px;
}
```
---

### 4. SCSS Basic @Rules 👩‍💻

#### 1. @use

> @import 가 동일한 역할을 한다. 단 Deprecated 상태다 마찬가지이므로 `@use`를 선호하라고 말하고 있다.

`@use`는 JavaScript 의 `import`와 유사하다. 단, 파일 단위로만 가져올 수 있다.

- foundation/_code.scss

```scss
code {
  padding: .25em;
  line-height: 0;
}
```

- foundation/_lists.scss

```scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}
```

이제 위 두 파일을 style.scss 에 합쳐보자.

- style.scss

```scss
@use 'foundation/code';
@use 'foundation/lists';
```

그리고 다음과 같이 트랜스파일 될 것이다.

```css
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

#### 2. @mixin and @include vs. @extend

스타일을 재사용 할 수 있는 방법은 크게 두 가지로 나눌 수 있다.

__1 ) `@mixin` and `@include`__

다음과 같이 재사용 할 스타일을 정의해보자.

```scss
@mixin text-style {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}
```

이제 이 `@mixin`을 다음과 같이 `@include`를 이용해 재사용 할 수 있다.

```scss
.heading {
  @include text-style;
  font-weight: bold;
}

.paragraph {
  @include text-style;
}
```

트랜스파일 결과는 다음과 같다.

```css
.heading {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  font-weight: bold;
}

.paragraph {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}
```

<br>

__2 ) `@extend`__

```scss
.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  background-color: #333;
}

.btn-primary {
  @extend .btn;
  background-color: #007bff;
}
```

트랜스파일 결과는 다음과 같다.

```css
.btn, .btn-primary {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  background-color: #333;
}

.btn-primary {
  background-color: #007bff;
}
```

<br>

<p class="center">어떤 것을 써야 할까?</p>

__1 ) `@mixin` and `@include`__

- 목적: 스타일 Text 정의 자체를 재사용하기 위함.
- 장점: `@mixin`과 `@include`의 사용 목적은 코드 자체의 재사용성이다. 한 번만 정의하고, 필요한 곳에서 `@include`를 사용해 주입만 하면 된다.
  `@mixin`를 통해 키값이 명시적으로 제공되기 때문에 사용이 쉽고 가독성이 좋다.
- 단점: 스타일 Text 자체가 복사되어 매번 주입되기 때문에 SCSS 를 작성할 때는 코드의 중복이 줄어들지만 최종 결과물인 CSS 트랜스파일의 중복이
  발생한다. 즉, `DRY(Don't repeat yourself)` 원칙에 위배된다. 따라서 너무 많은 `@mixin`의 사용은 좋지 않다.

<br>

__2 ) `@extend`__

- 목적: 스타일 Text 정의가 아닌 CSS 선택자를 재사용하기 위함.
- 장점: 결과적으로 상속을 처리한다. 트랜스파일의 결과물만 보면 DRY 원칙에 위배되지 않아 매우 좋은 결과물을 보여준다.
- 단점: 스타일 Text 정의 자체를 재사용하지는 않기 때문에 CSS 정의 자체를 잘 하는 것이 중요하다. 즉, SCSS 를 기준으로 CSS 를 만드는 느낌
  보다 CSS 를 기준으로 재사용 할 부분을 공통 부분으로 추출해 상속을 통해 처리하는 느낌에 가깝다. 따라서 SCSS 파일의 가독성이
  `@mixin` and `@include` 대비 부족하다.

---

### 5. @if and @else 👩‍💻

```scss
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include theme-colors($light-theme: true);
  body.dark & {
    @include theme-colors($light-theme: false);
  }
}
```

```css
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
```

---

### 6. Loops 👩‍💻

SCSS 를 통해 for, forEach, while 을 모두 사용할 수 있다. 우선 가장 간단한 기본 형태를 확인한 후 실제로 어떤식으로 
사용될 수 있는지 자세히 확인해보도록 하자.

```scss
$colors: red, green, blue;

// for loop
@for $i from 1 through length($colors) {
  .color-#{$i} {
    color: nth($colors, $i);
  }
}

// for loop (1부터 5 미만까지)
@for $i from 1 to 4 {
  .color-#{$i} {
    color: nth($colors, $i);
  }
}

// each loop
@each $color in $colors {
  .color-#{index($colors, $color)} {
    color: $color;
  }
}

// while loop
$i: 1;
@while $i <= length($colors) {
  .color-#{$i} {
    color: nth($colors, $i);
  }
  $i: $i + 1;
}
```

#### 1. @each with List or Map

__1 ) `@each` with `List`__

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

```css
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```

<br>

__2 ) `@each` with `Map`__

```scss
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

```css
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f112";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12e";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "\f12f";
}
```

#### 2. @for

```scss
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

```css
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

---

### 7. Use `&` Operator 👩‍💻

`&` 연산자를 사용하면 `@if`와 같은 조건문 없이 특정 CSS 조건을 토글하도록 할 수 있다.

```scss
main {
  figure {
    em {
      opacity: 0;

      &.on {
        opacity: 0.8;
      }
    }
  }
}
```

```css
main figure em {
  opacity: 0;
}
main figure em.on {
  opacity: 0.8;
}
```

<br>

```scss
main {
  &.dark_text {
    header h1,
    header #gnb a {
      color: #555;
    }
  }

  header {
    h1 {
      color: #fff;
    }

    #gnb {
      font-weight: bold;
      a {
        color: #fff;
      }
    }
  }
}
```

```css
main.dark_text header h1,
main.dark_text header #gnb a {
  color: #555;
}
main header h1 {
  color: #fff;
}
main header #gnb {
  font-weight: bold;
}
main header #gnb a {
  color: #fff;
}
```

<br>

```scss
$times: morning, afternoon, evening, night;

.container {
  @each $time in $times {
    &.#{$time} {
      background-image: url('../img/bg_#{$time}.jpg');

      figure {
        background-image: url('../img/phone_#{$time}.png');
      }
    }
  }
}
```

```css
.container.morning {
  background-image: url("../img/bg_morning.jpg");
}
.container.morning figure {
  background-image: url("../img/phone_morning.png");
}
.container.afternoon {
  background-image: url("../img/bg_afternoon.jpg");
}
.container.afternoon figure {
  background-image: url("../img/phone_afternoon.png");
}
.container.evening {
  background-image: url("../img/bg_evening.jpg");
}
.container.evening figure {
  background-image: url("../img/phone_evening.png");
}
.container.night {
  background-image: url("../img/bg_night.jpg");
}
.container.night figure {
  background-image: url("../img/phone_night.png");
}
```

### 8.keyframes 👩‍💻

단순 CSS 지만 SCSS 가 이런식의 중첩 구조를 깔끔하게 처리하는 데서 강점을 갖는다.

```scss
@keyframes cloud {
  0% {
    opacity: 0;
    left: -50%;
  }
  5% {
    opacity: 0.5;
  }
  95% {
    opacity: 0.5; /* 얘가 있어야 5 ~ 95% 구간의 opacity 가 0.5 로 유지가 된다 */
  }
  100% {
    left: 80%;
    opacity: 0;
  }
}
```


---
Reference

1. "SASS." Sass-lang. accessed Apr. 15, 2023, [SASS](https://sass-lang.com).

