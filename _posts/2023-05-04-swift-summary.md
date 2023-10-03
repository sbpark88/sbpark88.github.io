---
layout: post
title: Swift Summary
subtitle: Short Book about the grammar of the Swift Language
categories: swift
tags: [swift docs, shortbook, cheatsheet, summary, grammar]
---

## 1. String 👩‍💻

### Type

Swift 의 String 은 Struct 기반의 Value 타입이다.
Objective-C 의 NSString 은 Class 기반의 Reference 타입이다.
Foundation 은 Swift 의 String 에서 캐스팅 없이 NSString 의 메서드를 사용할 수 있게 해준다.

### Optimization

Value 타입이라는 말은 상수나 변수에 할당하거나 함수나 메서드에 전달될 때 값이 복사된다는 것을 의미한다.  
하지만 실제로는 컴파일러가 실제 복사가 필요할 때까지는 값의 복사 자체를 지연시켜 값 타입을 유지하면서 성능을 향상시킨다.
자세한 내용은 하단 Substring 참고.

### String is the set of Characters

Swift 의 String 은 Character 의 집합이다.

- for in 을 이용해 각각의 Character 꺼내기

```swift
for character in "Dog!🐶" {
    print(character)
}
```

- Character 배열을 String 으로 생성하기

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)       // Cat!🐱
```

### String + String

```swift
var newString = "hello" + " there"      // hello there
```

### String.append(Character)

```swift
var string1: String = "hello"
let exclamationMark: Character = "!"
string1.append(exclamationMark)         // hello!
```

### Special Characters

- Unicode Scalar Value

`\u{n}` 형태로 표현되는 유니코드를 말한다.

```swift
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

- Escaped Special Characters

문자열 내에 삽입되어 특수한 기능을 하는 `\0`, `\n`, `\t` 와 같은 것들을 말한다.

- Extended String Delimiters (확장된 문자열 구획 문자)

'Escaped Special Characters' 을 무시하도록 처리하는 특수한 문자열로 앞뒤에 동일한 개수의 `#`를 넣어준다.

```swift
#"안녕 \n 하세요"#  

// 안녕 \n 하세요
```

만약 중간에 임시로 'Escaped Special Characters' 가 작동하도록 하려면 `\` 뒤에 동일한 개수의 `#`을 넣어준다.

```swift
#"안녕 \#n 하세요"#  

// 안녕
// 하세요
```

### Sting Interpolation

```swift
let name = "홍길동"
"제 이름은 \(name)입니다."         // 제 이름은 홍길동입니다.
#"제 이름은 \(name)입니다."#       // 제 이름은 \(name)입니다. 
#"제 이름은 \#(name)입니다."#      // 제 이름은 홍길동입니다.
```

물론 Extended String Delimiters `#` 이 우선권을 갖는다.

### Extended Grapheme Clusters

Swift 의 문자열은 자모 그룹의 확장으로 표현된다.

```swift
"\u{D55C}"                   // 한
"\u{1112}\u{1161}\u{11AB}"   // 한 = ㅎ + ㅏ + ㄴ
```

사람이 볼 때 같은 결과물의 문자를 저장하더라도 `Extended Grapheme Clusters`로 인해 저장하는데 필요한 메모리 크기는
다를 수 있다.

```swift
var word1 = "\u{D55C}"                   // 한
var word2 = "\u{1112}\u{1161}\u{11AB}"   // 한 = ㅎ + ㅏ + ㄴ

print("\(word1), \(word1.count)")        // 한, 1
print("\(word2), \(word2.count)")        // 한, 1
```

하지만 Swift 의 String 은 동일한 문자열 길이(count)를 반환한다.  
단, `Extended Grapheme Clusters`로 인해 NSString 이 반환하는 count 의 값은 다를 수 있다.

### Accessing and Modifying a String

- String 메서드 이용

```swift
let greeting = "Guten Tag!"

print(greeting.startIndex)                          // Index(_rawBits: 1),      G
print(greeting.index(after: greeting.startIndex))   // Index(_rawBits: 65793),  u
greeting.index(greeting.startIndex, offsetBy: 1)    // Index of "u",  Index(_rawBits: 65793)
print(greeting.index(before: greeting.endIndex))    // Index(_rawBits: 590081), !
print(greeting.endIndex)                            // Index(_rawBits: 655367), Fatal error: String index is out of bounds
```

- Subscript Syntax 이용

```swift
let greeting = "Guten Tag!"
print(greeting[..<greeting.endIndex])       // Guten Tag!
```

<span style="color: red;">endIndex 가 out of bounds 임에 유의</span>하자

### Subscript

Substring 은 Swift 의 String 이 Value Type 임에도 불구하고 메모리 공간 및 복사에 대한 성능 최적화를 가능케 하는 핵심으로
Subscript 또는 `prefix(upTo:)`, `prefix(_ maxLength:)`메서드를 사용해 만들 수 있다.

```swift
let greeting = "Hello, world!"
var index = greeting.firstIndex(of: ",") ?? greeting.endIndex
let beginning = greeting[..<index]

print(beginning)            // Hello
print(type(of: beginning))  // Substring
```

- Substring 은 String 과 마찬가지로 StringProtocol 을 따르므로 유사하게 메서드 사용이 가능하다.
- Substring 은 Characters 를 저장하기 위한 자기 자신의 메모리 공간을 갖지 않고 <span style="color: red;">원본 String 의
  메모리 공간을 재사용</span>한다.
- Substring 은 수정이 종료되고 <span style="color: red;">장기 저장이 필요할 경우 String Instance 로 변환</span>되어야 한다.

### Comparing String

- 전체 비교

`==`, `!=` Operators 를 사용해 비교할 수 있으며, `Extended Grapheme Clusters`에 의해 동일하다면 `동등 관계`이다.

- prefix 비교

