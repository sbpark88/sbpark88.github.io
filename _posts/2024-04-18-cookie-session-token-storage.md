---
layout: post
title: Cookie, Session, Token, and Web Storage API
subtitle: 
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [cookie, session, token, public key, private key, local storage, session storage, indexed db, 
       msa, load balancer, redis, memcached, encryption, decryption, jwt, oauth]
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
수 있다. 따라서 일반적인 정보 저장이 목적이라면 Modern APIs 인 [Web Storage API](#h-1-web-storage-api)
(localStorage, sessionStorage) 또는 [IndexedDB API](#h-2-indexed-db-api) 를 사용하는 것이 권장된다.

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
export const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find((str) => str.split('=')[0] === name);
  return cookie ? cookie.split('=')[1] : null;
};

export const getCookies = (...names) => names.map(getCookie);
```

```javascript
export const removeCookie = (name) =>
  (document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`);

export const removeCookies = (...names) => names.forEach(removeCookie);
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

세션이 물론 아직도 사용되고는 있지만 잠시 후 이야기 할 [Token](#h-2-token) 에 비하면 좀 더 전통적인 방식이라 할 수 있다.

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

---

### 3. Token 👩‍💻

#### 1. Public Key & Private Key

Session 이 서버에 부담을 주는 문제를 해결하기 위해 인증 정보를 서버가 아닌 클라이언트에 저장하고 관리하는 토큰 방식이 
많이 도입되고있다. 이 토큰 방식은 어떻게 작동하길래 클라이언트에 저장하고 관리해도 안전한 것일까? 
토큰을 이해하기 위해서는 우선 Public Key 와 Private Key 를 이해해야한다.

암호화는 크게 하나의 키로 암호화(Encryption)과 복호화(Decryption)을 모두 할 수 있는 대칭키(Symmetric Key)와 
두 개의 키가 하나의 쌍이 되어 하나의 키로 암호화를 하면 반대의 키로만 복구할 수 있는 비대칭키(Asymmetric Key)가 있다. 
이 비대칭키의 쌍을 이루는 키 중 하나를 Public Key 라 하고, 다른 하나를 Private Key 라 한다.

단순 비대칭키는 다음과 같다.

| A키                     | B키                     |
|------------------------|------------------------|
| A키로 데이터를 암호화           | A키로 암호화 한 데이터를 B키로 복호화 |
| B키로 암호화 한 데이터를 A키로 복호화 | B키로 데이터를 암호화           |

따라서 기본적으로 하나의 키 쌍에서 두 키는 서로 동일한 구조를 갖게 된다. 키 쌍을 만들어 하나를 배포하는 순간 배포되지 않은 
쪽이 Private Key 가 되는 것이고, 배포된 쪽이 Public Key 가 되는 구조다.

하지만 터미널로 키를 생성해보면 Private Key 가 Public Key 용량이 훨씬 크게 생성된다. 왜 그럴까? 일단, Private Key 
가 더 중요하고, Private Key 에만 필요한 기능이 추가되기 때문이다.

__Private Key 의 첫 번째 차이__

Public Key 는 공개되어 전송된다. 나의 신원을 증명하기를 원하는 곳에 수없이 많이 복제되어 전송될 것이다. 알고리즘이 크고 무거울 
수록 강력해지지만 용량이 증가하기 때문에 적당한 암호화 성능에 적당한 크기를 갖는 것이 좋다.

반면 Private Key 는 개인 또는 기업 단일 개채가 가지고 있기 때문에 신원 증명으로 사용할 수 있다. 신원을 증명한다는 것은 
단순히 데이터를 암호화 하는 것보다 더 중요한 기능이다. 따라서 어디 전송할 필요도 없을 뿐 아니라 더 강력한 알고리즘을 적용해 
신원 확인 기능을 강화하는 것이 좋기 때문에 더 크고 무거운 알고리즘을 사용한다.

따라서 일반적으로 Public Key 는 RSA 1024~4096 bit 정도의 알고리즘을 사용하고, Private Key 는 RSA 2048~8192 bit 의 
알고리즘을 사용한다. 이게 Public Key 와 Private Key 의 첫 번째 차이다.

<br>

__Private Key 의 두 번째 차이__

인증서 발급기관 등 앞서 일어나는 절차는 일단 무시하고 서버와 클라이언트 관점에서 설명해보자. 이제 서버는 세션 정보를 DB 에 저장하지 않고 
자신의 Private Key 로 암호화 해 클라이언트에게 서버에서 관리하던 인증 정보를 모두 기록해 넘겨주어 클라이언트가 관리하기로 했다고 하자. 
이제 인가된 범위라던가 유효 기간이라던가 하는 세션으로 관리하던 정보들이 클라이언트에게 전송될 것이다.

1. 클라이언트가 서버에게 로그인 요청을 보낸다.
2. 서버는 클라이언트에게 자신의 Private Key 로 암호화 한 데이터를 쿠키에 실어 보낸다.
3. 클라이언트는 이미 인증서 발급 기관을 통해 올바른 서버임을 확인 했지만, 서버의 Public Key 를 갖고 있기 때문에 중간에 네트워크 
   변경 등으로 서버의 접속 경로가 변경되더라도 해당 서버의 도메인이 보낸 응답인지 검증이 가능하다.
4. 클라이언트는 이제 서버와 빠르게 통신하기 위해 서버의 Public Key 로 자신의 PC 가 만든 대칭키를 암호화 해 쿠키와 함께 전송한다. 

클라이언트 입장에서는 서버의 Private Key 로 데이터를 입축했기 때문에 서버의 신원이 증명되는 효과를 갖는다.

클라이언트는 서버의 Private Key 를 가지고 있지 않으니 토큰을 변조하는 것은 쉽지 않다. 하지만 Public Key 를 가지고 있기 때문에 
수없이 변조하다 보면 Public Key 로 정상 해독되는 변조된 토큰 데이터를 얻을 수 있다. 이렇게 유효기간이 늘어나거나 인가된 범위가 늘어난 
변조된 토큰을 보냈을 때 서버는 토큰만 확인해서는 변조 여부를 알 수 없다. 서버는 세션과 달리 토큰을 보관하고 상태관리를 하지 않기 때문이다. 
결국 서버는 이것이 변조되지 않았음을 검증하기 위해서 세션처럼 DB 에 토큰 정보를 기록하거나, 토큰에 변조할 수 없는 무언가를 추가해야한다.

그래서 추가된 기능이 <span style="color: red;">서명(Signature)</span>이다. 

서명을 위해 Private Key 에 SHA-256, SHA-512 와 같은 해시 함수와 `secret-key`를 추가한다. 그러면 Private Key 는 토큰을 
생성할 때 해싱 결과를 서명으로 추가한다. 해시 함수는 복호화가 불가능하기 때문에 클라이언트에서 변조하는 것이 불가능하다. 이제 서버는 
클라이언트가 보낸 토큰을 다시 해싱해 추가된 서명의 일치 여부를 확인하면 토큰의 변조 유무를 확인할 수 있게 되는 것이다.

즉, 단순히 비대칭키로만 사용한다면 한 쌍이 되는 두 개의 키를 생성 후 배포되는 순간 Private/Public Key 가 되어야하지만, 
이런 차이점으로 인해 실제로는 생성하는 순간 부터 Private/Public Key 가 정해지고 Private Key 의 용량이 더 큰 것이다.

#### 2. Token

이제 토큰이 실제로 어떻게 작동하는지를 확인해보자.

![Token](/assets/images/posts/2024-04-18-cookie-session-token-storage/token.jpg)

1. 클라이언트가 서버에 로그인 요청.
2. 서버는 로그인을 처리(<span style="color: red;">**authorization**</span>), 서버의 Private Key 로 생성한 
   **인가/만료시간 등 자세한 인증 정보가 담긴 토큰을 클라이언트에 반환**(JWT, OAuth 의 형태이며 중요한 것은 이 과정에서 
   authentication 처리가 아닌 authorization 처리를 한다는 것이다).
3. 클라이언트는 토큰과 함께 서버에 필요한 작업을 요청.
4. 서버는 토큰의 서명이 유효한지 검증. 서명이 유효하다면 Public Key 로 토큰에 기록된 자세한 인증 정보를 확인해 토큰이 
   유효한지 확인 후 사용자 요청을 처리해 응답.

> 이제 서버는 매번 [Session](#h-1-session) 이 저장된 DB 전체를 조회해 검증하는 대신 사용자가 보관하고 있던 토큰의 
> 유효 여부만 확인 후 요청을 처리하기 때문에 서버의 부담이 줄어든다. 클라이언트는 서버의 비밀키로 암호화된 데이터를 통해 서버의 
> 신원을 확인하고 신뢰할 수 있으며, 서버는 자신의 서명을 추가해 토큰이 변조되지 않았음을 확인하고 신뢰할 수 있기 때문이다.

하지만 토큰에도 취약점은 존재한다. 서버에서는 토큰에 관한 어떤 정보도 보관하고 관리하지 않기 때문에 
<span style="color: red;">토큰 자체의 탈취에 취약</span>하다. 그렇기 때문에 서버는 *짧은 시간을 갖는 Access Token* 과, 
*갱신에 사용할 Refresh Token 을 발행*한다. 혹시라도 Access Token 이 유출되더라도 Refresh Token 이 없다면 탈취한 토큰을 
지속적으로 사용할 수 없도록 하기 위함이다.

일반적으로 Access Token 은 분~시간 단위를 갖고, Refresh Token 은 일~주 단위를 갖는다. 그리고 일반적으로 로그인하는 
환경에 따라서도 토큰의 유효시간이 다른데, 앱에서 로그인 되는 경우 스마트폰은 개인 기기이기 때문에 유효시간이 비교적 긴 토큰이 
발행되는 반면, 웹에서 로그인 되는 경우 공용 기기일 수 있기 때문에 유효시간이 매우 짧은 토큰이 발행된다. 

```header
{
    method: "GET",
    headers: {
        "Authorization": "Bearer ${JWT_TOKEN}"
    }
}
```

일반적으로 이런 형태로 해더에 `Bearer ` prefix 가 포함된 토큰을 실어 보낸다. 

---

### 4. Session vs Token 👩‍💻

| Criteria                                                | Session authentication method | Token-based authentication method                     |
|---------------------------------------------------------|-------------------------------|-------------------------------------------------------|
| authentication 정보 저장                                    | 서버(일반적으로 크기가 작은 JSON 포맷)      | 클라이언트(크기가 큰 토큰)                                       |
| authorization 을 위해 클라이언트가 서버에 전송하는 것                    | 쿠키(Session ID 가 포함된)          | 토큰                                                    |
| authorization 검증을 위해 서버에서 하는 것                          | 세션 DB 를 조회해 유효성 검증            | 토큰을 복호화 하고 서멍을 검증                                     |
| 서버 관리자가 사용자의 로그아웃, authentication 정보 변경과 같은 보안 작업 가능 여부 | 가능(세션이 서버에 저장)                | 불가능(토큰이 클라이언트 기기에 저장)                                 |
| 취약점                                                     | [MITM], [CSRF]                | [MITM], 토큰 탈취, [breaches of the secret key][손상된 개인 키] |
| 선호하는 곳                                                  | User-to-server                | Server-to-server                                      |


일반적으로 세션은 Application 에서 사용되고 토큰은 server-to-server 통신에서 선호된다. 그 이유는 토큰은 서버가 아닌 
클라이언트에서 관리하고, 서버는 변조 여부와 유효성만 검증하기 때문에 [Limitation of Session](#h-2-limitation-of-session) 
의 모든 문제점에서 해방된다. 특히 MSA 같은 환경에서 server-to-server 통신에서 클라이언트의 상태를 유지할 필요 없이 
각 요청을 독립적으로 처리할 수 있으며(<span style="color: red;">stateless</span>), 서버 간에 토큰을 전송하고 검증만 하면 
되므로 다수의 서버가 사용자의 authentication/authorization 을 쉽게 공유할 수 있어 서버의 확장성과 유연성을 
향상(<span style="color: red;">scalability</span>)시키기 때문이다.

여전히 세션만 사용하는 곳도 있으며, 토큰만 사용하는 곳도 있고 섞어서 사용하는 곳도 있다. 특히 금융권 같이 다중 접속을 
재한하는 경우는 세션이 반드시 필요하다. 반면 접속 기기를 제한할 필요가 크지 않은 경우 멀티 디바이스에 따른 세션 관리 부담이 
더욱 커지기 때문에 세션 대신 토큰을 사용하면 서버의 부담을 크게 줄일 수 있다. 물론, 접속 기기를 제한해야해서 세션을 사용하는 경우도 
server-to-server 통신은 토큰을 사용하면 통신 비용을 크게 줄일 수 있어 세션만 사용하는 것보다 효율적이다.

네트워크 환경이 좋지 못하며 모바일 기기인 경우 토큰이 세션보다 용량이 커 성능에 영향을 미칠 수 있는 매우 특수한 상황만 
아니라면 토큰이 갖는 장점이 크기 때문에 많은 서버가 토큰을 도입하는 것이다.

---

### 5. Web Storage 👩‍💻

#### 1. Web Storage API

브라우저가 데이터를 저장하는 방법은 크게 Web Storage API 와 IndexedDB API 둘로 나뉜다. Web Storage API 는 브라우저에
저장되며 브라우저에 의해 관리되며 다음과 같은 특징을 갖는다.

- 도메인 단위로 저장(쿠키와 동일)
- 브라우저마다 다르지만 5~10MB 를 저장한다(쿠키와 달리 사이트별 개별 용량이 아닌 브라우저 전체의 용량이다)
- <span style="color: red;">영구 저장 가능</span>(session 단위 또는 영구 저장)

쿠키와 비교하면 엄청나게 큰 용량을 저장할 수 있지만 사이트별로 주어지는 용량은 아닌데다 넉넉한 용량도 아니다. 하지만 쿠키에 비해서는 
꽤 넉넉한 용량을 사용할 수 있을 뿐 아니라 쿠키는 모든 네트워크 요청에 포함되기 때문에 통신에 불필요한 데이터는 `Local Storage` 또는 
`Session Storage` 에 저장하는 것이 권장된다.

Local Storage 와 Session Storage 의 사용법은 동일하다. 단지 Session Storage 는 세션이 만료되면 자동으로 삭제되는 반면, 
Local Storage 는 별도로 제거하지 않는 한 영구 저장이 가능하다.

사용 가능한 주요 메서드는 다음과 같다.

- `getItem(key:)`: 데이터 조회
- `setItem(key:value:)`: 데이터 추가
- `removeItem(key:)`: 데이터 제거
- `clear()`: 스토리지 초기화

그리고 Web Storage 에 데이터를 저장할 때 모든 데이터는 JSON 문자열로 변환해 저장하도록 해야한다. 그렇지 않으면 저장된 데이터를 
가져올 때, 원본 데이터가 객체였는지도 구분해 다시 JavaScript 객채로 파싱하거나 에러가 발생할 때마다 처리하도록 예외처리를 해야하기 
때문이다.

```javascript
const setStorage = (storage) => (key, value) => storage.setItem(key, JSON.stringify(value));

export const setLocalStorage = setStorage(localStorage);
export const setSessionStorage = setStorage(sessionStorage);

const getStorage = (storage) => (key) => storage.getItem(key);

export const getLocalStorage = getStorage(localStorage);
export const getSessionStorage = getStorage(sessionStorage);

const removeStorage = (storage) => (key) => storage.removeItem(key);

export const removeLocalStorage = removeStorage(localStorage);
export const removeSessionStorage = removeStorage(sessionStorage);

const clearStorage = (storage) => () => storage.clear();

export const clearLocalStorage = clearStorage(localStorage);
export const clearSessionStorage = clearStorage(sessionStorage);
```

#### 2. IndexedDB API

IndexedDB API 는 MSW(Mock Service Worker) 처럼 Web Worker 를 사용해 데이터를 저장하는 API 로 비동기 처리되어 성능에 
영향을 미치지 않는 **Low Level Local Storage** 다. 이것은 아이폰으로 치면 CoreData, SwiftData, Realm 이런 것과 같은데 
RDBMS 도 아닌데다 NoSQL 도 아니지만 그래도 NoSQL 쪽에 조금 더 가깝다. Firebase Storage 또는 Realm, MongoDB 를 다루듯 
스토리지를 다룬다. 

IndexedDB API 는 다음과 같은 특징을 갖는다.

- 도메인 단위로 저장
- 브라우저마다 다르지만 1TB 디스크 기준으로 600GB 까지 확장 가능
- <span style="color: red;">영구 저장 가능</span>(persistent 설정 가능)

기본적으로 세션 단위로 저장되지는 않아 세션이 끊겨도 데이터는 유효하다. 디스크가 부족할 경우 브라우저나 운영체제에 의해 정리될 수 있으나 
`persistent`를 지정하면 브라우저마다 다르지만 1GB 가량 영구 저장이 가능하다.

#### 3. IndexedDB Examples

```html
<form id="customerInputForm">
  <label for="userId">아이디:</label>
  <input type="text" id="userId" name="userId" />
  <label for="name">이름:</label>
  <input type="text" id="name" name="name" />
  <button type="submit" class="btn--green">저장</button>
  <button type="reset">새로고침</button>
</form>
<ul id="customerList"></ul>
```

```css
input {
  outline: none;
  border: none;
  padding: 1px 0;
}

#customerInputForm,
#customerList {
  margin: 10px 0;
  padding: 0;
  color: black;
  font-weight: 700;
}

#customerInputForm,
#customerList li {
  height: 40px;
  padding: 10px;
  margin: 10px 0;
  background-color: #8aadc1;
  box-sizing: border-box;
  border: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
}

