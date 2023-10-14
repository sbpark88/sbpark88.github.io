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
     Observers 는 작동하지 않는다. 이로써 Phase 1 이 종료된다.
> 3. 이제 `Phase 2`가 진행되고 Subclass 의 Initializers 가  Superclass 의 Properties 를 수정한다. 이때 해당 Properties
     에 Observers 가 붙어있다면 **`willSet`, `didSet`이 작동**한다.

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
    또한 Type Methods 접근도 가능한데, `Type 의 full name`을 붙여 접근 가능하다.
> - `Type Methods`는 `context` 내부에 정의된 `Type Properties`와 `Type Methods`에 접근 가능하다.

자세한 코드는 [Type Method Examples] 를 참고한다.

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
    (이때 `Stored Properties 에 대한 메모리가 초기화`된다).
> - **Designated Initializers** 는 **Superclass** 의 **Initializers** 가 자신의 **Stored Properties** 에
    동일한 일을 수행하도록 내버려둔다.
> - 위 과정은 `Base Class`(최상위 Class)에 도달할 때까지 `Chaining`된다.
> - `delegates up 이 Base Class 에 도달`하고, `Final Class(최하위 Class)가 모든 값을 저장했다고 확인`하면,
    **Instance 의 메모리는 완벽히 초기화 되었다고 간주**하고, `Phase 1이 완료`된다.

<br>

__2 ) `Phase 2`: `Customizing` 할 기회를 처리한다__

![Initialization Phase 2](/assets/images/posts/2022-12-01-initialization/twoPhaseInitialization02_2x.png)

> - Phase 1이 **Final Class 에서 Base Class 까지 delegates up 을 하며 Chaining** 을 했다면 이번에는
    반대로 **Base Class 에서 Final Class 까지** `working back down`을 하며 내려간다. `Phase 2`는 Phase1 이
    **Instance** 의 메모리를 초기화 했기 때문에 **Instance Methods** 나 **Instance Properties** 에
    `접근하거나 'self' 참조를 할 수 있다`.
> - **Superclass** 의 **Designated Initializers** 에게 주어진 **Customizing** 할 기회를 모두 처리하면
    **Subclass** 의 **Designated Initializers** 에게 **Customizing** 할 기회가 주어진다.
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
    상관 없이 `Superclass 의 Designated Initializers 를 재정의 하는 경우`라면 반드시 `override modifier 를 사용해야한다`.
> - 반면, **Subclass** 에서 구현하는 **Initializers** 가 `Superclass 의 Convenience Initializers 와 일치하는 경우`는
    `override modifier 를 사용하지 않는다`.  
    [Initializer Delegation for Class Types](#h-initializer-delegation-rule) 에서 설명한 규칙에 따라
    `Superclass 의 Convenience Initializers`는 `Subclass 에 의해 직접 호출되거나 Overriding 되는 것이 불가능`하기
    때문에 새롭게 구현하는 것이므로 `override modifier 를 사용하지 않는다`.

#### Implicit Delegates Up

*Subclass* 에 `Phase 2`가 존재하지 않는다면 *delegates up* 을 하기 위한 `super.init()`을 생략 하는 것이 가능하다.

예제 코드는 [Initializer Inheritance and Overriding Example 1],
[Initializer Inheritance and Overriding Example 2] 를 참고한다.

###  Automatic Initializer Inheritance

[Initializer Inheritance and Overriding](#h-initializer-inheritance-and-overriding) 에서 설명했던 것처럼
Swift 의 Subclass 는 *Superclass 의 Initializers 를* `기본으로 상속하지 않는다`. 하지만 `자동으로 상속하는 조건은 존재`한다.   
그 조건은 다음과 같다.


> - **Designated Initializers** 의 자동 상속 : `Subclass 가 아무런 Designated Initializers 를 정의하지 않았다면`,
    자동으로 `Superclass 의 모든 Designated Initializers 를 상속`한다.
> - **Convenience Initializers** 의 자동 상속 : Subclass 가 위 "Designated Initializers 의 자동 상속" 규칙에 따라
    생성 하든, 직접 구현을 해 생성 하든, `Superclass 와 매칭되는 모든 Designated Initializers 를 제공하면`, 자동으로
    `Superclass 의 모든 Convenience Initializers 를 상속`한다.

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
    `Superclass 의 Designated Initialziers 에 독립적으로 delegates up` 한다.
> - Case 2는 **Overriding Initializers** 를 **Convenience Initializers** 로 만들어, `context 내 존재하는
    Designated Initializers(Custom Initializers)로 delegates`하고, 이 `Designated Initializers 가 다시
    Superclass 의 Designated Initializers 에 delegates up` 하도록 한다.
> - Case 2에서 상속할 때 `override convenience` 를 붙였다고 *Superclass 의 convenience Initializers* 를 *override*
    한 것이 아니니 혼동하지 말고 *arguments* 를 자세히 보자. <span style="color: red;">*Superclass* 가 가지고 있는
    *Convenience Initializers* 는 *Subclass* 에서 직접 호출되거나 *Overriding* 되는 것이 불가능</span>함을 다시
    상기하도록 하자.


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
    **Phase 2 에서 Customizing 할 기회를 이용해 처리할 수 있도록** `Superclass 의 Properties`가 `Variable`일 것.

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

### Deinitializers in Action

*Bank* 와 *Player* classes 를 이용한 게임을 통해 *Deinitializers* 를 이해하도록 하자.

<br>

__1 ) Bank class__

*Back* class 는 유통중인 코인이 10,000 개를 넘지 않도록 조절한다. ***게임에서 `하나의 Bank 만 존재`할 수 있기 때문에, Bank 는
`Class 로 구현`되며, 코인을 관리하기 위한 properties 와 methods 를 갖는다***.

*Bank* 는 `coinsInBank` property 를 이용해 현재 유통중인 코인의 개수를 추적한다.  
또한 *코인의 분배와 수집을 처리하기 위해 2개의 methods `distribute(coins:)`와 `receive(coins:)`를 제공*한다.
`distribute(coins:)`는 코인을 분배하기 전 은행에 남은 코인의 수를 검사해 은행 잔고보다 많은 코인을 요구할 경우,
분배 가능한 남은 코인 만큼만 분배한다.

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}
```

<br>

__2 ) Player class__

*Player* class 는 지갑의 코인을 관리하기 위한 `coinsInPurse` property 를 가지고 있으며, *초기화 할 때 Bank 로부터
일정량의 코인을 분배 받는다*. *Player* 는 *`win(coins:)` methods 를 통해 은행으로부터 코인을 획득*하고, 게임을 그만둘 때
*Deinitializer 를 통해 소유한 모든 코인을 은행에 반환*한다.

```swift
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    deinit {
        Bank.receive(coins: coinsInPurse)
    }
}
```
<br>

__3 ) Play Game and Deinitializers in Action__

플레이어는 언제든 게임을 떠날 수 있기 때문에 `Optional`로 선언하고, `?` 또는 `!`를 붙여 접근한다.

```swift
var playerOne: Player? = Player(coins: 100)
print("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
A new player has joined the game with 100 coins
There are now 9900 coins left in the bank
```

<br>

```swift
playerOne?.win(coins: 2_000)
print("A new player has joined the game with \(playerOne?.coinsInPurse ?? 0) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
A new player has joined the game with 2100 coins
There are now 7900 coins left in the bank
```

<br>

그리고 플레이어가 추가로 게임에 참가했다.

```swift
var playerTwo: Player? = Player(coins: 1000)
print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has joined the game with 2100 coins
PlayerTwo has joined the game with 1000 coins
There are now 6900 coins left in the bank
```

<br>

*playerOne* 이 게임을 떠난다.

```swift
playerOne = nil
if playerOne != nil {
    print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
} else {
    print("PlayerOne has left the game")
}
if playerTwo != nil {
    print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
} else {
    print("PlayerTwo has left the game")
}
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has left the game
PlayerTwo has joined the game with 1000 coins
There are now 9000 coins left in the bank
```

> 플레이어가 게임을 떠나는 행위는 `Optional playerOne 변수에 'nil' 을 할당`하는 것으로 이루어진다.  
> **playerOne 에 `nil`을 할당한다는 것**은 `no Player instance 를 의미`하며, `Player instance 에 대한 playerOne 변수의
> 'reference'가 깨진다`.
>
> `아무런 Properties 또는 Variables 도 Player instance 를 참조하지 않는다면, 메모리 리소스 확보를 위해
> instance 에 대한 참조 할당이 해제된다`(it’s deallocated in order to free up its memory).
>
> **이러한 일이 발생되기 직전, Deinitializer 가 자동으로 호출되며, 정의한대로 소유한 모든 코인을 은행에 반환**한다.

<br>

```swift
playerTwo = nil
if playerOne != nil {
    print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
} else {
    print("PlayerOne has left the game")
}
if playerTwo != nil {
    print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
} else {
    print("PlayerTwo has left the game")
}
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has left the game
PlayerTwo has left the game
There are now 10000 coins left in the bank
```

*playerTwo 역시 게임을 떠나며 `Deinitializer 가 호출`됨으로 은행에 모든 코인이 반환*된다.

---

## 14. Optional Chaining 👩‍💻

### What is Optional Chaining?

`Optional Chaining`은 Properties, Methods, Subscripts 가 `nil`일 *가능성이 있는 경우에 안전하게 조회(querying)하고
호출(calling)하기 위한 프로세스*다.

*Optional 이 값을 가지고 있을 경우, Property, Method, Subscript 호출은 성공*하고, *`nil`일 경우 `nil`을 반환*한다.
`Multiple queries`는 서로 `chaining` 될 수 있으며, ***어느 하나라도 `nil`을 포함한다면 전체 `chain`은 실패***한다.

그리고 <span style="color: red;">Optional Chaining 의 return type 은 언제나 **Optional** 이다</span>.

> **Optional Chaining in Swift** 는 **Messaging nil in Objective-C** 와 유사하지만 `모든 타입에 작동`하며,
> `success or failure 를 확인`할 수 있다.

### Alternative to Forced Unwrapping

Property, Method, Subscript 를 `non-nil` 값으로 얻고싶을 때 할 수 있는 가장 쉬운 방법은 `Forced Unwrapping(!)`이다.
하지만 `Forced Unwrapping`은 Optional 이 *nil* 일 때 `Runtime Error`를 발생시키는 반면, `Optional Chaining`은
프로세스를 실패하고 `nil`을 반환한다.

> 단, `Optional Chaining 을 통해 얻은 값`은 'nil' 이 발견되지 않아 **프로세스를 성공적으로 진행**했더라도 `Optional`이다.

### Accessing Properties

- Get

```swift
let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("john.residence? is nil")
}
```

<br>

- Set

*Optional Chaining* 은 `call` 하기 위한 접근 뿐 아니라, <span style="color: red;">`set`을 하기 위한 접근에도
사용</span>할 수 있다.

```swift
john.residence?.address = createAddress()
```

### Calling Methods

*Optional Channing* 을 *Methods* 에 사용하면 `메서드 호출의 success or failure 여부를 확인`할 수 있다.
이것은 `반환 값이 없는 메서드에 대해서도 유효`하다.

> 반환 값이 없는 메서드에서도 메서드 호출의 **success or failure** 여부를 확인할 수 있는 이유는
> [Functions Without Return Values](#h-function-without-return-values) 에서 살펴본 것처럼, 암시적으로
> `Void`라는 타입의 특수한 값(`()` 로 쓰여진 `Empty Tuple`)을 반환하기 때문이다. 따라서 *return type* 은 `Void`가
> 아닌 `Void?`가 된다.

### Accessing Subscripts

*Subscripts* 역시 *Optional Chaining* 을 사용해 `john.residence[237].name`이 아닌
`john.residence?[237].name`와 같이 접근할 수 있다.

```swift
let john = Person()
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
```

### Linking Multiple Levels of Chaining

*Optional Chaining 을 이용하면 `Subproperties`에 대한 접근* 역시 간결한 코드로 안전하게 접근
(drill down into subproperties more than one level deep) 할 수 있으며 다음 규칙을 따른다.

> - 조회하려는 타입이 `Non-Optional`이더라도 `Optional Chaining`에 의해 항상 `Optional`이 된다.
> - `Optional` wrapping 은 중복되지 않는다.

```swift
let john = Person()
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}
```

---

## 15. Error Handling 👩‍💻

### Representing and Throwing Errors

*Swift 의 에러 처리는* `Cocoa 와 Objective-C 에서 'NSError class'를 사용하는 에러 처리 패턴과 상호 운용` 된다.
[Handling Cocoa Errors in Swift]

Swift 에서 에러는 `Error protocol 을 따르는 Types 의 값`으로 표현된다. 그러기 위해서 `Error protocol 을 채택`하도록 해야한다.
Swift 의 *Enumerations 는 연관된 Error conditions 를 그룹화*하는데 적합하다.

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

에러가 발생하면 에러는 주변 코드에 의해 `문제를 수정`하거나, `대안 접근 방식`을 시도하거나, `사용자에게 알림` 등의 방법을 통해
반드시 처리되어야한다.

함수에서 에러가 발생하면 프로그램의 흐름이 변경되므로, 코드에서 에러가 발생한 위치를 빠르게 찾는 것이 매우 중요하다. 이를 위해
*Functions*, *Methods*, *Initializers* 를 호출하는 코드 앞에 `try`(or `try?` or `try!`) keyword 를 작성해
*try expression* 으로 코드를 작성한다.

> Swift 의 에러 처리는 다른 언어의 `try-catch & throw`와 유사하다. 하지만 **Objective-C** 를 포함한 많은 언어와 달리
> Swift 의 에러 처리는 **계산 비용이 많이 드는 `Call Stack 해제(unwinding)`을 포함하지 않는다**.  
> Swift 의 **`throw statement` 의 성능 특성은 `return statement` 와 유사**하다.


### Propagating Errors

- Using Throwing Functions

```swift
func canThrowErrors() throws -> String
```

<br>

- Using Throwing Initializers

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```

### Catching Errors

```swift
do {
    try expression
    statements
} catch pattern 1(let errorConstant) {
    statements
} catch pattern 2 where condition {
    statements
} catch pattern 3, pattern 4 where condition {
    statements
} catch {
    statements
}
```

#### Catch, Catch, Catch...

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Queen": "Licorice",
    "Eve": "Pretzels"
]