`hasPrefix(_:)`를 사용 [cf. Prefix equality](/swift/2022/09/17/strings-and-characters.html#h-2-prefix-equality)

- suffix 비교

`hasSuffix(_:`를 사용 [cf. Suffix equality](/swift/2022/09/17/strings-and-characters.html#h-3-suffix-equality)

---

## 2. Collection 👩‍💻

### Iterator Protocol & Sequence Protocol

- [IteratorProtocol](https://developer.apple.com/documentation/swift/iteratorprotocol)

```swift
protocol IteratorProtcol {
    associatedtype Element
    mutating func next() -> Element?
}
```

Iterator Protocol 은 `func next() -> Self.Element?`를 구현하도록 강제하는 규칙으로 Sequence Protocol 과 밀접하게 연관된다. 
Sequence 와 매우 유사하다. Element 라는 `associated type` 을 가지며 이것은 element 를 추가하거나 iteration 을 수행할 때 
사용하는 타입을 나타낸다. 그리고 `next()` methods 는 next element 를 반환한다.

<br>

- [Sequence](https://developer.apple.com/documentation/swift/sequence)

```swift
protocol Sequence {
    associatedtype Iterator : IteratorProtocol where Iterator.Element == Element
    func makeIterator() -> Iterator
}
```

Sequence 는 IteratorProtocol 을 준수하는 `associated type`을 갖고 있으며, `makeIterator()` methods 는 
associated type 을 통해 선언한 Iterator 를 반환한다.

<br>

따라서 `IteratorProtocol`과 `Sequence` 두 Protocols 를 준수하도록 함으로써 다음과 같은 객체의 순환을 구현할 수 있다.

```swift
struct Countdown: Sequence, IteratorProtocol {
    var count: Int

    mutating func next() -> Int? {
        if count == 0 {
            return nil
        } else {
            defer { count -= 1 }
            return count
        }
    }
}

let threeToGo = Countdown(count: 3)
for i in threeToGo {
    print(i)
}
// Prints "3"
// Prints "2"
// Prints "1"
```

> 이들 관의 관계 및 다른 Collection 을 구현함에 있어 어떻게 활용하는지에 대해 좀 더 자세한 예는
> [Swift의 Sequence와 Collection에 대해 알아야 하는것들](https://academy.realm.io/kr/posts/try-swift-soroush-khanlou-sequence-collection/)
> 을 참고한다.

### Collection

- [Collection](https://developer.apple.com/documentation/swift/collection)

`Sequence`를 준수하는 `Collection`이라는 Protocol 로 Swift Standard Library 에 광범위하게 사용된다. Swift 는 해당 
Protocol 을 준수하는 다음 3가지 Primary Collection Types 를 제공한다.

- Array
- Set
- Dictionary

<br>

__Sequence 와 Collection 의 비교__

- Sequence : 무한하거나 유하한 elements 에 대해 `한 번만 iterating` 한다.
- Collection : elements 를 `비파괴적으료 여러 차례 iterating` 할 수 있다. `Subscript`로 접근할 수 있도록 
  Sequence 를 확장한다.

### Arrays

String 과 마찬가지로 Array 는 Foundation 을 통해 NSArray 와 연결되고, 별도의 캐스팅 없이 NSArray 메서드를 사용할 수 있다.

```swift
var someArray = Array<Element>()
var someArray = [Int]()            // Array Type Shorthand Syntax (배열의 축약형 문법)
var someArray: [Element] = []      // Array Type Shorthand Syntax (배열의 축약형 문법)
```

- 초기값과 함께 생성하기

```swift
let allA = Array(repeating: "A", count: 10)
// ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A"]

let oneToTen = Array(1...10)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let even  = (1...10).map { $0 * 2 }
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

```swift
// Arithmetic Series [ f(x) = 3n + 2 ]
let threeStep1 = Array(stride(from: 2, through: 30, by: 3))
// [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]

let threeStep2 = Array(repeating: 0, count: 10)
    .lazy
    .enumerated()
    .map { (i, v) in (i * 3) + 2 }
// [2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
```

- Swift 의 Arrays 는 Structure 이므로 단순히 `+` Operator 를 사용해 새 Array 를 생성할 수 있다.
- `append(_:)`, `insert(_:at:)`, `remove(at:)`, `removeLast()`, `removeAll()` 등의 메서드를 사용할 수 있다.
- Subscript Syntax 를 사용해 값에 접근, 수정, 전체 삭제를 할 수 있다.
- Loops 에서 index 를 함께 사용하려면 `enumerated()`를 사용.

### Sets

Set 는 Foundation 을 통해 NSSet 과 연결되고, 별도의 캐스팅 없이 NSSet 메서드를 사용할 수 있다.

- Set 은 순서가 없다.
- Set 은 `Hashable` Protocol 을 준수한다(= 중복이 없다).
  (Hash Value 는 Int 값으로 두 Object 가 완전히 동일하면 Hash Value 역시 동일하며 a==b 가 성립된다.)

```swift
var someSet = Set<Element>()
var someSet: Set<Element> = [elements...]  // Do not use to create Empty Set.
```

- `var someSet: [Element] = []` 는 불가능하다(Array 와 구분이 되지 않기 때문).
- Array 와 달리 Any 로 선언해도 서로 다른 Types 의 데이터는 담을 수 없다.
- `insert(_:)`, `remove(_:)`, `removeAll()` 등의 메서드를 사용할 수 있다.

Set 자체는 순서가 없지만 index 가 필요하다면 `enumerated()`를 사용해 index 와 value 모두에 접근할 수 있다.  
(단, 순서가 고정되지 않기 때문에 먼저 `sorted()`를 해주는 것이 좋다)

```swift
let fruits: Set = [
    "Apple",
    "Pear",
    "Persimmon",
    "Tangerine",
    "Orange",
    "Mango",
    "Plum",
    "Cherry"
]

print(type(of: fruits))

for (index, value) in fruits.sorted().enumerated() {
    print("Item \(index + 1): \(value)")
}
```

#### Set Operations

[Performing Set Operations](/swift/2022/10/03/collection-types.html#h-7-performing-set-operations) 를 수행할 수 있다.

- a.intersection(b) : 교집합
- a.symmetricDifference(b) : 대칭차집합
- a.union(b) : 합집합
- a.subtracting(b) : 차집합

#### Set Membership and Equality

[Set Membership and Equality](/swift/2022/10/03/collection-types.html#h-8-set-membership-and-equality) 를 사용해
Superset, Subset 등의 관계를 표현할 수 있다.

- a == b : 상동
- a.isSuperset(of: b) : a 가 b 의 상위 집합
- a.isSubset(of: a) : a 가 b 의 하위 부분 집합
- a.isDisjoint(with: b) : a 와 b 는 서로소 집합


### Dictionaries

Dictionary 는 Foundation 을 통해 NSDictionary 와 연결되고, 별도의 캐스팅 없이 NSDictionary 메서드를 사용할 수 있다.

- Key: Value
- Map 의 Key 는 `Hashable` Protocol 을 준수한다(= Key 의 중복이 없다).
- Dictionary 는 <span style="color: red;">항상 Optional 을 반환</span>한다.

```swift
var someDictionary = Dictionary<Key, Value>()
var someDictionary = [Key: Value]()         // Dictionary Type Shorthand Syntax (딕셔너리의 축약형 문법)
var someDictionary: [Key: Value] = [:]      // Dictionary Type Shorthand Syntax (딕셔너리의 축약형 문법)
```

- `updateValue(_:forKey:)`, `removeValue(forKey:)`, `removeAll()` 등의 메서드를 사용할 수 있다.
- Subscript Syntax 를 사용해 값을 추가, 수정, 삭제, 전체 삭제를 할수 있다.
- Subscript 로 제거하는 것과 달리 `removeValue(forKey:)`로 제거하면 `Optional(Old Value)`를 반환한다.

Key, Value 는 다음과 같이 Tuple 을 이용해 비구조화 시켜 접근할 수 있다.

```swift
let fruits = [
    "Apple": 4200,
    "Pear": 6800,
    "Persimmon": 3400
]

for (goods, price) in fruits {
    print("\(goods)'s price is \(price) won.")
}
```

물론 둘 중 하나만 필요하다면 다음과 같이 접근할 수 있다.

```swift
for goods in fruits.keys {
    print(goods, terminator: "  ")
}

for price in fruits.values {
    print(price, terminator: "  ")
}
```

`sorted(by:)` 를 사용해 정렬 시켜 반복할 수 있다.

```swift
for goods in fruits.keys.sorted(by: <) {
    print(goods, terminator: "  ")
}

// ascending order by keys
for (goods, price) in fruits.sorted(by: {$0.0 < $1.0}) {
    print("\(goods)'s price is \(price)won.")
}

// descending order by values
for (goods, price) in fruits.sorted(by: {$0.1 > $1.1}) {
    print("\(goods)'s price is \(price)won.")
}
```

---

## 3. Control Flow 👩‍💻

### For-In & While

개발에 있어 `Control Flow` 는 하나의 소스 코드가 여러 비즈니스 로직을 처리할 수 있도록 제어하는 기본적인 방법이다.

개발을 하는데 있어 `Control Flow` 는 로직의 흐름을 만들고 제어하는 가장 기본적인 방법이다.

TypeScript 에서는 `[[Enumerable]]` 속성에 대해 반복이 가능한 `for-in`(**Object 의 key, Array 의 index 에 접근**)과 
`[Symbol.iterator]` 속성에 대해 반복이 가능한 `for-of`(**Array 의 value 에 접근**)가 서로 다르게 존재한다.

하지만 Swift 에서는 Array, Set, Dictionary 모두 `for-in` 하나로 반복한다.

- for-in

```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}

let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}

let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    print("\(animalName)s have \(legCount) legs")
}
```

```typescript
const menu: { string: number } = { chicken: 16_000, beer: 3_500, soda: 1_000 }
for (const [name, price] of Object.entries(menu)) console.log(name, price)
```

> 마지막의 `for (animalName, legCount) in numberOfLegs`와 같은 destructuring 은 TypeScript 의 Object 에서도 
> `for (const [name, price] of Object.entries(menu))`와 같이 사용할 수 있다. 하지만 여전히 `for-in`, `for-of` 
> 두 가지를 모두 사용해야하며 하나로 통일해 사용하는 것은 불가능하다.

<br>

- while

while 은 TypeScript 와 다르지 않다.

```swift
var result = 0
var rollCount = 0

while result < 20 {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
}
```

- repeat-while

Swift 에서는 `repeat-while` 이라는 Syntax 를 사용한다.

```swift
var result = 25
var rollCount = 0

repeat {
    result = rollDice() * rollDice()
    rollCount += 1
    print(result)
} while result < 20
```

### Conditional Statements - If

다른 언어들과 마찬가지로 if, else if, else 로 구분한다. 단, 다른 언어들과 달리 조건식을 괄호로 묶지 않아도 된다.

```swift
let temperatureInCelsius = 3
if temperatureInCelsius > 28 {
    print("It's hot. Turn on the air conditioner.")
} else if temperatureInCelsius < 10 {
    print("It's cole. Turn on the boiler.")
} else {
    print("It's nice weather. Go out for a walk.")
}
```

### Conditional Statements - Switch

#### Switch must have 'default'

Swift 의 switch 에서 `default` 는 필수다. 또한 Enumeration 을 switch 에 사용할 경우 Enumeration 의 모든 cases 를
switch 에도 빠짐 없이 정의해한다.

```swift
switch someCharacter {
case "a":
    print("The first letter of the alphabet")
case "z":
    print("The last letter of the alphabet")
default:
    break
}
```

따라서 default 에 대한 아무런 구현도 필요하지 않을 경우 의도적으로 `break`를 넣어주어야한다.

#### No Implicit Fallthrough & Compound Cases

fallthrough 가 기본값이어서 매번 break 을 명시해야하는 다른 언어와 달리 Swift 는 break 이 기본값이다.

```swift
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

따라서 위와 같은 코드는 compile-error 가 발생하므로 **의도적으로 `fallthrough` 시키고자 할 경우 반드시 명시**해야한다.

```swift
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
```

하지만 위 방법은 Swift 에서 좋지 못한 방법이다. **Swift 는 `Compound Cases Matching`을 지원**하므로 다음과 같이 작성할 수 있다.

```swift
switch anotherCharacter {
case "a", "A":
    print("The first letter of the alphabet")
case "z", "Z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}
```

#### Interval Matching

일반적으로 프로그래밍 언어에서 *switch* 는 기본적으로 `equal` 매칭을 한다. 따라서 *Interval 에 대해서는 매칭을 할 수가 없다*.

따라서 `switch-true`라는 특수한 Syntax 를 사용해 다음과 같이 사용한다.

```swift
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
```

<br>

하지만 ***Swift 의 switch 는 Interval Matching 을 지원***하므로 다음과 같이 사용할 수 있다.

```swift
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
```

Interval Matching 역시 Iteration 을 이용한 여러 경우의 수를 `equal` 매칭 하는 것이다. 따라서 `<` 와 같이 대소 비교가 필요한
경우 결국 `switch-true`를 사용해야 하지 않을까 생각할 수 있지만 Swift 에는 이러한 경우에 사용할 수 있는 
[Where]() 가 있다.

```markdown
# Control Flow

개발에 있어 `Control Flow` 는 하나의 소스 코드가 여러 비즈니스 로직을 처리할 수 있도록 제어하는 기본적인 방법이다.

개발을 하는데 있어 `Control Flow` 는 로직의 흐름을 만들고 제어하는 가장 기본적인 방법이다. while, for-in, if 는 다른 언어와 
동일하니 생략하고 Swift 만의 특성이 있는 것 위주로 정리했다.

### Conditional Statements - Switch

### Switch must have 'default'

Swift 의 switch 에서 `default` 는 필수다. 또한 Enumeration 을 switch 에 사용할 경우 Enumeration 의 모든 cases 를 
switch 에도 빠짐 없이 정의해한다.

```swift
switch someCharacter {
case "a":
    print("The first letter of the alphabet")
case "z":
    print("The last letter of the alphabet")
default:
    break
}
```

따라서 default 에 대한 아무런 구현도 필요하지 않을 경우 의도적으로 `break`를 넣어주어야한다.

#### No Implicit Fallthrough & Compound Cases

fallthrough 가 기본값이어서 매번 break 을 명시해야하는 다른 언어와 달리 Swift 는 break 이 기본값으로 fallthrough 가
필요할 경우 별도 명시를 해야한다.

```swift
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

따라서 위와 같은 코드는 compile-error 가 발생하므로 의도적으로 fallthrough 시키고자 할 경우 반드시 명시해야한다.

```swift
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
```

하지만 위 방법은 Swift 에서 좋지 못한 방법이다. **Swift 는 `Compound Cases Matching`을 지원**하므로 다음과 같이 작성할 수 있다.

```swift
switch anotherCharacter {
case "a", "A":
    print("The first letter of the alphabet")
case "z", "Z":
    print("The last letter of the alphabet")
default:
    print("Some other character")
}
```

#### Interval Matching

일반적으로 프로그래밍 언어에서 *switch* 는 기본적으로 `equal` 매칭을 한다. 따라서 *Interval 에 대해서는 매칭을 할 수가 없다*.

따라서 `switch-true`라는 특수한 Syntax 를 사용해 다음과 같이 사용한다.

```swift
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
```

<br>

하지만 ***Swift 의 switch 는 Interval Matching 을 지원***하므로 다음과 같이 사용할 수 있다.

```swift
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
```

Interval Matching 역시 Iteration 을 이용한 여러 경우의 수를 `equal` 매칭 하는 것이다. 따라서 `<` 와 같이 대소비교가 필요한
경우 결국 `switch-true`를 사용해야 하지 않을까 생각할 수 있지만 Swift 에는 이러한 경우에 사용할 수 있는
[Where](#h-where) 가 있다.

#### Tuples

Tuples 를 매칭할 때 `_` 를 wildcard 로 사용할 수 있다.

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

```swift
whereIs((0, 0))     // (0, 0) is at the origin
whereIs((3, 0))     // (3, 0) is on the x-axis
whereIs((1, 2))     // (1, 2) is inside the box
whereIs((3, 2))     // (3, 2) is outside of the box
```

#### Value Bindings

switch 의 cases 에 매칭되는 값을 Binding 해 case 내부에서 사용할 수 있다.

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

#### Where

일반적으로 Switch 의 Equal 뿐만 아니라 대소 비교와 같은 모든 Case Matching 를 허용하며 case 내부에서 Value 를 사용하고자 할 경우
다음과 같이 함수를 이용해 구현할 수 있다.

- Local Variables 에 값을 저장.
- switch-true 를 사용해 Case Matching 을 처리.

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

<br>

하지만 Swift 에서는 이것을 별도의 함수에 담지 않아도 되며 `switch-true` 없이도 *Value Bindings* 와 *Where* 를 통해 구현할 수 있다.

```swift
switch point {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
```

😎😎

### Control Transfer Statements

#### Iteration

*while*, *for-in* 과 같은 loops 를 반복을 돌 때 `continue`, `break` 을 사용해 흐름을 제어할 수 있다.

#### Switch

*switch* 의 경우 `break`, `fallthrough`를 사용해 흐름을 제어하며 Swift 는 `No Implicit Fallthrough`가 기본값이기
때문에 `break`은 생략이 가능하다.

#### Function

*function* 또는 *closure* 의 경우 `return` 또는 `throw`를 사용해 흐름을 제어하며 function context 내부의
*iteration* 또는 *switch* 에서 발생할 경우 더 상위 context 인 function 자체가 종료되므로 함께 종료된다.

#### Early Exit

`guard` 를 사용해 함수의 실행 조건에 맞지 않는 값이 들어온 경우 바로 종료하도록 해 if 의 중첩 구조를 해결한다. 물론 다른 언어에서도
if 를 개별적으로 풀고 조건을 부정값으로 만들어 return 하도록 만들어 처리가 가능하지만 Swift 는 `guard`라는 키워드를 통해 더 높은 
가독성을 보장한다.

---

## 4. Functions 👩‍💻

### Syntax

```swift
func name (parameters) -> return type {
    function body
}
```

### Function without Return Values

```swift
func greetVoid(person: String) -> Void {
    print("Hello, \(person)!")
}
```

`Void`는 명시적으로 적을 수도 생략(Implicitly returns Void)할 수도 있다. 엄밀히 말하면 `Void` 라틑 타입의 특수한 값을 반환하는
것이고, 이 값은 `()` 으로 쓰여진 `Empty Tubple`이다.

> 명시적으로 반환 값이 있는 함수를 호출할 때는 반드시 let, var 로 받아야 한다. 그렇지 않으면 compile-time error 가 발생하므로,
> 값이 필요 없을 경우 간단히 `_`로 받는다.

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}

print(printWithoutCounting(string: "hello, world"))
```

```console
hello, world
()
```

### Function with Multiple Return Values

Swift 는 `Tuple`을 이용해 하나의 Compound 로 여러 변수에 값을 할당할 수 있다.

```swift
let (alphabetA: String, alphabetB: String) = ("A", "B")
let (alphabetC, alphabetD) = ("C", "D")
```

따라서 함수의 return 역시 Tuple 을 이용하면 한 번에 여러 값을 return 하도록 할 수 있다.

```swift
let intArray: [Int] = [31, 6, 43, 13, 6, 1, 56, 5, 88, 24]

func minMax(array: [Int]) -> (Int, Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

<br>

- 각각의 변수 또는 상수로 받을 수 있다.

```swift
let (minNumber, maxNumber): (Int, Int) = minMax(array: intArray)
```

<br>

- Tuple 타입의 단일 변수 또는 상수로 받을 수 있다.

```swift
let bounds: (min: Int, max: Int) = minMax(array: intArray)
print("min is \(bounds.min) and max is \(bounds.max)")
```

> 그리고 bounds 라는 tuple 에 각각 min, max 라는 label 을 붙여주었다.

<br>

- 함수의 return 을 정의할 때 Tuple type 에 label 을 붙일 수 있다.

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

```swift
let bounds = minMax(array: intArray)
print("min is \(bounds.min) and max is \(bounds.max)")
```

<br>

물론... 이런 형태가 Swift 만 되는건 아니고 TypeScript 도 된다.

```typescript
const [alphabetA, alphabetB]: [string, string] = ["A", "B"];
const [alphabetC, alphabetD] = ["C", "D"];
```

```typescript
const intArray: number[] = [31, 6, 43, 13, 6, 1, 56, 5, 88, 24];

function minMax(array: number[]): [number, number] {
  let currentMin = array[0];
  let currentMax = array[0];
  for (let i = 1; i < array.length; i++) {
    const value = array[i];
    if (value < currentMin) {
      currentMin = value;
    } else if (value > currentMax) {
      currentMax = value;
    }
  }
  return [currentMin, currentMax];
}

const result: [number, number] = minMax(intArray);
console.log(result);
```

### Optional Tuple Return Types

- `(String, Int, Bool)?` : Tuple 자체가 Optional 이므로 nil 일 가능성이 있다. 각각의 elements 는 자동으로 Optional Types 가 된다.
- `(String?, Int?, Bool?)` : Optional String, Optional Int, Optional Bool 을 포함하하지만 Tuple 은 Optional 이 아니다.

### Default Parameter Values

```swift
func add(a num1: Int, b num2: Int = 10) -> Int {
    num1 + num2
}
```

Swift 역시 Parameters 의 default values 를 정의할 수 있다.

```swift
print(add(a: 5, b: 20))     // 25
print(add(a: 5))            // 15
```

하나의 값이 고정된 default value 를 갖는다면 별도의 Overloading 없이도 2가지 호출 방식을 사용할 수 있다.

### Variadic Parameters

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
```

다음과 같이 n 개의 Parameters 를 받아 내부에서 Array 로 작동시킬 수 있다.

```swift
print(arithmeticMean(2))                    // 2.0
print(arithmeticMean(1, 2, 3, 4, 5))        // 3.0
print(arithmeticMean(3, 8.25, 18.75))       // 10.0
```

### In-Out Parameters

Swift 의 경우 Parameters 는 함수가 호출될 때 전달된 Arguments 를 복사해 constants 로 정의된다. 즉, 기본적으로 함수의 context
내부에서 임의로 Global/Static 에 접근하지 않는다면 Parameters 자체는 함수형을 위한 조건을 만족하는 상태가 된다.

여기에 `inout` keyword 를 사용하면 TypeScript 의 기본값과 마찬가지로 variables 로 선언되어 함수의 context 내에서 수정을 할 수
있음은 물론, `inout` 의 경우 ***함수가 종료될 때 arguments 의 Pointer 에 접근해 수정된 값으로 변경***한다.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)

print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
```

> - Parameters 의 앞에 `inout` keyword 를 사용해 정의한다.
> - Arguments 의 앞에 `&` keyword 를 사용해 호출한다.

> 1. 함수가 호출될 때 `arguments`의 값이 parameters 에 `복사`된다.
> 2. 복사된 arguments 의 값이 함수의 `body`에서 `수정`된다.
> 3. 함수가 종료될 때 `arguments`의 Pointer 를 이용해 값을 `수정`한다.

### Function Types

First-Class Citizen 이므로 `값으로 취급`될 수 있음은 물론 `함수의 Signature 를 Types 로 취급`하는 것 역시 가능하다.

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    a * b
}
```

위 두 함수는 다음과 같은 하나의 Signature 로 Types 를 정의할 수 있다.

```swift
var mathFunction: (Int, Int) -> Int
```

```swift
mathFunction = addTwoInts(_:_:)
```

`(Int, Int) -> Int` Types 와 일치하는 함수 `addTwoInts(_:_:)`를 변수 mathFunction 에 할당할 수 있다.

<br>

또한 Parameters 또는 Return Types 로써 사용되는 것이 가능하다.

- Function Types as Parameter Types

```swift
func printMathResult(mathFunction function: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(function(a, b))")
}

printMathResult(mathFunction: addTwoInts, 5, 7)       // Result: 12
printMathResult(mathFunction: multiplyTwoInts, 5, 7)  // Result: 35
```

함수 `printMathResult(mathFunction)`은 `(Int, Int) -> Int` Types 를 Parameters 로 받는다.

<br>

- Function Types as Return Types

```swift
func stepForward(_ input: Int) -> Int {
    print(#function)
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    print(#function)
    return input - 1
}

func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    backward ? stepBackward(_:) : stepForward(_:)
}
```

함수 `chooseStepFunction(backward:)`는 `(Int) -> Int`를 Return Types 로 가지며, `stepBackward(_:)` 또는
`stepForward(_:)`를 반환한다.

### Type Alias

그리고 함수의 Types 는 `typealias` keyword 를 사용해 정의 후 재사용이 가능하다.

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    a + b
}
```

```swift
typealias arithmeticCalc = (Int, Int) -> Int
let sum: arithmeticCalc = addTwoInts(_:_:)

print(addTwoInts(5, 7))         // 12
print(sum(5, 7))                // 12
```

### Function Expressions

TypeScript 에서는 일반적으로 this 및 가독성을 이유로 Function Declarations 보다 Function Expressions 를 더 많이 사용한다.

```typescript
// With Function Types
const addTwoInts: (num1: number, num2: number) => number
    = (a, b) => a + b

// Without Function Types
const multiplyTwoInts = (a: number, b: number): number => a * b
```
<br>

Swift 역시 같은 방식으로 Closures 를 이용해 정의가 가능하다.

```swift
// With Function Types
let addTwoInts: (Int, Int) -> Int = { (a: Int, b: Int) in
    a + b
}

// Without Function Types
let multiplyTwoInts = { (a: Int, b: Int) in
    a * b
}
```

게다가 Swift 의 Type Inference 를 사용하면 다음과 같이 간략히 사용하는 것도 가능하다.

```swift
typealias arithmeticCalc = (Int, Int) -> Int

let addTwoInts = { (a: Int, b: Int) in a + b }
let multiplyTwoInts: (Int, Int) -> Int = { $0 * $1 }
let subtractTwoInts: arithmeticCalc = { $0 - $1 }


print(addTwoInts(5, 7))         // 12
print(multiplyTwoInts(5, 7))    // 35
print(subtractTwoInts(5, 7))    // -2
```

물론, Swift 에서는 일반적으로 함수를 이렇게 정의하지는 않는 것 같다. 하지만 위와 정의하는 경우 바로 Inline 으로 Closure 를 
실행할 수 있기 때문에 함수로 인식시키고 처리하기 위한 Overhead 를 없앨 수 있다는 장점이 존재한다.

---

## 5. Closures 👩‍💻

### Closure Expressions

Closures 는 다음 세 가지 형태 중 하나를 갖는다.

- Global Functions : <span style="color: orange;">이름이 있고</span>,
                     어떤 값도 <span style="color: red;">캡처하지 않는</span> *Closures*
- Nested Functions : <span style="color: orange;">이름이 있고</span>, 자신이 속한 `function context`의 값을
                     <span style="color: orange;">캡처할 수 있는</span> *Closures*
- Closure Expressions : <span style="color: red;">이름이 없고</span>, 자신이 속한 `context`의 값을
                        <span style="color: orange;">캡처할 수 있는</span> 경량화된 *Closures*

### Syntax

```swift
{ (parameters) -> return type in
    statements
}
```

|                          | Global Functions |              Closures              |
|--------------------------|:----------------:|:----------------------------------:|
| Variadic Parameters      |        O         |                 O                  |
| In-Out Parameters        |        O         |                 O                  |
| Tuple Type Parameters    |        O         |                 O                  |
| Tuple Type Returns       |        O         |                 O                  |
| Default Parameter Values |        O         | <span style="color: red;">X</span> |

#### Shorthand Syntax

Swift 의 Closures 는 Type Inference(Parameters, Return Type)와 Shorthand Argument Names,
Trailing Closures 를 사용해 코드를 간략하게 바꿀 수 있다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```

메서드 `sorted(by:)`에 전달할 함수를 기존의 Function Syntax 를 사용하면 다음과 같이 정의할 수 있었다.

```swift
func forward(_ s1: String, _ s2: String) -> Bool {
    return s1 < s2
}

let ascendingOrder = names.sorted(by: forward(_:_:))
```

이 함수를 Closure Syntax 를 사용해 바꿔보자.

```swift
{ (s1: String, s2: String) -> Bool in
    return s1 < s2
}
```

`sorted(by:)`메서드에 전달할 arguments 를 inline 으로 작성해보자.

```swift
let ascendingOrder = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 < s2 })
```

<br>

Type Inference 를 사용해 Parameter Types 와 Return Types 를 생략하고, 함수와 마찬가지로 Body 부분이 Single-line
이므로 Return keyword 를 생략해보자.

```swift
let ascendingOrder = names.sorted(by: { s1, s2 in s1 < s2 })
```

Swift 는 여기에 Shorthand Argument Names 를 사용해 더욱 축약시킬 수 있다.

```swift
let ascendingOrder = names.sorted(by: { $0 < $1 })
```

추가로 2개의 Arguments 와 그들 사이의 Operator 만 존재하는 경우 `Operator Methods`만 남긴 채 모두 생략하는 것도 가능하다.

```swift
let ascendingOrder = names.sorted(by: <)
```

### Trailing Closures

#### Single Trailing Closures

마지막 Closures 를 메서드의 `( )` 밖으로 분리시킬 수 있고 이를 Trailing Closures 라 한다. 위 Closures 를 모두 
Trailing Closures 로 바꾸면 다음과 같이 작성할 수 있다.

```swift
let ascendingOrder = names.sorted { (s1: String, s2: String) -> Bool in return s1 < s2 }
let ascendingOrder = names.sorted { s1, s2 in s1 < s2 }
let ascendingOrder = names.sorted { $0 < $1 }
```

<span style="color: red;">단, `Operator Methods`만 단독으로 남은 경우 Trailing Closures 로 분리시킬 수 없다</span>.

```swift
let ascendingOrder = names.sorted { < }   // error: unary operator cannot be separated from its operand
```

#### Multiple Trailing Closures

만약 함수가 여러 개의 *Trailing Closures* 를 가질 경우, `첫 번째 Trailing Closure`의 `argument labels`는 생략될 수 있다.
<span style="color: red;">그 외 나머지 *Trailing Closures* 는 *argument labels* 을 지정</span>해야한다.

```swift
func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
    if let picture = download("photo.jpg", from: server) {
        completion(picture)
    } else {
        onFailure()
    }
}
```

`loadPicture(from:completion:onFailure:)` 함수는 completion, onFailure 라는 2개의 Closures 를 가지고 있다.  
둘 다 Trailing Closures 로 분리시킬 경우, <span style="color: orange;">첫 번째 Trailing Closures 는 completion 
이 되므로 Argument Labels 를 생략할 수 있다.</span> 반면, 두 번째 Trailing Closures 에 해당하는 onFailure 는 두 번째 Trailing Closures 에 해당하므로
Argument Labels 를 명시해야한다.

```swift
loadPicture(from: someServer) { picture in
    someView.currentPicture = picture
} onFailure: {
    print("Couldn't download the next picture.")
}
```

> 위 함수 예제는 결과에 따른 성공/실패라는 2개의 completion handlers 만 가지고 있으며 이를 Trailing Closures 로 호출하고있다.
> 만약 completion handlers 가 여러 개 중첩된다면 어떻게 될까? 이것들을 모두 Trailing Closures 로 분리시키면 오히려 코드를 읽기
> 어려워 질 것이다. 이런 경우 [Concurrency - Asynchronous Functions] 를 사용해 대체하도록 한다.

### Capturing Values

Closures 는 정의될 때 context 에 값을 Capturing 할 수 있으며, 캡쳐할 때는 물론이고 더 이상 필요하지 않아 제거할 때 역시 모든 메모리
관리를 알아서 처리한다.

### Reference Types

Closures 는 Functions 와 마찬가지로 Reference Types 다. 즉, Closures 를 다른 변수 또는 상수에 복사하면 
Reference Types 이므로 Properties 들의 Pointer 가 복사되므로 캡쳐한 값 역시 공유하게된다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}

let incrementByTen = makeIncrementer(forIncrement: 10)
let anotherIncrementByTen = makeIncrementer(forIncrement: 10)
let referToIncrementByTen = incrementByTen
```

```swift
print(incrementByTen())         // 10
print(anotherIncrementByTen())  // 10
print(referToIncrementByTen())  // 20
```

- `anotherIncrementByTen()`은 `incrementByTen()`와 다른 instances 이므로 캡쳐한 변수 `runningTotal`을 
  각자의 scope 에 저장한다.
- `referToIncrementByTen()`은 할당될 때 `incrementByTen()`의 Pointer 를 복사하므로 캡쳐한 변수 `runningTotal`를 공유한다.

### Escaping Closures

Arguments 로 전달되는 Closures 는 `Trigger 시점에 따라 두 가지로 구분`할 수 있다.

1. 함수가 종료되기 전 함수 context 내에서 호출.
2. 함수가 종료된 후 함수 context 밖에서 호출.

Swift 는 context 내부의 무언가를 escaping 하는 것이 disable 상태이므로 이를 위해서는 `@escaping` keyword 를 명시해야한다.

#### Store in a Variable

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

Closures 를 escaping 시키는 가장 쉬운 방법은 함수 `context 외부 변수에 저장`하는 것이다.

#### Escaping Closures in Classes

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}
```

Non-escaping Closures 를 하나 더 추가하고 이를 이용해 Classes 를 하나 만들어보자.

```swift
class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}
```

```swift
let instance = SomeClass()
instance.doSomething()      // `someFunctionWithNonescapingClosure` is called in `doSomething` function's body
print(instance.x)   // 200

