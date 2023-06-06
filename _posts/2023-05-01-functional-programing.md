---
layout: post
title: Functional Programing & Monad
subtitle: Deep Dive into Functional Programing
categories: cs
tags: [cs, typescript, swift, pure function, referential transparency, idempotent, unary, unitary, type class, functor, applicative functor, monad, composition, lambda, pipe, currying, mutating, immutable]
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
- 표현식과 관련된 모든 함수가 순수 함수라면 표현식은 참조 상 투명하다. 이는 어떠한 `Side Effect`도 존재하지 않음을 의미힌다.

**선언형 프로그램밍**, **함수형 프로그래밍**은 <span style="color: red;">참조 투명성을 만족</span>시키는 방향으로 작동한다.

#### 2. Unsatisfying Referential Transparency

- 할당은 참조 상 투명하지 않다. 𝑥 = 𝑥 + 1 은 초기값이 10일 경우 1번 실행하면 11이지만 2번 실행하면 12가 된다.
- 또 다른 예로 today()는 참조 상 투명하지 않다. 오늘 실행한 결과와 내일 실행한 결과가 다르기 때문이다.

**명령형 프로그래밍**은 `프로그램이 실행되는 시점에 따라 특정 시점에만 유효`하다. 따라서 **정의와 순서가 중요**하고 
이는 <span style="color: red;">참조 상 투명하지 않다</span>.

---

### 3. Function Composition (함수의 합성) 👩‍💻

#### 1. Injection

![Injection](/assets/images/posts/2023-05-01-functional-programing/injection.png){: width="300"}

***One-to-One Function*** 이라고 불리며 `공역(Codomain)`에서 화살을 받는 것 중 두 개 이상의 화살을 한꺼번에 받는 원소가 없음을
의미한다.

#### 2. Surjection

![Surjection](/assets/images/posts/2023-05-01-functional-programing/surjection.png){: width="300"}

***Onto Function*** 이라고 불리며 공역에서 화살을 안 받는 원소가 없음을 의미한다. 즉, `공역(Codomain) = 치역(Range)` 이 성립됨을 
의미한다.

#### 3. Bijection

![Bijection](/assets/images/posts/2023-05-01-functional-programing/bijection.png){: width="300"}

Injection & Surjection 이 성립됨을 의미한다. 즉, `정의역(Domain)`의 모든 화살이 `공역(Codomain)`의 모든 원소에 1:1로 대응함을 
의미한다. 즉, 정의역과 공역의 원소의 개수가 같으며 공역 = 치역이 성립됨을 의미한다.

#### 4. Composition

함수의 공역이 다른 함수의 정의역과 일치하는 경우, 두 함수를 이어 하나의 함수로 만드는 연산을 할 수 있다.

![Function Composition](/assets/images/posts/2023-05-01-functional-programing/function-composition.png){: width="600"}

임의의 집합 A, B, C 및 두 함수

```
f: A ~> B
g: B ~> C
```

가 존재할 때 f 의 공역과 g 의 정의역이 같다면 합성 함수 g ◦ f 를 정의할 수 있다. 

```
g ◦ f: A ~> C
g ◦ f: x ~> g(f(𝑥))
```

따라서 위 그림의 경우 `(g ◦ f)(4) = 3` 이 된다.

#### 5. Associative Property (결합 법칙)

함수의 합성이 정의될 수 있다면 이는 산술 연산과 마찬가지로 결합 법칙을 만족한다.

`𝑥 + (𝑦 + z) = (𝑥 + 𝑦) + z` 인 것처럼

```
f: X ~> Y
g: Y ~> Z
h: Z ~> W
```

가 주어졌을 때

`h ◦ (g ◦ f) = (h ◦ g) ◦ f: X ~> W` 를 만족한다.

#### 6. Disassemble of Composition

함수의 합성에서 주의해야할 것이 있다. 한 가지 예를 들어보자.

```
f: X ~> Y
g: Y ~> Z
```

에서 `g ◦ f` 가 *Bijection* 일 때 각각의 함수 f 와 g 역시 *Bijection* 이 성립할까?

![Disassemble of Composition](/assets/images/posts/2023-05-01-functional-programing/disassembe-of-composition.png){: width="600"}

`g ◦ f` 를 보면 g 의 공역 = 치역이 성립되며 바나나와 당근은 f 의 정의역으로부터 `원숭이 ~> 바나나`, `토끼 ~> 당근` 이 1:1 대응하므로 
Bijection 이다.

반면, f 는 Injection 이지만 Surjection 이 아니고, g 는 Surjection 이지만 Injection 이 아니다. 즉, 합성 함수가 Bijection 
이라고 각각의 함수가 Bijection 인 것은 아니다.

