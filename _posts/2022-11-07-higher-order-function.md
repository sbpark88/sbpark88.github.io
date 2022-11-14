---
layout: post
title: Swift Higher-order Functions
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
`First-Class Function`은 `Functional Programming`의 필수요소이며, `Higher-order Functions`는
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

### <span style="color: orange">2. Higher-order Function Examples 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. TypeScript</span>

`twice`와 `plusThree`라는 함수가 있다.

```typescript
const twice = (f: Function) => {
  return (x: number) => f(f(x))
}
const plusThree = (i: number) => i + 3
```

<br>
`twice` 함수는 아래와 같이 `body`와 `return` 키워드를 생략할 수 있다.

```typescript
const twice = (f: Function) => (x: number) => f(f(x))
const plusThree = (i: number) => i + 3
```

> - plusThree: `number` 타입의 `argument`를 받아 3을 더해 `number` 타입을 반환한다.
> - twice: `Function` 타입의 `argument`를 받아 `(x: number) => f(f(x))` 함수를 반환한다.
> - `f(f(x))`는 `<Number>(x: number) => number` 타입의 함수이며, `parameter`와 `return type`이 동일하므로
>   재귀가 가능하다. 따라서 `f(f(x))`는 `argument`로 입력된 함수를 재귀를 통해 2번 실행하는 함수다.

<br>
참고로 `TypeScript`는 함수의 타입을 명시할 때 다음 두 가지 방식의 `typealias`를 사용할 수 있다.

- GenericFunc
```typescript
type GenericFunc = <Number>(x: number) => number
const twice = (f: GenericFunc) => (x: number) => f(f(x))
```

- GenericType
```typescript
type GenericType<Number> = (x: number) => number
const twice = (f: GenericType<number>) => (x: number) => f(f(x))
```

<br>
두 함수를 `chaining`해 `someFunction`이라는 함수를 만들고, 이를 실행해보면 다음과 같다.

```typescript
const twice = (f: Function) => (x: number) => f(f(x))
const plusThree = (i: number) => i + 3
```

```typescript
const someFunction = twice(plusThree)

console.log(someFunction(7))   // 13   (7 + 3) + 3
console.log(someFunction(9))   // 15   (9 + 3) + 3
console.log(someFunction(12))  // 18   (12 + 3) + 3
```

<br>

#### <span style="color: rgba(166, 42, 254, 1)">2. Swift</span>

__1 ) Function `Declarations`__

```swift
func twice(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
    { f(f($0)) }
}
```

<br>
위 `twice`의 `parameter type`과 `return type`이 보기 힘들다면 `typealias`를 사용한 아래 코드를 보도록 하자.

```swift
typealias intToInt = (Int) -> Int

func twice(_ f: @escaping intToInt) -> intToInt {
  { f(f($0)) }
}
```

<br>
이제 `plusThree`를 포함해 두 함수를 `chaining` 시켜 전체 로직을 완성해보자.

```swift
func twice(_ f: @escaping (Int) -> Int) -> (Int) -> Int {
  { f(f($0)) }
}

func plusThree(_ i: Int) -> Int {
    i + 3
}
```

```swift
let someFunction = twice(plusThree(_:))

print(someFunction(7))  // 13   (7 + 3) + 3
print(someFunction(9))  // 15   (9 + 3) + 3
print(someFunction(12)) // 18   (12 + 3) + 3
```

<br>

__2 ) Function `Expressions`__

위 1과 동일한 로직을 `Expressions` 방식으로 작성해보자.

```swift
let twice = { (f: @escaping (Int) -> Int) in
  { f(f($0)) }
}
```

<br>
상수나 변수의 타입을 미리 지정해 `twice`를 다음과 같이 작성하는 것도 가능하다.

```swift
let twice: (@escaping (Int) -> Int) -> (Int) -> Int = { f in
    { f(f($0)) }
}
```


<br>
마찬가지로 `typealias`를 사용해 다음과 같이 작성할 수 있다.

```swift
typealias intToInt = (Int) -> Int

let twice = { (f: @escaping intToInt) in
    { f(f($0)) }
}
```

```swift
typealias intToInt = (Int) -> Int

let twice: (@escaping intToInt) -> intToInt = { f in
  { f(f($0)) }
}
```

<br>
이제 `plusThree`를 포함해 두 함수를 `chaining` 시켜 전체 로직을 완성해보자.


```swift
let twice: (@escaping (Int) -> Int) -> (Int) -> Int = { f in
  { f(f($0)) }
}

let plusThree: (Int) -> Int = { $0 + 3 }
```
```swift
let someFunction = twice(plusThree)

print(someFunction(7))  // 13   (7 + 3) + 3
print(someFunction(9))  // 15   (9 + 3) + 3
print(someFunction(12)) // 18   (12 + 3) + 3
```

