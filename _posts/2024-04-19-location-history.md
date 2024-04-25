---
layout: post
title: Location and History
subtitle: Short book about the location and history
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [location, history, origin, hash, scroll restoration, pushState, replaceState, popstate, hashchange]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 1. Location 👩‍💻

#### 1. Properties

`http://localhost:1234/food?search=meet&amount=1kg#onSale` 주소로 접속해보자.

**Location** 은 현재 페이지 정보를 반환하거나 제어하는 객체로 properties 는 다음과 같다. 

| Property | Value                                                    |
|----------|----------------------------------------------------------|
| href     | http://localhost:8080/food?search=meet&amount=1kg#onSale |
| origin   | http://localhost:8080                                    |
| protocol | http\:                                                   |
| host     | localhost:8080                                           |
| hostname | localhost                                                |
| port     | 8080                                                     |
| pathname | /food                                                    |
| search   | ?search=meet&amount=1kg                                  |
| hash     | #onSale                                                  |

Query 를 분리하고 싶다면 아래 함수를 사용하면 된다.

```javascript
const getQueryParams = (str) => str.split('&');
const splitQueryParam = (acc, param) => {
  const [key, value] = param.split('=');
  return { ...acc, [key]: value };
};

export const parseQueryString = (url) => {
  const queryString = url.split('?')[1];
  if (!queryString) return;

  const removeHash = (str) => str.split('#')[0];
  return (
    [queryString]
      .map(removeHash)
      .map(getQueryParams)
      .flatMap((v) => v)
      .reduce(splitQueryParam, {}) ?? {}
  );
};

export const getCurrentQueryString = () => {
  const queryString = location.search.replace('?', '');
  return (
    [queryString]
      .map(getQueryParams)
      .flatMap((v) => v)
      .reduce(splitQueryParam, {}) ?? {}
  );
};
```

#### 2. Methods

- `assign(url:)`: 해당 주소로 페이지를 이동시킨다. 새 히스토리를 추가한다.
- `replace(url:)`: 해당 주소로 페이지를 이동시킨다. 현재 히스토리를 교체한다.
- `reload(forceGet:)`: 페이지 새로고침. `true`를 주면 강력 새로고침(default: `false`).

한 가지 예를 들어보자. `/` -> `/page1` -> `/page2` -> `/page3`로 이동했다고 해보자. 그러면 현재 `history.lenght`
는 4인 상태다. 여기서 `assign(url:)`메서드와 `replace(url:)`메서드를 사용해서 각각 `/page4`로 이동하면 어떻게 될까?

- assign: 히스토리는 `/` -> `/page1` -> `/page2` -> `/page3` -> `/page4`로 `history.length`는 5다.
- replace: 히스토리는 `/` -> `/page1` -> `/page2` -> `/page4`로 `history.length`는 4다.

따라서 `assign`으로 이동한 경우 뒤로가기를 하면 `/page3`로 가게 되고, `replace`로 이동한 경우 뒤로가기를 하면 `/page2`로 
가게 된다. 이것은 `hash`를 사용해 `/` -> `#page1` -> `#page2` -> `#page3`로 이동한 경우도 마찬가지다.

<br>

`hash`를 사용할 경우 주의해야 할 것이 있다.

```html
<nav>
  <a href="#page1">Page 1</a>
  <a href="#page2">Page 2</a>
  <a href="#page3">Page 3</a>
  <input type="text" />
</nav>
<section id="page1" class="page1"></section>
<section id="page2" class="page2"></section>
<section id="page3" class="page3"></section>
```

과 같이 사용하는 경우 `document.querySelector('#page1')`로 대상을 찾아 제어할 수 있다. 그런데 `hash`를 이용해 
페이징 시키려는 경우 아래와 같이 페이지 `id`를 `/page`과 같이 사용하는 경우가 있다.

```html
<nav>
  <a href="#/page1">Page 1</a>
  <a href="#/page2">Page 2</a>
  <a href="#/page3">Page 3</a>
  <input type="text" />
</nav>
<section id="/page1" class="page1"></section>
<section id="/page2" class="page2"></section>
<section id="/page3" class="page3"></section>
```

이 경우 대상을 찾을때 `querySelector()` 메서드가 `/`를 경로 구분이 아닌 문자열로 인식하도록 
`document.querySelector('#\\/page1')`와 같이 대상을 찾아 제어해야한다.

<br>

`window.scrollTo()` 메서드는 `window.scrollTo(x:y:)`와 `window.scrollTo({top:left:behavior:})` 두 가지 
사용법이 있어, 객체로 값을 전달하면 `behavior`를 사용해 부드럽게 스크롤 할 수 있다.

페이지 내에서 `hash`를 사용해 특정 element 로 이동하고자 할 때 `location.assign(url:)`과 `location.replace(url:)` 
메서드를 사용할 수 있는데, 이 메서드는 `behavior`를 지정할 수 없어 스크롤 되며 이동되지 않는다. 즉각 해당 `hash` 위치로 이동하고만다.

