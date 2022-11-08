---
layout: post
title: Swift Higher-Order Functions
subtitle: map, reduce, filter, flatMap, compactMap, forEach, contains, removeAll, sorted, split
categories: swift
tags: [higher order function, first class citizen, functional programming, lambda calculus, map, reduce, filter, flatMap, compactMap]
---

### <span style="color: orange">1. First-Class 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. First-Class Citizen</span>

프로그래밍 언어 디자인에서 `First-Class Citizen`(`type`, `object`, `entity`, `value`)은 다른 `entity`에서
사용할 수 있는 모든 작업을 지원하는 `entity`로 다음과 같은 특징을 갖는다.

- 모든 아이템은 함수의 `parameters`(`arguments`)가 될 수 있다
- 모든 아이템은 함수의 `return value`가 될 수 있다
- 모든 아이템은 `상수 또는 변수에 할당`될 수 있다
- 모든 아이템은 `tested for equality`가 가능하다

#### <span style="color: rgba(166, 42, 254, 1)">2. First-Class Function</span>

`Computer Science`에서 프로그래밍 언어가 함수를 `First-Class Citizen`으로 다루면,
`First-Class Function`을 가지고 있다고 한다. 이것은 다음을 의미한다.

- 함수가 다른 함수의 `arguments`로 전달될 수 있다
- 함수를 다른 함수의 `return value`로 반환할 수 있다
- 함수를 `상수 또는 변수에 할당`하거나 `Data Structures`에 저장할 수 있다
- 함수의 `equality` 비교가 가능하다

또한 프로그래밍 이론에 따라 `First-Class Function`은 `Anonymous Functions`(Function literals)를 요구하기도
한다. `First-Class Function`이 있는 프로그래밍 언어에서 함수의 이름은 특별한 상태가 없다. `Integer` 타입의 변수를 
다루듯 함수 역시 `Function` 타입의 일반 변수처럼 취급된다.

<br>
`First-Class Function`는 `Functional Programming`의 필수요소이며, `Higher-order Functions`는
`Functional programming`의 표준과도 같다.  
`Higher-order Functions`의 예로 `Map` 함수를 살펴보자. `Map` 함수는 `Function`과 `list`를 `arguments`로
취하며, `list`의 각 `member`에 함수를 적용한 `list`를 반환한다.

```swift
let someIntArray: [Int] = [1, 2, 4, 5, 8, 11, 15]
let doubleIntArray: [Int] = someIntArray.map { $0 * 2 }
print(doubleIntArray)   // [2, 4, 8, 10, 16, 22, 30]
```

> 즉, 프로그래밍 언어가 `Map`을 지원하려면, 반드시 함수가 다른 함수의 `arguments`로 전달될 수 있어야 한다.

<br>

`First-Class Frunction`을 지원하는 프로그래밍 언어에서는 `Nested Functions` 또는 `Anonymous Functions`가 
`body` 외부의 변수(`non-local variables`)를 참조하는 것이 자연스러운 반면, 그렇지 않은 언어는 함수를 `arguments`로
전달하거나 `return value`로 반환하는데 어려움이 있다.

따라서 초기 `Imperative languages`(명령형 언어)에서는 이를 회피하기 위해 함수를 `return types`로 허용하지 않음은 물론,
`Nested Functions`나 `non-local variables` 등을 모두 허용하지 않았다. 이러한 언어에서 함수는 `Second-Class citizen`이다.  
이후 최신 언어에서 `First-Class Function`을 적절히 지원하기 위해 함수에 대한 참조를 `bare function pointer`대신
`Closure`로 처리하게되었고, 따라서 `Garbage Collection` 역시 필수 요소가 된다.

> `First-Class Function`은 함수에 대한 참조를 `pointer` 대신 `Closures`로 처리한다. 따라서 `Garbage Collection`이
> 반드시 필요하다.

참고로 C언어와 같이 함수가 `First-Class Citizen`이 아닌 언어는 `function pointers` 또는 `delegates`와 같은 기능을 이용해
`Higher-order function`을 작성할 수 있도록 한다. 하지만 언어 자체가 `First-Class Function`을 지원하는 것이 
아니므로 `First-Class Citizen`이 되는 것은 아니다.

---

### <span style="color: orange">2. 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---

### <span style="color: orange">3. 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---

### <span style="color: orange">4. 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---

### <span style="color: orange">5. 👩‍💻</span>

__Syntax__

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---





<br><br>

---
Reference

1. "First-class citizen", Wikipedia, last modified Oct. 15, 2022, accessed Nov. 07, 2022, [Wikipedia - First Class Citizen](https://en.wikipedia.org/wiki/First-class_citizen)
2. "First-class function", Wikipedia, last modified Jul. 14, 2022, accessed Nov. 07, 2022, [Wikipedia - First Class Function](https://en.wikipedia.org/wiki/First-class_function)
3. "Higher-order function", Wikipedia, last modified Sep. 8, 2022, accessed Nov. 07, 2022, [Wikipedia - Higher-Order Function](https://en.wikipedia.org/wiki/Higher-order_function)
4. "Non-local variable", Wikipedia, last modified May. 12, 2022, accessed Nov. 07, 2022, 
5. "Higher-Order Functions in Swift", Medium, last modified Jun. 9, 2020, accessed Nov. 07, 2022, [Higher-Order Functions in Swift](https://betterprogramming.pub/higher-order-functions-in-swift-13c31a769c0c)
6. "Understanding Higher Order Functions in Swift", APPCODA, Feb. 26, 2020, accessed Nov. 07, 2022, [Understanding Higher Order Functions in Swift](https://www.appcoda.com/higher-order-functions-swift/)
