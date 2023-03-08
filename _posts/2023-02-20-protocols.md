---
layout: post
title: Swift Protocols
subtitle: Protocols make blueprint that define requirements that conforming types must implement.
categories: swift
tags: [swift docs, protocol, blueprint, requirement, delegation, add protocol, adopt protocol, protocol inheritance, class-only protocol, protocol extension, equatable, hashable, comparable, optional protocol requirement, check protocol, protocol constraint where]
---

### 1. Protocols 👩‍💻

#### 1. Protocols

`Protocol`은 Methods, Properties, 그리고 특정 작업이나 기능의 요구사항을 정의하기위한 `blueprint`로, *Protocol* 은
*Class*, *Structure*, *Enumeration* 에 `채택(adopt)`되어 요구사항을 구현하도록 한다. 그리고 `Protocol 의 모든 요구사항에 
충족`하면 그 Type 은 해당 Protocol 을 `준수(conform)`한다고 표현한다.

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

#### 4. Adopt Protocol vs. Class Inheritance

|                                | Protocol | Class |
|--------------------------------|:--------:|:-----:|
| Class                          |    O     |   O   |
| Structure                      |    O     |   X   |
| Enumeration                    |    O     |   X   |
| Multiple Inheritance(or Adapt) |    O     |   X   |


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
> [Read-Only Computed Properties] 는 자연스레 준수하는 것이 불가능하다.
> 
> 반면 `get`만 정의할 경우 모든 종류의 [Properties][Swift Properties] 에 대해 Protocol 을 준수할 수 있다. 
> 그리고 이것이 유효할 때 `set`이 유효한 타입이라면 `set`은 자동으로 유효하다.

여기서 주의해야 할 것이 `{ get set }`은 이 Protocol 을 채택하는 Type 이 반드시 `get set`을 만족하도록 구현해야한다는 
의미이고, `{ get }`은 반드시 `get`을 만족하도록 구현해야한다는 의미다. ***'get' 만 만족하고 'set' 을 만족하지 않도록 
`Read-Only`임을 강제하는 것이 아니다***. 

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

#### 4. Initializer Requirements


*Methods* 에 대한 요구사항 역시 *Properties* 와 유사하다.

__1 ) Syntax__

__You can define__

- parameter

Methods 와 유사하다. 하지만 *Initializers* 는 *name* 과 *Explicit return type* `static` 이 허용되지 않기 
때문에 당연히 Protocol 역시 불가능하다. 즉, ***어떤 `Custom Initializrer`를 구현해야 하는지 그 Type 만 정의***한다.


