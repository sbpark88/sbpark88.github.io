---
layout: post
title: Swift Concurrency
subtitle: Swift asynchronous and parallel code
categories: swift
tags: [swift docs, asynchronous, parallel, threads, asynchronous functions, asynchronous sequences, for-await-in, async-let, async, await, yield, main, mainActor, task, task groups, cancel, actor, sendable types, concurrency domains]
---

### 1. Asynchronous and Parallel 👩‍💻

Swift 는 구조화된 방법으로 `Asynchronous`, `Parallel` 코드 작성을 지원한다.

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
> 것은 `Promise` 객체를 반환하는 함수의 종료를 기다린다는 것을 의미했다.
> 
> 하지만 기존의 `Promise` 객체를 직접 생성하던 방식과 달리 `async`, `await`를 사용하면 `then..then..then..catch...finally` 형태의 
> chaining 대신 성공했을 경우 이미 resolved 상태의 값을 unwrapping 해 반환하고, 에러는 catch 를 통해 처리한다.  
> 즉, 일반 코드를 작성하듯 코딩하며 `try-catch`를 통해 코드를 작성할 수 있다.

```typescript
const asyncStr: () => Promise<string> =
    async () => {
        // throw Error('throw error!!')
        return 'first'
    }
```

- without async/await

```typescript
const printOneTwo: () => void =
    () => {
        let str: Promise<string> = asyncStr()    // Must be returned as (Promise, state is resolved) or (Promise, state is reject)
        str.then((value: string) => console.log(value))
            .catch((error: string) => console.error(error))
            .finally(() => console.log('second'))
    }
printOneTwo()
```

```console
first
second
```

- with async/await

```typescript
const printOneTwo: () => void =
    async () => {
        try {
            let str: string = await asyncStr()  // This returned as unwrapped, (string) or (Error)
            console.log(str)
        } catch (e) {
            console.error(e)
        }
        console.log('second')
    }
printOneTwo()
```

```console
first
second
```

> Swift`의 `async`, `await`도 이와 유사하다. `await`를 사용한다는 것은 `Task`라는 하나의 작업 단위가 종료되고 
> `return`의 반환값을 기다린다는 것을 의미한다. 

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

> - `Sequence` protocol 을 추가함으로써 `Custom Types`를 `for-in loops` 로 사용할 수 있다.
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

#### 1. Structured Concurrency

`Task`는 프로그램의 일부를 `Asynchronously` 하게 실행할 수 있는 작업의 단위(A unit of asynchronous work)를 말하며, 
모든 `Asynchronous code`는 `Task`의 일부로써 실행된다. 앞에서 본 `async-let` syntax 는 `Task` 내에 `Child Task`를 만들어 낸다. 
`Child Task`가 여러 개일 경우 이를 관리하기 위한 `Task Group`을 생성하고, 이 그룹에 `Child Task`를 추가할 수 있다. 이를 그룹화 함으로써 
우선순위와 취소를 더 잘 제어할 수 있으며, 동적으로 작업의 수를 생성할 수 있다.

```swift
await withTaskGroup(of: Data.self) { taskGroup in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        taskGroup.addTask { await downloadPhoto(named: name) }
    }
}
```

`Task Group`과 각 `Task`는 `parent-child` 구조를 갖는다. `Task Group` 안의 각각의 `Child Task`는 동일한 `Parent Task`를 
갖는다. 그리고 이 각각의 `Child Task`는 또 다른 `Child Task`를 가질 수 있다. 이들은 `Task Group`으로 묶인 `hierarchy` 구조를 
채택하고 있으며, 이들 `Task Group`과 `Tasks` 관계를 `Structured Concurrency`라 한다.

> `Structured Concurrency`는 정확성에 대한 *일부* 책임(some responsibility for correctness)이 사용자에게 
> 주어지지만 이로써 `Swift`는 `Propagating Cancellation`을 처리할 수 있으며, `compile-time error`를 감지할 수 있다.


- `Task`에 대한 추가 정보는 [Task][Apple Developer Documentation - Task] 를 참고한다.
- `Task Group`에 대한 추가 정보는 [TaskGroup][Apple Developer Documentation - TaskGroup] 을 참고한다.

#### 2. Unstructured Concurrency

`Structured Concurrency`에서 `Tasks`는 `Task Group`에 속해 동일한 `Parent Task`를 갖는 것과 달리 
`Unstructured Task`는 `Parent Task`를 갖지 않는다. 이를 `Unstructured Concurrency`라 한다. 

따라서 프로그램이 요구하는대로 `Unstructured Task`를 관리할 수 있는 완전한 유연성(complete flexibility)을 갖는 대신, 
정확성에 대한 *완전한* 책임(completely responsibility for correctness)이 사용자에게 주어진다.

<p class="center">
  With great flexibility comes great responsibility
</p>

> 1. 현재 `Actor`에서 실행되는 `Unstructured Task`를 생성하기 위해서는 
>    [Task.init(priority:operation:)](https://developer.apple.com/documentation/swift/task/init(priority:operation:)-5k89c) 
>    initializer 를 호출해야한다.
> 2. 현재 `Actor`가 아닌 분리된 작업(detached task)로 `Unstructured Task`를 생성하기 위해서는 
>    [Task.detached(priority:operation:)](https://developer.apple.com/documentation/swift/task/detached(priority:operation:)-8a4p6) 
>    class method 를 호출해야한다.
> 
> 두 작업은 모두 결과를 기다리거나(wait), 취소하는(cancel) 상호 작용을 할 수 있는 `Task`를 반환한다.

```swift
let newPhoto = // ... some photo data ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

