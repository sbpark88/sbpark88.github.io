---
layout: post
title: Swift Structures and Classes
subtitle: Choosing Between Structures and Classes
categories: swift
tags: [swift docs, structure, class, value type, reference type]
---

### 1. Comparing Structures and Classes 👩‍💻

일반적으로 프로그래밍 언어에서 `Class` 하나에 파일 하나가 필요하다. 하지만 Swift 는 파일 하나에 여러 개의 `Class`와
`Structure`를 정의할 수 있으며, 외부 인터페이스는 다른 `Class`나 `Structure`가 사용할 수 있도록 자동으로 제공된다.

이는 전통적으로 프로그래밍 언어에서 `Class`의 `instance`는 `Object`인 반면, Swift 의 `Structures`와
`Classes`는 다른 언어와 비교해 `Functionality`에 가깝다.

#### 1. Structure 와 Class 의 공통점

- Define `properties` : 값을 저장
- Define `methods` : 기능을 제공
- Define `subscripts` : `Subscript Syntax`를 이용해 값에 접근
- Define `initializers` : 초기 상태를 설정
- Be `extended` : 기본 구현 이상으로 확장
- Conform to `protocols` : 특정 종류의 표준 기능을 제공

#### 2. Class 만 갖고 있는 추가적인 기능

- `inheritance` : 다른 `Class`의 특성을 상속
  (`Structure`와 `Protocol`은 다른 `Protocol`을 `adopt` 하는 것만 가능하다.)
- `Runtime` 때 `class instance`의 타입을 해석(interpret)하고, type casting 이 가능
- `deinitializers` : `class instance`에 할당된 자원을 해제
- `Reference counting` : `class instance`에 참조를 허용
  (`Structure`는 `Value Types`로 항상 `Copy`되므로, `Reference counting`을 사용하지 않는다.)

> `Class`가 제공하는 추가 기능은 복잡성을 증가시킨다.
> 따라서 `general guideline`에 따르면, `Class`를 사용하는 것이 꼭 필요하거나 더 적합한 경우가 아니면
> 일반적으로 추론하기 쉬운 `Structure`를 선호해야한다고 말한다. 이는 우리가 만드는 대부분의 `Custom Data Types`는
> `Structure`나 `Enumeration`이 되어야 함을 의미한다.

#### 3. Structure 와 Class 무엇을 선택할까?

이에 대해 애플은 아래 글을 통해 다음과 같이 이야기한다.

[Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)

1. 기본적으로 `Structure`를 써라
2. Objective-C와 상호 운용이 필요하면 `Class`를 써라
3. 앱 전체에서 데이터의 `identity`를 제어해야한다면 `Class`를 써라
4. 공유 `implementation(구현체)`를 적용하기 위해 `Structure`와 `Protocol`을 써라

<br>
위 3, 4번에 대해 좀 더 자세히 설명해보자.

__3 ) 앱 전체에서 데이터의 `identity`를 제어해야한다면 `Class`를 써라__

두 개의 서로 다른 `class instance`는 서로 같은 `properties`를 갖고, 저장된 값 역시 동일하더라도
`identity operator(==)`(동일 메모리 주소를 가졌는가?)에 의해 서로 다른 것을 확인할 수 있다.

즉, `class instance`를 앱 내에서 공유하면, `instance`의 변경 사항이 해당 `instance`를 참조하는 모든 곳에
공유됨을 의미한다. 이런 `identity`가 필요한 예는 다음과 같다.

- `file handles`
- `network connections`
- `CBCenterManager`와 같은 `shared hardware intermediaries`

> 예를 들어 로컬 데이터베이스 연결을 다루는 코드는 앱 전역에서 데이터베이스를 완전히 제어해야한다. 다라서 이 경우 `Class`를
> 사용하는 것이 적합하다. 단, *__앱에서 `shared database object`에 접근할 수 있는 영역은 제한__*해야한다.
>
> `Class`를 사용하는 것은 앱 내에서 `identity`를 광범위하게 공유한다는 것을 의미하며, 이는 논리 오류가 발생할 가능성을
> 높인다. 따라서 `identity`를 제어할 필요가 없다면 `Structure`를 사용하는 것이 적합하다.

<br>

__4 ) 공유 `implementation(구현체)`를 적용하기 위해 `Structure`와 `Protocol`을 써라__

> `Class`는 `Class Inheritance`와 `Adopt Protocol`을 지원한다.
> `Structure`와 `Protocol`은 `Adopt Protocol`만 지원한다.

