---
layout: post
title: Swift Concurrency
subtitle: Swift asynchronous and parallel code
categories: swift
tags: [swift docs, asynchronous, parallel, threads, asynchronous functions, asynchronous sequences, async, await, yield, main, mainActor, task, task groups, cancel, actor, sendable types, concurrency domains]
---

### 1. Asynchronous and Parallel 👩‍💻

`Swift`는 구조화된 방법으로 `Asynchronous`, `Parallel` 코드 작성을 지원한다.

- `Asynchronous code`는 `Single Thread`로 작동해 한 번에 하나의 코드만 실행이 가능하지만, 코드를 잠시 중단 후 다시 재개할 수 있는 
   코드 블럭으로, `Fetching data` 또는 `Parsing files`와 같은 시간이 오래 걸리는 작업을 요청 후 기다리는 동안 `UI Update`와 같은 
   `short-term`을 수행할 수 있다.
- `Parallel code`는 `Multi Threads`로 작동해 한 번에 코드의 여러 부분을 동시에 실행한다.

이러한 `Concurrency code`는 여러 작업을 동시에 수행할 수 있도록 한다. 이런 코드를 작성할 때는 외부 시스템을 기다리는 작업을 일시 
중단함으로써 `Memory-safe`한 방식으로 코드를 쉽게 작성할 수 있다.

`Asynchronous code`와 `Parallel code`로 인한 `scheduling` 유연성 추가는 코드의 복잡성 증가를 수반한다. 
대신 `Swift's language-level support`를 지원하여 `Compiler`가 문제를 찾을 수 있도록 한다. 예를 들어 `Actor`를 사용해 
`mutable state`에 안전하게 접근할 수 있도록 하는 것과 같은 의도를 표현하도록 해 `compile-time checking`을 가능케 한다.

`Concurrency code` 코드를 사용할 때 유의해야 할 점은 이것이 느리거나 버그가 있는 코드를 빠르고 정확하게 작동하도록 해준다는 보장이 
없다는 것이다. 오히려 `Concurrency`는 코드의 디버깅을 어렵게 해 문제를 해결하기 어렵게 만든다. `Asynchronous code`와 
`Parallel code`는 이 로직이 필요한 곳에서만 적절히 사용해야한다. `Fetching data`와 같이 외부 요인에 의한 지연을 기다리는 것이 아닌 
내부적으로 느린 코드는 코드의 비즈니스 로직의 문제를 찾아 해결해야지 `Concurrency`를 통해 해결하려 해서는 안 된다.

> `Swift`에서 `Concurrency model`은 스레드의 최상단에서 작동하지만 직접적으로 상호작용 하지 않는다. `Swift`의 
> `Asynchronous Function`은 실행 중인 스레드를 중단할 수 있다. 그러면 첫 번째 `Asynchronous Function`이 중단된 동안 
> 다른 `Asynchronous Function`이 해당 스레드에서 실행될 수 있다. 따라서 `Asynchronous Function`이 재개될 때 어떤 스레드가 
> 그 함수를 실행할지에 대해 아무런 보장도 하지 않는다.

<br>

`Swift’s language support` 없이도 Concurrency code 를 작성할 수 있으나 코드를 읽기 어렵다. 아래 코드는
`Swift’s language support` 없이 작성된 Concurrency code 로 갤러리에서 사진 이름 목록을 다운로드하고, 이 목록에서 다시 첫 번째 
사진을 다운로드해 사용자에게 보여주는 코드다.

```swifr
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

간단한 코드이지만 `completion handler`가 연속적으로 작성되어야하므로 `Nested Closures`를 사용해야한다. 문제는 이런 코드가 더 
복잡해질 경우 중첩은 더 많은 depth 를 갖게 될 것이고, 이는 코드를 다루기 어렵게 만들 것이다. 이는 `TypeScript`에서 중첩된 
`Promise`의 복잡한 코드와 `async/await`를 사용한 가독성 좋은 우아한 코드를 비교해본 적 있다면 어떤 의미인지 쉽게 이해가 갈 것이다.

`Swift’s language support`를 이용한 `Asynchronous Functions`를 사용한다는 것은 `async/await`를 사용해 코드를 작성하는 
것을 의미한다.

---

### 2. Asynchronous Functions 👩‍💻


---

### 3. Asynchronous Sequences 👩‍💻


---

### 4. Calling Asynchronous Functions in Parallel 👩‍💻


---

### 5. Tasks and Task Groups 👩‍💻

#### 1. Unit of Asynchronous Work

#### 2. Unstructured Concurrency

#### 3. Task Cancellation

---

### 6. Actors 👩‍💻


---

### 7. Sendable Types 👩‍💻

#### 1. Sendable Protocol

#### 2. Sendable Structures and Enumerations

#### 3. Sendable Actors

#### 4. Sendable Classes

#### 5. Sendable Functions and Closures

#### 6. Sendable Tuples

#### 7. Sendable Metatypes

#### 8. Concurrency Domains 



<br><br>

---
Reference

1. "Concurrency", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Jan. 05,
   2023, [Swift Docs Chapter 17 - Concurrency](https://docs.swift.org/swift-book/LanguageGuide/Concurrency.html)
2. "Sendable", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 05, 2022, [Apple Developer Documentation - Swift/Swift Standard Library/Sendable](https://developer.apple.com/documentation/swift/sendable)
