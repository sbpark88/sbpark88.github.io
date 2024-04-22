---
layout: post
title: Swift Optional Chaining
subtitle: Optional Chaining as an Alternative to Forced Unwrapping
excerpt_image: NO_EXCERPT_IMAGE
categories: [swift]
tags: [swift docs, optional chaining, forced unwrapping, accessing subscripts, linking multiple levels of chaining]
---

### What is Optional Chaining?

`Optional Chaining`은 Properties, Methods, Subscripts 가 `nil`일 *가능성이 있는 경우에 안전하게 조회(querying)하고
호출(calling)하기 위한 프로세스*다.

*Optional 이 값을 가지고 있을 경우, Property, Method, Subscript 호출은 성공*하고, *`nil`일 경우 `nil`을 반환*한다.
`Multiple queries`는 서로 `chaining` 될 수 있으며, ***어느 하나라도 `nil`을 포함한다면 전체 `chain`은 실패***한다.

> **Optional Chaining in Swift** 는 **Messaging nil in Objective-C** 와 유사하지만 `모든 타입에 작동`하며,
> `success or failure 를 확인`할 수 있다.

### 1. Alternative to Forced Unwrapping 👩‍💻

Property, Method, Subscript 를 `non-nil` 값으로 얻고싶을 때 할 수 있는 가장 쉬운 방법은 `Forced Unwrapping(!)`이다.
하지만 `Forced Unwrapping`은 Optional 이 *nil* 일 때 `Runtime Error`를 발생시키는 반면, `Optional Chaining`은
프로세스를 실패하고 `nil`을 반환한다.

> 단, `Optional Chaining 을 통해 얻은 값`은 'nil' 이 발견되지 않아 **프로세스를 성공적으로 진행**했더라도 `Optional`이다.

이는 *Runtime Error 도 발생시키지 않고 'Unwrapping' 한 값을 반환하는 `Nil-Coalescing Operator(??)`* 보다는 다소 귀찮아 
보일 수 있으나, *Nil-Coalescing Operator(??)* 는 항상 `default` 값을 응답하기 때문에 `프로세스의 success of failure 를 
명확히 구분할 수 없으며`, 'nil' 일 경우에도 'default' 값에 의해 항상 로직이 정상적으로 처리되기 때문에 `의도치 않은 결과`를 
얻을 수 있다는 문제가 있다.

그렇다면 *Forced Unwrapping(!)* 과 *Nil-Coalescing Operator(??)* 의 문제를 모두 해결할 수 있는
`if let` 또는 `guard let`을 이용한 [Optional Binding] 을 이용하면 되는것 아닐까 생각할 수 있다.
물론, *Optional Binding 한 번으로 해결될 수 있다면*, 이 방도 매우 좋은 방법이다. 하지만, 여러 번 'Optional' 가능성이 있을_
경우, 단순 'Optional Binding' 은 *JavaScript* 에서 *Promise 의 콜백지옥*과 같은 문제를 갖는다.

> `Optional Chaining 의 최종 결과값을 Optional Binding 과 함께 사용`함으로써 **Optional Types** 를 간결하고 멋지게 처리할 수 있다.

[Optional Binding]:/swift/2022/07/03/if-and-guard.html#h-2-optional-bindingunwrap

```swift
class Person {
    var residence: Residence?
}

class Residence {
    var numberOfRooms = 1
}
```

```swift
let john = Person()
```

*Person* 의 instance *john* 은 *residence* property 의 기본값으로 `nil`을 갖는다. 그리고 *Residence* class 는
*numberOfRooms* property 의 기본값으로 1 을 갖는다.

<br>

- Forced Unwrapping

```swift
print(john.residence!.numberOfRooms)
// Fatal error: Unexpectedly found nil while unwrapping an Optional value
```

- Optional Binding without Optional Chaining

