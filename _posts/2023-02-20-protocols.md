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

주사위를 정의한다.

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

Initializer 에 *Protocol* 이 Type 으로 사용되었다.

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

#### 1. Delegation

`Delegation`은 Class 또는 Structure 가 일부 책임을 다른 Type 의 Instance 에게 `hand off(or delegate)` 할 수 
있도록 하는 `Design Pattern`이다. 이 Design Pattern 은 위임된 책임이 `캡슐화(encapsulates)`된 Protocol 을 정의하는 것으로 구현되어지며, 
대리자(delegate)가 위임된 기능을 제공하는 것을 보장한다. 따라서 *Delegation* 은 특정 작업에 응답하거나 캡슐화된 유형을 알 
필요 없이 기능을 제공하고자 하는데 사용된다.

#### 2. Examples

위에서 만든 *RandomNumberGenerator* Protocol, *Dice* Class 를 이용해 다음 두 Protocols 를 정의한다. 

```swift
protocol DiceGame {
    var dice: Dice { get }
    func play()
}

protocol DiceGameDelegate: AnyObject {
    func gameDidStart(_ game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(_ game: DiceGame)
}
```

*DiceGame* Protocol 은 주사위를 이용한 어떤 게임에게나 채택될 수 있고, *DiceGameDelegate* Protocol 은 *DiceGame* 
의 진행 상태를 추적하기 위해 채택될 수 있다.

![Snake and Ladders Game](/assets/images/posts/2023-02-20-protocols/snakesAndLadders~dark@2x.png){: width="800"}

```swift
class SnakesAndLadders: DiceGame {
    let finalSquare = 25
    let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
    var square = 0
    var board: [Int]

    init() {
        board = Array(repeating: 0, count: finalSquare + 1)
        board[3] = 8; board[6] = 11; board[9] = 9; board[10] = 2
        board[14] = -10; board[19] = -11; board[22] = -2; board[24] = -8
    }

    weak var delegate: DiceGameDelegate?

    func play() {
        square = 0
        delegate?.gameDidStart(self)
        gameLoop: while square != finalSquare {
            let diceRoll = dice.roll()
            delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
            switch square + diceRoll {
            case finalSquare:                                   // newSquare == finalSqure : finish
                break gameLoop
            case let newSquare where newSquare > finalSquare:   // roll dice again until it euqals finalSquare
                continue gameLoop
            default:                                            // progress game play
                square += diceRoll
                square += board[square]
            }
        }
        delegate?.gameDidEnd(self)
    }
}
```

[Strong Reference Cycles Between Class instances][Strong Reference Cycles Between Class instances] 를
예방하기 위해 *delegates* 는 `Week References`로 선언되었다.

[Strong Reference Cycles Between Class instances]:https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/#Strong-Reference-Cycles-Between-Class-Instances

> [Class-Only Protocols](#h-10-class-only-protocols-) 에서 다시 살펴보겠지만, `AnyObject`를 상속시키는것으로 
> Protocol 은 `Class-Only Protocols`로 marking 된다. 그리고 **Class-Only Protocols** 를 채택한 **Class** 
> 는 반드시 `delegate 를 Week Reference 로 선언`해야야한다.

<br>

이제 *DiceGameDelegate* Protocol 을 채택한 *Game Tracker* 를 만들어보자.

```swift
class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0

    func gameDidStart(_ game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game of Snakes and Ladders")
        }
        print("The game is using a \(game.dice.sides)-side dice")
    }

    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        numberOfTurns += 1
        print("Rolled a \(diceRoll)")
    }

    func gameDidEnd(_ game: DiceGame) {
        print("The game lasted for \(numberOfTurns) turns")
    }
}
```

<br>

게임을 진행시켜 `Delegate`를 어떻게 위임시켜 작동하도록 하는지 살펴보자.

```swift
let tracker = DiceGameTracker()
let game = SnakesAndLadders()
game.delegate = tracker
game.play()
```

```console
Started a new game of Snakes and Ladders
The game is using a 6-side dice
Rolled a 2
Rolled a 3
Rolled a 5
Rolled a 6
Rolled a 2
Rolled a 3
Rolled a 5
Rolled a 6
Rolled a 1
Rolled a 3
Rolled a 4
Rolled a 6
Rolled a 1
Rolled a 3
Rolled a 4
Rolled a 5
Rolled a 1
Rolled a 2
Rolled a 4
Rolled a 5
Rolled a 1
Rolled a 2
Rolled a 3
Rolled a 5
Rolled a 6
Rolled a 2
Rolled a 3
Rolled a 5
Rolled a 6
Rolled a 2
The game lasted for 30 turns
```

---

### 5. Adding Protocol Conformance with an Extension 👩‍💻

#### 1. Adding Protocol Conformance with an Extension

기존 타입에 대해 소스 코드에서 접근할 수 없지만 새로운 프로토콜을 채택하고 준수하도록 해 확장할 수 있다. 이를 이용해 기존 타입에 새로운 
Properties, Methods, Subscripts 를 추가할 수 있다. 

이전의 [Swift Extensions](/swift/2023/01/17/extensions.html) 에서 `extension` keyword 만 이용해 확장을 했는데 
이번 챕터에서는 `extension`을 확장할 때 `Protocol`을 채택시켜 확장하도록 해본다.

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

```swift
let d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())

print(d6.textualDescription)    // A 6-sided dice
print(d12.textualDescription)   // A 12-sided dice
```

#### 2. Extending Primitive Types using Protocols

이번에는 [Swift Strings and Characters][Swift Strings and Characters] 챕터에서 사용해본 Swift 의 불편한 문자열 접근과 
[Swift Extensions][Swift Extensions] 챕터에서 확장할 때 사용했던 *Subscripts* 를 *Protocol* 을 이용해 확장해보자.

[Swift Strings and Characters]:/swift/2022/09/17/strings-and-characters.html#h-8-accessing-and-modifying-a-string-문자열-접근과-수정-
[Swift Extensions]:swift/2023/01/17/extensions.html#h-6-subscripts-

공통으로 사용할 Protocol 을 하나 정의한다.

```swift
protocol easyIndex {
    subscript(_ digitIndex: Int) -> Self { get }
}
```

<br>

__1 ) 우선 [Swift Extensions][Swift Extensions] 를 Protocol 을 이용하는 것으로 바꿔보자__

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

