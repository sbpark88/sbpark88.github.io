---
layout: post
title: Load JavaScript and CSS
subtitle: Deep dive loading methods for resources about JavaScript and CSS
excerpt_image: NO_EXCERPT_IMAGE
categories: [html, javascript, css]
tags: [link, import, dynamic import]
---

### 1. Load CSS 👩‍

#### 1. Including CSS

CSS 를 처음부터 HTML 에 내장하는 방식이다. HTML 태그 내부에 `style` 태그를 사용해 직접 내장하거나, HTML 엘리먼트에 인라인으로 
작성하면 별도의 외부 파일 없이 작동이 가능하다. 따라서 CSS 스타일을 얻기 위한 별도의 네트워크 통신이 필요하지 않다.

#### 2. link

일반적으로 *head* 태그 내에 `link` 태그를 사용해 **HTTP Request** 를 보내는 방식을 사용한다.

```html
<head>
  <link rel="stylesheet" href="/css//main.css" />
</head>
```

브라우저의 네트워크 탭을 보면 
<span style="color: red;">리소스 타입이 *stylesheet*</span> 임을 확인할 수 있다. 물론, DOM 이 이미 그려졌는데 CSS 가 
너무 늦게 로딩된다면 화면의 표현에 문제가 생기지만 CSS 는 JavaScript 와 달리 DOM 파싱과 관련해 작동 자체는 순서의 영향을 받지 
않기 때문에 요청만 잘 하면 크게 신경 쓸 부분이 있지는 않다.

#### 3. @import

```css
@import url("fineprint.css") print;
@import url("bluish.css") speech;
@import "custom.css";
@import url("chrome://communicator/skin/");
@import "common.css" screen;
@import url("landscape.css") screen and (orientation: landscape);
```

[CSS Declarations] 에서도 설명했지만 CSS 파일을 좀 더 효율적으로 분리시킬 수 있는 장점은 있지만 직렬로 요청하는 문제가 있다. 
처음부터 **including** 되는 방식이 아니고 먼저 받아온 CSS 파일을 해석하고 추가로 불러오기 때문에 시간이 지연되고, 
<span style="color: red;">CSS 우선 순위가 뒤바뀌어 잘못된 스타일이 적용</span>되거나, DOM 이 이미 로딩 되었는데 
제때 스타일이 적용되지 않는 문제가 발생할 수 있다.

따라서 CSS 를 사용할 때는 [Link](#h-2-link) 방식을 사용해 병렬로 요청하거나, SCSS 등을 사용해 전처리 과정을 거쳐야한다. 

#### 4. Webpack & JavaScript

Webpack 을 예로 들었지만, 다른 번들링 도구를 사용해도 비슷하다. 우선 번들링 옵션을 정확히 설정하는 것이 쉽지는 않지만, 
번들링을 적용하면, CSS 파일을 최적화 하는 것은 물론이고, JavaScript 를 사용해 CSS 를 불러올 수 있게 해준다.

```javascript
import "../css/main.css"
```

또한 이 방식의 장점은 SCSS 를 불러오는 것 역시 손쉽게 처리해준다는 것이다.

```javascript
import "../css/main.scss"
```

React CLI 또는 Vue CLI, Vite CLI 등을 사용해 생성한 앱에서 위와 같은 import 사용이 가능한 이유다.

#### 5. JavaScript with assert

```javascript
import style from '../css/main.css' assert { type: 'css' };
document.adoptedStyleSheets = [style];
```

`import` 명령에 지금 요청하는 이 리소스는 사실 `CSS`라는 것을 명시함으로써 JavaScript 가 이것을 *Stylesheet* 로 다룰 수 있도록 
하는 속성을 사용할 수 있다. 이 방법을 사용하면 JavaScript 가 실행되는 시점에 리소스를 불러와 적용하기 때문에 손쉽게 **Dynamic import** 
를 적용할 수 있다는 장점을 갖는다.

단, 이 방법은 JavaScript 가 다른 JavaScript Module 을 불러오기 위한 명령어이기 때문에 반드시 모듈로 다뤄야 하므로 
`<script type="module"></script>`로 선언이 필요하며, 요청되는 CSS 는 브라우저의 네트워크 탭에 
<span style="color: red;">리소스 타입이 *script*</span> 로 확인된다.

다만 이 방법은 현재 사용할 수 없는 방법이다. [Browser compatibility] 를 보면 알 수 있듯이 `assert`는 
<span style="color: green;">크로미움 기반에서만 작동</span>하고, <span style="color: red;">파이어폭스나 사파리에서는 
작동하지 않는다</span>. 현실적으로 VanillaJS 로 개발을 하더라도 크로스 브라우징 문제로 아직은 사용할 수 없다. 하지만 우리에게는 
Webpack, Vite 와 같은 훌륭한 대안이 존재하기 때문에 크게 문제가 되지는 않는다.

#### 6. Dynamic import

---



<br><br>

---
Reference

[CSS Declarations]:/css/2024/02/03/css-summary.html#h-1-css-declarations-
[Browser compatibility]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
