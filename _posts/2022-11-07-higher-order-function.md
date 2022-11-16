---
layout: post
title: Swift Higher-order Functions
subtitle: map, reduce, filter, flatMap, compactMap, forEach, contains, removeAll, sorted, split
categories: swift
tags: [higher order function, first class citizen, functional programming, lambda calculus, map, reduce, filter, flatMap, compactMap]
---

### <span style="color: orange">1. First-Class 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. First-Class Citizen</span>

프로그래밍 언어 디자인에서 `First-Class Citizen`(`type`, `object`, `entity`, `value`)은 다른 `entity`에서
사용할 수 있는 모든 작업을 지원하는 `entity`로 다음과 같은 특징을 갖는다.

- 모든 아이템은 함수의 `parameters`(`arguments`)가 될 수 있다
- 모든 아이템은 함수의 `return value`가 될 수 있다
- 모든 아이템은 `상수 또는 변수에 할당`될 수 있다
- 모든 아이템은 `tested for equality`가 가능하다

#### <span style="color: rgba(166, 42, 254, 1)">2. First-Class Function</span>

`Computer Science`에서 프로그래밍 언어가 함수를 `First-Class Citizen`으로 다루면,
`First-Class Function`을 가지고 있다고 한다. 이것은 다음을 의미한다.

- 함수가 다른 함수의 `arguments`로 전달될 수 있다
- 함수를 다른 함수의 `return value`로 반환할 수 있다
- 함수를 `상수 또는 변수에 할당`하거나 `Data Structures`에 저장할 수 있다
- 함수의 `equality` 비교가 가능하다

또한 프로그래밍 이론에 따라 `First-Class Function`은 `Anonymous Functions`(Function literals)를 요구하기도
한다. `First-Class Function`이 있는 프로그래밍 언어에서 함수의 이름은 특별한 상태가 없다. `Integer` 타입의 변수를 
다루듯 함수 역시 `Function` 타입의 일반 변수처럼 취급된다.

<br>
`First-Class Function`은 `Functional Programming`의 필수요소이며, `Higher-order Functions`는
`Functional programming`의 표준과도 같다.  
`Higher-order Functions`의 예로 `Map` 함수를 살펴보자. `Map` 함수는 `Function`과 `list`를 `arguments`로
취하며, `list`의 각 `member`에 함수를 적용한 `list`를 반환한다.

```swift
let someIntArray: [Int] = [1, 2, 4, 5, 8, 11, 15]
let doubleIntArray: [Int] = someIntArray.map { $0 * 2 }
print(doubleIntArray)   // [2, 4, 8, 10, 16, 22, 30]
```

> 즉, 프로그래밍 언어가 `Map`을 지원하려면, 반드시 함수가 다른 함수의 `arguments`로 전달될 수 있어야 한다.

<br>

`First-Class Frunction`을 지원하는 프로그래밍 언어에서는 `Nested Functions` 또는 `Anonymous Functions`가 
`body` 외부의 변수(`non-local variables`)를 참조하는 것이 자연스러운 반면, 그렇지 않은 언어는 함수를 `arguments`로
전달하거나 `return value`로 반환하는데 어려움이 있다.

따라서 초기 `Imperative languages`(명령형 언어)에서는 이를 회피하기 위해 함수를 `return types`로 허용하지 않음은 물론,
`Nested Functions`나 `non-local variables` 등을 모두 허용하지 않았다. 이러한 언어에서 함수는 `Second-Class citizen`이다.  
이후 최신 언어에서 `First-Class Function`을 적절히 지원하기 위해 함수에 대한 참조를 `bare function pointer`대신
`Closure`로 처리하게되었고, 따라서 `Garbage Collection` 역시 필수 요소가 된다.

> `First-Class Function`은 함수에 대한 참조를 `pointer` 대신 `Closures`로 처리한다. 따라서 `Garbage Collection`이
> 반드시 필요하다.

참고로 C언어와 같이 함수가 `First-Class Citizen`이 아닌 언어는 `function pointers` 또는 `delegates`와 같은 기능을 이용해
`Higher-order function`을 작성할 수 있도록 한다. 하지만 언어 자체가 `First-Class Function`을 지원하는 것이 
아니므로 `First-Class Citizen`이 되는 것은 아니다.

---

### <span style="color: orange">2. Higher-order Function Examples 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. TypeScript</span>

`twice`와 `plusThree`라는 함수가 있다.

```typescript
const twice = (f: Function) => {
  return (x: number) => f(f(x))
}
const plusThree = (i: number) => i + 3
```

<br>
`twice` 함수는 아래와 같이 Body를 감싸는 `{ }`와 `return` 키워드를 생략할 수 있다.

