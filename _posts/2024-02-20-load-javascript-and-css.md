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

```javascript
export const loadStyle = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  document.head.appendChild(link);
};
```

CSS 역시 **Dynamic import** 를 사용할 수 있다. UI 와 관련된 라이브러리는 JavaScript 와 CSS 를 함께 배포하는 데, 
일반적으로 Webpack, Vite 등이 알아서 `import`를 처리해 주겠지만, VanillaJS 로 개발하거나 CDN 에서 가져올 경우 
위와 같은 함수를 사용해 head 태그에 스타일을 불러오도록 요청할 수 있다. 위 방법은 모든 브라우저에서 사용 가능한 기본적인 
방식이기 때문에 [JavaScript with assert](#h-5-javascript-with-assert) 와 같이 크로스 브라우징 문제가 
발생하지 않는다는 것이 가장 큰 장점이다.

---

### 2. Load JavaScript 👩‍

#### 1. Including JavaScript

CSS 와 마찬가지로 처음부터 HTML 에 내장하는 방식이다. HTML 태그 내부에 `script` 태그를 사용해 직접 내장할 수 있다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head></head>
  <body>
    <button type="button" onclick="changeColor('#AEA')">Click!!</button>

    <script>
      function changeColor(color) {
        event.target.style.backgroundColor = color;
      }
    </script>
  </body>
</html>
```

이때 head 부분에 script 를 위치시켜도 상관 없지만, script 내 JavaScript 코드에 DOM 이 필요한 코드가 있을 경우 아직 그려지지 않은 DOM 
을 찾지 못해 에러가 발생하기 때문에 주로 *body 태그가 닫힌 다음* 또는 *body 태그가 닫히기 직전* 에 script 를 넣곤 했다.

> 단, 위와 같이 작성한 경우 `onclick="changeColor('#AEA')"`에 사용된 함수 `changeColor`는 반드시 DOM 에 내장되어 있어야 한다. 
> script 를 외부 리소스로 분리해 로드하는 [script](#h-2-script) 방식으로는 함수를 찾지 못한다. 

그리고 위 코드가 가능하다는 것은 `a` 태그의 `href` 속성이나 많은 엘리먼트에서 사용 가능한 `onclick`, `onmouseover`, `onkeyup` 과 같은 
속성에는 JavaScript 작성된 텍스트를 브라우저가 JavaScript 코드로 인식하고 수행할 수 있다는 것이다. 따라서 다음과 같이 CSS 와 같이 
엘리먼트에 직접 인라인으로 작성하는 것 역시 가능하다.

```html
<button
    type="button"
    onclick="this.style.backgroundColor = '#AEA'"
>
  Click!!
</button>
```

CSS 와 마찬가지로 처음부터 DOM 에 내장되었기 때문에 별도의 네트워크 통신이 필요하지 않다.

CSS 를 처음부터 HTML 에 내장하는 방식이다. HTML 태그 내부에 `style` 태그를 사용해 직접 내장하거나, HTML 엘리먼트에 인라인으로
작성하면 별도의 외부 파일 없이 작동이 가능하다. 따라서 CSS 스타일을 얻기 위한 별도의 네트워크 통신이 필요하지 않다.

#### 2. script

일반적으로 *head* 태그 내에 `script`태그와 `src` 속성을 사용해 **HTTP Request** 를 보내는 방식을 사용한다.

```html
<head>
  <script type="text/javascript" src="js/main.js"></script>
</head>
```

브라우저의 네트워크 탭을 보면
<span style="color: red;">리소스 타입이 *script*</span> 임을 확인할 수 있다. 

[Including JavaScript](#h-1-including-javascript) 에서 확인했듯이, DOM 이 먼저 그려져야 하는 코드가 존재하는 문제는 여전히 
유효하다.

이 문제를 해결하는 방법은 **MutationObserver** 를 사용하는 일반적이지 않은 방법을 제외하면 3가지로 정리할 수 있다.

<br>

__1 ) window.onload__

```html
<button type="button" id="foo">Click!!</button>
```

```javascript
window.onload = () => {
  document
    .getElementById('foo')
    .addEventListener('click', () => changeColor('#AEA'));
};
```

<br>

__2 ) addEventListener__

window.onload 는 HTML 문서에 한 번만 사용 가능해 중복시 마지막에 선언된 이벤트 핸들러가 이전의 핸들러를 모두 덮어쓴다. 물론, 
코드를 잘 작성하면 되지만 단일 문서가 아닐 경우 예상하기 힘든 경우가 생길 수 있다.  
여전히 많은 서버는 SSR 을 사용하고 있으며, Next.JS 와 같은 모던 라이브러리가 아닌 JSP, Thymeleaf, EJS, Pug(=Jade) 와 
같은 템플릿 엔진을 사용하는 경우 의도하지 않은 중복으로 특정 script 의 onload 코드가 무시되는 경우가 발생하는 문제가 발생한다.

따라서 window 에 `load` 이벤트를 사용하면 여러 개의 이벤트를 등록할 수 있어 위 문제를 해결할 수 있다.

```javascript
window.addEventListener('load', () => {
  document
    .getElementById('foo')
    .addEventListener('click', () => changeColor('#AEA'));
});
```

중복 등록에 대한 문제는 해결할 수 있지만 window 를 기다리는 것은 동일하기 때문에 DOM 이 이미 존재함에도 다른 모든 리소스를 기다리므로 
불필요한 지연이 발생할 수 있다. `load` 대신 `DOMContentLoaded` 이벤트를 사용하면, ① HTML 문서의 파싱이 완료되고, ② 모든 
지연된 스크립트(`<script defer src="...">`와 `<script type="module">`)가 다운로드되고 실행될 때 트리되므로 모든 문제를 
해결할 수 있다.

```javascript
window.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('foo')
    .addEventListener('click', () => changeColor('#AEA'));
});
```

> 좀 더 자세히 설명하면, 아래서 설명할 `defer` 속성이 `DOMContentLoaded`가 트리거 되는 것을 막는다. 그리고 
> `JavaScript Module`은 기본적으로 `defer` 처리 된다. 그렇기 때문에 ① HTML 문서의 파싱이 완료되고, ② 모든 지연된 스크립트가 
> 다운로드되고 실행되는 것이다.

<br>

__3 ) defer__

하지만, `DOMContentLoaded` 역시 코드를 작성할 때 항상 이벤트 리스너를 등록해야하므로 코드 작성의 흐름이나 가독성에 영향을 준다. 
또한, 해당 이벤트 리스너는 최초 로딩 후 더이상 트리거 될 일은 없지만, 좀 더 최적화를 하고자 한다면 이벤트를 제거하는 작업까지 포함되어야 
한다. 결론적으로, 코드를 분리해 관리 할 수 있는 장점은 존재하지만, 최적화에 추가적인 노력 필요, 코드량 증가, 가독성 하락 등의 문제가 있어   
*body 태그가 닫힌 다음* 또는 *body 태그가 닫히기 직전* 에 script 를 넣는 것이 오히려 가장 최적화된 가장 좋은 코드가 된다.

이러한 문제를 해결하기 위해 `script` 태그에 `defer`라는 속성이 추가되었다. 단지 `defer` 속성을 명시하는 것 만으로 기존과 동일하게
**HTTP Request** 를 보내 외부 리소스를 요청하지만, <span style="color: red;">HTML 문서의 파싱 완료 및 모든 지연된 스크립트가 
다운로드되고 execute</span> 한다. 

![Async and Defer](/assets/images/posts/2024-02-20-load-javascript-and-css/async-defer.webp)

<style>
  .t__r {
    color: red;
    text-align: center;
  }
  .t__g {
    color: green;
    text-align: center;
  }
</style>

<table>
  <thead>
    <tr>
      <th></th>
      <th>default</th>
      <th>async</th>
      <th>defer</th>
      <th>module</th>
      <th>module async</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fetch 로 인한 파싱 중단</td>
      <td class="t__r">O</td>
      <td class="t__g">X</td>
      <td class="t__g">X</td>
      <td class="t__g">X</td>
      <td class="t__g">X</td>
    </tr>
    <tr>
      <td>execute 로 인한 파싱 중단</td>
      <td class="t__r">O</td>
      <td class="t__r">O</td>
      <td class="t__g">X</td>
      <td class="t__g">X</td>
      <td class="t__r">O</td>
    </tr>
    <tr>
      <td>script 순서 보장</td>
      <td class="t__g">O</td>
      <td class="t__r">X</td>
      <td class="t__g">O</td>
      <td class="t__g">O</td>
      <td class="t__r">X</td>
    </tr>
    <tr>
      <td>modulation</td>
      <td class="t__r">X</td>
      <td class="t__r">X</td>
      <td class="t__r">X</td>
      <td class="t__g">O</td>
      <td class="t__g">O</td>
    </tr>
  </tbody>
</table>

물론, 다른 스크립트나 DOM 에 영향을 받지 않는 경우 **async** 를 사용할 수 있으나 일반적으로, fetch, execute 로 인한 HTML 의 
파싱은 중단되지 않는 것이 좋고, 스크립트의 순서는 필요시 보장되어야하며, 모듈 타입으로 다루는 것이 좋다.

따라서 오늘날 가장 적합한 방식은 defer 를 사용하거나, module 타입을 사용하고 필요시 async 처리를 하는 것이 가장 좋다고 할 수 있다.

> `module`로 설정하게되면, 이것은 script 가 <span style="color: red;">JavaScript Module</span> 로 처리하도록 간주되며, 
> 코드의 실행이 <span style="color: red;">deferred</span> 된다. 따라서 더이상 `charset`과 `defer` 속성은 의미가 없어 
> 작성할 필요가 없으며, 클래식한 방식의 `text/javascript`와 달리 **Cross-Origin Fetching** 에
> <span style="color: red;">CORS</span> 프로토콜을 사용해야 한다.

#### 3. import

모듈로 다룰 경우 직접 호스팅 중인 서버의 스크립트 뿐 아니라 일부 CDN 의 경우 리소스를 모듈로 제공해 `import`를 사용할 수 있게 해준다.

```javascript
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs"