어떻게 하면 `hash`를 사용해 특정 element 로 이동하면서 `behavior`를 사용해 부드럽게 스크롤 되며 이동할 수 있을까?  
이때 [E.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) 를 사용하면 
`hash`를 사용해 특정 element 로 스크롤 되며 이동할 수 있다.

```javascript
// @ts-check

/**
 * DOM Selector
 * @param selector {string} - CSS selector
 * @returns {NodeListOf<Element> | Element}
 */
const $ = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  return nodeList.length === 1 ? nodeList[0] : nodeList;
};

/**
 * Scroll to element smoothly
 * @param $el {Element}
 */
const scrollToElement = ($el) => {
  $el.scrollIntoView({
    behavior: 'smooth',
  });
};
```

```javascript
scrollToElement($('#somthing'));
```

---

### 2. History 👩‍💻

#### 1. Properties

History 는 브라우저 히스토리(세션 기록) 정보를 반환하거나 제어하는 객체다.

- `length`: 등록된 히스토리 개수
- `scrollRestoration`: 히스토리 탐색시 스크롤 위치 복원 여부 확인 및 지정
- `state`: 현재 히스토리에 등록된 state

#### 2. Methods

- `back()`: 뒤로 가기
- `forward()`: 앞으로 가기
- `go(delta?:)`: `delata`를 입력하지 않거나 0 이면 새로고침, 음수면 뒤로 가기, 양수면 앞으로 가기로 작동.
- `pushState(state, unused, url?:)`: 히스토리에 state 및 url 을 추가한다.
- `replaceState(state, unused, url?:)`: location 의 `assign(url:)`와 `replace(url:)`의 관계와 마찬가지로
  `pushState(state, unused, url?:)`와 동일하게 작동하지만 현재의 히스토리를 교체한다.

`unused`는 역사적인 이유로 생략이 불가하다. 유일하게 Safari 만 아직도 이것을 `title`로 사용하는 데, 나머지 브라우저가 모두 사용하지 
않기 때문에 크로스브라우징이 불가능해 사용하지 않는 값이라 보면 된다. 단, 비워두는 것 보다 <span style="color: red;">빈 문자열을 
전달</span>하는 것이 나중에 메서드가 변경되는 경우에도 안전하다.

<br>

`state` 변경은 이벤트의 <span style="color: red;">**popstate**</span> 로 감시할 수 있는데,
`window.addEventListener('popstate', () => {})` 이벤트의 트리거 여부는 다음과 같다.

- trigger O: 브라우저 뒤로 가기, 브라우저 앞으로 가기, `location.href`, `location.assign`, `location.replace`, 
             `history.back`, `history.forward`, `history.go(양수)`, `history.go(음수)`
- trigger X: 브라우저 새로고침, `location.reload`, `history.pushState`, `history.replaceState`, 
             `history.go()`, `history.go(0)`

이벤트 타입이 <span style="color: red;">**popstate**</span>여서 당연히 
<span style="color: red;">**history.pushState**</span> 와 
<span style="color: red;">**history.replaceState**</span>에 
트리거가 발생할 것 같지만 <span style="color: red;">트리거 되지 않는다는 것에 주의</span>해야한다
(이벤트로 `hashchange`를 사용할 수도 있는데, 마찬가지로 pushState 와 replaceState 는 트리거 되지 않는다. 그리고 
beforeunload, unload 는 document 가 변경되는 것이 아니기 때문에 ).

```javascript
const Page = (num) => `
<section class="page${num}">
  <h1>Page ${num}</h1>
</section>
`;
const pageNotFount = `
<section>
  <h1>404 Page Not Found!</h1>
</section>
`;

const pages = [
  { path: "#/page1", template: Page(1) },
  { path: "#/page2", template: Page(2) },
  { path: "#/page3", template: Page(3) }
];

const appEl = $("#app");

const renderPage = () => {
  const page = pages.find((page) => page.path === location.hash);
  render(appEl)(page ? page.template : pageNotFount);
};

window.addEventListener("popstate", renderPage);

const pagePush = (num) => {
  history.pushState({ data: num }, "", `#/page${num}`);
  renderPage();
};

const inputEl = document.querySelector("nav input");
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") pagePush(event.target.value);
  event.target.value = "";
});

pagePush(1); // initial page
```

위에 사용된 `$`는 jQuery 가 아니고 `querySelectorAll`, `querySelector`를 하나로 합쳐 만든 함수로
[render.js](/assets/js/utils/render.js) 에서 확인할 수 있다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="abxPjRP" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/abxPjRP">
  popstate</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>



<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "Location." MDN Web Docs. Jan. 16, 2024, accessed Apr. 19, 2024, [MDN - Location].
3. "History." MDN Web Docs. Jan. 12, 2024, accessed Apr. 19, 2024, [MDN - History].


[MDN - Location]:https://developer.mozilla.org/en-US/docs/Web/API/Location
[MDN - History]:https://developer.mozilla.org/en-US/docs/Web/API/History
