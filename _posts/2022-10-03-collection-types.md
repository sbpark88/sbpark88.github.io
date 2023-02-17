---
layout: post
title: Swift Collection Types
subtitle: Collections - Arrays, Sets, Dictionaries
categories: swift
tags: [swift docs, collection, array, set, dictionary, array literal, subscript syntax, hashable, initializer syntax, shorthand syntax, unique]
---

![swift collection types](/assets/images/posts/2022-10-03-collection-types/CollectionTypes_intro_2x.png)

Swift 는 다음 3가지 `primary collection types`를 제공한다.

- Array
- Set
- Dictionary

`Collections`는 data type 이 명확히 정의되어 있으므로 실수로 다른 type 의 데이터를 넣을 수 없다.

### 1. Mutability of Collections (콜렉션의 변경) 👩‍💻

만약 `Collections`를 var(variable)할당한다면, 해당 collections 는 변경할 수 있다(mutable).  
하지만 let(constant)에 할당한다면, 해당 collections 는 크기와 내용물 모두 불변이다(immutable).

---

### 2. Arrays (배열) 👩‍💻

`Array`는 순서가 지정된 random-access collection 이다.  
(RandomAccessCollection protocol 을 따르는, 즉, random-access 를 지원하는 collection 이다).

Swift 의 Array 타입은 `Foundation`의 `NSArray` 클래스와 연결되고, 이를 확장해 Array 에서 NSArray 메서드를 사용할 수 있게 해준다.  
따라서, `import Foundation`을 하면 Array 를 `캐스팅 하지 않고 NSArray 메서드를 사용`할 수 있다.

#### 1. Array Type Syntax

다음 두 가지 형태의 `initializer syntax`를 사용할 수 있다.

```swift
 var someArray = Array<Element>()
 var someArray = [Int]()            // Array Type Shorthand Syntax (배열의 축약형 문법)
 var someArray: [Element] = []      // Array Type Shorthand Syntax (배열의 축약형 문법)
```

#### 2. Creating an Empty Array

```swift
var someArray: [Int] = []
```

`Shorthand Syntax`를 이용해 빈 배열을 생성했다.

<br>

```swift
someArray.append(5)
someArray.append(9)

print(someArray)    // [5, 9]
```

이제 someArray 는 `5`, `9`를 순서대로 저장하고있다.

<br>

```swift
someArray = []

print(someArray)    // []
```

Empty Array Literal(`[]`)를 이용해 someArray 를 다시 `Empty Array`로 만들더라도 `[Int]` 타입은 변하지 않는다.

#### 3. Creating an Array with a Default Value

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
print(threeDoubles)     // [0.0, 0.0, 0.0]
```

#### 4. Creating an Array by Adding Two Arrays Together

두 개의 배열을 `+` 연산자를 이용해 더해 새 배열을 생성할 수 있다.

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
var sixDoubles = threeDoubles + anotherThreeDoubles

print(sixDoubles)   // [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

#### 5. Creating an Array with an Array Literal

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
```

만약 위와 같이 `Array Literal`이 한 가지 타입으로 구성되었다면, Swift 는 해당 배열의 타입을 추론한다.

```swift
var shoppingList = ["Eggs", "Milk"]
```

`Array`는 _2 가지 이상의 타입을 저장_ 할 수 있다. 하지만 이 경우 `Type Inference`는 사용할 수 없다.  
반드시 `[Any]` 타입임을 명시해줘야한다.

```swift
var anyArray = ["Eggs", 5]  // error occured, add explicit type [Any] annotation
```

```swift
var anyArray: [Any] = ["Eggs", 5]
print(anyArray)     // ["Eggs", 5]
```

#### 6. Accessing and Modifying an Array

__1 ) `append(_:)` 메서드는 배열의 마지막에 새 `element`를 추가한다__

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
shoppingList.append("Flour")
print(shoppingList)     // ["Eggs", "Milk", "Flour"]
```

<br>

__2 ) `+` 연산자를 이용해 배열의 마지막에 새 `element`를 추가할 수도 있다__

```swift
var shoppingList = ["Eggs", "Milk", "Flour"]
shoppingList += ["Butter"]
print(shoppingList)     // ["Eggs", "Milk", "Flour", "Butter"]
```

<br>

__3 ) `Subscript Syntax`를 이용해 배열의 값에 접근하거나, 수정할 수 있다__

- 값에 접근하기

```swift
var shoppingList = ["Eggs", "Milk", "Flour", "Butter"]
print(shoppingList[0])  // Eggs
```

<br>

- 값 수정하기

```swift
var shoppingList = ["Eggs", "Milk", "Flour", "Butter"]
shoppingList[0] = "Organic eggs"
print(shoppingList)     // ["Organic eggs", "Milk", "Flour", "Butter"]

