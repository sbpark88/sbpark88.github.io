---
layout: post
title: Vue.js Starter - Axios
subtitle: Vue.js 프로젝트 투입 일주일 전 - Part 3
categories: javascript
tags: [javascript, vue, vue js, vue.js, promise, axios, mixins]
---

### 11. Axios 👩‍💻

#### 1. Installation

[Axios](https://axios-http.com/docs/intro) 는 `Promise 를 기반으로 하는 HTTP Client`로 `node.js`와 
`Web-browser`에서 *동일한 코드 베이스로 작동*한다.

> - Server-side : native node.js http module 을 사용.
> - Web-browser : XMLHttpRequests 를 사용.

```shell
npm install axios -S
```

#### 2. Features

`Axios`는 다음과 같은 기능을 제공한다.

1. 웹 브라우저에서 `XMLHttpRequests`를 생성
2. node.js 에서 `HTTP Requests`를 생성
3. `Promise API`를 지원
4. Request 와 Response 의 `Intercept`를 지원
5. Request 와 Response 의 데이터를 변환
6. Request 의 취소(cancel) 처리를 지원
7. 자동으로 `JSON` 데이터를 변환
8. Client-side 의 `XSRF`에 대한 보호를 지원

> XSRF : CSRF 라고도 불리며 `Cross-site Request Forgery`의 약어다.  
> cf. [사이트 간 요청 위조](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)

#### 3. Axios Examples

__1 ) import library__

```typescript
import axios from "axios"
```

단, *TypeScript* 와 함께 CommonJS 방식을 사용할 경우 아래와 같이 사용해야 자동완성과 intellisense 가 
지원된다.

```typescript
const axios = require('axios').default;
```

<br>

__2 ) Request Get Examples__

다음 3가지 방법은 모두 동일한 작업을 처리한다.

- Case 1

```javascript
axios.get('/user?ID=12345')
  .then((response) => {
    // handle success
    console.log(response);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });
```

- Case 2

```javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => {
    // always executed
  });  
```

- Case 3

```javascript
const getUser = async () => {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

<br>

__3 ) Request Post Examples__

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

<br>

__4 ) Performing Multiple Concurrent Requests__

`Axios 는 Promise 기반`이므로, 여러 요청을 동시에 보내려면 `Promise.all()` 메서드를 사용할 수 있다.

```javascript
const getUserAccount = () => {
  return axios.get('/user/12345');
}

const getUserPermissions = () => {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then((results) => {
    const acct = results[0];
    const perm = results[1];
  });
```

#### 4. Default Alias Methods

별도의 `config` 설정 없이 바로 사용할 수 있는 기본 제공 메서드는 다음과 같이 8가지가 존재한다.

> - axios.request(config)
> - axios.get(url[, config])
> - axios.delete(url[, config])
> - axios.head(url[, config])
> - axios.options(url[, config])
> - axios.post(url[, data[, config]])
> - axios.put(url[, data[, config]])
> - axios.patch(url[, data[, config]])

> 위 `Alias 메서드`를 사용하면 `url`, `method`, `data` properties 를 명시할 필요가 없다.

#### 5. Axios Instance

`Axios` instance 는 아래와 같이 `custom config`를 이용해 `new Instance`를 생성한다.

```javascript
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

사용 가능한 `Instance methods`는 다음과 같으며, `Instance config`와 `merge` 된다. 

> - axios#request(config)
> - axios#get(url[, config])
> - axios#delete(url[, config])
> - axios#head(url[, config])
> - axios#options(url[, config])
> - axios#post(url[, data[, config]])
> - axios#put(url[, data[, config]])
> - axios#patch(url[, data[, config]])
> - axios#getUri([config])

#### 6. Request Config

설정 가능한 `config`는 다음과 같으며, `url`만 필수값이다. `method`는 생략시 기본값으로 `GET`을 
사용한다.

```javascript
const config = 
{
  url: '/user',
  method: 'get', // default
  baseURL: 'https://some-domain.com/api',

  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  // NOTE: params that are null or undefined are not rendered in the URL.
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  
  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  data: 'Country=Brasil&City=Belo Horizonte',

  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  // browser only
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  // browser only
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
  maxContentLength: 2000,

  // `maxBodyLength` (Node only option) defines the max size of the http request content in bytes allowed
  maxBodyLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` defines the hostname, port, and protocol of the proxy server.
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  cancelToken: new CancelToken(function (cancel) {
  }),

  // `decompress` indicates whether or not the response body should be decompressed 
  // automatically. If set to `true` will also remove the 'content-encoding' header 
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // default

}
```

#### 7. Response Scheme

`Response` 는 아래와 같은 구조로 되어있다.

```javascript
const response = 
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  // As of HTTP/2 status text is blank or unsupported.
  // (HTTP/2 RFC: https://www.rfc-editor.org/rfc/rfc7540#section-8.1.2.4)
  statusText: 'OK',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