```typescript
const twice = (f: Function) => (x: number) => f(f(x))
const plusThree = (i: number) => i + 3
```

> - plusThree: `number` 타입의 `argument`를 받아 3을 더해 `number` 타입을 반환한다.
> - twice: `Function` 타입의 `argument`를 받아 `(x: number) => f(f(x))` 함수를 반환한다.
> - `f(f(x))`는 `<Number>(x: number) => number` 타입의 함수이며, `parameter`와 `return type`이 동일하므로
>   재귀가 가능하다. 따라서 `f(f(x))`는 `argument`로 입력된 함수를 재귀를 통해 2번 실행하는 함수다.

<br>
참고로 `TypeScript`는 함수의 타입을 명시할 때 다음 두 가지 방식의 `typealias`를 사용할 수 있다.

- GenericFunc
```typescript
type GenericFunc = <Number>(x: number) => number
const twice = (f: GenericFunc) => (x: number) => f(f(x))
```

- GenericType
```typescript
type GenericType<Number> = (x: number) => number
const twice = (f: GenericType<number>) => (x: number) => f(f(x))
```

<br>
두 함수를 `chaining`해 `someFunction`이라는 함수를 만들고, 이를 실행해보면 다음과 같다.

```typescript
const twice = (f: Function) => (x: number) => f(f(x))
const plusThree = (i: number) => i + 3
```

```typescript
const someFunction = twice(plusThree)

console.log(someFunction(7))   // 13   (7 + 3) + 3
console.log(someFunction(9))   // 15   (9 + 3) + 3
console.log(someFunction(12))  // 18   (12 + 3) + 3
```

<br>

#### <span style="color: rgba(166, 42, 254, 1)">2. Swift</span>

__1 ) Function `Declarations`__

```swift
func twice(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
    return { (x: Int) in
        f(f(x))
    }
}
```

<br>
`twice(_:)` 함수는 아래와 같이 `arguments`와 `return` 키워드를 생략할 수 있다.  
(`TypeScript`와 달리 Body를 감싸는 `{ }`는 생략할 수 없다.)

```swift
func twice(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
    { f(f($0)) }
}
```

<br>
위 `twice`의 `parameter type`과 `return type`이 보기 힘들다면 `typealias`를 사용한 아래 코드를 보도록 하자.

```swift
typealias intToInt = (Int) -> Int

func twice(_ f: @escaping intToInt) -> intToInt {
  { f(f($0)) }
}
```

<br>
이제 `plusThree`를 포함해 두 함수를 `chaining` 시켜 전체 로직을 완성해보자.

```swift
func twice(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
  { f(f($0)) }
}

func plusThree(_ i: Int) -> Int {
    i + 3
}
```

```swift
let someFunction = twice(plusThree(_:))

print(someFunction(7))  // 13   (7 + 3) + 3
print(someFunction(9))  // 15   (9 + 3) + 3
print(someFunction(12)) // 18   (12 + 3) + 3
```

<br>

__2 ) Function `Expressions`__

위 1과 동일한 로직을 `Expressions` 방식으로 작성해보자.

```swift
let twice = { (f: @escaping (Int) -> Int) in
  { f(f($0)) }
}
```

<br>
상수나 변수의 타입을 미리 지정해 `twice`를 다음과 같이 작성하는 것도 가능하다.

```swift
let twice: (@escaping (Int) -> Int) -> (Int) -> Int = { f in
    { f(f($0)) }
}
```


<br>
마찬가지로 `typealias`를 사용해 다음과 같이 작성할 수 있다.

```swift
typealias intToInt = (Int) -> Int

let twice = { (f: @escaping intToInt) in
    { f(f($0)) }
}
```

```swift
typealias intToInt = (Int) -> Int

let twice: (@escaping intToInt) -> intToInt = { f in
  { f(f($0)) }
}
```

<br>
이제 `plusThree`를 포함해 두 함수를 `chaining` 시켜 전체 로직을 완성해보자.


```swift
let twice: (@escaping (Int) -> Int) -> (Int) -> Int = { f in
  { f(f($0)) }
}

let plusThree: (Int) -> Int = { $0 + 3 }
```
```swift
let someFunction = twice(plusThree)

print(someFunction(7))  // 13   (7 + 3) + 3
print(someFunction(9))  // 15   (9 + 3) + 3
print(someFunction(12)) // 18   (12 + 3) + 3
```

---

### <span style="color: orange">3. Higher-order Functions 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. forEach</span>

