---
layout: post
title: Vue.js Starter - Proxy, Vuex
subtitle: Vue.js 프로젝트 투입 일주일 전 - Part 6
categories: javascript
tags: [javascript, vue, vue js, vue.js, proxy, cors, xss, sop, vuex, pinia, singleton, store, state, mutations, actions, build]
---

### 23. Proxy 👩‍💻

#### 1. Proxy Server

`Proxy Server` 는 서버를 통해 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해 주는 컴퓨터 시스템이나 응용프로그램을 말한다.

프록시 서버는 방문 중인 웹 사이트와 기기 사이에서 중개자 역할을 하며, 트래픽은 호스트 서버 연결에 사용되는 원격 시스템을 통해 전달된다. 
프록시 서버를 이용하면 실제 IP 주소를 숨길 수 있으며 웹 사이트에서는 원래 IP 주소가 아닌 프록시 서버의 IP 주소를 인식하게 된다.

프록시 서버의 댚적인 유형 세 가지는 다음과 같다.

- HTTP Proxy : 웹페이지에만 적합한 프록시로, HTTP 프록시로 브라우저를 설정하면 모든 브라우저 트래픽이 해당 경로를 통해 라우팅 된다.
- SOCKS Proxy : 웹/응용프로그램에서 사용할 수 있는 프록시로 모든 종류의 트래픽을 처리할 수 있지만 보통 HTTP 프록시보다 연결 속도가 
                느리고 로딩 시간이 더 오래 걸린다.
- Transparent Proxy : 위 두 유형과는 다르게 사용자가 프록시를 사용하고 있다는 사실 자체를 모르는 경우가 대부분이다. 회사에서 
                      기기 사용자의 온라인 활동을 모니터링하거나 특정 사이트 접근을 차단하는데 사용하거나 호텔이나 카페에서 
                      공용 와이파이에서 사용자를 인증하고 엑세스권한을 허용하는데 사용된다.

#### 2. VPN (Virtual Private Network)

실제 IP 를 라우팅을 통해 가상 IP 로 대체해 웹사이트에 접속 정보를 속이는 것에 대해 이야기 할 때 주로 함께 언급되는 것이 바로 `VPN`이다.

![Proxy vs. VPN](/assets/images/posts/2023-01-10-vue-starter-part6/blog-asset-vpn-vs-proxy-process-comparison-ko.svg){: width="700" }

VPN 이 Proxy 의 차이점을 정리하면 다음과 같다.

|   Proxy    |      VPN       |
|:----------:|:--------------:|
| 가상 IP 를 사용 |   가상 IP 를 사용   |
| 앱 수준에서 작동  |   OS 수준에서 작동   |
| 앱 트래픽 라우팅  |   모든 트래픽 라우팅   |
| 트래픽 암호화 불가 |    트래픽 암호화     |
| 비교적 빠른 속도  | 암호화로 인해 다소 느려짐 |

#### 3. CORS (Cross-Origin Resource Sharing)

최신 브라우저는 XSS 등 다양한 취약점으로부터 브라우저를 보호하기 위해 기본적으로 `SOP`(Same-Origin Policy) 를 갖고 있다.

![Same-origin requests and Cross-origin requests](/assets/images/posts/2023-01-10-vue-starter-part6/cors_principle.png)

> 브라우저의 SOP 가 `Same-Origin`을 판단하는 기준은 `protocol`, `host`, `port` 3가지가 동일한지를 비교한다.
> 
> `http://store.company.com/dir/page.html` 와 동일한 Same-origin 인지 여부는 다음과 같다.
> 
> ![Same-origin Policy Examples](/assets/images/posts/2023-01-10-vue-starter-part6/same-origin-policy-examples.png){: width="800"}

만약 Web 서버와 API 서버가 동일 네트워크에 존재하고, 동일 `protocol`, `host`, `port`를 사용하는데 해당 서버의 네트워크 망 
가장 앞단에 스위치가 되었든 공유기가 되었든 무언가 요청을 받아 Reverse Proxy 역할을 해주는 미들웨어 서버가 존재해 URL 경로의 
일부를 잘라 구분해주는... 이런 아름다운 연출이 아닌 이상 결국 두 서버는 SOP 를 위반할 수 밖에 없게 된다.

