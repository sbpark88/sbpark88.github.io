---
layout: post
title: Vercel Serverless Functions
subtitle: Short book about the Vercel Functions
excerpt_image: /assets/images/posts/2024-05-04-vercel-serverless-functions/edge-middleware.webp
categories: [javascript]
tags: [vercel, serverless functions, vercel functions, edge middleware, edge network]
---

### 1. Concept 👩‍💻

![Edge Middleware](/assets/images/posts/2024-05-04-vercel-serverless-functions/edge-middleware.webp)

Serverless Functions 는 위 그림과 같이 Middleware 를 통해 실행된다. Proxy 서버가 Middleware 기능을 해서 통신을 중개하는 
역할을 하는데 사용되듯이 Edge Middleware 역시 통신을 중개한다.

하지만 둘은 분명한 차이점이 존재한다. Proxy 는 App Layer 에서 작동한다는 것만 제외하면 VPN 과 마찬가지로 클라이언트와 서버 사이에 
Middleware 로 위치해 직접 양방향으로 통신을 한다. 하지만 Serverless Functions 를 사용하기 위한 Edge Middleware 는 
클라우드 환경에서 실행되는 작은 코드조각으로 특정 이벤트가 발생할 때 필요한 리소스만 사용해 작동한다.

Serverless Functions 를 왜 사용하는가에 대해서는 클라우드 측 설명은 서버를 구축하고 관리, 확장하는 것과 같은 것이 필요하지 않아 
개발자는 코드를 작성하고 배포하는 데 집중할 수 있게 해준다고 한다.

또한 독립적으로 실행되기 때문에 함수의 오류가 앱 전체에 영향을 주지 않으며, 사용한 만큼의 비용만 지불하기 때문에 직접 서버를 구축해 
항상 운영하는 것보다 저렴하다고한다.

하지만 이것은 어디까지나 클라우드 서비스를 사용해 프론트엔드를 서버를 운영하는 것을 기준으로 한 설명이다. 
<span style="color: red;">Serverless Functions 가 필요한 궁극적인 이유</span>는 API Key 와 같은 
<span style="color: red;">보안 정보를 노출하지 않기 위함</span>이 더욱 크다.

백엔드 중심의 웹 환경에서는 백엔드가 API 요청은 물론이고, 화면을 만드는 렌더링 작업까지 모두 백엔드 서버에서 했다. 이 경우 클라이언트는 
자신의 인증 정보만 보관하다 서버에 요청을 보내면 서버가 검증 후 모든 요청건을 처리하기 때문에 API Key 가 노출될 필요가 없었다. 
문제는 <span style="color: red;">프론트엔드가 단순 Document 가 아닌 앱으로 작동하기 시작</span>하면서부터다. 프론트엔드가 
중심이 되는 경우, 클라이언트의 브라우저 상에서 하나의 앱이 돌아가고 있는 것이나 마찬가지이기 때문에 모든 비즈니스 로직이 클라이언트에 
전송된다. 이 말은 클라이언트가 어떤 요청을 하기 위해 API Key 를 가지고 있어야한다는 말이다.

만약 이것을 노출하지 않기 위해서는 외버 서버를 포함해 클라이언트가 요청하는 모든 서버가 내 인증 정보를 가지고 있어야 한다는 의미가 된다. 
물론, 한 회사가 제공하는 여러 서비스라면 [Token] 을 사용하면 가능은 하다. 이를 위해서는 반드시 API 백엔드 서버와 프론트엔드 서버의 
분리개발 운영이 필요하며, 외부 서버에 요청을 클라이언트가 직접 할 수 없고 백엔드가 개발을 해줘 백엔드 서버를 Middleware 로 사용해 
통신해야한다는 것이다.