#### 3. Task Cancellation

`Swift`의 `Concurrency`는 협동 취소 모델(Cooperative Cancellation Model)을 사용한다. 각의 `Tasks`는 실행 중 적절한 시점에 
취소되었는지를 확인 후, 적절한 방식으로 취소에 응답한다.

`Task Cancellation`은 수행중인 작업에 따르며, 일반적으로 다음 중 하나를 의미한다.

- Throwing an error like CancellationError 
- Returning nil or an empty collection 
- Returning the partially completed work

작업이 취소되었는지를 확인하려면 다음 둘 중 한 가지 방법을 사용한다.

- `Task`가 취소되면 `CancellationError`를 throw 하는 
  Type Method [Task.checkCancellation][Apple Developer Documentation - checkCancellation] 를 호출한다.
- Type Property [Task.isCancelled][Apple Developer Documentation - isCancelled] 의 값을 확인한다.

그리고 취소가 확인된다면, 현재의 코드에서 취소를 처리(handle)해야한다. 예를 들어, `downloadPhoto(named:)`이 취소된 경우, 
`1. 부분 다운로드를 삭제`하고, `2. 네트워크 접속을 닫음`을 처리해야한다. 그리고 취소를 수동으로 전파하려면 
Instance Method [Task.cancel()][Apple Developer Documentation - cancel] 를 호출한다.

---

### 6. Actors 👩‍💻

#### 1. Actors in Swift

프로그램을 `isolated, concurrent pieces` 으로 분리시키기 위해 `Task`를 사용할 수 있다. 기본적으로 `Tasks`는 isolated 되어 있어 
동시에 실행하는 것이 안전하지만 `Tasks` 사이에 정보를 공유할 필요가 있는데 이때 `Actors`를 사용한다. `Actors`는 
`Concurrent code` 간에 정보를 안전하게 공유할 수 있게 한다.

`Actors`는 `Reference Types`로 Classes 와 비슷하지만, Classes 와 다르게 Actor 는 동시에 하나의 `Task`만 `mutable state`의 
접근을 허용하므로, 여러 `Tasks`가 동시에 하나의 `Actor` instance 와 상호작용해도 안전하다.

즉, `Actors`의 `mutable state`에 접근하기 위해서는 `isolated`된 `Task` 단위로 접근해야한다. 이로 인해 접근하는 즉시 
요청한 값을 반환 받는다는 보장이 없기 때문에 `var`로 선언된 변수 또는 메서드에 접근하기 위해서는 반드시 `await`을 이용해 접근해야한다.

