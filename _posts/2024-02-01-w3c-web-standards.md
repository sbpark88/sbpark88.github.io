---
layout: post
title: W3C Web Standards
subtitle: Web Standards and Web Images
categories: [html]
tags: [w3c, web standards, rec, html, block, inline, global attributes, data-*]
---

### 1. Web Standards 👩‍💻

과거 브라우저 파편화로 인한 문제를 해결하기 위해 웹 표준이라는 `표준 기술 규칙`이 제정되었고, 이것을 제정하는 곳이 **W3C** 다. 

1. 초안(Working Draft, WD)
2. 후보권고안(Candidate Recommendation, CR)
3. 제안권고안(Proposed Recommendation, PR)
4. 권고안(W3C Recommendation, REC)

이 중 `REC`에 해당하는 권고안을 우리는 웹 표준이라고 정의한다.

---

### 2. Web Standards 👩‍💻

#### 1. Bitmap

픽셀이 모야 만들어진 정보의 집합으로 `Raster` 이미지라고도 부른다.

`jpeg`, `gif`, `png`, `heif`와 같은 것들이 있으며, 정교하고 다양한 색상과 같은 사진을 표현하는데 적합하다. 
단, 확대/축소 시 계단 현상이 생기기 때문에 원본이 자주 수정되면 품질 저하가 발생한다.

| 포맷   | 압축 종류  | 색상                   | 특징                                            |
|------|--------|----------------------|-----------------------------------------------|
| jpeg | 손실     | 24bit                | 우수한 압축 품질로 가장 보편적으로 사용됨                       |
| png  | 비손실    | 8bit(256 색상) 씩 24bit | Alpha Channel(투명도) 지원, `W3C` 권장 포맷            |
| gif  | 비손실    | 8bit(256 색상)         | 여러 이미지를 하나의 컨테이너에 저장해 움직이는 이미지 표현             |
| heif | 손실/비손실 | 10bit 씩 30bit(1.06억) | Alpha Channel, HRD 지원, 매우 높은 압축률              |
| webp | 손실/비손실 | 24bit 또는 30bit       | Alpha Channel, HRD 지원, 매우 높은 압축률, 움직이는 이미지 표현 |

`heif`는 주로 최신 스마트폰에서 많이 사용되며, 아직 호환성이 좋지 못하다. 구글이 개발한 `webp` 포맷은 역시 최신 포맷으로 
`heif`와 비슷하나 움직이는 이미지 표현까지도 가능하다.

`heif`와 `webp`는 하위 호환성에 유의해야한다.

#### 2. Vector

`Vector`를 사용한 이미지로 수많은 벡터의 수학 공식을 그림으로 구현한다.  

`svg`는 다음과 같은 특징을 갖는다.

- 마크업 언어(HTML/XML) 기반의 벡터 그래픽을 표현한다.
- 수학식을 구현하는 것이기 때문에 크기를 키워도 동일한 품질을 갖는다.
- CSS 와 JavaScript 로 제어가 가능([Modify SVG Images])하다.
- 파일 및 코드 삽입이 가능하다.

---

### 3. Opensource License 👩‍💻

여러 라이센스 중 가장 흔하게 접할 수 있는 무료로 사용이 가능한 오픈소스 라이선스만 나열해본다.

1. Apache License : 아파치 소프트웨어 재단에서 자체 소프트웨어에 적용하기 위해 만든 라이선스, 
                    개인적/상업적 이용, 배포, 수정, 특허 신청이 가능.
2. MIT License : 매사추세츠공과대학(MIT)에서 소프트웨어 학생들을 위해 개발한 라이선스, 개인 소스에 이 라이선스를 사용하고 있다는 
                 표시만 지켜주면 되며, 나머지 사용에 대한 제약은 없음.
3. BSC License : BSD(Berkeley Software Distribution)는 버클리 캘리포니아대학에서 개발한 라이선스, MIT와 동일 조건.
4. Beerware : 오픈소스 개발자에게 맥주를 사줘야 하는 라이선스. 물론 만날 수 있는 경우...

---

### 4. HTML 👩‍

#### 1. HTML Tree

1. **Ancestor Element(조상 엘리먼트)**: 모든 상위 엘리먼트
2. **Parent Element(부모 엘리먼트)**: 상위 엘리먼트
3. **Sibling Elements(형제 엘리먼트)**: 같은 계층에 있는 엘리먼트
4. **Child Element(자식 엘리먼트)**: 하위 엘리먼트
5. **Descendant Element(자손 엘리먼트)**: 모든 하위 엘리먼트

#### 2. Block and Inline

__1 ) Block__

- `width`는 부모 엘리먼트의 크기만큼 늘어나고, `height`는 content 크기 만큼 줄어든다.
- `width`, `height`, `margin`, `padding` 모두 적용이 가능하다.
- 블럭 엘리먼트 안에는 블럭 엘리먼트, 인라인 엘리먼트 모두 올 수 있다.

대표적인 블럭 엘리먼트는 `div`가 있다. 주로 페이지의 레이아웃을 잡는데 사용된다.

__2 ) Inline__

<span style="color: red;">**Text** 로 취급</span>된다. 이것이 핵심이다. 글자로 취급되기 때문에 다음과 같은 특징을 갖는다.