shoppingList[1...3] = ["Organic milk", "Organic flour", "Premium butter"]
print(shoppingList)     // ["Organic eggs", "Organic milk", "Organic flour", "Premium butter"]
```

<br>

__4 ) `insert(_:at:)` 메서드는 `element`를 배열의 특정 위치에 삽입한다__

```swift
var shippingList = ["Organic eggs", "Organic milk", "Organic flour", "Premium butter"]
shoppingList.insert("Yeast", at: 2)
print(shoppingList)     // ["Organic eggs", "Organic milk", "Yeast", "Organic flour", "Premium butter"]
```

<br>

__5 ) `removeLast()` 메서드는 배열의 마지막 `element`를 제거 후 해당 `element`를 반환한다__

```swift
var shoppingList = ["Organic eggs", "Organic milk", "Yeast", "Organic flour", "Premium butter"]
var removedElement = shoppingList.removeLast()
print(removedElement)   // Premium butter
print(shoppingList)     // ["Organic eggs", "Organic milk", "Yeast", "Organic flour"]
```

<br>

__6 ) `remove(at:)` 메서드는 배열의 특정 위치의 `element`를 제거 후 해당 `element`를 반환한다__

```swift
var shoppingList = ["Organic eggs", "Organic milk", "Yeast", "Organic flour"]
var secondElement = shoppingList.remove(at:1)
print(secondElement)    // Organic milk
print(shoppingList)     // ["Organic eggs", "Yeast", "Organic flour"]
```

<br>

__7 ) `removeAll()` 메서드 또는 `[]`를 이용해 배열을 완전히 비울 수 있다__

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

#### 7. Iterating Over an Array

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

<br>

__1 ) `for-in` 반복문을 이용해 배열의 전체 elements 에 접근할 수 있다__

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Apple  Pear  Persimmon  Tangerine  Orange  Mango  Plum  Cherry
```

<br>

__2 )`sorted(by:)` 메서드를 이용하면 배열의 값을 기준으로 정렬 후 접근할 수 있다__

```swift
// default, ascending order
for item in fruits.sorted() {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
// ascending order
for item in fruits.sorted(by: <) {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
// descending order
for item in fruits.sorted(by: >) {
    print(item, terminator: "  ")
}
```

```console
Tangerine  Plum  Persimmon  Pear  Orange  Mango  Cherry  Apple
```

<br>

__3 ) `index`가 필요하다면 `enumerated()` 메서드를 이용해 `tuple`을 상수로 받아 `index`와 `value` 모두에 접근할 수 있다__

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

### 3. Sets (셋) 👩‍💻

`Set`은 unique 한 elements 를 저장하는 collection 이다.  

Swift 의 Set 타입은 `Foundation`의 `NSSet` 클래스와 연결되고, 이를 확장해 Set 에서 NSSet 메서드를 사용할 수 있게 해준다.  
따라서, `import Foundation`을 하면 Set 을 `캐스팅 하지 않고 NSSet 메서드를 사용`할 수 있다.

#### 1. Hash Values for Set Types

Set 타입은 `Hashable` 프로토콜을 준수해야한다.  
또한 `Hash Value`는 `Int` 값으로 두 `object`가 완전히 동일하면 `Hash Value` 역시 동일하며 `a == b`가 성립된다.

#### 2. Set Type Syntax

다음 두 가지 형태의 `initializer syntax`를 사용할 수 있다.

```swift
var newSet = Set<Element>()
var newSet: Set<Element> = [elements...]  // Do not use to create Empty Set.
```
> 아래서 다시 설명하겠지만 `Set`은 `Shorthand Syntax`의 사용이 불가능하다. 

#### 3. Creating an Empty Set

```swift
var letters = Set<Character>()
```

