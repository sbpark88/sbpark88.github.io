---
layout: post
title: Swift Collection
subtitle: Collection Types
categories: swift
tags: [swift docs, swift collection, swift array, swift set, swift dictionary]
---

![swift collection types](/assets/images/posts/2022-10-03-collection-types/CollectionTypes_intro_2x.png)
1
`Swift`는 다음 3가지 `primary collection types`를 제공한다.

- Array
- Set
- Dictionary

`Collections`는 data type이 명확히 정의되어 있으므로 실수로 다른 type의 데이터를 넣을 수 없다.

### <span style="color: orange">1. Mutability of Collections (콜렉션의 변경) 👩‍💻</span>
만약 `Collections`를 var(variable)할당한다면, 해당 collections는 변경할 수 있다(mutable).  
하지만 let(constant)에 할당한다면, 해당 collections는 크기와 내용물 모두 불변이다(immutable).

---

### <span style="color: orange">2. Arrays (배열) 👩‍💻</span>
`Array`는 순서가 지정된 random-access collection이다.  
(RandomAccessCollection protocol을 따르는, 즉, random-access를 지원하는 collection이다).

Swift의 `Array` 타입은 `Foundation`의 `NSArray` 클래스와 연결되고, 이를 확장해 Array에서 NSArray 메서드를 사용할 수 있게 해준다.  
따라서, `import Foundation을` 하면 Array를 `캐스팅 하지 않고 NSArray 메서드를 사용`할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Array Type Syntax</span>
다음 두 가지 형태의 `initializer syntax`를 사용할 수 있다.

```swift
 var someArray = Array<Element>()
 var someArray: [Element] = []      // Array Type Shorthand Syntax (배열의 축약형 문법)
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Creating an Empty Array</span>

```swift
var someArray: [Int] = []
```

`Shorthand Syntax`를 이용해 빈 배열을 생성했다.

```swift
someArray.append(5)
someArray.append(9)

print(someArray)    // [5, 9]
```

이제 someArray는 `5`, `9`를 순서대로 저장하고있다.

```swift
someArray = []

print(someArray)    // []
```

Empty Array Literal(`[]`)를 이용해 someArray를 다시 `Empty Array`로 만들더라도 `[Int]` 타입은 변하지 않는다.

#### <span style="color: rgba(166, 42, 254, 1)">3. Creating an Array with a Default Value</span>

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
print(threeDoubles)     // [0.0, 0.0, 0.0]
```

#### <span style="color: rgba(166, 42, 254, 1)">4. Creating an Array by Adding Two Arrays Together</span>
두 개의 배열을 `+` 연산자를 이용해 더해 새 배열을 생성할 수 있다.

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
var sixDoubles = threeDoubles + anotherThreeDoubles

print(sixDoubles)   // [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

#### <span style="color: rgba(166, 42, 254, 1)">5. Creating an Array with an Array Literal</span>

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
```

만약 위와 같이 `Array Literal`이 한 가지 타입으로 구성되었다면, `Swift`는 해당 배열의 타입을 추론한다.

```swift
var shoppingList = ["Eggs", "Milk"]
```

`Array`는 2 가지 이상의 타입을 저장할 수 있다. 하지만 이 경우 `Type Inference`는 사용할 수 없다.  
반드시 `[Any]` 타입임을 명시해줘야한다.

```swift
var anyArray = ["Eggs", 5]  // error occured, add explicit type [Any] annotation
```

```swift
var anyArray: [Any] = ["Eggs", 5]
print(anyArray)     // ["Eggs", 5]
```

#### <span style="color: rgba(166, 42, 254, 1)">6. Accessing and Modifying an Array</span>

__1 ) `append(_:)` 메서드는 배열의 마지막에 새 `element`를 추가한다__

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
shoppingList.append("Flour")
print(shoppingList)     // ["Eggs", "Milk", "Flour"]
```

__2 ) `+` 연산자를 이용해 배열의 마지막에 새 `element`를 추가할 수도 있다__

```swift
var shoppingList = ["Eggs", "Milk", "Flour"]
shoppingList += ["Butter"]
print(shoppingList)     // ["Eggs", "Milk", "Flour", "Butter"]
```

__3 ) `Subscript Syntax`를 이용해 배열의 값에 접근하거나, 수정할 수 있다__

- 값에 접근하기

```swift
var shoppingList = ["Eggs", "Milk", "Flour", "Butter"]
print(shoppingList[0])  // Eggs
```

- 값 수정하기

