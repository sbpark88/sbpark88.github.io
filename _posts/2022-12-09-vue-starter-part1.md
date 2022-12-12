---
layout: post
title: Vue.js Starter - Part 1
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vue js, vue.js, vue cli, vue/cli]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 1. Vue.js Characteristics 👩‍💻

#### 1. MVVM Pattern

`Model`-`View`-`ViewModel`을 사용한다.

![MVVM](/assets/images/posts/2022-12-09-vue-starter/mvvm.png)

#### 2. Component

`View`를 여러 개로 쪼개 재사용 할 수 있는 구조로 개발한다.  
`Vue`에서 하나의 컴포넌트는 `HTML` + `CSS` + `JavaScript`로 이루어져있다.

---

### 2. Vue CLI 👩‍💻

#### 1. npm install

- local installation

```shell
npm install [library]
```

- global installation

```shell
npm install -g [library]
```

<br>

- `package.json` > `dependencies`에 패키지 정조를 등록하며 설치

```shell
npm install --save [library]
```

- `package.json` > `devDependencies`에 패키지 정조를 등록하며 설치

```shell
npm install --save-dev [library]
```

<br>

> `install`은 `i`로, `--save`는 `-S`로, `--save-dev`는 `-D`로 축약 가능하다

```shell
npm i -S [library]
npm i -D [library]
```

<br>

> 가급적 vue, vue/cli 는 global 로 설치하자
> 
> ```shell
> npm install -g vue@3.2.45 @vue/cli
> ```

#### 2. Create App

`JavaScript`의 `npm init`, `TypeScript`의 `tsc --init`, 
`Angular`의 `ng new [App Name]`처럼 `Vue`는 `vue create [App Name]`을 
이용해 프로젝트를 생성할 수 있다.

```shell
vue create [App Name]
```

#### 3. Run App

```shell
cd [App Name]
run npm serve -- --port [Port Number]
```

> `run npm serve --port [Port Number]` 같지만 
> `run npm serve -- --port [Port Number]`다.

#### 4. Vue Project Structures

- `App.vue`: Root Component
- main.js: 가장 먼저 실행되는 `JavaScript` 파일로 `Vue` instance 를 생성하는 역할
- node_modules: npm 으로 설치된 패키지 파일들이 모여 있는 디렉토리
- package.json: 프로젝트에 필요한 package 를 정의하고 관리
- package-lock.json: 설치된 package 의 dependency 정보를 관리
- public: webpack 을 통해 관리되지 않는 static resources 가 모여 있는 디렉토리
- src/assets: images, css, fonts 등을 관리하는 디렉토리
- src/components: Vue Components 파일이 모여 있는 디렉토리

#### 5. package.json

- name: 프로젝트 이름
- version: 프로젝트 버전 정보
- private: `true`로 설정하면 프로젝트를 `npm`으로 올릴 수 없어 `npm`에 올려도 배포가 안 된다.
- scripts: 프로젝트 실행과 관련된 명령어를 등록
- dependencies: 배포용 패키지 정보
- devDependencies: 개발용 패키지 정보
- eslintConfig: `ESLint` 설정
- browserlist: default 로 전 세계 상위 1% 이상 사용 & 최신 버전 2개까지 지원하도록 설정

#### 6. Create App Manually

`vue create [App Name]`을 한 후 `Manually select features`를 선택한다.

![Manually select features](/assets/images/posts/2022-12-09-vue-starter/vue-project-manually01.png)

<br>

![Manually Options](/assets/images/posts/2022-12-09-vue-starter/vue-project-manually02.png)

- Babel: ES5 이하 버전 호환으로 Transpile
- TypeScript
- Progressive Web App (PWA) Support: 웹 앱 개발용
- Router
- Vuex: `Vue`의 상태 관리를 위한 패키지
- CSS Pre-processors: `Sass`, `Less`, `Stylus` 등 `CSS` 작성을 위한 `CSS` 전처리기
- Linter / Formatter: `JavaScript` Coding Convention (Standard Guide)
- Unit Testing: `Mocha` 등 단위 테스트를 위한 라이브러리
- E2E Testing: `End-to-End` 통합 테스트를 위한 플러그인

예제에서는 `Babel`, `Router`, `Vuex`, `Linter / Formatter`를 선택했다.  

- `Vue` 버전은 `3`
- `Router history mode`는 `Y`
- `Eslint`는 `ESLint + Standard config`, `Lint on save`, `In package.json`

을 차례로 선택한다.

그리고 마지막으로 해당 설정을 `preset`으로 저장할 것인지 묻는다. 저장을 원하면 이름을 지정 후 
저장하면 다음부터 아래와 같이 프로젝트를 생성할 수 있다.

`preset` 이름을 `vue basic`으로 저장한 경우 다음과 같이 `vue create [App Name]`시 확인 가능하다.

![Vue preset](/assets/images/posts/2022-12-09-vue-starter/vue-project-manually03.png)

#### 7. Vue Project Manager

`Vue Project Manager`는 `vue ui` 명령어를 통해 실행한다.

![Vue Project Manager](/assets/images/posts/2022-12-09-vue-starter/vue-ui.png)

<br>

웹 페이지를 통해 프로젝트를 생성하고 관리할 수 있다.

![Create Vue App Using Project Manager](/assets/images/posts/2022-12-09-vue-starter/create-vue-using-project-manager.png)

> `Vue Project Manager`로 생성하지 않고 `Vue CLI`로만 생성한 프로젝트는 프로젝트 리스트에 보이지 않는다. 
> `가져오기`를 통해 매니저에 등록 후 확인 가능하다.

<br><br>

---
Reference

1. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 1
2. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 2
