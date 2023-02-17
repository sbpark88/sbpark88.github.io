---
layout: post
title: Swift Error Handling
subtitle: Error handling in Swift interoperates with error handling patterns that use the NSError class in Cocoa and Objective-C.
categories: swift
tags: [swift docs, error handling, do catch, do-catch, throw, throwing function, throwing initializer, propagating, try, cleanup action, defer]
---

### 1. Representing and Throwing Errors 👩‍💻

*Swift 의 에러 처리는* `Cocoa 와 Objective-C 에서 'NSError class'를 사용하는 에러 처리 패턴과 상호 운용` 된다.
[Handling Cocoa Errors in Swift](https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift)

Swift 에서 에러는 `Error protocol 을 따르는 Types 의 값`으로 표현된다. 그러기 위해서 `Error protocol 을 채택`하도록 해야한다.
Swift 의 *Enumerations 는 연관된 Error conditions 를 그룹화*하는데 적합하다.

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
*Functions*, *Methods*, *Initializers* 를 호출하는 코드 앞에 `try`(or `try?` or `try!`) keyword 를 작성해 
*try expression* 으로 코드를 작성한다.

> Swift 의 에러 처리는 다른 언어의 `try-catch & throw`와 유사하다. 하지만 **Objective-C** 를 포함한 많은 언어와 달리 
> Swift 의 에러 처리는 **계산 비용이 많이 드는 `Call Stack 해제(unwinding)`을 포함하지 않는다**.  
> Swift 의 **`throw statement` 의 성능 특성은 `return statement` 와 유사**하다.

#### 1. Propagating Errors Using Throwing Functions

에러를 `throw`할 수 있는 *Functions*, *Methods*, *Initializers*를 위해 함수의 parameters 뒤에 `throws` keyword 
를 작성하며, 이런 함수를 `Throwing Functions`라 한다. *Throwing Functions* 로 작성하면 발생한 에러를 직접 처리하지 않고 
`throw` 해서 호출한 코드의 주변 코드가 에러를 처리하도록 할 수 있다.

또한 `Throwing Functions 의 return types`는 항상 `Error protocol 을 따르는 Types 의 값` 또는 `Optional`이다.

__Syntax__

```swift
func canThrowErrors() throws -> String
```

> `Throwing Functions 만 에러를 throwing` 할 수 있다. 
> `Nonthrowing Functions 은 발생한 모든 에러를 함수 안에서 처리`해야한다.

*Throwing Functions*, *Throwing Initializers* 를 호출할 때는 에러가 처리되지 않고 `thorw` 될 수 있음을 분명히 해야한다. 
즉, `try`를 이용해 함수를 호출하며, 함수를 호출한 코드의 주변 코드에 의해 에러가 처리되거나, 계속해서 `propagation` 해야한다.

- 함수를 호출한 코드의 주변 코드가 에러를 처리 : `do-catch` statement 를 이용해 주변 코드가 에러를 직접 처리한다.
- 함수를 호출한 코드의 context 가 다시 에러를 `throw` : `throws` keyword 를 이용해 에러를 더 위로 `throw` 처리한다.

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

자판기의 `vend(itemNamed:)` 메서드는 상품이 존재하는지 확인하고, 재고를 확인한 후, 충분한 돈을 넣었는지 확인해 상품을 
제공한다. 만약, 어디서든 에러가 발생할 경우 메서드는 즉시 종료되고 에러를 `throw`한다.
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

`vend(itemNamed:)` 메서드가 `Throwing Functions`이기 때문에 `try` keyword 를 사용해 호출해야한다. 그리고 이것을 
호출한 코드의 주변 코드에 의해 에러가 처리되거나 계속 `propagation` 해야한다.

코드는 단순히 `try vendingMachine.vend(itemNamed: snackName)`를 이용해 호출만 하고 있으므로 에러는 반드시 다시 위로 
`throw` 되어야 한다. 따라서 `throws` keyword 를 추가해 `buyFavoriteSnack(person:vendingMachine:)` 함수 
역시 `Throwing Functions`로 만들어야한다. 

