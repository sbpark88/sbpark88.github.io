---
layout: post
title: Swift Error Handling
subtitle: Error handling in Swift interoperates with error handling patterns that use the NSError class in Cocoa and Objective-C.
categories: swift
tags: [swift docs, error handling, do catch, do-catch, throw, throwing function, throwing initializer, propagating, try, try?, try!, cleanup action]
---

### 1. Representing and Throwing Errors 👩‍💻

`Swift`에서 에러 처리는 `Cocoa`와 `Objective-C`에서 `NSError` class 를 사용하는 에러 처리 패턴과 상호 운용 된다.
[Handling Cocoa Errors in Swift](https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift)

`Swift`에서 에러는 `Error` protocol 을 따르는 Types 의 값으로 표현된다. 그러기 위해서 `Error` protocol 을 채택하도록 해야한다.
`Swift`의 `Enumerations`는 연관된 `Error conditions`를 그룹화하는데 적합하다.

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

에러를 던지기 위해 `throw` statement 를 사용할 수 있다. 다음 예제는 자판기가 동전이 5개 더 필요하다는 에러를 발생시키는 경우다.

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

---

### 2. Handling Errors 👩‍💻

에러가 발생하면 에러는 주변 코드에 의해 `문제를 수정`하거나, `대안 접근 방식`을 시도하거나, `사용자에게 알림` 등의 방법을 통해 
반드시 처리되어야한다.

함수에서 에러가 발생하면 프로그램의 흐름이 변경되므로, 코드에서 에러가 발생한 위치를 빠르게 찾는 것이 매우 중요하다. 이를 위해 
`Functions`, `Methods`, `Initializers`를 호출하는 코드 앞에 `try`(or try? or try!) keyword 를 작성해 
`try expression` 으로 코드를 작성한다.

> `Swift`의 에러 처리는 다른 언어의 `try-catch & throw`와 유사하다. 하지만 `Objective-C`를 포함한 많은 언어와 달리 
> `Swift`의 에러 처리는 계산 비용이 많이 드는 `Call Stack` 해제(unwinding)을 포함하지 않는다.  
> `Swift`의 `throw` statement 의 성능 특성은 `return` statement 와 유사하다.

#### 1. Propagating Errors Using Throwing Functions

에러를 `throw`할 수 있는 `Functions`, `Methods`, `Initializers`를 위해 함수의 parameters 뒤에 `throws` keyword 
를 작성하며, 이런 함수를 `Throwing Functions`라 한다.

__Syntax__

```swift
func canThrowErrors() throws -> String
```

> `Throwing Functions`만 에러를 `throwing` 할 수 있다. `Nonthrowing Functions`은 발생한 모든 에러를 함수 안에서 
> 처리해야한다.

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    
    var coinsDeposited = 0
    
    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }
        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        coinsDeposited -= item.price
        
        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem
        
        print("Dispensing \(name)")
    }
}
```

자판기의 `vend(itemNamed:)` 메서드는 상품이 존재하는지 확인하고, 재고를 확인한 후, 충분한 돈을 넣었는지 확인 후 상품을 
제공한다. 만약, 어디서든 에러가 발생할 경우 메서드는 즉시 종료되고 에러를 `throw`한다. 그리고 이 에러는 반드시 `do-catch` statement 와 
`try?` 또는 `try!`를 이용해 처리하거나 계속해서 `propagate`해야한다.

<br>

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Queen": "Licorice",
    "Eve": "Pretzels"
]

func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

`vend(itemNamed:)` 메서드가 `Throwing Functions`이기 때문에 `try` keyword 를 사용해 호출해야한다. 그리고,
`buyFavoriteSnack(person:vendingMachine:)` 함수는 이를 다시 `throw` 하므로 `throws` keyword 를 작성한다.

즉, `buyFavoriteSnack(person:vendingMachine:)` 함수는 `Throwing Functions`으로써 에러를 `Propagating` 한다.

<br>

__Propagating Errors Using Throwing Initializers__

`Throwing Initializers` 역시 에러를 `Propagating` 할 수 있으며, 방법은 `Throwing Functions`과 같다.

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```