이를 해결하는 방법은 두 가지가 있다. 하나는 Webpack DevServer 의 `Proxy` 를 사용하는 것이고, 다른 하나는 `CORS` 
요청을 활성화 하는 것이다.

#### 4. Proxy

클라이언트가 Vue 앱을 받아 페이지를 렌더링 한 후 프론트와 관련된 요청은 Web 서버에, API 요청은 API 서버에 보낼 것이다. 
물론, Open API 가 아닌 경우 보통은 Web 서버를 통해 API 서버에 요청을 하고, API 서버는 외부에 직접 노출을 안 시키긴 하지만 
어쨌든 SOP 를 만족하진 못할 것이다.

만약 메인 API 서버에 대한 요청을 클라이언트가 API 서버에 직접 하는 것이 아니고 Web 서버에 Proxy 서버를 하나 두는 것이다. 
그러면 클라이언트는 Web 서버하고만 통신하고, APi 서버는 Web 서버가 만든 Proxy 서버하고만 통신할 것이다. 이렇게 되면 브라우저는 
Web 서버하고만 통신하는것으로 보일테니 SOP 를 위반하지 않는 것으로 판단한다.

> CORS 없이 프론트엔드 자체에서 해결하는 방법으로 Proxy 서버를 추가해 처리한다.

- /vue.config.js

```javascript
const { defineConfig } = require('@vue/cli-service')
const apiServer = 'http://localhost:3000'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        apiServer,
        changeOrigin: true
      }
    }
  }
})
```

Vue 서버가 `http://localhost:8080`이고, API 서버가 `http://localhost:3000`이라 해보자. 위와 같이 Vue 설정을 
하면 클라이언트는 API 요청을 `http://localhost:3000/api/~~~` 가 아닌 `http://localhost:8080/api/~~~` 로 
하면 된다. 그러면 Vue 서버가 해당 `/api`로 시작하는 모든 요청을 Proxy 서버를 이용해 `http://localhost:3000` 으로 
Origin 을 변경해 줄 것이다.

그리고 이렇게 Proxy 를 사용하는 것의 장점 중 하나는 CORS 를 사용하지 않고 우회할 수 있는 것 뿐 아니라 하나의 소스 코드로 
`NODE_ENV`를 이용해 각 환경을 구분하고, 환경에 따라 `Local`, `Development Server`, `Production Server` 환경에 
맞게 작동하도록 할 수 있다는 점이다.

#### 5. Access-Control-Allow-Origin

메인 API 의 경우 이렇게 Proxy 를 이용해 자체적으로 우회하는 것이 가능하다. 하지만 앱을 만들면서 SOP 를 항상 유지할 수 있는 
경우는 거의 없다. Open API 를 사용할 수도 있고, CDN 에 캐싱된 데이터를 사용할 수도 있다. 아니면 Proxy 서버 없이 클라이언트가 
CORS 설정을 통해 API 서버와 직접 통신하는 것을 원할 수도 있다.

이때 필요한 것이 브라우저가 해당 SOP 를 위반하는 다른 서버로부터 CORS 허가를 받아 브라우저에 이를 알리는 것이다. 그러면 
브라우저는 SOP 를 위반하는 다른 Origin 을 갖는 서버에 대해 제한적으로 CORS 통신을 허용해준다. 즉, Same Origin 과는 
SOP 통신을 하고, 그 외에는 CORS 통신을서버가 허용한 방식과 시간 동안 캐싱을 통해 통신한다.

> CORS 를 사용해 처리하는 방법으로 반드시 서버의 설정이 필요하다.

<br>

CORS 를 허용하는 방법은 크게 2가지가 존재한다.

__1 ) Wildcard *__

```html
Access-Control-Allow-Origin: *
```

`Credentials` 없는 요청에 대해 `*`를 명시하면 모든 Origin 의 접근을 허용하겠단 의미가 된다.

<br>

