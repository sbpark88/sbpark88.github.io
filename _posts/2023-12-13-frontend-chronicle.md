---
layout: post
title: The History of Frontend Development and React Troubleshooting
subtitle: How did React come into existence, and how is it evolving?
categories: javascript
tags: [vanilla js, jquery, backbone, react, angular, vue, svelte, class component, functional component, react hooks, render optimization, middleware]
---

### 1. History 👩‍💻

1. 인터넷 웹서핑의 초창기의 브라우저는 웹 표준이 제대로 정의되지 않아 크로스 브라우징 이슈가 개발의 가장 큰 부분 중 하나였다.
2. jQuery 의 등장으로 크로스 브라우징 이슈를 해결함은 물론, 반복적인 UI 처리 작업을 라이브러리를 통해 처리할 수 있게 되었다.
3. 웹의 특성상 수시로 서버의 데이터를 받아 재렌더링을 해줘야한다. 이를 자동으로 처리하기 위해 Angular.JS 와 Backbone.JS 는 
   `데이터 바인딩`을 도입하고, 재사용을 위해 `컴포넌트 단위 개발`을 도입했다.
4. 양방향 데이터 바인딩으로 인한 브라우저의 자원 소모 및 프레임워크보다 `가벼운 라이브러리`를 목표로 `단방향 데이터 바인`딩이 가능한 
   React 가 생겨났다. 렌더링의 성능 저하가 크니 `Virtual DOM`을 사용해 비교하고 한 번에 렌더링하도록 해 컴포넌트 단위 개발에 
   브라우징 성능을 높였다. 리액트의 영향으로 Angular.JS 는 버전2로 넘어오며 Angular 라는 이름으로 재탄생했고, Angular 의
   프레임워크의 장점과 React 의 장점을 모두 갖는 라이브러리의 개발을 목표로 Vue.JS 가 생겨났다.
5. Svelte 와 같은 라이브러리는 다시 컴퓨팅 성능 상향 평준화로 인해 Virtual DOM 을 쓰는게 오히려 느릴 수 있으며, 길고 복잡한 
   문법들을 최대한 간소화 하고자 하는 목적으로 생겨났다.

<br>

![Npm Trends](/assets/images/posts/2023-12-13-frontend-chronicle/npm-trends-of-frontend-library.png)

하지만 최근 트렌드를 보면 여전히 React 는 압도적인 점유율을 보여줌과 동시에 유일하게 꾸준한 상승을 하고 있음을 알 수 있다. 지금까지, 
그리고 앞으로도 가까운 미래에는 여전히 React 가 승자라는 것을 알 수 있다.



---
Reference