completionHandlers.first?() // `someFunctionWithEscapingClosure ` is not called in `doSomething()` function's body
print(instance.x)   // 100
```

*Escaping Closures* 가 *Class Instances* 의 `self`를 참조하는 경우 주의해야한다. *self* 를 캡처할 경우 너무도 쉽게
`Strong Reference Cycle`(강한 순환 참조)가 생기기 쉽기 때문이다. `Reference Cycles`에 대해 좀 더 자세한 내용은
[Automatic Reference Counting]을 참고한다.

따라서 *Closures*는 **implicit(암시적)** 으로 *Closure* 내부 변수를 이용해 `외부 변수를 캡처`하지만,
<span style="color: red;">
  **Escaping Closures**는 `self` 키워드 이용해 **explicit(명시적)** 으로 코드를 작성
</span>하도록한다. 이는 개발자에게 순환 참조가 없음을 확인하도록 상기시킨다.

#### Escaping Closures in Structures

```swift
struct SomeStruct {
    var x = 10
    mutating func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }    // error: escaping closure captures mutating 'self' parameter
        someFunctionWithNonescapingClosure { x = 200 }      // Ok
    }
}
```

Structures 는 Classes 와 달리 Value Types 다. 그리고 Swift 에서 Value Types 는 `immutable`을 보장하기 위해 내부에서 
값을 수정할 수 없다. 수정을 위해서는 `mutating`을 명시해야한다.

문제는 ***Escaping Closures 의 Trigger 가 작동되는 시점은 이미 `mutating context` 밖이라는 것***이다. 
따라서 위와 같은 코드는 *compile-time error* 가 발생된다.
<br>

하지만 이것이 Structures 에서 Escaping Closures 를 사용할 수 없음을 의미하는 것은 아니다.  
아래와 같이 `mutating` 키워드가 필요한 코드를 제외하면 `Escaping Closures`는 `Value Types`에서도 사용 가능하다.

```swift
struct SomeStruct {
    func anotherDoSomething() {
        someFunctionWithEscapingClosure { print("It's OK") }
    }
}
```

```swift
var valueTypeInstance = SomeStruct()

valueTypeInstance.anotherDoSomething()
completionHandlers.first?()  // It's OK
```

> Value Types 에서 <span style="color: red;">Escaping Closures 는 mutating 을 일으켜서는 안 된다.</span>

### Autoclosures

#### Closures Evaluated when Called

- Code

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

let returned = customersInLine.remove(at: 0)
print(returned)         // Chris
print(customersInLine)  // ["Alex", "Ewa", "Barry", "Daniella"]
```

line 내에 작성된 코드는 코드를 읽은 즉시 평가(evaluated)된다.
<br>

- Closures

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
let customerProvider = { customersInLine.remove(at: 0) }

print(customersInLine)  // ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

customerProvider()
print(customersInLine)  // ["Alex", "Ewa", "Barry", "Daniella"]
```

`{ }` 블럭으로 감싸 Closures 로 만들면 코드를 읽은 시점이 아니라 Closures 의 Trigger 가 작동된 시점에 평가된다.

#### Autoclosure Type Parameters

위에서 본 것처럼 `{ }` 블럭으로 감싸 Closures 로 만들면 평가를 지연시킬 수 있기 때문에 Closures 를 Parameters 로 전달하는 것이 
가능하다.

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}

serve(customer: { customersInLine.remove(at: 0) })  // Now serving Chris!
```

함수를 정의할 때 Parameters 에 `@autoclosure` keyword 를 사용하면 `{ }` 블럭으로 감싸는 Closure Wrapping 을 자동으로
처리할 수 있다.

```swift
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}

serve(customer: customersInLine.remove(at: 0))      // Now serving Chris!
```

> 단, <span style="color: red;">Autoclosures 의 남용은 코드를 이해하기 어렵게 만든다</span>.

#### Autoclosures with Escaping Closures

`@autoclosure` 와 `@escaping`을 함께 사용할 수 있다.

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var customerProviders: [() -> String] = []

func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}

collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))

print("Collected \(customerProviders.count) closures.")
print("customerProviders: \(customerProviders)")

for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}
```

```console
Collected 2 closures.
[(Function), (Function)]
Now serving Chris!
Now serving Alex!
```

---

## 6. Enumerations 👩‍💻

### Syntax

```swift
enum SomeEnumeration {
    case one
    case two
    case three
}
```

```swift
enum SomeEnumeration {
    case one, two, three
}
```

- Enumeration 은 새 `Type`을 만드는 것이므로 **대문자로 시작**한다.
- `Singleton`을 기반으로 하므로 **단수형**을 사용한다.

### Iterating

`CaseIterable` protocol 을 채택하면 Collection 을 생성해 순환시킬 수 있다.

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}

for beverage in Beverage.allCases {
    print(beverage)
}
```

### Associated Values

Enumerations 의 cases 가 ***자기 자신의 값 외에 다른 값을 가질 수 있는 방법***으로 `Associated Values`와 `Raw Values`가 있다.

#### Syntax

Enumeration 의 cases 가 값이 아닌 `Type 을 저장`하도록 할 수 있다.
이렇게 하면 <span style="color: red;">서로 다른 Types 의 값을 하나의 Enumeration 에 저장</span>할 수 있다.

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

위에서는 `Beverage` Type 이 cases 로 *coffee, tea, juice* 라는 값을 가졌다.  
반면 `Barcode` Type 은 cases 로 `upc(Int, Int, Int, Int)` 또는 `qrCode(String)` 라는 Type 을 갖는다.
<br>

따라서 Beverage 는 다음과 같이 case 자체를 값으로 정의할 수 있지만

```swift
var myBeverage: Beverage
myBeverage = .coffee
```

Beverage 는 다음과 같이 해당 Types 에 해당하는 값의 instance 를 생성해야한다.

```swift
var productBarcode: Barcode
productBarcode = .upc(8, 85909, 51226, 3)
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
```

#### Switch Statements with Associated Values

Associated Vales 가 정의하는 Types 의 실제 instance values 를 Switch 에서 사용하기 위해 다음과 같이 `let` 또는 `var`를
사용할 수 있다.

```swift
func printBarcode (_ productBarcode: Barcode) {
    switch productBarcode {
    case .upc(let numberSystem, let manufacturer, let product, let check):
        print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
    case .qrCode(let productCode):
        print("QR code: \(productCode).")
    }
}
```

만약 모든 값이 필요할 경우 Types 앞에 `let` 또는 `var` keyword 를 작성하는 것으로 대신할 수 있다.

```swift
func printBarcode (_ productBarcode: Barcode) {
    switch productBarcode {
    case let .upc(numberSystem, manufacturer, product, check):
        print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
    case let .qrCode(productCode):
        print("QR code: \(productCode).")
    }
}
```

### Raw Values

#### Syntax

Enumerations 를 정의할 때 Primitive Types 를 채택하면 `RawRepresentable`에 의해 각 cases 가 다른 값을 `Raw Values`로 
갖는다.

```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}
```

```swift
enum SomeEnumeration: Int {
    case one = 1
    case two = 2
    case three = 3
}

print(SomeEnumeration.one)          // One
print(SomeEnumeration.one.rawValue) // 1
```

```swift
enum SomeEnumeration: String {
    case one = "하나"
    case two = "둘"
    case three = "셋"
}

print(SomeEnumeration.one)          // One
print(SomeEnumeration.one.rawValue) // 하나
```

- Raw Values 는 `String`, `Character`, `Integer`, `Floating-Point Number` Types 를 가질 수 있다.
- Raw Values 는 `Unique` 해야한다.

> Associated Values 와 다른 점은 Associated Values 는 cases 가 다른 값을 가질 수 있도록 함은 물론이고, 2가지 이상의
> Types 를 저장하는 것이 가능하지만 Raw Values 는 cases 가 다른 값을 가질 수 있도록 할 수는 있지만 하나의 Types 만 가질 수 있다.

#### Implicitly Assigned Raw Values

- Integer

```swift
enum Planet: Int {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

print(Planet.mercury.rawValue)  // 0
print(Planet.venus.rawValue)    // 1
print(Planet.neptune.rawValue)  // 7
```

```swift
enum Planet: Int {
    case mercury = 10, venus = 20, earth, mars, jupiter, saturn, uranus, neptune
}

print(Planet.mercury.rawValue)  // 10
print(Planet.venus.rawValue)    // 20
print(Planet.neptune.rawValue)  // 26
```
<br>

- String

```swift
enum CompassPoint: String {
    case east, west, south, north
}

print(CompassPoint.east)            // east
print(CompassPoint.east.rawValue)   // east
```

```swift
print(type(of: CompassPoint.east))          // CompassPoint
print(type(of: CompassPoint.east.rawValue)) // String
```

#### Initializing from a Raw Value

- With specific cases

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

let possiblePlanet = Planet.uranus
print(possiblePlanet)   // uranus
```

- With Raw Values

```swift
enum Planet: Int {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}

let possiblePlanet = Planet(rawValue: 7)
print(possiblePlanet as Any)    // Optional(__lldb_expr_18.Planet.neptune)

let impossiblePlanet = Planet(rawValue: 8)
print(impossiblePlanet as Any)  // nil
```

### Recursive Enumerations

*Enumeration* 의 *case* 가 다시 *자기 자신을 Associated Values 로 가질 때* 이를 `Recursive Enumerations`라 하며,
반드시 `indirect` 키워드를 명시해야한다.

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

위 *Enumeration* `ArithmeticExpression.Type`은 다음 3 가지의 `arithmetic expressions`(산술 표현식)을
저장할 수 있다.

- a plain number
- the addition of two expressions
- the multiplication of two expressions

<br>

`(5 + 4) * 2`를 *ArithmeticExpression.Type* 를 이용해 선언해보자. `데이터가 중첩(nested)`되므로,
`Enumeration 역시 중첩(nested)`이 가능해야한다.

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

<br>

**`Recursive Structure`를 가진 데이터를 다루는 가장 직관적인 방법은 `Recursive Function`을 이용하는 것**이다.

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value): return value
    case let .addition(left, right): return evaluate(left) + evaluate(right)
    case let .multiplication(left, right): return evaluate(left) * evaluate(right)
    }
}

print(evaluate(five))       // 5
print(evaluate(four))       // 4
print(evaluate(sum))        // 9
print(evaluate(product))    // 18
```

