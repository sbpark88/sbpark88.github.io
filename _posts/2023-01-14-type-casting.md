---
layout: post
title: Swift Type Casting
subtitle: Swift Type casting is a way to check the type of an instance, or to treat that instance as a different superclass or subclass from somewhere else in its own class hierarchy.
categories: swift
tags: [swift docs, checking type, type check operator, is, downcasting, type cast operator, as, type casting for Any]
---

### 1. Type Casting 👩‍💻

#### 1. What is Type Casting?

`Type Casting`은 단순히 타입을 다른 타입으로 변경하는 것만을 의미하는 것이 아니다. `Instance 의 타입을 확인`하거나, 해당 Instance 를 
자신의 `Class Hierarchy` 구조 안에서 `Superclass` 또는 `Subclass`로 다루기 위해 사용한다.

Swift 에서 Type Casting 은 `is`와 `as` operators 를 이용해 구현된다. 이 두 operators 는 간단하면서 문장을 표현하는 것과 같은 
자연스러운 방법으로 `Value`에 대한 `Checking Type`과 `Casting Another Types`을 지원한다.

그리고 `Checking Type`은 해당 Instance 의 타입을 확인하는 것 뿐 아니라 그 타입이 특정 `Protocols`를 따르고 있는지 확인하는 데 
사용되기도 한다.

#### 2. Defining a Class Hierarchy for Type Casting

- Base Class

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

- Subclass of the `MediaItem`

```swift
class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}
```

`Movie`의 instance 만 저장할 경우 배열 movies 는 `[Movie]` 타입의 배열로 추론된다.

```swift
let movies = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Movie(name: "Citizen Kane", director: "Orson Welles")
]

print(type(of: movies))     // Array<Movie>
```

그리고 movies 는 다음과 같이 반복이 가능하다.

```swift
movies.forEach { print("The director of \($0.name) is \($0.director).") }
```

```console
The director of Casablanca is Michael Curtiz.
The director of Citizen Kane is Orson Welles.
```

<br>

이제 `MediaItem`을 Superclass 로 갖는 또 다른 Subclass `Song`을 추가해보자.

- Subclass of the `MediaItem`

```swift
class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}
```

다음 배열 `library`는 2개의 `Movie` instances 와 3개의 `Song` instances 를 가지고 있다.  
Swift 의 `Type Checker`는 배열이 초기화 될 때 library 의 elements 가 `Movie`와 `Song` 타입이라는 것을 확인 후, 이들이 
공통된 Superclass `MediaItem`의 `Class Hierarchy` 구조라는 것을 추론한다. 그리고 두 타입을 모두 저장하기 위해 이 배열을 
`[MediaItem]` 타입으로 생성한다. 

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]

print(type(of: library))    // Array<MediaItem>
```

![An array is storing multiple types](/assets/images/posts/2023-01-14-type-casting/an-array-is-storing-multiple-types.png)

그리고 이 배열을 반복을 통해 접근하려고 했으나 `MediaItem`이 갖고 있는 `name`을 제외한 Subclasses `Movie`, `Song`의 
`director`와 `artist`에는 접근이 불가능한 것을 확인할 수 있다. Swift 가 두 타입을 모두 저장하기 위해 공통된 Superclass 타입으로 
배열을 추론했기 때문이다. 이때 필요한 것이 바로 `Downcasting`이다.

---

### 2. Checking Type (Type Check Operator '`is`') 👩‍💻

`Type Check Operator(is)`는 일치하는 타입인지 확인 후 `Bool`을 반환한다.

```swift
let aMedia = MediaItem(name: "Avatar")
let aMovie = Movie(name: "Casablanca", director: "Michael Curtiz")
```

```swift
print(aMedia is MediaItem)  // true
print(aMedia is Movie)      // false
print(aMedia is Song)       // false

