---
layout: post
title: Swift Control Flow
subtitle: Control Flow - For-IN Loops, While Loops, Conditional Statements
categories: swift
tags: [swift docs, control flow, loop, for, while, if, switch, condition]
---

### 1. For-In Loops 👩‍💻
`For-In` 반복문은 `Array`가 저장한 `items`, `String`이 저장한 `characters`와 같은 `sequence`를 반복할 수 있다.

#### 1. Iterate over with numeric ranges

```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
```

```console
1 times 5 is 5
2 times 5 is 10
3 times 5 is 15
4 times 5 is 20
5 times 5 is 25
```

<br>

* __만약, 상수를 인자로 받을 필요가 없다면 `_`를 이용해 성능을 향상시킬 수 있다__

```swift
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
print("\(base) to the power of \(power) is \(answer)")  // 3 to the power of 10 is 59049
```

<br>

* __`stride(from:to:by:)`를 이용하면 `from..<to` 범위를 `by`만큼 `step`을 넣어 `sequence`를 만들 수 있다__

```swift
let sequence = stride(from: 0, to: 60, by: 5)
print(type(of: sequence))   // StrideTo<Int>
```

```swift
for tickMark in stride(from: 0, to: 60, by: 5) {
    print(tickMark, terminator: " ")    // 0 5 10 15 20 25 30 35 40 45 50 55
}
```

<br>

#### 2. Iterate over the items in an array

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}
```

```console
Hello, Anna!
Hello, Alex!
Hello, Brian!
Hello, Jack!
```

<br>

#### 3. Iterate over a dictionary to access its key-value paris

우리는 [**Iterating over a dictionary**][Iterating over a dictionary]에서 살펴본 것 처럼 `Dictionary`는 한 쌍의 `Kye: Value` `tuple`로 접근해 반복할 수 있다.  
아래는 `tuple`이 `animalName`이라는 `Key constant`와 `legCount`라는 `Value constant`로 분해되는 예제다.

[Iterating over a dictionary]: /swift/2022/10/03/collection-types.html#h-6-iterating-over-a-dictionary

```swift
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    print("\(animalName)s have \(legCount) legs")
}
```

```console
cats have 4 legs
spiders have 8 legs
ants have 6 legs
```

---

### 2. While Loops 👩‍💻

우선 아래 `while`을 설명하면서 사용할 주사위 함수는 다음과 같다.

```swift
func rollDice() -> Int {
  Int.random(in: 1...6)
}
```

#### 1. While

`while` 반복문은 조건이 `false`가 될 때까지 반복을 계속한다. 이것은 `loop`가 시작될 때 정확한 반복 횟수를 알 수 없는 경우 유용하게 사용될 수 있다.

__Syntax__

```swift
while condition {
    statements
}
```

<br>

__Q) 주사위를 2개 굴려 곱한 값이 20 이상이면 반복문을 중지하라.__    
-> 반복 횟수를 알 수 없다.  
-> `while` 사용이 적합하다.  

```swift
var result = 0
var rollCount = 0

while result < 20 {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
}
print("The dice are rolled \(rollCount) times.")
```

```console
10
4
36
The dice are rolled 3 times.
```


#### 2. Repeat-While

`repeat-while`문이 `while`문과 다른 점은 반복할 로직을 먼저 실행 후 조건을 검사한다. 그렇기 때문에 `repeat-while`은 최소한 1번의 로직은 수행한다.

__Syntax__

```swift
repeat {
    statements
} while condition
```

<br>

위 주사위 문제에서 result 의 초깃값이 20보다 크게 정해져 있다고 가정해보자.

```swift
var result = 25
var rollCount = 0

while result < 20 {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
}
```

위 로직은 첫 condition 검사에서 `false`가 나오므로 `while`문 내부는 실행하지 않는다.

<br>
이번에는 위 로직을 `repeat-while`문으로 바꿔서 실행해본다.

```swift
var result = 25
var rollCount = 0