---

## 7. Structures and Classes 👩‍💻

### Syntax

#### Definition

```swift
struct SomeStructure {
    // structure definition goes here
}
class SomeClass {
    // class definition goes here
}
```

#### Instances

```swift
let someStructure = SomeStructure()
let someClass = SomeClass()
```

### Characteristic

일반적으로 프로그래밍 언어에서 `Class 하나에 파일 하나`가 필요하다.
하지만 Swift 는 `파일 하나에 여러 개의 Classes 와 Structures 를 정의`할 수 있으며, 외부 인터페이스는 다른 *Class* 나
*Structure* 가 사용할 수 있도록 자동으로 제공된다.

이는 전통적으로 프로그래밍 언어에서 `Class`의 `instance`는 `Object`인 반면, *Swift* 의 `Structures`와
`Classes`는 다른 언어와 비교해 `Functionality`에 가깝다.

#### Commonalities Between Structures and Classes

- Define **properties** : 값을 저장
- Define **methods** : 기능을 제공
- Define **subscripts** : `Subscript Syntax`를 이용해 값에 접근
- Define **initializers** : 초기 상태를 설정
- Be **extended** : 기본 구현 이상으로 확장
- Conform to **protocols** : 특정 종류의 표준 기능을 제공

#### Class Only Features

- **inheritance** : 다른 *Class*의 특성을 *inherit*
  (*Structure* 와 *Protocol* 은 다른 *Protocol* 을 *adopt* 하는 것만 가능하다.)
- *Runtime* 때 *class instance* 의 **타입을 해석(interpret)**하고, **type casting** 이 가능하다.
- **deinitializers** : *class instance* 에 할당된 *자원을 해제*
- **Reference counting** : *class instance* 에 *참조를 허용*
  (*Structure* 는 *Value Types* 로 항상 *Copy* 되므로, *Reference counting* 을 사용하지 않는다.)

> `Class`가 제공하는 추가 기능은 복잡성을 증가시킨다.
> 따라서 *general guideline* 에 따르면, *Class* 를 사용하는 것이 꼭 필요하거나 더 적합한 경우가 아니면
> 일반적으로 추론하기 쉬운 `Structure`를 선호해야한다고 말한다. 이는 우리가 만드는 대부분의 *Custom Data Types* 는
> *Structure* 또는 *Enumeration* 으로 되어야 함을 의미한다.

#### Choosing Between Structures and Classes

[Choosing Between Structures and Classes] 를 참고하도록 한다.

1. 기본적으로 *Structure* 를 써라
2. Objective-C와 상호 운용이 필요하면 *Class* 를 써라
3. 앱 전체에서 데이터의 *identity* 를 제어해야한다면 *Class* 를 써라  
   (i.e. file handles, network connections, *CBCenterManager 와 같은 shared hardware intermediaries*)
4. 공유 *implementation(구현체)* 를 적용하기 위해 *Structure* 와 *Protocol* 을 써라  
   (Inheritance 없이도 **Structure** 와 **Protocol** 의 Adopt Protocol 만으로도 충분히 계층 구현이 가능하다.
   만약 `Class 에서만 유효해야하는 상속`을 구현해야할 때, ***Class Inheritance*** 대신
   [Class-Only Protocols] 를 사용할 수 있다.)

### Structures and Enumerations Are Value Types

> Swift 의 모든 기본 타입들, **integers**, **floating-point Numbers**, **Booleans**, **strings**,
> **arrays**, **dictionaries** 는 모두 `Value Types`으로 `Structures 로 구현`되어있다.

> `Standard Library`에 의해 정의된 **Array**, **Dictionary** 그리고 **String** 과 같은 `Collections` 역시
> **Structures** 로 구현되어 있으므로 `Value Types`다.
>
> 하지만 다른 **Value Types** 와 다르게 `performance cost of copying`을 줄이기 위해 `optimiaztion`을 사용한다.
> 따라서, **Value Types** 가 즉시 **copy** 를 하는 것과 다르게 **copies** 에 수정이 발생되기 전에는 `Reference Types`
> 처럼 `original instance`와 `copies`가 **메모리를 공유**한다.
>
> 이후 **copies** 중 하나에 수정이 발생하면, 수정이 되기 직전에 실제 `copy`가 이루어진다.
> 즉, `copies`에 수정이 발생되기 이전에는 `Reference Types`처럼 작동하고, 수정이 발생되는 순간 `Value Types`처럼 작동하기
> 때문에 코드상으로는 즉시 `copy`가 이뤄지는 것처럼 보인다.

[Standard Library - Array]


> 반면, `Foundation`에 의해 정의된 **NSArray**, **NSDictionary** 그리고 **NSString** 과 같은
> `Classes Bridged to Swift Standard Library Value Types`는 **Classes** 로 구현되어 있으므로
> `Reference Types`다.

[Foundation - NSArray], [Classes Bridged to Swift Standard Library Value Types]

### Classes Are Reference Types

#### Identity in Value Types

```swift
// Equal to(==)
print(5 == 5)       // true
print(5 == 7)       // false

// Not equal to(!=)
print(5 != 7)       // true
```

#### Identity in Reference Types

`Reference Types`를 위한 `Identity Operators`는 `==`, `!=`가 아닌 `===`, `!==`를 사용한다.

```swift
let jamie = Person()
let student = jamie

// Equal to(===)
print(jamie === student)    // true
print(jamie !== student)    // false
```

#### Pointers

*C*, *C++*, *Objective-C* 같은 언어는 메모리 주소를 참조하기 위해 `pointer`를 사용한다.  
이것은 Swift 에서 `Reference Types`의 `instance`를 참조하기 위한 상수 또는 변수 역시 이와 유사하다.
하지만, *Swift* 가 가리키는 주소값은 *C* 언어에서의 *pointer* 와 달리 메모리 주소를 가리키는`direct pointer`가
아니며, *reference* 를 만들기 위해 `asterisk(*)`를 필요로 하지 않는다.

Swift 에서 *references*는 다른 *constants* 또는 *variables*를 정의하듯 사용하면 된다.

만약, `pointer`를 직접적으로 다뤄야 하는 경우를 위해 `Standard Library`는 `pointer types`와 `buffer types`를
제공한다. [Manual Memory Management]

---

## 8. Properties 👩‍💻

### Stored Properties

#### Syntax

*Class*, *Structure*, *Enumeration*의 *instance* 일부로써 `constant values` 또는 `variable values`를
저장한다.

*FixedLengthRange* instance 는 1개의 variable *firstValue* 와 1개의 constant *length* 를 가지고 있다.

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
```

#### Stored Properties of Constant Structure Instances

만약 *Structure* 의 instance 를 생성해 `let` 키워드에 할당하면, *instance* 자체가 *constant* 가 되므로
*properties*가 *variable* 이더라도 수정이 불가능하다.

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
rangeOfFourItems.firstValue = 3 // Cannot assign to property: 'rangeOfFourItems' is a 'let' constant
```

<br>

그러나 이것은 `Structures`가 `Value Types`여서 발생하는 현상으로, `Reference Types`인 `Classes`는
*instance* 를 `let` 키워드를 이용해 *constant* 로 선언해도, *properties* 가 *variable* 이면 여전히 수정 가능하다.

```swift
class FixedVolumeRange {
    var firstValue: Int
    let volume: Int

    init(firstValue: Int, volume: Int) {
        self.firstValue = firstValue
        self.volume = volume
    }
}
```

```swift
let rangeOfFiveVolumes = FixedVolumeRange(firstValue: 0, volume: 5)
print("rangeOfFiveVolumes(firstValue: \(rangeOfFiveVolumes.firstValue), volume: \(rangeOfFiveVolumes.volume))")

rangeOfFiveVolumes.firstValue = 1
print("rangeOfFiveVolumes(firstValue: \(rangeOfFiveVolumes.firstValue), volume: \(rangeOfFiveVolumes.volume))")
```

```console
rangeOfFiveVolumes(firstValue: 0, volume: 5)
rangeOfFiveVolumes(firstValue: 1, volume: 5)
```

#### Lazy Stored Properties

*Property* 선언 앞에 `lazy` *modifier* 붙여 만들며, 반드시 `var` 키워드와 함께 사용해야한다. *constant* 는
*initialization* 이 종료되기 전에 반드시 값을 가져야 하기 때문이다(= 선언과 동시에 값을 저장해야한다).

```swift
struct SomeStructure {
    lazy var someProperty = {
        return // property definition goes here
    }()

    lazy var anotherProperty = SomeClass()  // or SomeStructure()
}
```

*Lazy Stored Properties* 는 다음 경우 유용하다

- 초기값이 외부 요인에 의존하는 경우
- 필요할 때까지 수행하면 안 되는 경우
- 초기값을 저장하는데 비용이 많이 드는 경우
- 초기값이 필요하지 않은 경우

#### Stored Properties and Instance Variables

*Objective-C* 는 *Class instance* 의 *Properties* 로 *Values* 와 *References* 를 저장하는 두 가지
방법을 제공했다. 또한 *Properties* 를 `Backing Store(백업 저장소)`로 사용할 수 있었다.

하지만 Swift 는 `Backing Store`에 *직접 접속할 수 없도록 하고*, `Properties`를 *저장하는 방식을 통합*했다.
따라서 선언하는 방법에 따른 혼동을 피하고 명확한 문장으로 단순화되었으며, 이는 `Properties`의 `이름`, `타입`,
`메모리 관리 특성`을 포함하는 모든 정보를 유형을 한 곳에서 정의한다.

### Computed Properties

#### Syntax

*Class*, *Structure*, *Enumeration* 의 일부로써 `값을 저장하는 대신 계산`하며, `getter`와
`optional setter`를 제공한다. *Lazy Stored Properties* 와 마찬가지로 반드시 `var` 키워드와 함께 사용해야하며,
*Lazy Stored Properties* 와 다르게 반드시 데이터 타입을 명시(*explicit type*)해야한다.

또한, 값을 할당(저장)하는 것이 아니므로, `=`를 사용하지 않고, *explicit type* 다음 바로 *getter* 와 *setter* 를
갖는 `Closure`를 작성한다. 또한 *setter* 의 *parameter* 는 반드시 명시된 *explicit type* 과 동일한 `SomeType`
이어야하므로, 별도의 `type`을 명시할 수 없다.

```swift
struct SomeStructure {
    var someProperty: SomeType {
        get {
            return // property definition for getter goes here
        }
        set (parameterName) {
            // property definition for setter goes here
        }
    }
}
```

> 단!! `Computed Properties`는 절대 <span style="color: red;">자기 자신을 대상</span>으로 해서는 안 된다.  
> 강한 참조가 생성되기 때문이다.
>
> ![Infinite Recursion](/assets/images/posts/2022-11-22-properties/do-not-use-computed-properties-for-self.png)

#### Shorthand Getter/Setter Declaration

- getter : 다른 *Closures* 와 마찬가지로 *single expression* 으로 작성되면 `return` 키워드를 생략할 수 있다.
- setter : *Computed Properties* 의 *setter* 의 *Parameters* 를 생략하면 기본값으로 `newValue`와
  `oldValue`를 사용한다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set (newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
```

따라서 위 코드는 다음과 같이 바꿀 수 있다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                    y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

#### Read-Only Computed Properties

*setter* 가 필요 없고 *getter* 만 필요한 경우 이를 `Read-Only Computed Properties`라고 하며, `get` 키워드와
중괄호`{ }`를 생략할 수 있다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        Point(x: origin.x + (size.width / 2),
                y: origin.y + (size.height / 2))
    }
}
```

### Property Observers

#### Syntax

`Property Observers`는 *Property* 의 값에 `set`의 변화를 관찰하고 실행된다. 새 값이 기존의 값과 같더라도 *set* 이
발생하는 것 자체로 *trigger* 되기 때문에 호출된다.

*Property* 에 `Observers`를 붙일 수 있는 곳은 다음과 같다.

- *Stored Properties*
- 상속된 *Stored Properties*
- 상속된 *Computed Properties*

> 상속된 *Properties* 에 Property Observers 를 붙일 때는 `overriding` 을 이용한다.

> 상속되지 않은 **Computed Properties** 는 **Property Observers** 를 사용할 수 없으므로, 대안으로
> **Computed Properties** 의 **setter** 를 사용해 일정 부분 유사하게 구현하는 방법이 있다.

```swift
class SomeClass {
    var someProperty: Type = defaultValue {
        willSet {
            // observer definition for willSet goes here
        }
        didSet {
            // observer definition for didSet goes here
        }
    }
}
```

> **Lazy Stored Properties** 또는 **Computed Properties** 와 마찬가지로 반드시 `var` 키워드와 함께 사용한다.
> 또한 초기값을 반드시 정의해야하며, 로직은 **Trailing Closures** 를 이용해 정의한다.

#### willSet & didSet

- willSet : 값이 저장되기 직전에 호출되며, *Parameters* 를 생략하면 기본값으로 `newValue`를 사용한다. willSet 에서
  주의해야 할 것은 값을 저장하기 직전의 행동을 정의할 수 있을 뿐 <span style="color: red;">값을 저장하는
  행위 자체를 제어하지는 못한다!!
- didSet : 값이 저장된 직후에 호출되며, *Parameters* 를 생략하면 기본값으로 `oldValue`를 사용한다.

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            if newValue > totalSteps {
                print("About to set totalSteps to \(newValue)")
            }
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps, totalStep is now \(totalSteps)")
            } else {
                print("Please check your step data")
                totalSteps = oldValue
            }
        }
    }
}
```

#### Initializer of subclasses

> <span style="color: red;">
>   Property Observers 의 willSet, didSet 은 Initializers 에 의해 Instance 가 생성될 때는 작동하지 않는다.
> </span>
> Initializers 에 의해 Instance 가 생성되고 난 이후에 Observers 가 작동한다.
>
> 따라서 다음과 같은 과정을 거치게 된다.
>
> 1. Subclass 가 자신의 Properties 의 속성을 모두 설정한 후 Superclass 의 Initializers 를 호출한다.
> 2. Superclass 가 자신의 Designated Initializers 를 이용해 Initialization 을 수행한다. 이때 Superclass 자신이 갖고 있는
     >    Observers 는 작동하지 않는다. 이로써 Phase 1 이 종료된다.
> 3. 이제 `Phase 2`가 진행되고 Subclass 의 Initializers 가  Superclass 의 Properties 를 수정한다. 이때 해당 Properties
     >    에 Observers 가 붙어있다면 **`willSet`, `didSet`이 작동**한다.

### Property Wrappers

#### Syntax

`Property Wrappers`는 *Properties* 를 정의하는 코드와 저장되는 방법을 관리하는 코드 사이에 분리된 `layer(계층)`을
추가한다.

예를 들어 `Thread-Safe` 검사를 제공하는 *Properties*, 또는 기본 데이터를 `Database 에 저장`하는 *Properties* 가
있는 경우 해당 코드를 모든 *Properties* 에 작성해야한다. 이때 `Property Wrappers`를 사용하면 코드를 한 번만 작성하고
재사용 할 수 있다.

```swift
@propertyWrapper
struct SomeStructure {
    private var someProperty: SomeType
    var wrappedValue: SomeType {
        get { someProperty }
        set { someProperty = newValue }
    }
}
```

> - `Class`, `Structure`, `Enumeration`를 이용해 정의하며 3가지 부분으로 나뉜다
>
> - `@propertyWrapper` Annotation 을 선언
> - `private var` 변수 선언
> - `wrappedValue` 라는 이름을 갖는 [Computed Property](./properties.html#h-1-computed-properties)를 정의

```swift
@propertyWrapper
struct OneToNine {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set { number = max(min(newValue, 9), 1) }
    }
}
```

```swift
struct MultiplicationTable {
    @OneToNine var left: Int
    @OneToNine var right: Int
}
```

위 코드를 풀어서 `@propertyWrppaer` 없이 직접 구현하면 다음과 같이 구현할 수 있다.

```swift
struct OneToNine {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set { number = max(min(newValue, 9), 1) }
    }
}
```

```swift
// Explicit Wrapping
struct MultiplicationTable {
    private var _left = OneToNine()
    private var _right = OneToNine()
    var left: Int {
        get { _left.wrappedValue }
        set { _left.wrappedValue = newValue }
    }
    var right: Int {
        get { _right.wrappedValue }
        set { _right.wrappedValue = newValue }
    }
}
```

참고로 `Observers`와 `Wrappers`는 동시에 사용하지 못하는 것으로 보인다.

[Can I implement a property observer in a property wrapper structure?]

#### Setting Initial Values for Wrapped Properties

위와 같이 *Property Wrappers* 의 초기값을 하드코딩하면 유연성이 떨어진다.
*Property Wrappers* 는 `Structure`에 정의하므로 `Initializer`를 사용할 수 있고, 이는 *Property Wrappers* 를
더욱 유연하게 만든다.

```swift
@propertyWrapper
struct LengthOfSide {
    private var maximum: Int
    private var length: Int

