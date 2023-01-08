---
layout: post
title: Swift Enumerations
subtitle: Enumerations - Associated Values, Raw Values
categories: swift
tags: [swift docs, enumeration, associated value, raw value]
---

### 1. Enumeration Syntax 👩‍💻

#### 1. Enumerations in Swift

`Enumeration`은 연관된 값들을 공통 타입으로 그룹화해 `Type-Safe`한 코드를 작성하도록 돕는다.  
`Swift`에서 `Enumeration`은 주어진 값이 `String`, `Character`, `Interger`, `Float` 어떤 것이든
저장할 수 있다. 다른 언어에서 `unions` 또는 `variants`가 작동하는 것과 같다.

`Swift`에서 `Enumeration`은 그 자체로 `First-Class Types`로 전통적으로 `Class`에서만 제공되는 많은 기능을 채택한다.

- Initializers
- Computed Properties
- Instance methods
- Extend their original implementation
- Confirm to protocols

<br>

__Syntax__

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

> 1. `Enumeration`은 새 `Type`을 만들어 낸다. 따라서 `Swift`의 다른 `Types`와 마찬가지로 이름은 `대문자로 시작`한다.
> 2. `Enumeration`은 `Singleton`을 기반으로 하므로 이름 역시 자명하게 읽히도록 복수형(plural)이 아닌
     `단수형(singular)을 사용`한다.

#### 2. Enumeration Examples

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

> `Swift`의 `Enumeration`은 다른 언어와 달리 암시적으로 integer value(0, 1, 2, ...)를 할당하지 않는다.
> `case`는 `온전히 자기 자신을 값`으로 갖는다.

<br>
각 `case`는 다음과 같이 `,`를 이용해 한 줄로 적을 수 있다.

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

위에서 정의한 `CompassPoint`, `Planet`은 각각 하나의 `Type`을 만들어냈으며, 둘은 서로 다른 `Type`이다.

```swift
var directionToHead = CompassPoint.west
print("Type of directionToHead is '\(type(of: directionToHead))'")
```

<br>

이미 `Type`이 정해진 경우, `Dot Syntax`(`.`)를 이용할 수 있다.

```swift
var directionToHead = CompassPoint.west
print("directionToHead is '\(directionToHead)'")  // directionToHead is west

directionToHead = .east
print("directionToHead is '\(directionToHead)'")  // directionToHead is east

var anotherDirectionToHead: CompassPoint
anotherDirectionToHead = .south
print("anotherDirectionToHead is '\(anotherDirectionToHead)'")    // anotherDirectionToHead is south
```

---

### 2. Matching Enumeration Values with Switch 👩‍💻

#### 1. Matching with Switch
`Enumeration`은 `Switch`를 이용해 다음과 같이 매칭시킬 수 있다.

```swift
enum CompassPoint {
    case east, west, south, north
}

var directionToHead: CompassPoint
```

```swift
directionToHead = .south

switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
```

```console
Watch out for penguins
```

#### 2. Switch must be exhaustive

```swift
directionToHead = .south

switch directionToHead {    // Switch must be exhaustive - add missing case: '.north'
case .south:
    print("Watch out for penguins")
}
```

`south`를 제외한 `case`를 제거했다. `directionToHead`는 현재 `south`니까 문제 없을 것 
같지만, `Swift`는 이 `Switch`가 완전하지 않은 것을 발견하고 `compile-error`를 발생시킨다.  
따라서, 사용되지 않더라도 다음과 같이 `case miss-matching`이 일어나지 않도록 다음과 같이 
처리해야한다.

```swift
switch directionToHead {
case .south:
    print("Watch out for penguins")
default:
    print("This direction is not south")
}
```

> `Switch`가 `Enumeration`을 다룰 때 `case`는 `완전해야(exhaustive)`한다.

---

### 3. Iterating over Enumeration Cases 👩‍💻

`Enumeration`에 `CaseIterable` 프로토콜을 채택하므로써 해당 `Enum Type`의 모든 `cases`를
갖는 `Collection`을 생성한다.

__Syntax__

```swift
enum SomeEnumeration: CaseIterable {
    case one, two, three
}
```

<br>

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count

print("\(numberOfChoices) beverages available\n")

for beverage in Beverage.allCases {
    print(beverage)
}
```

```console
3 beverages available

coffee
tea
juice
```

---

### 4. Associated Values 👩‍💻

때로는 `Enumeration`의 `cases`가 자기 자신의 값 외에 다른 타입의 값을 함께 저장하는 것이 
유용할 때가 있다. 이를 `Associated Value`라고 하며, 이는 다른 프로그래밍 언어에서 
`unions`, `tagged unions`, `variants`로 알려진 것들과 유사하다.

__Syntax__

```swift
enum SomeEnumeration {
    case one(Int)
    case two(Int, Int)
    case three(String)
}
```

#### 1. Barcode Systems for Examples

1D barcodes in `UPC` format, 2D barcodes in `QR code` format 를 이용해 설명한다.

- Barcodes UPC

![Barcodes UPC](/assets/images/posts/2022-11-01-enumerations/barcode_UPC_2x.png)

- Barcodes QR code

![Barcodes QE code](/assets/images/posts/2022-11-01-enumerations/barcode_QR_2x.png)

<br>

우선 `UPC`는 1D 바코드로 `numebr system`, `manufacturer code`, `product code`, `check` 순으로 
이뤄진 4개의 `Int` 그룹으로 구성되어진다.  
다음으로 `QR code`는 2D 바코드로 2,953자 이내의 어떠한 `ISO 8859-1` 문자든 저장할 수 있다.

#### 2. Adopt Associated Values

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

__`Barcode` enum type 이 가질 수 있는 값은 다음과 같다.__
- `(Int, Int, Int, Int)` `4 Integer Tuple` 타입의 `upc`
- `String` 타입의 `qrCode`

하지만 `Barcode` `enum`이 갖는 값은 사실상 `Associated Value`의 타입을 정의할 뿐 이 값 자체는 
코드상 어떠한 실질적으로 의미를 갖지 않는다. `Beverage`와 비교해보자.

<br>

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}

var myBeverage: Beverage
myBeverage = .coffee
```

`Beverage` `enum type`은 `coffee`, `tea`, `juice`를 자기 자신을 값으로 갖는다. 이 값은 값 자체가 코드상 
의미를 갖는다. 따라서, `myBeverage`라는 변수에 `Beverage` 타입의 `.coffee`라는 값을 할당할 수 있다. 

<br>

이번에는 위 `Beverage`를 기억하며 `Barcode`를 살펴보자.

```swift
var productBarcode: Barcode
productBarcode = .upc(8, 85909, 51226, 3)
print("productBarcode is '\(productBarcode)'")      // productBarcode is 'upc(8, 85909, 51226, 3)'

productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
print("productBarcode is '\(productBarcode)' now")  // productBarcode is 'qrCode("ABCDEFGHIJKLMNOP")' now
```

1. `Barcode` 타입의 변수 `productBarcode`를 선언한다.
2. 변수 `productBarcode`에 `Associated Tuple Value` `(8, 85909, 51226, 3)`를 갖는 
   `Barcode.upc` 값을 할당한다.
3. 이제 변수 `productBarcode`는 `Associated Tuple Value` `("ABCDEFGHIJKLMNOP")`를 갖는 
   `Barcode.qrCode` 값을 할당한다.

<br>
이를 정리하면 다음과 같다.

> `Beverage`의 값 `coffee`가 실질적인 값을 갖는 것과 달리 `Barcode`의 값 `upc`나 `qrCode`는 값 자체로써는 
> 실질적인 의미가 없다. `Barcode`의 값 `upc`나 `qrCode`는 가질 수 있는 `Associated Value`의 타입을 
> 정의할 뿐이다.  
> 실제로 의미를 갖는 값은 `(8, 85909, 51226, 3)` 또는 `("ABCDEFGHIJKLMNOP")`와 같은
> `Associated Tuple Value`다. 
> 
> 또한 `Beverage` 타입의 상수 또는 변수가 값으로 `coffee`와 `tea`를 동시에 가질 수 없는 것과 마찬가지로, 
> `Beverage` 타입의 상수 또는 변수 역시 `upc`나 `qrCode` 두 가지의 값을 모두 저장할 수는 있지만 동시에 가질 수는 없다.

#### 3. Switch Statements with Associated Values

위에서 살펴본 `Enumeration`을 `Switch`에 매칭하는 것은 동일하다. 단, 이 경우 실질적인 값은 `Associated Values`인데 
이 값을 `case` 내에서 사용하기 위해서는 `let` 또는 `var`에 할당해야한다.

```swift
var productBarcode: Barcode
productBarcode = .upc(8, 85909, 51226, 3)
printBarcode(productBarcode)    // UPC: 8, 85909, 51226, 3.

productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
printBarcode(productBarcode)    // QR code: ABCDEFGHIJKLMNOP.


func printBarcode (_ productBarcode: Barcode) {
    switch productBarcode {
    case .upc(let numberSystem, let manufacturer, let product, let check):
        print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
    case .qrCode(let productCode):
        print("QR code: \(productCode).")
    }
}
```