#### 8. Overriding Config Defaults

__1 ) Library defaults__

`lib/defaults.js`의 라이브러리 기본 설정값이 가장 먼저 적용된다.

<br>

__2 ) Global axios defaults & Custom instance defaults__

- Global axios defaults

```javascript
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

- Custom instance defaults

```javascript
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

위와 같이 정의한 `custom config`가 존재할 경우, 라이브러리 기본 설정값을 덮어써 전역 설정한다.

<br>

__3 ) Config argument for the request__

각 `Request` 메서드에 작성한 `config`는 해당 메서드에만 적용되는 설정으로, `Inline CSS`와 같이 
가장 우선순위가 높다.

```javascript
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
  timeout: 5000
});
```

> 1. 라이브러리 기본값에 의해 `timeout` config 는 `0`이다.
> 2. `Custom instance defaults`에 의해 `timeout` config 는 `2500`이 전역에 사용된다.
> 3. 시간이 오래 걸리는 요청은 개별적으로 `config`를 설정할 수 있다. 위 `/ongRequest`의 
>   `timout` config 는 `5000`이 사용된다.

#### 9. Interceptors

`Axios`를 이용하면 손쉽게 `Interceptors`를 설정할 수 있으며, 이는 request 와 response 
에 적용할 수 있다.

__1 ) Add Request Interceptors__

```javascript
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });
```

<br>

__2 ) Add Response Interceptors__

`Response`는 `HTTP status code` 가 `2xx`일 때와 아닐 때로 구분되어 trigger 된다.

```javascript
axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

<br>

__3 ) Remove Interceptors__

등록한 `Interceptors`를 삭제하는 방법은 `setTimeout()` 또는 `setInterval()`를 해제시키는 
방법과 마찬가지로 별도의 상수 또는 변수에 저장 후 해당 값을 이용해 해제시킨다.

```javascript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

<br>

__4 ) Add Interceptors to Custom Instance__

이미 생성한 `Instance` 에 `Interceptors`를 추가할 수 있다.

```javascript
const instance = axios.create();
instance.interceptors.request.use(() => {/*...*/});
```

#### 10. Error Handling

__1 ) Split catches__

