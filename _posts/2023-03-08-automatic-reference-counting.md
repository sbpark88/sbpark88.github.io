---
layout: post
title: Swift Automatic Reference Counting
subtitle: Model the lifetime of objects and their relationships. 
excerpt_image: NO_EXCERPT_IMAGE
categories: [swift]
tags: [swift docs, arc, automatic reference counting, strong reference cycle, zero strong references, memory leak, weak reference, unowned reference, capture list]
---

### 1. Automatic Reference Counting 👩‍💻

Swift 는 `Automatic Reference Counting (ARC)`를 사용해 앱의 메모리 사용을 관리하고 추적한다. 대부분의 경우 Swift 에서 개발자는
메모리를 관리할 필요가 없다. 이에 대해 Apple 은 이렇게 말한다. `just work`.

*ARC* 는 `Class Instance` 가 더 이상 필요하지 않을 때 `메모리 할당을 해제(free up)`한다 
([Deinitialization](/swift/2022/12/19/deinitialization.html) 이 호출됨을 의미).  

그러나 일부 경우 ARC 는 메모리를 관리하기 위해 코드 관계에 대한 추가 정보를 요구한다. Swift 에서 ARC 를 사용하는 것은 Objective-C 에서
ARC 사용에 대한 [Transitioning to ARC Release Notes] 에서 설명한 접근 방식과 유사하다.

> `Reference counting`은 `Class Instance`에만 적용된다. **Structures** 와 **Enumerations** 는 **Value Types**이다.

---

### 2. How ARC Works 👩‍💻

*Class* 의 `new Instance`가 생겨날 때마다, *ARC* 는 *Instance 의 정보를 저장하기 위해 `메모리 청크를 할당
(allocates a chunk of memory)`한다. 이 메모리는 `Instance 의 Type 에 대한 정보`와 `Instance 와 연관된 Stored Properties 
의 값에 대한 정보(pointer)`를 갖는다.

반대로 더 이상 *Class Instance* 가 필요하지 않을 경우, ARC 는 Instance 에 사용되고 있던 `메모리 할당(free up the memory)을 해제`해
다른 프로세스가 사용할 수 있도록한다.

만약 *ARC 가 아직 사용중인 Instance 의 메모리 할당을 해제*하면, `더 이상 Instance 의 Properties, Methods 에 접근할 수 없어
앱에 crash 가 발생`한다.

따라서 ARC 는 아직 사용중인 *Instances* 가 메모리 해제되지 않도록, 각 `Class Instance 가 얼마나 많은 Properties, Constants,
Variables 를 참조(referring)하고 있는지 추적`해 단 하나의 참조(reference)라도 유효하다면 Instance 의 할당을 
`해제(deallocate)하지 않는다`.

이것을 가능하도록 하기 위해 ARC 는 `Class Instance 를 Properties, Constants, Variables 에 할당할 때마다 이들 사이에 강한 참조
(strong reference)를 만든다`. "strong" 이라는 단어가 사용된 이유는 해당 *Instances* 가 남아있는 한 ARC 는 메모리 할당 해제를 
허용하지 않기 때문이다.

---

### 3. ARC in Action 👩‍💻

*ARC* 의 동작을 확인하기 위해 *Person* 이라는 Class 를 하나 생성한다.

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}
```

<br>
다음으로 `Person?` Types 의 변수를 3개 생성한다. Optional Types 이므로 해당 변수 3개는 `nil` value 로 초기화 된다.

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
```

<br>
`new Person` instance 를 하나 생성해 `reference1` 변수에 할당한다.

```swift
reference1 = Person(name: "John Appleseed")
```

```console
John Appleseed is being initialized
```

이제 `reference1` 변수가 `Person(name: "John Appleseed")` instance 를 *Strong References* 로 갖는다. 따라서 ARC 는
이 `Person(name: "John Appleseed")`에 대한 *Strong References* 를 `+1 시켜 1개를 기억`해 이 *Instance* 가 메모리에
유지되고, deallocated 되지 않도록 한다.

<br>

```swift
reference2 = reference1
```

이제 `reference2` 변수 역시 `Person(name: "John Appleseed")` instance 를 *Strong References* 로 가져 이들 사이에도
*Strong References* 가 생성되었다. 따라서 ARC 는 `Person(name: "John Appleseed")`에 대한 *Strong References* 를
`+1 시켜 2개를 기억`한다.

> 그리고 여기서 중요한 것은 `new Instance`를 생성하는 것이 아닌 `Original Instance 의 Reference 를 공유`하는 것이기 때문에
> Initializer 는 호출되지 않는다.