    var wrappedValue: Int {
        get { length }
        set { length = min(newValue, maximum) }
    }

    init() {
        maximum = 10
        length = 0
    }

    init(wrappedValue: Int) {
        maximum = 10
        length = min(wrappedValue, maximum)
    }

    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        length = min(wrappedValue, maximum)
    }
}
```

*Property Wrappers* 의 Initializers 를 사용하는 방법은 두 가지가 있다.

__1 ) Property Wrappers 의 Initializers 를 사용해 초기화__

```swift
struct NarrowRectangle {
    @LengthOfSide(wrappedValue: 15, maximum: 20) var height: Int
    @LengthOfSide(wrappedValue: 3, maximum: 5) var width: Int
}
```

__2 ) Properties 의 Initial Values 를 사용해 초기화__

```swift
struct HugeRectangle {
    @LengthOfSide(maximum: 20) var height: Int = 20
    @LengthOfSide(maximum: 20) var width: Int = 25
}
```

#### Projecting a Value From a Property Wrapper

*Property Wrapper* 는 `Projected Value` 라는 숨겨진 값을 하나 추가할 수 있다. 다음은 `LengthOfSide`라는
*Property Wrapper* 가 유효성 검사에 의해 값이 보정되었는지를 *Projected Value* 라는 숨겨진 값에 저장하도록 할
것이다.

```swift
@propertyWrapper
struct LengthOfSide {
    private var maximum: Int
    private var length: Int
    private(set) var projectedValue: Bool = false

    var wrappedValue: Int {
        get { length }
        set {
            if newValue > maximum {
                length = maximum
                projectedValue = true
            } else {
                length = newValue
                projectedValue = false
            }
        }
    }

    init() {
        maximum = 10
        length = 0
    }

    init(wrappedValue: Int) {
        maximum = 10
        length = min(wrappedValue, maximum)
    }

    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        length = min(wrappedValue, maximum)
    }
}
```

이 숨겨진 값은 겉으로 노출되지 않는다. 이 값을 보려면 `$` 를 붙여주면 숨겨진 값에 접근할 수 있다.

```swift
struct HugeRectangle {
    @LengthOfSide(wrappedValue: 20, maximum: 20) var height: Int
    @LengthOfSide(maximum: 20) var width: Int = 25
}

var hugeRectangle = HugeRectangle()

print(hugeRectangle.height)     // 20
print(hugeRectangle.$height)    // false

hugeRectangle.width = 30
print(hugeRectangle.width)      // 20
print(hugeRectangle.$width)     // true
```

> `Projecting`은 **Initializers** 에서는 작동하지 않는다.

### Global and Local Variables

#### Definition

- Global Variables: *Functions*, *Methods*, *Closures*, *Type* Context 외부에 정의된 변수를 의미
- Local Variables: *Functions*, *Methods*, *Closures* Context 내부에 정의되 변수를 의미

#### Stored Variables

`Stored Variables`는 `Stored Properties` 처럼 값을 저장하고 검색하는 것을 제공한다.

> *Global Constants* 와 *Global Variables* 는 항상 `lazily`하게 계산된다. 이는 *Lazy Stored Properties* 와
> 유사하다. 단, *Lazy Stored Properties* 와 다른 점은 `lazy` modifier 를 붙일 필요가 없다.
>
> 반면에 *Local Constants* 와 *Local Variables* 는 절대 `lazily`하게 계산되지 않는다.

#### Computed Variables

*Global Variables* 와 *Local Variables* 모두 `Computed`를 사용할 수 있다.

#### Variable Observers

*Global Variables* 와 *Local Variables* 모두 `Observer`를 사용할 수 있다.

#### Variable Wrappers

`Property Wrappers`는 `Local Stored Variables`에만 적용 가능하다.  
*Global Variables* 또는 *Computed Variables* 에는 적용할 수 없다.

### Type Properties

#### Syntax

*C* 나 *Objective-C* 에서 *static constants*, *static variables* 를 정의하기 위해 `Global Static Variables`
를 사용했다. 하지만 Swift 는 불필요하게 전역으로 생성되는 *Global Static Variables* 의 전역 변수 오염 문제를 해결하기
위해 `Type Properties`를 제공한다.

*Type Properties* 는 *Swift Types* 가 정의되는 `{ }` 내부 `context` 범위 내에 정의되며, 그 `Scope` 범위
내에서만 사용 가능하다. *Global Static Variables* 와 마찬가지로 *Properties* 앞에 `static` 키워드를 사용해
정의하며, 단, *Classes* 의 경우 *Computed Properties* 를 *Subclass* 에서 `overriding` 을 허용하려면
*Superclass* 에서 `static` keyword 대신 `class` keyword 를 사용한다.

> `Type Properties`는 정의할 때 반드시 `Initiate Value`를 함께 정의해야한다.

<br>

- Structures

```swift
struct SomeStructure {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 1
    }
}
```

<br>

- Enumerations

```swift
enum SomeEnumeration {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 6
    }
}
```

<br>

- Classes

```swift
class SomeClass {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

> computedTypeProperties 는 `static` keyword 를 사용헸지만 overrideableComputedTypeProperty 는
> `class` keyword 를 사용해 Subclass 에서 overriding 하는 것을 허용했다.

#### Type Properties and Instance Properties

*Type Properties* 는 *Instance Properties* 와 달리 단 하나만 존재하므로, 언제나 전역에서 공유된다. 따라서 단 하나의
값을 앱 전역에서 공유하기 위해 사용한다.

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
        didSet {
            if currentLevel > AudioChannel.thresholdLevel {
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}
```

- thresholdLevel : 오디오가 가질 수 있는 볼륨 최대값을 정의 (상수 10)
- maxInputLevelForAllChannels : *AudioChannel Instance* 가 받은 최대 입력값을 추적(0에서 시작)
- currentLevel : 현재의 오디오 볼륨을 계산을 통해 정의

<br>

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

좌우 채널을 각각 *Instnace* 로 생성한다.

```swift
leftChannel.currentLevel = 7
print(leftChannel.currentLevel)     // 7
print(AudioChannel.maxInputLevelForAllChannels) // 7
```

왼쪽 볼륨을 7로 올리자 왼쪽 채널의 볼륨이 7로, *Type Property* *maxInputLevelForAllChannels* 역시
7로 저장되었다.

```swift
rightChannel.currentLevel = 11
print(rightChannel.currentLevel)    // 10
print(AudioChannel.maxInputLevelForAllChannels) // 10
```

이번엔 오른쪽 볼륨을 11로 올리자 최대 레벨 제한에 의해 10으로 저장되고, 이에 따라 그 다음 *if statement* 에서
*maxInputLevelForAllChannels*가 10으로 저장되었다.

---

## 9. Methods 👩‍💻

### Compare with Objective-C

`Methods`는 *Functions* 중에서 특정 *Type* 과 연관된 *Functions* 를 말한다.

*Classes*, *Structures*, *Enumerations* 모두 *Instance* 의 작동을 위한 `Instance Methods`를 정의하고,
`Encapsulate(캡슐화)` 할 수 있다. 또한 `Type`을 위한 `Type Methods` 역시 정의할 수 있는데, 이것은 *Objective-C* 의
*Class Methods* 와 유사하다.

> **Objective-C** 에서 **Classes** 는 **Methods** 를 정의할 수 있는 유일한 타입인 반면,
> **Swift** 는 **Classes** 뿐만 아니라 **Structures** 와 **Enumerations** 에서도 정의할 수 있도록 유연성을 높였다.

### Instance Methods

*Instance Methods* 는 *Classes*, *Structures*, *Enumerations* 의 *Instance* 에 속해 있는 함수로,
*Instance* 의 *Properties* 에 접근, 수정하거나 *Instance* 의 작동을 위한 기능을 제공한다.

*Instance Methods* 는 그것이 정의된 `context` 내의 다른 모든 *Instance Methods* 와 *Instance Properties* 에 대해
`암시적인 접근 권한`을 갖는다. 그리고 *Instance Methods* 는 *Instance Properties* 와 마찬가지로 *Instance* 없이
독립적으로 호출이 불가능하다.

#### The self Property

*Instance* 는 `self`라고 불리는 `Instance 자기 자신과 동일한 Property`를 암시적으로 갖는다(implicit self property).

#### Mutating of Value Types

> **Structures** 와 **Enumerations** 는 `Value Types`다. 기본적으로 **Value Type** 의 **Properties** 는
> **Instance Methods** 에 의해 수정될 수 없다(immutable).
>
> 수정이 필요할 경우 `mutating` 키워드를 사용해 수정을 허용하도록 명시해야하며, **mutating** 을 하는 방법에는
> **Properties** 를 수정하는 방법과 **new Instance** 를 생성하는 방법이 있다.

<br>

__1 ) Modifying Value Types from Within Instance Methods__

부분적으로 수정할 때는 *Mutating Methods 가 종료될 때 Properties 를 변경*하는 방법을 사용한다.

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}
```

> `mutating` 키워드를 이용해 *Structures* 의 *Properties* 를 수정하는 것은 *Structure Instance* 를
> `var`로 선언한 경우에만 가능하다.  
> [Stored Properties of Constant Structure Instances][Constant Structure Instances]

<br>
__2 ) Assigning to self Within a Mutating Method__

전체를 수정할 때는 *Mutating Methods 가 종료될 때 new Instance 를 할당해 original Instance 를 대체*하는 방법을
사용한다.

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func anotherMoveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

### Type Methods

[Type Property Syntax] 와 마찬가지로 *Methods* 앞에 `static` 키워드를 사용한다.

```swift
struct SomeStructure {
    static func someTypeMethod() {
        // type method implementation goes here
    }
}
```

> **Type Methods** 에서 `self`는 **Instance** 가 아닌 `Type itself`, 즉 `Type 자체`를 가리킨다.
>
> 그리고 *Instance Methods* 와 마찬가지로, `self`를 암시적으로 처리하므로 *Type* 의 *context* 에 정의된
> *Type Properties* 나 *Type Methods* 에 접근하기 위한 `self`를 생략할 수 있다.
>
> 차이점이 있다면 다음과 같다.
> - `Instance Methods`는 `context` 내부에 정의된 `Instance Properties`와 `Instance Methods`에 접근 가능하다.   
    >   또한 Type Methods 접근도 가능한데, `Type 의 full name`을 붙여 접근 가능하다.
> - `Type Methods`는 `context` 내부에 정의된 `Type Properties`와 `Type Methods`에 접근 가능하다.

예제 코드는 [Type Method Examples] 를 참고한다.

---

## 10. Subscripts 👩‍💻

### Syntax

```swift
subscript(index: Int) -> Int {
    get {
        // Return an appropriate subscript value here.
    }
    set(newValue) {
        // Perform a suitable setting action here.
    }
}
```

> **Computed Properties** 와 마찬가지로 `getter`와 `optional setter`를 제공하며, **setter** 의
> **Parameter** 를 생략하고 기본값으로 `newValue`를 사용할 수 있다.  
> 또한 **Computed Properties** 와 마찬가지로 **setter** 의 **Parameter** 는 반드시
> **Return Type 과 동일**해야하므로 **별도의 `Type`을 명시할 수 없으며**,
> **Read-Only Computed Properties**와 마찬가지로 `Read-Only Subscripts`는 `get` 키워드와 중괄호를
> 생략할 수 있다.

### Custom Subscripts Example

다음은 정수의 `n-times-table`을 표시하기 위해 `TimesTable Structure`를 정의한다. *Subscripts* 는
`Read-Only Subsscripts`로 구현되었다.

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        multiplier * index
    }
}
```

```swift
let threeTimesTable = TimesTable(multiplier: 3)
(0...10).forEach { print(threeTimesTable[$0], terminator: "  ") }
```

```console
0  3  6  9  12  15  18  21  24  27  30  
```

### Subscripts in Dictionary

*Subscripts* 는 구현하려는 *Classes*, *Structures*, *Enumerations* 에 적합한 형태로 자유롭게 구현이 가능하다.   
따라서, *Subscripts* 의 정확한 의미는 `context`에 따라 달라진다. 일반적으로 *Subscripts* 는 *Collection*,
*List*, *Sequence*의 `member elements`에 접근하기 위한 용도로 사용되며 Dictionary 가 그 예다.

<br>

- *Subscripts* 를 이용해 값을 조회하기

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
print("The number of legs of ant is \(numberOfLegs["ant"]!).")
// The number of legs of ant is 6.
```

- *Subscripts* 를 이용해 값을 저장하기

```swift
numberOfLegs["bird"] = 2
print(numberOfLegs)  // ["spider": 8, "ant": 6, "cat": 4, "bird": 2]
```

> `Dictionary`의 `key-value`는 모든 **keys 가 values 를 갖지 않는 것**을 모델로 하기 때문에
> `Optional Return Type`을 취하므로 `Optional Subscripts`를 사용한다.

### Subscripts Options

> **Subscripts** 는 **Parameters** 의 타입이나 개수, **Return Type** 을 자유롭게 정의할 수 있다.  
> 심지어 함수와 마찬가지로 [Variadic Parameters] 와
> [Default Parameter Values] 역시 가능하다.
>
> 단, [In-Out Parameters] 는 사용할 수 없다.

<br>

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
```

### Type Subscripts

*Subscripts* 역시 *Properties*, *Methods* 와 마찬가지로 *Instance* 뿐만 아니라 `Type` 자체의
`Subscripts`를 정의할 수 있다.

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
    static subscript(n: Int) -> Planet {
        Planet(rawValue: n)!
    }
}
```

```swift
let earth = Planet(rawValue: 3)!
print(earth)    // earth
```

---

## 11. Inheritance 👩‍💻

### Base Class

다른 *Classes* 를 상속하지 않은 *Class* 를 `Base Class`라 한다.

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise() {
        // do nothing - an arbitrary vehicle doesn't necessarily make a noise
    }
}
```

> `Universal Base Class`를 하나 만들어 모든 **Classes** 가 기본적으로 이것을 상속하도록 하는 일부 언어와 달리
> Swift 는 명시적으로 상속을 하지 않은 **Class** 는 `build`할 때 자동으로 `Base Class`가 된다.

### Subclassing

`Subclassing`은 존재하는 다른 *Class* 를 기반으로 *new Class* 를 생성하는 행위를 말한다.  
기존의 *Class* 를 `Superclass`, *기존의 Class 를 상속해 새로 생성된 Class* 를 `Subclass`라 하며,
*Subclass* 는 새로운 것을 ***추가***하는 것은 물론이고, 기존의 것을 ***수정***할 수 있다.

### Overriding

*Subclass* 는 *Superclass* 의 *Instance Methods*, *Type Methods*, *Instance Properties*,
*Type Properties*, *Subscripts* 를 다시 구현할 수 있다. 이것을 `Overriding`이라 한다.

*Overriding* 을 위해서 앞에 `override` modifier 를 붙여준다.  
이렇게 하는 것은 재정의를 명확히 하고, 실수로 재정의하는 것을 방지하기 위한 것으로, `override` modifier 없이 재정의하면
Swift 는 이를 확인하고 `compile error`를 발생시킨다.

> `Overriding` 가능한 `characteristics`는 `mutable`한 것으로 제한된다. 예를 들어 `let` 키워드로 선언된
> 경우 `immutable`이기 때문에 <span style="color: red;">**Overriding** 할 수 없다</span>.

```swift
class TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int { multiplier * index }
    func printMultiplier() {
        print(multiplier)
    }
    init(multiplier: Int) {
        self.multiplier = multiplier
    }
}

