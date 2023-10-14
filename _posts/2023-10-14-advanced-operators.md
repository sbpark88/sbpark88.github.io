---
layout: post
title: Swift Advanced Operators
subtitle: Define custom operators, perform bitwise operations, and use builder syntax. 
categories: swift
tags: [swift docs, advanced operators, bitwise, overflow, precedence, associativity, prefix, postfix, compound, equivalence, custom operators, infix, result builders]
---

### 1. Advanced Operators 👩‍💻

Swift 는 `C`나 `Objective-C`와 유사한 `Bitwise Operators`를 포함해 여러 고급 연산자를 제공한다. *Swift* 는 
**C** 의 *Arithmetic Operators* 와 달리 기본적으로 <span style="color: red;">*Overflow* 되지 않는다</span>.
*Overflow* 는 `trapped`되어 에러로 보고된다.  
Swift 에서 *Overflow* 동작을 하도록 하려면 `Overflow Addition Operator($+)`와 같은 연산자를 사용해야한다
(모든 `Overflow Operators`는 `&`로 시작한다).

Custom *Classes*, *Structures*, *Enumerations* 를 정의할 때, Custom Types 에 대해 **Standard Swift 
Operators** 의 구현을 제공하는 것이 유용할 수 있다. Swift 는 Custom Types 에 대해 **Custom Operators** 를 손쉽게 
제공할 수 있도록 하며, 각 Types 에 대한 동작이 정확히 무엇인지 결정할 수 있다.

**Custom Operators** 는 사전에 정의된 Operators 로 제한되지 않으며, Swift 는 자신만의 `Infix`, `Prefix`, 
`Assignment Operators`를 정의함은 물론, 자신만의 `우선순위`를 자유롭게 정의할 수 있다. 이러한 **Custom Operators** 
는 코드에서 Swift 가 기본적으로 제공하는 `Predefined Operators` 처럼 사용되며, **Custom Operators** 를 채택하도록 
기존의 Types 를 확장할 수 있다.

---

### 2. Bitwise Operators 👩‍💻

#### 1. Bitwise Operators

#### 2. Bitwise NOT Operator

#### 3. Bitwise AND Operator

#### 4. Bitwise OR Operator

#### 5. Bitwise XOR Operator

#### 6. Bitwise Left and Right Operators

---

### 3. Overflow Operators 👩‍💻

#### 1. Overflow Operators

#### 2. Value Overflow

---

### 4. Precedence and Associativity 👩‍💻

---

### 5. Operator Methods 👩‍💻

#### 1. Operator Methods

#### 2. Prefix and Postfix Operators

#### 3. Compound Assignment Operators

#### 4. Equivalence Operators

---

### 6. Custom Operators 👩‍💻

#### 1. Custom Operators

#### 2. Precedence for Custom Infix Operators

---

### 7. Result Builders 👩‍💻



<br><br>

---
Reference

1. "Advanced Operators." The Swift Programming Language Swift 5.9. accessed Oct. 14, 2023, [Swift Docs Chapter 27 - Advanced Operators](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/advancedoperators).
