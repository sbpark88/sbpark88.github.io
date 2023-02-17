---
layout: post
title: Immutability and mutating methods in structures and enumerations
subtitle: 왜 struct, enum 에서는 mutating 키워드가 필요한가?
categories: swift
tags: [swift, struct, structure, enumerations, enum, immutability, mutating, self]
---

### Swift 에서 struct, enum 은 "value type"이다.

이게 무슨 말일까?

Swift 에서 `structures` 또는 `enumerations`에서는 인스턴스 메서드가 내부의 값(self properties)를 변경할 수 없다. 이것이 무엇을 의미하는지 알아보자.

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

`Town` structure 를 이용해 `hogwarts`를 생성했다.
`init` 메서드에 의해 hogwarts 초기 인스턴스의 갈레온은 `80`을 갖고 있다.

그리고 외부에서 해당 인스턴스의 갈레온 자원을 100으로 설정했고, 이후 출력해보니 `100`이 출력된다.


_**이번엔 메서드를 통해 변경해보자.**_

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

메서드를 작성하면 다음과 같은 에러가 뜰 것이다. `Cannot assign through subscript: 'self' is immutable.`

Swift 에서 `Structures`와 `Enumerations`는 Int 처럼 `Value Types`다.  
Objective-C 에서 Swift 로 넘어오며 `Classes` 기반의 `Reference Type NSString` 대신 
`Structures` 기반의 `Value Type String`을 사용하기 때문이다.

`Value Types`가 의미하는 것은 다음과 같다.

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

즉, Reference Types 가 아닌 Value Types 는 변수나 상수에 할당될 때, 함수에 전달될 때 `Instance` 전체가 
`copy`되어 독립된 자기 자신을 갖는 것을 의미한다.

그리고 <span style="color: rgba(210, 122, 250, 1); font-weight: 900;">Swift 는 기본적으로 
_Value Type_ 의 _Properties_ 는 _Instance Methods_ 에 의해 변경될 수 없다.</span>

하지만 변경을 하고 싶다면 어떻게 해야할까? 내부에서  Properties 의 변경을 위해 다음과 같은 규칙을 따라야한다.

1. 인스턴스를 let 이 아닌 `var`로 선언한다( let hogwarts = Town()로 선언하면 immutable instance 가 된다 ).
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

`mutating` 키워드를 붙여줌으로써 immutable 한 properties 의 변경을 허용하게된다.

mutating 을 허용하게되면 `메서드가 종료될 때 해당 Properties 를 변경` 한다. 또한 이 메서드는 _implicit self property_ 에 
완전히 _new Instance_ 를 할당할 수도 있으며, new Instance 는 `메서드가 종료될 때 original Instance 를 대체`한다.

<br><br>

---
Reference

1. "Language Guide." Welcome to Swift.org. accessed Jul. 3, 2022, [https://docs.swift.org/swift-book/LanguageGuide/Methods.html#](https://docs.swift.org/swift-book/LanguageGuide/Methods.html#)
2. "What does the Swift 'mutating' keyword mean?." stackoverflow. Jul. 2 2018, [https://stackoverflow.com/questions/51128666/what-does-the-swift-mutating-keyword-mean](https://stackoverflow.com/questions/51128666/what-does-the-swift-mutating-keyword-mean)