위 [3. Axios Examples](#h-3-axios-examples) 에서 `then`, `catch`, `then`으로 이어지는 
처리 프로세스를 간략하게 설명했다.

다음 코드는 이 중 `catch`에서 아래와 같이 response 에러 > request 에러 > 모든 에러 순으로 
구분해 처리해 나아가는 예를 보여준다. 이는 `try-catch`를 이용해 에러를 단계별로 구분해 처리해 나가는 
것과 같은 방식이다.

```javascript
axios.get('/user/12345')
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

<br>

__2 ) Using `validateStatus` config option__

[6. Request Config](#h-6-request-config) 의 `validateStatu`를 사용해 `HTTP status code`를 
일반화 해 정의할 수 있다.

```javascript
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
})
```

> `validateStatus`가 `true` 또는 `null` 또는 `undefined`를 응답하면 **Promise 는 `resolve()`가 trigger** 되고, 
> `false`를 응답하면 **`reject()`가 trigger** 된다.

<br>

__3 ) Using `toJSON()` method__

`catch`에서 HTTP 에러를 좀 더 자세하게 확인하고 싶다면, `toJSON()` 메서드를 사용한다. 

```javascript
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```

#### 11. Cancellation

[2. Features](#h-2-features) 에서 설명한 `Axios`가 제공하는 기능 중 6번째 Request 취소에 대한 설명으로, 
`Axios`는 `Fetch API` 방식의 요청을 취소하기 위해 [Web APIs - AbortController][Web APIs - AbortController]
interface 를 지원한다.

이는 `AbortController` instance 를 생성해 처리를 가능케 한다.

```javascript
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// cancel the request
controller.abort()
```

> `CancelToken`이란 것도 있는데 deprecated 되었으므로 사용하지 않도록 한다.


#### 12. URL-Encoding Bodies

`Axios`는 기본적으로 `JavaScript Objects`를 `JSON`으로 `serialize`한다.  
따라서 `JSON` 대신 `application/x-www-form-urlencoded`를 사용하고 싶다면 아래 방법을 사용할 
수 있다.

__1 ) Using URLSearchParams__

[Web APIs - URLSearchParams][Web APIs - URLSearchParams] 를 이용한다.

다음 3가지 방법은 모두 동일한 작업을 처리한다.

- Case 1

```javascript
const paramsString = 'foo=bar&baz=qoo';
const searchParams = new URLSearchParams(paramsString);
axios.post('/foo', searchParams);
```

- Case 2

```javascript
const searchParams = new URLSearchParams();
searchParams.append('foo', 'bar');
searchParams.append('baz', 'qoo');
axios.post('/foo', searchParams);
```

- Case 3

```javascript
const paramsObj = { foo: 'bar', baz: 'qoo' };
const searchParams = new URLSearchParams(paramsObj);
axios.post('/foo', searchParams);
```

<br>

__2 ) Using [qs][qs library] library__

[qs library]:https://github.com/ljharb/qs

다음 2가지 방법은 모두 동일한 작업을 처리한다.

- Case 1

```javascript
const qs = require('qs');
axios.post('/foo', qs.stringify({ foo: 'bar', baz: 'qoo' }));
```

- Case 2

```javascript
import qs from 'qs';
const data = { foo: 'bar', baz: 'qoo' };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

---

### 12. Axios Examples 👩‍💻

#### 1. Create Mock API for Axios Examples

*Mock* 서버를 통한 테스트를 진행하기 위해 *Postman* 에 `Mock` 서버와 GET `/test` 를 생성 후 다음과 같이 `example`과 
`Tests`를 등록한다.

- example

![Postman - example data](/assets/images/posts/2022-12-29-vue-starter-part3/postman-example-data.png)

```json
[
    {"productName": "iPhone 14 Pro Max", "price": 1750000, "category": "Phone"},
    {"productName": "iPhone 14 Pro", "price": 1550000, "category": "Phone"},
    {"productName": "iPhone 14 Plus", "price": 1350000, "category": "Phone"},
    {"productName": "iPhone 14", "price": 1250000, "category": "Phone"},
    {"productName": "MacBook Pro 16", "price": 3360000, "category": "Laptop"},
    {"productName": "MacBook Pro 14", "price": 2690000, "category": "Laptop"},
    {"productName": "iPad Pro 12.9", "price": 1729000, "category": "Tablet"},
    {"productName": "iPad Pro 11", "price": 1249000, "category": "Tablet"}
]
```

<br>

- Tests