#customerList li span {
  width: 70px;
}

#customerInputForm input,
#customerList input {
  width: 150px;
  margin: 0 10px 0 5px;
  user-select: none;
}

#customerList li input {
  background-color: #bcbcbc;
}

#customerList li.edit input {
  background-color: #fff;
}

#customerInputForm button,
#customerList button {
  margin-right: 5px;
  padding: 3px 15px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
}

#customerList.edit button {
  display: none;
}
#customerList li.edit button {
  display: block;
}
#customerList li button.hidden {
  display: none;
}
button.btn--red {
  background-color: #ff3b3b;
}
button.btn--green {
  background-color: #20e62a;
}
```

```javascript
const customerForm = document.querySelector('#customerInputForm');
const customerList = document.querySelector('#customerList');

const DATABASE_NAME = 'customer-database';
const TABLE_NAME = 'customer';

let db;
const actions = createActions();

const DBOpenRequest = indexedDB.open(DATABASE_NAME);

DBOpenRequest.onerror = (event) => {
  customerList.innerHTML = `<li>Error loading database.</li>`;
  console.error(event.target.error);
};

// 버전 업그레이드가 필요하거나 최초 생성시 수행되는 코드로 테이블, 컬럼과 같은 데이터베이스 구조를 정의한다.
DBOpenRequest.onupgradeneeded = (event) => {
  db = event.target.result;

  // 스토어 생성(테이블 생성에 해당)
  // index 를 생성해서 검색으로 사용할 수는 없다. 즉, autoIncrement 를 사용해 검색은 할 수 없고,
  // 스토어를 관리하기 위한 primaryKey 또는 key로 openCursor 에서 검색 결과에 나오는
  // primaryKey 또는 key 의 값이 value 에 등록된 값과 동일하다.
  const objectStore = db.createObjectStore(TABLE_NAME, {
    keyPath: 'id',
    autoIncrement: true,
  });

  // 인덱스 생성(컬럼 생성에 해당)
  objectStore.createIndex('userId', 'userId', { unique: true });
  objectStore.createIndex('name', 'name', { unique: false });
  customerList.innerHTML += '<li>Object store created.</li>';
};

