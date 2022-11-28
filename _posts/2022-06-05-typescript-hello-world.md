---
layout: post
title: TypeScript 시작하기 (with Node.js)
subtitle: Hello world! TypeScript!!
categories: javascript
tags: [javascript, typescript]
---

### 1. node 설치하기

```shell
brew install node

node -v
npm -v
```

### 2. node 환경 구성하기

#### 1. 디렉토리 생성하기
node 디렉토리로 사용할 경로를 만들어야한다.  
이 때 주의할 점은 `url friendly`하게 경로를 생성한다.

>  `non-case-sensitive`, `non-space` 를 의미한다. 즉, 카멜 케이스 같은 것은 사용하지 말 것.

#### 2. 필요 모듈 설치하기
```shell
npm install typescript ts-node @types/node
```

typescript : 웹 브라우저는 TypeScript 를 직접 읽을 수 없다. 따라서 TypeScript 를 JavaScript 로 transpile 을 해줘야한다.  

ts-node : tsc & node 명령을 한 번에 수행한다.  

@types/node : Node.js를 위한 type definitions 를 포함하는 library 다. 만약 설치하지 않을 경우 TypeScript `require`라는 함수가 없다며 에러로 인식하기 때문에 다음과 같이 코드를 작성해야한다.
```typescript
// @ts-ignore
const express = require('express');
const app = express();
// @ts-ignore
const http = require('http');
const server = http.createServer(app).listen(80);
```
하지만 `@types/node`를 설치하면 이런 수고를 덜게 해준다.

> npm 은 -g 옵션을 주고 글로벌로 설치하는 것과, 해당 디렉토리에 로컬 설치하는 것을 따로 관리한다.
>
> 즉, npm install -g로 설치한 것은 npm list -g로 확인할 수 있고, npm uninstall -g로 지워야한다.
>
> 참고로 npm list 를 사용할 때는 --depth=0, 1, ...옵션을 주어 내려가는 깊이를 조절할 수 있다. i.e. npm list -g --depth=0

#### 3. npm init & tsc init
```shell
npm init
```
package name, version, description, git repo, author, license 를 지정한다.  
git repo 는 나중에 추가해도 된다.

```shell
tsc init
```

`WebStrom` 기준으로 `Run/Debug Configurations`에서 Node.js 환경 설정에 다음을 추가한다.

![webstorm typescript configuration](/assets/images/posts/2022-06-05-typescript-hello-world/webstorm-typescript-configuration.png)


### 3. TypeScript 테스트

TypeScript 코드가 JavaScript 코드로 transpile 되는지 확인하자.

우선 `index.ts` 파일을 하나 만들어준다.

```typescript
const hello: (name: string) => void = name => console.log(`Hello ${name}`);

hello("TypeScript");

```
위와 같이 저장 후 터미널에서 바로 실행해보자.
```shell
node index.ts
```
TypeScript 문법을 인식하지 못 해 오류가 발생한다.

아까 설치한 transpiler 를 이용해 JavaScript 로 바꿔보자.
```shell
tsc index.ts
```

`index.js` 파일이 생기고 다음과 같이 코드가 변경되어 있을 것이다.
```javascript
var hello = function (name) { return console.log("Hello ".concat(name)); };
hello("TypeScript");

```
위 `index.js`를 실행해보자.
```shell
node index.js
```
드디어 `Hello TypeScript`가 출력된다. 😄😄

다시 `index.js`를 삭제해보자.

그리고 위에서 설치한 `ts-node`를 사용해보자.
```shell
ts-node index.ts
```
`Hello TypeScript`가 바로 출력된다. 그리고 디렉토리를 확인해보면 `index.js`가 생성된 것을 확인할 수 있다.

![web storm run and debug buttons](/assets/images/posts/2022-06-05-typescript-hello-world/webstorm-run-debug-buttons.png)

> 그렇다면 다시 `index.ts`를 삭제하고 `WebStor`m의 `Run`, `Debug`를 통해 실행해보자.  
> 여기까지 잘 작동된다면 기본 설정은 마친 것이다.