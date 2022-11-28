---
layout: post
title: Swift Basic Operators
subtitle: Basic Operators
categories: swift
tags: [swift docs, swift operators, swift 연산자]
---

### 1. Assignment Operator (할당 연산자) 👩‍💻
#### 1. `상수`, `변수`의 값을 초기화 시키거나 변경한다.

```swift
let a = 10
let b = 7
b = a

print("b is \(b)")  // b is 10
```

#### 2. `Tuple`을 이용해 한 번에 여러 값을 할당할 수 있다.

```swift
let (x, y, z) = (10, 5, 12)
print("x is \(x), y is \(y), z is \(z)")    // x is 10, y is 5, z is 12
```

---

### 2. Arithmetic Operators (산술 연산자) 👩‍💻

#### 1. Four Fundamental Arithmetic Operators (기본 사칙 연산자) `+`, `-`, `x`, `/`

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

#### 2. Remainder Operator (나머지 연산자)

```swift
let remainder = 25 % 7
print(remainder)    // 4
```

#### 3. Unary Minus Operator (단항 음수 연산자)

```swift
let three = 3
let minusThree = -three
let plusThree = -minusThree
print(minusThree)   // -3
print(plusThree)    // 3
```

단항 음수 연산자는 값의 부호에 영향을 미치지만 단항 양수 연산자는 아무 영향도 미치지 않는다.

---

### 3. Compound Assignment Operators (합성 할당 연산자) 👩‍💻

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

### 4. Comparison Operators (비교 연산자) 👩‍💻
#### 1. Basic Comparison Operators (기본 비교 연산자)

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

위 연산자 외에도 Swift 는 두 객체의 reference 가 동일 인스턴스인지 비교를 위해 `===`와 `!==` 연산자를 제공한다.

#### 2. Tuple Comparison (튜플 비교)
튜플의 `타입이 동일`하고, `동일한 개수의 값`을 가지고 있을 경우 비교가 가능하다.
튜플의 비교는 `왼쪽에서 오른쪽으로`, `한 번에 하나씩`, `서로 다른 값이 나올때까지` 비교한다. 단, 마지막 비교는 동일 값에 대해서도 정확한 비교를 한다.

```swift
print((1, "zebra") < (2, "apple"))      // true
print((3, "apple") < (2, "zebra"))      // false
```

위 튜플 비교의 해설은 다음과 같다. 우선 처음 식은
- 첫 번째 값은 '서로 다르고', '1 < 2'는 true 이므로 true, stop!(zebra 와 apple 은 비교하지 않는다).
- 두 번째 값은 '서로 다르고', '3 < 2'는 false 이므로 false, stop!(zebra 와 apple 은 비교 하지 않는다).

```swift
print((1, "zebra") < (1, "apple"))      // false
print((1, "apple") < (1, "zebra"))      // true
```

위 튜플의 경우 첫 번째 값이 서로 같아 두 번째 값을 비교해야한다. 해설은 다음과 같다.
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값은 '서로 다르고', 'zebra' < 'apple' 은 false, stop!
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값은 '서로 다르고', 'apple' < 'zebra' 는 true, stop!

```swift
print((1, "apple") < (1, "apple"))      // false
print((1, "apple") <= (1, "apple"))     // true
```

마지막 값에 이르렀을 경우에는 더이상 비교할 다음 데이터가 없으므로 같음(equal) 여부까지 정확히 검사해아한다.
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값이 같지만 '마지막 값이므로 정확히 비교'한다. 'apple' < 'apple' 은 false, stop!
- 첫 번째 값이 같으므로 두 번째 값을 비교한다. 두 번째 값이 같지만 '마지막 값이므로 정확히 비교'한다. 'apple' <= 'apple' 은 true, stop!

---

### 5. Ternary Conditional Operator (삼항 조건 연산자) 👩‍💻
삼항 연산자는 `if ~ else` 구문의 축약형(shorthand)으로 표현식은 다음과 간다.

```swift
question ? answer1 : answer2
```

question 이 true 일 경우는 answer1을, false 일 경우는 answer2를 취한다.

