---
layout: post
title: Swift Subscripts
subtitle: Subscripts
categories: swift
tags: [swift docs, swift subscript, type subscript]
---

### 1. Subscripts 👩‍💻

`Classes`, `Structures`, `Enumerations`는 이것들이 가지고 있는 `Collection`, `List`, `Sequence`와 같은 
`member elements`에 접근하기 위한 단축키인 `Subscripts`를 정의할 수 있다.

하나의 `Type`에 여러 개의 `Subscripts`를 정의할 수 있으며, `Subscripts`에 전달하는 `index`의 `Type`에 따라 
`overload` 처리 한다. 또한 `Subscripts`는 단일 차원으로 제한되지 않고 `Custom Type`에 맞춰 여러 개의 파라미터로 
`Subscripts`를 정의할 수 있다.

#### 1. Subscript Syntax

__Syntax__

```swift
subscript(index: Int) -> Int {
    get {
        // Return an appropriate subscript value here.
    }
    set(newValue) {
        // Perform a suitable setting action here.
    }
}
```

> `Computed Properties`와 마찬가지로 `getter`와 `optional setter`를 제공하며, `setter`의 `Parameter`를 
> 생략하고 기본값으로 `newValue`를 사용할 수 있다.   
> 또한 `Computed Properties`와 마찬가지로 `setter`의 `Parameter`는 반드시 `Return Type`과 동일해야하므로 
> 별도의 `Type`을 명시할 수 없으며, `Read-Only Computed Properties`와 마찬가지로 `Read-Only Subscripts`는 
> `get` 키워드와 중괄호를 생략할 수 있다.

<br>

다음은 정수의 `n-times-table`을 표시하기 위한 `TimesTable Structure`를 정의한 `Read-Only Subsscripts`의 
구현이다.

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        multiplier * index
    }
}
```

```swift
let threeTimesTable = TimesTable(multiplier: 3)
(0...10).forEach { print(threeTimesTable[$0], terminator: "  ") }
```

```console
0  3  6  9  12  15  18  21  24  27  30  
```

#### 2. Subscript Usage

`Subscripts`는 구현하려는 `Classes`, `Structures`, `Enumerations`에 적합한 형태로 자유롭게 구현이 가능하다.   
따라서, `Subscripts`의 정확한 의미는 `context`에 따라 달라진다. 일반적으로 `Subscripts`는 `Collection`, `List`, 
`Sequence`의 `member elements`에 접근하기 위한 용도로 사용된다.

- Subscripts in Dictionary

`Subscripts`를 이용해 값을 조회하기

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
print("The number of legs of ant is \(numberOfLegs["ant"]!).")
// The number of legs of ant is 6.
```

`Subscripts`를 이용해 값을 저장하기

```swift
numberOfLegs["bird"] = 2
print(numberOfLegs)  // ["spider": 8, "ant": 6, "cat": 4, "bird": 2]
```

> `Dictionary`의 `key-value`는 모든 `keys`가 `values`를 갖지 않는 것을 모델로 하기 때문에 
> `Optional Return Type`을 취해 `Optional Subscripts`를 사용한다.

#### 3. Subscript Options

> `Subscripts`는 `Parameters`의 타입이나 개수, `Return Type`을 자유롭게 정의할 수 있다.  
> 심지어 함수와 마찬가지로 `Variadic Parameters`와 `Default Parameter Values` 역시 가능하다.
> 
> 단, `In-Out Parameters`는 사용할 수 없다.

<br>

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
```

- grid : 왼쪽 상단에서 시작해 오른쪽 하단으로 진행되는 행렬의 평면화 버전.
- indexIsValid : `row`와 `column`이 유효 범위인지를 평가.
- subscript get : 값의 유효성 검사를 위해 `assertion`을 포함. `grid`의 값을 찾아 반환.
- subscript set : 값의 유효성 검사를 위해 `assertion`을 포함. `grid`에 값을 저장.

<br>

```swift
var matrix = Matrix(rows: 2, columns: 2)
print(matrix)   // Matrix(rows: 2, columns: 2, grid: [0.0, 0.0, 0.0, 0.0])
```

생성된 `grid`를 시각화 하면 아래와 같다.

![SubscriptMatrix01](/assets/images/posts/2022-11-28-subscripts/subscriptMatrix01_2x.png)

<br>

`Subscripts`를 이용해 값을 저장해보자.

```swift
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```

![SubscriptMatrix02](/assets/images/posts/2022-11-28-subscripts/subscriptMatrix02_2x.png)


유효하지 않은 값을 저장하려 할 경우 `assertion`에 의해 아래와 같이 에러가 발생된다.

```swift
matrix[2, 0] = 3.2  // __lldb_expr_13/1. Subscripts.xcplaygroundpage:45: Assertion failed: Index out of range
```

<br>

이제 위에서 저장한 데이터를 `Subscripts`를 이용해 조회해보자.

```swift
print(matrix[1, 0]) // 3.2
```



---

### 2. Type Subscripts


<br><br>

---
Reference

1. "Subscripts", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 28, 2022, [Swift Docs Chapter 11 - Subscripts](https://docs.swift.org/swift-book/LanguageGuide/Subscripts.html)