> 우리가 프로그래밍을 하면서 함수를 작성할 때 그 함수가 순수 함수라고 해서 Bijection 이 성립하지는 않는다.
>  
> 예를 들어 어떤 합성 함수 `g ◦ f`는 정수를 받아 `odd`와 `even` 두 가지 case 를 갖는 Enumeration 으로만 응답한다.
> 이 함수는 Surjection 이나 Injection 은 아니다.

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

#### 1. Why Functional Programming?

순수 함수는 Side Effect 가 없고 결정론적이다. 따라서 이런 함수를 선언형으로 사용하고 함수를 합성하면 그 결과 합성 함수 역시 Side Effect 가 
없으며 테스트가 쉽다는 장점을 갖는다.

또한 함수를 작은 단위로 쪼개 놓았기 때문에 재사용이 쉬우므로 작은 함수들을 합성해 새로운 함수를 만드는데 사용할 수 있다.

#### 2. Pure Function

순수 함수는 다음 특징을 갖는다.

- 함수의 Context 는 Isolation 되어야 한다.
- 함수의 Parameters 는 Immutable 해야 한다.
- 함수는 Asynchronous 작동 없이 결과를 즉시 반환해야 한다.
- 함수가 예외를 발생시키지 않아야 한다.

<br>

__1 ) 함수의 Context 는 Isolation 되어야 한다__

함수가 Static/Global Variables 와 같은 context 외부와 상호작용 할 수 없음을 의미한다. 함수 context 외부의 변수는 함수가 제어할 수 
없기 때문에 외부 요인에 의해 함수의 결과가 달라지거나 에러가 발생할 수 있기 때문이다. 따라서 순수 함수의 context 는 외부 요인으로부터 
격리되어야 한다.

또한, 함수가 Escaping Closures, Callback Functions 와 같은 context 가 종료된 후 작동을 허용하지 않아야 한다. 함수 context 가 
종료된 후 작동한다는 것 자체가 context 외부와 상호작용 한다는 것을 의미한다. 따라서 순수 함수는 context 가 종료된 후 작동하는 코드가 없어야 
한다.

<br>

__2 ) 함수의 Parameters 는 Immutable 해야 한다__

즉, 함수의 Parameters 는 Constants 로 작동해야한다.

Swift 의 경우 기본적으로 Parameters 는 Copy 되어 전달되며, `inout`으로 선언하지 않는 한 Constants 로 선언되므로 자동으로 순수 함수의 
조건을 만족한다.

반면 TypeScript 역시 Parameters 가 Copy 되어 전달되는 것은 동일하나, Variables 로 선언되어 수정이 가능하다. TypeScript 에서 
Parameters 의 Immutable 을 처리하기 위해서는 다음과 같은 방법을 사용할 수 있다.

- Parameters 가 Array 또는 Tuple Literal Types 인 경우 `readonly` modifier 를 사용할 수 있다.

```typescript
function square(arr: readonly number[]): number[] {
  return arr.map(n => n ** 2)
}
```

- 그 외 Types 또는 JavaScript 인 경우 내부에 새 Constants 를 선언하고 Deep Copy 한다.

```typescript
function greeting(_name: string, _age: number) {
  const [name, age] = [_name, _age]
  console.log(`Hello~ My name is ${name} and I amd ${age} years old.`)
}
```

<br>

__3 ) 함수는 Asynchronous 작동 없이 결과를 즉시 반환해야 한다__

함수가 Future, Promise, DispatchQueue, setTimeout 과 같은 비동기 처리를 하지 않고 결과를 즉시 반환해야한다.

> 여기서 즉시 반환해야한다는 것 때문에 Lazy Evaluation 을 오해할 수 있으나, Evaluation 이 지연되는 것일 뿐 Closure 를 즉시 
> 반환한다.

<br>

__4 ) 함수가 예외를 발생시키지 않아야 한다__

에러를 throw 한다는 것은 내부 코드에 Side Effect 가 존재한다는 것을 의미한다. 예를 들어 어떤 함수가 계산을 하는데 값이 nil 일 
가능성이 있다고 해보자. 이 경우 우리는 Monad 를 이용해 순수 함수가 되도록 만들 수 있다. Optional Monad 를 사용해 Wrapping 
시키면 값의 nil 유무와 관계 없이 함수는 순수해진다.

<br>

> 물론, 실제로 개발할 때 위 조건을 모두 만족하는 순수 함수는 많지 않다.  
> 가장 흔한 예로 비동기 문제만 해도 그렇다. 파일 입출력이나 데이터 통신 없이 순수하게 코드만으로 돌아가는 경우는 거의 없기 때문이다. 
> 최대한 Side Effect 를 줄이기 위해 데이터 통신을 하는 로직에 async/await 를 사용해 context 밖으로 나가지 않도록 가급적 
> 동기 코드인 것 처럼 작동하도록 하거나 파일 복사와 같은 작업에서 불변성 위반을 최소화 하기 위해 하나의 동기 함수에 로직을 정의하는 
> 것과 같은 노력을 할 수 있지만 엄밀히 말해 순수 함수라 할 수는 없다.
> 
> 실제로 개발할 때 초점을 두고 고민해야할 것은 <span style="color: red;">예측 가능한가</span>이다. 에러가 예측 가능하고 
> 이를 컨트롤 및 테스트 가능하다면 이는 순수 함수의 조건을 만족하도록 Monad 를 이용해 처리하거나 그렇지 못하더라도 순수 함수 조건에 
> 근접하다고 볼 수 있다.

