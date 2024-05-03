---
layout: post
title: JavaScript RegExp
subtitle: Short book about the Regular Expressions
excerpt_image: /assets/images/posts/2024-04-28-javascript-regexp/excerpt-image.jpg
categories: [javascript]
tags: [regexp, regular expression]
---

### 1. RegExp 👩‍💻

#### 1. Features of the RegExp

정규표현식의 주요 기능이다.

- 문자 검색(Search)
- 문자 추출(Extract)
- 문자 대치(Replace)
 
사실 회사에서 일하며 정규표현식을 썼던 건 거의 Validation Check 말곤 없었던 것 같긴 한데 매번 
[https://regexr.com](https://regexr.com) 에 의존해서 사용했었다. 역시 계속 사용하는 것도 좋지만 한 번 정리해서 
글로 기록하는 것 만큼 머릿속도 정리되고, 나중에 다시 찾아보기 좋은 것은 없는 것 같아 글로 작성해보고자한다. 

이 글에서 사용할 문자열은 다음과 같다.

```javascript
const str = `
010-1234-5678
thesecon@gmail.com
Hello world!
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
hello@naver.com
http://localhost:1234
동해물과 백두산이 마르고 닳도록
abbcccddddeeeee
`;
```

#### 2. Features of the RegExp

__ 1) Constructors__

```javascript
// new RegExp('표현', '옵션')
new RegExp('[a-z]', 'gi')
```

__ 2) Literals__

```javascript
// /표현/옵션
/[a-z]/gi
```

생성자 방식으로만 유효하게 사용할 수 있는 패턴이 존재할 때를 제외하면 일반적으로 리터럴 방식을 사용한다.

#### 3. Methods

주로 사용하는 메서드는 다음과 같다.

- `regexp.test(string:) -> boolean`: 문자 검색(Search)
- `string.match(regexp:) -> string[]`: 문자 추출(Extract) - 일치하는 문자의 배열을 반환
- `string.replace(regexp:,replacement:)`: 문자 대치(Replace)

```javascript
console.log(regexp.test(str)); // true
console.log(str.match(regexp)); // ['fox']
console.log(str.replace(regexp, 'cat'));
```

> `test`는 정규식의 메서드고, `match`와 `replace`는 string 의 메서드다.

#### 4. Options(=Flags)

- `g`: 모든 문자 일치(Global)
- `i`: 대소문자 무시(Ignore Case)
- `m`: Multi Line, 줄바꿈을 각각의 문자열로 인식

```javascript
console.log(str.match(/the/));
```

```console
[
  0: 'the', 
  index: 15, 
  input: '\n010-1234-5678\nthesecon@gmail.com\nHello world!\nhtt…ocalhost:1234\n동해물과 백두산이 마르고 닳도록\nabbcccddddeeeee\n', 
  groups: undefined
]
```

가장 앞에 나오는 `the`를 하나만 찾는다.

```javascript
console.log(str.match(/the/g));   // ['the', 'the']
console.log(str.match(/the/gi));  // ['the', 'The', 'the']
```

`the`를 여러 개 찾고, `the`를 대소문자 구분 없이 여러 개 찾는다.

```javascript
console.log(str.match(/\.$/gi));  // null
```

