---
layout: post
title: Memory Layout - Stack / Heap
subtitle: Deep dive into memory layout 
categories: cs
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

이 중 OS 가 동작하기 위한 Kernel Space 를 제외한 나머지 5개 Segments(Stack 을 포함하는)를 `User Space`라 한다.

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

사용자에게 할당되는 메모리 영역으로, 앱은 이 영역 안에서 동작하게된다. 사용자 공간 역시 다음과 같이 5개의 Segments 로 나눌 수 있다.

- Stack
- Heap
- BSS(Uninitialized Data Segment)
- Data(Initialized Data Segment)
- Text(Code)

#### 1. Stack

LIFO(Last In First Out)로 동작하며, OS Kernel Space 바로 아래 위치해 높은 메모리 주소부터 채워나간다.

앱에서 `함수 호출에 필요한 데이터를 저장하는 Segment`로 함수는 Stack Push/Pop 을 통해 동작한다. 함수가 쌓이고, 가장 마지막에 쌓인 함수가 
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

- 함수가 호출될 때 `Automatic Allocation`으로 동작하며, 함수 호출이 완료되면 `자동으로 deallocated` 된다.
- **Stack 의 크기는 `compile-time`에 결정**되며, OS 에 따라 제한이 존재한다.  
  (i.e. iOS 의 경우 기종마다 다를 수 있으나 일반적으로 32bit 는 1MB 의 Stack 을 가졌고, 64bit 는 8Mb 의 Stack 을 갖는다. 
   macOS 역시 8MB 를 갖는다.)
- Heap 과 달리 **빈 메모리를 추적하기 위한 리스트가 필요하지 않으며**, 단지 현재 `Stack 의 Top 을 가리키는 하나의 포인터만 필요`로한다. 
  따라서 단순히 **Push/Pop 으로만 동작**하기 때문에 메모리 상 위치를 조절할 필요가 없어 속도가 빠르다. 

> 따라서 `Heap 을 사용할 필요가 없다면 Stack 을 사용`하는 것이 좋다.

#### 2. Heap

FIFO(First In First Out)로 동작하며, 일반적으로 [BSS](#h-3-bss) Segment 의 끝에서 시작해 더 높은 메모리 주소 방향으로 채워나간다.
<br>

__Heap 에 할당되는 데이터는 다음과 같다__

- `compile-time 에 크기를 알 수 없는 데이터`(runtime 때 메모리 크기를 결정)
- `scope 가 제한되지 않은 데이터`(**static, global variables** 와 같이 여러 곳에서 참조되는 변수)
- 메모리가 매우 큰 경우

<br>

__Heap 은 다음과 같은 특징을 갖는다__

- <span style="color: red;">개발자가 직접 관리해야하는 영역</span>이다.
- 개발자의 명시적 할당에 의해 동작하므로 `Explicit Allocation`으로 동작한다.
- 크기를 미리 알 수 없는 경우 `runtime`때 Heap 에 할당되므로 `Dynamic Allocation`으로 동작하기도 한다.
- **Heap 의 크기는 `runtime`에 결정**되며, Stack 과 달리 크기에 제한이 없다(단, Stack Overflow 또는 Heap Overflow 를 
  고려해야하므로 무제한을 의미하는 것은 아니다).
- Dynamic Allocation 으로 동작하는 특성 때문에 **빈 메모리 공간을 추적하기 위한 리스트가 필요**하며, 이를 관리하고 추가로 메모리 상 
  위치 역시 조절해야하므로 상대적으로 속도가 느리다.
- Heap 에 Allocation 과 Deallocation 이 반복되며 GC 가 동작하기 전에 사용하지 않는 영역이  발생하게 되는데, 이를 `in used nodes`와 
  `unused nodes`가 **mixed** 되었다고 한다. 이로 인해 메모리 영역이 조각나게 되는데 이런 상태를 `Fragmentation State`라 한다. 
  이는 메모리 접근 시 빈 공간으로 인한 Overhead 가 발생되므로 성능 저하를 일으킨다.

> - C 언어와 달리 GC 가 존재하는 언어는 일반적으로 GC 가 Heap 에 할당된 메모리를 해제해 Memory Leak 을 방지해 개발자가 직접 메모리를 관리할 
> 필요는 없지만 성능 최적화를 위해 I/O 작업 후 개발자가 명시적으로 해제하는 코드를 넣어 자원이 빠르게 회수되도록 해야한다.
> - 코드를 잘못 작성해 Strong Reference Cycles 가 발생해 GC 가 동작하지 못하는 일이 발생하지 않도록 주의를 기울여야한다.

#### 3. BSS

Block Started by Symbol 의 약어다.

변수를 선언하는 과정을 떠올려보자.

1. 변수를 선언하면 변수에 대한 메모리 공간이 할당된다.
2. 저장할 값을 초기화 한다.
3. 그 값을 변수에 할당한다.

하지만 BSS 는 값을 변수에 할당하기 전 `변수를 선언해 메모리에 공간만 할당한 상태`를 나타내는 Segment 다.

일반적으로 Kernel 에 의해 메모리가 0 으로 초기화 되지만 Heap 은 동적으로 메모리 할당이 이루어지기 때문에 변수를 선언만 하고 초기화를 하지 않을 
경우 메모리 공간에 이전에 저장되었던 Garbage Data 가 남아있을 수 있어 예기치 않은 동작이 발생될 수 있다. 따라서 선언과 동시에 초기화를 하거나 
선언과 초기화의 텀을 길지 않게 관리해야한다.

즉, `BSS 는 일시적인 상태로만 존재해야`한다.

#### 4. Data

BSS 상태에서 초기화 된 `값을 변수에 할당해 변수의 초기화가 완료된 상태`를 나타내는 Segment 다.

이 Segment 는 `Read-only Space`와 `Read/Write Space`로 나뉘며 저장되는 이 레벨부터 저장되는 코드는 `Machine Code`다.

#### 5. Text

`Read-only Space`로 `앱의 코드를 저장`하는 Segment 다.

여기서 저장하는 코드는 [Data](#h-4-data) 와 마찬가지로 compile 되어 컴퓨터가 이해할 수 있는 low-level 언어인 `Machine Code`다.

---

### 4. Stack vs. Heap


---

### 5. Stack Overflow


<br><br>

---
Reference

1. "Introduction to RTOS." Digi-Key Electrons. accessed Apr. 05, 2023, [Digi-Key](https://www.digikey.com/en/maker/projects/introduction-to-rtos-solution-to-part-4-memory-management/6d4dfcaa1ff84f57a2098da8e6401d9c).
2. Yokoyama, Shohei. "Understanding Memory Layout." Medium. last modified Nov. 10, 2018, [Understanding Memory Layout](https://medium.com/@shoheiyokoyama/understanding-memory-layout-4ef452c2e709).
3. Teixeira, Nickolas. "Stack vs Heap. What’s the Difference and Why Should I Care?." Linux.com last modified Jun. 28, 2018, [Stack vs Heap. What’s the Difference and Why Should I Care?](https://www.linux.com/training-tutorials/stack-vs-heap-whats-difference-and-why-should-i-care/).