그러나 `Structure`와 `Protocol`만으로도 충분히 `Class Inheritance`와 같은
`inheritance hierachies`(상속 계층)의 구현이 가능하다.

처음부터 `inheritance` 관계를 구축하는 경우 `Protocol`을 사용하는 것이 좋다.
`Class`를 상속할 수 있는 것은 `Class`로 제한되지만,
`Protocol`은 `Class` 뿐 아니라 `Structure`, `Protocol`까지 모두에게  상속을 허용하기 때문에
모델링이 훨씬 더 유연해진다.

---

### 2. Definition of Structures and Classes 👩‍💻

#### 1. Definition Syntax

```swift
struct SomeStructure {
    // structure definition goes here
}
class SomeClass {
    // class definition goes here
}
```

- `Structure`는 앞에 `struct` 키워드를 붙여 정의한다.
- `Class`는 앞에 `class` 키워드를 붙여 정의한다.

새 `Structure`나 `Class`를 정의할 때마다 새 `Swift Type`를 정의하는 것이다. `Enumeration`과 마찬가지로
Swift 의 다른 `Types`와 마찬가지로 이름은 `대문자로 시작`한다.

반면 `Properties`와 `Methods`는 `Type Names`와 구분을 위해 `소문자로 시작`한다.

#### 2. Structure and Class Instances

Swift 에 `Resolution`과 `VideoMode`라는 새 `Types`를 만들어낸다.

```swift
struct Resolution {
    var width = 0
    var height = 0
}
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name: String?
}
```

<br>

__Syntax for Creating instance__

```swift
let someResolution = Resolution()
let someVideoMode = VideoMode()
```

`Structure`와 `Class` 둘 다 `new instnace`를 생성하기 위해 `initializer`를 사용하며 `Syntax`는 유사하다.

#### 3. Accessing Properties

__1 ) Get Properties__

`instance`의 `properties`에 접근하는 가장 쉬운 방법은 `dot Syntax`를 사용하는 것이다.
`instance` 이름 뒤에 `.`을 붙이고, 그 뒤에 `property` 이름을 적는다.

```swift
print("The width of someResolution is \(someResolution.width)")
// Prints "The width of someResolution is 0"
```

<br>
`dot Syntax`를 이용해 `subproperties`로 `drill down`해 내려가는 것도 가능하다.
다음은 `VideoMode instance`의 `resolution property`에 접근해 `subproperty` `width property`로
`drill down`해 내려간다.

```swift
// drill down into subproperties
print("The width of someVideoMode is \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is 0"
```

<br>

__2 ) Set Properties__

`dot Sytax`를 이용해 `properties`에 접근하는 것은 물론, `variable property`의 값을 할당할 수 있다.

```swift
someVideoMode.resolution.width = 1280
print("The width of someVideoMode is now \(someVideoMode.resolution.width)")
// Prints "The width of someVideoMode is now 1280"
```

<br>

```swift
someResolution.width = 1600 // Cannot assign to property: 'someResolution' is a 'let' constant
```

하지만 `Structure`의 경우 `Properties`를 `var`로 선언했음에도 값을 할당하려 할 때 에러가 발생한다.

> 이는, `Class`는 `Reference Type`으로 `instance`를 `let`으로 선언했다 하더라도 변경하려는 실제 `Value`에
> 해당하는 `Properties`는 `var`로 선언되어 `mutable`한 반면, `Structure`는 `Value Type`으로 그 자체가
> `immutable`하기 때문이다.

따라서 `Structure`의 경우 `Properties`를 수정하려면 `instance` 역시 `var`로 선언해야한다.

```swift
var anotherResolution = Resolution()
anotherResolution.width = 1600
print("The width of anotherResolution is now \(anotherResolution.width)")
// Prints "The width of anotherResolution is now 1600"
```

#### 4. Memberwise Initializers for Structure Types

```swift
let resolutionTypeA = Resolution(width: 5120, height: 2880)
print(resolutionTypeA)  // Resolution(width: 5120, height: 2880)

let resolutionTypeB = Resolution(width: 2560)
print(resolutionTypeB)  // Resolution(width: 2560, height: 0)

let resolutionTypeC = Resolution(height: 1440)
print(resolutionTypeC)  // Resolution(width: 0, height: 1440)
```

`Structures`는 `Classes`와 달리 `Mmeberwise Initializers`를 추가로 가질 수 있으며 자동 생성되는 조건은 다음과 같다.

- 존재하는 `Initializers`가 하나도 없다

