---
layout: post
title: Swift Properties
subtitle: Properties - Stored Properties, Computed Properties, Property Observers, Property Wrappers, Type Properties
categories: swift
tags: [swift docs, property, stored property, lazy stored property, computed property, property observer, property wrapper, type property, projecting]
---

### 1. Stored Properties 👩‍💻

*Class*, *Structure*, *Enumeration*의 *instance* 일부로써 `constant values` 또는 `variable values`를 
저장한다.

#### 1. Stored Properties

*FixedLengthRange* instance 는 1개의 variable *firstValue* 와 1개의 constant *length* 를 가지고 있다.

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

*firstValue* 는 `var`로 선언했기 때문에 수정 가능하다.

```swift
rangeOfThreeItems.length = 4    // Cannot assign to property: 'length' is a 'let' constant
```

*length* 는 `let`으로 선언했기 때문에 수정이 불가능해 에러가 발생된다.

#### 2. Stored Properties of Constant Structure Instances

만약 *Structure* 의 instance 를 생성해 `let` 키워드에 할당하면, *instance* 자체가 *constant* 가 되므로 
*properties*가 *variable* 이더라도 수정이 불가능하다.

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
rangeOfFourItems.firstValue = 3 // Cannot assign to property: 'rangeOfFourItems' is a 'let' constant
```

<br>

그러나 이것은 `Structures`가 `Value Types`여서 발생하는 현상으로, `Reference Types`인 `Classes`는 
*instance* 를 `let` 키워드를 이용해 *constant* 로 선언해도, *properties* 가 *variable* 이면 여전히 수정 가능하다.

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

#### 3. Lazy Stored Properties

__1 ) Syntax__

`Lazy Stored Properties`는 사용되기 전까지 초기값이 계산되지 않는 *Stored Property* 다. *Property* 선언 
앞에 `lazy` *modifier* 붙여 만들며, 반드시 `var` 키워드와 함께 사용해야한다. *constant* 는 *initialization* 
이 종료되기 전에 반드시 값을 가져야 하기 때문이다(= 선언과 동시에 값을 저장해야한다).

*Lazy Stored Properties* 는 다음 경우 유용하다
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

위와 같이 `lazy`는 *Class* 와 *Structure* 모두에서 사용 가능하다.

다음 예제는 *Structure* 를 사용했다.

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
이번에는 *Lazy Stored Property* 를 사용해 초기값이 저장되도록 해보자.

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

> **Classroom Structure** 의 **students property** 는 초기값이 없으므로 `nil`을 허용해야 하기 때문에
> `Int`로 선언했음에도 불구하고 **instance** 자체를 출력하면 `Int?` 즉, `Optional` 인 것을 확인할 수 있다.    
> 또한 이때의 **property** 는 **students** 가 아닌 `$__lazy_storage_$_students`인 것도 확인할 수 있다.

<br>

```swift
print("\(mathClass.students) students in math class")   // 30 students in math class
```

> 하지만 해당 **Property** 를 직접 접근해보면 우리가 정의한 `Int` 타입의 값을 얻어오는 것을 볼 수 있다.
> 이는 **Lazy Stored Properties** 를 사용하는 순간 **Closure** 가 실행되며 값을 저장했기 때문이다.
> 즉, `lazy`로 인해 값을 할당(저장)하는 것이 지연이 된다는 것을 제외하면 **Lazy Stored Properties** 는
> 일반적인 **Stored Properties** 와 같다는 것을 알 수 있다.

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
이는 이미 `10명이 신청한 시점에` 해당 *Lazy Stored Property* 에 접근해 `초기값이 저장`되었기 때문이다.

> **Lazy Stored Properties**는 최초 사용되는 순간에 값을 저장한다.  
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
- `DataManager` 클래스는 *data* 라는 이름의 *Stored Property* 를 다루는 클래스로 `[String]`으로 저장된 
  데이터를 다룬다. 그리고 이 클래스는 파일로부터 데이터를 가져올 수 있도록 `DataImporter` 클래스를 포함하고있다.

하지만 외부 파일에서 데이터를 가져오는 것은 항상 필요한 것이 아니다. 그리고 이러한 기능을 초기화하는 것은 비용이 많이 드는 
작업이다. 따라서 해당 *instance* 는 처음 사용할 때 생성하는 것이 합리적이다. 그러므로 *DataManager* 는 이것을 
*Lazy Stored Property* 로 선언했다.

<br>

```swift
let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
```

*DataManager* 의 *instance* 에 문자열 2개를 저장했다.
하지만 아직 외부 파일을 가져올 일이 없었기 때문에 `DataImporter` *instance* 는 생성되지 않았다.

<br>

```swift
print(manager.importer.filename)
// Prints "data.txt"
```

*DataManager* 클래스의 *importer* property 에 대한 `DataImportor` instance 가 생성되었다!!

> `Lazy Stored Properties`를 멀티 스레드에서 동시에 access 할 때 **아직 properties 가 초기화
> 되지 않았다면**, **한 번만 초기화된다는 보장이 없다**. 즉, `Thread-UnSafe`하므로 이를 제어할 필요가 있다.

#### 4. Stored Properties and Instance Variables

*Objective-C* 는 *Class instance* 의 *Properties* 로 *Values* 와 *References* 를 저장하는 두 가지
방법을 제공했다. 또한 *Properties* 를 `Backing Store(백업 저장소)`로 사용할 수 있었다.

하지만 Swift 는 `Backing Store`에 *직접 접속할 수 없도록 하고*, `Properties`를 *저장하는 방식을 통합*했다. 
따라서 선언하는 방법에 따른 혼동을 피하고 명확한 문장으로 단순화되었으며, 이는 `Properties`의 `이름`, `타입`, 
`메모리 관리 특성`을 포함하는 모든 정보를 유형을 한 곳에서 정의한다.

---

### 2. Computed Properties 👩‍💻

#### 1. Computed Properties

__1 ) Syntax__

*Class*, *Structure*, *Enumeration* 의 일부로써 `값을 저장하는 대신 계산`하며, `getter`와 
`optional setter`를 제공한다. *Lazy Stored Properties* 와 마찬가지로 반드시 `var` 키워드와 함께 사용해야하며, 
*Lazy Stored Properties* 와 다르게 반드시 데이터 타입을 명시(*explicit type*)해야한다.

또한, 값을 할당(저장)하는 것이 아니므로, `=`를 사용하지 않고, *explicit type* 다음 바로 *getter* 와 *setter* 를 
갖는 `Closure`를 작성한다. 또한 *setter* 의 *parameter* 는 반드시 명시된 *explicit type* 과 동일한 `SomeType` 
이어야하므로, 별도의 `type`을 명시할 수 없다.
<br>

__Syntax__

```swift
struct SomeStructure {
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

> 단!! `Computed Properties`는 절대 <span style="color: red;">자기 자신을 대상</span>으로 해서는 안 된다.  
> 강한 참조가 생성되기 때문이다.
> 
> ```swift
> struct SomeStructure {
>     var someProperty: SomeType {
>         get {
>             self.someProperty
>         }
>         set {
>             self.someProperty = newValue
>         }
>     }
> }
> ```
> 
> ![Infinite Recursion](/assets/images/posts/2022-11-22-properties/do-not-use-computed-properties-for-self.png)


<br>

__2 ) Computed Property Examples__

