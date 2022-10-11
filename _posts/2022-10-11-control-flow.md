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
#### <span style="color: rgba(166, 42, 254, 1)">1. While</span>
#### <span style="color: rgba(166, 42, 254, 1)">2. Repeat-While</span>

---

### <span style="color: orange">3. Conditional Statements - If 👩‍💻</span>
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

