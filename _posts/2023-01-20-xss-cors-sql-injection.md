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

### 3. CSRF(XSRF, Cross-site request forgery) 👩‍💻

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

CSRF Token 관련해서는 [PortSwigger - CSRF] 와 [PortSwigger - CSRF Token Validation] 를 참고하면 좋을 것 같다.

---

### 4. DDoS(Distributed Denial of Service) 👩‍💻

- 공격 대상 : WAS
- 매개체 : Client PC
- 방식 : 많은 컴퓨터를 감염시켜 짧은 ping 으로 동시 다발적으로 요청해 서버에 과부하를 일으켜 장애를 유발하는 공격이다.

DDos 공격은 네트워크(계층 3), 전송(계층 4), 표현(계층 6) 및 애플리케이션(계층 7) 계층에서 가장 많이 나타나며 서비스의 장애를 
일으키는 것이 목적이다.

#### How to prevent?

사실상 DDoS 공격은 공격 당하는 서버를 감염시키는 것이 아닌 다수의 클라이언트를 감염시키는 것이라 서버 측에서 예방을 
할 수는 없고 방어만 가능하다.

__1 ) DDoS 패턴 탐지__

정상 트래픽과 비정상 트래픽을 분석하고 빠르게 탐지해 정상적인 트래픽만 수용할 수 있도록 해 수용 가능한 트래픽을 제한한다.

<br>

__2 ) CDN 등을 이용한 분산__

Content Delivery Network 의 본래 목적은 세계 여러 곳에 분산시킴으로써 페이지 로드 시간을 단축시키고, 대역폭 비용을 
절감하며, 가용성을 높이는 것이다. 즉, CDN 을 구축한다는 것은 공격의 대상을 한 곳에 집중할 수 없도록 해 DDoS 공격에 의해 전체 
서비스가 정지되는 것을 방지한다.

---

### 5. XSS(Cross-site scripting) 👩‍💻

- 공격 대상 : Client
- 매개체 : Browser
- 방식 : 사용자가 특정 웹 사이트를 신용하는 것을 이용한 공격으로 브라우저에 사용자의 의도와 다른 행위를 실행시키는 자바스크립트를 
        삽입하는 모든 공격을 의미한다.

> Cross-site scripting 의 축약형이 `XSS` 인 이유는 `CSS`는 일반적으로 Cascading Style Sheets 를 의미하기 때문이다.

#### 1. Difference between `XSS` and `CSRF`

XSS 와 CSRF 는 모두 사용자의 브라우저를 매개체로 한다는 점은 동일하다. 하지만 CSRF 는 사용자의 브라우저를 이용해 신뢰하는 서버를 
대상으로 공격하므로 `사용자의 인증된 세션을 악용`한다. 반면 XSS 는 `브라우저 자체에 대해 공격`한다. 즉, 사용자가 의도하지 않은 
자바스크립트를 실행하는 모든 공격을 의미한다.

- CSRF 공격 : 물품 구매나 송금과 같은 요청을 서버로 보낸다. 또는 공격자가 직접 CSRF 를 이용해 정보를 빼와 탈취한다.
- CSRF & XSS 공격 : XSS 를 이용해 브라우저가 서버로부터 인증된 토큰을 받기를 기다렸다 송금을 명령하는 등의 CSRF 공격을 하거나 
                   서버의 신뢰를 획득하길 기다렸다 CSRF 상태가 되면 정보를 탈취해 XSS 를 이용해 공격자에게 전송하는 등 복함적인 
                   공격을 할 수 있다.
- XSS 공격 : 브라우저에 저장된 계정 정보나 세션 정보 등을 공격자에게 전송해 탈취한다. 주로 CSRF 공격을 하기 위해 사용되는 
            경우가 많아 혼동하기 쉽지만 CSRF 공격은 서버에 특정 공격 행위를 하는 것이고, XSS 공격은 순수하게 의도치 않은 
            자바스크립트를 실행시키는 공격 행위 자체를 의미한다.

#### 2. XSS Attack Types

XSS 공격 유형은 크게 3가지로 나뉜다.

__1 ) Reflected XSS__

HTTP Request/Response 를 이용한 공격으로 Request 를 보낸 후 돌아온 `Response 가 필터링 같은 검증 없이 안전하지 못한 
방법으로 결과를 바로 포함`하는 경우 이용이 가능하다.

예를 들어 다음 요청을 보냈을 때

```
https://insecure-website.com/status?message=All+is+well.
```

응답 결과를 별도의 필터 없이 바로 반영한다고 해보자.

{% raw %}
```vue
<template>
  <p>Status: {{ data }} </p>
</template>
```
{% endraw %}

개발자는 단순하게 이러한 결과를 의도했을 것이다.

```html
<p>Status: All is well.</p>
```