func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
```

#### Catch Is

`catch is`를 이용해 연관된 에러를 한 번에 처리할 수 있다.

```swift
func buySnack(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try buySnack(with: "Beat-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
```

#### Catch with Comma

`catch is` 대신 연관된 에러를 필요한 만큼 `,` 를 이용해 나열해 처리할 수 있다.


```swift
func buySnack(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection,
            VendingMachineError.insufficientFunds,
            VendingMachineError.outOfStock {
        print("""
              Couldn't buy that from the vending machine
              because of invalid selection, out of stock, or not enough money.
              """)
    }
}

do {
    try buySnack(with: "Beat-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
```

### Converting Errors to Optional Values

`Throwing Functions 의 return types`는 항상 `Error protocol 을 따르는 Types 의 값` 또는 `Optional`이라고 했다.
따라서 에러가 발생할 경우 이를 처리하기 위한 `do-catch` statement 가 반드시 필요하다.

[Optional Chaining always returns Optional Types] 을 다시 떠올려보자. `Optional Chaining`은 `?`을 이용해
*Instance* 또는 *Value* 가 존재하지 않는 경우에도 별도의 에러 처리 없이 코드를 간결하게 처리했다. *Swift* 가 알아서
에러가 발생하는 상황에 실행을 중단하고 `nil`을 반환하기 때문이다.

*Optional Chaining* 과 마찬가지로 *Throwing Functions* 역시 `try` 대신 `try?`를 이용하면
`Throwing Functions 의 return types`이 항상 `Optional Types` 또는 `nil`을 반환하도록 할 수 있다.

그러면 에러가 발생할 경우 *Swift* 가 알아서 실행을 중단하고 `nil`을 반환하므로 `Optional Chaining`을 할 때와 마찬가지로
일반 코드를 작성하듯 처리할 수 있다.

<br>

`try?`를 사용함으로써 얻는 장점은 `모든 에러를 같은 방식으로 처리하는 경우` `do-catch 없이` 짧고 간결한 코드로 작성할 수 있다는 것이고,   
단점은 *모든 에러를 같은 방식으로 처리*하므로 *cases* 별로 자세한 *에러 처리*를 하는 것이 *불가능*하다는 것이다.

> - `try?` 는 `Optional Chaining`의 `?`와 마찬가지로 항상 Optional Types 를 반환한다.
> - `try!` 는 `Optional Chaining`의 `!`와 마찬가지로 항상 반환값을 Forced Unwrapping 한다.

<br>

`try?` keyword 를 사용하면 `EAFP` 방식으로 코드를 작성하면서 위 가독성 문제도 해결할 수 있다.

```swift
let p = try? someThrowingFunction(0)
print(p as Any)                         // nil
let q = try? someThrowingFunction(1)
print(q as Any)                         // Optional(1)
```

<br>

따라서 `fetch`와 같은 함수는 `try?`를 이용해 다음과 같이 간결하게 작성할 수 있다.

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

### Disabling Error Propagation

절대로 에러가 발생하지 않는다는 것을 알고 있는 경우, *Throwing Functions* 를 호출할 때 `try!` 를 이용할 수 있다.
이 경우 다음 두 가지가 작동하지 않는다.

- Error Propagation
- 반환 값의 Optional Wrapping

```swift
let x = try? someThrowingFunction(1)
print(x as Any)                         // Optional(1)
let y = try! someThrowingFunction(1)
print(y)                                // 1
```

`try?`를 이용한 호출과 달리 `Unwrapped`된 값을 얻을 수 있다.

> 단, 이 때 주의해야할 것이 `throws -> Int`가 아닌 `throws -> Int?`일 경우
>
> ```swift
> func someThrowingFunction(_ input: Int) throws -> Int? {
>     if input == 0 {
>         throw SomeError.zero
>     } else {
>         return input
>     }
> }
> ```
>
> `throw`에 한 번, `Int?`에 한 번 => 총 2번의 `Optional Wrapping`이 이루어진다.  
> 따라서 `throw`에 의해 **Wrapping 된 Optional 을 해제**하더라도 다시 **Int? 에 의해 Optional Wrapping**
> 된 값을 얻는다. 함수가 반환한 값이 `Optional(Optional(1))`이기 때문이다.
>
> ```swift
> let y = try! someThrowingFunction(1)
> print(y)                                // Optional(1)
> ```
>

<br>

로컬 경로에서 이미지를 가져오는 코드를 생각해보자.

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

이미지가 존재할 것이라 확신하고 `try!`를 사용했는데 이미지가 존재하지 않거나 가져오는 데 실패했다면
<span style="color: red;">Runtime Error</span> 가 발생한다. 따라서 `try!`를 사용할 때는
<span style="color: red;">
절대 에러가 발생하지 않는다는 것에 대한 보증을 개발자가 해야하므로 신중한 판단이 필요
</span>하다.

---

## 16. Concurrency 👩‍💻

### Syntax

Swift 에서 *Asynchronous Functions* 를 정의하는 방법은 함수를 정의할 때 `arrow(->)` 앞에 `async` keyword 를 작성하는 것으로
정의된다.

```swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

*Asynchronous Functions* 가 에러를 `throws` 하는 경우 `async throws` 순서로 keyword 를 작성한다.

```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

### Asynchronous and Parallel

Swift 는 구조화된 방법으로 `Asynchronous`, `Parallel` 코드 작성을 지원한다.

- *Asynchronous code* 는 `Single Thread`로 작동해 한 번에 하나의 코드만 실행이 가능하지만, 코드를 잠시 중단 후 다시 재개할 수 있는
  코드 블럭으로, *Fetching data* 또는 *Parsing files* 와 같은 `long-running background task`을 요청 후 기다리는 동안
  *UI Update*와 같은 `short-term`을 수행할 수 있다.
- *Parallel code* 는 `Multi Threads`로 작동해 한 번에 코드의 여러 부분을 동시에 실행한다.

*Asynchronous code* 와 *Parallel code* 로 인한 `scheduling` ***유연성 추가는 코드의 복잡성 증가를 수반***한다.
대신 `Swift's language-level support`를 지원하여 *Compiler* 가 문제를 찾을 수 있도록 한다. 예를 들어 `Actor`를 사용해
`mutable state`에 *안전하게 접근*할 수 있도록 하는 것과 같은 의도를 표현하도록 해 `compile-time checking`을 가능케 한다.

*Concurrent code* 코드를 사용할 때 유의해야 할 점은 ***이것이 느리거나 버그가 있는 코드를 빠르고 정확하게 작동하도록 해준다는 보장이
없다***는 것이다. 오히려 *Concurrency* 는 코드의 디버깅을 어렵게 해 문제를 해결하기 어렵게 만든다.

> Swift 에서 `Concurrency model`은 스레드의 최상단에서 작동하지만 직접적으로 상호작용 하지 않는다. Swift 의
> *Asynchronous Function* 은 ***실행 중인 스레드를 중단할 수 있다***. 그러면 첫 번째 *Asynchronous Function* 이 중단된 동안
> 동일 프로그램의 다른 *Asynchronous Function* 이 해당 스레드에서 실행될 수 있다. 따라서 *Asynchronous Function* 이 ***재개될 때
> `어떤 스레드가 그 함수를 실행할지`에 대해 아무런 보장도 하지 않는다***.

<br>

__1 ) Without Swift's Language Support__

*Swift’s language support* 없이도 Concurrent code 를 작성할 수 있으나 코드를 읽기 어렵다. 아래 코드는
*Swift’s language support* 없이 작성된 Concurrent code 로 갤러리에서 사진 이름 목록을 다운로드하고, 이 목록에서 다시 첫 번째
사진을 다운로드해 사용자에게 보여주는 코드다.

```swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

간단한 코드이지만 `completion handler`가 *연속적으로 작성되어야하므로 `Nested Closures`를 사용*해야한다. 문제는 이런 코드가 더
복잡해질 경우 중첩은 더 많은 *depth* 를 갖게 될 것이고, 이는 코드를 다루기 어렵게 만들 것이다.

<br>

__2 ) With Swift's Language Support__

*Swift’s language support 를 이용한 `Asynchronous Functions`를 사용*한다는 것은 `async/await`를 사용해 코드를 작성하는
것을 의미한다.

```swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

### Encapsulation the Code within an Asynchronous Code

비동기 함수 내에서 `await` keyword 외 다른 코드는 *Synchronous 로 작동하며 코드를 순차적으로 실행*한다. 하지만 이것 만으로는
충분하지 않은 케이스가 존재한다. 다음 코드는 사진을 *Road Trip* 갤러리에 추가하고, *Summer Vacation* 갤러리에서 삭제하는 코드다.

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto toGallery: "Road Trip")
// At this point, firstPhoto is temporarily in both galleries.
remove(firstPhoto fromGallery: "Summer Vacation")
```

그리고 `add(_:toGallery:)`와 `remove(_:fromGallery:)` 사이에 다른 코드는 없다. *일시적이지만 이 순간 사진은 양쪽 모두에 존재하게되고,
앱의 불변성(invariant) 중 하나를 위반*한다. 만약, 이 두 코드 사이에 `await` 가 추가된다면 앱의 불변성 위반은 일시적이 아니라 오랜 시간 지속될
수도 있게된다.  
따라서 *이 코드 덩어리(chunk)는 `await` keyword 가 추가되면 안 된다는 것을 명시적으로 표현하고 분리*시키기 위해 이를 리팩토링해
`Synchronous Function/Closure`로 *분리*시켜야한다.

```swift
func move(_ photoName: String, from source: String, to destination: String) {
    add(photoName, to: destination)
    remove(photoName, from: source)
}
// ...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

이로써 `move(_:from:to:)` 함수는 `await` 중단점을 추가할 경우 *Swift's language-level support 애 의해 compile-time error 가
발생*하므로(*async* 가 명시되어 있지 않으므로 *Synchronous Function* 이다), `Synchronous 작동을 보장`받을 수 있다.

### Asynchronous Sequences(for-await-in)

`Iterating Over an Asynchronous Sequence`는 `for-await-in`을 이용해 접근하며, `Collection`이 모두 준비되는 것을
기다리지 않고 `elements`가 준비되는대로 `Iterating`한다.

```swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

위 코드에서 *handle* 은 파일의 모든 데이터를 한 번에 준비하지 않고 *라인 하나*를 읽은 후 `iteration`이 진행됨에 따라 *중단/재개를 반복*한다.

> *Custom Types* 를 만들 때 `iteration`을 하도록 하기 위해서는 다음 protocol 의 채택이 필요하다.
>
> - `Sequence` protocol 을 채택하면 `for-in` loop 사용이 가능하다.
> - `AsyncSequence` protocol 을 채택하면 `for-await-in` loop 사용이 가능하다.

> Swift 의 `for-await-in`은 *JavaScript* 의 [for-await-of][MDN - for await...of]와 비교해서 보면 좋을 것 같다.

### Asynchronous Functions in Parallel

```swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

위와 같은 코드는 첫 번째 다운로드가 완료된 후 두 번째 다운로드를 진행한다. 네트워크를 통한 다운로드는 멀티 다운로드를 하는 것이 더 효율적이다.
따라서 위 3개의 *Asynchronous Function* 은 다음과 같이 하나의 중단점으로 묶어 관리할 수 있다.

```swift
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

이렇게 하면 *Asynchronous Property* 가 담긴 `Array`에 `await` 중단점이 걸려 있기 때문에 *Array 에 모든 값이 assign 되는
것을 기다린 후 재개*된다.

> **Swift** 의 `await [func1, func2]`은  **JavaScript** 의
> [Promise.all()][MDN - Promise.all()]와 비교해서 보면 좋을 것 같다.

### Tasks and Task Groups

#### Structured Concurrency

`Task`는 프로그램의 일부를 `Asynchronously 하게 실행할 수 있는 작업의 단위(A unit of asynchronous work)`를 말하며,
***모든 Asynchronous code 는 Task 의 일부로써 실행***된다. 앞에서 본 `async let` syntax 는 *Task 내에 `Child Task`를 만들어 낸다*.
*Child Task* 가 여러 개일 경우 이를 관리하기 위한 `Task Group`을 생성하고, 이 그룹에 *Child Task* 를 추가할 수 있다. 이를 그룹화 함으로써
우선순위와 취소를 더 잘 제어할 수 있으며, 동적으로 작업의 수를 생성할 수 있다.

```swift
await withTaskGroup(of: Data.self) { taskGroup in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        taskGroup.addTask { await downloadPhoto(named: name) }
    }
}
```

*Task Group 과 각 Task 는 `parent-child` 구조*를 갖는다. 따라서 *Task Group 내 각각의 Child Task 는 `동일한 Parent Task`를 갖는다*.
그리고 이 각각의 *Child Task 는 또 다른 Child Task 를 가질 수 있다*. 이들은 *Task Group* 으로 묶인 `hierarchy` 구조를
채택하고 있으며, 이들 *Task Group* 과 *Tasks* 관계를 `Structured Concurrency`라 한다.

> **Structured Concurrency** 는 정확성에 대한 *일부* 책임(some responsibility for correctness)이 사용자에게
> 주어지지만 이로써 Swift 는 `Propagating Cancellation`을 처리할 수 있으며, `compile-time error`를 감지할 수 있다.


- `Task`에 대한 추가 정보는 [Task][Apple Developer Documentation - Task] 를 참고한다.
- `Task Group`에 대한 추가 정보는 [TaskGroup][Apple Developer Documentation - TaskGroup] 을 참고한다.

#### Unstructured Concurrency

*Structured Concurrency 에서 Tasks 는 `Task Group 에 속해 동일한 Parent Task`를 갖는 것*과 달리
`Unstructured Task`는 `Parent Task`를 ***갖지 않는다***. 이를 `Unstructured Concurrency`라 한다.

따라서 프로그램이 요구하는대로 `Unstructured Task`를 관리할 수 있는 완전한 유연성(complete flexibility)을 갖는 대신,
정확성에 대한 ***완전한*** 책임(completely responsibility for correctness)이 사용자에게 주어진다.

<p class="center">
  With great flexibility comes great responsibility
</p>
<br>

1. *현재 Actor 에서 실행되는 `Unstructured Task`를 생성*하기 위해서는
   [Task.init(priority:operation:)](https://developer.apple.com/documentation/swift/task/init(priority:operation:)-5k89c)
   initializer 를 호출해야한다.
2. *현재 Actor 가 아닌 분리된 작업(detached task)으로 `Unstructured Task`를 생성*하기 위해서는
   [Task.detached(priority:operation:)](https://developer.apple.com/documentation/swift/task/detached(priority:operation:)-8a4p6)
   class method 를 호출해야한다.

> 두 작업은 모두 결과를 기다리거나(wait), 취소하는(cancel) 상호 작용을 할 수 있는 `Task`를 반환한다.

```swift
let newPhoto = // ... some photo data ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

#### Task Cancellation

Swift 의 *Concurrency* 는 `협동 취소 모델(Cooperative Cancellation Model)`을 사용한다. 각의 *Tasks* 는 실행 중
적절한 시점에 취소되었는지를 확인 후, 적절한 방식으로 취소에 응답한다.

`Task Cancellation`은 수행중인 작업에 따르며, 일반적으로 다음 중 하나를 의미한다.

- Throwing an error like CancellationError
- Returning nil or an empty collection
- Returning the partially completed work

작업이 취소되었는지를 확인하려면 다음 둘 중 한 가지 방법을 사용한다.

- *Task* 가 취소되면 `CancellationError`를 throw 하는
  Type Method [Task.checkCancellation][Apple Developer Documentation - checkCancellation] 를 호출한다.
- Type Property [Task.isCancelled][Apple Developer Documentation - isCancelled] 의 값을 확인한다.

그리고 취소가 확인된다면, 현재의 코드에서 취소를 처리(handle)해야한다. 예를 들어, `downloadPhoto(named:)`이 취소된 경우,
`1. 부분 다운로드를 삭제`하고, `2. 네트워크 접속을 닫음`을 처리해야한다. 그리고 취소를 수동으로 전파하려면
Instance Method [Task.cancel()][Apple Developer Documentation - cancel] 을 호출한다.

### Actors

#### Actors in Swift

프로그램을 `isolated, concurrent pieces`로 분리시키기 위해 *Tasks* 를 사용할 수 있다. *기본적으로 Tasks 는 `isolated` 되어 있어
동시에 실행하는 것이 안전*하지만 `Tasks 사이에 정보를 공유`할 필요가 있는데 이때 `Actors`를 사용한다. ***Actors 는 Concurrent code 간에
정보를 안전하게 공유***할 수 있게 한다.

*Actors* 는 `Reference Types`로 Classes 와 비슷하지만, Classes 와 다르게 ***Actor 는 동시에 하나의 Task 만
`mutable state`의 접근을 허용***하므로, 여러 *Tasks 가 동시에 하나의 Actor instance 와 상호작용해도 안전*하다.

즉, `Actors 의 mutable state 에 접근`하기 위해서는 `isolated 된 Task 단위로 접근`해야한다. 이로 인해 접근하는 즉시 요청한
값을 반환 받는다는 보장이 없기 때문에 *Actor* 의 *Variable Properties* 또는 *Methods* 에 접근하기 위해서는 반드시 `await`을
사용해 접근해야한다.

> - `let`으로 선언한 상수에 접근할 때는 `await` keyword 를 명시하지 않아도 된다. `immutable`이기 때문이다.
> - `var`로 선언한 변수라 하더라도 이 변수는 `actor-isolated properties`이므로 외부 `context`에서 임의로 값을 수정하는
    것은 불가능하다. `mutable`이기 때문에 반드시 `await` keyword 를 이용해 접근해야한다.
> - 메서드는 반환값이 없는 메서드라 하더라도 암시적으로 `Void`라는 타입 특수한 값(`()` 로 쓰여진 `Empty Tuple`)을 반환한다.  
    그리고 단순히 메서드의 타입만으로는 이 메서드가 `Actor`의 `mutable state`와 상호작용을 하지 않는다는 것을 보장할 수 없다.
    예를 들어 따라서 `Dictionaries`의 값을 조회시 항상 `Optional`로 반환하는 것처럼 `Actor`의 모든 메서드는 호출시
    항상 `await` keyword 를 이용해 접근해야한다.

다음 예제는 온도를 기록하는 `Actor`다.

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```

*Actors* 는 `actor` keyword 를 이용해 정의한다. 위 *TemperatureLogger* Actor 는 3개의 properties 를 가지고 있으며,
그 중 *max* 는 `var`로 선언되었으며, `private(set)` modifier 애 의해 **get** 은 `internal`, **set** 은 `private`의
*Access Level* 을 갖는다.

#### Actor Isolation

Swift 는 *Actor 의 `local state`에 접근할 수 있는 것은 Actor 의 `context`로 제한*함으로써 `Asynchronous work`에서도
`mutable state`를 ***안전하게 공유할 수 있음을 보장(guarantee)***한다.

이 보장성으로 *Actor* 의 `let` properties 를 제외한 모든 `var` properties 와 `Methods`는 반드시 `await` keyword 를
이용해 접근해야하며, 그렇지 않으면 에러가 발생한다.

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)    // 25
```

Swift 의 이런 보장성을 `Actor Isolation`이라 한다.

#### Extensions of Actor

```swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}

extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```

Swift 의 [Extensions](#h-20-extensions-) 는 `extension` keyword 를 이용해 *Class*, *Structure*,
*Enumeration*, *Protocol* 을 확장한다. 이는 *Objective-C* 의 *Categories* 와 유사하다.

즉, `update(with:)` 메서드는 *이미 Actor 내부에 있는 것이기 때문에 Actor 의 `context`에 포함*되므로 `await` keyword
없이 `mutable state`에 ***접근할 수 있다***.

### Sendable Types

#### Concurrency Domain

*Tasks* 와 *Actors* 는 프로그램의 일부를 조각으로 분리시켜 *Concurrent code* 가 안전하도록 만든다. *Task* 또는 *Actor* instance 의
내부에 `var`로 선언된 `mutable state`를 포함하는 경우가 있는데 이를 `Concurrency domain`이라 한다. 이렇게 ***mutable state 를
포함하지만 동시 접근(overlapping access)에 대해 보호되지 않는 경우는 Concurrency domain 간에 공유될 수 없다***.

#### Sendable Protocol

*Concurrency domain 간에 공유될 수 있는 타입*을 `Sendable Types`라 한다. *Sendable Types 는 Actor 의 메서드를 호출할 때*
`arguments 로 전달`되거나 `Task 의 결과로써 반환`될 수 있다.

*Value Types 는 언제나 안전한 공유가 가능*하다. 따라서 `Concurrency domain 간에도 안전하게 공유`할 수 있다.

반면, `Reference Types 는 Concurrency domain 간에 전달하기에 안전하지 않다`. *Class* 가 `mutable properties 를 포함하고,
순차적 접근(serialize access)을 하지 않는다면`, 서로 다른 *Tasks* 간에 *Class* 의 instance 를 ***전달할 때 예측 불가능하고
잘못된 결과를 전달***할 수 있다(무분별한 순서로 접근할 경우 *Reference Types* 의 값이 의도한 시점이 아닌데도 불구하고 변경될 수 있다).

이 문제를 해겷하기 위해 우리는 `Sendable Protocol 을 준수하도록(conformance) 선언`해 `Sendable Types`로 만들 수 있다.
*Sendable Protocol 은 코드적인 요구사항(code requirements)은 없지만*,
***Swift 가 강제하는 의미론적인 요구사항(semantic requirements)이 있다***.

<br>

[Sendable][Apple Developer Documentation - Sendable] 의 설명을 다시 읽어보자.

*Sendable Types* 의 값은 하나의 *Concurrency domain* 에서 다른 *Concurrency domain* 으로 안전하게 보낼 수 있다.
예를 들어, ***Sendable Values 는 Actor 의 메서드를 호출할 때 arguments 로 전달될 수 있다***.
다음은 모두 *Sendable 로 표시 가능하다(marked as sendable)*.

- Value Types
- Reference types with no mutable storage
- Reference types that internally manage access to their state
- Functions and closures (by marking them with `@Sendable`)

위에서 이미 살펴보았든이 이 프로토콜은 *required methods* 나 *required properties* 와 같은 요구사항은 없지만,
`compile-time 에 강제되는 의미론적인 요구사항(semantic requirements)*이 있다.
그리고 <span style="color: red">*__Sendable__*은 반드시 *__Type__*이 선언된 파일 내에서 선언</span>되어야한다.
이러한 요구사항에 대해서는 아래 번호에 이어서 설명한다.

*Compiler 의 강제성 없이 Sendable 을 선언*하려면 `Sendable` protocol 대신 `@unchecked Sendable` protocol 을 채택한다.
이 경우 정확성에 대한 책임이 사용자에게 있으며, 사용자는 `lock` 또는 `queue`를 이용해 *타입의 상태에 대한 모든 접근을 보호*해야한다.
또한 이 `Unchecked conformance to Sendable`은 ***Sendable 이 반드시 Type 이 선언된 파일 내에서 선언되어야 한다는 규칙 역시
따르지 않는다***.

#### Sendable Structures and Enumerations

Structures 와 Enumerations 가 *Sendable Protocol* 을 만족시키기 위해 `Sendable Members` 와 `Associated Values` 만
가져야한다.

일부 케이스의 경우 *암시적으로 Sendable 을 따르는데* 그것은 다음과 같다.

- `Frozen` structures and enumerations
- Structures and enumerations that `aren’t public` and `aren’t marked @usableFromInline`.

*이 외 경우는 Sendable 에 대한 적합성을 명시적으로 선언*해야한다.

Structures 가 `nonsendable stored properties`를 가지고 있거나, Enumerations 가 `nonsendable associated values`를
가지고 있다면 `Sendable` *적합성을 따를 수 없다*. 따라서 이 경우 위에서 설명했듯이 `@unchecked Sendable`를 표시해
*compile-time error 를 비활성화 한 후 사용자가 직접* 해당
`Types 가 Sendable Protocol 의 의미론적인 요구사항(semantic requirements)을 만족하는지 검증`해야한다.

#### Sendable Actors

*Actors* 는 모든 *mutable state* 에 순차적인 접근만 허용하기 때문에 암시적으로 *Sendable* 을 만족한다.

#### Sendable Classes

*Classes* 가 *Sendable Protocol* 을 따르기 위해서는 다음을 만족해야한다.

- Be marked final
- Contain only stored properties that are immutable and sendable
- Have no superclass or have NSObject as the superclass

예를 들면 다음과 같은 *Classes* 는 Swift 에 의해 *Sendable Protocol* 을 채택해 적합성을 따르도록 할 수 있다.

```swift
final class Abc: Sendable {
    let x: String
    init(x: String) {
        self.x = x
    }
}
```

<br>
__1 ) `@MainActor`가 표시된 `Classes`는 암시적으로 `Sendable`을 만족한다.__

`Main Actor`는 *자신의 state 에 대한 모든 접근을 조정하기 때문에 암시적으로 Sendable 을 만족*하며, 이 *Classes* 는
`mutable` 하고 `nonsendable`한 *Stored Properties 를 저장할 수 있다*.

__2 ) Verify conform to sendable protocol manually__

위 사항을 따르지 않는 *Classes* 는 `@unchecked Sendable`을 표시하고 사용자가 적합성을 만족하는지 확인한다.

```swift
class Abc: @unchecked Sendable {
    let x: String

    init(x: String) { self.x = x }
}
```

> `@unchecked Sendable`를 표시해 *compile-time error 를 비활성화 한 후 사용자가 직접* 해당
> `Types 가 Sendable Protocol 의 의미론적인 요구사항(semantic requirements)을 만족하는지 검증`해야한다.

#### Sendable Functions and Closures

*Sendable Protocol* 을 따르게 하는 대신 `@Sendable` attribute 사용해 `Sendable Functions` 또는 `Sendable Closures`
을 나타낼 수 있다.  
당연히 전달되는 `Functions 또는 Closures 의 모든 값`은 ***Sendable 을 만족***해야한다. 추가로 `Closures`는 오직 `Value`
캡처만 사용해야하며, 그 값은 반드시 `Sendable Type`이어야 한다.

`Task.detached(priority:operation:)` 호출과 같이 *Sendable Closures 를 예상하는 context 에서 요구사항을 만족하는 클로저*는
암시적으로 ***Sendable 을 만족***한다.

다음과 같이 `Type Annotation`의 일부로 `@Sendable`을 표시하거나 *parameters* 의 앞에 `@Sendable`을 표시함으로 명시적으로
***Sendable 을 만족***함을 나타낼 수 있다.

```swift
let sendableClosure = { @Sendable (number: Int) -> String in
    if number > 12 {
        return "More than a dozen."
    } else {
        return "Less than a dozen"
    }
}
```

#### Sendable Tuples

*Sendable protocol* 을 만족하기 위해서는 `Tuples`의 ***모든 elements 가 Sendable 을 만족***해야하며, 조건이 만족되면
`Tuples 역시 암시적으로 Sendable 을 만족`한다.

#### Sendable Metatypes

`Int.Type`과 같은 `Metatypes`는 암시적으로 `Sendable`을 만족한다.

다음은 `Int`가 어떻게 *Sendable protocol* 을 만족하는지를 보여준다.

```swift
extension Int: Sendable {}
```

따라서 다음과 같은 *Structure* 는 암시적으로 *Sendable* 을 만족한다.

```swift
struct Abc {
    var xyz: Int
}
```

만약 `Genenric Type`이 *Sendable* 을 만족하지 않을 경우 다음과 같이 적합성을 따르도록 할 수 있다.

```swift
struct Box<Val: Sendable> {
    var abc: Val
}
```

---

## 17. Type Casting 👩‍💻

### What is Type Casting?

`Type Casting`은 단순히 타입을 다른 타입으로 변경하는 것만을 의미하는 것이 아니다. `Instance 의 타입을 확인`하거나,
해당 *Instance 를 자신의 `Class Hierarchy` 구조 안에서 `Superclass` 또는 `Subclass`로 다루기 위해 사용*한다.

Swift 에서 Type Casting 은 `is`와 `as` operators 를 이용해 구현된다. 이 두 operators 는 간단하면서 문장을 표현하는 것과
같은 자연스러운 방법으로 `Value`에 대한 `Checking Type`과 `Casting Another Types`을 지원한다.

그리고 *Checking Type*은 해당 `Instance 의 타입을 확인`하는 것 뿐 아니라 그 타입이 특정 `Protocols 를 따르고 있는지 확인`하는
데 사용되기도 한다.

### Casting Operators

Swift 는 *Instance 의 타입을 확인*하거나 *Class Hierarchy 구조 안에서 Downcasting, Upcasting* 을 하기 위해
`is`, `as` 그리고 `as?` 또는 `as!` 와 같은 Operators 를 제공한다.

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}

class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}

class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}
```

**MediaItem** 이라는 Base Class 와 이를 상속하는 **Movie**, **Song** Classes 를 이용해 사용 방법을 확인해보자.

#### Checking Type (Type Check Operator '`is`')

`Type Check Operator(is)`는 일치하는 타입인지 확인 후 `Bool`을 반환한다.

```swift
let aMedia = MediaItem(name: "Avatar")
let aMovie = Movie(name: "Casablanca", director: "Michael Curtiz")
```

```swift
print(aMedia is MediaItem)  // true
print(aMedia is Movie)      // false
print(aMedia is Song)       // false

print(aMovie is MediaItem)  // true
print(aMovie is Movie)      // true
print(aMovie is Song)       // false
```

Superclass 의 instance 는 Subclass 의 *Members* 를 모두 갖지 못하므로 Subclass 타입이 될 수 없다.  
반면 Subclass 의 instance 는 Superclass 의 모든 *Members* 를 모두 갖고 있으므로, Superclass 타입이 될 수 있다.

<br>

위 *library* 에 각 타입이 몇 개씩 저장되어 있는지 `Type Check Operator`를 사용해 확인해보자.

```swift
var (movieCount, songCount) = (0, 0)

library.forEach {
    switch $0 {
    case is Movie: movieCount += 1
    case is Song: songCount += 1
    default: break
    }
}

print("Media library contains \(movieCount) movies and \(songCount) songs")
```

```console
Media library contains 2 movies and 3 songs
```

#### Downcasting (Type Cast Operator '`as?`, `as!`')

특정 *Class Type 의 상수나 변수*는 겉으로 보이는 것과 달리 실제로는 `Subclass Instance 를 참조`하고 있는 경우도 있다.
위에서 *library* 가 그런 경우다. 이때 이것의 Type 을 *Subclass Type* 으로 `Downcasting` 할 수 있다.

*Downcasting* 은 실패할 수 있기 때문에 2가지의 Operators 가 제공된다. 조건부 형식(conditional form)인 `as?`는
`Optional`을 반환하므로 `Downcasting 의 성공 여부를 확인`하는 용도로 사용한다. 만약 *Downcasting* 성공 여부를 확신할 수 있을
경우는 강제 형식(forced form)인 `as!`를 사용해 `Forced Unwrapping`된 타입을 얻을 수 있다. 단, *Downcasting* 이 유효하지
않을 경우 *Runtime Error* 가 trigger 되므로 반드시 성공함을 확신할 수 있을 때만 사용해야한다.

> `Casting`은 `실제 instance 를 수정하거나 값을 바꾸지 않는다`.
> **instance 는 그대로 유지하면서, 단지 casting 된 타입의 instance 로 다루고 접근**할 수 있도록 한다.

```swift
library.forEach {
    if let movie = $0 as? Movie {
        print("Movie: \(movie.name), dir. \(movie.director)")
    } else if let song = $0 as? Song {
        print("Song: \(song.name), by \(song.artist)")
    }
}
```

```console
Movie: Casablanca, dir. Michael Curtiz
Song: Blue Suede Shoes, by Elvis Presley
Movie: Citizen Kane, dir. Orson Welles
Song: The One And Only, by Chesney Hawkes
Song: Never Gonna Give You Up, by Rick Astley
```

#### Type Casting for Any and AnyObject(Upcasting '`as`')

Swift 는 불특정 타입을 위한 두 가지의 특별한 타입을 제공한다.

- Any : Closure, Function, Class, Structure, Enumeration Types 를 포함한 모든 타입의 instance 를 대신할 수 있다.
- AnyObject : Class Types 를 대신할 수 있다.

> `Any`와 `AnyObject`는 ***이것이 제공하는 작동 및 기능이 명시적으로 필요한 경우에만 사용***해야한다. 그 외 경우는 언제나 명확한 타입을
> 지정하는 것이 더 좋다.
>
> `Any`는 `Optional 을 포함한 모든 타입을 대신`할 수 있다.

예제를 위해 Structure 와 Enumeration 을 하나씩 추가하자.

```swift
struct Point {
    var x = 0.0, y = 0.0
}

enum CompassPoint {
    case east, west, south, north
}
```

<br>

__1 ) Any__

```swift
var things: [Any] = []

func testAnyTypes(_ things: [Any]) {
    for thing in things {
        switch thing {
        case 0 as Int:
            print("\(thing) : zero as an Int")
        case 0 as Double:
            print("\(thing) : zero as a Double")
        case let someInt as Int:
            print("\(thing) : an integer value of \(someInt)")
        case let someDouble as Double where someDouble > 0:
            print("\(thing) : a positive double value of \(someDouble)")
        case is Double:
            print("some other double value that I don't want to print")
        case let someString as String:
            print("\(thing) : a string value of \"\(someString)\"")
        case let (x, y) as (Double, Double):
            print("\(thing) : an (x, y) point at \(x), \(y)")
        case let stringConverter as (String) -> String:
            print("\(thing) : \(stringConverter("Michael"))")
        case let movie as Movie:
            print("\(thing) : a movie called \(movie.name), dir. \(movie.director)")
        case let point as Point:
            print("\(thing) : a point is at (\(point.x), \(point.y))")
        case let direction as CompassPoint:
            print("\(thing) : a direction is \(direction)")
        default:
            print("\(thing) : something else")
        }
    }
}
```

<br>

`[Any]`에 여러 타입을 저장하고, 이를 `Upcasting`을 통해 다시 확인해보자.

- Int and Double

```swift
things.append(0)            // Int
things.append(0.0)          // Double
things.append(42)           // Int
things.append(3.14159)      // Double

testAnyTypes(things)
```

```console
0 : zero as an Int
0.0 : zero as a Double
42 : an integer value of 42
3.14159 : a positive double value of 3.14159
```

<br>

- String, Tuple and Closure

```swift
things.append("hello")      // String
things.append((3.0, 5.0))   // Tuple of type (Double, Double)
things.append({ (name: String) -> String in "Hello, \(name)" }) // Closure of type (name: Stirng) -> String

testAnyTypes(things)
```

```console
hello : a string value of "hello"
(3.0, 5.0) : an (x, y) point at 3.0, 5.0
(Function) : Hello, Michael
```

<br>

- Class, Structure and Enumeration

```swift
things.append(Movie(name: "Avatar", director: "James Francis Cameron")) // Class
things.append(Point(x: 5.2, y: 3.0))                                    // Structure
things.append(CompassPoint.east)                                        // Enumeration

testAnyTypes(things)
```

```console
__lldb_expr_81.Movie : a movie called Avatar, dir. James Francis Cameron
Point(x: 5.2, y: 3.0) : a point is at (5.2, 3.0)
east : a direction is east
```

<br>

__2 ) AnyObject__