- Case 1

첫 번째 예재로 위 *Lazy Stored Properties* 에서 직면했던 영어 강의 학생 수를 확인할 때 겪었던 문제를 해결해보자.

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

위 *Lazy Stored Properties* 에서 겪었던 문제와 달리 매번 최신 값을 얻을 수 있다! 이것은 *Computed Properties* 가 
실제로 값을 저장하는 것이 아닌 `계산` 하기 때문이다.

```swift
print(englishClass)
```

```console
Classroom(subject: main.Classroom.Subject.English, 
          maxStudents: 50,
          applicant: 55)
```

> **Lazy Stored Properties** 와 다르게 **instance** 를 조회할 때 조회가 되지 않는다. 저장되는 값이 아니기 때문이다.   
> 즉, `Properties`지만 행동은 `Methods`에 가깝다(그렇다고 이것이 Methods 인 것은 아니다. 여전히 Properties 다).

<br>

- Case 2

이번에는 *setter* 까지 사용해보자.

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

- Point: Cartesian Coordinates System 위에 있는 *점의 위치* 를 *encapsulates(캡슐화)* 한다.
- Size: 사각형의 *너비* 와 *폭* 을 *encapsulates(캡슐화)* 한다.
- Rect: 사각형을 정의한다. 이를 위해 `Point`와 `Size`의 *instances* 를 각각 *origin* 과 *size* 라는
        *Stored Properties* 로 갖고, 정의된 사각형의 중심점을 구하기 위한 *getter* 와, 중심점이 이동되었을 때 
        새 중심점에 따라 기준점 *origin* 을 재정의하는 *setter* 를 갖는 `Computed Property`를 *center* 
        라는 이름으로 갖고 있다.

<br>

```swift
var square = Rect(origin: Point(),
                  size: Size(width: 10, height: 10))

print(square.center)    // Point(x: 5.0, y: 5.0)
```

*square* instance 를 만들었고, 생성된 instance 로부터 *getter* 를 이용해 사각형의 중심점을 구했다.  
이번에는 *setter* 를 이용해 새 기준점을 저장하고, 변경된 기준점과 그때의 중심점을 구해보자.

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

#### 2. Shorthand Getter/Setter Declaration

- Shorthand Setter Declaration

*Trailing Closures* 가 *Parameters* 를 생략하면 기본값으로 `$0, $1, $2, ...`를 사용하는 것처럼 
*Computed Properties* 의 *setter* 의 *Parameters* 를 생략하면 기본값으로 `newValue`와 `oldValue`를 사용한다.

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

