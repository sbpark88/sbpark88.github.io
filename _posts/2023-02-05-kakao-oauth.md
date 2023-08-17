---
layout: post
title: Kakao OAuth 2.0 
subtitle: Get authorization, token, and access information.
categories: javascript
tags: [javascript, vue, kakao oauth, kakao token]
---

### 1. 카카오 OAuth 2.0 삽을 들자  👩‍💻

대체 삽질은 뭐라고 번역 해야 할지 모르겠다. 튜토리얼이나 도큐먼트, 정의나 개념을 정리한 것도 아닌 단순 카카오 OAuth 2.0 테스트를 
하면서 삽질을 많이 해서 올려본다.

Vue 에서 하고 있기 때문에 Vue 에서 다른 사람들이 OAuth 테스트 한 것을 봤는데 딱히 참고할만한 레퍼런스도 잘 안 나오고, 무엇보다 
방식이 다 제각각이었다. 검색하면서 가장 인상 깊었던건 포스팅 올린 분들의 공식 문서가 불친절하다는 것과 따라해봤는데 안 된다는 댓글들...

아마 나와 같은 삽을 드는 분들도 있을 것 같아 내 삽질 후기를 남기며 그분들에게 도움이 되었으면 한다.

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

![Kakao Developer configs 1](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-1.png){: width="1000"}

![Kakao Developer configs 2](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-2.png){: width="1000"}

![Kakao Developer configs 3](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-3.png){: width="1000"}

![Kakao Developer configs 4](/assets/images/posts/2023-02-05-kakao-oauth/preliminary-settings-4.png){: width="1000"}

---

### 3. Let's do it!! 👩‍💻

#### 1. Append Kakao Script and Button Images

카카오 인증은 다음 그림과 같이 크게 3 단계로 나뉜다.

![Kakao OAuth 2.0 Workflow](/assets/images/posts/2023-02-05-kakao-oauth/kakaologin_sequence_js.png){: width="1000"}

> 1. 카카오톡을 이용해 인가 받기.
> 2. 인가가 완료되면 OAuth 토큰 받기.
> 3. 토큰을 이용한 서비스 이용.

여기서는 인가를 받고, OAuth 토큰을 발급하고, 갱신하기, 그리고 이 토큰을 이용해 카카오에서 사용자 정보를 받아오는 것과 로그아웃까지 구현한다.  
추후 다른 OAuth 인증을 위해 하나의 컴포넌트에 넣지 않고 API, Model, Util, Vuex 각각의 역할을 분리시켜놓았다.

시작하기 전 `/src/assets`에 카카오 개발자에서 `로그인 버튼`을 받아서 넣어준다. 여기서는 `kakao_login_medium_narrow.png`를 
사용했다. 그리고 `/public/index.html`의 *head* 에 카카오의 최신 스크립트 파일을 넣어준다. 현재 최신 버전은 다음과 같다.

```html
<html lang="ko">
  <head>
    <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
            crossorigin="anonymous"></script>
  </head>
</html>
```
<br>

- /src/main.js

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import { JAVASCRIPT_KEY } from "@/api/auth/kakao";

const Vue = createApp(App).use(store).use(router).use(VueCookies).mount("#app");

Vue.$cookies.config("1d");
window.Kakao.init(JAVASCRIPT_KEY); // Kakao_JavaScript_KEY
```

#### 2. View

- /src/views/KakaoOAuth2.vue

{% raw %}
```vue
<template>
  <div>
    <a id="custom-login-btn" @click="kakaoLogin">
      <img
        src="../assets/kakao_login_medium_narrow.png"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </a>
    <p id="token-result"></p>
  </div>
</template>

<script>
import { signIn } from "@/api/auth/kakao";

export default {
  name: "KakaoOAuth2",
  setup() {
    const kakaoLogin = signIn("http://localhost:8080/logged-in");

    return { kakaoLogin };
  },
};
</script>

<style scoped></style>
```
{% endraw %}

<br>

- /src/views/KakaoSiginInSuccess.vue

{% raw %}
```vue
<template>
  <button type="button" v-show="!oAuth.access_token" @click="getToken">
    토큰 가져오기
  </button>
  <button type="button" @click="requestUserInfo">사용자 정보 가져오기</button>
  <button type="button" @click="refreshAccessToken">Access Token 갱신</button>
  <button type="button" @click="kakaoLogout">로그아웃</button>
  <p id="token-result">Access Token: {{ oAuth.access_token }}</p>
  <p>
    Kakao Porfile :
    <img :src="kakao.profile.profile_image_url" alt="카카오 프로필 사진" />
  </p>
  <p>e-mail : {{ kakao.email }}</p>
</template>

