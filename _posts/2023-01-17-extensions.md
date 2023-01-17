---
layout: post
title: Swift Extensions
subtitle: Extensions add new functionality to an existing class, structure, enumeration, or protocol type.
categories: swift
tags: [swift docs, extension, category]
---

### 1. Extension vs. Inheritance 👩‍💻

기존의 `Types`를 확장하기 위한 방법 중 하나인 [Inheritance](http://localhost:4000/swift/2022/11/29/inheritance.html) 
는 Class 에서만 사용할 수 있다.
Inheritance 는 기존 Class 는 그대로 둔 채 별도의 Class 를 생성하며, 이들은 Superclass/Subclass 라는 관계로 연결된 Hierarchy 
구조를 갖는다. Subclass 는 기존의 Superclass 애 기능을 추가해 확장하는 것 뿐 아니라 이미 존재하는 기능을 Overriding 하는 것도 가능하다.

`Extension`은 Class, Structure, Enumeration, Protocol 타입에서 사용이 가능하며 Extensions 가 할 수 있는 것은 다음과 같다.

- Add [computed instance properties][Computed Instance Properties] and [computed type properties][Computed Type Properties]
- Define [instance methods][instance methods] and [type methods][type methods]
- Provide new initializers
- Define subscripts
- Define and use new nested types
- Make an existing type conform to a protocol

<br>

Extension 은 Inheritance 와 마찬가지로 기존에 존재하는 타입에 기능을 추가할 수 있다. 그리고 Extension 이 갖는 특징으로 Inheritance 
와 다른점은 다음과 같다.

- <span style="color: red;">Original source code 에 접근 권한이 없는 경우에도 Extension 이 가능</span>하다. 
  이를 `Retroactive Modeling`(소급 모델링) 이라 한다.
- Extension 은 기능을 추가만 가능할 뿐 Inheritance 와 달리 Overriding 은 불가능하다.

> Swift 의 `Extensions`는 Objective-C 의 `Categories`와 유사하다. 단, `Extensions`는 이름을 갖지 않는다.

### 2. Extension Syntax 👩‍💻

__Syntax__

```swift
extension SomeType {
    // new functionality to add to SomeType goes here
}
```

Extension 은 하나 이상의 Protocols 를 채택해 기존의 타입을 확장할 수 있다.

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
    // implementation of protocol requirements goes here
}
```

이뿐 아니라 `Generic Type`을 확장하는 것 역시 가능하다.

### 3. Computed Properties 👩‍💻

Extensions 를 이용해 `Computed Instance Properties` 또는 `Computed Type Properties`를 확장하는 것이 가능하다. 이것은 
사용자가 정의한 타입 뿐 아니라 Built-in Types 를 확장하는 것을 포함한다.

다음 예제는 TypeScript 가 Prototype 을 이용해 Built-in Types 에 기능을 추가하듯 다양한 길이 단위를 `meter` 단위로 변경하기 위해 
Double 에 5개의 Computed Instance Properties 를 추가한다.

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
```

```swift
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")          // One inch is 0.0254 meters

let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")      // Three feet is 0.914399970739201 meters

let aMarathon = 42.km + 195.m
print("A marathon is \(aMarathon) meters long") // A marathon is 42195.0 meters long
```

> Extensions 는 `Computed Properties`를 추가하는 것만 가능하다. `Stored Properties`를 추가하거나, 이미 존재하는 Properties 에 
> `Property Observers`를 추가하는 것은 불가능하다.

### 4. Initializers 👩‍💻

### 5. Methods 👩‍💻

#### 1. Add Instance Methods

#### 2. Mutating Instance Methods

### 6. Subscripts 👩‍💻


<br><br>

---
Reference

1. "Extensions", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Jan. 17, 2023, [Swift Docs Chapter 20 - Nested Types](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)


[Computed Instance Properties]:http://localhost:4000/swift/2022/11/22/properties.html#h-2-computed-properties-
[Computed Type Properties]:http://localhost:4000/swift/2022/11/22/properties.html#h-6-type-properties-
[instance methods]:http://localhost:4000/swift/2022/11/27/methods.html#h-2-instance-methods-
[type methods]:http://localhost:4000/swift/2022/11/27/methods.html#h-3-type-methods-