클라이언트 성능이 좋아져 백엔드 서버의 부담을 분산시키고자 프론트엔드 개발이 생겨났는데 결국 과거에 발이 묶이는 꼴이 되는 것이다.
프론트엔드 개발에서 [Serverless] 는 프론트엔드 개발자가 백엔드에 종속되지 않고 API 요청 처리를 할 수 있도록 클라우드가 제공하는 
간편한 백엔드 클라우드 서비스를 사용해 API Key 를 감추는 것이 가장 핵심이 된다.

즉, 내가 직접 백엔드 API 를 구축해 Middleware 로 사용하는 대신, <span style="color: red;">클라우드가 제공하는 
Middleware 를 리소스 비용만 내고 저렴하게 사용하게 해줄게, 대신 내가 정의한 규칙대로 너가 사용할 함수만 만들어</span>가 
Serverless Functions 의 핵심이다.

---

### 2. Quick Start 👩‍💻

#### 1. Install Vercel CLI

```shell
npm i -D vercel@latest
# or
yarn add vercel@latest
```

자세한 설정 환경은 [Vercel Functions Quickstart] 페이지를 참고한다.

- package.json

```json
{
  "scripts": {
    "vercel": "vercel dev"
  }
}
```

그리고 root 경로에 `vercel.json`파일을 생성한다.

```json
{
  "devCommand": "npm run dev",
  "buildCommand": "npm run build"
}
```

`yarn`을 사용할 경우 위 명령어는 `npm`이 아닌 `yarn`을 사용한다.

#### 2. Create API Functions

root 경로에 `api`라는 디렉토리를 생성하고, 함수를 작성해야하는데 함수는 `MSW`와 유사하게 작성하면 된다.

- /api/user.js

```javascript
export default function handler(request, response) {
  user[request.method](request, response);
}

const user = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request, response) {
  return response.status(200).json({
    name: "Hogwarts",
    age: 32,
    favorite: ["Movie", "Music", "Book", "Beer"],
  });
}

function postUser(request, response) {
  return response.status(200).json({});
}

function putUser(request, response) {
  return response.status(200).json({});
}

function patchUser(request, response) {
  return response.status(200).json({});
}

function deleteUser(request, response) {
  return response.status(200).json({});
}

```

`npm run vercel`명령을 입력하면 위에 작성한 Vercel 명령어가 실행된다. Vercel 에 로그인 후 프로젝트 설정이 나올 때 설명을 읽고 
적절히 Y/N 을 설택해주면 된다. 대부분의 경우 선택해야 할 것으로 판단되는 것이 대문자로 표기(Y/n 이면 Y 를 선택할 것으로 예상, 
y/N 이면 N 을 선택할 것으로 예상하고 터미널 메시지가 출력)되니 참고하면 된다.

Vercel 을 사용해 서버가 실행돠면 위 경로에 API 요청을 보내보자. 혹시라도 Hash Router 를 사용하고 있다면 `#`는 지워야 한다. 라우팅 
JavaScript 로 작성한 기능을 사용하는 것이 아니고 위에서 작성한 함수는 또 다른 Middleware Server 로 작동하는 것이라 보면 되기 때문이다. 
즉, express 를 사용한 Node 서버를 띄우거나 MSW 를 사용해 HTTP API 요청에 응답하는 서버를 사용하는 것과 같다고 보면 된다. 이것이 가능한 
이유가 Vercel 을 설치하면 dependencies 로 `https-proxy-agent`, `make-dir`, `node-fetch`와 같은 것들이 함께 설치되기 때문이다.

이제 `npm run vercel`로 서버를 띄운 다음 아래 주소로 GET 요청을 보내보자.

`http://localhost:3000/api/user`

Postman 을 사용해도 좋고, 터미널로 Curl, Wget 등을 사용해도 좋다. 아니면 프론트엔드 서버에서 바로 fetch 요청을 날려보는 것도 좋다. 
우리는 결과로 Status Code 200 과 다음 JSON 데이터를 얻을 수 있다.

```json
{
  "name": "Hogwarts",
  "age": 32,
  "favorite": [ "Movie", "Music", "Book", "Beer" ]
}
```

<br>

