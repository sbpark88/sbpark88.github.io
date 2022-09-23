---
layout: post
title: Swift 기본 연산자
subtitle: 
categories: swift
tags: [swift docs, swift operators, swift 연산자]
---

### <span style="color: orange">1. Assignment Operator (할당 연산자) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. `상수`, `변수`의 값을 초기화 시키거나 변경한다.</span>

```swift
let a = 10
let b = 7
b = a

print("b is \(b)")  // b is 10
```

#### <span style="color: rgba(166, 42, 254, 1)">2. `Tuple`을 이용해 한 번에 여러 값을 할당할 수 있다.</span>
```swift
let (x, y, z) = (10, 5, 12)
print("x is \(x), y is \(y), z is \(z)")    // x is 10, y is 5, z is 12
```

---

### <span style="color: orange">2. Arithmetic Operators (산술 연산자) 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Four Fundamental Arithmetic Operators (기본 사칙 연산자) `+`, `-`, `x`, `/`</span>

```swift
// Addition
let addition = 8 + 2
print(addition)         // 10

// Subtraction
let subtraction = 8 - 2
print(subtraction)      // 6

// Multiplication
let multiplication = 8 * 2
print(multiplication)   // 16

// Division
let division = 8 / 2
print(division)         // 4
```

또한 `+` 연산자는 문자열의 결합에도 사용할 수 있다.
```swift
// String concatenation using addition operator(+)
let concat = "Hello " + "Swift"
print(concat)   // Hello Swift
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Remainder Operator (나머지 연산자)</span>
```swift
let remainder = 25 % 7
print(remainder)    // 4
```

#### <span style="color: rgba(166, 42, 254, 1)">3. Unary Minus Operator (단항 음수 연산자)</span>
```swift
let three = 3
let minusThree = -three
let plusThree = -minusThree
print(minusThree)   // -3
print(plusThree)    // 3

```
단항 음수 연산자는 값의 부호에 영향을 미치지만 단항 양수 연산자는 아무 영향도 미치지 않는다.

---

### <span style="color: orange">3. Compound Assignment Operators (합성 할당 연산자) 👩‍💻</span>
```swift
var a = 5
a += 7
print(a)    // 12
```
합설 할당 연산자는 자기 자신의 값에 해당 연산을 추가한 것과 같다. 즉, 위 경우는 다음과 같다.
```swift
a = a + 7
```

---

### <span style="color: orange">4. Comparison Operators (비교 연산자) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. Basic Comparison Operators (기본 비교 연산자)</span>
```swift
let (a, b) = (5, 7)

// Equal to(==)
print(5 == 7)       // false

// Not equal to(!=)
print(5 != 7)       // true

// Greater than(>)
print(5 > 7)        // false

// Less than(<)
print(5 < 7)        // true

// Greater than or equal to(>=)
print(5 >= 7)       // false

// Less than or equal to(<=)
print(5 <= 7)       // false
```
위 연산자 외에도 Swift는 두 객체의 reference가 동일 인스턴스인지 비교를 위해 `===`와 `!==` 연산자를 제공한다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Tuple Comparison (튜플 비교)</span>
튜플의 `타입이 동일`하고, `동일한 개수의 값`을 가지고 있을 경우 비교가 가능하다.
튜플의 비교는 `왼쪽에서 오른쪽으로`, `한 번에 하나씩`, `서로 다른 값이 나올때까지` 비교한다. 단, 마지막 비교는 동일 값에 대해서도 정확한 비교를 한다.
```swift
print((1, "zebra") < (2, "apple"))      // true
print((3, "apple") < (2, "zebra"))      // false
```
위 튜플 비교의 해설은 다음과 같다. 우선 처음 식은
- 첫 번째 값은 '서로 다르고', '1 < 2'는 true이므로 true, stop!(zebra와 apple은 비교하지 않는다).
- 두 번째 값은 '서로 다르고', '3 < 2'는 false이므로 false, stop!(zebra와 apple은 비교 하지 않는다).

```swift
print((1, "zebra") < (1, "apple"))      // false
print((1, "apple") < (1, "zebra"))      // true
```
위 튜플의 경우 첫 번째 값이 서로 같아 두 번째 값을 비교해야한다. 해설은 다음과 같다.
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값은 '서로 다르고', 'zebra' < 'apple'은 false, stop!
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값은 '서로 다르고', 'apple' < 'zebra'는 true, stop!

```swift
print((1, "apple") < (1, "apple"))      // false
print((1, "apple") <= (1, "apple"))     // true
```
마지막 값에 이르렀을 경우에는 더이상 비교할 다음 데이터가 없으므로 같음(equal) 여부까지 정확히 검사해아한다.
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값이 같지만 '마지막 값이므로 정확히 비교'한다. 'apple' < 'apple'은 false, stop!
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값이 같지만 '마지막 값이므로 정확히 비교'한다. 'apple' <= 'apple'은 true, stop!

---

### <span style="color: orange">5. Ternary Conditional Operator (삼항 조건 연산자) 👩‍💻</span>
삼항 연산자는 `if ~ else` 구문의 축약형(shorthand)으로 표현식은 다음과 간다.
```swift
question ? answer1 : answer2
```
question이 true일 경우는 answer1을, false일 경우는 answer2를 취한다.

if ~ else 구문 대신 삼항 조건 연산자를 이용해 가독성을 높인 다음 코드를 보자.

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
print(rowHeight)    // 90
```

---

### <span style="color: orange">6. Nil-Coalescing Operator (Nil 병합 연산자) 👩‍💻</span>
`Nil-Coalescing Operator`는 다음 `Ternary Conditional Operator`의 축약형(shorthand)으로
```swift
a != nil ? a! : b
```
표현식은 다음과 같다.
```swift
a ?? b
```
다음 예제를 살펴보자.
```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
print(userDefinedColorName as Any)  // nil
print(colorNameToUse)               // red

userDefinedColorName = "green"
print(userDefinedColorName as Any)  // Optional("green")
print(colorNameToUse)               // green
```
위에서 볼 수 있듯이 Nil-Coalescing Operator가 하는 역할은 2가지다.
- nil일 경우 default value를 반환.
- unwraping optional.

---

### <span style="color: orange">7. Range Operators (범위 연산자) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. Closed Range Operator (닫힌 범위 연산자)</span>
`a...b`
- a에서 b까지 연속된 데이터를 만든다.
- a와 b를 포함한다.
- a <= b의 관계여야한다.
```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Half-Open Range Operator (반 닫힌 범위 연산자)</span>
`a..<b`
- a에서 b까지 연속된 데이터를 만든다.
- a는 포함하나 b는 포함하지 않는다.
- a < b의 관계여야한다.
```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..<count {
    print("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack
```
> Array의 길이는 4다. 하지만 zero-base index로 인해 0, 1, 2, 3을 순회해야 하므로, `a...(b-1)` 대신 `a..<b`를 사용하면 손쉽게 Array를 순회할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)">3. One-Sided Ranges (단방향 범위)</span>




---

### <span style="color: orange">8.  👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>




<br><br>

---
Reference

1. "Basic Operators", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Sep. 4 2022, [Swift Docs Chapter 1 - Basic Operators](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html)
