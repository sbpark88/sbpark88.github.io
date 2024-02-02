---
layout: post
title: Swift Memory Safety
subtitle: Structure your code to avoid conflicts when accessing memory. 
categories: [swift]
tags: [swift docs, memory safety, compile-time error, runtime error, conflict, multiple accesses, exclusive access, read access, write access, overlap, overlapping access]
---

### 1. Memory Safety 👩‍💻

기본적으로 Swift 는 코드에서 안전하지 않은 작동이 발생하는 것을 방지한다. 예를 들면, *Initialization 이전에 Variables 에 접근하기*,
*Deallocated 이후 메모리에 접근하기*, *Array 의 범위 체크(out-of-bounds)*와 같은 것들이다.

또한 Swift 는 동일한 메모리 공간에 대한 *Multiple Accesses* 발생시, *해당 메모리를 수정중인 코드에게 
`Exclusive Access(독점적인 접근)`을 하도록 해 `Conflicts`이 발생되지 않도록 한다*.

Swift 는 메모리를 자동으로 관리하기 때문에 대부분의 경우에 메모리 접근에 대해 생각할 필요가 없다. 그러나, `Conflicts`이 발생할 가능성이
있는 경우에 대해 알아야 메모리 접근에 대한 *Conflicting Access* 를 피할 수 있으므로 이것을 이해하는 것은 중요하다. 만약 이를 피하지 못해 
*Conflicts* 을 일으킬 수 있는 코드가 포함되어 있다면, `Compile-time Error` 또는 `Runtime Error`가 발생한다.

### 2. Memory Access 👩‍💻

#### 1. Understanding Conflicting Access to Memory

메모리에 접근하는 것은 *변수에 값을 설정*하거나 *함수에 arguments 를 전달*하는 것과 같은 작동을 할 때 발생한다. 다음 코드는 메모리 접근의
`Read Access`와 `Write Access`에 대한 예다.

```swift
// A write access to the memory where one is stored.
var one = 1

// A read access from the memory where one is stored.
print("We're number \(one)!")
```

코드의 서로 다른 부분이 메모리의 동일 위치에 동시에 접근하려는 경우 예측할 수 없거나 일관성 없는 작동이 발생할 수 있고, 이로 인해
`Conflicting Access`가 발생할 수 있다. Swift 에는 코드의 여러 라인에 걸쳐 있는 값을 수정하는 방법이 있어, 자체 수정 중에 값에 접근을
시도할 수 있다. 다음 코드는 이런 상황에 대한 예시를 보여준다.

![Memory Shopping](/assets/images/posts/2023-03-13-memory-safety/memory_shopping~dark@2x.png){: width="800"}

예산 업데이트는 2단계로 이루어진다.

- 1단계 : 아이템을 담는다.
- 2단계 : *Total* 을 업데이트 한다.

2단계까지 종료되어 예산 업데이트가 완료된 후에는 올바른 값을 얻을 수 있다. 하지만 1단계만 완료된 시점에 *Total* 에 접근할 경우, 임시적으로
올바르지 않은 값을 얻는다.

하지만 올바르지 않은 값을 얻는다는 것은 그림상 'During' 조각 하나만 보았을 때 이야기일 뿐이다. 프로그래밍 관점에서 보면 이와 같은 문제를 
해결하는 방법은 여러 가지가 존재하는데, 기존 *Total* 과 업데이트 된 *Total* 중 어떤 값을 원하는지에 따라 '$5' 가 정답이 될 수도 있고, 
'$320' 이 정답이 될 수도 있다. 따라서 `Conflicting Access`를 고치기 전에 작동이 수행하고자 하는 의도를 명확히 파악하는 것이 중요하다.

> *Concurrent Code* 또는 *Multithreaded Code* 를 작성할 경우 `Conflicting Access to Memory`를 자주 접할 수 있다.
> 하지만 *Conflicting Access* 는 `Single Thread`에서도 발생할 수 있다. 이 글에서 설명하는 *Conflicts* 가 이에 해당한다.
>
> - Conflicting Access to Memory (Single Thread) : **Conflicts** 이 발생할 경우 Swift 는 이를 감지해 **Compile-time Error** 또는
>                                                 **Runtime Error** 가 발생하도록 보장한다.
> - Conflicting Access to Memory (Multithread) : [Thread Sanitizer] 를 사용해 *Threads* 사이에 발생하는 **Conflicts** 을 감지한다.


#### 2. Characteristics of Memory Access