<script>
import { onMounted, reactive, computed, toRefs } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import {
  extractAuthorizationCode,
  getOAuthToken,
  getUserInformation,
  updateOAuthToken,
  signOut,
} from "@/api/auth/kakao";
import OAuthServer from "@/models/enums/OAuthServer";

const init = () => {
  const state = reactive({
    kakao: {
      profile: "",
      email: "",
    },
  });
  return toRefs(state);
};
export default {
  name: "KakaoSignInSuccess",
  setup() {
    let authorizationCode = "";
    const { kakao } = init();

    const store = useStore();
    const currentServer = computed(() => store.getters["getCurrentServer"]);
    const oAuth = computed(() => store.state.kakaoOAuth.oAuth);

    onMounted(() => {
      getAuthorizationCode();
      console.log(`authorizationCode: ${authorizationCode}`);
      console.log(store.state.currentServer);
    });

    const getAuthorizationCode = () => {
      authorizationCode = extractAuthorizationCode();
      if (authorizationCode) {
        store.commit("setCurrentServer", OAuthServer.KAKAO);
      }
    };

    const getToken = async () => {
      const token = await getOAuthToken(
        "http://localhost:8080/logged-in",
        authorizationCode
      )();

      if (currentServer.value === OAuthServer.KAKAO && token) {
        store.commit("setToken", token);
        window.Kakao.Auth.setAccessToken(oAuth.value.access_token);
      } else {
        alert("인증 실패! 처음부터 다시 시도하십시오.");
        // location.href = "/kakao";
        await router.push("/kakao");
      }
    };

    const refreshAccessToken = async () => {
      console.log(store.getters["getRefreshToken"]);
      const token = await updateOAuthToken()(store.getters["getRefreshToken"]);
      if (currentServer.value === OAuthServer.KAKAO && token) {
        const accessTokenChanged =
          !!token.access_token &&
          oAuth.value.access_token !== token.access_token;
        const refreshTokenChanged =
          !!token.refresh_token &&
          oAuth.value.refresh_token !== token.refresh_token;
        console.log(
          `Access Token 이 ${
            accessTokenChanged ? "갱신되었습니다." : "갱신되지 않았습니다."
          }  Refresh Token 이 ${
            refreshTokenChanged ? "갱신되었습니다." : "갱신되지 않았습니다."
          }
          `
        );
        store.commit("setToken", token);
        window.Kakao.Auth.setAccessToken(oAuth.value.access_token);
      } else {
        alert("인증 실패! 처음부터 다시 시도하십시오.");
        await router.push("/kakao");
      }
    };

    const requestUserInfo = () => {
      if (
        currentServer.value === OAuthServer.KAKAO &&
        oAuth.value.access_token
      ) {
        getUserInformation()()
          .then((res) => {
            console.log(res);
            Object.assign(kakao.value, res.kakao_account);
            console.log(kakao.value);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("토큰을 획득하세요.");
      }
    };
    
    const kakaoLogout = async () => {
      await signOut();
      store.commit("resetToken");

      alert("잠시 후 로그인 화면으로 이동합니다.");
      setTimeout(async () => {
        await router.push("/kakao");
      }, 3000);
    };

    return {
      oAuth,
      kakao,
      getToken,
      refreshAccessToken,
      requestUserInfo,
      kakaoLogout,
    };
  },
};
</script>

<style scoped>
button {
  margin: 0 10px;
}
</style>
```
{% endraw %}

#### 3. API

- /src/utils/api.js

```javascript
import axios from "axios";

const $api = axios.create({
  // baseURL: 'http://localhost:8080' // Can be omitted as this is the default
});

const $get = async (url, data) =>
  await $api.get(url, data).then(successHandler).catch(errorHandler);
const $post = async (url, data) =>
  await $api.post(url, data).then(successHandler).catch(errorHandler);
const $put = async (url, data) =>
  await $api.put(url, data).then(successHandler).catch(errorHandler);
const $patch = async (url, data) =>
  await $api.patch(url, data).then(successHandler).catch(errorHandler);
const $delete = async (url, data) =>
  await $api.delete(url, data).then(successHandler).catch(errorHandler);

const successHandler = (res) => {
  if ((res.status / 200).toFixed() !== "1") {
    throw new HTTPError(res.status, res.statusText);
  } else {
    return res.data;
  }
};

const errorHandler = (error) => {
  // Step 1. Send error to server for log.
  // Step 2. Throw error to components
  throw error;
};

class HTTPError extends Error {
  constructor(status, statusText) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
  }
}

export { $api, $get, $post, $put, $patch, $delete };
```

<br>

- /src/api/auth/kakao.js

```javascript
import { $post } from "@/utils/api";

const JAVASCRIPT_KEY = "";
const REST_API_KEY = "";
const URL = Object.freeze({
  TOKEN: "https://kauth.kakao.com/oauth/token",
  USER_INFO: "/v2/user/me",
});

const signIn = (redirectUri) => {
  return () => {
    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
      scope: "profile_image, account_email",
    });
  };
};