- `Collection`의 모든 `elements`를 순환할 뿐 `Return Value`가 없다.
- `continue`, `break` 같은 `Control Transfer Statements`를 사용할 수 없다. 오직 `return`만 사용 가능하다.

`Collection`을 순환하는 고전적인 방법으로 `For-In Loops`가 있다. 

```swift
let numbers: [Int] = [2, 5, 3, 9, 11, 14]

for number in numbers {
    number.isMultiple(of: 2) ? print("\(number) is even") : print("\(number) is odd")
}
```

`forEach`는 `For-In Loops`와 동일한 로직을 수행할 수 있다. 

```swift
numbers.forEach { $0.isMultiple(of: 2) ? print("\($0) is even") : print("\($0) is odd") }
```

```console
2 is even
5 is odd
3 is odd
9 is odd
11 is odd
14 is even
```

<br>

__`forEach`와 `For-In Loops`의 차이점__

- `For-In Loops`는 `body` 내에서 `continue`, `break`와 같은 `Control Transfer Statements`를 
사용할 수 있다.

```swift
let anotherNumbers: [Int?] = [2, 5, nil, 9, 11, nil, 6, nil, 14]

for number in anotherNumbers {
    guard let number = number else {
        print("Found nil")
        continue
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
The double of 9 is 18
The double of 11 is 22
Found nil
The double of 6 is 12
Found nil
The double of 14 is 28
```
<br>

```swift
let anotherNumbers: [Int?] = [2, 5, nil, 9, 11, nil, 6, nil, 14]

for number in anotherNumbers {
    guard let number = number else {
        print("Found nil")
        break
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
```

<br>

- 반면 `forEach`는 `return`만 사용 가능하다.

```swift
anotherNumbers.forEach { number in
    guard let number = number else {
        print("Found nil")
        continue    // 'continue' is only allowed inside a loop
    }
    print("The double of \(number) is \(number * 2)")
}
```

```swift
anotherNumbers.forEach { number in
    guard let number = number else {
        print("Found nil")
        return
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
The double of 9 is 18
The double of 11 is 22
Found nil
The double of 6 is 12
Found nil
The double of 14 is 28
```

> `For-In Loops`와 `forEach` 모두 함수의 `Return Value`가 없다.  
> `For-In Loops`와 `forEach`는 비슷하지만, `forEach`는 `loops`가 아니므로 `continue`나 `break`과 같은
> `Control Transfer Statements`를 사용할 수 없다.
> 실제로 `forEach`는 `Collection`을 순환하지만 `forEach`의 `argument`로 전달되는 `trailing closure`의 
> 입장에서는 여러 번 호출될 뿐 `loops`가 아니기 때문이다.  
> 따라서, 현재 호출된 `closure`를 종료하기 위한 `return` 키워드만 허용된다. 또한 여기서 사용되는 `return` 키워드는 
> 현재 호출된 `closure`를 종료하는 것일 뿐 `forEach` 순환 자체를 종료하지 않는다. `forEach`에서 `return`은 
> `For-In Loops`의 `continue`와 같은 역할을 한다.

#### <span style="color: rgba(166, 42, 254, 1)">2. map</span>

__1 ) Array.map(_:)__

다음은 `Swift documentation`의 Instance Method `map(_:)`의 설명이다.

```swift
func map<T>(_ transform: (Self.Element) throws -> T) rethrows -> [T]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/map(_:))

`map` 함수는 가장 유명한 `Higher-order Function`으로 `Collection`의 모든 `elements`에 로직을 수행 후
`new Collection`을 반환한다.

<br>

다음은 가장 기본적인 `map` 함수의 동작이다. `Original Collection`의 모든 `elements`에 2를 곱한 다음
`new Collection`을 반환한다.

```swift
let numbers: [Int] = [2, 5, 3, 9, 11, 14]

var doubled: [Int] = [Int]()
doubled = numbers.map { $0 * 2 }
print(doubled)          // [4, 10, 6, 18, 22, 28]
```

<br>
`new Collection`을 반환하는 것이므로, `Original Collection`과 `Data Type`이 같을 필요가 없다.

```swift
let degrees = [20, 45, 180, 360, 185]

let rads = degrees.map { Double($0) * Double.pi / 180.0 }
let tenThousand: Double = pow(10, 4)

rads.forEach { print("\(round($0 * tenThousand) / tenThousand) radian") }
```

```console
0.3491 radian
0.7854 radian
3.1416 radian
6.2832 radian
3.2289 radian
```

<br>

__2 ) Set.map(_:)__

`Set`의 `map`은 `Array`의 `map`과 같다.

```swift
let people: Set<String> = ["Thomasin McKenzie", "Anya Taylor-Joy", "Matt Smith", "Diana Rigg", "Rita Tushingham"]
let firstName = people.map { $0.split(separator: " ")[0] }
let lastName = people.map { $0.split(separator: " ")[1] }

