---
layout: post
title: UX/UI의 10가지 심리학 법칙
subtitle: 사용자의 마음을 읽는 인간 중심 제품과 서비스 디자인
excerpt_image: NO_EXCERPT_IMAGE
categories: [ux/ui]
tags: [ux, ui, jakob, fitts, hick, miller, postel, peak end, aesthetic usability, von restorff, tesler, doherty threshold]
---

### 0. What is UX/UI 👩‍💻

우선 이 책은 `존 야블론스키의 UX/UI의 10가지 심리학 법칙`을 읽고 정리한 글이다.  

#### 1. User Experience

사용자 경험(<span style="color: red;">U</span>ser E<span style="color: red;">x</span>perience) 라는 용어는
1993년 애플 근무 당시 `도널드 노먼`이 만든 용어다. [제이콥의 법칙](#h-1-jakobs-law-제이콥의-법칙-) 을 만든 `제이콥 닐슨`과 
`닐슨 노먼 그룹`을 설립한다. 노먼은 전기공학을 전공하고 심라학 박사 학위를 받은 인지심리학자로 디자인의 초점을 사용자에게 맞추는 것에 
주목했다.

> UI 가 소프트웨어 기술과 디자인 자체에 초점을 맞추는 것과 달리, UX 는 사용자에게 초점을 맞추었다는 것이 가장 큰 차이점이다. 

이 책의 저자인 야블론스키 역시 사용자 경험이 중요하다는 것을 알고는 있지만 확실한 근거 없이 개선해야한다는 이야기에 대한 모순점에서 출발했다. 
그는 심리학 논문을 실증적 증거로 활용해 이해관계자들에게 의사 결정의 근거로 제시할 수 있는 법칙을 여러 가지 정리해
[Laws of UX] 를 통해 공개했다. 이 책은 이 사이트에 소개된 21가지 법칙 중 더욱 유용한 법칙 10가지를 정리한 글이다.

#### 2. 10 Rules of UX/UI

이 책을 통해 소개되는 10가지 법칙은 다음과 같다.

- [1. Jakob's Law (제이콥의 법칙) 👩‍💻](#1-jakobs-law--제이콥의-법칙--)  
  사용자는 여러 사이트를 이용하며 많은 시간을 보낸다. 그래서 자신이 이미 알고 있는 다른 사이트들과 같은 방식으로 작동하길 원한다. 
- [2. Fitts's Law (피츠의 법칙) 👩‍💻](#2-fittss-law--피츠의-법칙--)  
  대상에 도달하는 시간은 대상까지의 거리, 대상 크기와 함수 관계에 있다.
- [3. Hick's Law (힉의 법칙) 👩‍💻](#3-hicks-law--힉의-법칙--)  
  의사결정에 걸리는 시간은 선택지의 개수와 복잡성에 비례해 늘어난다.
- [4. Miller's Law (밀러의 법칙) 👩‍💻](#4-millers-law--밀러의-법칙--)  
  보통 사람은 작업 기억`Working Memeory` 에 7(±2) 개의 항목밖에 저장하지 못한다.
- [5. Postel's Law (포스텔의 법칙) 👩‍💻](#5-postels-law--포스텔의-법칙--)  
  자신이 행하는 일은 엄격하게, 남의 것을 받아들일 때는 너그럽게.
- [6. Peak-End Rule (피크엔드 규칙) 👩‍💻](#6-peak-end-rule--피크엔드-법칙--)  
  인간은 경험 전체의 평균이나 합계가 아니라, 절정의 순간과 마지막 순간에 느낀 감정을 바탕으로 경험을 판단하는 경향이 있다.
- [7. Aesthetic-Usability Effect (심미적 사용성 효과) 👩‍💻](#7-aesthetic-usability-effect--심미적-사용성-효과--)  
  사용자는 보기 좋은 디자인을 사용성이 더 뛰어난 디자인으로 인식한다.
- [8. Von Restorff Effect (폰 레스토프 효과) 👩‍💻](#8-von-restorff-effect--폰-레스토프-효과--)  
  비슷한 사물이 여러 개 있으면 그중에서 가장 차이가 나는 한 가지만 기억할 가능성이 크다.
- [9. Tesler's Law (테슬러의 법칙) 👩‍💻](#9-teslers-law--테슬러의-법칙--)  
  복잡성 보존의 법칙이라고도 알려진 테슬러의 법칙에 따르면, 모든 시스템에는 더 줄일 수 없는 일정 수준의 복잡성이 존재한다.
- [10. Doherty Threshold (도허티 임계) 👩‍💻](#10-doherty-threshold--도허티-임계--)  
  컴퓨터와 사용자가 서로를 기다리지 않아도 되는 속도`0.4초 이하`로 인터랙션하면 생산성은 급격히 높아진다.

---

### 1. Jakob's Law (제이콥의 법칙) 👩‍💻

**사용자는 여러 사이트를 이용하며 많은 시간을 보낸다. 그래서 자신이 이미 알고 있는 다른 사이트들과 같은 방식으로 작동하길 원한다.**

> - 사용자는 자신에게 익숙한 제품을 통해 구축한 기대치를 그와 비슷해 보이는 다른 제품에도 투영한다.
> - 기존의 멘탈 모델(mental model)을 활용하면 사용자가 새 모델을 익히지 않아도 바로 작업에 돌입할 수 있는 뛰어난 사용자 경험이 완성된다.
> - 변화를 꾀할 때는, 사용자에게 익숙한 모델을 한시적으로 이용할 권한을 부여해서 불협화음을 최소화하라.

내비게이션의 위치와 사용 방식, 페이지 레이아웃과 시각적 단서 등이 ***익숙하다는 것***은 사용자가 ***인터페이스를 익히는데 요구되는*** 
`정신적 에너지`줄어들고, 사용자가 ***목표를 성공적으로 달성할 확률이 높아진다는 것***을 의미한다.
<br>

__멘탈 모델__

우리가 어떤 시스템에 관해, 특히 그 시스템의 작동 방식에 관해 알고 있다고 생각하는 바를 가리킨다. 사용자의 멘탈 모델을 따르지 않는 
디자인은 사용자가 인지하는 방식이나 이해하는 속도에 악영향을 미치고, 이를 멘탈 모델 부조화(mental model discordance)가 일어난다.
<br>

__사용자 페르소나__

대상 사용자(target audience)를 명확히 정의해두지 않으면 디자이너마다 대상 사용자를 제각기 다르게 해석하기 때문에 프로세스가 어려워진다. 
사용자 페르소나(user persona)는 이런 문제를 해결하는 데 도움을 준다. 이것은 포괄적인 사용자가 아닌 서비스의 실제 사용자에게서 모든 
데이터를 바탕으로 다음과 같은 가상의 사용자를 만들어 대상 사용자로 활용한다.

![User Persona Examples 1](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/user-persona-templates-examples-1.png){: width="800"}

![User Persona Examples 2](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/user-persona-templates-examples-2.png){: width="800"}

---

### 2. Fitts's Law (피츠의 법칙) 👩‍💻

**대상에 도달하는 시간은 대상까지의 거리, 대상 크기와 함수 관계에 있다.**

> - 터치 대상의 크기는 사용자가 정확하게 선택할 수 있을 정도로 충분히 커야 한다.
> - 터치 대상 사이에 충분한 거리를 확보해야한다.
> - 터치 대상은 인터페이스상에서 쉽게 도달할 수 있는 영역에 배치해야한다.

대상 선택 작업의 난이도를 정량화하는 공식은 다음과 같다.

ID(난이도) = log<sub>2</sub>(2D/W)

D : 대상 중심까지의 거리, W : 대상의 허용 오차 혹은 너비

스마트폰 시대에 들어와 터치 인터페이스는 매우 중요한 요소가 되었다. 마우스와 달리 대상을 정확히 선택하기 힘들어 충분한 크기가 제공되어야 
하기 때문이다. 다음은 터치 대상의 크기에 대한 각 가이드라인의 최소 권장 규격이다.

| 회사/조직                  | 권장 규격          |
|------------------------|----------------|
| 휴먼 인터페이스 가이드라인 (애플)    | 44 x 44 pt     |
| 머티리얼 디자인 가이드라인 (구글)    | 48 x 48 dp     |
| 웹 콘텐츠 접근성 가이드라인 (WCAG) | 44 x 44 CSS px |
| 닐슨 노먼 그룹               | 1 x 1 cm       |

피츠의 법칙을 제대로 이해했다면 다음 규칙을 이해할 수 있을 것이다.

- 스마트폰의 터치 정확도는 중앙이 가장 높고, 화면의 모서리가 가장 낮다.
- 입력 폼의 전송 버튼은 가장 마지막 입력 창의 주변에 배치해 작동의 이동 거리를 최소화한다.

---

### 3. Hick's Law (힉의 법칙) 👩‍💻

#### 1. Hick's Law

**의사결정에 걸리는 시간은 선택지의 개수와 복잡성에 비례해 늘어난다.**

> - 의사결정 시간이 반응 시간에 큰 영향을 받을 때는 선택지의 개수를 최소화하라.
> - 인지 부하를 줄이려면 복잡한 작업을 잘게 나눠라.
> - 추천 선택지를 강조해서 사용자의 부담을 줄여라.
> - 신규 사용자의 인지 부하를 줄이려면 온보딩(onboarding)을 점진적으로 진행하라.
> - 추상적이라고 느껴질 정도로 단순화하지 않도록 주의하라.

측정 가능한 임의의 상수 2가지(a, b)를 기반으로 반응 시간은 다음과 같이 정량화 할 수 있다.

RT(반응 시간) = a + b log<sub>2</sub>(n)

선택지의 개수가 많아짐에 따라 사용자는 인터페이스를 익히고 인터랙션하는 데 필요한 정신적 자원의 소모가 커지게되며, 이때 필요한 정신적 자원의 
크기를 인지 부하(cognitive load)라 한다.

#### 2. Examples 1 - Apple Remote 

![TV Remote](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/tv-remote.jpg){: width="800"}

![Apple TV Remote](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/apple-tv-remote.jpeg){: width="800"}

#### 3. Examples 2 - Tutorials

![Tutorial](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/tutorial.png){: width="800"}

일반적으로 튜토리얼을 가장 잘 제공하는 것이 게임 앱이다. 화면에 많은 요소와 기능이 있고, 이를 제한된 선택 범위를 제공해 순차적으로 가리키며 
사용자를 학습시킨다.

> 단, 지나친 단순화는 오히려 사용자의 인지 부하를 높이는 역효과가 발생할 수 있다. 예를 들어 애플의 인터페이스와 같이 제한된 개수 내에서 
> 제한된 아이콘을 반복적으로 보여주는 경우 사용자는 글을 읽는 대신 아이콘만 인지해 바로 원하는 인터랙션을 정확히 처리할 수 있다.
> 
> 하지만 난해한 아이콘 또는 너무 많거나 매번 변화되는 아이콘 그룹은 오히려 인지 부하를 높이게 된다. 따라서 이런 경우는 오히려 아이콘 대신 
> 텍스트 내비게이션을 사용하거나 아이콘에 텍스트를 함께 표기하는 것이 인지 부하를 줄이게 된다.

---

### 4. Miller's Law (밀러의 법칙) 👩‍💻

**보통 사람은 작업 기억`Working Memeory` 에 7(±2) 개의 항목밖에 저장하지 못한다.**

> - '마법의 숫자 7'을 내세워서 불필요한 디자인 제약을 정당화하지 마라.
> - 사용자가 쉽게 처리하고 이해하고 기억할 수 있게 콘텐츠 덩어리를 작게 나눠 정리하자.
> - 단기 기억 용량은 사람에 따라, 그리고 기존 지식과 상황적 맥락에 따라 달라진다는 것을 기억하자.

밀러의 법칙은 1956년 인지심리학자 조지 밀러가 `마법의 숫자 7, 더하거나 빼기 2: 정보 처리 용량에 관한 몇 가지 한계`
(The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information) 라는 
논문 에서 제창되었다.

이 법칙이 알아낸 것을 요약하면 다음과 같다.

- 성인이 되어도 한 번에 기억하는 개수는 7개다(사람별 편차를 고려해 7±2개가 됨).
- 기억량에 큰 영향을 미치는 다른 요소는 chuck(덩어리)다.

하지만 보통 사람들이 두 번째 덩어리 개념은 놓치고 단순히 7개만 기억을 한다. 덩어리가 중요하다는 것은 다음을 보자.

- 0327549515
- 032) 754 - 9515

무려 10자리나 되는 전화번호지만 덩어리 되지 않은 정보는 읽거나 기억하기 힘든 반면 덩어리된 형태는 누구나 어렵지 않게 읽고 기억해낼 수 있다.

즉, 밀러의 법칙에서 중요한 것은 개개의 요소를 7개 전후로 제한하는 것이 아니라 덩어리를 7개 내외로 제한하는 것이다.

![Chunk 1](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/chunk1.png){: width="800"}

![Chunk 2](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/chunk2.png){: width="800"}

내비게이션이 5개로 그룹화 되어있다. 그리고 그 내비게이션 하위 항목 역시 5개의 덩어리로 그룹화 되어있다. 더 이상 그룹화가 존재하지 않는 
개개의 요소는 이미 7개를 아득히 넘어서지만 덩어리로 구분지어 놓았기 때문에 작은 인지 부하만으로도 이를 충분히 이해하고 원하는 인터랙션을 
정확히 처리할 수 있다.

---

### 5. Postel's Law (포스텔의 법칙) 👩‍💻

#### 1. Postel's Law

**자신이 행하는 일은 엄격하게, 남의 것을 받아들일 때는 너그럽게.**

> - 사용자가 어떤 작동이나 입력을 하든지 공감하는 태도로 유연하고 관대하게 대처하라.
> - 인터페이스의 안정성과 접근성을 보장하되, 입력, 접근성, 성능 면에서 만반의 준비를 하자.
> - 다양한 가능성에 대해 잘 예측하고 대비할수록 디자인 회복탄력성은 좋아진다.
> - 사용자의 가변적인 입력을 수용해서 기계가 이해할 수 있는 방식으로 해석하라. 입력의 한계를 정의하고 사용자에게 명확한 피드백을 제공하라.

인간은 기계처럼 행동하지 않는다. 주의가 산만해지기도 하고, 실수도 하고, 감정에 많은 것을이 영향을 받는다. 그리고 무엇보다 
필요 이상의 정보([Hick's Law](#h-3-hicks-law-힉의-법칙-))를 받아들이게 되면 인지 부하가 커지고 귀찮음과 스트레스를 느끼게 된다
(블로그 주인 본인이 매우 그렇다 😂😂😂). 이를 의사 결정 피로감(decision fatigue)라고 한다.

그렇기 때문에 인터페이스와 시스템은 이런 다양한 사용자를 포용할 수 있도록 쉬워야하며, 2가지 이상의 접근 방식을 허용할 경우 어떤 방식을 
이용하든 사용자가 일부 오류를 입력하든 안정성을 보장해야한다.

따라서 `포스텔의 법칙`은 `견고함의 법칙`이라고도 불리며, 이를 정의한 존 포스텔은 위 원칙을 적용해 TCP 초기 모델을 구현했다. 
이것은 보낼 때는 명세를 준수해 보내지만 받을 때는 의미가 명확하다면 명세를 따르지 않아도 너그럽게 받아들인다. 
즉, 장애 허용(fault tolerance)으로 인해 인터넷 통신은 안정성을 얻었고, 네트워크 분야의 표준으로 자리잡음은 물론이고, 나아가 소프트웨어 
아키텍쳐 분야도 영향을 미쳤다.

이 영향을 받은 대표적인 예가 *HTML*, *CSS* 같은 선언형 언어들이다. 이들 역시 오류를 느슨하게 다룸으로 일부 장애가 생겨도 브라우저는 
이를 허용해 문제 없이 화면을 렌더링한고 사용자는 아무런 문제가 없는 것처럼 정상적으로 사이트를 이용할 수 있다. 
즉, 더 나은 UX 를 제공한다는 뜻이고, 이러한 유연성은 사용자를 불러모으고, 다수의 사용자가 모인다는 것은 힘을 갖는다는 것을 의미한다.

#### 2. Examples 1 - Apple Face ID

생체 인증이 없다면 사용자는 앱이 요구하는바에 따라 이메일 인증을 하기도 하고, 문자 인증을 하기도 하고, 비밀번호 입력 혹은 별도의 핀번호, 
패턴 등 수많은 다양성에 맞춰 보안을 해제하기 위해 앱이 요구하는바에 따라 입력을 해야했다. 이것은 사용자에게 많은 것을 기억하고, 그에 따라 
대처해야함을 의미한다.

하지만 생체 인증은 사용자는 적은 노력으로 일관되며 손쉽게, 하지만 더욱 견고하고 안전하게 보안을 해제한다.

#### 3. Examples 2 - Progressive Enhancement

구글은 기존에 PC 체계를 기반으로 검색 시스템을 만들었기 때문에 텍스트 검색만을 이용했다.

하지만 모바일 기기가 대세가 되며 음성은 물론 사진을 사용할 수 있게 되었고, 이를 통한 검색이 가능하도록 검색창을 확장했다. 하지만 이를 
대체하는 것이 아닌 기존의 검색창에 아이콘을 추가해 기존 인터페이스와 새로운 인터페이스를 모두 포용하고 사용자가 이를 선택하도록 했다.

#### 4. Examples 3 - Amazon i18n

웹이나 앱을 디자인 할 때 모국어로만 디자인 하는 경우가 많다. 문제는 이렇게 만들어진 앱이나 웹은 다국어 서비스를 할 때 늘어나거나 줄어든 
글자수로 인한 디자인 깨짐을 경험하게 된다.

모바일 시대에 들어와 기존의 웹이 `유동형 그리드`, `가변 이미지`, `미디어 쿼리` 등을 어떤 기기를 이용하든 콘텐츠에 초점을 맞추고 스타일과 
인터랙션을 점진적으로 쌓아가 비슷한 사용자 경험을 할 수 있도록 하는 반응형 디자인은 많이 볼 수 있지만 여기에 다국어까지 고려한 반응형 
디자인을 제대로 처리하는 곳은 많지 않다. 예를 들어 알리익스프레스 같은 곳은 다국어라곤 하지만 단순 번역기를 이용한 수준에 불과해 
번역이 어색한 것을 둘째 치고 디자인이 어색해지는 결과를 보인다.

아마존은 다국어 처리는 물론, 폰트 크기에 따른 디자인 변형까지 수많은 다양성을 포용하는 좋은 예를 보여준다.

---

### 6. Peak-End Rule (피크엔드 규칙) 👩‍💻

#### 1. Peak-End Rule

**인간은 경험 전체의 평균이나 합계가 아니라, 절정의 순간과 마지막 순간에 느낀 감정을 바탕으로 경험을 판단하는 경향이 있다.**

> - 사용자 여정 중 가장 강렬한 순간과 마지막 순간을 세심하게 신경 쓰자.
> - 제품이 사용자에게 가장 큰 도움을 주는 순간, 혹은 가장 중요하게 여겨지는 순간, 가장 큰 즐거움을 주는 순간 등을 알아내라.
> - 사람들은 긍정적인 순간보다 부정적인 순간을 더 생생하게 기억한다는 사실을 명심하자.

사실 우리는 피크엔드 규칙은 `끝마무리까지 잘해야한다`, `경사는 안 가도 조사는 꼭 가야한다`는 등 생활의 경험을 통해서 이해하고 있다. 
이것을 단순히 사회 생활의 경험과 같은 어떠하더라가 아닌 증거가 뒷받침되는 실증 논문을 통해 자세히 알아보도록하자.

피크엔드 규칙은 1993년 대니얼 카너먼과 연구진이 발표한 논문 `더 큰 고통을 적은 고통보다 선호하게 하려면 경험의 마지막 순간이 좋아야 한다`
(When More Pain Is Preferred to Less: Adding a Better End) 를 통해 처음 실증을 통한 증거가 제시되었다. 이것은 인간의 
인지 편항(cognitive bias)에 기반한다. 어떤 일련의 사건에 대해 떠올릴 때 그 사건의 스펙트럼이 아닌, 절정의 순간과 마지막 경험에 의해 
경험을 평가한다는 것을 알아냈다. 또한 긍정적인 경험보다 부정적인 경험이 더 생생하다는 것을 확인했다.

즉, 사용자가 어떤 앱 또는 웹을 사용할 때 전반적으로 좋은 경험을 했더라도 순간의 불쾌한 경험의 정도가 크거나 마지막 경험이 좋지 못하면 
평가를 낮게 줄 것이고, 나아가 주변에 추천할 확률이 줄어든다.

#### 2. Examples 1 - 404 Pages

인터넷을 하는 중 요청한 페이지를 찾을 수 없을 경우 `404` 응답 페이지를 보게 된다.

![Default 404 Page](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/default-404-page.png){: width="600"}

사용자의 요청을 웹사이트가 수행하지 못함으로 인해 스트레스를 받고 부정적인 경험을 할 것이다. 이런 상황이 발생하지 않는 것이 가장 좋겠지만 
어쩔 수 없는 상황은 생기기 마련이다. 그렇다면 이런 상황에서 사용자에게 재치있는 화면을 출력해 부정적인 경험의 크기를 줄이도록 노력할 수 있다. 
다음은 훌륭한 404 페이지의 예다.

![Amazon 404 Page](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/amazon-404-page.jpg){: width="600"}

![Pixar 404 Page](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/pixar-404-page.jpg){: width="600"}

![Lego 404 Page](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/lego-404-page.jpg){: width="600"}

#### 3. Examples 2 - Loading Pages 

기존에는 앱이나 웹이 로딩이 오래걸릴 경우 화면이 멈춘 것처럼 보였다. 이런 경우 사용자는 응답이 지연됨으로 인해 불편함을 느끼는 것에 추가로
자신의 요청이 여전히 수행중인지 혹시 정지되지는 않았는지 알 수 없어 그 스트레스는 배가 된다. 따라서 최근 앱이나 웹은 자신의 요청이 
수행중이라는 메시지를 로딩 화면을 통해 보여준다. 이런 시각적 요소는 사용자가 안심하고 좀 더 자신의 요청을 기다리도록 만든다.

![Apple Loading](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/apple-loading.gif){: width="600"}

![Whatsapp Loading](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/whatsapp-loading.gif){: width="600"}

![Funny Loading](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/funny-loading.gif){: width="600"}

#### 4. Examples 3 - Uber

피크엔드 규칙을 종합적으로 잘 활용한 예 중 하나로 우버를 들 수 있다. 우버는 승차 공유 서비스라는 비즈니스 모델의 특성상 대기 시간이 
불가피하다는 것을 깨닫고 고객의 부정적인 경험을 줄이도록 다음 3가지에 주목했다.

- 유휴 시간에 대한 거부감: 배정된 차량이 도착할 때까지 차량의 이동 경로 및 상태를 애니메이션으로 볼 수 있다.
- 작동상의 투명성: 도착 예상 시간뿐 아니라 이것이 계산되는 방법에 대한 정보도 확인할 수 있디.
- 점진적 목표 달성: 차량이 다가오는 것을 애니메이션으로 보며 탑승이라는 자신의 목표 달성을 향해 진전하고 있다고 느낀다.

우버의 이런 노력 요소는 사용자들이 택시를 기다리는 동안 발생할 수 있는 부정적 경험을 효과적으로 컨트롤 해 앱에 좋은 인상을 남긴다.

---

### 7. Aesthetic-Usability Effect (심미적 사용성 효과) 👩‍💻

**사용자는 보기 좋은 디자인을 사용성이 더 뛰어난 디자인으로 인식한다.**

> - 보기 좋은 디자인은 인간의 뇌에 긍정적 반응을 일으켜서 사용자로 하여금 제품이나 서비스의 사용성이 뛰어나다는 생각이 들게 한다.
> - 제품이나 서비스의 디자인이 보기 좋으면, 사용자는 사소한 사용성 문제에 비교적 관대해진다.
> - 시각적으로 만족스러운 디자인은 사용성 문제를 가리고 사용성 테스트 중에 문제가 드러나는 것을 방해할 수 있다.

`보기 좋은 떡이 먹기도 좋다`는 말이 있다. 예전부터 음식 플레이팅에 대해 중요하게 생각했고, 그 결과 *푸드스타일리스트*라는 직업까지 존재한다. 
심지어 레오나르도 다 빈치는 최후의 만찬을 그릴 때 어떤 음식을 올리고 어떻게 배치할지 고민하는데 많은 시간을 사용했다고 한다.

우아한 디자인은 긍정적인 반응을 일으켜 사용성이 뛰어나다는 생각이 들게 만든다. 이런 현상을 심미적 사용성 효과
(aesthetic-usability effect)라 하며 이 영향은 1995년 히타치 디자인 센터의 연구원 쿠로스 마사아키와 카시무라 카오리가 수행한 연구와, 
2000년 노엄 트랙틴스키 연구진의 `아름다운 것이 사용하기 좋다`(What Beautiful is Usable)라는 연구를 통해 다시 한 번 입증되었다.

사실 앱이나 웹이 디자인의 중요성을 크게 느낀 것은 그리 오래되지 않았다. 앱이나 웹같은 소프트웨어에서도 디자인이 중요하다고 이야기하고 
고민하는 것은 이전에도 있긴 했을 것이다. 하지만 과거의 웹사이트는 결코 디자인적으로 훌륭했다고 말하기 어렵지 않았나 생각이 된다. 오늘날 
이것을 가장 잘 이해하고 고민하는 회사 중 하나는 단연 애플이라고 생각한다.

애플의 디자인 팀은 다른 회사의 디자인 팀과 달리 힘이 세기로 유명하다. 그만큼 고 스티브 잡스가 디자인을 중요하게 생각했으며, 그것이 
사용자에게 좋은 경험을 선사했고, 이것은 지금까지 유지되고 있다. 애플은 제품의 외형인 실물 디자인 뿐 아니라 앱의 디자인은 물론이고 그것을 
다루는 인터페이스 과정에 제품 포장 디자인까지 모든 디자인을 공들여 다루었다. 심지어 애플은 일반적으로 사용자가 보지도 않을 내부 하드웨어 
부품과 그 배치에 대한 디자인까지 신경을쓴다. 이를 두고 애플의 변태같은 디자인 디테일이라며 놀라는 밈까지 있을 정도다.

![Apple's graceful design](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/apple's-graceful-design.jpg)

애플 이전에 다른 회사들도 디자인의 중요성을 알았고 많은 고민을 했다고 이야기할지 모르겠으나 블로그 주인이 볼 때 결코 애플만큼은 아니었다. 
아마 많은 사람이 동의하지 않을까 생각된다. 애플 아이폰의 성장 배경에는 뛰어난 하드웨어도 있지만 누구나 처음 떠올리는 이미지는 애플의 
제품 디자인과 소프트웨어의 UX/UI 다. 

---

### 8. Von Restorff Effect (폰 레스토프 효과) 👩‍💻

#### 1. Von Restorff Effect

**비슷한 사물이 여러 개 있으면 그중에서 가장 차이가 나는 한 가지만 기억할 가능성이 크다.**

> - 중요한 정보나 핵심 동작은 시각적으로 눈에 띄게 하라.
> - 시각적 요소를 강조할 때는 제한을 두어서, 각 요소 간 경쟁을 피하고 가장 중요한 항목이 광고로 오인되지 않게 하라.
> - 특정 요소를 강조할 때 색상에만 의존하면 색맹이나 저시력인 사용자가 배제된다는 사실을 유념하라.
> - 움직임을 활용해서 대비를 전달할 때는 움직임에 민감한 사용자를 주의 깊게 고려하라.

폰 레스토프 효과(von Restorff effect)는 독일의 심리학자이자 소아과 의사였던 헤드윅 폰 레스토프가 1933년 격리 효과를 이용한 연구에서 
유사한 항목보다 대비되는 항목을 더 잘 기억한다는 사실로부터 시작되었으며, 이는 1978년 후일 셸리 테일러와 수전 피스크가 입증하기도 했다.

디지털 인터페이스를 접할 때 사용자는 시각적으로 대비되는 요소에 빠르게 주의를 빼앗긴다는 점에 주목해야한다. 따라서 사용자의 목표 달성을 
돕는 동시에 이들을 인터페이스의 어떤 부분에 집중하게 할지 관리하는 것이 중요하다. 어떤 항목을 넣을 때 그 색상과 크기, 형태, 위치, 움직임은 
사용자의 주의를 끄는 요소가 되므로 강조해야 할 것과 시선을 빼앗기지 말아야 할 것을 신중히 고민해야한다.

#### 2. Examples 1 - NY Times

![NY Times](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/nytimes.png)

지면의 크기와 타이틀의 크기를 이용해 강조할 요소를 구별하고있다.

#### 3. Examples 2 - iPhone Badge

![iPhone Badge](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/iphone-badge.jpg){: width="600"}

배지를 이용해 사용자에게 다른 앱 아이콘보다 우선적으로 앱의 알림이 얼마나 있는지 확인하도록 정보를 제공한다.

#### 4. Examples 3 - Popup

![Popup](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/delete-popup.png){: width="600"}

삭제 팝업의 버튼 색을 달리 하여 사용자에게 주의를 환기시킴은 물론, 실수로 삭제할 경우 취소가 불가능한 작업이기 때문에 실수로 삭제를 
누르지 않도록 취소 버튼을 시각적으로 강조하고있다.

---

### 9. Tesler's Law (테슬러의 법칙) 👩‍💻

#### 1. Tesler's Law

**복잡성 보존의 법칙이라고도 알려진 테슬러의 법칙에 따르면, 모든 시스템에는 더 줄일 수 없는 일정 수준의 복잡성이 존재한다.**

> - 모든 프로세스에는 디자인 시 처리할 수 없는 기본적인 복잡성이 존재하므로, 시스템이나 사용자 중 한쪽이 감당해야 한다.
> - 내재된 복잡성을 디자인과 개발 과정에서 처리하면 사용자의 부담을 최소로 줄일 수 있다.
> - 추상적으로 느껴질 정도로 인터페이스를 단순화해서는 안 된다.

우리가 아는 교류 전기의 아버지 니콜라 테슬라(Nikola Tesla)가 아니다. 1980년 컴퓨터 과학자 레리 테슬러(Larry Tesler)가 인터랙션 
개발 업무를 수행하던 중 사용자가 앱과 인터랙션 하는 방식이 앱 만큼 중요하다는 사실을 알아냈다. 

따라서 앱과 사용자 인터페이스 양쪽 모두의 복잡성을 줄이는 게 중요하다. 하지만 모든 앱과 프로세스에는 완전히 없애거나 감출 수 없는 일정량의 
복잡성이 존재함을 깨달았다.

> 복잡성을 줄이기 위해 단순성을 추구하는 것은 애플이 미니멀리즘 디자인이 더 뛰어나다는 것을 보여준 후로 많은 디자인이 추구하는 방식이다. 
> 그리고 단순성을 극대화한 예가 아이콘인데, 이 아이콘은 단순성을 넘어 추상성으로 바뀌는 것이다. 문제는 아이콘은 사람에 따라 다른 의미로 
> 해석될 수도 있기 때문에 주의해야한다. 이를 줄이기 위해 아이콘은 항상 의도가 명확하고, 동작에 일관성이 있어야한다. 그렇지 못한 아이콘은 
> 지나친 추상화로 인해 사용자의 목적 달성을 저해하는 시각적 소음으로 전락하고 만다.

#### 2. Examples 1 - e-mail

이메일을 작성하고 보내기 위해서는 `발신인`, `수신인`의 정보가 반드시 필요하다. 이 정보가 없다면 발송이 불가하므로 이메일에 있어서 
이 부분은 필수적인 복잡성에 해당한다.

대신 복잡성을 완전히 제거하는 것은 불가능하므로, 복잡성을 줄이는 방향을 생각해야한다. 바로 받는 사람의 이름 또는 이메일 주소 일부를 
입력하면 일치하는 대상이 모달창으로 제안되고, 해당 모달을 통해 바로 입력할 수 있도록한다.

또한 실수로 보내는 것이 아니라면 이메일에서 내용 또한 필수에 가까운 복잡성에 해당한다. 메일앱을 이용하면 시작 인사와 마무리 인사, 
이메일 발송인 서명까지 자동으로 처리해주곤한다. 그만큼 사용자는 자신의 목적에 집중할 수 있게 된다. 심지어 요즘엔 AI 가 학습 데이터를 
이용해 답장 내용까지 미리 제안하거나 입력하곤한다.

#### 3. Examples 2 - Shopping Site

대부분의 쇼핑몰은 사용자가 제품을 결제할 때 복잡성을 줄이기 위해 주소지와 결제 방식을 사용자가 등록했거나 마지막 사용한 정보를 저장했다 
자동으로 불러온다. 특히 각종 간편결제 서비스는 가장 번거롭던 결제 정보 입력 단계를 효과적으로 줄여준다. 이제 사용자는 결제 시점에 
원하는 카드를 선택하고 생체 인증을 하기만 하면 된다.

그리고 아마존은 여기서 더 나아가 오프라인에서도 이를 적용했다. 그 과정은 놀라울 정도인데 고객이 아마존 앱을 설치하고 매장에 들어가서 
물건을 들고 나오기만 하면 AI 가 자동으로 구입한 물건을 결제한다.

---

### 10. Doherty Threshold (도허티 임계) 👩‍💻

#### 1. Doherty Threshold

**컴퓨터와 사용자가 서로를 기다리지 않아도 되는 속도`0.4초 이하`로 인터랙션하면 생산성은 급격히 높아진다.**

> - 사용자의 주의가 분산되는 것을 막는 동시에 생산성도 향상시키려면 시스템 피드백을 `0.4초 이내`에 제공하라.
> - 반응 시간을 개선하고 체감 대기 시간을 줄이려면 체감 성능을 활용하라.
> - 애니메이션은 로딩이나 프로세싱이 진행되는 동안 사람들의 시선을 끄는 한 가지 방법이다.
> - 설사 정확하지 않다고 해도 진행표시줄을 보여주면 사용자는 대기 시간에 좀 더 관대해진다.
> - 실제 작업이 훨씬 빨리 완료되더라도, 의도적으로 작업 완료를 늦게 알리면 체감 가치를 높이고 신뢰를 형성하는 데 도움이 되기도 한다.

HTTP 아카이브에 따르면 2010년 데스크탑 페이지의 평균 페이지 용량이 609KB 였던 것에 비해 2019년 에는 2MB 정도로 늘어났다. 또한 
모바일 페이지 용량도 1.7MB 수준에 이른다. 물론, 과거보다 통신 속도 역시 빨라졌지만 항상 빠른 통신이 보장되는 것은 아니다. 더군다나 
웹페이지의 용량은 조금씩 커지는 추세다. 이로써 대기시간이 길어지는 것이 사용자에게 답답함을 유발할 수 있다. 심지어 대기시간이 너무 
길어지면 많은 사용자는 아예 사용을 포기하기에 이른다.

도허티 임계는 과거 반응 시간의 임계값이 2초로 여겨지던 개발 문화에 의문을 제기하면서 시작되었다. 1982년 IMB 직원이 반응 시간이 0.4초 
이하일 때 `생산성은 반응 시간 감소의 정비례 이상으로 증가한다`는 논문을 통해 컴퓨터와 사용자가 기다리지 않아도 되는 속도로 인터랙션할 때 
생산성이 급격히 높아지고, 직원들의 만족도가 높아지며, 작업 결과의 품질도 개선된다고 주장했다. 컴퓨터 반응시간이 생산성에 불균형한 영향을 
미친다는 도허티의 발견을 바탕으로 도허티 임계라고 알려진 새로운 표준이 탄생했다.

> - 0.1초 이내 : 반응이 즉각적이라고 느낌
> - 0.1 ~ 0.3초 사이 : 지연이 눈으로 감지되는 수준으로 사용자는 해당 시스템이 자신의 통제에서 벗어나고 있다고 느낀다.
> - 0.3 ~ 0.4초 사이 : 생산성이 감소하며 효율적인 생산성을 위한 반응 지연의 임계값이다.
> - 0.4 ~ 1.0초 사이 : 생산성 감소가 더 커진다.
> - 1.0초 이상 : 사용자가 집중하기 어려워지고, 작업 수행에 필요한 정보를 놓치기 시작한다. 인지 부하가 커지고 사용자 경험이 나빠진다.

#### 2. Give a feedback if it takes long time

어떤 경우는 처리 시간이 오래 걸려서 또는 네트워크 통신 상황 등 외부 요인에 영향을 받아서 도허티 임계가 규정한 0.4초 이하를 지킬 수 
없지만 개선할 방법이 없을 때도 있다. 이럴 때는 사용자가 기다리는 것에 불편을 느끼지 않도록 사용자에게 처리 시간이 필요하다는 것을 
의도적으로 알리는 피드백을 줄 수 있다. 피드백은 받은 사용자는 아직 앱이나 웹이 완전히 로딩되지 않았음을 인지하지만 여전히 앱이 
빠르게 작동한다고 느끼게 된다.

__1 ) Skeleton Screen__

![Skeleton Screen 1](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/skeleton-1.png)

페이스북 같은 플랫폼에서 흔히 볼 수 있는 사례로 화면의 뼈대를 먼저 그릴 후 콘텐츠를 로딩한다. 로딩되는 동안은 placeholder 블럭을 
표시한다. 그리고 실제 텍스트와 이미지와 같은 콘텐츠가 로딩되면서 placeholder 를 채워간다.

![Skeleton Screen 2](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/skeleton-2.png)

그러면 이미 화면의 구조가 모두 잡힌 상태라 콘텐츠 로딩에 따라 화면이 이리저리 움직이는 일이 줄어들고 사용자는 콘텐츠 로딩 속도가 
느려도 기다린다는 느낌이 덜해 속도와 반응성을 더 좋게 인지한다. 

<br>

__2 ) Blur Up__

화면 로딩 시간을 지연시키는 가장 큰 원인은 미디어 데이터다. 특히 이미지가 로딩되어 자리를 잡으면서 화면이 이리저리 움직이는 것은 
사용자의 주의를 산만하게 만들고 사용성이 나쁘다고 느끼게 된다.

위에서 페이스북의 Skeleton Screen 과 비슷한 문제를 해결하기 위한 기법 중 하나로, Skeleton Screen 이 전체 화면의 뼈대를 
잡고 그 위치를 placeholder 처리 한 것과 달리 Blur Up 기술은 실제 이미지를 불러온다. 단, 실제 이미지의 매우 경량화된 버전을 
불러오고, 이걸 디자인 기법인 `Blur Up`을 이용해 필요한 공간의 크기만큼 확대해 뿌려준다. 이후 이미지 로딩이 완료되면 고해상도 
이미지로 교체한다.

![Blur Up](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/medium-blur-up.gif)

이렇게 하면 단순 저해상도 이미지를 크기만 키웠을 때 발생하는 픽셀 깨짐 노이즈 현상이 보이지 않고 그저 흐릿하게 보이기 때문에 
사용자는 로딩 지연에 대한 거부감을 덜게 된다. 더욱이 아무것도 없는 placeholder 보다 시각적으로 더 나은 사용성을 보여준다.

> Blur Up 의 장점은 Skeleton Screen 으로 구성되지 않은 Legacy 화면을 적은 노력을 들여 효과를 볼 수 있다는 장점을 
> 갖는다. 하지만 Blur Up 기법을 사용한다고 Skeleton Screen 기법을 사용하지 못 하는 것은 아니다. 둘 다 적절히 사용하면 
> 더욱 좋은 사용성을 제공할 수 있다.

<br>

__3 ) Progress Bar and Remain Times__

![Mac OS Update](/assets/images/posts/2023-01-16-ten-rules-of-ux-ui/apple-software-update.png)

애플은 OS 업데이트와 같이 오래 걸리는 작업을 할 때 진행 상태를 막대로 표시하고 남은 시간을 알려준다. 이렇게 하면 사용자는 얼마나 
기다려야하는지에 대한 불확실성이 없기 때문에 기다림으로 인한 불만을 덜어낸다.

#### 3. Intentionally Slowing Down

도허티 임계를 통해 반응 시간이 지연됨으로 인해 사용성이 떨어지는 문제에 대해 알아보았다. 하지만 오히려 반응이 빨라 문제가 되는 경우도 
있다. 이런 경우 의도적으로 반응 속도를 느리게 해 사용성을 높이는 역설과도 같은 상황이 존재한다. 예를 들어 반응이 너무 빨라 사용자가 
변화를 인지하지 못 하는 경우 오히려 사용자는 자신의 요청이 제대로 수행되지 않는다고 판단하게된다. 또한 보안과 관련된 민감함 정보를 
다룰때 너무 빠르게 동작하면 안전한 것인지에 대한 의구심을 가져 신뢰도를 떨어뜨리는 역효과가 발생하게된다.

이것은 우리가 발표를 할 때 청중이 반드시 인지해야하는 부분에서 의도적으로 속도를 느리게 하는 것과 마찬가지다. 사용자가 요청에 대한 
변화가 잘 수행되고 있음을 잘 인지할 수 있도록 의도적으로 속도를 늦춰 좋은 사용성을 가지고 있도록 느끼게 만든다.


<br><br>

---
Reference

1. 존 야브론스키. UI/UX의 10가지 심리학 법칙. Edited by 이미령. 책만, 2020.
2. "Laws of UX." Laws of UX. accessed Jan. 16, 2023, [Laws of UX]1.
3. "30 must-see user persona templates." Justmind. July. 30, 2020, [User Persona Templates](https://www.justinmind.com/blog/user-persona-templates/).
4. Kate Rooney. "8 Awesome 404 Page Designs (and Best Practices)." Design Pickle. last modified Jan. 12, 2022, [Awesome 404](https://designpickle.com/creative-hub/website-design/404-page-designs-best-practices/).
5. "Understanding code splitting on facebook.com.", stackoverflow, last modified Jun. 01, 2021, accessed Feb. 3, 2023, [https://stackoverflow.com/questions/67779334/understanding-code-splitting-on-facebook-com](https://stackoverflow.com/questions/67779334/understanding-code-splitting-on-facebook-com).
6. "The “Blur Up” Technique for Loading Background Images." Digital Ocean, last modified Par. 10, 2017, [Blur Up Technique](https://css-tricks.com/the-blur-up-technique-for-loading-background-images/).

[Laws of UX]:https://lawsofux.com