![AnyObject only represent class types](/assets/images/posts/2023-01-14-type-casting/any-object-only-can-store-class-type.png)

`AnyObject`는 `Any`와 달리 오직 `Class Types`만 대신할 수 있다.

```swift
var things: [AnyObject] = []
things.append(Movie(name: "Avatar", director: "James Francis Cameron")) // Class

if let aMovie = things[0] as? Movie {
    print("\(aMovie) : a movie called \(aMovie.name), dir. \(aMovie.director)")
}
```

```console
__lldb_expr_92.Movie : a movie called Avatar, dir. James Francis Cameron
```

<br>

__3 ) Do Explicit Casting Optional to Any__

다음 코드를 보자. *Optional* 을 그대로 사용하면 작동은 되지만 Swift 는 이를 해결할 것을 경고한다.

```swift
let optionalNumber3: Int? = 3

things.append(optionalNumber3)          // Warning: Expression implicitly coerced from 'Int?' to 'Any'

testAnyTypes(things)
```

```console
Optional(3) : an integer value of 3
```

이때 경고를 제거하기 위해 `Nil-Coalescing Operator(??)`나 `Forced Unwrapping(!)`을 사용할 수 있다.

```swift
let optionalNumber5: Int? = 5
let optionalNumber7: Int? = 7

things.append(optionalNumber5 ?? 0)
things.append(optionalNumber7!)

testAnyTypes(things)
```

```console
5 : an integer value of 5
7 : an integer value of 7
```

<br>

사실 <span style="color: red;">Error</span> 가 아닌 <span style="color: orange;">Warning</span>
이므로 작동에 문제는 없다. 하지만 *경고는 제거하고, Unwrapping 은 하지 않은 채 Optional 상태를 유지*할 수는 없을까?

`Any` casting 은 이를 가능하게 한다.

```swift
let optionalNumber9: Int? = 9

things.append(optionalNumber9 as Any)

testAnyTypes(things)
```

```console
Optional(9) : an integer value of 9
```

---

## 19. Nested Types 👩‍💻

### Nested Types

*Enumerations* 는 주로 특정 *Classes* 또는 *Structures* 의 기능을 지원하기 위해 사용된다. 유사하게 더 복잡한 타입의
*context* 에서 사용하기 위해 순수하게 `Utility Classes or Structures`를 정의하는 것이 편리할 수도 있다.  
이를 위해 Swift 의 Classes, Structures, Enumerations 는 모두 `Nested Types`를 지원한다. 이를 통해 `scope`를
제한할 수 있다. Nested Types 는 지원하는 타입의 내부 중괄호 내에 작성해야하며, Nested Types 는 필요한 만큼 중첩이 가능하다.

```swift
struct BlackjackCard {

    // nested Suit enumeration
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    // nested Rank enumeration
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    // BlackjackCard properties and methods
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

```swift
let aceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
let kingOfHearts = BlackjackCard(rank: .king, suit: .hearts)
let sixOfDiamonds = BlackjackCard(rank: .six, suit: .diamonds)

print("The ace of spades : \(aceOfSpades.description)")
print("The king of hearts : \(kingOfHearts.description)")
print("The six of diamonds : \(sixOfDiamonds.description)")
```

```console
The ace of spades : suit is ♠, value is 1 or 11
The king of hearts : suit is ♡, value is 10
The six of diamonds : suit is ♢, value is 6
```

### Nested Functions

Swift 는 First-Class Citizens 를 지원하는 언어로 Classes, Structures, Enumerations Types 의 중첩뿐 아니라
*Function Types* 를 중첩하는 것 역시 가능하다.

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(_ input: Int) -> Int {
        print(#function)
        return input + 1
    }
    func stepBackward(_ input: Int) -> Int {
        print(#function)
        return input - 1
    }

    return backward ? stepBackward(_:) : stepForward(_:)
}
```

`chooseStepFunction(backward:)` 함수를 위해 사용되는 `stepForward(_:)`, `stepBackward(_:)` 함수를
`chooseStepFunction(backward:)` 함수의 `body`에 중첩해 접근을 제한하고 가독성읖 높였다.

```swift
func movingStart(initialValue: Int) {
    var currentValue = initialValue
    let moveNearToZero = chooseStepFunction(backward: currentValue > 0)

    print("Counting to zero:")
    while currentValue != 0 {
        print("\(currentValue)... Call ", terminator: "")
        currentValue = moveNearToZero(currentValue)
    }
    print("zero!\n")
}

movingStart(initialValue: 4)
movingStart(initialValue: -3)
```

```console
Conting to zero:
4... Call stepBackward(_:)
3... Call stepBackward(_:)
2... Call stepBackward(_:)
1... Call stepBackward(_:)
zero!

Conting to zero:
-3... Call stepForward(_:)
-2... Call stepForward(_:)
-1... Call stepForward(_:)
zero!
```

### Referring to Nested Types

`Nested Types`는 기본적으로 이것이 `정의된 context 의 내부로 범위가 제한`된다. 이렇게 캡슐화 함으로써 전역에서 접근할 필요가 없는
Types 를 숨겨 코드를 더욱 안전하고 가독성 높게 만들 수 있다. 하지만 *Nested Types 는 Closures 의 Capturing Values 와 다르게
완전히 격리되는 것은 아니다*.

만약 2~3개의 타입에서만 사용할 어떤 `Nested Types`가 있다고 해보자. 이를 전역으로 만들면 2~3개의 타입에서 공유가 가능하다. 하지만 이런
타입이 많아지면 `전역 scope 오염`이 일어나 불필요하게 복잡해질 가능성이 높다. 이를 피하기 위해 2~3개의 타입마다 동일한 Nested Types 를
만들면 전역 scope 오염은 되지 않겠지만, 코드의 중복이 발생하고 유지보수 시 코드의 변경 사항을 놓쳐 Human Errors 를 만드는 원인이 될 수 있다.

이런 경우 가장 연관성이 높은 곳에 하나의 Nested Types 를 정의하고, 외부 타입에서 접근할 경우 해당 Nested Types 가 정의된 가장 외부
Types 에 접근해 `Hierarchy 구조를 타고 내려가 명시적으로 접근`할 수 있다. 이렇게 *명시적인 접근을 허용함으로써 Nested Types 는
전역 scope 의 오염을 예방*하며 `필요에 따라 명시적 접근을 통한 코드의 재사용성을 동시에 확보`할 수 있다.

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
print(heartsSymbol)     // ♡
```

---

## 20. Extensions 👩‍💻

### Extension vs. Inheritance

기존의 *Types* 를 확장하기 위한 방법 중 하나인 [Inheritance](#h-11-inheritance-) 는
Class 에서만 사용할 수 있다.  
Inheritance 는 ***기존 Class 는 그대로 둔 채 별도의 Class 를 생성***하며, 이들은 Superclass/Subclass 라는 관계로 연결된
`Hierarchy 구조`를 갖는다. Subclass 는 기존의 Superclass 에 `기능을 추가해 확장`하는 것 뿐 아니라
`이미 존재하는 기능을 Overriding` 하는 것도 가능하다.

`Extension`은 Class, Structure, Enumeration, Protocol 타입에서 사용이 가능하며 Extensions 가 할 수 있는 것은 다음과 같다.

- Add [computed instance properties][Computed Instance Properties] and [computed type properties][Computed Type Properties]
- Define [instance methods] and [type methods]
- Provide new initializers
- Define subscripts
- Define and use new nested types
- Make an existing type conform to a protocol

<br>

Extension 은 Inheritance 와 마찬가지로 기존에 존재하는 타입에 기능을 추가할 수 있다. 그리고 Extension 이 갖는 특징으로 Inheritance
와 다른점은 다음과 같다.

- <span style="color: red;">**Original source code 에 접근 권한이 없는 경우에도 Extension 이 가능**</span>하다.
  이를 `Retroactive Modeling`(소급 모델링) 이라 한다.
- Extension 은 Inheritance 와 달리 **Stored Properties, Property Observers 는 확장이 불가능**하다.  
  오직 **Computed Instance Properties** 와 **Computed Type Properties** 만 확장 가능하다.
- Extension 은 기능을 추가만 가능할 뿐 Inheritance 와 달리 `Overriding 이 불가능`하다.

> Swift 의 **Extensions** 는 Objective-C 의 **Categories** 와 유사하다.
> 단, ***Extensions 는 이름을 갖지 않는다***.

### Syntax

```swift
extension SomeType {
    // new functionality to add to SomeType goes here
}
```

Extension 은 하나 이상의 `Protocol`*을 채택해 기존의 타입을 확장*할 수 있다.

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
    // implementation of protocol requirements goes here
}
```

이뿐 아니라 `Generic Type`*을 확장하는 것 역시 가능*하다.

### Computed Properties

Extensions 를 이용해 `Computed Instance Properties` 또는 `Computed Type Properties`를 확장하는 것이 가능하다. 이것은
사용자가 정의한 타입 뿐 아니라 `Built-in Types 를 확장하는 것을 포함`한다.

다음 예제는 TypeScript 가 Prototype 을 이용해 Built-in Types 에 기능을 추가하듯 다양한 길이 단위를 *'meter'* 단위로 변경하기
위해 Double 에 5개의 Computed Instance Properties 를 추가한다.

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
```

```swift
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")          // One inch is 0.0254 meters

let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")      // Three feet is 0.914399970739201 meters

let aMarathon = 42.km + 195.m
print("A marathon is \(aMarathon) meters long") // A marathon is 42195.0 meters long
```

> Extensions 는 [Computed Instance Properties] 나 [Computed Type Properties] 를 추가하는 것만 가능하다.  
> [Stored Properties](#h-stored-properties) 를 추가하거나, 이미 존재하는 Properties 에
> [Property Observers](#h-property-observers) 를 추가하는 것은 불가능하다.

### Initializers

> Extensions 는 [Convenience Initializers][Designated and Convenience Initializers] 를 추가하는 것만 가능하다.  
> [Designated Initializers][Designated and Convenience Initializers] 나
> [Deinitializers](#h-13-deinitialization-) 를 추가하는 것은 불가능하다.

<br>

__1 ) Without Initializer Extensions__

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

<br>

__2 ) With Initializer Extensions__

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
}

extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

- Without Extensions : 사용자 정의 Initializers 를 추가하는 순간 Default Initializers 와
  Memberwise Initializers 는 자동 생성되는 조건을 만족하지 않게 된다. 따라서 *필요한 만큼
  Default Initializers 와 Memberwise Initializers 를 명시적으로 생성*해야한다.
- With Extensions : `Original implementation`은 *Default Initializers 와 Memberwise Initializers
  의 조건을 만족하므로 자동으로 해당 Initializers 를 생성*한다. 따라서 `Default Initializers 와
  Memberwise Initializers 의 생성 조건을 유지한 채 Custom Initializers 를 추가하는 것을 가능`
  하게 한다.

### Methods

#### With Method Extensions

Extensions 를 이용해 `Instance Methods`와 `Type Methods`를 확장하는 것이 가능하다. 이것은
[Computed Property Extensions](#h-computed-properties-1) 와 마찬가지로 사용자가 정의한 타입 뿐 아니라
`Built-in Types 를 확장하는 것을 포함`한다.

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```

```swift
3.repetitions { print("Hello!") }
```

```console
Hello!
Hello!
Hello!
```

#### Mutating Method of Value Types

Swift 에서 *Structures* 와 *Enumerations* 는 *Value Types* 로 instance 자기 자신의 Properties 수정하기
위해서는 반드시 메서드 앞에 `mutating` keyword 를 적어야한다.

Swift 에서 `Double` 또는 `Int` 와 같은 자료형은 *Structure* 로 구현되었다. 따라서 *Extensions* 를 사용할 때 역시 자신의
Properties 를 수정하려면 `mutating`이 필요하다.

```swift
var someDouble: Double = 3.342

let rounded = someDouble.rounded()
print(rounded)          // 3
print(someDouble)       // 3.342

someDouble.round()
print(someDouble)       // 3
```

`rounded()` 메서드는 `func rounded() -> Self`로 자신의 타입을 반환하는 메서드다. 반면 `round()` 메서드는
`mutating func round()`로 자시 자신의 Properties 를 변경하는, 즉, *mutating* 메서드다.

<br>
Int Structure 에 자기 자신을 제곱해 값을 변경하는(mutating) 메서드를 Extensions 를 이용해 추가해보자.

```swift
extension Int {
    func squared() -> Self {
        self * self
    }
    mutating func square() {
        self = self * self
    }
}
```

```swift
var someInt: Int = 3

let squared = someInt.squared()
print(squared)          // 9
print(someInt)          // 3

someInt.square()
print(someInt)          // 9
```

### Subscripts

`Subscripts` 역시 `Built-in Types 를 확장하는 것을 포함`한다.

다음은 10진법에서 해당 자릿수의 숫자를 구하는 알고리즘이다.

```swift
(3782 / 1) % 10     // 2
(3782 / 10) % 10    // 8
(3782 / 100) % 10   // 7
(3782 / 1000) % 10  // 3
```

- `3782`를 10으로 나눈 `나머지는 2`가 되므로 `1의 자리`는 2다.
- `3782`를 10으로 나누면 `Int / Int` 이므로 결과 역시 Int 가 되어야한다. 따라서 결과는 `378`이 되고, 이제 378을 10으로 나눈
  `나머지는 8`이 되므로 `10의 자리는 8`이다.

이 로직을 Built-in Types `Int`에 Subscripts 를 이용해 확장해보자.

```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
```

```swift
3782[0] // 2, 10^0 의 자릿수는 2다.
3782[1] // 8, 10^1 의 자릿수는 8이다.
3782[2] // 7, 10^2 의 자릿수는 7이다.
3782[3] // 3, 10^3 의 자릿수는 3이다.
3782[4] // 0, 10^4 의 자릿수는 존재하지 않으므로 0이다.
```

### Nested Types

Extensions 를 이용해 이미 존재하는 Classes, Structures, Enumerations 에 `Nested Types` 를 추가할 수 있으며,
이것 역시 `Built-in Types 를 확장하는 것을 포함`한다.

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}
```

```swift
0.kind      // zero
1.kind      // positive
(-2).kind   // negative
```

Extensions 를 이용해 `Built-in Types`를 확장하면 다음과 같은 로직을 좀 더 우아하게 구현할 수 있다.

```swift
func printIntegerKinds(_ numbers: Int...) {
    for number in numbers {
        switch number.kind {
        case .negative:
            print("- ", terminator: "")
        case .zero:
            print("0 ", terminator: "")
        case .positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}
```

```swift
printIntegerKinds(1, 3, 0, -7, 9, 2, 0, -3) // + + 0 - + + 0 -
```

---

## 21. Protocols 👩‍💻

### Protocols

#### Syntax

`Protocol`은 Methods, Properties, 그리고 특정 작업이나 기능의 요구사항을 정의하기위한 `blueprint`로, *Protocol* 은
*Class*, *Structure*, *Enumeration* 에 `채택(adopt)`되어 요구사항을 구현하도록 한다. 그리고 `Protocol 의 모든 요구사항에
충족`하면 그 Type 은 해당 Protocol 을 `준수(conform)`한다고 표현한다.

```swift
protocol SomeProtocol {
    // protocol definition goes here
}
```

*Protocol* 을 정의하는 방법은 *Class*, *Structure*, *Enumeration* 을 정의하는 방법과 유사하다.

#### Adopt Protocol

Protocol 을 채택하는 것 역시 Class 의 Inheritance 와 유사하다.

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // structure definition goes here
}
```

단, `Class`에서는 주의해야할 것이 `Inheritance`가 종료된 후 `Protocol`의 채택이 가능하다.

```swift
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}
```

#### Adopt Protocol vs. Class Inheritance

|                                | Protocol | Class |
|--------------------------------|:--------:|:-----:|
| Class                          |    O     |   O   |
| Structure                      |    O     |   X   |
| Enumeration                    |    O     |   X   |
| Multiple Inheritance(or Adapt) |    O     |   X   |


### Protocol Requirements

#### Property Requirements

__1 ) Syntax__

__You can define__

- `var` keyword
- type
- name
- { get set } or { get }
- `static`, `class` keyword

```swift
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

> `get set`을 모두 정의할 경우 자동으로 [Constant Stored Properties](#h-stored-properties) 와
> [Read-Only Computed Properties](#h-read-only-computed-properties) 는 준수하는 것이 불가능하다.
>
> 반면 `get`만 정의할 경우 모든 종류의 [Properties](#h-8-properties-) 에 대해 Protocol 을 준수할 수 있다.
> 그리고 이것이 유효할 때 `set`이 유효한 타입이라면 `set`은 자동으로 유효하다.

여기서 주의해야 할 것이 `{ get set }`은 이 Protocol 을 채택하는 Type 이 반드시 `get set`을 만족하도록 구현해야한다는
의미이고, `{ get }`은 반드시 `get`을 만족하도록 구현해야한다는 의미다. ***'get' 만 만족하고 'set' 을 만족하지 않도록
`Read-Only`임을 강제하는 것이 아니다***.

<br>

__You <span style="color: red;">cannot</span> define__

- `let` keyword
- What type of properties (i.e. stored properties or computed properties)

> Protocol 이 Properties 요구사항을 정의할 때는 반드시 `var` keyword 만 사용하며, Properties 의 유형은 정의할 수 없다.

<br>

__2 ) Type Properties__

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

또한 Protocol 이 [Type Properties](l#h-type-properties) 를 정의할 때는 마찬가지로 `static` keyword 를 반드시
작성해야한다(이 규칙은 *Classes* 에의해 구현될 때 `class` 또는 `static` keyword 를 요구하는 경우 모두 적용된다).

<br>

__3 ) Examples__

*single instance property* 만 요구하는 매우 간단한 Protocol *FullyNamed* 를 정의한다.

```swift
protocol FullyNamed {
    var fullName: String { get }
}
```

이를 채택하는 Structure 를 하나 만들어보자.

```swift
struct Person: FullyNamed {
    var fullName: String
}
```

위 *Person* 은 *FullyNamed* Protocol 을 완벽하게 준수하고 있다.

```swift
var john = Person(fullName: "John Park")
print(john.fullName)    // John Park
```

*john* 의 fullName 은 "John Park" 이다.

```swift
john.fullName = "John Kim"
print(john.fullName)    // John Kim
```

이제 *john* 의 fullName 은 "John Kim" 이다. Protocol 에서 `var fullName: String { get }`로 정의했으나
이것은 `get`만 만족해야한다는 의미가 아니고 `get`을 만족해야한다는 의미이고, 이것을 채택한 *Person* Structure 는
*fullName* 을 `Variable Stored Properties`로 정의했기 때문에 `set` 역시 자동으로 유효하게된다. 따라서 *set*
역시 유효한 것이다.

<br>

이번에는 위 *FullyNamed* Protocol 을 채택하는 좀 더 복잡한 *Class* 를 하나 정의해본다.

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? "\(prefix!) " : "") + name
    }
}
```

이번에는 *fullName* 을 `Read-Only Computed Properties`로 정의했고, Protocol 이 `get set`이 아닌 `get`만
정의했기 때문에 역시 이 *Starship* 은 *FullyNamed* Protocol 을 완벽하게 준수하고 있다.

```swift
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
print(ncc1701.fullName) // USS Enterprise
```

#### Method Requirements

*Methods* 에 대한 요구사항 역시 *Properties* 와 유사하다.

__1 ) Syntax__

__You can define__

- name
- parameter(including variadic parameter)
- return type
- `static` keyword

```swift
protocol SomeProtocol {
    func someTypeMethod() -> SomeType
}
```

<br>

__You <span style="color: red;">cannot</span> define__

- parameter default value
- method `body`

<br>

__2 ) Type Methods__

```swift
protocol AnotherProtocol {
    static func anotherTypeMethod() -> SomeType
}
```

<br>

__3 ) Examples__

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}
```

이를 채택하는 Class 를 하나 만들어보자.

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }
}
```