DBOpenRequest.onsuccess = (event) => {
  customerList.innerHTML += '<li>Database initialised.</li>';
  db = DBOpenRequest.result; // equal to 'event.target.result'
  actions.load();
};

function createActions() {
  let [prevUserId, prevUserName] = [null, null];

  function idValidation(userId) {
    if (userId.trim().length < 5) {
      alert('아이디는 5자 이상 입력해주세요');
      return false;
    }
    return true;
  }

  function addCustomer() {
    const customer = {
      userId: customerForm[0].value,
      name: customerForm[1].value,
    };
    if (!idValidation(customer.userId)) return;
    // 트랜잭션을 열 스토어 이름 배열, 트랜잭션 모드를 지정
    const transaction = db.transaction([TABLE_NAME], 'readwrite');
    // 트랜잭션에 열린 스토어 배열 중 단일 스토어 접근
    const objectStore = transaction.objectStore(TABLE_NAME);
    // 요청 처리
    objectStoreRequest = objectStore.add(customer);
    objectStoreRequest.onsuccess = (event) => {
      customerForm.reset();
    };

    objectStoreRequest.onerror = (event) => {
      debugger;
      let message =
          event.target.error.code === 0
              ? '아이디는 중복될 수 없습니다'
              : '저장을 실패했습니다';
      alert(message);

      console.error({
        Code: event.target.error.code,
        name: event.target.error.name,
        Message: event.target.error.message,
      });
    };
  }

  function loadCustomers() {
    customerList.innerHTML = '';

    const objectStore = db.transaction(TABLE_NAME).objectStore(TABLE_NAME);
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor === null) return;
      // 스토어에 'Key'가 하나이므로 cursor.primaryKey, cursor.key, value.id 3개는 모두 동일한 값이다.
      const { id, userId, name } = cursor.value;
      customerList.innerHTML += `
      <li>
        <span data-id="${id}">ID: ${id}</span>
        아이디: <input type="text" value="${userId}" readonly />
        이름: <input type="text" value="${name}" readonly />
        <button type="button" data-type="editMode">수정</button>
        <button type="button" data-type="delete" class="btn--red">삭제</button>
        <button type="button" data-type="cancel" class="hidden">취소</button>
        <button type="button" data-type="edit" class="btn--green hidden">저장</button>
      </li>
      `;

      // Move on to the next cursor item
      cursor.continue();
    };

    request.onerror = (event) => {
      customerList.innerHTML = '<li>Store access error</li>';
      console.error(event.target.error);
    };
  }

  function toggleEditMode({ parentEl }) {
    const [, userId, name, editModeBtn, deleteBtn, cancelBtn, editBtn] = [
      ...parentEl.children,
    ];
    [customerList, parentEl].forEach((el) => el.classList.toggle('edit'));
    userId.readOnly = !userId.readOnly;
    name.readOnly = !name.readOnly;
    [editModeBtn, deleteBtn, cancelBtn, editBtn].forEach((el) =>
        el.classList.toggle('hidden')
    );
  }

  function openEditMode({ parentEl }) {
    const [, userId, name] = [...parentEl.children];
    prevUserId = userId.value;
    prevUserName = name.value ?? null;
    toggleEditMode({ parentEl });
  }

  function cancelEditMode({ parentEl }) {
    const [, userId, name] = [...parentEl.children];
    userId.value = prevUserId && prevUserId;
    name.value = prevUserName && prevUserName;
    [prevUserId, prevUserName] = [null, null];
    toggleEditMode({ parentEl });
  }

  function editCustomer({ id, userId, name }) {
    if (!idValidation(userId)) return;
    const objectStore = db
        .transaction(TABLE_NAME, 'readwrite')
        .objectStore(TABLE_NAME);
    const updateRequest = objectStore.put({ id, userId, name });
    updateRequest.onsuccess = (event) => {
      loadCustomers();
      customerList.classList.toggle('edit');
    };
  }

  function deleteCustomer({ id }) {
    const objectStore = db
        .transaction(TABLE_NAME, 'readwrite')
        .objectStore(TABLE_NAME);
    const deleteRequest = objectStore.delete(id); // primaryKey 로 삭제
    deleteRequest.onsuccess = (event) => loadCustomers();

    // 아이템 특정 값으로 삭제하고 싶을 경우 스토어로부터 index 를 생성하고 값을 검색해
    // 검색된 아이템으로부터 primaryKey 를 가져와 삭제.
    /*
    const nameRequest = objectStore.index('name').openCursor(name);
    nameRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor ===null) return;
      objectStore.delete(cursor.primaryKey)
      // cursor.continue();  // 복수 삭제일 경우
    };
    */
  }

  return {
    add: addCustomer,
    load: loadCustomers,
    editMode: ({ parentEl }) => openEditMode({ parentEl }),
    edit: ({ id, userId, name }) => editCustomer({ id, userId, name }),
    cancel: ({ parentEl }) => cancelEditMode({ parentEl }),
    delete: ({ id }) => deleteCustomer({ id }),
  };
}

customerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  actions.add();
});
customerForm.addEventListener('reset', actions.load);

customerList.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target.tagName !== 'BUTTON') return;
  const li = event.target.parentElement;
  const [id, userId, name, parentEl] = [
    parseInt(li.firstElementChild.dataset.id),
    li.children[1].value,
    li.children[2].value,
    li,
  ];
  const type = event.target.dataset.type;
  actions[type]({ id, userId, name, parentEl });
});
```

`transaction` 메서드는 string 으로 단일 테이블 또는 배열로 여러 테이블을 한 번에 트랙잭션으로 열 수 있으나, 
`objectStore` 메서드는 열린 트랙잭션 중에서 단일 테이블을 열어서 작업한다.

스토어를 연 후 CRUD 에 사용하는 메서드는 다음과 같다.

- C: `add` 메서드
- R: `cursor` 또는 `index` 메서드로 인덱스를 생성 후 `get`이나 `getAll` 메서드 접근
- U: `put` 메서드
- D: `delete` 메서드

`store`를 생성할 때 반드시 `key`를 하나 지정해야하고 이것이 하나이면 기본적으로 `primaryKey`로 사용된다. 하지만 
이 Key 는 데이터의 Update, Delete 와 같은 작업을 할 때 필요한 값으로, autoIncrement 로 설정한 경우 직접 
컬럼에 해당하는 `index`를 생성한 것이 아니기 때문에 `index`메서드를 사용할 수 없음에 주의한다. 

<style>
input {
  outline: none;
  border: none;
  padding: 1px 0;
}

#customerInputForm,
#customerList {
  margin: 10px 0;
  padding: 0;
  color: black;
  font-weight: 700;
}

#customerInputForm,
#customerList li {
  height: 40px;
  padding: 10px;
  margin: 10px 0;
  background-color: #8aadc1;
  box-sizing: border-box;
  border: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
}

#customerList li span {
  width: 70px;
}

#customerInputForm input,
#customerList input {
  width: 150px;
  margin: 0 10px 0 5px;
  user-select: none;
}

#customerList li input {
  background-color: #bcbcbc;
}

#customerList li.edit input {
  background-color: #fff;
}

#customerInputForm button,
#customerList button {
  margin-right: 5px;
  padding: 3px 15px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
}

#customerList.edit button {
  display: none;
}
#customerList li.edit button {
  display: block;
}
#customerList li button.hidden {
  display: none;
}
button.btn--red {
  background-color: #ff3b3b;
}
button.btn--green {
  background-color: #20e62a;
}
</style>

<form id="customerInputForm">
  <label for="userId">아이디:</label>
  <input type="text" id="userId" name="userId" />
  <label for="name">이름:</label>
  <input type="text" id="name" name="name" />
  <button type="submit" class="btn--green">저장</button>
  <button type="reset">새로고침</button>
</form>
<ul id="customerList"></ul>

<script>
const customerForm = document.querySelector('#customerInputForm');
const customerList = document.querySelector('#customerList');

const DATABASE_NAME = 'customer-database';
const TABLE_NAME = 'customer';

let db;
const actions = createActions();

const DBOpenRequest = indexedDB.open(DATABASE_NAME);

DBOpenRequest.onerror = (event) => {
  customerList.innerHTML = `<li>Error loading database.</li>`;
  console.error(event.target.error);
};

DBOpenRequest.onupgradeneeded = (event) => {
  db = event.target.result;

  const objectStore = db.createObjectStore(TABLE_NAME, {
    keyPath: 'id',
    autoIncrement: true,
  });

  objectStore.createIndex('userId', 'userId', { unique: true });
  objectStore.createIndex('name', 'name', { unique: false });
  customerList.innerHTML += '<li>Object store created.</li>';
};

DBOpenRequest.onsuccess = (event) => {
  customerList.innerHTML += '<li>Database initialised.</li>';
  db = DBOpenRequest.result;
  actions.load();
};

function createActions() {
  let [prevUserId, prevUserName] = [null, null];

  function idValidation(userId) {
    if (userId.trim().length < 5) {
      alert('아이디는 5자 이상 입력해주세요');
      return false;
    }
    return true;
  }

  function addCustomer() {
    const customer = {
      userId: customerForm[0].value,
      name: customerForm[1].value,
    };
    if (!idValidation(customer.userId)) return;
    const transaction = db.transaction([TABLE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(TABLE_NAME);
    objectStoreRequest = objectStore.add(customer);
    objectStoreRequest.onsuccess = (event) => {
      customerForm.reset();
    };

    objectStoreRequest.onerror = (event) => {
      debugger;
      let message =
        event.target.error.code === 0
          ? '아이디는 중복될 수 없습니다'
          : '저장을 실패했습니다';
      alert(message);

      console.error({
        Code: event.target.error.code,
        name: event.target.error.name,
        Message: event.target.error.message,
      });
    };
  }

  function loadCustomers() {
    customerList.innerHTML = '';

    const objectStore = db.transaction(TABLE_NAME).objectStore(TABLE_NAME);
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor === null) return;
      const { id, userId, name } = cursor.value;
      customerList.innerHTML += `
      <li>
        <span data-id="${id}">ID: ${id}</span>
        아이디: <input type="text" value="${userId}" readonly />
        이름: <input type="text" value="${name}" readonly />
        <button type="button" data-type="editMode">수정</button>
        <button type="button" data-type="delete" class="btn--red">삭제</button>
        <button type="button" data-type="cancel" class="hidden">취소</button>
        <button type="button" data-type="edit" class="btn--green hidden">저장</button>
      </li>
      `;

      cursor.continue();
    };

    request.onerror = (event) => {
      customerList.innerHTML = '<li>Store access error</li>';
      console.error(event.target.error);
    };
  }

  function toggleEditMode({ parentEl }) {
    const [, userId, name, editModeBtn, deleteBtn, cancelBtn, editBtn] = [
      ...parentEl.children,
    ];
    [customerList, parentEl].forEach((el) => el.classList.toggle('edit'));
    userId.readOnly = !userId.readOnly;
    name.readOnly = !name.readOnly;
    [editModeBtn, deleteBtn, cancelBtn, editBtn].forEach((el) =>
      el.classList.toggle('hidden')
    );
  }

  function openEditMode({ parentEl }) {
    const [, userId, name] = [...parentEl.children];
    prevUserId = userId.value;
    prevUserName = name.value ?? null;
    toggleEditMode({ parentEl });
  }

  function cancelEditMode({ parentEl }) {
    const [, userId, name] = [...parentEl.children];
    userId.value = prevUserId && prevUserId;
    name.value = prevUserName && prevUserName;
    [prevUserId, prevUserName] = [null, null];
    toggleEditMode({ parentEl });
  }

  function editCustomer({ id, userId, name }) {
    if (!idValidation(userId)) return;
    const objectStore = db
      .transaction(TABLE_NAME, 'readwrite')
      .objectStore(TABLE_NAME);
    const updateRequest = objectStore.put({ id, userId, name });
    updateRequest.onsuccess = (event) => {
      loadCustomers();
      customerList.classList.toggle('edit');
    };
  }

  function deleteCustomer({ id }) {
    const objectStore = db
      .transaction(TABLE_NAME, 'readwrite')
      .objectStore(TABLE_NAME);
    const deleteRequest = objectStore.delete(id);
    deleteRequest.onsuccess = (event) => loadCustomers();
  }

  return {
    add: addCustomer,
    load: loadCustomers,
    editMode: ({ parentEl }) => openEditMode({ parentEl }),
    edit: ({ id, userId, name }) => editCustomer({ id, userId, name }),
    cancel: ({ parentEl }) => cancelEditMode({ parentEl }),
    delete: ({ id }) => deleteCustomer({ id }),
  };
}

customerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  actions.add();
});
customerForm.addEventListener('reset', actions.load);

customerList.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target.tagName !== 'BUTTON') return;
  const li = event.target.parentElement;
  const [id, userId, name, parentEl] = [
    parseInt(li.firstElementChild.dataset.id),
    li.children[1].value,
    li.children[2].value,
    li,
  ];
  const type = event.target.dataset.type;
  actions[type]({ id, userId, name, parentEl });
});
</script>


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
[MITM]:https://nordvpn.com/ko/blog/mitm/
[손상된 개인 키]:https://www.ssl.com/ko/%EC%9E%90%EC%A3%BC-%EB%AC%BB%EB%8A%94-%EC%A7%88%EB%AC%B8/%EC%86%90%EC%83%81%EB%90%9C-%EA%B0%9C%EC%9D%B8-%ED%82%A4/
