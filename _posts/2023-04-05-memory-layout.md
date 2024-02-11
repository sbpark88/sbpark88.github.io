---
layout: post
title: Memory Layout - Stack / Heap
subtitle: Deep dive into memory layout 
excerpt_image: NO_EXCERPT_IMAGE
categories: [cs]
tags: [cs, memory, kernel space, user space, stack, heap, bss, data, text, fragmentation state, stack overflow, heap overflow]
---

### 1. Why you have to know about the Memory Layout? 👩‍💻

시스템은 메모리 사용 방법을 추적한다. 개발자가 앱을 개발할 때 C 와 같은 언어를 제외하면 대부분의 현대 언어는 메모리 관리를 직접 할 피요가 없다. 
하지만 메모리 구조에 대한 CS 지식이 전혀 없다면 잘못 작성된 코드로 인해 앱이 자동으로 메모리 관리를 하지 못 하고 Memory Leak 이 발생하는 
문제를 야기할 수도 있고, 잘못된 접근으로 인한 앱의 Crash 를 유발할 수도 있다. 결국 개발자로써 한계에 부딛히게 될 것이고, 그렇기 때문에 모든 
개발자에게 메모리를 이해하는 것은 매우 중요하다.

> 대부분의 시스템은 `Wroking Memory(RAM)`과 `Non-volatile Memory(Flash)`에 RTOS(Real-time Operating System)가 추가적인 
> 복잡성을 더하게 된다. Embedded 개발자가 아니라면 대부분의 SW 개발자가 신경 써야 하는 영역은 RAM 이라 불리는 메모리 공간, 즉 작업 영역이다.

---

### 2. Working Memory Layout 👩‍💻

![Memory Layout](/assets/images/posts/2023-04-05-memory-layout/Memory%20Layout.webp){: width="600"}

System 전체로 보면 Memory Layout 은 `6개의 Segments`로 나눌 수 있다.

가장 높은 메모리 주소에 Kernel Space 가 할당되고, 그 아래 Stack 이 할당된다. 이들은 높은 메모리 주소부터 채워나가는 구조를 갖는다.

반대로 메모리 영역의 반대편, 즉, 낮은 메모리 주소부터 할당되는 데이터들이 있다. 우선 가장 낮은 메모리 주소에는 Text 가 위치한다. 그 위로는 
Data, BSS, Heap 이 순서대로 할당된다.

이 중 OS 가 작동하기 위한 Kernel Space 를 제외한 나머지 5개 Segments(Stack 을 포함하는)를 `User Space`라 한다.

---

### 3.1. Kernel Space 👩‍💻

Unix-like OS 에서 입출력(I/O)나 프로세스 생성과 같은 일을 처리하기 위한 메모리 영역으로, 사용자 프로세스에서 접근하는 방법은 오직
`System Call`을 통해서만 가능하다. 이 영역에 치명적인 오류가 발생할 경우 이를 `Kernel Panic`이라 하며, 하드웨어, 드라이버, 소프트웨어
등 다양한 원인에 의해 발생할 수 있다.

Kernel Panic 은 보안 취약점에 악용될 수 있기 때문에 매우 위험하다. 따라서 시스템 보안과 안정성을 유지하기 위해 OS 는 적극적인 유지보수를
재공해야하며, 사용자는 이를 지속적으롱 업데이트 해야 한다.

> Terminal 과 같은 `Shell`을 이용해 사용자는 Kernel 에 직접적인 명령을 내릴 수 있다. 이것이 SSH 가 외부에 공개되고 오픈 되었을 때
> 매우 위험한 이유다.

---

### 3.2 User Spaces 👩‍💻

사용자에게 할당되는 메모리 영역으로, 앱은 이 영역 안에서 작동하게된다. 사용자 공간 역시 다음과 같이 5개의 Segments 로 나눌 수 있다.

- Stack
- Heap
- BSS(Uninitialized Data Segment)
- Data(Initialized Data Segment)
- Text(Code)

#### 1. Stack

LIFO(Last In First Out)로 작동하며, OS Kernel Space 바로 아래 위치해 높은 메모리 주소부터 채워나간다.

앱에서 `함수 호출에 필요한 데이터를 저장하는 Segment`로 함수는 Stack Push/Pop 을 통해 작동한다. 함수가 쌓이고, 가장 마지막에 쌓인 함수가 
실행이 완료되면 제거된다. 그러면 다시 그 아래 쌓인 함수가 실행이 되고 완료되면 제거되는 과정을 반복하는데 이는 Stack 을 비울 때까지 계속된다. 

