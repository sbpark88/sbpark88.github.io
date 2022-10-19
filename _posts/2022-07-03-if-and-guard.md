---
layout: post
title: if, guard의 사용법과 차이점
subtitle: 조건 검사와 optional binding(unwrap)에서 사용되는 if, guard의 차이점
categories: swift
tags: [if, guard, if let, guard let, optional, optional binding, unwrap]
---

`Swift`를 처음 접했을 때 가장 이상해보였고, 궁금했던 것이 `if`와 `guard`였다.

뭔가 비슷하게 사용되는 것 같으면서도 내가 아는 사용법이 아닌 것도 존재하고... 🤔🤔🤔

### <span style="color: orange">1. 조건문(conditional statements)</span>

다른 언어에서도 마찬가지겠지만 if문은 기본적으로 조건문이다. 🙃

즉, 다음과 같이 조건을 검사하고, 일치할 경우 실행할 로직을 정의할 수 있다.

```swift
func largerThanThree(num: Int) -> Void {
    if num > 3 {
        print("\(num) is larger than 3.")
    }
}

largerThanThree(num: 5)

```

그런데 `Swift`에는 `if` 말고도 `guard`라는 것이 있다.  
따라서 위 `if`문은 다음과 같이 바꿔 적을 수 있다.
```swift
func largerThanThree(num: Int) -> Void {
    guard num > 3 else { return }
    print("\(num) is larger than 3.")
}
```

`if`가 할 수 있는 것은 `guard`도 할 수 있고, `guard`가 할 수 있는 것은 `if`도 할 수 있다. 그렇다면 무엇이 같고 다를까? 👀

먼저 공통점은 다음과 같다.

1. 조건문(conditional statements)으로 사용할 수 있다.
2. Optional binding(unwrap)으로 사용할 수 있다.
3. 조건(condition)은 `Bool`타입이거나 `bridged to Bool`타입이어야한다. 

그렇다면 다른점은 무엇일까?

1. `guard`는 `else`가 필수다. 반면, `if`는 `else`가 필수가 아니다.
2. `guard의 else block`에는 `Functions that Never Return` 또는 `Control Transfer Statements(return, break, continue, throw)` 중 하나를 사용해 block 밖으로 제어를 전송해야한다.
3. `if`는 true condidtion일 때의 로직을 if block 안에 작성해야하지만 `guard`는 else block 이 종료된 다음에 작성한다.
4. `Optional binding`으로 사용할 경우, `if`에 의해 binding 된 변수의 `scope는 if block`이다. 하지만 `guard`에 의해 binding 된 변수의 `scope는 guard가 속해 있는 block`이다. 



### <span style="color: orange">2. Optional binding(unwrap)</span>

`Swift` 언어의 `특징` 중 하나로, `nil`(다른 언어에서의 null)에 대한 에러 처리를 쉽게 해줌으로써 문법적 `Safety`를 보장한다.  
즉, 문법적 안정성을 위해 `Optional을 이용해 wrapping 되어있는 값`을 사용하기 위해서는 `unwrap`을 해야하는데, 이를 `Optional binding`이라 한다.

`Optional binding`을 하는 가장 쉬운 방법은 다음과 같다.
```swift
var price: [String: Int] = [
    "coffee": 3000,
    "juice": 4500,
    "cookie": 2000
]
var storeName: String? = "Homeplus"

// Unconditional Unwrapping
storeName!
price["cookie"]!

// Nil-Coalescing Operator
name ?? "GS25"
price["cookie"] ?? 3000
```

> `Nil-Coalescing Operator`는 `condition`이 nil인지를 판별하는 `Ternary Operators`의 축약형이라 볼 수 있다.
```swift
name ?? "GS25"
name != nil ? name! : "GS25"
```

하지만 `Unconditional Unwrapping(=Forced Unwrapping)`( _name!_ ) 은 fatal error를 발생시킬 위험성이 높고 ☠️☠️☠️, `Nil-Coalescing Operator`( _price["cookie"] ?? 0_ ) 은 fatal error는 발생하지 않겠지만 의도한 바와 다른 비즈니스 로직을 진행하고도 아무런 문제가 없는 것처럼 보이게 된다. 🤥🤥

따라서 `Optional binding`을 안전하게 하면서, 조건을 이용해 일치하는 경우에 한해 비즈니스 로직을 정확히 처리하기 위해 `if`나 `guard`를 이용한 `Optional binding`이 필요하다. 