<br>

__Propagating Errors Using Throwing Initializers__

`Throwing Initializers` 역시 에러를 `propagation` 할 수 있으며, 방법은 `Throwing Functions`와 같다.

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

`pattern 이 일치`하거나, `pattern 과 condition 이 일치`할 때 *trigger* 되며 아무런 *pattern* 도 추가하지 않으면 
나머지 모든 에러를 처리한다.

`pattern 은 catch 다음에 작성`하며, `condition 은 pattern 다음에 'where' 를 이용해 추가`한다. 또한 `,` 를 이용해 
`Multiple Patterns` 를 하나의 `catch` clause 에 연결하거나 [catch is](#catchIs) 를 이용해 **여러 cases 를 하나의 
catch 에서 처리**할 수 있다. 또한  [Switch Value Bindings][Switch Value Bindings] 와 같이 *catch clause* 
내부 *context* 에서 사용할 값을 *binding* 하는 것도 가능하다.

[Switch Value Bindings]:/swift/2022/10/11/control-flow.html#h-6-value-bindings

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

> `catch` clauses 는 do clause 가 throw 할 수 있는 `모든 에러를 처리할 필요는 없다`. 만약, **catch clauses 가 에러를 
> 처리하지 않으면**, `에러는 주변 scope 로 propagation` 된다. 이렇게 `propagation` 된 코드는 반드시 이것을 둘러싼 'scope' 에 의해 
> 처리`되어야한다.
> 
> - `Nonthrowing Functions`: 반드시 `do-catch` statement 로 감싸 에러를 처리해야한다.
> - `Throwing Functions` : `do-catch` statement 로 감싸거나, 에러를 던져 올리고 `caller`가 에러를 처리해야한다.
> 
> 만약 에러를 어디서도 처리하지 않을 경우, `Runtime Error`가 발생된다. 따라서 **Throwing Functions** 는 **do-catch** 가 
> 모든 에러를 처리할 필요 없이 위로 **throw** 할 수 있지만 **Nonthrowing Functions** 는 반드시 **do-catch** 가 모든 에러를 
> 처리해야 한다.

<br>

<span id="catchIs">
__2 ) do-catch examples 2__
</span>

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

> 이 경우 `VendingMachineError`가 발생하면 `catch is VendingMachineError`에 의해 처리가 되고, `그 외 에러`가 발생하면 
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

`Throwing Functions 의 return types`는 항상 `Error protocol 을 따르는 Types 의 값` 또는 `Optional`이라고 했다. 
따라서 에러가 발생할 경우 이를 처리하기 위한 `do-catch` statement 가 반드시 필요하다.

[Optional Chaining always returns Optional Types][Optional Chaining always returns Optional Types]
을 다시 떠올려보자. `Optional Chaining`은 `?`을 이용해 *Instance* 또는 *Value* 가 존재하지 않는 경우에도 별도의 에러 처리 
없이 코드를 간결하게 처리했다. *Swift* 가 알아서 에러가 발생하는 상황에 실행을 중단하고 `nil`을 반환하기 때문이다.

*Optional Chaining* 과 마찬가지로 *Throwing Functions* 역시 `try` 대신 `try?`를 이용하면
`Throwing Functions 의 return types`이 항상 `Optional Types` 또는 `nil`을 반환하도록 할 수 있다. 

그러면 에러가 발생할 경우 *Swift* 가 알아서 실행을 중단하고 `nil`을 반환하므로 `Optional Chaining`을 할 때와 마찬가지로 
일반 코드를 작성하듯 처리할 수 있다.

[Optional Chaining always returns Optional Types]:/swift/2022/12/20/optional-chaining.html#h-7-chaining-on-methods-with-optional-return-values-

<br>

`try?`를 사용함으로써 얻는 장점은 `모든 에러를 같은 방식으로 처리하는 경우` `do-catch 없이` 짧고 간결한 코드로 작성할 수 있다는 것이고,   
단점은 *모든 에러를 같은 방식으로 처리*하므로 *cases* 별로 자세한 *에러 처리*를 하는 것이 *불가능*하다는 것이다.

> - `try?` 는 `Optional Chaining`의 `?`와 마찬가지로 항상 Optional Types 를 반환한다.
> - `try!` 는 `Optional Chaining`의 `!`와 마찬가지로 항상 반환값을 Forced Unwrapping 한다.

```swift
enum SomeError: Error {
case zero
}
```

아래 3개의 케이스는 모두 동일한 동작을 한다.

<br>

__1 ) Optional Functions__

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

__2 ) Throwing Functions with `try`__

우선 `Throwing Functions`는 항상 `Error protocol 을 따르는 Types 의 값` 또는 `Optional`을 반환하므로 
더이상 *return types* 가 `Int?`일 필요가 없다. *return types* 를 `Int`로 바꾸도록하자. 

```swift
func someThrowingFunction(_ input: Int) throws -> Int {
    if input == 0 {
        throw SomeError.zero
    } else {
        return input
    }
}
```

이제 `LBYL` 방식 대신 `EAFP`(Easier to Ask for Forgiveness than Permission) 방식으로 코드를 작성할 
수 있다. 이때 함수가 `throw`한 에러는 반드시 다시 `throw` 해 `propagation` 하거나 `do-catch`를 이용해 처리해야한다.

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

`LBYL` 방식과 달리 예상치 못한 에러도 모두 `catch` clause 를 통해 처리할 수 있으므로 `Runtime Error` 발생을 막을 수 있게되었다.   
하지만 특별하게 에러를 구분해 처리할 필요가 없을 경우 위 방식은 코드의 흐름이 분리되어 가독성이 좋지 못한 문제가 존재한다.

<br>

__3 ) Throwing Functions with `try?`__

`try?` keyword 를 사용하면 `EAFP` 방식으로 코드를 작성하면서 위 가독성 문제도 해결할 수 있다.

```swift
let p = try? someThrowingFunction(0)
print(p as Any)                         // nil
let q = try? someThrowingFunction(1)
print(q as Any)                         // Optional(1)
```

<br>

따라서 `fetch`와 같은 함수는 `try?`를 이용해 다음과 같이 간결하게 작성할 수 있다.

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

#### 4. Disabling Error Propagation

`dot Syntax`를 이용할 때 우리는 3가지 방법으로 접근할 수 있었다. *Optional Chaining* 을 하지 않는 `.` 과 
*Optional Chaining* 을 하는 `?.`, 마지막으로 *Forced Unwrapping* 을 하는 `!.`이다.

`try`도 마찬가지로 `try`, `try?`, `try!` 3가지 *Syntax* 가 존재한다. 위에서 `try` 대신 `try?`를 사용해 
`Optional` or `nil` 를 반환하도록 *Throwing Functions* 호출을 다루는 것을 보았다. `try!` 역시 
*Optional Chaining* 의 `!.`와 유사하다. 

절대로 에러가 발생하지 않는다는 것을 알고 있는 경우, *Throwing Functions* 를 호출할 때 `try!` 를 이용할 수 있다. 
이 경우 다음 두 가지가 작동하지 않는다.

- Error Propagation
- 반환 값의 Optional Wrapping

```swift
let x = try? someThrowingFunction(1)
print(x as Any)                         // Optional(1)
let y = try! someThrowingFunction(1)
print(y)                                // 1
```

`try?`를 이용한 호출과 달리 `Unwrapped`된 값을 얻을 수 있다.

> 단, 이 때 주의해야할 것이 `throws -> Int`가 아닌 `throws -> Int?`일 경우 
> 
> ```swift
> func someThrowingFunction(_ input: Int) throws -> Int? {
>     if input == 0 {
>         throw SomeError.zero
>     } else {
>         return input
>     }
> }
> ```
> 
> `throw`에 한 번, `Int?`에 한 번 => 총 2번의 `Optional Wrapping`이 이루어진다.  
> 따라서 `throw`에 의해 **Wrapping 된 Optional 을 해제**하더라도 다시 **Int? 에 의해 Optional Wrapping** 
> 된 값을 얻는다. 함수가 반환한 값이 `Optional(Optional(1))`이기 때문이다.
> 
> ```swift
> let y = try! someThrowingFunction(1)
> print(y)                                // Optional(1)
> ```
>

<br>

로컬 경로에서 이미지를 가져오는 코드를 생각해보자.

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

이미지가 존재할 것이라 확신하고 `try!`를 사용했는데 이미지가 존재하지 않거나 가져오는 데 실패했다면 
<span style="color: red;">Runtime Error</span> 가 발생한다. 따라서 `try!`를 사용할 때는
<span style="color: red;">
  절대 에러가 발생하지 않는다는 것에 대한 보증을 개발자가 해야하므로 신중한 판단이 필요
</span>하다.

---

### 3. Specifying Cleanup Actions 👩‍💻

`Classes` 타입은 `class instance 의 할당이 해제(deallocate)되기 직전에 호출`될 코드를 정의할 수 있는 
[Deinitializer][Deinitialization] 라는 특별한 코드블럭이 있고 이것은 `deinit` keyword 를 이용해 정의했다. 

[Deinitialization]:/swift/2022/12/19/deinitialization.html#h-2-how-deinitialization-works-

그리고 이러한 `context 를 탈출할 때 호출`되는 코드는 `Classes` 보다 더 작은 단위인 어떠한 `Block scope`에 
대해서도 정의할 수 있는데 `Defer Statement`라 하며, `defer` keyword 를 이용해 정의한다.

> **Closures, if, switch, ...etc** 와 같은 어떠한 `Block scope`에서나 정의할 수 있다.

`Defer Statement` 역시 리소스를 정리하기 위한 특별한 코드로 다음과 같은 특징을 갖는다.

- `코드 블럭을 탈출하기 직전에 호출`되며, `throw, return, break 에 관계 없이 작동`한다.
- `내부에 throw, return, break 를 포함할 수 없다`.
- ***deinit*** 과 달리 `하나의 코드 블랙 내에 여러 개가 존재`할 수 있으며, `Stack`을 이용해 `LIFO`로 작동한다.

```swift
func someDefer(number: Int) {
    if number == 0 {
        defer {
            print("zero")
        }
    }
    
    defer {
        print("first")
    }
    defer {
        print("second")
    }
    defer {
        print("third")
    }
}

someDefer(number: 0)
```

```console
zero
third
second
first
```

그리고 Swift 는 `scope 의 마지막에 정의된 defer 는 항상 즉시 실행`되므로 `defer`를 `do`로 작성하라고 경고를 띄운다. 
따라서 이 경고를 받아들여 위 코드를 수정하면 다음과 같다. 즉, `defer`는 *block 의 시작 또는 중간에 정의 후 scope 를 
탈출하기 직전에 호출될 코드를 정의*하기 위한 것임을 알 수 있다.

```swift
func someDefer(number: Int) {
    if number == 0 {
        do {
            print("zero")
        }
    }
    
    defer {
        print("first")
    }
    defer {
        print("second")
    }
    do {
        print("third")
    }
}
```

<br>

마지막으로 파일을 다루는 함수가 리소스를 해제하기 위해 `defer`를 어떻게 활용하는지 보자.

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // Work with the file.
        }
        // close(file) is called here, at the end of the scope.
    }
}
```

위 코드에서 `defer` 는 `if` 블럭에 속해 있으므로, `if` 블럭을 탈출하기 직전에 호출되어 파일을 닫고 수동으로 메모리 리소스를 
확보한다.  
(위 함수에 `if` 외 다른 코드가 없어서 함수가 종료될 때 `defer` 가 호출되는 것처럼 보일 수 있으나 `if` 블럭을 탈출하기 직전에 
호출되는 것임을 정확히 이해해야햔다).

<br><br>

---
Reference

1. "Error Handling." The Swift Programming Language Swift 5.7. accessed Dec. 22, 2022, [Swift Docs Chapter 16 - Error Handling](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)