```swift
if let residence = john.residence {
    print("John's residence has \(residence.numberOfRooms) room(s).")
} else {
    print("john.residence? is nil")
}

// john.residence? is nil
```
<br>

- Optional Binding with Optional Chaining (data is `nil`)

```swift
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("john.residence? is nil")
}

// john.residence? is nil
```

- Optional Binding with Optional Chaining (data is `not nil`)

```swift
john.residence = Residence()

print(john.residence?.numberOfRooms)    // Optional(1)

if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("john.residence? is nil")
}
// John's residence has 1 room(s).
```

---

### 2. Defining Model Classes for Optional Chaining Examples 👩‍💻

앞으로의 예제를 위해 다음 4개의 Classes 를 정의한다.

```swift
class Person {
    var residence: Residence?
}

class Residence {
    var rooms: [Room] = []
    var numberOfRooms: Int { rooms.count }
    subscript(i: Int) -> Room {
        get { rooms[i] }
        set { rooms[i] = newValue }
    }
    func printNumberOfRooms() {
        print("The number of rooms is \(numberOfRooms)")
    }
    var address: Address?
}

class Room {
    let name: String
    init(name: String) { self.name = name }
}

class Address {
    var buildingName: String?
    var buildingNumber: String?
    var street: String?
    func buildingIdentifier() -> String? {
        if let buildingNumber = buildingNumber, let street = street {
            return "\(buildingNumber) \(street)"
        } else if buildingName != nil {
            return buildingName
        } else {
            return nil
        }
    }
}
```

*Address* class 의 `buildingIdentifier()` 메서드는 *buildingNumber* 와 *street* 이 모두 값을 가지고 있다면 이를 반환하고, 
그렇지 않을 경우 *buildingName* 이 있다면 이것을 반환하고, 이것 마저 값이 없다면 `nil`을 반환한다.

---

### 3. Accessing Properties Through Optional Chaining 👩‍💻

