---
layout: post
title: Cookie, Session, Token, and Web Storage API
subtitle: 
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [cookie, session, token, public key, private key, local storage, session storage, msa, load balancer, redis, memcached]
---

### 1. Cookie 👩‍💻

#### 1. Cookie

쿠키는 아주 작은 데이터를 저장할 수 있는 브라우저가 갖는 저장 공간 중 하나로 동일한 서버에 접속할 때 저장한 쿠키 정보를 보낸다. 

HTTP protocol 자체는 `stateless`인데 쿠키가 정보를 저장하고 있다 전송함으로써 이를 
<span style="color: red;">**stateful**</span> 하게 만들어주는 것이다.

쿠키는 주로 다음과 같은 세 가지 기능을 한다.

- Session management: 로그인, 쇼핑 카트와 같은 서버가 저장해야하는 정보.
- Personalization: 사용자 선호, 테마와 같은 설정값.
- Tracking: 사용자 행동 분석을 위한 기록.

과거에는 클라이언트에 무언가 저장할 필요가 있을 때 모든 것을 쿠키에 저장했다. 쿠키가 클라이언트에 저장할 수 있는 유일한 방법이었기 때문이다. 
하지만 오늘날은 클라이언트에 정보 저장 목적으로 쿠키를 사용하는 것은 권장되지 않는다. 
<span style="color: red;">모든 요청마다 쿠키가 함께 전송되기 때문</span>이다. 특히 이것은 모바일에서 성능이 떨어지는 원인이 될 
수 있다. 따라서 일반적인 정보 저장이 목적이라면 Modern APIs 인 Web Storage API(localStorage, sessionStorage) 또는 
IndexedDB 를 사용하는 것이 권장된다.

#### 2. JavaScript Access

그럼에도 불구하고 쿠키는 아직도 사용되고 있다. 서버에서 세션 정보를 전송할 때 사용되기도 하고, 주로 많이 사용되는 곳은 광고업계에서 
**서드 파티 쿠키**가 사용자의 행동을 추적하는 것이다. 물론... 요즘은 이것도 애플의 *크로스 사이트 추적 방지*와 구글의 
*서드 파티 쿠키 차단*에 의해서 많이 막혔지만 서버에서 세션 관리를 위해 쿠키에 실어 보내는 것은 여전히 많이 사용되고 있다.

쿠키는 다음과 같은 특징을 갖는다.

- 도메인 단위로 저장
- 브라우저마다 다르지만 표준안 기준으로 사이트당 최대 20개 및 4KB로 제한
- <span style="color: red;">영구 저장 불가능</span>(session, expires, max-age 단위로 저장)

<br>

쿠키는 서버에서 데이터를 실어 보내는데 사용되기도 하지만 브라우저에서 JavaScript 를 통해서 제어하는 것도 가능하다.

`document`에는 `cookie`라는 객체가 있고, 여기에 쿠키를 저장할 수 있다. 쿠키에 설정할 수 있는 대표적인 값은 다음과 같다.

- domain: 유효 도메인 설정
- path: 유효 경로 설정
- expires: 만료 날짜(UTC Date) 설정
- max-age: 만료 타이머(seconds) 설정

쿠키는 영구 저장이 불가능하다고 했다. expires 또는 max-age 를 지정해야하며, 지정하지 않을 시 기본값은 `session`으로 세션이 
유지되는 동안에만 유효하다.

<br>

쿠키에 데이터를 저장하는 것은 JSON String 을 사용하듯 문자열로 할 수 있으며, Syntax 체계는 별도의 따옴표 없이 `;`로 구분한다.

```javascript
document.cookie = 'a=1; domain=localhost;';
document.cookie = 'b=2; domain=127.0.0.1;';
document.cookie = 'c=3; domain=google.com;';
document.cookie = 'd=4; domain=localhost; path=/';
document.cookie = 'e=5; domain=localhost; path=/abc';
document.cookie = 'f=6; domain=localhost; path=/*';
```

위와 같이 쿠키를 저장한 상태에서 `localhost/def`로 접속해보자.

![Cookie](/assets/images/posts/2024-04-18-cookie-session-token-storage/cookie.png)

총 6개의 쿠키를 저장했지만 4개만 저장된 것을 확인할 수 있다. `b`와 `c`는 도메인 불일치로 저장되지 않는 것을 확인할 수 있다.

