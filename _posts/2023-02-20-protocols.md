---
layout: post
title: Swift Protocols
subtitle: Swift protocols make blueprint
categories: swift
tags: [swift docs, protocol, blueprint, requirement, delegation, add protocol, adopt protocol, protocol inheritance, class-only protocol, protocol extensions]
---

### 1. Protocols 👩‍💻

#### 1. Protocols

`Protocol`은 Methods, Properties, 그리고 특정 작업이나 기능의 요구사항을 정의하기위한 `blueprint`로, *Protocol* 은
*Class*, *Structure*, *Enumeration* 에 채택(adopt)되어 요구사항을 구현하도록 한다.

#### 2. Protocol Syntax

__Syntax__

```swift
protocol SomeProtocol {
    // protocol definition goes here
}
```

*Protocol* 을 정의하는 방법은 *Class*, *Structure*, *Enumeration* 을 정의하는 방법과 유사하다.

#### 3. Adopt Protocol

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // structure definition goes here
}
```

Protocol 을 채택하는 것 역시 Class 의 Inheritance 와 유사하다. 단, `Class`에서는 주의해야할 것이 `Inheritance`가 
종료된 후 `Protocol`의 채택이 가능하다.

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}
```

---

### 2. Protocol Requirements 👩‍💻

#### 1. Property Requirements

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