- 줄바꿈은 하나의 공백으로 치환된다.
- `width`와 `height`는 content 크기 만큼 줄어든다.
- 글자이기 때문에 `width`, `height` 속성이 적용되지 않는다.
- `margin`과 `padding` 역시 상하는 적용되지 않고, 좌우만 적용된다.
- 일부 예외는 있으나 일반적으로 인라인 엘리먼트 안에는 인라인 엘리먼트만 올 수 있다(=블럭 엘리먼트가 올 수 없다).

대표적인 인라인 엘리먼트는 `span`이 있다.

```html
<span>HTML World</span>
<!-- same -->
<span>Hello</span>
<span>World</span>
```

> 이때 공백의 크기는 `span`이 존재하는 컨테이너, 즉, 부모 엘리먼트에 적용되는 `font-size`의 크기를 따라가므로 유의해야한다.

#### 3. Major Elements

1. div - division, 특별한 의미가 없는 구분을 위한 *블럭 속성* 엘리먼트.
2. h - heading, 제목을 의미하는 엘리먼트. h1 ~ h6 차이는 단순히 크기 차이만 나타내는 게 아니라, 
   대주제 > 중주제 > 소주제 와 같은 의미를 표현한다. 따라서 h1을 남발해서는 안 되며, h2 ~ h4 사이에서 사용한다(일반적으로 한 페이지 
   내에 h5 ~ h6 까지 존재할 일이 많지 않다).
3. p - paragraph, 문장을 의미하는 엘리먼트.
4. img - image, 이미지를 삽입하는 엘리먼트. <span style="color: red;">인라인</span> 엘리먼트로 워드 문서에 
   인라인으로 삽입된 글자처럼 행동한다.
5. ul, ol - list, 하나의 집합을 의미하며, 하위에 li 를 하나 이상 가져야한다.
6. a - anchor, 페이지 이동을 위한 하이퍼링크 엘리먼트.
7. span - 특별한 의미가 없는 구분을 위한 *인라인 속성* 엘리먼트.
8. br, break - 개행을 위한 엘리먼트.
9. input - 사용자가 데이터를 입력하는 엘리먼트.
   - text - 문자 입력.
   - number - 숫자 입력.
   - checkbox - label 과 함께 사용하며, 선택 가능한 엘리먼트에 사용.
   - radio - label 과 함께 사용하며, <span style="color: red;">name 으로 그룹화</span> 해 그룹 내 하나만 선택 가능한 엘리먼트.
10. label - 라벨링 가능한 엘리먼트(input)의 제목을 표현하는 엘리먼트.
11. table - 블럭 엘리먼트 중 table 이라는 특수한 엘리먼트로 행열의 집합.
   - thead, tbody, tfoot - 내부의 head, body, footer 로 구분하는 엘리먼트.
   - tr - row 를 표현하는 엘리먼트.
   - th, td - column 을 표현하는 엘리먼트.

> HTML 은 구조만을 만드는 것이기 때문에 눈에 보여지는 어떤 부분을 신경 쓰는 개념이 아니다. HTML 을 가지고 눈으로 보이는 무언가를 만들려고 시도하지 
> 말 것. 구조에서 어떤 역할을 담당하는지를 나타내는 것이다. 예를 들어 과거에 레이아웃을 잡기 위해 `table`을 많이 사용했는데 요즘은 
> `flex`, `grid`로 얼마든 레이아웃을 잡고 `css`로 라인 표현까지 가능하다. 정말로 표를 위한 `table`이 아닌 눈에 보여지는 부분에 의한 개발을 
> 해서는 안 된다.

#### 4. Global Attributes

HTML 속성 중 `src`는 img, audio, video - source 등 특정된 곳에서만 사용할 수 있다. 이런 local 속성이 아닌 전역에서 사용 가능한 
전역 속성들이 존재한다.

1. title - 엘리리먼트의 정보나 설명을 툴팁으로 지정.
2. style - 인라인 스타일 지정.
3. id, class - css 선택자를 위해 지정.
4. data-* - 평범한 HTML 엘리먼트를 객체화 할 수 있다. [dataset] 으로 접근한다.

```html
<div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth>
  Carina Anand
</div>
```

```javascript
const el = document.querySelector("#user");
console.log(el.dataset)   // DOMStringMap {id: '1234567890', user: 'carinaanand', dateOfBirth: ''}

el.dataset.dateOfBirth = "1960-10-03";
console.log(el.dataset)   // DOMStringMap {id: '1234567890', user: 'carinaanand', dateOfBirth: '1960-10-03'}

delete el.dataset.dateOfBirth;
console.log(el.dataset)   // DOMStringMap {id: '1234567890', user: 'carinaanand'}

const obj = Object.assign({}, el.dataset)
console.log(obj)          // {id: '1234567890', user: 'carinaanand'}
```

<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)
2. "HTMLElement: dataset property." MDN Web Docs. Sep. 08, 2023, accessed Feb. 02, 2024, [MDN - dataset][dataset] 

[Modify SVG Images]:/css/2023/03/01/basic-css-part1.html#h-2-modify-svg-images
[dataset]:https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