const signOut = () => {
  return window.Kakao.Auth.logout()
    .then((res) => {
      console.log(res);
      console.log(window.Kakao.Auth.getAccessToken()); // null
    })
    .catch((err) => {
      console.log(err);
      alert("Not logged in.");
    });
};

const extractAuthorizationCode = () => window.location.search.split("=")[1];

const getOAuthToken = (redirectUri, authorizationCode) => {
  return async () => {
    // redirect_uri: encodeURIComponent("http://localhost:8080/logged-in"), // Do not encode REDIRECT_URI
    return $post(
      URL.TOKEN,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: REST_API_KEY, // Kakao_REST_API_KEY
        redirect_uri: redirectUri, // REDIRECT_URI
        code: authorizationCode, // AUTHORIZE_CODE
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };
};

const updateOAuthToken = () => {
  return async (refreshToken) => {
    return $post(
      URL.TOKEN,
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: REST_API_KEY,
        refresh_token: refreshToken,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };
};

const getUserInformation = (...properties) => {
  let data = {};
  if (properties.length > 0) {
    data.property_keys = [...properties];
  }
  return () => {
    return window.Kakao.API.request({
      url: URL.USER_INFO,
      data: data,
    });
  };
};

export {
  JAVASCRIPT_KEY,
  signIn,
  signOut,
  extractAuthorizationCode,
  getOAuthToken,
  updateOAuthToken,
  getUserInformation,
};
```

#### 4. Model and Vuex 

- /src/modules/enums/OAuthServer.js

```javascript
const OAuthServer = Object.freeze({
  NONE: Symbol("none"),
  KAKAO: Symbol("kakao"),
  NAVER: Symbol("naver"),
  GOOGLE: Symbol("google"),
});

export default OAuthServer;
```

<br>

- /src/store/index.js

```javascript
import { createStore } from "vuex";
import OAuthServer from "@/models/enums/OAuthServer";
import kakaoOAuth from "@/store/modules/kakaoOAuth";

export default createStore({
  state: {
    currentServer: OAuthServer.NONE,
  },
  getters: {
    getCurrentServer: (state) => state.currentServer,
  },
  mutations: {
    setCurrentServer: (state, newServer) => {
      state.currentServer = Object.values(OAuthServer)?.includes(newServer)
        ? newServer
        : OAuthServer.NONE;
    },
  },
  actions: {},
  modules: { kakaoOAuth },
});
```

- /src/store/modules/kakaoOAuth.js

```javascript
import OAuthServer from "@/models/enums/OAuthServer";

const state = {
  oAuthServer: OAuthServer.KAKAO,
  oAuth: {
    token_type: "",
    scope: "",
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    refresh_token_expires_in: 0,
  },
};
const getters = {
  getTokenType: (state) => state.oAuth.token_type,
  getScope: (state) => state.oAuth.scope,
  getAccessToken: (state) => state.oAuth.access_token,
  getExpiresIn: (state) => state.oAuth.expires_in,
  getRefreshToken: (state) => state.oAuth.refresh_token,
  getRefreshTokenExpiresIn: (state) => state.oAuth.refresh_token_expires_in,
};
const mutations = {
  setAccessToken: (state, newToken) => (state.oAuth.access_token = newToken),
  setToken: (state, oAuth) => {
    if (oAuth.token_type) state.oAuth.token_type = oAuth.token_type;
    if (oAuth.scope) state.oAuth.scope = oAuth.scope;
    if (oAuth.access_token) state.oAuth.access_token = oAuth.access_token;
    if (oAuth.expires_in) state.oAuth.expires_in = oAuth.expires_in;
    if (oAuth.refresh_token) state.oAuth.refresh_token = oAuth.refresh_token;
    if (oAuth.refresh_token_expires_in)
      state.oAuth.refresh_token_expires_in = oAuth.refresh_token_expires_in;
  },
  resetToken: (state) => {
    (state.oAuth.token_type = ""),
      (state.oAuth.scope = ""),
      (state.oAuth.access_token = ""),
      (state.oAuth.expires_in = 0),
      (state.oAuth.refresh_token = ""),
      (state.oAuth.refresh_token_expires_in = 0);
  },
};
const actions = {};
const modules = {};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: modules,
};
```

가져온 정보와 변경된 토큰 갱신 성공 여부 등에 대해서는 콘솔에 출력하도록 해두었으니 콘솔창을 열고 함께 확인하면 된다.


<br><br>

---
Reference

1. “카카오 로그인” Kakao Developers. accessed Feb. 05, 2023, [Kakao OAuth 2.0 Sign-in](https://developers.kakao.com/docs/latest/ko/kakaologin/js).

[Kakao OAuth Error-code]:https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting
