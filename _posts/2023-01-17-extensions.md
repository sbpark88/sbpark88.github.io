---
layout: post
title: Swift Extensions
subtitle: Extensions add new functionality to an existing class, structure, enumeration, or protocol type.
categories: swift
tags: [swift docs, extension, category]
---

### 1. Extension vs. Inheritance 👩‍💻

기존의 `Types`를 확장하기 위한 방법 중 하나인 [Inheritance](/swift/2022/11/29/inheritance.html) 
는 Class 에서만 사용할 수 있다.
Inheritance 는 기존 Class 는 그대로 둔 채 별도의 Class 를 생성하며, 이들은 Superclass/Subclass 라는 관계로 연결된 Hierarchy 
구조를 갖는다. Subclass 는 기존의 Superclass 애 기능을 추가해 확장하는 것 뿐 아니라 이미 존재하는 기능을 Overriding 하는 것도 가능하다.

`Extension`은 Class, Structure, Enumeration, Protocol 타입에서 사용이 가능하며 Extensions 가 할 수 있는 것은 다음과 같다.

- Add [computed instance properties][Computed Instance Properties] and [computed type properties][Computed Type Properties]
- Define [instance methods][instance methods] and [type methods][type methods]
- Provide new initializers
- Define subscripts
- Define and use new nested types
- Make an existing type conform to a protocol

<br>

Extension 은 Inheritance 와 마찬가지로 기존에 존재하는 타입에 기능을 추가할 수 있다. 그리고 Extension 이 갖는 특징으로 Inheritance 
와 다른점은 다음과 같다.

- <span style="color: red;">Original source code 에 접근 권한이 없는 경우에도 Extension 이 가능</span>하다. 
  이를 `Retroactive Modeling`(소급 모델링) 이라 한다.
- Extension 은 기능을 추가만 가능할 뿐 Inheritance 와 달리 Overriding 은 불가능하다.

> Swift 의 `Extensions`는 Objective-C 의 `Categories`와 유사하다. 단, `Extensions`는 이름을 갖지 않는다.

### 2. Extension Syntax 👩‍💻

__Syntax__

```swift
extension SomeType {
    // new functionality to add to SomeType goes here
}
```

Extension 은 하나 이상의 Protocols 를 채택해 기존의 타입을 확장할 수 있다.

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
    // implementation of protocol requirements goes here
}
```

이뿐 아니라 `Generic Type`을 확장하는 것 역시 가능하다.

### 3. Computed Properties 👩‍💻

Extensions 를 이용해 `Computed Instance Properties` 또는 `Computed Type Properties`를 확장하는 것이 가능하다. 이것은 
사용자가 정의한 타입 뿐 아니라 Built-in Types 를 확장하는 것을 포함한다.

다음 예제는 TypeScript 가 Prototype 을 이용해 Built-in Types 에 기능을 추가하듯 다양한 길이 단위를 `meter` 단위로 변경하기 위해 
Double 에 5개의 Computed Instance Properties 를 추가한다.

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

> Extensions 는 [Computed Instance Properties][Computed Instance Properties] 나 
> [Computed Type Properties][Computed Type Properties] 를 추가하는 것만 가능하다.  
> [Stored Properties][Stored Properties] 를 추가하거나, 
> 이미 존재하는 Properties 에 [Property Observers][Property Observers] 를 추가하는 것은 불가능하다.

### 4. Initializers 👩‍💻

#### 1. Initializer Extensions

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
> [Deinitializers][Deinitializers] 를 추가하는 것은 불가능하다.

#### 2. Without Initializer Extensions

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

#### 3. With Initializer Extensions

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

> - Without Extensions : 사용자 정의 Initializers 를 추가하는 순간 Default Initializers 와 Memberwise Initializers 는 
>                        자동 생성되는 조건을 만족하지 않게 된다. 따라서 필요한 만큼 Default Initializers 와
>                        Memberwise Initializers 를 명시적으로 생성해야한다.
> - With Extensions : `Original implementation`은 Default Initializers 와 Memberwise Initializers 의 조건을 만족하므로 
>                     자동으로 해당 Initializers 를 생성한다. Extensions 를 이용한 Initializers 추가는 이미 존재하는 `Types`에 
>                     새 Initializers 만 추가하는 것이므로 자동 생성된 Default Initializers, Memberwise Initializers 와 
>                     사용자 정의 Initializers 가 모두 존재하게된다.

### 5. Methods 👩‍💻

#### 1. Add Instance Methods

#### 2. Mutating Instance Methods

### 6. Subscripts 👩‍💻


<br><br>

---
Reference

1. "Extensions", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Jan. 17, 2023, [Swift Docs Chapter 20 - Nested Types](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)


[Computed Instance Properties]:/swift/2022/11/22/properties.html#h-2-computed-properties-
[Computed Type Properties]:/swift/2022/11/22/properties.html#h-6-type-properties-
[instance methods]:/swift/2022/11/27/methods.html#h-2-instance-methods-
[type methods]:/swift/2022/11/27/methods.html#h-3-type-methods-
[Stored Properties]:/swift/2022/11/22/properties.html#h-1-stored-properties-
[Property Observers]:/swift/2022/11/22/properties.html#h-3-property-observers-
[Designated and Convenience Initializers]:/swift/2022/12/01/initialization.html#h-2-syntax-for-designated-and-convenience-initializers
[Deinitializers]:/swift/2022/12/19/deinitialization.html#h-1-deinitializer-on-class-types-
[Default Initializers & Memberwise Initializers for Structure Types]:/swift/2022/12/01/initialization.html#h-3-default-initializers-
