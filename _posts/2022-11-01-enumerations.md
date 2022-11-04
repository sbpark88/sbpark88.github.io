---
layout: post
title: Swift Enumerations
subtitle: Enumerations
categories: swift
tags: [swift docs, swift enumerations]
---

### <span style="color: orange">1. Enumeration Syntax 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Enumerations in Swift</span>

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

#### <span style="color: rgba(166, 42, 254, 1)">2. Enumeration Examples</span>

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

### <span style="color: orange">2. Matching Enumeration Values with Switch 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Matching with Switch</span>
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

#### <span style="color: rgba(166, 42, 254, 1)">2. Switch must be exhaustive</span>

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

### <span style="color: orange">3. Iterating over Enumeration Cases 👩‍💻</span>

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

### <span style="color: orange">4. Associated Values 👩‍💻</span>

때로는 `Enumeration`의 `cases`가 자기 자신의 값 외에 다른 타입의 값을 함께 저장하는 것이 
유용할 때가 있다. 이를 `Associated Value`라고 하며, 이는 다른 프로그래밍 언어에서 
`unions`, `tagged unions`, `variants`로 알려진 것들과 유사하다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Barcode Systems for Examples</span>

1D barcodes in `UPC` format, 2D barcodes in `QR code` format 를 이용해 설명한다.

- Barcodes UPC

![Barcodes UPC](/assets/images/posts/2022-11-01-enumerations/barcode_UPC_2x.png)

- Barcodes QR code

![Barcodes QE code](/assets/images/posts/2022-11-01-enumerations/barcode_QR_2x.png)

<br>

우선 `UPC`는 1D 바코드로 `numebr system`, `manufacturer code`, `product code`, `check` 순으로 
이뤄진 4개의 `Int` 그룹으로 구성되어진다.  
다음으로 `QR code`는 2D 바코드로 2,953자 이내의 어떠한 `ISO 8859-1` 문자든 저장할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Adopt to Associated Values</span>

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

__`Barcode` enum type이 가질 수 있는 값은 다음과 같다.__
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

#### <span style="color: rgba(166, 42, 254, 1)">3. Switch Statements with Associated Values</span>

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

---

### <span style="color: orange">5. Raw Values 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. Implicitly Assigned Raw Values</span>
#### <span style="color: rgba(166, 42, 254, 1)">2. Initializing from a Raw Value</span>

---

### <span style="color: orange">6. Recursive Enumerations 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>


<br><br>

---
Reference

1. "Enumerations", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 1,
   2022, [Swift Docs Chapter 7 - Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)