하지만 공격자는 다음과 같이 요청을 보낸다.

```
https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>
```

그 결과 XSS 공격에 성공한다.

```html
<p>Status: <script>/* Bad stuff here... */</script></p>
```

<br>

__2 ) Stored XSS(Persistent XSS)__

Persistent XSS 또는 Second-order XSS 라고도 불리며, 서버가 `신뢰할 수 없는 소스에서 데이터를 수신`하고,
`이후 HTTP 요청에 이 데이터를 포함`해 응답할 경우 이용이 가능하다. 


게시판 또는 메시지 앱의 경우 하나의 요청이 서버에 저장되어 이후 접근하는 모든 사용자에게 배포가된다. 따라서 공격자는 메시지에
다음과 같이 XSS 공격을 보낸다.

```
<script>/* Bad stuff here... */</script>
```

이를 서버가 별도의 필터링 없이 저장 후, 다시 다음 사용자가 별도의 필터링 없이 결과를 포함한다.

```html
<p><script>/* Bad stuff here... */</script></p>
```

공격자는 서버에 XSS 공격을 저장한 후 기다린다. 이후 제3자가 접근하면 XSS 공격에 성공한다.

<br>

__3 ) DOM Based XSS__

줄여서 DOM XSS 라고 부르며 JavaScript 로 DOM 을 업데이트 하기 위해 제어할 때 발생한다. 
DOM XSS 취약점은 두 가지 요소로 나뉘어 작동한다. 공격할 데이터가 입력되는 `Source`와 이 공격이 이루어지는 대상 `Sink`다. 

- Source : `document.URL`, `document.documentURI`, `location.href`, `location.search`, 
           `location.*`, `window.name`, and `document.referrer` etc.
- Sink : `document.write`, `(element).innerHTML`, `eval`, `setTimeout`, `setInterval`, 
         and `execScript` etc.

<br>
다음과 같은 `dashboard.html`이 있다고 하자.

```html
<html>
(...)
Dashboard for
<script>
   var pos=document.URL.indexOf("context=")+8;
   document.write(decodeURIComponent(document.URL.substring(pos)));
</script>
(...)
</html>
```

다음과 같이 페이지를 요청하면

```
http://www.example.com/dashboard.html?context=Thomas
```

페이지가 로드된 후 사용자의 이름이 동적으로 렌더링 될 것이다.

```html
Dashboard for Thomas
```

하지만 공격자가 다음과 같이 페이지를 요청하도록 링크를 보낸다.

```
http://www.example.com/dashboard.html?context=%3c%73%63%72%69%70%74%3e%61%6c%65%72%74%28%22%4c%45
%41%56%45%20%54%48%49%53%20%50%41%47%45%21%20%59%4f%55%20%41%52%45%20%42%45%49%4e%47%20%48%41%43%4b%45
%44%21%22%29%3b%3c%2f%73%63%72%69%70%74%3e
```

이는 디코딩 하면 다음과 같다.

```html
<script>alert("LEAVE THIS PAGE! YOU ARE BEING HACKED!");</script>
```

따라서 DOM 에 다음과 같이 삽입될 것이다.

```html
Dashboard for <script>alert("LEAVE THIS PAGE! YOU ARE BEING HACKED!");</script>
```

공격자가 만든 이 링크를 받은 사용자는 위험을 느끼고 페이지를 떠나고 이것은 해당 사이트의 평판에 영향을 미친다.

<br>

<span id="fix-dom-xss__link">
  DOM Based XSS 를 방지하기 위한 가장 첫 번째는 `eval`과 `execScript`를 허용하지 않는 것이다.
</span>  
그리고 `innerHtml`과 같이 안전하지 않은 방법으로 HTML 에 삽입하지 않고 `innerText` 또는 `textContent` 과 같이 
안전한 `Sink`를 사용해 스크립트가 동작하지 않도록 하는 것이다.

따라서 위 예제를 `div` element 와 `textContent`를 사용해 다음과 같이 고칠 수 있다.

```html
<html>
(...)
Dashboard for <span id="contentholder"></span>
<script>
   var pos=document.URL.indexOf("context=")+8;
   document.getElementById("contentholder").textContent = 
       document.URL.substring(pos,document.URL.length);
</script>
(...)
</html>
```

XSS 는 웹 개발의 취약점 중 가장 치명적이면서도 가장 다양한 유형이 존재하는 것 같다. 따라서 
[OWASP - Cheatsheets - XSS] 를 참고해 꾸준하게 신경 써야만 할 것이다.

#### 3. Reflected vs. Stored vs. DOM

