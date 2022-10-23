---
layout: post
title: Swift Functions
subtitle: Functions, Nested Functions, First-Class Citizens, Higher-Order Functions
categories: swift
tags: [swift docs, swift function, swift nested function, swift first class citizen, swift higher order function]
---

### <span style="color: orange">1. Defining and Calling Functions 👩‍💻</span>

__Syntax__

```swift
func name (parameters) -> return type {
    function body
}
```

- Name: 함수를 `정의할 때` 작성한다. 함수를 정의하고 호출할 때 사용하기 위한 필수 요소다.
- Parameters(Optional): 함수를 `정의할 때` 작성한다. 함수가 실행될 때 입력되어 내부에서 사용할 값들로, 하나 또는 그 이상 정의할 수 있다.
- Return Type(Optional): 함수를 `정의할 때` 작성한다. 함수가 실행을 마치고 종료되며 반환할 값으로, 단 하나의 타입을 정의할 수 있다.
- Arguments(Optional): 함수를 `호출할 때` 작성한다. 함수를 실행하기 위해 함수 외부에서 전달하는 값으로, 반드시 `Parameters`의 `순서 및 타입과 일치`해야한다.

<br>

__1 ) Defining Functions__

```swift
func greet(person: String) -> String {
    "Hello, \(person)!"
}
```

<br>

__2 ) Calling Functions__

```swift
print(greet(person: "Anna"))    // Hello, Anna! 
```

> 함수의 `이름`, `파라미터`, `리턴 타입`은 함수가 무슨 일을 할지, 무엇을 입력 받을지, 무엇을 반환 할지를 설명하는 정보이므로 명확히 작성하도록 한다.

---

### <span style="color: orange">2. Function Parameters and Return Values 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Functions Without Parameters</span>

```swift
func sayHelloWorld() -> String {
    "hello, world"
}

print(sayHelloWorld())  // hello, world
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Functions With Multiple Parameters</span>

```swift
func greet(person: String) -> String {
    "Hello, \(person)!"
}

func greetAgain(person: String) -> String {
    "Hello again, \(person)!"
}
```

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person)
    } else {
        return greet(person: person)
    }
}

print(greet(person: "Tim", alreadyGreeted: false))  // Hello, Tim!
print(greet(person: "Tim", alreadyGreeted: true))   // Hello again, Tim!
```

위 코드 블럭에서 정의한 `func greet(person: String) -> String`와  
아래 코드블럭에서 정의한 `func greet(person: String, alreadyGreeted: Bool) -> String`은 다른 함수다.

> 함수 `name`이 같더라도 `parameters`가 다르면, 다른 함수로 구분된다. 이를 `Polymorphism`(다형성)이라고 한다.  
> 단, 이러한 구분에 `return type`은 영향을 주지 않는다.

#### <span style="color: rgba(166, 42, 254, 1)">3. Functions Without Return Values</span>

`Return Type`이 없을 때는 `Void`를 `Return Type`으로 정의한다.

```swift
func greetVoid(person: String) -> Void {
    print("Hello, \(person)!")
}
```

<br>

`Return Type`은 `Void`일 때 한하여 생략될 수 있다(Optional).

```swift
func greetVoid(person: String) {
    print("Hello, \(person)!")
}

greetVoid(person: "Harry")  // Hello, Harry!
```

> 엄밀히 말하면 `Return Type`을 생략하더라도 함수는 `Void`라는 타입의 특수한 값을 반환한다.  
> 이 값은 `()`로 쓰여진 `Empty Tuple`이다.

<br>

반환 값이 있는 함수를 호출할 때는 반드시 `constant(let keyword)`, `variable(var keyword)` 또는 `arguement`로 받아야 한다.  
그렇게 하지 않으면 `compile-time error`가 발생한다.  
만약, 함수가 값을 반환하는 데 사용할 필요가 없다면 간단히 `_`로 받으면 된다.

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}