Set 은 `Empty Set` 생성시 `Shorthand Syntax`를 사용할 수 없다 (__Array 의 Shorthand Syntax 와 구분이 불가능하다__)

```swift
letters.insert("c")
letters.insert("d")
```

이제 letters 는 "c", "d"를 순서대로 저장하고있다.

```swift
letters = []
```

이후 Empty Array Literal(`[]`)를 이용해 비우더라도 `Set<Character>` 타입은 변하지 않는다.

#### 4. Creating a Set with an Array Literal

`Shorthand Syntax`는 사용할 수 없지만 `Array Literal`을 이용해 `Set`을 생성할 수 있다.

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
```

<br>

`Set` 역시 Array literal 을 이용해 초기 데이터가 주어지는 경우 `Type Inference`를 사용할 수 있다.  
단, <span style="color: red; font-weight: 900;">Array 와의 구분을 위해 `Set`이라는 것은 명시</span>해야한다.

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
```

<br>

<span style="color: red; font-weight: 900;">Array 와 달리 _서로 다른 Type 의 데이터는 담을 수 없다_.</span>

```swift
var anySet: Set<Any> = ["ABC", 5, "DEF"]  // type 'Any' does not conform to protocol 'Hashable'
```

#### 5. Accessing and Modifying a Set

__1 ) `insert(_:)` 메서드는 Set 에 새 `element를 중복 없이` 추가한다__

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
favoriteGenres.insert("Jazz")
print(favoriteGenres)   // ["Hip hop", "Classical", "Rock", "Jazz"]

favoriteGenres.insert("Jazz")
print(favoriteGenres)   // ["Hip hop", "Classical", "Rock", "Jazz"]
```

위 예제에서 `"Jazz"`를 두 번 추가했지만, Set 은 `unique`하기 때문에 여전히 4개의 element 만 갖는다.

<br>

__2 ) `remove(_:)` 메서드는 동일한 `element`를 제거 후 해당 `element`의 `Optional`을 반환한다 (동일한 `element`가 없을 경우 `nil`을 반환)__

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop", "Jazz"]
var removedElement = favoriteGenres.remove("Hip hop")
print(removedElement as Any)    // Optional("Hip hop")
print(favoriteGenres)           // ["Classical", "Jazz", "Rock"]
```

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop", "Jazz"]
var returnNil = favoriteGenres.remove("Funk")
print(returnNil as Any)         // nil
```

<br>

__3 ) `removeAll()` 메서드 또는 Empty Array Literal `[]`를 이용해 `Set`을 완전히 비울 수 있다__

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop", "Jazz"]
favoriteGenres.removeAll()
print(favoriteGenres)   // []
```

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop", "Jazz"]
favoriteGenres = []
print(favoriteGenres)   // []
```

#### 6. Iterating Over a Set

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

<br>

__1 ) `for-in` 반복문을 이용해 Set 의 전체 elements 에 접근할 수 있다__

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Orange  Persimmon  Mango  Apple  Tangerine  Pear  Cherry  Plum
```

<br>

Set 을 _생성할 때 입력한 Array Literal 과는 순서가 다르다_. Set 은 _순서가 없는 `Collection`_ 이기 때문이다.  
하지만 _이미 생성된 `Instance`는 다시 접근해도 동일한 순서_ 를 갖는다.

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Orange  Persimmon  Mango  Apple  Tangerine  Pear  Cherry  Plum
```

<br>

반면, 동일한 코드로 생성한 했지만 `fruits2`는 `fruits`와 접근시 순서가 다르다. 서로 다른 `Instance`이기 때문이다.

```swift
let fruits2: Set = [
    "Apple",
    "Pear",
    "Persimmon",
    "Tangerine",
    "Orange",
    "Mango",
    "Plum",
    "Cherry"
]