이제 현제 `domain/path`에서 유효한 쿠키가 무엇인지 출력해보자.

```javascript
console.log(document.cookie)
```

```console
a=1; d=4
```

`a`와 `d`만 유효한 것을 알 수 있다. `e`와 `f`는 <span style="color: red;">path</span>가 달라 현재 주소에서는 
사용할 수 없는 쿠키다. 쿠키에서의 wildcard 는 `*`이 아니라 `/`로 끝내면 이하 주소를 모두 포함한다는 것을 알 수 있다.

이번에는 `localhost/abc`로 접속해 유효한 쿠키를 확인해보자.

```console
e=5; a=1; d=4
```

이제 `e`, `a`, `d`가 유효한 쿠키임을 알 수 있다. 마찬가지로 `localhost/*`로 접속하면 `f`, `a`, `d`가 유효한 
쿠키가 된다.

참고로 `expires`와 `max-age`는 다음과 같이 등록하면 쉽게 사용할 수 있다.

```javascript
const THREE_DAYS_SECONDS = 60 * 60 * 24 * 3;
document.cookie = `a=1; max-age=${THREE_DAYS_SECONDS}`;
```

```javascript
document.cookie = `b=2; expires=${daysLaterMidnight(3).toUTCString()}`;

function daysLaterMidnight(days) {
  const now = new Date();
  const threeDaysLaterMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + days
  );
  return threeDaysLaterMidnight;
}
```

<br>

특정 쿠키의 값을 가져오거나 삭제하기 위해서는 다음과 같이 함수를 만들어 사용하면 편리하다.

```javascript
const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find((str) => str.split('=')[0] === name);
  return cookie ? cookie.split('=')[1] : null;
};

const getCookies = (...names) => names.map(getCookie);
```

```javascript
const removeCookie = (name) =>
  (document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`);

