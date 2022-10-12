---
layout: post
title: Swift Control Flow
subtitle: Control Flow - Fot-IN Loops, While Loops, Conditional Statements
categories: swift
tags: [swift docs, swift loop, swift for, swift while, swift if, swift switch, swift condition]
---

### <span style="color: orange">1. For-In Loops 👩‍💻</span>
`For-In` 반복문은 `Array`가 저장한 `items`, `String`이 저장한 `characters`와 같은 `sequence`를 반복할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Iterate over with numeric ranges</span>

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

#### <span style="color: rgba(166, 42, 254, 1)">2. Iterate over the items in an array</span>

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

#### <span style="color: rgba(166, 42, 254, 1)">3. Iterate over a dictionary to access its key-value paris</span>

우리는 [**Iterating over a dictionary**][Iterating over a dictionary]에서 살펴본 것 처럼 `Dictionary`는 한 쌍의 `Kye: Value` `tuple`로 접근해 반복할 수 있다.  
아래는 `tuple`이 `animalName`이라는 `Key constant`와 `legCount`라는 `Value constant`로 분해되는 예제다.

[Iterating over a dictionary]: https://sbpark88.github.io/swift/2022/10/03/collection-types.html#h-6-iterating-over-a-dictionary

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

### <span style="color: orange">2. While Loops 👩‍💻</span>

우선 아래 `while`을 설명하면서 사용할 주사위 함수는 다음과 같다.

```swift
func rollDice() -> Int {
  Int.random(in: 1...6)
}
```

#### <span style="color: rgba(166, 42, 254, 1)">1. While</span>
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


#### <span style="color: rgba(166, 42, 254, 1)">2. Repeat-While</span>
`repeat-while`문이 `while`문과 다른 점은 반복할 로직을 먼저 실행 후 조건을 검사한다. 그렇기 때문에 `repeat-while`은 최소한 1번의 로직은 수행한다.

__Syntax__

```swift
repeat {
    statements
} while condition
```

<br>

위 주사위 문제에서 result의 초깃값이 20보다 크게 정해져 있다고 가정해보자.

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

초깃값이 20 이상이지만 최초 1회 실행을 한다. 그리고 이때 계산된 result는 condition을 만족하는 작은 값으로 바뀔 경우 `repeat`을 반복하게된다.
따라서 `Repeat-While`은 최소 1번은 실행하므로 1 ~ n번의 반복을 하게 된다.

#### <span style="color: rgba(166, 42, 254, 1)">3. While-True</span>
여기 조금 특별한 방식의 `While`문이 있다.  
`While` 또는 `Repeat-While`의 `condition`은 `true`일 때 반복하므로 `false`가 될 때 중단된다.  
반면 `While-True`는 위 `if`를 사용해 반복할 조건을 검사하므로 `condition`과 반대가 되어야한다. 
즉, `!condition`일 때 중단되거나 `condition`은 그대로 사용하되 `if`절은 비워두고 `else`절에서 중단해야한다.  
물론, 성능을 위해서는 `!`를 붙여 NOT 연산을 한 번 더 하거나, `else`절까지 가지 않도록 `condition` 자체를 
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

> `Repeat-While` 로직이 없는 언어일 경우 이런식으로 구현할 수 있지만, `Swift`는 이를 지원하므로
> 명확한 코드 의도 전달 및 가독성을 위해 `Repeat-While`로 코드를 작성하는 것이 좋다.

---

### <span style="color: orange">3. Conditional Statements - If 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">4. Conditional Statements - Switch 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. Alternative to the if statement for multiple states</span>
#### <span style="color: rgba(166, 42, 254, 1)">2. No Implicit Fallthrough</span>
#### <span style="color: rgba(166, 42, 254, 1)">3. Interval Matching</span>
#### <span style="color: rgba(166, 42, 254, 1)">4. Tuples</span>
#### <span style="color: rgba(166, 42, 254, 1)">5. Value Bindings</span>
#### <span style="color: rgba(166, 42, 254, 1)">6. Where</span>
#### <span style="color: rgba(166, 42, 254, 1)">7. Compound Cases</span>
#### <span style="color: rgba(166, 42, 254, 1)">8. Switch(true)</span>

---

### <span style="color: orange">5. Control Transfer Statements 👩‍💻</span>
`Swift`에는 5가지 `Control Transfer Statements`가 있다.

- continue
- break
- fallthrough
- return
- throw

#### <span style="color: rgba(166, 42, 254, 1)">1. continue</span>
#### <span style="color: rgba(166, 42, 254, 1)">2. break</span>
#### <span style="color: rgba(166, 42, 254, 1)">3. fallthrough</span>
#### <span style="color: rgba(166, 42, 254, 1)">4. return</span>
#### <span style="color: rgba(166, 42, 254, 1)">5. throw</span>
#### <span style="color: rgba(166, 42, 254, 1)">6. Labeled Statements</span>
#### <span style="color: rgba(166, 42, 254, 1)">7. Early Exit</span>

<br><br>

---
Reference

1. "Control Flow", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Oct. 3 2022, [Swift Docs Chapter 4 - Control Flow](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#)