#### Optional binding using `if`

```swift
func priceOfTwoCookies() -> Void {
    if let name = storeName {
        if let price = price["cookie"] {
            print("\(name) sells two cookies for \(price * 2) won.")
        }
    } else {
        print("The store is not specified.")
        return
    }
}

priceOfTwoCookies()     // Homeplus sells two cookies for 4000 won.

storeName = nil
priceOfTwoCookies()     // The store is not specified.
```
> `if`를 이용한 `Optional binding`의 특징은 `price["cookie"]`에서 볼 수 있듯이 `else block`이 필수가 아니다.

물론, if를 사용해도 if block 내부가 아닌 if가 존재하는 block scope로 만들 수 있다.  
하지만 다음과 같은 복잡한 코드가 탄생할 것이다.
```swift
func priceOfTwoCookies() -> Void {
    var name: String = ""
    if let storeName = storeName {
        name = storeName    
    } else {
        print("The store is not specified.")
        return
    }
    var price: Int = 0
    if let bindedPrice = price["cookie"] {
        price = bindedPrice
    } else {
        return
    }
    print("\(name) sells two cookies for \(price * 2) won.")
}
```

#### Optional binding using `guard`
```swift
func priceOfTwoCookies() -> Void {
    guard let name = storeName else {
        print("The store is not specified.")
        return
    }
    guard let price = price["cookie"] else { return }
    print("\(name) sells two cookies for \(price * 2) won.")
    
}

priceOfTwoCookies()     // Homeplus sells two cookies for 4000 won.

storeName = nil
priceOfTwoCookies()     // The store is not specified.
```
> `guard`를 이용한 `Optional binding`의 특징은 `else block`이 필수다. 그리고 `binding한 값의 block scope`가 `guard가 속한 code block scope`와 같다.


단일 `if`에 비즈니스 로직이 짧으면 어떤걸 쓰든 비슷하다. 하지만 위 예제처럼 `Optional binding`을 여러 번 하거나 비즈니스 로직이 길어지면 코드 가독성이 떨어지게된다. 🥵🥵🥵

하지만 `guard`는 `Optional binding & error handling`과 `Business logic`의 코드가 섞이지 않고 완전히 라인 분리가 가능하다.
따라서 `guard`를 사용하면 `binding한 값의 scope`가 guard block 내부가 아닌 `guard가 존재하는 block scope`이므로 코드를 순차적으로 작성하면 된다. 🤩🤩🤩

JavsScript(TypeScript)에서 똑같이 Promise object를 이용하지만 `Promise callback hell`을 `async`, `await`를 이용해 개선할 수 있는 것처럼, `guard` 역시 똑같이 `조건절`과 `Optional binding`을 수행할 수 있지만 `if`의 가독성 문제를 해결한다.



### <span style="color: orange">3. Summary</span>

#### 조건문으로 사용될 때는 Bool condition이 온다.

```swift
if (Bool condition) {
    statements
}

if (Bool condition) {
    statements
} else {

}

guard (Bool condition) else {
    statements

    /*
    It is necessary
    'Functions that Never Return' or 
    'Control Transfer Statements(return, break, continue, throw)'
    */
}
```

#### Optional binding으로 사용될 때는 optional data가 온다.

```swift
if let constantName = someOptional {
    statements
}

if let constantName = someOptional {
    statements
} else {

}

guard let constantName = someOptional else {
    statements

    /*
    It is necessary
    'Functions that Never Return' or 
    'Control Transfer Statements(return, break, continue, throw)'
    */
}
```
> Optional이 `nil`이거나 `false`일 경우는 `false`, 그 외에는 `true`가 된다. 즉, `bridged to Bool`에 의해 `if`, `guard`의 조건이 결정되고, `true`일 경우 someOptional을 `let` 또는 `var`에 `unwarp`된 값을 할당하는 것이다.



<br><br>

---
Reference


1. "Basic Operators", Welcome to Swift.org, last modified latest(Swift 5.7), accessed Jul. 3, 2022, [https://docs.swift.org/swift-book/LanguageGuide/Methods.html](https://docs.swift.org/swift-book/LanguageGuide/Methods.html)
2. "Statements", Welcome to Swift.org, last modified latest(Swift 5.7), accessed Jul. 3, 2022, [https://docs.swift.org/swift-book/ReferenceManual/Statements.html](https://docs.swift.org/swift-book/ReferenceManual/Statements.html)