repeat {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
} while result < 20
print("The dice are rolled \(rollCount) times.")
```

```console
1
3
18
4
24
The dice are rolled 5 times.
```

초깃값이 20 이상이지만 최초 1회 실행을 한다. 그리고 이때 계산된 result 는 condition 을 만족하는 작은 값으로 바뀔 경우 `repeat`을 반복하게된다.
따라서 `Repeat-While`은 최소 1번은 실행하므로 1 ~ n번의 반복을 하게 된다.

#### 3. While-True

여기 조금 특별한 방식의 `While`문이 있다.  
`While` 또는 `Repeat-While`의 `condition`은 `true`일 때 반복하므로 `false`가 될 때 중단된다.  
반면 `While-True`는 위 `if`를 사용해 반복할 조건을 검사하므로 `condition`과 반대가 되어야한다. 
즉, `!condition`일 때 중단되거나 `condition`은 그대로 사용하되 `if` statement 는 비워두고 `else` clause 에서 중단해야한다.  
물론, 성능을 위해서는 `!`를 붙여 NOT 연산을 한 번 더 하거나, `else` clause 까지 가지 않도록 `condition` 자체를 
논리적으로 반대로 바꿔 `if`에 넣어 중단하는 것이 좋다.

__Syntax__

```swift
while true {
    statements
    
    if !condition {
        break
    }
}
```

<br>

- !condition

```swift
var result = 25
var rollCount = 0

while true {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
    
    if !(result < 20) {
        break
    }
}
```

<br>

- else break

```swift
var result = 25
var rollCount = 0

while true {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
    
    if result < 20 {
    } else {
        break
    }
}
print("The dice are rolled \(rollCount) times.")
```

<br>

- logical opposite condition

```swift
var result = 25
var rollCount = 0

while true {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
    
    if result >= 20 {
        break
    }
}
print("The dice are rolled \(rollCount) times.")
```

> `Repeat-While` 로직이 없는 언어일 경우 이런식으로 구현할 수 있지만, Swift 는 이를 지원하므로
> 명확한 코드 의도 전달 및 가독성을 위해 `Repeat-While`로 코드를 작성하는 것이 좋다.

---

### 3. Conditional Statements - If 👩‍💻

Swift 는 조건에 따라 다른 로직을 수행할 수 있도록 `If`와 `Switch`를 제공한다. 그 중 `If`를 알아본다.

#### 1. Single `if` statement

`if`는 조건이 만족될 때 실행하는 로직을 정의할 수 있다.

```swift
let temperatureInCelsius = 32
if temperatureInCelsius > 28 {
    print("It's hot. Turn on the air conditioner.")
}

// It's hot. Turn on the air conditioner.
```

#### 2. `if` statements with `else` clause

`else` clause 를 이용해 `if` statement 의 조건을 만족하지 않은 경우에 실행하는 대안 로직을 정의할 수 있다.

```swift
let temperatureInCelsius = 24
if temperatureInCelsius > 28 {
    print("It's hot. Turn on the air conditioner.")
} else {
    print("It's nice weather. Go out for a walk.")
}

// It's nice weather. Go out for a walk.
```

#### 3. Chaining multiple `if` statements

`else if`를 이용해 여러 개의 `if` 조건을 연속적으로 검사할 수 있다. 이 때 만족하는 `if`를 만나면 로직을 수행 후 탈출한다.

```swift
let temperatureInCelsius = 3
if temperatureInCelsius > 28 {
    print("It's hot. Turn on the air conditioner.")
} else if temperatureInCelsius < 10 {
    print("It's cole. Turn on the boiler.")
} else {
    print("It's nice weather. Go out for a walk.")
}