for item in fruits2 {
    print(item, terminator: "  ")
}
```

```console
Tangerine  Plum  Persimmon  Apple  Cherry  Pear  Orange  Mango
```

> Set 은 순서가 없기 때문에 Instance 가 생성될 때마다 순서가 변경된다.  
> 하지만, 이미 생성한 Instance 를 `for-in` 반복문으로 접근할 때는 다시 접근해도 동일한 순서를 갖는다.  
> 즉, Instance 가 생성될 때 순서가 랜덤한 것이지 이미 생성된 Instance 에서 접근할 때 순서가 랜덤한 것은 아니다.

<br>

__2 ) Set 은 `Unordered Collection`이다. 따라서 특정 순서대로 정렬되길 원한다면 배열과 마찬가지로 `sorted()` 메서드를 이용한다__

```swift
// default, ascending order
for item in fruits.sorted() {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
// ascending order
for item in fruits.sorted(by: <) {
    print(item, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
// descending order
for item in fruits.sorted(by: >) {
    print(item, terminator: "  ")
}
```

```console
Tangerine  Plum  Persimmon  Pear  Orange  Mango  Cherry  Apple
```

<br>

__3 ) 배열과 마찬가지로 `index`가 필요하다면 `enumerated()` 메서드를 이용해 `tuple`을 상수로 받아 `index`와 `value` 모두에 접근할 수 있다__  
__단, 배열과 다른 점은 매번 접근 순서가 달라지므로 일정한 순서를 원한다면 정렬과 함께 사용해야한다__

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

for (index, value) in fruits.sorted().enumerated() {
    print("Item \(index + 1): \(value)")
}
```

```console
Item 1: Apple
Item 2: Cherry
Item 3: Mango
Item 4: Orange
Item 5: Pear
Item 6: Persimmon
Item 7: Plum
Item 8: Tangerine
```

#### 7. Performing Set Operations

두 Set 컬렉션 사이에 다음과 같은 수학적 연산을 수행할 수 있다.

![Set Venn Diagram](/assets/images/posts/2022-10-03-collection-types/setVennDiagram_2x.png)

__Fundamental Set Operations__
- intersection (교집합)
- symmetric difference (대칭차집합)
- union (합집합)
- difference of sets (차집합)

<br>

```swift
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]
```

<br>

__1 )intersection (교집합)__

교집합은 `intersection(_:)` 메서드를 사용한다.

```swift
let intersection = oddDigits.intersection(evenDigits).sorted()
print(intersection)         // []
```

<br>

__2 ) symmetric difference (대칭차집합)__

대칭차집합은 `symmetricDifference(_:)` 메서드를 사용한다.

```swift
let symmetricDifference = oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
print(symmetricDifference)  // [1, 2, 9]
```

<br>

__3 ) union (합집합)__

합집합은 `union(_:)` 메서드를 사용한다.