*Conflicting Access* 에서 고려해야 할 *Memory Access* 의 3가지 특성이 있다.

1. *Read Access* 인가? *Write Access* 인가?
2. *Access* 지속 시간
3. *Access* 되는 메모리 위치

특히 다음 조건을 만족하는 2개의 *Accesses* 가 있다면 *Conflicts* 가 발생한다.

- 적어도 하나의 *Write Access* 또는 *Nonatomic Access*
- 메모리의 같은 위치에 접근
- 접근 기간(duration)이 중복

일반적으로 *Read Access* 와 *Write Access* 의 차이는 명확하다. *Write Access* 는 메모리의 위치를 변경하지만, *Read Access* 는
그렇지 않다. 메모리의 위치는 *Variables, Constants, Properties* 와 같은 접근 중인 항목을 나타낸다. 메모리 접근 기간은
순간적(instantaneous)이거나 장기적(long-term)이다.

연산이 *C atomic operations* 만 사용하는 경우 `Atomic`이고, 그렇지 않으면 `Nonatomic`이다. 이러한 함수 목록은 [stdatomic.3] 페이지를
참고한다.

*Access* 가 시작되고 종료되기 전까지 다른 코드를 실행할 수 없는 경우, 접근은 즉시(instantaneous) 이루어진다. 일반적으로 2개의
`Instantaneous Access`은 동시에 발생할 수 없다. 하지만 대부분의 메모리 접근은 즉각적으로 반응하며, 아래 코드 리스트의 모든 *Read Access*
와 *Write Access* 는 즉시 이루어진다(동시에 이루어지는 것을 말하는 것은 아니다. 둘이 순차적으로 즉각적인 반응을 보인다는 것이다).

```swift
func oneMore(than number: Int) -> Int {
    return number + 1
}

var myNumber = 1
myNumber = oneMore(than: myNumber)
print(myNumber) // 2
```

그러나 다른 코드의 실행에 걸쳐 있는 *Long-term Accesses* 에 접근하는 방법은 여러 가지가 있다. `Instantaneous Access`와
`Long-term Access`의 차이점은 *Long-term Access* 는 `시작되고 종료되기 전에 다른 코드가 실행될 수 있다`는 것이다.
이것을 `Overlap`이라 한다.

- Instantaneous Access : Access 가 시작되고 종료되기 전까지 다른 코드가 실행될 수 없다.
- Long-term Access : `Overlap`이 가능해 Access 가 시작되고 종료되기 전까지 다른 *Instantaneous Access* 또는 *Long-term Access*
  가 실행될 수 있다.

> `Overlapping Accesses`는 주로 함수나 메서드에서 `in-out` 또는 `mutating`을 사용하는 코드에서 주로 나타난다.

---

### 3. Conflicting Access to In-Out Parameters 👩‍💻


함수는 모든 *In-Out Parameters* 에 *Long-term Write Access* 를 갖고 있다. *In-Out Parameters* 에 대한 *Write Access* 는
나머지 모든 *Non-In-Out Parameters* 가 평가된 후에 시작되어 함수가 호출되는 동안 지속된다. *In-Out Parameters* 가 여러 개인 경우
*Write Access* 는 Parameters 의 순서와 동일하게 이루어진다.
<br>

- *Read Access* 와 *Write Access* 가 동시에 이루어지지 않는 경우

```swift
var someNumber = 7

func incrementByTen(_ number: inout Int) {
    number += 10
}

incrementByTen(&someNumber)
print(someNumber) // 7
```

- *Long-term Write Access* 를 갖는 *In-Out Parameters* 와 함수 내부의 다른 *Read Access* 가 동시에 이루어진 경우(same duration)

```swift
var someNumber = 7

func incrementByTen(_ number: inout Int) {
    print(someNumber)   // error: simultaneous access
    number += 10
}

incrementByTen(&someNumber) // error: Execution was interrupted, reason: signal SIGABRT.
print(someNumber)
```

<br>

다음과 같은 함수를 생각해보자.

```swift
var stepSize = 1

func increment(_ number: inout Int) {
    number += stepSize
}

increment(&stepSize)    // error: Execution was interrupted, reason: signal SIGABRT.
```

위에서 살펴본 것과 마찬가지로 *Read Access* 와 *Write Access* 가 동시에 이루어지므로 *Conflicts* 가 발생한다.

![Memory Increment](/assets/images/posts/2023-03-13-memory-safety/memory_increment~dark@2x.png){: width="800"}

<br>