Reflected XSS 와 Stored XSS 는 공격 시점과 서버 저장 유무가 달라 명확히 구분되지만, DOM XSS 는 XSS 과 CSRF 와 함께 복합적으로 
사용되는 것처럼 Reflected 또는 Stored XSS 와 복합적으로 사용되기도 하기 때문에 혼동되는 경우가 많다. 다만 DOM XSS 자체는 
위에 설명한 것처럼 브라우저 자체 내에서 발생하는 `Source`와 `Sink`를 다룰 때 발생하는 취약점을 말한다.

|                | Reflected XSS |     Stored XSS      |                                    DOM XSS                                     |
|----------------|:-------------:|:-------------------:|:------------------------------------------------------------------------------:|
| Require HTTP   |       O       | △ (서버에 직접 심을 수도 있다) | X (취약점을 심기 위해 Reflected 또는 Stored 와 함께 사용하기도 하지만 DOM XSS 공격 자체는 서버와 통신이 필요 없다) |
| Save to Server |       X       |          O          |                                       X                                        |
| Server XSS     |       O       |          O          |                      X (DOM XSS 는 서버에서 감지하거나 막는 것이 불가능하다)                      |
| Client XSS     |       O       |          O          |                                       O                                        |

#### 4. XSS Attack Examples

나무위키에 소개된 XSS 예제를 조금 더 소개해본다.

__1 ) Inject `script` Tag__

```html
<script>alert('XSS');</script>
```

매우 고전적인 방법으로 오늘날은 대부분 막혀있다.

- Inject `javascript:` Link

```html
<a href="javascript:alert('XSS')">XSS</a>
```

링크에 JavaScript 를 실행하도록 링크를 삽입하는 방법으로 위 `script` 주입과 마찬가지로 대부분 막혀있다.

__2 ) Inject `Event Attributes`__

```html
<img src="#" alt="" onerror="alert('XSS')">
```

HTML 에서 `onclick`, `onload`, `onerror`과 attributes 는 이벤트 속성으로 기본적으로 자바스크립트를 실행하는 
태그인 점을 이용한다.

__3 ) Inject `Black List Event Attributes`__

```html
<ruby oncopy="alert('XSS')">XSS</ruby>
```

이벤트 속성을 갖지만 일반적으로 잘 사용하지 않는 이벤트를 사용한다. 따라서 이벤트 속성을 블랙리스트로 막으면 이런 잘 알려지지 
않은 이벤트 속성에 뚫리게 된다. 따라서 화이트리스트로 막아야 이런 잘 알려지지 않은 속성으로 우회한 공격을 막을 수 있다.

__4 ) 난독화__

브라우저는 읽을 수 있지만 사람이 쉽게 읽을 수 없도록 난독화 한다. 위 `<a href="javascript:alert('XSS')">XSS</a>`를 
아스키 코드로 난독화를 해보자.

[Web HTML entity encoder/decoder] 에 `javascript:alert('XSS')` 부분을 
넣어보면 다음과 같은 결과를 얻는다.

![XSS Code ASCII Encode](/assets/images/posts/2023-01-20-xss-cors-sql-injection/xss-code-obfuscation-1.png){: width="800"}

```html
<a href="&#x6A;&#x61;&#x76;&#x61;&#x73;&#xA;&#x63;&#x72;&#x69;&#x70;&#x74;&#xA;&#x3A;&#xA;&#x61;&#x6C;&#x65;&#x72;&#x74;&#xA;&#x28;&#x27;&#x58;&#x53;&#x53;&#x27;&#x29;">XSS</a>
```

무슨 코드인지 사람은 알 수 없으나 브라우저는 이를 아무 문제 없이 

```html
<a href="javascript:alert('XSS')">XSS</a>
```

와 동일하게 읽는다.

<br>

위 난독화에 한 술 더 떠 다음과 같은 것도 가능하다고 한다.

![XSS Code Japanese Style Emoticons aaencode Encode](/assets/images/posts/2023-01-20-xss-cors-sql-injection/xss-code-obfuscation-2.png){: width="800"}


#### 5. How to prevent?

__1 ) OWASP 의 Cheatsheets 를 꾸준히 참고한다__

[OWASP - Cheatsheets - XSS] 를 참고해 최신 XSS 공격에 꾸준히 대비해야한다.

__2 ) BBCode 를 사용한다__

Bulletin Board Code 는 전자 게시판에 글을 작성하는데 사용하기 위해 만들어진 가벼운 마크업 언어로 HTML 과 비슷한 
역할을 하며 문법도 유사하다. 단, HTML 이나 XML 이 `<`, `>`로 태그를 나타내는 것과 비교해 `[`, `]`로 태그를 타나낸다. 

즉, `<b>` 태그 대신 `[b]`태그를 사용하도록 해 XSS 공격을 차단한다.

![BBCode Tags](/assets/images/posts/2023-01-20-xss-cors-sql-injection/bbcode-tag.png){: width="1000"}

__3 ) Filter 또는 Library 를 사용한다__

