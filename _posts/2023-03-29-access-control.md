---
layout: post
title: Swift Access Control
subtitle: Manage the visibility of code by declaration, file, and module. 
categories: [swift]
tags: [swift docs, access control, access level, modules, source files, open, public, internal, fileprivate, private]
---

### 1. Access Control 👩‍💻

Access Control 은 다른 소스 파일과 모듈에서 코드에 접근하는 것을 제한한다. Access Control 을 이용해 코드를 은닉화(hiding) 하고 
접근할 수 있는 기본 인터페이스를 지정할 수 있다.

접근 수준은 Classes, Structures, Enumerations 단위로 제한하거나 이에 속해 있는 Properties, Methods, Initializers, 
Subscripts 단위로 제한하는 것 역시 가능하다. 또한 Protocols 는 특정 context 단위로 제한될 수 있다.

> 이 문서에서는 간결성을 위해 Properties, Types, Functions 등과 같이 Access Control 을 적용할 수 있는 것들을 `Entities`로 표현한다.

---

### 2. Modules and Source Files 👩‍💻

Swift 의 Access Control 은 `Modules`와 `Source Files`의 개념을 기초로 한다.

- Modules : **Single unit of code distribution**. 즉, 코드가 빌드되고 제공되는 Framework 또는 App 과 같은 코드의 배포 단위로
  `import` keyword 를 사용해 다른 모듈을 가져와 사용한다.
- Source Files : Modules 내의 **Single Swift Source Code File** 로 실제로 Framework 또는 App 내에 있는 Single File 을 
  의미하며, 일반적으로 서로 다른 Types 는 각각의 Source Files 에 정의하지만 *Swift 에서는 `Single Source Code File 에 여러 
  Types, Functions 등에 대한 정의를 포함`할 수 있다*.

---

### 3. Access Levels 👩‍💻

#### 1. Access Levels

Swift 는 코드 내에서 *Entities* 에 대해 5개의 다른 Access Levels 를 제공한다. 이 Access Levels 는 
`Modules > Source Files > Entities`의 Hierarchy 구조와 관련된다.

- Open : Framework Level, App 또는 Framework 를 공개된 인터페이스로 지정할 때 사용한다.  
  (**Public** 과 유사하지만 Open 은 <span style="color: red;">Classes 와 
  Class Members 에만 사용 가능</span>하며, <span style="color: red;">다른 모듈에서</span> Open 으로 정의된 Classes 와 
  Class Members 를 <span style="color: red;">**Subclassing**, **Overriding** 하는 것을 허용</span>한다.)
- Public : Framework Level, App 또는 Framework 를 공개된 인터페이스로 지정할 때 사용한다.   
- Internal : Application Level, 생략시 적용되는 기본 접근 레벨로, 동일 모듈 내에서 자유로운 접근이 가능하지만 외부 모듈의 접근은 제한된다. 
  따라서 App 또는 Framework 의 내부 구조를 정의할 때 사용한다.
- File-private : Application Level, Source File 내부로 접근을 제한한다.
- Private : Application Level, Source File 안에서도 정의를 둘러싼 context 로 내부로 접근을 제한한다.

#### 2. Guiding Principle of Access Levels

- `Public Variables`는 *Internal*, *File-private*, *Private* Types 로 정의될 수 없다. Public Variables 는 어디서나 
  사용될 수 있지만 Access Levels 를 이보다 낮은 수준으로 변경할 경우 그렇지 못하기 때문이다.
- `Functions`는 *Parameter* 와 *Return* Types 보다 높은 수준의 Access Levels 를 가질 수 없다.

#### 3. Default Access Levels

명시적으로 Access Levels 를 지정하지 않으면 Swift 는 default 로 `Internal`을 Access Levels 로 갖도록 한다. 따라서 대부분의 경우 
Access Levels 를 명시할 필요가 없다.

#### 4. Access Levels for Single-Target Apps

`Single-Target App`을 만들 때 앱의 코드는 앱 내에 포함되며 앱의 외부 모듈에서 사용하도록 만들 필요가 없다. Swift 에 의해 default 로 
지정되는 `Internal`은 이에 적합하므로 Access Levels 를 명시할 필요가 없다. 단, 앱의 모듈 내부 다른 코드에게 구현의 세부 내용을 가리기 위해 
`File Private`, `Private`을 이용해 Access Levels 를 제한하는 것이 가능하다.

#### 5. Access Levels for Frameworks

Framework 를 개발할 때 다른 모듈에서의 접근이 가능하도록 Framework 의 공용 인터페이스를 `open` 또는 `public`으로 표시한다.

> Framework 내의 헤부 구현은 Default Access Levels 인 `internal`을 사용할 수 있으며, Framework 내부에서도 다른 코드 부분에 
> 가리고자 하는 데이터는 `fileprivate` 또는 `private`을 명시할 수 있다. Framework 가 노출 시킬 API 에 해당하는 Entities 에만 
> `open`, `public`을 명시하면 된다.

#### 6. Access Levels for Unit Test Targets

Unit Test Targets 을 이용해 앱을 구현할 때 해당 코드는 테스트를 위해 Test 모듈 에서 사용할 수 있어야 한다. 하지만 일반적으로 `open` 또는 
`public`으로 선언되지 않은 Entities 는 다른 모듈에서 사용할 수 없다.

단, <span style="color: red;"> Unit Test Targets 에 한해 모듈을 import 할 때 앞에 `@testable` attribute 명시하면 해당 
모듈의 internal entities 에 접근이 가능</span>하다.

---

### 4. Access Control Syntax 👩‍💻

위에서 설명한 Access Levels 을 설정하기 위해 *open, public, internal, fileprivate, private* modifier 를 Entities 의 정의 앞에
명시하기 위한 Syntax 다.

```swift
public class SomePublicClass {}
internal class SomeInternalClass {}
fileprivate class SomeFilePrivateClass {}
private class SomePrivateClass {}

public var somePublicVariable = 0
internal let someInternalConstant = 0
fileprivate func someFilePrivateFunction() {}
private func somePrivateFunction() {}
```

그리고 위에서 internal 로 선언된 `SomeInternalClass`와 `someInternalConstant`는 별도로 명시하지 않고 default Access Levels 가
적용되도록 다음과 같이 선언할 수 있다.

```swift
class SomeInternalClass {}              // implicitly internal
let someInternalConstant = 0            // implicitly internal
```

---

### 5. Custom Types 👩‍💻

#### 1. Custom Types

User Custom Types 를 정의할 때 Access Levels 정의하고 싶다면 Types 를 정의할 때 지정해야한다. Types 자체에 대한 Access Levels 는
해당 Types 가 갖는 Members(Properties, Methods, Initializers, Subscripts) 의 default Access Levels 에도 영향을 미친다.

- Types 를 `fileprivate`으로 정의하면, 그 Members 역시 `fileprivate`이 된다.
- 단, <span style="color: red;">Types 를 `public`으로 정의하더라도 그 Members 는 `internal`</span>이다. 이는 실수로 모듈의 API 가
  아닌 코드 부분이 노출되는 것을 예방하기 위함이다.

> __<span style="color: orange;">Access Levels</span>__
> 
> - (open, public) Types = <span style="color: red;">internal</span> Members
> - (internal, fileprivate, private) Types = Members 

```swift
public class SomePublicClass {                      // explicitly public class
    public var somePublicProperty = 0               // explicitly public class member
    var someInternalProperty = 0                    // implicitly internal class member
    fileprivate func someFilePrivateMethod() {}     // explicitly file-private class member
    private func somePrivateMethod() {}             // explicitly private class member
}

class SomeInternalClass {                           // implicitly internal class
    var someInternalProperty = 0                    // implicitly internal class member
    fileprivate func someFilePrivateMethod() {}     // explicitly file-private class member
    private func somePrivateMethod() {}             // explicitly private class member
}

fileprivate class SomeFilePrivateClass {            // explicitly file-private class
    func someFilePrivateMethod() {}                 // implicitly file-private class member
    private func somePrivateMethod() {}             // explicitly private class member
}

private class SomePrivateClass {                    // explicitly private class
    func somePrivateMethod() {}                     // implicitly private class member
}
```

#### 2. Tuple Types

- Tuples 는 *Classes, Structures, Enumerations, Functions* 와 달리 ***독립적인 정의가 없다***
- Tuples 의 Access Levels 는 구성된 Types 로부터 <span style="color: orange;">자동</span>으로 정해지며, 
  ***명시적으로 지정할 수 없다***.
- Tuples 의 Access Levels 는 ***<span style="color: red;">구성된 Types 중 가장 낮은 수준의 Access Levels</span> 로 자동으로 
  정해진다***.

> __<span style="color: orange;">Access Levels</span>__
> 
> - Tuples ≤ min(Types1, Types2)

따라서 `internal`과 `private`으로 구성된 Tuples 의 Access Levels 는 `private`이 된다.

#### 3. Function Types

- Functions 의 Access Levels 는 ***<span style="color: red;">Parameter Types 와 Return Types 중 가장 낮은 수준의 
  Access Levels</span> 로 계산***되며, context 의 Access Levels 와 일치하지 않는다면 <span style="color: orange;">명시적</span>으로 지정해야한다.

> __<span style="color: orange;">Access Levels</span>__
> 
> - Functions ≤ min(Parameters, Returns)

<br>

__1 ) Context 의 Access Levels 와 일치하는 경우__

```swift
struct SomeInternalStructure {
    func someFunction() -> (SomeInternalClass, SomeInternalClass) {
        (SomeInternalClass(), SomeInternalClass())
    }
}
```

> **context** 의 Access Levels 가 `internal`, **Function Parameter Types 와 Return Types** 의 Access Levels 가 
> `internal` 이므로 함수는 암시적으로 `internal`로 정의된다.
<br>

```swift
private struct SomePrivateStructure {
    func someFunction() -> (SomePrivateClass, SomePrivateClass) {
        (SomePrivateClass(), SomePrivateClass())
    }
}
```

> **context** 의 Access Levels 가 `private`, **Function Parameter Types 와 Return Types** 의 Access Levels 가 
> `private` 이므로 함수는 암시적으로 `private`으로 정의된다.

<br>
__2 ) Context 의 Access levels 와 일치하지 않는 경우__

```swift
struct SomeInternalStructure {
    func someFunction() -> (SomeInternalClass, SomePrivateClass) {
        (SomeInternalClass(), SomePrivateClass())
    }  // error: method must be declared fileprivate because its result uses a private type
}
```

> **context** 의 Access Levels 는 `internal`인데, **Function Parameter Types 와 Return Types** 중 낮은 Access Levels 가 
> `private`이므로 Access Levels 을 다음과 같이 명시적으로 **fileprivate** 또는 **private** 으로 지정해야한다.

```swift
struct SomeInternalStructure {
    fileprivate func someFunctionFirst() -> (SomeInternalClass, SomePrivateClass) {
        (SomeInternalClass(), SomePrivateClass())
    }
    private func someFunctionSecond() -> (SomeInternalClass, SomePrivateClass) {
        (SomeInternalClass(), SomePrivateClass())
    }
}

let some = SomeInternalStructure()
some.someFunctionFirst()
some.someFunctionSecond()   // 'someFunctionSecond' is inaccessible due to 'private' protection level
```

> 가장 낮은 Access Levels 는 **private** 이지만 **fileprivate** 까지는 허용이 되는 것으로 보인다. 물론, 함수를 정의할 때 
> **Function Parameter Types 와 Return Types** 에 대해 private 보다 높은 fileprivate 이 허용된다는 것을 의미하는 것일 뿐 
> fileprivate 으로 선언하면 같은 파일에서 접근이 가능하므로 해당 Types 외부에서 볼 때는 private 과 다른 Access Levels 를 갖게 된다. 

#### 4. Enumeration Types

- Enumerations 의 Cases 역시 Enumerations 의 Access Levels 를 자동으로 받는다.
- Enumerations 의 Cases 는 Classes 나 Structures 의 Members 와 달리 <span style="color: red;">Access Levels 를 지정할 
  수 없다</span>.
- Enumerations 에 사용된 [Associated Values], [Raw Values] 는 **Enumerations 의 Access Levels 과 같거나 높은 수준의 
  Access Levels 를 가져야 한다**.

> __<span style="color: orange;">Access Levels</span>__
>
> - <span style="color: red;">Cases 의 Access Levels 수정 불가</span>
> - Enumerations = Cases
> - Enumerations ≤ Associated Values
> - Enumerations ≤ Raw Values

#### 5. Nested Types

- Nested Types 역시 context 의 Access Levels 를 자동으로 받는다.
- 단, Public Types 의 Nested Types 는 `internal`이다. (cf. [Custom Types](#h-1-custom-types))

> __<span style="color: orange;">Access Levels</span>__
> 
> - (open, public) Context Types = <span style="color: red;">internal</span> Nested Types
> - (internal, fileprivate, private) Context Types = Nested Types

---

### 6. Subclassing 👩‍💻

- **동일 모듈**일 경우 현재 *context* 가 접근 가능한 ***어떤 Class 든 Subclassing*** 해 Members 를 Overriding 할 수 있다.
- **다른 모듈**의 경우 대상이 ***Open Class 라면 Subclassing*** 해 Members 를 Overriding 할 수 있다..
- <span style="color: red;">Subclass 는 상위 Class 보다 높은 Access Levels 를 가질 수 없다</span>.

> __<span style="color: orange;">Access Levels</span>__
> 
> - Subclass ≤ Superclass
> - <span style="color: green">Overriding 을 이용해 Subclass Members 의 Access Levels 를 Superclass 보다 높게 
>   설정이 가능</span>하다.

<br>

_**Overriding** 을 이용해 해당 Class Member 를 보다 액세스 하기 쉽도록 만들 수 있다._

```swift
public class A {
    fileprivate func someMethod() {}
}

internal class B: A {
    override internal func someMethod() {}
}
```

```swift
public class A {
    fileprivate func someMethod() {}
}

internal class B: A {
    override internal func someMethod() {
        super.someMethod()
    }
}
```

> - Subclassing 된 `Subclass B`는 `Superclass A` 보다 높지 않은 Access Levels 를 가져야 한다는 조건을 만족한다.
> - Subclassing 을 통해 Subclass B 는 `fileprivate`으로 정의된 `someMethod()`의 Access Levels 를 Overriding 을 통해
    `internal`로 높여 보다 엑세스 하기 쉽게 만들었다.

---


### 7. Members 👩‍💻

#### 1. Constants, Variables, Properties, and Subscripts

- 선언되는 Constants, Variables, Properties 는 할당하려는 Types 보다 높은 수준의 Access Levels 를 가질 수 없다.
- 유사하게 Subscripts 는 *Index Types* 또는 *Return Types* 보다 높은 수준의 Access Levels 를 가질 수 없다.

> __<span style="color: orange;">Access Levels</span>__
> 
> - Constants, Variables, Properties ≤ Types to assignment
> - Subscripts ≤ min(Index, Return)

<br>

```swift
var internalInstance = SomePrivateClass()   // Variable must be declared private or fileprivate because its type 'SomePrivateClass' uses a private type
fileprivate var fileprivateInstance = SomePrivateClass()
private var privateInstance = SomePrivateClass()
```

> `Private Types`를 할당하므로 선언되는 Variables 는 `private` 보다 높은 수준의 Access Levels 를 가질 수 없으므로 반드시
> `private`으로 선언되어야 한다.

> [Function Types](#h-3-function-types) 에서 본 것과 마찬가지로 **private** 이 예상되는 곳에 **fileprivate** 까지는 허용이 
> 되는 것으로 보인다.  

#### 2. Getters and Setters

- Constants, Variables, Properties, Subscripts 에 대한 `Getters`와 `Setters`는 속해 있는 대상의 Access Levels 를 자동으로 받는다.
- `Setters`의 Access Levels 를 `Getters`의 Access Levels 보다 낮게 제한하기 위해 `fileprivate(set)`, `private(set)` 또는
  `inernal(set)`을 작성해 더 낮은 접근 수준을 할당할 수 있다.

> Stored Properties 에 대해 명시적으로 **Getters** 와 **Setters** 를 작성하지 않아도 Swift 는 내부적으로 Stored Properties 의
> `Backing Storage`에 대한 접근을 제공하기 위해 암시적으로 **Getters** 와 **Setters** 를 제공한다.

> __<span style="color: orange;">Access Levels</span>__
> 
> - Getters, Setters of (Constants, Variables, Properties, Subscripts) ≤ Constants, Variables, Properties, Subscripts
> - Getters = Constants, Variables, Properties, Subscripts
> - Setters ≤ Setters

> [Function Types](#h-3-function-types), 
> [Constants, Variables, Properties, and Subscripts](#h-1-constants-variables-properties-and-subscripts) 에서 
> 암시적으로 **private** 이 요구되는 곳에 **fileprivate** 을 사용하는 것이 허용되었으나 Setter 의 경우 좀 더 엄격하게 이를 지킨다. 
> 즉, <span style="color: red;">private 에 fileprivate 'Setters' 는 허용되지 않는다</span>.

<br>

`fileprivate(set)`, `private(set)`, `inernal(set)` 이 제공하는 기능이 어떤식으로 작동하는지 살펴보자.

<br>

__1 ) Getters: internal, Setters: internal__

```swift
class SomeClass {
    var id: String = ""
}
```

위와 같이 정의된 SomeClass 는 내부적으로 다음과 같은 방식으로 작동한다.

```swift
class SomeClass {
    private var _id: String = ""
    var id: String {
        get {
            _id
        }
        set {
            _id = newValue
        }
    }
}
```

```swift
let someClass = SomeClass()

someClass.id = "A"
print(someClass.id)  // A
```

<br>

__2 ) Getters: internal, Setters: private__

따라서 우리는 Getters 는 internal 의 Access Levels 를 갖고, Setters 는 private 의 Access Levels 를 갖도록 하기 위해 다음과 같이
직접 구현할 수 있다.

```swift
class SomeClass {
    private var _id: String = ""
    var id: String {
        get {
            _id
        }
    }
    func setId(_ id: String) {
        self._id = id
    }
}
```

```swift
let someClass = SomeClass()

someClass.id = "A"   // error: cannot assign to property: 'id' is a get-only property
someClass.setId("A")
print(someClass.id)  // A
```

Getters 는 internal 의 Access Levels 를 갖기 때문에 외부에서 접근이 가능하지만, Setters 는 private 의 Access Levels 를 갖기 때문에
내부에서만 접근이 가능해 `setId(_:)`메서드를 이용한 접근만 허용된다.

<br>

__3 ) internal private(set)__

Swift 는 위와 같이 작동되는 서로 다른 Access Levels 를 갖는 Properties 를 다음과 같이 정의할 수 있다.

```swift
class SomeClass {
    internal private(set) var id: String = ""

    func setId(_ id: String) {
        self.id = id
    }
}
```

`internal` Variables 에 Setters 의 Access Levels 를 `private`으로 선언하면 Swift 가 이에 맞게 Compile 한다.  
(internal Variables 의 Getters 는 internal 이다.)

```swift
let someClass = SomeClass()

someClass.id = "A"   // error: cannot assign to property: 'id' is a get-only property
someClass.setId("A")
print(someClass.id)  // A
```

<br>

__4 ) private(set)__

그런데 `SomeClass` Types 의 Access Levels 가 internal 이다.

앞에서 설명했듯이 Types 의 Access Levels 가 *Open* 또는 *Public* 일 경우 Properties 가 암시적으로 *Internal* 이 되지만 Types 의
Access Levels 가 *Internal* 이하일 경우 Properties 는 암시적으로 Types 의 Access Levels 를 받게 된다.  
따라서 Properties 가 암시적으로 Types 의 Access Levels 를 받도록 생략하고 Setters 의 Access Levels 만 지정해 
짧은 형태로 정의할 수 있다.

`internal private(set)` -> `private(set)`

```swift
class SomeClass {
    private(set) var id: String = ""

    func setId(_ id: String) {
        self.id = id
    }
}
```

```swift
let someClass = SomeClass()

someClass.id = "A"   // error: cannot assign to property: 'id' is a get-only property
someClass.setId("A")
print(someClass.id)  // A
```

결국 Stored Properties 는 Backing Storage 에 대한 접근을 Access Levels 에 따라 제공하기 위해 Computed Properties 와 유사한
형태의 구현을 암시적으로 제공하고 있다는 것을 알 수 있다.

> 즉, Access Levels 를 관리하기 위해 사용되는 `Getters`와 `Setters`는 명시적으로 구현을 하든 암시적으로 구현이 되든 
> **Stored Properties** 와 **Computed Properties** 모두에 적용된다.

<br>

다음 예제는 'value' 가 바뀔 때마다 변경 횟수를 카운트 하는 'numberOfEdits' 가 1씩 증가하도록 'value' 자신에게 Observer 를 사용하고, 
numberOfEdits 는 내부에서만 접근이 가능하도록 `private(set)`을 이용해 정의하였다.

```swift
struct TrackedString {
    private(set) var numberOfEdits = 0
    var value: String = "" {
        didSet {
            numberOfEdits += 1
        }
    }
}
```

```swift
var tracking = TrackedString()
print(tracking.numberOfEdits)   // 0
tracking.value = "A"
print(tracking.numberOfEdits)   // 1
tracking.value = "B"
print(tracking.numberOfEdits)   // 2
tracking.value += "C"
print(tracking.numberOfEdits)   // 3
```

---

### 8. Initializers 👩‍💻

#### 1. Initializers

- Custom Initializers 는 Types 보다 높은 수준의 Access Levels 를 가질 수 없다.
- 단, Required Initializers 는 Types 는 자신이 속한 Class 와 동일한 Access Level 을 가져야한다.
- Functions 와 마찬가지로 *Parameters* 보다 높은 수준의 Access Levels 를 가질 수 없다.
  (e.g. [Guiding Principle of Access Levels](#h-2-guiding-principle-of-access-levels),
  [Function Types](#h-3-function-types))

> __<span style="color: orange;">Access Levels</span>__
>
> - Custom Initializers ≤ Types
> - [Required Initializers] = Types
> - Initializers ≤ Parameters

#### 2. Default Initializers

[Default Initializers] 가 생성되는 조건을 만족할 경우 다음과 같은 Access Levels 를 갖는다.

> __<span style="color: orange;">Access Levels</span>__
>
> - (internal, fileprivate, private) Default Initializers == Types
> - (open, public) Default Initializers = internal

> (open, public) Types 에 의해 생성되는 Default Initializers 는 `internal`이다. 따라서 외부 모듈에 arguments 가 없는
> (open, public) Initializers 를 제공해야 하는 경우 **명시적으로 `no-argument Initializer`를 정의**해야한다.

#### 3. Default Memberwise Initializers for Structure

> __<span style="color: orange;">Access Levels</span>__
>
> - Structures 의 모든 Stored Properties 가 private -> Default Memberwise Initializers 는 private
> - Structures 의 모든 Stored Properties 가 fileprivate -> Default Memberwise Initializers 는 fileprivate
> - 그 외 -> Default Memberwise Initializers 는 internal

> Default Initializers 와 마찬가지로 외부 모듈에 Memberwise Initializers 를 제공해야 하는 경우 **명시적으로
> `Public Memberwise Initializers`를 정의**해야한다.

---

### 9. Protocols 👩‍💻

#### 1. Protocols

- Protocols 의 기본 Access Levels 는 internal 이다.
- Protocols 의 Types 에 명시적으로 Access Levels 를 제한해 특정 context 내에서만 채택(adoption)될 수 있도록 할 수 있다.

> __<span style="color: orange;">Access Levels</span>__
>
> - Requirements = Protocols
> - <span style="color: red;">Requirements 의 Access Levels 를 Protocols 와 다르게 변경할 수 없다</span>.
> - 다른 Types 와 다르게 Protocols 가 <span style="color: red;">(open, public) 일 때 Requirements 역시 동일한
    (open, public)</span> Access Levels 를 갖는다.

#### 2. Protocol Inheritance

> __<span style="color: orange;">Access Levels</span>__
>
> - Sub Protocols ≤ Super Protocols

#### 3. Protocol Conformance

> __<span style="color: orange;">Access Levels</span>__
>
> - Protocols ≤ Types
> - Requirements = min(Types, Protocols)

```swift
protocol SomeProtocol {
    var protocolProperty: Int { get }
}

protocol SomePrivateProtocol {
    var privateProtocolProperty: Int { get }
}

struct SomeStructure: SomeProtocol, SomePrivateProtocol {
    var protocolProperty: Int
    var privateProtocolProperty: Int
}

var some = SomeStructure(protocolProperty: 10, privateProtocolProperty: 30)
print(some.protocolProperty)  // 10
some.protocolProperty = 5
print(some.protocolProperty)  // 5

print(some.privateProtocolProperty) // 30
some.privateProtocolProperty = 50
print(some.privateProtocolProperty) // 50
```

Setters 를 제외한 다른 경우와 마찬가지로 Protocols 가 private 이어도 실제 Requirements 는 fileprivate 까지는 허용이 되는 것으로 보인다.

> Objective-C 와 마찬가지로 Protocols 의 `Conformance`는 Global 이다. 한 프로그램 내에서 서로 다른 방법으로 Protocol 을 준수하는
> 것은 불가능하다.

---

### 10. Extensions 👩‍💻

#### 1. Extensions

Classes, Structures, Enumerations 를 확장하면 *기존 Types 의 Members 가 갖는 default Access Levels 를 동일*하게 갖는다.  
Extensions 에 Access Levels 를 정의하면, Extensions 에 의해 추가되는 기능에 대해 암시적으로 정의되는 Access Levels 를 변경할 수 있다.

> __<span style="color: orange;">Access Levels</span>__
>
> - Extensions ≤ Types
> - <span style="color: red;">(open, public) Types 를 Extensions -> internal Members</span>
> - (internal, fileprivate, private) Types 를 Extensions -> (internal, fileprivate, private) Members

```swift
struct SomeStruct {
    var number: Int
    func double() -> Int { self.number * 2 }
}

private extension SomeStruct {
    func triple() -> Int { self.number * 3 }
}


var some = SomeStruct(number: 5)
some.number     // 5
some.double()   // 10
some.triple()   // 15
```

Extensions 를 private 으로 정의하면, Extensions 에 의해 추가되는 기능은 private 으로 정의된다(물론 위 다른 경우와 마찬가지로 
fileprivate 은 허용이 되는 것으로 보인다).

#### 2. Private Members in Extensions

*Extensions 이 Classes, Structures, Enumerations 와 `같은 파일에 존재`할 경우*, 
<span style="color: red;">Original 과 Extensions 는 처음부터 단일 Original Types 에 정의된 것처럼 작동</span>한다.

```swift
struct Origin {
    private let originNumber = 5
    func printExtensionNumber() { print(doubleNumber) }
}

extension Origin {
    private var doubleNumber: Int { originNumber * 2 }
    func printAnotherExtensionNumber() { print(tripleNumber) }
}

extension Origin {
    private var tripleNumber: Int { originNumber * 3 }
    func printOriginNumber() { print(originNumber) }
}

var someStructure = Origin()
someStructure.printExtensionNumber()        // 10
someStructure.printAnotherExtensionNumber() // 15
someStructure.printOriginNumber()           // 5
```

---

### 11. Generics 👩‍💻

Generic Types 또는 Generic Functions 의 Access Levels 는 자기 자신 또는 [Type Parameters] 의 Constraints 중 최솟값으로 
정해진다.

> __<span style="color: orange;">Access Levels</span>__
> 
> Generic Types, Generic Functions = min(itself, Type Parameters)

---

### 12. Type Aliases 👩‍💻

`Type Aliases` 역시 Swift 의 다른 Types 와 마찬가지로 고유한 Types 가 된다. 따라서 Type Aliases 를 사용해 기존 Types 의 
Access Levels 를 Original 과 같거나 낮게 변경해 고유의 Types 를 만들 수 있다.

> __<span style="color: orange;">Access Levels</span>__
> 
> Type Aliases ≤ Types

```swift
struct SomeStruct {
    var number: Int
    func double() -> Int { self.number * 2 }
}

private typealias PrivateStruct = SomeStruct
public typealias PublicStruct = SomeStruct  // Type alias cannot be declared public because its underlying
```

Original Types 가 internal 이기 때문에 public 으로 Access Levels 를 더 개방하는 것은 불가능하다.

```swift
var privateStruct = PrivateStruct(number: 5) // error: variable must be declared private or fileprivate because its type 'PrivateStruct' (aka 'SomeStruct') uses a private type
```

Private Types 이므로 Internal Variables 에 할당할 수 없다.

```swift
private var privateStruct = PrivateStruct(number: 5)
privateStruct.number    // 5
privateStruct.double()  // 10
```

> 이 Rule 은 Protocols 의 준수성(conformances)를 충족하도록 하는데 사용되는 [Associated Types] 에도 적용된다.

<br><br>

---
Reference

1. "Access Control." The Swift Programming Language Swift 5.7. accessed Mar. 29, 2023, [Swift Docs Chapter 26 - Access Control](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol).

[Associated Values]:/swift/2022/11/01/enumerations.html#h-4-associated-values-
[Raw Values]:/swift/2022/11/01/enumerations.html#h-5-raw-values-
[Required Initializers]:/swift/2022/12/01/initialization.html#h-7-required-initializers--
[Default Initializers]:/swift/2022/12/01/initialization.html#h-3-default-initializers-
[Type Parameters]:/swift/2023/02/23/generics.html#h-3-type-parameters-t
[Associated Types]:/swift/2023/02/23/generics.html#h-5-associated-types-
