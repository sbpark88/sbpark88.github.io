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
Reference

1. "SASS." Sass-lang. accessed Apr. 15, 2023, [SASS](https://sass-lang.com).

