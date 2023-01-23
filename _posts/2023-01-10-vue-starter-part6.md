---
layout: post
title: Vue.js Starter - Part 6
subtitle: Vue.js 프로젝트 투입 일주일 전
categories: javascript
tags: [javascript, vue, vue js, vue.js, proxy, cors, xss, sop, vuex, store, state, mutations, actions, build]
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
| 앱 수준에서 동작  |   OS 수준에서 동작   |
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
맞게 동작하도록 할 수 있다는 점이다.

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



<br><br>

---
Reference

1. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 10, 2021.
2. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 11, 2021.
3. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 12, 2021.
4. Agnė Augustėnė. “프록시 VPN, 서로 어떻게 다를까?.” NordVPN. last modified Dec. 12, 2021, [VPN vs. Proxy](https://nordvpn.com/ko/blog/proxy-versus-vpn/).
5. "Same-origin policy." MDN Web Docs. Dec. 13, 2022, accessed Jan. 22, 2023, [MDN - Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).
6. "Access-Control-Allow-Origin." MND Web Docs. Jan. 07, 2023, accessed Jan. 22, 2023, [MDN - Access-Control-Allow-Origin](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Access-Control-Allow-Origin).
7. 
