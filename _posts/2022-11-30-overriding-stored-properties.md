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

`Stored Properties`의 `Overriding`만을 보기 위해 다른 `characteristics`는 제외한 `Vehicle`의 `Origin`이다.

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

#### 2. Set property value after initialization - Success

#### 3. Set property values at initialization - Fail

#### 4. Implement computed properties with private stored properties - Success


<br><br>

---
Reference

1. "Inheritance", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 30, 2022, [Swift Docs Chapter 12 - Inheritance](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)