print(firstName)    // ["Anya", "Rita", "Thomasin", "Matt", "Diana"]
print(lastName)     // ["Taylor-Joy", "Tushingham", "McKenzie", "Smith", "Rigg"]
```

<br>

__3 ) Dictionary.map(_:)__

`Dictionay`는 `Key: Value` 구조이기 때문에 `Array`나 `Set`과는 조금 다른 모습을 보인다.

```swift
let info: [String: String] = ["name": "andrew",
                              "city": "berlin",
                              "job": "developer",
                              "hobby": "computer games"]

let keys = info.map { $0.key }
let values = info.map { $0.value }

print(keys)     // ["city", "name", "hobby", "job"]
print(values)   // ["berlin", "andrew", "computer games", "developer"]
```

<br>
만약, `map`에서 `key`와 `value`를 구분하지 않고 접근하면, `tuple`로 접근하게된다.

```swift
let tupleData = info.map { $0 }
print(type(of: tupleData))              // Array<(key: String, value: String)>
print(type(of: tupleData[0]))           // (key: String, value: String)
print(type(of: tupleData[0].key))       // String
print(type(of: tupleData[0].value))     // String

tupleData.forEach {
    print($0)
}
```

```console
(key: "job", value: "developer")
(key: "name", value: "andrew")
(key: "hobby", value: "computer games")
(key: "city", value: "berlin")
```

위에서 볼 수 있듯이 `info.map { $0 }`의 `Return Type`은 `(key: String, value: String)`타입의 
`tuple`을 저장하는 배열이다.

<br>

```swift
let updatedKeysAndValues = info.map { ($0.uppercased(), $1.capitalized) }
print(type(of: updatedKeysAndValues))       // Array<(String, String)>
print(type(of: updatedKeysAndValues[0]))    // (String, String)

updatedKeysAndValues.forEach {
    print($0)
}
```

```console
("CITY", "Berlin")
("NAME", "Andrew")
("JOB", "Developer")
("HOBBY", "Computer Games")
```

<br>

```swift
let anotherKeysAndValues = info.map { (list: $0.uppercased(), userInfo: $1.capitalized) }
print(type(of: anotherKeysAndValues))       // Array<(list: String, userInfo: String)>
print(type(of: anotherKeysAndValues[0]))    // (list: String, userInfo: String)

anotherKeysAndValues.forEach {
    print($0)
}
```

```console
(list: "CITY", userInfo: "Berlin")
(list: "JOB", userInfo: "Developer")
(list: "NAME", userInfo: "Andrew")
(list: "HOBBY", userInfo: "Computer Games")
```

<br>
이제 위 `tuple`을 이용해 다시 `Dictionary`를 만들어보자

```swift
let capitalizedInfo = Dictionary(uniqueKeysWithValues: anotherKeysAndValues)
print(type(of: capitalizedInfo))    // Dictionary<String, String>
print(capitalizedInfo)  // ["NAME": "Andrew", "HOBBY": "Computer Games", "CITY": "Berlin", "JOB": "Developer"]
```

<br>
또는 아래서 배울 `reduce`를 이용하면 `map`이 배열을 반환한 이후 `Dictionary`의 `initializer`를 이용할 
필요 없이 `Higher-order Functions`의 `chaining`을 이용해 다음과 같이 작성하는 것이 가능하다.

```swift
let capitalizedInfo = info.lazy
    .map { ($0.uppercased(), $1.capitalized) }
    .reduce(into: [String: String]()) { $0[$1.0] = $1.1 }
```

<br>
위 `reduce`가 어떻게 작동하는 것인지 아직은 이해하기가 어려울 것이다. `reduce`의 마지막 `argument`의
`trailing closure`의 내부에서 `$0`, `$1.0`, `$1.1`을 출력해보면 다음과 같다.

```swift
let capitalizedInfo = info.lazy
    .map { ($0.uppercased(), $1.capitalized) }
    .reduce(into: [String: String]()) {
        let str = """
                $0: \($0)
                $1.0: \($1.0),  $1.1: \($1.1)
                
                """
        print(str)
        return $0[$1.0] = $1.1
    }
```

```console
$0: [:]
$1.0: HOBBY,  $1.1: Computer Games

$0: ["HOBBY": "Computer Games"]
$1.0: NAME,  $1.1: Andrew

$0: ["HOBBY": "Computer Games", "NAME": "Andrew"]
$1.0: JOB,  $1.1: Developer

