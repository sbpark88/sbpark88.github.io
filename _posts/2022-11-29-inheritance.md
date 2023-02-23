---
layout: post
title: Swift Inheritance
subtitle: Inheritance - Bass Class, Subclassing, Overriding, Overriding Properties, Overriding Property Observers, Prevent Overrides
categories: swift
tags: [swift docs, inheritance, base class, superclass, subclass, overriding, overriding property observer, prevent override]
---

### 1. Inheritance 👩‍💻

#### 1. Defining a Base Class

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

#### 2. Subclassing

`Subclassing`은 존재하는 다른 *Class* 를 기반으로 *new Class* 를 생성하는 행위를 말한다.  
기존의 *Class* 를 `Superclass`, *기존의 Class 를 상속해 새로 생성된 Class* 를 `Subclass`라 하며, 
*Subclass* 는 새로운 것을 ***추가***하는 것은 물론이고, 기존의 것을 ***수정***할 수 있다.

*Subclassing* 은 `:`을 이용해 생성한다.

__Syntax__

```swift
class SomeSubclass: SomeSuperclass {
    // subclass definition goes here
}
```

<br>

위 *Vehicle Class* 를 상속한 *Bicycle Class* 를 만들어보자. 

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}
```

- *Vehicle* 은 `Base Class`이면서, *Bicycle* 의 `Superclass`다.
- *Bicycle* 은 *Vehicle* 의 `Subclass`로, *Vehicle* 의 모든 `characteristics`를 상속한다.

```swift
let bicycle = Bicycle()
bicycle.hasBasket = true
bicycle.currentSpeed = 15.0
print("Bicycle: \(bicycle.description)") // Bicycle: traveling at 15.0 miles per hour
```
 
<br>

그리고 *Subclass* 는 또 다른 *Subclassing* 될 수 있다.

```swift
class Tandem: Bicycle {
    var currentNumberOfPassengers = 0
}
```

- *Bicycle* 은 *Vehicle* 의 `Subclass`이면서 *Tandem* 의 `Superclass`다.
- *Tandem* 은 *Bicycle* 의 `Subclass`로, *Bicycle* 의 모든 `characteristics`를 상속하므로 
  *Vehicle* 의 모든 `characteristics` 또한 자동으로 상속한다.

```swift
let tandem = Tandem()
tandem.hasBasket = true
tandem.currentNumberOfPassengers = 2
tandem.currentSpeed = 22.0
print("Tandem: \(tandem.description)")  // Tandem: traveling at 22.0 miles per hour
```

---

### 2. Overriding 👩‍💻

#### 1. Overriding

*Subclass* 는 *Superclass* 의 *Instance Methods*, *Type Methods*, *Instance Properties*, 
*Type Properties*, *Subscripts* 를 다시 구현할 수 있다. 이것을 `Overriding`이라 한다.

*Overriding* 을 위해서 앞에 `override` modifier 를 붙여준다.  
이렇게 하는 것은 재정의를 명확히 하고, 실수로 재정의하는 것을 방지하기 위한 것으로, `override` modifier 없이 재정의하면 
Swift 는 이를 확인하고 `compile error`를 발생시킨다.

> `Overriding` 가능한 `characteristics`는 `mutable`한 것으로 제한된다. 예를 들어 `let` 키워드로 선언된 
> 경우 `immutable`이기 때문에 <span style="color: red;">**Overriding** 할 수 없다</span>.

#### 2. Accessing Superclass Methods, Properties, and Subscripts

때로는 *Superclass* 에 접근하는 것이 유용할 때가 있으며, `super` 키워드를 이용해 접근할 수 있다. 
다음은 `Overriding` 된 `characteristics`의 케이스별 `super` 접근 예시다.

- someMethod() : super.someMethod() 를 호출한다.
- someProperty : getter, setter 를 이용해 super.Property 에 접근한다.
- someIndex: super[someIndex] 로 접근한다.

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

> `super`를 이용한 접근은 *Subclass* 내에서 접근하는 것이다. *Subclass* 의 *Instance* 를 통해 접근하는
> 것이 아니다.

#### 3. Overriding Methods

```swift
class Train: Vehicle {
    override func makeNoise() {
        print("칙칙폭폭")
    }
}
```

```swift
let train = Train()
train.makeNoise()   // 칙칙폭폭
```

#### 4. Overriding Properties

__1 )Overriding Property Getters and Setters__

```swift
class Car: Vehicle {
    var gear = 1
    override var description: String {
        super.description + " in gear \(gear)"
    }
}
```

```swift
let car = Car()
car.currentSpeed = 25.0
car.gear = 3
print("Car: \(car.description)") // Car: traveling at 25.0 miles per hour in gear 3
```

<br>

__2 ) Overriding Property Observers__

```swift
class AutomaticCar: Car {
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

```swift
let automatic = AutomaticCar()
automatic.currentSpeed = 35.0
print("AutomaticCar: \(automatic.description)") // AutomaticCar: traveling at 35.0 miles per hour in gear 4
```

<br>

__3 ) Overriding Stored Properties__

`Stored Properties`를 `Overriding` 하는 것은 다른 *Properties* 와는 조금 다르기 때문에 별도 포스팅 
[Overriding Stored Properties][Overriding Stored Properties]으로 작성한다.

[Overriding Stored Properties]:/swift/2022/11/30/overriding-stored-properties.html

---

### 3. Preventing Overrides 👩‍💻

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

<br><br>

---
Reference

1. "Inheritance." The Swift Programming Language Swift 5.7. accessed Nov. 29, 2022, [Swift Docs Chapter 12 - Inheritance](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html).
