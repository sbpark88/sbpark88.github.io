---
layout: post
title: HTML Basic - Entities, Symbols, Emojis, Charset, URL Encode, XHTML
subtitle: HTML Basic - Part 6
categories: html
tags: [w3school, entity, symbol, emoji, charset, url encode, xhtml]
---

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### 28. HTML Entities 👩‍💻

#### 1. HTML Entities

HTML 을 사용할 때 `Character Entities`를 사용하는 데는 2가지 이유가 존재한다. 첫 번째는 HTML 의 `<` 나 `>`, `연속된 공백`과 
같은 허용되지 않거나 HTML 코드와 혼동될 수 있는 예약어(reserved characters)를 대체하기 위함이고, 두 번째는 유니코드를 직접 사용하는 
대신 *Character Entities* 를 이용해 표현하기 위함이다.

| Result | Description                       | Entity Name | Entity Number |
|:------:|-----------------------------------|-------------|---------------|
|        | non-breaking space                | &nbsp;      | &#160;        |
|   <    | less than                         | &lt;        | &#60;         |
|   >    | greater than                      | &gt;        | &#62;         |
|   &    | ampersand                         | &amp;       | &#38;         |
|   "    | double quotation mark             | &quot;      | &#34;         |
|   '    | single quotation mark(apostrophe) | &apos;      | &#39;         |
|   ©    | copyright                         | &copy;      | &#169;        |
|   ®    | registered trademark              | &reg;       | &#174;        |

> **Entity Name** 은 약어이기 때문에 기억하기 쉽지만 모든 브라우저에서 지원하지 않을 수 있다. 반면 **Entity Number** 는 모든 
> 브라우저에서 지원한다.

#### 2. Combining Diacritical Marks

[Extended Grapheme Clusters](/swift/2022/09/17/strings-and-characters.html#h-2-extended-grapheme-clusters-자모-그룹의-확장) 
를 지원하는 것 같다. 다음 예제를 보면 이해가 쉬울 것이다.

| Mark | Character | Construct | Result |
|:----:|:---------:|:---------:|:------:|
|  ̀	  |     a     |  a&#768;  |   à   |
|  ́	  |     a     |  a&#769;  |   á   |
|  ̂	  |     a     |  a&#770;  |   â   |
|  ̃	  |     a     |  a&#771;  |   ã   |
|  ̀	  |     O     |  O&#768;  |   Ò   |
|  ́	  |     O     |  O&#769;  |   Ó   |
|  ̂	  |     O     |  O&#770;  |   Ô   |
|  ̃	  |     O     |  O&#771;  |   Õ   |

---

### 29. HTML Symbols 👩‍💻

---

### 30. HTML Emojis 👩‍💻

---

### 31. HTML Charset 👩‍💻

---

### 32. HTML URL Encode 👩‍💻

---

### 33. XHTML 👩‍💻


<br><br>

---
Reference

1. "HTML Tutorial." W3Schools. accessed Jan. 27, 2023, [W3Schools-HTML](https://www.w3schools.com/html/default.asp)