__2 ) Specifies an Origin__

```html
Access-Control-Allow-Origin: https://developer.mozilla.org
Vary: Origin
```

특정 Origin 을 응답할 경우 서버의 응답이 Origin 에 따라 달라질 수 있음을 응답 헤더에 반드시 `Vary: Origin`과 함께 보내야 
한다. 위 경우 브라우저에 `https://developer.mozilla.org` 요청에 대해서만 요청할 수 있음을 응답한다.

다음은 실제 서버의 예다.

```java
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Component
public class SimpleCORSFilter implements Filter {

    private final Logger log = LoggerFactory.getLogger(SimpleCORSFilter.class);
    
    public SimpleCORSFilter() {
        log.info("SimpleCORSFilter init");
    }
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin")); // CORS 를 허용해줄 클라이언트의 주소
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        chain.doFilter(req, res);
    }
    
    @Override
    public void init(FilterConfig filterConfig) {
    }
    
    @Override
    public void destroy() {
    }

}
```

요청한 클라이언트의 Origin 을 가져와서 해당 Origin 에 대해 CORS 를 허용함을 응답한다. 다른 응답 헤더는 이 API 가 
허용하는 CORS 규칙에 대한 정보를 나타낸다.

그러면 Vue 에서는 axios 설정에 다음과 같이 추가한다.

```javascript
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'  // 서버 주소
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
```

#### 6. Refactor Axios Examples with Proxy

