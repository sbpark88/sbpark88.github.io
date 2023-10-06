---
layout: post
title: Swift Extensions
subtitle: Extensions add new functionality to an existing class, structure, enumeration, or protocol type.
categories: swift
tags: [swift docs, extension, category]
---

### 1. Extension vs. Inheritance 👩‍💻

기존의 *Types* 를 확장하기 위한 방법 중 하나인 [Inheritance](/swift/2022/11/29/inheritance.html) 는 
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

### 2. Extension Syntax 👩‍💻

__Syntax__

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

### 3. Computed Properties 👩‍💻

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
> [Stored Properties] 를 추가하거나, 이미 존재하는 Properties 에 [Property Observers] 를 추가하는 것은 불가능하다.

### 4. Initializers 👩‍💻

기존의 `Value Types`가 모든 Stored Properties 에 default values 를 제공하고, Initializers 를 구현하지 않아
[Default Initializers & Memberwise Initializers][Default Initializers & Memberwise Initializers for Structure Types] 의 
조건을 모두 만족하면, Extension 의 Initializer 에서 `Default Initializers`와 `Memberwise Initializers`를 사용하는 것이 가능하다.

> 즉, <span style="color: red;">Default Initializers 와 Memberwise Initializers 를 유지하면서 사용자 정의 Initializers 
> 를 추가</span>할 수 있다. 대신 다른 Instances 들이 Initializer Extensions 으로 인해 영향을 받지 않고 정상적으로 초기화 되어 
> instance 가 생성되는지 확인해야할 책임이 따른다.

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
}
```

`Rect`는 Default Initializers 와 Memberwise Initializers 조건을 만족하므로 Default Initializers 와 
Memberwise Initializers 가 자동으로 생성된다.

```swift
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0), size: Size(width: 5.0, height: 5.0))
```

> Extensions 는 [Convenience Initializers][Designated and Convenience Initializers] 를 추가하는 것만 가능하다.  
> [Designated Initializers][Designated and Convenience Initializers] 나
> [Deinitializers] 를 추가하는 것은 불가능하다.

<br>

__1 ) Without Initializer Extensions__

위 `Rect`에 중심점과 크기를 받아 Rect instance 를 생성하는 새 Initializers 를 추가해보자. 그 Initializers 는 다음과 같을 것이다.

```swift
init(center: Point, size: Size) {
    let originX = center.x - (size.width / 2)
    let originY = center.y - (size.height / 2)
    self.init(origin: Point(x: originX, y: originY), size: size)
}
```

하지만 [Initializer Delegation for Value Types](/swift/2022/12/01/initialization.html#h-4-initializer-delegation-for-value-types-) 
에서 살펴본 것처럼 `init(center:size:)`를 추가하는 순간 Default Initializers 와 Memberwise Initializers 를 자동 생성하는 
조건을 만족하지 않으므로 이에 필요한 Initializers 를 명시적으로 함께 생성해야한다.

```swift
init() {}
init(origin: Point, size: Size) {
    self.origin = origin
    self.size = size
}
```

<br>

위 Initializers 를 추가해 코드를 완성시켜보자.

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

<br>

__2 ) With Initializer Extensions__

이제 `Rect`에 Extensions 를 이용해 Initializers 를 추가해보자.

```swift
extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

Extensions 의 내부에서 `Initializer Delegation`을 하기 위해 Memberwise Initializers 를 사용한다. 하지만 기존의 `Rect`는 
이를 위해 Default Initializers 와 Memberwise Initializers 를 명시적으로 생성할 필요가 없다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
}
```

Original Structures `Rect`는 여전히 아무런 Initializers 의 구현을 필요로 하지 않는다.
<br>

Extensions 를 이용한 Initializer Extensions 의 코드를 완성시켜보자.

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


let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0), size: Size(width: 5.0, height: 5.0))
let centerRect = Rect(center: Point(x: 4.0, y: 4.0), size: Size(width: 3.0, height: 3.0))

printRect(defaultRect)      // The origin is (0.0, 0.0) and its size is (0.0, 0.0)
printRect(memberwiseRect)   // The origin is (2.0, 2.0) and its size is (5.0, 5.0)
printRect(centerRect)       // The origin is (2.5, 2.5) and its size is (3.0, 3.0)

extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}

func printRect(_ rect: Rect) {
    print("The origin is (\(rect.origin.x), \(rect.origin.y)) and its size is (\(rect.size.width), \(rect.size.height))")
}
```

- Without Extensions : 사용자 정의 Initializers 를 추가하는 순간 Default Initializers 와 
                       Memberwise Initializers 는 자동 생성되는 조건을 만족하지 않게 된다. 따라서 *필요한 만큼 
                       Default Initializers 와 Memberwise Initializers 를 명시적으로 생성*해야한다.
- With Extensions : `Original implementation`은 *Default Initializers 와 Memberwise Initializers 
                    의 조건을 만족하므로 자동으로 해당 Initializers 를 생성*한다. 따라서 `Default Initializers 와 
                    Memberwise Initializers 의 생성 조건을 유지한 채 Custom Initializers 를 추가하는 것을 가능`
                    하게 한다.

### 5. Methods 👩‍💻

#### 1. With Method Extensions

Extensions 를 이용해 `Instance Methods`와 `Type Methods`를 확장하는 것이 가능하다. 이것은 
[Computed Property Extensions](#h-3-computed-properties-) 와 마찬가지로 사용자가 정의한 타입 뿐 아니라 
`Built-in Types 를 확장하는 것을 포함`한다.

다음 예제는 Built-in Types 에 별도의 Iterator 를 사용하지 않고 내장된 메서드만을 사용해 반복을 할 수 있도록 Int 에 반복을 실행하는 
Instance Methods 를 추가한다.

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```

<br>
다음 세 코드는 모두 동일한 작동을 한다.

```swift
for _ in 1...3 {
    print("Hello!")
}
```

```swift
Array(1...3).forEach { _ in print("Hello!") }
```

```swift
3.repetitions { print("Hello!") }
```

```console
Hello!
Hello!
Hello!
```

#### 2. Mutating Method of Value Types

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

### 6. Subscripts 👩‍💻

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

### 7. Nested Types 👩‍💻

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


<br><br>

---
Reference

1. "Extensions." The Swift Programming Language Swift 5.7. accessed Jan. 17, 2023, [Swift Docs Chapter 20 - Nested Types](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)


[Computed Instance Properties]:/swift/2022/11/22/properties.html#h-2-computed-properties-
[Computed Type Properties]:/swift/2022/11/22/properties.html#h-6-type-properties-
[instance methods]:/swift/2022/11/27/methods.html#h-2-instance-methods-
[type methods]:/swift/2022/11/27/methods.html#h-3-type-methods-
[Stored Properties]:/swift/2022/11/22/properties.html#h-1-stored-properties-
[Property Observers]:/swift/2022/11/22/properties.html#h-3-property-observers-
[Designated and Convenience Initializers]:/swift/2022/12/01/initialization.html#h-2-syntax-for-designated-and-convenience-initializers
[Deinitializers]:/swift/2022/12/19/deinitialization.html#h-1-deinitializer-on-class-types-
[Default Initializers & Memberwise Initializers for Structure Types]:/swift/2022/12/01/initialization.html#h-3-default-initializers-