const removeCookies = (...names) => names.forEach(removeCookie);
```

#### 3. HTTP Only & Secure

위에서 쿠키가 세션을 관리하는 데 사용된다고 했다. `Session ID`는 매우 민감한 개인정보다. 절대로 유출이 되어서는 안 된다. 
그런데 방금 JavaScript 로 쿠키를 너무도 손쉽게 다루는 것을 확인했다.

쿠키의 JavaScript 의 접근은 쿠키의 데이터에 `HttpOnly`를 추가하면 JavaScript 의 접근을 막을 수 있다. 이러면 더이상
[XSS] 로 인한 쿠키 탈취를 차단할 수 있다.

이 방법은 브라우저에서의 쿠키 탈취는 막을 수 있지만, 와이파이를 감청하거나 심지어 ISP 케이블을 감청하는 등 네트워크 자체를 
감청해 쿠키를 탈취하는 것은 막을 수 없다. 물론, 이를 위한 대책도 존재한다. 바로 `secure`를 추가하는 것이다. 이 값이 추가되면 
이제 쿠키는 SSL/TLS 를 사용할 때만 전송되도록 설정되어 HTTPS 통신으로 암호화된 전송만을 허용한다. 개발자가 실수로 
HTTP 로 작성할 경우 쿠키의 전송 자체를 차단하는 것이다.

HTTP Only Cookies, Secure Cookies 는 동시에 설정할 수 있으며, 이를 통해 대부분의 쿠키 탈취 문제를 해결할 수 있다.

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('myCookie', 'Hello, World!', {
    httpOnly: true,
    secure: true
  });

  res.send('Cookie with HttpOnly and Secure flag has been set.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 2. Session 👩‍💻

#### 1. Session

쿠키의 용도 중 하나가 세선 정보를 전송할 때 사용한다고 했다. 세션일란 무엇일까? HTTP 가 stateless 이기 때문에 사용자의 
인증 정보를 유지하기 위해선 이 상태를 저장할 필요가 있다. 이 방법 중 하나가 바로 세션이다.

세션이 물론 아직도 사용되고는 있지만 잠시 후 이야기 할 Token 에 비하면 좀 더 전통적인 방식이라 할 수 있다.

![Session](/assets/images/posts/2024-04-18-cookie-session-token-storage/session.jpg)

1. 클라이언트가 서버에 로그인 요청.
2. 서버는 로그인을 처리(<span style="color: red;">authentication</span>), 세션을 *DB에 저장*하고 
   **Session ID 가 담긴 쿠키를 클라이언트에 반환**.
3. 클라이언트는 쿠키와 함께 서버에 필요한 작업을 요청.
4. 서버는 쿠키의 Session ID 를 저장한 DB 와 비교해 유효한지 검증. 유효한 세션이 확인되면 사용자 요청을 처리해 응답.

#### 2. Limitation of Session

세션은 서버가 저장하고 관리하기 때문에 클라이언트와 네트워크 과정에서 탈취로 인한 [XSS], [CSRF] 공격을 받을 수 있다는 것만 
조심하면 안전성이 매우 높다. 하지만 요즘은 JWT, OAuth 같은 Token 이 많이 언급되고 사용된다. 왜 오랫동안 잘 사용했고, 여전히 
많은 곳에 사용중인 세션의 상당수는 토큰에 대체되는 것일까?

어느 회사의 서비스가 기능이 많아져 서버가 수용할 수 있는 처리량의 한계가 넘어서면 어떻게 해야할까? 더 높은 컴퓨팅 파워가 필요하다. 
회사의 서비스가 잘 팔려 사용자가 많아져 처리량의 한계를 넘어서면 어떻게 해야할까? 마찬가지로 더 높은 텀퓨팅 파워가 필요하다.

더 높은 컴퓨팅 성능을 얻기 위해서는 어떻게 해야할까? 우선 가장 쉬운 방법은
<span style="color: red;">서버의 성능을 높이는 것</span>이다. 고성능 서버로 교체한다거나 AWS 와 같은 클라우드를 
사용한다면 더 높은 컴퓨팅 성능으로 업그레이드 요청을 하는 것이다. 이런 확장 방법을 
<span style="color: red;">**Scare-Up**</span> 이라 한다.

하지만 문제는 단일 컴퓨터의 성능을 높이는 것은 다음과 같은 한계를 갖는다.

- 성능이 높아질수록 향상폭 대비 비용 증가가 훨씬 크다.
- 단일 컴퓨터의 성능은 한계가 존재한다.
- 서버가 다운되면 전체 서비스가 죽는다.

<br>

그러면 어떻게 해야 비용도 줄이고, 컴퓨팅 성능의 한계도 극복하며, 서비스가 중단되는 최악의 사태를 막을 수 있을까?

분산 컴퓨팅을 사용하는 것이다. 요즘 백엔드에서 많이 사용하는 MSA(Microservice Architecture) 역시 분산 컴퓨팅을 
활용한 것이라 할 수 있다.

![Load Balancer](/assets/images/posts/2024-04-18-cookie-session-token-storage/load-balancer.png)

로드 밸런서를 Proxy 로 두고 뒤에 여러 개의 서버가 존재하면 인터넷 상에서는 하나의 서버처럼 보이지만 여러 개의 서버가 
역할을 분담할 수 있게 된다. 비용 대비 성능 증가가 효율적이며, 서버를 추가함에 따라 성능이 거의 정비례하게 오른다. 또한 
여러 서버가 존재하기 때문에 하나의 서버가 과부하로 다운되더라도 다른 서버가 있기 때문에 전체 서비스가 죽지 않는다. 작은 
서비스 별로 분산했을 경우 특정 서비스만 죽거나, 동일한 서버를 여러 개 분산했을 경우 다운된 서버가 재부팅 되고 정상화 되는 
동안만 다른 서버가 버텨주면 된다. 또한 실제 서버를 외부 네트워크에 노출시키지 않음으로써 마스킹 효과를 추가해 보안이 
강화되는 것은 덤으로 얻게 되는 효과다. 이런 확장 방법을 <span style="color: red;">**Scale-Out**</span> 이라 한다.

어떻게 로드밸런서가 클라이언트를 분산시키는지, 로드밸런싱 효과를 높이기 위해 어떻게 해야하는지와 같은 문제는 무시하고 세션에 
대해서만 이야기해보자.  
세션은 서버에서 관리한다고 했다. 그렇다면 클라이언트의 세션이 유지가 되기 위해서는 서버가 항상 클라이언트의 세션 정보를 알고 있어야 
한다는 문제가 생긴다. 이를 해결하기 위한 방법에는 어떤 것이 있을까?

<br>

__1 ) Sticky Session__

첫째, 로드밸런서가 클라이언트의 정보를 기억해 매번 동일한 서버로 연결시키는 것이다. 하지만 이 방법은 결국 로드밸런서의 부담이 
커지게 된다. 서버의 부담을 줄이고자 분산 서버를 도입하고 로드밸런서를 두었는데 이제 로드밸런서를 확장해야하는 상황이 되어버린 것이다.

둘째, 쿠키에 세션을 응답할 때 어떤 서버와 연결되었는지 정보를 추가해 로드밸런서가 이를 확인하고 동일한 서버로 연결시키는 것이다. 
로드밸런서가 연결할 서버를 기억할 필요 없이 쿠키를 확인만 하면 되니 부담이 줄어든다. 하지만 서버 마스킹 효과가 사라진다.

그리고 어떤 방법을 사용하던 연결된 서버가 다운될 경우 서비스가 죽지는 않지만 클라이언트는 세션을 잃어버리게 되는 문제가 발생한다.

<br>

__2 ) Session Clustering__

서버에 세션이 생성, 변경, 제거될 때 다른 서버에 전파해 모든 서버가 동일한 세션을 소유하는 것이다. 이 방법은 위 Sticky Session 이 
갖는 모든 문제를 해결하지만 다른 문제가 발생한다.

분산 서버가 여러 대일 경우 모든 서버에 세션을 전파해야하므로 네트워크 비용이 증가한다. 사용자 증가로 인한 서버 부담을 줄이기 위해 
분산 서버를 사용하지만 세션은 결국 Scale-Up 을 했을 때와 달라진 것이 없다. 모든 서버가 동일하게 모드 세션을 가져야한다. 
이는 결국 세션으로 인한 서버 부담을 증가시키는 문제를 발생시킨다. 또한 세션이 동기화 되기 이전에 클라이언트가 다른 서버로 접속될 
경우 세션을 잃은 것과 같은 상황이 발생한다는 문제가 있다.

<br>

__3 ) In-Memory Session Storage__

최근 가장 많이 사용되는 것은 세션만을 관리하기 위한 별도의 서버를 추가하는 것이다. 기존의 세션은 DB 에 저장하기 때문에 DB 의 부담 
또한 컸으며, 대부분의 서버가 RDBMS 를 사용하기 때문에 느리기까지 했다.

`Redis`와 `Memcached`는 In-Memory 캐싱 서버를 구축해 세션을 저장하고 관리한다. 따라서 매우 빠른 속도로 세션을 관리할 
수 있을 뿐 아니라, 더이상 로드밸런서는 세션을 구분할 필요 없이 로드밸런싱이라는 본래의 목적에만 집중하면 되고, 서버와 DB 역시 세션 
서버에게 질의만 하면 되기 때문에 부담이 줄어든다. 또한 위 Session Clustering 과 같이 동기화 문제도 존재하지 않는다. 
세션을 사용하는 MSA 시스템에서 세션을 관리하는 가장 보편적인 방법이다.

<br>

이제 우리는 세션이 유지되지 않을 수 있는 문제에 대해서는 해결을 했다. 하지만 접속자가 증가하면 관리해야할 세션이 증가하고, 어찌 
되었든 세션 서버의 부담이 커지는 것은 막을 수 없다. 세션 서버의 구입이라는 추가 비용 또는 AWS 와 같은 클라우드 환경을 이용할 경우 
추가 비용이 청구되는 것은 자체 서버와 막대한 인프라와 인력을 운용하는 IT 대기업이 아닌 이상 비용 추가를 감당해야한다.



<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "Using HTTP cookies." MDN Web Docs. Feb. 23, 2024, accessed Apr. 18, 2024, [MDN - HTTP cookies].
3. "Session vs Token Based Authentication." GeeksforGeeks. Jul. 4, 2022, accessed Apr. 18, 2024, [Session vs Token Based Authentication].


[MDN - HTTP cookies]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[Session vs Token Based Authentication]:https://www.geeksforgeeks.org/session-vs-token-based-authentication/
[XSS]:/security/2023/01/20/xss-cors-sql-injection.html#h-5-xsscross-site-scripting-
[CSRF]:/security/2023/01/20/xss-cors-sql-injection.html#h-3-csrfxsrf-cross-site-request-forgery-
