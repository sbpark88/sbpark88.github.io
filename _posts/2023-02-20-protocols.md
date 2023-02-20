---
layout: post
title: Swift Protocols
subtitle: Swift protocols make blueprint
categories: swift
tags: [swift docs, protocol, blueprint, requirement, delegation, add protocol, adopt protocol, protocol inheritance, class-only protocol, protocol extensions]
---

### 1. Protocols 👩‍💻

#### 1. Protocols7

`Protocol`은 Methods, Properties, 그리고 특정 작업이나 기능의 요구사항을 정의하기위한 `blueprint`로, *Protocol* 은
*Class*, *Structure*, *Enumeration* 에 `채택(adopt)`되어 요구사항을 구현하도록 한다. 그리고 `Protocol 의 모든 요구사항에 
충족`하면 그 Type 은 해당 Protocol 을 `준수(confirm)`한다고 표현한다.

#### 2. Protocol Syntax

__Syntax__

```swift
protocol SomeProtocol {
    // protocol definition goes here
}
```

*Protocol* 을 정의하는 방법은 *Class*, *Structure*, *Enumeration* 을 정의하는 방법과 유사하다.

#### 3. Adopt Protocol

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

---

### 2. Protocol Requirements 👩‍💻

#### 1. Property Requirements

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

> `get set`을 모두 정의할 경우 자동으로 [Constant Stored Properties][Stored Properties] 와 
> [Read-Only Computed Properties][Read-Only Computed Properties] 는 자연스레 준수하는 것이 불가능하다.
> 
> 반면 `get`만 정의할 경우 모든 종류의 [Properties][Swift Properties] 에 대해 Protocol 을 준수할 수 있다. 
> 그리고 이것이 유효할 때 `set`이 유효한 타입이라면 `set`은 자동으로 유효하다.

여기서 주의해야 할 것이 `{ get set }`은 이 Protocol 을 채택하는 Type 이 반드시 `get set`을 만족하도록 구현해야한다는 
의미이고, `{ get }`은 반드시 `get`을 만족하도록 구현해야한다는 의미다. ***'get' 만 만족하고 'set' 을 만족하지 않도록 
`Read-Only`임을 강제하는 것이 아니다***. 

[Swift Properties]:/swift/2022/11/22/properties.html
[Stored Properties]:/swift/2022/11/22/properties.html#h-1-stored-properties-
[Read-Only Computed Properties]:/swift/2022/11/22/properties.html#h-3-read-only-computed-properties

<br>

__You cannot define__

- `let` keyword
- What type of properties (i.e. stored properties or computed properties)

> Protocol 이 Properties 요구사항을 정의할 때 반드시 `var` keyword 만 사용하며, Properties 의 유형은 정의할 수 없다.

<br>

__2 ) Type Properties__

```swift
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

또한 Protocol 이 [Type Properties](/swift/2022/11/22/properties.html#h-6-type-properties-) 를 
정의할 때는 마찬가지로 `static` keyword 를 반드시 작성해야한다(이 규칙은 *Classes* 에의해 구현될 때 `class` 또는 `static` 
keyword 를 요구하는 경우 모두 적용된다).

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

#### 2. Method Requirements

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

__You cannot define__

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

#### 3. Mutating Method Requirements

Protocol 에서 Methods 를 `mutating`으로 정의했을 때 이 Protocol 을 채택하는 Type 이 `Classes`인 경우는 
**Reference Types** 이므로 `mutating` keyword 를 작성할 필요가 없다. 오직 **Value Types** 인 
`Structures` 와 `Enumerations`에서만 작성한다.

__Example__

```swift
protocol Togglable {
    mutating func toggle()
}
```

```swift
enum OnOffSwitch: Togglable {
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

#### 4. Initializer Requirements


*Methods* 에 대한 요구사항 역시 *Properties* 와 유사하다.

__1 ) Syntax__

__You can define__

- parameter

Methods 와 유사하다. 하지만 *Initializers* 는 *name* 과 *Explicit return type* `static` 이 허용되지 않기 
때문에 당연히 Protocol 역시 불가능하다. 즉, ***어떤 `Custom Initializrer`를 구현해야 하는지 그 Type 만 정의***한다.


```swift
protocol SomeProtocol {
    func someTypeMethod() -> SomeType
}
```

<br>

__You cannot define__

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

위에서 *Structures* 를 이용한 예제를 살펴보았다. 그런데 ***Protocol 의 Initializers 를 `Classes` 에 채택***하려면 
반드시 [Required Initializers](/swift/2022/12/01/initialization.html#h-7-required-initializers--) 
를 사용해 이 *Class 의 Subclasses* 가 반드시 이를 구현하도록 강제해야한다.

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

하지만 [Classes 가 `final` modifier 를 이용해 정의되는 경우][Preventing Overrides], 이 *Class* 는 더이상 
`Subclassing` 될 수 없기 때문에 `required`를 작성할 필요가 없다.

[Preventing Overrides]:/swift/2022/11/29/inheritance.html#h-3-preventing-overrides-

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

[Failable Initializers](/swift/2022/12/01/initialization.html#h-6-failable-initializers-) 역시 
해당 *Protocol* 을 채택항 Types 가 이를 준수하도록 정의할 수 있다.

- `Failable Initializer Requirements`는 *Failable Initializer* 또는 *Nonfailable Initializer* 
  에 의해 충족될 수 있다.
- `Nonfailable Initializer Requirements`는 *Nonfailable Initializer* 또는 
  *Implicitly Unwrapped Failable Initializer* 에 의해 충족될 수 있다.

---

### 3. Protocols as Types 👩‍💻

#### 1. Protocols as Types

*Protocols* 는 자체적으로 어떠한 기능도 구현하지 않는다. 그럼에도 불구하고 코드에서 `Fully Fledged Types`으로 사용할 수 있다. 
Types 로 Protocols 를 사용하는 것은 “there exists a type T such that T conforms to the protocol”라는 
구절에서 비롯된 `존재 타입(Existential Type)`이라 한다.

즉, *Protocols* 역시 [First-Class Citizen](/swift/2022/11/07/higher-order-function.html#h-1-first-class-citizen) 
으로 다룰 수 있다는 것을 의미한다.

- Function, Method, Initializer 의 `Parameter Type` 또는 `Return Type`으로 사용될 수 있다.
- `Constant, Variable, Property 의 Type`으로 사용될 수 있다.
- `Array, Dictionary, 또는 다른 Container 의 Type`으로 사용될 수 있다.

> **Protocols** 역시 `Swift Types`이므로 이름은 `대문자로 시작`한다.

> Superclass 에서 Subclasss 로 [Downcasting][Downcasting] 하던 것처럼 `Protocol Type`에서 이것을 준수하는
> `Underlying Type`으로 **Downcasting** 할 수 있다.

[Downcasting]:/swift/2023/01/14/type-casting.html#h-3-downcasting-type-cast-operator-as-as-

#### 2. Examples

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

---

### 4. Delegation 👩‍💻

---

### 5. Adding Protocol Conformance with an Extension 👩‍💻

#### 1. Adding Protocol Conformance with an Extension

#### 2. Conditionally Conforming to a Protocol

#### 3. Declaring Protocol Adoption with an Extension

---

### 6. Adopting a Protocol Using a Synthesized Implementation 👩‍💻

---

### 7. Collections of Protocol Types 👩‍💻

---

### 9. Protocol Inheritance 👩‍💻

---

### 10. Class-Only Protocols 👩‍💻

---

### 11. Protocol Composition 👩‍💻

---

### 12. Checking for Protocol Conformance 👩‍💻

---

### 13. Optional Protocol Requirements 👩‍💻

---

### 14. Protocol Extensions 👩‍💻

#### 1. Protocol Extensions

#### 2. Providing Default Implementations

#### 3. Adding Constraints to Protocol Extensions


<br><br>

---
Reference

1. "Protocols." The Swift Programming Language Swift 5.7. accessed Feb. 20, 2023, [Swift Docs Chapter 18 - Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols)

