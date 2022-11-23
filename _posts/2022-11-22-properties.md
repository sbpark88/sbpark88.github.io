---
layout: post
title: Swift Property
subtitle: Property
categories: swift
tags: [swift docs, swift property, sotred property, computed property, property observer, property wrapper, type property]
---

### <span style="color: orange">1. Stored Properties 👩‍💻</span>

`Class`, `Structure`, `Enumeration`의 `instance` 일부로써 `constant values` 또는 `variable values`를 
저장한다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Stored Properties</span>

`FixedLengthRange` `instance`는 1개의 variable `firstValue` 와 1개의 constant `length` 를 가지고 있다.

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
```

<br>

```swift
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
print(rangeOfThreeItems)    // FixedLengthRange(firstValue: 0, length: 3)

rangeOfThreeItems.firstValue = 6
print(rangeOfThreeItems)    // FixedLengthRange(firstValue: 6, length: 3)
```

`firstValue`는 `var`로 선언했기 때문에 수정 가능하다.

```swift
rangeOfThreeItems.length = 4    // Cannot assign to property: 'length' is a 'let' constant
```

`length`는 `let`으로 선언했기 때문에 수정이 불가능해 에러가 발생된다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Stored Properties of Constant Structure Instances</span>

만약 `Structure`의 `instance`를 생성해 `let` 키워드에 할당하면, `instance` 자체가 `constant`가 되므로 
`properties`가 `variable`이더라도 수정이 불가능하다.

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
rangeOfFourItems.firstValue = 3 // Cannot assign to property: 'rangeOfFourItems' is a 'let' constant
```

<br>

그러나 이것은 `Structures`가 `Value Types`여서 발생하는 현상으로, `Reference Types`인 `Classes`는 
`instnace`를 `let` 키워드를 이용해 `constant`로 선언해도, `properties`가 `variable`이면 여전히 수정 가능하다.

```swift
class FixedVolumeRange {
    var firstValue: Int
    let volume: Int
    
    init(firstValue: Int, volume: Int) {
        self.firstValue = firstValue
        self.volume = volume
    }
}
```

```swift
let rangeOfFiveVolumes = FixedVolumeRange(firstValue: 0, volume: 5)
print("rangeOfFiveVolumes(firstValue: \(rangeOfFiveVolumes.firstValue), volume: \(rangeOfFiveVolumes.volume))")

rangeOfFiveVolumes.firstValue = 1
print("rangeOfFiveVolumes(firstValue: \(rangeOfFiveVolumes.firstValue), volume: \(rangeOfFiveVolumes.volume))")
```

```console
rangeOfFiveVolumes(firstValue: 0, volume: 5)
rangeOfFiveVolumes(firstValue: 1, volume: 5)
```

#### <span style="color: rgba(166, 42, 254, 1)">3. Lazy Stored Properties</span>

__1 ) Syntax__

`Lazy Stored Properties`는 사용되기 전까지 초기값이 계산되지 않는 `Stored Property`다. `Property` 선언 
앞에 `lazy` `modifier` 붙여 만들며, 반드시 `var` 키워드와 함께 사용해야한다. `constnat`는 `initialization`이 
종료되기 전에 반드시 값을 가져야 하기 때문이다(= 선언과 동시에 값을 저장해야한다).

`Lazy Stored Properties`는 다음 경우 유용하다
- 초기값이 외부 요인에 의존하는 경우
- 필요할 때까지 수행하면 안 되는 경우
- 초기값을 저장하는데 비용이 많이 드는 경우
- 초기값이 필요하지 않은 경우

<br>

__Syntax__

```swift
struct SomeStructure {
    lazy var someProperty = {
        return // property definition goes here
    }()
    
    lazy var anotherProperty = SomeClass()  // or SomeStructure()
}
```

<br>

__2 ) Lazy Stored Property Examples__

- 초기값이 외부 요인에 의존하는 경우

```swift
class Classroom {
    let subject: Subject
    let maxStudents: Int
    var applicant: Int = 0

    lazy var students: Int = {
        applicant > maxStudents ? maxStudents : applicant
    }()

    enum Subject {
        case Korean, English, Math, History, Science
    }

    init(subject: Subject, maxStudents: Int) {
        self.subject = subject
        self.maxStudents = maxStudents
    }
}
```