<br>

```swift
reference3 = reference1
```

마찬가지로 이제 `Person(name: "John Appleseed")`에 대한 *Strong References* 는 3개가 생성되었다.

<br>

3개의 *Strong References* 중 *Original Reference* 를 포함해 2개를 끊어보자(break).

```swift
reference1 = nil
reference2 = nil
```

> ARC 는 `Person(name: "John Appleseed")`에 대한 **Strong References** 를 `-2 시켜 1개를 기억`한다. 따라서 아직
> 이 `Instance 가 메모리에 유지되고, deallocated 되지 않도록 한다`.

<br>

마지막 남은 *Strong References* 역시 끊어보자.

```swift
reference3 = nil
```

```console
John Appleseed is being deinitialized
```

> ARC 는 `Person(name: "John Appleseed")`에 대한 **Strong References** 를
> `-1 시켜 존재하지 않음을 확인(zero strong references)`한다.  
> 따라서 이제 Instance 는 deallocated 되어 Deinitializer 가 호출된다.

---

### 4. Strong Reference Cycles Between Class Instances 👩‍💻

위에서 ARC 가 어떻게 동작하고, Instance 를 메모리에 유지하는지 확인했다.

이번에는 *Strong References* 가 절대로 *zero strong references* 에 도달하지 않는 코드의 예를 보려 한다. 이는 `두 개의 Classes 가
서로에 대한 Strong References 를 갖는 경우 발생`한다. 두 Instances 를 동시에 해제(deallocate)할 수 없어 각 Instances 는 서로를
유지시킨다.

해당 Case 를 확인하기 위해 *Person* 과 *Apartment* 라는 Classes 를 아래와 같이 생성한다.

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

- `Person` class 는 초기값으로 `nil`을 갖는 `Apartment?`를 Properties 로 갖는다.
- `Apartment` class 는 초기값으로 `nil`을 갖는 `Person?`을 Properties 로 갖는다.

<br>

위와 마찬가지로 변수를 선언한다.

```swift
var john: Person?
var unit4A: Apartment?
```

```swift
john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
```

변수 `unit4A`은 `Apartment(unit: "4A")` instance 를 *Strong References* 로 갖는다.

![Strong Reference Cycle 1](/assets/images/posts/2023-03-08-automatic-reference-counting/referenceCycle01~dark@2x.png){: width="800"}

<br>
Person 은 Apartment 를 갖도록, Apartment 는 Person 을 갖도록 할 수 있다. 이 둘이 서로의 Instances 를 *Strong References* 로 
갖도록 해보자.

```swift
john?.apartment = unit4A
unit4A?.tenant = john
```

![Strong Reference Cycle 2](/assets/images/posts/2023-03-08-automatic-reference-counting/referenceCycle02~dark@2x.png){: width="800"}

이제 `Person(name: "John Appleseed")`은 변수 `john`과 `Apartment(unit: "4A")` instance 의 변수 property `tenant`에 
의해 참조되어 ARC 는 2개의 *Strong References* 가 존재함을 확인한다. 반대의 경우도 마찬가지로 `Apartment(unit: "4A")` instance 
역시 ARC 는 2개의 *Strong References* 가 존재함을 확인한다.

<br>
변수 `john`과 `unit4A`가 갖는 *Strong References* 를 끊어보자.

```swift
john = nil
unit4A = nil
```

![Strong Reference Cycle 3](/assets/images/posts/2023-03-08-automatic-reference-counting/referenceCycle03~dark@2x.png){: width="800"}

```console
// Nothing
```

서로가 서로를 *Strong References* 로 참조하고 있기 때문에 두 Instances 는 절대로 `Zero Strong References`에 도달할 수 없다.

만약 이걸 끊어내려면 서로에 대한 *Strong References* 를 먼저 끊어야한다.

```swift
john?.apartment = nil
unit4A?.tenant = nil

john = nil
unit4A = nil
```

```console
Apartment 4A is being deinitialized
John Appleseed is being deinitialized
```

하지만 이 방법은 위험한 방법이다. 개발자가 이를 놓치거나 로직 순서상 또는 예기치 못한 에러 등으로 인해 변수 `john`이나 `unit4A`가 갖는 
*Strong References* 만 끊어질 경우 더이상 메모리를 해제할 수 없는 상태가 되므로 `Memory Leak`이 발생한다.

---

### 5. Resolving Strong Reference Cycles Between Class Instances 👩‍💻

#### 1. How Resolve Strong Reference Cycles

Swift 는 위와 같은 *Strong Reference Cycles* 문제를 해결하기 위해 2가지 방법 `Weak References`와 `Unowned References`를 
제공한다. 이를 사용해 참조하면 *Reference Cycles* 의 한 Instance 가 강한 유지 없이 다른 Instance 를 참조할 수 있다. 그러면 
*Reference Cycles* 의 한쪽의 참조가 *Strong References* 가 아니게 되므로 *Strong Reference Cycles* 없이 서로를 참조할 수 
있고, 필요 없어졌을 때 연결 고리를 끊어내고 메모리를 해제할 수 있게 된다.

> - 참조하는 Instance 가 `Short Lifetime`을 갖는 경우 `Weak References`를 사용한다.
> - 참조하는 Instance 가 `Same Lifetime` 또는 `Long Lifetime`을 갖는 경우 `Unowned References`를 사용한다.

이를 이용하면 *Strong References 없이 서로에 대한 `Reference Cycles`를 가질 수 있다*.

#### 2. Weak References

위 예제의 경우 Apartment 는 tenant 가 있을 수도, 없을 수도 있다고 하자. 그렇다면 Apartment 에 비해 tenant 에 할당되는 Person 의 
*Lifetime* 이 Short Lifetime 을 가지므로 `tenant 를 Weak References`로 바꾸는 것이 적절하다.

*Weak References* 는 Instance 를 강하게 유지(strong hold)하지 않는 참조이므로 *ARC* 는 Instance 가 `해제(deallocate)`되는 것을 
막지 않는다.

> **Property Observers** 는 `ARC 가 Weak Reference 에 nil 을 설정(set)할 때 호출되지 않는다`.

<br>

아래 예제는 위와 거의 동일하지만, 이번에는 *Apartment 의 tenant 를 `Weak Reference`로 선언*했다.

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

```swift
var john: Person?
var unit4A: Apartment?

john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
```

변수 `unit4A`은 `Apartment(unit: "4A")` instance 를 *Strong References* 로 갖는다.

<br>

위 예제와 마찬가지로 이 둘이 서로의 Instances 를 참조하도록 *Reference Cycles* 를 만들어보자.

```swift
john?.apartment = unit4A
unit4A?.tenant = john
```

![Weak References 1](/assets/images/posts/2023-03-08-automatic-reference-counting/weakReference01~dark@2x.png){: width="800"}

<br>
위와 마찬가지로 변수 `john`과 `unit4A`가 갖는 *Strong References* 를 끊어보자.

- Set `nil` to `unit4A` variable

```swift
print(unit4A as Any)                // Optional(__lldb_expr_13.Apartment)

unit4A = nil
print(unit4A as Any)                // nil
```

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    print(john?.apartment as Any)   // Optional(__lldb_expr_13.Apartment)
}
```

변수 `unit4A`의 *Strong References* 는 끊어졌지만 `Person(name: "John Appleseed")`이 `Apartment(unit: "4A")` 
instance 를 *Strong References* 로 갖고 있기 때문에 `해제(deallocate)`되지 않는다.

<br>

- Set `nil` to `john` variable

그렇다면 처음부터 다시 시작해서 이번에는 변수 `john`이 갖는 *Strong References* 를 끊어보자.

```swift
print(john as Any)                  // Optional(__lldb_expr_17.Person)

john = nil
print(john as Any)                  // nil
```

![Weak References 2](/assets/images/posts/2023-03-08-automatic-reference-counting/weakReference02~dark@2x.png){: width="800"}

```console
John Appleseed is being deinitialized
```

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    print(unit4A?.tenant as Any)    // nil
}
```

변수 `john`의 *Strong References* 가 끊어지자 더이상 *Strong References* 가 남지 않은 
`Person(name: "John Appleseed")`은 *Deinitializers* 를 호출 후 `해제(deallocate)`되었다.

<br>

`Person(name: "John Appleseed")`이 해제되어 이제 `Apartment(unit: "4A")`는 하나의 *Strong References*만 남게 되었다. 
이제 `Apartment(unit: "4A")` 역시 해제가 가능하다.

```swift
unit4A = nil
```

![Weak References 3](/assets/images/posts/2023-03-08-automatic-reference-counting/weakReference03~dark@2x.png){: width="800"}

```console
Apartment 4A is being deinitialized
```

> `Garbage Collection`을 사용하는 시스템에서는 **Garbage Collection** 이 `trigger` 될 때만 
> **Strong References** 가 없는 객체가 deallocated 되기 때문에 **Simple Caching Mechanism** 을 구현하는데 
> `Weak Pointer`가 사용되는 경우가 있다.  
> 즉, `Weak Pointer 는 Garbage Collection 이 trigger 되기 전까지 참조가 가능`하다.
> 
> 하지만 Swift 의 `ARC`는 좀더 tight 하게 메모리를 관리한다. **ARC** 는 `마지막 Strong References 가 제거되는 즉시 
> deallocated 되어 Weak References 는 즉시 참조가 불가능`하다. 

#### 3. Unowned References

*Weak References* 와 마찬가지로 `Unowned References`는 참조하는 Instance 를 강하게 유지(strong hold)하지 않는다. 그러나
*Weak References* 와 다르게 *Unowned References* 는 참조하는 Instance 의 수명이 같거나(Same Lifetime) 더 긴(Long Lifetime)
경우 사용한다. *Weak References* 와 마찬가지로 Properties 또는 Variables 선언 전에 `unowned` keyword 위치시켜 정의한다.

*Weak References* 와 달리 *Unowned References* 는 항상 값을 가질 것으로 예상된다. 결과적으로 *Unowned References* 는
`Value 를 Optional 로 만들지 않고`, `ARC 는 Unowned References 의 값을 nil 로 설정하지 않는다`.

> `References 가 항상 deallocated 되지 않은 Instance 를 참조한다고 확신하는 경우`에만 `Unowned References`를 사용해야한다.   
> 즉, **Strong References** 가 아니어서 해제가 가능한데, Instance 가 deallocated 된 후 접근할 경우 `Runtime Error`가 발생하기
> 때문이다.

<br>

다음 예제는 `Customer`와 `CreditCard`라는 두 Classes 를 모델로 한다. 이 예제는 앞에서의 *Person 과 Apartment 모델과 조금 다른 관계*를
갖는다. 이 데이터 모델에서 *Customer* 는 *CreditCard* 를 가지고 있거나 가지고 있지 않을 수 있지만, *CreditCard* 는 항상 *Customer* 와
연결되어있다.

앞의 모델과 비교해보자.
<br>

__1 ) Person 과 Apartment 모델__

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

- Person : Apartment(=apartment) 없이 존재할 수 있다. `init(name:)` & `var apartment: Apartment?`
- Apartment : Person(=tenant) 없이 존재할 수 있다. `init(unit:)` & `var tenant: Person?`
- 그리고 Person 의 *Lifetime* 이 Apartment 의 Life Cycles 보다 짧다.

> 따라서 **Lifetime** 이 긴쪽인 Apartment 가 Short Lifetime 을 갖는 Person 을 참조할 때 `week`를 붙여
> `week var tenant: Person?`를 만들어 준다.

<br>

<span id="customer-and-creditcard">
__2 ) Customer 와 CreditCard 모델__

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { print("\(name) is being deinitialized") }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

- Customer : CreditCard(=card) 없이 존재할 수 있다. `init(name:)` & `var card: CreditCard?`
- CreditCard : <span style="color: red;">Customer(=customer) 없이 존재할 수 없다</span>.
  `init(number:customer:)` & `let customer: Customer`
- 그리고 Customer 의 *Lifetime* 이 CreditCard 의 *Lifetime* 보다 길거나 같으며, `CreditCard 는 Customer 에 종속적`이다.

> 따라서 **Lifetime** 이 짧거나 같으며 Customer 에 종속성을 갖는 CreditCard 가 Long Lifetime 을 갖는 Customer 를 참조할 때
> `unowned`를 붙여 `unowned let customer: Customer`를 만들어 준다.

> CreditCard 는 Customer 를 항상 갖고 있어야 한다는 종속성이 있기 때문에 **Strong Reference Cycles** 를 피하기 위해 항상
> `Unowned References`로 정의한다.

<br>

```swift
var john: Customer?

john = Customer(name: "John Appleseed")
```

이제 변수 `john`은 `Customer(name: "John Appleseed")` instance 를 *Strong References* 로 갖는다.

그리고 이제 `Customer(name: "John Appleseed")`이 존재하므로 Customer 에 종속성을 갖는 `CreditCard` instance 를 생성할 수 있다.