print(printWithoutCounting(string: "hello, world"))
```

```console
hello, world
()
```

하지만 Docs의 설명과 달리 `let _ =`로 받지 않고 생략해도 에러가 발생하지 않았다. 이는 좀 더 확인해야 할 것 같다.

#### <span style="color: rgba(166, 42, 254, 1)">4. Functions with Multiple Return Values</span>

`Swift`에서 `tuple`을 이용해 하나의 `compound`로 여러 변수에 값을 할당할 수 있다.

```swift
let (alphabetA, alphabetB) = ("A", "B")
print("alphabetA is \(alphabetA) and alphabetB is \(alphabetB)")
```

```console
alphabetA is A and alphabetB is B
```

<br>

마찬가지로 함수 역시 `tuple`을 이용해 함수의 `Return Type`에 여러 값을 `compound` 시켜 한 번에 
`One compound return value`로 반환할 수 있다. 

```swift
let intArray: [Int] = [31, 6, 43, 13, 6, 1, 56, 5, 88, 24]

func minMax(array: [Int]) -> (Int, Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

<br>

__1 ) `Tuple Type Return Value`를 `tuple`을 이용해 각각 `Int` 타입의 상수 `minNumber`, `maxNumber`로 받는다__

```swift
let (minNumber, maxNumber): (Int, Int) = minMax(array: intArray)
print("min is \(minNumber) and max is \(maxNumber)")
```

```console
min is 1 and max is 88
```

<br>

__2 )`Tuple Type Return Value`를 `tuple` 타입의 단일 상수 `bounds`로 받는다__  
그리고 `tuple`의 각 값에 접근할 수 있도록 `min`과 `max`이라는 `label`을 붙여주었다.

```swift
let bounds: (min: Int, max: Int) = minMax(array: intArray)
print("min is \(bounds.min) and max is \(bounds.max)")
```

```  console
min is 1 and max is 88
```

<br>

__3 ) 만약, <span style="color: red;">`Return Type`에 미리 `label`을 붙여주면</span> 반환 받은 값은 위 `2)`처럼 별도의 `label` 지정 없이 해당 `label`을 이용할 수 있다__

```swift
let intArray: [Int] = [31, 6, 43, 13, 6, 1, 56, 5, 88, 24]

func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

```swift
let bounds = minMax(array: intArray)
print("min is \(bounds.min) and max is \(bounds.max)")
```

```console
min is 1 and max is 88
```

#### <span style="color: rgba(166, 42, 254, 1)">5. Optional Tuple Return Types</span>

함수가 반환하는 전체 `Tuple`이 `nil`일 가능성이 있다면, `(Int, Int)?` 또는 `(String, Int, Bool)?`과 같이 
`?`를 붙여 `Optiional`을 반환하도록 할 수 있다.

> `(Int, Int)?`는 `Optional Tuple Type`이고  
> `(Int?, Int?)`는 `Optional Int Type`을 포함하는 `Tuple Type`이다.
> 
> `Optional Tuple Type`을 사용하면 전체 `Tuple` 뿐 아니라 `Tuple` 내의 개별 값도 자동으로 `Optional Type`이 된다.

```swift
let intArray: [Int] = [31, 6, 43, 13, 6, 1, 56, 5, 88, 24]

func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

```swift
if let bounds = minMax(array: []) {
    print("min is \(bounds.min) and max is \(bounds.max)")
} else {
    print("input array is empty.")
}

if let bounds = minMax(array: intArray) {
    print("min is \(bounds.min) and max is \(bounds.max)")
} else {
    print("input array is empty.")
}
```

```console
input array is empty.
min is 1 and max is 88
```

#### <span style="color: rgba(166, 42, 254, 1)">6. Function With an Implicit Return</span>

함수의 전체 본문이 단일 표현식인 경우 함수는 암시적으로 해당 표현식을 반환한다.

```swift
func add(_ num1: Int, _ num2: Int) -> Int {
    num1 + num2
}

print(add(6, 8))    // 14
```

---

### <span style="color: orange">3. Function Argument Labels and Parameter Names 👩‍💻</span>

`Swift` 함수는 `argument label`과 `parameter name`을 갖는다. `argument label`은 함수를 호출할 때 
사용되고, `parameter name`은 함수가 실행될 때 내부에서 사용된다.  

__Syntax__

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

만약, `argument label`을 생략하면 기본적으로 `paramter name`을 `argument label`로 사용하게 된다.

| __argument label__                       | __parameter name__               |
|------------------------------------------|----------------------------------|
| Optional                                 | Essential                        |
| Used to call a function                  | Used when a function is executed |
| Non-Unique(Duplicate labels are allowed) | Unique                           |

> `argument label`은 `non-unique`이므로 동일한 이름을 사용할 수 있으나 코드를 읽기 쉽도록 적절한 이름을 사용하는 것이 좋다. 

#### <span style="color: rgba(166, 42, 254, 1)">1. Specifying Argument Labels</span>

`argument`를 `default`값인 `parameter name`과 동일하게 사용하지 않고 다른 이름을 사용하려면 `parameter name` 앞에 
`argument label`을 작성한다.

```swift
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)!  Glad you could visit from \(hometown)."
}

print(greet(person: "Bill", from: "Cupertino"))
```

```console
Hello Bill!  Glad you could visit from Cupertino.
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Omitting Argument Labels</span>

`argument label` 굳이 필요 없어 생략하길 원한다면 `arguemnt label`에 `_`을 사용한다. 

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}

someFunction(1, secondParameterName: 2)
```

---

### <span style="color: orange">4. Special Function Parameters 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Default Parameter Values</span>

`parameter`의 `default value`를 설정하면 호출할 때 생략할 수 있다. 우선 `TypeScript`의 동작을 보자.

```typescript
const add = (num1: number, num2: number = 10): number => +num1 + +num2

console.log(add(5, 20))         // 25
console.log(add(5))             // 15
console.log(add(5, undefined))  // 15
console.log(add(5, NaN))        // NaN
```

<br>

`Swift`에서의 동작은 다음과 같다.

```swift
func add(a num1: Int, b num2: Int = 10) -> Int {
    num1 + num2
}

print(add(a: 5, b: 20))     // 25
print(add(a: 5))            // 15
```

<br>

하지만 nil을 받을 수 없기 때문에 위 함수는 아예 호출될 때 num2 `argument` 없이 호출된 경우에 대해서만 
`default value`가 작동할 뿐 다음과 같은 경우는 에러가 발생된다.

```swift
print(add(a: 5, b: nil))    // 'nil' is not compatible with expected argument type 'Int'
```

<br>

즉, 위 `TypeScript`에서 `undefined`가 넘어 오는 경우까지 고려하려면 `parameter`가 `Optional`을 허용하게 
해준 다음 `nil`의 경우 `default parameter value`가 작동하지 않기 때문에 내부에서 다시 한 번 
`if` 또는 `guard`를 이용해 `default value`를 `handling` 해줘야 한다.

```swift
func add(a num1: Int, b num2: Int? = 10) -> Int {
    guard let num2 = num2 else { return num1 + 10 } // 'default parameter value'가 작동하지 않는 것에 대한 보정
    return num1 + num2
}

print(add(a: 5, b: 20))     // 25
print(add(a: 5))            // 15

print(add(a: 5, b: nil))    // 15
```

<br>

> <span style="color: red;">또한, `default parameter value`를 사용할 때 주의할 것은 
> `Polymorphism`(다형성)에 의해 우선순위 상 `default parameter value`는 무시될 수 있다는 것이다.</span>

```swift
func add(a num1: Int) -> Int {
    num1 + 100
}

func add(a num1: Int, b num2: Int = 10) -> Int {
    num1 + num2
}

print(add(a: 5, b: 20))     // 25
print(add(a: 5))            // 105
```

`Polymorphism`(다형성)에 의해 `func add(a num1: Int) -> Int`의 호출이 우선시 되기 때문에 
`func add(a num1: Int, b num2: Int = 10) -> Int`의 `default value`를 이용한 호출은 작동하지 않는다.