`.`은 정규식에서 기능을 갖고 있어 문자열로 사용하기 위해 Escape Character `\`를 앞에 붙여주었다. `$`는 문장이 끝남을 의미한다.

```javascript
console.log(str.match(/\.$/gim));  // ['.']
```

`m`이 포함되서 문자열 전체가 아닌 라인 단위로 검사해 `.`로 끝나는 문자열을 찾아 추출했다.

---

### 2. Patterns 👩‍💻

```javascript
const str = `
010-1234-5678
thesecon@gmail.com
Hello world!
https://www.omdbapi.com/?apikey=7035c60c&s=frozen
The quick brown fox jumps over the lazy dog.
hello@naver.com
http://localhost:1234
동해물과 백두산이 마르고 닳도록
abbcccddddeeeee
`;
```

를 이어서 사용한다.

#### 1. Basic Patterns

- `^ab`: Line 시작에 있는 ab 와 일치.
- `ab$`: Line 끝에 있는 ab 와 일치.
- `.`: 임의의 한 문자와 일치.
- `a|b`: a 또는 b 와 일치.
- `ab?`: ? 바로 직전의 문자를 optional 로 일치.

```javascript
console.log(str.match(/^h.../gm));      // ['http', 'hell', 'http']
console.log(str.match(/\.com$/gm));     // ['.com', '.com']
console.log(str.match(/...\.com$/gm));  // ['ail.com', 'ver.com']
console.log(str.match(/fox|dog/g));     // ['fox', 'dog']
console.log(str.match(/https?/g));      // ['https', 'http']
```

`/https?/g`는 `/https|http/g`와 같다. 단, `/http|https/g`는 잘못된 표현식임에 유의한다. 선행 조건의 일치 여부를 먼저 
검사하기 때문에 `http`만 찾고 일치를 반환하기 때문에 `https`까지 검사를 하지 않는다. 도달할 수 없는 조건에 해당한다.

```javascript
console.log(str.match(/https?/g));      // ['https', 'http']
console.log(str.match(/https|http/g));  // ['https', 'http']
console.log(str.match(/http|https/g));  // ['http', 'http']
```

#### 2. Range Patterns

범위 패턴은 `[ ]`를 사용한다.

- `[abe]`: a 또는 b 또는 e 와 일치.
- `[a-z]`: a 부터 z 까지 일치.
- `[A-Z]`: A 부터 Z 까지 일치.
- `[0-9]`: 0 부터 9 까지 일치.
- `[가-힣]`: 가 부터 힣 까지 일치.

```javascript
console.log(str.match(/[fgj]/g)); // ['g', 'f', 'f', 'j', 'g']
```

`[ ]` 안에 `-`를 포함하지 않으면 각 문자를 `|`로 일치 여부를 검사하는 것과 같다. 따라서 `[fgj]`는 `f|g|j`와 같다.

```javascript
console.log(str.match(/[0-9]/g)); // ['0', '1', '0', '1', '2', '3', '4', '5', '6', '7', 
                                  // '8', '7', '0', '3', '5', '6', '0', '1', '2', '3', '4']
```

```javascript
console.log(str.match(/[가-힣]/g));   // ['동', '해', '물', '과', '백', '두', '산', '이', 
                                     // '마', '르', '고', '닳', '도', '록']
console.log(str.match(/[가-힣]+/g));  // ['동해물과', '백두산이', '마르고', '닳도록']
```

`+` 기호는 바로 다음 [Repeat Patterns](#h-3-repeat-patterns) 에서 확인할 수 있다.

#### 3. Repeat Patterns

반복 패턴은 `{ }` 또는 특수한 기능을 갖는 `+`를 사용한다.

- `{m}`: m회 연속 일치
- `{m,}`: m회 이상 연속 일치
- `{m,n}`: m회 이상 n회 이하 연속 일치
- `+`: 1회 이상 연속 일치

```javascript
console.log(str.match(/\d{3}/g));   // ['010', '123', '567', '703', '123']
console.log(str.match(/\d{3,}/g));  // ['010', '1234', '5678', '7035', '1234']
console.log(str.match(/\d{2,4}/g)); // ['010', '1234', '5678', '7035', '60', '1234']
console.log(str.match(/\d+/g));     // ['010', '1234', '5678', '7035', '60', '1234']
```

`\d`는 바로 다음 [Escape Patterns](#h-4-escape-patterns) 에서 확인할 수 있다.

```javascript
console.log(str.match(/e{3}/g));    // ['eee']
console.log(str.match(/[a-z]+/g));  // ['thesecon', 'gmail', 'com', 'ello', 'world', 'https', 
                                    // 'www', 'omdbapi', 'com', 'apikey', 'c', 'c', 's', 'frozen', 
                                    // 'he', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 
                                    // 'lazy', 'dog', 'hello', 'naver', 'com', 'http', 'localhost', 
                                    // 'abbcccddddeeeee']
