---
layout: post
title: Swift Optional Chaining
subtitle: Optional Chaining as an Alternative to Forced Unwrapping
categories: swift
tags: [swift docs, optional chaining, forced unwrapping, accessing subscripts, linking multiple levels of chaining]
---

### What is Optional Chaining?

`Optional Chaining`은 properties, methods, subscripts 가 `nil`일 가능성이 있는 경우에 안전하게 조회(querying)하고
호출(calling)하기 위한 프로세스다.

`Optional`이 값을 가지고 있을 경우, Property, Method, Subscript 호출은 성공하고, `nil`일 경우 `nil`을 반환한다.
`Multiple queries`는 서로 `chaining` 될 수 있으며, 어느 하나라도 `nil`을 포함한다면 전체 `chain`은 실패한다.

> `Optional Chaining in Swift`는 `Messaging nil in Objective-C`와 유사하지만 `모든 타입에 동작`하며,
> `success of failure`를 확인할 수 있다.

### 1. Alternative to Forced Unwrapping 👩‍💻

Property, Method, Subscript 를 `non-nil` 값으로 얻고싶을 때 할 수 있는 가장 쉬운 방법은 `Forced Unwrapping(!)`이다.
하지만 Forced Unwrapping 은 Optional 이 `nil`일 때 `Runtime Error`를 발생시키는 반면, `Optional Chaining`은
프로세스를 실패하고 `nil`을 반환한다.

> 단, `Optional Chaining`을 통해 얻은 값은 `nil`이 발견되지 않아 프로세스를 성공적으로 진행했더라도 `Optional`이다.
>
> 이는 `Runtime Error`를 발생시킬 수 있는 `Forced Unwrapping(!)` 보다 안전한 방법이지만, `Unwrapping` 한 값을
> 반환하는 `Nil-Coalescing Operator(??)` 보다는 다소 귀찮아 보일 수 있으나, `Nil-Coalescing Operator(??)`는
> 항상 `default` 값을 응답하기 때문에 프로세스의 `success of failure`를 명확히 구분할 수 없으며, `nil`일 경우에도
> `default` 값에 의해 항상 로직이 정상적으로 처리되기 때문에 의도치 않은 결과를 얻을 수 있다는 문제가 있다.
>
> 그렇다면 `Forced Unwrapping(!)`과 `Nil-Coalescing Operator(??)`의 문제를 모두 해결할 수 있는
> `if let` 또는 `guard let`을 이용한 [Optional Binding][Optional Binding] 을 이용하면 되는것 아닐까 생각할 수 있다.
> 물론, `Optional Binding` 한 번으로 해결될 수 있다면, 이 방도 매우 좋은 방법이다. 하지만, 여러 번 `Optional` 가능성이 있을
> 경우, 단순 `Optional Binding`은 `JavaScript`에서 `Promise`의 콜백지옥과 같은 문제를 갖는다.
>
> `Optional Chaining`의 최종 결과값을 `Optional Binding`과 함께 사용함으로써 `Optional Types`를 간결하고 멋지게 처리할 수 있다.

[Optional Binding]:/swift/2022/07/03/if-and-guard.html#h-2-optional-bindingunwrap

```swift
class Person {
    var residence: Residence?
}

class Residence {
    var numberOfRooms = 1
}
```

```swift
let john = Person()
```

`Person`의 instance `john`은 `residence` property 의 기본값으로 `nil`을 갖는다. 그리고 `Residence` class 는
`numberOfRooms` property 의 기본값으로 1 을 갖는다.

<br>

- Forced Unwrapping

```swift
print(john.residence!.numberOfRooms)
// Fatal error: Unexpectedly found nil while unwrapping an Optional value
```

- Optional Binding without Optional Chaining

```swift
if let residence = john.residence {
    print("John's residence has \(residence.numberOfRooms) room(s).")
} else {
    print("john.residence? is nil")
}

// john.residence? is nil
```

- Optional Binding with Optional Chaining

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("john.residence? is nil")
}

// john.residence? is nil
```

<br>

만약, `Optional`의 값이 존재할 경우는 다음과 같이 정상적으로 `Optional Value`를 호출한다.

```swift
john.residence = Residence()

print(john.residence?.numberOfRooms)    // Optional(1)

if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("john.residence? is nil")
}
// John's residence has 1 room(s).
```

---

### 2. Defining Model Classes for Optional Chaining 👩‍💻

---

### 3. Accessing Properties Through Optional Chaining 👩‍💻

---

### 4. Calling Methods Through Optional Chaining 👩‍💻

---

### 5. Accessing Subscripts Through Optional Chaining 👩‍💻

#### 1. Accessing Subscripts of Non-Optional Type

#### 2. Accessing Subscripts of Optional Type

---

### 6. Linking Multiple Levels of Chaining 👩‍💻

<br><br>

---
Reference

1. "Optional Chaining", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 20,
   2022, [Swift Docs Chapter 15 - Optional Chaining](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html)
