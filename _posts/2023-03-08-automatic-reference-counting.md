---
layout: post
title: Swift Automatic Reference Counting
subtitle: Model the lifetime of objects and their relationships. 
categories: swift
tags: [swift docs, arc, automatic reference counting, strong reference cycle, weak reference, unowned reference, capture list]
---

### 1. Automatic Reference Counting 👩‍💻

Swift 는 `Automatic Reference Counting (ARC)`를 사용해 앱의 메모리 사용을 관리하고 추적한다. 대부분의 경우 Swift 에서 개발자는
메모리를 관리할 필요가 없다. 이에 대해 Apple 은 이렇게 말한다. `just work`.

*ARC* 는 `Class Instance` 가 더이상 필요하지 않을 때 `메모리 할당을 해제(free up)`한다 
([Deinitialization](/swift/2022/12/19/deinitialization.html) 이 호출됨을 의미).  

그러나 일부 경우 ARC 는 메모리를 관리하기 위해 코드 관계에 대한 추가 정보를 요구한다. Swift 에서 ARC 를 사용하는 것은 Objective-C 에서
ARC 사용에 대한 [Transitioning to ARC Release Notes] 에서 설명한 접근 방식과 유사하다.

> `Reference counting`은 `Class Instance`에만 적용된다. **Structures** 와 **Enumerations** 는 **Value Types**이다.

---

### 2. How ARC Works 👩‍💻

---

### 3. ARC in Action 👩‍💻

---

### 4. Strong Reference Cycles Between Class Instances 👩‍💻

---

### 5. Resolving Strong Reference Cycles Between Class Instances👩‍💻

#### 1. How Resolve Strong Reference Cycles

#### 2. Weak References

#### 3. Unowned References

#### 4. Unowned Optional References

#### 5. Unowned References and Implicitly Unwrapped Optional Properties

---

### 6. Strong Reference Cycles for Closures 👩‍💻

---

### 7. Resolving Strong Reference Cycles for Closures 👩‍💻

#### 1. Defining a Capture List

#### 2. Weak and Unowned References

<br><br>

---
Reference

1. "Automatic Reference Counting." The Swift Programming Language Swift 5.7. accessed Mar. 08, 2023, [Swift Docs Chapter 24 - Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/).

[Transitioning to ARC Release Notes]:https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html
