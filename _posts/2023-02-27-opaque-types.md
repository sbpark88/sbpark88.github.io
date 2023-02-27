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

---

### 3. Returning an Opaque Type 👩‍💻

---

### 4. Differences Between Opaque Types and Protocol Types 👩‍💻



<br><br>

---
Reference

1. "Opaque Types." The Swift Programming Language Swift 5.7. accessed Feb. 27, 2023, [Swift Docs Chapter 23 - Opaque Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes).