const swiper = new Swiper(...)
```

단, 직접 호스팅 하는 서버에서 제공하는 스크립트가 아닐 경우, 위와 같은 `import`를 사용한 요청이 모든 CDN 에 적용 가능한 것은 아니다. 
참고로 위와 같이 `import`로 요청한 모듈 스크립트까지 다운로드가 완료되기 전까지 모든 모듈 스크립트 코드의 실행이 지연된다. 따라서
해당 스크립트 내 `import`보다 위에 작성된 코드라 하더라도 모듈 스크립트의 코드가 다운로드 완료되기 전까지 execute 되지 않아 
코드의 실행이 지연되므로 별도의 비동기 처리 없이 `const swiper = new Swiper(...)`와 같이 동기적으로 코드를 작성하면 된다.

#### 4. Webpack & JavaScript

요즘 프론트엔드 개발은 대부분 이 방법을 사용한다. 모듈 스크립트를 사용해 `import`로 필요한 모듈 전체 또는 메서드만 가져오고, Webpack 이 
<span style="color: red;">Tree Shaking</span> 등을 통해 최적화 한다.

```javascript
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
```

#### 5. Dynamic import

요즘 프론트엔드는 코드를 **chunk** 단위로 나누고 **dynamic import** 를 사용해 한 번에 모든 리소스를 요청하지 않도록 해 페이지의 초기 
로딩 속도를 빠르게 개선하고, 필요한 시점에 필요한 리소스만 요청하도록 최적화를 하고 있다. `import`는 코드 중간에서도 사용이 가능하며, 다음과 
같이 함수로 만들면 쉽게 **dynamic import** 가 가능하다.

```javascript
export const loadScript = async (src) => import(src);
```

```javascript
const Swiper = await loadScript(
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
);