if ~ else 구문 대신 삼항 조건 연산자를 이용해 가독성을 높인 다음 코드를 보자.

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
print(rowHeight)    // 90
```

---

### 6. Nil-Coalescing Operator (Nil 병합 연산자) 👩‍💻
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

위에서 볼 수 있듯이 Nil-Coalescing Operator 가 하는 역할은 2가지다.
- nil 일 경우 default value 를 반환.
- unwrapping optional.

---

### 7. Range Operators (범위 연산자) 👩‍💻
#### 1. Closed Range Operator (닫힌 범위 연산자)
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

#### 2. Half-Open Range Operator (반 닫힌 범위 연산자)
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

> Array 의 길이는 4다. 하지만 zero-base index 로 인해 0, 1, 2, 3을 순회해야 하므로, `a...(b-1)` 대신 `a..<b`를 사용하면 손쉽게 Array 를 순회할 수 있다.

#### 3. One-Sided Ranges (단방향 범위)
범위의 끝을 한 쪽만 지정하고 싶다면 `One-Sided Ranges`를 이용하면 된다.

```swift
for name in names[2...] {
    print(name)
}
// Brian
// Jack

for name in names[...2] {
    print(name)
}
// Anna
// Alex
// Brian
```

`for-loop` 또는 `배열` 외에도 `One-Sided Ranges`는 다음과 같은 논리 연산을 쉽게 처리할 수 있게 해준다.

```swift
let range = ...5

range.contains(7)   // false
range.contains(4)   // true
range.contains(-1)  // true
```

Awesome! 👏👏👏

---

### 8. Logical Operators (논리 연산자) 👩‍💻
Swift 에서는 3가지 Logical Operators 를 지원한다.
- Logical NOT Operator `!a`
- Logical AND Operator `a && b`
- Logical OR Operator `a || b`

#### 1. NOT(논리 부정), AND(논리 곱), OR(논리 합)
-  `NOT(!)` 연산자는 `Boolean`의 부호를 바꾼다.

```swift
print(!true)    // false
print(!false)   // true
```

- `AND(&&)` 연산자는 두 값이 모두 `true`일때만 `true`를 만족하는 표현식을 만든다.

```swift
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// Prints "ACCESS DENIED"
```

- `OR(||)` 연산자는 두 값 중 하나만 `true`여도 `true`를 만족하는 표현식을 만든다.

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// Prints "Welcome!"
```

#### 2. Combining Logical Operators (논리 연산자의 조합)
논리 연산자는 여러 개를 중복해서 사용할 수 있다. 하지만 여전히 2개의 값만 비교하고, 이는 우선순위에 따라 왼쪽에서 오른쪽으로 연쇄적으로 일어난다.

```swift
let (enteredDoorCode, passedRetinaScan, hasDoorKey, knowsOverridePassword) = (true, false, false, true)

if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// Prints "Welcome!"
```

#### 3. Explicit Parentheses (명시적 괄호)
우리는 명시적으로 괄호를 표현하므로써 논리 연산의 우선 순위를 부여하는 것 뿐 아니라, 가독성을 높일 수 있다.

```swift
let (enteredDoorCode, passedRetinaScan, hasDoorKey, knowsOverridePassword) = (true, false, false, true)

if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
}
// Prints "Welcome!"
```

#### 4. Short-Circuit Evaluation (단락 평가)
- `&&` 연산은 왼쪽이 `false`일 확률이 높을 수록 좋다.

```swift
case 1: (10% true) && (70% true)
case 2: (70% true) && (10% true)
```

> 수학적 확률상 'case 1'이 더 좋다.

- `||` 연산은 왼쪽이 `true`일 확률이 높을 수록 좋다.

```swift
case 1: (10% true) || (70% true)
case 2: (70% true) || (10% true)
```

> 수학적 확률상 'case 2'가 더 좋다.

#### 5. nil 과 value check 등 다양한 활용
- 단순히 `Boolean` 표현식을 계산하는 것 외에도 비즈니스 로직 상 `nil` 체크, `value` 체크 등을 동시에 하기 위해 사용하기도 한다.

```swift
var cityName: String? = "NewYork"

if cityName != nil && cityName != "Seoul" {
    print(cityName!)
}
// Prints "NewYork"
```

- 또한 `Nil-Coalescing Operator` 만으로는 처리가 불가능한 다음과 같은 케이스의 `default value`를 설정하기 위해 사용하기도 한다.

```swift
var location: String? = ""
print(location ?? "California")     // Prints ""

if location == nil || location == "" {
    location = "California"
}
print(location!)                    // Prints "California"
```


<br><br>

---
Reference

1. "Basic Operators", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Sep. 4, 2022, [Swift Docs Chapter 1 - Basic Operators](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html)