---

### 6. Monad 👩‍💻

#### 1. Category Theory

Monad 를 이해하기 위해서는 어떤 이론에서 Monad 라는 개념이 나왔는지를 이해해야한다. 이것은 수학의 범주 중 Category Theory 라는 학문에서 
시작되었다. 

위에서 살펴본 [함수의 합성](#h-3-function-composition-함수의-합성-) 이 바로 이 Category Theory 를 기반으로 하는 것이다.

![Category Theory](/assets/images/posts/2023-05-01-functional-programing/category-theory.png){: width="300"}

Category Theory 에서는 X, Y, Z 를 `Set`, 그리고 f, g 를 `Morphism`이라 부른다.

![Functor and Applicative Functor and Monad](/assets/images/posts/2023-05-01-functional-programing/functor-applicative-functor-monad.webp)

그리고 Category Theory 를 일반화 시키기 위해 추상화 하는 단계에서 `Functor`, `Applicative Functor`, `Monad` 와 같은 것들을 
이해해야한다.

우선 Functor 에 대해 알아보자. Functor 가 가장 일반화된 개념이고, 이것은 다음 그림처럼 `lift` 시키는 것과 같다.

<span id="functorLiftSystemAtoB"></span>

![Functor 1](/assets/images/posts/2023-05-01-functional-programing/functor-1.jpg){: width="400"}

C 시스템을 D 시스템으로 옮길 수 있으며 모든 관계가 유지된다. 그리고 이것은 다시 원래대로 되돌아갈 수 있으며 Functor 를 걸기 이전과 동일해야한다.

![Functor 2](/assets/images/posts/2023-05-01-functional-programing/functor-2.png){: width="400"}

또한 Functor 는 Functor 를 걸고 Morphism 을 적용한 것과 Morphism 을 적용한 것에 Functor 를 건 것이 동일해야한다.

그렇다면 왜 굳이 이런걸 하는 것일까? Fourier Transform, Laplace Transform 혹은 Log 함수를 이용해본적이 있다면 기존의 Coordinate Systems 에서 계산하기 힘든 것들을
Complex Plane(복소 평면)으로 옮겨 계산 후 복원하거나, 비율로 다룰 수 있는 Log 함수를 이용해 계산해본 적이 있을 것이다. 간단하게 이야기하면
고등학교 수학책에 붙어 있는 상용로그 표만 있으면 크고 복잡한 계산을 얼마든 간단하게 할 수 있음은 물론이고, log 함수를 이용해 과학시간에 비율로
스케일링 된 그래프가 주는 편리함을 경험해 보았을 것이다.

즉, 무언가 '계산을 편하게 하기 위해 그 환경을 그대로 lift 시켜 변화시키는 것' 이것이 바로 Functor 의 역할이다.

Functor 에 기능을 더해 추상화 시켜 좀 더 특수하게 만든 것이 Applicative Functor 고, Applicative Functor 에 기능을 더해 추상화 
시킨 것이 Monad 다.

#### 2. Type Class

일반적으로 OOP 가 중심인 언어에서 String 이라는 Class/Structure 를 만든다고 해보자. 그러면 String 이라는 Class/Structure 를 
만들고, 필요한 함수를 구현하는 식으로 설계한다. 그리고 이러한 Type 을 Generic 을 이용해 추상화 한다.

하지만 순수한 함수형 언어인 Haskell 은 이러한 발상을 전환해 Monad 방식으로 만들어 특정 함수(Morphism)가 Types 에 제약을 받지 않도록 
한다. 즉, Monad 공간에서 자유롭게 사용 가능한 함수를 통해 어떤 Types 가 lift 되든간에 적용할 수 있고, 이를 다시 lift 이전으로 되돌리는 
방식을 취한 것이다.

<br>

수학이 아닌 프로그래밍 세계에서 Monad 를 왜 사용하는지, 어떤 이점을 갖는지 이해하기 위한 첫 걸음은 `Type Class`가 왜 필요한지 이해하는 것이다.  
Monad 의 가장 흔한 예로 Maybe(=Optional)을 들어보자. Optional Monad 없이 데이터를 다룬다면 다음과 같이 Type Guard 를 할 것이다.

```swift
func fourTimes(value: Int?) -> Int? {
    guard let value else { return nil }
    return value * 4
}

let result1 = fourTimes(value: 23)
let result2 = fourTimes(value: nil)

print(result1)  // Optional(92)
print(result2)  // nil
```

```typescript
type nullable = undefined | null
const fourTimes = (value: number | nullable): number | null => {
  if (value === undefined || value === null) return null
  return value * 4
}

const result1 = fourTimes(23)
const result2 = fourTimes(null)

console.log(result1)  // 92
console.log(result2)  // null
```

<br>

<span style="color: orange;">
  Type Class 는 함수가 하나의 기능만 할 수 있도록, 그래서 해당 Type Class 내에서는 하나의 Type 으로 다룰 수 있도록 
</span>
함으로써 더 적은 코드로 비즈니스 자체에 집중하고 순수 함수를 만들 수 있도록 하기 위해 사용된다. 위 `fourTimes(value:)`함수와 아래 
`fiveTimes(value:)`함수를 비교해보자.

```swift
func fiveTimes(value: Int) -> Int {
    value * 5
}

let result3 = Optional(23).map(fiveTimes(value:))
let result4 = Optional(nil).map { fiveTimes(value: $0) }

print(result3)  // Optional(115)
print(result4)  // nil
```

```typescript
class Maybe<Wrapped> {
  static some<Wrapped>(value: Wrapped): Maybe<Wrapped> {
    return new Maybe('some', value)
  }

  static readonly none: Maybe<never> = (() => {
    const self = new Maybe('none')
    delete self.value
    return self as Maybe<never>
  })()

  static of<Wrapped>(value: Wrapped): Maybe<any> {
    if (value === undefined || value === null) {
      return Maybe.none
    } else {
      return Maybe.some(value)
    }
  }

  private constructor(private kind: 'some' | 'none', public value?: Wrapped) {
  }

  map<U>(transform: (value: Wrapped) => U): Maybe<U> {
    switch (this.kind) {
      case 'some':
        return Maybe.some(transform(this.value!))
      case 'none':
        return Maybe.none
    }
  }
}
```

```typescript
const fiveTimes = (value: number): number => value * 5

const result3 = Maybe.of(23).map(fiveTimes)
const result4 = Maybe.of(null).map(value => value * 5)

console.log(result3)  // Maybe {kind: 'some', value: 115}
console.log(result4)  // Maybe {kind: 'none'}
```

> 이를 위해 Swift 의 Optional 은 initializer 가 Type Class 를 만든다. 하지만 TypeScript 에는 이와 같은 것이 없어 직접 구현해야
> 하는데 `Union Type`, `Namespace`, `Class` 등을 사용해 구현할 수 있다.
> 
> 여기서는 `Class`에 `of`라는 **Type Method** 를 사용해 구현했다.

다음 섹션부터 Functor, Applicative Functor, Monad 까지 차례로 확장하며 Maybe Monad 를 직접 구현해보도록 하자.

#### 3. Functor

함수형 프로그래밍에서 Functor 는 다음과 같이 정의할 수 있다.

<p class="center" style="color: cornflowerblue;">
  A functor applies a function to a value wrapped in a context.
</p>

그리고 좀 더 자세히 이야기 하면 여기서 말하는 함수는 시스템을 lift 시키기 위해 `map(_:)`함수로 구현된다.

<p class="center" style="color: cornflowerblue;">
  Functor is a type, that implements map function.
</p>

<br>

참고로 수학의 카테고리 이론 또는 프로그래밍 언어 Haskell 에서는 `Maybe`라 불리는 것이 많은 언어에서 `Optional` 이라는 Types 로 제공된다.

```swift
enum Maybe<Wrapped> {
   case some(Wrapped)
   case none
}
```

```typescript
class Maybe<Wrapped> {
  static some<Wrapped>(value: Wrapped): Maybe<Wrapped> {
    return new Maybe('some', value)
  }

  static readonly none: Maybe<never> = (() => {
    const self = new Maybe('none')
    delete self.value
    return self as Maybe<never>
  })()

  static of<Wrapped>(value: Wrapped): Maybe<any> {
    if (value === undefined || value === null) {
      return Maybe.none
    } else {
      return Maybe.some(value)
    }
  }

  private constructor(private kind: 'some' | 'none', public value?: Wrapped) {
  }
}
```

> TypeScript 는 Enumeration 이 Associated Values 를 지원하지 않기 때문에 직접 구현해야한다.  
> 이 글에서는 Class 를 사용해 구현했다(위에서도 설명했듯이 Union Type, Namespace 등을 사용한 구현 역시 가능하다).

<br>

`Wrapped`의 Type 이 `Int`일 때만 작동하는 `add(_:)`라는 함수를 추가해보자.

```swift
extension Maybe where Wrapped == Int {
   func add(_ value: Int) -> Maybe<Int> {
       switch self {
       case .some(let wrappedValue): return .some(wrappedValue + value)
       case .none: return .none
       }
   }
}

let foo: Maybe<Int> = .some(10)
let bar = foo.add(7)
print(foo)      // some(10)
print(bar)      // some(17)

let baz: Maybe<Int> = .none
print(baz)      // none
```

<br>

위 코드를 통해 우리는 Maybe 에 함수를 안전하게 적용할 수 있음을 확인했다. 하지만 우리가 Functor 에서 원하는 것은 `add(_:)`와 같은 함수가 
아니다. 우리는 시스템을 lift 시켜줄 `map(_:)`함수를 구현해야한다. 따라서 <span style="color: orange;">우리가 원하는 Functor 의 
최종 구현</span>은 다음과 같다.

<span id="implementationOfMap"></span>

```swift
enum Maybe<Wrapped> {
   case some(Wrapped)
   case none
}

extension Maybe {
    func map<U>(_ transform: (Wrapped) -> U) -> Maybe<U> {
        switch self {
        case .some(let wrappedValue): return .some(transform(wrappedValue))
        case .none: return .none
        }
    }
}
```

```typescript
class Maybe<Wrapped> {
  static some<Wrapped>(value: Wrapped): Maybe<Wrapped> {
    return new Maybe('some', value)
  }

  static readonly none: Maybe<never> = (() => {
    const self = new Maybe('none')
    delete self.value
    return self as Maybe<never>
  })()

  static of<Wrapped>(value: Wrapped): Maybe<any> {
    if (value === undefined || value === null) {
      return Maybe.none
    } else {
      return Maybe.some(value)
    }
  }

  private constructor(private kind: 'some' | 'none', public value?: Wrapped) {
  }

  map<U>(transform: (value: Wrapped) => U): Maybe<U> {
    switch (this.kind) {
      case 'some':
        return Maybe.some(transform(this.value!))
      case 'none':
        return Maybe.none
    }
  }
}
```

<br>

위 Functor 가 잘 작동하는지 확인해보자.

```swift
func intToString(_ value: Int) -> String {
    String(value)
}

let foo: Maybe<Int> = .some(10)
let baz: Maybe<Int> = .none

let fooPrime = foo.map(intToString(_:))
let bazPrime = baz.map(intToString(_:))
print(fooPrime)     // some("10")
print(bazPrime)     // none
```

```typescript
const intToString = (value: number): string => String(value)

const foo: Maybe<number> = Maybe.some(10)
const baz: Maybe<number> = Maybe.none

const fooPrime = foo.map(intToString)
const bazPrime = baz.map(intToString)

console.log(fooPrime) // Maybe {kind: 'some', value: '10'}
console.log(bazPrime) // Maybe {kind: 'none'}
```

#### 4. Applicative Functor

<p class="center" style="color: cornflowerblue;">
  Applicative applies a wrapped function to a wrapped value
</p>

<br>

[Functor Lift the System](#functorLiftSystemAtoB) 을 보면 Functor 가 lift 시키는 것이 **Set** 뿐만 아니라 **Morphism** 을 
포함한다는 것을 알 수 있다. 하지만 위 [Functor](#h-3-functor) 에서 우리는 **Set** 만 lift 시키고, **Set** 이 `.some`인 경우에 한해 
`map(_:)`함수를 적용시켰다. 이번 섹션에서는 **Morphism** 자체를 lift 시켜보자.

<br>

`apply(_:)`함수를 정의해보자. 이전 섹션에서 `map(_:)`함수가 `(Wrapped) -> U` Type 의 함수를 Argument 로 받았다면, 이번에는 
`Maybe<(Wrapped) -> U>` Type 을 함수의 Argument 로 받는다.

```swift
extension Maybe {
    func apply<U>(_ wrappedTransform: Maybe<(Wrapped) -> U>) -> Maybe<U> {
        switch wrappedTransform {
        case .some(let transform):
            switch self {
            case .some(let wrappedValue): return .some(transform(wrappedValue))
            case .none: return .none
            }
        case .none: return .none
        }
    }
}
```

<br>

그런데 위 코드를 보면 Wrapping 된 함수가 `.some`인 경우 함수의 Wrapping 을 푼 이후의 코드를 보면 기존의 `map(_:)`함수를 재사용 할 수 
있다는 것을 확인할 수 있다. `apply(_:)`함수를 리팩토링해보자.

```swift
extension Maybe {
    func apply<U>(_ wrappedTransform: Maybe<(Wrapped) -> U>) -> Maybe<U> {
        switch wrappedTransform {
        case .some(let transform): return self.map(transform)
        case .none: return .none
        }
    }
}
```

```typescript
class Maybe<Wrapped> {
  static some<Wrapped>(value: Wrapped): Maybe<Wrapped> {
    return new Maybe('some', value)
  }

  static readonly none: Maybe<never> = (() => {
    const self = new Maybe('none')
    delete self.value
    return self as Maybe<never>
  })()

  static of<Wrapped>(value: Wrapped): Maybe<any> {
    if (value === undefined || value === null) {
      return Maybe.none
    } else {
      return Maybe.some(value)
    }
  }

  private constructor(private kind: 'some' | 'none', public value?: Wrapped) {
  }

  map<U>(transform: (value: Wrapped) => U): Maybe<U> {
    switch (this.kind) {
      case 'some':
        return Maybe.some(transform(this.value!))
      case 'none':
        return Maybe.none
    }
  }

  apply<U>(wrappedTransform: Maybe<(value: Wrapped) => U>): Maybe<U> {
    switch (wrappedTransform.kind) {
      case 'some':
        return this.map(wrappedTransform.value!);
      case 'none':
        return Maybe.none;
    }
  }
}
```

<br>

위 Applicative Functor 가 잘 작동하는지 확인해보자.

```swift
func intToString(_ value: Int) -> String {
    String(value)
}

let foo: Maybe<Int> = .some(10)
let baz: Maybe<Int> = .none

let fnFoo: Maybe<(Int) -> String> = .some(intToString(_:))
let fnBaz: Maybe<(Int) -> String> = .none

let fooPrime = foo.apply(fnFoo)
let bazPrime = baz.apply(fnBaz)
print(fooPrime)     // some("10")
print(bazPrime)     // none
```

```typescript
const intToString = (value: number): string => String(value)

const foo: Maybe<number> = Maybe.some(10)
const baz: Maybe<number> = Maybe.none

const fnFoo: Maybe<(value: number) => string> = Maybe.some(intToString)
const fnBaz: Maybe<(value: number) => string> = Maybe.none

const fooPrime = foo.apply(fnFoo)
const bazPrime = baz.apply(fnBaz)
console.log(fooPrime) // Maybe {kind: 'some', value: '10'}
console.log(bazPrime) // Maybe {kind: 'none'}
```

> Maybe Monad 를 정의하기 위해 지금까지 한 것을 정리해보자.
> 
> `Set`을 lift 시키기 위해 `map(_:)`함수를 정의해 Functor 를 구현하고, 
> `Morphism`을 lift 시키기 위해 `apply(_:)`함수를 정의해 Applicative Functor 를 구현했다.
> 
> 우리가 Maybe Monad 를 정의하려던 목적이 무엇이었는지 다시 생각해보자. `nil` 여부와 상관 없이 코드를 다룰 수 있도록 해 데이터와 함수에 
> 대해 ***명시적인 Type Guard 없이도 Type Safe 한 비즈니스 로직을 구현하기 위함***이었다. Functor 에서 `map(_:)`함수는 `Set`을 
> lift 시켜 이를 가능하도록 했고, Applicative Functor 에서 `apply(_:)`함수는 `Morphism`을 lift 시킴으로써 이를 가능하게 했다.

#### 5. Monad

<p class="center" style="color: cornflowerblue;">
  A monad applies wrapped function that returns wrapped value to the wrapped value.
</p>

<br>

글만 봐서는 무슨 말인지 이해하기가 쉽지 않다. Maybe Monad 를 정의하기 위해 `flatMap(_:)`함수를 다음과 같이 정의해보자.

```swift
extension Maybe {
    func flatMap<U>(_ transform: (Wrapped) -> Maybe<U>) -> Maybe<U> {
        switch self {
        case .some(let wrappedValue): return transform(wrappedValue)
        case .none: return .none
        }
    }
}
```

```typescript
class Maybe<Wrapped> {
  static some<Wrapped>(value: Wrapped): Maybe<Wrapped> {
    return new Maybe('some', value)
  }

  static readonly none: Maybe<never> = (() => {
    const self = new Maybe('none')
    delete self.value
    return self as Maybe<never>
  })()

  static of<Wrapped>(value: Wrapped): Maybe<any> {
    if (value === undefined || value === null) {
      return Maybe.none
    } else {
      return Maybe.some(value)
    }
  }

  private constructor(private kind: 'some' | 'none', public value?: Wrapped) {
  }

  map<U>(transform: (value: Wrapped) => U): Maybe<U> {
    switch (this.kind) {
      case 'some':
        return Maybe.some(transform(this.value!))
      case 'none':
        return Maybe.none
    }
  }

  flatMap<U>(transform: (value: Wrapped) => Maybe<U>): Maybe<U> {
    switch (this.kind) {
      case 'some':
        return transform(this.value!)
      case 'none':
        return Maybe.none
    }
  }

  apply<U>(wrappedTransform: Maybe<(value: Wrapped) => U>): Maybe<U> {
    switch (wrappedTransform.kind) {
      case 'some':
        return this.map(wrappedTransform.value!);
      case 'none':
        return Maybe.none;
    }
  }
}
```

`flatMap(_:)`함수를 [map 함수의 구현](#implementationOfMap) 과 비교해보자.

Functor 의 구현을 위한 `map(_:)`함수가 `(Wrapped) -> U` 함수를 받아 반환한 `U`를 `map(_:)`함수가 `Maybe<U>`로 
<span style="color: red;">lift 해서 반환</span>했다. `return .some(transform(wrappedValue))`

Monad 의 구현을 위한 `flatMap(_:)`함수는 `(Wrapped) -> Maybe<U>` 함수를 받아 반환한 `Maybe<U>`를 `flatMap(_:)`함수가 
`Maybe<U>`로 반환한다. 즉, <span style="color: red;">추가로 lift 하지 않는다</span>. `return transform(wrappedValue)`

> map 과 flatMap 의 차이의 핵심이 바로 반환할 때 추가로 lift 를 하는가? 하지 않는가? 이다.

<br>

이것을 풀어서 설명해보자. 우선 쉬운 설명을 위해 Functor 에 의해 시스템이 lift 되는 것을 되돌리는 반대 방향으로의 lift 를 `un-lift`라 
부르기로 하자.

`map(_:)`과 `flatMap(_:)`은 모두 내부에 `switch-case`를 이용해 un-lift 를 구현하고 있다. 차이점은 **map** 은 un-lift 된 
데이터를 함수 transform 이 `(Wrapped) -> U`를 적용한 다음 **map** 함수가 `U`를 다시 lift 시켜 `Maybe<U>`로 반환하는 반면, 
**flatMap** 은 un-lift 된 데이터를 함수 transform 이 `(Wrapped) -> Maybe<U>`를 적용한 다음 **flatMap** 함수가 `Maybe<U>`를 
추가적인 lift 없이 그대로 `Maybe<U>`로 반환한다는 것이다.

이로부터 우리는 **map** 과 **flatMap** 의 최종적인 Return Type 이 동일하게 `Maybe<U>`라는 것을 알 수 있으며, `map(_:)`함수에 전달되는 
transform 의 Wrapped 는 `T`가 오는 것이 적절하며, `flatMap(_:)`함수에 전달되는 transform 의 Wrapped 는 `Maybe<T>`가 오는 것이 
적절한다는 것을 알 수 있다.

<br>

Swift Standard Library 에 의해 정의된 Optional 과 Array Monad 로부터 이러한 Monad Rule 이 적용되고 있음을 확인할 수 있다.

- Optional

```swift
@inlinable public func map<U>(_ transform: (Wrapped) throws -> U) rethrows -> U?
@inlinable public func flatMap<U>(_ transform: (Wrapped) throws -> U?) rethrows -> U?
```

- Array

```swift
@inlinable public func map<T>(_ transform: (Element) throws -> T) rethrows -> [T]
@inlinable public func flatMap<SegmentOfResult>(_ transform: (Element) throws -> SegmentOfResult) rethrows -> [SegmentOfResult.Element] where SegmentOfResult : Sequence
@inlinable public func compactMap<ElementOfResult>(_ transform: (Element) throws -> ElementOfResult?) rethrows -> [ElementOfResult]
```

<br>

이제 Monad Rule 을 적용하기 위해 구현한 `flatMap(_:)`이 잘 작동하는지, 그리고 <span style="color: red;">왜 사용하는지 확인</span>해보자. 

```swift
let foo: Maybe<Int> = .some(10)
let baz: Maybe<Maybe<Int>> = .some(foo)

print(type(of: foo))   // Maybe<Int>
print(type(of: baz))   // Maybe<Maybe<Int>>
```

```typescript
const foo: Maybe<number> = Maybe.some(10)
const baz: Maybe<Maybe<number>> = Maybe.some(foo)

console.log(foo)  // Maybe {kind: 'some', value: 10}
console.log(baz)  // Maybe {kind: 'some', value: Maybe}
console.log(baz.value)  // Maybe {kind: 'some', value: 10}
```

**baz** 는 Maybe 에 의해 두 번 lift 되어 `Maybe<Maybe<Int>>` Type 이다.

Functor 를 위해 구현한 기존의 `map(_:)`함수에 `intToString(_:)`함수와 `maybeInt_to_MaybeString(_:)`함수를 적용해보자.

```swift
func intToString(_ value: Int) -> String {
    String(value)
}

func maybeInt_to_MaybeString(_ monad: Maybe<Int>) -> Maybe<String> {
    return monad.map(intToString(_:))

    func intToString(_ value: Int) -> String {
        String(value)
    }
}

let fooPrime = foo.map(intToString(_:))
print(type(of: fooPrime))  // Maybe<String>
print(fooPrime)            // some("10")

let bazPrime = baz.map(maybeInt_to_MaybeString(_:))
print(type(of: bazPrime))  // Maybe<Maybe<String>>
print(bazPrime)            // some(__lldb_expr_47.Maybe<Swift.String>.some("10"))
```

```typescript
const intToString = (value: number): string => String(value)

const maybeInt_to_MaybeString = (monad: Maybe<number>): Maybe<string> => {
  return monad.map(intToString)

  function intToString(value: number): string {
    return String(value)
  }
}

const fooPrime = foo.map(intToString)
console.log(fooPrime) // Maybe {kind: 'some', value: '10'}

const bazPrime = baz.map(maybeInt_to_MaybeString)
console.log(bazPrime) // Maybe {kind: 'some', value: Maybe}
console.log(bazPrime.value) // Maybe {kind: 'some', value: '10'}
```

`foo`의 경우 `map(_:)`함수에 의해 `Maybe<Int>`가 `Int`가 되었고, `intToString(_:)` 함수에 의해 `String`이 된다. 마지막으로 
`map(_:)`에 의해 lift 되어 `Maybe<String>`이 된다.

`baz`의 경우 `map(_:)`함수에 의해 `Maybe<Maybe<Int>>`이 `Maybe<Int>`가 된다. 이후 `intToString(_:)`함수에 의해 
`Maybe<String>`이 되고, 마지막으로 `map(_:)`에 의해 lift 되어 `Maybe<Maybe<String>>`이 된다.

> <span style="color: red;">이것이 바로 Functor 의 문제점</span>이다. `nil` 여부와 무관하게 비즈니스를 다루기 위해 Functor 를 
> 사용해 lift 시켰는데, 이 Functor 를 두 번 사용할 경우 오히려 lift 로 인해 비즈니스 로직을 동일하게 적용할 수 없는 아이러니한 상황에 
> 놓이게 되는 것이다. 따라서 이러한 Case 에 놓인 경우에도 동일한 System 으로 다루기 위해 `lift`뿐 아니라 `un-lift` 시켜주는 
> `flatMap(_:)`함수가 필요한 것이다.
> 
> 즉, `map(_:)`함수와 `flatMap(_:)`함수를 필요에 따라 적절히 적용시키면 어떠한 경우에도 동일한 System 을 만들어 동일하게 비즈니스를 
> 다룰 수 있게 된다.

<br>

이번에는 `map(_:)` 대신 `flatMap(_:)`을 적용해보자.

```swift
let fooPrime = foo.map(intToString(_:))
print(type(of: fooPrime))  // Maybe<String>
print(fooPrime)            // some("10")

let bazPrime = baz.flatMap(maybeInt_to_MaybeString(_:))
print(type(of: bazPrime))  // Maybe<String>
print(bazPrime)            // some("10")
```

```typescript
const fooPrime = foo.map(intToString)
console.log(fooPrime) // Maybe {kind: 'some', value: '10'}

const bazPrime = baz.flatMap(maybeInt_to_MaybeString)
console.log(bazPrime) // Maybe {kind: 'some', value: '10'}
```

`flatMap(_:)`함수를 사용함으로써 `foo`와 `baz`를 동일하게 `Maybe<String>`으로 다룰 수 있게 되었다.

<br>

<span style="color: red;">
  Functional Programming 에서 `map(_:)`과 `flatMap(_:)`이 갖는 진정한 의미는 단순히 iteration 을 하는 것이 아니라 Monad Rule 
  을 적용하기 위해 `lift`와 `un-lift`를 해 단일 차원의 System 으로 다룰 수 있게 하는 것이다.
</span>

> 이제 우리는 Optional 뿐 아니라 `Array`, `Set`, 심지어 `Result` 같은 것들 모두 Functor 이며 Monad 라는 것을 이해할 수 있다. 

---

### 7. Examples 👩‍💻

#### 1. Immutable

---

### 8. Pipe & Compose 👩‍💻

---

### 9. Currying 👩‍💻


<br><br>

---
Reference

1. "참조 투명성." Wikipedia. Feb. 06, 2022, [Wikipedia - 참조 투명성](https://ko.wikipedia.org/wiki/참조_투명성).
2. "멱등법칙." Wikipedia. Mar. 07, 2022, [Wikipedia - 멱등법칙](https://ko.wikipedia.org/wiki/멱등법칙).
3. "함수의 합성." Wikipedia. Jan. 21, 2023, [Wikipedia - 함수의 합성](https://ko.wikipedia.org/wiki/함수의_합성).
4. "람다 대수." Wikipedia. Jul. 23, 2022, [Wikipedia - 람다 대수](https://ko.wikipedia.org/wiki/람다_대수).
5. Moon. "함수형 프로그래밍 - Pipe." Medium. Dec. 29, 2019, [함수형 프로그래밍](https://medium.com/오늘의-프로그래밍/함수형-프로그래밍-pipe-c80dc7b389de).
6. 12 Math. "g∘f 가 “일대일 대응” 이면 f 와 g 도 “일대일 대응”?.", Youtube. Jan. 12, 2023, [Bijection 을 만족하는 합성 함수의 분해](https://www.youtube.com/watch?v=MJV0OfO6D_U).
7. Dmitry Lupich. "Swift Monads, Functors and Applicatives with examples." Medium. Feb. 09, 2020, [Swift Monads](https://medium.com/@dmitrylupich/swift-monad-functor-applicative-806bb34c68c5).