```swift
let union = oddDigits.union(evenDigits).sorted()
print(union)                // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

__4 ) difference of sets (차집합)__

차집합은 `subtracting(_:)` 메서드를 사용한다.

```swift
let differenceOfSets = oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
print(differenceOfSets)     // [1, 9]
```

#### 8. Set Membership and Equality

두 Set 간의 관계를 표현할 수 있다.

- _Set a_ is a `superset of` _Set b_ (_Set a_ 는 _Set b_ 의 상위집합이다).
- _Set b_ is a `subset of` _Set a_ (_Set b_는 _Set a_ 의 부분집합이다).
- _Set b_ and _Set c_ are `disjoint` with one another (_Set b_ 와 _Set c_ 는 서로소 집합관계다).

<br>

```swift
let houseAnimals: Set = ["🐶", "🐱"]
let farmAnimals: Set = ["🐮", "🐔", "🐑", "🐶", "🐱"]
let cityAnimals: Set = ["🐦", "🐭"]
```

<br>

__1 ) Equality (상동)__

상동은 `==` (equal operator)를 사용한다.

```swift
print(houseAnimals == houseAnimals)   // true
```

<br>

__2 ) Superset (상위 집합)__

Superset 은 `isSuperset(of:)` 메서드를 사용한다.

```swift
print(farmAnimals.isSuperset(of: houseAnimals))         // true
print(farmAnimals.isSuperset(of: cityAnimals))          // false
```

Superset 을 판단하는 또 다른 메서드 `isStrictSuperset(of:)`가 있다.

```swift
print(farmAnimals.isStrictSuperset(of: houseAnimals))   // true
print(farmAnimals.isStrictSuperset(of: cityAnimals))    // false
```

<br>

위 두 결과를 보면 `isSuperset(of:)` 메서드와 `isStrictSuperset(of:)` 메서드는 동일해보인다.  
하지만 다음 결과를 보면 차이점을 알 수 있다.

```swift
print(farmAnimals.isSuperset(of: farmAnimals))          // true
print(farmAnimals.isStrictSuperset(of: farmAnimals))    // false
```

> `isSuperset(of:)` 메서드는 두 Set 이 동일한 경우에도 `Superset` 관계를 인정한다.  
> `isStrictSuperset(of:)` 메서드는 두 Set 이 동일한 경우 `Superset` 관계를 인정하지 않는다.

<br>

__3 ) Subset (부분 집합)__

Subset 은 `isSubset(of:)` 메서드를 사용한다.

```swift
print(houseAnimals.isSubset(of: farmAnimals))           // true
print(cityAnimals.isSubset(of: farmAnimals))            // false
```

Subset 을 판단하는 또 다른 메서드 `isStrictSubset(of:)`가 있다.

```swift
print(houseAnimals.isStrictSubset(of: farmAnimals))     // true
print(cityAnimals.isStrictSubset(of: farmAnimals))      // false
```

<br>

마찬가지로 `isStrictSubset(of:)`은 좀 더 엄격하게 `Subset` 여부를 검사한다.

```swift
print(farmAnimals.isSubset(of: farmAnimals))            // true
print(farmAnimals.isStrictSubset(of: farmAnimals))      // false
```

> `isSubset(of:)` 메서드는 두 Set 이 동일한 경우에도 `Subset` 관계를 인정한다.  
> `isStrictSubset(of:)` 메서드는 두 Set 이 동일한 경우 `Subset` 관계를 인정하지 않는다.

<br>

__4 ) Disjoint Sets (서로소 집합)__

Disjoint 관계(서로소 집합)은 `isDisjoint(with:)` 메서드를 사용한다.

```swift
print(houseAnimals.isDisjoint(with: cityAnimals))       // true
print(houseAnimals.isDisjoint(with: farmAnimals))       // false
```

---

### 4. Dictionary (딕셔너리) 👩‍💻

`Dictionary`는 `Key: Value` 쌍을 elements 로 저장하는 collection 이다.    
이때 key 는 Set 과 마찬가지로 unique 하다.

Swift 의 Dictionary 타입은 `Foundation`의 `NSDictionary` 클래스와 연결되고, 이를 확장해 Dictionary 에서 NSDictionary 메서드를 사용할 수 있게 해준다.    
따라서, `import Foundation`을 하면 Dictionary 을 `캐스팅 하지 않고 NSDictionary 메서드를 사용`할 수 있다.

#### 1. Hash Values for Dictionary Keys

Dictionary 타입의 `Key`는 Set 타입의 Value 처럼 `Hashable` 프로토콜을 준수해야한다.    
따라서, Dictionary 는 동일한 `Value`는 가질 수 있지만 _동일한 `Key`는 가질 수 없다_.

#### 2. Dictionary Type Syntax

다음 두 가지 형태의 `initializer syntax`를 사용할 수 있다.

```swift
var someDictionary = Dictionary<Key, Value>()
var someDictionary = [Key: Value]()         // Dictionary Type Shorthand Syntax (딕셔너리의 축약형 문법)
var someDictionary: [Key: Value] = [:]      // Dictionary Type Shorthand Syntax (딕셔너리의 축약형 문법)
```

#### 3. Creating an Empty Dictionary

```swift
var someDictionary: [Int: Strint] = [:]
```

`Shorthand Syntax`를 이용해 빈 Dictionary 를 생성했다.

<br>

```swift
someDictionary[1] = "Apple"
someDictionary[2] = "Google"

print(someDictionary)       // [1: "Apple", 2: "Google"] or [2: "Google", 1: "Apple"] because `Dictionary` is an unordered collection.
```

이제 someDictionary 는 `1: "Apple"`, `2: "Google"`를 순서 없이 저장하고있다.

<br>

```swift
someDictionary = [:]

print(someDictionary)               // [:]
print(type(of: someDictionary))     // Dictionary<Int, String>
```

Empty Dictionary Literal(`[:]`)를 이용해 someDictionary 를 다시 `Empty Dictionary`로 만들더라도 `[Int: String]` 타입은 변하지 않는다.

#### 4. Creating a Dictionary with a Dictionary Literal

```swift
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