> 이 Class 는 선형 합동 생성기(linear congruential generator) 로 알려진 의사 난수(pseudorandom number) 생성기
> 알고리즘이다.

```swift
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
print("And another one: \(generator.random())")
```

```console
Here's a random number: 0.23928326474622771
And another one: 0.4782664609053498
```

#### Mutating Method Requirements

Protocol 에서 Methods 를 `mutating`으로 정의했을 때 이 Protocol 을 채택하는 Type 이 `Classes`인 경우는
**Reference Types** 이므로 `mutating` keyword 를 작성할 필요가 없다. 오직 **Value Types** 인
`Structures` 와 `Enumerations`에서만 작성한다.

__Example__

```swift
protocol Toggleable {
    mutating func toggle()
}
```

```swift
enum OnOffSwitch: Toggleable {
    case off, on

    mutating func toggle() {
        switch self {
        case .off: self = .on
        case .on: self = .off
        }
    }
}
```

```swift
var lightSwitch = OnOffSwitch.off
print("light switch is \(lightSwitch) now.")

lightSwitch.toggle()
print("light switch is \(lightSwitch) now.")

lightSwitch.toggle()
print("light switch is \(lightSwitch) now.")
```

```console
light switch is off now.
light switch is on now.
light switch is off now.
```

#### Initializer Requirements

*Methods* 에 대한 요구사항 역시 *Properties* 와 유사하다.

__1 ) Syntax__

__You can define__

- parameter

Methods 와 유사하다. 하지만 *Initializers* 는 *name* 과 *explicit return type*, *static* 이 허용되지 않기
때문에 당연히 Protocol 역시 불가능하다. 즉, ***어떤 `Custom Initializrer`를 구현해야 하는지 그 Type 만 정의***한다.


```swift
protocol SomeProtocol {
    init(someParameter: SomeType)
}
```

<br>

__You <span style="color: red;">cannot</span> define__

- parameter default value
- method `body`

<br>

__2 ) Examples__

```swift
protocol Human {
    var name: String { get set }
    var age: Int { get set }

    init(name: String, age: Int)
}
```

```swift
struct Student: Human {
    var name: String

    var age: Int

    init(name: String = "[Unknown]", age: Int) {
        self.name = name
        self.age = age
    }

    func identification() {
        print("My name is \(self.name) and I am \(self.age) years old")
    }
}
```

```swift
var jamie = Student(name: "Jamie", age: 20)
jamie.identification()

var kate = Student(age: 22)
kate.identification()
```

```console
My name is Jamie and I am 20 years old
My name is [Unknown] and I am 22 years old
```

<br>

__3 ) Class Implementations of Protocol Initializer Requirements__

위에서 *Structures* 를 이용한 예제를 살펴보았다. 그런데 ***Protocol 의 Initializers 를 `Classes`에 채택***하려면
반드시 [Required Initializers](#h-required-initializers)를 사용해 이 *Class 의 Subclasses* 가 반드시 이를
구현하도록 강제해야한다.

```swift
class Student: Human {
    var name: String

    var age: Int

    required init(name: String = "[Unknown]", age: Int) {
        self.name = name
        self.age = age
    }

    func identification() {
        print("My name is \(self.name) and I am \(self.age) years old")
    }
}
```

> `required` keyword 를 작성하지 않으면 **compile-time error** 가 발생한다.

<br>

하지만 [Classes 가 `final` modifier 를 이용해 정의되는 경우](#h-preventing-overrides), 이 *Class* 는 더 이상
`Subclassing` 될 수 없기 때문에 `required`를 작성할 필요가 없다.

```swift
final class Student: Human {
    var name: String

    var age: Int

    init(name: String = "[Unknown]", age: Int) {
        self.name = name
        self.age = age
    }

    func identification() {
        print("My name is \(self.name) and I am \(self.age) years old")
    }
}
```

<br>

__4 ) Class Implementations Overriding Designated Initializer by Protocol Initializer Requirements__

만약 어떤 `Subclass`가 *Protocol* 에 의해 *Initializers* 의 구현을 요구받는 데, 그 *Initializers* 의 Type 이
`Superclass 의 Designated Initializer`인 경우 `override` keyword 와 함께 사용한다.

```swift
protocol SomeProtocol {
    init()
}

class SomeSuperClass {
    init() {
        // initializer implementation goes here
    }
}

class SomeSubClass: SomeSuperClass, SomeProtocol {
    // "required" from SomeProtocol conformance; "override" from SomeSuperClass
    required override init() {
        // initializer implementation goes here
    }
}
```

<br>

__5 ) Failable Initializer Requirements__

[Failable Initializers](#h-failable-initializers) 역시 해당 *Protocol* 을 채택항 Types 가 이를 준수하도록
정의할 수 있다.

- `Failable Initializer Requirements`는 *Failable Initializer* 또는 *Nonfailable Initializer*
  에 의해 충족될 수 있다.
- `Nonfailable Initializer Requirements`는 *Nonfailable Initializer* 또는
  *Implicitly Unwrapped Failable Initializer* 에 의해 충족될 수 있다.

### Protocols as Types

*Protocols* 는 자체적으로 어떠한 기능도 구현하지 않는다. 그럼에도 불구하고 코드에서 `Fully Fledged Types`으로 사용할 수 있다.
Types 로 Protocols 를 사용하는 것은 “there exists a type T such that T conforms to the protocol”라는
구절에서 비롯된 `존재 타입(Existential Type)`이라 한다.

즉, *Protocols* 역시 [First-Class Citizen] 으로 다룰 수 있다는 것을 의미한다.

- Function, Method, Initializer 의 `Parameter Type` 또는 `Return Type`으로 사용될 수 있다.
- `Constant, Variable, Property 의 Type`으로 사용될 수 있다.
- `Array, Dictionary, 또는 다른 Container 의 Type`으로 사용될 수 있다.

> **Protocols** 역시 `Swift Types`이므로 이름은 `대문자로 시작`한다.

> Superclass 에서 Subclasss 로 [Downcasting](#h-downcasting-type-cast-operator-as-as) 하던 것처럼
> `Protocol Type`에서 이것을 준수하는 `Underlying Type`으로 **Downcasting** 할 수 있다.

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}

class Dice {
    let sides: Int
    let generator: RandomNumberGenerator

    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }

    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}
```

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }
}

var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())

Array(1...5).forEach { _ in print("Random dice roll is \(d6.roll())") }
```

```console
Random dice roll is 2
Random dice roll is 3
Random dice roll is 5
Random dice roll is 6
Random dice roll is 2
```

### Delegation

`Delegation`은 Class 또는 Structure 가 일부 책임을 다른 Type 의 Instance 에게 `hand off(or delegate)` 할 수
있도록 하는 `Design Pattern`이다. 이 Design Pattern 은 위임된 책임이 `캡슐화(encapsulates)`된 Protocol 을 정의하는 것으로 구현되어지며,
대리자(delegate)가 위임된 기능을 제공하는 것을 보장한다. 따라서 *Delegation* 은 특정 작업에 응답하거나 캡슐화된 유형을 알
필요 없이 기능을 제공하고자 하는데 사용된다.

자세한 코드는 [Delegation Examples] 를 참고한다.

### Adding Protocol Conformance with an Extension

기존 타입에 대해 소스 코드에 직접 접근할 수 없더라도 새로운 프로토콜을 채택하고 준수하도록 해 확장할 수 있다. 이를 이용해 기존 타입에
새로운 Properties, Methods, Subscripts 를 추가할 수 있다.

```swift
class Dice {
    let sides: Int
    let generator: RandomNumberGenerator

    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }

    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}
```

```swift
protocol TextRepresentable {
    var textualDescription: String { get }
}
```

*Dice* Class 를 위 Protocol 을 이용해 확장해보자.

```swift
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
```

#### Extending Primitive Types using Protocols

```swift
protocol easyIndex {
    subscript(_ digitIndex: Int) -> Self { get }
}
```

<br>

__1 ) Adopting to Int Type__

```swift
extension Int: easyIndex {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
```

> 위 Subscript 는 기존 챕터에서 살펴본 것과 마찬가지로 `10진법의 n 승수 를 index`로 접근한다.

```swift
3782[0] // 2, 10^0 의 자릿수는 2다.
3782[1] // 8, 10^1 의 자릿수는 8이다.
3782[2] // 7, 10^2 의 자릿수는 7이다.
3782[3] // 3, 10^3 의 자릿수는 3이다.
3782[4] // 0, 10^4 의 자릿수는 존재하지 않으므로 0이다.
```

<br>

__2 ) Adopting to String Type__

```swift
extension String: easyIndex {
    subscript(digitIndex: Int) -> String {
        String(self[self.index(self.startIndex, offsetBy: digitIndex)])
    }
}
```

> 위 Subscript 는 TypeScript 와 동일하게 `앞에서부터 zero-based index`로 접근한다.

```swift
let greeting = "Guten Tag!"
print(greeting[0])                  // G
print(greeting[1])                  // u
print(greeting[2])                  // t
print(greeting[greeting.count - 1]) // !
```

#### Conditionally Conforming to a Protocol (where)

