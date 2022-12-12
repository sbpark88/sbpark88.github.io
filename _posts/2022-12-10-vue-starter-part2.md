---
layout: post
title: Vue.js Starter - Part 2
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vuej s, vue.js, router, vue router, component, vue component]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 3. Vue Router 👩‍💻

#### 1. Installation

`vue create`를 통해 프로젝트 생성할 때 `Router`를 프로젝트에 설정하지 않았다면 다음 명령어를 통해 설치한다.

```shell
vue add router
```

`@vue/cli-plugin-router`가 설치되며, src 아래 `router`, `view` 디렉토리 및 파일이 생성된다.

#### 2. Run App with Vue Router

__1 ) main.js__

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

```

- `node_modules`에서 `vue` 라이브러리로부터 `createApp`을 가져온다.
- `./App.vue`를 `App`으로 가져온다(자동으로 default export 가 적용된다).
- `./router/index.js`를 `router`로 가져온다.  
  (파일명이 index 일 경우는 생략 가능하므로 './router' 로 적을 수 있다.  
  `index.js` 파일을 보면 알 수 있듯이 `export default router` 를 하고 있기 때문에 `import { router }`로 적지 않고 `{ }`로 적는다).

> `index.html` document 를 받은 후 앱이 `Vue`를 통해 시작되는 `Entry Point`다.

<br>

__2 ) App.vue__

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
```

- <router-link to=""></router-link>" : `Vue`에 의해 `<a href=""></a>` HTML 이 자동 생성된다.
- <router-view/> : 라우터에 의해 매칭된 컴포넌트가 이 곳에 렌더링 된다. 


<br>

__3 ) index.js__
 
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```

- `node_modules`에서 `vue-router` 라이브러리로부터 `createRouter`를 가져온다(`createWebHistory`는 optional).
- 라우터를 생성한고, 이 라우터를 `default`로 `export`한다.

<br>

`routes` Object 는 다음과 같이 구성된다.

- path : 라우터의 `endopoint`
- name : 라우터의 이름
- component : `Vue` 컴포넌트  
  (`component: HomeView`처럼 `import HomeView from '../views/HomeView.vue'`를 분리할 수도 있고,  
   `component: () => import('../views/AboutView.vue')`와 같이 클로저를 이용할 수도 있다.)

#### 3. Lazy Load

`Vue CLI 3`부터 `prefetch` 기능이 추가되어 컴포넌트를 미리 로딩할지, `Lazy` 로딩할지를 구분할 수 있다. 기본값은 `true`로 
별도로 지정하지 않으면 `prefetch`로 작동된다.

`prefetch`를 적용하면, 최초 앱 로딩 후 빠른 속도를 기대할 수 있는 반면 초기 로딩이 느려진다. 따라서 `prefetch`를 적용할 곳과 
적용하지 않을 곳을 구별해 초기 로딩 속도를 빠르게 하면서, 일부 무거운 컴포넌트를 적절히 분리하는 것이 필요하다.

다음 두 가지 방법을 사용할 수 있다.

__1 ) prefetch true__

`prefetch`는 별도로 끄지 않으면 `Vue CLI 3`에서는 기본값으로 `true`를 갖는다.  
따라서, `Lazy` 로딩이 필요한 컴포넌트 `import`에 `/* webpackChunkName: "about" */` 코멘트를 추가해 별도의 파일로 빌드할 
수 있다. 이것을 `chunk`를 만든다고 하며, 이 경우 `about.js`라는 파일을 분리 빌드한다.

```vue
const Home = () => import(/* webpackChunkName: "home" */ './Home.vue');
const About = () => import(/* webpackChunkName: "about" */ './About.vue');
const Contact = () => import(/* webpackChunkName: "contact" */ './Contact.vue');
```

<br>

__2 ) prefetch false__

기본적으로 `prefetch`를 꺼 모든 컴포넌트를 기본적으로 `Lazy` 로딩되도록 한 후, `prefetch`가 필요한 곳을 명시할 수 있다. 
위 방법과 정 반대 되는 방법으로 우선 `vue.config.js`에서 `prefetch`를 끄도록 한다.

```javascript
module.exports = {
    chainWebpack: config => {
        config.plugin.delete('prefetch');
    }
}
```

그리고 `prefetch`가 필요한 컴포넌트 `import`에 `/* webpackPrefetch: true */` 코멘트를 추가한다.

```vue
{
    path: '/about',
    name: 'about',
    component: () => import(/* webpackPrefetch: true */ '../views/AboutView.vue')
  }
```

---

### 4.  👩‍💻

---

### 5.  👩‍💻

<br><br>

---
Reference

1. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 3
2. 고승원, [Vue.js 프로젝트 투입 일주일 전], 비제이퍼블릭, Chapter 4
