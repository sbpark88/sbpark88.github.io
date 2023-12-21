---
layout: post
title: TypeScript Essentials 
subtitle: 
categories: [typescript, javascript]
tags: [typescript]
---

### 1. TSC Transpiler 👩‍💻

*JavaScript* 는 *Interpreter Language* 이다. 그리고 이것을 확장한 *TypeScript* 는 웹 브라우저가 
*JavaScript* 만 이해할 수 있기 때문에 변환을 해야하는데 이 과정을 *Transpile* 이라 한다.

*Compile Language* 가 아니기 때문에 *Transpile* 이라고 구분짓기도 하고, 다른 컴파일 언어와 마찬가지로 
*Runtime* 이전에 오류를 찾아낼 수 있기 때문에 *Compile* 이라 부르는 경우도 존재한다. 아무튼 이때 사용되는 
것이 바로 `TSC`다.

*TypeScript* 는 *Global* 로 설치하거나 *Local* 로 설치할 수 있다. *Global* 로 설치했을때와 다르게 
*Local* 로 설치했을 경우 경로를 지정해줘야하며 다음 둘 중 하나를 이용해 실행할 수 있다.

```shell
./node_modules/.bin/tsc --init
```

```shell
./node_modules/typescript/bin/tsc --init
```

<br>

그 외에도 `npx`를 사용하거나

```shell
npx tsc
```

`package.json`파일을 사용해할 수 있는데, 이때는 **NPM Project** 로 만들었기 때문에`tsc`라고만 쳐도 
*Local* 로 설치한 패키지 라이브러리를 인식할 수 있다.

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```



---
Reference

1. 이웅재, "한 번에 끝내는 React의 모든 것 초격차 패키지, Part 6. TypeScript Essentials" fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)