`Generic Type`은 오직 `Generic parameter 가 Protocol 을 준수하는 경우`와 같은 특정 조건에서만 Protocol 의 요구사항을
만족할 수 있다. 따라서 *Generic Type* 을 확장할 때 `where`를 이용해 `constraints`를 나열해 조건부로 준수하도록 만들어야한다.
이것은 추후 [Generic Where Clauses](#h-generic-where-clauses) 에서 자세히 다룬다.

> [Switch Value Binding with Where](#h-where) 에서 본 것 처럼 조건을 매칭시킬 때 `where`는 주로 추가적인 조건을
> `constraints`로 추가하기 위해 사용된다.

<br>

```swift
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
```

위 Protocol 은 `Array 에 TextRepresentable Protocol 을 채택하는 것으로 확장`한다. 그리고 이것이 작동하는 조건은
`Array 의 Element 가 TextRepresentable 을 준수하는 경우`로 제한한다.  
그래야만 `self.map { $0.textualDescription }`에서 에러가 발생하지 않기 때문이다.

```swift
let myDice = [d6, d12]
print(myDice.textualDescription)    // [A 6-sided dice, A 12-sided dice]
```

`Element 가 TextRepresentable Protocol 을 따르는 Array`이므로 Computed Property `textualDescription`를
Member 로 갖는다.

```swift
let myNumber = [1, 2, 4, 6]
let myString = ["A", "C", "F"]

myNumber.textualDescription // Property 'textualDescription' requires that 'Int' conform to 'TextRepresentable'
myString.textualDescription // Property 'textualDescription' requires that 'String' conform to 'TextRepresentable'
```

`Element 가 TextRepresentable Protocol 을 따르지 않는 Array`이므로 Computed Property `textualDescription`를
Member 로 갖지 않아 에러가 발생한다.

#### Declaring Protocol Adoption with an Extension

`Protocol 을 채택해 확장하려는 기능이 이미 Type 에 존재`한다면, 어떻게 해야할까? [Swift Extensions](#h-20-extensions-)
에서 살펴본 것처럼 ***Extension 은 Overriding 을 할 수 없다***.

하지만 이 `Type 이 어떤 Protocol 을 만족함을 명시적으로 표현`해야 할 수 있다. 이 경우 `extension`을 이용해 Protocol 을 채택하되,
아무런 구현도 하지 않으면 된다. 즉, *extension 의 body 를 아예 비워두면 된다*.
<br>

이미 *TextRepresentable* 이 구현되어있는 *Hamster* Structure 가 있다.

```swift
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}
```

```swift
let simonTheHamster = Hamster(name: "Simon")
print(simonTheHamster.textualDescription)   // A hamster named Simon

let somethingTextRepresentable: TextRepresentable = simonTheHamster // Value of type 'Hamster' does not conform to specified type 'TextRepresentable'
```

이미 해당 기능이 구현되어있기 때문에 사용 가능하지만, *TextRepresentable* Protocol 을 따르고 있는 것은 아니기 때문에 에러가 발생한다.  
따라서 위 *Hamster* 가 *TextRepresentable* Protocol 을 만족하도록 만들어보자.

```swift
extension Hamster: TextRepresentable {}

let somethingTextRepresentable: TextRepresentable = simonTheHamster
print(somethingTextRepresentable.textualDescription)    // A hamster named Simon
```

`Protocol 을 채택`하지만 구현을 하지 않기 때문에 `Overriding`이 발생하지 않으므로 정상적으로 *Extension* 이 가능하다. 결과적으로
이제 *Hamster* 는 *TextRepresentable* 를 만족하는 것을 확인할 수 있다.

### Adopting a Protocol Using a Synthesized Implementation

Swift 는 많은 *Simple Cases* 에 대해 자동으로 `Equatable`, `Hashable`, `Comparable` Protocol 을 만족하도록
할 수 있다. 이를 `Synthesized Implementation(함성된 구현)`이라 하며, Protocol 요구사항 구현을 직접 할 필요가 없다.

#### Synthesized Implementation of Equatable

Swift 는 다음 조건을 만족하는 *Custom Types* 에게 `Equatable`을 제공한다.

- Structures that have only stored properties & That stored properties conform to the Equatable protocol
- Enumerations that have only [associated types](#h-associated-values) & That associated types conform to the Equatable protocol
- Enumerations that have no [associated types](#h-associated-values)

위 조건을 만족하는 경우 `==`, `!=` 를 직접 구현하지 않고 `Equatabe` Protocol 을 채택함으로써
`Synthesized Implementation`을 제공할 수 있다.

```swift
struct Vector3D {
    var x = 0.0, y = 0.0, z = 0.0
}

let alpha = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let beta = Vector3D(x: 2.0, y: 3.0, z: 4.0)

if alpha == beta { // Binary operator '==' cannot be applied to two 'Vector3D' operands
    print("These two vectors are also equivalent.")
}
```

`==`비교를 하기 위한 *피연산 함수*가 존재하지 않는다고 에러가 발생된다. 그런데 이 `Structure 는 Stored Properties 만 저장`
하고 있으며, `그 Stored Properties 는 Equatable Protocol 을 만족`하므로 첫 번째 조건에 의해 `Equatable` Protocol 을
채택하는 것 만으로 자동으로 `Synthesized Implementation`을 제공할 수 있다.

```swift
struct Vector3D: Equatable {
    var (x, y, z) = (0.0, 0.0, 0.0)
}

let alpha = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let beta = Vector3D(x: 2.0, y: 3.0, z: 4.0)

if alpha == beta {
    print("These two vectors are also equivalent.")
}
```

```console
These two vectors are also equivalent.
```

#### Synthesized Implementation of Hashable

Swift 는 다음 조건을 만족하는 *Custom Types* 에게 `Hashable`을 제공한다.

- Structures that have only stored properties & That stored properties conform to the Hashable protocol
- Enumerations that have only [associated types](#h-associated-values) & That associated types conform to the Hashable protocol
- Enumerations that have no [associated types](#h-associated-values)

위 `Equatable`과 거의 동일하다는 것을 알 수 있다. 위 조건을 만족하는 경우 `hashValue`, `hash(into:)`를 직접 구현하지 않고
`Hashable` Protocol 을 채택함으로써 `Synthesized Implementation`을 제공할 수 있다.

> 참고로 `Hashable` Protocol 은 `Equatable` Protocol 을 준수한다.
>
> ```swift
> extension AnyHashable : Equatable {}
> ```
>
> 따라서 `Hashable` Protocol 을 준수하는 경우 `Equatable` Protocol 의 `Synthesized Implementation`을 함께
> 제공한다.

```swift
struct Vector3D: Hashable {
    var (x, y, z) = (0.0, 0.0, 0.0)
}

let alpha = Vector3D(x: 2.0, y: 3.0, z: 4.0)
let beta = Vector3D(x: 2.0, y: 3.0, z: 4.0)

let hashAlpha = alpha.hashValue
let hashBeta = beta.hashValue

if alpha == beta {
    print("These two vectors are also equivalent.")
}

print(hashAlpha)
print(hashBeta)
```

```console
These two vectors are also equivalent.
-4042012231002845599
-4042012231002845599
```

#### Synthesized Implementation of Comparable

Swift 는 [Raw Values](#h-raw-values) 를 갖고 있지 않은 *Enumerations* 에게 다음 조건을 만족하는 경우 `Comparable`을
제공한다.

- Enumerations that have no Raw Values
- Enumerations that have no Raw Values  
  & Enumerations that have  [associated types](#h-associated-values)  
  & That associated types conform to the Comparable protocol

위 조건을 만족하는 경우 `<`, `<=`, `>`, `>=` operator 를 직접 구현하지 않고 `Comparable` Protocol 을 채택함으로써
`Synthesized Implementation`을 제공할 수 있다.

```swift
enum SkillLevel: Comparable {
    case beginner
    case intermediate
    case expert(stars: Int)
}

var levels = [SkillLevel.intermediate,
              SkillLevel.beginner,
              SkillLevel.expert(stars: 5),
              SkillLevel.expert(stars: 3)]

if SkillLevel.intermediate > SkillLevel.beginner {
    print("intermediate is higher level than beginner")
}

for level in levels.sorted() {
    print(level)
}
```

```console
intermidiate is higer level than beginner

beginner
intermediate
expert(stars: 3)
expert(stars: 5)
```

### Collections of Protocol Types

[Protocols as Types]#h-protocols-as-types 이미 살펴보았듯이 *Protocols* 역시 [First-Class Citizen] 으로
다룰 수 있으므로 이것을 *Collections* 에 저장하는 것 역시 가능하다.

```swift
let d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())
let simonTheHamster = Hamster(name: "Simon")

let things: [TextRepresentable] = [d6, d12, simonTheHamster]

for thing in things {
    print(thing.textualDescription)
}
```

```console
A 6-sided dice
A 12-sided dice
A hamster named Simon
```

### Protocol Inheritance

Protocol 을 *Classes*, *Structures*, *Enumerations* 에 `Adapt` 시키는 것 말고도 ***Protocol 이
다른 Protocol 을 `Inheritance`하는 것*** 역시 가능하다.

*Multiple Adapt* 이 가능했던 것처럼 *Multiple Inherit* 역시 가능하다.

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // protocol definition goes here
}
```

<br>

```swift
protocol TextRepresentable {
    var textualDescription: String { get }
}

extension SnakesAndLadders: TextRepresentable {
    var textualDescription: String {
        return "A game of Snakes and Ladders with \(finalSquare) squares"
    }
}
```

<br>

이제 이 *TextRepresentable* 를 상속해 *PrettyTextRepresentable* Protocol 을 만들고, 이것을 한 번 더
*SnakesAndLadders* 에 확장해보자.

```swift
protocol PrettyTextRepresentable: TextRepresentable {
    var prettyTextualDescription: String { get }
}

extension SnakesAndLadders: PrettyTextRepresentable {
    var prettyTextualDescription: String {
        var output = textualDescription + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}
```

```swift
let game = SnakesAndLadders()
print(game.prettyTextualDescription)
```

```console
A game of Snakes and Ladders with 25 squares:
○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○ 
```

### Class-Only Protocols

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```

[Delegation Examples] 에서 본 것처럼, *Class* 의 채택만 허용하려면, `AnyObject`를 상속시킴으로써
`Class-Only Protocols`로 marking 된다.

> **Class-Only Protocols** 를 채택한 **Class** 는 반드시 `delegate 를 Week Reference 로 선언`해야한다.

> Protocol 의 요구사항에 정의된 작동이 `Value Semantics`가 아닌 `Reference Semantics`임을 가정하거나 요구하는 경우
> `Class-Only Protocols`를 사용한다.
>
> [Which one choose Structures or Classes] 에서 애플은 `Inheritance` 관계를 설계할 때 처음부터 `Protocol`을
> 사용하는 것을 권장하고있다. 따라서 **Class** 에만 채택되어야 하는 기능을 상속 구조로 설계할 때 **Class Inheritance**
> 대신 `Class-Only Protocols`를 사용할 수 있다.

### Protocol Composition

#### Protocol Composition between Protocols

동시에 여러 Protocols 를 준수하는 경우, 이것을 단일 요구사항으로 결합하는 것이 유용할 수 있다.

`Protocol Composition`은 `SomeProtocol & Another Protocol`과 같이 `&` 를 이용해 결합하며, 이것은
`Temporary Local Protocol`인 것처럼 작동한다.

다음은 *Named* 와 *Aged* Protocols 의 두 요구사항을 하나로 결합한다.

```swift
protocol Named {
    var name: String { get }
}

protocol Aged {
    var age: Int { get }
}

struct Person: Named, Aged {
    var name: String
    var age: Int
}
```

```swift
func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}
```

`&`에 의해 *Named* 와 *Aged* Protocols 는 결합되어 요구사항을 한 번에 만족하도록 구현할 수 있다.

```swift
let birthdayPerson = Person(name: "Harry", age: 11)
wishHappyBirthday(to: birthdayPerson)   // Happy birthday, Harry, you're 11!
```

#### Protocol Composition with Classes

*Named* Protocol 과 *Location* Class 를 정의한다.

```swift
protocol Named {
    var name: String { get }
}

class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}
```

이제 *Location* 을 상속하고 *Named* 를 채택하는 *City* Class 를 정의한다.

```swift
class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}
```

```swift
let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
```

이제 City `seattle`의 이름과 위치를 출력하는 함수를 만들어보자.
<br>

__1 ) Case 1 - Subclass__

```swift
func whereIs(_ city: City) {
    print("\(city.name), latitude: \(city.latitude), longitude: \(city.longitude)")
}
```

가장 간단한 방법이다. 처음부터 *Named* 를 준수하는 *Subclass* `City`를 사용하는 것이다.
<br>

__2 ) Case 2 - Downcasting__

하지만 `City`가 아닌 위치 정보와 이름을 갖는 *다른 Subclass Type* 이 추가된다면 위 함수는 재사용을 할 수 없게된다.
따라서 Parameter 를 *Superclass* `Location`을 받도록 해야한다.

```swift
func whereIs(_ location: Location) {
    print("\((location as? City)!.name), latitude: \(location.latitude), longitude: \(location.longitude)")
}
```

`Downcating`을 이용하면 *Location* 을 상속하고 *Named* 를 채택하는, *다른 Subclass Type* 이 추가되더라도 `Switch`와
`as`를 이용한 [Type Casting](#h-type-casting-for-any-and-anyobjectupcasting-as) 을 이용해 함수를 재사용 할 수 있다.
<br>

__3 ) Protocol Composition with Class__

위 경우도 함수를 재사용 할 수는 있지만, Type 이 추가될 때마다 함수의 구현을 매번 수정해줘야하는 문제가 있다.
`Protocol Composition`는 이러한 경우 더욱 유연하게 대응할 수 있다.

```swift
func whereIs(_ location: Location & Named) {
    print("\(location.name), latitude: \(location.latitude), longitude: \(location.longitude)")
}
```

> `Location 을 상속하고 Named 를 채택하는, 다른 Subclass Type`이 추가되더라도 함수는 재사용 가능하며, 구현을 수정할 필요가 없다.

<br>

위 세 가지 방법 중 어떤 방법을 사용하든 다음 결과를 얻는다. 다만 `Protocol Composition`를 사용하는 것이 코드를 더 유연하게 만든다.

```swift
whereIs(seattle)    // Seattle, latitude: 47.6, longitude: -122.3
```

### Checking for Protocol Conformance

[Type Casting](#h-17-type-casting-) 에서 설명했듯이 `is`와 `as` 연산자를 사용할 수 있다.

- is : Instance 가 Protocol 을 준수하면 `true`, 아니면 `false`를 반환.
- as? : Instance 가 Protocol 을 준수하면 `Optional<Protocol Type>`, 아니면 `nil`을 반환.
- as! : Instance 가 Protocol 을 준수하면 `Protocol Type`, 아니면 `Runtime Error`를 trigger.

<br>

```swift
protocol HasArea {
    var area: Double { get }
}
```

```swift
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}

class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}
```

<br>
이제 3개의 Classes 를 하나의 배열에 담아 Type Checking 을 이용해 안전하게 순환시켜보자.

```swift
let objects: [AnyObject] = [
    Circle(radius: 2.0),
    Country(area: 243_610),
    Animal(legs: 4)
]

objects.forEach {
    if let objectWithArea = $0 as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
```

```console
Area is 12.5663708
Area is 243610.0
Something that doesn't have an area
```

### Optional Protocol Requirements

#### Syntax

Protocol 의 *Requirements* 를 정의할 때 *Optional* 을 사용할 수 있다. 이를 `Optional Requirements`라 하며,
이것은 반드시 구현해야하는 책임을 갖지 않는다.

주의해야할 것이
<span style="color: red;">Optional Requirements 는 Objective-C 와 상호 운용(interoperates)</span>
을 위한 것으로, Protocol 의 Type 은 반드시 `@objc` 를 이용해 `@objc Protocol`로 정의해야한다.
또한 *Optional Requirements* 를 적용할 attributes 는 반드시 `@objc`를 이용해 `@objc attribute`로만 정의될 수 있다.

마지막으로 이것이 `Optional`임을 나타내기 위해 `optional` modifier 도 함께 작성해줘야한다.

```swift
@objc protocol SomeProtocol {
    @objc optional var mustBeSettable: Int { get set }
    @objc optional var doesNotNeedToBeSettable: Int { get }
    @objc optional func someTypeMethod() -> SomeType
    @objc optional init(someParameter: SomeType)
}
```

> 참고로 Protocol 이 구현 의무를 갖지 않도록 하는 방법은 Optional Protocol 외에도
> [Protocol Extensions](#h-protocol-extensions) 가 있다. 물론, Optional Protocols 와 작동 방식은 다르지만
> 기본 구현을 제공하며, 사용자 정의 구현도 가능하게 할 뿐 아니라 Class 가 아닌 Structure 나 Enumeration 에서도 사용할 수
> 있다는 장점을 갖는다.
>
> Optional Protocols 의 구현 의무 면제가 왜 위험하고 주의해야하는지 잠시 후
> [Optional Protocols as Types](#h-optional-protocols-as-types) 에서 소개한다.
>
> 단순히 Protocol 의 일부를 `Optional`로 정의하는 것이 목적이라면 다음 챕터인
> [Protocol Extensions](#h-protocol-extensions) 를 사용하는 것이 좋은 대안이 될 수 있다.

#### Optional Protocol Requirements in Action

```swift
@objc protocol Member {
    var name: String { get set }
    var age: Int { get set }
    @objc optional var address: String { get }
}
```

> Swift 만 사용해 코드를 작성하더라도 Optional Requirements 를 사용하려면 반드시 `Optional Reuirements`와
> `Protocols` 모두 `@objc`로 정의해야한다.

<br>

````swift
struct Teacher: Member {    // Non-class type 'Teacher' cannot conform to class protocol 'Member'
    var name: String
    var age: Int
    var address: String
}
````

<span style="color: red;">*Objective-C 와 상호 운용한다는 것*은 이것이 `Class`이어야 함을 의미한다.
따라서 Structure 로 정의할 수 없다.</span>

````swift
class Teacher: Member {
    var name: String
    var age: Int
    var address: String
    init(name: String, age: Int, address: String) {
        self.name = name
        self.age = age
        self.address = address
    }
}

class Student: Member {
    var name: String
    var age: Int
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}
````

*Teacher* 는 optional 을 포함해 *name, age, address* 를 모두 member 로 갖는다.
반면, *Student* 는 optional 을 제외하고 *name, age* 만 member 로 갖는다. 실제 객체가 정상적으로 작동되는지 확인해보자.

```swift
let jamie = Teacher(name: "Jamie", age: 42, address: "서울시 강남구")
let mike = Student(name: "Mike", age: 20)

var MemberList: [Member] = [jamie, mike]

for member in MemberList {
    switch member {
    case let manager as Teacher:
        print("Teacher name is \(manager.name), he(she) is \(manager.age) years old, and lives in \(manager.address).")
    case let student as Student:
        print("Student name is \(student.name), he(she) is \(student.age) years old.")
    default: break
    }
}
```

```console
Teacher name is Jamie, he(she) is 42 years old, and lives in 서울시 강남구.
Student name is Mike, he(she) is 20 years old.
```

#### Optional Members make them Optional Types

위 [예제](#h-optional-protocol-requirements-in-action) 만 보면 굉장히 유용해 보인다. 하지만 Optional Protocols 를
사용하는 것은 매우 조심해야한다.

Protocol 은 직접 채택하는 것 뿐 아니라 [Protocol 을 Type 으로 사용](#h-protocols-as-types)할 수 있음을 앞에서 확인했다.
바로 이때 Optional Protocols 를 Types 로 사용할 때 왜 위험한지 알아보자.

![Optional Members are Optional Types](/assets/images/posts/2023-02-20-protocols/optional-memebrs-make-them-optional-types.png){: width="800"}

> <span style="color: red;">Optional Members 는 구현 의무가 없기 때문에</span> 이것을 Types 로 사용할 때,
> <span style="color: red;">Members 의 Type 은 항상 Optional</span> 이다.

즉, `@objc optional var something: Int { get }`의 Type 은 `Int`가 아니라 `Int?`다.  
마찬가지로 `@objc optional func someFunc(num: Int) -> String`의 Type 은 `(Int) -> String`이 아니라
`((Int) -> String)?`이다.

```swift
for member in MemberList {
    userInformation(user: member)
    print("")
}

func userInformation(user: Member) {
    print(user.name)
    print(user.age)
    print(user.address as Any)
}
```

```console
Jamie
42
Optional("서울시 강남구")

Mike
20
nil
```

> - 위 [예제](#h-optional-protocol-requirements-in-action)에서 Teacher, Student 는 **switch** 를 통해
    `Type Casting`을 했기 때문에 `Member Protocol 을 채택한 Teacher, Student Types`임을 명확히 알 수 있다.
    따라서 Teacher Class 는 address 를 `String` Type 을 명백히 갖고 있으므로 Optional 이 아니다.
    또한, Student Class 는 address 를 갖고 있지 않음을 확힐히 알 수 있다.
> - 하지만 [이번 예제](#h-optional-members-make-them-optional-types)는 Member 를 Type 으로 사용했다.
    즉, Member Protocol 을 따르지만 `Optional 이기 때문에 Class 가 구현 했는지 여부를 알 수 없다`. 그렇기 때문에
    `Optional("서울시 강남구")`가 출력되는 것이다. 따라서 Optional Protocol 을 채택하는 Classes 를 사용할 때는
    Protocols 를 Type 으로 사용하는 대신 적절한 Type 으로 `Downcasting`하거나 `Optional Chaining`으로 접근해야한다.

#### Optional Protocols as Types

위에서 살펴본 것처럼 Optional Protocols 를 Type 으로 사용할 때는 주의해야한다. 이것을 좀 더 극단적인 케이스를 이용해 더 깊게 알아보자.

```swift
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}
```

*CounterDataSource* 는 *increment 라는 Optional Method* 와 *fixedIncrement 라는 Optional Property* 를
갖고 있으며, `둘 다 Optional Members`다.
즉, <span style="color: red;">Protocol 을 채택하더라도 아무런 구현도 하지 않았을 가능성</span>이 존재한다.

> 이런 요구사항을 준수하는 Class 를 만드는 것이 기술적으로는 가능하지만, 좋은 방법은 아니다. 이 Protocol 을 사용하지 않고
> 해당 요구사항을 준수하는 Class 의 구현을 할 수 있다.

이 Protocol 을 Class 가 직접 채택하지 말고 Type 으로 사용해보자.

```swift
class Counter {
    var count = 0
    var dataSource: CounterDataSource
    func increment() {
        if let amount = dataSource.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource.fixedIncrement {
            count += amount
        }
    }
    init(dataSource: CounterDataSource) {
        self.dataSource = dataSource
    }
    convenience init(count: Int, dataSource: CounterDataSource) {
        self.init(dataSource: dataSource)
        self.count = count
    }
}
```

그런데 *dataSource* 가 Type 으로 사용하는 *CounterDataSource* Protocol 은 모든 Members 를 구현하지 않아도 되므로,
실제 아무런 구현도 하지 않았을 가능성이 존재한다. 따라서 `CounterDataSource 가 아닌 CounterDataSource?`를 사용하는 것이
적합하다.

```swift
class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}
```

- `increment(forCount:)` 호출을 보자. 첫 번째 `?`은 `CounterDataSource? Type`이므로 사용되었고, 두 번째 `?`은
  *increment* 가 `Optional Member`이므로 구현 여부를 알 수 없어 사용되었다. 즉, 이렇게 `Optional Chaining`을
  이용해 접근해야 안전하다.
- 함수에서 if clause 와 else clause 에서 `let amount`가 가능한 이유는 `increment(forCount:)`와 `fixedIncrement`
  모두 Optional Types 이므로 `Optional Binding`이 가능한 것이다.

<br>

Counter 를 작동시켜보자.

```swift
var counter = Counter()

for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
```

```console
0
0
0
0
```

`var dataSource: CounterDataSource?`가 `nil`이기 때문에 count = 0 에 의해 0에 매번 0을 더하므로 모두 0이다.

<br>

*dataSource* 에 할당할 CounterDataSource Type 의 Class 를 하나 만들어보자.

```swift
class ThreeSource: NSObject, CounterDataSource {
    let fixedIncrement = 3
}
```

이번에는 이 Class 를 `var dataSource: CounterDataSource?`에 할당 후 Counter 를 작동시켜보자.

```swift
var counter = Counter()
counter.dataSource = ThreeSource()

for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
```

```console
3
6
9
12
```

<br>

이번에는 `fixedIncrement`가 아닌 `increment(forCount:)`를 이용해 Counter 를 작동시켜보자.

```swift
class TowardsZeroSource: NSObject, CounterDataSource {
    func increment(forCount count: Int) -> Int {
        if count == 0 {
            return 0
        } else if count < 0 {
            return 1
        } else {
            return -1
        }
    }
}
```

```swift
var counter = Counter()
counter.count = -4
counter.dataSource = TowardsZeroSource()

Array(1...5).forEach { _ in
    counter.increment()
    print(counter.count)
}
```

```console
-3
-2
-1
0
0
```

### Protocol Extensions

#### Providing Default Implementations

Protocol 은 이것을 준수하는 Type 에 기능을 제공하기 위해 [Extensions](#h-20-extensions-) 을 이용해
`Computed Properties`, `Initializers`, `Methods`, `Subscripts`의 기본 구현을 적합성을 준수하는 Type 에
추가할 수 있다.

> 이는 Global Function 을 추가하거나 추가된 Protocol 채택으로 인해 개별 Type 마다 적합성을 다시 추가하는 대신
> `Protocol Extensions`를 사용해 기능을 제공할 수 있다.

> `Protocol Extensions`이 <span style="color: green;">기본 구현을 반드시 제공</span>하기 때문에 이 Protocols 를
> 채택하는 <span style="color: red;">Types 는 적합성을 만족하기 위한 구현을 강요받지 않으며</span>, 기능의 구현이
> 보장되므로 [Optional Protocols](#h-optional-members-make-them-optional-types) 와 다르게
> <span style="color: green;">Optional Chaining 없이 호출될 수 있다</span>.

<br>

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}

class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }
}
```

의사 난수(pseudorandom number) 생성기에 `Bool`을 반환하는 함수를 추가해보자.

<br>

__1 ) Class Inheritance__

```swift
protocol RandomBoolGenerator: RandomNumberGenerator {
    func randomBool() -> Bool
}

extension LinearCongruentialGenerator: RandomBoolGenerator {
    func randomBool() -> Bool {
        random() > 0.5
    }
}
```

상속을 이용할 경우 우리는 다음과 같이 3가지를 구현해야한다.

1. RandomNumberGenerator 를 상속한 RandomBoolGenerator Protocol 정의.
2. Extension 을 이용해 LinearCongruentialGenerator Class 에 RandomBoolGenerator 를 추가로 채택.
3. 채택된 RandomBoolGenerator Protocol 을 준수하도록 정의.

<br>

__2 ) Protocol Extensions__

그런데 LinearCongruentialGenerator Class 는 이미 RandomNumberGenerator Protocol 을 준수하고있다.
따라서 `Protocol Extensions`를 사용하면 `Protocol 을 준수하는 Type 에 Protocol 자체를 확장`함으로써 기능을
쉽게 추가할 수 있다.

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        random() > 0.5
    }
}
```

```swift
Array(1...5).forEach { _ in print("Here's a random Boolean: \(generator.randomBool())") }
```

```console
Here's a random Boolean: false
Here's a random Boolean: false
Here's a random Boolean: true
Here's a random Boolean: true
Here's a random Boolean: false
```

#### Overriding Default Implementations

```swift
protocol RandomNumberGenerator {
    func random() -> Double
}

extension RandomNumberGenerator {
    func randomBool() -> Bool {
        random() > 0.5
    }
}
```

RandomNumberGenerator 를 확장하고, RandomNumberGenerator 를 채택해 다음과 같이 LinearCongruentialGenerator 에
적합성을 추가하면

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }
}
```

이 LinearCongruentialGenerator Class 는 확장된 `RandomNumberGenerator`의 기본 구현을 받아 다음과 같은 형태인 것처럼
작동할 것이다.

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }

    func randomBool() -> Bool {
        random() > 0.5
    }
}
```

그런데 이것의 구현을 변경하고 싶다면 어떻게 해야할까? Default 로 제공된 이 구현을 다르게 하고 싶다면 어떻게 해야할까?

<br>

만약 이것을 Protocol Extensions 가 아닌 Protocols 로 정의했다면 매번 *RandomBoolGenerator* Protocol 을 채택할 때
적합성 구현을 해야하므로 필요한 Type 에 맞게 구현을 변경하면 된다.

```swift
extension LinearCongruentialGenerator: RandomBoolGenerator {
    func randomBool() -> Bool {
        random() > 0.8
    }
}
```

<br>

반면 Extensions 은 구현의 의무가 없기 때문에 그냥 *RandomNumberGenerator* Protocol 을 채택한 후 Extensions 가
기본 구현을 제공하기로 한 기능을 직접 구현하면 된다.

```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0

    func random() -> Double {
        lastRandom = ((lastRandom + a + c).truncatingRemainder(dividingBy: m))
        return lastRandom / m
    }

    func randomBool() -> Bool {
        random() > 0.8
    }
}
```

그러면 Extensions 은 기본 구현을 제공할 뿐 어떠한 구현도 강요하지 않기 때문에 Protocol 의 기능을 직접적으로 수행하지 않는다.
따라서 `randomBool()`은 LinearCongruentialGenerator Class 의 구현에 의해 *Overriding* 된다.

```swift
let generator = LinearCongruentialGenerator()
Array(1...5).forEach { _ in print("Here's a random Boolean: \(generator.randomBool())") }
```

```console
Here's a random Boolean: false
Here's a random Boolean: false
Here's a random Boolean: false
Here's a random Boolean: true
Here's a random Boolean: false
```

이로써 별도의 구현 변경이 필요하지 않은 경우 *RandomBoolGenerator* Protocol 을 채택하는 것 만으로 우리는

```swift
func randomBool() -> Bool {
    random() > 0.5
}
```

를 기본 구현으로 사용할 수 있으며, 필요시 이를 직접 구현해 Overriding 시켜 사용할 수 있다.

#### Adding Constraints to Protocol Extensions (where)

[Conditionally Conforming to a Protocol (where)](#h-conditionally-conforming-to-a-protocol-where) 에서
이미 Protocol 에 `where`를 이용해 `constraints`를 추가하는 것을 확인했다.

```swift
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
```

이번엔 이를 좀 더 일반화 시켜 `Collection 에 기능을 추가`해보자. 단, 정상적인 동작을 위해 `Element 이 Equatable 에 적합`한
경우로 제한하도록한다.

```swift
extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        for element in self {
            if element != self.first {
                return false
            }
        }
        return true
    }
}
```

위 Protocol 은 모든 Element 가 `Equatable`을 만족하는 Collection 에게 자기 자신의 모든 Element 가 동일한지를 판별 후
Boolean 을 반환하는 `allEqual()` 메서드를 추가한다.

```swift
let equalNumbers = [100, 100, 100, 100, 100]
let differentNumbers = [100, 100, 200, 100, 200]

print(equalNumbers.allEqual())      // true
print(differentNumbers.allEqual())  // false
```

<br>

위 코드는 Protocol Extensions 와 constraints 를 이용해 기능을 확장하는 것을 어떤식으로 활용할 수 있는가 설명하기 위한 것으로
실제 위와 같이 단순한 코드는 따로 구현할 필요 없이 Swift 가 이미 모든걸 제공하고있다.

`Higher-order Functions`를 사용하면 Collection 의 `모든 값이 같은지` 또는 `어떤 값을 포함하고 있는지`를 손쉽게 처리할 수 있다.

- Swift 는 `allSatisfy`와 `contains`를 이용해 손쉽게 처리할 수 있다.

```swift
print(equalNumbers.allSatisfy { $0 == equalNumbers[0] })            // true
print(differentNumbers.allSatisfy { $0 == differentNumbers[0] })    // false

print(equalNumbers.contains { $0 == 200 })                          // false
print(differentNumbers.contains { $0 == 200 })                      // true
```

- TypeScript 는 `every`와 `some`을 이용해 손쉽게 처리할 수 있다.

```typescript
const equalNumbers: Array<number> = [100, 100, 100, 100, 100]
const differentNumbers: Array<number> = [100, 100, 200, 100, 200]

console.log(equalNumbers.every(v => v === equalNumbers[0]))     // true
console.log(differentNumbers.every(v => v === equalNumbers[0])) // false

console.log(equalNumbers.some(v => v === 200))                  // false
console.log(differentNumbers.some(v => v === 200))              // true 
```

---

## 22. Generics 👩‍💻

### Generic Functions

#### Syntax

`Generic code`는 정의한 요구사항에 맞는 `모든 타입에서 작동(work with any type)`할 수 있는 유연하고 재사용 가능한
함수와 타입을 작성할 수 있다.

*Generic* 은 Swift 의 강력한 특징 중 하나로 대부분의 `Swift stardard library`는 *Generic code* 로 작성되었다.
예를 들어 Swift 의 *Array* 와 *Dictionary* Types 는 `Generic Collections`다. Array 를 이용해 우리는
Int 를 저장할 수도 있고, String 을 저장할 수도 있고, Swift 에서 생성될 수 있는 모든 Type 을 저장할 수 있다.

다음은 `Swift stardard library`에 이미 built-in 된 `swap(_:_:)` 이라는 함수가 어떤 식으로 정의되었는지를 보여준다.

```swift
func swap<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

```swift
var someDouble = 6.2
var anotherDouble = 20.2
swap(&someDouble, &anotherDouble)

print("someDouble is now \(someDouble), and anotherDouble is now \(anotherDouble)")
// someDouble is now 20.2, and anotherDouble is now 6.2
```

```swift
var someString = "Apple"
var anotherString = "Pear"
swap(&someString, &anotherString)

print("someString is now '\(someString)', and anotherString is now '\(anotherString)'")
// someString is now 'Pear', and anotherString is now 'Apple'
```

위 `swap(_:_:)` 함수는 Parameter Types 에 따라 `(Int, Int) -> Void`, `(Double, Double) -> Void`,
`(String, String) -> Void` 로 작동하는 하나의 함수로 정의된다. *Generic Functions* 없이 정의한다면 위 함수는
3개를 만들어 *Overloading* 처리를 해야 한다.

#### Placeholder Type `T`

```swift
func swap(_ a: inout Int, _ b: inout Int)
func swap<T>(_ a: inout T, _ b: inout T)
```

*Nongeneric Function* 와 *Generic Function* 를 비교해보자.

- `swap<T>` : Swift 에게 *swap* 함수를 정의할 때 `＜T＞`라는 `Type Parameters`를 사용할 것임을 알린다.
- (_ a: inout T, _ b: inout T) : 이 함수 내에서 함수의 호출 시점에 Types 가 정해지는 Generic Types `T`를 사용할
  수 있다.

> `T`라는 Type 은 Swift 내에 존재하지 않는다. 이것은 미리 정의되지 않은 함수가 호출될 때 `Type Inference`에 의해 Type 이
> 정해짐을 의미한다.
>
> 따라서 **Generic Function** `swap(_:_:)`은 위에서 정의한 Int, Double, String 3가지 타입에 대해 모두 작동한다.

#### Type Parameters `＜T＞`

위 `swap(_:_:)`에서 *Placeholder Type* `T`는 `Type Parameters`의 한가지 예시를 보여준다. *Type Parameters* 는 함수의
이름 뒤에 위치하며 `<T>`와 같이 *angle brackets* `< >`로 감싸 정의한다.

*Type Parameters* 를 정의하면, 함수의 정의에서 *Parameters* 에 이것을 *Placeholder Type* 으로 사용할 수 있게 한다.
바로 `(_ a: inout T, _ b: inout T)` 부분이다. `Type Parameter <T> 를 정의`했기 때문에 함수 정의에서 *Parameters*
`a`, `b`에 `Type Parameter T 를 Placeholder Type 으로 사용`할 수 있는 것이다.

#### Naming Type Parameters

위에서는 Type Parameters 의 이름으로 `T`를 사용했지만 이것은 반드시 `T`를 쓰도록 정해진 것은 아니다. 다만 의도를 내치비기 위해 보통
다음과 같이 정의한다.

- 구분되는 관계가 있는 경우 : `Dictionary<Key, Value>`, `<Key, Value>`, `<K, V>`, `Array<Element>`, `<E>`와 같이
  이름을 통해 관계를 유추할 수 있도록 사용한다.
- 별다른 관계가 없는 경우 : 정해진 규칙은 없지만 전통적으로 `T`, `U`, `V`와 같은 단일 대문자를 사용하는 것이 일반적이다.

> **Type Parameters** 를 정의할 때는 이것이 `Placeholder Type 으로 사용`된다는 것을 나타내기 위해 `Upper Camel Case`를
> 사용한다. (i.e. T, U, Key, Value, MyTypeParameter)

### Generic Types

#### Syntax

Swift 의 *Array* 와 *Dictionary* Types 는 `Generic Collections`라고 설명했다. 이렇듯 Swift 는 `Generic Functions`
외에도 `Generic Types`를 정의할 수 있으며, *Array*, *Dictionary* 와 유사하게 모든 타입에서 작동할 수 있는 *Custom Classes,
Structures, Enumerations* 다.

`Stack` 은 `Pushing`과 `Popping`을 통해 작동하며 `LIFO` 로 작동한다. 이 *Stack* 을 이용해 *Generic Types* 를 설명한다.

```swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}
```

```swift
var intStack = Stack(items: [3, 2, 5])
print(intStack)             // Stack<Int>(items: [3, 2, 5])

intStack.push(8)
print(intStack)             // Stack<Int>(items: [3, 2, 5, 8])

intStack.pop()
print(intStack)             // Stack<Int>(items: [3, 2, 5])
```

Stack 을 이번엔 String 을 저장하는데 사용해보자.

![Stack 2](/assets/images/posts/2023-02-23-generics/stackPushedFourStrings~dark@2x.png){: width="800"}

```swift
var stringStack = Stack<String>()
stringStack.push("uno")
stringStack.push("dos")
stringStack.push("tres")
stringStack.push("cuatro")
print(stringStack)          // Stack<String>(items: ["uno", "dos", "tres", "cuatro"])
```

![Stack 3](/assets/images/posts/2023-02-23-generics/stackPoppedOneString~dark@2x.png){: width="480"}

```swift
print(stringStack.pop())    // cuatro
print(stringStack)          // Stack<String>(items: ["uno", "dos", "tres"])
```

#### Extending a Generic Type

*Generic Type* 을 확장할 때는 다른 Types 를 확장할 때와 마찬가지로 정의할 때 *Type* 을 정의하지 않는다. 따라서 `Extension`은
별도의 정의 없이 `Original Type Parameters`를 그대로 사용한다.

위 Stack 을 확장해 *Element* 를 제거하지 않고 가장 마지막 *Element* 를 반환하는 *Read-Only Computed Properties* 를
추가해보자.

```swift
extension Stack {
    var topItem: Element? {
        items.last
    }
}
```

```swift
var stringStack = Stack<String>()
stringStack.push("uno")
stringStack.push("dos")
stringStack.push("tres")
stringStack.push("cuatro")
print(stringStack)          // Stack<String>(items: ["uno", "dos", "tres", "cuatro"])

if let topItem = stringStack.topItem {
    print(topItem)          // cuatro
}
print(stringStack)          // Stack<String>(items: ["uno", "dos", "tres", "cuatro"])
```

### Type Constraints

#### Syntax

위에서 정의한 [`swap(_:_:)`](#h-generic-functions) 함수와 [Stack](#h-generic-types) 은 모든 타입에서 작동한다.
하지만 때로는 Generic 으로 사용할 수 있는 Types 에 `type constraints`를 강제하는 것이 유용할 수 있다. *Type constraints* 는
`Type Parameters 가 특정 Class 를 상속하거나 Protocol 을 준수해야함`을 지정한다.

예를 들어 *Dictionary* Type 은 `Key 의 Type 은 Hashable 을 준수`하는 것으로 제한한다. 그래야만 특정 키에 값이 이미 포함되어 있는지 확인
후 삽입할지 대체할지 판단할 수 있기 때문이다(Swift 의 모든 기본 타입 *String, Int, Double, Bool* 은 모두 *Hashable* 을 준수한다).

따라서 사용자는 사용자 정의 Generic Types 를 정의할 때 *constraints* 를 제공하는 것은 *Generic Programming* 을 더욱 강력하게 한다.
예를 들어 Hashable 과 같은 추상적 개념을 사용하는 것은 구체적인 유형이 아닌 개념적 특성에서 Type 의 특성을 강화한다.

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // function body goes here
}
```

위 함수는 2개의 `Type Parameters`를 갖는다. `T 는 SomeClass 의 Subclass`이어야하고, `U 는 SomeProtocol 을 준수`해야한다는
*constraints* 를 추가한다.

#### Type Constraints in Action

__1 ) Nongeneric Function__

다음은 찾아야 할 `String`과 찾아야 하는 대상 `[String]`을 받는 `findIndex(ofString:in:)`이라는 *Nongeneric Function* 이다.

```swift
func findIndex(ofString valueToFind: String, in array: [String]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]

if let dogIndex = findIndex(ofString: "dog", in: strings) {
    print("The index of dog is \(dogIndex).")
} else {
    print("The dog is not in the array.")
}

if let bearIndex = findIndex(ofString: "bear", in: strings) {
    print("The index of bear is \(bearIndex).")
} else {
    print("The bear is not in the array.")
}
```

```console
The index of dog is 1.
The bear is not in the array.
```

<br>

__2 ) Generic Function__

이제 이 함수를 *Generic Function* 으로 바꿔보자.

![Generic Function Define Error](/assets/images/posts/2023-02-23-generics/generic-function-define-error.png){: width="800"}

예상과 달리 *compile-error* 가 발생한다. `==` operator 를 사용하기 위해서는 [Equatable] 을 준수해야 하기 때문이다.

따라서 우리는 ***Type Parameter `<T>`에 Equatable Protocol 을 준수(confirm)하는 것으로 `constraints`를 추가***해
문제를 해결할 수 있다.

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

```swift
if let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25]) {
    print("The index of 9.3 is \(doubleIndex).")
} else {
    print("The 9.3 is not in the array.")
}

if let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"]) {
    print("The index of Andrea is \(stringIndex).")
} else {
    print("Andrea is not in the array.")
}
```

```console
The 9.3 is not in the array.
The index of Andrea is 2.
```

### Associated Types

#### Syntax

Protocol 을 정의할 때 때로는 `Associated Type`을 사용하는 것이 유용할 때가 있다. *Associated Type* 은 `Protocol 에서
사용될 Type 의 이름을 제공`한다. 반면 `실제 Type 은 Protocol 이 채택될 때 정해진다`는 점에서
[Type Parameter](#h-type-parameters-t) 를 이용해 Generic Types 를 정의하는 것과 유사하다.

> Classes, Structures, Enumerations 에서 Types 에 대한 판단을 보류하고 Type Inference 를 사용하기 위해
> **Generic Types** 를 사용했다.  
> Protocols 는 Types 에 대한 판단을 보류하고 Type Inference 를 사용하기 위해 Associated Types 를 사용한다.

> 만약, Generic Types 를 사용하지 않는다면 `n`개의 Types 에 대한 Structures 를 위해
> `n 개의 서로 다른 Structures 를 정의`해야했다.  
> 마찬가지로, Associated Types 를 사용하지 않는다면 `n`개의 Types 에 대한 Protocols 를 위해
> `n 개의 서로 다른 Protocols 를 정의`해야한다.  
> 즉, 3가지 Types 를 정의하고자 할 경우 `n + n`개가 필요하므로 `6개의 정의와 3번의 Protocols 채택과 준수`가 필요하다.
>
> Generic Types 와 Associated Types 는 이런 문제를 해결하고 코드를 유연하게 만든다.

```swift
protocol SomeProtocol {
    associatedtype Item
    // protocol body goes here
}
```

위에서 `Item`은 [Type Parameter] 의 `Dictionary<Key, Value>`, `Array<Element>`, `<T>`와 같이
Protocol 을 정의할 때 사용할 *이름을 제공*하는 반면 *Type 은 실제 채택될 때 정해지도록 판단을 미룬다*.

> Protocol 은 함수의 return type 으로 사용될 수 있지만, Associated Types 를 갖고 있는 Protocol 은 return type 으로
> 사용될 수 없다. 이에 대해서는 다음 챕터의
> [Protocol Has an Associated Type Cannot Use as the Return Types](#h-protocol-has-an-associated-type-cannot-use-as-the-return-types)
> 에서 설명한다. 이 문제를 해결하기 위해 우리는 잠시 후
> [Using a Protocol in Its Associated Type’s Constraints](#h-using-a-protocol-in-its-associated-types-constraints)
> 와 같이 명확한 Type 을 반환하도록 함수의 로직을 변경하거나, 이것이 불가능할 경우,
> [Opaque Types](#h-opaque-type-resolve-the-problem-that-protocol-has-an-associated-types)
> 를 사용할 수 있다.

따라서 Associated Types 역시 Generic Types 와 마찬가지로

```swift
protocol IntContainer {
    mutating func append(_ item: Int)
    var count: Int { get }
    subscript(i: Int) -> Int { get }
}

protocol StringContainer {
    mutating func append(_ item: String)
    var count: Int { get }
    subscript(i: Int) -> String { get }
}
```

<span id="simpleContainer">와 같은 문제를 해결해 <span style="color: red;">하나의 정의로 재사용</span> 할 수 있게 한다.<span>

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

#### Associated Types in Action

이번에는 위에서 정의한 [Container](#simpleContainer) Protocol 을 실제로 채택하는 것을 살펴보자.
<br>

__1 ) Nongeneric IntStack Type adopts and conforms to the Container Protocol__

```swift
struct IntStack {
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        items.removeLast()
    }
}
```

[Generic Types](#h-generic-types) 에서 정의한 *Nongeneric IntStack Type* 에
[Container](#simpleContainer) Protocol 을 채택하고 준수하도록 만들어보자.

```swift
struct IntStack: Container {
    // original IntStack implementation
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        items.removeLast()
    }
    
    // conformance to the Container protocol
    typealias Item = Int
    mutating func append(_ item: Int) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Int {
        items[i]
    }
}
```

> `typealias Item = Int`는 Swift 의 Type Inference 에 의해 유추 가능하기 때문에 생략 가능하다.

<br>

__2 ) Generic Stack Type adopts and conforms to the Container Protocol__

```swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}
```

이번에는 [Container](#simpleContainer) Protocol 을 위에서 정의했던 Generic Stack 에 채택해보자.

```swift
struct Stack<Element>: Container {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }

    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
}
```

```swift
var intStack = Stack(items: [3, 2, 5])
intStack.push(8)
print(intStack)         // Stack<Int>(items: [3, 2, 5, 8])

intStack.append(7)
print(intStack)         // Stack<Int>(items: [3, 2, 5, 8, 7])

print(intStack.count)   // 5
print(intStack[3])      // 8


var stringStack = Stack<String>()
stringStack.push("uno")
stringStack.append("dos")
stringStack.push("tres")
stringStack.append("cuatro")

print(stringStack)      // Stack<String>(items: ["uno", "dos", "tres", "cuatro"])
print(stringStack[1])   // dos
```

이제 Stack 은 Int, String 두 타입 모두에서 Associated Types 를 이용한 Container Protocol 까지 준수한다.

#### Extending an Existing Type to Specify an Associated Type

[Adding Protocol Conformance with an Extension](#h-adding-protocol-conformance-with-an-extension)
에서 설명한 것처럼 Protocols 에 준수성(conformance)를 추가하기 위해 기존 Type 을 확장할 수 있는데 이때
*Associated Types* 가 있는 Protocols 를 포함한다.

Swift 의 `Array`는 이미 `append(_:)` method, `count` property, Int index 로 Element 를 조회하는 `[i]` subscript
를 제공한다. 이것은 위에서 [Container](#simpleContainer) protocol 을 통해 적합성을 추가한 것과 일치한다.
즉, [Declaring Protocol Adoption with an Extension](#h-declaring-protocol-adoption-with-an-extension)
에서 설명한 것처럼 `Array 에 이미 적합성을 준수하는 구현이 존재하기 때문에 Extension 을 이용해 Protocols 를 채택하고
비워두는 것 만으로 Array 에 Container Protocol 적합성을 추가`할 수 있다.

```swift
var numbers = [1, 2, 5, 7, 8, 14]

numbers.append(99)
print(numbers)          // [1, 2, 5, 7, 8, 14, 99]
print(numbers.count)    // 7
print(numbers[2])       // 5
```

Array 는 이미 [Container](#simpleContainer) Protocol 의 구현을 제공하고있다.

<br>

```swift
if numbers is any Container {
    print("numbers conforms the Container protocol.")
} else {
    print("numbers do not conform the Container protocol.")
}
```

```console
numbers do not conform the Container protocol.
```

하지만 [Container](#simpleContainer) Protocol 을 채택하지 않았기 때문에 [Container](#simpleContainer) Protocol
을 준수하지는 않는다.

<br>

Array 를 확장해 [Container](#simpleContainer) Protocol 을 채택하는 것 만으로 적합성을 추가할 수 있다.

```swift
extension Array: Container {}

if let _ = numbers as? any Container {
    print("numbers conforms the Container protocol.")
} else {
    print("numbers do not conform the Container protocol.")
}
```

```console
numbers conforms the Container protocol.
```

#### Adding Constraints to an Associated Type

Protocols 를 채택한 Types 에 특정 요구사항을 준수하도록 하기 위해 *constraints* 를 추가할 수 있다.

__Syntax__

```swift
protocol SomeProtocol {
    associatedtype Item: Equatable
    // protocol body goes here
}
```

<br>

우선 Swift 의 기본 Array Type 의 작동을 살펴보자.

```swift
var arrayA = [1, 5, 6]
var arrayB = [1, 5, 6]

print(arrayA == arrayB) // true

var arrayC = ["A", "B", "C"]
var arrayD = ["A", "C", "B"]

print(arrayC == arrayD) // false
```

Array Type 은 *Equatable* 을 준수하기 때문에 위와 같은 비교가 가능하다.

그렇다면 이 Array 를 담은 Structure 는 어떨까?

```swift
struct Some<Element> {
    var items: [Element] = []
}
```

![Structure Stored Array](/assets/images/posts/2023-02-23-generics/structure-stored-array.png){: width="800"}

Structure 가 저장하고 있는 Array 는 Equatable 을 준수하더라도 Structure 는 이를 준수하지 않기 때문에 Equatable 을 준수하도록
해야한다.

![Structure Conform Equatable](/assets/images/posts/2023-02-23-generics/structure-conform-equatable.png){: width="800"}

Structure 에 Equatable 을 추가했다. 이로써 Structure 는 Equatable 을 준수할 수 있어야하지만, Element 가 이미 Equatable
을 준수하는 Int, Double, String 같은 Swift 의 Basic Types 가 아닌 Generic Types 이므로, 이에 대한 Equatable 준수
또한 필요하다.

```swift
struct Some<Element: Equatable>: Equatable {
    var items: [Element] = []

    static func == (lhs: Some<Element>, rhs: Some<Element>) -> Bool {
        lhs.items == rhs.items
    }
}
```

이로써 우리는 ***Generic Types Element 에 Equatable 을 준수***하도록 하고,
***Structure 역시 Equatable 을 준수***하도록 함으로써 `==` operator 를 사용할 수 있게 된다.

```swift
var structureA = Some(items: [1, 5, 6])
var structureB = Some(items: [1, 5, 6])

print(structureA == structureB) // true

var structureC = Some(items: ["A", "B", "C"])
var structureD = Some(items: ["A", "C", "B"])

print(structureC == structureD) // false
```

<br>

이번에는 위에서 정의한 Container Protocol

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

의 <span style="color: red;">**Associated Types** 에 *constraints* 를 추가</span>해 다음과 같이 바꿔보자.

```swift
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

이제 이 Protocol 을 준수하려면 ***Item Type 은 Equatable 을 준수***해야한다. Stack 이 Container Protocol 을
준수하도록 해보자.

```swift
struct Stack<Element: Equatable>: Container {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
    
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
    
    // conformance to the Equatable protocol
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}
```

```swift
var someStack = Stack(items: [3, 2, 5])
var anotherStack = Stack(items: [3, 2, 5])

print(someStack == anotherStack)    // true
```

이로써 Container Protocol 의 Item 에 Equatable constraints 를 추가해 채택하는 Types 가 이를 준수하도록 구현을 강제한다.

<br>

참고로 위 Container 준수는 다음과 같이 Protocols 채택을 Extensions 로 분리해 코드를 더 명확히 구분지을 수 있다.

```swift
struct Stack<Element: Equatable> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}

extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }

    // conformance to the Equatable protocol
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}
```

#### Using a Protocol in Its Associated Type’s Constraints

Protocols 를 정의할 때 자기 자신의 일부로 존재할 수 있다.

```swift
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

`SuffixableContainer` Protocol 은 내부 정의에 자기 자신을 포함(`Suffix: SuffixableContainer`)하고있다. 이 Protocol
에서 `Suffix`는 2개의 *constraints* 를 갖고 있다.

1. Suffix 는 `SuffixableContainer` protocol 을 준수해야한다.
2. Suffix 의 `Item` type 은 `Container's Item` type 과 동일해야한다

> 여기서 주의해야 할 것이 `Suffix.Item == Item`이 **Item 의 값이 같음을 의미하는 것이 아니라는 것**이다. 이것은 어디까지나
> `associatedtype`을 정의하는 것이므로 `Type 의 일치`를 의미한다.

Item 에 대한 *constraints* 는 아래
[Associated Types with a Generic Where Clause](#h-associated-types-with-a-generic-where-clause)
에서 설명할 *Generic where* clause 다.

<br>

SuffixableContainer 를 채택하도록 Stack 을 한 번 더 확장해보자.

```swift
extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> some SuffixableContainer {
        // code
    }
    func last() -> (some SuffixableContainer).Item {
        // code
    }
}
```

> `func suffix(_ size: Int) -> Suffix`의 **return type** 은 [Opaque Types](#h-returning-an-opaque-type)
> `some SuffixableContainer`으로써, 이 Protocol 의 일부여야한다.  
> `func last() -> Suffix.Item`의 **return type** 은 [Opaque Types](#h-returning-an-opaque-type)
> `(some SuffixableContainer).Item`으로써, 이 Protocol 의 일부의 Item 이어야한다.
>
> 그리고 `Container Protocol 과 이것을 채택한 Stack<Element> 의 관계`를 보자.
>
> `Container Type 은 곧 이것을 준수하는 Stack<Element>: Container Type 을 의미`하고,   
> `Item 은 Element Type 을 의미`한다.
>
> 따라서 `SuffixableContainer 의 Type 은 곧 Stack<Element>: Container, SuffixableContainer Type 을 의미`하고,  
> `Suffix.Item 은 Element Type 을 의미`한다.

이제 확장을 이용해 Stack 이 이를 준수하도록 `Default Implementations`를 작성해 완성시켜보자.

```swift
extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Element> {
        var result = Stack()
        for index in (count - size)..<count {
            result.append(self[index])
        }
        return result
    }
    func last() -> Element {
        self[count - 1]
    }
    // Inferred that Suffix is Stack.
}
```

반환할 Type 이 명확하므로 자동 완성된 [Opaque Types](#h-returning-an-opaque-type) 대신 반환 Type 을 명시적으로 변경했다.

```swift
var someStack = Stack<Int>()
someStack.push(3)
someStack.append(5)
someStack.push(7)
someStack.append(9)

print(someStack.suffix(2))  // Stack<Int>(items: [7, 9])
print(someStack.last())     // 9
```

### Generic Where Clauses

#### Syntax

[Type Constraints](#h-type-constraints) 에서 Type 에 *constraints* 를 추가하는 것이 유용할 수 있음을 보았다.
마찬가지로 *Associated Types* 역시 `Generic Where Clauses`를 정의해 Types 에 *constraints* 를 추가할 수 있다.  
위에서 살펴본 것처럼 `where` keyword 뒤에 작성하며, `Associated Types 자체에 대한 constraints` 또는
`Types 와 Associated Types 의 equality 관계에 대한 constraints`가 따른다.

> **Associated Types** 는 **Generic Types** 의 Protocols 버전과 같았다.   
> [Adding Constraints to an Associated Type](#h-adding-constraints-to-an-associated-type) 이
> Protocols 를 정의할 때 Associated Types 에 **constraints** 를 추가하는 것이었다면, **Generic Where Clauses**
> 는 <span style="color: red;">Generic Types 에 채택된 Protocols 의 Associated Types 에
> **constraints** 를 추가하는 것</span>이다.

<br>

*Generic Where Clauses* 는 Type 또는 Function's Body 의 curly brace `{ }` 앞에 온다.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

```swift
func allItemsMatch<C1: Container, C2: Container>(_ containerA: C1, _ containerB: C2) -> Bool
where C1.Item: Equatable, C1.Item == C2.Item
{
    // Check that both containers contain the same number of items.
    if containerA.count != containerB.count {
        return false
    }

    // Check each pair of items to see if they're euivalent.
    for i in 0..<containerA.count {
        if containerA[i] != containerB[i] {
            return false
        }
    }

    // All items match, so return true.
    return true
}
```

> Type Parameters 에 정의된 요구사항은 다음과 같다.
>
> - C1 은 Container Protocol 을 준수해야한다.
> - C2 는 Container Protocol 을 준수해야한다.
>
> Generic Where Clauses 에 정의된 요구사항은 다음과 같다.
>
> - C1.Item 은 Equatable Protocol 을 준수해야한다.
> - C1.Item 은 C2.Item 과 동일 Type 이어야한다.  
    (위에서 where clauses 의 Suffix.Item 의 경우와 마찬가지로, 값의 일치가 아닌 Item 이라는 Types 의 일치를 의미한다)

이는 C1 과 C2 모두 Container Protocol 을 준수하고 있고, Items 가 Equatable Protocol 을 준수하고 두 Types 가 같다면
작동한다는 것이다. 즉, C1 과 C2 가 동일 Types 이어야 한다는 조건은 없다는 말이다!

따라서 위에서 정의한

```swift
static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
    lhs.items == rhs.items
}
```

와 달리 `allItemsMatch(_:_:)` 메서드는 서로 다른 Types 간의 비교가 가능하다.

우선 Swift Array 를 우리가 정의한 `Container` protocol 을 준수하도록 확장해야한다. 그런데 `Array 의 Element 는
Equatable 을 준수하지 않는다`. 따라서 다음 두 가지 방법으로 정의를 할 수 있다.

#### Generic Where Clauses in Action

__1 ) Case 1 - Swift 의 Built-in Type 인 Array 의 Element 를 Equatable Protocol 을 준수하도록 제한__

위에서 우리가 만든 Container 를 그대로 사용하기 위한 방법이다.

- Protocols

```swift
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

- Stack

```swift
struct Stack<Element: Equatable> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}

extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }

    // conformance to the Equatable protocol
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}

extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Element> {
        var result = Stack()
        for index in (count - size)..<count {
            result.append(self[index])
        }
        return result
    }
    func last() -> Element {
        self[count - 1]
    }
    // Inferred that Suffix is Stack.
}
```

Stack 은 Container Protocol 의 Item 이 Equatable Protocol 을 준수하도록 하기 위해 반드시 `==(lhs:rhs:) -> Bool`
메서드를 구현해야한다.

- Array

```swift
extension Array: Container where Element: Equatable  {}
```

Swift 의 Built-in Type Array 에 `Element 가 Equatable Protocol 을 준수해야한다는 constraints 가 Global 로
추가`되었다.

<br>

__2 ) Case 2 - Swift 의 Built-in Type 인 Array 의 Element 에 constraints 추가 없이 준수하도록 Container Protocol 을 수정__

위 Case 1 이 갖는 문제점은 Swift 의 Element 에 *constraints* 를 추가함으로써 결국 `Swift Array 에 대한 Global
constraints 가 추가`된다는 것이다. 확장을 이용해 *Built-in Types 의 기능을 추가하는 것은 별로 문제가 되지 않지만*
위와 같이 ***제약 조건을 추가해서 기능을 제한시키는 것은 `코드의 유연성을 떨어뜨리며` 이를 예상하지 못한 앱의 다른 부분의 코드나
외부 라이브러리에서 에러가 발생되는 `side effect` 의 원인***이 될 수 있으므로 좋은 방법이 아니다.

따라서 우리는 위에서 *Container 의 Item 에 추가했던 Equatable Protocol 제약 사항을 다시 제거*하고 Stack 에서 필요한 메서드를
`Protocol 에 의한 강제성 없이 구현`하는 방법으로 코드를 유연하게 만들 수 있다.

- Protocols

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

이제 더 이상 Container 는 Item 에 Equatable Protocol 을 준수하도록 강요하지 않는다.

- Stack

```swift
struct Stack<Element: Equatable> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}

extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
}

extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Element> {
        var result = Stack()
        for index in (count - size)..<count {
            result.append(self[index])
        }
        return result
    }
    func last() -> Element {
        self[count - 1]
    }
    // Inferred that Suffix is Stack.
}
```

이제 Stack 의 `==(lhs:rhs:) -> Bool` 메서드는 더 이상 Protocol 의 요구사항을 준수하기 위해 구현을 강요받지 않는다. 따라서
기능 제공을 위해 Stack 이 자체적으로 이 메서드를 제공하도록 구현했다.

- Array

```swift
extension Array: Container {}
```

Array 에 우리가 정의한 Container 를 준수하는 Types 로 사용할 수 있도록 기능이 추가되었을 뿐
기존 `Built-in Type Array 에 어떠한 constraints 도 추가하지 않는다`.


<br>

이제 `==` 메서드와 `allItemsMatch(_:_:)` 함수를 테스트해보자.

```swift
var someStack = Stack(items: [3, 2, 5])
var anotherStack = Stack(items: [3, 2, 5])
var someArray = [3, 2, 5]

print(someStack == anotherStack)            // true
print(someStack == someArray)               // error: Cannot convert value of type 'Stack<Int>' to expected argument type '[Int]'

print(allItemsMatch(someStack, someArray))  // true
```

#### Extensions with a Generic Where Clause

위에서 `extension Array: Container where Element: Equatable  {}`와 같이 *Generic Where Clauses* 는
*Extensions* 의 일부로 사용될 수 있다.

위 Case 2 에서 정의한 Stack 이다.

```swift
struct Stack<Element: Equatable> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}
```

위 Stack 을 *Extension* 에 *Generic Where Clauses* 를 이용해 다음과 같이 코드의 관심사를 분리시킬 수 있다.

```swift
struct Stack<Element> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}

extension Stack where Element: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}
```

<br>

이제 분리된 관심사에 *Element 가 Equatable 을 준수하는 것에 대한 코드만 따로 정의*해보자.

```swift
extension Stack where Element: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }

    func startsWith(_ item: Element) -> Bool {
        guard let startItem = items.first else { return false }
        return startItem == item
    }

    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else { return false }
        return topItem == item
    }
}
```

위 코드는 Stack 이 Container Protocol 을 채택하는 것과 무관하게 작동한다. 위 확장이 추가하는 3개의 메서드를 보면
`==(lhs:rhs:)`와 달리 `startsWith(_:)` 메서드와 `isTop(_:)` 메서드는 Stack 에 대해 몰라도 Element 만으로 작동할
수 있다. 만약 이 *두 메서드를 Container Protocol 쪽에서 정의하도록 관심사를 옮기고 싶다면* Container Protocol 의 Item 에
Equatable Protocol 준수성을 추가하는 대신 *Container Protocol 에 Extensions 를 이용해 다음과 같이 분리*시킬 수 있다.

```swift
extension Stack where Element: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}

extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        count >= 1 && self[0] == item
    }
    
    func isTop(_ item: Item) -> Bool {
        count >= 1 && self[count - 1] == item
    }
}
```

위 2개를 각각 Case 3 과 Case 4 이라 부르도록 하자. 코드를 정리하면 다음과 같다.

__3 ) Case 3__

- Protocols

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

- Stack

```swift
struct Stack<Element> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}

extension Stack where Element: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }

    func startsWith(_ item: Element) -> Bool {
        guard let startItem = items.first else { return false }
        return startItem == item
    }

    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else { return false }
        return topItem == item
    }
}

extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
}

extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Element> {
        var result = Stack()
        for index in (count - size)..<count {
            result.append(self[index])
        }
        return result
    }
    func last() -> Element {
        self[count - 1]
    }
    // Inferred that Suffix is Stack.
}
```

- Array

```swift
extension Array: Container {}
```

<br>

__4 ) Case 4__

- Protocols

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        count >= 1 && self[0] == item
    }

    func isTop(_ item: Item) -> Bool {
        count >= 1 && self[count - 1] == item
    }
}

protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

`extension Stack where Element: Equatable`의 일부로 존재하던 `startWith(_:)` 메서드와 `isTop(_:)` 메서드가 이제
`extension Container where Item: Equatable`의 일부로 존재한다.

- Stack

```swift
struct Stack<Element> {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        items.removeLast()
    }
}

extension Stack where Element: Equatable {
    static func == (lhs: Stack<Element>, rhs: Stack<Element>) -> Bool {
        lhs.items == rhs.items
    }
}

extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
}

extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Element> {
        var result = Stack()
        for index in (count - size)..<count {
            result.append(self[index])
        }
        return result
    }
    func last() -> Element {
        self[count - 1]
    }
    // Inferred that Suffix is Stack.
}

```

- Array

```swift
extension Array: Container {}
```


<br>

`startsWith(_:)` 메서드와 `isTop(_:)` 메서드를 사용해보자.

```swift
var someStack = Stack<Int>()
var anotherStack = Stack(items: [3, 2, 5])

print(someStack.startsWith(3))      // false
print(anotherStack.startsWith(2))   // false
print(anotherStack.startsWith(3))   // true

print(someStack.isTop(5))           // false
print(anotherStack.isTop(4))        // false
print(anotherStack.isTop(5))        // true
```

#### Contextual Where Clauses

Contextual Where Clauses

우리는 위 `Case 3`과 `Case 4`에서 *Generic Where Clauses* 를 이용해 *constraints* 를 이용해 조건에 일치할 경우에만
작동하는 *Extensions* 를 정의했다.

Case 4 에서 Container Protocol 에 사용한 확장을 다시 한 번 보자.

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        count >= 1 && self[0] == item
    }

    func isTop(_ item: Item) -> Bool {
        count >= 1 && self[count - 1] == item
    }
}
```

