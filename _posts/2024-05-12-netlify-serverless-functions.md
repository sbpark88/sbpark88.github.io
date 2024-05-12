---
layout: post
title: Netlify Serverless Functions
subtitle: Short book about the Netlify Functions
excerpt_image: /assets/images/posts/2024-05-12-netlify-serverless-functions/excerpt_image.png
categories: [javascript, typescript]
tags: [netlify, serverless functions, netlify functions]
---

### 1. Quick Start 👩‍💻

#### 1. Install Netlify CLI

기본 개념은 [Vercel Serverless Functions](/javascript/2024/05/04/vercel-serverless-functions.html) 를 
참고하도록 하고 바로 함수를 만들어보자.

```shell
npm i -D netlify-cli
```

그리고 TypeScript 환경일 경우 다음을 추가로 설치한다([Get started with functions](https://docs.netlify.com/functions/get-started/?fn-language=ts) 을 참고).

```shell
npm i @netlify/functions
```

Vercel 이 root 경로에 `api`라는 디렉토리를 생성하고 하위 경로에 `js` 또는 `ts` 파일을 만들었듯이 Netlify 역시 
root 경로에 `netlify/functions`라는 디렉토리를 생성하고 하위 경로에 `mjs`, `mts` 파일을 만드는 것으로 시작한다
(이 부분은 [Module format](https://docs.netlify.com/functions/get-started/#module-format) 에 설명되어 
있으니 참고하도록 한다).

이때 파일명의 규칙이 존재하는데 다음과 같다.

- subdirectory 가 없을 경우: `netlify/functions/hello.mts`
- subdirectory 가 있을 경우: `netlify/functions/hello/hello.mts` 또는 `netlify/functions/hello/index.mts`

subdirectory 가 있을 경우 파일명은 반드시 `subdirectory 와 동일`하거나 `index`로 작성되어야한다.

- package.json

```json
{
  "scripts": {
    "netlify": "netlify dev"
  }
}
```

Vercel 과 달리 `netlify.json` 파일을 만들지 않아도 `npm run netlify`를 실행하면 자동으로 리액트를 띄워준다.

Netlify 에도 `config.json` 파일이 존재한다.

- macOS: Library/Preferences/netlify/config.json
- Linux: .config/netlify/config.json
- Windows: AppData\Roaming\netlify\Config\config.json

에 저장되며 `netlify init` 또는 `netlify login` 명령어를 통한 로그인 정보를 저장하는 데 사용된다.

#### 2. Create API Functions

Vercel 과 동일하게 `/api/user`와 `/api/user/uuid005435`를 샘플로 만들어보도록 하자. Netlify 는
Prefix 로 `/api`가 아닌 `/.netlify/functions`를 사용하며, Vercel 과 달리 웹앱과 다른 포트에서 실행된다는
것에 유의해야한다.

- /netlify/functions/user.mts

```javascript
import { Context } from "@netlify/functions";

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RESPONSE_INIT = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  status: 200,
};

export default function handler(request: Request, context: Context) {
  const method = ALLOWED_METHODS.find((method) => method === request.method);
  if (method === undefined) return;
  return user[method](request, context);
}

const user: Record<string, Function> = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request: Request, context: Context): Response {
  return new Response(
    JSON.stringify({ name: "Hogwarts", age: 32, favorite: ["Movie", "Music", "Book", "Beer"] }),
    RESPONSE_INIT,
  );
}

function postUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function putUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function patchUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}

function deleteUser(request: Request, context: Context): Response {
  return new Response(JSON.stringify({}), RESPONSE_INIT);
}
```

`npm run netlify`명령을 입력하면 위에 작성한 Netlify 명령어가 실행된다.

![Netlify Server](/assets/images/posts/2024-05-12-netlify-serverless-functions/netlify-server.png)

3000번 포트에서 리액트가 실행되고, Netlify 는 8888번 포트에서 실행되어 서로 다른 포트에서 작동하는 것을 알 수 있다.

`http://localhost:8888/.netlify/functions/user` 에 요청을 보내면 결과로 Status Code 200 과 다음 JSON 데이터를 
얻을 수 있다.

```json
{
  "name": "Hogwarts",
  "age": 32,
  "favorite": [ "Movie", "Music", "Book", "Beer" ]
}
```

#### 3. Dynamic Routes

Vercel 과 마찬가지로 동적 라우팅이 가능하다. 하지만 Vercel 이 Next.js 와 마찬가지로 디렉토리 구조와 `[urlParam].ts`와 같은 
방식으로 파일을 생성해 구분하는 것과 달리 디렉토리 구조를 사용한 동적 라우팅은 불가능하다. 대신 Netlify 가 제공하는 `Config`를 설정해 
라우팅을 시킬 수 있다.

```typescript
import { Config, Context } from "@netlify/functions";

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RESPONSE_INIT = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  status: 200,
};

export default function handler(request: Request, context: Context) {
  const method = ALLOWED_METHODS.find((method) => method === request.method);
  if (method === undefined) return;
  return index[method](request, context);
}

const index: Record<string, Function> = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request: Request, context: Context): Response {
  return new Response(
      JSON.stringify({ name: "Hogwarts", age: 32, favorite: ["Movie", "Music", "Book", "Beer"] }),
      RESPONSE_INIT,
  );
}

// ...

export const config: Config = {
  path: ["/user"],
};
```

와 같이 설정하면 이제 요청 URL 은 `http://localhost:8888/.netlify/functions/user` 가 아닌   
`http://localhost:8888/user` 가 된다.

<br>

이제 `Config`를 사용해 동적 라우팅을 시작해보자.

![Dynamic Routes](/assets/images/posts/2024-05-12-netlify-serverless-functions/dynamic-routes.png)

위와 같이 디렉토리를 구분하지 않고 생성한 이유는 다음과 같다.

- functions 하위 subdirectory 깊이를 1까지만 찾는다.
- subdirectory 가 존재할 경우, 그 안에 위치한 파일은 subdirectory 와 동일하거나 index 인 파일만 찾는다.

따라서 디렉토리 구조를 활용한 라우팅 뿐 아니라 파일 정리 자체가 불가능하기 때문에 위와 같이 `-` 또는 `_`를 사용해 구분하였다.

- /netlify/functions/user-id.mts

```typescript
import { Config, Context } from "@netlify/functions";

const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RESPONSE_INIT = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  status: 200,
};

export default function handler(request: Request, context: Context) {
  const method = ALLOWED_METHODS.find((method) => method === request.method);
  if (method === undefined) return;
  return user[method](request, context);
}

const user: Record<string, Function> = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request: Request, context: Context): Response {
  const { id } = context.params;
  return new Response(JSON.stringify({ message: `${id} 사용자 정보에 대한 요청` }), RESPONSE_INIT);
}

// ...

export const config: Config = {
  path: ["/user/:id"],
};
```

<br>

이제 API 요청은 다음과 같이 URL Parameters 를 구분할 수 있게 된다.

- GET `/user/` 요청에 대한 응답

```json
{
  "name": "Hogwarts",
  "age": 32,
  "favorite": [ "Movie", "Music", "Book", "Beer" ]
}
```

- GET `/api/user/uuid005435` 요청에 대한 응답

```json
{
    "message": "uuid005435 사용자 정보에 대한 요청"
}
```


<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "Configuring Projects with vercel.json." Vercel. Feb. 21, 2023, accessed May. 04, 2024, [Vercel - Project Configuration].

[Vercel - Project Configuration]:https://vercel.com/docs/projects/project-configuration
[Vercel Functions Quickstart]:https://vercel.com/docs/functions/quickstart
[Token]:/javascript/2024/04/18/cookie-session-token-storage.html#h-3-token-
[Serverless]:/cloud/2023/02/08/on-premise-and-cloud-service.html#h-2-serverless