전체 입출력 데이터를 Filter 로 검사하거나 필요한 곳에 Library 를 적용한다.

`&lt;`, `&gt;` 처럼 단순 문자로 인식하도록 필터를 사용하거나, 클라이언트에서 이를 실행할 때 `XSS`가 동작하지 않도록 
라이브러리를 이용해 안전 유무를 검사한다.

__4 ) CSP 사용__

최신 브라우저는 일반적으로 `SOP`(Same-Origin Policy)를 적용한다. 하지만 경우에 따라 `CORS`(Cross-Origin Resource Sharing)를 
거 필요하기도 하며, SOP 를 적용한다 하더라도 이를 우회하는 공격법이 존재하므로 SOP 라고 안심하는 것이 불가능하다. 

따라서 Content Security Policy 를 사용해 스크립트 실행에 대한 출처 조건을 화이트리스트로 제한하도록 추가적인 보안 조치가 필요하다.

__5 ) Frontend Frameworks/Library 사용__

물론, 필터를 직접 제작하거나 공개된 라이브러리를 사용하는 것도 좋지만 우선적으로 `Angular`, `React`, `Vue`, `Svelte`와 
같은 프레임워크 또는 프레임워크에 가까운 라이브러리를 이용해 개발하는 것이다. 이들은 배포한 Documents 의 HTML 을 분석하기 어렵게 
만들고, 많은 정보를 캡슐화 하며, 기존에 알려진 많은 취약점을 좀 더 강력하고 유연하게 컨트롤 하는 것을 기본적으로 포함하고있다. 

하지만 Vue 를 예로 들면 `v-html` 또는 `findDOMNOde`, `ref` 와 같은 개발을 편하게 해주는 `escape hatch`가 존재하는데 
이러한 코드는 Vue 가 다시 XSS 공격에 노출되기 쉽게 만든다. 따라서 [DOM XSS Examples](#fix-dom-xss__link) 에서 설명한 
것처럼 HTML 코드를 직접 출력하는 것을 피해야하며, 정말 필요할 경우는 
[vue-sanitize](https://www.npmjs.com/package/vue-sanitize) 또는
[sanitize-html](https://www.npmjs.com/package/sanitize-html) 과 같은 라이브러리를 사용하도록 한다.

<br><br>

---
Reference

1. “OWASP Top Ten.” OWASP. accessed Jan. 20, 2023, [OWASP Top Ten](https://owasp.org/www-project-top-ten/).
2. “사이트 간 스크립팅.” Wikipedia. Aug. 26, 2022, [Wikipedia - 사이트 간 스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅).
3. “XSS.” 나무위키. Aug. 09, 2022, [나무위키 - XSS](https://namu.wiki/w/XSS#s-4.4).
4. "WebGoat/WebGoat." GitHub. Jan. 15, 2023, [https://github.com/WebGoat/WebGoat](https://github.com/WebGoat/WebGoat).
5. "Referer." MDN Web Docs. Oct. 28, 2022, [MDN - Referer].
6. "Cross-site request forgery (CSRF)." PortSwigger. accessed Jan. 20, 2023, [PortSwigger - CSRF].
7. "Bypassing CSRF token validation." PortSwigger. accessed Jan. 20, 2023, [PortSwigger - CSRF Token Validation].
8. "DDoS 공격이란 무엇입니까?." AWS. accessed Jan. 20, 2023, [DDoS 공격이란 무엇입니까?](https://aws.amazon.com/ko/shield/ddos-attack-protection/).
9. "CDN이란 무엇입니까?." AWS. accessed Jan. 20, 2023, [CDN이란 무엇입니까?](https://aws.amazon.com/ko/what-is/cdn/).
10. "HTML entity encoder/decoder." Web developer tools. accessed Jan. 22, 2023, [Web HTML entity encoder/decoder].
11. Tomasz Andrzej Nidecki. "DOM-based cross-site scripting." Invicti. accessed Jan. 22, 2023, [DOM-based XSS](https://www.invicti.com/learn/dom-based-cross-site-scripting-dom-xss/).
12. "DOM based XSS Prevention Cheat Sheet." OSASP. accessed Ja. 22, 2023, [OWASP - Cheatsheets - XSS].
13. "BBCode." Wikipedia. Dec. 11, 2022, [Wikipedia - BBCode].

[MDN - Referer]:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
[PortSwigger - CSRF]:https://portswigger.net/web-security/csrf
[PortSwigger - CSRF Token Validation]:https://portswigger.net/web-security/csrf/bypassing-token-validation
[Web HTML entity encoder/decoder]:https://mothereff.in/html-entities
[OWASP - Cheatsheets - XSS]:https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html
[Wikipedia - BBCode]:https://ko.wikipedia.org/wiki/BBCode
