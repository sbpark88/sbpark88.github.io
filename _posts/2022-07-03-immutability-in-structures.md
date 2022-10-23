---
layout: post
title: Immutability and mutating methods in structures and enumerations
subtitle: 왜 struct, enum에서는 mutating 키워드가 필요한가?
categories: swift
tags: [swift, struct, structure, enumerations, enum, immutability, mutating, self]
---

### <span style="color: orange">Swift에서 struct, enum은 "value type"이다.</span>

이게 무슨 말일까?

`Swift`에서 `structures` 또는 `enumerations`에서는 인스턴스 메소드가 내부의 값(self properties)를 변경할 수 없다. 이것이 무엇을 의미하는지 알아보자.

```swift
struct Town {
    
    let name: String
    var citizens: [String]
    var resources: [String: Int]
    
    init(citizens: [String], name: String, resources: [String: Int]) {
        self.citizens = citizens
        self.name = name.uppercased()
        self.resources = resources
    }

}

var hogwarts = Town(citizens: ["Harry", "Ron", "Hermione"], name: "Hogwarts", resources: ["Galleon": 80])

print(hogwarts.resources)   // ["Galleon": 80]

hogwarts.resources["Galleon"] = 100
print(hogwarts.resources)   // ["Galleon": 100]

```

`Town` structure를 이용해 `hogwarts`를 생성했다.
`init` 메소드에 의해 hogwarts 초기 인스턴스의 갈레온은 `80`을 갖고 있다.

그리고 외부에서 해당 인스턴스의 갈레온 자원을 100으로 설정했고, 이후 출력해보니 `100`이 출력된다.


_**이번엔 메소드를 통해 변경해보자.**_

```swift
struct Town {
    
    let name: String
    var citizens: [String]
    var resources: [String: Int]
    
    init(citizens: [String], name: String, resources: [String: Int]) {
        self.citizens = citizens
        self.name = name.uppercased()
        self.resources = resources
    }
    
    // Cannot assign through subscript: 'self' is immutable.
    func earn() {
        if resources["Galleon"] != nil {
            resources["Galleon"]! += 20
        }
    }
}
```

메소드를 작성하면 다음과 같은 에러가 뜰 것이다. `Cannot assign through subscript: 'self' is immutable.`

`Swift`에서 `struct`, `enum`은 `Int`처럼 `value type`이다.  
Objective-C에서 Swift로 넘어오며 String 역시 value type이 되었다.

이 말이 의미하는 것은 다음과 같다.
```swift
func address(of object: UnsafeRawPointer) -> NSString {
    let address = Int(bitPattern: object)
    return NSString(format: "%p", address)
}

var s1 = "Hello"
var s2 = s1
s2 = "Hi"

print("s1: \(s1), s2: \(s2)")
print("s1 address: \(address(of: &s1)), s2 address: \(address(of: &s2))")

// s1: Hello, s2: Hi
// s1 address: 0x1043842b0, s2 address: 0x1043842c0
```
즉, `reference type`이 아닌 `value type`은 인스턴스의 모든 데이터가 복제된 독립된 자기 자신을 갖는 것을 의미한다.

그리고 <span style="color: rgba(210, 122, 250, 1); font-weight: 900;">`Swift`는 기본적으로 `value type`의 `properties`는 내부에 존재하는 `instance methods`에 의해 변경될 수 없다.</span>

하지만 변경을 하고 싶다면 어떻게 해야할까? 내부에서 `properties`의 변경을 위해 다음과 같은 규칙을 따라야한다.

1. 인스턴스를 `let`이 아닌 `var`로 선언한다( let hogwarts = Town()로 선언하면 immutable instance가 된다 ).
2. 인스턴스 메서드에 `mutating` 키워드를 붙여준다.


```swift
struct Town {
    
    let name: String
    var citizens: [String]
    var resources: [String: Int]
    
    init(citizens: [String], name: String, resources: [String: Int]) {
        self.citizens = citizens
        self.name = name.uppercased()
        self.resources = resources
    }
    
    mutating func earn() {
        if resources["Galleon"] != nil {
            resources["Galleon"]! += 20
        }
    }
}

var hogwarts = Town(citizens: ["Harry", "Ron", "Hermione"], name: "Hogwarts", resources: ["Galleon": 80])

print(hogwarts.resources)   // ["Galleon": 80]

hogwarts.earn()
print(hogwarts.resources)   // ["Galleon": 100]

```
`mutating` 키워드를 붙여줌으로써 immutatble한 properties의 변경을 허용하게된다.
하지만 정확히는 값을 변경하는 것이 아니고 재할당하는 것이다. 즉, `instance methods`가 시작되면 완전히 새로운 인스턴스를 생성하고, 종료될 때 기존 인스턴스를 대체하는 것이다.

`init`에서 `self`를 `mutating 키워드 없이` 사용할 수 있는 이유는 값을 변경하는 것이 아니라, 값을 할당해 인스턴스를 생성하는 것이기 때문이다.


<br><br>

---
Reference

1. "Language Guide", Welcome to Swift.org, last modified latest(Swift 5.7), accessed Jul. 3, 2022, [https://docs.swift.org/swift-book/LanguageGuide/Methods.html#](https://docs.swift.org/swift-book/LanguageGuide/Methods.html#)
2. "What does the Swift 'mutating' keyword mean?", stackoverflow, last modified Jul. 2 2018, accessed Jul. 3, 2022, [https://stackoverflow.com/questions/51128666/what-does-the-swift-mutating-keyword-mean](https://stackoverflow.com/questions/51128666/what-does-the-swift-mutating-keyword-mean)