![Postman - test code](/assets/images/posts/2022-12-29-vue-starter-part3/postman-test-code.png)

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Get /test JSON data is correct", function () {
    const expect = [
        { "productName": "iPhone 14 Pro Max", "price": 1750000, "category": "Phone" },
        { "productName": "iPhone 14 Pro", "price": 1550000, "category": "Phone" },
        { "productName": "iPhone 14 Plus", "price": 1350000, "category": "Phone" },
        { "productName": "iPhone 14", "price": 1250000, "category": "Phone" },
        { "productName": "MacBook Pro 16", "price": 3360000, "category": "Laptop" },
        { "productName": "MacBook Pro 14", "price": 2690000, "category": "Laptop" },
        { "productName": "iPad Pro 12.9", "price": 1729000, "category": "Tablet" },
        { "productName": "iPad Pro 11", "price": 1249000, "category": "Tablet" }
    ]
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.eql(expect);
});
```

<br>

`Collection`의 `∙∙∙` 를 누르고 `Run collection`을 통해 `Mock API`가 정상 동작하는지 확인한다.

![Postman - test result](/assets/images/posts/2022-12-29-vue-starter-part3/postman-run-collection.png)

#### 2. Axios Examples with mixins.js

`Axios`를 이용해 보내는 `XHR` 요청을 공통으로 사용하기 위해 `mixins.js`파일을 생성하고, 여기에 공통으로 사용할 함수를 작성한다.

> mixins 에 대한 자세한 설명은 [mixins](/javascript/2023/01/05/vue-starter-part5.html#h-20-mixins-) 를 참고한다.

- /src/mixins.js

```javascript
import axios from "axios";

export default {
  methods: {
    async $api(url, method, data) {
      return (
        await axios({
          url: url,
          baseURL: "https://0000.mock.pstmn.io",
          method: method,
          data: data,
        }).catch((e) => {
          console.log(e);
        })
      ).data;
    },
  },
};
```

그리고 위 `mixins`를 `Vue` instance 에 등록한다.

- /src/main.js

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mixins from "@/mixins";

createApp(App).use(store).use(router).mixin(mixins).mount("#app");
```

<br>

새 `View` 페이지를 만들고 `Axios`를 이용해 `Mock API`로부터 데이터를 받아와 표로 렌더링을 해보자.

- /src/views/AxiosTestView.vue

