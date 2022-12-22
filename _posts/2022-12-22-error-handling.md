---
layout: post
title: Swift Error Handling
subtitle: Error handling in Swift interoperates with error handling patterns that use the NSError class in Cocoa and Objective-C.
categories: swift
tags: [swift docs, error handling, do catch, do-catch, throw, propagating, try, try?, try!, cleanup action]
---

### 1. Representing and Throwing Errors 👩‍💻

`Swift`에서 에러 처리는 `Cocoa`와 `Objective-C`에서 `NSError` class 를 사용하는 에러 처리 패턴과 상호 운용 된다.
[Handling Cocoa Errors in Swift](https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift)

`Swift`에서 에러는 `Error` protocol 을 따르는 Types 의 값으로 표현된다. 그러기 위해서 `Error` protocol 을 채택하도록 해야한다.
`Swift`의 `Enumerations`는 연관된 `Error conditions`를 그룹화하는데 적합하다.

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

에러를 던지기 위해 `throw` statement 를 사용할 수 있다. 다음 예제는 자판기가 동전이 5개 더 필요하다는 에러를 발생시키는 경우다.

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

---

### 2. Handling Errors 👩‍💻

#### 1. Propagating Errors Using Throwing Functions

#### 2. Handling Errors Using Do-Catch

#### 3. Converting Errors to Optional Values

#### 4. Disabling Error Propagation

---

### 3. Specifying Cleanup Actions 👩‍💻


<br><br>

---
Reference

1. "Error Handling", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 22,
   2022, [Swift Docs Chapter 16 - Error Handling](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)