```swift
protocol SomeProtocol {
    init(someParameter: SomeType)
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

하지만 [Classes 가 `final` modifier 를 이용해 정의되는 경우][Preventing Overrides], 이 *Class* 는 더 이상 
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

즉, *Protocols* 역시 [First-Class Citizen] 으로 다룰 수 있다는 것을 의미한다.

- Function, Method, Initializer 의 `Parameter Type` 또는 `Return Type`으로 사용될 수 있다.
- `Constant, Variable, Property 의 Type`으로 사용될 수 있다.
- `Array, Dictionary, 또는 다른 Container 의 Type`으로 사용될 수 있다.

> **Protocols** 역시 `Swift Types`이므로 이름은 `대문자로 시작`한다.

> Superclass 에서 Subclasss 로 [Downcasting] 하던 것처럼 `Protocol Type`에서 이것을 준수하는 `Underlying Type`으로 
> **Downcasting** 할 수 있다.

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

[Strong Reference Cycles Between Class instances] 를 예방하기 위해 *delegates* 는 `Week References`로 선언되었다.

> [Class-Only Protocols](#h-10-class-only-protocols-) 에서 다시 살펴보겠지만, `AnyObject`를 상속시키는것으로 
> Protocol 은 `Class-Only Protocols`로 marking 된다. 그리고 **Class-Only Protocols** 를 채택한 **Class** 
> 는 반드시 `delegate 를 Week Reference 로 선언`해야한다.

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

이전의 [Swift Extensions] 에서 `extension` keyword 만 이용해 확장을 했는데 이번 챕터에서는 `extension`을 확장할 때 
`Protocol`을 채택시켜 확장하도록 해본다.

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

이번에는 [Swift Strings and Characters] 챕터에서 사용해본 Swift 의 불편한 문자열 접근과 [Extensions - Subscripts] 
챕터에서 확장할 때 사용했던 *Subscripts* 를 *Protocol* 을 이용해 확장해보자.

공통으로 사용할 Protocol 을 하나 정의한다.

```swift
protocol easyIndex {
    subscript(_ digitIndex: Int) -> Self { get }
}
```

<br>

__1 ) 우선 [Extensions - Subscripts][Swift Extensions - Subscripts] 를 Protocol 을 이용하는 것으로 바꿔보자__

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

`Generic Type`은 오직 `Generic parameter 가 Protocol 을 준수하는 경우`와 같은 특정 조건에서만 Protocol 의 요구사항을 
만족할 수 있다. 따라서 *Generic Type* 을 확장할 때 `where`를 이용해 `constraints`를 나열해 조건부로 준수하도록 만들어야한다. 
이것은 추후 [Generic Where Clauses](/swift/2023/02/23/generics.html#h-6-generic-where-clauses-) 에서 
자세히 다룬다.

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

#### 4. Declaring Protocol Adoption with an Extension

`Protocol 을 채택해 확장하려는 기능이 이미 Type 에 존재`한다면, 어떻게 해야할까? [Swift Extensions][Extension cannot override] 
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

---

### 6. Adopting a Protocol Using a Synthesized Implementation 👩‍💻

Swift 는 많은 *Simple Cases* 에 대해 자동으로 `Equatable`, `Hashable`, `Comparable` Protocol 을 만족하도록 
할 수 있다. 이를 `Synthesized Implementation(함성된 구현)`이라 하며, Protocol 요구사항 구현을 직접 할 필요가 없다.

#### 1. Synthesized Implementation of Equatable

Swift 는 다음 조건을 만족하는 *Custom Types* 에게 `Equatable`을 제공한다.

- Structures that have only stored properties & That stored properties conform to the Equatable protocol
- Enumerations that have only [associated types][Associated Values] & That associated types conform to the Equatable protocol
- Enumerations that have no [associated types][Associated Values]

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

#### 2. Synthesized Implementation of Hashable

Swift 는 다음 조건을 만족하는 *Custom Types* 에게 `Hashable`을 제공한다.

- Structures that have only stored properties & That stored properties conform to the Hashable protocol
- Enumerations that have only [associated types][Associated Values] & That associated types conform to the Hashable protocol
- Enumerations that have no [associated types][Associated Values]

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

#### 3. Synthesized Implementation of Comparable

Swift 는 [Raw Values][Raw Values] 를 갖고 있지 않은 *Enumerations* 에게 다음 조건을 만족하는 경우 `Comparable`을 
제공한다.

- Enumerations that have no Raw Values
- Enumerations that have no Raw Values  
  & Enumerations that have  [associated types][Associated Values]  
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

---

### 7. Collections of Protocol Types 👩‍💻

[Protocols as Types](#h-3-protocols-as-types-) 이미 살펴보았듯이 *Protocols* 역시 
[First-Class Citizen] 으로 다룰 수 있으므로 이것을 *Collections* 에 저장하는 것 역시 가능하다. 

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

---

### 8. Protocol Inheritance 👩‍💻

#### 1. Protocol Inheritance

Protocol 을 *Classes*, *Structures*, *Enumerations* 에 `Adapt` 시키는 것 말고도 ***Protocol 이 
다른 Protocol 을 `Inheritance`하는 것*** 역시 가능하다.

*Multiple Adapt* 이 가능했던 것처럼 *Multiple Inherit* 역시 가능하다.

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // protocol definition goes here
}
```

#### 2. Examples

*SnakesAndLadders* 에 *TextRepresentable* Protocol 을 채택하고 다음과 같이 게임 정보를 출력할 수 있다.

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

```swift
let game = SnakesAndLadders()
print(game.textualDescription)
```

```console
A game of Snakes and Ladders with 25 squares
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

---

### 9. Class-Only Protocols 👩‍💻

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```