다른 *Closures* 와 마찬가지로 *single expression* 으로 작성되면 `return` 키워드를 생략할 수 있다.

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

#### 3. Read-Only Computed Properties

위 2.1의 `Case 1` 영어 강의 예제를 다시 보자. *setter* 가 필요 없고 *getter* 만 필요한 경우 이를 
`Read-Only Computed Properties`라고 하며, `get` 키워드와 중괄호`{ }`를 생략할 수 있다.

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

### 3. Property Observers 👩‍💻

#### 1. Definition of Property Observers

`Property Observers`는 *Property* 의 값에 `set`의 변화를 관찰하고 실행된다. 새 값이 기존의 값과 같더라도 *set* 이 
발생하는 것 자체로 *trigger* 되기 때문에 호출된다.

<br>

__1 ) Attach Observers__

*Property* 에 `Observers`를 붙일 수 있는 곳은 다음과 같다.

- *Stored Properties*
- 상속한 *Stored Properties*
- 상속한 *Computed Properties*

> 상속한 *Properties* 에 Property Observers 를 붙일 때는 `overriding` 을 이용한다.

> 상속되지 않은 **Computed Properties** 는 **Property Observers** 를 사용할 수 없으므로, 대안으로 
> **Computed Properties** 의 **setter** 를 사용해 일정 부분 유사하게 구현하는 방법이 있다. 

<br>

__2 ) willSet & didSet__

*Computed Properties* 는 `setter`와 `getter`라는 2가지 옵션이 존재했다.  
*Property Observers* 는 `willSet`과 `didSet`이라는 2가지 옵션이 존재한다.

- willSet : 값이 저장되기 직전에 호출되며, *Parameters* 를 생략하면 기본값으로 `newValue`를 사용한다.
- didSet : 값이 저장된 직후에 호출되며, *Parameters* 를 생략하면 기본값으로 `oldValue`를 사용한다.

<br>

__Syntax__

```swift
class SomeClass {
    var someProperty: Type = defaultValue {
        willSet {
            // observer definition for willSet goes here
        }
        didSet {
            // observer definition for didSet goes here
        }
    }
}
```

> **Lazy Stored Properties** 또는 **Computed Properties** 와 마찬가지로 반드시 `var` 키워드와 함께 사용한다.
> 또한 초기값을 반드시 정의해야하며, 로직은 **Trailing Closures** 를 이용해 정의한다.
> 
> **Lazy Stored Properties** 와 **Computed Properties**, **Property Observers** 는 Syntax 가 유사해 
> 헷갈리기 쉽다. 다같이 놓고 비교해보면 다음과 같은 차이를 보인다.
> 
> - Lazy Stored Properties
> 
> ```swift
> lazy var someProperty = {
>     return // property definition goes here
> }()
> 
> lazy var anotherProperty = SomeClass()  // or SomeStructure()
> ```
> 
> **Lazy Stored Properties** 는 **Closures** 또는 **Classes** 의 **Initializers** 에 `()`를 붙여 실행하고 
> 반환된 값을 바로 변수에 저장하도록 되어있다. 대신 저장을 지연시키기 위해 `lazy` modifier 를 작성했다.
> 
> - Computed Properties
> 
> ```swift
> var someProperty: SomeType {
>     get {
>         return // property definition for getter goes here
>     }
>     set (parameterName) {
>         // property definition for setter goes here
>     }
> }
> ```
> 
> **Computed Properties** 는 기본값 저장 없이 `get`, `set`을 메서드로 갖는 **Trailing Closures** 를 작성해 정의한다. 
> **Lazy Stored Properties** 와 달리 `()` 를 작성하지 않는다.
>
> - Property Observers
> 
> ```swift
> var someProperty: Type = defaultValue {
>     willSet {
>         // observer definition for willSet goes here
>     }
>     didSet {
>         // observer definition for didSet goes here
>     }
> }
> ```
> 
> `기본값을 저장`하고 뒤에 `willSet`, `didSet`을 메서드로 갖는 *Trailing Closures* 를 작성해 정의한다. 

<br>

__3 ) Initializer of subclass__

> *initializer* 는 호출되기 전 *Properties* 의 속성을 설정한다.  
> `Superclass`에 정의된 *willSet*, *didSet*, *Observers* 는 상속으로 인한 충돌을 피하기 위해 `Superclass 가
> 초기화 될 때는 설정을 보류`하게된다.
> 
> 즉, 다음과 같은 과정을 거치게 된다.
> 1. *Superclass* 의 *Properties* 의 속성을 설정한다(*willSet*, *didSet* 같은 *Observers* 는 보류한다).
> 2. *Superclass* 의 *initializer* 를 호출한다.
> 3. *Subclass* 의 *Properties* 의 속성을 설정한다(1에서 보류한 속성을 포함한다).
> 4. *Subclass* 의 *initializer* 를 호출한다.

#### 2. Property Observer Examples