이 코드는 `Container Protocol 을 채택한 Types 중 Item 이 Equatable 을 준수하는 경우에만 적용되는 Extension`이다.

그리고 우리는 이런 *constraints* 를 이용해 조건부로 적용할 요구사항을 Extensions 이 아닌 Context 내에 정의할 수도 있다.
이것을 `Contextual Where Clauses`라 한다.

<br>

- [Extensions with a Generic Where Clause](#h-extensions-with-a-generic-where-clause)

```swift
extension Container where Item == Double {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
}
```

- [Contextual Where Clauses](#h-contextual-where-clauses)

```swift
extension Container {
    func average() -> Double where Item == Int {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
}
```

위에서 Container Protocol 을 준수하는 Types 중

- Item 이 Double 인 경우, `Extensions with a Generic Where Clause`를 이용해 기능을 추가하고,
- Item 이 Int 인 경우, `Contextual Where Clauses`를 이용해 기능을 추가한다.

그리고 이 둘은 동일하게 작동한다.

```swift
var intStack = Stack(items: [3, 2, 5])
var doubleArray = [3.0, 2.0, 5.0]

print(intStack.average())       // 3.3333333333333335
print(doubleArray.average())    // 3.3333333333333335
```

#### Associated Types with a Generic Where Clause

위에서 우리는 이미 *SuffixableContainer* Protocol 을 정의할 때 *Associated Types 에 Generic Where Clause 를
사용*한 적이 있다.  
(i.e. `associatedtype Suffix: SuffixableContainer where Suffix.Item == Item`)

다만 위에서는 자기 자신의 일부로써 Associated Type 을 정의해 Container Protocol 과의 연결을 위해 사용했다. 이번에는
Associated Type 에 *Generic Where Clauses* 를 적용하는 좀 더 일반적인 예를 하나 추가해보자.

```swift
var someStack = Stack(items: [9, 2, 5, 7, 3, 4, 2])

for element in someStack {  // error: For-in loop requires 'Stack<Int>' to conform to 'Sequence'
    print(element)
}
```

사용자 정의 Type 인 Stack 은 Structure 를 기반으로 하기 때문에 Iterator 를 준수하지 않아 반복을 사용할 수 없다. 우리가
정의한 Stack 이 반복을 할 수 있도록 만들어보자.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }

    associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
    func makeIterator() -> Iterator
}
```

새로 추가된 Associated Type 인 *Iterator* 는 `IteratorProtocol 을 준수하며, 이것의 Element 의 Type 은 Item 의
Type 과 동일`해야한다.

이제 Container Protocol 을 준수하는 Stack 은 `makeIterator()`를 구현해 준수하도록 해야한다.

```swift
extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
    func makeIterator() -> IndexingIterator<[Element]> {
        items.makeIterator()
    }
}
```

```swift
var iteratorStack = someStack.makeIterator()
print(iteratorStack)

print("")

for element in iteratorStack {
    print(element, terminator: ", ")
}

print("")

while let element = iteratorStack.next() {
    print(element, terminator: ", ")
}
```

```console
IndexingIterator<Array<Int>>(_elements: [9, 2, 5, 7, 3, 4, 2], _position: 0)

9, 2, 5, 7, 3, 4, 2, 
9, 2, 5, 7, 3, 4, 2, 
```

이제 Stack 은 `makeIterator()` 메서드를 사용해 `Container 의 Iterator 에 대한 접근을 제공`한다.

<br>

__Separate Code__

이제 위 코드를 다시 관심사를 분리시켜보도록 하자. Container 에서 Iterable 관련된 코드를 분리할 것이다.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}

protocol IterableContainer: Container where Iterator.Element == Item {
    associatedtype Iterator: IteratorProtocol
    func makeIterator() -> Iterator
}
```

*Container* Protocol 에서 Iterable 관련 요구사항을 분리해 별도의 *IterableContainer* Protocol 로 만들고,
[Contextual Where Clauses](#h-contextual-where-clauses) 대신
[Extensions with a Generic Where Clause](#h-extensions-with-a-generic-where-clause) 를 사용하도록
변경했다.

따라서 Stack 은 Protocol 각각 Protocol 별로 채택하거나

```swift
extension Stack: Container {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }
}

extension Stack: IterableContainer {
    // conformance to the IterableContainer protocol
    func makeIterator() -> IndexingIterator<[Element]> {
        items.makeIterator()
    }
}
```

Stack 이 반드시 *IterableContainer* Protocol 을 준수해야할 경우 이는 *Container* Protocol 을 준수성을 포함하므로
*IterableContainer* Protocol 을 채택할 때 한 번에 구현하는 것도 가능하다.

```swift
extension Stack: IterableContainer {
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        items.count
    }
    subscript(i: Int) -> Element {
        items[i]
    }

    // conformance to the IterableContainer protocol
    func makeIterator() -> IndexingIterator<[Element]> {
        items.makeIterator()
    }
}
```

위와 마찬가지로

```swift
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

역시 다음과 같이 [Extensions with a Generic Where Clause](#h-extensions-with-a-generic-where-clause) 로
변경할 수 있다.

```swift
protocol SuffixableContainer: Container where Suffix.Item == Item {
    associatedtype Suffix: SuffixableContainer
    func suffix(_ size: Int) -> Suffix
    func last() -> Suffix.Item
}
```

> **IterableContainer** Protocol 을 정의한 것처럼 다양한 요구사항을 Container Protocol 을 준수하는 다양한 하위
> Protocols 를 정의할 수 있다. 다음은 Comparable 을 준수하도록 하는 **ComparableContainer** Protocol 을 정의하기
> 위해 다음과 같이 추가할 수 있다.
>
> ```swift
> protocol ComparableContainer: Container where Item: Comparable { }
> ```


#### Generic Subscripts

*Subscripts* 는 Generic 일 수 있고, 이것은 *Generic Where Clauses* 를 포함할 수 있다. 기존에 *Container* Protocol
의 요구사항을 준수하도록 하기 위해 *Stack* 은 Int Type 의 단일 index 를 받아 반환하는 코드를 구현했다.

```swift
var stringStack = Stack(items: ["A", "D", "C", "K", "G", "B", "O", "Q"])
var intStack = Stack(items: [7, 23, 3, 17, 62, 5, 13, 34])

print(stringStack[2])       // C
print(stringStack[5])       // B
print(stringStack[2...5])   // error: Cannot convert value of type 'ClosedRange<Int>' to expected argument type 'Int'

print(intStack[3])          // 17
print(intStack[5])          // 5
print(intStack[3..<6])      // error: Cannot convert value of type 'Range<Int>' to expected argument type 'Int'
```

*Container* Protocol 의 요구사항은 `subscript(i: Int) -> Item { get }`이었기 때문에 *subscript*는 `Int` Type
만 Parameters 로 허용된다. 따라서 `[2...5]`와 같은 `Sequence`는 사용할 수가 없다.

`Parameters 를 Int Type 의 Sequence 로 받는 subscript`를
[Protocol Extensions - Providing Default Implementations](#h-providing-default-implementations) 를
이용해 추가적으로 제공해보자.

```swift
extension Container {
    subscript<Indices: Sequence>(indices: Indices) -> [Item]
    where Indices.Iterator.Element == Int {
        var result: [Item] = []
        for index in indices {
            result.append(self[index])
        }
        return result
    }
}
```

- Generic Parameter `Indices` 는 Standard Library `Sequence` Protocol 을 준수해야한다.
- Parameter 는 `Indices` Type 의 *Single Parameter* `indices`를 받는다.
- *Generic Where Clauses* 에 의해 `Sequence 의 Iterator 의 Element`는 `Int` Type 과 동일해야한다.
- Subscripts 구현에 의해 `Sequence 의 Iterator 는 indices 로 주어진 Int Type 의 Element 를 통과(traverse)`해야한다.

<br>

이제 단일 index 및 연속된 indices 모두에서 작동한다.

```swift
var stringStack = Stack(items: ["A", "D", "C", "K", "G", "B", "O", "Q"])
var intStack = Stack(items: [7, 23, 3, 17, 62, 5, 13, 34])

print(stringStack[2])       // C
print(stringStack[5])       // B
print(stringStack[2...5])   // ["C", "K", "G", "B"]

print(intStack[3])          // 17
print(intStack[5])          // 5
print(intStack[3..<6])      // [17, 62, 5]
```

지금까지 *Generic*, *Associated* 와 *Extensions* 를 사용해 코드를 관심사별로 분리하고, 재사용성을 고려해 유연한 코드를
만들어보았다. 이것을 한 번에 정리해둔 코드는 [Generic, Associated, Where and Subscripts Summary] 을 참고한다.

---

## 23. Opaque Types 👩‍💻

### The Problem That Opaque Types Solve

[Generics](#h-using-a-protocol-in-its-associated-types-constraints) 에서 `Opaque Types`를 사용했다. 
`Opaque Types`는 함수 또는 메서드의 *return type* 을 `Type`이 아닌 `some Type`으로 바꿔 Type 의 일부임을
암시할 뿐 명확한 Type 정보를 감춘다.

이렇게 자세한 정보를 감추는 것은 `모듈`과 `모듈을 호출하는 코드` 사이의 `경계(boundaries)`에서 유용하다. *Protocol Type* 의 값을
반환하는 것과 달리 *Opaque Type* 은 `Type Identity`를 유지한다(*Compiler* 는 Type 의 정보에 접근할 수 있지만, 모듈의
클라이언트는 접근할 수 없다).

#### Nonopaque Types

```swift
protocol Shape {
    func draw() -> String
}
```

<br>

__1 ) Triangle__

```swift
struct Triangle: Shape {
    var size: Int
    func draw() -> String {
        var result: [String] = []
        for length in 1...size {
            result.append(String(repeating: "*", count: length))
        }
        return result.joined(separator: "\n")
    }
}
```

```swift
let smallTriangle = Triangle(size: 3)
print(smallTriangle.draw())
```

```console
*
**
***
```

<br>

__2 ) <span id="flippedShape">FlippedShape</span>__

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

Generic Types 를 이용해 `FlippedShped` Structure 를 구현했다. 그러나 여기에는 **중요한 제약**이 있는데,
`뒤집힌 결과(flipped result)를 생성하는데 사용된 Exact Generic Type 을 노출(expose)`시킨다.

```swift
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
```

```console
***
**
*
```

모듈 사용자가 알아야 하는 것은 모듈 사용자가 제공받기로 한 `Shape` protocol 의 무언가 (이 경우 `draw()` 메서드)뿐이다.   
그런데 *Shape* Protocol 을 준수하도록 `draw()`를 제공하기 위해 Structure *flippedTriangle* 를 그대로 노출하면 여기 사용된
`Wrapper` 인 `FlippedShape`가 그대로 노출된다(= 뒤집힌 결과를 생성하는데 사용된 Exact Generic Type 을 노출시킨다).

```swift
print(flippedTriangle.shape)        // Triangle(size: 3)
```

> `Wrapper`의 Exact Generic Type 이 노출되어 불필요한 정보(FlippedShape 의 'shape' Property)가 노출된다.

<br>

__3 ) <span id="joinedShape">JoinedShape</span>__

이번에는 *Shape* Protocol 을 준수하는 2개의 *shape* 을 결합하는 Structure 를 정의해보자.

```swift
struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
        top.draw() + "\n" + bottom.draw()
    }
}
```

`JoinedShape<T: Shape, U: Shape>` structure 는 2개의 *shapes* 를 수직으로 결합한다.

이것은 아레의 코드와 같이 *Flipped Triangle* 을 *Another Triangle* 과 결합해
`JoinedShape<FlippedShape<Triangle>, Triangle>`과 같은 *return type* 을 생성한다.

```swift
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
```

```console
*
**
***
***
**
*
```

*shape* 를 생성하는 것에 대해 자세한 정보를 노출하면, `Full Return Type`을 명시해야하기 때문에 *ASCII 그림 모양을 그리는 모듈의
public interface 에 포함되지 않은 Type 이 유출될 수 있다*.

```swift
print(joinedTriangles.top)          // Triangle(size: 3)
print(joinedTriangles.bottom)       // FlippedShape<Triangle>(shape: __lldb_expr_38.Triangle(size: 3))
```

> **모듈 내의 코드는 다양한 방법으로 같은 모양을 만들 수 있으며, 모듈 외부의 다른 코드는 이 모듈의 구현 목록과 같은 세부 정보를 알 필요가 없다**.
>
> 따라서 [FlippedShape](#flippedShape), [JoinedShape](#joinedShape) 와 같은 `Wrapper Types`는 모듈 사용자에게
> 중요하지 않으며, `표시되지 않아야한다`. 모듈의 public interface 는 **shape** 을 결합하거나 뒤집는 것과 같은 작업으로 구성되며, 이러한
> 작업은 또 다른 `Shape` 값을 반환한다.

#### Opaque Types

*Opaque Types* 는 *Generic Types* 의 반대로 생각할 수 있다.

*Generic Types* 를 사용하면, 함수는 추상화된 방식(abstracted away)으로 값을 반환할 수 있으며, `return type 은 함수가 호출될 때
결정`된다.

```swift
func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }
```

`max(_:_:)` 함수는 호출하는 코드의 x, y 값에 따라 `T`의 Type 이 정해지고, 이 `T`는 `Comparable` protocol 을 준수하는 어떤
Types 나 사용 가능하다.

반면 *Opaque Types* 를 반환하는 함수의 경우 이러한 역할이 반전된다. *Opaque Types* 를 사용하면, 함수를 호출하는 코드로부터 추상화된
방식으로 `함수의 구현에서 return type 을 선택`할 수 있다.

위에서 [FlippedShape](#flippedShape), [JoinedShape](#joinedShape) 를 그대로 노출해 다른 정보가 노출되었는데
`Shape` protocol 이 제공하기로 약속한 `draw()`만 노출되면 되므로

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

와 같이 [FlippedShape](#flippedShape), [JoinedShape](#joinedShape) 로부터 *return type* 을 선택해
불필요한 정보를 포함하지 않는 간단한 형태로 Wrapping 된 값을 제공해야한다.

> Opaque Types 를 return type 으로 정의할 때 가능한 Types 는 다음과 같다.  
> `An 'opaque' type must specify only 'Any', 'AnyObject', protocols, and/or a base class`

<br>

다음 예제를 위해 사각형을 그리는 `Square` structure 를 추가로 정의하자.

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}
```

다음 예제에서 함수 `makeTrapezoid()`는 *shape* 의 명확한 Type 없이 사다리꼴(trapezoid)을 반환한다.  
(사용자에게 *Triangle, Square, FlippedShape, JoinedShape* 의 Exact Generic Type 이 노출되지 않는다.)

```swift
func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(
        top: top,
        bottom: JoinedShape(top: middle, bottom: bottom)
    )
    return trapezoid
}
```

```swift
let trapezoid = makeTrapezoid()
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```

<br>

