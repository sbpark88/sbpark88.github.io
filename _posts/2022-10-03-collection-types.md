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
따라서, `import Foundation`을 하면 Array를 `캐스팅 하지 않고 NSArray 메서드를 사용`할 수 있다.

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

__2 )`sorted(by:)` 메서드를 이용하면 `Array`의 값을 기준으로 정렬 후 접근할 수 있다__

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

__3 ) `index`가 필요하다면 `enumerated()` 메서드를 이용해 `tuple`을 변수로 받아 `index`와 `value` 모두에 접근할 수 있다__

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
`Set`은 unique한 elements를 저장하는 collection이다.  

Swift의 `Set` 타입은 `Foundation`의 `NSSet` 클래스와 연결되고, 이를 확장해 Set에서 NSSet 메서드를 사용할 수 있게 해준다.  
따라서, `import Foundation`을 하면 Set을 `캐스팅 하지 않고 NSSet 메서드를 사용`할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Hash Values for Set Types</span>
`Set` 타입은 `Hashable` 프로토콜을 준수해야한다.  
또한 `Hash Value`는 `Int` 값으로 두 `object`가 완전히 동일하면 `Hash Value` 역시 동일하며 `a == b`가 성립된다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Set Type syntax</span>
다음 두 가지 형태의 `initializer syntax`를 사용할 수 있다.

```swift
var newSet = Set<Element>()
var newSet: Set<Element> = [elements...]  // Do not use to create Empty Set.
```
> 아래서 다시 설명하겠지만 `Set`은 `Shorthand Syntax`의 사용이 불가능하다. 

#### <span style="color: rgba(166, 42, 254, 1)">3. Creating an Empty Set</span>

```swift
var letters = Set<Character>()
```

Set은 `Empty Set` 생성시 `Shorthand Syntax`를 사용할 수 없다 (__Array의 Shorthand Syntax와 구분이 불가능하다__)

```swift
letters.insert("c")
letters.insert("d")
```

이제 letters는 "c", "d"를 순서대로 저장하고있다.

```swift
letters = []
```

이후 Empty Array Literal(`[]`)를 이용해 비우더라도 `Set<Character>` 타입은 변하지 않는다.

#### <span style="color: rgba(166, 42, 254, 1)">4. Creating a Set with an Array Literal</span>
`Shorthand Syntax`는 사용할 수 없지만 `Array Literal`을 이용해 `Set`을 생성할 수 있다.

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
```

`Set` 역시 Array iteral을 이용해 초기 데이터가 주어지는 경우 `Type Inference`를 사용할 수 있다.  
단, <span style="color: red; font-weight: 900;">Array와의 구분을 위해 `Set`이라는 것은 명시</span>해야한다.

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
```

```swift
var shoppingList = ["Eggs", "Milk"]
```

<span style="color: red; font-weight: 900;">Array와 달리 서로 다른 Type의 데이터는 담을 수 없다.</span>

```swift
var anySet: Set<Any> = ["ABC", 5, "DEF"]  // type 'Any' does not conform to protocol 'Hashable'
```

#### <span style="color: rgba(166, 42, 254, 1)">5. Accessing and Modifying a Set</span>

__1 ) `insert(_:)` 메서드는 Set에 새 `element`를 중복 없이 추가한다__

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
favoriteGenres.insert("Jazz")
print(favoriteGenres)   // ["Hip hop", "Classical", "Rock", "Jazz"]

favoriteGenres.insert("Jazz")
print(favoriteGenres)   // ["Hip hop", "Classical", "Rock", "Jazz"]
```

위 예제에서 `"Jazz"`를 두 번 추가했지만, `Set`은 `unique`하기 때문에 여전히 4개의 element만 갖는다.

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

#### <span style="color: rgba(166, 42, 254, 1)">6. Iterating Over a Set</span>

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

__1 ) `for-in` 반복문을 이용해 `Set`의 전체 `elements`에 접근할 수 있다.__

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Orange  Persimmon  Mango  Apple  Tangerine  Pear  Cherry  Plum
```

`Set`을 생성할 때 입력한 `Array Literal`과는 순서가 다르다. `Set`은 순서가 없는 `Collection`이기 때문이다.  
하지만 이미 생성된 `Instance`는 다시 접근해도 동일한 순서를 갖는다.

```swift
for item in fruits {
    print(item, terminator: "  ")
}
```

```console
Orange  Persimmon  Mango  Apple  Tangerine  Pear  Cherry  Plum
```

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