```swift
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

![Unowned References 1](/assets/images/posts/2023-03-08-automatic-reference-counting/unownedReference01~dark@2x.png){: width="800"} 

<br>

이제 변수 `john`이 갖는 *Strong References* 를 끊어보자.

```swift
john = nil
```

![Unowned References 2](/assets/images/posts/2023-03-08-automatic-reference-counting/unownedReference02~dark@2x.png){: width="800"}

ARC 는 `Customer(name: "John Appleseed")`가 *zero strong references* 에 도달했음을 확인하고 Instance 를 deallocated 시키며,
Customer 에 종속성을 가지며 Customer 의 Properties 로써 존재하던 CreditCard 역시 deallocated 된다.

```console
John Appleseed is being deinitialized
Card #1234567890123456 is being deinitialized
```

> 위 예제는 어떻게 `Safe Unowned References`를 사용하는지 보여준다.
>
> 하지만 Swift 는 성능 상의 이유로 `Runtime Safety Checks`를 비활성화 할 수 있는 `Unsafe Unowned References` 역시 제공한다.
> 대신 [Unstructured Concurrency] 와 마찬가지로 **완전한 책임**(completely responsibility for correctness)이 사용자에게 주어진다.

> Unsafe Unowned References 로 코드를 작성했고, 참조하던 Instance 가 deallocated 된 경우, Unsafe Unowned References 는 이를
> 알 수 없어 기존에 가지고 있던 메모리 주소(Pointer)를 이용해 안전하지 않은 접근을 하게 된다.

#### 4. Unowned Optional References

위 예제에서는 `Unowned References`가  <span style="color: red;">Non-Optional</span> 이었다. 이번에는 
<span style="color: red;">Optional</span> Types 인 `Unowned Optional References`에 대해 알아본다.

> `ARC Ownership Model`에서 `Unowned Optional References`와 `Weak References`는 같은 `context`에서 사용될 수 있다.  
> 차이점은 **Unowned Optional References** 를 사용할 때 `Valid Object 를 참조`하거나 `nil 로 설정`되어있는지 확인해야한다.
> 
> 그리고 가장 중요한 것은 [Unstructured Concurrency] 와 마찬가지로 
> **완전한 책임**(completely responsibility for correctness)이 사용자에게 주어진다.

<br>

다음은 학교의 특정 과에 제공되는 강의를 추적하는 예제다.

```swift
class Department {
    var name: String
    var course: [Course]
    init(name: String) {
        self.name = name
        self.course = []
    }
    deinit { print("Department '\(name)' is being deinitialized") }
}

class Course {
    var name: String
    unowned var department: Department
    unowned var nextCourse: Course?
    init(name: String, in department: Department) {
        self.name = name
        self.department = department
        self.nextCourse = nil
    }
    deinit { print("Course '\(name)' is being deinitialized") }
}
```

`Department`는 과에서 제공하는 강의에 대해 강한 참조를 갖는다. 그리고 `ARC Ownership Model 에서 Department 는 강의를 소유`하고 있고,  
`Course`는 *department* 와 *nextCourse* 라는 2개의 `Unowned References`를 갖는다.

그리고 Department 의 *Lifetime* 이 Course 의 *Lifetime* 보다 길거나 같으며, `Course 의 department 는 Department 에 
종속적`이므로 Optional 이 아니다. 하지만 `Course 의 nextCourse 는 존재할 수도, 않을 수도 있기 때문에 Optional`이다.

```swift
var department: Department?
var intro: Course?
var intermediate: Course?
var advanced: Course?

department = Department(name: "Horticulture")
intro = Course(name: "Survey of Planets", in: department!)
intermediate = Course(name: "Growing Common Herbs", in: department!)
advanced = Course(name: "Caring for Tropical Plants", in: department!)

intro?.nextCourse = intermediate!
intermediate?.nextCourse = advanced!
department?.course = [intro!, intermediate!, advanced!]
```

위와 같이 *Horticulture* 과에 3개의 강의를 개설하고, 등록한 결과를 그림으로 표현하면 다음과 같다.

![Unowned Optional References 1](/assets/images/posts/2023-03-08-automatic-reference-counting/unownedOptionalReference~dark@2x.png){: width="800"}

한번 각각의 변수들을 출력해보자. 우선 강의는 다음과 같이 확인된다.

```swift
let printCourse = { (variableName: String, course: Course) in
    print("""
          [\(variableName)]
          Class : \(course)
          Name : \(course.name)
          Department : \(course.department)
          Next Course : \(course.nextCourse as Any)

          """)
}
```

```swift
printCourse("intro", intro!)
printCourse("intermediate", intermediate!)
printCourse("advanced", advanced!)
```

```console
[intro]
Class : __lldb_expr_131.Course
Name : Survey of Planets
Department : __lldb_expr_131.Department
Next Course : Optional(__lldb_expr_131.Course)

[intermediate]
Class : __lldb_expr_131.Course
Name : Growing Common Herbs
Department : __lldb_expr_131.Department
Next Course : Optional(__lldb_expr_131.Course)

[advanced]
Class : __lldb_expr_131.Course
Name : Caring for Tropical Plants
Department : __lldb_expr_131.Department
Next Course : nil
```

과 정보도 출력해보자.

```swift
print("[department] : \(department!),    \(String(describing: department!.name)),    \(String(describing: department!.course))")
```

```console
[department] : __lldb_expr_131.Department,    Horticulture,    [__lldb_expr_131.Course, __lldb_expr_131.Course, __lldb_expr_131.Course]
```

<br>

위 [Unowned References](#h-3-unowned-references) 와 달리 사용자가 Classes 사이의 References 를 관리하고 deallocated 
시키는 것에 대해 책임을 다하지 못했을 때 어떤 일이 발생하는지 확인해본다.

- Unsafe Unowned References - error case

```swift
department = nil
print(department as Any)   // nil
```

```swift
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    printCourse("intro", intro!)
}
```

```console
DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
    print("1")
    print(intro!.name)
    print(intro!.department)
    print("2")
}
```

```console
1
Survey of Planets
```

> 참조하던 Instance 가 deallocated 되었으나, Unsafe Unowned References 는 이를 알 수 없어 기존에 가지고 있던 
> 메모리 주소(Pointer)를 이용해 안전하지 않은 접근을 했고, 값을 받아오지 못해 더이상 진행이 되지 않고 멈춰버렸다. 만약, 다른 프로세스에 
> 의해 해당 메모리 주소에 값이 저장되었으나 예상한 것과 다른 값이 들어가 있고 그걸 가져올 경우는 **Runtime Error** 로 이어질 수도 있는 
> 심각한 문제를 발생시킬 수 있다.

<br>

- Unsafe Unowned References - success case

위와 같은 발생하는 것을 막기 위해 Course 가 일부 deallocated 될 경우, 그 Course 를 참조하는 것들을 먼저 끊어야하며, 
만약 Department 가 deallocated 될 경우, Department 에 종속성을 갖는 모든 Course 가 `unowned var department` property 에 
접근하지 못하도록 하거나 모든 Course 를 함께 deallocated 해야한다.

```swift
do {
    department = nil
    advanced = nil
    intermediate = nil
    intro = nil
}
```

```console
Department 'Horticulture' is being deinitialized
Course 'Survey of Planets' is being deinitialized
Course 'Growing Common Herbs' is being deinitialized
Course 'Caring for Tropical Plants' is being deinitialized
```

<br>

> `Optional Value` 기본 Types 는 `Swift Standard Library 의 Enumeration 인 Optional`이다.  
> 그러나 Optional 은 Value Types 에 `unowned`를 marked 할 수 없다는 규칙에 대해 예외다.
> 
> Class 를 Wrapping 한 Optional 은 `Swift Standard Library 의 Enumeration 인 Optional` Types 이므로 Container 가 
> **Value Type** 가 된다. 즉, `Reference Counting`을 사용하지 않으므로, **Strong References** 를 Optional 로 유지할 
> 필요가 없다.


#### 5. Unowned References and Type! Properties

위에서 *Strong Reference Cycles* 를 끊기 위한 2가지 방법(Week References, Unowned References)에 대해 다루었다.

__1 ) 2개의 Properties 가 모두 nil 을 허용하는 케이스__

*Person* 과 *Apartment* 예제는 *2개의 Properties 가 모두 nil 을 허용하는 경우에 Strong Reference Cycles 이 발생할 가능성이 
있는 상황*을 보여준다. 이 시나리오는 `Week References`를 이용해 해결하는 것이 가장 좋다.

__2 ) 1개의 Property 는 nil 을 허용하고, 1개의 Property 는 nil 을 허용하지 않는 케이스__

*Customer* 와 *CreditCard* 예제는 *1개의 Property 는 nil 을 허용하고, 1개의 Property 가 nil 을 허용하지 않는 경우에 Strong 
Reference Cycles 이 발생할 가능성이 있는 상황*을 보여준다. 이 시나리오는 `Unowned References`를 이용해 해결하는 것이 가장 좋다.

__3 ) 2개의 Properties 가 모두 nil 을 허용하지 않는 케이스__

마지막으로 *2개의 Properties 가 모두 값이 항상 있고 초기화가 완료되면 nil 이 되어서는 안 되는 세 번째 시나리오가 있는 상황*을 설명한다. 
이 시나리오는 **Unowned References 의 변형**으로 `Unowned References` 와 
`Implicitly Unwrapped Optional Properties(Type!)`를 이용해 해결한다.

이렇게 하면 *Strong Reference Cycles* 를 피하면서, 초기화가 완료되면 두 Properties 모두 *Optional Unwrapping 없이 접근*할 
수 있다.

<br>

__1 ) Unowned Optional References__

[Customer 와 CreditCard 모델](#customer-and-creditcard) 과 동일한 형태의 케이스를 먼저 확인하고, Implicitly Unwrapped 
Optional Properties 가 적용된 모델을 확인해 비교해본다.

```swift
class Country {
    let name: String
    var capitalCity: City?
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
    deinit { print("\(name) is being deinitialized") }
}

class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
print("\(country.name)'s capital city is called \(country.capitalCity!.name)")
```

```console
Canada's capital city is called Ottawa
```

> - `var capitalCity: City?`와 `init(name:, country:)`를 사용한다.
> - `country.capitalCity!.name`와 같이 country 의 capitalCity 에 접근하려면 Optional Unwrapping 이 필요하다.

<br>

__2 ) Unowned References and Implicitly Unwrapped Optional Properties__

```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
    deinit { print("\(name) is being deinitialized") }
}

class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
print("\(country.name)'s capital city is called \(country.capitalCity.name)")
```

```console
Canada's capital city is called Ottawa
```

> - `var capitalCity: City!`와 `init(name:, country:)`를 사용한다.
> - `country.capitalCity.name`와 같이 Optional Unwrapping 없이 country 의 capitalCity 에 접근이 가능하다.

<br>

*Country* 의 Initializer 의 `self.capitalCity = City(name: capitalName, country: self)`를 살펴보자.

*City* 의 Initializer 는 Country 가 필요하다. 하지만 [Two-Phase Initialization] 에서 설명했듯이 `'self' 참조는 'Phase 2' 
에서만 가능`하다.

따라서 ***'self' 참조를 사용하면서, var capitalCity 가 Optional 을 허용하지 않도록 하기 위해*** `'City!'로 표시되는
Implicitly Unwrapped Optionals 를 사용해 nil 을 할당해 Phase 1 을 처리하고`를 하고, `Phase 2 에서 반드시 저장`하는 방법을 
사 용한다.

> - Implicitly Unwrapped Optionals
> 
> ```swift
> let possibleString: String? = "An optional string."
> let forcedString: String = possibleString! // requires an exclamation point
> 
> let assumedString: String! = "An implicitly unwrapped optional string."
> let implicitString: String = assumedString // no need for an exclamation point
> ```

<br>

__마지막으로 deallocated 테스트를 해보자__

```swift
var country: Country?

country = Country(name: "Canada", capitalName: "Ottawa")
country = nil
```

```console
Country Canada is being deinitialized
City Ottawa is being deinitialized
```

deallocated 까지 정상적으로 처리된다.

---

### 6. Strong Reference Cycles for Closures 👩‍💻

위에서 `두 Class Instance Properties 사이에` 생성되는 *Strong Reference Cycles* 와 이를 어떻게 해결하는지 각각의 시나리오에 대해
살펴보았다. 

이번에는 `Class Instance 와 Closures 사이에` 생성되는 *Strong Reference Cycles* 에 대해 알아본다. 이것은 Class Instance 
Property 에 Closure 를 할당하고, `Closure 가 'self' 를 이용해 자신이 속한 context 의 Instance Properties/Methods 를 
캡처`할 때 생성된다.

```swift
class HTMLElement {
    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit { print("\(name) is being deinitialized") }
}
```

위 HTMLElement class 는 `head`와 `text`를 받아 HTML 을 만들어준다.

```swift
var heading: HTMLElement? = HTMLElement(name: "h1")
let html = heading!.asHTML()
print(html)         // <h1 />