다시 말해, 프론트엔드 코드에서 `/api/user` 경로로 요청을 보내면 Vercel 이 띄운 Middleware Server 가 HTTP API 요청을 처리하는 
것이다.

```javascript
;(async () => {
  const response = await fetch("/api/user");
  const data = await response.json();
  console.table(data);
})();
```

<br>

프론트엔드 서버를 띄운다는 것은 프론트엔드를 서비스하기 위한 HTML, CSS, JavaScript 를 호스팅하는 서버를 띄우는 것을 의미한다. 
위와 같은 API 요청을 하려면 API 요청 처리가 가능한 백엔드 서버가 필요하다.

```javascript
import express from "express";
import router from "./router/index";
import * as ejs from "ejs";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Playground app listening at http://localhost:${port}`)
})

app.use(express.static("public"));
app.use(express.static("router"));
app.use("/scripts", express.static("node_modules"));
app.use("/js", express.static("dist"));
app.disable("etag");
app.set("views", "/views");
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
app.use(router);
```

```javascript
import express, {response} from "express";
import * as path from "path";

const router = express.Router();
const __dirname = path.resolve();

export default router;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"))
})

router.get("/product/vegetable", (req, res) => {
  res.render(path.join(__dirname, "views", "product/vegetable.ejs"))
})

router.get("/join", (req, res) => {
  res.render(path.join(__dirname, "views", "user/join.ejs"))
})

router.get("/promotion", (req, res) => {
  const { type } = req
  const promotion = // Request data to database...
  res.json(promotion)
})
```

이런식으로 백엔드 서버를 직접 띄워야하는데 Vercel 을 설치하면 `MSW`를 사용하듯 단순하게 경로를 생성하고 필요한 함수만 만들면 
나머지 서버 구축을 사용자가 직접 하지 않아도 되기 때문에 <span style="color: red;">Serverless Functions</span> 라 하는 
것이다. 서버가 없어서가 아니고 서버를 직접 만들지 않기 때문에 <span style="color: red;">Serverless</span> 라는 것에 유의해야한다.

#### 3. Dynamic Routes

Next.js 와 마찬가지로 동적 라우팅이 가능하다.

![dynamic routes](/assets/images/posts/2024-05-04-vercel-serverless-functions/dynamic-routes.png)

와 같은 구조로 디렉토리와 파일을 생성하면 

`/api/user`와 `/api/user/uuid005435`를 구분할 수 있다. `uuid005435`를 URL Parameters 로 사용하는 시스템이 되는 것이다. 
이때 전달된 URL 파라미터는 `request.query`로부터 꺼낼 수 있는데, `[id]`가 파라미터 이름이 되어 `{id: value}` 형태로 담겨있다.

```javascript
export default function handler(request, response) {
  user[request.method](request, response);
}

const user = {
  GET: getUser,
  POST: postUser,
  PUT: putUser,
  PATCH: patchUser,
  DELETE: deleteUser,
};

function getUser(request, response) {
  const { id } = request.query;
  return response.status(200).json({
    message: `${id} 사용자 정보에 대한 요청`,
  });
}

//...
```

따라서 API 요청은 다음과 같이 URL Parameters 를 구분할 수 있게 된다.

- GET `/api/user/` 요청에 대한 응답

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

> 물론, URL Parameters 를 추출할 때는 `request.query`에서 추출하지만, Body 에 실려 보낸 정보는 `request.body`로부터 
> 추출한다.



<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "Configuring Projects with vercel.json." Vercel. Feb. 21, 2023, accessed May. 04, 2024, [Vercel - Project Configuration].

[Vercel - Project Configuration]:https://vercel.com/docs/projects/project-configuration
[Vercel Functions Quickstart]:https://vercel.com/docs/functions/quickstart
[Token]:/javascript/2024/04/18/cookie-session-token-storage.html#h-3-token-
[Serverless]:/cloud/2023/02/08/on-premise-and-cloud-service.html#h-2-serverless
