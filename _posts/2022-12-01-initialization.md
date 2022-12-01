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

> 다른 프로그래밍 언어는 일반적으로 `initializer`의 `overload`를 처리하는 방법은 다음과 같다.
> 
> - `Parameters`의 개수로 구분
> - `Parameters`의 개수와 `Parameter Types`를 함께 구분
> 
> 즉, `Types`를 함께 구분하더라도 동일한 `Parameters` 개수와 `Types`는 `overload`를 할 수 없다는 말이 된다.

> 하지만 `Swift`는 `Argument Labels`를 생략하지 않는다면 다음과 같이 더 세분화해 `overload`를 처리한다.
> 
> - `Parameters`의 개수와 `Parameter Types`에 추가로 `Argument Labels`까지 구분

따라서 `Swift`는 아래 예제와 같이 동일한 `Parameters`의 개수와 `Parameter Types`를 갖더라도 `Argument Labels`를 
다르게 해 화씨를 섭씨로 바꾸는 `initializer`와 켈빈을 섭씨로 바꾸는 `initializer`를 `overload` 할 수 있다.

```swift
struct Celsius {
    var temperatureInCelsius: Double
    
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
}
```

```swift
let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
// boilingPointOfWater.temperatureInCelsius is 100.0

let freezingPointOfWater = Celsius(fromKelvin: 273.15)
// freezingPointOfWater.temperatureInCelsius is 0.0
```

#### 2. Parameter Names and Argument Labels

앞의 예에서 이미 본 것처럼 `initializer`는 함수나 메서드와 마찬가지로 `Parameter Names`와 `Argument Labels`를 모두 
가질 수 있다.

```swift
struct Color {
    let red, green, blue: Double
    
    init(red: Double, green: Double, blue: Double) {
        self.red   = red
        self.green = green
        self.blue  = blue
    }
    init(white: Double) {
        red   = white
        green = white
        blue  = white
    }
}
```

```swift
let magenta = Color(red: 1.0, green: 0.0, blue: 1.0)
let halfGray = Color(white: 0.5)
```

#### 3. Initializer Parameters Without Argument Labels

`initializer`도 함수나 메서드와 마찬가지로 기본적으로 `Argument Labels`는 생략이 불가능하다. 생략을 위해서는 
`Argument Labels`에 `_`를 사용해 `override` 함으로써 생략할 수 있다.

```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
    init(_ celsius: Double) {
        temperatureInCelsius = celsius
    }
}
```

```swift
let bodyTemperature = Celsius(37.0)
// bodyTemperature.temperatureInCelsius is 37.0
```

#### 4. Optional Property Types

다음과 같은 이유로 인해 `Properties`가 `Optional Types`가 되어야하는 경우가 있을 수 있다.

- `Initialization` 하는 동안 값을 설정할 수 없어 `nil`을 허용해야하는 경우
- 논리적으로 `nil`을 허용해야하는 경우

`nil`을 허용하기 위해 반드시 `Optional Types`로 정의되어야하며, `Properties`는 자동으로 `nil`로 초기화된다.

```swift
class SurveyQuestion {
    var text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        print(text)
    }
}
```

질문에 대한 응답을 얻기 전까지 `response` 값은 `nil`을 허용해야하므로 `Optional Property Types`로 정의되어야한다.

```swift
let cheeseQuestion = SurveyQuestion(text: "Do you like cheese?")
print(cheeseQuestion.response as Any)   // nil

cheeseQuestion.ask()    // Do you like cheese?
cheeseQuestion.response = "Yes, I do like cheese"
print(cheeseQuestion.response as Any)   // Optional("Yes, I do like cheese")
```

#### 5. Assigning Constant Properties During Initialization

`Stored Properties`는 `Instance`가 생성되기 전, 그러니까 `Initialization`이 종료되기 전에 반드시 값을 가져야한다.  
[All Stored Properties Must be Set][All Stored Properties Must be Set]

[All Stored Properties Must be Set]:/swift/2022/12/01/initialization.html#h-1-all-stored-properties-must-be-set

`Initialization`이 종료되기 전까지 어느 시점에서든 `let` 키워드로 선언한 `Constant Properties`에 값을 할당할 수 있다.

```swift
class SurveyQuestion {
    let text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        print(text)
    }
}
```

```swift
let beetsQuestion = SurveyQuestion(text: "How about beets?")
beetsQuestion.ask()     // How about beets?
beetsQuestion.response = "I also like beets. (But not with cheese.)"
print(beetsQuestion.response as Any)    // Optional("I also like beets. (But not with cheese.)")
```

`let` 키워드로 바꾼 `text property`가 `Initializer`에 의해 할당돼 `How about beets?`를 잘 출력하는 것을 볼 수 있다.

<br>

주의해야 할 것은 이것이 `Initialization`이 종료되기 전까지 여러 번 할당해 수정할 수 있다는 뜻은 아니다.  
> `Initialization`이 종료되기 전 이라도 한 번 할당된 값은 `immutable` 속성을 갖기 때문에 수정할 수 없다.

```swift
class SurveyQuestion {
   let text: String
   var response: String?
   init(text: String) {
      self.text = "Do you like cheese?"
      self.text = text  // Immutable value 'self.text' may only be initialized once
   }
   func ask() {
      print(text)
   }
}
```

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