---

### <span style="color: orange">3. Higher-order Functions 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. forEach</span>

- `Collection`의 모든 `elements`를 순환할 뿐 `Return Value`가 없다.
- `continue`, `break` 같은 `Control Transfer Statements`를 사용할 수 없다. 오직 `return`만 사용 가능하다.

`Collection`을 순환하는 고전적인 방법으로 `For-In Loops`가 있다. 

```swift
let numbers: [Int] = [2, 5, 3, 9, 11, 14]

for number in numbers {
    number.isMultiple(of: 2) ? print("\(number) is even") : print("\(number) is odd")
}
```

`forEach`는 `For-In Loops`와 동일한 로직을 수행할 수 있다. 

```swift
numbers.forEach { $0.isMultiple(of: 2) ? print("\($0) is even") : print("\($0) is odd") }
```

```console
2 is even
5 is odd
3 is odd
9 is odd
11 is odd
14 is even
```

<br>

__`forEach`와 `For-In Loops`의 차이점__

- `For-In Loops`는 `body` 내에서 `continue`, `break`와 같은 `Control Transfer Statements`를 
사용할 수 있다.

```swift
let anotherNumbers: [Int?] = [2, 5, nil, 9, 11, nil, 6, nil, 14]

for number in anotherNumbers {
    guard let number = number else {
        print("Found nil")
        continue
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
The double of 9 is 18
The double of 11 is 22
Found nil
The double of 6 is 12
Found nil
The double of 14 is 28
```
<br>

```swift
let anotherNumbers: [Int?] = [2, 5, nil, 9, 11, nil, 6, nil, 14]

for number in anotherNumbers {
    guard let number = number else {
        print("Found nil")
        break
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
```

<br>

- 반면 `forEach`는 `return`만 사용 가능하다.

```swift
anotherNumbers.forEach { number in
    guard let number = number else {
        print("Found nil")
        continue    // 'continue' is only allowed inside a loop
    }
    print("The double of \(number) is \(number * 2)")
}
```

```swift
anotherNumbers.forEach { number in
    guard let number = number else {
        print("Found nil")
        return
    }
    print("The double of \(number) is \(number * 2)")
}
```

```console
The double of 2 is 4
The double of 5 is 10
Found nil
The double of 9 is 18
The double of 11 is 22
Found nil
The double of 6 is 12
Found nil
The double of 14 is 28
```

> `For-In Loops`와 `forEach` 모두 함수의 `Return Value`가 없다.  
> `For-In Loops`와 `forEach`는 비슷하지만, `forEach`는 `loops`가 아니므로 `continue`나 `break`과 같은
> `Control Transfer Statements`를 사용할 수 없다.
> 실제로 `forEach`는 `Collection`을 순환하지만 `forEach`의 `argument`로 전달되는 `trailing closure`의 
> 입장에서는 여러 번 호출될 뿐 `loops`가 아니기 때문이다.  
> 따라서, 현재 호출된 `closure`를 종료하기 위한 `return` 키워드만 허용된다. 또한 여기서 사용되는 `return` 키워드는 
> 현재 호출된 `closure`를 종료하는 것일 뿐 `forEach` 순환 자체를 종료하지 않는다. `forEach`에서 `return`은 
> `For-In Loops`의 `continue`와 같은 역할을 한다.

#### <span style="color: rgba(166, 42, 254, 1)">2. </span>
#### <span style="color: rgba(166, 42, 254, 1)">3. </span>
#### <span style="color: rgba(166, 42, 254, 1)">4. </span>
#### <span style="color: rgba(166, 42, 254, 1)">5. </span>
#### <span style="color: rgba(166, 42, 254, 1)">6. </span>

---

### <span style="color: orange">4. 👩‍💻</span>

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
4. "Non-local variable", Wikipedia, last modified May. 12, 2022, accessed Nov. 07, 2022, [Wikipedia - Non-local Variable](https://en.wikipedia.org/wiki/Non-local_variable)
5. "Higher-Order Functions in Swift", Medium, last modified Jun. 9, 2020, accessed Nov. 07, 2022, [Higher-Order Functions in Swift](https://betterprogramming.pub/higher-order-functions-in-swift-13c31a769c0c)
6. "Understanding Higher Order Functions in Swift", APPCODA, Feb. 26, 2020, accessed Nov. 07, 2022, [Understanding Higher Order Functions in Swift](https://www.appcoda.com/higher-order-functions-swift/)
7. "Higher Order Functions in Swift", Level Up COding, Aug. 12, 2020, accessed Nov. 14, 2022, [Level Up Coding - Higher Order Functions in Swift](https://levelup.gitconnected.com/higher-order-functions-in-swift-35861620ad1)
   