그렇다면 [Nonopaque Types](#h-nonopaque-types) 에서 정의한 [JoinedShape](#joinedShape) 와 뭐가 다를까? 
한번 비교해보도록 하자.

![Nonopaque Return Type](/assets/images/posts/2023-02-27-opaque-types/nonopaque-return-type.png){: width="800"}

```swift
print(joinedTriangles.top)      // Triangle(size: 3)
print(joinedTriangles.bottom)   // FlippedShape<Triangle>(shape: __lldb_expr_38.Triangle(size: 3))
```

모듈의 사용자는 `draw()`의 결과만 알면 된다. 그런데 `JoinedShape`는 *Shape* Protocol 을 준수하는 Structure 자체를 정의하기
때문에 *이를 구현하는데 사용된 Exact Generic Type `JoinedShape`가 노출되어 이것이 갖는 `top`과 `bottom`에 대한 정보까지
노출시킨다*. 위에서도 이미 설명했듯이 [FlippedShape](#flippedShape), [JoinedShape](#joinedShape) 와 같은
`Wrapper Types`는 모듈 사용자에게 중요하지 않으며, `표시되지 않아야`하는데 Structure 를 그대로 반환하기 때문에 불필요한 정보가 노출된다.

<br>

![Before Opaque Return Type](/assets/images/posts/2023-02-27-opaque-types/before-opaque-return-type.png){: width="800"}

`makeTrapezoid()` 역시 함수 내부에서는 `JoinedShape`가 생성한 Structure 로부터 `top`과 `bottom`에 접근 가능하지만

![Opaque Return Type 1](/assets/images/posts/2023-02-27-opaque-types/opaque-return-type-1.png){: width="800"}

<span style="color: red;">반환된 값에서는 접근할 수 없다</span>. `makeTrapezoid()`는 ***Return Type 을
Opaque Type 으로 `Wrapping`해 `Shape` protocol 을 준수하는 객체의 다른 정보를 노출시키지 않고 모듈의 사용자가 알아야 하는
`draw()`만 노출시킨다***.

### Returning an Opaque Type

위에서 `makeTrapezoid()` 함수는 *shape* 의 명확한 Type 없이 `some Shape`를 반환했다. 즉, `Shape` protocol 을 준수하는
Structures 의 Exact Generic Type 대신

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

형태로 `Wrapping`해 반환했다.

`An 'opaque' type must specify only 'Any', 'AnyObject', protocols, and/or a base class`를 다시 한 번 더
떠올려보자.

- Generic Types 가 해결하는 문제는 동일한 body 를 갖는 여러 cases 를 Type Inference 를 사용해 하나의 정의로 재사용함으로써 코드의
  중복을 최소화하는 방향으로 코드를 유연하게 만들었다.
- Opaque Types 가 해결하는 문제는 Types 의 불필요한 정보 노출을 방지(hiding)하는 것이다. 이를 위해 특정 `Type`을 반환하더라도
  위와 같이 그 `Type Object` 내에서 반환 하려는 단일 `Type Member`만 반환하도록 코드를 작성해야한다. 이것은 추상적인 합의의 결과라
  볼 수 있으며, 이 모듈을 개발하는 개발자와 *Compiler* 만 `Type Object`를 알 수 있다. 이 모듈을 사용하는 클라이언트는 단지
  매번 동일한 `Type Member`를 얻는다는 것만 알고 있으면 되고, 매번 동일한 Identity 를 반환하니 클라이언트는 이 *return type* 을
  더욱 신뢰하고 사용할 수 있게 된다.

> **Return Type** 으로 `Opaque Types`를 사용하는 함수가 여러 위치에서 반환되는 경우, <span style="color: red;">가능한 경우의
> 모든 Return Values 의 Type 은 동일</span>해야한다(all of the possible return values must have the same type).
>
> 이것은 [Generic Functions](#h-generic-functions) 의 경우 **Return Type** 에 
> [Generic Types](#h-generic-types) 를 사용할 수 있지만 그럼에도 불구하고 
> <span style="color: red;">Return Type `some Type`은 여전히 **Single Type** 이어야 함</span>을 의미한다.

#### Hiding with Generics

*Opaque Types* `some Shape`를 *return type* 으로 갖는 `flip(_:)`, `join(_:)` 함수를 추가로 구현해보자. 이번에는
`Generics`를 결합해도 *Opaque Types* 가 정상적으로 작동하는지 확인해본다.

```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    FlippedShape(shape: shape)
}

func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}
```

```swift
let smallTriangle = Triangle(size: 3)
let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
print(opaqueJoinedTriangles.draw())
```

```console
*
**
***
***
**
*
```

![Opaque Return Type 2](/assets/images/posts/2023-02-27-opaque-types/opaque-return-type-2.png){: width="800"}

> `flip(_:)`과 `join(_:)`에 의해 반환된 `opaqueJoinedTriangles` 역시 `draw()` 외에는 접근할 수 없다.

#### Always Return a Single Type

위에서 `Opaque Type 의 return type 은 Single Type`이어야 한다고 했다. 따라서 이번에는 이 요구사항을 위반하는 잘못된 case 를 살펴본다.

위 `flip(_:)` 함수를 보면 굳이 정사각형을 정의하는 `Square`는 뒤집지 않아도 될 것 같다. 그래서 `flip(_:)` 함수 안에서 *전달된
Shape 의 Type 이 Square 일 경우 그냥 반환하고, 그렇지 않을 경우에만 뒤집는 것으로 변경*하면 더 좋을거라 판단되어 코드를 수정한다고
가정해보자.

![Invalid Opaque Type](/assets/images/posts/2023-02-27-opaque-types/invalid-opaque-type.png){: width="1000"}

> *Opaque Type* 을 반환하겠다 해놓고 `Single Type`이 아닌 2가지 Types 로 *return* 을 하려고 하자 *Compiler* 가 *Opaque Type* 의
> 요구사항에 위반됨을 인지하고 에러를 출력한다.
>
> - Function declares an opaque return type 'some Shape', but the return statements in its body do not have matching underlying types

<br>

이를 해결하기 위한 방법 중 하나는

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}
```

`Square: Shape` 라는 특수한 경우를

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

`FlippedShape: Shape`의 내부로 옮겨 `invalidFlip(_:)` 함수가 언제나
`FlippedShape 의 some Shape 를 return`하도록 하는 것이다.

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
            return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

<br>

변경된 코드를 모아 비교해보면 다음과 같다.

- `flip(_:)` & `join(_:_:)`

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}

func flip<T: Shape>(_ shape: T) -> some Shape {
    FlippedShape(shape: shape)
}
```

```swift
let smallTriangle = Triangle(size: 2)
let smallSquare = Square(size: 2)
let trapezoid = join(smallTriangle, join(smallSquare, flip(smallTriangle)))

print(type(of: trapezoid))  // JoinedShape<Triangle, JoinedShape<Square, FlippedShape<Triangle>>>
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```
<br>

- `fixedInvalidFlip(_:)`

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
            return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}

func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // Error: return types don't match
    }
    return FlippedShape(shape: shape) // Error: return types don't match
}

// 따라서 위 `invalidFlip(_:)`은 다음과 같이 바뀔 수 있다.
func fixedInvalidFlip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape) // Error: return types don't match
}
```

```swift
let smallTriangle = Triangle(size: 2)
let smallSquare = Square(size: 2)
let trapezoid = join(smallTriangle, join(smallSquare, fixedInvalidFlip(smallTriangle)))

print(type(of: trapezoid))  // JoinedShape<Triangle, JoinedShape<Square, FlippedShape<Triangle>>>
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```

#### Opaque＜T＞ Return Types with Generics

항상 `Single Type`을 반환해야 한다고 해서 `Opaque Types`를 return 하는 함수에 
[Generic Types](#h-generic-types) 의 사용을 막지는 않는다.
다음은 [Generic Types](#h-generic-types) 를 사용하면서 `Opaque Types`의 요구사항을 만족하는 경우를 보자.

[Always Return a Single Type](#h-always-return-a-single-type) 에서 `invalidFlip(_:)`함수가 불가능했던 이유는

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // Error: return types don't match
    }
    return FlippedShape(shape: shape) // Error: return types don't match
}
```

는 `T`를 받아 `Square` 또는 `FlippedShape`라는 2가지 Types 로 반환하려 했기 때문이다. 반면

```swift
func `repeat`<T: Shape>(_ shape: T, count: Int) -> some Collection {
    Array<T>(repeating: shape, count: count)
}
```

`repeat(shape:count:)` 함수 역시 `T`에 의존하므로 받는 `T`에 따라 반환되는 `T`의 Type 은 변경되지만,
`some Collection`의 일부로써 `Array<T>`라는 `Single Type 으로 Wrapping 된 Type 을 반환`하기 때문에 Opaque Type 의
요구사항을 준수한다.

<br>

이는 [flip\(\_\:\) & join\(\_\:\_\:\)](#h-always-return-a-single-type) 함수

```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    FlippedShape(shape: shape)
}

func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}
```

의 `some Shape`가 각각

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

라는 `Single Type 으로 Wrapping`되는 것과 같다고 볼 수 있다.

<br>

잘 작동하는지 확인해보자.

```swift
let doubleTriangle = `repeat`(smallTriangle, count: 2)
doubleTriangle.forEach { shape in
    if let shape = shape as? Shape {
        print(shape.draw())
    }
}
```

```console
*
**
***
*
**
***
```

```swift
let tripleSquare = `repeat`(smallSquare, count: 3)
tripleSquare.forEach { shape in
    if let shape = shape as? Shape {
        print(shape.draw())
    }
}
```

```console
***
***
***
***
***
***
***
***
***
```

> **Opaque Return Types** 를 **Generic** 과 함께 사용하면
> [Always Return a Single Type 의 flip, join 함수](#h-always-return-a-single-type) 처럼 Return Type 을 
> `Single Type`으로 만들기 위해 하나의 Type 이 다른 Types 를 포함하도록 만들 필요 없이 `some Type`을 `Generic`을 
> 사용해 반환하므로 각각의 코드를 명확히 분리시킬 수 있다.

### Differences Between Opaque Types and Protocol Types

#### Opaque Types Preserve Type Identity

함수의 *return type* 이 *Opaque Types* 인 경우와 *Protocol Types* 인 경우는 유사해 보이지만 명확한 차이점과 서로가
해결하는 문제(사용함으로써 얻는 강점)이 명확히 다르다. 이를 정리해보자.

- Opaque Types : 모듈의 클라이언트가 Types 의 정보에 접근할 수 없다(hiding). Single Type Identity 를 유지한다.
  <span style="color: red;">Opaque Type 은 하나의 특정 Type 을 참조하지만, 함수 호출자는 어떤
  Type 인지 알 수 없다</span>.
- Protocol Types : 모듈의 클라이언트가 Types 의 정보에 접근할 수 있다. Protocols 을 준수하는 모든 Types 가 가능하므로
  Type Identity 가 유동적이다.

#### Strength of Opaque Types and Protocol Types

따라서 각 Types 가 강점은 다음과 같다.

- Opaque Types

`some Type`을 반환하도록 하기 위해 다음과 같이 Wrapping 되어 반한되는 모양을 보자.

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

Types 의 정보를 은닉화(hiding)할 수 있을 뿐 아니라 특정 Protocols 를 준수하는 경우 해당 모듈이 어떤 Hierarchy 구조를 갖고
있든, 중간에 모듈 내부가 어떻게 변경되든 언제나 `one specific type`을 반환하므로 함수 호출자 입장에서 보면 이것은
<span style="color: red;">return type 에 대한 강력한 보증</span>을 약속(Opaque Type 으로 반환하기 위해 단일
Identity 를 유지하도록 코드를 작성해야하므로)하는 것이다.

<br>

- Protocol Types

특정 `Protocols 를 준수하면 어떤 Types 든 모두 허용됨`을 의미한다. 게다가 `Types 의 정보에 접근` 가능하므로 함수 호출자
입장에서 보면 이것은 <span style="color: red;">높은 유연성을 제공하고 **Original Types** 에 접근이 가능</span>하게 한다.

#### Protocol Return Type give more Flexibility

위에서 언급한 Protocol Types 의 강점인 코드를 유연하게 만드는 것에 대해 검증해본다. 우리는 위에서
[invalidFlip](#h-always-return-a-single-type) 의 문제를 해결하기 위해 ***Square 의 특수한 경우를 
FlippedShape 의 내부로 옮겼다***.

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // Error: return types don't match
    }
    return FlippedShape(shape: shape) // Error: return types don't match
}
```

이번에는 *Square 나 FlippedShape 의 수정 없이 return type 을 `Protocol Types`로 변경*해보자.

```swift
func protocolFlip<T: Shape>(_ shape: T) -> Shape {
    if shape is Square {
        return shape
    }
    
    return FlippedShape(shape: shape)
}
```

```swift
let smallTriangle = Triangle(size: 2)
let smallSquare = Square(size: 2)
let trapezoid = join(smallTriangle, join(smallSquare, protocolFlip(smallTriangle)))

print(type(of: trapezoid))  // JoinedShape<Triangle, JoinedShape<Square, FlippedShape<Triangle>>>
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```

> Protocol Return Type 은 높은 유연성을 제공해 `protocolFlip(_:)`함수가 `Shape`와 `FlippedShape`라는 다른
> Types 를 return 하더라도 `Shape` protocols 을 준수한다면 이를 허용한다.

#### Protocol Return Type cannot use Operations that depend on Type Information

하지만 `Protocol Return Type`을 사용할 때 유의해야할 점이 있다. 코드를 유연하게 해줌으로써 많은 장점을 갖는 것은 맞지만
반대로 말하면, 위 `protocolFlip(_:)`의 *return type* 은 `2개의 완전히 다른 Types`를 갖는다.

따라서 <span style="color: red;">Type 정보에 의존하는 많은 작업이 반환된 값에서 사용할 수 없음을 의미</span>한다.

*Triangle* 과 *FlippedShape* 에 `Equatable`을 추가해보자.

```swift
extension Triangle: Equatable {}
extension FlippedShape: Equatable where T == Triangle {
    static func == (lhs: FlippedShape<T>, rhs: FlippedShape<T>) -> Bool {
        lhs.shape == rhs.shape
    }
}
```

이제 *Triangle* 과 *FlippedShape* 은 `==` operator 를 사용할 수 있다.

<br>

__1 ) Returning Opaque Types__

```swift
let smallTriangle = Triangle(size: 3)
let anotherSmallTriangle = Triangle(size: 3)
print(smallTriangle == anotherSmallTriangle)      // true

let flippedTriangle = FlippedShape(shape: smallTriangle)
let anotherFlippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle == anotherFlippedTriangle)  // true
```

<br>

__2 ) Returning Protocol Types__

```swift
let protocolFlippedTriangleA = protocolFlip(smallTriangle)
let protocolFlippedTriangleB = protocolFlip(smallTriangle)

print(type(of: flippedTriangle))            // FlippedShape<Triangle>
print(type(of: protocolFlippedTriangleA))   // FlippedShape<Triangle>
```

우선 *Initializer* 에 의해 생성된 `flippedTriangle`과 *Protocol Return Type*에 의해 반환된
`protocolFlippedTriangleA`은 둘 다 동일한 `FlippedShape<Triangle>` Type 임이 확인된다.

```swift
print(protocolFlippedTriangleA == protocolFlippedTriangleB) // error: Binary operator '==' cannot be applied to two 'any Shape' operands
```

하지만 `Protocol Return Type`은 `==` operator 를 사용할 수 없어 에러가 발생한다.

#### Downcasting Protocol Return Types

만약 위 경우 Protocols 를 이용한 유연성의 장점을 활용하면서, Types 의 정보를 활용하고자 하면 어떻게 해야할까?

잠시 다른 언어의 이야기를 살펴보자. 만약 Java 와 같은 언어를 해봤다면 어떤 함수의 *return* 값을 받아 변수에 할당할 때
`ArrayList<String>`, `LinkedList<String>`와 같이 명확한 Types 를 선언해 받지 않고, Interface 를 이용해
`List<String>`으로 받도록 코드를 작성한다.

```java
List<String> result = someFunction()  // return `ArrayList<String>` or `LinkedList<String>` or anything adopt to 'List' interface. 
```

이는 이 포스팅을 시작할 때 설명했던 `자세한 정보를 감추는 것은 '모듈'과 '모듈을 호출하는 코드' 사이의 '경계(boundaries)'에서 유용하다`는
설명과 유사함을 보여준다.

이렇게 boundaries 에서 유연성을 확보하는 대신 `result`는 List 가 공통으로 가지고 있는 메서드는 사용할 수 있으나,
`ArrayList 나 LinkedList etc...`만 가지고 있는 전용 메서드는 사용할 수 없다. 만약, 전용 메서드를 사용하려면 `Downcasting`을
해야한다.

<br>

다시 Swift 로 돌아와보자. `flippedTriangle`와 `protocolFlippedTriangleA`은 동일한 Type 이지만
*Protocol Return Type*에 의해 반환된 *protocolFlippedTriangleA* 만 `==` operator 를 사용할 수 없었다.
한 번 이것을 *Downcasting* 해보자.

```swift
let downcastedFlippedTriangleA = protocolFlippedTriangleA as? FlippedShape<Triangle>
let downcastedFlippedTriangleB = protocolFlippedTriangleB as? FlippedShape<Triangle>

print(downcastedFlippedTriangleA == downcastedFlippedTriangleB) // true
```

**작동된다‼️**

#### Protocol Has an Associated Type Cannot Use as the Return Types

다음은 [Generics](#h-extending-an-existing-type-to-specify-an-associated-type) 에서 Array 에 사용자가 
생성한 Container 라는 Custom Protocol 에 대한 적합성을 준수하도록 한 코드의 일부다.

```swift
protocol IntContainer {
    mutating func append(_ item: Int)
    var count: Int { get }
    subscript(i: Int) -> Int { get }
}

protocol StringContainer {
    mutating func append(_ item: String)
    var count: Int { get }
    subscript(i: Int) -> String { get }
}
```

우리는 위와 같은 여러 Types 에 대한 버전의 Container 를 하나의 정의로 재사용하고자 *Associated Types* 를 사용해 다음과 같이
정의했었다.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

그리고 Array 는 이미 위와 같은 요구사항을 준수하기 위한 구현이 이미 존재하므로 다음과 같이 적합성을 추가할 수 있었다.

```swift
extension Array: Container { }
```

<br>

우선 Protocols 가 *Protocol Return Type* 으로 사용될 때의 경우를 살펴보기 위해 *Container* Protocol 의 요구사항을
모두 제거해보자.

```swift
protocol Container { }
extension Array: Container { }
```

```swift
func makeProtocolContainer<T, C: Container>(item: T) -> C {
    [item]  // error: Cannot convert return expression of type '[T]' to return type 'C'
}
```

*item* 이라는 무언가를 받아 `Array()`에 저장해 반환하는 함수다. 우리는 위에서 Array 가 Container Protocol 을 준수하도록
했으므로 이를 Generic Types 로 정의해 반환하고자 했다. 실제로 Container Protocol 은 아무런 요구사항이 없음에도 불구하고
Swift *compiler* 는 Generic Type T 를 Container Protocol 을 준수하는 Generic Type C 로 변환할 수 없다고 이야기한다.

`T`도 *Type Inference* 를 사용하는데, `C`도 *Type Inference* 가 필요한 상황이다. Swift 는 사전에 T 에 대한 충분한
정보도, C 에 대한 충분한 정보도, 게다가 T 와 C 의 관계가 가능한지에 대한 충분한 정보도 없는 상황이기 때문이다.

그렇다면 불확실성을 줄이기 위해 함수를 다음과 같이 변경해보자.

```swift
func makeProtocolContainer<T>(item: T) -> Container {
    [item]
}
```

Array 는 *Associated Types* 를 사용해 무엇이든 저장할 수 있고, Array 는 Container Protocol 을 준수하므로 이제
`makeProtocolContainer(item:)`은 작동이 가능하다.

```swift
let emptyContainer = makeProtocolContainer(item: 10)
print(type(of: emptyContainer)) // Array<Int>
print(emptyContainer)           // [10]
```

반면, Array<Int> Type 임에도 불구하고 Container 로 반환하도록 했기 때문에 Subscript 는 작동하지 않는다.

```swift
print(emptyContainer[0])        // error: value of type 'any Container' has no subscripts
```

Container 는 Subscript 를 요구사항으로 갖고 있지 않기 때문이다. 그렇다면 Container 에 Subscript 에 대한 요구사항을 추가해보자.

```swift
protocol Container {
    associatedtype Item
    subscript(i: Int) -> Item { get }
}
extension Array: Container { }
```

Array 는 모든 Types 를 저장할 수 있으므로, Container 역시 Array 가 저장한 모든 Types 에 대해 Subscript 가 작동하도록 하기
위해 Associated Type 을 이용해 위와 같이 적합성을 준수하도록 하면 다음과 같은 문제가 발생한다.

```swift
func makeProtocolContainer<T>(item: T) -> Container {   // error: Use of protocol 'Container' as a type must be written 'any Container'
    [item]
}
```

그리고 Swift *compiler* 는 `Replace 'Container' with 'any Container'` 라며 경고를 띄운다.
<span style="color: red;">Associated Types 를 갖고 있는 Protocols 는 Return Types 로 사용될 수 없기 때문이다</span>.
이는 앞에서 맞닥뜨린

```swift
func makeProtocolContainer<T, C: Container>(item: T) -> C {
    [item]  // error: Cannot convert return expression of type '[T]' to return type 'C'
}
```

와 유사한 케이스라 할 수 있다.

#### Opaque Type Resolve The Problem That Protocol Has an Associated Types

Container Protocol 은 다시 처음 정의하려던대로 바꾸고 Swift *compiler* 가 시키는대로 따라가보자.

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
extension Array: Container { }
```

```swift
func makeProtocolContainer<T>(item: T) -> any Container {
    [item]
}

let anyContainer = makeProtocolContainer(item: 11)
print(type(of: anyContainer))   // Array<Int>
print(anyContainer)             // [11]
print(anyContainer.count)       // 1

let eleven = anyContainer[0]
print(type(of: eleven))         // Int
print(eleven)                   // 11
```

정상적으로 작동한다. 위 경우는 Array 가 실제로 `Any` Types 에 대해 동작할 수 있지만 `Any`나 `AnyObject`는 명확히 필요한 상황이
아니면 앱의 코드를 `Type-Safe`하지 않게 만들기 때문에 사용을 지양해야한다.

<br>

__이런 상황을 해결할 수 있게 해주는 것이 바로 `Opaque Return Types`다!__

이번에는 다시 `makeProtocolContainer(item:)` 함수를 *Opaque Types* `some Container`를 *return* 하도록 바꿔보자.

```swift
func makeProtocolContainer<T>(item: T) -> some Container {
    [item]
}

let opaqueContainer = makeProtocolContainer(item: 12)
print(type(of: opaqueContainer))    // Array<Int>
print(opaqueContainer)              // [12]
print(opaqueContainer.count)        // 1

let twelve = opaqueContainer[0]
print(type(of: twelve))             // Int
print(twelve)                       // 12
```

`Opaque Return Types`를 사용하면 *Any* 를 사용하지 않고
<span style="color: red;">Associated Types 를 갖는 Protocol 을 return 할 떼의 문제를 해결</span>할 수 있다.




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
[Handling Cocoa Errors in Swift]:https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift
[Optional Chaining always returns Optional Types]:/swift/2022/12/20/optional-chaining.html#h-7-chaining-on-methods-with-optional-return-values-
[MDN - for await...of]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
[MDN - Promise.all()]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[Apple Developer Documentation - Task]:https://developer.apple.com/documentation/swift/task
[Apple Developer Documentation - TaskGroup]:https://developer.apple.com/documentation/swift/taskgroup
[Apple Developer Documentation - checkCancellation]:https://developer.apple.com/documentation/swift/task/checkcancellation()
[Apple Developer Documentation - isCancelled]:https://developer.apple.com/documentation/swift/task/iscancelled-swift.type.property
[Apple Developer Documentation - cancel]:https://developer.apple.com/documentation/swift/task/cancel()
[Apple Developer Documentation - Sendable]:https://developer.apple.com/documentation/swift/sendable
[Computed Instance Properties]:/swift/2022/11/22/properties.html#h-2-computed-properties-
[Computed Type Properties]:/swift/2022/11/22/properties.html#h-6-type-properties-
[instance methods]:/swift/2022/11/27/methods.html#h-2-instance-methods-
[type methods]:/swift/2022/11/27/methods.html#h-3-type-methods-
[Designated and Convenience Initializers]:/swift/2022/12/01/initialization.html#h-2-syntax-for-designated-and-convenience-initializers
[First-Class Citizen]:/swift/2022/11/07/higher-order-function.html#h-1-first-class-citizen
[Delegation Examples]:/swift/2023/02/20/protocols.html#h-2-examples-1
[Which one choose Structures or Classes]:/swift/2022/11/21/structures-and-classes.html#h-3-structure-와-class-무엇을-선택할까
[Equatable]:/swift/2023/02/20/protocols.html#h-1-synthesized-implementation-of-equatable
[Generic, Associated, Where and Subscripts Summary]:/swift/2023/02/23/generics.html#h-7-summary-