```swift
struct Classroom {
    let subject: Subject
    let maxStudents: Int
    var applicant: Int = 0
    
    lazy var students: Int = {
        applicant > maxStudents ? maxStudents : applicant
    }()
    
    enum Subject {
        case Korean, English, Math, History, Science
    }
}
```

위와 같이 `lazy`는 `Class`와 `Structure` 모두에서 사용 가능하다. 아래 예제는 `Structure`를 사용했다.

<br>

```swift
var mathClass = Classroom(subject: .Math, maxStudents: 30)
var englishClass = Classroom(subject: .English, maxStudents: 50)
```

수학 강의와 영어 강의를 개설했다. 그리고 수학 강의는 최대 수강 신청 인원을 30명, 영어 강의는 50명으로 제한했다.  
실제 강의를 듣는 학생 수를 미리 알 수 없어 수강 인원은 `lazy`로 계산을 보류하도록 했다.

그리고 강의를 오픈한 후 43명이 수학 강의를 신청했다.
강의 수강 신청 기간이 종료되었다. 이제 수학 강의를 출력해보자.

```swift
Array(1...43).forEach { i in mathClass.applicant += 1 }
print(mathClass)
```

```console
Classroom(subject: __lldb_expr_48.Classroom.Subject.Math, 
          maxStudents: 30, 
          applicant: 43, 
          $__lazy_storage_$_students: nil)
```

`lazy`로 인해 아직 강의를 듣는 학생 수는 정해지지 않아 `nil`인 것을 확인할 수 있다.  
이번에는 `Lazy Stored Property`를 사용해 초기값이 저장되도록 해보자.

```swift
mathClass.students
print(mathClass)
```

```console
Classroom(subject: __lldb_expr_48.Classroom.Subject.Math, 
          maxStudents: 30, 
          applicant: 43, 
          $__lazy_storage_$_students: Optional(30))
```

> `Classromm Structure`의 `students property`는 초기값이 없으므로 `nil`을 허용해야 하기 때문에
> `Int`로 선언했음에도 불구하고 `instance` 자체를 출력하면 `Int?` 즉, `Optional` 인 것을 확인할 수 있다.    
> 또한 이때의 `property`는 `stuents`가 아닌 `$__lazy_storage_$_students`인 것도 확인할 수 있다.

<br>

```swift
print("\(mathClass.students) students in math class")   // 30 students in math class
```

> 하지만 해당 `Property`를 직접 접근해보면 우리가 정의한 `Int` 타입의 값을 얻어오는 것을 볼 수 있다.
> 이는 `Lazy Stored Properties`를 사용하는 순간 `Closure`가 실행되며 값을 저장했기 때문이다.
> 즉, `lazy`로 인해 값을 할당(저장)하는 것이 지연이 된다는 것을 제외하면 `Lazy Stored Properties`는
> `Stored Properties`와 같다는 것을 알 수 있다.

<br>

이번에는 영어 강의를 오픈했고, 45명이 영어 강의를 신청했다.

```swift
Array(1...10).forEach { i in englishClass.applicant += 1 }
print("\(englishClass.students) students in english class")    // 10 students in english class

Array(1...35).forEach { i in englishClass.applicant += 1 }
print("\(englishClass.students) students in english class")    // 10 students in english class

print(englishClass) // Classroom(subject: __lldb_expr_74.Classroom.Subject.English, maxStudents: 50, applicant: 45, $__lazy_storage_$_students: Optional(10))
```

그런데 10명이 신청한 시점에 학생 수를 한 번 조회했다. 총 45명이 지원을 했지만 여전히 학생 수는 10명으로 출력된다!!  
수강 신청 기간이 종료된 후 조회했을 때 지원자 수는 45명으로 정상적으로 저장 되었으나 학생수만 10명인 상태인 것을 볼 수 있다.  
이는 이미 `10명이 신청한 시점에` 해당 `Lazy Stored Property`를 사용해 `초기값이 저장`되었기 때문이다.

> `Lazy Stored Properties`는 최초 사용되는 순간에 값을 저장한다.  
> 이후 다시 사용할 때는 이미 지연 저장된 값을 가져오므로 값이 업데이트 되지 않는다.  
> 만약, 값을 매번 업데이트 하기를 원한다면 저장하는 것이 아니라 계산하도록 `Computed Properties`를
> 사용해야한다.


<br>

