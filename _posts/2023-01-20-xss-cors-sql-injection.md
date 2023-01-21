---
layout: post
title: Web Security 
subtitle: XSS, XSRF(CSRF), SQL Injection and OWASP/WebGoat
categories: security
tags: [web security, xsrf, csrf, csrf token, sql injection, ddos, webgoat, xss, v-html, sop, cors]
---

### 1. OWASP/WebGoat 👩‍💻

[Open Web Application Security Project](https://owasp.org) 는 웹 보안 취약점을 주로 다루는 비영리 오픈 커뮤니티로 
신뢰할 수 있는 앱과 API 를 개발하도록 돕는다. 꾸준히 이곳에서 공개하는 웹 보안 취약점 TOP10 만 제대로 처리해도 상당한 효과를 볼 수 
있을 것이라 생각한다. 참고로 [OWASP Github](https://github.com/OWASP_) 는 이곳에서 운영하는 깃허브이다.

그리고 웹 취약점에 대한 기본 학습 및 테스트를 위해 [OWASP WebGoat](https://github.com/WebGoat/WebGoat) 를 이용하면 
편리하다. OWASP 에서도 소개하는 방법으로 WebGoat 는 테스트 할 수 있는 웹 서버로 `Docker` 또는 `jar`로 배포된다.

---

### 2. SQL Injection 👩‍💻

- 공격 대상 : Database
- 매개체 : 없음
- 방식 : SQL 에 예상되는 값이 아닌 공격 목적의 값을 보내 데이터를 탈취/삭제/변조한다. SQL 문장이 컴파일 되기 전 
        String 상태일 때 입력되는 데이터에 취약한 점을 이용한 공격이다.

#### 1. String SQL Injection

```sql
SELECT * FROM user_data WHERE first_name = 'John' AND last_name = '" + lastName + "';
```

위 쿼리에 다음과 같은 공격을 하면 모든 데이터를 탈취할 수 있다.

![String SQL Injection 1](/assets/images/posts/2023-01-20-xss-cors-sql-injection/string-sql-injection-1.png)

```sql
SELECT * FROM user_data WHERE first_name = 'John' and last_name = '' or '1' = '1'
```

![String SQL Injection 2](/assets/images/posts/2023-01-20-xss-cors-sql-injection/string-sql-injection-2.png)

<br>

비슷하게 다음과 같은 공격도 가능하다.

![String SQL Injection 3](/assets/images/posts/2023-01-20-xss-cors-sql-injection/string-sql-injection-3.png)

![String SQL Injection 4](/assets/images/posts/2023-01-20-xss-cors-sql-injection/string-sql-injection-4.png)

#### 2. Numeric SQL Injection

![Numeric SQL Injection](/assets/images/posts/2023-01-20-xss-cors-sql-injection/numeric-sql-injection.png)


#### 3. How to prevent?

요즘은 대게 위에 소개된 방식으로는 SQL Injection 이 불가능하다. SQL 실행을 위해 ORM 같은 것을 이용하기 때문에 
대부분의 쉬운 공격은 실행 이전에 차단된다. 하지만 어떤 식으로 공격이 이루어지는지 알아야 대응을 할 수 있으니 반드시 
기본부터 알아야한다. 물론 라이브러리를 신용하는 것 만으로 충분하지 않으므로, 높은 보안이 요구되는 경우 추가적인 장치가 
필요할 것이다.

---

### 3. XSRF(CSRF) 👩‍💻

- 공격 대상 : WAS, Database
- 매개체 : Browser
- 방식 : 서버가 이미 인증된 사용자 브라우저의 요청을 신용하는 것을 이용한 공격이다.

Cross-site Request Forgery 로 사용자의 의지와 무관하게 서버가 이미 인증된 브라우저를 신용하는 것을 이용해 
공격한다. 주문하지 않은 물건을 구매하도록 할 수도 있고, 계정의 비밀번호를 변경하거나 기록을 삭제하거나 사용자가 
하지 않은 송금을 할 수도 있다.

#### How to prevent?

__1 ) Referer 검증__

HTTP Request Header 에 포함된 [Referer][MDN - Referer] (요청자의 절대 주소 또는 일부 주소로 
`document.referrer`를 통해 쉽게 확인할 수 있다) 정보를 검증한다

하지만 이것은 쉽게 조작이 가능하기 때문에 크게 도움 되는 방식은 아니다.

<br>

__2 ) CSRF Token__

송금이나 정보 변경과 같은 민감한 정보를 다룰 때 엄청난 크기의 난수 토큰을 발행해 화면을 응답할 때 `form` 에 hidden 
으로 넣어두거나 `POST` 요청 시 함께 응답할 수 있도록 뷰 페이지를 보내준다. 이렇게 하면 `Cookie` 나 `Local Stroage` 
등에 저장하지 않으므로 XSS 에 의한 탈취가 어려워진다. 클라이언트는 매 요청마다 이를 함께 보내야하고, 서버는 이를 
검증한다. 그리고 이러한 토큰은 각 뷰 페이지마다 발행된 후 필요가 없어지면 즉시 삭제된다. 일반적으로 `JWT` 토큰 또는 
`OAuth 2.0` 인증 토큰 등을 Local Storage 에 저장하는데 이는 XSS 에 의해 탈취되기 쉽기 때문에 `CSRF Token` 
으로 추가적인 보안 조치를 하는 것이다. 따라서 이 토큰은 예측할 수 없어야한다.

CSRF Token 관련해서는 [PortSwigger - CSRF][PortSwigger - CSRF] 와 
[PortSwigger - CSRF Token Validation][PortSwigger - CSRF Token Validation] 를 참고하면 좋을 것 같다.

---

### 4. DDoS 👩‍💻

- 공격 대상 : WAS
- 매개체 : Client PC
- 방식 : 많은 컴퓨터를 감염시켜 짧은 ping 으로 동시 다발적으로 요청해 서버에 과부하를 일으켜 장애를 유발하는 공격이다.

Distributed Denial of Service 공격은 네트워크(계층 3), 전송(계층 4), 표현(계층 6) 및 애플리케이션(계층 7) 계층에서 
가장 많이 나타나며 서비스의 장애를 일으키는 것이 목적이다.

#### How to prevent?

사실상 DDoS 공격은 공격 당하는 서버를 감염시키는 것이 아닌 다수의 클라이언트를 감염시키는 것이라 서버 측에서 예방을 
할 수는 없고 방어만 가능하다.

__1 ) DDoS 패턴 탐지__