`Default Initializers`와 달리 `default value`를 가지고 있어야 할 필요가 없다. 단지 이 `default value`의
존재 유무에 따라 모든 `Member Properties`를 설정하기 위해 자동 생성되는 `Initializers`의 경우의 수만 달라질 뿐이다.

---

### 3. Structures and Enumerations Are Value Types 👩‍💻

#### 1. Characteristics of Value Types

> `Value Type`은 `Variable` 또는 `Constant`에 할당될 때, 그리고 함수에 전달될 때 전체가 `copy`된다.
> 
> Swift 의 모든 기본 타입들, `integers`, `floating-point Numbers`, `Booleans`, `strings`,
> `arrays`, `dictionaries`는 모두 `Value Types`으로 `Structures`로 구현되어있다.

> `Standard Library`에 의해 정의된 `Array`, `Dictionary` 그리고 `String`과 같은 `Collections` 역시 
> `Structures`로 구현되어 있으므로 `Value Types`다.
>
> 하지만 다른 `Value Types`와 다르게 `performance cost of copying`을 줄이기 위해 `optimiaztion`을 사용한다.
> 따라서, `Value Types`가 즉시 `copy`를 하는 것과 다르게 `copy`가 발생되기 전에는 `Reference Types`처럼
> `original instance`와 `copies`가 메모리를 공유한다.
>
> 이후 `copies` 중 하나에 수정이 발생하면, 수정이 되기 직전에 `copy`가 이루어진다.
> 즉, `copy` 발생 이전에는 `Reference Types`처럼 작동하고, `copy` 발생 진적에 `Value Types`처럼 작동하는데
> 이런 행위로 인해 코드상으로는 항상 즉시 `copy`가 이뤄지는 것처럼 보인다.

[Standard Library - Array][Standard Library - Array]

[Standard Library - Array]:https://developer.apple.com/documentation/swift/array

> 반면, `Foundation`에 의해 정의된 `NSArray`, `NSDictionary` 그리고 `NSString`과 같은 
> `Classes Bridged to Swift Standard Library Value Types`는 `Classes`로 구현되어 있으므로 
> `Reference Types`다.

[Foundation - NSArray][Foundation - NSArray], [Classes Bridged to Swift Standard Library Value Types][Classes Bridged to Swift Standard Library Value Types]

[Foundation - NSArray]:https://developer.apple.com/documentation/foundation/nsarray
[Classes Bridged to Swift Standard Library Value Types]:https://developer.apple.com/documentation/foundation/object_runtime/classes_bridged_to_swift_standard_library_value_types

#### 2. Structures

```swift
let hd = Resolution(width: 1920, height: 1080)
var cinema = hd
```

상수 `hd` structure 를 만들고, 이를 `cinema` 변수에 복사했다.

<br>

```swift
cinema.width = 2048
```

이제 `cinema`의 `width`는 '2048'이다.

<br>

```swift
print("cinema is now \(cinema.width) pixel wide")
// Prints "cinema is now 2048 pixels wide"

print("hd is still \(hd.width) pixel wide")
// Prints "hd is still 1920 pixels wide"
```

`cinema`의 `width`는 '2048'로 변경되었으나, `hd`의 `width`는 여전히 '1920'이다.

![sharedStateStruct](/assets/images/posts/2022-11-21-structures-and-classes/sharedStateStruct_2x.png)

#### 3. Enumerations

```swift
enum CompassPoint {
    case north, south, east, west
    mutating func turnNorth() {
        self = .north
    }
}

var currentDirection = CompassPoint.west
let rememberedDirection = currentDirection
```

변수 `currentDirection` enumeration 을 만들고, 이를 `rememberedDirection` 변수에 복사했다.

<br>

```swift
//currentDirection = .north
currentDirection.turnNorth()
```

이제 `currentDirection`는 'north' 다.

<br>

```swift
print("The current direction is \(currentDirection)")
// Prints "The current direction is north"

print("The remembered direction is \(rememberedDirection)")
// Prints "The remembered direction is west"
```

`currentDirection`는 'north' 로 변경되었으나, `rememberedDirection`는 여전히 'west' 다.

---

### 4. Classes Are Reference Types 👩‍💻

#### 1. Characteristics of Reference Types

> `Reference Type`은 `Variable` 또는 `Constant`에 할당될 때, 그리고 함수에 전달될 `copy`되지 않는다.  
> `copy` 대신 동일 `instance`를 `참조(reference)`한다. 

