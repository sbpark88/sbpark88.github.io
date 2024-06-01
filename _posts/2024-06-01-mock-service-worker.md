---
layout: post
title: About Mock Service Worker
subtitle: Make Mock Server for frontend development
excerpt_image: /assets/images/posts/2024-06-01-mock-service-worker/excerpt_image.png
categories: [javascript]
tags: [msw, mock, server, express, postman]
---

### 1. Mock Server 👩‍💻

프론트엔드나 앱 개발을 하다 보면 항상 문제가 API 개발이 되어있어야 실제 개발을 진행할 수 있다는 것이다. 회사에서 근무할 때 풀스택으로 일했기 
때문에 내가 서버 DB 테이블도 만들고, 서버 API 도 만들고, 프론트엔드 화면도 만들어서 사실 DB -> 서버 -> 화면 순으로 만들면 됐지만 대부분은 
회사가 크고 분업화가 되면 개발 포지션이 나뉘게 되어 API 가 나오기만 기다리는 상황이 생기게 된다.

이걸 경험한 게 나는 A -> B -> C 순서로 개발하려고 했는데 앱 개발자가 B -> C -> A 순으로 해달라고... API 가 나와야 개발한다고... 
이럴때 사용할 수 있는 게 Mock Server 다.

사실 Mocking 을 위한 서버는 Spring 대신 Express 로 띄우면 생각보다 쉽게 띄울 수 있다. 하지만 대부분 이걸 안 하지... 아무튼, Express 
로 Mock Server 를 띄우는 것이 귀찮다면 사실 Postman 을 사용해서도 Mock Server 를 띄울 수 있다([Postman - Mock servers]). 
대부분 Postman 을 API 테스트 용으로 사용하지만, 사실 Postman 은 이를 역으로 API 를 만들어 상태를 저장하고, Mocking 하는 것을 제공할 
수 있는 기능을 제공하고 있다. JSON 응답 뿐 아니라 Postman 이 사용 가능한 다양한 응답을 모두 지원하며, Binary 도 가능해 파일 테스트 역시 가능하다. 
단점이라면 Postman 서버와 인터넷 연결이 필요하기 때문에 Offline 에서는 사용이 불가능하다는 것 정도? 게다가 회사에서 사용할 경우 아마도 
일정량 초과 사용시 비용 부과(?) 정도이지 않을까?

아무튼 Node.js 에는 직접 Express 서버를 만들지 않아도 쉽게 Mock Server 를 만들 수 있는 다양한 라이브러리가 존재하는 데, 그 중 프론트엔드에서 
많이 사용하는 것이 [Mock Service Worker][MSW] 다. MSW 는 Node.js 통합 뿐 아니라 브라우저의 Service Worker 와 통합이 가능하며, 
React Native 와의 통합 역시 지원하는 굉장히 놀라운 라이브러리이다.

---

### 2. Install 👩‍💻

#### 1. npm install

```shell
npm i -D msw
```

설치 이후 코드 작성시 버전에 따라 변경되는 부분이 있으므로 가급적 [MSW] 를 한 번 확인하는 것이 좋다.

#### 2. Browser Integration

__1 ) Copy the worker script__

다음 명령어를 사용하면 Service Worker 사용을 위한 스크립트를 자동으로 설치해준다.

```shell
npx msw init <PUBLIC_DIR>
```

일반적으로 `public`이라는 디렉토리를 사용하므로 다음과 같이 작성하면 된다.

```shell
npx msw init public
```

이제 public 에 `mockServiceWorker.js`가 생성된다.

<br>

__2 ) Setup__

- src/mocks/browser.ts

```typescript
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

아직 `import { handlers } from "./handlers";` 부분을 생성하지 않아 에러가 뜰 것이지만 무시하자. 바로 다음 챕터인 
[Make handlers](#h-3-make-handlers-) 에서 작성할 것이다.

<br>

__3 ) Conditionally enable mocking__

- src/index.tsx

```typescript
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
 
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') return
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}
 