print(aMovie is MediaItem)  // true
print(aMovie is Movie)      // true
print(aMovie is Song)       // false
```

Superclass 의 instance 는 Subclass 의 `Memebrs`를 모두 갖지 못하므로 Subclass 타입이 될 수 없다.  
반면 Subclass 의 instance 는 Superclass 의 모든 `Memebrs`를 모두 갖고 있으므로, Superclass 타입이 될 수 있다.

<br>

위 `library`에 각 타입이 몇 개씩 저장되어 있는지 `Type Check Operator`를 사용해 확인해보자.

```swift
var (movieCount, songCount) = (0, 0)

library.forEach {
    switch $0 {
    case is Movie: movieCount += 1
    case is Song: songCount += 1
    default: break
    }
}

print("Media library contains \(movieCount) movies and \(songCount) songs")
```

```console
Media library contains 2 movies and 3 songs
```

---

### 3. Downcasting (Type Cast Operator '`as?`, `as!`') 👩‍💻

특정 `Class Type`의 상수나 변수는 겉으로 보이는 것과 달리 실제로는 `Subclass Instance`를 참조하고 있는 경우도 있다. 위에서 
`library`가 그런 경우다. 만약 이 특정 `Class Type`이 실제로는 `Subclass Instance`를 참조하는 것이 사실이라면, 
이것의 Type 을 `Subclass Type`으로 `Downcasting` 할 수 있다. 

Downcasting 은 실패할 수 있기 때문에 2가지의 Operators 가 제공된다. 조건부 형식(conditional form)인 `as?`는 `Optional`을 
반환하므로 Downcating 의 성공 여부를 확인하는 용도로 사용한다. 만약 Downcasting 성공 여부를 확신할 수 있을 경우는 
강제 형식(forced form)인 `as!`를 사용해 `Forced Unwrapping`된 타입을 얻을 수 있다. 단, Downcasting 이 유효하지 않을 경우 
`Runtime Error`가 trigger 되므로 반드시 성공함을 확신할 수 있을 때만 사용해야한다.

> `Casting`은 실제 instance 를 수정하거나 값을 바꾸지 않는다. instance 는 그대로 유지하면서, 단지 casting 된 타입의 instance 로 
> 다루고 접근할 수 있도록 한다.

```swift
library.forEach {
    if let movie = $0 as? Movie {
        print("Movie: \(movie.name), dir. \(movie.director)")
    } else if let song = $0 as? Song {
        print("Song: \(song.name), by \(song.artist)")
    }
}
```

```console
Movie: Casablanca, dir. Michael Curtiz
Song: Blue Suede Shoes, by Elvis Presley
Movie: Citizen Kane, dir. Orson Welles
Song: The One And Only, by Chesney Hawkes
Song: Never Gonna Give You Up, by Rick Astley
```

---

### 4. Type Casting for Any and AnyObject 👩‍💻

Swift 는 불특정 타입을 위한 두 가지의 특별한 타입을 제공한다.

- Any : Closure, Function, Class, Structure, Enumeration Types 를 포함한 모든 타입의 instance 를 대신할 수 있다.
- AnyObject : Class Types 를 대신할 수 있다.

> `Any`와 `AnyObject`는 이것이 제공하는 동작 및 기능이 명시적으로 필요한 경우에만 사용해야한다. 그렇지 않다면 언제나 명확한 타입을 
> 지정하는 것이 더 좋다.
> 
> `Any`는 `Optional`을 포함한 모든 타입을 대신할 수 있다.

예제를 위해 Structure 와 Enumeration 을 하나씩 추가하자.

```swift
struct Point {
    var x = 0.0, y = 0.0
}

enum CompassPoint {
    case east, west, south, north
}
```


#### 1. Any

```swift
var things: [Any] = []