[1. Alternative to Forced Unwrapping](#h-1-alternative-to-forced-unwrapping-) 에서 살펴본 것을 통해 
*다음 Optional Chaining 은 `nil`이 발견됨으로써 실패할 것이고, 따라서 `else clause` 를 타게 됨*을 알 수 있다.

```swift
let john = Person()
if let roomCount = john.residence?.numberOfRooms {
    print("John's residence has \(roomCount) room(s).")
} else {
    print("Unable to retrieve the number of rooms.")
}
```

```console
Unable to retrieve the number of rooms.
```

<br>

또한 *Optional Chaining* 은 `call` 하기 위한 접근 뿐 아니라, 
<span style="color: red;">`set`을 하기 위한 접근에도 사용</span>할 수 있다.

```swift
func createAddress() -> Address {
    print("Function was called.")

    let someAddress = Address()
    someAddress.buildingNumber = "29"
    someAddress.street = "Acacia Road"

    return someAddress
}
john.residence?.address = createAddress()
```

```console
// Nothing, the createAddress() function isn’t called.
```

`createAddress()`를 통해 생성한 주소를 `john` 의 `residence 의 address`에 저장하려한다.  
하지만 *john* 은 instance 는 생성되었지만, *residence* 에 아무 값도 저장하지 않아 `nil` 상태로 존재하고있다. 
따라서 `john 의 residence`가 존재하지 않기 때문에 `address`에 값을 저장할 수 없다.

이제 좌변을 보자. `john.residence?.address`는 `residence?`에서 `nil`을 발견하고 즉시 `fail`처리 될 것이다. 
따라서 우변의 `createAddress()`는 아예 `evaluated` 되지 않고 종료된다.

---

### 4. Calling Methods Through Optional Chaining 👩‍💻

*Optional Channing* 을 *Methods* 에 사용하면 `메서드 호출의 success or failure 여부를 확인`할 수 있다. 
이것은 위 *Residence* class 의 `printNumberOfRooms()` 메서드와 같은 `반환 값이 없는 메서드에 대해서도 유효`하다.

> 반환 값이 없는 메서드에서도 메서드 호출의 **success or failure** 여부를 확인할 수 있는 이유는 
> [Functions Without Return Values] 에서 살펴본 것처럼, 암시적으로 
> `Void`라는 타입의 특수한 값(`()` 로 쓰여진 `Empty Tuple`)을 반환하기 때문이다.

[Functions Without Return Values]:/swift/2022/10/19/functions.html#h-3-functions-without-return-values

<br>

`Optional Chaining 을 통해 호출`하면, `printNumberOfRooms()`의 *return type* 은 `Void`가 아닌 `Void?`가 되므로, 
***`if` statement 를 통해 해당 `Void?`가 메서드 호출에 성공해 `()`를 포함하고 있는지, 실패해 `nil`을 포함하고 있는지 확인***할 수 있다.

```swift
let john = Person()
if john.residence?.printNumberOfRooms() != nil {
    print("It was possible to print the number of rooms.")
} else {
    print("It was not possible to print the number of rooms.")
}
```

```console
It was not possible to print the number of rooms.
```

`john.residence?.printNumberOfRooms()`이 실패해 *`nil`을 wrapping 한 `Void?`를 반환*했다.  
따라서 `else` clause 를 타고 *"It was not possible to print the number of rooms."* 를 출력한다.

<br>

```swift
john.residence = {
    let someResidence = Residence()
    someResidence.rooms = Array(repeating: "", count: 300).lazy
        .enumerated().map { (index, value) in
            index == 237 ? "Shining" : String(index)
        }
        .map { Room(name: $0) }
    someResidence.address = {
        let someAddress = Address()
        someAddress.buildingNumber = "29"
        someAddress.street = "Acacia Road"

        return someAddress
    }()

    return someResidence
}()

if john.residence?.printNumberOfRooms() != nil {
    print("It was possible to print the number of rooms.")
} else {
    print("It was not possible to print the number of rooms.")
}
```

```console
The number of rooms is 300
It was possible to print the number of rooms.
```

이번에는 `john.residence?.printNumberOfRooms()`이 성공해 `printNumberOfRooms()`가 호출되며 
*"The number of rooms is 300"* 를 출력하고 *`Void`를 wrapping 한 `Void?`를 반환*했다.  
따라서 `if` clause 를 타고 *"It was possible to print the number of rooms."* 를 출력한다.

---

### 5. Accessing Subscripts Through Optional Chaining 👩‍💻

#### 1. Accessing Subscripts of Optional Type

*john.residence* 가 *Optional* 이기 때문에 `john.residence.printNumberOfRooms()`이 아닌 
*Optional Chaining* 을 이용해 `john.residence?.printNumberOfRooms()`와 같이 접근했듯이,  
*Subscripts* 역시 `john.residence[237].name`이 아닌 `john.residence?[237].name`와 같이 접근한다.

```swift
let john = Person()
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
} else {
    print("Unable to retrieve the first room name.")
}
```

```console
Unable to retrieve the first room name.
```

<br>

```swift
john.residence = {
    let someResidence = Residence()
    someResidence.rooms = Array(repeating: "", count: 300).lazy
        .enumerated().map { (index, value) in
            index == 237 ? "Shining" : String(index)
        }
        .map { Room(name: $0) }
    someResidence.address = {
        let someAddress = Address()
        someAddress.buildingNumber = "29"
        someAddress.street = "Acacia Road"
        
        return someAddress
    }()
    
    return someResidence
}()

if let roomNumber237 = john.residence?[237].name {
    print("The room number 237 name is \(roomNumber237).")
} else {
    print("Unable to retrieve the room number 237 name.")
}
```

```console
The room number 237 name is Shining.
```

#### 2. Accessing Subscripts of Dictionaries

[Accessing and Modifying a Dictionary] 에서 살펴본 것처럼 Swift 에서 
*Dictionary 와 같은 일부 Types 는 항상 `Optional`을 반환*한다. 따라서 이런 경우에도 *Optional Chaining* 은 
유용하게 사용될 수 있다.

[Accessing and Modifying a Dictionary]:/swift/2022/10/03/collection-types.html#h-5-accessing-and-modifying-a-dictionary

```swift
var testScores = ["Dave": [86, 82, 84], "Bev": [79, 94, 81]]
testScores["Dave"]?[0] = 91
testScores["Bev"]?[0] += 1
testScores["Brian"]?[0] = 72
print(testScores)   // ["Dave": [91, 82, 84], "Bev": [80, 94, 81]]
```

---

### 6. Linking Multiple Levels of Chaining 👩‍💻

*Optional Chaining 을 이용하면 `Subproperties`에 대한 접근* 역시 간결한 코드로 안전하게 접근
(drill down into subproperties more than one level deep) 할 수 있으며 다음 규칙을 따른다.

> - 조회하려는 타입이 `Non-Optional`이더라도 `Optional Chaining`에 의해 항상 `Optional`이 된다.
> - `Optional` wrapping 은 중복되지 않는다.

<br>

```swift
let john = Person()
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}

print(john.residence?.address?.street)
print(type(of: john.residence?.address?.street))
```

```console
Unable to retrieve the address.
nil
Optional<String>
```

<br>

```swift
john.residence = {
    let someResidence = Residence()
    someResidence.rooms = Array(repeating: "", count: 300).lazy
        .enumerated().map { (index, value) in
            index == 237 ? "Shining" : String(index)
        }
        .map { Room(name: $0) }
    someResidence.address = {
        let someAddress = Address()
        someAddress.buildingNumber = "29"
        someAddress.street = "Acacia Road"

        return someAddress
    }()

    return someResidence
}()


if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
} else {
    print("Unable to retrieve the address.")
}

print(john.residence?.address?.street)
print(type(of: john.residence?.address?.street))
```

```console
John's street name is Acacia Road.
Optional("Acacia Road")
Optional<String>
```

> **john 의 residence property 의, address property 의, street property** 에 접근하기 위해 
> `Two levels of optional chaining`이 사용되었지만, 반환 값은 언제나 **nil** 또는 **Some String** 을 
> 포함한 `String?`이다.

---

### 7. Chaining on Methods with Optional Return Values 👩‍💻

`Optional Chaining 의 return type` 은 언제나 `Optional`이다.

```swift
let john = Person()
john.residence = {
    let someResidence = Residence()
    someResidence.rooms = Array(repeating: "", count: 300).lazy
        .enumerated().map { (index, value) in
            index == 237 ? "Shining" : String(index)
        }
        .map { Room(name: $0) }
    someResidence.address = {
        let someAddress = Address()
        someAddress.buildingNumber = "29"
        someAddress.street = "Acacia Road"

        return someAddress
    }()

    return someResidence
}()
```

```swift
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
```

```console
John's building identifier is 29 Acacia Road.
```

<br>

따라서 위 `john.residence?.address?.buildingIdentifier()`의 return type 은 언제나 `String?`이다. 만약 이 값에 
이어서 *Chaining* 을 하고 싶고, `buildingIdentifier()`의 결과가 `nil`일 가능성이 존재한다면 다음과 같이 `?`를 붙여 
*Optional Chaining* 을 이어가면 된다.

```swift
if let beginsWithThe = john.residence?.address?.buildingIdentifier()?.hasPrefix("The") {
    if beginsWithThe {
        print("John's building identifier begins with \"The\".")
    } else {
        print("John's building identifier doesn't begin with \"The\".")
    }
}
```

```console
John's building identifier doesn't begin with "The".
```

<br><br>

---
Reference

1. "Optional Chaining." The Swift Programming Language Swift 5.7. accessed Dec. 20, 2022, [Swift Docs Chapter 15 - Optional Chaining](https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html).
