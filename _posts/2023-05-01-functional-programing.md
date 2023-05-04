---
layout: post
title: What is Functional Programing?
subtitle: Deep Dive into Functional Programing
categories: cs
tags: [cs, javascript, swift, pure function, referential transparency, idempotent, unary, unitary, monadic, composition, lambda, pipe, currying, mutating, immutable]
---

### 1. Idempotence (멱등 법칙) 👩‍💻

연산을 여러 번 하더라도 결과가 달라지지 않는 성질을 의미한다. 함수형 프로그래밍은 바로 이 멱등 법칙에 기초해 발전한 프로그래밍 기법이다.

__1 ) Unary Operation (단항연산)__

Monadic Operation, Unitary Operation 라고도 불리며 어떤 집합 S 에서 자신으로 가는 함수의 멱등성은 S 의 모든 원소 x 에 대해 

f(f(x)) = f(x)

가 성립한다는 성질이다. 멱등성을 지닌 함수를 멱등 함수(Idempotent Function)라고 한다.

<br>

__2 ) Identity Function (항등 함수)__

f(x) = x

는 항상 자기 자신이므로 멱등성을 만족한다.

<br>

__3 ) Constant Function (상수 함수)__

f(x) = a

역시 멱등성을 만족한다.

---

### 2. Referential Transparency (참조 투명성) 👩‍💻



---

### 3. Function Composition (함수의 합성) 👩‍💻

---

### 4. Lambda Calculus (람다 대수) 👩‍💻

---

### 5. Pipe 👩‍💻

---

### 6. Currying 👩‍💻

<br><br>

---
Reference

1. "참조 투명성." Wikipedia. Feb. 06, 2022, [Wikipedia - 참조 투명성](https://ko.wikipedia.org/wiki/참조_투명성).
2. "멱등법칙." Wikipedia. Mar. 07, 2022, [Wikipedia - 멱등법칙](https://ko.wikipedia.org/wiki/멱등법칙).
3. "함수의 합성." Wikipedia. Jan. 21, 2023, [Wikipedia - 함수의 합성](https://ko.wikipedia.org/wiki/함수의_합성).
4. "람다 대수." Wikipedia. Jul. 23, 2022, [Wikipedia - 람다 대수](https://ko.wikipedia.org/wiki/람다_대수).
5. Moon. "함수형 프로그래밍 - Pipe." Medium. Dec. 29, 2019, [함수형 프로그래밍](https://medium.com/오늘의-프로그래밍/함수형-프로그래밍-pipe-c80dc7b389de).
