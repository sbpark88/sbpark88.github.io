---
layout: post
title: Cookie, Session, Token, and Web Storage API
subtitle: 
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [cookie, session, token, public key, private key, local storage, session storage]
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