<br>
만약, `Associated Values` 전부가 필요할 경우 다음과 같이 가장 앞에 선언하는 것으로 대신할 수 있다.

```swift
var productBarcode: Barcode
productBarcode = .upc(8, 85909, 51226, 3)
printBarcode(productBarcode)    // UPC: 8, 85909, 51226, 3.

productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
printBarcode(productBarcode)    // QR code: ABCDEFGHIJKLMNOP.


func printBarcode (_ productBarcode: Barcode) {
    switch productBarcode {
    case let .upc(numberSystem, manufacturer, product, check):
        print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
    case let .qrCode(productCode):
        print("QR code: \(productCode).")
    }
}
```

<br><br>

__Summary of Associated Values__

> `Associated Values`는 `Enumeration`의 `cases`가 온전히 자기 자신을 값으로 갖는 대 다른 타입의 값을 갖게 한다.  
> 이때 `Enumeration`의 `cases` 값은 가질 수 있는 `Associated Values`를 정의한다.  
> `Associated Values`를 이용하면 서로 다른 타입의 값을 하나의 `Enumeration`에 저장할 수 있다.  
> 단, 서로 다른 타입을 동시에 저장하는 것은 아니다.

---

### 5. Raw Values 👩‍💻

앞에서 `Associated Values`는 `cases`가 자기 자신의 값 외에 다른 값을 갖는 것은 물론, 서로 `다른 타입의 값`을 
저장하기 위해 어떻게 정의해야하는지를 보여주었다.

이번에는 `Associated Values`의 대안 중 하나로, `cases`가 자기 자신의 값 외에 다른 값을 가질 수 있는 방법으로 
`Raw Values`를 소개한다. `Associated Values`와 마찬가지로 자기 자신의 값 외에 다른 값을 갖도록 하는 것은 
동일하지만, `Associated Values`와 달리 `동일 타입의 값`만 `cases`로 저장할 수 있다.

`Raw Values`를 정의하는 방법은 `enum`을 정의함과 동시에 `default values`를 정의하는 것이다.

__Syntax__

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

> `Raw Values`는 `String`, `Character`, `Integer`, `Floating-Point Number` 타입이 가능하다.  
> `Raw Values`는 `unique`해야한다.

#### 1. Implicitly Assigned Raw Values

`Enumerations`가 `Integer` 또는 `String` `Raw Values`를 저장할 경우 모든 `case`에 명시적(explicit)으로 
값을 지정하지 않아도 `Swift`는 암시적(implicit)으로 값을 할당한다.

- Integer Raw Value

`Integer`이 `Raw Values`로 사용된 경우, 값을 지정한 `case`의 다음 순서부터 1씩 증가시킨다. 시작 값을 
지정하지 않을 경우 `default`로 0을 할당한다.

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
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

print(Planet.mercury.rawValue)  // 1
print(Planet.venus.rawValue)    // 2
print(Planet.neptune.rawValue)  // 8
```

<br>

아래와 같은 경우 `10, 20, 30, 40, ...` 이 아닌 `10, 20, 21, 22, ...` 이므로 주의한다. 

```swift
enum Planet: Int {
    case mercury = 10, venus = 20, earth, mars, jupiter, saturn, uranus, neptune
}

print(Planet.mercury.rawValue)  // 10
print(Planet.venus.rawValue)    // 20
print(Planet.neptune.rawValue)  // 26
```

<br>

마찬가지로 아래의 경우도 `2, 3, 4, 5, 6, ..., 9`가 아니라 `0, 1, 2, 5, 6, ..., 9`이므로 주의한다.

```swift
enum Planet: Int {
    case mercury, venus, earth, mars = 5, jupiter, saturn, uranus, neptune
}

