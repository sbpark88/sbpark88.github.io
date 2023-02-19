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
대신 *Character Entities* 를 이용해 `Symbol`을 표현하기 위함이다.

| Result | Description                       | Entity Name | Entity Number |
|:------:|-----------------------------------|-------------|---------------|
|        | non-breaking space                | &nbsp;      | &#160;        |
|   <    | less than                         | &lt;        | &#60;         |
|   >    | greater than                      | &gt;        | &#62;         |
|   &    | ampersand                         | &amp;       | &#38;         |
|   "    | double quotation mark             | &quot;      | &#34;         |
|   '    | single quotation mark(apostrophe) | &apos;      | &#39;         |
|   ©    | COPYRIGHT                         | &copy;      | &#169;        |
|   ®    | REGISTERED TRADEMARK              | &reg;       | &#174;        |
|   ∂    | PARTIAL DIFFERENTIAL              | &part;      | &#8706;       |
|   ∅    | EMPTY SETS                        | &empty;     | &#8709;       |
|   ∏    | N-ARY PRODUCT                     | &prod;      | &#8719;       |
|   ∑    | N-ARY SUMMATION                   | &sum;       | &#8721;       |

> **Entity Name** 은 약어이기 때문에 기억하기 쉽지만 모든 브라우저에서 지원하지 않을 수 있다. 반면 **Entity Number** 는 
> 기본적으로 `UTF-8` 문자셋을 이용하고, 이 코드 번호는 ASCII 의 10진법의 확장형이기 때문에 모든 브라우저에서 지원한다(참고로 UTF-8 
> 은 128 ~ 159 번은 사용하지 않는다).

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

[HTML Entities](#h-1-html-entities) 에서 소개한 것 외에 많이 사용되는 Symbol 을 좀 더 소개한다.

| Result | Description                  | Entity Name | Entity Number |
|:------:|------------------------------|-------------|---------------|
|   Α    | GREEK CAPITAL LETTER ALPHA   | &Alpha;     | &#913;        |
|   Β    | GREEK CAPITAL LETTER BETA    | &Beta;      | &#914;        |
|   Γ    | GREEK CAPITAL LETTER GAMMA   | &Gamma;     | &#915;        |
|   Δ    | GREEK CAPITAL LETTER DELTA   | &Delta;     | &#916;        |
|   Ε    | GREEK CAPITAL LETTER EPSILON | &Epsilon;   | &#917;        |
|   Ζ    | GREEK CAPITAL LETTER ZETA    | &Zeta;      | &#918;        |
|   €    | EURO SIGN                    | &euro;      | &#8364;       |
|   ™    | TRADEMARK                    | &trade;     | &#8482;       |
|   ←    | LEFTWARDS ARROW              | &larr;      | &#8592;       |
|   ↑    | UPWARDS ARROW                | &uarr;      | &#8593;       |
|   →    | RIGHTWARDS ARROW             | &rarr;      | &#8594;       |
|   ↓    | DOWNWARDS ARROW              | &darr;      | &#8595;       |
|   ♠    | BLACK SPADE SUIT             | &spades;    | &#9824;       |
|   ♣    | BLACK CLUB SUIT              | &clubs;     | &#9827;       |
|   ♥    | BLACK HEART SUIT             | &hearts;    | &#9829;       |
|   ♦    | BLACK DIAMOND SUIT           | &diams;     | &#9830;       |

---

### 30. HTML Emojis 👩‍💻

`UTF-8 Emojis`를 사용하려면 제대로 표현되도록 document 의 *character set* 을 지정해주어야한다.

```html
<meta charset="UTF-8">
```

> 최신 브라우저는 미지정 시 `UTF-8`을 **default character set** 으로 설정한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOvbYKg" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/jOvbYKg">
  HTML Character Entities</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 31. HTML URL Encode 👩‍💻

#### 1. Uniform Resource Locator

`URL`은 `w3schools.com` 또는 `192.68.20.50`과 같은 주소를 표현하며 다음과 같이 구성되어진다.

`https://www.w3schools.com/html/default.asp`

- **scheme** : protocol 을 나타내며 웹에서는 주로 http 또는 https 를 사용하며 위 경우 `https`에 해당한다.
- **prefix** : domain prefix 로 *http* 또는 *https* 의 default prefix 는 위에서 볼 수 있듯이 `www`이다.
- **domain** : 웹 서버의 고유 주소를 나타내며 위 경우 `w3schools.com`에 해당한다.
- **port** : host 의 포트 번호를 정의하며, *http* 는 80, *https* 는 443 을 default 로 사용한다. 위 경우 생략되었으나 
             `443`을 기본값으로 사용한다.
- **path** : 서버상의 경로를 가리킨다. 생략시 서버의 *root* 를 의미한다. 위 경우 `/html`이다.
- **filename** : 서버의 *document* 또는 *resource* 를 가리킨다. 위 경우 `default.asp`이다. 

#### 2. Common URL Schemes

| Scheme | Short for                          | Used for                        |
|--------|------------------------------------|---------------------------------|
| http   | HyperText Transfer Protocol        | Common web pages. Not encrypted |
| https  | Secure HyperText Transfer Protocol | Secure web pages. Encrypted     |
| ftp    | File Transfer Protocol             | Downloading or uploading files  |
| file   |                                    | A file on your computer         |

#### 3. URL Encoding

URL 은 오직 `ASCII character-set`만 표현할 수 있다. 따라서 *ASCII character-set* 이외의 문자는 전송을 위해 *ASCII* 가 
인식할 수 있으나 *ASCII* 에 포함되지 않는 방식으로 변경해야한다. 따라서 다음 규칙을 갖는다.

- `ASCII`가 아닌 문자는 `%[hexadecimal]`로 변환한다.
- URL 은 공백을 포함할 수 없다. `+` 도는 `%20`으로 변환한다.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRXpdjy" data-user="sbpark88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/sbpark88/pen/GRXpdjy">
  Untitled</a> by SB Park (<a href="https://codepen.io/sbpark88">@sbpark88</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

### 32. XHTML 👩‍💻


<br><br>

---
Reference

1. "HTML Tutorial." W3Schools. accessed Jan. 27, 2023, [W3Schools-HTML](https://www.w3schools.com/html/default.asp).