> - `let`으로 선언한 변수에 접근할 때는 `await` keyword 를 명시하지 않아도 된다. `immutable`이기 때문에 `Asynchronous work`가 
>   일어나지 않기 때문이다.
> - `var`로 선언한 변수라 하더라도 이 변수는 `actor-isolated property`이므로 외부 `context`에서 임의로 값을 수정하는 
>   것은 불가능하다. `mutable`이기 때문에 반드시 `await` keyword 를 이용해 접근해야한다.
> - 메서드는 반환값이 없는 메서드라 하더라도 암시적으로 `Void`라는 타입 특수한 값(`()` 로 쓰여진 `Empty Tuple`)을 반환한다.  
>   그리고 단순히 메서드의 타입만으로는 이 메서드가 `Actor`의 `mutable state`와 상호작용을 하지 않는다는 것을 보장할 수 없다. 
>   예를 들어 따라서 `Dictionaries`의 값을 조회시 항상 `Optional`로 반환하는 것처럼 `Actor`의 모든 메서드는 호출시 
>   항상 `await` keyword 를 이용해 접근해야한다.

다음 예제는 온도를 기록하는 `Actor`다.

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```

`Actors`는 `actor` keyword 를 이용해 정의한다. 위 `TemperatureLogger` actor 는 3개의 properties 를 가지고 있으며, 
그 중 `max`는 `var`로 선언되었으며, `private(set)` modifier 애 의해 `get`은 `internal`, `set`은 `private`의 
`Access Level`을 갖는다.

#### 2. Actor Isolation

`Swift`는 `Actor`의 `local state`에 접근할 수 있는 것은 `Actor`의 `context`로 제한함으로써 `Asynchronous work`에서도 
`mutable state`를 안전하게 공유할 수 있음을 보장(guarantee)한다.

잠시 후에 자세히 살펴보겠지만, 이 보장성으로 `Actor`의 `let` properties 를 제외한 모든 `var` properties 와 `Methods`는 
반드시 `await` keyword 를 이용해 접근해야하며, 그렇지 않으면 에러가 발생한다.

`Swift`의 이런 보장성을 `Actor Isolation`이라 한다. 

#### 3. Class with private properties

`Actor`가 `Class`와 어떻게 다른지 알아보기 위해 위와 다음과 같이 `TemperaturLogger`를 `Class`를 만들어 `Actor`와 
비교해보도록하자.

```swift
class TemperatureLogger {
    let label: String
    var measurements: [Int]
    private var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }

    func getMax() -> Int {
        max
    }
}
```

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(logger.label)     // Outdoors
print(logger.max)       // error: 'max' is inaccessible due to 'private' protection level
print(logger.getMax())  // 25
````

`private` modifier 에 의해 `get`과 `set` 모두 `private`의 `Access Level`을 갖기 때문에 외부 `context`에서 
직접 접근이 불가능하다.

#### 4. Class with private(set) properties

이제 `max`의 modifier 를 `private(set)`으로 바꿔보자.

```swift
class TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }

    func getMax() -> Int {
        max
    }
}
```

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(logger.label)     // Outdoors
print(logger.max)       // 25
print(logger.getMax())  // 25
```

이제 `max` property 는 `get`은 `internal`, `set`은 `private`의 `Access Level`을 갖기 때문에 `getter` 
메서드 없이 외부에서 접근이 가능하다.

#### 5. Actor with private property

그렇다면 `Actor`에서의 `private`은 어떻게 동작할까?

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }

    func getMax() -> Int {
        max
    }

    func greeting(name: String) {
        print("Hello~ \(name)")
    }
}
```

```swift
Task {
    let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
    print(logger.label)                             // Outdoors
    print(logger.max)                               // error: 'max' is inaccessible due to 'private' protection level
    print(await logger.getMax())                    // 25
    await logger.greeting(name: "Actor Methods")    // Hello~ Actor Methods
}
```

- logger.label : `Class`와 마찬가지로 `Task`로 격리되어있다면 `let`으로 선언되어 `immutable`이므로 외부 
                 `context`에서 자유롭게 접근이 가능하다.
- logger.max : `get`과 `set` 모두 `private`의 `Access Level`을 갖기 때문에 외부 `context`에서
               직접 접근이 불가능하다.
- logger.getMax() : `getMax()` 메서드는 `Actor`의 메서드이므로 `await`을 이용해 접근해야한다.
- logger.greeting(name:) : 어떠한 `mutable state`와 상호작용을 하지 않는다. 하지만 `greeting(name:)` 메서드 역시 
                           `Actor`의 메서드이므로 `await`을 이용해 접근해야한다.
  
#### 6. Actor with private(set) property

이제 원래대로 돌아와 `private(set)`으로 바꿔보자.

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }

    func getMax() -> Int {
        max
    }
}
```