print(airports)     // ["DUB": "Dublin", "YYZ": "Toronto Pearson"]
```

만약 위와 같이 `Dictionary Literal`의 `Key: Value` 쌍이 한 가지 타입으로 구성되었다면, Swift 는 해당 딕셔너리의 타입을 추론한다.

<br>

```swift
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

print(airports)     // ["DUB": "Dublin", "YYZ": "Toronto Pearson"]
```

Dictionary 는 `Value`에 _2 가지 이상의 타입을 저장_ 할 수 있다. 하지만 이 경우 Type Inference 는 사용할 수 없다.
반드시 `[Key: Any]` _타입을 명시_ 해줘야한다.  

또한 `Any`가 허용되는 것은 `Value`만이다. `Key`는 저장하려는 두 Key 가 모두 Hashable 하더라도 
`explicit type annotation`으로 선언하기 위해서는 `Any`로 선언해야하는데, 이 `Any`는 `Non-Hashable`이기 때문이이다.  
이는 Set 이 Any 타입으로 선언될 수 없는 것과 같다. 즉, `[String: Any]`는 _가능_ 하지만 `[Any: String]`은 _불가능_ 하다.

```swift
var airports = ["YYZ": "Toronto Pearson", "ZIP-CODE": 6301] // error occured, add explicit type [String: Any] annotation

var airports: [Any: String]                                 // error: type 'Any' does not conform to protocol 'Hashable'

var airports: [String: Any] // This type is allowed.
```

```swift
var airports: [String: Any] = ["YYZ": "Toronto Pearson", "ZIP-CODE": 6301]
print(airports)     // ["ZIP-CODE": 6301, "YYZ": "Toronto Pearson"]
```

#### 5. Accessing and Modifying a Dictionary

__1 ) `Subscript Syntax`를 이용해 딕셔너리의 값에 접근하거나 추가, 수정, 삭제할 수 있다__

Array 는 Subscript Syntax 를 이용해 값을 추가하려고 하면 `Fatal error: Index out of range`가 발생해 `접근`과 `수정`만 가능하지만, 
Dictionary 는 `Subscript Syntax`를 이용해 값에 `접근`, `수정`하는것은 물론, `추가`도 할 수 있다.

- 값에 접근하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
print(shoppingList["Eggs"] as Any)      // Optional(4500)
print(shoppingList["Eggs"] ?? 0)        // 4500
```

Array 는 `Ordered Collection`으로 배열의 크기를 통해 접근 가능한 `Index`를 모두 정확히 알 수 있다.  
즉, Array 는 값에 정확히 접근이 가능하기 때문에 Optional 이 아닌 _정확한 값을 반환_ 한다.

하지만 Dictionary 는 `Unordered Collection`으로 _크기는 알 수 있지만 접근 가능한 `Key`를 정확히 알 수 없다_.  
따라서 Key 가 존재할 경우 <span style="color: red;">Optional(Value)</span>를 반환하고, 
없을 경우 <span style="color: red;">nil</span>을 반환한다.

- 값 수정하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList["Milk"] = 4000
print(shoppingList["Milk"] as Any)     // Optional(4000)
```

Subscript Syntax 로 주어진 Key 가 딕셔너리 내에 존재할 경우 값을 업데이트한다.

- 값 추가하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList["Flour"] = 3600
print(shoppingList)     // ["Flour": 3600, "Eggs": 4500, "Milk": 3200]
```

Subscript Syntax 로 주어진 Key 가 딕셔너리 내에 존재하지 않을 경우 딕셔너리에 추가한다.

- 값 삭제하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList["Milk"] = nil
print(shoppingList)     // ["Eggs": 4500]
```

Subscript Syntax 로 주어진 Key 가 딕셔너리 내에 존재할 때 `nil`을 `Value`로 주입하면 딕셔너리에서 
<span style="color: red;">제거</span>된다.

<br>

__2 ) `updateValue(_:forKey:)` 메서드를 이용해 딕셔너리를 `수정`, `추가`할 수 있다__

Subscript Syntax 를 이용한 방법과 다른 점은 `updateValue(_:forKey:)` 메서드는 `수정`, `추가`하면서 
<span style="color: red;">Optional(Old Value)</span> 또는 <span style="color: red;">nil</span>을 
반환한다는 것이다. 따라서 값이 실제로 업데이트 되었는지를 확인할 수 있다.

- 값 수정하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList.updateValue(4000, forKey: "Milk")
print(shoppingList["Milk"] as Any)      // Optional(4000)
```