$0: ["HOBBY": "Computer Games", "NAME": "Andrew", "JOB": "Developer"]
$1.0: CITY,  $1.1: Berlin
```

> $0은 `reduce`의 첫 번째 `argument`인 `accumulator`고, $1은 두 번째 `argument`인 `currentvalue`다.  
> 즉, $1.0은 `array`가 저장하고 있는 `tuple`의 `key`, $1.1은 `tuple`의 `value`가 되는 것이다.

<br>

__4 ) Dictionary.mapValues(_:)__

일반적으로 `Dictionayr`를 사용할 때 `Key`는 변경하지 않는다. 이럴 때 유용한 함수가 `mapValues`다.

```swift
let updatedValues = info.mapValues { $0.capitalized }
print(updatedValues)    // ["hobby": "Computer Games", "job": "Developer", "city": "Berlin", "name": "Andrew"]
```

> `Dictionay`에 `map` 함수를 적용할 때 유용한 각각의 case 를 정리하면 다음과 같다.
> 
> - someDictionary.map: (최종 결과물이 `Dictionary`) & (`Key`의 변경이 필요할 때)
> - someDictionary.mapValues: (최종 결과물이 `Dictionary`) & (`Key`의 변경은 필요 없고 `Value`의 변경만 필요할 때)
> 
> - someDictionary.keys.map: (최종 결과물이 `Array`) & (`Key`만 필요할 때)
> - someDictionary.values.map: (최종 결과물이 `Array`) & (`Value`만 필요할 때)

#### <span style="color: rgba(166, 42, 254, 1)">3. compactMap</span>

`Collection`이 `nil`을 포함하고 있는 경우 유용하게 사용할 수 있는, `map`과 매우 유사한 `compactMap`이 있다.

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))

<br>

__1 ) Optional Collection with `map`__

```swift
let numbersWithNil: [Int?] = [5, 15, nil, 3, 9, 12, nil, nil, 17, nil]
```

<br>
위 `nil`이 포함된 `Collection`에 `map` 함수를 사용해보자.

```swift
let doubledNums = numbersWithNil.map { $0 * 2 } // error: value of optional type 'Int?' must be unwrapped to a value of type 'Int'
```

`numbersWithNil`이 저장하는 데이터 타입은 `Int?`이므로 `unwrapping`을 하지 않으면 산술 연산을 할 수 없어서 에러가 발생한다.

```swift
let doubledNums = numbersWithNil.map { $0! * 2 } // Fatal error: Unexpectedly found nil while unwrapping an Optional value
```

`unwrapping`을 했지만 또 다른 에러가 발생한다. 바로 `Collection`의 `element`가 `nil`인 순간 `nil! * 2` 연산을 
시도해 `Runtime Error`가 발생한다.

<br>

따라서 다음과 같이 `Type-Safe`한 코드를 위해 `nil check`를 해줘야한다.

```swift
let doubledNums = numbersWithNil.map { (number) -> Int? in
    guard let number = number else { return nil }
    return number * 2
}
```

위 로직을 `Ternary Operator`를 이용해 최적화 하면 다음과 같다.

```swift
let doubledNums = numbersWithNil.map { $0 != nil ? $0! * 2 : nil }
print(type(of: doubledNums))    // Array<Optional<Int>>
print(doubledNums)              // [Optional(10), Optional(30), nil, Optional(6), Optional(18), Optional(24), nil, nil, Optional(34), nil]
```

<br>

__2 ) Optional Collection with `compactMap`__

```swift
let doubledNumsWithoutNil = numbersWithNil.compactMap { $0 != nil ? $0! * 2 : nil }
print(type(of: doubledNumsWithoutNil))  // Array<Int>
print(doubledNumsWithoutNil)            // [10, 30, 6, 18, 24, 34]
```

`compactMap`을 사용하더라도 `Type-Safe`한 코드를 위해 `nil check`는 반드시 해줘야한다.

하지만 `Original Collection`의 `nil`을 그대로 포함하는 `map`과 달리 `compactMap`은 `Optional elements`를 
제거하고, `unwrapping`된 `Collection`을 반환한다. 따라서, `nil`의 숫자만큼 `Collection`의 길이 역시 줄어든다.

즉, `compactMap`은 다음 코드를 압축한 것이다.

```swift
let doubledNumsWithoutNil = numbersWithNil
    .filter { $0 != nil }
    .map { $0! * 2 }