const swiper = new Swiper(...)
```

<br>

하지만 Webpack 을 사용하지 않거나 CDN 같은 곳에 요청해야 할 경우, `import` 사용이 불가능한 환경도 고려애햐한다. 
[CSS Dynamic import](#h-6-dynamic-import) 와 마찬가지로 간단하게 HTML 에 script 를 추가하는 함수를 만들어 사용할 수 있다.

```javascript
export const loadScript = (src) => {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'module';
  script.async = false;
  document.head.appendChild(script);
};
```

단, CSS 와 달리 JavaScript 는 <span style="color: red;">스크립트의 다운로드가 완료된 시점을 확인해야 할 필요</span>가 있다. 
따라서, 다운로드 완료 여부를 확인 후 비즈니스 로직을 실행하도록 비동기 처리를 할 필요가 있는데, `Promise`와 `Event Listener`를 적절히 
사용해 위 함수를 개선시킬 수 있다.

다음은 예전에 토이 프로젝트를 하면서 외부 스크립트를 특정 페이지 방문시 **Dynamic import** 를 적용하되, 스크립트 중복 요청을 방지하고, 
스크립트의 로드 완료 여부를 확인 후 다음 코드를 작동시키기 위해 만들었던 코드를 일부다.

```javascript
export const loadScript = ({ src, mode = "none" }) =>
  new Promise((resolve, reject) => {
    try {
      const previous = document.querySelector(`script[src="${src}"]`);
      if (previous === null) {
        const script = document.createElement("script");
        script.src = src;
        setScriptMode(mode)(script);

        script.addEventListener("load", () =>
          resolve({
            load: true,
            removeScript: () => document.head.removeChild(script),
          })
        );
        script.addEventListener("error", () =>
          reject({
            load: false,
            message: `Fail to load external script from ${src}`,
          })
        );

        document.head.appendChild(script);
      } else {
        resolve({
          load: true,
          removeScript: () => document.head.removeChild(previous),
        });
      }
    } catch (e) {
      throw new Error(`Fail to load external script`);
    }
  });