<br>

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]

if let oldValue = shoppingList.updateValue(4000, forKey: "Milk") {
    print("The old value for Milk was \(oldValue).")
    print("The current value for Milk is \(shoppingList["Milk"]!).")
}
```

```console
The old value for Milk was 3200.
The current value for Milk is 4000.
```

> `updateValue(_:forKey:)` 메서드는 `conditional binding`을 사용할 수 있다.

<br>

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]

if let oldValue = shoppingList["Milk"] = 4000 {   // error: initializer for conditional binding must have Optional type, not '()'
    print("The old value for Milk was \(oldValue).")
    print("The current value for Milk is \(shoppingList["Milk"]!).")
}
```

> Subscript Syntax 는 아무 값도 반환하지 않기 때문에 `conditional binding`을 사용할 수 없다.

<br>

- 값 추가하기

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList.updateValue(3600, forKey: "Flour")
print(shoppingList)     // ["Milk": 3200, "Flour": 3600, "Eggs": 4500]
```

<br>

위에서 Subscript Syntax 로 값을 추가한 것과 다른 점은 `updateValue(_:forKey:)` 메서드는 
<span style="color: red;">nil</span>을 반환한다는 것이다
(만약 이미 존재한다면 추가가 아닌 수정으로 동작하고 _Optional(Old Value)_ 를 반환).

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]

if let oldValue = shoppingList.updateValue(3600, forKey: "Flour") {
    print("The old value for Flour was \(oldValue).")
    print("The current value for Flour is \(shoppingList["Flour"]!).")
} else {
    // cannot use oldValue because of else-clause
    print("The flour was not exist.")
    print("The current value for Flour is \(shoppingList["Flour"]!).")
}
```

```console
The flour was not exist.
The current value for Flour is 3600.
```

nil 을 반환했기 때문에 else-clause 로 넘어갔다.  

<br>

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
let oldValue = shoppingList.updateValue(3600, forKey: "Flour")
print(oldValue as Any)      // nil
print(shoppingList)         // ["Milk": 3200, "Eggs": 4500, "Flour": 3600]
```

> 위 예제를 실행하면 nil 이 반환된 것을 확인할 수 있다.

<br>

__3 ) `removeValue(forKey:)` 메서드를 이용해 딕셔너리를 `제거`할 수 있다__

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList.removeValue(forKey: "Milk")
print(shoppingList)     // ["Eggs": 4500]
```

<br>

마찬가지로 위에서 Subscript Syntax 로 값을 제거한 것과 다른 점은 `removeValue(forKey:)` 메서드는 <span style="color: red;">Optional(Old Value)</span>을 반환한다는 것이다.

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]

if let oldValue = shoppingList.removeValue(forKey: "Milk") {
    print("The removed shopping list milk price was \(oldValue).")
    print("The milk is not exist any more.")
}
```

```console
The removed shopping list milk price was 3200.
The milk is not exist any more.
```


<br>

__4 ) `removeAll(forKey:)` 메서드 또는 `[:]`을 이용해 딕셔너리를 완전히 비울 수 있다__

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList.removeAll()
print(shoppingList)     // [:]
```

```swift
var shoppingList: [String: Int] = ["Eggs": 4500, "Milk": 3200]
shoppingList = [:]
print(shoppingList)     // [:]
```

#### 6. Iterating Over a Dictionary

```swift
let fruits = [
    "Apple": 4200,
    "Pear": 6800,
    "Persimmon": 3400,
    "Tangerine": 2800,
    "Orange": 4300,
    "Mango": 5100,
    "Plum": 7100,
    "Cherry": 8500
]
```

<br>

__1 ) `for-in` 반복문을 이용해 Dictionary 의 전체 elements 에 접근할 수 있다__

```swift
for element in fruits {
    print(element)
}
```

```console
(key: "Persimmon", value: 3400)
(key: "Tangerine", value: 2800)
(key: "Orange", value: 4300)
(key: "Apple", value: 4200)
(key: "Pear", value: 6800)
(key: "Plum", value: 7100)
(key: "Cherry", value: 8500)
(key: "Mango", value: 5100)
```

