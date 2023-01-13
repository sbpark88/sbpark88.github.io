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

다른 `Properties`와 마찬가지로 `override` modifier 를 사용해 동일하게 `Stored Properties`를 재정의하려 했으나 
Swift 는 `Overriding` 불가능하다는 에러를 출력한다.

#### 2. Implement computed properties with private stored properties - Success

`Subclass`에서 `Computed Properties`와 `Private Stored Properties`를 만들어 
마치 `Stored Properties`를 사용하는 것처럼 구현해 해결할 수 있다.

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

#### 3. Use Phase 2 of Initialization - Success

사실 위 2번 방법이 1번의 에러로 인한 `Stack Overflow` 검색에서 나온 답변이었다.

하지만 [docs.swift.org](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html) 
를 공부하면서 사실 `Swift Initialization`에 대한 정확한 이해만 있다면 쉽게 해결할 수 있다는 것을 알게되었다.  
바로 `Initialization`의 Phase 2의 수정할 기회를 사용하는 것이다.

```swift
class Vehicle {
    var tag = "Vehicle"
}

class Bicycle: Vehicle {
    override init() {
        super.init()
        tag = "Bicycle"
    }
}

class Tandem: Bicycle {
    convenience init(tag: String) {
        self.init()
        self.tag = tag
    }
}
```

```swift
var vehicle = Vehicle()
var bicycle = Bicycle()
var tandem = Tandem(tag: "Tandem")

print(vehicle.tag)  // Vehicle
print(bicycle.tag)  // Bicycle
print(tandem.tag)   // Tandem
```

Awesome!! 😆😆

<br><br>

---
Reference

1. "Inheritance", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 30, 2022, [Swift Docs Chapter 12 - Inheritance](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)
2. "Initialization", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 1, 2022, [Swift Docs Chapter 13 - Initialization](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html)
