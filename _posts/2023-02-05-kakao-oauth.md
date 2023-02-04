---
layout: post
title: Kakao OAuth 2.0 
subtitle: Get authorization, token, and access information.
categories: javascript
tags: [javascript, vue, kakao oauth, kakao token]
---

### 1. 카카오 OAuth 2.0 삽을 들자  👩‍💻

대체 삽질은 뭐라고 번역 해야 할지 모르겠다. 튜토리얼이나 도큐먼트, 정의나 개념을 정리한 것도 아닌 단순 카카오 OAuth 2.0 테스트를 
하면서 삽질을 많이 해서 올려본다. Vue 에서 하고 있기 때문에 Vue 에서 다른 사람들이 OAuth 테스트 한 것을 봤는데 딱히 참고할만한 레퍼런스도 
잘 안 나오고, 무엇보다 방식이 다 제각각이었다. 무엇보다 인상깊던건 포스팅 올린 분들의 공식 문서가 불친절하다는 것과 따라해봤는데 안 된다는 
댓글들... 아마 나 말고도 삽을 드는 분들이 많을 것 같아 내 삽질 후기가 도움이 되었으면 한다.

#### 1. 첫 번째 삽을 들자

`Vue.js 프로젝트 투입 일주일 전` 마지막에 나온 카카오 로그인을 해보는데 구버전으로 되어있었고, 너무 생략이 많이 되어 도저히 진행이 되지 
않았다. 🫠🫠🫠

#### 2. 두 번째 삽을 들자

공식 도큐먼트를 방문했다. [카카오 로그인 JS SDK 데모 샘플](https://developers.kakao.com/tool/demo/login/login)
를 보고 "아~ 이런거구나" 하고 참고했다. **카카오 로그인 해서 인가를 받으면 쿠키에 저장 되고**, **그 다음 *access-token* 을 
요청**하면 되는거구나. 라고 생각해서 이걸 보고 따라했다. 인가 받고 `302` 리다이렉트도 잘 되는데 도무지 쿠키에 저장이 안 된다. 
혹시 Vue 가 막아버리나 싶어 `vue-cookies` 라이브러리까지 설치해봤다. 

될리가 없다... 😡😡😡

#### 3. 세 번째 삽을 들자

그냥 도큐먼트의 *JavaScript* 를 보고 따라해보기로 했다. 실제로 쿠키에 저장되는게 아니고 리다이렉트 된 페이지에 *Query Parameters* 
로 들어온다는 것을 확인했다 😄. 자 이제 *access-token* 을 받아보자.

`Bad Request`가 떨어진다. 🙁🙁🙁

#### 4. 네 번째 삽을 들자

공식 포럼에 가봤다. 동일 문제 발생한 분들의 질문과 답변이 있었다. 문제를 해결하는 과정에서 알게되었지만... 별로 도움이 안 되었다. 오히려 
그 답을 철저히 참고했다면 삽이 몇 개는 늘어날 뻔 했다... 🤣🤣🤣

대부분 내가 한 살집에 대한 정확한 답은 [카카오 에러 코드][Kakao OAuth Error-code] 찾을 수 있었다. 
`카카오 로그인 인가 후 리다이렉트 주소`와 `access-token 획득 후 리다이렉트 주소`가 동일해야한만했다.

#### 5. 다섯 번째 삽을 들자

두 요청의 리다이렉트 주소를 동일하게 했다. 여전히 리다이렉트 주소가 문제라고 한다. 카카오 로그인 JavaScript 문서에서 인가는 JS SDK 를 
이용하도록 안내되어있으나 토큰을 받을 때는 REST API 를 이용하도록 안내가 되어있다.

![Kakao OAuth JavaScript](/assets/images/posts/2023-02-05-kakao-oauth/kakao-get-token-javascript.png){: width="800"}

![Kakao OAuth REST API](/assets/images/posts/2023-02-05-kakao-oauth/kakao-get-token-rest-api.png){: width="800"}

그래서 REST API 문서를 보고 따라했는데 너무 열심히 따라한게 문제였다. 😓😓😓

리다이렉트 주소를 `URL Encode` 하라길래 `encodeURIComponent()` 메서드까지 호출해서 열심히 따라했는데 이게 문제였던 것이다. 
인가 받을 때는 인코딩 하란 말이 없었는데, REST 문서에서 토큰을 요청할 때는 인코딩 하는 것으로 나와있어서 그랬던 것이다. 심지어 구글링 
해도 블로그 글들이 인코딩 하라길래... 그게 맞는줄 알았다.

#### 6. 드디어 삽을 내려놓다

결론적으로 말하자면 리다이렉트 주소 자체는 *POST* 메서드의 *Body data* 에 보내기 때문에 헤더 설정만 맞춰주면 된다.
저 리다이렉트 주소가 반드시 인코딩이 필요한 것이 아니면 따로 인코딩 할 필요가 없다. 오히려 인코딩 해버려서 기존에 보낸 주소와 다르게 인식해 
문제가 생겼던 것이다. JavaScript 문서에서는 JS SDK 를 이용하는 것으로 설명이 되어있고, 여기서는 인코딩 관련 얘기가 없었고, 
*access-token* 을 요청하기 위해 방문한 REST API 문서는 인코딩을 하라고 되어있어서 발생한 문제였다.

즉, 인코딩을 할거면 양쪽 다 하거나 안 할 거면 모두 안 해야한다.

---

### 2. Kakao Developer configs for Kakao Login  👩‍💻

다음 스크린샷을 참고해 카카오 개발자 사이트의 설정을 해주도록 하자.

![Kakao Developer configs 1](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-1.png)

![Kakao Developer configs 2](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-2.png)

![Kakao Developer configs 3](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-3.png)

![Kakao Developer configs 4](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-4.png)

---

### 3.  👩‍💻



<br><br>

---
Reference

1. “카카오 로그인” Kakao Developers. accessed Feb. 05, 2023, [Kakao OAuth 2.0 Sign-in](https://developers.kakao.com/docs/latest/ko/kakaologin/js).

[Kakao OAuth Error-code]:https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting
