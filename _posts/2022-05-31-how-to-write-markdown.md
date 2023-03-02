---
layout: post
title: 마크 다운 테이블, 링크 작성법
subtitle: 깃 블로그 포스팅을 자유롭게 해보자
categories: markdown
tags: [markdown]
---

전체 튜토리얼을 참고하려면 [markdown](https://www.markdowntutorial.com/kr/)에 방문하세요.


### 1. Header

header 는 # (H1) ~ ###### (H6) 까지 사용할 수 있다.  
일반적으로 H1, H6는 잘 사용하지 않는다. H5도 사용해보니 깃허브 블로그에 매우 작게 나온다.

## `##` It is H2.
### `###` It is H3.
#### `####` It is H4.

---

### 2. Italics and Bold

`_이탤릭체입니다_` _이텔릭체입니다_  
`**볼드체입니다**` **볼드체입니다**  
`_**이탤릭과 볼드체입니다**_` _**이탤릭과 볼드체입니다**_  
`_이렇게도 **가능**합니다_` _이렇게도 **가능**합니다_  
`**이렇게도 _불가능_하네요**` **이렇게도 _불가능_하네요**

---

### 3. Links

#### Inline link

`[GitHub 방문!](www.github.com)` [GitHub 방문!](www.github.com)  
`이 링크는 [**Google**](www.google.com)로 연결됩니다.` 이 링크는 [**Google**](www.google.com)로 연결됩니다.

헤더에도 넣을 수 있다.  
`#### The Latest News from [the BBC](www.bbc.com/news)`
#### The Latest News from [the BBC](www.bbc.com/news)

#### Reference link

Reference link 를 사용하는 방법은 두 가지가 있다.

우선 Reference link 는 다음과 같이 만든다.

```markdown
[Amazon]: www.amazon.com
```

그리고 사용 방법은 두 가지로 나뉜다.

```markdown
// 그대로 사용하기
This links takes you to [Amazon].

// 이름 바꿔 사용하기
우리는 [아마존][Amazon]에서 직구를 합니다.
```

This links takes you to [Amazon].

우리는 [아마존][Amazon]에서 직구를 합니다.

이렇게 링크를 분리할 수 있다.

[Amazon]: www.amazon.com

---

### 4. Images
이미지는 `Links`와 사용법이 거의 같다. 차이점은 앞에 `!`을 붙여준다는 것이다.

#### Inline image
`![A pretty tiger](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg)`

![A pretty tiger](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg)

느낌표를 빼면 이렇게 Link가 된다.  
`[A pretty tiger](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg)`

[A pretty tiger](https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg)

#### Reference image
Link 문법에 `!`을 붙여 렌더링 타입을 바꿔주는 것이므로 레퍼런스도 사용 가능하다.

```markdown
![Orange cat][Orange]

[Orange]: http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22221-cat-icon.png
```

![Orange cat][Orange]

[Orange]: http://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/256/22221-cat-icon.png

---

### 5. Blockquotes

인용문 구문은 `caret(>)`을 붙여주어 만들 수 있다.

```markdown
I read this interesting quote the other day:

> "Her eyes had called him and his soul had leaped at the call.
>
> To live, to err, to fall, to triumph, to recreate life out of life!"
```

I read this interesting quote the other day:

> "Her eyes had called him and his soul had leaped at the call.
>
> To live, to err, to fall, to triumph, to recreate life out of life!"

인용문 안에서 이탤릭체, 링크, 이미지도 함께 사용 가능하다.

---

### 6. Lists

#### Unordered list
순서 없는 리스트는 `asterisk(*)`를 붙여주어 만들 수 있다.

```markdown
장보기 목록
* 우유
* 치즈
* 양상치
* 드레싱
```

장보기 목록
* 우유
* 치즈
* 양상치
* 드레싱

`dash(-)`를 붙여서도 동일하게 만들 수 있다.

```markdown
먹고 싶은 것
- 소곱창
- 양갈비
```

먹고 싶은 것
- 소곱창
- 양갈비

#### Ordered list
순서 있는 리스트는 `숫자`를 이용한다.

```markdown
1. 보울 위에 계란 세 개를 깨뜨린다
2. 우유 3.7L를 보울에 붓는다
3. 버터를 힘차게 연어에 문지른다
4. 연어를 우유,계란을 쏟은 보울에 넣는다
```

1. 보울 위에 계란 세 개를 깨뜨린다
2. 우유 3.7L를 보울에 붓는다
3. 버터를 힘차게 연어에 문지른다
4. 연어를 우유,계란을 쏟은 보울에 넣는다

#### Sub list
앞에 `공백`을 하나 넣어주면 하위 리스트를 만드는 것도 가능하다.  
(튜토리얼에서는 `공백 하나`만 넣어도 되나, VS Code나 깃허브에서는 `공백 두 칸` 또는 `탭`을 넣어야 하위 리스트로 인식한다.)

```markdown
* 장보기 목록
  * 우유
  * 치즈
  * 양상치
  * 드레싱
* 먹고 싶은 것
  * 소곱창
  * 양갈비
```

* 장보기 목록
  * 우유
  * 치즈
  * 양상치
  * 드레싱
* 먹고 싶은 것
  * 소곱창
  * 양갈비

다만 위와 같이 적으면 렌더링 이후는 상관 없지만 작성시 가독성이 좋지 않다.
`*`과 `-`를 섞어서 사용하는 것이 좋다.

```markdown
* 장보기 목록
  - 우유
  - 치즈
  - 양상치
  - 드레싱
* 먹고 싶은 것
  - 소곱창
  - 양갈비
```

* 장보기 목록
  - 우유
  - 치즈
  - 양상치
  - 드레싱
* 먹고 싶은 것
  - 소곱창
  - 양갈비

#### 이것들을 잘 활용하면 다음과 같이 쉬우면서도 구조를 갖는 글을 만들 수 있다.

```markdown
1. 보울에 계란 3개를 깨뜨린다.

    여러분은 흘리지 않고 계란을 깨뜨리고 싶을거에요.

    만약 여러분이 좀 흘렸으면, 휴지를 사용해 닦아주세요!

2. 우유 3.7L를 보울에 붓는다.

    기본적으로 위와 같은 가이드를 갖습니다: 흘리지 마세요. 흘렸으면 깨끗히 닦아주세요!

3. 버터를 힘차게 연어에 문지른다.

    "힘차게"란 말은 수직 운동을 의미합니다. 제 아이 줄리아가 한 때 그리 말했어요.
    > 위 아래로 이리저리 버터를 연어에 문질러주세요.
4. 연어를 우유,계란을 쏟은 보울에 넣는다.

    여기에 연어를 잘 떨어뜨리는 몇가지 기술이 있습니다:
      * 주변에 송어나 어린아이가 있는지 확인하세요.
      * 양손을 사용하세요.
      * 떨어뜨릴 상황을 대비하여 주변에 휴지를 놔두세요.
```

1. 보울에 계란 3개를 깨뜨린다.

    여러분은 흘리지 않고 계란을 깨뜨리고 싶을거에요.

    만약 여러분이 좀 흘렸으면, 휴지를 사용해 닦아주세요!

2. 우유 3.7L를 보울에 붓는다.

    기본적으로 위와 같은 가이드를 갖습니다: 흘리지 마세요. 흘렸으면 깨끗히 닦아주세요!

3. 버터를 힘차게 연어에 문지른다.

    "힘차게"란 말은 수직 운동을 의미합니다. 제 아이 줄리아가 한 때 그리 말했어요.
    > 위 아래로 이리저리 버터를 연어에 문질러주세요.
4. 연어를 우유,계란을 쏟은 보울에 넣는다.

    여기에 연어를 잘 떨어뜨리는 몇가지 기술이 있습니다:
      * 주변에 송어나 어린아이가 있는지 확인하세요.
      * 양손을 사용하세요.
      * 떨어뜨릴 상황을 대비하여 주변에 휴지를 놔두세요.

(위와 마찬가지로 튜토리얼에서는 공백 하나 또는 둘을 넣어 가능했지만, VS Code와 깃허브에서는 탭 하나 또는 둘을 넣거나 공백 2칸 또는 4칸을 넣어야한다.)

---

### 7. Table

테이블은 다음과 같이 `|`와 `-`를 적절히 조합해 만들면 된다.
```markdown
| Number | Next number | Previous number |
| ------ |--- | --- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |
```

| Number | Next number | Previous number |
| ------ |--- | --- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |

---

### 8. Code Blocks

(```)을 앞뒤로 감싸서 만든다.

시작 부분의 (```) 뒤에

(```javascript) 뒤에 언어를 적어주면 `highlighter`가 적용된다.

```javascript
const hello = name => console.log(`Hello ${name}`);
```

