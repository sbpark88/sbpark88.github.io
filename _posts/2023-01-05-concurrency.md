---
layout: post
title: Swift Concurrency
subtitle: Swift asynchronous and parallel code
categories: swift
tags: [swift docs, asynchronous, parallel, threads, asynchronous functions, asynchronous sequences, for-await-in, async-let, async, await, yield, main, mainActor, task, task groups, cancel, actor, sendable types, concurrency domains]
---

### 1. Asynchronous and Parallel 👩‍💻

`Swift`는 구조화된 방법으로 `Asynchronous`, `Parallel` 코드 작성을 지원한다.

- `Asynchronous code`는 `Single Thread`로 작동해 한 번에 하나의 코드만 실행이 가능하지만, 코드를 잠시 중단 후 다시 재개할 수 있는 
   코드 블럭으로, `Fetching data` 또는 `Parsing files`와 같은 `long-running background task`을 요청 후 기다리는 동안 
  `UI Update`와 같은 `short-term`을 수행할 수 있다.
- `Parallel code`는 `Multi Threads`로 작동해 한 번에 코드의 여러 부분을 동시에 실행한다.

이러한 `Concurrent code`는 여러 작업을 동시에 수행할 수 있도록 한다. 이런 코드를 작성할 때는 외부 시스템을 기다리는 작업을 일시 
중단함으로써 `Memory-safe`한 방식으로 코드를 쉽게 작성할 수 있다.

`Asynchronous code`와 `Parallel code`로 인한 `scheduling` 유연성 추가는 코드의 복잡성 증가를 수반한다. 
대신 `Swift's language-level support`를 지원하여 `Compiler`가 문제를 찾을 수 있도록 한다. 예를 들어 `Actor`를 사용해 
`mutable state`에 안전하게 접근할 수 있도록 하는 것과 같은 의도를 표현하도록 해 `compile-time checking`을 가능케 한다.

`Concurrent code` 코드를 사용할 때 유의해야 할 점은 이것이 느리거나 버그가 있는 코드를 빠르고 정확하게 작동하도록 해준다는 보장이 
없다는 것이다. 오히려 `Concurrency`는 코드의 디버깅을 어렵게 해 문제를 해결하기 어렵게 만든다. `Asynchronous code`와 
`Parallel code`는 이 로직이 필요한 곳에서만 적절히 사용해야한다. `Fetching data`와 같이 외부 요인에 의한 지연을 기다리는 것이 아닌 
내부적으로 느린 코드는 코드의 비즈니스 로직의 문제를 찾아 해결해야지 `Concurrency`를 통해 해결하려 해서는 안 된다.

> `Swift`에서 `Concurrency model`은 스레드의 최상단에서 작동하지만 직접적으로 상호작용 하지 않는다. `Swift`의 
> `Asynchronous Function`은 실행 중인 스레드를 중단할 수 있다. 그러면 첫 번째 `Asynchronous Function`이 중단된 동안 
> 동일 프로그램의 다른 `Asynchronous Function`이 해당 스레드에서 실행될 수 있다. 따라서 `Asynchronous Function`이 재개될 때 
> 어떤 스레드가 그 함수를 실행할지에 대해 아무런 보장도 하지 않는다.

<br>

`Swift’s language support` 없이도 Concurrent code 를 작성할 수 있으나 코드를 읽기 어렵다. 아래 코드는
`Swift’s language support` 없이 작성된 Concurrent code 로 갤러리에서 사진 이름 목록을 다운로드하고, 이 목록에서 다시 첫 번째 
사진을 다운로드해 사용자에게 보여주는 코드다.

```swift
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

`Swift`에서 `Asynchronous Functions`를 정의하는 방법은 함수를 정의할 때 `arrow(->)` 앞에 `async` keyword 를 작성하는 것으로 
정의된다.

```swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

`Asynchronous Functions`가 에러를 `throws` 하는 경우 `async throws` 순서로 keyword 를 작성한다. 