아래 걸음수 데이터를 저장하는 *StepCounter* 가 있다.

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            if newValue > totalSteps {
                print("About to set totalSteps to \(newValue)")
            } else {
                print("Please check your step data")
                return
            }
            
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps, totalStep is now \(totalSteps)")
            }
        }
    }
}
```

```swift
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
```

```console
About to set totalSteps to 200
Added 200 steps, totalStep is now 200
```
200보를 저장했다. 초기값은 0이므로 (200 - 0)을 계산해 '200보가 추가되었고, 현재 총 걸음수는 200보'임을 출력한다.

<br>

```swift
stepCounter.totalSteps = 100
```

```console
Please check your step data
```

앞에서 저장한 전체 걸음수가 200보였는데 전체 걸음수를 100보 저장하려고 한다.
*willSet* 이 이를 거절하고 메시지를 남겼으며, *didSet* 은 일치하는 조건이 없어 종료되었다.

<br>

```swift
stepCounter.totalSteps = 360
```

```console
About to set totalSteps to 360
Added 260 steps, totalStep is now 360
```

다시 360보를 저장하니 정상적으로 저장이 되었다. 하지만 이전에 저장한 200보를 기준으로 (360-200)을 해서 '160보가 추가되었고, 
현재 총 걸음수는 360보'임을 출력할것으로 예상했으나 거절 메시지를 남겼던 100보가 실제로는 저장되어 '260보가 추가되었고, 현재 총 
걸음수는 360보'라고 출력한다.

위에서 *willSet* 이 거절 메시지를 남기며 `return`을 했지만 실제로 값의 저장을 막지는 못했기 때문이다.

> `willSet`은 값을 저장하기 직전의 행동을 정의할 수 있을 뿐 <span style="color: red;">값을 저장하는 행위 자체를 제어하지는 
> 못한다!!</span> 

<br>

위 `Class`를 고쳐 `Validation Check`가 가능하도록 해보자.

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            if newValue > totalSteps {
                print("About to set totalSteps to \(newValue)")
            }
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps, totalStep is now \(totalSteps)")
            } else {
                print("Please check your step data")
                totalSteps = oldValue
            }
        }
    }
}
```

```swift
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
print("--------------------------------------")
stepCounter.totalSteps = 100
print("--------------------------------------")
stepCounter.totalSteps = 360

```

```console
About to set totalSteps to 200
Added 200 steps, totalStep is now 200
--------------------------------------
Please check your step data
--------------------------------------
About to set totalSteps to 360
Added 160 steps, totalStep is now 360
```

이번에는 360보를 저장할 때 기존의 200보에서 160보가 추가되었다. 

> `Validation Check`가 필요하다면 `Property Observers`는 적합하지 않다. 위 예제에서 볼 수 있듯이 값을 저장하는 행위 
> 자체를 제어하지는 못 하고 저장 후 다시 기존 값으로 롤백하는 것이기 때문이다.
> 
> 또한 `Computed Properties`를 이용하는 것 역시 자기 자신에게 적용하면 강한 순환 참조를 생성하므로 적합하지 않다. 따라서
> **Validation Check** 가 필요할 경우 단순하고 공통화가 가능하다면 `Property Wrappers`를 사용하고, 그렇지 않을 경우
> `setter` 메서드를 별도로 정의하는 것이 좋다.

<br>

마지막으로 **Property Observers** 를 사용할 때는 다음 경우를 조심해야한다.

> `Observers`가 붙은 **Properties** 를 함수의 [In-Out Parameters][In-Out Parameters]로 전달하면, 
> `willSet`과 `didSet`은 항상 호출된다. 이는 `In-Out Parameters`가 `Copy-in Copy-out Memory Model`에 의해 
> 함수가 종료될 때 항상 값을 다시 저장하기 때문이다.

[In-Out Parameters]:https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID545

---

### 4. Property Wrappers 👩‍💻

#### 1. Property Wrappers

__1 ) Syntax__

`Property Wrappers`는 *Properties* 를 정의하는 코드와 저장되는 방법을 관리하는 코드 사이에 분리된 `layer(계층)`을 
추가한다.

예를 들어 `Thread-Safe` 검사를 제공하는 *Properties*, 또는 기본 데이터를 `Database 에 저장`하는 *Properties* 가 
있는 경우 해당 코드를 모든 *Properties* 에 작성해야한다. 이때 `Property Wrappers`를 사용하면 코드를 한 번만 작성하고 
재사용 할 수 있다.

<br>

__Syntax__

```swift
@propertyWrapper
struct SomeStructure {
    private var someProperty: SomeType
    var wrappedValue: SomeType {
        get { someProperty }
        set { someProperty = newValue }
    }
}
```