```

`+`는 `{1,}`와 같다.

이를 응용하면 임의의 하나 이상의 모든 문자 일치는 `.{1,}` 또는 `.+`가 되고, 0개 이상의 모든 문자 일치는 `.{0,}` 또는 `.*`가 
된다.


#### 4. Escape Patterns

- `\w`: 63개 문자(대문자(26) + 소문자(26) + 숫자(10) + _(1) 총 63개)와 일치, `[a-zA-Z0-9_]`와 같다.
- `\b`: 63개 문자와 일치하는 않는 문자 경계(Boundary).
- `\d`: 숫자(Digit)와 일치, `[0-9]`와 같다.
- `\s`: 공백(Space, Tab, Newline 등)과 일치.

```javascript
console.log(str.match(/[0-9]/g)); // ['0', '1', '0', '1', '2', '3', '4', '5', '6', '7', 
                                  // '8', '7', '0', '3', '5', '6', '0', '1', '2', '3', '4']
console.log(str.match(/\d/g));    // ['0', '1', '0', '1', '2', '3', '4', '5', '6', '7', 
                                  // '8', '7', '0', '3', '5', '6', '0', '1', '2', '3', '4']
```

```javascript
console.log(str.match(/\w+/g));   // ['010', '1234', '5678', 'thesecon', 'gmail', 'com', 
                                  // 'Hello', 'world', 'https', 'www', 'omdbapi', 'com', 
                                  // 'apikey', '7035c60c', 's', 'frozen', 'The', 'quick', 
                                  // 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 
                                  // 'hello', 'naver', 'com', 'http', 'localhost', '1234', 
                                  // 'abbcccddddeeeee']
```

`_`를 포함해 모든 영문 대소문자와 숫자를 추출한다.

```javascript
console.log(str.match(/\s/g));  // ['\n', '\n', '\n', ' ', '\n', '\n', ' ', ' ', ' ', ' ', 
                                // ' ', ' ', ' ', ' ', '\n', '\n', ' ', '\n', ' ', ' ', ' ', 
                                // '\n', '\n']
```

<br>

```javascript
const str = `
a111a
#222a
a333#
#444#
010-1234-5678
`;

console.log(str.match(/[0-9]+/g));      // ['111', '222', '333', '444', '010', '1234', '5678']
console.log(str.match(/\b[0-9]+/g));    // ['222', '444', '010', '1234', '5678']
console.log(str.match(/[0-9]+\b/g));    // ['333', '444', '010', '1234', '5678']
console.log(str.match(/\b[0-9]+\b/g));  // ['444', '010', '1234', '5678']
```

`\b`는 단독으로 사용되지 않고 위와 같이 다른 패턴과 결합해 `Boundary`를 검사하기 위한 용도로 사용한다.

- 첫 번째 매칭은 모든 연속된 숫자를 추출했다.
- 두 번째 미칭은 `word 가 아닌 것` 뒤에 `연속된 숫자 조함`을 찾기 때문에 앞에 문자 a 가 붙은 숫자 111과 333은 제외되었다.
- 세 번째 매칭은 반대로 뒤에 `word 가 아닌 것`을 찾으므로, 뒤에 문자 a 가 뭍은 숫자 222와 444는 제외되었다.
- 네 번째 매칭은 앞뒤가 모두 `word 가 아닌 것`을 찾으므로, 숫자 444, 010, 1234, 5678 만 추출했다.

#### 5. Group Patterns

- `(?:)`: 그룹 일치
- `(?=)`: 그룹 앞쪽 탐색(Lookahead), 뒷쪽에 Boundary 를 설정해 앞쪽 일치를 탐색
- `(?<=)`: 그룹 뒷쪽 탐색(Lookbehind), 앞쪽에 Boundary 를 설정해 뒷쪽 일치를 탑색

<br>

__1 ) `(?:)`: 그룹 일치__

`http` 또는 `https`를 포함해 도메인을 추출하고 싶다고 해보자.

```javascript
const str = `
https://www.omdbapi.com?apikey=7035c60c&s=frozen
http://localhost:1234
https://www.amazon.com/gp/bestsellers/?ref_=nav_em_cs_bestsellers_0_1_1_2
`;