__2 ) [Swift Strings and Characters][Swift Strings and Characters] 역시 index 를 이용해 접근할 수 있도록 바꿔보자__

```swift
let greeting = "Guten Tag!"

print(greeting.startIndex)                              // Index(_rawBits: 15)
print(greeting.index(greeting.startIndex, offsetBy: 3)) // Index(_rawBits: 196871)
```

이미 이전 챕터에서 살펴보았지만 Swift 는 문자열에 대한 `index`가 다른 언어와는 좀 다르다. 따라서 접근할 때도 메서드를 사용해 다음과 같이 
접근해야만한다.

```swift
print(greeting[greeting.startIndex])                                // G
print(greeting[greeting.index(greeting.startIndex, offsetBy: 1)])   // u
print(greeting[greeting.index(greeting.startIndex, offsetBy: 2)])   // t
print(greeting[greeting.index(greeting.endIndex, offsetBy: -1)])    // !
```

반면 TypeScript 나 Python 등 다른 언어에서는 다음과 같이 직관적이고 쉽게 접근이 가능하다.

```typescript
const greeting: string = "Guten Tag!"

console.log(greeting[0])                    // G
console.log(greeting[1])                    // u
console.log(greeting[2])                    // t
console.log(greeting[greeting.length - 1])  // !
```

<br>

위 Protocol 을 이용해 Swift 의 String 을 확장해보자.

```swift
extension String: easyIndex {
    subscript(digitIndex: Int) -> String {
        String(self[self.index(self.startIndex, offsetBy: digitIndex)])
    }
}
```

> 위 Subscript 는 TypeScript 와 동일하게 `앞에서부터 zero-based index`로 접근한다.

```swift
print(greeting[0])                  // G
print(greeting[1])                  // u
print(greeting[2])                  // t
print(greeting[greeting.count - 1]) // !
```

#### 3. Conditionally Conforming to a Protocol (where)

`Generic Type`은 오직 `Generic parameter 가 Protocol 에 적합한 경우`와 같은 특정 조건에서만 Protocol 의 요구사항을 
만족할 수 있다. 따라서 *Generic Type* 을 확장할 때 `where`를 이용해 `constraints`를 나열해 조건부로 준수하도록 만들어야한다. 
이것은 추후 [Generic Where Clauses](링크 추가 예정) 에서 자세히 다룬다.

> [Switch Value Binding with Where](/swift/2022/10/11/control-flow.html#h-7-where) 에서 본 것 처럼 조건을 
> 매칭시킬 때 `where`는 주로 추가적인 조건을 `constraints`로 추가하기 위해 사용된다.

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
`Array 의 Element 가 TextRepresentable 에 적합`한 경우로 제한한다. 그래야만 `self.map { $0.textualDescription }`에서 
에러가 발생하지 않기 때문이다.

```swift
let myDice = [d6, d12]
print(myDice.textualDescription)    // [A 6-sided dice, A 12-sided dice]
```

```swift
let myNumber = [1, 2, 4, 6]
let myString = ["A", "C", "F"]

myNumber.textualDescription // Property 'textualDescription' requires that 'Int' conform to 'TextRepresentable'
myString.textualDescription // Property 'textualDescription' requires that 'String' conform to 'TextRepresentable'
```

#### 4. Declaring Protocol Adoption with an Extension

`Protocol 을 채택해 확장하려는 기능이 이미 Type 에 존재`한다면, 어떻게 해야할까? [Swift Extensions][Extension cannot override] 
에서 살펴본 것처럼 ***Extension 은 Overriding 을 할 수 없다***.

[Extension cannot override]:/swift/2023/01/17/extensions.html#h-1-extension-vs-inheritance-

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

