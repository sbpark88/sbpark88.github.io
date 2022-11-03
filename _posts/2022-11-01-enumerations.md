---
layout: post
title: Swift Enumerations
subtitle: Enumerations
categories: swift
tags: [swift docs, swift enumerations]
---

### <span style="color: orange">1. Enumeration Syntax 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Enumerations in Swift</span>

`Enumeration`은 연관된 값들을 공통 타입으로 그룹화해 `Type-Safe`한 코드를 작성하도록 돕는다.  
`Swift`에서 `Enumeration`은 주어진 값이 `String`, `Character`, `Interger`, `Float` 어떤 것이든
저장할 수 있다. 다른 언어에서 `unions` 또는 `variants`가 작동하는 것과 같다.

`Swift`에서 `Enumeration`은 그 자체로 `First-Class Types`로 전통적으로 `Class`에서만 제공되는 많은 기능을 채택한다.

- Initializers
- Computed Properties
- Instance methods
- Extend their original implementation
- Confirm to protocols

<br>

__Syntax__

```swift
enum SomeEnumeration {
    case one
    case two
    case three
}
```

```swift
enum SomeEnumeration {
    case one, two, three
}
```

> 1. `Enumeration`은 새 `Type`을 만들어 낸다. 따라서 `Swift`의 다른 `Types`와 마찬가지로 이름은 `대문자로 시작`한다.
> 2. `Enumeration`은 `Singleton`을 기반으로 하므로 이름 역시 자명하게 읽히도록 복수형(plural)이 아닌
     `단수형(singular)을 사용`한다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Enumeration Examples</span>

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

> `Swift`의 `Enumeration`은 다른 언어와 달리 암시적으로 integer value(0, 1, 2, ...)를 할당하지 않는다.
> `case`는 `온전히 자기 자신을 값`으로 갖는다.

<br>
각 `case`는 다음과 같이 `,`를 이용해 한 줄로 적을 수 있다.

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

위에서 정의한 `CompassPoint`, `Planet`은 각각 하나의 `Type`을 만들어냈으며, 둘은 서로 다른 `Type`이다.

```swift
var directionToHead = CompassPoint.west
print("Type of directionToHead is '\(type(of: directionToHead))'")
```

<br>

이미 `Type`이 정해진 경우, `Dot Syntax`(`.`)를 이용할 수 있다.

```swift
var directionToHead = CompassPoint.west
print("directionToHead is '\(directionToHead)'")  // directionToHead is west

directionToHead = .east
print("directionToHead is '\(directionToHead)'")  // directionToHead is east

var anotherDirectionToHead: CompassPoint
anotherDirectionToHead = .south
print("anotherDirectionToHead is '\(anotherDirectionToHead)'")    // anotherDirectionToHead is south
```

---

### <span style="color: orange">2. Matching Enumeration Values with Switch 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Matching with Switch</span>
`Enumeration`은 `Switch`를 이용해 다음과 같이 매칭시킬 수 있다.

```swift
enum CompassPoint {
    case east, west, south, north
}

var directionToHead: CompassPoint
```

```swift
directionToHead = .south

switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
```

```console
Watch out for penguins
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Switch must be exhaustive</span>

```swift
directionToHead = .south

switch directionToHead {    // Switch must be exhaustive - add missing case: '.north'
case .south:
    print("Watch out for penguins")
}
```

`south`를 제외한 `case`를 제거했다. `directionToHead`는 현재 `south`니까 문제 없을 것 
같지만, `Swift`는 이 `Switch`가 완전하지 않은 것을 발견하고 `compile-error`를 발생시킨다.  
따라서, 사용되지 않더라도 다음과 같이 `case miss-matching`이 일어나지 않도록 다음과 같이 
처리해야한다.

```swift
switch directionToHead {
case .south:
    print("Watch out for penguins")
default:
    print("This direction is not south")
}
```

> `Switch`가 `Enumeration`을 다룰 때 `case`는 `완전해야(exhaustive)`한다.

---

### <span style="color: orange">3. Iterating over Enumeration Cases 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>

---

### <span style="color: orange">4. Associated Values 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---

### <span style="color: orange">5. Raw Values 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. Implicitly Assigned Raw Values</span>
#### <span style="color: rgba(166, 42, 254, 1)">2. Initializing from a Raw Value</span>

---

### <span style="color: orange">6. Recursive Enumerations 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>


<br><br>

---
Reference

1. "Enumerations", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 1,
   2022, [Swift Docs Chapter 7 - Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)