[Delegation Examples](#h-2-examples-1) 에서 본 것처럼, *Class* 의 채택만 허용하려면, `AnyObject`를 상속시킴으로써 
`Class-Only Protocols`로 marking 된다.

> **Class-Only Protocols** 를 채택한 **Class** 는 반드시 `delegate 를 Week Reference 로 선언`해야한다.

> Protocol 의 요구사항에 정의된 동작이 `Value Semantics`가 아닌 `Reference Semantics`임을 가정하거나 요구하는 경우 
> `Class-Only Protocols`를 사용한다.
>
> [Which one choose Structures or Classes] 에서 애플은 `Inheritance` 관계를 설계할 때 처음부터 `Protocol`을 
> 사용하는 것을 권장하고있다. 따라서 **Class** 에만 채택되어야 하는 기능을 상속 구조로 설계할 때 **Class Inheritance** 
> 대신 `Class-Only Protocols`를 사용할 수 있다. 

---

### 10. Protocol Composition 👩‍💻

#### 1. Protocol Composition

동시에 여러 Protocols 를 준수하는 경우, 이것을 단일 요구사항으로 결합하는 것이 유용할 수 있다.

`Protocol Composition`은 `SomeProtocol & Another Protocol`과 같이 `&` 를 이용해 결합하며, 이것은 
`Temporary Local Protocol`인 것처럼 동작한다.

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

#### 2. Protocol Composition with Class

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
`as`를 이용한 [Type Casting][Type Casting Any] 을 이용해 함수를 재사용 할 수 있다.
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

---

### 11. Checking for Protocol Conformance 👩‍💻

#### 1. Checking for Protocol Conformance

[Type Casting] 에서 설명했듯이 `is`와 `as` 연산자를 사용할 수 있다.

- is : Instance 가 Protocol 을 준수하면 `true`, 아니면 `false`를 반환.
- as? : Instance 가 Protocol 을 준수하면 `Optional<Protocol Type>`, 아니면 `nil`을 반환.
- as! : Instance 가 Protocol 을 준수하면 `Protocol Type`, 아니면 `Runtime Error`를 trigger.

<br>

Protocol 을 하나 정의하자.

```swift
protocol HasArea {
    var area: Double { get }
}
```

이제 위 Protocol 을 준수하는 간단한 Class 를 하나 추가해본다.

```swift
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}

let country = Country(area: 100.0)
```

*country* Instance 를 `is`, `as?`, `as!` 연산자를 이용해 타입을 체크해본다.

- is

```swift
print(country is HasArea)   // true
print(country is Int)       // false
```

```swift
if country is HasArea {
    print("country conforms to HasArea protocol.")
} else {
    print("country do not conforms to HasArea protocol.")
}
```

```console
country conforms to HasArea protocol.
```

- as?

```swift
print(country as? HasArea)   // Optional(__lldb_expr_7.Country)
print(country as? Int)       // nil
```

```swift
if let country = country as? HasArea {
    print(country)
    print("country conforms to HasArea protocol.")
} else {
    print("country do not conforms to HasArea protocol.")
}
```

```console
Optional(__lldb_expr_7.Country)
country conforms to HasArea protocol.
```

- as!

```swift
print(country as! HasArea)   // __lldb_expr_11.Country
print(country as! Int)       // Could not cast value of type '__lldb_expr_11.Country' (0x1025a8720) to 'NSNumber' (0x1b8cd7ff0).
```

`Forced Unwrapping`으로 인해 Type 불일치 시 `Runtime Error`가 발생한다. `as!`는 에러가 발생하지 않음이 명확한 경우의 
`Downcasting`에서 사용해야한다. 확인하는 용도로는 적합하지 않다. 

#### 2. Examples

*HasArea* Protocol 을 준수하는 Class 와 준수하지 않는 Class 를 추가로 정의한다.

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

---

### 12. Optional Protocol Requirements 👩‍💻

#### 1. Optional Protocol Requirements Syntax

Protocol 의 *Requirements* 를 정의할 때 *Optional* 을 사용할 수 있다. 이를 `Optional Requirements`라 하며, 
이것은 반드시 구현해야하는 책임을 갖지 않는다. 

주의해야할 것이 
<span style="color: red;">Optional Requirements 는 Objective-C 와 상호 운용(interoperates)</span>
을 위한 것으로, Protocol 의 Type 은 반드시 `@objc` 를 이용해 `@objc Protocol`로 정의해야한다. 
또한 *Optional Requirements* 를 적용할 attributes 는 반드시 `@objc`를 이용해 `@objc attribute`로만 정의될 수 있다. 

마지막으로 이것이 `Optional`임을 나타내기 위해 `optional` modifier 도 함께 작성해줘야한다.

__Syntax__

```swift
@objc protocol SomeProtocol {
    @objc optional var mustBeSettable: Int { get set }
    @objc optional var doesNotNeedToBeSettable: Int { get }
    @objc optional func someTypeMethod() -> SomeType
    @objc optional init(someParameter: SomeType)
}
```

> 참고로 Protocol 이 구현 의무를 갖지 않도록 하는 방법은 Optional Protocol 외에도 
> [Protocol Extensions](#h-13-protocol-extensions-) 가 있다. 물론, Optional Protocols 와 작동 방식은 다르지만 
> 기본 구현을 제공하며, 사용자 정의 구현도 가능하게 할 뿐 아니라 Class 가 아닌 Structure 나 Enumeration 에서도 사용할 수 
> 있다는 장점을 갖는다.
> 
> Optional Protocols 의 구현 의무 면제가 왜 위험하고 주의해야하는지 잠시 후 
> [4. Optional Protocols as Types](#h-4-optional-protocols-as-types) 에서 소개한다. 이것을 기억한채로 
> 다음 챕터인 `Protocol Extensions`와 비교해보자.

#### 2. Examples

````swift
protocol Member {
    var name: String { get set }
    var age: Int { get set }
    optional var address: String { get }    // 'optional' can only be applied to members of an @objc protocol
}
````

`optional`을 사용하려면 반드시 `Objective-C 와의 interoperates`가 필요하다. 따라서 `@objc protocol`의 member 가 
되어야하므로 Protocol 정의를 변경해야한다.

````swift
@objc protocol Member {
    var name: String { get set }
    var age: Int { get set }
    optional var address: String { get }   // 'optional' requirements are an Objective-C compatibility feature; add '@objc'
}
````

Protocol 정의를 `@objc protocol`로 변경했지만 여전히 에러가 발생한다. `optional`을 사용하려면 그 member 역시 `@objc`로 
marking 되어야한다.

```swift
@objc protocol Member {
    var name: String { get set }
    var age: Int { get set }
    @objc optional var address: String { get }
}
```

드디어 정상적으로 정의되었다. 즉, *Swift 만 사용해 코드를 작성하더라도 Optional Requirements 를 사용하려면 반드시 `@objc`로 
정의*해야한다.

<br>

````swift
struct Teacher: Member {    // Non-class type 'Teacher' cannot conform to class protocol 'Member'
    var name: String
    var age: Int
    var address: String
}
````

*Objective-C 와 상호 운용한다는 것*은 이것이 `Class`이어야 함을 의미한다. 따라서 Structure 로 정의할 수 없다. 

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
반면, *Student* 는 optional 을 제외하고 *name, age* 만 member 로 갖는다. 실제 객체가 정상적으로 동작되는지 확인해보자.

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

#### 3. Optional Members make them Optional Types

위 [Examples](#h-2-examples-4) 만 보면 굉장히 유용해 보인다. 하지만 Optional Protocols 를 사용하는 것은 매우 조심해야한다. 

Protocol 은 직접 채택하는 것 뿐 아니라 [Protocol 을 Type 으로 사용](#h-3-protocols-as-types-)할 수 있음을 앞에서 확인했다. 
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

> - 위 예제에서 Teacher, Student 는 `Member Protocol 을 채택한 Teacher, Student Types`다. 즉, Member Type 이 
>   아니므로, Teacher 나 Student Types 는 `address 의 존재의 유무를 명확`하게 알 수 있다. 따라서 Teacher Class 는 
>   address 를 `String` Type 으로 갖고 있으므로 Optional 이 아니다. 또한, Student Class 는 address 를 갖고 있지 않다.
> - 이번 예제에서 Member 를 Type 으로 사용할 경우, 이 `Protocol 을 채택한 어떤 Class 가 그것을 구현 했는지 여부를 알 수 없다`. 
>   그렇기 때문에 `Optional`인 것이다. 따라서 Type 으로 사용할 때는 적절한 Type 으로 `Downcasting`하거나 
>   `Optional Chaining`으로 접근해야한다.

#### 4. Optional Protocols as Types

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

---

### 13. Protocol Extensions 👩‍💻

#### 1. Protocol Extensions

Protocol 은 이것을 준수하는 Type 에 기능을 제공하기 위해 [Extensions][Swift Extensions] 을 이용해 
`Computed Properties`, `Initializers`, `Methods`, `Subscripts`의 기본 구현을 적합성을 준수하는 Type 에 
추가할 수 있다.

> 이는 Global Function 을 추가하거나 추가된 Protocol 채택으로 인해 개별 Type 마다 적합성을 다시 추가하는 대신 
> `Protocol Extensions`를 사용해 기능을 제공할 수 있다.

> `Protocol Extensions` 으로 확장된 기능은 기존의 Protocol 을 채택할 때 이 Extensions 은 기본 구현을 제공하기만 할 뿐 
> 채택하는 <span style="color: red;">Type 에 적합성을 만족하기 위한 구현을 강요하지 않는다</span>. 
> 
> 또한 기능의 구현이 보장되므로 [Optional Protocols](#h-3-optional-members-make-them-optional-types) 와 다르게 
> `Optional Chaining` 없이 호출될 수 있다.

<br>

의사 난수(pseudorandom number) 생성기를 다시 떠올려보자.

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

```swift
let generator = LinearCongruentialGenerator()
Array(1...5).forEach { _ in print("Here's a random number: \(generator.random())") }
```

```console
Here's a random number: 0.23928326474622771
Here's a random number: 0.4782664609053498
Here's a random number: 0.7172496570644719
Here's a random number: 0.956232853223594
Here's a random number: 0.19521604938271606
```

그런데 이 의사 난수 생성기를 이용한 `Bool`을 반환하는 함수를 추가하고 싶다면 어떻게 해야할까?

앞에서 Protocol 의 기능을 확장하고자 할 때 [Protocol Inheritance](#h-8-protocol-inheritance-) 를 사용해 다음과 같이 
기능을 추가했다.

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

상속을 이용할 경우 우리는 다음과 같이 3가지를 구현해야한다.

1. RandomNumberGenerator 를 상속한 RandomBoolGenerator Protocol 정의.
2. Extension 을 이용해 LinearCongruentialGenerator Class 에 RandomBoolGenerator 를 추가로 채택.
3. 채택된 RandomBoolGenerator Protocol 을 준수하도록 정의.

그런데 LinearCongruentialGenerator Class 는 이미 RandomNumberGenerator Protocol 을 준수하고있다.

<br>

`Protocol Extensions`는 이미 `Protocol 을 준수하는 Type 에 Protocol 자체를 확장`함으로써 쉽게 기능을 추가할 수 있다.

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

> Protocol 을 확장하는 것이라 해도 Extension 은 Protocol 이 아니므로 구현을 미룰 수 없다.
> 
> ```swift
> extension RandomNumberGenerator {
>     func randomBool() -> Bool     // Expected '{' in body of function declaration
> }
> ```
> 
> 따라서 Protocol 을 확장함과 동시에 구현을 반드시 제공해야한다.

#### 2. Providing Default Implementations

위에서 살펴보았듯이 

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
따라서 위에서 `randomBool()`은 LinearCongruentialGenerator Class 가 자체적으로 정의한 것이 되고,
RandomNumberGenerator 가 Extensions 으로써 제공한 기능은 Class 의 구현에 의해 무시된다.

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

를 기본 구현으로 사용할 수 있으며, 필요시 이를 직접 구현해 사용할 수 있다.

#### 3. Adding Constraints to Protocol Extensions (where)

[Conditionally Conforming to a Protocol (where)](#h-3-conditionally-conforming-to-a-protocol-where) 에서 
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


<br><br>

---
Reference

1. "Protocols." The Swift Programming Language Swift 5.7. accessed Feb. 20, 2023, [Swift Docs Chapter 21 - Protocols](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols)

[Swift Properties]:/swift/2022/11/22/properties.html
[Stored Properties]:/swift/2022/11/22/properties.html#h-1-stored-properties-
[Read-Only Computed Properties]:/swift/2022/11/22/properties.html#h-3-read-only-computed-properties
[Preventing Overrides]:/swift/2022/11/29/inheritance.html#h-3-preventing-overrides-
[First-Class Citizen]:/swift/2022/11/07/higher-order-function.html#h-1-first-class-citizen
[Downcasting]:/swift/2023/01/14/type-casting.html#h-3-downcasting-type-cast-operator-as-as-
[Strong Reference Cycles Between Class instances]:https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/#Strong-Reference-Cycles-Between-Class-Instances
[Swift Strings and Characters]:/swift/2022/09/17/strings-and-characters.html#h-8-accessing-and-modifying-a-string-문자열-접근과-수정-
[Swift Extensions]:/swift/2023/01/17/extensions.html
[Swift Extensions - Subscripts]:swift/2023/01/17/extensions.html#h-6-subscripts-
[Extension cannot override]:/swift/2023/01/17/extensions.html#h-1-extension-vs-inheritance-
[Associated Values]:(/swift/2022/11/01/enumerations.html#h-4-associated-values-)
[Raw Values]:/swift/2022/11/01/enumerations.html#h-5-raw-values-
[Which one choose Structures or Classes]:/swift/2022/11/21/structures-and-classes.html#h-3-structure-와-class-무엇을-선택할까
[Type Casting Any]:/swift/2023/01/14/type-casting.html#h-1-any
[Type Casting]:/swift/2023/01/14/type-casting.html
