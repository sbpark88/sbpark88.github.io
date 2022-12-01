---
layout: post
title: Swift Initialization
subtitle: Initialization - Initializers, Default Property Values, Default Initializers, Failable Initializers, Required Initializers
categories: swift
tags: [swift docs, initializer, default property value, default value, default initializer, failable initializer, required initializer]
---

### What is Initialization?

`Initialization`은 `Classes`, `Structures`, `Enumerations`를 사용하기 위해 `Instance`를 
준비하는 과정을 말한다. 이것은 `Stored Properties`를 위한 초기값을 설정하거나 `new Instance`가 생성되기 
전에 수행해야 하는 것들을 정리한다.

`Initializers`를 구현해야하며, `Objective-C`와 달리 `Swift`의 `Initializers`는 값을 
반환하지 않는다. 초기화의 주요 역할은 사용하기 전에 `Instance`가 올바르게 초기화되는 것을 보장하는 것이다.

그리고 세 `Types` 중 `Classes`는 `Instance`가 해제되기 전에 수행해야할 일을 구현할 수 있으며, 
이를 `Deinitialization`이라 한다.

### 1. Setting Initial Values for Stored Properties 👩‍💻

#### 1. All Stored Properties Must be Set

- `Classes`와 `Structures`의 `Stored Properties`는 `Instance`가 생성되기 전 
   반드시 모든 값을 저장해야한다.
- `Stored Properties`에 초기값을 설정할 때 사용되는 `Initializers`나 
   `Default Property Values`는 `Property Observers`의 호출 없이 이루어진다.

#### 2. Initializers

`init` 키워드를 사용한다.

__Syntax__

```swift
init() {
   // perform some initialization here
}
```

<br>

```swift
struct Celsius {
    var temperature: Double
    init() {
        temperature = 16.0
    }
}

var c = Celsius()
print("The default temperature is \(c.temperature)° Celsius")
// The default temperature is 16.0° Celsius
```

#### 3. Default Property Values

`Propeties`가 항상 동일한 초기값을 갖는다면 `Default Property Values`를 사용하는 것이 
값을 선언에 더 가깝게 연결하고, 더 짧고 명확한 코드로 작성이 가능하며, 타입 추론을 허용한다.

또한, `Defalut Property Values`를 사용하면, 이후 상속할 때 `Initial Values` 설정하는 
것을 더욱 쉽게 만든다.

```swift
struct Celsius {
    var temperature = 16.0
}

var c = Celsius()
print("The default temperature is \(c.temperature)° Celsius")
// The default temperature is 16.0° Celsius
```

#### 4. Setting a Default Property Value with a Closure or Function

__1 ) IIFE__

상수나 변수에 값을 저장할 때 사용자 정의 로직이나 설정이 필요한 경우가 있을 수 있다.  
`Swift`에서는 이를 위해 `Closure`나 `Global Function`를 사용할 수 있는데, `Closure` (=`Function`)를 
정의함과 동시에 실행시키고 그 값을 반환하도록 해, 이 `return value`를 상수 또는 변수에 저장하는 것이다.

좀 더 쉽고 간결한 예를 위해 `TypeScript`의 로직을 본 후 `Swift`와 비교해보자.  
`TypeScript`는 이러한 로직을 `IIFE(Immediately Invoked Function Expression)`라 한다.

```typescript
let someNumber: number = 13
const isEven: string = (() => someNumber % 2 === 0 ? "This is an even number" : "This is an odd number")()
console.log(isEven) // This is an odd number
```

<br>

그리고 `Swift`로 구현한 예를 보자.

```swift
var someNumber: Int = 13
let isEven: String = { someNumber % 2 == 0 ? "This is an even number" : "This is an odd number" }()
print(isEven)       // This is an odd number
```

어디서 많이 본 것 같지 않은가? [Lazy Stored Properties][Lazy Stored Properties] 에서 
`lazy` 키워드만 빠진 것과 같다는 것을 알 수 있다.  
즉, 위와 같은 기법을 이용해 `Stored Properties`의 `Initial Values`를 설정할 때 사용자 정의 로직을 정의하는 
것이 가능하다.

[Lazy Stored Properties]:/swift/2022/11/22/properties.html#h-3-lazy-stored-properties

<br>

__2 ) Compare Lazy Stored Properties__