#### <span style="color: rgba(166, 42, 254, 1)">2.Variadic Parameters</span>


- Variadic Parameters

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

print(arithmeticMean(2))                    // 2.0
print(arithmeticMean(1, 2, 3, 4, 5))        // 3.0
print(arithmeticMean(3, 8.25, 18.75))       // 10.0
```

<br>
 
- Array Parameter

```swift
func arithmeticMean(_ numbers: [Double]) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}

print(arithmeticMean([2]))                  // 2.0
print(arithmeticMean([1, 2, 3, 4, 5]))      // 3.0
print(arithmeticMean([3, 8.25, 18.75]))     // 10.0
```

> `Variadic Parameters`와 `Array Parameter`의 내부 동작은 `[Double]`로 같지만,  
> `Variadic Parameters`는 `Double` n개를 `arguments`로 받고,  
> `Array Parameter`는 `[Double]` 1개를 `argument`로 받는다는 것이 다르다.

<br>

`Swift`에서 `Variadic Parameters`는 `TypeScript`에서 `Spread Operator`를 이용해 다음과 같이 구현되는 것과 같다.

```typescript
const arithmeticMean = (...numbers: number[]): number => {
    let total: number = 0
    for (const num of numbers) {
        // @ts-ignore
        total += Number(num)    // total = Number(+total + +num)
    }
    return Number(total) / numbers.length
}

console.log(arithmeticMean(2))                  // 2
console.log(arithmeticMean(1, 2, 3, 4, 5))      // 3
console.log(arithmeticMean(3, 8.25, 18.75))     // 10
```

#### <span style="color: rgba(166, 42, 254, 1)">3. In-Out Parameters</span>

함수의 `parameters`는 기본적으로 `constants`(상수)이므로 수정할 수 없다.

만약, `parameters`를 수정하고, 함수가 종료된 후에도, 즉, 함수 `scope` 밖에서도 이 값을 유지하고 싶다면 
`parameter type` 앞에 `inout` 키워드를 사용해 `In-Out Parameters`로 만들 수 있다.

`In-Out Parameters`는 `variables`(변수)만 `arguments`로 받을 수 있다. `constants`나 `literals`는 
수정이 불가하므로 입력 받을 수 없다.

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)

print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
```

```console
someInt is now 107, and anotherInt is now 3
```

<br>

> `In-Out Parameters`를 정리하면 다음과 같다.
> - `In-Out Parameters`는 `parameter type` 앞에 `inout` 키워드를 사용해 만든다.
> - `In-Out Parameters`를 사용한 함수를 호출할 때 `arguments` 앞에 `&` 키워드를 붙여 호출한다.
> 
> 작동 순서는 다음과 같다.
> 1. 함수가 호출될 때 `arguments`의 값이 복사된다.
> 2. 함수의 `body`에서 값이 수정된다.
> 3. 함수가 종료될 때 위 값이 함수 `scope` 밖의 `original arguments`에 할당된다.

---



### <span style="color: orange">5. Function Types 👩‍💻</span>


#### <span style="color: rgba(166, 42, 254, 1)">1. </span>

__Syntax__

```swift
```



#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---



### <span style="color: orange">6. Nested Functions 👩‍💻</span>


#### <span style="color: rgba(166, 42, 254, 1)">1. </span>

__Syntax__

```swift
```



#### <span style="color: rgba(166, 42, 254, 1)">2. </span>

---





<br><br>

---
Reference

1. "Functions", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Oct. 17, 2022, [Swift Docs Chapter 5 - Functions](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#)
2. "First-class function", Wikipedia, last modified July 14, 2022, accessed Oct. 19, 2022, [Wikipeida - First Class Function](https://en.wikipedia.org/wiki/First-class_function)
3. "Higher-order function", Wikipedia, last modified Sep. 8, 2022, accessed Oct. 19, 2022, [Wikipeida - Higher Order Function](https://en.wikipedia.org/wiki/Higher-order_function)