> `Set`은 순서가 없기 때문에 `Instance`가 생성될 때마다 순서가 변경된다.  
> 하지만, 이미 생성한 `Instance`를 `for-in` 반복문으로 접근할 때는 다시 접근해도 동일한 순서를 갖는다.  
> 즉, `Instance`가 생성될 때 순서가 랜덤한 것이지 이미 생성된 `Instance`에서 접근할 때 순서가 랜덤한 것은 아니다.

__2 ) `Set`은 `Unordered Collection`이다. 따라서 특정 순서대로 정렬되길 원한다면 배열과 마찬가지로 `sorted()` 메서드를 이용한다.__

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

__3 ) 배열과 마찬가지로 `index`가 필요하다면 `enumerated()` 메서드를 이용해 `tuple`을 변수로 받아 `index`와 `value` 모두에 접근할 수 있다__  
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

#### <span style="color: rgba(166, 42, 254, 1)">7. Performimg Set Operations</span>
두 `Set` 컬렉션 사이에 다음과 같은 수학적 연산을 수행할 수 있다.

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

#### <span style="color: rgba(166, 42, 254, 1)">8. Set Membership and Equality</span>
두 `Set`간의 관계를 표현할 수 있다.

- Set a is a superset of Set b (Set a는 Set b의 상위집합이다)
- Set b is a subset of Set a (Set b는 Set a의 부분집합이다)
- Set b and Set c are disjoint with one another (Set b와 Set c는 서로소 집합관계다)

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
Superset은 `isSuperset(of:)` 메서드를 사용한다.

```swift
print(farmAnimals.isSuperset(of: houseAnimals))         // true
print(farmAnimals.isSuperset(of: cityAnimals))          // false
```

Superset을 판단하는 또 다른 메서드 `isStrictSuperset(of:)`가 있다.

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

> `isSuperset(of:)` 메서드는 두 `Set`이 동일한 경우에도 `Superset` 관계를 인정한다.  
> `isStrictSuperset(of:)` 메서드는 두 `Set`이 동일한 경우 `Superset` 관계를 인정하지 않는다.

<br>

__3 ) Subset (부분 집합)__
Subset은 `isSubset(of:)` 메서드를 사용한다.

```swift
print(houseAnimals.isSubset(of: farmAnimals))           // true
print(cityAnimals.isSubset(of: farmAnimals))            // false
```

Subset을 판단하는 또 다른 메서드 `isStrictSubset(of:)`가 있다.

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

> `isSubset(of:)` 메서드는 두 `Set`이 동일한 경우에도 `Subset` 관계를 인정한다.  
> `isStrictSubset(of:)` 메서드는 두 `Set`이 동일한 경우 `Subset` 관계를 인정하지 않는다.

<br>

__4 ) Disjoint Sets (서로소 집합)__
Disjoint 관계(서로소 집합)은 `isDisjoint(with:)` 메서드를 사용한다.

```swift
print(houseAnimals.isDisjoint(with: cityAnimals))       // true
print(houseAnimals.isDisjoint(with: farmAnimals))       // fasle
```

---

### <span style="color: orange">4. Dictionary (딕셔너리) 👩‍💻</span>
`Dictionary`는 key-value 쌍을 elements로 저장하는 collection이다.    
이 때 key는 Set과 마찬가지로 unique하다.

Swift의 `Dictionary` 타입은 `Foundation`의 `NSDictionary` 클래스와 연결되고, 이를 확장해 Dictionary에서 NSDictionary 메서드를 사용할 수 있게 해준다.    
따라서, `import Foundation`을 하면 Dictionary을 `캐스팅 하지 않고 NSDictionary 메서드를 사용`할 수 있다.

#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>



---
Reference

1. "Collection Types", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Oct. 3 2022, [Swift Docs Chapter 3 - Collection Types](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)
2. "RandomAccessCollection", Apple Developer Documentation, last modified latest(Unknown), accessed Oct. 3 2022, [Apple Devloper Documentation - Swift/Swift Standard Library/Collections](https://developer.apple.com/documentation/swift/randomaccesscollection)
3. "RandomAccessCollection Implementations", Apple Developer Documentation, last modified latest(Unknown), accessed Oct. 3 2022, [Apple Devloper Documentation - Swift/Array/RandomAccessCollection Implementations](https://developer.apple.com/documentation/swift/array/randomaccesscollection-implementations)