[Axios Examples with Composition API](/javascript/2023/01/05/vue-starter-part5.html#h-3-axios-examples-with-composition-api) 
를 Webpack DevServer 의 `Proxy`를 사용하도록 수정해보자.

우선 API 요청이 Proxy 를 사용하도록 하기 위해 Mock API 의 응답 데이터 경로를 변경해주었다.

![Mock API with Proxy](/assets/images/posts/2023-01-10-vue-starter-part6/mock-api.png)

- /src/utils/api.js

Proxy 를 사용할 것이므로 API 의 baseURL 을 삭제한다. 기본값인 서버 주소 (현재의 경우) `http://localhost:8080` 이 
기본값으로 설정된다.

![Change of API](/assets/images/posts/2023-01-10-vue-starter-part6/changes-api.png){: width="1000"}

```javascript
import axios from 'axios'

const $api = axios.create({
})

const $get = async (url, data) => {
  return await $api.get(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $post = async (url, data) => {
  return await $api.post(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $put = async (url, data) => {
  return await $api.put(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $patch = async (url, data) => {
  return await $api.patch(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}
const $delete = async (url, data) => {
  return await $api.delete(url, data)
    .then(res => res.data)
    .catch(e => console.error(e))
}

export { $api, $get, $post, $put, $patch, $delete }

```

- /vue.config.js

Vue Config 에 Proxy 설정을 추가해준다.

![Change of Vue Config](/assets/images/posts/2023-01-10-vue-starter-part6/changes-vue-config.png){: width="1000"}

```javascript
const { defineConfig } = require('@vue/cli-service')
const target = 'https://0000.mock.pstmn.io' // Proxy 목적지

module.exports = defineConfig({
  transpileDependencies: true,
  // Proxy 설정
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true
      }
    }
  }
})
```

- /src/views/AxiosWithCompositionAPI.vue

마지막으로 API 요청 경로를 Proxy 가 인식할 수 있도록 `/api`를 prefix 로 넣어주어 Mock 서버와 일치시킨다.

![Change of View requests](/assets/images/posts/2023-01-10-vue-starter-part6/changes-view-requests.png){: width="1000"}

```vue
<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>제품명</th>
        <th>가격</th>
        <th>카테고리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, i) in state.productList" :key="i">
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.category }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Product from '@/dto/Product'
import { onMounted, reactive } from 'vue'
import { $get } from '@/utils/api'

export default {
  name: 'AxiosWithCompositionAPI',
  setup () {
    const state = reactive({
      productList: Array[Product]
    })

    const getList = async () => {
      state.productList = await $get('/api/getProducts')
    }

    onMounted(() => {
      getList()
    })

    return { state }
  }
}
</script>

<style scoped>
table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}
</style>
```

<br>

![Proxy Result](/assets/images/posts/2023-01-10-vue-starter-part6/proxy-result.png)

Vue 서버로 요청했지만 정상적으로 Mock 서버와 통신해 데이터를 가져오는 것을 확인할 수 있다.

---

### 24. Vuex 👩‍💻

#### 1. What is Vuex?

다음과 같은 `self-contained app`이 있다고 해보자.

```javascript
const Counter = {
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
}

createApp(Counter).mount('#app')
```

![Vue Data Flow](/assets/images/posts/2023-01-10-vue-starter-part6/vue-data-flow.png){: width="800"}

이 경우 데이터 흐름은 단순하게 `one-way data flow`을 보인다. 하지만 어떤 상태를 단일 컴포넌트가 아닌 서로 다른 뷰 컴포넌트가 
공유해야 하는 경우에는 어떨까?

두 컴포넌트가 부모자식 사이일 경우 `props`를 이용해 공유하고 `$emit`을 통해 동기화가 가능하다. 하지만 이건 부모자식 사이에만 
가능하다. 여러 계층일 경우는 그만큼 여러 차례 `drill down` 해서 내려가야한다. 또한 부모자식이 아닌 형제 컴포넌트 간에 교환은 
불가능하다.

이러한 문제는 또 다른 SPA 인 React 에서도 존재했으며, React 는 Redux 를 이용해 문제를 해결했다. SPA 가 규모가 커지면서 
여러 컴포넌트에서 상태를 공유하는 데 어려움을 느끼게되었고, 이를 해결하기 위해 여러 컴포넌트에서 상태를 공유할 필요가 있는 데이터를 
`Global Sintleton`으로써 관리하도록 변경했다. Vue 에서 이 상태 관리 매니저 역할을 하는 것이 Vuex 라이브러리다.

Vuex 를 사용하면 여러 컴포넌트는 다음과 같이 Vuex 를 `Global Singleton`으로 공유하게된다.

![Vuex Data Flow](/assets/images/posts/2023-01-10-vue-starter-part6/vuex-data-flow.png){: width="800"}

#### 2. Difference between `Vuex` and `Provide/Inject`

[Provide/Inject](/javascript/2023/01/01/vue-starter-part4.html#h-16-nested-component---provideinject-) 역시 
여러 컴포넌트에서 데이터를 사용할 수 있었다. 그렇다면 Vuex 와 차이가 무엇일까?

`Provide/Inject`는 `Vuex`와 성격이 메우 다르다. Provide/Inject 별도의 라이브러리가 아니며, Vue 가 자체적으로 지원하는 
기능으로 데이터의 흐름은 부모 컴포넌트에서 자식 컴포넌트로 흐른다. 앱의 최상단인 `App-level`에서 주입하면 모든 컴포넌트에서 사용 
가능하도록 만들 수 있기 때문에 Vuex 와 같이 여러 컴포넌트에서 사용하는 것이 가능하지만, 컴포넌트간 상태 관리가 목적이 아니다.

- Provide/Inject : 부모에서 자식으로 트리 구조가 1 계층 이상인 경우 손쉽게 drill down 하기 위해 사용한다.
- Vuex : 여러 컴포넌트에서 상태를 공유하기 위해 사용한다.

> 사실 다른 앱 개발에서 Reference Types 인 `Class`에 자기 자신을 static 변수로 만들고 Initializer 를 private 으로 만들어 
> `Singleton Design Pattern`을 적용하면 손쉽게 해결되는 문제이다. 아니면 뭐 단순히 데이터 저장 공유가 목적이면 
> `Type Properties`와 `Type Methods`를 사용하면 되는 간단한 문제지만 Vue 는 결국 브라우저 환경에서, 하나의 Document 안에서 
> 이루어져야하는 SPA 특성의 한계를 극복하기 위해 생겨난 라이브러리인 것이다.

#### 3. Next Generation is `Pinia`

Vuex 3.x 는 Vue 2 를 위한것이었고, Vuex 4.x 는 Vue 3 를 위한 것이었다. 그리고 Vuex 의 다음 버전인 Vuex 5 에 대해 여러 
아이디어를 토론하던 중 이미 Vuex 5 에서 원하는 대부분을 구현하고있는 `Piania`가 이미 존재하고 있다는 것을 알게 되었다. 따라서 Vuex 5 
를 개발하는 대신 Vue 의 공식 상태 관리 라이브러리는 `Pinia`로 변경되었으며, Vuex 3 과 4는 계속 유지는 되지만 기능 추가가 되지는 
않을 것이라 한다.

사실상 둘은 업그레이드 버전이 아닌 다른 라이브러리이므로 하나의 프로젝트 내에 `Pinia`와 `Vuex`를 모두 설치하는 것이 가능하다. 
이로써 기존에 Vuex 를 사용중인 앱이 Pinia 로 마이그레이션 하는 것을 점진적으로 처리할 수 있을 것이다. 그러나 새 프로젝트를 시작할 
계획이라면 더 이상 Vuex 를 사용하지 말고 `Pinia`를 사용할 것을 권장하고있다.

Comparison with Vuex 3.x/4.x ¶

- Pinia 에는 더 이상 `mutations`가 존재하지 않는다.
- TypeScript 의 Type Inference 를 활용하므로 더 이상 TypeScript 를 지원하기 위해 Custom Complex Wrappers 를 만들 필요가 없다.
- 자동완성을 지원한다.
- 더 이상 동적으로 `store` 를 추가할 필요가 없다. Pinia 에서는 이미 동적이다. 만약 직접 다루길 원한다면 할 수는 있지만 사용자가 눈치채지 
  못하더라도 이미 동적으로 관리되도록 자동화 되어 있으므로 그럴 필요가 없다.
- 더 이상 중첩된 모듈 구조가 없다. 여전히 store 를 다른 store 안에서 import 함으로써 nest store 를 암시적으로 포함할 수 있지만 
  ,  Pinia 는 평면 구조로 이를 디자인 해 제공하는 동시에 stores 간에 교차 구성을 가능하게 한다(Stores 의 순환 종속을 가질 수도 있다).
- 더 이상 `Namespaced Modules`가 존재하지 않는다. Stores 가 `flat architecture`로 제공되므로 `namespacing`은 어떻게 
  정의되었는가에 의해 상속되므로 모든 stores 는 `namedspaced` 되었다 할 수 있다.

#### 4. Installation

Pinia 는 나중에 다시 알아보도록하고 책의 내용에 맞춰 Vuex 를 이용해 진행하도록 한다.

```shell
npm install vuex@next --S
```

#### 5. Store with Options API

Vuex 나 Pinia 는 모두 Vue 의 `State Management Library`다. 그리고 이들이 저장하는 데이터는 `Store`라 부르는 Object 
컨테이너에 저장되어 관리된다.

![Store Tree](/assets/images/posts/2023-01-10-vue-starter-part6/store-tree.png){: width="800"}

- /src/store/index.js

```javascript
import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
    // 아래와 같이 this.state 로도 접근 가능하다. 하지만 Vuex 공식 예제를 보면 위와 같은 방법을 사용하도록 지시한다.
    // increment () {
    //   this.state.count++
    // }
  }
})
```

> - state : 공유될 데이터 Object 를 정의한다.
> - mutations : state 는 외부에서 접근해 변경하는 것은 가능하나, 내부에서는 mutations 를 통해서만 변경된다. 이 mutations 를 
>               각 컴포넌트에서 호출할 때는 `this.$store.commit('mutation-method-name')`을 통해 호출한다.

- /src/views/StoreOptionsAPI.vue

{% raw %}
```vue
<template>
  <p>Count: {{ count }}</p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
export default {
  name: 'StoreOptionsAPI',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      // this.$store.state.count++
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>
p { color: red; }
</style>
```
{% endraw %}

> mutations 를 사용하지 않고 외부에서 직접 state 의 값을 변경하는 것이 가능하다(i.e. `this.$store.state.count++`).  
> 이것이 가능한 것으로 보아 member 가 private 으로 관리되서 내부에서 변경하도록 setter 를 사용하듯 mutations methods 를 
> 사용할 수 밖에 없던 것은 아닌 것 같다. 뒤에서 `actions`를 설명하면서 다시 이야기 하겠지만 아마 `mutations`가 `Synchronous`로 
> 작동하기 때문인 것 같다. 그렇기 때문에 Vuex 공식 문서를 보면 Vuex 는 상태 변화시 mutations 를 사용해 상태를 변경하도록 
> 안내했던 것으로 보인다. 또한 공식 문서의 mutations 항목을 보면 devTool 이 상태 변화를 스냅샷을 이용해 추적할 수 있다고 한다. 
> 
> Vuex 컨테이너 자체는 Reference Types 의 Singleton 을 모델로 하고 있다는 것만 제외하면 Vuex 의 member 의 성질은 
> Swift 에서 [Structures][Swift - mutating in Structures] 의 작동과 유사해보인다.
> 
> 하지만, Vuex 는 이제 deprecated 된 것이나 마찬가지고 Pinia 는 mutations 가 없으니 추후 migration 을 위해서라도 
> mutations 를 사용하는 것은 지양하는 것이 좋을 것 같다.

- /src/views/AnotherStoreOptionsAPI.vue

{% raw %}
```vue
<template>
  <p>Count: {{ count }}</p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
export default {
  name: 'AnotherStoreOptionsAPI',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>
p { color: blue; }
</style>
```
{% endraw %}

![Vuex State 1](/assets/images/posts/2023-01-10-vue-starter-part6/vuex-state-1.png)

![Vuex State 2](/assets/images/posts/2023-01-10-vue-starter-part6/vuex-state-2.png)

`Vuex Store 1` 페이지에서 변경한 상태값이 `Vuex Store 2` 페이지에서도 유지되는 것을 확인할 수 있다.

#### 6. Store with Composition API

위에서 2개의 Vuex 페이지는 모두 Options API 를 사용했다. `Composition API` 에서 Vuex 를 사용하도록 변경해보자.

`computed`, `reactive`, `ref`, `toRefs` 등을 사용하기 위해 `vue` 에서 기능을 import 하던 것처럼 
`vuex`로부터 `useStore`를 import 해서 사용한다.

`AnotherStoreOptionsAPI`를 `StoreCompositionAPI`로 바꾸고 다음과 같이 코드를 수정한다.

- /src/views/StoreCompositionAPI.vue

{% raw %}
```vue
<template>
  <p>Count: {{ count }}</p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'StoreCompositionAPI',
  setup () {
    const store = useStore()
    return {
      count: computed(() => store.state.count),
      increment: () => store.commit('increment')
    }
  }
}
</script>

<style scoped>
p { color: blue; }
</style>
```
{% endraw %}

기능이 적을 때는 위와 같이 작성해도 무방하지만 컴포넌트에 기능이 많을 경우 분석하기 어려워질 수 있다. vuex 의 counter 와 연관된 기능을 
분리시켜보자.

{% raw %}
```vue
<template>
  <p>Count: {{ count }}</p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

const storeCounter = (store) => {
  const state = reactive({
    count: computed(() => store.state.count),
    increment: () => store.commit('increment')
  })
  return toRefs(state)
}

export default {
  name: 'StoreCompositionAPI',
  setup () {
    const store = useStore()
    const { count, increment } = storeCounter(store)
    return { count, increment }
  }
}
</script>

<style scoped>
p { color: blue; }
</style>

```
{% endraw %}

#### 7. Getters

위에서는 단순히 Store 에 저장된 state 의 값을 가져오기만했다. 그런데 만약 값을 가져오기 위한 custom 로직(예를 들어 filter 를 
수행하거나, prefix 를 붙이거나, 2개의 값을 결합하는 등)이 필요할 경우 모든 컴포넌트에서 이를 copy/paste 해야한다. 따라서 이런 
로직은 해당 객체 내에서 로직을 수행하고 그 결과를 가져다 사용할 수 있도록 캡슐화 하는 것이 좋다.
 
increment 가 몇 번 호출되었는지를 getter 를 이용해 가져와보자.

- /src/store/index.js

```javascript
import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    calledEvenTimes (state) {
      return state.count % 2 === 0
    }
  }
})
```

getters 에서 로직을 이미 적용했기 때문에 모든 컴포넌트가 동일한 결과를 얻을 수 있다. 단지 컴포넌트는 조회만 하면 된다.

- /src/views/StoreOptionsAPI.vue

{% raw %}
```vue
<template>
  <p>
    Count: {{ count }}
    <span>{{ calledEvenTimes ? '짝수번 호출되었습니다' : '홀수번 호출되었습니다' }}</span>
  </p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
export default {
  name: 'StoreOptionsAPI',
  computed: {
    count () {
      return this.$store.state.count
    },
    calledEvenTimes () {
      return this.$store.getters.calledEvenTimes
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    }
  }
}
</script>

<style scoped>
p { color: red; }
</style>
```
{% endraw %}

- /src/views/StoreCompositionAPI.vue

{% raw %}
```vue
<template>
  <p>
    Count: {{ count }}
    <span>{{ calledEvenTimes ? '짝수번 호출되었습니다' : '홀수번 호출되었습니다' }}</span>
  </p>
  <button type="button" @click="increment">Increment</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

const storeCounter = (store) => {
  const state = reactive({
    count: computed(() => store.state.count),
    calledEvenTimes: computed(() => store.getters.calledEvenTimes),
    increment: () => store.commit('increment')
  })
  return toRefs(state)
}
export default {
  name: 'StoreCompositionAPI',
  setup () {
    const store = useStore()
    const { count, calledEvenTimes, increment } = storeCounter(store)
    return { count, calledEvenTimes, increment }
  }
}
</script>

<style scoped>
p { color: blue; }
</style>
```
{% endraw %}

> Vue 3.0 버전에서 Getters 의 결과가 Computed Properties 에 의해 캐싱 되지 않는 문제가 보고되었다. 해당 문제를 제기한 
> 깃의 PR 을 보면 Vue 3.1 부터 정상 작동하는 것으로 보인다.

#### 8. Mutations and Actions

Pinia 는 mutations 가 존재하지 않으므로 더 이상 필요한 개념은 아니다. 정확한 것은 Pinia 에서 상태 관리를 어떻게 하고 값을 
다루는지를 확인한 후 포스팅을 일부 수정할 필요가 있을 것으로 보인다. 단, 아직 Vuex 를 사용중이라면 mutations 를 사용하고 있을텐데 
Vuex 에서 mutations 없이도 컴포넌트에서 state 수정이 가능했음에도 불구하고 mutations 를 사용한 이유는 Vuex 의 Actions 설명을 
보면 다음으로 추측된다.

- Mutations : Synchronous 로 작동.
- Actions : Asynchronous 로 작동하며 여러 개의 mutations 를 실행할 수 있다.


Action handlers 는 Store instance 와 동일한 `context` object 를 노출시킴으로써 작동하며 Store 의 4가지 기능을 사용할 
수 있다.

- context.state : state 에 접근한다.
- context.getter : getter 에 접근한다.
- context.commit : mutation 을 commit 한다.
- context.dispatch : action 을 호출한다.

> context.state 는 store.state 와 같고, context.dispatch 는 store.dispatch 와 같다. context arguments 로 넣지 
> 않고 그냥 store 를 써도 된다.

<br>

Actions 를 이용해 Mutations 의 increment 를 호출하도록 변경해보자.


- /src/store/index.js

```javascript
import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    calledEvenTimes (state) {
      return state.count % 2 === 0
    }
  },
  actions: {
    incrementInActions (context) {
      context.commit('increment')
    }
  }
})
```

그리고 `context.commit`, `store.commit`은 그냥 다음과 같이 축약해서 사용할 수 있다.

```javascript
import { createStore } from 'vuex'

export default createStore({
  // ...
  actions: {
    incrementInActions ({ commit }) {
      console.log('\'increment\' will be called by actions.')
      commit('increment')
    }
  }
})

```

<br>

- /src/views/StoreOptionsAPI.vue

{% raw %}
```vue
<template>
  <p>
    Count: {{ count }}
    <span>{{ calledEvenTimes ? '짝수번 호출되었습니다' : '홀수번 호출되었습니다' }}</span>
  </p>
  <button type="button" @click="increment">Increment</button><br><br>
  <button type="button" @click="incrementInActions">Increment(called by actions)</button>
</template>

<script>
export default {
  name: 'StoreOptionsAPI',
  computed: {
    count () {
      return this.$store.state.count
    },
    calledEvenTimes () {
      return this.$store.getters.calledEvenTimes
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    incrementInActions () {
      this.$store.dispatch('incrementInActions')
    }
  }
}
</script>

<style scoped>
p { color: red; }
</style>
```
{% endraw %}

> mutations 는 `commit`으로 호출하고, actions 는 `dispatch`로 호출한다는 것을 꼭 기억하자.

- /src/views/StoreCompositionAPI.vue

{% raw %}
```vue
<template>
  <p>
    Count: {{ count }}
    <span>{{ calledEvenTimes ? '짝수번 호출되었습니다' : '홀수번 호출되었습니다' }}</span>
  </p>
  <button type="button" @click="increment">Increment</button><br><br>
  <button type="button" @click="incrementInActions">Increment(called by actions)</button>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, toRefs } from 'vue'

const storeCounter = (store) => {
  const state = reactive({
    count: computed(() => store.state.count),
    calledEvenTimes: computed(() => store.getters.calledEvenTimes),
    increment: () => store.commit('increment'),
    incrementInActions: () => store.dispatch('incrementInActions')
  })
  return toRefs(state)
}
export default {
  name: 'StoreCompositionAPI',
  setup () {
    const store = useStore()
    const { count, calledEvenTimes, increment, incrementInActions } = storeCounter(store)
    return { count, calledEvenTimes, increment, incrementInActions }
  }
}
</script>

<style scoped>
p { color: blue; }
</style>
```
{% endraw %}

> 근데 막상 mutations 의 increment 를 `setTimeout(() => state.count++, 3000)` 로 바꿔 테스트 해보니 Mutations 에서도 
> setTimout 이 문제 없이 작동했다. 결국 싱글 스레드인 JavaScript 에서 둘은 차이가 없는 것 아닌가 생각되는데 이 부분은 좀 더 깊게 
> 살펴봐야 할 것으로 보인다.

#### 9. Account Examples

Vuex 가 실무에서 가장 많이 사용되는 예는 사용자가 로그인 했을 때 그 사용자 정보를 저장하는 것이다.

```javascript
import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate'

const store = createStore({
  state () {
    return {
      user: { }
    }
  },
  mutations: {
    user (state, data) {
      state.user = data
    }
  },
  plugins: [
    persistedstate({
      path: ['user']
    })
  ]
})

export default store
```

<br><br>

---
Reference

1. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 10, 2021.
2. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 11, 2021.
3. Agnė Augustėnė. “프록시 VPN, 서로 어떻게 다를까?.” NordVPN. last modified Dec. 12, 2021, [VPN vs. Proxy](https://nordvpn.com/ko/blog/proxy-versus-vpn/).
4. "Same-origin policy." MDN Web Docs. Dec. 13, 2022, accessed Jan. 22, 2023, [MDN - Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
5. "Access-Control-Allow-Origin." MND Web Docs. Jan. 07, 2023, accessed Jan. 22, 2023, [MDN - Access-Control-Allow-Origin](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).
6. "What is Vuex." Vuex Docs. Oct. 15, 2022, accessed Jan. 23, 2023, [Vuex Documentation](https://vuex.vuejs.org).
7. "What is Pinia." Pinia Docs. accessed Jan. 24, 2024, [Pinia Documentation](https://pinia.vuejs.org).

[Swift - mutating in Structures]:/swift/2022/11/27/methods.html#h-2-modifying-value-types-from-within-instance-methods