> - `Class`, `Structure`, `Enumeration`를 이용해 정의하며 3가지 부분으로 나뉜다
>
> - `@propertyWrapper` Annotation 을 선언
> - `private var` 변수 선언
> - `wrappedValue` 라는 이름을 갖는 [Computed Property](./properties.html#h-1-computed-properties)를 정의

<br>

- Without `@propertyWrapper` Annotation

1 ~ 9 까지의 두 수를 받아 구구단을 계산해보자. 1보다 작은 수는 1로, 9보다 큰 수는 9로 변경하도록 한다.  
기존의 방식대로 `@propertyWrapper` 없이 `explicit wrapping`을 하는 방법부터 알아보자.

```swift
struct OneToNine {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set { number = max(min(newValue, 9), 1) }
    }
}
```

```swift
// Explicit Wrapping
struct MultiplicationTable {
    private var _left = OneToNine()
    private var _right = OneToNine()
    var left: Int {
        get { _left.wrappedValue }
        set { _left.wrappedValue = newValue }
    }
    var right: Int {
        get { _right.wrappedValue }
        set { _right.wrappedValue = newValue }
    }
}
```

<br>

- With `@propertyWrapper` Annotation

`@propertyWrapper` 없이 `wrapping`을 하면 모든 변수마다 명시적으로 코드를 작성해야한다. 즉, 유지보수가 
어렵다는 뜻이다.  
우리는 이 문제를 `@propertyWrapper`를 통해 아래와 같이 해결할 수 있다.

```swift
@propertyWrapper
struct OneToNine {
    private var number = 1
    var wrappedValue: Int {
        get { number }
        set { number = max(min(newValue, 9), 1) }
    }
}
```

```swift
struct MultiplicationTable {
    @OneToNine var left: Int
    @OneToNine var right: Int
}
```

<br>

```swift
var multiplication = MultiplicationTable()

multiplication.left = 7
multiplication.right = 8
print("\(multiplication.left) x \(multiplication.right) = \(multiplication.left * multiplication.right)")
// Prints "7 x 8 = 56"

multiplication.left = 10
multiplication.right = 5
print("\(multiplication.left) x \(multiplication.right) = \(multiplication.left * multiplication.right)")
// Prints "9 x 5 = 45"
```

<br>

참고로 `Observers`와 `Wrappers`는 동시에 사용하지 못하는 것으로 보인다.

[Can I implement a property observer in a property wrapper structure?](https://developer.apple.com/forums/thread/653894)

#### 2. Setting Initial Values for Wrapped Properties

위 코드는 *Property Wrappers* 가 초기값을 하드코딩해 저장하고있다. 따라서 다른 초기값을 지정할 수 없어 유연성이 떨어진다.  
우리는 이 문제를 `Initializer`를 이용해 해결할 수 있다.

사각형의 변의 길이를 정의하는 *LengthOfSide* 가 다음과 같이 정의되어있다.

```swift
@propertyWrapper
struct LengthOfSide {
    private var maximum: Int
    private var length: Int

    var wrappedValue: Int {
        get { length }
        set { length = min(newValue, maximum) }
    }

    init() {
        maximum = 10
        length = 0
    }

    init(wrappedValue: Int) {
        maximum = 10
        length = min(wrappedValue, maximum)
    }

    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        length = min(wrappedValue, maximum)
    }
}
```

- init() : arguments 가 없이 초기화 하면 기본값으로 최고 길이는 10, 변의 길이의 초기값은 0으로 *Structure* 를 초기화한다.
- init(wrappedValue:) : arguments 를 하나만 받아 *wrappedValue* 를 변의 길이의 초기값으로 하고 최고 길이는 
  10으로 *Structure* 를 초기화한다.
- init(wrappedValue:maximum:) : 변의 최고 길이와 초기값을 모두 받아 *Structure* 를 초기화한다.

<br>

- init()

```swift
struct Rectangle {
    @LengthOfSide var height: Int
    @LengthOfSide var width: Int
}
```

```swift
var rectangle = Rectangle()
print(rectangle)
//Rectangle(_height: __lldb_expr_53.LengthOfSide(maximum: 10, length: 0),
//           _width: __lldb_expr_53.LengthOfSide(maximum: 10, length: 0))
```

`init()`을 이용해 초기화되어 사각형의 최대값은 10, 초기값은 0으로 설정되었다.

```swift
print("height: \(rectangle.height), width: \(rectangle.width)") // height: 0, width: 0

rectangle.height = 12
rectangle.width = 5
print("height: \(rectangle.height), width: \(rectangle.width)") // height: 10, width: 5
```

사각형의 높이와 너비는 초기값에 의해 0이었고, 높이를 12, 너비를 5로 설정했다. 하지만 *Property Wrappers* 에 의해 
높이는 10으로 최대값을 넘지 않게 수정되었다.

<br>

__Property Wrappers 를 초기화 하는 방법은 두 가지가 있다__

__1 ) `init(wrappedValue:maximum:)`__

첫 번째 방법은 위에서 본 것처럼 `Property Wrappers 의 Initializers`를 사용하는 것이다.

```swift
struct NarrowRectangle {
    @LengthOfSide(wrappedValue: 15, maximum: 20) var height: Int
    @LengthOfSide(wrappedValue: 3, maximum: 5) var width: Int
}
```

```swift
var narrowRectangle = NarrowRectangle()
print(narrowRectangle)
//NarrowRectangle(_height: __lldb_expr_69.LengthOfSide(maximum: 20, length: 15),
//                 _width: __lldb_expr_69.LengthOfSide(maximum: 5, length: 3))

print("height: \(narrowRectangle.height), width: \(narrowRectangle.width)") // height: 10, width: 5
```

*height* 를 *wrapping* 한 *LengthOfSide* instance 는 `Initializer` 
`LengthOfSide(wrappedValue: 15, maximum: 20)`를 호출해 생성되었고, *weight* 를 *wrapping* 한 *LengthOfSide* 
instance 는 `Initializer` `LengthOfSide(wrappedValue: 3, maximum: 5)`를 호출해 생성되었다.

<br>

__2 ) Initial Values__