```swift
Task {
    let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
    print(await logger.label)               // Outdoors, No 'async' operations occur within 'await' expression
    print(logger.label)                     // Outdoors
    logger.measurements[0] = 0              // error: actor-isolated property 'measurements' can not be mutated from a non-isolated context
    print(logger.max)                       // error: expression is 'async' but is not marked with 'await'
    print("1. \(await logger.max)")         // 1. 25
    await print("2. \(logger.max)")         // 2. 25
    print("3. \(await logger.getMax())")    // 3. 25
    await print("4. \(logger.getMax())")    // 4. 25
}
```

> 이번엔 모든 케이스에 대해 살펴보며 `Actor`의 `mutable state`와 `immutable`의 차이도 함께 살펴본다.
> 
> - await logger.label : `let`으로 선언한 변수이므로 비동기로 동작하지 않는다. 따라서 정상 작동하지만 `await`는 무시되고 
>                        컴파일러는 `await`을 지울 것을 요구한다.
> - logger.label : `let`으로 선언되어 `immutable`이므로 비동기로 동작하지 않으므로 `await` 없이도 `Actor`의 값에 정상적으로 접근할 수 있다.  
>                  (단, `Actor` 자체에 대한 접근은 반드시 `Task` 안에서 이루어져야한다)
> - logger.measurements[0] = 0 : `var`로 선언되었지만 `measurements`는 `actor-isolated property` 이므로 `Actor`의 
>                                `context` 외부에서 수정이 불가능하다.
> - logger.max : `private(set)`이므로 `get`은 `internal`, `set`은 `private`의 `Access Level`을 갖는다. 따라서 
>                `Class`와 마찬가지로 `getter` 메서드 없이 외부에서 접근이 가능하다. 하지만 `var`이기 때문에 `await` 없이 
>                 접근하는 것은 불가능하다.
> - logger.max / logger.getMax() : `print(_:)`에 값을 넘기기 전에 `await`을 걸든, `print`를 하기 전에 `await`를 걸든 
>                                  모두 정상적으로 동작한다. 

#### 7. Extensions of Actor

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}

extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```

`Swift`의 `Extensions`는 `extension` keyword 를 이용해 `Class`, `Structure`, `Enumeration`, `Protocol`을 
확장한다. 이는 `Objective-C`의 `Categories`와 유사하다. 그리고 필자의 눈에는 `TypeScript`의 `Prototypes`와도 듀사해보인다.

즉, `update(with:)` 메서드는 이미 `Actor` 내부에 있는 것이기 때문에 `Actor`의 `context`에 포함되므로 `await` keyword 
없이 `mutable state`에 접근할 수 있다.

---

### 7. Sendable Types 👩‍💻

#### 1. Concurrency Domain

`Tasks`와 `Actors`는 프로그램의 일부를 조각으로 분리시켜 `Concurrent code`가 안전하도록 만든다. `Task` 또는 `Actor` instance 의 
내부에 `var`로 선언된 `mutable state`를 포함하는 경우가 있는데 이를 `Concurrency domain`이라 한다. 이렇게 `mutable state`를 
포함하지만 동시 접근(overlapping access)에 대해 보호되지 않는 경우는 `Concurrency domain` 간에 공유될 수 없다.

#### 2. Sendable Protocol

`Concurrency domain` 간에 공유될 수 있는 타입을 `Sendable Types`라 한다. `Sendable Types`는 `Actor`의 메서드를 호출할 때 
`arguments`로 전달되거나 `Task`의 결과로써 반환될 수 있다.

`Value Types`는 언제나 안전한 공유가 가능하다. 따라서 `Concurrency domain` 간에도 안전하게 공유할 수 있다.

반면, `Reference Types`는 `Concurrency domain` 간에 전달하기에 안전하지 않다. `Class`가 `mutable properties`를 포함하고, 
순차적 접근(serialize access)을 하지 않는다면, 서로 다른 `Tasks` 간에 `Class`의 instance 를 전달할 때 예측 불가능하고 
잘못된 결과를 전달할 수 있다(무분별한 순서로 접근할 경우 `Reference Types`의 값이 의도한 시점이 아닌데도 불구하고 변경될 수 있다).

이 문제를 해겷하기 위해 우리는 `Sendable Protocol` 을 준수하도록(conformance) 선언해 `Sendable Types`로 만들 수 있다. 
`Sendable Protocol`은 코드적인 요구사항(code requirements)은 없지만, Swift 가 강제하는 의미론적인 요구사항(semantic requirements)이 있다.

<br>

[Apple Developer Documentation][Apple Developer Documentation - Sendable] 의 설명을 다시 읽어보자.

`Sendable Types`의 값은 하나의 `Concurrency domain`에서 다른 `Concurrency domain`으로 안전하게 보낼 수 있다. 예를 들어, 
`Sendabl Values`는 `Actor`의 메서드를 호출할 때 `arguments`로 전달될 수 있다. 다음은 모두 `Sendable`로 표시 가능하다(marked as sendable).

- Value Types
- Reference types with no mutable storage
- Reference types that internally manage access to their state
- Functions and closures (by marking them with `@Sendable`)

이 프로토콜은 `required methods`나 `required properties`와 같은 요구사항은 없지만, `compile-time`에 강제되는 의미론적인 요구사항이 
있다. 그리고 <span style="color: red">*__Sendable__*은 반드시 *__Type__*이 선언된 파일 내에서 선언되어야한다</span>. 
이러한 요구사항에 대해서는 아래 번호에 이어서 설명한다.

Compiler 의 강제성 없이 Sendable 을 선언하려면 `@unchecked Sendable`를 작성한다. 이 경우 정확성에 대한 책임이 사용자에게 있으며, 
사용자는 `lock` 또는 `queue`를 이용해 타입의 상태에 대한 모든 접근을 보호해야한다. 또한 이 `Unchecked conformance to Sendable`은 
`Sendable`이 반드시 `Type`이 선언된 파일 내에서 선언되어야 한다는 규칙 역시 따르지 않는다.

#### 3. Sendable Structures and Enumerations

Structures 와 Enumerations 가 Sendable Protocol 을 만족시키기 위해 `Sendable Members` 와 `Associated Values` 만 가져야한다.

일부 케이스의 경우 암시적으로 `Sendable`을 따르는데 그것은 다음과 같다.

- `Frozen` structures and enumerations
- Structures and enumerations that `aren’t public` and `aren’t marked @usableFromInline`.

그 외 경우는 `Sendable`에 대한 적합성을 명시적으로 선언해야한다.

Structures 가 `nonsendable stored properties`를 가지고 있거나, Enumerations 가 `nonsendable associated values`를 가지고 
있다면 `final class`로 선언할 수 없으므로 `Sendable` 적합성을 따를 수 없다. 따라서 이 경우 위에서 설명했듯이 `@unchecked Sendable`를 표시해 
`compile-time error`를 비활성화 한 후 사용자가 직접 해당 `Types`가 `Sendable Protocol`의 의미론적인 요구사항(semantic requirements)을 
만족하는지 검증해야한다.

- Conformance to Sendable with Final Class

```swift
final class Abc: Sendable {
    let x: String
    init(x: String) {
        self.x = x
    }
}
```

- marked as `@unchecked Sendable` 

```swift
class Abc: @unchecked Sendable {
    let x: String
    
