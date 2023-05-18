---
layout: post
title: Swift Summary
subtitle: Short Book about the grammar of the Swift Language
categories: swift
tags: [swift docs, shortbook, cheatsheet, summary, grammar]
---

## 1. String 👩‍💻

### Type (타입)

Swift 의 String 은 Struct 기반의 Value 타입이다.
Objective-C 의 NSString 은 Class 기반의 Reference 타입이다.
Foundation 은 Swift 의 String 에서 캐스팅 없이 NSString 의 메서드를 사용할 수 있게 해준다.

### Optimization (최적화)

Value 타입이라는 말은 상수나 변수에 할당하거나 함수나 메서드에 전달될 때 값이 복사된다는 것을 의미한다.  
하지만 실제로는 컴파일러가 실제 복사가 필요할 때까지는 값의 복사 자체를 지연시켜 값 타입을 유지하면서 성능을 향상시킨다.
자세한 내용은 하단 Substring 참고.

### String 은 Character 의 집합

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

### 특수 문자열

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

만약 중간에 임시로 'Escaped Special Characters' 가 동작하도록 하려면 `\` 뒤에 동일한 개수의 `#`을 넣어준다.

```swift
#"안녕 \#n 하세요"#  

// 안녕
// 하세요
```

### Sting Interpolation (문자열 삽입)

```swift
let name = "홍길동"
"제 이름은 \(name)입니다."         // 제 이름은 홍길동입니다.
#"제 이름은 \(name)입니다."#       // 제 이름은 \(name)입니다. 
#"제 이름은 \#(name)입니다."#      // 제 이름은 홍길동입니다.
```

물론 Extended String Delimiters `#` 이 우선권을 갖는다.

### Extended Grapheme Clusters (자모 그룹의 확장)

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

### Accessing and Modifying a String (문자열 접근과 수정)

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

### Subscript (부분 문자열)

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

### Comparing String (문자열 비교)

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

다음과 같이 n 개의 Parameters 를 받아 내부에서 Array 로 동작시킬 수 있다.

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

