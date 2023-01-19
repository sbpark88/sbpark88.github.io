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



<br><br>

---
Reference

1. “OWASP Top Ten.” OWASP. accessed Jan. 20, 2023, [OWASP Top Ten](https://owasp.org/www-project-top-ten/).
2. “사이트 간 스크립팅.” Wikipedia. Aug. 26, 2022, [Wikipedia - 사이트 간 스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅).
3. “XSS.” 나무위키. Aug. 09, 2022, [나무위키 - XSS](https://namu.wiki/w/XSS#s-4.4).
4. "WebGoat/WebGoat." GitHub. Jan. 15, 2023, [https://github.com/WebGoat/WebGoat](https://github.com/WebGoat/WebGoat).