Dictionary 는 Iterator 의 element 를 상수로 받아 위와 같이 `Key: Value` 쌍을 하나의 element 로 접근하게된다.  

<br>

따라서 각각의 `Key`와 `Value`에 접근하고 싶다면 다음과 같이 접근할 수 있다.

```swift
for element in fruits {
    print("\(element.key)'s price is \(element.value)won.")
}
```

```console
Persimmon's price is 3400won.
Plum's price is 7100won.
Mango's price is 5100won.
Cherry's price is 8500won.
Tangerine's price is 2800won.
Apple's price is 4200won.
Pear's price is 6800won.
Orange's price is 4300won.
```

<br>

하지만 `Key`, `Value`라고 쓰는 것은 가독성 측명에서 좋지 않다.   
다음과 같이 element 를 `tuple`로 받는 방법을 사용하면 가독성도 높이고 더욱 쉽게 접근이 가능하다.

```swift
for (goods, price) in fruits {
    print("\(goods)'s price is \(price)won.")
}
```

```console
Tangerine's price is 2800won.
Orange's price is 4300won.
Apple's price is 4200won.
Plum's price is 7100won.
Persimmon's price is 3400won.
Mango's price is 5100won.
Cherry's price is 8500won.
Pear's price is 6800won.
```

<br>

__2 ) Key 또는 Value 둘 중 하나만 필요할 경우 다음과 같이 접근 가능하다__

```swift
for goods in fruits.keys {
    print(goods, terminator: "  ")
}
```

```console
Plum  Pear  Cherry  Persimmon  Apple  Orange  Tangerine  Mango
```

<br>

```swift
for price in fruits.values {
    print(price, terminator: "  ")
}
```

```console
5100  4200  4300  6800  8500  3400  2800  7100
```

<br>

__3 ) Dictionary 는 `Unordered Collection`이다. 따라서 특정 순서대로 정렬되길 원한다면 배열과 마찬가지로 `sorted()` 메서드를 이용한다__

```swift
// default, ascending order
for goods in fruits.keys.sorted() {
    print(goods, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
// ascending order
for goods in fruits.keys.sorted(by: <) {
    print(goods, terminator: "  ")
}
```

```console
Apple  Cherry  Mango  Orange  Pear  Persimmon  Plum  Tangerine
```

<br>

```swift
for goods in fruits.keys.sorted(by: >) {
    print(goods, terminator: "  ")
}
```

```console
Tangerine  Plum  Persimmon  Pear  Orange  Mango  Cherry  Apple
```

<br>

__4 ) `sorted(by:)`에 `closure`를 사용하면 `tuple`로 받는 상수 역시 손쉽게 정렬된 순서로 받을 수 있다__

```swift
// ascending order by keys
for (goods, price) in fruits.sorted(by: {$0.0 < $1.0}) {
    print("\(goods)'s price is \(price)won.")
}
```

```console
Apple's price is 4200won.
Cherry's price is 8500won.
Mango's price is 5100won.
Orange's price is 4300won.
Pear's price is 6800won.
Persimmon's price is 3400won.
Plum's price is 7100won.
Tangerine's price is 2800won.
```

<br>

```swift
// descending order by values
for (goods, price) in fruits.sorted(by: {$0.1 > $1.1}) {
    print("\(goods)'s price is \(price)won.")
}
```

```console
Cherry's price is 8500won.
Plum's price is 7100won.
Pear's price is 6800won.
Mango's price is 5100won.
Orange's price is 4300won.
Apple's price is 4200won.
Persimmon's price is 3400won.
Tangerine's price is 2800won.
```

<br><br>

---
Reference

1. "Collection Types." The Swift Programming Language Swift 5.7. accessed Oct. 3, 2022, [Swift Docs Chapter 3 - Collection Types](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html).
2. "RandomAccessCollection." Apple Developer Documentation. accessed Oct. 3, 2022, [Apple Developer Documentation - Swift/Swift Standard Library/Collections](https://developer.apple.com/documentation/swift/randomaccesscollection).
3. "RandomAccessCollection Implementations." Apple Developer Documentation. accessed Oct. 3, 2022, [Apple Developer Documentation - Swift/Array/RandomAccessCollection Implementations](https://developer.apple.com/documentation/swift/array/randomaccesscollection-implementations).
