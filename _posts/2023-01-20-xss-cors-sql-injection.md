---
layout: post
title: Web Security 
subtitle: XSS, XSRF(CSRF), SQL Injection and OWASP/WebGoat
categories: security
tags: [web security, xsrf, csrf, sql injection, webgoat, xss, v-html, sop, cors]
---

### 1. OWASP/WebGoat 👩‍💻

[Open Web Application Security Project](https://owasp.org) 는 웹 보안 취약점을 주로 다루는 비영리 오픈 커뮤니티로 
신뢰할 수 있는 앱과 API 를 개발하도록 돕는다. 꾸준히 이곳에서 공개하는 웹 보안 취약점 TOP10 만 제대로 처리해도 상당한 효과를 볼 수 
있을 것이라 생각한다. 참고로 [OWASP Github](https://github.com/OWASP_) 는 이곳에서 운영하는 깃허브이다.

그리고 웹 취약점에 대한 기본 학습 및 테스트를 위해 [OWASP WebGoat](https://github.com/WebGoat/WebGoat) 를 이용하면 
편리하다. OWASP 에서도 소개하는 방법으로 WebGoat 는 테스트 할 수 있는 웹 서버로 `Docker` 또는 `jar`로 배포된다.

---

### 2. SQL Injection 👩‍💻

- 공격 대상 : 서버
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

일반적으로 위에 소개된 방식으로는 SQL Injection 이 불가능하다. SQL 실행을 위해 ORM 같은 것을 이용하기 때문에 
대부분의 쉬운 공격은 실행 이전에 차단된다. 하지만 어떤 식으로 공격이 이루어지는지 알아야 대응을 할 수 있으니 반드시 
기본부터 알아야한다.

---

### 3. XSRF(CSRF) 👩‍💻


---

### 4. XSS 👩‍💻

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