enableMocking().then(() => {
  ReactDOM.render(<App />, rootElement)
})
```

---

### 3. Make handlers 👩‍💻

#### 1. Group request handlers

단일 핸들러면 `src/mocks/handlers.ts` 하나만 만들면 되는데, 보통 API 를 많이 만들다 보면 코드가 혼잡해지기 때문에 백엔드 서버를 
만든다는 생각으로 Endpoint 를 관심사 기준으로 나누어 handlers 를 각각의 파일로 구성해 `src/mocks/handlers/index.ts` 하나로 
모으는 것이 좋다.

![MSW Tree](/assets/images/posts/2024-06-01-mock-service-worker/msw-tree.png)

위 사진에서 `db`라고 분리해 놓은 코드는 공식 문서의 튜토리얼에는 나오지 않은 부분으로 필수 구성 요소는 아니다. 다만 `handlers` 안에 
기본으로 제공할 데이터들이 함께 존재하면 라인 수가 너무 많아져 가독성이 좋지 못한 문제가 있어 분리했다.

- src/mocks/handlers/index.ts

```typescript
import { HttpResponse } from "msw";
import { handlers as optionsHandlers } from "./options";
import { handlers as orderHandlers } from "./order";
import { handlers as productsHandlers } from "./products";
import { handlers as staticHandlers } from "./static";

export const handlers = [
  ...optionsHandlers,
  ...orderHandlers,
  ...productsHandlers,
  ...staticHandlers,
];

interface Params {
  request: Request;
  params: {
    [key: string]: unknown;
  };
  cookies: {
    [key: string]: unknown;
  };
}

export interface HttpResolver {
  (params: Params): HttpResponse | Promise<HttpResponse>;
}
```

이 `index.ts`가 각각의 `handlers`를 하나로 모을 것이다. `Params`와 `HttpResolver`는 JavaScript 로 작성시는 불필요한 코드다.

#### 2. JSON Response

- src/mocks/handlers/options.ts

```typescript
import { http, HttpResponse } from "msw";
import { HttpResolver } from "./index";
import options from "../db/options";

const getOptionsResolver: HttpResolver = () => {
  return HttpResponse.json(options);
};

export const handlers = [http.get("/options", getOptionsResolver)];
```

기본적으로 위와 같은 형태로 JSON 통신 응답을 보낼 수 있다.

#### 3. Request Data & Delay

- src/mocks/handlers/order.ts

```typescript
import { HttpResolver } from "./index";
import { delay, http, HttpResponse } from "msw";
import { orderHistory, OrderInfo } from "../db/order";

const generateOrderNumber = () => Math.floor(Math.random() * 1000000);

const postOrderResolver: HttpResolver = async ({ request }) => {
  const price = await request.json().then((totals) => totals.price);
  const orderNumber = generateOrderNumber();
  const newOrder: OrderInfo = { orderNumber, price };
  orderHistory.push(newOrder);
  await delay(2000);
  return HttpResponse.json(orderHistory, { status: 201 });
};

export const handlers = [http.post("/order", postOrderResolver)];
```

`src/mocks/handlers/index.ts` 에서 작성한 `HttpResolver`를 사용해 API 요청시 실어 보내는 데이터(Query Params, Body-data, 
Form-data 등)을 사용할 수 있다. 또한 기본적으로 `delay` 함수를 제공하기 때문에 따로 정의할 필요 없이 가져다 사용하면 된다. 

#### 4. RESTful & Dynamic API

- src/mocks/handlers/products.ts

```typescript
import { HttpResolver } from "./index";
import { http, HttpResponse } from "msw";
import products from "../db/products";

const getProductsResolver: HttpResolver = () => {
  return HttpResponse.json(products);
};

const postProductResolver: HttpResolver = async ({ request }) => {
  const newPost = await request.json();
  // code...
  return HttpResponse.json({ id: "abc-123" }, { status: 201 });
};

const putProductResolver: HttpResolver = async ({ request, params }) => {
  const { id } = params;
  const updatePost = await request.json();
  // code...
  if (id === "abc-123") {
    return HttpResponse.json("success", { status: 204 });
  } else {
    return HttpResponse.error();
  }
};

const deleteProductResolver: HttpResolver = ({ params }) => {
  const { id } = params;
  if (id === "abc-123") {
    return HttpResponse.json("success", { status: 200 });
  } else {
    return HttpResponse.error();
  }
};