__Syntax__

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
        return someValue
    }()
    
    lazy var someLazyStoredProperty: SomeType = {
        // property definition goes here
        return someValue
    }()
}
```

단, 이 방법을 사용할 때 주의해야할 것은 해당 `Closures`가 정의되고 실행되는 시점은 `Instance`가 "생성되기 전" 
이라는 것이다. 즉, 어떠한 `Instance Properties`나 `Instance Methods`에도 접근할 수 없다는 것을 의미한다.

> `IIFE`처럼 작동하는 이 방법과 `Lazy Stored Properties`의 차이점은 `lazy` 키워드를 붙였는가이다.  
> 즉, `lazy` 키워드로 인해 `Stored Properties`를 저장하는 방법이 변경되는 것이다.
> 
> - `lazy` 키워드를 붙이지 않으면 `IIFE`와 같이 작동한다. 따라서 `Instance`가 생성되기 전에 값이 반드시 
>   저장되어야하므로 `let`, `var` 키워드를 모두 사용할 수 있다. 단, `Instance` 생성 시점보다 먼저 실행이되므로, 어떠한 
>   `Instance Properties`나 `Instance Methods`에도 접근할 수 없다.
> - `lazy` 키워드를 붙이면 이것은 `Lazy Stored Properties`로 작동하므로, `Instance`가 생성된 후 최초로 
>   사용할 때 설정된다. 즉, 다른 `Instance Properties`나 `Instance Methods`에 접근할 수 있다.

<br>

__3 ) Default Property Value with a Closure Examples__

![ChessBoard](/assets/images/posts/2022-12-01-initialization/chessBoard_2x.jpeg)

`8x8` 체스판이 있다. 체스판을 `Structures`를 이용해 구현하자.  
사각형이 검정색인지 여부를 `true`, `false`로 표현하도록 하고, 좌측 상단`(1, 1)`에서 우측 하단`(8, 8)`으로 
표현된다고 가정하면 `Chessboard Structure`는 `Array of [8][8] Bool values`를 이용해 다음과 같이 정의될 수 있다.

```swift
struct Chessboard {
    let boardColors: [[Bool]] = {
        var temporaryBoard: [[Bool]] = []
        var isBlack = false
        for i in 1...8 {
            var aLine: [Bool] = []
            for j in 1...8 {
                aLine.append(isBlack)
                isBlack = !isBlack
            }
            temporaryBoard.append(aLine)
            isBlack = !isBlack
        }
        return temporaryBoard
    }()
    func squareIsBlackAt(row: Int, column: Int) -> Bool {
        boardColors[row - 1][column - 1]
    }
}
```

```swift
let board = Chessboard()
printColor(1, 1)    // (1, 1) is white square
printColor(1, 2)    // (1, 2) is black square
printColor(1, 8)    // (1, 8) is black square
printColor(2, 1)    // (2, 1) is black square
printColor(8, 8)    // (8, 8) is white square


func printColor(_ row: Int, _ column: Int) {
    print("(\(row), \(column)) is \(board.squareIsBlackAt(row: row, column: column) ? "black" : "white") square")
}
```



---

### 2. Customizing Initialization 👩‍💻

#### 1. Initialization Parameters

#### 2. Parameter Names and Argument Labels

#### 3. Initializer Parameters Without Argument Labels

#### 4. Optional Property Types

#### 5. Assigning Constant Properties During Initialization

---

### 3. Default Initializers 👩‍💻

#### 1. Default Initializers for Structures and Classes

#### 2. Memberwise Initializers for Structure Types

---

### 4. Initializer Delegation for Value Types 👩‍💻

---

### 5. Class Inheritance and Initialization 👩‍💻

#### 1. Designated Initializers and Convenience Initializers

#### 2. Syntax for Designated and Convenience Initializers

#### 3. Initializer Delegation for Class Types

#### 4. Two-Phase Initialization

#### 5. Initializer Inheritance and Overriding

#### 6. Automatic Initializer Inheritance

#### 7. Designated and Convenience Initializers in Action

---

### 6. Failable Initializers 👩‍💻

#### 1. Failable Initializer Syntax

#### 2. Failable Initializers for Enumerations

#### 3. Failable Initializers for Enumerations with Raw Values

#### 4. Propagation of Initialization Failure

#### 5. Overriding a Failable Initializer

#### 6. The init! Failable Initializer

---

### 7. Required Initializers  👩‍💻


<br><br>

---
Reference

1. "Initialization", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 1, 2022, [Swift Docs Chapter 13 - Initialization](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html)