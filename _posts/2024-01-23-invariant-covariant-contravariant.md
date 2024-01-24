---
layout: post
title: Covariance, Contravariance, Invariance
subtitle: What is Covariance, Contravariance and Invariance?
categories: [swift, typescript]
tags: [covariance, contravariance, Invariance]
---

### 1. Covariance, Contravariance, Invariance 👩‍💻

프로그래밍 언어에서 각 타입간의 참조 관계가 연관된 것들이 많다. Classes 의 상속 관계, Generics 에 의한 관계, Array 와 같은 
Monad 컨테이너, 함수의 Parameters 와 Return 등 여러 곳에서 이러한 관계가 존재한다. 원래 지정된 관계보다 더 파생되거나 덜 
파생되는 관계 또는 이러한 관계를 갖지 않는 독립적인 관계들이 존재할 수 있는데 이것들에 대한 정의를 나타내는 것이다.

수학에서 **정수** 와 **자연수** 의 다이어그램을 떠올려보자. 정수는 자연수를 포함하기 때문에 정수의 다이어그램 안에 자연수가 속한다. 
여기서 정수는 상위 타입이고, 자연수는 하위 타입이다. 프로그래밍에 있어서도 이러한 관계가 있는데 가장 대표적이고 쉽게 접할 수 있는 게 
바로 *Classes* 의 상속 관계다.

단순히 타입으로만 생각해보자. 타입 `A`와 `B`가 있고, `I<U>` 표기는 *Type Argument* `U`를 갖는 *Type Constructor* `I`를 
나타낸다.

- Covariance: `A ≥ B`일때, 동일하게 `I<A> ≥ I<B>`이다.
- Contravariance: `A ≥ B`일때, 반대로 `I<A> ≤ I<B>`이다.
- Bivariance: Covariance 면서 동시에 Contravariance 이다. 즉, `A ≥ B`일때, `I<A> = I<B>`이다.
- Variance: Covariance 또는 Contravariance 또는 Bivariance 이다.
- Invariance: Non-Variance 이다.

> `co-`: '함께'의 뜻을 나타낸다. 즉, Origin 과 같은 방향으로 타입 참조 특성을 나타낸다.  
> `contra-`: '반대'의 뜻을 나타낸다. 즉, Origin 과 반대 방향으로 타입 참조 특성을 나타낸다.

<br>

이 중 우리가 타입을 구분할 때 이야기하는 것은 Invariance, Covariance, Contravariance 3가지로 좀 더 프로그래밍 관점에서 이야기해보자.

- `Covariance`: 원래 지정된 것보다 더 파생된 타입(more derived type)을 사용할 수 있다.
- `Contravariance`: 원래 지정된 것보다 덜 파생된 타입(less derived type)을 사용할 수 있다.
- `Invariance`: 원래 지정된 것만 사용할 수 있다.

> `Covariant Type Parameters`는 `Polymorphism`과 매우 유사한 할당을 사용할 수 있다.

일반적으로 입력 위치에 해당하는 *Parameter Type* 은 `Invariant`하거나 `Covariant`하고, 출력 위치에 해당하는 *Return Type* 은 
`Covariant`하다. 하지만 이것은 각 언어마다 서로 다른 특징을 보유하고 있기 때문에 반드시 그러한 것은 아니다. 
예를 들어 Scala 는 *Parameter Type* 가 Contravariant 하고, Eiffel 은 Covariant 하다.

|                | Type Relation           | TypeScript 4.7 Syntax |
|----------------|-------------------------|-----------------------|
| Origin         | A ≥ B                   |                       |
| Covariance     | `I<A>` ≥ `I<B>`         | `<out T>`             |
| Contravariance | `I<A>` ≤ `I<B>`         | `<in T>`              |
| Invariance     | `I<A>`, `I<B>` 는 독립적이다. | `<in out T>`          |

---

### 2. Examples in TypeScript 👩‍💻



---

### 3. Examples in Swift 👩‍💻

---






<br><br>

---
Reference

1. "Covariance and contravariance in generics." Microsoft.Net. Sep. 15, 2021, [Covariance and contravariance in generics](https://learn.microsoft.com/en-us/dotnet/standard/generics/covariance-and-contravariance).
2. delmaSong. "item 32. 제네릭과 가변인수(varargs)를 함께 쓸 때는 신중하라" GitHub. Dec. 28, 2020, [item 32. 제네릭과 가변인수(varargs)를 함께 쓸 때는 신중하라](https://github.com/TheSwiftists/effective-swift/blob/main/5장_제네릭/item32.md).
3. Daniel Rosenwasser. "Announcing TypeScript 4.7". Microsoft TypeScript. May. 24, 2022, [Announcing TypeScript 4.7 - Optional Variance Annotations for Type Parameters](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#optional-variance-annotations-for-type-parameters).
4. "Covariance and contravariance (computer science)." Wikipedia. Dec. 12, 2023, [Wikipedia - Inheritance in object-oriented languages](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)#Inheritance_in_object-oriented_languages).