print(type(of: doubledNumsWithoutNil))  // Array<Int>
print(doubledNumsWithoutNil)            // [10, 30, 6, 18, 24, 34]
```

<br>

__3 ) Optional Collection with `default value`__

`Optional Collection`이라고 무조건 `compactMap`을 사용해서는 안 된다. `nil`을 제거하지 않고 남겨두거나, 
`default value` 처리를 해야할 수도 있다. 이때는 `nil`을 `default value`로 처리하므로 `compactMap`과 
`map`은 동일하게 작동한다. 따라서 이 경우 굳이 `compactMap`을 쓸 필요가 없다. `nil`이 제거된 `new Collection`을 
반환하므로, `Swift`는 이를 추론해 `unwrapping`된 `Collection`을 반환한다.

```swift
let withDefaultValue = numbersWithNil.compactMap { $0 != nil ? $0! * 2 : -1 }
print(type(of: withDefaultValue))   // Array<Int>
print(withDefaultValue)             // [10, 30, -1, 6, 18, 24, -1, -1, 34, -1]
```

```swift
let withDefaultValue = numbersWithNil.map { $0 != nil ? $0! * 2 : -1 }
print(type(of: withDefaultValue))   // Array<Int>
print(withDefaultValue)             // [10, 30, -1, 6, 18, 24, -1, -1, 34, -1]
```

> `map`을 사용했지만 `nil`을 `default value`로 처리했기 때문에 `Swift`는 이를 추론해 `unwrapping`된 
> `new Collection`을 반환한다.  
> 단, `default value`를 사용할 때 주의해야 할 것은 주어진 `default value`가 전체 앱 또는 구현 중인 로직에 
> `side effect`를 일으키지 않는 값을 선택해야한다.

<br>

__4 ) Application of compactMap__

`compactMap`의 가장 유용한 점은 다음과 같은 코드를 매우 간략하게 표현할 수 있다는 것이다.

```swift
let coins = ["1", "5", "$", "10", "6"]

var validCoins: [Int] = []
for coin in coins {
    guard let coin = Int(coin) else { continue }
    validCoins.append(coin)
}

print(validCoins)   // [1, 5, 10, 6]
```

```swift
let validCoins = coins.compactMap { Int($0) }
print(validCoins)   // [1, 5, 10, 6]
```

이게 전부다! `filter` 외에도 위와 같은 `Type-Safe`한 코드를 위해 사용되는 `guard let`, `if let`을 
활용한 여러 줄의 코드를 `compactMap`은 매우 간단하게 처리한다.

<br>

> `compactMap`은 `.filter { $0 != nil } .map { (YOUR_CODE) }`를 압축한 것이다. 
> 따라서, `Collection`에서 `nil`을 제거하고 `non-nil`만 얻고자 할 때 유용하다.

#### <span style="color: rgba(166, 42, 254, 1)">4. flatMap</span>

다음은 `Swift documentation`의 Instance Method `flatMap(_:)`의 설명이다.

```swift
func flatMap<SegmentOfResult>(_ transform: (Self.Element) throws -> SegmentOfResult) rethrows -> [SegmentOfResult.Element] where SegmentOfResult : Sequence
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/flatmap(_:)-jo2y)

`flatMap`은 `2D Array`를 `1D Array`로 바꾼다. 즉, `Collection` 안에 `Collection`이 있을 때 유용하다.

<br>

__1 ) `2D Array` to `1D Array`__

```swift
let marks = [[3, 4, 5], [2, 5, 3], [1, 2, 2], [5, 5, 4], [3, 5, 3]]
```

- For-In Loops

```swift
var allMarks: [Int] = []
for marksArray in marks {
    allMarks += marksArray
}
print(allMarks) // [3, 4, 5, 2, 5, 3, 1, 2, 2, 5, 5, 4, 3, 5, 3]
```

- flatMap

```swift
let allMarks = marks.flatMap { $0 }
print(allMarks) // [3, 4, 5, 2, 5, 3, 1, 2, 2, 5, 5, 4, 3, 5, 3]
```

<br>

__2 ) Application of flatMap__

이번에는 위 `2D Array`의 모든 `elements`의 합을 구해보자. 일반적으로 이러한 구조에서는 이중 `For-In Loops`를 
사용하게된다.

- For-In Loops

```swift
var sum: Int = 0
for marksArray in marks {
    for element in marksArray {
        sum += element
    }
}
print(sum)  // 52
```

<br>

- flatMap

```swift
let sum = marks
        .flatMap { $0 }
        .reduce(0) { $0 + $1 }

print(sum)  // 52
```

<br>

__3 ) Composite case__

이번에는 2D Collection에 `nil`이 포함된 경우를 생각해보자.

```swift
let marksWithNil = [[3, nil, 5], [2, 5, nil], [1, 2, 2], [5, 5, 4], [nil, 5, 3]]
```