정상 트래픽과 비정상 트래픽을 분석하고 빠르게 탐지해 정상적인 트래픽만 수용할 수 있도록 해 수용 가능한 트래픽을 제한한다.

<br>

__2 ) CDN 등을 이용한 분산__

Content Delivery Network 의 본래 목적은 세계 여러 곳에 분산시킴으로써 페이지 로드 시간을 단축시키고, 대역폭 비용을 
절감하며, 가용성을 높이는 것이다. 즉, CDN 을 구축한다는 것은 공격의 대상을 한 곳에 집중할 수 없도록 해 DDoS 공격에 의해 전체 
서비스가 마비되는 것을 방지한다.

---

### 5. XSS 👩‍💻

- 공격 대상 : Client
- 매개체 : Browser
- 방식 : 사용자가 특정 웹 사이트를 신용하는 것을 이용한 공격이다.


#### Difference between `XSS` and `CSRF`

XSS 와 CSRF 는 모두 사용자의 브라우저를 매개체로 한다는 점은 동일하다. 하지만 CSRF 는 신뢰하는 서버를 대상으로
공격하므로 `사용자의 인증된 세션을 악용`한다. 반면 XSS 는 `브라우저 자체에 대해 공격`한다.

- CSRF 공격 : 물품 구매나 송금과 같은 요청을 서버로 보낸다. 또는 공격자가 직접 CSRF 를 이용해 정보를 빼와 탈취한다.
- CSRF & XSS 공격 : CSRF 를 이용해 정보를 빼오거나 수정 후 XSS 를 이용해 공격자에게 전송해 탈취한다.
- XSS 공격 : 브라우저에 저장된 계정 정보나 세션 정보 등을 공격자에게 전송해 탈취한다.


`v-html` 또는 `findDOMNOde`, `ref` 와 같은 `escape hatch`는 Vue 에게 XSS 공격에 다시 취약하도록 만든다.

XSS 공격에 가장 취약한 DOM 기반 XSS 를 막기 위해서 가급적 HTML 코드를 직접 출력하는 것을 피해야하며, 완벽히 막기는 힘드니
[vue-sanitize](https://www.npmjs.com/package/vue-sanitize) 또는
[sanitize-html](https://www.npmjs.com/package/sanitize-html) 과 같은 라이브러리를 사용하는 것도 좋은 방법이다.


<br><br>

---
Reference

1. “OWASP Top Ten.” OWASP. accessed Jan. 20, 2023, [OWASP Top Ten](https://owasp.org/www-project-top-ten/).
2. “사이트 간 스크립팅.” Wikipedia. Aug. 26, 2022, [Wikipedia - 사이트 간 스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅).
3. “XSS.” 나무위키. Aug. 09, 2022, [나무위키 - XSS](https://namu.wiki/w/XSS#s-4.4).
4. "WebGoat/WebGoat." GitHub. Jan. 15, 2023, [https://github.com/WebGoat/WebGoat](https://github.com/WebGoat/WebGoat).
5. "Referer." MDN Web Docs. Oct. 28, 2022, [MDN - Referer][MDN - Referer]
6. "Cross-site request forgery (CSRF)." PortSwigger. accessed Jan. 20, 2023, [PortSwigger - CSRF][PortSwigger - CSRF]
7. "Bypassing CSRF token validation." PortSwigger. accessed Jan. 20, 2023, [PortSwigger - CSRF Token Validation][PortSwigger - CSRF Token Validation]
8. "DDoS 공격이란 무엇입니까?." AWS. accessed Jan. 20, 2023, [DDoS 공격이란 무엇입니까?](https://aws.amazon.com/ko/shield/ddos-attack-protection/)
9. "CDN이란 무엇입니까?." AWS. accessed Jan. 20, 2023, [CDN이란 무엇입니까?](https://aws.amazon.com/ko/what-is/cdn/)

[MDN - Referer]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
[PortSwigger - CSRF]:https://portswigger.net/web-security/csrf
[PortSwigger - CSRF Token Validation]:https://portswigger.net/web-security/csrf/bypassing-token-validation
