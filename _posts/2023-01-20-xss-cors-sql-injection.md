---
layout: post
title: Web Security 
subtitle: XSS, XSRF(CSRF), SQL Injection and OWASP/WebGoat
categories: security
tags: [web security, xsrf, csrf, csrf token, sql injection, webgoat, xss, v-html, sop, cors]
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


<br><br>

---
Reference

1. “OWASP Top Ten.” OWASP. accessed Jan. 20, 2023, [OWASP Top Ten](https://owasp.org/www-project-top-ten/).
2. “사이트 간 스크립팅.” Wikipedia. Aug. 26, 2022, [Wikipedia - 사이트 간 스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅).
3. “XSS.” 나무위키. Aug. 09, 2022, [나무위키 - XSS](https://namu.wiki/w/XSS#s-4.4).
4. "WebGoat/WebGoat." GitHub. Jan. 15, 2023, [https://github.com/WebGoat/WebGoat](https://github.com/WebGoat/WebGoat).
5. "Referer." MDN Web Docs. Oct. 28, 2022, [MDN - Referer][MDN - Referer]

[MDN - Referer]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
