---
layout: post
title: Swift Type Casting
subtitle: Swift Type casting is a way to check the type of an instance, or to treat that instance as a different superclass or subclass from somewhere else in its own class hierarchy.
categories: swift
tags: [swift docs, checking type, downcasting, type casting for any, type casting for any object]
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

### 2. Checking Type 👩‍💻


---

### 3. Downcasting 👩‍💻


---

### 4. Type Casting for Any and AnyObject 👩‍💻




<br><br>

---
Reference

1. "Type Casting", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Jan. 14, 2023, [Swift Docs Chapter 18 - Type Casting](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html)