- For-In Loops

일반적으로 `For-In Loops`를 이용하면 다음 방법 중 하나를 사용할 것이다.

```swift
for marksArray in marksWithNil {
    for element in marksArray {
        anotherSum += element ?? 0
    }
}
print(anotherSum)   // 42
```

```swift
for marksArray in marksWithNil {
    for element in marksArray {
        guard let element = element else { continue }
        anotherSum += element
    }
}
print(anotherSum)   // 42
```

```swift
var anotherSum: Int = 0
for marksArray in marksWithNil {
    for element in marksArray where element != nil {
        anotherSum += element!
    }
}
print(anotherSum)   // 42
```

<br>

- flatMap

`flatMap`을 다른 `Higher-order Functions`와 함께 `chaining` 하면 매우 간단하고 깔끔한 코드로 구현할 수 있다.

```swift
let anotherSum = marksWithNil
    .flatMap { $0 }
    .reduce(0) { $0 + ($1 ?? 0) }

print(anotherSum)   // 42
```

```swift
let anotherSum = marksWithNil.lazy
        .flatMap { $0 }
        .filter { $0 != nil }
        .reduce(0) { $0 + $1! }

print(anotherSum)   // 42
```

```swift
let anotherSum = marksWithNil.lazy
    .flatMap { $0 }
    .compactMap { $0 != nil ? $0 : nil }
    .reduce(0) { $0 + $1 }

print(anotherSum)   // 42
```

#### <span style="color: rgba(166, 42, 254, 1)">5. filter</span>

다음은 `Swift documentation`의 Instance Method `filter(_:)`의 설명이다.

```swift
func filter(_ isIncluded: (Self.Element) throws -> Bool) rethrows -> [Self.Element]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/filter(_:))

`filter` 함수는 `Higher-order Function` 중 `map`과 함께 가장 많이 사용되는 함수다.  
`filter`는 `Collection`의 모든 `elements`에 로직을 수행 후 `Bool` condition 이 `true`인 값에 대해 
`new Collection`을 반환한다.

<br>

__1 ) Filter some condition__

아래 배열 `words`에서 문자 `o`를 포함하는 `elements`만 갖는 새 배열을 만들어보자.

```swift
let words: [String] = ["room", "home", "train", "green", "heroe"]
```

<br>

- For-In Loops

`Collection`을 순환하며 결과를 계산해 담을 변수를 생성하고, `For-In Loops`를 이용한다.

```swift
var wordsWithO: [String] = []
for word in words {
    if word.contains("o") {
        wordsWithO.append(word)
    }
}
```

<br>

만약 결과를 변수가 아닌 상수에 담고 싶다면 어떻게 해야할까? 위에서 만든 `wordsWithO` 변수를 `temp`라는 변수를 
만들어 저장한다. 그리고 계산이 끝난 후 이 값을 상수에 할당하면 된다.

```swift
var temp: [String] = []
for word in words {
    if word.contains("o") {
        temp.append(word)
    }
}

let wordsWithO: [String] = temp
```

<br>

하지만 위 방식은 좋아 보이지 않는다. 우리는 이 문제를 `closure`를 이용해 해결할 수 있다.

```swift
let closure = {
    var wordsWithO: [String] = []
    for word in words {
        if word.contains("o") {
            wordsWithO.append(word)
        }
    }
    return wordsWithO
}

let wordsWithO: [String] = closure()
```

만약 `closure`가 일회성으로 사용 후 소멸될거라면 다음과 같이 `anonymous`로 만들 수 있다.

```swift
let wordsWithO: [String] = {
    var wordsWithO: [String] = []
    for word in words {
        if word.contains("o") {
            wordsWithO.append(word)
        }
    }
    return wordsWithO
}()
```

<br>

- filter

`filter`를 이용하면 `filter`의 `argument`에 `single-expression closures`, 
`shorthand arguemnt names`, `trailing closure syntax`를 모두 적용해 다음과 같이 간단한 코드로 처리가 
가능하다.

```swift
let wordsWithO: [String] = words.filter { $0.contains("o") }

