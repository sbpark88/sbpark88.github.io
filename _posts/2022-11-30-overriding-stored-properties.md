---
layout: post
title: Swift - Overriding Stored Properties
subtitle: Inheritance - Overriding Stored Properties
categories: swift
tags: [swift docs, overriding stored property]
---

### 1. Origin 👩‍💻

`Stored Properties`를 제외한 `Properties`의 `Overriding`은
[Overriding Properties][Overriding Properties]에 포스팅 되어있다.

[Overriding Properties]:/swift/2022/11/29/inheritance.html#h-4-overriding-properties

<br>
`Stored Properties`의 `Overriding`만을 보기 위해 다른 `characteristics`는 제외하고 
`tag` 하나만 갖도록 수정했다.

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
}

class Tandem: Bicycle {
}
```

```swift
var vehicle = Vehicle()
var bicycle = Bicycle()
var tandem = Tandem()

print(vehicle.tag)  // Vehicle
print(bicycle.tag)  // Vehicle
print(tandem.tag)   // Vehicle
```

`Bicycle`, `Tandem`은 `Vehicle`를 상속하였기 때문에 `tag`가 모두 "Vehicle"이다.

---

### 2. Overriding Stored Properties 👩‍💻

#### 1. Overriding stored properties - Fail

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
    override var tag: String = "Bicycle"    // Cannot override with a stored property 'tag'
}
```

다른 `Properties`와 마찬가지로 `override` 수정자를 사용해 동일하게 `Stored Properties`를 재정의하려 했으나 
`Swift`는 `Overriding` 불가능하다는 에러를 출력한다.

#### 2. Set property value after initialization - Success

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
}

class Tandem: Bicycle {
}
```

가장 쉬운 방법은 `Class Types` 정의는 그대로 둔 채 `Instance`를 생성 후 `Stored Properties`의 값을 
변경하는 것이다.

```swift
var vehicle = Vehicle()
var bicycle = Bicycle()
bicycle.tag = "Bicycle"
var tandem = Tandem()
tandem.tag = "Tandem"

print(vehicle.tag)  // Vehicle
print(bicycle.tag)  // Bicycle
print(tandem.tag)   // Tandem
```

원하는대로 "Vehicle", "Bicycle", "Tandem"으로 출력되는 것을 확인할 수 있다.

하지만 이 방법은 `Classes` 자체를 `Overriding` 했다기 보다는 `Instance`의 값을 변경하는 것이기 때문에 
의도한바와 일치하는 `Instance`를 얻을 수는 있지만 매번 수작업해야하는 문제가 따른다.

이러한 로직이 사용되는 곳이 단 한 곳에 불과하다면 이런식으로 작성하는 것도 무방하지만 `Subclass`가 여러번 
`Instance` 생성이 필요하다면 이는 동일한 코드의 중복은 물론이고, `Human error`를 일으키는 주요 원인이 된다.

#### 3. Set property values at initialization - Fail

`Instance`를 생성할 때 `default values`를 설정하는 방법은 `Properties`에 `default value`를 함께 
선언하거나, `Initializer`를 이용하는 방법이 있다.

- default value

```swift
class Vehicle {
    var tag = "Vehicle"
}
```

```swift
let vehicle = Vehicle()
print(vehicle.tag)  // Vehicle
```

<br>

- initialization

```swift
class Vehicle {
    var tag: String
    init() {
        tag = "My Vehicle"
    }
}
```

```swift
let vehicle = Vehicle()
print(vehicle.tag)  // My Vehicle
```
<br>

- Both default value and initialization

```swift
class Vehicle {
    var tag = "Vehicle"
    init() {
        tag = "My Vehicle"
    }
}
```

```swift
let vehicle = Vehicle()
print(vehicle.tag)  // My Vehicle
```

게다가 둘을 중복해서 사용할 경우 최종 생성된 `Instance`는 `init()`에서 주입한 값을 갖는 것을 확인할 수 있다.

<br>

`default value`를 주입하는 방법이 안 되었으니 `initializer`를 사용해보자.

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
    override init() {
        tag = "Bicycle" // 'self' used in property access 'tag' before 'super.init' call
    }
}
```

하지만 이 방법 역시 `Swift`는 에러를 출력한다. 이 방법으로 불가능한 이유는 다음과 같다.

- 규칙 1. Subclass 는 자신만의 initializer 를 새로 구현할 수 없다. 이미 Superclass 에 initializer 가 존재하기 
  때문에 overriding 만 가능하다.  
  (물론, Custom initializer 라는 방법도 있지만 이것은 매번 사용자가 이를 처리해야하므로 방법 2와 크게 다르지 않기 
   때문에 고려하지 않는다.)
- 규칙 2. Subclass 는 'super.init' 이 호출된 이후 'self' 사용이 가능하다. 따라서, Subclass 의 메서드는 
  'self' 의 사용이 가능하지만, initializer 는 'self' 사용이 불가능하다.
- 규칙 1과 규칙 2가 서로 상충되기 때문에 Subclass 에서 initializer 를 이용해 Stored Properties 를 Overriding 하는 것은 불가능하다.

#### 4. Implement computed properties with private stored properties - Success

위 1과 3을 통해 `Stored Properties`를 `Overriding`하는 것은 가능하지만 `Stored Properties`로 
`Overriding`하는 것은 불가능하다는 결론을 얻을 수 있다.

따라서 `Stored Properties`를 `Overriding`하는 방법은, `Subclass`에서 `Computed Properties`와 
`Private Stored Properties`를 만들어 마치 `Stored Properties`를 사용하는 것처럼 구현해 해결할 수 있다.

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
    private var _tag = "Bicycle"
    override var tag: String {
        get { _tag }
        set { _tag = newValue }
    }
}

class Tandem: Bicycle {
    private var _tag = "Tandem"
    override var tag: String {
        get { _tag }
        set { _tag = newValue }
    }
}
```

```swift
var vehicle = Vehicle()
var bicycle = Bicycle()
var tandem = Tandem()

print(vehicle.tag)  // Vehicle
print(bicycle.tag)  // Bicycle
print(tandem.tag)   // Tandem
```

<br><br>

---
Reference

1. "Inheritance", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 30, 2022, [Swift Docs Chapter 12 - Inheritance](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)