class ArithmeticSequenceTable: TimesTable {
    var superMultiplier: Int { super.multiplier }
    override func printMultiplier() {
        super.printMultiplier()
    }
    override subscript(index: Int) -> Int { super[index] + 1 }
}
```

#### Overriding Property Getters and Setters

```swift
class Car: Vehicle {
    var gear = 1
    override var description: String {
        super.description + " in gear \(gear)"
    }
}
```

#### Overriding Property Observers

```swift
class AutomaticCar: Car {
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

#### Overriding Stored Properties

**Stored Properties** 는 `Overriding 하는 것이 불가능`하다. 이를 Overriding 하려 하면 `compile error`를
발생시킨다. *Subclass* 에서 Stored Properties 를 수정하기 위해서는
[Initialization Phase 2의 수정할 기회](#h-two-phase-initialization-in-classes) 를 이용한다.

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
    override init() {
        super.init()
        tag = "Bicycle"
    }
}

class Tandem: Bicycle {
    convenience init(tag: String) {
        self.init()
        self.tag = tag
    }
}
```

```swift
var vehicle = Vehicle()
var bicycle = Bicycle()
var tandem = Tandem(tag: "Tandem")

print(vehicle.tag)  // Vehicle
print(bicycle.tag)  // Bicycle
print(tandem.tag)   // Tandem
```

### Preventing Overrides

`Overriding`을 막기 위해 `final` modifier 를 추가할 수 있다. 만약 *Subclass* 에서 재정의 할 경우
Swift 는 이를 확인하고 `compile error`를 발생시킨다.

```swift
class AutomaticCar: Car {
    override final var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

```swift
class ElectricMotorCar: AutomaticCar {
    override var currentSpeed: Double { // error: Property overrides a 'final' property
        
    }
}
```

*AutomaticCar* 의 *currentSpeed* 를 *Overriding* 하면서 `final` modifier 를 붙여주었기 때문에
*AutomaticCar* 를 상속한 *ElectricMotorCar* 는 이것을 재정의 할 수 없다.

> **Properties, Methods, Subscripts** 가 아닌 ***Classes 정의에 `final` modifier 를 작성***할 경우,
> 이 **Class** 를 `Subclassing` 하려는 모든 시도는 **compile-time error** 가 발생한다.

---

## 12. Initialization 👩‍💻

### Initialization

`Initialization`은 *Classes*, *Structures*, *Enumerations* 를 사용하기 위해 *Instance* 를 준비하는 과정을 말한다.
이것은 *Stored Properties* 를 위한 ***초기값을 설정하거나 new Instance 가 생성되기 전에 수행해야 하는 것***들을 정리한다.

`Initializers`를 구현해야하며, *Objective-C* 와 달리 *Swift* 의 *Initializers* 는 값을 반환하지 않는다.
초기화의 주요 역할은 `사용하기 전에 Instance가 올바르게 초기화되는 것을 보장`하는 것이다.

그리고 세 *Types* 중 `Classes`는 `Instance가 해제되기 전에 수행해야할 일`을 구현할 수 있으며,
이를 `Deinitialization`이라 한다.

#### All Stored Properties Must be Set

- *Classes* 와 *Structures* 의 `Stored Properties`는 *Instance* 가 생성되기 전 반드시 `모든 값을 저장`해야한다.
- *Stored Properties* 에 초기값을 설정할 때 사용되는 `Initializers`나 `Default Property Values`는
  `Property Observers 의 호출 없이` 이루어진다.

```swift
struct Celsius {
    var temperature: Double
    init() {
        temperature = 16.0
    }
}
```

#### Default Property Values

*Properties* 가 항상 동일한 초기값을 갖는다면 `Default Property Values`를 사용하는 것이 값을 선언에 더 가깝게 연결하고,
더 짧고 명확한 코드로 작성이 가능하며, 타입 추론을 허용한다.

또한, *Default Property Values* 를 사용하면, 이후 상속할 때 `Initial Values` 설정하는 것을 더욱 쉽게 만든다.

```swift
struct Celsius {
    var temperature = 16.0
}
```

#### Default Property Values with Closure

상수나 변수에 값을 저장할 때 사용자 정의 로직이나 설정이 필요한 경우가 있을 수 있다.  
Swift 에서는 이를 위해 `Closure`나 `Global Function`를 사용할 수 있는데, 정의함과 동시에 실행시키고 그 값을 반환하도록 해,
이 `return value`를 상수 또는 변수에 저장하는 것이다.

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
        return someValue
    }()
}
```

#### Initialization Parameters

Swift 는 다른 언어와 달리 Parameters 의 **개수**와 **Types** 가 같더라도 `Argument Labels`가 다르면 구별이 가능하기
때문에 다음과 같이 **initializer** 를 `overload` 할 수 있다.

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

#### Optional Property Types

다음과 같은 이유로 인해 *Properties* 가 `Optional Types`가 되어야하는 경우가 있을 수 있다.

- *Initialization* 하는 동안 값을 설정할 수 없어 `nil`을 허용해야하는 경우
- 논리적으로 `nil`을 허용해야하는 경우

`nil`을 허용하기 위해 반드시 `Optional Types`로 정의되어야하며, *Properties* 는 자동으로 `nil`로 초기화된다.

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

#### Assigning Constant Properties During Initialization

*Initialization* 이 종료되기 전까지 어느 시점에서든 `let` 키워드로 선언한 `Constant Properties`에 ***값을 할당할 수 있다***.
주의해야 할 것은 이것이 *Initialization* 이 종료되기 전까지 *여러 번 할당해 수정할 수 있다는 뜻은 아니다*.

> **Initialization** 이 종료되기 전 이라도 한 번 할당된 값은 `immutable` 속성을 갖기 때문에 **수정할 수 없다**.  
> 또한 **Class Instances** 에서 **Initialization** 을 진행하는 동안 **Constant Properties** 를 수정하는 것은 해당
> **Properties** 를 도입한 **Class** 에서만 가능하다. **Subclass** 에서 수정하는 것은 불가능하다.

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
```

### Default Initializers

*Structures* 또는 *Classes* 에 `Default Initializers`가 자동 생성되는 조건은 다음과 같다.

- *모든 Properties* 가 `default value`를 가지고 있다
- 존재하는 `Initializers 가 하나도 없다`

> - **Classes** 의 `Default Initializers`는 항상 `Designated Initializers`가 된다.
> - `Optional Types`는 자동으로 `nil`을 `default value`로 갖는다.

```swift
class ShoppingListItem {
    var name: String?
    var quantity = 1
    var purchased = false
}
var item = ShoppingListItem()
```

Swift 가 자동으로 `Default Initializers`를 생성한다.

### Memberwise Initializers for Structure Types

*Structures* 는 *Classes* 와 달리 `Mmeberwise Initializers`를 추가로 가질 수 있으며 자동 생성되는 조건은 다음과 같다.

- 존재하는 `Initializers 가 하나도 없다`

*Default Initializers* 와 달리 `default value` 를 가지고 있어야 할 <span style="color: red;">***필요가 없다***</span>.  
단지 이 *default value* 의 존재 유무에 따라 모든 *Member Properties* 를 설정하기 위해
`자동 생성되는 'Initializers' 의 경우의 수만 달라질 뿐`이다.

> `Custom Initializers`가 존재하는 경우, 더 이상 `Default Initializers`나 `Memberwise Initializers`에
> 접근할 수 없다.

<br>

- Memberwise Initializers

```swift
struct Size {
    var width: Double, height:Double
}
var square = Size(width: 2.0, height: 2.0)
```

```swift
struct Size {
    var width: Double = 5.0, height:Double
}
var square = Size(height: 5.0)
var rectangle = Size(width: 7.0, height: 3.0)
```

- Default Initializers & Memberwise Initializers

```swift
struct Size {
    var width: Double = 5.0, height:Double = 5.0
}
var square = Size()
var rectangle = Size(width: 7.0)
var anotherRectangle = Size(height: 12.0)
var hugeSquare = Size(width: 100.0, height: 100.0)
```

### Initializer Delegation for Value Types

*Initializers* 는 *Instance* 를 생성할 때 코드가 중복되는 것을 방지하기 위해 다른 *Initializers* 를 호출할 수 있는데,
이것을 `Initializer Delegation`이라 한다.

*Initializer Delegation* 이 작동하는 방식과 *Delegation* 을 허용하는 범위는 *Value Types* 와 *Class Types* 가 다르다.

- Value Types: 상속을 허용하지 않으므로 `자신의 context 내 다른 Initializers`에만 *Delegation* 이 허용된다.
- Class Types: 상속을 허용하므로, *Classes* 는 `상속한 모든 Stored Properties 에 정확한 값이 설정`되도록 하기 위한
  책임이 필요함을 의미한다.

<br>

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}

struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

```swift
let basicRect = Rect()
let originRect = Rect(origin: Point(x: 2.0, y: 2.0), size: Size(width: 5.0, height: 5.0))
let centerRect = Rect(center: Point(x: 4.0, y: 4.0), size: Size(width: 3.0, height: 3.0))

printRect(basicRect)    // The origin is (0.0, 0.0) and its size is (0.0, 0.0)
printRect(originRect)   // The origin is (2.0, 2.0) and its size is (5.0, 5.0)
printRect(centerRect)   // The origin is (2.5, 2.5) and its size is (3.0, 3.0)


func printRect(_ rect: Rect) {
    print("The origin is (\(rect.origin.x), \(rect.origin.y)) and its size is (\(rect.size.width), \(rect.size.height))")
}
```

### Designated Initializers and Convenience Initializers

#### Syntax

`Designated Initializers`는 *Class* 의 `Primary Initializers`로, *Class 의 모든 Properties 를 초기화*하고,
*Superclass* 로 올라가며 적절한 *Initializers* 를 찾아 `Initialization Chaining`을 한다.

*모든 Classes 는 최소한 하나의 Designated Initializers 를 가져야하며*, 경우에 따라 *Superclass* 로부터 하나 또는
그 이상의 `Designated Initializers 를 상속받는 것으로 충족`된다.

- Designated Initializers

```swift
init(parameters) {
    statements
}
```

- Convenience Initializers

init 앞에 `convenience` modifier 를 붙인다

```swift
convenience init(parameters) {
    statements
}
```

#### Initializer Delegation Rule

*Designated Initializers* 와 *Convenience Initializers* 의 관게를 단순화하기 위해 *Initializer Delegation* 에
3가지 규칙을 적용한다.

- 규칙 1. `Designated Initializers`는 `Superclass 의 Designated Initializers 를 호출`해야한다.
- 규칙 2. `Convenience Initializers`는 `context 내 다른 Initializers 를 호출`해야한다.
- 규칙 3. `Convenience Initializers`는 `궁극적으로 Designated Initializers 를 호출`해야한다.

![Initializer Delegation](/assets/images/posts/2022-12-01-initialization/initializerDelegation01_2x.png)

> 위 그림에서
>
> - `Superclass`는 규칙 2와 규칙3을 만족한다. `Base Class`이므로 규칙 1은 적용되지 않는다.
> - `Subclass`는 규칙 2와 규칙3을 만족하고, 규칙 1 역시 만족한다.

<br>

다음 그림은 좀 더 복잡한 `hierarchy` 구조에서 `Initializer Delegation`이 이루어질 때 `Designated Initializers`가
어떻게 `funnel point` 역할을 하는지를 보여준다.

![Designated Initializers Act as Funnel Point](/assets/images/posts/2022-12-01-initialization/initializerDelegation02_2x.png)

### Two-Phase Initialization in Classes

Swift 에서 *Class Initialization* 은 2단계 프로세스를 갖는다.

- Phase 1. 각 `Stored Properties`가 *그것을 정의한 Class 에 의해* `초기값이 할당`된다.
- Phase 2. `Instance 를 생성하기 전` *Stored Properties* 를 추가로 `Customizing 할 기회`가 주어진다.

> **Swift** 의 `Two-Phase Initialization` 프로세스는 **Objective-C** 의 `Initialization`과 유사하다.   
> 하지만 **Objective-C** 는 Phase 1에서 **모든 Properties 에 `0` 또는 `nil`을 할당**하는 반면, **Swift** 는
> `Custom Initial Values`를 설정할 수 있고, **`0` 또는 `nil`이 유효한 기본값이 아닌 경우에 대처**할 수 있는 유연성을 갖는다.

#### Safety Check

Swift 는 에러 없이 *Initialization* 이 완료되었는지 보장하기 위해 `4가지 Safety Check`를 수행한다.

- Safety Check 1. *Designated Initializers* 는 *Superclass Initializer* 에 `delegates up` 하기 전
  `context 내 모든 Properties 가 초기화 되었음을 확인`한다.
- Safety Check 2. `Designated Initializers 는 상속된 Properties 에 값을 할당하기 전`반드시
  *Superclass Initializer* 에 `delegates up` 해야한다(반대 순서가 될 경우 *Superclass Initializer* 가 값을 덮어쓴다).
- Safety Check 3. Check 2와 마찬가지로 `Convenience Initializers 는 Properties 에 값을 할당하기 전` 반드시
  다른 *Initializers* 에 `delegates` 해야한다.
- Safety Check 4. *Initializers* 는 `Phase 1 Initialization 이 종료되기 전` 어떠한 *Instance Methods* 나
  *Instance Properties* 에 `접근하거나 'self' 참조를 할 수 없다`.

#### Two-Phase Initialization Process

위 *Safety Check* 를 기반으로 *Two-Phase Initialization* 이 수행되는 방식은 다음과 같다.

__1 ) `Phase 1`: 0, nil, Custom Initial Values 등의 값을 할당해 `Instance 의 메모리르 완전히 초기화`한다__

![Initialization Phase 1](/assets/images/posts/2022-12-01-initialization/twoPhaseInitialization01_2x.png)

> - **Designated Initializers** 또는 **Convenience Initializers** 가 **Class** 에서 호출된다.
> - `new Instance 를 위한 메모리가 할당`된다(초기화는 하기 전).
> - **Designated Initializers 가 context 내 모든 Stored Properties 가 값을 가지고 있는지 확인**한다
    >   (이때 `Stored Properties 에 대한 메모리가 초기화`된다).
> - **Designated Initializers** 는 **Superclass** 의 **Initializers** 가 자신의 **Stored Properties** 에
    >   동일한 일을 수행하도록 내버려둔다.
> - 위 과정은 `Base Class`(최상위 Class)에 도달할 때까지 `Chaining`된다.
> - `delegates up 이 Base Class 에 도달`하고, `Final Class(최하위 Class)가 모든 값을 저장했다고 확인`하면,
    >   **Instance 의 메모리는 완벽히 초기화 되었다고 간주**하고, `Phase 1이 완료`된다.

<br>

__2 ) `Phase 2`: `Customizing` 할 기회를 처리한다__

![Initialization Phase 2](/assets/images/posts/2022-12-01-initialization/twoPhaseInitialization02_2x.png)

> - Phase 1이 **Final Class 에서 Base Class 까지 delegates up 을 하며 Chaining** 을 했다면 이번에는
    >   반대로 **Base Class 에서 Final Class 까지** `working back down`을 하며 내려간다. `Phase 2`는 Phase1 이
    >   **Instance** 의 메모리를 초기화 했기 때문에 **Instance Methods** 나 **Instance Properties** 에
    >   `접근하거나 'self' 참조를 할 수 있다`.
> - **Superclass** 의 **Designated Initializers** 에게 주어진 **Customizing** 할 기회를 모두 처리하면
    >   **Subclass** 의 **Designated Initializers** 에게 **Customizing** 할 기회가 주어진다.
> - 위 과정은 `Phase 1의 Chaining 의 역순`으로 일어나며 `마지막으로 원래 호출되었던 Convenience Initializers 에 도달`한다.
> - **이 과정을 모두 완료하면 Initialization 이 종료되고, 의도한 Instance 를 얻게 된다**.

그림을 보면 알 수 있듯이, *Convenience Initializers* 의 *Customizing* 이 사용되는 것은, 처음 호출을 시작한
*Convenience Initializers* 의 *Chaining* 경로에 있는 경우 뿐이다.  
<span style="color: red;">*Superclass* 가 가지고 있는 *Convenience Initializers* 는 *Subclass* 에서 직접 호출되거나
*Overriding* 되는 것이 불가능</span>하기 때문이다.

