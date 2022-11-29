---
layout: post
title: Swift Inheritance
subtitle: Inheritance - Bass Class, Subclassing, Overriding, Overriding Properties, Overriding Property Observers, Prevent Overrides
categories: swift
tags: [swift docs, inheritance, subclass, overriding, overriding property observer, prevent override]
---

### 1. Inheritance 👩‍💻

#### 1. Defining a Base Class

다른 `Classes`를 상속하지 않은 `Class`를 `Base Class`라 한다.

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

> `Universal Base Class`를 하나 만들어 모든 `Classes`가 기본적으로 이것을 상속하도록 하는 일부 언어와 달리
> `Swift`는 명시적으로 상속을 하지 않은 `Class`는 `build`할 때 자동으로 `Base Class`가 된다.

#### 2. Subclassing

`Subclassing`은 존재하는 다른 `Class`를 기반으로 `new Class`를 생성하는 행위를 말한다.  
기존의 `Class`를 `Superclass`, 기존의 `Class`를 상속해 새로 생성된 `Class`를 `Subclass`라 하며, 
`Subclass`는 새로운 것을 추가하는 것은 물론이고, 기존의 것을 수정할 수 있다.

`Subclassing`은 `:`을 이용해 생성한다.

__Syntax__

```swift
class SomeSubclass: SomeSuperclass {
    // subclass definition goes here
}
```

<br>

위 `Vehicle Class`를 상속한 `Bicycle Class`를 만들어보자. 

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}
```

- `Vehicle`은 `Base Class`이면서, `Bicycle`의 `Superclass`다.
- `Bicycle`은 `Vehicle`의 `Subclass`로, `Vehicle`의 모든 `characteristics`를 상속한다.

```swift
let bicycle = Bicycle()
bicycle.hasBasket = true
bicycle.currentSpeed = 15.0
print("Bicycle: \(bicycle.description)") // Bicycle: traveling at 15.0 miles per hour
```
 
<br>

그리고 `Subclass`는 또 다른 `Subclassing` 될 수 있다.

```swift
class Tandem: Bicycle {
    var currentNumberOfPassengers = 0
}
```

- `Bicycle`은 `Vehicle`의 `Subclass`이면서 `Tandem`의 `Superclass`다.
- `Tandem`은 `Bicycle`의 `Subclass`로, `Bicycle`의 모든 `characteristics`를 상속하므로 
  `Vehicle`의 모든 `characteristics` 또한 자동으로 상속한다.

```swift
let tandem = Tandem()
tandem.hasBasket = true
tandem.currentNumberOfPassengers = 2
tandem.currentSpeed = 22.0
print("Tandem: \(tandem.description)")  // Tandem: traveling at 22.0 miles per hour
```

---

### 2. Overriding 👩‍💻

#### 1. Overriding Properties

#### 2. Overriding Property Getters and Setters

#### 3. Overriding Property Observers

---

### 3. Preventing Overrides 👩‍💻

<br><br>

---
Reference

1. "Inheritance", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 29, 2022, [Swift Docs Chapter 12 - Inheritance](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)