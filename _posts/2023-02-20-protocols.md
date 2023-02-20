---
layout: post
title: Swift Protocols
subtitle: Swift protocols make blueprint
categories: swift
tags: [swift docs, protocol, blueprint, requirement, delegation, add protocol, adopt protocol, protocol inheritance, class-only protocol, protocol extensions]
---

### 1. Protocols 👩‍💻

#### 1. Protocols7

`Protocol`은 Methods, Properties, 그리고 특정 작업이나 기능의 요구사항을 정의하기위한 `blueprint`로, *Protocol* 은
*Class*, *Structure*, *Enumeration* 에 `채택(adopt)`되어 요구사항을 구현하도록 한다. 그리고 `Protocol 의 모든 요구사항에 
충족`하면 그 Type 은 해당 Protocol 을 `준수(confirm)`한다고 표현한다.

#### 2. Protocol Syntax

__Syntax__

```swift
protocol SomeProtocol {
    // protocol definition goes here
}
```

*Protocol* 을 정의하는 방법은 *Class*, *Structure*, *Enumeration* 을 정의하는 방법과 유사하다.

#### 3. Adopt Protocol

Protocol 을 채택하는 것 역시 Class 의 Inheritance 와 유사하다.

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // structure definition goes here
}
```

단, `Class`에서는 주의해야할 것이 `Inheritance`가 종료된 후 `Protocol`의 채택이 가능하다.

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}
```

---

### 2. Protocol Requirements 👩‍💻

#### 1. Property Requirements

__1 ) Syntax__

__You can define__

- `var` keyword
- type
- name
- { get set } or { get }

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

> `get set`을 모두 정의할 경우 자동으로 [Constant Stored Properties][Stored Properties] 와 
> [Read-Only Computed Properties][Read-Only Computed Properties] 는 자연스레 준수하는 것이 불가능하다.
> 
> 반면 `get`만 정의할 경우 모든 종류의 [Properties][Swift Properties] 에 대해 Protocol 을 준수할 수 있다. 
> 그리고 이것이 유효할 때 `set`이 유효한 타입이라면 `set`은 자동으로 유효하다.

여기서 주의해야 할 것이 `{ get set }`은 이 Protocol 을 채택하는 Type 이 반드시 `get set`을 만족하도록 구현해야한다는 
의미이고, `{ get }`은 반드시 `get`을 만족하도록 구현해야한다는 의미다. ***'get' 만 만족하고 'set' 을 만족하지 않도록 
`Read-Only`임을 강제하는 것이 아니다***. 

[Swift Properties]:/swift/2022/11/22/properties.html
[Stored Properties]:/swift/2022/11/22/properties.html#h-1-stored-properties-
[Read-Only Computed Properties]:/swift/2022/11/22/properties.html#h-3-read-only-computed-properties

<br>

__You cannot define__

- `let` keyword
- What type of properties (i.e. stored properties or computed properties)

> Protocol 이 Properties 요구사항을 정의할 때 반드시 `var` keyword 만 사용하며, Properties 의 유형은 정의할 수 없다.

<br>

__2 ) Type Properties__

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

또한 Protocol 이 [Type Properties](/swift/2022/11/22/properties.html#h-6-type-properties-) 를 
정의할 때는 마찬가지로 `static` keyword 를 반드시 작성해야한다(이 규칙은 *Classes* 에의해 구현될 때 `class` 또는 `static` 
keyword 를 요구하는 경우 모두 적용된다).

<br>

__3 ) Examples__

*single instance property* 만 요구하는 매우 간단한 Protocol *FullyNamed* 를 정의한다.

```swift
protocol FullyNamed {
    var fullName: String { get }
}
```

이를 채택하는 Structure 를 하나 만들어보자.

```swift
struct Person: FullyNamed {
    var fullName: String
}
```

위 *Person* 은 *FullyNamed* Protocol 을 완벽하게 준수하고 있다.

```swift
var john = Person(fullName: "John Park")
print(john.fullName)    // John Park
```

*john* 의 fullName 은 "John Park" 이다.

```swift
john.fullName = "John Kim"
print(john.fullName)    // John Kim
```

이제 *john* 의 fullName 은 "John Kim" 이다. Protocol 에서 `var fullName: String { get }`로 정의했으나 
이것은 `get`만 만족해야한다는 의미가 아니고 `get`을 만족해야한다는 의미이고, 이것을 채택한 *Person* Structure 는 
*fullName* 을 `Variable Stored Properties`로 정의했기 때문에 `set` 역시 자동으로 유효하게된다. 따라서 *set* 
역시 유효한 것이다.

<br>

이번에는 위 *FullyNamed* Protocol 을 채택하는 좀 더 복잡한 *Class* 를 하나 정의해본다.

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? "\(prefix!) " : "") + name
    }
}
```

이번에는 *fullName* 을 `Read-Only Computed Properties`로 정의했고, Protocol 이 `get set`이 아닌 `get`만 
정의했기 때문에 역시 이 *Starship* 은 *FullyNamed* Protocol 을 완벽하게 준수하고 있다.

```swift
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
print(ncc1701.fullName) // USS Enterprise
```

#### 2. Method Requirements

#### 3. Mutating Method Requirements

#### 4. Initializer Requirements

<br>

__1 ) Class Implementations of Protocol Initializer Requirements__

<br>

__2 ) Failable Initializer Requirements__

---

### 3. Protocols as Types 👩‍💻

---

### 4. Delegation 👩‍💻

---

### 5. Adding Protocol Conformance with an Extension 👩‍💻

#### 1. Adding Protocol Conformance with an Extension

#### 2. Conditionally Conforming to a Protocol

#### 3. Declaring Protocol Adoption with an Extension

---

### 6. Adopting a Protocol Using a Synthesized Implementation 👩‍💻

---

### 7. Collections of Protocol Types 👩‍💻

---

### 9. Protocol Inheritance 👩‍💻

---

### 10. Class-Only Protocols 👩‍💻

---

### 11. Protocol Composition 👩‍💻

---

### 12. Checking for Protocol Conformance 👩‍💻

---

### 13. Optional Protocol Requirements 👩‍💻

---

### 14. Protocol Extensions 👩‍💻

#### 1. Protocol Extensions

#### 2. Providing Default Implementations

#### 3. Adding Constraints to Protocol Extensions


<br><br>

---
Reference

1. "Protocols." The Swift Programming Language Swift 5.7. accessed Feb. 20, 2023, [Swift Docs Chapter 18 - Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols)