```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

> `Asynchronous Functions` 실행이 중단되는 경우는 다른 비동기 함수를 호출하는 경우만 해당된다.  
> 즉, `await` 키워드를 사용해 기다린다는 것은 다른 비동기 함수의 반환을 기다린다는 의미이다. `TypeScript`에서 `await`를 사용한다는 
> 것은 `Promise` 객체를 반환하는 함수의 종료를 기다린다는 것을 의미했다. `Swift`에서도 마찬가지로 `await`를 사용한다는 것은 
> `completion handler`가 있는 함수의 종료를 기다린다는 것을 의미한다.

> 참고로 `async` keyword 와 `throws` keyword 를 함꼐 쓸 때는 `async throws` 순서로 작성했으나, `await` keyword 와 
> `try` keyword 를 함께 쓸 때는 `try await` 순서로 작성한다.

따라서 위에서 갤러리에서 사진 이름 목록을 다운로드하고, 첫 번째 사진을 다운로드 후 보여주는 코드는 다음과 같이 변경될 수 있다.

```swift
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)
```

> 1. `await` 중단점이 있는 `listPhotos(inGallery:)` 함수를 호출 후 `return`이 반환될 때까지 실행을 중단한다.
> 2. 이 코드가 중단된 동안 `long-running background task`가 필요한 동일 프로그램의 다른 
>    `Concurrent code`(like `Asynchronous Functions`) 를 실행된다. 다른 `Concurrent code` 역시 다음 
>    `await` 중단점이 표시된 코드까지 진행 후 중단되거나 더이상 중단점이 없다면 해당 함수가 종료될 때까지 계속 진행된다.
> 3. `listPhotos(inGallery:)`가 `return`되며 코드가 재시작되고, 변수 `photoNames`에 반환된 값을 assign 한다.
> 4. 다음 중단점인 `await`를 만나기 전까지 `Synchronous code`를 진행한다.
> 5. `await` 중단점이 있는 `downloadPhoto(named:)` 함수를 호출 후 `return`이 반환될 때까지 실행을 중단한다. '2.' 와 
>    마찬가지로 이 코드가 중단된 동안 다른 `Concurrent code`가 실행된다.
> 6. `downloadPhoto(named:)`가 `return`되며 코드가 재시작되고, 변수 `photo`에 반환된 값을 assign 한다.
> 7. 이후 다른 중단점이 없으므로 코드는 다시 `Synchronous`하게 진행되어 `show(photo)`를 호출해 사진을 보여준다.

> `await` 중단점은 코드의 실행을 중단하고 해당 스레드에서 다른 코드를 실행하기 때문에 이를 스레드 양보(yielding the thread) 라고 
> 부른다. 이것은 코드의 실행을 중단할 수 있어야하므로, 앱의 특정 위치에서만 `Asynchronous Functions` 또는 `Asynchronous Methods`를 
> 호출할 수 있으며 그 특정 위치는 다음과 같다.
>
> - `Asynchronous Function/Method/Property`의 `context(or scope)` 내부 (`async` keyword 로 쓰여진 `Closure`를 생각하면 된다)
> - `@main`이 markd 된 `Structure/Class/Enumeration`의 `static main()` 메서드의 `context` 내부
> - [Unstructured Concurrency](#h-2-unstructured-concurrency) 에 나온 것과 같은 `Unstructured child task`

#### 2. Encapsulation the Code within an Asynchronous Code

비동기 함수 내에서 `await` keyword 사이의 다른 코드는 `Synchronous`로 동작하며 코드를 순차적으로 실행한다. 하지만 이것 만으로는 
충분하지 않은 케이스가 존재한다. 다음 코드는 사진을 `Road Trip` 갤러리에 추가하고, `Summer Vacation` 갤러리에서 삭제하는 코드다.

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto toGallery: "Road Trip")
// At this point, firstPhoto is temporarily in both galleries.
remove(firstPhoto fromGallery: "Summer Vacation")
```

그리고 `add(_:toGallery:)`와 `remove(_:fromGallery:)` 사이에 다른 코드는 없다. 일시적이지만 이 순간 사진은 양쪽 모두에 존재하게되고, 
앱의 불변성(invariant) 중 하나를 임시적으로 위반한다. 만약, 이 두 코드 사이에 `await` 가 추가된다면 앱의 불변성 위반은 일시적이 아니라 
오랜 시간 지속될 수도 있게된다. 따라서 이 코드 덩어리(chunk)는 `await` keyword 가 추가되면 안 된다는 것을 명시적으로 표현하고 분리시키기 
위해 이를 리팩토링해 `Synchronous Function/Closure`로 분리시켜야한다.