print(wordsWithO)   // ["room", "home", "heroe"]
```

<br>

__2 ) Filter nil__

`nil` 값을 필터링 할 때는 다음과 같은 차이가 있으니 주의해야한다.

아래 배열 `numbersWithNil`에서 `nil`이 아닌 값의 합을 구해보자. 

```swift
let numbersWithNil = [1, 2, nil, 5, nil, 32, 7]
```

<br>

우선 `numbersWithNil`을 각각 `filter`, `compactMap`, `map`을 이용해 `nil`을 제거해보자.

```swift
print(numbersWithNil.filter { $0 != nil })                   // [Optional(1), Optional(2), Optional(5), Optional(32), Optional(7)]
print(numbersWithNil.compactMap { $0 != nil ? $0 : nil })    // [1, 2, 5, 32, 7]
print(numbersWithNil.map { $0 != nil ? $0! : 0 })            // [1, 2, 0, 5, 0, 32, 7]
```

> - `filter`는 `nil`을 제거하지만 `Optioanl`을 `unwrapping` 하지는 못 한다.
> - `compactMap`은 `nil`을 제거하고, `Optioanl`을 `unwrapping`한다.
> - `map`을 적절한 `default value`와 함께 사용하면, `nil`을 제거하지는 못 하지만 `Optional`을 
>   `unwrapping` 할 수 있다(이 때 `default value`는 `side effect`를 일으키지 않아야한다).

사실 의도적으로 `nil`을 특정한 `default value`로 바꾸려는 것이 아니라면 `map` case 는 좋지 못 한 방법이다. 
위 값을 더하기 위해 `0`이라는 값을 `default value`로 주었지만 만약 곱하기로 변경된다면? `default value`를 
다시 `1`로 변경해줘야한다.  
이런 코드는 유연성(재사용성)이 떨어질 뿐 아니라 불필요한 값을 계속 가지고 다니므로 성능도 좋지 못 하다. 또한 코드가 
길어지거나 코드를 작성한 이후 유지보수 할 때 `human error`를 발생시키는 요인이 될 가능성도 높다.

```swift
let sumWithFilter = numbersWithNil.lazy
        .filter { $0 != nil }
        .reduce(0) { $0 + $1! }

let sumWithCompactMap = numbersWithNil.lazy
        .compactMap { $0 != nil ? $0 : nil }
        .reduce(0) { $0 + $1 }

let sumWithReduce = numbersWithNil.reduce(0) { $0 + ($1 ?? 0) }


print("sumWithFilter:       \(sumWithFilter)")
print("sumWithCompactMap:   \(sumWithCompactMap)")
print("sumWithReduce:       \(sumWithReduce)")
```

```console
sumWithFilter:       47
sumWithCompactMap:   47
sumWithReduce:       47
```

#### <span style="color: rgba(166, 42, 254, 1)">6. reduce</span>

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))




#### <span style="color: rgba(166, 42, 254, 1)">7. contains</span>

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))



#### <span style="color: rgba(166, 42, 254, 1)">8. removeAll</span>

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))




#### <span style="color: rgba(166, 42, 254, 1)">9. sort, sorted</span>

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))




#### <span style="color: rgba(166, 42, 254, 1)">10. split</span>

다음은 `Swift documentation`의 Instance Method `compactMap(_:)`의 설명이다.

```swift
func compactMap<ElementOfResult>(_ transform: (Self.Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

Link: [Apple Developer Documentation](https://developer.apple.com/documentation/swift/sequence/compactmap(_:))




---

### <span style="color: orange">4. 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---



<br><br>

---
Reference

1. "First-class citizen", Wikipedia, last modified Oct. 15, 2022, accessed Nov. 07, 2022, [Wikipedia - First Class Citizen](https://en.wikipedia.org/wiki/First-class_citizen)
2. "First-class function", Wikipedia, last modified Jul. 14, 2022, accessed Nov. 07, 2022, [Wikipedia - First Class Function](https://en.wikipedia.org/wiki/First-class_function)
3. "Higher-order function", Wikipedia, last modified Sep. 8, 2022, accessed Nov. 07, 2022, [Wikipedia - Higher-Order Function](https://en.wikipedia.org/wiki/Higher-order_function)
4. "Non-local variable", Wikipedia, last modified May. 12, 2022, accessed Nov. 07, 2022, [Wikipedia - Non-local Variable](https://en.wikipedia.org/wiki/Non-local_variable)
5. "Higher-Order Functions in Swift", Medium, last modified Jun. 9, 2020, accessed Nov. 07, 2022, [Higher-Order Functions in Swift](https://betterprogramming.pub/higher-order-functions-in-swift-13c31a769c0c)
6. "Understanding Higher Order Functions in Swift", APPCODA, Feb. 26, 2020, accessed Nov. 07, 2022, [Understanding Higher Order Functions in Swift](https://www.appcoda.com/higher-order-functions-swift/)
7. "Higher Order Functions in Swift", Level Up COding, Aug. 12, 2020, accessed Nov. 14, 2022, [Level Up Coding - Higher Order Functions in Swift](https://levelup.gitconnected.com/higher-order-functions-in-swift-35861620ad1)
   