var headingWithText: HTMLElement? = HTMLElement(name: "p", text: "Hello~")
let anotherHtml = headingWithText!.asHTML()
print(anotherHtml)  // <p>Hello~</p>
```

> `asHTML` property 는 String 값을 HTML Rendering 으로 출력할 때만 필요하므로 `lazy` property 로 선언된다.  
> 그리고 `lazy`로 선언되었으므로 Property 가 호출되는 시점에는 이미 Initialization 을 마친 상태를 의미한다. 즉, `self` 참조가 
> 가능함을 의미한다.

<br>

이제 사용이 끝났으니 deallocated 시켜보자.

```swift
heading = nil
headingWithText = nil
print(heading as Any)           // nil
print(headingWithText as Any)   // nil
```

```console
// Nothing
```

변수 `heading`과 `headingWithText`에 연결된 *Strong Reference Cycles* 는 제거되었지만 **두 Classes 모두 deallocated 
되지 않는다**.

> - 두 Classes 가 갖는 Properties 사이에 생성된 References 가 *Strong Reference Cycles* 를 생성하는 이유는 `Classes 가 
> Reference Types`이기때문이다.
> - 그리고 `Closures 역시 Reference Types 이므로, Classes 와 Closures 사이에도 Strong Reference Cycles 가 생성`된다.

<br>

![Closure Reference Cycles](/assets/images/posts/2023-03-08-automatic-reference-counting/closureReferenceCycle01~dark@2x.png){: width="800"}

- Class Instances 는 context 내에 정의된 Properties 또는 Methods 의 Pointer 를 *Strong References* 로 참조한다.  
  (이 경우 `asHTML`은 자신의 Closure `() -> String`을 강한 참조로 갖는다.)
- Closures 는 자신이 속한 Context 내에 정의된 Properties 또는 Methods 의 Pointer 를 *Strong References* 로 참조한다.  
  (이 경우 `() -> String`은 자신이 속한 Context 내에 정의된 name, text 에 접근하기 위해 `self`를 강한 참조로 갖는다.)

> Closures 는 여러 번 참조하지만 단 하나의 `self`를 *Strong References* 로 캡처한다.

---

### 7. Resolving Strong Reference Cycles for Closures 👩‍💻

#### 1. Defining a Capture List

Swift 는 이 문제를 해결하기 위해 `Closure Capture List`를 이용한 우아한 해결 방법을 제공한다. *Capture List* 는 Closures 가 
하나 또는 그 이상의 `Reference Types 를 캡처할 때 사용할 규칙`을 정의한다. 두 Classes 의 경우와 마찬가지로 `Week References` 
또는 `Unowned References`를 사용한다.

<br>

- Without Capture List

```swift
lazy var someClosure = {
    (index: Int, stringToProcess: String) -> String in
    // closure body goes here
}
```

```swift
lazy var someClosure = {
    // closure body goes here
}
```

Closures 는 Parameter List 를 context 로부터 유추할 수 있어 생략이 가능하다.

<br>

- With Capture List

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate]
    (index: Int, stringToProcess: String) -> String in
    // closure body goes here
}
```

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate] in
    // closure body goes here
}
```

> Parameter List 를 context 로부터 유추하도록 생략하더라도 Capture List 를 사용할 때는 `in` keyword 를 누락할 수 없다. 

#### 2. Weak and Unowned References

두 Classes 의 경우와 마찬가지로 Closures 가 캡처한 References 가 `nil`이 될 가능성이 있는지와 Lifetime 을 비교해 사용한다.

- Week References : 캡처한 self 가 `nil`이 될 가능성이 있는 경우(*Short Lifetime*) 사용한다. 즉, Week References 는 항상 
                    `Optional`이다.
- Unowned References : 캡처한 self 가 `nil`이 될 가능성이 없고 항상 서로를 참조하는 경우(*Same Lifetime*) 사용한다. 
                       즉, Unowned References 는 `Forced Unwrapping` 또는 `Non-Optional`이다.
<br>

다음은 [Strong Reference Cycles for Closures](#h-6-strong-reference-cycles-for-closures-) 에 *Capture List* 
를 적용한 코드다.

```swift
class HTMLElement {
    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
        [unowned self] in
        if let text = text {
            return "<\(name)>\(text)</\(name)>"
        } else {
            return "<\(name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit { print("\(name) is being deinitialized") }
}
```

```swift
var headingWithText: HTMLElement? = HTMLElement(name: "p", text: "Hello~")

headingWithText = nil
```

```console
p is being deinitialized
```

deallocated 까지 정상적으로 처리된다.


<br><br>

---
Reference

1. "Automatic Reference Counting." The Swift Programming Language Swift 5.7. accessed Mar. 08, 2023, [Swift Docs Chapter 24 - Automatic Reference Counting](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/).

[Transitioning to ARC Release Notes]:https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html
[Unstructured Concurrency]:/swift/2023/01/05/concurrency.html#h-2-unstructured-concurrency
[Two-Phase Initialization]:/swift/2022/12/01/initialization.html#h-4-two-phase-initialization