```swift
func move(_ photoName: String, from source: String, to destination: String) {
    add(photoName, to: destination)
    remove(photoName, from: source)
}
// ...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

이로써 `move(_:from:to:)` 함수는 `await` 중단점을 추가할 경우 `Swift's language-level support`애 의해 `compile-time error`가
발생하므로, `Synchronous` 동작을 보장 받을 수 있다.

---

### 3. Asynchronous Sequences (Iterating Over an Asynchronous Sequences) 👩‍💻

앞에서 본 `listPhotos(inGallery:)` 함수는 `Asynchronous Function`으로 `Collection`이 모두 준비될 때까지 기다렸다 결과를 
한 번에 `Array`로 `return`한다.

그리고 이와 다른 접근 방법으로, `Asynchronous Sequence`가 있다. 이것은 `Collection`이 모두 준비될 때까지 기다리지 않고, 준비 되는 
`elements`를 지속적으로 `return`하는 것이다. 즉, `Collection`이 모두 준비될 때까지 기다리지 않고 `Iterating`을 할 수 있다.

`Iterating Over an Asynchronous Sequence`는 `for-await-in`를 이용해 접근한다.

```swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

위 코드에서 `handle`은 파일의 모든 데이터를 한 번에 준비하지 않고 라인 하나를 읽은 후 `iteration`이 진행됨에 따라 중단/재개를 반복한다.

> - `Sequence` protocol 을 추가함으로써 `Custom Types`를 `for-in` loop 로 사용할 수 있다.
> - `AsyncSequence` protocol 을 추가함으로써 `Custom Types`를 `for-await-in` loop 로 사용할 수 있다.

> `Swift`의 `for-await-in`은 `JavaScript`의 [for-await-of][MDN - for await...of]와 비교해서 보면 좋을 것 같다.

---

### 4. Calling Asynchronous Functions in Parallel 👩‍💻

`downloadPhoto(named:)` 함수는 `Fetching data`를 하는 함수로 `Asynchronous`로 동작한다. 따라서 `await` 중단점을 만나 코드가 
중단된 동안 다른 `Concurrent code`가 실행될 수 있지만 다음과 같은 경우 매번 `await`를 만날 때마다 정지 후 다운로드를 완료하고 재개하는 
것을 반복한다. 즉, 앞에서 요청한 사진이 완전히 다운로드 되기를 기다린 후 순차적으로 다운로드 받는다.

```swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

각 사진은 멀티 다운로드를 하는 것이 더 효율적이다. 따라서 위 3개의 `Asynchronous Function`은 다음과 같이 한 번에 요청 후 
코드를 중단한 다음 모두 완료된 후 한 번에 재개할 수 있다.

```swift
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

`Asynchronous Function`이 호출된 후 `return`이 반환되는 시점에 `await`를 거는 것이 아니라, 변수에 데이터가 assign 되는 것을 
기다리도록 `Asynchronous Property`를 이용하고, 이를 `Array`에 담아 `await`를 걸어준다.  
이렇게 하면 각각의 `downloadPhoto(named:)` 함수는 `await` 중단점이 없기 때문에 다운로드를 기다리지 않고 다음 
`downloadPhoto(named:)`를 호출하기 때문에 동시에 여러 개의 `Asynchronous Function`를 호출하게되고, `Asynchronous Property` 
가 담긴 `Array`에 `await` 중단점이 걸려 있기 때문에  값이 모두 assign 되는 것을 기다린 후 재개된다.

> `Swift`의 `await [func1, func2]`은  `JavaScript`의 [Promise.all()][MDN - Promise.all()]와 비교해서 보면 좋을 것 같다.

```javascript
const [result1, result2] = await Promise.all([func1(), func2()])
```
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
2. "Sendable", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 05, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/Sendable](https://developer.apple.com/documentation/swift/sendable)
3. "for await...of", MDN Web Docs, last modified Dec. 14, 2022, accessed Jan. 10, 2023, [MDN - for await...of][MDN - for await...of]
4. "Promise.all()", MDN Web Docs, last modified Dec. 14, 2022, accessed Jan. 10, 2023, [MDN - Promise.all()][MDN - Promise.all()]

[MDN - for await...of]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
[MDN - Promise.all()]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
