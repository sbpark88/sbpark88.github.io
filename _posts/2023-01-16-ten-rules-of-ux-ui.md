---
layout: post
title: UX/UI의 10가지 심리학 법칙
subtitle: 사용자의 마음을 읽는 인간 중심 제품과 서비스 디자인
categories: ux/ui
tags: [ux, ui, jakob, fitts, hick, miller, postel, peak end, aesthetic usability, von restorff, tesler, doherty threshold]
---

### 0. What is UX/UI 👩‍💻

우선 이 책은 존 `야블론스키의 UX/UI의 10가지 심리학 법칙`을 읽고 정리한 글이다.  

#### 1. User Experience

사용자 경험(<span style="color: red;">U</span>ser E<span style="color: red;">x</span>perience) 라는 용어는
1993년 애플 근무 당시 `도널드 노먼`이 만든 용어다. [제이콥의 법칙](#h-1-jakobs-law-제이콥의-법칙-) 을 만든 `제이콥 닐슨`과 
`닐슨 노먼 그룹`을 설립한다. 노먼은 전기공학을 전공하고 심라학 박사 학위를 받은 인지심리학자로 디자인의 초점을 사용자에게 맞추는 것에 
주목했다.

> UI 가 소프트웨어 기술과 디자인 자체에 초점을 맞추는 것과 달리, UX 는 사용자에게 초점을 맞추었다는 것이 가장 큰 차이점이다. 

이 책의 저자인 야블론스키 역시 사용자 경험이 중요하다는 것을 알고는 있지만 확실한 근거 없이 개선해야한다는 이야기에 대한 모순점에서 출발했다. 
그는 심리학 논문을 실증적 증거로 활용해 이해관계자들에게 의사 결정의 근거로 제시할 수 있는 법칙을 여러 가지 정리해
[Laws of UX][Laws of UX] 를 통해 공개했다. 이 책은 이 사이트에 소개된 21가지 법칙 중 더욱 유용한 법칙 10가지를 정리한 글이다.

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
- [6. Peak-End Rule (피크엔드 법칙) 👩‍💻](#6-peak-end-rule--피크엔드-법칙--)  
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

---

### 3. Hick's Law (힉의 법칙) 👩‍💻

---

### 4. Miller's Law (밀러의 법칙) 👩‍💻

---

### 5. Postel's Law (포스텔의 법칙) 👩‍💻

---

### 6. Peak-End Rule (피크엔드 법칙) 👩‍💻

---

### 7. Aesthetic-Usability Effect (심미적 사용성 효과) 👩‍💻

---

### 8. Von Restorff Effect (폰 레스토프 효과) 👩‍💻

---

### 9. Tesler's Law (테슬러의 법칙) 👩‍💻

---

### 10. Doherty Threshold (도허티 임계) 👩‍💻

---

### 11. 힘에는 책임이 따른다 👩‍💻

심리학을 활용하여 더 직관적인 제품과 경험을 만든다는 게 어떤 의미인지 좀 더 자세히 살펴본다.

---

### 12. 디자인, 심리학을 만나다 👩‍💻

이 책에서 소개한 심리학 법칙을 팀의 목표와 우선순위를 고려해 세운 디자인 원칙을 적용함으로써 실무에 적용하는 과정을 살펴본다.

<br><br>

---
Reference

1. 존 야브론스키. UI/UX의 10가지 심리학 법칙. Edited by 이미령. 책만, 2020.
2. "Laws of UX." Laws of UX. accessed Jan. 16, 2023, [Laws of UX][Laws of UX].
3. "30 must-see user persona templates." Justmind. July. 30, 2020, [User Persona Templates](https://www.justinmind.com/blog/user-persona-templates/).

[Laws of UX]:https://lawsofux.com