console.log(str.match(/https?:\/\/\w+\.?/g));
// ['https://www.', 'http://localhost', 'https://www.']
```

이제 `\w+\.?` 이 부분을 반복할 것이다.

```javascript
console.log(str.match(/https?:\/\/\w+\.?\w+\.?/g));
// ['https://www.omdbapi.', 'http://localhost', 'https://www.amazon.']
console.log(str.match(/https?:\/\/\w+\.?\w+\.?\w+\.?/g));
// ['https://www.omdbapi.com', 'http://localhost', 'https://www.amazon.com']
```

도메인 마지막에 `/`로 끝날 경우 이것도 포함시키고 싶다고 가정하고 `\/?`를 마지막에 추가해보자.

```javascript
console.log(str.match(/https?:\/\/\w+\.?\w+\.?\w+\.?\/?/g));
// ['https://www.omdbapi.com', 'http://localhost', 'https://www.amazon.com/']
```

위 패턴의 문제는 동일 패턴이 반복되는 데 계속해서 하드코딩 한다는 것이고, 반복되는 패턴의 횟수가 고정이 아니라는 것이다.

```javascript
console.log(str.match(/https?:\/\/(?:\w+\.?)+\/?/g));
// ['https://www.omdbapi.com', 'http://localhost', 'https://www.amazon.com/']
```

반복되는 패턴 `\w+\.?`을 `(?:\w+\.?)+`로 그룹화 하고, 뒤에 `\/?`를 추가해주면 어떤 경우에든 작동이 가능하다. 

<br>

__2 ) `(?=)`: 그룹 앞쪽 일치(Lookahead)__

`\b`와 마찬가지로 `Boundary` 개념으로 사용된다. 

```javascript
const str = `
아몬드우유
아몬드빵
아몬드샐러드
바나나우유
바나나빵
고구마우유
고구마빵
고구마튀김
고구마피자
`;
```

```javascript
console.log(str.match(/.+(?:우유)/g));  // ['아몬드우유', '바나나우유', '고구마우유']
console.log(str.match(/.+(?=우유)/g));  // ['아몬드', '바나나', '고구마']
```

`(?:)`: *그룹 일치*는 `우유`를 포함해 '아몬드우유', '바나나우유', '고구마우유'를 추출하지만,   
`(?=)`: *그룹 앞쪽 탐색(Lookahead)*은 `우유`를 뒷쪽 Boundary 로 설정해 `우유`를 제외한 앞쪽의 일치 문자열 '아몬드', '바나나', 
'고구마'만 추출한다.


__3 ) `(?<=)`: 그룹 뒤쪽 일치(Lookbehind)__

```javascript
console.log(str.match(/(?:고구마).+/g));  // ['고구마우유', '고구마빵', '고구마튀김', '고구마피자']
console.log(str.match(/(?<=고구마).+/g)); // ['우유', '빵', '튀김', '피자']
```

`(?:)`: *그룹 일치*는 `고구마`를 포함해 '고구마우유', '고구마빵', '고구마튀김', '고구마피자'를 추출하지만,  
`(?<=)`: *그룹 뒷쪽 탐색(Lookbehind)*은 `고구마`를 앞쪽 Boundary 로 설정해 `고구마`를 제외한 뒷쪽의 일치 문자열 '우유', '빵', 
'튀김', '피자'만 추출한다.


<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