// It's cole. Turn on the boiler.
```

> `else` clause 는 언제나 <span style="color: red">Optional</span>이기 때문에 필수가 아니다.

---

### 4. Conditional Statements - Switch 👩‍💻

Swift 는 조건에 따라 다른 로직을 수행할 수 있도록 `If`와 `Switch`를 제공한다. 그 중 `Switch`를 알아본다.

#### 1. Alternative to the if statement for multiple states

여러 개의 `condition`이 주어지는 경우 `if ~ else if ~ else if ... else`는 __`switch`문으로 대체__할 수 있다.

__Syntax__

```swift
switch some value to consider {
case value 1:
    respond to value 1
case value 2,
    value 3:
    respond to value 2 or 3
default:
    otherwise, do something else
}
```

<br>

```swift
let someCharacter: Character = "z"
switch someCharacter {
case "a":
    print("The first letter of the alphabet")
case "z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}

// The last letter of the alphabet
```

<br>

`if` statement 에서 `else`는 언제나 <span style="color: red">Optional</span>이지만 `switch`문에서 `default`는 <span style="color: red">필수</span>다.  
따라서 `switch`문에서 `else`를 구현하지 않는 경우와 같은 로직을 만들고 싶다면 `default`에 `break`만 넣어주면 된다.

```swift
let someCharacter: Character = "u"
switch someCharacter {
case "a":
    print("The first letter of the alphabet")
case "z":
    print("The last letter of the alphabet")
default:
    break
}

// Nothing
```

> `TypeScript(JavaScript)`와 같은 다른 언어에서는 `default`가 `Optional`인 경우가 있으나 Swift 에서는 필수로 구현해야한다.

> `TypeScript`는 `default`가 `Optional`이라 구현하지 않아도 된다.
> ```typescript
> const anotherCharacter: string = "u"
> switch (anotherCharacter) {
>     case "a":
>         console.log("The first letter of the alphabet")
>         break
>     case "z":
>         console.log("The last letter of the alphabet")
>         break
> }
> 
> // Nothing
> ```

#### 2. No Implicit Fallthrough

`Objective-C`를 포함한 대부분의 언어의 `switch`의 동작은 처음 일치하는 `case`를 실행한 후 아래 `case`의 로직을 
계속 실행해 내려간다(fall through the bottom of each case).

```typescript
const anotherCharacter: string = "z"
switch (anotherCharacter) {
    case "a":
    case "A":
        console.log("The first letter of the alphabet")
        break
    case "z":
    case "Z":
        console.log("The last letter of the alphabet")
        break
}

// The last letter of the alphabet
```

<br>

Swift 의 `switch`문은 <span style="color: red">처음 일치하는 `case`를 실행한 후 `즉시 종료`</span>된다. 따라서 Swift 에서 아래와 같은 로직은 컴파일 에러가 발생된다.

```swift
let anotherCharacter: Character = "z"
switch anotherCharacter {
case "a":   // 'case' label in a 'switch' must have at least one executable statement
case "A":
    print("The first letter of the alphabet")
case "z":   // 'case' label in a 'switch' must have at least one executable statement
case "Z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}
```

<br>

따라서 Swift 의 `switch`문은 <span style="color: red">'_**break**_'를 명시하지 않아도 된다</span>.  
반대로 의도적으로 `fallthrough` 시키길 원하면 `fallthrough`를 명시해야한다.

```swift
let anotherCharacter: Character = "z"
switch anotherCharacter {
case "a": fallthrough
case "A":
    print("The first letter of the alphabet")
case "z": fallthrough
case "Z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}

// The last letter of the alphabet
```

<br>

하지만 위와 같은 방식은 권장되지 않는다. Swift 에서는 대부분의 경우 개발자가 `switch`문에서 `break`를 빠뜨려 
발생하는 에러를 일치하는 `case`를 실행 후 즉시 종료하는 것 뿐 아니라 다른 언어에서 `case`가 `single case match`만 
매칭할 수 있는 것과 달리 `multiple case match`를 지원한다. 이를 `Compound Cases`라 하며 아래 `8. Compound Cases`에서 다시 다룬다.

```swift
let anotherCharacter: Character = "z"
switch anotherCharacter {
case "a", "A":
    print("The first letter of the alphabet")
case "z", "Z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}

// The last letter of the alphabet
```

> 가독성을 위해 `multiple case`를 줄바꿈 해 매칭할 수 있다.

#### 3. Switch-True

여기 조금 특별한 방식의 `Switch`문이 있다.

__1 ) Interval Matching__  
일반적으로 `Switch`문은 `equal`로 매칭되기 때문에 `single case match`를 기본으로 한다. 따라서 범위 매칭시 아래와 같이 작성한다.

```typescript
const approximateCount: number = 62
const countedThings: string = "moons orbiting Saturn"
let naturalCount: string
switch (true) {
    case approximateCount === 0:
        naturalCount = "no"
        break
    case (approximateCount >= 1) && (approximateCount < 5):
        naturalCount = "a few"
        break
    case (approximateCount >= 5) && (approximateCount < 12):
        naturalCount = "several"
        break
    case (approximateCount >= 12) && (approximateCount < 100):
        naturalCount = "dozens of"
        break
    case (approximateCount >= 100) && (approximateCount < 1000):
        naturalCount = "hundreds of"
        break
    default:
        naturalCount = "many"
}
console.log(`There are ${naturalCount} ${countedThings}.`)
```
```console
There are dozens of moons orbiting Saturn.
```

<br>
마찬가지로 Swift 에서도 다음과 같이 범위 매칭을 할 수 있다.

```swift
let approximateCount: Int = 62
let countedThings: String = "moons orbiting Saturn"
let naturalCount: String
switch true {
case approximateCount == 0:
    naturalCount = "no"
case (approximateCount >= 1) && (approximateCount < 5):
    naturalCount = "a few"
case (approximateCount >= 5) && (approximateCount < 12):
    naturalCount = "several"
case (approximateCount >= 12) && (approximateCount < 100):
    naturalCount = "dozens of"
case (approximateCount >= 100) && (approximateCount < 1000):
    naturalCount = "hundreds of"
default:
    naturalCount = "many"
}
print("There are \(naturalCount) \(countedThings).")
```

```console
There are dozens of moons orbiting Saturn.
```

<br>

__2 ) Validation Check__  
`Switch-True`의 용법 중 다른 하나는 `if ~ else if ~ else if ~ ... else` 구문보다 더욱 간결하게 `Validation Check`를 할 수 있다는 것이다.

```swift
struct User {
    var name: String?
    var age: Int?
    var phone: String?
    var height: Double?
    var weight: Double?
}

func validateUser(of user: User?) -> Bool {
    guard let user = user else { return false }
    
    switch true {
    case user.age == nil: print("age is nil"); return false
    case (user.age! < 0) || (user.age! > 130): print("invalid age"); return false
    case user.name == nil: print("name is nil"); return false
    case user.phone == nil: print("phone is nil"); return false
    case user.height == nil: print("height is nil"); return false
    case user.weight == nil: print("weight is nil"); return false
    default: return true
    }
}
```

<br>

```swift
var myUser = User(name: "홍길동", age: 132, phone: "010-4434-3556", height: 183.2, weight: 74)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
invalid age
Validation check result of myUser is false.
```

<br>

```swift
var myUser = User(name: "장보고", age: 42, phone: "010-2342-1234", height: 175.2, weight: nil)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
weight is nil
Validation check result of myUser is false.
```

<br>

```swift
var myUser = User(name: "이순신", age: 30, phone: "010-7423-3464", height: 169.6, weight: 52)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
Validation check result of myUser is true.
```

> 정규표현식을 이용하거나, `Bool` 결과 대신 `Exception`을 `throw`하도록 할 수도 있다.



#### 4. Interval Matching

Swift 의 `switch`문은 `multiple case match`를 지원하기 때문에 `Switch-True` 대신 `range operator`를 이용해 
더욱 간결한 코드로 범위 매칭을 할 수 있다.

```swift
let approximateCount: Int = 62
let countedThings: String = "moons orbiting Saturn"
let naturalCount: String
switch approximateCount {
case 0:
    naturalCount = "no"
case 1..<5:
    naturalCount = "a few"
case 5..<12:
    naturalCount = "several"
case 12..<100:
    naturalCount = "dozens of"
case 100..<1000:
    naturalCount = "hundreds of"
default:
    naturalCount = "many"
}
print("There are \(naturalCount) \(countedThings).")
```

```console
There are dozens of moons orbiting Saturn.
```

#### 5. Tuples

`_`는 `whildcard pattern`으로 사용되어 어떤 값이든 매칭할 수 있다.

```swift
func whereIs(_ point: (Int, Int)) {
    switch point {
    case (0, 0):
        print("\(point) is at the origin")
    case (_, 0):
        print("\(point) is on the x-axis")
    case (0, _):
        print("\(point) is on the y-axis")
    case (-2...2, -2...2):
        print("\(point) is inside the box")
    default:
        print("\(point) is outside of the box")
    }
}
```

![switch with tuple](/assets/images/posts/2022-10-11-control-flow/coordinateGraphSimple_2x.png)

<br>

```swift
whereIs((0, 0))     // (0, 0) is at the origin
whereIs((3, 0))     // (3, 0) is on the x-axis
whereIs((1, 2))     // (1, 2) is inside the box
whereIs((3, 2))     // (3, 2) is outside of the box
```

#### 6. Value Bindings

Swift 는 `switch`구문에서도 `Value Bindings`를 사용할 수 있다.

```swift
func anotherPoint(_ point: (Int, Int)) {
    switch point {
    case (let x, 0):
        print("on the x-axis with an x value of \(x)")
    case (0, let y):
        print("on the y-axis with a y value of \(y)")
    case let (x, y):
        print("somewhere else at (\(x), \(y))")
    }
}
```

```swift
anotherPoint((4, 0))    // on the x-axis with an x value of 4
anotherPoint((0, 2))    // on the y-axis with a y value of 2
anotherPoint((2, 6))    // somewhere else at (2, 6)
```

#### 7. Where

`where`를 이용하면 `Value Bindings`에 추가 조건을 걸 수 있다.

```swift
func yetAnotherPoint(_ point: (Int, Int)) {
    switch point {
    case let (x, y) where x == y:
        print("(\(x), \(y)) is on the line x == y")
    case let (x, y) where x == -y:
        print("(\(x), \(y)) is on the line x == -y")
    case let (x, y):
        print("(\(x), \(y)) is just some arbitrary point")
    }
}
```

위 함수를 풀어쓰면 다음과 같다.

```swift
func yetAnotherPoint(_ point: (Int, Int)) {
    let (x, y) = point
    switch true {
    case x == y:
        print("(\(x), \(y)) is on the line x == y")
    case x == -y:
        print("(\(x), \(y)) is on the line x == -y")
    default:
        print("(\(x), \(y)) is just some arbitrary point")
    }
}
```

![Switch case value bindings with where](/assets/images/posts/2022-10-11-control-flow/switchValueBindingsWithWhere.png)

<br>

```swift
yetAnotherPoint((4, 4))     // (4, 4) is on the line x == y
yetAnotherPoint((3, -3))    // (3, -3) is on the line x == -y
yetAnotherPoint((3, 7))     // (3, 7) is just some arbitrary point
```

> 단, `where`는 단독으로 사용될 수 없고 `case scope`에 `Value Bindings`가 된 상수나 변수가 있어야한다. 

#### 8. Compound Cases

위 `1. No Implicit Fallthrough`에서 본 것처럼 Swift 의 `switch`는 `multiple case match`를 지원하므로 여러 케이스를 혼합해서 사용할 수 있다.

```swift
let someCharacter: Character = "e"
switch someCharacter {
case "a", "e", "i", "o", "u":
    print("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
     "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    print("\(someCharacter) is a consonant")
default:
    print("\(someCharacter) is not a vowel or a consonant")
}

// e is a vowel
```

<br>

위와 같은 `Compound Cases`는 `Value Bindings`과 함께 사용하는 것 역시 가능하다.

```swift
func stillAnotherPoint(_ point: (Int, Int)) {
    switch point {
    case (let distance, 0), (0, let distance):
        print("On an axis, \(distance) from the origin")
    default:
        print("Not on an axis")
    }
}

// On an axis, 9 from the origin
```

<br>

마찬가지로 위 `Switch-True`에서 `Validation Check`를 다시 쓰면 다음과 같이 사용할 수도 있다.

```swift
struct User {
    var name: String?
    var age: Int?
    var phone: String?
    var height: Double?
    var weight: Double?
}

func validateUserWithCompoundCases(of user: User?) -> Bool {
    guard let user = user else { return false }
    
    switch true {
    case user.age == nil, user.name == nil,
        user.phone == nil, user.height == nil,
        user.weight == nil
        : print("Something is nil"); return false
    case (user.age! < 0) || (user.age! > 130): print("invalid age"); return false
    default: return true
    }
}

print("Validation check result is \(anotherResult!).")
```

```console
invalid age
Validation check result is false.
```

### 5. Control Transfer Statements 👩‍💻

Swift 에는 코드의 흐름을 제어하는 5가지 `Control Transfer Statements`가 있다.

- continue
- break
- fallthrough
- return
- throw

#### 1. continue

`iteration`의 현재 `loop`를 중단하고 다음 `loop`로 건너 뛴다.

```swift
let puzzleInput = "great minds think alike"
var puzzleOutput = ""
let charactersToRemove: [Character] = ["a", "e", "i", "o", "u", " "]
for character in puzzleInput {
    if charactersToRemove.contains(character) {
        continue
    }
    puzzleOutput.append(character)
}
print(puzzleOutput)     // grtmndsthnklk
```

`continue`에 의해 모음이나 공백을 만나면 건너뛰고 자음만 출력된다.

#### 2. break

`iteration loop` 또는 `switch`의 전체 구문을 즉시 중단하고 탈출한다.

- Iteration

```swift
let puzzleInput = "great minds think alike"
var puzzleOutput = ""
let charactersToRemove: [Character] = ["a", "e", "i", "o", "u", " "]
for character in puzzleInput {
    if charactersToRemove.contains(character) {
        break
    }
    puzzleOutput.append(character)
}
print(puzzleOutput)     // gr
```

- Switch

```swift
let someLetter = "B"

switch someLetter {
case "A": print("This character is 'A'.")
case "B": break
case "C": print("This character is 'C'.")
default: break
}
```

> Swift 의 `Switch`문은 기본적으로 `No Implicit Fallthrough`이므로 `break`는 생략해도 된다.

#### 3. fallthrough

`switch`를 의도적으로 매칭되는 `case`의 다음 `case`를 실행하도록 한다.

```swift
let integerToDescribe = 5
var description = "The number \(integerToDescribe) is"
switch integerToDescribe {
case 2, 3, 5, 7, 11, 13, 17, 19:
    description += " a prime number, and also"
    fallthrough
default:
    description += " an integer."
}
print(description)  // The number 5 is a prime number, and also an integer.
```

> Swift 의 `Switch`문은 `case` 매칭시 `break`가 기본 동작 순서이므로 다른 언어와 달리 `fallthrough`가 필요할 경우는 명시해야한다.

#### 4. return

`break`가 `iteration loop` 또는 `switch`의 전체 구문을 즉시 중단하고 탈출하는 것처럼
`return`은 `function` 내부에서 사용되어 전체 구문을 즉시 중단하고 `값을 반환`한다.

따라서 `return`이 실행되면 `function` 내부의 `iteration loop` 또는 `switch` 구문은 
더 상위 `scope`인 `function` 전체 구문이 중단되므로 별도의 `break` 없이도 중단된다.

단, `return type`은 해당 `function`이 정의한 `type`과 일치해야한다.

#### 5. throw

`throw`는 `return`과 마찬가지로 `function` 내부에서 사용되어 전체 구문을 즉시 중단하고, 
`Error` 또는 `fatalError`를 반환한다.

이것은 `function`이 정의한 `return type`과 무관하게 `Error` 또는 `fatalError`를 반환한다.

#### 6. Labeled Statements

`iteration loop`나 `switch`와 같은 구문을 중복해 사용할 수 있다. 이 때 로직의 흐름을 정확히 제어하기 위해서는 `label`이 필요하고, 이를 `labeld statements`라 한다.

__Syntax__

```swift
label name: while condition {
    statements
}
```

<br>

`주사위 1`이 `주사위 2`보다 값이 크면 게임을 종료하는 `loop`를 만든다.

```swift
func rollDice() -> Int {
    Int.random(in: 1...6)
}
```

```swift
for _ in 1...10 {
    let dice1: Int = rollDice()
    let dice2: Int = rollDice()
    
    print("Without label >> dice1: \(dice1), dice2: \(dice2), therefore dice1 > dice2 is \(dice1 > dice2)")
    
    switch true {
    case dice1 > dice2: break
    default: continue
    }
}
```
```console
Whitout label >> dice1: 1, dice2: 4, therefore dice1 > dice2 is false
Whitout label >> dice1: 2, dice2: 4, therefore dice1 > dice2 is false
Whitout label >> dice1: 3, dice2: 3, therefore dice1 > dice2 is false
Whitout label >> dice1: 1, dice2: 1, therefore dice1 > dice2 is false
Whitout label >> dice1: 3, dice2: 4, therefore dice1 > dice2 is false
Whitout label >> dice1: 4, dice2: 6, therefore dice1 > dice2 is false
Whitout label >> dice1: 6, dice2: 2, therefore dice1 > dice2 is true
Whitout label >> dice1: 3, dice2: 1, therefore dice1 > dice2 is true
Whitout label >> dice1: 6, dice2: 6, therefore dice1 > dice2 is false
Whitout label >> dice1: 3, dice2: 4, therefore dice1 > dice2 is false
```

`break`에 의해 `For-In Loops`를 종료할 것 같지만 `Switch` 구문 안에서 발생한 `break`이기 때문에 `switch` 구문만 종료한다.

<br>

```swift
gameLoop: while true {
    let dice1: Int = rollDice()
    let dice2: Int = rollDice()
    
    print("With label >> dice1: \(dice1), dice2: \(dice2), therefore dice1 > dice2 is \(dice1 > dice2)")
    
    switch true {
    case dice1 > dice2: break gameLoop
    default: continue
    }
}
```
```console
With label >> dice1: 2, dice2: 5, therefore dice1 > dice2 is false
With label >> dice1: 4, dice2: 1, therefore dice1 > dice2 is true
```

> `label`을 이용하면 제어 명령을 정확히 컨트롤 할 수 있다.

#### 7. Early Exit

`guard`문은 `if` statement 와 비슷하게 `Boolean` 값에 따라 문을 실행한다. 하지만 `if`와의 가장 큰 차이점은 항상 `else`
절이 뒤따르며, `else` clause 는 반드시 `code block`을 종료하기 위해 반드시 `return`, `break`, `continue`, `throw`와
같은 `Control Transfer Statements`를 수행하거나 `fatalError(_:file:line:)`과 같이 `return`이 없는 
함수나 메서드를 호출해야한다.

<br>

위 `Switch-True`의 `Validation Checek`를 다음과 같이 바꿀 수 있다.

```swift
struct User {
    var name: String?
    var age: Int?
    var phone: String?
    var height: Double?
    var weight: Double?
}

func validateUser(of user: User?) -> Bool {
    guard let user = user else { return false }
    
    guard let age = user.age else { print("age is nil"); return false }
    if (age < 0) || (age > 130) { print("invalid age"); return false }
    guard let _ = user.name else { print("name is nil"); return false }
    guard let _ = user.phone else { print("phone is nil"); return false }
    guard let _ = user.height else { print("height is nil"); return false }
    guard let _ = user.weight else { print("weight is nil"); return false }
    return true
}
```

<br>

```swift
var myUser = User(name: "홍길동", age: 132, phone: "010-4434-3556", height: 183.2, weight: 74)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
invalid age
Validation check result of myUser is false.
```

<br>

```swift
var myUser = User(name: "장보고", age: 42, phone: "010-2342-1234", height: 175.2, weight: nil)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
weight is nil
Validation check result of myUser is false.
```

<br>

```swift
var myUser = User(name: "이순신", age: 30, phone: "010-7423-3464", height: 169.6, weight: 52)

let result: Bool? = validateUser(of: myUser)
print("Validation check result of myUser is \(result!).")
```
```console
Validation check result of myUser is true.
```

<br><br>

---
Reference

1. "Control Flow", The Swift Programming Language Swift 5.7. accessed Oct. 11, 2022, [Swift Docs Chapter 4 - Control Flow](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#)
