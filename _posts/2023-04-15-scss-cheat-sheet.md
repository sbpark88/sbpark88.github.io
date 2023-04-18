---
layout: post
title: SCSS List(Array), Loops, Variables, Mixins
subtitle: SCSS Make the CSS likes JavaScript
categories: css
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

### 4.  👩‍💻

---

### 5.  👩‍💻

---

### 6.  👩‍💻







---
Reference

1. "SASS." Sass-lang. accessed Apr. 15, 2023, [SASS](https://sass-lang.com).