함수 안에서 다른 함수를 호출하거나, 함수가 자기 자신을 Recursive Functions 로 호출하는 것과 같은 행위가 모두 Stack 에 함수를 쌓아 올리는 
행위이다.
<br>

__Stack 에 Push 된 데이터 집합을 `Stack Frame`이라 하며 다음 데이터가 할당된다__

- **Arguments**
- **Return Address** back to the caller
- **Local Variables**

<br>

__Stack 은 다음과 같은 특징을 갖는다__

- 함수가 호출될 때 `Automatic Allocation`으로 작동하며, 함수 호출이 완료되면 `자동으로 deallocated` 된다.
- **Stack 의 크기는 `compile-time`에 결정**되며, OS 에 따라 제한이 존재한다.  
  (i.e. iOS 의 경우 기종마다 다를 수 있으나 일반적으로 32bit 는 1MB 의 Stack 을 가졌고, 64bit 는 8Mb 의 Stack 을 갖는다. 
   macOS 역시 8MB 를 갖는다.)
- Heap 과 달리 **빈 메모리를 추적하기 위한 리스트가 필요하지 않으며**, 단지 현재 `Stack 의 Top 을 가리키는 하나의 포인터만 필요`로한다. 
  따라서 단순히 **Push/Pop 으로만 작동**하기 때문에 메모리 상 위치를 조절할 필요가 없어 속도가 빠르다. 

> 따라서 `Heap 을 사용할 필요가 없다면 Stack 을 사용`하는 것이 좋다.

#### 2. Heap

FIFO(First In First Out)로 작동하며, 일반적으로 [BSS](#h-3-bss) Segment 의 끝에서 시작해 더 높은 메모리 주소 방향으로 채워나간다.
<br>

__Heap 에 할당되는 데이터는 다음과 같다__

- `compile-time 에 크기를 알 수 없는 데이터`(runtime 때 메모리 크기를 결정)
- `scope 가 제한되지 않은 데이터`(**static, global variables** 와 같이 여러 곳에서 참조되는 변수)
- 메모리가 매우 큰 경우

<br>

__Heap 은 다음과 같은 특징을 갖는다__

- <span style="color: red;">개발자가 직접 관리해야하는 영역</span>이다.
- 개발자의 명시적 할당에 의해 작동하므로 `Explicit Allocation`으로 작동한다.
- 크기를 미리 알 수 없는 경우 `runtime`때 Heap 에 할당되므로 `Dynamic Allocation`으로 작동하기도 한다.
- **Heap 의 크기는 `runtime`에 결정**되며, Stack 과 달리 크기에 제한이 없다(단, Stack Overflow 또는 Heap Overflow 를 
  고려해야하므로 무제한을 의미하는 것은 아니다).
- Dynamic Allocation 으로 작동하는 특성 때문에 **빈 메모리 공간을 추적하기 위한 리스트가 필요**하며, 이를 관리하고 추가로 메모리 상 
  위치 역시 조절해야하므로 상대적으로 속도가 느리다.
- Heap 에 Allocation 과 Deallocation 이 반복되며 GC 가 작동하기 전에 사용하지 않는 영역이  발생하게 되는데, 이를 `in used nodes`와 
  `unused nodes`가 **mixed** 되었다고 한다. 이로 인해 메모리 영역이 조각나게 되는데 이런 상태를 `Fragmentation State`라 한다. 
  이는 메모리 접근 시 빈 공간으로 인한 Overhead 가 발생되므로 성능 저하를 일으킨다.

> - C 언어와 달리 GC 가 존재하는 언어는 일반적으로 GC 가 Heap 에 할당된 메모리를 해제해 Memory Leak 을 방지해 개발자가 직접 메모리를 관리할 
> 필요는 없지만 성능 최적화를 위해 I/O 작업 후 개발자가 명시적으로 해제하는 코드를 넣어 자원이 빠르게 회수되도록 해야한다.
> - 코드를 잘못 작성해 Strong Reference Cycles 가 발생해 GC 가 작동하지 못하는 일이 발생하지 않도록 주의를 기울여야한다.

#### 3. BSS

Block Started by Symbol 의 약어다.

변수를 선언하는 과정을 떠올려보자.

1. 변수를 선언하면 변수에 대한 메모리 공간이 할당된다.
2. 저장할 값을 초기화 한다.
3. 그 값을 변수에 할당한다.

하지만 BSS 는 값을 변수에 할당하기 전 `변수를 선언해 메모리에 공간만 할당한 상태`를 나타내는 Segment 다.

일반적으로 Kernel 에 의해 메모리가 0 으로 초기화 되지만 Heap 은 동적으로 메모리 할당이 이루어지기 때문에 변수를 선언만 하고 초기화를 하지 않을 
경우 메모리 공간에 이전에 저장되었던 Garbage Data 가 남아있을 수 있어 예기치 않은 작동이 발생될 수 있다. 따라서 선언과 동시에 초기화를 하거나 
선언과 초기화의 텀을 길지 않게 관리해야한다.

즉, `BSS 는 일시적인 상태로만 존재해야`한다.

#### 4. Data

BSS 상태에서 초기화 된 `값을 변수에 할당해 변수의 초기화가 완료된 상태`를 나타내는 Segment 다.

이 Segment 는 `Read-only Space`와 `Read/Write Space`로 나뉜다.

#### 5. Text

`Read-only Space`로 `앱의 코드를 저장`하는 Segment 다.

여기에 저장되는 코드는 우리가 작성한 코드 자체가 아니다. 컴퓨터가 이해하고 바로 실행할 수 있도록 Compile 된 가장 낮은 low-level 언어인 
`Machine Code` 형태로 저장된다.

---

### 4. Stack vs. Heap 👩‍💻

인터넷에 돌아다니면 Value Types 는 Stack, Reference Types 는 Heap 에 저장된다는 글을 자주 보게 된다. 또는 Value Types 인데 왜 
Heap 에 저장되었지? 알다가도 모르겠다 하는 글도 많고...

물론, compiler 가 판단하기 때문에 예상과 다른 결과를 보이는 것은 언제나 가능하다. 하지만 대부분의 문제는 다음 두 가지 명확한 기준만 알고 있다면 
예측이 가능하다.

- Compile-time 에 크기를 알 수 있는가? (= Dynamic Allocation 이 필요한가?)
- Context 가 제한되는가? (= Global 하게 접근이 가능한가?)
- Stack 에 담길 수 있는 크기인가?

<br>

그렇다면 한 번 생각해보자. 

__Q1 ) Value Types 는 Stack, Reference Types 는 Heap 에 저장된다?__

