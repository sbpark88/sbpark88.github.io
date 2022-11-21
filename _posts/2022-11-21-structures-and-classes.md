---
layout: post
title: Swift Structures and Classes
subtitle: Choosing Between Structures and Classes
categories: swift
tags: [swift docs, swift structure, swift class]
---

### <span style="color: orange">1. Comparing Structures and Classes 👩‍💻</span>

일반적으로 프로그래밍 언어에서 `Class` 하나에 파일 하나가 필요하다. 하지만 `Swift`는 파일 하나에 여러 개의 `Class`와
`Structure`를 정의할 수 있으며, 외부 인터페이스는 다른 `Class`나 `Structure`가 사용할 수 있도록 자동으로 제공된다.

이는 전통적으로 프로그래밍 언어에서 `Class`의 `instance`는 `Object`인 반면, `Swift`의 `Structures`와
`Classes`는 다른 언어와 비교해 `Functionality`에 가깝다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Structure와 Class의 공통점</span>

- Define `properties` : 값을 저장
- Define `methods` : 기능을 제공
- Define `subscripts` : `Subscript Syntax`를 이용해 값에 접근
- Define `initializers` : 초기 상태를 설정
- Be `extended` : 기본 구현 이상으로 확장
- Conform to `protocols` : 특정 종류의 표준 기능을 제공

#### <span style="color: rgba(166, 42, 254, 1)">2. Class만 갖고 있는 추가적인 기능</span>

- `inheritance` : 다른 `Class`의 특성을 상속
  (`Structure`와 `Protocol`은 다른 `Protocol`을 `adopt` 하는 것만 가능하다.)
- `Runtime` 때 `class instance`의 타입을 해석(interpret)하고, type casting이 가능
- `deinitializers` : `class instance`에 할당된 자원을 해제
- `Reference counting` : `class instance`에 참조를 허용
  (`Structure`는 `Value Types`로 항상 `Copy`되므로, `Reference counting`을 사용하지 않는다.)

> `Class`가 제공하는 추가 기능은 복잡성을 증가시킨다.
> 따라서 `general guideline`에 따르면, `Class`를 사용하는 것이 꼭 필요하거나 더 적합한 경우가 아니면
> 일반적으로 추론하기 쉬운 `Structure`를 선호해야한다고 말한다. 이는 우리가 만드는 대부분의 `Custom Data Types`는
> `Structure`나 `Enumeration`이 되어야 함을 의미한다.

#### <span style="color: rgba(166, 42, 254, 1)">3. Structure와 Class 무엇을 선택할까?</span>

이에 대해 애플은 아래 글을 통해 다음과 같이 이야기한다.

[Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)

1. 기본적으로 `Structure`를 써라
2. Objective-C와 상호 운용이 필요하면 `Class`를 써라
3. 앱 전체에서 데이터의 `identity`를 제어해야한다면 `Class`를 써라
4. 공유 `implementation(구현체)`를 적용하기 위해 `Structure`와 `Protocol`을 써라

<br>
위 3, 4번에 대해 좀 더 자세히 설명해보자.

__3 ) 앱 전체에서 데이터의 `identity`를 제어해야한다면 `Class`를 써라__

두 개의 서로 다른 `class instance`는 서로 같은 `properties`를 갖고, 저장된 값 역시 동일하더라도
`identity operator(==)`(동일 메모리 주소를 가졌는가?)에 의해 서로 다른 것을 확인할 수 있다.

즉, `class instance`를 앱 내에서 공유하면, `instance`의 변경 사항이 해당 `instance`를 참조하는 모든 곳에
공유됨을 의미한다. 이런 `identity`가 필요한 예는 다음과 같다.

- `file handles`
- `network connections`
- `CBCenterManager`와 같은 `shared hardware intermediaries`

> 예를 들어 로컬 데이터베이스 연결을 다루는 코드는 앱 전역에서 데이터베이스를 완전히 제어해야한다. 다라서 이 경우 `Class`를
> 사용하는 것이 적합하다. 단, *__앱에서 `shared database object`에 접근할 수 있는 영역은 제한__*해야한다.
>
> `Class`를 사용하는 것은 앱 내에서 `identity`를 광범위하게 공유한다는 것을 의미하며, 이는 논리 오류가 발생할 가능성을
> 높인다. 따라서 `identity`를 제어할 필요가 없다면 `Structure`를 사용하는 것이 적합하다.

<br>

__4 ) 공유 `implementation(구현체)`를 적용하기 위해 `Structure`와 `Protocol`을 써라__

> `Class`는 `Class Inheritance`와 `Adopt Protocol`을 지원한다.
> `Structure`와 `Protocol`은 `Adopt Protocol`만 지원한다.

그러나 `Structure`와 `Protocol`만으로도 충분히 `Class Inheritance`와 같은
`inheritance hierachies`(상속 계층)의 구현이 가능하다.

처음부터 `inheritance` 관계를 구축하는 경우 `Protocol`을 사용하는 것이 좋다.
`Class`를 상속할 수 있는 것은 `Class`로 제한되지만,
`Protocol`은 `Class` 뿐 아니라 `Structure`, `Protocol`까지 모두에게  상속을 허용하기 때문에
모델링이 훨씬 더 유연해진다.


---

### <span style="color: orange">2. 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>


---

### <span style="color: orange">3. 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>


---

### <span style="color: orange">4. 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>


---




<br><br>

---
Reference

1. "Structures and Classes", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 21, 2022, [Swift Docs Chapter 7 - Structures and Classes](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html)
2. "Choosing Between Structures and Classes", Apple Developer Documentation, last modified latest(Unknown), accessed Nov. 21, 2022, [Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)