이 문제를 해결하는 방법 중 한 가지는 `In-Out Parameters`로 전달되는 원본 데이터가 재참조되지 않도록 명확하게 값을 복사해 전달하고,
함수가 종료된 후 원본 값을 업데이트 하는 것이다.

```swift
var stepSize = 1

// Make an explicit copy.
var copyOfStepSize = stepSize

func increment(_ number: inout Int) {
    number += stepSize
}

increment(&copyOfStepSize)

// Update the original.
stepSize = copyOfStepSize

print(stepSize) // 2
```

<br>

그리고 `In-Out Parameters`를 전달할 때 추가로 주의해야 할 것은, 여러 개의 Parameters 에 동일한 변수를 전달하는 것이 가능한 일반
Parameters 와 달리 동일한 변수를 전달할 수 없다는 것이다.

- 일반 Parameters 는 동일한 변수를 2개의 Parameters 에 전달할 수 있다.

```swift
func balance(_ x: Int, _ y: Int) -> (Int, Int) {
    let sum = x + y
    return (sum / 2, sum - x)
}

var playerOneScore = 42
var playerTwoScore = 30
let (lhs1, rhs1): (Int, Int) = balance(playerOneScore, playerTwoScore)
let (lhs2, rhs2): (Int, Int) = balance(playerOneScore, playerOneScore)

print(lhs1, rhs1) // 36 30
print(lhs2, rhs2) // 42 42
```

- `In-Out Parameters`는 동일한 변수를 전달할 수 없다.

```swift
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}

var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore) // OK
balance(&playerOneScore, &playerOneScore) // error: conflicting accesses to playerOneScore
```

`balance(&playerOneScore, &playerTwoScore)`는 두 개의 *Parameters* 가 모두 `Overlap` 되지만, 메모리의 다른 위치에 접근하므로
*Conflicts* 가 발생하지 않는다.  
반면, `balance(&playerOneScore, &playerOneScore)`는 두 개의 *Parameters* 가 동시에 메모리의 같은 위치에 *Write Access* 를
수행하므로 *Conflicts* 가 발생한다.

---

### 4. Conflicting Access to self in Methods 👩‍💻

*Structures* 의 `mutating methods`는 메서드를 호출하는 동안 `self`에 대한 *Write Access* 를 갖는다.

각 플레이어는 데미지를 입으면 체력이 줄어들고, 특수 능력을 사용하면 에너지가 줄어드는 게임이 있다고 생각해보자.

```swift
struct Player {
    var name: String
    var health: Int
    var energy: Int

    static let maxHealth = 10
    mutating func restoreHealth() {
        health = Player.maxHealth
    }
}
```

`restoreHealth()` 메서드의 `self` 에 대한 *Write Access* 는 `메서드의 호출시 시작되어 반환될 때까지 유지`된다. 이 메서드는 내부에
*Player* instance 의 Properties 에 `Overlapping Access(중복 접근)`하는 다른 코드는 없다.

```swift
extension Player {
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}
```

확장으로 추가한 `shareHealth(with:)` 메서드는 ***In-Out Parameters 로 다른 Player 의 Instance 를 가지고 있으며, 
Overlapping Access 접근에 대한 가능성을 만든다***.

```swift
var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)
oscar.shareHealth(with: &maria) // OK

print(oscar) // Player(name: "Oscar", health: 8, energy: 10)
print(maria) // Player(name: "Maria", health: 7, energy: 10)
```

![Memory Share 1](/assets/images/posts/2023-03-13-memory-safety/memory_share_health_maria~dark@2x.png){: width="800"}

위 코드에서 *oscar* 의 *mutating methods* `shareHealth(with:)`가 갖는 *Write Access* 의 대상은 `self`, 
즉, *oscar* 자기 자신이고, *In-Out Parameters* 로 전달되는 *maria* 가 갖는 *Write Access* 의 대상은 *maria* 
이기 때문에 *Conflicts* 가 발생하지 않는다.

<br>

그러나 `shareHealth(with:)`의 *In-Out Parameters* 로 *oscar* 를 전달하면 `mutating methods 의 self`와 
`In-Out Parameters`가 동일한 *oscar* 를 대상으로 *Write Access* 를 하기 때문에 동시에 같은 메모리를 참조하고 
Overlap 되므로 *Conflicts* 가 발생한다.

```swift
oscar.shareHealth(with: &oscar) // error: inout arguments are not allowed to alias each other
```

