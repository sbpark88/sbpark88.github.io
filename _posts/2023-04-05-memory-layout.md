---
layout: post
title: Memory Layout - Stack / Heap
subtitle: Deep dive into memory layout 
categories: cs
tags: [cs, memory, kernel space, user space, stack, heap, bss, data, text, stack overflow, heap overflow]
---

### 1. Why you have to know about the Memory Layout? 👩‍💻

시스템은 메모리 사용 방법을 추적한다. 개발자가 앱을 개발할 때 C 와 같은 언어를 제외하면 대부분의 현대 언어는 메모리 관리를 직접 할 피요가 없다. 
하지만 메모리 구조에 대한 CS 지식이 전혀 없다면 잘못 작성된 코드로 인해 앱이 자동으로 메모리 관리를 하지 못 하고 Memory Leak 이 발생하는 
문제를 야기할 수도 있고, 잘못된 접근으로 인한 앱의 Crash 를 유발할 수도 있다. 결국 개발자로써 한계에 부딛히게 될 것이고, 그렇기 때문에 모든 
개발자에게 메모리를 이해하는 것은 매우 중요하다.

> 대부분의 시스템은 `Wroking Memory(RAM)`과 `Non-volatile Memory(Flash)`에 RTOS(Real-time Operating System)가 추가적인 
> 복잡성을 더하게 된다. Embedded 개발자가 아니라면 대부분의 SW 개발자가 신경 써야 하는 영역은 RAM 이라 불리는 메모리 공간, 즉 작업 영역이다.

<br><br>

---
Reference

1. "Introduction to RTOS." Digi-Key Electrons. accessed Apr. 05, 2023, [Digi-Key](https://www.digikey.com/en/maker/projects/introduction-to-rtos-solution-to-part-4-memory-management/6d4dfcaa1ff84f57a2098da8e6401d9c).
2. Yokoyama, Shohei. "Understanding Memory Layout." Medium. last modified Nov. 10, 2018, [Understanding Memory Layout](https://medium.com/@shoheiyokoyama/understanding-memory-layout-4ef452c2e709).
3. Teixeira, Nickolas. "Stack vs Heap. What’s the Difference and Why Should I Care?." Linux.com last modified Jun. 28, 2018, [Stack vs Heap. What’s the Difference and Why Should I Care?](https://www.linux.com/training-tutorials/stack-vs-heap-whats-difference-and-why-should-i-care/).