    init(x: String) { self.x = x }
}
```

#### 4. Sendable Actors

`Actors`는 모든 `muatble state`에 순차적인 접근만 허용하기 때문에 암시적으로 `Sendable`을 만족한다.

#### 5. Sendable Classes

`Classes`가 `Sendable Protocol`을 따르기 위해서는 다음을 만족해야한다.

- Be marked final
- Contain only stored properties that are immutable and sendable
- Have no superclass or have NSObject as the superclass

<br>
__1 ) `@MainActor`가 표시된 `Classes`는 암시적으로 `Sendable`을 만족한다.__

`Main Actor`는 자신의 `state`에 대한 모든 접근을 조정하기 때문에 암시적으로 `Sendable`을 만족하며, 이 `Classes`는 
`mutable`하며 `nonsendable`한 Stored Properties 를 저장할 수 있다.

__2 ) Verify conform to sendable protocol manually__

위 사항을 따르지 않는 `Classes`에 `@unchecked Sendable`을 표시하고 사용자가 적합성을 만족하는지 확인한다.


#### 6. Sendable Functions and Closures

`Sendable Protocol`을 따르게 하는 대신 `@Sendable` attribute 사용해 `Sendable Functions` 또는 `Sendable Closures`임을 
나타낼 수 있다. 함수 또는 클로저의 모든 값은 `Sendbale`을 만족해야한다.  
추가로 클로저는 오직 `Value` 캡처만 사용해야하며, 그 값은 반드시 `Sendable Type`이어야 한다.

`Task.detached(priority:operation:)` 호출과 같이 `Sendable Closures`를 예상하는 `context`에서 요구사항을 만족하는 클로저는 
암시적으로 `Sendable`을 만족한다.

다음과 같이 `Type Annotation`의 일부로 `@Sendable`을 표시하거나 `parameters`의 앞에 `@Sendable`을 표시함으로 명시적으로 
`Sendable`을 만족함을 나타낼 수 있다.

```swift
let sendableClosure = { @Sendable (number: Int) -> String in
    if number > 12 {
        return "More than a dozen."
    } else {
        return "Less than a dozen"
    }
}
```

#### 7. Sendable Tuples

`Sendable Protocol`을 만족하기 위해서는 `Tuples`의 모든 elements 가 `Sebdable`을 만족해야하며, 조건이 만족되면 
`Tuples` 역시 암시적으로 `Sendable`을 만족한다.

#### 8. Sendable Metatypes

`Int.Type`과 같은 `Metatypes`는 암시적으로 `Sendable`을 만족한다.


<br><br>

---
Reference

1. "Concurrency", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Jan. 05, 2023, [Swift Docs Chapter 17 - Concurrency](https://docs.swift.org/swift-book/LanguageGuide/Concurrency.html)
2. "for await...of", MDN Web Docs, last modified Dec. 14, 2022, accessed Jan. 10, 2023, [MDN - for await...of][MDN - for await...of]
3. "Promise.all()", MDN Web Docs, last modified Dec. 14, 2022, accessed Jan. 10, 2023, [MDN - Promise.all()][MDN - Promise.all()]
4. "Task", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 11, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/Concurrency/Task][Apple Developer Documentation - Task]
5. "TaskGroup", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 11, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/Concurrency/TaskGroup][Apple Developer Documentation - TaskGroup]
6. "checkCancellation()", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 11, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/../checkCancellation()][Apple Developer Documentation - checkCancellation]
7. "isCancelled", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 11, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/../isCancelled][Apple Developer Documentation - isCancelled]
8. "cancel()", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 11, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/../cancel()][Apple Developer Documentation - cancel]
9. "Sendable", Apple Developer Documentation, last modified latest(Unknown), accessed Jan. 13, 2023, [Apple Developer Documentation - Swift/Swift Standard Library/Sendable][Apple Developer Documentation - Sendable]
10. "Sendable and @Sendable in Swift", Mobikul, last modified Jul. 01, 2022, accessed Jan. 13, 2023, [Mobikul - Sendable and @Sendable in Swift](https://mobikul.com/sendable-and-sendable-in-swift/)

[MDN - for await...of]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
[MDN - Promise.all()]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[Apple Developer Documentation - Task]:https://developer.apple.com/documentation/swift/task
[Apple Developer Documentation - TaskGroup]:https://developer.apple.com/documentation/swift/taskgroup
[Apple Developer Documentation - checkCancellation]:https://developer.apple.com/documentation/swift/task/checkcancellation()
[Apple Developer Documentation - isCancelled]:https://developer.apple.com/documentation/swift/task/iscancelled-swift.type.property
[Apple Developer Documentation - cancel]:https://developer.apple.com/documentation/swift/task/cancel()
[Apple Developer Documentation - Sendable]:https://developer.apple.com/documentation/swift/sendable