![Memory Share 2](/assets/images/posts/2023-03-13-memory-safety/memory_share_health_oscar~dark@2x.png){: width="800"}

---

### 5. Conflicting Access to Properties 👩‍💻

*Structures*, *Tuples*, *Enumerations* 와 같은 `Value Types`는 **Structure 의 Properties** 또는
**Tuple 의 Elements**와 같은 개별 구성 값(individual constituent values)으로 구성된다.
이것은 *Value Types* 이기 때문에 값의 일부가 변경되변 전체가 변경된다.    
즉, <span style="color: red;">Properties 중 하나의 *Read Access* 또는 *Write Access* 접근을 하는 것</span>은 
`self`를 통한 접근이기 때문에 실제로 <span style="color: red;">**전체 값에 대한 Read Access 또는 Write Access 를 
요구**하는 것</span>과 같다.

```swift
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}

var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// error: conflicting access to properties of playerInformation
```

위 예제에서 `balance(_:_:)`를 호출하는 것은 *playerInformation* 에 *Overlapping Write Accesses* 를 하는 것이므로 *Conflicts* 가
발생한다.

만약, 다음과 같이 <span style="color: green;">*Tuple* 을 이용해 하나의 *In-Out Parameter* 로 전달되면 *Conflicts* 가 
발생하지 않는다</span>.

```swift
func balance(_ player: inout (health: Int, energy: Int)) {
    let sum = player.health + player.energy
    player.health = sum / 2
    player.energy = sum - player.health
}

var playerInformation = (health: 10, energy: 20)
balance(&playerInformation)
print(playerInformation)    // (health: 15, energy: 15)
```

<br>

아래 코드도 마찬가지의 이유로 *Conflicts* 가 발생한다.

```swift
var holly = Player(name: "Holly", health: 10, energy: 20)
balance(&holly.health, &holly.energy)  // Error
print(holly)
```

<br>
이 문제를 해결하는 방법 중 한 가지는 <span style="color: green;">*In-Out Parameters* 로 전달되는 원본 데이터를 
*Global Variable* 이 아닌 *Local Variable* 로 변경하는 것</span>이다. 그러면 Swift *compiler* 는 Structure 의 
Stored Properties 에 대한 *Access* 가 다른 코드의 부분과 상호작용하지 않으므로 안전하다는 것을 증명할 수 있게 되고, 
2개의 *In-Out Parameters* 가 전달되지만 정상적으로 작동할 수 있다.

```swift
func someFunction() {
    var holly = Player(name: "Holly", health: 10, energy: 20)
    balance(&holly.health, &holly.energy)
    print(holly)
}

someFunction()
```

```console
Player(name: "Holly", health: 15, energy: 15)
```

> 위 코드에 대해 보충 설명을 하자면 다음과 같다.
>
> **Structure 의 Properties** 에 대한 중복 접근(Overlapping Access) 제한은 메모리 안전성을 위해 항상 필요한 것은 아니다.
> 메모리 안전성은 보장되지만, `배타적 접근(exclusive access)`은 `메모리 안전성(memory safety)` 보다 더 엄격한 요구사항이다.
>
> 즉, 일부 코드는 메모리에 대한 `Exclusive Access`를 위반하더라도 `Memory Safety`를 유지한다는 것을 의미한다. 이는 위와 같이 Swift
> **compiler** 가 메모리에 대한 `비배타적 접근(nonexclusive access)`가 여전히 안전하다는 것을 증명할 수 있는 `Memory Safety`를 허용한다.

> Swift **compiler** 에 의해 메모리에 대한 `Nonexclusive Access`가 `Memory Safety`를 가질 수 있는 조건은 다음과 같다.
> 
> - 오직 Instance 의 `Stored Properties 에만 접근`해야한다(not Computed Properties or Class Properties).
> - Structure 가 `Local Variable`의 값어야한다(not Global Variable).
> - Structure 는 `어떤 Closures 에도 캡처되지 않거나` or `Nonescaping Closures 에 의해서만 캡처`되어야한다.
>   (일반 Closures 또는 Escaping Closures 는 함수 context 외부와 상호작용을 하므로 완전히 격리 되지 않는다.)


<br><br>

---
Reference

1. "Memory Safety." The Swift Programming Language Swift 5.7. accessed Mar. 13, 2023, [Swift Docs Chapter 25 - Memory Safety](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety).

[Thread Sanitizer]:https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early
[stdatomic.3]:https://opensource.apple.com/source/libplatform/libplatform-161.50.1/man/stdatomic.3.auto.html
