---
layout: post
title: What is Functional Programing?
subtitle: Deep Dive into Functional Programing
categories: cs
tags: [cs, javascript, swift, pure function, referential transparency, idempotent, unary, unitary, monadic, composition, lambda, pipe, currying, mutating, immutable]
---

### 1. Idempotence (멱등 법칙) 👩‍💻

연산을 여러 번 하더라도 결과가 달라지지 않는 성질을 의미한다. 함수형 프로그래밍은 바로 이 멱등 법칙에 기초해 발전한 프로그래밍 기법이다.

#### 1. Unary Operation (단항연산)

Monadic Operation, Unitary Operation 라고도 불리며 어떤 집합 S 에서 자신으로 가는 함수의 멱등성은 S 의 모든 원소 x 에 대해 

```
f(f(𝑥)) = f(𝑥)
```

가 성립한다는 성질이다. 멱등성을 지닌 함수를 멱등 함수(Idempotent Function)라고 한다.

#### 2. Identity Function (항등 함수)

```
f(𝑥) = 𝑥
```

는 항상 자기 자신이므로 멱등성을 만족한다.

#### 3. Constant Function (상수 함수)

```
f(𝑥) = a
```

역시 멱등성을 만족한다.

---

### 2. Referential Transparency (참조 투명성) 👩‍💻

#### 1. Satisfying Referential Transparency

- 산술 연산은 참조 상 투명하다. y = a x b 는 여러 번 실행하더라도 a, b 가 동일하다면 매번 동일한 y 를 갖는다. 
- 표현식과 관련된 모든 함수가 순수 함수라면 표현식은 참조 상 투명하다. 이는 어떠한 `side effect`도 존재하지 않음을 의미힌다.

**선언형 프로그램밍**, **함수형 프로그래밍**은 <span style="color: red;">참조 투명성을 만족</span>시키는 방향으로 동작한다.

#### 2. Unsatisfying Referential Transparency

- 할당은 참조 상 투명하지 않다. 𝑥 = 𝑥 + 1 은 초기값이 10일 경우 1번 실행하면 11이지만 2번 실행하면 12가 된다.
- 또 다른 예로 today()는 참조 상 투명하지 않다. 오늘 실행한 결과와 내일 실행한 결과가 다르기 때문이다.

**명령형 프로그래밍**은 `프로그램이 실행되는 시점에 따라 특정 시점에만 유효`하다. 따라서 **정의와 순서가 중요**하고 
이는 <span style="color: red;">참조 상 투명하지 않다</span>.

---

### 3. Function Composition (함수의 합성) 👩‍💻

#### 1. Definition

함수의 공역이 다른 함수의 정의역과 일치하는 경우, 두 함수를 이어 하나의 함수로 만드는 연산을 할 수 있다.

![Function Composition](/assets/images/posts/2023-05-01-functional-programing/function-composition.png){: width="600"}

임의의 집합 X, Y, Z 및 두 함수

```
f: X ~> Y
g: Y ~> Z
```

가 존재할 때 f 의 공역과 g 의 정의역이 같다면 합성 함수 g ◦ f 를 정의할 수 있다. 

```
g ◦ f: X ~> Z
g ◦ f: x ~> g(f(𝑥))
```

따라서 위 그림의 경우 `(g ◦ f)(c) = #` 이 된다.

#### 2. Associative Property (결합 법칙)

함수의 합성이 정의될 수 있다면 이는 산술 연산과 마찬가지로 결합 법칙을 만족한다.

`𝑥 + (𝑦 + z) = (𝑥 + 𝑦) + z` 인 것처럼

```
f: X ~> Y
g: Y ~> Z
h: Z ~> W
```

가 주어졌을 때

`h ◦ (g ◦ f) = (h ◦ g) ◦ f: X ~> W` 를 만족한다.

---

### 4. Lambda Calculus (람다 대수) 👩‍💻

1930년대 알론조 처치가 함수를 추상화 해 단순하게 표현할 수 있도록 하기 위해 고안되었다.

람다 대수에 의하면 함수 `s(𝑥, 𝑦) = 𝑥 x 𝑥 + 𝑦 x 𝑦`는 다음과 같이 작성할 수 있다.

1. 함수가 반드시 이름을 가질 필요가 없다. 함수의 이름 s 를 제거한다.  
   `(𝑥, 𝑦) ~> 𝑥 x 𝑥 + 𝑦 x 𝑦`
2. 함수의 입력 변수 이름 또한 필요가 없다. 예를 들어 `𝑥 ~> 𝑥`와 `𝑦 ~> 𝑦`는 변수 이름은 다르지만 같은 항등함수다.  
   마찬가지로 `(𝑥, 𝑦) ~> 𝑥 x 𝑥 + 𝑦 x 𝑦`와 `(𝑢, 𝑣) ~> 𝑢 x 𝑢 + 𝑣 x 𝑣`는 같은 함수를 나타낸다.
3. 두 개 이상의 입력을 받는 함수는 하나의 입력을 받아 또 다른 함수를 출력하는 함수로 다시 쓸 수 있다.  
   `(𝑥, 𝑦) ~> 𝑥 x 𝑥 + 𝑦 x 𝑦`는 `𝑥 ~> (𝑦 ~> 𝑥 x 𝑥 + 𝑦 x 𝑦)`와 같은 형태로 다시 쓸 수 있고 이를 Currying 이라 한다.  
   위 함수 `(𝑥, 𝑦)`는 단일 입력 함수를 두 번 적용하는 것으로 이해할 수 있다.  
   ```
   (𝑥 ~> (𝑦 ~> 𝑥 x 𝑥 + 𝑦 x 𝑦))(5)(2)
   = (𝑦 ~> 5 x 5 + 𝑦 x 𝑦)(2)
   = 5 x 5 + 2 x 2
   ```

---

### 5. Functional Programming 👩‍💻

---

### 6. Examples 👩‍💻

---

### 7. Pipe 👩‍💻

---

### 8. Currying 👩‍💻


<br><br>

---
Reference

1. "참조 투명성." Wikipedia. Feb. 06, 2022, [Wikipedia - 참조 투명성](https://ko.wikipedia.org/wiki/참조_투명성).
2. "멱등법칙." Wikipedia. Mar. 07, 2022, [Wikipedia - 멱등법칙](https://ko.wikipedia.org/wiki/멱등법칙).
3. "함수의 합성." Wikipedia. Jan. 21, 2023, [Wikipedia - 함수의 합성](https://ko.wikipedia.org/wiki/함수의_합성).
4. "람다 대수." Wikipedia. Jul. 23, 2022, [Wikipedia - 람다 대수](https://ko.wikipedia.org/wiki/람다_대수).
5. Moon. "함수형 프로그래밍 - Pipe." Medium. Dec. 29, 2019, [함수형 프로그래밍](https://medium.com/오늘의-프로그래밍/함수형-프로그래밍-pipe-c80dc7b389de).