또 다른 방법으로, `wrappedValue`를 `Properties 의 Initial Values`를 사용해 초기화하는 것이다. 

```swift
struct HugeRectangle {
    @LengthOfSide(maximum: 20) var height: Int = 20
    @LengthOfSide(maximum: 20) var width: Int = 25
}
```

```swift
var hugeRectangle = HugeRectangle()
print(hugeRectangle)
//HugeRectangle(_height: __lldb_expr_74.LengthOfSide(maximum: 20, length: 20),
//               _width: __lldb_expr_74.LengthOfSide(maximum: 20, length: 20))

print("height: \(hugeRectangle.height), width: \(hugeRectangle.width)") // height: 20, width: 20
```

`init(maximim:)`이라는 `Initializer`가 없음에도 불구하고, `init(wrappedValue:maximum:)`과 동일하게
작동함을 알 수 있다.


#### 3. Projecting a Value From a Property Wrapper

우선 `Projection Mapping`이라는 용어를 알아보자.

> 프로젝션 매핑(Projection Mapping)은 대상물의 표면에 빛으로 이루어진 영상을 투사하여 변화를 줌으로써, 
> 현실에 존재하는 대상이 다른 성격을 가진 것처럼 보이도록 하는 기술이다.
> 
> [Wikipedia - 프로젝션 매핑](https://ko.wikipedia.org/wiki/프로젝션_매핑)

즉, *Projecting a Value From a Property Wrapper* 는 `Property Wrapper`를 이용해 현재의 *Instance* 에 
존재하지 않는 값을 존재하는 대상인 것처럼 보이도록 하는 것이란 것을 유추할 수 있다.

<br>

그리고 *Apple Developer Documentation* 에 `projectedValue`로 검색을 하면 다양한 곳에서 사용되는 것을 
볼 수 있는데, 다음 두 링크([Link 1][Link 1], [Link 2][Link 2])로부터 유추해보면

- `getter`, `setter`를 이용해 작동한다
- `super` 쪽 `value`를 `sub`쪽에 노출시킨다. 즉, 기본으로 노출되지 않는 상위 `hierarchy`의 정보를 접근하게 한다

로 요약할 수 있을 것 같다.

[Link 1]:https://developer.apple.com/documentation/swift/tasklocal/projectedvalue
[Link 2]:https://developer.apple.com/documentation/swiftui/binding/projectedvalue

다시 *Swift.org*로 돌아와보자. `Property Wrappers`는 `wrappedValue` 외에도 `projectedValue` 정의를 
이용해 추가적인 기능을 노출할 수 있다고 설명하는 부분을 어느정도 이해할 수 있다.

*Apple Developer Documentation* 에 *projectedValue* 를 정의하는 방법을 보면 어떤 Swift Library 그룹에 
속해있는지에 따라 코딩 형태가 다른 것으로 보인다. 우선 *Swift.org* 의 예제를 기준으로 설명하면 *Syntax* 는 아래와 같다. 

<br>

__Syntax__

```swift
@propertyWrapper
struct SomeStructure {
    private var someProperty: SomeType
    private(set) var projectedValue: Bool
    var wrappedValue: SomeType {
        get { someProperty }
        set { someProperty = newValue }
    }
}
```

> - `Class`, `Structure`, `Enumeration`를 이용해 정의하며 3가지 부분으로 나뉜다
>
> - `@propertyWrapper` Annotation 을 선언
> - `private(set) var` 변수 선언
> - `wrappedValue` 라는 이름을 갖는 [Computed Property](./properties.html#h-1-computed-properties)를 정의

<br>

위에서 정의한 *LengthOfSide* 에 `projectedValue`를 추가해 다시 정의해보자.

```swift
@propertyWrapper
struct LengthOfSide {
    private var maximum: Int
    private var length: Int
    private(set) var projectedValue: Bool = false
    
    var wrappedValue: Int {
        get { length }
        set {
            if newValue > maximum {
                length = maximum
                projectedValue = true
            } else {
                length = newValue
                projectedValue = false
            }
        }
    }
    
    init() {
        maximum = 10
        length = 0
    }
    
    init(wrappedValue: Int) {
        maximum = 10
        length = min(wrappedValue, maximum)
    }
    
    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        length = min(wrappedValue, maximum)
    }
}
```

```swift
struct HugeRectangle {
    @LengthOfSide(wrappedValue: 20, maximum: 20) var height: Int
    @LengthOfSide(maximum: 20) var width: Int = 25
}
```

```swift
var hugeRectangle = HugeRectangle()
print(hugeRectangle)
//HugeRectangle(_height: __lldb_expr_74.LengthOfSide(maximum: 20, length: 20),
//               _width: __lldb_expr_74.LengthOfSide(maximum: 20, length: 20))

print("height: \(hugeRectangle.height), width: \(hugeRectangle.width)") // height: 20, width: 20
```

*HugeRectangle Structure* 로부터 생성한 *hugeRectangle Instance* 를 출력해보았으나 기존의 *LengthOfSide* 와 
다를게 없어 보인다.

<br>

```swift
print(hugeRectangle.height)     // 20
print(hugeRectangle.$height)    // false
print(hugeRectangle.width)      // 20
print(hugeRectangle.$width)     // false
```

하지만 앞에 `$` 사인을 붙여주자 *Instance* 를 정의할 때에도 없고, 출력할 때에도 없는 값이 나타난다.   
이 값은 *HugeRectangle* 의 *Properties* 가 아닌 `LengthOfSide 의 Properties`다!

하지만 마치 *hugeRectangle Instance 의 Properties* 인 것 처럼 `투영`되어 보여진다!!

이제 `wrappedValue`를 이용해 값을 초과하도록 저장해보자.

```swift
hugeRectangle.width = 30
print(hugeRectangle.width)      // 20
print(hugeRectangle.$width)     // true
```

값이 초과되었고, `setter`에 정의한대로 *width* 는 *maximum* 값으로 보정해 저장되었다. 그리고 `projectedValue`는
`true`로 변경되었다.

> `Projecting`은 **Initializers** 에서는 동작하지 않는다. `@LengthOfSide(maximum: 20) var width: Int = 25` 
> 코드를 보면 마치 *25* 라는 값이 *Property Wrapper* 의 `set` 을 호출해 동작할 것 같지만 이것은 
> `@LengthOfSide(wrappedValue: 25, maximum: 20)`와 완전히 동일하게 동작할 뿐이다. 즉, *Instance* 가 생성된 
> 이후 정상적으로 동작한다.

<br>

*projectedValue* 는 다음과 같이 *Class*, *Structure*, *Enumeration* 의 내부 `context`에서도 사용할 수 있다.

```swift
enum Size {
    case small, large
}

struct SizedRectangle {
    @LengthOfSide var height: Int
    @LengthOfSide var width: Int

    mutating func resize(to size: Size) -> Bool {
        switch size {
        case .small:
            height = 10
            width = 20
        case .large:
            height = 100
            width = 100
        }
        return $height || $width
    }
}
```

```swift
var rectangle = SizedRectangle()
var resizeWasCalibrated = rectangle.resize(to: .small)

print(rectangle.height, rectangle.$height)  // 10 false
print(rectangle.width, rectangle.$width)    // 10 true
print(resizeWasCalibrated)                  // true
```

---

### 5. Global and Local Variables 👩‍💻

- Global Variables: *Functions*, *Methods*, *Closures*, *Type* Context 외부에 정의된 변수를 의미
- Local Variables: *Functions*, *Methods*, *Closures* Context 내부에 정의되 변수를 의미

#### 1. Stored Variables

`Stored Variables`는 `Stored Properties` 처럼 값을 저장하고 검색하는 것을 제공한다.

> *Global Constants* 와 *Global Variables* 는 항상 `lazily`하게 계산된다. 이는 *Lazy Stored Properties* 와
> 유사하다. 단, *Lazy Stored Properties* 와 다른 점은 `lazy` modifier 를 붙일 필요가 없다.
>
> 반면에 *Local Constants* 와 *Local Variables* 는 절대 `lazily`하게 계산되지 않는다.

#### 2. Computed Variables

*Global Variables* 와 *Local Variables* 모두 `Computed`를 사용할 수 있다.

#### 3. Variable Observers

*Global Variables* 와 *Local Variables* 모두 `Observer`를 사용할 수 있다.

#### 4. Variable Wrappers

`Property Wrappers`는 `Local Stored Variables`에만 적용 가능하다.  
*Global Variables* 또는 *Computed Variables* 에는 적용할 수 없다.

```swift
func someFunction() {
    @LengthOfSide var length: Int
    print(length)   // 0
    
    length = 5
    print(length)   // 5
    
    length = 12
    print(length)   // 10
}

someFunction()
```

---

### 6. Type Properties 👩‍💻

*C* 나 *Objective-C* 에서 *static constants*, *static variables* 를 정의하기 위해 `Global Static Variables` 
를 사용했다.

하지만 Swift 는 불필요하게 전역으로 생성되는 *Global Static Variables* 의 전역 변수 오염 문제를 해결하기 위해 
`Type Properties`를 제공한다. *Type Properties* 는 *Swift Types* 가 정의되는 `{ }` 내부 `context` 범위 
내에 정의되며, 그 `Scope` 범위 내에서만 사용 가능하다. 

#### 1. Type Property Syntax

*Global Static Variables* 와 마찬가지로 *Properties* 앞에 `static` 키워드를 사용한다.  
단, *Classes* 의 경우 *Computed Properties* 를 *Subclass* 에서 `overriding` 을 허용하려면 *Superclass* 에서 
`static` keyword 대신 `class` keyword 를 사용한다.

> `Type Properties`는 정의할 때 반드시 `Initiate Value`를 함께 정의해야한다.

<br>

- Structures

```swift
struct SomeStructure {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 1
    }
}
```

<br>

- Enumerations

```swift
enum SomeEnumeration {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 6
    }
}
```

<br>

- Classes

```swift
class SomeClass {
    static var someTypeProperty = "Initiate Value"
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

> computedTypeProperties 는 `static` keyword 를 사용헸지만 overrideableComputedTypeProperty 는 
> `class` keyword 를 사용해 Subclass 에서 overriding 하는 것을 허용했다.

#### 2. Querying and Setting Type Properties

__1 ) Difference between *Type Properties* and *Properties*__

아래와 같이 *AnotherStructure* 를 정의했다.

```swift
struct AnotherStructure {
    static var storedTypeProperty = "Apple"
    var storedProperty = "Pear"

    static var computedTypeProperty: Int { 1 }
    var computedProperty: Int { 10 }
}
```

<br>

- Type Properties

```swift
print(AnotherStructure.storedTypeProperty)   // Apple
print(AnotherStructure.computedTypeProperty) // 1

AnotherStructure.storedTypeProperty = "Melon"
print(AnotherStructure.storedTypeProperty)   // Melon
```

*Type Properties* 는 *Instance Properties* 와 동일하게 `dot Syntax`를 이용해 값에 접근하고 값을 저장한다.

<br>

- Instance Properties

```swift
var anotherStructure = AnotherStructure()
print(anotherStructure.storedProperty)       // Pear
print(anotherStructure.computedProperty)     // 10

anotherStructure.storedProperty = "Watermelon"
print(anotherStructure.storedProperty)       // Watermelon
```

*Instance Properties* 는 *Instance* 생성 전에는 접근할 수 없다.

<br>

```swift
var theOtherStructure = AnotherStructure()
print(theOtherStructure.storedProperty)      // Pear

print(AnotherStructure.storedTypeProperty)   // Melon
```

위에서 *anotherStructure* 가 `Instance Properties`를 수정한 것은 *theOtherStructure* 에 영향을 
미치지 않는다. 하지만 `AnotherStructure`의 `Type Properties`를 수정한 것은 `Type` 자체가 수정되었기 
때문에 *Apple* 이 아닌 *Melon* 을 출력한다.

<br>

__2 ) Audio Channel Examples__

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
        didSet {
            if currentLevel > AudioChannel.thresholdLevel {
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}
```

- thresholdLevel : 오디오가 가질 수 있는 볼륨 최대값을 정의 (상수 10)
- maxInputLevelForAllChannels : *AudioChannel Instance* 가 받은 최대 입력값을 추적(0에서 시작)
- currentLevel : 현재의 오디오 볼륨을 계산을 통해 정의

<br>

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

좌우 채널을 각각 *Instnace* 로 생성한다.

```swift
leftChannel.currentLevel = 7
print(leftChannel.currentLevel)     // 7
print(AudioChannel.maxInputLevelForAllChannels) // 7
```

왼쪽 볼륨을 7로 올리자 왼쪽 채널의 볼륨이 7로, *Type Property* *maxInputLevelForAllChannels* 역시 
7로 저장되었다.

```swift
rightChannel.currentLevel = 11
print(rightChannel.currentLevel)    // 10
print(AudioChannel.maxInputLevelForAllChannels) // 10
```

이번엔 오른쪽 볼륨을 11로 올리자 최대 레벨 제한에 의해 10으로 저장되고, 이에 따라 그 다음 *if statement* 에서
*maxInputLevelForAllChannels*가 10으로 저장되었다.

<br><br>

---
Reference

1. "Properties." The Swift Programming Language Swift 5.7. accessed Nov. 21, 2022, [Swift Docs Chapter 9 - Properties](https://docs.swift.org/swift-book/LanguageGuide/Properties.html).
2. "Projected Value." Apple Developer Documentation. accessed Nov. 25, 2022, [Apple Developer Documentation - Swift/Swift Standard Library/../projectedValue](https://developer.apple.com/documentation/swift/tasklocal/projectedvalue).
3. "Projected Value." Apple Developer Documentation. accessed Nov. 25, 2022, [Apple Developer Documentation - Swift/Swift UI/../projectedValue](https://developer.apple.com/documentation/swiftui/binding/projectedvalue).
4. "프로젝션 매핑." Wikipedia. Mar. 6, 2022, [프로젝션 매핑](https://ko.wikipedia.org/wiki/프로젝션_매핑).