export const handlers = [
  http.get("/products", getProductsResolver),
  http.put("/products/:id", postProductResolver),
  http.delete("/products", deleteProductResolver),
];
```

위와 같이 메서드마다 핸들럴르 생성할 수 있다. 따라서 실제 서버 API 를 생성할 때와 마찬가지로 RESTful 방식을 그대로 Mocking 할 수 있다. 
또한 `/products/:id`와 같이 URL Params 를 구분할 수 있어 Dynamic URL API 도 정의가 가능하다.

#### 5. Static

이것은 공식 문서에 나오는 방법이다.

````javascript
import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/images/:imageId', async ({ params }) => {
    const buffer = await fetch(`/static/images/${params.imageId}`).then(
      (response) => response.arrayBuffer()
    )

    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    })
  }),
]
````

여기서 `fetch`가 요청하는 `/static/images/...`의 경로를 생각해보자. [Browser Integration](#h-2-browser-integration) 을 했기 
때문에 Service Workers 가 fetch 요청을 보내는 것이므로 파일을 찾는 위치는 `public/static/images/...`가 된다.

문제는 `public`은 프론트엔드 앱이 자채적으로 공개 제공하는 파일들을 모아두는 특별한 디렉토리다. 즉, 굳이 Mocking 을 할 필요가 없을 뿐 아니라 
여기에 Mocking 을 위한 파일을 섞어둔다면 해당 파일들이 함께 빌드되는 문제가 발생한다. 우리가 원하는 것은 백엔드 서버의 역할을 대신할 Mock Server 
를 만드는 것이다. 이 문제를 어떻게 홰결할 수 있을까?

<br>

__1 ) Make specific dir to only for MSW__

첫 번째 방법은 공식 문서의 방식을 그대로 사용하기 위해 `public` 하위 특정 디렉토리를 `MSW` 전용으로 사용하는 것이다. 예를 들어 
`public/mocks/*`는 전부 Mocking 을 위한 파일을 모아두는 경로로 사용하고, 이 디렉토리는 빌드 옵션에서 제외시킨다. 그러면 정상적인 
API Mocking 이 가능하다. 하지만 `public`은 프론트엔드 앱이 자신의 서버에서 제공하고자 하는 공개 접근이 허용된 파일을 위치시키는 
디렉토리이기 때문에 자칫 잘못하면 혼란을 야기시킬 수 있다.

<br>

__2 ) Include static files into src/mocks__

두 번째 방법은 다른 모든 코드와 마찬가지로 `src/mocks` 하위에 파일을 위치시키고 상대 경로로 접근해 파일을 제공할 수 있도록 코드를 구현하는 것이다. 
여기서 중요한 것은 일반적으로 webpack 의 옵션 중 리소스 URL 을 난독화 시켜주는 기능을 사용하기 때문에 단순히 `fetch`의 요청 URL 을 상대 
경로로 작성하는 것은 아무런 의미가 없다.

![MSW Tree](/assets/images/posts/2024-06-01-mock-service-worker/msw-tree.png)

```typescript
import appleImage from "../static/images/apple.png"
```

와 같이 코드로 대상 파일을 import 시키고 이것을 이용해 `fetch(appleImage)`와 같이 제공해야 한다는 것이다. 문제는 이미지 하나둘이야 
이런식으로 할 수 있지만 이미지가 많을 경우 일일히 작성해야 할 뿐 아니라, 이미지가 추가될 때마다 import 코드 역시 계속 추가해야한다.

어떻게 하면 이것을 dynamic 하게 만들 수 있을까?

```typescript
const response = await fetch(require(`../static/images/${imageId}`));
// 또는
const response = await fetch((await import(`../static/images/${imageId}`)).default);
```

와 같이 요청하는 것이다. 단, 이때 주의해야 할 것이 

```typescript
// 잘못된 URL
`../static/images/${imageId}`

// 올바른 URL
require(`../static/images/${imageId}`)
// 올바른 URL
(await import(`../static/images/${imageId}`)).default
```

라는 것이다. 이 경우 아무래도 `await import` 보다는 `require`가 가독성이 좋기 때문에 `require`를 사용하도록 하겠다.

- src/mocks/handlers/static.ts

```typescript
import { http, HttpResponse } from "msw";
import { HttpResolver } from "./index";

const getImageResolver: HttpResolver = async ({ params }) => {
  const { imageId } = params;

  const response = await fetch(require(`../static/images/${imageId}`));
  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("Content-Type");

  return HttpResponse.arrayBuffer(buffer, {
    headers: {
      "Content-Type": contentType || "image/jpeg",
    },
  });
};

export const handlers = [http.get("/images/:imageId", getImageResolver)];
```

이런식으로 images, videos, fonts 와 같은 디렉토리를 추가하고 API 를 만들면 된다. 참고로 헤더는 `Content-Type`만 설정하도록 한다. 
Content-Length 와 같은 다른 항목들은 `arrayBuffer`메소드가 자동으로 채워 넣어준다.


<br><br>

---
Reference

1. "Getting Started syntax." mswjs Docs. accessed Jun. 01, 2024, [https://mswjs.io][MSW].

[Postman - Mock servers]:https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mock-an-api/
[MSW]:https://mswjs.io