```swift
var shoppingList = ["Eggs", "Milk", "Flour", "Butter"]
shoppingList[0] = "Organic eggs"
print(shoppingList)     // ["Organic eggs", "Milk", "Flour", "Butter"]

shoppingList[1...3] = ["Organic milk", "Organic flour", "Premium butter"]
print(shoppingList)     // ["Organic eggs", "Organic milk", "Organic flour", "Premium butter"]
```

__4 ) `insert(_:at:)` 메서드는 `element`를 배열의 특정 위치에 삽입한다__

```swift
var shippingList = ["Organic eggs", "Organic milk", "Organic flour", "Premium butter"]
shoppingList.insert("Yeast", at: 2)
print(shoppingList)     // ["Organic eggs", "Organic milk", "Yeast", "Organic flour", "Premium butter"]
```

__5 ) `removeLast()` 메서드는 배열의 마지막 `element`를 제거 후 해당 `element`를 반환한다__

```swift
var shoppingList = ["Organic eggs", "Organic milk", "Yeast", "Organic flour", "Premium butter"]
var removedElement = shoppingList.removeLast()
print(removedElement)   // Premium butter
print(shoppingList)     // ["Organic eggs", "Organic milk", "Yeast", "Organic flour"]
```

__6 ) `remove(at:)` 메서드는 배열의 특정 위치의 `element`를 제거 후 해당 `element`를 반환한다__

```swift
var shoppingList = ["Organic eggs", "Organic milk", "Yeast", "Organic flour"]
var secondElement = shoppingList.remove(at:1)
print(secondElement)    // Organic milk
print(shoppingList)     // ["Organic eggs", "Yeast", "Organic flour"]
```

__7 ) `removeAll()` 메서드 Ehsms `[]`를 이용해 배열을 완전히 비울 수 있다__

```swift
var shoppingList = ["Organic eggs", "Yeast", "Organic flour"]
shoppingList.removeAll()
print(shoppingList)     // []
```

```swift
var shoppingList = ["Organic eggs", "Yeast", "Organic flour"]
shoppingList = []
print(shoppingList)     // []
```

#### <span style="color: rgba(166, 42, 254, 1)">7. Iterating Over an Array</span>

```swift
let fruits = [
    "Apple",
    "Pear",
    "Persimmon",
    "Tangerine",
    "Orange",
    "Mango",
    "Plum",
    "Cherry"
]
```

__1 ) `for-in` 반복문을 이용해 배열의 전체 `elements`에 접근할 수 있다.__

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Apple  Pear  Persimmon  Tangerine  Orange  Mango  Plum  Cherry
```

`sorted(by:)` 메서드를 이용하면 `Array`의 값을 기준으로 정렬 후 접근할 수 있다

```swift
// default, ascending order
for item in fruits.sorted() {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

```swift
// ascending order
for item in fruits.sorted(by: <) {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

```swift
// descending order
for item in fruits.sorted(by: >) {
    print(item, terminator: "  ")
}
```

```console
Tangerine  Plum  Persimmon  Pear  Orange  Mango  Cherry  Apple
```

__2 ) `index`가 필요하다면 `enumerated()` 메서드를 이용해 `tuple`을 변수로 받아 `index`와 `value` 모두에 접근할 수 있다__

```swift
let fruits = [
    "Apple",
    "Pear",
    "Persimmon",
    "Tangerine",
    "Orange",
    "Mango",
    "Plum",
    "Cherry"
]

for (index, value) in fruits.enumerated() {
    print("Item \(index + 1): \(value)")
}
```

```console
Item 1: Apple
Item 2: Pear
Item 3: Persimmon
Item 4: Tangerine
Item 5: Orange
Item 6: Mango
Item 7: Plum
Item 8: Cherry
```

---

### <span style="color: orange">3. Sets (셋) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">4. Dictionary (딕셔너리) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>



---
Reference

1. "Collection Types", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Oct. 3 2022, [Swift Docs Chapter 3 - Collection Types](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)
2. "RandomAccessCollection", Apple Developer Documentation, last modified latest(Unknown), accessed Oct. 3 2022, [Apple Devloper Documentation - Swift/Swift Standard Library/Collections](https://developer.apple.com/documentation/swift/randomaccesscollection)
3. "RandomAccessCollection Implementations", Apple Developer Documentation, last modified latest(Unknown), accessed Oct. 3 2022, [Apple Devloper Documentation - Swift/Array/RandomAccessCollection Implementations](https://developer.apple.com/documentation/swift/array/randomaccesscollection-implementations)
