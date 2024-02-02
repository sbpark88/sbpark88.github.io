---
layout: post
title: Swift Nested Types
subtitle: Nested Types create hierarchies and encapsulate Classes or Structures or Enumerations.
categories: [swift]
tags: [swift docs, nested types, class encapsulate, structure encapsulate, nested classes, nested structures, nested enumerations]
---

### 1. Nested Types 👩‍💻

*Enumerations* 는 주로 특정 *Classes* 또는 *Structures* 의 기능을 지원하기 위해 사용된다. 유사하게 더 복잡한 타입의 
*context* 에서 사용하기 위해 순수하게 `Utility Classes or Structures`를 정의하는 것이 편리할 수도 있다.  
이를 위해 Swift 의 Classes, Structures, Enumerations 는 모두 `Nested Types`를 지원한다. 이를 통해 `scope`를 
제한할 수 있다. Nested Types 는 지원하는 타입의 내부 중괄호 내에 작성해야하며, Nested Types 는 필요한 만큼 중첩이 가능하다.

[Nested Functions](/swift/2022/10/19/functions.html#h-6-nested-functions-) 에서 이미 타입의 중첩을 작성해본 적 있다. 
Swift 는 First-Class Citizens 를 지원하는 언어로 이 글에서 설명하려는 Classes, Structures, Enumerations Types 의 중첩은 
*Function Types* 의 중첩과 크게 다르지 않다.

### 2. Nested Types in Action 👩‍💻

블랙잭 게임을 위해 Structure 를 정의해보자. 카드의 모양에 따라 세트를 나누는 `Suit` Enumeration, 카드의 숫자에 따라 등급을 나누는 
`Rank` Enumeration 를 Nested Types 로 갖도록 할 수 있다.

그리고 `Rank` 는 다시 '반드시 저장할 값 하나'와 'Optional 로 저장할 다른 값 하나'를 구조화 하기 위해 `Values` Structure 를 
Nested Types 로 갖는다. 그리고 `Rank`가 항상 최신 *value* 값을 얻도록 하기 위해 `Values` Type 의 *Computed Property* 를 
`values` 변수를 갖는다. 

이제 이 두 Nested Types 를 가지고 *BlackjackCard Structure* 를 정의한다. *BlackjackCard* 은 *rank* 와 
*suit* 를 properties 로 갖고, 이것을 설명하기 위한 *description* 을 computed property 로 갖는다. 

```swift
struct BlackjackCard {

    // nested Suit enumeration
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    // nested Rank enumeration
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    // BlackjackCard properties and methods
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

```swift
let aceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
let kingOfHearts = BlackjackCard(rank: .king, suit: .hearts)
let sixOfDiamonds = BlackjackCard(rank: .six, suit: .diamonds)

print("The ace of spades : \(aceOfSpades.description)")
print("The king of hearts : \(kingOfHearts.description)")
print("The six of diamonds : \(sixOfDiamonds.description)")
```

```console
The ace of spades : suit is ♠, value is 1 or 11
The king of hearts : suit is ♡, value is 10
The six of diamonds : suit is ♢, value is 6
```

### 3. Referring to Nested Types 👩‍💻

`Nested Types`는 기본적으로 이것이 `정의된 context 의 내부로 범위가 제한`된다. 이렇게 캡슐화 함으로써 전역에서 접근할 필요가 없는 
Types 를 숨겨 코드를 더욱 안전하고 가독성 높게 만들 수 있다. 하지만 *Nested Types 는 Closures 의 Capturing Values 와 다르게 
완전히 격리되는 것은 아니다*.

만약 2~3개의 타입에서만 사용할 어떤 `Nested Types`가 있다고 해보자. 이를 전역으로 만들면 2~3개의 타입에서 공유가 가능하다. 하지만 이런 
타입이 많아지면 `전역 scope 오염`이 일어나 불필요하게 복잡해질 가능성이 높다. 이를 피하기 위해 2~3개의 타입마다 동일한 Nested Types 를 
만들면 전역 scope 오염은 되지 않겠지만, 코드의 중복이 발생하고 유지보수 시 코드의 변경 사항을 놓쳐 Human Errors 를 만드는 원인이 될 수 있다.

이런 경우 가장 연관성이 높은 곳에 하나의 Nested Types 를 정의하고, 외부 타입에서 접근할 경우 해당 Nested Types 가 정의된 가장 외부 
Types 에 접근해 `Hierarchy 구조를 타고 내려가 명시적으로 접근`할 수 있다. 이렇게 *명시적인 접근을 허용함으로써 Nested Types 는 
전역 scope 의 오염을 예방*하며 `필요에 따라 명시적 접근을 통한 코드의 재사용성을 동시에 확보`할 수 있다.

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
print(heartsSymbol)     // ♡
```


<br><br>

---
Reference

1. "Nested Types." The Swift Programming Language Swift 5.7. accessed Jan. 16, 2023, [Swift Docs Chapter 19 - Nested Types](https://docs.swift.org/swift-book/LanguageGuide/NestedTypes.html)