const setScriptMode = (mode) => {
  switch (mode) {
    case "async":
      return (script) => (script.async = true);
    case "defer":
      return (script) => (script.defer = true);
    default:
      return () => undefined;
  }
};
```

```javascript
const kakaoMapApiBaseUrl =
    "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=";
const kakaoMapApiScriptSrc = kakaoMapApiBaseUrl + kakaoMapApiKey;

const [loadKakaoMapScript, setLoadKakaoMapScript] = useState(null);

useEffect(() => {
  let removeScript;
  const loadKakaoMapApi = async () => {
    try {
      const result = await loadScript({
        src: kakaoMapApiScriptSrc,
      });
      setLoadKakaoMapScript(result.load);
      if (result.load) {
        removeScript = result.removeScript;
      }
    } catch (e) {
      console.error(`You cannot use kakao map, error: ${e}`);
    }
  };
  loadKakaoMapApi();

  // return () => removeScript && removeScript();
}, []);
```

`removeScript`는 HTML 내에 해당 스크립트를 제거하고 싶을 때만 사용한다. 제거시 다시 필요하면 다시 로딩해야 하기 때문에 일반적으로
사용할 일은 많지 않을 것이다.


<br><br>

---
Reference

1. "import." MDN Web Docs. Feb. 20, 2024, [MDN - import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

[CSS Declarations]:/css/2024/02/03/css-summary.html#h-1-css-declarations-
[Browser compatibility]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#browser_compatibility