하지만 *Superclass* 의 *Convenience Initializers* 가 항상 무시되는 것은 아니다. `특정 조건이 일치될 경우 Superclass 의
Convenience Initializers 는 Subclass 에 자동으로 상속`된다. 이것은 아래
[Automatic Initializer Inheritance](#h-automatic-initializer-inheritance) 에서 설명한다.

### Initializer Inheritance and Overriding

#### Difference between *Objective-C* and *Swift*

- Objective-C : *Subclass* 는 `Superclass 의 Initializers 를 기본으로 상속한다`
- Swift : *Subclass* 는 `Superclass 의 Initializers 를 기본으로 상속하지 않는다`

이로써 *Swift* 는 *Superclass 로부터 상속된  Initializers 가 완전히 초기화되지 않거나 잘못 초기화된 채로
Subclass 의 `new Instance`를 생성하기 위해 사용되는 상황을 방지*한다.

#### Inherit Superclass's Initializers by Overriding

*Superclass 의 Designated Initializers 의 구문과 일치하는 형태의 Initializers 를 Subclass 에서 구현할 때*는
*Properties*, *Methods* 와 마찬가지로 반드시 `override` modifier 를 사용해야한다.

> - **Subclass** 에서 구현하는 **Initializers** 가 **Designated Initializers** 든, **Convenience Initializers** 든
    >   상관 없이 `Superclass 의 Designated Initializers 를 재정의 하는 경우`라면 반드시 `override modifier 를 사용해야한다`.
> - 반면, **Subclass** 에서 구현하는 **Initializers** 가 `Superclass 의 Convenience Initializers 와 일치하는 경우`는
    >   `override modifier 를 사용하지 않는다`.  
    >   [Initializer Delegation for Class Types](#h-initializer-delegation-rule) 에서 설명한 규칙에 따라
    >   `Superclass 의 Convenience Initializers`는 `Subclass 에 의해 직접 호출되거나 Overriding 되는 것이 불가능`하기
    >   때문에 새롭게 구현하는 것이므로 `override modifier 를 사용하지 않는다`.

#### Implicit Delegates Up

*Subclass* 에 `Phase 2`가 존재하지 않는다면 *delegates up* 을 하기 위한 `super.init()`을 생략 하는 것이 가능하다.

예제 코드는 [Initializer Inheritance and Overriding Example 1],
[Initializer Inheritance and Overriding Example 2] 를 참고한다.

###  Automatic Initializer Inheritance

[Initializer Inheritance and Overriding](#h-initializer-inheritance-and-overriding) 에서 설명했던 것처럼
Swift 의 Subclass 는 *Superclass 의 Initializers 를* `기본으로 상속하지 않는다`. 하지만 `자동으로 상속하는 조건은 존재`한다.   
그 조건은 다음과 같다.


> - **Designated Initializers** 의 자동 상속 : `Subclass 가 아무런 Designated Initializers 를 정의하지 않았다면`,
    >   자동으로 `Superclass 의 모든 Designated Initializers 를 상속`한다.
> - **Convenience Initializers** 의 자동 상속 : Subclass 가 위 "Designated Initializers 의 자동 상속" 규칙에 따라
    >   생성 하든, 직접 구현을 해 생성 하든, `Superclass 와 매칭되는 모든 Designated Initializers 를 제공하면`, 자동으로
    >   `Superclass 의 모든 Convenience Initializers 를 상속`한다.

- Case 1

```swift
class Vehicle {
    var numberOfWheels = 0
    var description: String {
        "\(numberOfWheels) wheels(s)"
    }
}
```

```swift
class Hoverboard: Vehicle {
    var color = "Gray"
    override var description: String {
        "\(super.description) in a beautiful \(color)"
    }
}
```

```swift
let hoverboard = Hoverboard()
print("Hoverboard: \(hoverboard.description)")  // Hoverboard: 0 wheels(s) in a beautiful silver
```

*Hoverboard* 는 *Vehicle* 의 `init()`을 상속했다.

<br>

- Case 2

```swift
class Vehicle {
    var numberOfWheels: Int
    var description: String {
        "\(numberOfWheels) wheels(s)"
    }
    
    init(numberOfWheels: Int) {
        self.numberOfWheels = numberOfWheels
    }
}
```

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}
```

```swift
let bicycle = Bicycle(numberOfWheels: 2)
print(bicycle.description)  // 2 wheels(s)
```

*Bicycle* 은 *Vehicle* 의 `init(numberOfWheels:)`를 상속했다.

#### Designated and Convenience Initializers in Action

*Food*, *RecipeIngredient*, *ShoppingListItem* 라는 3개의 *Class* 계층을 통해 위에서 설명한 내용을 설명한다.

<br>

__1 ) Base Class: Food__

```swift
class Food {
    var name: String

    init(name: String) {
        self.name = name
    }
    convenience init() {
        self.init(name: "[Unnamed]")
    }
}
```

![Initializer of the Food](/assets/images/posts/2022-12-01-initialization/initializersExample01_2x.png)

> **Classes** 는 `Memberwise Initializers 를 가지고 있지 않기 때문에` **Food 는 name 을 arguments 로 갖는
> Designated Initializers 를 구현**했다.
>
> 그리고 **Food** 는 **arguments** 를 갖지 않는 `init()`을 `Convenience Initializers`로 구현했다. 이 **Convenience Initializers 은
> context 내 다른 Initializers 를 호출**하며, `궁극적으로 Designated Initializers 를 호출`하고있다.

```swift
let namedMeat = Food(name: "Bacon")
print(namedMeat.name)   // Bacon

let mysteryMeat = Food()
print(mysteryMeat.name) // [Unnamed]
```

<br>

__2 ) Subclass: RecipeIngredient__

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
}
```

*Custom Initializers* 가 존재하지만 *Superclass 의 모든 Designated Initializers 를 제공하지 않기 때문에*
`Automatic Initializer Inheritance 는 발생하지 않는다`. 따라서 현재 사용 가능한 *Initializers* 는

- <span style="color: rgb(119,198,176);">**Designated**</span> Initializers: `RecipeIngredient(name:quantity:)`

하나 뿐이다.

이것을 *Superclass*의 *Designated Initializers*를 모두 제공해, *Superclass 의 Convenience Initializers 가
자동으로 상속*되게 만들어보자.

<br>

- Case 1

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    override init(name: String) {
        quantity = 1
        super.init(name: name)
    }
}
```

*Superclass* 의 *Designated Initializers* 를 모두 제공하므로써 *Superclass 의 Convenience Initializers 가
자동으로 상속*되어 사용 가능한 *Initializers* 는 3개가 된다.

- <span style="color: rgb(119,198,176);">**Designated**</span> Initializers: `RecipeIngredient(name:quantity:)`
- <span style="color: rgb(119,198,176);">**Designated**</span> Initializers: `RecipeIngredient(name:)` (Overriding Superclass's init(name:))
- <span style="color: rgb(232,138,105);">**Convenience**</span> Initializers: `RecipeIngredient()`

<br>

- Case 2

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    override convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}
```

![Initializer of the RecipeIngredient](/assets/images/posts/2022-12-01-initialization/initializersExample02_2x.png)

이 방법 역시 *Superclass* 의 *Designated Initializers* 를 모두 제공해, 사용 가능한 *Initializers* 는 3개가 된다.

- <span style="color: rgb(119,198,176);">**Designated**</span> Initializers: `RecipeIngredient(name:quantity:)`
- <span style="color: rgb(232,138,105);">**Convenience**</span> Initializers: `RecipeIngredient(name:)` (Overriding Superclass's init(name:))
- <span style="color: rgb(232,138,105);">**Convenience**</span> Initializers: `RecipeIngredient()`

> 위 Case 1과 Case 2모두 **Superclass** 의 `Designated Initializers` `init(name:)`을 **Overriding**
> 하므로써 **Initializers** 가 3개가 되고, 모두 동일한 **Instance** 결과물을 얻는다는 것은 동일하지만 다음과 같은 차이를 갖는다.
>
> - Case 1은 서로 다른 2개의 **Designated Initializers**(Custom Initializers 와 Overriding Initializers)가
    >   `Superclass 의 Designated Initialziers 에 독립적으로 delegates up` 한다.
> - Case 2는 **Overriding Initializers** 를 **Convenience Initializers** 로 만들어, `context 내 존재하는
    >   Designated Initializers(Custom Initializers)로 delegates`하고, 이 `Designated Initializers 가 다시
    >   Superclass 의 Designated Initializers 에 delegates up` 하도록 한다.
> - Case 2에서 상속할 때 `override convenience` 를 붙였다고 *Superclass 의 convenience Initializers* 를 *override*
    >   한 것이 아니니 혼동하지 말고 *arguments* 를 자세히 보자. <span style="color: red;">*Superclass* 가 가지고 있는
    >   *Convenience Initializers* 는 *Subclass* 에서 직접 호출되거나 *Overriding* 되는 것이 불가능</span>함을 다시
    >   상기하도록 하자.


```swift
let oneMysteryItem = RecipeIngredient()
let oneBacon = RecipeIngredient(name: "Bacon")
let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)

print("\(oneMysteryItem.name) : \(oneMysteryItem.quantity) ea")
print("\(oneBacon.name) : \(oneBacon.quantity) ea")
print("\(sixEggs.name) : \(sixEggs.quantity) ea")
```

```console
[Unnamed] : 1 e
Bacon : 1 ea
Eggs : 6 ea
```

<br>

__3 ) Subclass: ShoppingListItem__

```swift
class ShoppingListItem: RecipeIngredient {
    var purchased = false
    var description: String {
        var output = "\(quantity) x \(name)"
        output += purchased ? " ✔" : " ✘"
        return output
    }
}
```

![Initializer of the ShoppingListItem](/assets/images/posts/2022-12-01-initialization/initializersExample03_2x.png)

즉, 사용 가능한 `Initializers`는 3개가 된다.

- <span style="color: rgb(119,198,176);">**Designated**</span> Initializers: `ShoppingListItem()`
- <span style="color: rgb(232,138,105);">**Convenience**</span> Initializers: `ShoppingListItem(name:)`
- <span style="color: rgb(232,138,105);">**Convenience**</span> Initializers: `ShoppingListItem(name:quantity:)`

> **RecipeIngredient 의 Subclass ShoppingListItem 은 자신의 Stored Property 에 default value 를 정의**했고,
> **Instance 는 해당 값을 항상 false** 로 시작하므로 **Initial Values** 를 위한 **Initializers** 가 필요하지 않다.
>
>  따라서 **ShoppingListItem 은 아무런 Designated Initializers 도 정의하지 않았기 때문에 `Automatic Initializer Inheritance 가
> 발생해 Superclass 의 모든 Designated Initializers 를 상속`하고, 이로서 **Superclass 의 모든 Designated Initializers 를
> 모두 제공해** `Superclass 의 Convenience Initializers 도 자동으로 상속`한다.

```swift
var breakfastList = [
    ShoppingListItem(),
    ShoppingListItem(name: "Bacon"),
    ShoppingListItem(name: "Eggs", quantity: 6)
]

breakfastList[0].name = "Orange juice"
breakfastList[0].purchased = true

breakfastList.forEach { print($0.description) }
```

```console
1 x Orange juice ✔
1 x Bacon ✘
6 x Eggs ✘
```

### Failable Initializers

#### Syntax

*Classes*, *Structures*, *Enumerations*의 *Initialization* 이 실패할 수 있는 경우 이에 대한 정의를 해주는 것이
유용할 수 있다. *Initialization 이 실패할 수 있는 경우*는 다음과 같다.

- 유효하지 않은 초기화 파라미터 값
- 필수 외보 리소스의 부재
- 초기화 성공을 방해하는 기타 다른 조건

`Failable Initializers`는 `init?` 키워드를 사용해 만들며, *Parameters 의 개수와 Parameter Types, Argument Labels 가
모두 동일한 경우 Nonfailable Initializers 와 Failable Initializers 는 공존할 수 없다*.

*Failable Initializers 는 `return nil`을 이용해 Initialization 실패를 트리거* 할 수 있고, 해당 `Types 의 Optional 을 생성`한다.  
즉, Int Type 의 *Nonfailable Initializers 가 `Int` 를 생성*한다면, *Failable Initializers 는 `Int?`를 생성*한다.

> 엄밀히 말하면 **Objective-C** 와 달리 `Swift 의 Initializers 는 값을 반환하지 않는다`. **Swift 에서 Initializers 의 역할**은
> `self 가 완전하고 정확히 초기화되도록 하는 것`으로, `return nil 은 오직 Failable Initializers 를 트리거 하기 위한 것`으로,
> **Initialization 이 성공인 경우 `return` 키워드를 사용하지 않는다**.

<br>

__Syntax__

```swift
struct SomStructure {
    var someProperty: SomeType
    init?(someProperty: SomeType) {
        if someProperty.isEmpty { return nil }
        self.someProperty = someProperty
    }
}
```

<br>

다음은 Int Types Structures 의 Initialization 이 성공하는 경우와 실패하는 경우를 보여준다.

```swift
let wholeNumber: Double = 12345.0
let pi = 3.14159

if let valueMaintained = Int(exactly: wholeNumber) {
    print("\(wholeNumber) conversion to Int maintains value of \(valueMaintained)")
}
// 12345.0 conversion to Int maintains value of 12345

let valueChanged = Int(exactly: pi)
if valueChanged == nil {
    print("\(pi) conversion to Int doesn't maintain value")
}
// 3.14159 conversion to Int doesn't maintain value

print(type(of: valueChanged))   // Optional<Int>
```

`Int Types`의 `Nonfailable Initializers`는 `Int`를 생성하고, `Failable Initializers`는 `Int?`를 생성한다.

#### Failable Initializers for Enumerations

```swift
enum TemperatureUnit {
    case kelvin, celsius, fahrenheit
    init?(symbol: Character) {
        switch symbol {
        case "K": self = .kelvin
        case "C": self = .celsius
        case "F": self = .fahrenheit
        default: return nil
        }
    }
}
```

```swift
let fahrenheitUnit = TemperatureUnit(symbol: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// This is a defined temperature unit, so initialization succeeded.

let unknownUnit = TemperatureUnit(symbol: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// This isn't a defined temperature unit, so initialization failed.
```

#### Failable Initializers for Enumerations with Raw Values

[Initializing from a Raw Value](#h-initializing-from-a-raw-value) 를 다시 한 번 떠올려보자.

```swift
enum CompassPoint: String {
    case east, west, south, north
}
```

```swift
print("\(CompassPoint.east) is type of \(type(of: CompassPoint.east))")
print("\(CompassPoint.east.rawValue) is type of \(type(of: CompassPoint.east.rawValue))")

let east = CompassPoint(rawValue: "east")
print("Constant 'east' is type of \(type(of: east))")
```

```console
east is type of CompassPoint
east is type of String
Constant 'east' is type of Optional<CompassPoint>
```

> [RawValues 를 갖는 Enumerations](#h-initializing-from-a-raw-value) 는 자동으로 **Failable Initializers**
> `init?(rawValue:)`를 생성한다.

<br>

따라서, 위 *TemperatureUnit Enumerations* 는 *Raw Values* 가 자동 생성하는 `init?(rawValue:)`를 이용해
다음과 같이 바꿀 수 있다.

```swift
enum TemperatureUnit: Character {
    case kelvin = "K", celsius = "C", fahrenheit = "F"
}
```

```swift
let fahrenheitUnit = TemperatureUnit(rawValue: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// This is a defined temperature unit, so initialization succeeded.

let unknownUnit = TemperatureUnit(rawValue: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// This isn't a defined temperature unit, so initialization failed.
```

#### Propagation of Initialization Failure

__1 ) *Failable Initializers* 를 *Failable Initializers* 에 *delegates* 하는 경우__

- *Classes*, *Structures*, *Enumerations* 의 *Failable Initializers 는 context 내 다른
  Failable Initializer*에 `delegates` 될 수 있다.
- *Subclass 의 Failable Initializers* 는 *Superclass 의 Failable Initializers* 에
  `delegates up` 될 수 있다.

> 이 프로세스는 `즉시 Initialization 실패를 유발`하고, `전체 Initialization 프로세스를 중단`시킨다.

```swift
class Product {
    let name: String
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}

class CartItem: Product {
    let quantity: Int
    init?(name: String, quantity: Int) {
        if quantity < 1 { return nil }
        self.quantity = quantity
        super.init(name: name)
    }
}
```

<br>

__2 ) <span id="failableToNonfailable">*Failable Initializers* 를 *Nonfailable Initializers* 에 *delegates* 하는 경우</span>__

- 달리 `실패하지 않는 기존의 Initialization 프로세스에 잠재적인 실패 상태를 추가해야하는 경우` `Failable Initializers 를
  Nonfailable Initializers 에 delegates`하는 접근법을 사용한다.
- 이 프로세스는 *Initialization 프로세스에 `failure state`를 추가할 뿐*, `Initialization 은 성공`한다

> 정확히는 `Failable Initializers`의 실패 처리를 하지 않고 `failur state`를 추가한다. 즉, 결과물만 보면 에러처리 후
> `Nonfailable Initializers`를 `Nonfailable Initializers`로 `delegates` 하는 것과 같다.

이것은 아래 [Overriding a Failable Initializer 의 Case 3](#h-overriding-a-failable-initializer) 와 연결된다.

```swift
class CartItem: Product {
    let quantity: Int
    init?(name: String, quantity: Int) {
        if quantity < 1 {
            self.quantity = -1
        } else {
            self.quantity = quantity
        }
        super.init(name: name)
    }
}
```

```swift
if let twoSocks = CartItem(name: "sock", quantity: 2) {
    print("Item: \(twoSocks.name), quantity: \(String(describing: twoSocks.quantity))")
}

if let zeroShirts = CartItem(name: "shirt", quantity: 0) {
    print("Item: \(zeroShirts.name), quantity: \(String(describing: zeroShirts.quantity))")
} else {
    print("Unable to initialize zero shirts")
}
```

```console
Item: sock, quantity: 2
Item: shirt, quantity: -1
```

위 예제에서 확인할 수 있듯이 결론적으로 *Failable Initializers* 는 실패 처리를 하지 않았고, *delegates* 를
`위임 받은 Initializers 는 Nonfailable Initializers 이기 때문에 모두 Instnace 생성에 성공`했다.  
단, 실패했어야 하는 케이스인 *zeroShirt* 는 실패 상태를 논리적으로 나타내기 위해 `-1` 이라는 `failur state`를
*Custom Values* 로 저장했다.

#### Overriding a Failable Initializer

*Initializers Overriding* 에 *Failable Initializers* 를 추가해 정리하면 다음과 같다.

|            | Superclass                    | Subclass                      | Allowed |
|------------|-------------------------------|-------------------------------|---------|
| Case 1     | Nonfailable Initializer(init) | Nonfailable Initializer(init) | O       |
| Case 2     | Failable Initializer(init?)   | Failable Initializer(init?)   | O       |
| Case 3     | Failable Initializer(init?)   | Nonfailable Initializer(init) | △       |
| ~~Case 4~~ | Nonfailable Initializer(init) | Failable Initializer(init?)   | X       |

*Failable Initializers 를 Failable Initializers 로 Overriding 하는 것*은 기존에
*Nonfailable Initializers 를 Nonfailable Initializers 로 Overriding 하는 것*과 같다.

주의 깊게 봐야할 것은 위 표에서 Case 3과 Case 4다.

- Case 3 : *Failable Initializers* 를 *Nonfailable Initializers* 로 *Overriding* 하는 방법은
  `Superclass 의 Failable Initializers 결과를 Subclass 에서 Forced Unwrapping 하는 것`이다.  
  (Superclass 의 Initializers 가 Optional Types 를 생성하는 반면, Subclass 의 Initializers 는 Normal Types 를
  생성해야하기 때문이다. 위 [Failable Initializers 를 Nonfailable Initializers 에 delegates 하는 경우](#failableToNonfailable)
  와 연관되므로 함께 보도록 한다.)
- Case 4 : `Nonfailable Initializers 를 Failable Initializers 로 Overriding 하는 것은 허용되지 않는다`.  
  (Phase 1에서 이미 Superclass 에서 초기화를 했는데, Subclass 가 Phase 2에서 수정 기회에 초기화를 실패하는 케이스가
  발생할 수 있기 때문이다.)

<br>

__1 ) Case 3의 첫 번째 방법 - without *Forced Unwrapping*__

*Overriding 하려는 Superclass 의 Initializers* 가 `Failable Initializers`일 때, *Superclass 에
존재하는 다른 `Nonfailable Initializers`를 찾아 `delegates up`한다*.

*이름이 없거나*(init -> nil), *Empty String*(init? -> "")인 케이스가 초기화를 실패하지 않도록
`Superclass 의 Nonfailable Initializers 쪽으로 우회`시킨 후, *Superclass 의 Failable Initializers* 가
했어야 하는 일까지 모두 *Subclass 가 Phase 2 에서 처리*한다.

> 즉, 이 방법을 사용하기 위해서는 두 가지 조건이 반드시 필요하다.
>
> - **Superclass** 에 `Nonfailable Initializers`가 존재할 것.
> - **Superclass 의 Failable Initializers 가 Stored Properties 에 값을 저장하는 경우**,
    >   **Phase 2 에서 Customizing 할 기회를 이용해 처리할 수 있도록** `Superclass 의 Properties`가 `Variable`일 것.

```swift
class Document {
    var name: String?
    // this initializer creates a document with a nil name value
    init() {}
    // this initializer creates a document with a nonempty name value
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}

class AutomaticallyNamedDocument: Document {
    override init() {
        super.init()
        self.name = "[Untitled]"
    }
    override init(name: String) {
        super.init()
        if name.isEmpty {
            self.name = "[Untitled]"
        } else {
            self.name = name
        }
    }
}
```

> 이 방법은 `Forced Unwrapping` 없이 처리할 수 있다는 장점이 있지만 우회하기 위한 조건을 갖고 있어야하며,
> 우회한 결과가 논리적으로 동일한 결과를 도출할 수 있는지에 대한 책임이 개발자에게 주어진다.

<br>

__2 ) Case 3의 두 번째 방법 - with *Forced Unwrapping*__

*Superclass 의 Failable Initializers 가 실패하지 않도록* `예외 처리`를 한 후, *생성된 Optional Instance 를
Subclass* 에서 `Forced Unwrapping`한다.

```swift
class Document {
    var name: String?
    // this initializer creates a document with a nil name value
    init() {}
    // this initializer creates a document with a nonempty name value
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}

class AutomaticallyNamedDocument: Document {
    override init() {
        super.init(name: "[Untitled]")!
    }
    override init(name: String) {
        if name.isEmpty {
            super.init(name: "[Untitled]")!
        } else {
            super.init(name: name)!
        }
    }
}
```

> 이 방법의 장점은 우회를 하지 않기 때문에 우회했을 때 필요한 `논리적 검증을 개발자가 할 필요가 없다`는 것이다.
> 또한 우회를 하지 않으므로 **Superclass** 에 `Nonfailable Initializers 가 존재할 필요가 없으며`, 코드가
> 더 직관적이게된다.
>
> 그리고 마지막으로, 위 우회하는 케이스의 경우는 **Subclass** 에서 Phase 2에서 수정할 기회를 사용하기 때문에
> **Superclass 의 Stored Properties**가 반드시 `Variable`이어야 했지만, 이 경우는 `Constant`여도
> 문제 없이 Initialization 을 처리할 수 있다.

#### The init! Failable Initializer

일반적으로 *Failable Initializers* 는 `?`를 붙여 만들지만, `!`를 붙여 암시적으로 `unwrapping` 된
*Optional Instance* 를 생성하는 *Failable Initializer* 를 정의할 수도 있다.

`init!`은 `init?`과 거의 동일하며 차이점은 다음과 같다.

<table style="text-align: center;">
<thead>
  <tr>
    <th></th>
    <th>Nonfailable Initializers</th>
    <th colspan="2">Failable Initializers</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Keyword</td>
    <td>init</td>
    <td>init?</td>
    <td>init!</td>
  </tr>
  <tr>
    <td>Created Instance</td>
    <td>'self' Type</td>
    <td>'self?' Type</td>
    <td>'self' Type</td>
  </tr>
</tbody>
</table>

- `init?`은 **Optional Types 를 반환**하기 때문에 `delegates 를 위임한 Initializers 가 Unwrapping`해야한다.
- `init!`은 `delegates 를 위임 받은 Initializers 가 Unwrapping` 후 결과를 반환한다.

따라서 바로 위 Case 3의 두 번째 방법을 `init?`에서 `init!`으로 바꾸면 다음과 같다.

```swift
class Document {
    var name: String?
    // this initializer creates a document with a nil name value
    init() {}
    // this initializer creates a document with a nonempty name value
    init!(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}

class AutomaticallyNamedDocument: Document {
    override init() {
        super.init(name: "[Untitled]")
    }
    override init(name: String) {
        if name.isEmpty {
            super.init(name: "[Untitled]")
        } else {
            super.init(name: name)
        }
    }
}
```

*예외 처리*를 하지 않았을 경우, `init?`은 *delegate 를 위임한 Class 에서 결과를 받아 Unwrapping* 하기 때문에
에러가 발생할 경우 위임한 Class 에서 에러가 발생하고, `init!`은 *Unwrapping 을 해서 반환*하기 때문에 위임을 받은 Class
에서 에러가 발생한다.  
즉, 위 경우 *예외 처리*를 제대로 하지 않았을 경우 `init?`은 *Subclass 에서 에러가 발생*하고,
`init!`은 *Superclass 에서 에러가 발생*한다.

#### Summary

<table style="text-align: center;">
<thead>
  <tr>
    <th></th>
    <th>Nonfailable Initializers</th>
    <th colspan="2">Failable Initializers</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Keyword</td>
    <td>init</td>
    <td>init?</td>
    <td>init!</td>
  </tr>
  <tr>
    <td>Created Instance</td>
    <td>'self' Type</td>
    <td>'self?' Type</td>
    <td>'self' Type</td>
  </tr>
</tbody>
</table>

<table style="text-align: center;">
<thead>
  <tr>
    <th>Case</th>
    <th colspan="2" rowspan="2">delegates</th>
    <th colspan="3">Overriding</th>
  </tr>
  <tr>
    <th>when overriding</th>
    <th>Superclass</th>
    <th>Subclass</th>
    <th>Allowed</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>init? ↔ init?</td>
    <td colspan="2">O</td>
    <td>init?</td>
    <td>init?</td>
    <td>O</td>
  </tr>
  <tr>
    <td>init! ↔ init!</td>
    <td colspan="2">O</td>
    <td>init!</td>
    <td>init!</td>
    <td>O</td>
  </tr>
  <tr>
    <td>init? ↔ init!</td>
    <td colspan="2">O</td>
    <td>init? or init!</td>
    <td>init? or init!</td>
    <td>O</td>
  </tr>
  <tr>
    <td>init ← init?</td>
    <td colspan="2">O</td>
    <td>init</td>
    <td>init?</td>
    <td style="color: red;">X ✶</td>
  </tr>
  <tr>
    <td>init ← init!</td>
    <td colspan="2">O</td>
    <td>init</td>
    <td>init!</td>
    <td style="color: red;">X ✶</td>
  </tr>
  <tr>
    <td>init? ← init</td>
    <td colspan="2"><span style="color: red">△ ✶✶</span></td>
    <td>init?</td>
    <td>init</td>
    <td><span style="color: red">△ ✶✶</span></td>
  </tr>
  <tr>
    <td>init! ← init</td>
    <td colspan="2"><span style="color: red">△ ✶✶</span></td>
    <td>init!</td>
    <td>init</td>
    <td><span style="color: red">△ ✶✶</span></td>
  </tr>
</tbody>
</table>

<span style="color: red">✶</span> [Overriding - Case 4](#h-overriding-a-failable-initializer) :
`Nonfailable Initializers`를 `Failable Initializers`로 `Overriding`하는 것은 허용되지 않는다.  
<span style="color: red">✶✶</span> [Overriding - Case 3](#h-overriding-a-failable-initializer) :
`Failable Initializers`를 `Nonfailable Initializers`로 `Overriding`하는 방법은 *Superclass 의 Failable
Initializers 가 실패하지 않도록* `예외 처리`를 한 후, *생성된 Optional Instance 를 Subclass* 에서 `Forced Unwrapping`하는 것이다.

### Required Initializers

*Classes*, *Structures*, *Enumerations* 에 `Protocols`를 채택(adopt)해 특정 구현을 강요할 수 있듯이
*Classes* 의 경우 *Superclass 의 특정 Initializers 를 Subclass 에서 구현하도록 `required` modifier 를 사용해
강요할 수 있다*.

> - `Required Initializers`는 **Overriding** 할 때 `override` modifier 는 생략하고 `required` modifier 만 작성한다.
> - **Protocols** 와 달리 상속된 **Initializers** 로 조건이 충족된다면, **Overriding** 을 명시적으로 구현하지 않아도 충족된다.

<br>

__Syntax__

```swift
class SomeClass {
    required init() {
        // initializer implementation goes here
    }
}
```

```swift
class SomeSubclass: SomeClass {
    required init() {
        // subclass implementation of the required initializer goes here
    }
}
```

---

## 13. Deinitialization 👩‍💻

### Deinitializer on Class Types

`Deinitializer`는 `class instance 의 할당이 해제(deallocate)되기 직전에 호출`되며, `deinit` keyword 를 이용해 작성한다.
*Deinitializer*는 *class* 타입에서만 사용될 수 있다.

> 일반 코드 블럭을 탈출하기 직전에 호출되는 코드는 [defer][Specifying Cleanup Actions] keyword 를 사용해 정의한다.


### How Deinitialization Works

Swift 는 *리소스 확보를 위해 자동으로 더 이상 필요하지 않은 `instances`를 `deallocate`한다*. 이를 위해 Swift 는
*`ARC`([Automatic Reference Counting])를 이용해 instances 의 메모리를 관리*한다.

일반적으로 *instances* 의 *deallocate* 를 수동으로 할 필요는 없다. 하지만 `자기 자신의 리소스를 이용하는 경우 직접 cleanup 을
수행`해줘야한다. 예를 들어, *파일을 열고 데이터를 쓰기 위해* `custom class`를 생성하는 경우 `class instance 가 deallocated 되기
전 반드시 파일을 닫아 리소스를 정리`해야한다.

<br>

```swift
deinit {
    // perform the deinitialization
}
```

> `Deinitializer 는 Class 에 하나만 존재`하며, `파라미터가 존재하지 않으므로`, **별도의 괄호 없이 작성**한다.  
> **Deinitializer 는 instance 가 deallocation 되기 전 자동으로 호출**되며, `명시적으로 호출할 수 없다`.
>
> `Superclasses 의 Deinitializer 는 Subclasses 에 상속`되며, **Superclasses 의 Deinitializer** 는 `Subclasses 의
> Deinitializer 의 마지막에 자동으로 호출`된다. **Superclasses 의 Deinitializer 는 Subclasses 가 자신의 Deinitializer 를
> 제공하지 않더라도 항상 호출**된다.
>
> **Class Instance 는 Deinitializer 가 호출되기 전까지 deallocated 되지 않기 때문에**, `Deinitializer 는
> instance 의 모든 Properties 에 접근 및 수정`할 수 있다.

에제 코드는 [Deinitializers Examples] 를 참고한다.



[Concurrency - Asynchronous Functions]:/swift/2023/01/05/concurrency.html#h-2-asynchronous-functions-
[Automatic Reference Counting]:/swift/2023/03/08/automatic-reference-counting.html
[Choosing Between Structures and Classes]:https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes
[Class-Only Protocols]:/swift/2023/02/20/protocols.html#h-9-class-only-protocols-
[Standard Library - Array]:https://developer.apple.com/documentation/swift/array
[Foundation - NSArray]:https://developer.apple.com/documentation/foundation/nsarray
[Classes Bridged to Swift Standard Library Value Types]:https://developer.apple.com/documentation/foundation/object_runtime/classes_bridged_to_swift_standard_library_value_types
[Manual Memory Management]:https://developer.apple.com/documentation/swift/manual-memory-management
[Can I implement a property observer in a property wrapper structure?]:https://developer.apple.com/forums/thread/653894
[Constant Structure Instances]:/swift/2022/11/22/properties.html#h-2-stored-properties-of-constant-structure-instances
[Type Property Syntax]:/swift/2022/11/22/properties.html#h-1-type-property-syntax
[Type Method Examples]:/swift/2022/11/27/methods.html#h-2-type-method-examples
[Variadic Parameters]:/swift/2022/10/19/functions.html#h-2-variadic-parameters
[Default Parameter Values]:/swift/2022/10/19/functions.html#h-1-default-parameter-values
[In-Out Parameters]:/swift/2022/10/19/functions.html#h-3-in-out-parameters
[Initializer Inheritance and Overriding Example 1]:/swift/2022/12/01/initialization.html#initializer-inheritance-example-1
[Initializer Inheritance and Overriding Example 2]:/swift/2022/12/01/initialization.html#initializer-inheritance-example-2
[Specifying Cleanup Actions]:/swift/2022/12/22/error-handling.html#h-3-specifying-cleanup-actions-
[Deinitializers Examples]:/swift/2022/12/19/deinitialization.html#h-3-deinitializers-in-action-
