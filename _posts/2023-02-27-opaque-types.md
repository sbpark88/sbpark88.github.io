---
layout: post
title: Swift Opaque Types
subtitle: Hide implementation details about a value’s type. 
categories: swift
tags: [swift docs, opaque type, some type, opaque type vs. protocol type]
---

### 1. Opaque Types 👩‍💻

우리는 이미 [Generics](/swift/2023/02/23/generics.html#h-6-using-a-protocol-in-its-associated-types-constraints) 
에서 `Opaque Types`를 본 적 있다. 함수 또는 메서드의 *return type* 을 `Type`이 아닌 `some Type`으로 바꿔 Type 의 일부임을 암시할 
뿐 명확한 Type 정보를 감춘다.

이렇게 자세한 정보를 감추는 것은 `모듈`과 `모듈을 호출하는 코드` 사이의 `경계(boundaries)`에서 유용하다. *Protocol Type* 의 값을 
반환하는 것과 달리 *Opaque Type* 은 `Type Identity`를 유지한다(*Compiler* 는 Type 의 정보에 접근할 수 있지만, 모듈의 클라이언트는 
접근할 수 없다).

---

### 2. The Problem That Opaque Types Solve 👩‍💻

#### 1. Triangle

*Opaque Types* 가 해결 할 수 있는 문제를 살펴보기 위해 기존의 *Nonopaque Types* 버전의 코드를 만들어보자. 다음은 ASCII 그림 모양을 
그리는 모듈로써 *String* 을 반환하는 `draw()` 함수를 요구사항으로 정의하는 `Shape` protocol 과 이것을 준수하기 위한 `Triangle` 
structure 다.

```swift
protocol Shape {
    func draw() -> String
}

struct Triangle: Shape {
    var size: Int
    func draw() -> String {
        var result: [String] = []
        for length in 1...size {
            result.append(String(repeating: "*", count: length))
        }
        return result.joined(separator: "\n")
    }
}
```

```swift
let smallTriangle = Triangle(size: 3)
print(smallTriangle)    // Triangle(size: 3)
```

그리고 이 `Triangle(size: 3)`이 `draw()` 메서드를 호출하면 *result* 에는 `["*", "**", "***"]`가 담기게 될 것이다. `draw()` 
메서드를 호출하기 전 `joined(separator:)` 메서드의 동작을 먼저 살펴보자.

```swift
var arr = ["*", "**", "***"]
print(arr)                          // ["*", "**", "***"]
print(arr.joined())                 // ******
print(arr.joined(separator: ", "))  // *, **, ***
```

이제 어떤 그림이 그려질지 상상할 수 있을 것이다. 메서드를 호출해 그림을 그려보자.

```swift
print(smallTriangle.draw())
```

```console
*
**
***
```

`*\n**\n***`가 저장되어 위와 같이 출력된다.

#### 2. FlippedShape

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

Generic Types 를 이용해 `FlippedShped` Structure 를 구현했다. 그러나 여기에는 **중요한 제약**이 있는데, 
`뒤집힌 결과(flipped result)는 생성하는데 사용된 Exact Generic Type 을 노출(expose)`시킨다.

```swift
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
```

```console
***
**
*
```

#### 3. JoinedShape

이번에는 *Shape* Protocol 을 준수하는 2개의 *shape* 을 결합하는 Structure 를 정의해보자.

```swift
struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
        top.draw() + "\n" + bottom.draw()
    }
}
```

`JoinedShape<T: Shape, U: Shape>` structure 는 2개의 *shapes* 를 수직으로 결합한다.

이것은 아레의 코드와 같이 *Flipped Triangle* 을 *Another Triangle* 과 결합해 
`JoinedShape<FlippedShape<Triangle>, Triangle>`과 같은 *return type* 을 생성한다.

```swift
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
```

```console
*
**
***
***
**
*
```

*shape* 를 생성하는 것에 대해 자세한 정보를 표출하려면, `Full Return Type`을 명시해야하기 때문에 *ASCII 그림 모양을 그리는 모듈의 
public interface 에 포함되지 않은 Type 이 유출될 수 있다*.

*모듈 내의 코드는 다양한 방법으로 같은 모양을 만들 수 있으며, 모듈 외부의 다른 코드는 이 모듈의 구현 목록과 같은 세부 정보를 알 필요가 없다*. 

따라서 [FlippedShape](#h-2-flippedshape), [JoinedShape](#h-3-joinedshape) 와 같은 `Wrapper Types`는 모듈 사용자에게 
중요하지 않으며, `표시되지 않아야한다`. 모듈의 public interface 는 *shape* 을 결합하거나 뒤집는 것과 같은 작업으로 구성되며, 이러한 
작업은 또 다른 `Shape` 값을 반환한다.

---

### 3. Returning an Opaque Type 👩‍💻

#### 1. Square & makeTrapezoid()

#### 2. flip(_:) & join(_:_:)

#### 3. invalidFlip(_:)

#### 4. FlippedShape

#### 5. repeat(shape:count:)

---

### 4. Differences Between Opaque Types and Protocol Types 👩‍💻

#### 1. protoFlip(_:)

#### 2. Protocol Has an Associated Type Cannot Use as the Return Type 

#### 3. Opaque Type Resolve The Problem That Protocol Has an Associated Type


<br><br>

---
Reference

1. "Opaque Types." The Swift Programming Language Swift 5.7. accessed Feb. 27, 2023, [Swift Docs Chapter 23 - Opaque Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes).