👉🏻기본적으로 Value Types 는 Stack, Reference Types 에 저장되는 것이 맞다. 하지만 Value Types 라 하더라도 Compile-time 에 
  크기를 알 수 없는 경우, 전역 변수와 같이 Context 가 제한되지 않는 경우, 또는 Stack 에 담기 너무 큰 데이터의 경우는 Heap 에 저장된다.
<br>

__Q2 ) Collection 은 항상 Heap 에 저장된다?__

👉🏻일반적으로 Collection 을 사용하는 경우는 크기를 미리 알 수 없는 경우에 해당한다. 그렇기 때문에 경우 Compile-time 에 크기를 미리 알 수 
  없어 Runtime 에 Dynamic Allocation 을 해야하만 한다. 그래서 Heap 에 저장된다. 하지만 크기를 미리 정할 수 있고 그 크기가 작은 경우라면 
  Stack 에 저장되는 것도 가능하다.
<br>

__Q3 ) Structures 는 Value Types 인데 여기에 Reference Types 가 저장되는 경우는 어떻게 되는가?__

👉🏻Swift 는 First-Class Citizens 을 지원하는 언어로 Functions, Closures 를 포함해 모든 것을 변수/상수에 할당할 수 있다. 따라서 
  어떤 Classes 를 할당할 수 있을 뿐 아니라 Functions, Closures 모두 할당이 가능하다. 그리고 이들은 Reference Types 다. 그러므로 
  Swift 에서 Structures 가 Value Types 이더라도 그 내부에 저장된 데이터 역시 Value Types 인 것은 아니다.  
  Array 와 같은 Collection, String Types 를 예로 들 수 있다. Swift 에서 String Types 는 Structures 로 정의되어있지만 이것은 
  내부에 Characters 를 Collection 으로 저장한다. 따라서 String Types 자체는 일반적으로 Stack 에 저장되지만, 그 안의 Characters 는 
  Heap 에 저장되고, String Types 는 이 Characters 의 Pointer 를 저장한다.
<br>

__Q4 ) Structures 를 Value Types 로 만들어 놓고 안에 Heap 에 저장되는 데이터가 있다면 Value Types 라는 것이 의미가 있는가?__