- 초기값을 저장하는데 비용이 많이 드는 경우

```swift
class DataImporter {
    /*
    DataImporter is a class to import data from an external file.
    The class is assumed to take a nontrivial amount of time to initialize.
    */
    var filename = "data.txt"
    // the DataImporter class would provide data importing functionality here
}

class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    // the DataManager class would provide data management functionality here
}
```

- `DataImporter` 클래스는 외부 파일로부터 데이터를 가져온다.
- `DataManager` 클래스는 `data`라는 이름의 `Stored Property`를 다루는 클래스로 `[String]`으로
  저장된 데이터를 다룬다. 그리고 이 클래스는 파일로부터 데이터를 가져올 수 있도록 `DataImpoerter`
  클래스를 포함하고있다.

하지만 외부 파일에서 데이터를 가져오는 것은 항상 필요한 것이 아니다. 그리고 이러한 기능을 초기화하는
것은 비용이 많이 드는 작업이다. 따라서 해당 `isntance`는 처음 사용할 때 생성하는 것이 합리적이다.  
그러므로 `DataManager`는 이것을 `Lazy Stored Property`로 선언했다.

<br>

```swift
let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
```

`DataManager`의 `isntance`에 문자열 2개를 저장했다.
하지만 아직 외부 파일을 가져올 일이 없었기 때문에 `DataImporter` `instance`는 생성되지 않았다.

<br>

```swift
print(manager.importer.filename)
// Prints "data.txt"
```

`DataManager`클래스의 `importor` property에 대한 `DataImportor` instance가 생성되었다!!

> `Lazy Stored Properties`를 멀티 스레드에서 동시에 access할 때 아직 `properties`가 초기화
> 되지 않았다면, 한 번만 초기화된다는 보장이 없다. 즉, `Thread-UnSafe`하므로 이를 제어할 필요가 있다.

#### <span style="color: rgba(166, 42, 254, 1)">4. Stored Properties and Instnace Variables</span>

`Objective-C`는 `Class instance`의 `Properties`로 `Values`와 `References`를 저장하는 두 가지
방법을 제공했다. 또한 `Properties`를 `Backing Store(백업 저장소)`로 사용할 수 있었다.

하지만 `Swift`는 `Backing Store`에 직접 접속할 수 없도록 하고, `Properties`를 저장하는 방식을
통합했다. 따라서 선언하는 방법에 따른 혼동을 피하고 명확한 문장으로 단순화되었으며, 이는 `Propeties`의
`이름`, `타입`, `메모리 관리 특성`을 포함하는 모든 정보를 유형을 한 곳에서 정의한다.

---

### <span style="color: orange">2. Computed Properties 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. Computed Properties</span>

__1 ) Syntax__

`Class`, `Structure`, `Enumeration`의 일부로써 `값을 저장하는 대신 계산`하며, `getter`와 
`optional setter`를 제공한다. `Lazy Stored Properties`와 마찬가지로 반드시 `var` 키워드와 함께 사용해야하며, 
`Lazy Stored Properties`와 다르게 데이터 타입을 반드시 명시(`explicit type`)해야한다.

또한, 값을 할당(저장)하는 것이 아니므로, `=`를 사용하지 않고, `explicit type` 다음 바로 `getter`와 `setter`를 
갖는 `Closure`를 작성한다. 또한 `setter`의 `parameter`는 반드시 `SomeType`이어야하므로, 별도의 `type`을 
명시할 수 없다.

<br>

__Syntax__

```swift
struct SomStructure {
    var someProperty: SomeType {
        get {
            return // property definition for getter goes here
        }
        set (parameterName) {
            // property definition for setter goes here
        }
    }
}
```

<br>

__2 ) Stored Property Examples__

- Case 1

첫 번째 예재로 위 `Lazy Stored Properties`에서 직면했던 영어 강의 학생 수를 확인할 때 겪었던 문제를 해결해보자.

```swift
struct Classroom {
    let subject: Subject
    let maxStudents: Int
    var applicant: Int = 0
    
    var students: Int {
        get {
            applicant > maxStudents ? maxStudents : applicant
        }
    }
    
    enum Subject {
        case Korean, English, Math, History, Science
    }
}

var englishClass = Classroom(subject: .English, maxStudents: 50)
```

<br>
위와 동일하게 영어 강의를 오픈하고 수강 신청이 진행되는 도중 여러 차례 학생 수를 확인했다.