func testAnyTypes(_ things: [Any]) {
    for thing in things {
        switch thing {
        case 0 as Int:
            print("\(thing) : zero as an Int")
        case 0 as Double:
            print("\(thing) : zero as a Double")
        case let someInt as Int:
            print("\(thing) : an integer value of \(someInt)")
        case let someDouble as Double where someDouble > 0:
            print("\(thing) : a positive double value of \(someDouble)")
        case is Double:
            print("some other double value that I don't want to print")
        case let someString as String:
            print("\(thing) : a string value of \"\(someString)\"")
        case let (x, y) as (Double, Double):
            print("\(thing) : an (x, y) point at \(x), \(y)")
        case let stringConverter as (String) -> String:
            print("\(thing) : \(stringConverter("Michael"))")
        case let movie as Movie:
            print("\(thing) : a movie called \(movie.name), dir. \(movie.director)")
        case let point as Point:
            print("\(thing) : a point is at (\(point.x), \(point.y))")
        case let direction as CompassPoint:
            print("\(thing) : a direction is \(direction)")
        default:
            print("\(thing) : something else")
        }
    }
}
```

<br>

`[Any]`에 여러 타입을 저장하고, 이를 `Downcasting`을 통해 다시 확인해보자.

- Int and Double

```swift
things.append(0)            // Int
things.append(0.0)          // Double
things.append(42)           // Int
things.append(3.14159)      // Double

testAnyTypes(things)
```

```console
0 : zero as an Int
0.0 : zero as a Double
42 : an integer value of 42
3.14159 : a positive double value of 3.14159
```

- String, Tuple and Closure

```swift
things.append("hello")      // String
things.append((3.0, 5.0))   // Tuple of type (Double, Double)
things.append({ (name: String) -> String in "Hello, \(name)" }) // Closure of type (name: Stirng) -> String

testAnyTypes(things)
```

```console
hello : a string value of "hello"
(3.0, 5.0) : an (x, y) point at 3.0, 5.0
(Function) : Hello, Michael
```

- Class, Structure and Enumeration

```swift
things.append(Movie(name: "Avatar", director: "James Francis Cameron")) // Class
things.append(Point(x: 5.2, y: 3.0))                                    // Structure
things.append(CompassPoint.east)                                        // Enumeration

testAnyTypes(things)
```

```console
__lldb_expr_81.Movie : a movie called Avatar, dir. James Francis Cameron
Point(x: 5.2, y: 3.0) : a point is at (5.2, 3.0)
east : a direction is east
```

#### 2. AnyObject

![AnyObject only represent class types](/assets/images/posts/2023-01-14-type-casting/any-object-only-can-store-class-type.png)

`AnyObject`는 `Any`와 달리 오직 `Class Types`만 대신할 수 있다.

```swift
var things: [AnyObject] = []
things.append(Movie(name: "Avatar", director: "James Francis Cameron")) // Class

if let aMovie = things[0] as? Movie {
    print("\(aMovie) : a movie called \(aMovie.name), dir. \(aMovie.director)")
}
```

```console
__lldb_expr_92.Movie : a movie called Avatar, dir. James Francis Cameron
```

#### 3. Do Explicit Casting Optional to Any

`Any`는 `Optional`을 포함한 모든 타입을 대신하기 때문에 `Any`가 예상되는 곳에 `Optional`을 사용하면 Swift 는 사용자에게 
경고를 나타낸다. 경고를 제거하기 위해 `Nil-Coalescing Operator(??)`나 `Forced Unwrapping(!)`를 사용할 수도 있지만 
이는 실제 `Optional Type` 이 아닌 `Unwrapped Type` 을 저장하므로 실제와 다른 결과를 만들어버린다.

```swift
let optionalNumber3: Int? = 3
let optionalNumber5: Int? = 5
let optionalNumber7: Int? = 7
let optionalNumber9: Int? = 9

things.append(optionalNumber3)          // Warning: Expression implicitly coerced from 'Int?' to 'Any'
things.append(optionalNumber5 ?? 0)
things.append(optionalNumber7!)
things.append(optionalNumber9 as Any)

testAnyTypes(things)
```

```console
Optional(3) : an integer value of 3
5 : an integer value of 5
7 : an integer value of 7
Optional(9) : an integer value of 9
```

`Error`가 아닌 `Warning`이므로 동작에 문제는 없다. 하지만 Swift 의 경고를 제거하기 위해 명시적으로 `Any`로 casting 할 수 있다.

<br><br>

---
Reference

1. "Type Casting." The Swift Programming Language Swift 5.7. accessed Jan. 14, 2023, [Swift Docs Chapter 18 - Type Casting](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html)