👉🏻물론 Structures 내부에 모든 데이터가 Value Types 일 경우에만 ARC 가 작동하지 않는다. 하지만 그렇다고 해서 Types 자체가 Value Types 
  인 것이 의미가 없는 것은 아니다. 비록 내부에 존재하는 Reference Types 로 인해 ARC 가 필요하고 Allocation, Deallocation 에 비용이 
  수반됨은 물론, Heap 을 사용하는데서 오는 성능 저하도 발생할 수 밖에 없음에도 Structures 를 사용하는 것은 많은 이점을 가져다준다.

  Apple 은 Swift 대부분의 Types 를 Structures 를 이용해 Value Types 로 구현했을 뿐 아니라 WWDC 에서도 성능 특성을 보여줌과 함께 
  Structures 를 선호하라고 했다. 즉, 이것은 Apple 의 철학이 담겨있을 뿐 아니라 많은 부분에서 이점이 있음을 표현하는 것이다.
  내부에 ARC 가 작동하더라도 Structures 를 Value Types 로 정의하고 선호하라는 의미는 언제나 `복사가 되도록 하겠다는 의미`이다. 따라서 
  Swift Compiler 에 의해 Class 로 선언할 때보다 더 경량화된 메모리 사용을 보장할 뿐 아니라 `Arguments 로 전달될 때 Copy`되어 전달된다는 
  것을 의미한다. <span style="color: red;">Structures 는 더 안정적이고 예측 가능하며 다루기가 쉽다</span>는 것이 Swift 에서 
  Structures 가 갖는 최고의 장점이다.

<br>

Stack 과 Heap 을 표로 비교하면 다음과 같다.

|                           |                  Stack                  |        Heap         |
|---------------------------|:---------------------------------------:|:-------------------:|
| Speed                     |                  Fast                   |        Slow         |
| Empty Memory Tracing List |                    X                    |          O          |
| Fragmentation State       |                    X                    |          O          |
| Size Decision             |              Compile-time               |       Runtime       |
| Size Restriction          | 1 ~ 8 MB (Difference by OS and Devices) |   Non-limitation    |
| Input/Output Model        |                  LIFO                   |        FIFO         |
| Allocation                |                Automatic                |  Explicit/Dynamic   |
| Deallocation              |     Immediately after function exit     | Manual or GC or ARC |

---

### 5. Stack/Heap Overflow 👩‍💻

#### 1. Stack Overflow

일반적으로 Recursive Functions 가 너무 깊게 들어가거나 Local Variables 의 크기가 너무 큰 경우 발생할 수 있다. Stack 은 Heap 과 달리 
크기가 작기 때문에 Overflow 가 발생되기 쉽다. 실수로 함수가 순환하는 일이 없도록 해야하며, Tail Recursive Functions 를 지원하는 언어의 
경우 Optimization 을 켜고, 그렇지 않은 경우 Loops 로 변경하도록 한다.

#### 2. Heap Overflow

최근에는 시스템 메모리가 충분히 커졌을 뿐 아니라 대부분 GC 가 있기 때문에 Heap Overflow 는 Stack Overflow 와 달리 쉽게 일어나지는 않는다. 
주의해야 하는 것은 Heap 에 할당한 메모리 공간보다 더 큰 데이터를 저장하려 하는 경우인데, 가장 쉽게 발생하는 경우는 Initializers 에 의해 
생성된 객체가 할당된 것보다 너무 크거나 Array 의 Index 가 잘못되었을 때 발생하기 쉽다. 특히 Array 의 Index 접근에 의한 문제는 반드시 
Error Handling 을 해줘야한다.

#### 3. Security Vulnerability

Stack Overflow 와 Heap Overflow 는 모두 메모리 취약점으로 해커의 공격 타겟이 된다. 따라서 적절한 방어책을 마련하는 것이 중요한데, 입력 
데이터의 크기를 검증하고, 메모리 할당 및 해제에 대한 주의를 기울여야한다. 특히 Strong Reference Cycles 는 절대 일어나서는 안 되며, 
Error Handling 을 반드시 하고, 안전한 함수를 사용해야한다.


<br><br>

---
Reference

1. "Introduction to RTOS." Digi-Key Electrons. accessed Apr. 05, 2023, [Digi-Key](https://www.digikey.com/en/maker/projects/introduction-to-rtos-solution-to-part-4-memory-management/6d4dfcaa1ff84f57a2098da8e6401d9c).
2. Yokoyama, Shohei. "Understanding Memory Layout." Medium. last modified Nov. 10, 2018, [Understanding Memory Layout](https://medium.com/@shoheiyokoyama/understanding-memory-layout-4ef452c2e709).
3. Teixeira, Nickolas. "Stack vs Heap. What’s the Difference and Why Should I Care?." Linux.com last modified Jun. 28, 2018, [Stack vs Heap. What’s the Difference and Why Should I Care?](https://www.linux.com/training-tutorials/stack-vs-heap-whats-difference-and-why-should-i-care/).