print(Planet.mercury.rawValue)  // 0
print(Planet.venus.rawValue)    // 5
print(Planet.neptune.rawValue)  // 9
```

<br>

- String Raw Value

`String`이 `Raw Values`로 사용된 경우, 암시적으로 각 `cases`의 이름이 `String`으로 할당된다.

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

#### 2. Initializing from a Raw Value

`Enumeration`을 `Raw Value`를 이용해 정의하면, `Raw Value`를 받아 일치하는 `Enumeration`의 `Instance` 
또는 `nil`을 반환하는 `initializer`를 이용할 수 있다.

- Creating `instance of the enumeration` using `cases of the enumeration`

```swift
let possiblePlanet = Planet.uranus
print(possiblePlanet)   // uranus
```

> 명확하게 `case`를 지정하므로, 언제나 해당하는 `case`의 `Enumeration`을 `Instance`로 생성한다.

<br>

- Creating `iinstance of the enumeration` or using `raw values`

```swift
let possiblePlanet = Planet(rawValue: 7)
print(type(of: possiblePlanet))     // Optional<Planet>
print(possiblePlanet as Any)        // Optional(__lldb_expr_41.Planet.uranus)
print(possiblePlanet!)              // uranus

let impossiblePlanet = Planet(rawValue: 9)
print(type(of: impossiblePlanet))   // Optional<Planet>
print(impossiblePlanet as Any)      // nil
```

> `Raw Value`를 이용하는 것은 명시적으로 `case`를 지정하는 것이 아니므로 언제나 `Enumeration`의 `Instance`를 
> `Optional` 타입으로 생성한다.

<br>

따라서 다음과 같이 `Optional Binding`을 이용해 안전하게 처리하는 것이 좋다.

```swift
var positionToFind = 3
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .earth: print("Mostly harmless")
    default: print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
```

```console
Mostly harmless
```

<br>

```swift
var positionToFind = 11
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .earth: print("Mostly harmless")
    default: print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
```

```console
There isn't a planet at position 11
```

<br>

```swift
var positionToFind = 11
let isThisSafePlanet = { (planetNumber: Int) -> Bool in
    guard let somePlanet = Planet(rawValue: planetNumber) else {
        print("There isn't a planet at position \(planetNumber)")
        return false
    }
    switch somePlanet {
    case .earth:
        print("Mostly harmless")
        return true
    default:
        print("Not a safe place for humans")
        return false
    }
    
}

let safe = isThisSafePlanet(positionToFind)
print("safe: \(safe)")
```

```console
There isn't a planet at position 11
safe: false
```

---

### 6. Recursive Enumerations 👩‍💻

`Enumeration`의 `case`가 다시 자기 자신을 `Associated Values`로 가질 때 이를 `Recursive`라 하며, 
반드시 `indirect` 키워드를 명시해야한다.

<br>

```swift
enum ArithmeticExpression { // Recursive enum 'ArithmeticExpression' is not marked 'indirect'
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

`indirect` 키워드 없이 선언하면 `Swift-compiler`에 의해 에러가 발생된다.

<br>

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

반드시 `Recursive-case` 앞에 `indirect` 키워드를 붙여줘야한다.  
만약, `enum` 키워드 앞에 `indirect` 키워드를 선언하면 모든 `cases`에 `indirect`를 선언할 수 있다.


```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

위 `Enumeration` `ArithmeticExpression.Type`은 다음 3 가지의 `arithmetic expressions`(산술 표현식)을 
저장할 수 있다.

- a plain number
- the addition of two expressions
- the multiplication of two expressions

이 중 `addition`과 `multiplication` `cases`는 다시 `arithmetic expressions`를 `Associated Values`로 
가지므로 표현식의 중첩을 허용해 `Recursive` 상태를 만든다.

<br>

`(5 + 4) * 2`를 `ArithmeticExpression.Type`를 이용해 선언해보자. 데이터가 중첩(nested)되므로, `Enumeration` 역시 중첩(nested)이 가능해야한다.

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

<br>

`Recursive Structure`를 가진 데이터를 다루는 가장 직관적인 방법은 `Recursive Function` 을 이용하는 것이다.

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value): return value
    case let .addition(left, right): return evaluate(left) + evaluate(right)
    case let .multiplication(left, right): return evaluate(left) * evaluate(right)
    }
}
```

`evaluate(_:)`의 첫 번째 `case`는 `Optional Binding` 하듯 `ArithmeticExpression.Type`으로부터
`Int`를 반환한다.  
`evaluate(_:)`의 두 번째와 세 번째 `case`는 첫 번째 `case`를 취하도록 `Recursive Function`으로 작성되었다.

`ArithmeticExpression`와 `evaluate(_:)`의 구조가 모두 `Recursive`인 것을 확인할 수 있다.

```swift
print(evaluate(five))       // 5
print(evaluate(four))       // 4
print(evaluate(sum))        // 9
print(evaluate(product))    // 18
```

<br><br>

---
Reference

1. "Enumerations", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 1,
   2022, [Swift Docs Chapter 7 - Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)