#### 2. Classes

```swift
let tenEighty = VideoMode()
tenEighty.resolution = hd
tenEighty.interlaced = true
tenEighty.name = "1080i"
tenEighty.frameRate = 25.0
```

위 과정을 설명하면 다음과 같은 같다.

1. `let tenEighty`를 통해 `tenEighty`라는 새 `constant`를 선언한다.
2. `tenEighty = VideoMode()`를 통해 `tenEighty`에 `VideoMode Class`의 새 `instance`를 참조시킨다.
3. `tenEighty`의 `members`에 각각 값을 할당한다. 

<br>

```swift
let alsoTenEighty = tenEighty
```

새 `constnat` `alsoTenEighty`에 `alsoTenEighty`를 할당했다.

<br>

```swift
alsoTenEighty.frameRate = 30.0
```

`alsoTenEighty`의 `frameRate`를 '30.0'으로 수정했다.

<br>

```swift
print("The frameRate property of alsoTenEighty is now \(alsoTenEighty.frameRate)")
print("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
```

```console
The frameRate property of alsoTenEighty is now 30.0
The frameRate property of tenEighty is now 30.0
```

`alsoTenEighty`를 수정했는데 `tenEighty`도 같이 바뀐 값을 출력한다!  
`Classes`는 `Reference Types`이기 때문이다.

![sharedStateClass](/assets/images/posts/2022-11-21-structures-and-classes/sharedStateClass_2x.png)

<br>

따라서, `tenEighty`, `alsoTenEighty`를 직접 출력해보면 `class`의 `members`의 `values`를 출력하는 것이 
아니라 다음과 같이 참조하는 대상을 출력한다.
> `tenEighty`, `alsoTenEighty`를 `let`으로 선언했는데도 수정이 가능한 이유 역시, `tenEighty`, 
> `alsoTenEighty`가 `constnat`인 것일 뿐, 이것이 참조하는 `instance`가 갖고 있는 `memebr frameRate`는 
> `var`로 변수로 선언되었기 때문이다. 

```swift
print(tenEighty)        // __lldb_expr_11.VideoMode
print(alsoTenEighty)    // __lldb_expr_11.VideoMode
```

#### 3. Identity Operators

기존에 알고 있던 `equal to`, `not equal to` Operators 는 다음과 같다.

```swift
// Equal to(==)
print(5 == 5)       // true
print(5 == 7)       // false

// Not equal to(!=)
print(5 != 7)       // true
```

<br>

`Reference Types`를 위한 `Identity Operators`는 `==`, `!=`가 아닌 `===`, `!==`를 사용한다.

```swift
print(tenEighty === alsoTenEighty)  // true
print(tenEighty !== alsoTenEighty)  // false

if tenEighty === alsoTenEighty {
  print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
}
// Prints "tenEighty and alsoTenEighty refer to the same VideoMode instance."
```

`tenEighty`와 `alsoTenEighty`는 `VideoMode Class`의 동일한 `instance`를 참조하고 있음을 알 수 있다. 

<br>

```swift
let numA = 5
let numB = numA
print(numA === numB)  // error: argument type 'Int' is not a reference types
```

`===` 또는 `!==` operators 는 `Reference Types`를 위한 `Identity Operators`로, `Value Types`를 
비교하려고 하면 에러가 발생한다.

#### 4. Pointers

`C`, `C++`, `Objective-C` 같은 언어는 메모리 주소를 참조하기 위해 `pointer`를 사용한다.  
이것은 Swift 에서 `Reference Types`의 `instance`를 참조하기 위해 `constant` 또는 `variable`이 참조하는 방식과 
같다. 다만, `C` 언어에서의 `pointer`와 달리 메모리 주소를 가리키는 `direct pointer`가 아니며, `reference`를 
만들기 위해 `asterisk(*)`를 필요로 하지 않는다.

Swift 에서 `references`는 다른 `constants` 또는 `variables`를 정의하듯 사용하면 된다.

만약, `pointer`를 직접적으로 다뤄야 하는 경우를 위해 `Standard Library`는 `pointer types`와 `buffer types`를 
제공한다. [Manual Memory Management](https://developer.apple.com/documentation/swift/manual-memory-management)


<br><br>

---
Reference

1. "Structures and Classes", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 21, 2022, [Swift Docs Chapter 8 - Structures and Classes](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html)
2. "Choosing Between Structures and Classes", Apple Developer Documentation, last modified latest(Unknown), accessed Nov. 21, 2022, [Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)