#### 2. Handling Errors Using Do-Catch

__Syntax__

```swift
do {
    try expression
    statements
} catch pattern 1(let errorConstant) {
    statements
} catch pattern 2 where condition {
    statements
} catch pattern 3, pattern 4 where condition {
    statements
} catch {
    statements
}
```

`do-catch` statement 는 코드 블럭으로 에러를 처리한다. `do` clause 에서 에러가 `thrown` 되면, `catch` clauses 에서 일치하는 
에러를 처리한다.

`pattern`이 일치하거나, `pattern`과 `condition`이 일치할 때, 또는 여러 개의 `pattern`을 하나의 `catch` clauses 로 처리할 때 
`pattern`과 `where condition`이 사용되며, `} catch {` 처럼 아무런 `pattern`도 작성하지 않으면 이것은 어떤 에러든 모두 
처리한다.

> 모든 `catch` clause 는 별도로 에러 상수를 정의하지 않으면, default 로 `error`를 `local constant`로 사용한다.

<br>

__1 ) do-catch examples 1__

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Queen": "Licorice",
    "Eve": "Pretzels"
]

func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
```

```console
Insufficient funds. Please insert an additional 2 coins.
```

> `catch` clauses 는 `do` clause 가 `throw` 할 수 있는 모든 에러를 처리할 필요는 없다. 만약, `catch` clauses 가 에러를 
> 처리하지 않으면, 에러는 주변 `scope`로 `propagate` 된다. 이렇게 `propagate` 된 코드는 반드시 이것을 둘러싼 `scope`에 의해 
> 처리되어야한다.
> 
> - `Nonthrowing Functions`: 반드시 `do-catch` statement 로 감싸 에러를 처리해야한다.
> - `Throwing Functions` : `do-catch` statement 로 감싸거나, 에러를 던져 올리고 `caller`가 에러를 처리해야한다.
> 
> 만약 에러를 처리하지 않을 경우, `Runtime Error`가 발생된다. 

<br>

__2 ) do-catch examples 2__

`catch is`를 이용해 연관된 에러를 한 번에 처리할 수 있다.

```swift
func buySnack(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try buySnack(with: "Beat-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
```

```console
Couldn't buy that from the vending machine.
```

> 이 경우 `VendingMachineError`가 발생하면 `catch is VendingMachineError`에 의해 처리가 되고, 그 외 에러가 발생하면 
> `throws` 되어 `caller`에 의해 처리된다.

<br>

__3 ) do-catch examples 3__

또는 `catch is` 대신 연관된 에러를 필요한 만큼 `,` 를 이용해 나열해 처리할 수 있다.


```swift
func buySnack(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection,
            VendingMachineError.insufficientFunds,
            VendingMachineError.outOfStock {
        print("""
              Couldn't buy that from the vending machine
              because of invalid selection, out of stock, or not enough money.
              """)
    }
}

do {
    try buySnack(with: "Beat-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
```

```console
Couldn't buy that from the vending machine
because of invalid selection, out of stock, or not enough money.
```

#### 3. Converting Errors to Optional Values

`try?` expression 을 사용하면 [Optional Chaining][Chaining on Methods with Optional Return Values] 과 마찬가지로 
`return type` 이 언제나 `Optional`이 된다.

[Chaining on Methods with Optional Return Values]:/swift/2022/12/20/optional-chaining.html#h-7-chaining-on-methods-with-optional-return-values-

따라서 모든 에러를 같은 방식으로 처리하는 경우 모든 에러를 처리하는 `} catch {` 를 이용해 `do-catch` 구문을 명시적으로 작성하는 것 보다 
짧은 코드를 이용해 가독성을 높일 수 있다.

```swift
enum SomeError: Error {
case zero
}
```

아래 3개의 케이스는 모두 동일한 동작을 한다.

<br>

__1 ) Optional Functions without Throws__

`throws`를 사용하지 않고 함수의 `return type` 자체를 `Optional`로 만들고, 에러 발생 조건에 대해 명시적으로 `nil`을 return 
시켜 다음과 같이 동작시킬 수 있다.

```swift
func someOptionalFunction(_ input: Int) -> Int? {
    if input == 0 {
        return nil
    } else {
        return input
    }
}
```

```swift
let x: Int? = someOptionalFunction(0)
print(x as Any)                         // nil
let y: Int? = someOptionalFunction(1)
print(y as Any)                         // Optional(1)
```

하지만 위 케이스의 경우 `LBYL`(Look Before You Leap) 방식으로, 예상치 못한 에러로 인해 `Runtime Error`가 발생될 수 있다. 

<br>

__2 ) do-catch with Throws__

`LBYL` 방식 대신 함수를 `Throwing Functions`로 만들고 호출하는 코드의 주변부를 `do-catch`로 감싸 
`EAFP`(Easier to Ask for Forgiveness than Permission) 방식으로 처리할 수 있다.

> `try?` expressions 의 `return type`은 항상 `Optional`이므로 함수는 더이상 명시적으로 `Optional Functions`일 필요가 없다.

```swift
func someThrowingFunction(_ input: Int) throws -> Int {
    if input == 0 {
        throw SomeError.zero
    } else {
        return input
    }
}
```

```swift
let v: Int?
do {
    v = try someThrowingFunction(0)
} catch {
    v = nil
}
print(v as Any)                         // nil

let w: Int?
do {
    w = try someThrowingFunction(1)
} catch {
    w = nil
}
print(w as Any)                         // Optional(1)
```

`LBYL` 방식과 달리 예상치 못한 에러도 모두 `catch` clause 를 통해 처리할 수 있으므로 `Runtime Error` 발생을 막을 수 있지만 
코드가 너무 복잡해진다는 단점이 있다.

<br>

__3 ) Throwing Functions with Throws__

`try?` keyword 를 사용하면 `EAFP` 방식으로 코드를 작성하면서 가독성 문제도 해결할 수 있다.

```swift
func someThrowingFunction(_ input: Int) throws -> Int {
    if input == 0 {
        throw SomeError.zero
    } else {
        return input
    }
}
```

```swift
let p = try? someThrowingFunction(0)
print(p as Any)                         // nil
let q = try? someThrowingFunction(1)
print(q as Any)                         // Optional(1)
```

> `Throwing Functions`이더라도 `try` keyword 와 함께 사용하면 `return type`은 `Normal Types`가 된다. 
> 따라서 결과값을 별도로 `unwrapping` 할 필요가 없지만 에러가 발생할 경우 `Runtime Error`가 된다. 
> `Throwing Functions`로 작성했더라도 `Optional`로 `wrapping` 하려면 반드시 `try?` keyword 와 함께 사용해야한다.
> 
> ```swift
> let p = try someThrowingFunction(0)
> print(p as Any)                         // Runtime Error!
> let q = try someThrowingFunction(1)
> print(q as Any)                         // 1
> ```

<br>

따라서 모든 에러를 같은 방식으로 처리하려는 경우 다음과 같이 코드를 간결하게 작성할 수 있다.

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

#### 4. Disabling Error Propagation

절대로 에러가 발생하지 않는다는 것을 알고 있는 경우, `Throwing Functions`를 호출할 때 `try!` 를 이용할 수 있다. 
`try!` expressions 를 사용하면 다음 두 가지가 작동하지 않는다.

- Error Propagation
- 반환 값의 Optional Wrapping

```swift
func someThrowingFunctionWithOptional(_ input: Int) throws -> Int? {
    if input == 0 {
        throw SomeError.zero
    } else {
        return input
    }
}

let x = try someThrowingFunction(1)
print(x as Any)                         // 1
let y = try! someThrowingFunction(1)
print(y as Any)                         // 1
```

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

> 이 경우 예상과 달리 에러가 발생하면 `Runtime Error`가 되므로 절대 에러를 발생하지 않는지 신중한 판단이 필요하다. 

---

### 3. Specifying Cleanup Actions 👩‍💻


<br><br>

---
Reference

1. "Error Handling", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 22,
   2022, [Swift Docs Chapter 16 - Error Handling](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)
