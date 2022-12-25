---
layout: post
title: Swift Deinitialization
subtitle: Deinitialization - Automatic Reference Counting, Deinitializers in Action
categories: swift
tags: [swift docs, deinitializer, ARC, automatic reference counting, deinitializers]
---

### 1. Deinitializer on Class Types 👩‍💻

`Deinitializer`는 `class instance`의 할당이 해제(deallocate)되기 직전에 호출되며, `deinit` keyword 를 이용해 작성한다. 
`Deinitializer`는 `class` 타입에서만 사용될 수 있다.

> 일반 코드 블럭을 탈출하기 직전에 호출되는 코드는 [defer][Specifying Cleanup Actions] keyword 를 사용해 정의한다.

[Specifying Cleanup Actions]:/swift/2022/12/22/error-handling.html#h-3-specifying-cleanup-actions-

---

### 2. How Deinitialization Works 👩‍💻

`Swift`는 리소스 확보를 위해 자동으로 더이상 필요하지 않은 `instances`를 `deallocate`한다. 이를 위해 `Swift`는 
`ARC`(Automatic Reference Counting)를 이용해 `instances`의 메모리를 관리한다.

일반적으로 `instances`의 `deallocate`를 수동으로 할 필요는 없다. 하지만 자기 자신의 리소스를 이용하는 경우 직접 `cleanup`을 
수행해줘야한다. 예를 들어, 파일을 열고 데이터를 쓰기 위해 `custom class`를 생성하는 경우 `class instance`가 `deallocated` 되기 
전 반드시 파일을 닫아 리소스를 정리해야한다.

<br>

__Syntax__

```swift
deinit {
    // perform the deinitialization
}
```

> `Deinitializer`는 클래스에 하나만 존재하며, 파라미터가 존재하지 않으므로, 별도의 괄호 없지 작성한다.  
> `Deinitializer`는 `instance`가 `deallocation` 되기 전 자동으로 호출되며, 명시적으로 호출할 수 없다.
> 
> `Superclasses`의 `Deinitializer`는 `Subclasses`에 상속되며, `Superclasses`의 `Deinitializer`는 `Subclasses`의 
> `Deinitializer`의 마지막에 자동으로 호출된다. `Superclasses`의 `Deinitializer`는 `Subclasses`가 자신의 `Deinitializer`를 
> 제공하지 않더라도 항상 호출된다.
> 
> `class instance`는 `Deinitializer`가 호출되기 전까지 `deallocated` 되지 않기 대문에, `Deinitializer`는 
> `instance`의 모든 `Properties`에 접근 및 수정할 수 있다.

---

### 3. Deinitializers in Action 👩‍💻

`Bank`와 `Player` classes 를 이용한 게임을 통해 `Deinitializers`를 이해하도록 하자.

#### 1. Bank class

`Back` class 는 유통중인 코인이 10,000 개를 넘지 않도록 조절한다. 게임에서 하나의 `Bank`만 존재할 수 있기 때문에, `Bank`는 
`Class`로 구현되며, 코인을 관리하기 위한 `properties`와 `methods`를 갖는다.

`Bank`는 `coinsInBank` property 를 이용해 현재 유통중인 코인의 개수를 추적한다.  
또한 코인의 분배와 수집을 처리하기 위해 2개의 methods `distribute(coins:)`와 `receive(coins:)`를 제공한다. 
`distribute(coins:)`는 코인을 분배하기 전 은행에 남은 코인의 수를 검사해 은행 잔고보다 많은 코인을 요구할 경우, 
분배 가능한 남은 코인 만큼만 분배한다.

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}
```

#### 2. Player class

`Player` class 는 지갑의 코인을 관리하기 위한 `coinsInPurse` property 를 가지고 있으며, 초기화 할 때 `Bank`로부터 
일정량의 코인을 분배 받는다. `Player`는 `win(coins:)` methods 를 통해 은행으로부터 코인을 획득하고, 게임을 그만둘 때 
`Deinitializer`를 통해 소유한 모든 코인을 은행에 반환한다.

```swift
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    deinit {
        Bank.receive(coins: coinsInPurse)
    }
}
```

#### 3. Play Game and Deinitializers in Action

플레이어는 언제든 게임을 떠날 수 있기 때문에 `Optional`로 선언하고, `?` 또는 `!`를 붙여 접근한다.

```swift
var playerOne: Player? = Player(coins: 100)
print("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
A new player has joined the game with 100 coins
There are now 9900 coins left in the bank
```

<br>

```swift
playerOne?.win(coins: 2_000)
print("A new player has joined the game with \(playerOne?.coinsInPurse ?? 0) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
A new player has joined the game with 2100 coins
There are now 7900 coins left in the bank
```

<br>

그리고 플레이어가 추가로 게임에 참가했다.

```swift
var playerTwo: Player? = Player(coins: 1000)
print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has joined the game with 2100 coins
PlayerTwo has joined the game with 1000 coins
There are now 6900 coins left in the bank
```

<br>

`playerOne`이 게임을 떠난다.

```swift
playerOne = nil
if playerOne != nil {
    print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
} else {
    print("PlayerOne has left the game")
}
if playerTwo != nil {
    print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
} else {
    print("PlayerTwo has left the game")
}
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has left the game
PlayerTwo has joined the game with 1000 coins
There are now 9000 coins left in the bank
```

> 플레이어가 게임을 떠나는 행위는 Optional `palyerOne` 변수에 `nil`을 할당하는 것으로 이루어진다.  
> `playerOne`에 `nil`을 할당한다는 것은 `no Player instance`를 의미하며, `Player instance`에 대한 `playerOne` 변수의 
> `reference`가 깨진다.
> 
> 아무런 `Properties` 또는 `Variables`도 `Player instance`를 참조하지 않는다면, 메모리 리소스 확보를 위해 
> instance 에 대한 참조 할당이 해제된다(it’s deallocated in order to free up its memory).
> 
> 이러한 일이 발생되기 직전, `Deinitializer`가 자동으로 호출되며, 정의한대로 소유한 모든 코인을 은행에 반환한다.

<br>

```swift
playerTwo = nil
if playerOne != nil {
    print("PlayerOne has joined the game with \(playerOne!.coinsInPurse) coins")
} else {
    print("PlayerOne has left the game")
}
if playerTwo != nil {
    print("PlayerTwo has joined the game with \(playerTwo!.coinsInPurse) coins")
} else {
    print("PlayerTwo has left the game")
}
print("There are now \(Bank.coinsInBank) coins left in the bank")
```

```console
PlayerOne has left the game
PlayerTwo has left the game
There are now 10000 coins left in the bank
```

`playerTwo` 역시 게임을 떠나며 `Deinitializer`가 호출됨으로 은행에 모든 코인이 반환된다.


<br><br>

---
Reference

1. "Deinitialization", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Dec. 19, 2022, [Swift Docs Chapter 14 - Deinitialization](https://docs.swift.org/swift-book/LanguageGuide/Deinitialization.html)
