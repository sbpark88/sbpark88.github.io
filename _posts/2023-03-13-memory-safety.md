---
layout: post
title: Swift Memory Safety
subtitle: Structure your code to avoid conflicts when accessing memory. 
categories: swift
tags: [swift docs, memory safety, compile-time error, runtime error, conflict, multiple accesses, exclusive access, read access, write access, overlap, overlapping access]
---

### 1. Memory Safety 👩‍💻

#### 1. Memory Safety

기본적으로 Swift 는 코드에서 안전하지 않은 동작이 발생하는 것을 방지한다. 예를 들면, *Initialization 이전에 Variables 에 접근하기*,
*Deallocated 이후 메모리에 접근하기*, *Array 의 범위 체크(out-of-bounds)*와 같은 것들이다.

또한 Swift 는 동일한 메모리 공간에 대한 *Multiple Accesses* 발생시, *해당 메모리를 수정중인 코드에게 
`Exclusive Access(독점적인 접근)`을 하도록 해 `Conflicts`이 발생되지 않도록 한다*.

Swift 는 메모리를 자동으로 관리하기 때문에 대부분의 경우에 메모리 접근에 대해 생각할 필요가 없다. 그러나, `Conflicts`이 발생할 가능성이
있는 경우에 대해 알아야 메모리 접근에 대한 *Conflicting Access* 를 피할 수 있으므로 이것을 이해하는 것은 중요하다. 만약 이를 피하지 못해 
*Conflicts* 을 일으킬 수 있는 코드가 포함되어 있다면, `Compile-time Error` 또는 `Runtime Error`가 발생한다.

#### 2. Understanding Conflicting Access to Memory

메모리에 접근하는 것은 *변수에 값을 설정*하거나 *함수에 arguments 를 전달*하는 것과 같은 동작을 할 때 발생한다. 다음 코드는 메모리 접근의
`Read Access`와 `Write Access`에 대한 예다.

```swift
// A write access to the memory where one is stored.
var one = 1

// A read access from the memory where one is stored.
print("We're number \(one)!")
```

코드의 서로 다른 부분이 메모리의 동일 위치에 동시에 접근하려는 경우 예측할 수 없거나 일관성 없는 동작이 발생할 수 있고, 이로 인해
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
'$320' 이 정답이 될 수도 있다. 따라서 `Conflicting Access`를 고치기 전에 동작이 수행하고자 하는 의도를 명확히 파악하는 것이 중요하다.

> *Concurrent Code* 또는 *Multithreaded Code* 를 작성할 경우 `Conflicting Access to Memory`를 자주 접할 수 있다.
> 하지만 *Conflicting Access* 는 `Single Thread`에서도 발생할 수 있다. 이 글에서 설명하는 *Conflicts* 가 이에 해당한다.
>
> - Conflicting Access to Memory (Single Thread) : **Conflicts** 이 발생할 경우 Swift 는 이를 감지해 **Compile-time Error** 또는
>                                                 **Runtime Error** 가 발생하도록 보장한다.
> - Conflicting Access to Memory (Multithread) : [Thread Sanitizer] 를 사용해 *Threads* 사이에 발생하는 **Conflicts** 을 감지한다.


#### 3. Characteristics of Memory Access

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

### 2. Conflicting Access to In-Out Parameters 👩‍💻

---

### 3. Conflicting Access to self in Methods 👩‍💻

---

### 4. Conflicting Access to Properties 👩‍💻


<br><br>


---
Reference

1. "Memory Safety." The Swift Programming Language Swift 5.7. accessed Mar. 13, 2023, [Swift Docs Chapter 25 - Memory Safety](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/memorysafety).

[Thread Sanitizer]:https://developer.apple.com/documentation/xcode/diagnosing-memory-thread-and-crash-issues-early
[stdatomic.3]:https://opensource.apple.com/source/libplatform/libplatform-161.50.1/man/stdatomic.3.auto.html