{% raw %}
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
        <tr v-for="(product, i) in productList" :key="i">
          <td>{{ product.productName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AxiosTestView",
  data() {
    return {
      productList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.productList = await this.$api("/test", "get");
    },
  },
};
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
{% endraw %}

![Axios Example Result](/assets/images/posts/2022-12-29-vue-starter-part3/axios-example-result.png)

#### 3. Refactor Axios with DTO Objects

```vue
<template>
  <tr v-for="(product, i) in productList" :key="i">
    <td>{{ product.productName }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.category }}</td>
  </tr>
</template>
```

*TypeScript* 가 아닌 *JavaScript* 를 사용중일 때 *productList 의 타입을 미리 정할 수 없다*. 인스턴스가 생성되며 
`Type Inference`를 통해서만 타입이 정해지기 때문이다. 따라서 타입을 미리 알 수 없으니 `IDE`의 `Intellisense`를 사용할 수 
없어 코드 작성이 어려울 뿐 아니라 휴먼 에러를 발생시키는 요인이 된다.

따라서 *TypeScript* 가 아닌 *JavaScript* 의 한계를 극복하기 위해 아래와 같이 타입 추론에 의해 객체의 타입이 지정되도록 초기화 후 
데이터를 교체하는 `Trick`을 사용할 수 있다.

```javascript
const product = {
  productName: "",
  price: 0,
  category: ""
}

let productList = new Array(product)
// let productList = Array["product"]

const response = [
  {productName: "Choco Pie", price: 2000, category: "Snack"},
  {productName: "Oh Yes", price: 2400, category: "Snack"},
  {productName: "Sprite", price: 1200, category: "Beverage"}
]

productList = response

for (const product of productList) {
  console.log(`${product.productName} is ${product.price > 2000 ? 'over' : 'less'} than 2000 won.`)
}
```

```console
Choco Pie is less than 2000 won.
Oh Yes is over than 2000 won.
Sprite is less than 2000 won.
```

<br>

위 예제의 `mixins.js`를 `Axios Default Alias Methods`를 사용하도록 리팩토링 하고, *productList* Array 의 타입을 
미리 지정해 *JavaScript* 의 `IDE`의 `Intellisense`가 이를 인식하도록 변경해보자.

- /src/mixins.js

```javascript
import axios from "axios";

export default {
  created: function () {
    this.$api = axios.create({
      baseURL: "https://0000.mock.pstmn.io",
    });
  },
  methods: {
    $get: async function (url, data) {
      return await this.$api
        .get(url, data)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    },
    $post: async function (url, data) {
      return await this.$api
        .post(url, data)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    },
    $put: async function (url, data) {
      return await this.$api
        .put(url, data)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    },
    $patch: async function (url, data) {
      return await this.$api
        .patch(url, data)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    },
    $delete: async function (url, data) {
      return await this.$api
        .delete(url, data)
        .then((res) => res.data)
        .catch((e) => console.log(e));
    },
  },
};
```

> 이제 `this.$api.get(...)` 과 같이 기본 `config`를 포함한 instance 에 일부 config 를 수정해 Custom Request 를 
> 사용할 수 있을 뿐 아니라, `this.$get(url, data)`와 같이 **별도의 설정 없이 공통으로 설정한 기본 config 가 적용된** 
> `Axios Default Alias Methods`를 사용하는 것도 가능하다.

- /src/views/AxiosTestView.vue 

{% raw %}
```vue
<script>
export default {
  name: "AxiosTestView",
  data() {
    return {
      productList: Array["product"],
      product: {
        productName: "",
        price: 0,
        category: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.productList = await this.$get("/test");
    },
  },
};
</script>
```
{% endraw %}

> 단, `Vue`의 `data() Closure`는 `Vanilla JS`에서 사용한 두 가지 방법의 `Trick`과는 달리 `new Array(product)`는 
> 사용할 수 없고, `Array["product"]`만 사용할 수 있다.

#### 4. Refactor Axios with DTO Classes

위와 같이 *Options API* 내의 *data* 를 이용해 `Object`를 `DTO`로 사용하는 것은 다른 *Component 에서 재사용 할 수 없다*. 
또한, 필요에 따라 `Getter/Setter`를 만들거나 제약을 위해 `Wrapper`를 사용하는 등 추가적인 처리를 코드 분하기가 힘들다. 
따라서 재사용 가능성이 있는 이런 `Entities`는 `Vue` 파일이 아닌 별도의 *JavaScript* 파일로 분리하는 것이 좋다. 그리고 
단순 *Object* 보다는 좀 더 기능이 많은 `Class`를 이용해 `DTO`를 만들어 관리할 수 있다.

- /src/dto/Product.js

```javascript
export default class Product {
  productName;
  price;
  category;

  constructor(productName, price, category) {
    this._productName = productName;
    this._price = price;
    this._category = category;
  }
}
```

- /src/views/AxiosTestView.vue

{% raw %}
```vue
<script>
import Product from "@/dto/Product";

export default {
  name: "AxiosTestView",
  data() {
    return {
      productList: Array[Product],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.productList = await this.$get("/test");
    },
  },
};
</script>
```
{% endraw %}


<br><br>

---
Reference

1. 고승원. Vue.js 프로젝트 투입 일주일 전. 비제이퍼블릭 Chapter 7, 2021.
2. "Axios." Axios Documents, accessed Dec. 29, 2022, [Axios](https://axios-http.com)
3. "사이트 간 요청 위조." 위키백과, Fab. 6, 2022, accessed Dec. 29, 2022, [사이트 간 요청 위조](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)
4. "AbortController." MND, Oct. 10, 2022, accessed Dec. 29, 2022, [Web APIs - AbortController][Web APIs - AbortController]
5. "URLSearchParams." MND, Oct. 10, 2022, accessed Dec. 29, 2022, [Web APIs - URLSearchParams][Web APIs - URLSearchParams]

[Web APIs - AbortController]:https://developer.mozilla.org/en-US/docs/Web/API/AbortController
[Web APIs - URLSearchParams]:https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