```swift
Array(1...10).forEach { i in englishClass.applicant += 1 }
print("\(englishClass.students) students in math class")    // 10 students in math class

Array(1...35).forEach { i in englishClass.applicant += 1 }
print("\(englishClass.students) students in math class")    // 45 students in math class

Array(1...10).forEach { i in englishClass.applicant += 1 }
print("\(englishClass.students) students in math class")    // 50 students in math class
```

위 `Lazy Stored Properties`에서 겪었던 문제와 달리 매번 최신 값을 얻을 수 있다! 이것은 `Computed Properties`가 
실제로 값을 저장하는 것이 아닌 `계산` 하기 때문이다.

```swift
print(englishClass)
```

```console
Classroom(subject: main.Classroom.Subject.English, 
          maxStudents: 50, a
          pplicant: 55)
```

> `Lazy Stored Properties`와 다르게 `instnace`를 조회할 때 조회가 되지 않는다. 저장되는 값이 아니기 때문이다.   
> 즉, `Properties`지만 행동은 `Methods`에 가깝다.

<br>

- Case 2

이번에는 `setter`까지 사용해보자.

```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}

struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set (newCenter) {
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
}
```

- Point: Cartesian Coordinates System 위에 있는 점의 위치를 `encapsulates(캡슐화)`한다.
- Size: 사각형의 너비와 폭을 `encapsulates(캡슐화)`한다.
- Rect: 사각형을 정의한다. 이를 위해 `Point`와 `Size`의 `instances`를 각각 `origin`과 `size`라는
        `Stored Properties`로 갖고, 정의된 사각형의 중심점을 구하기 위한 `getter`와, 중심점이 이동되었을 때 
        새 중심점에 따라 기준점 `origin`을 재정의하는 `setter`를 갖는 `center`라는 이름의 
        `Computed Property`를 갖고 있다.

<br>

```swift
var square = Rect(origin: Point(),
                  size: Size(width: 10, height: 10))

print(square.center)    // Point(x: 5.0, y: 5.0)
```

`square` instance를 만들었고, 생성된 instance로부터 `getter`를 이용해 사각형의 중심점을 구했다.  
이번에는 `setter`를 이용해 새 기준점을 저장하고, 변경된 기준점과 그때의 중심점을 구해보자.

```swift
square.center = Point(x: 17.5, y: 17.5)
print("""
square.origin: \(square.origin)
square.center: \(square.center)
""")
```

```console
square.origin: Point(x: 12.5, y: 12.5)
square.center: Point(x: 17.5, y: 17.5)
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Shorthand Setter/Getter Declaration</span>

- Shorthand Setter Declaration

`Trailing Closures`가 `Parameters`를 생략하면 `$0, $1, $2, ...`를 사용하는 것처럼 `setter`의 
`Parameters`를 생략하면 기본값으로 `newValue`를 사용한다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

<br>

- Shorthand Getter Declaration

다른 `Closures`와 마찬가지로 `single expression`으로 작성되면 `return` 키워드를 생략할 수 있다.

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                  y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

#### <span style="color: rgba(166, 42, 254, 1)">3. Read-Only Computed Properties</span>

위 2.1의 `Case 1` 영어 강의 예제를 다시 보자. `setter`가 필요 없고 `getter`만 필요한 경우 이를 
`Read-Only Computed Properties`라고 하며, `get` 키워드와 중괄호를 생략할 수 있다.

```swift
struct Classroom {
    let subject: Subject
    let maxStudents: Int
    var applicant: Int = 0
    
    var students: Int {
        applicant > maxStudents ? maxStudents : applicant
    }
    
    enum Subject {
        case Korean, English, Math, History, Science
    }
}
```

---

### <span style="color: orange">3. Property Observers 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>



---

### <span style="color: orange">4. Property Wrappers 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>



---

### <span style="color: orange">5. Global and Local Variables 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>



---

### <span style="color: orange">6. Type Properties 👩‍💻</span>

#### <span style="color: rgba(166, 42, 254, 1)">1. </span>
#### <span style="color: rgba(166, 42, 254, 1)">2. </span>



<br><br>

---
Reference

1. "Properties", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Nov. 21, 2022, [Swift Docs Chapter 9 - Properties](https://docs.swift.org/swift-book/LanguageGuide/Properties.html)
