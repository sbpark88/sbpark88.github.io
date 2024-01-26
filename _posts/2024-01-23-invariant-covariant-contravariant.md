---
layout: post
title: Covariance, Contravariance, Invariance
subtitle: What is Covariance, Contravariance and Invariance?
categories: [swift, typescript]
tags: [covariance, contravariance, Invariance, subtyping]
---

### 1. Covariance, Contravariance, Invariance 👩‍💻

프로그래밍 언어에서 각 타입간의 참조 관계가 연관된 것들이 많다. Classes 의 상속 관계, Generics 에 의한 관계, Array 와 같은 
Monad 컨테이너, 함수의 Parameters 와 Return 등 여러 곳에서 이러한 관계가 존재한다. 원래 지정된 관계보다 더 파생되거나 덜 
파생되는 관계 또는 이러한 관계를 갖지 않는 독립적인 관계들이 존재할 수 있는데 이것들에 대한 정의를 나타내는 것이다.

수학에서 **정수** 와 **자연수** 의 다이어그램을 떠올려보자. 정수는 자연수를 포함하기 때문에 정수의 다이어그램 안에 자연수가 속한다. 
여기서 정수는 상위 타입이고, 자연수는 하위 타입이다. 프로그래밍에 있어서도 이러한 관계가 있는데 가장 대표적이고 쉽게 접할 수 있는 게 
바로 *Classes* 의 상속 관계다.

단순히 타입으로만 생각해보자. 타입 `A`와 `B`가 있고, `I<U>` 표기는 *Type Argument* `U`를 갖는 *Type Constructor* 
`I`를 나타낸다.

- Covariance: `A ≥ B`일때, 동일하게 `I<A> ≥ I<B>`이다.
- Contravariance: `A ≥ B`일때, 반대로 `I<A> ≤ I<B>`이다.
- Bivariance: Covariance 면서 동시에 Contravariance 이다. 즉, `A ≥ B`일때, `I<A> = I<B>`이다.
- Variance: Covariance 또는 Contravariance 또는 Bivariance 이다.
- Invariance: Non-Variance 이다.

> `co-`: '함께'의 뜻을 나타낸다. 즉, Origin 과 같은 방향으로 타입 참조 특성을 나타낸다.  
> `contra-`: '반대'의 뜻을 나타낸다. 즉, Origin 과 반대 방향으로 타입 참조 특성을 나타낸다.

<br>

이 중 우리가 타입을 구분할 때 이야기하는 것은 Invariance, Covariance, Contravariance 3가지로 좀 더 프로그래밍 관점에서 
이야기해보자.

- `Covariance`: 원래 지정된 것보다 더 파생된 타입(more derived type)을 사용할 수 있다.
- `Contravariance`: 원래 지정된 것보다 덜 파생된 타입(less derived type)을 사용할 수 있다.
- `Invariance`: 원래 지정된 것만 사용할 수 있다.

> `Covariant Type Parameters`는 `Polymorphism`과 매우 유사한 할당을 사용할 수 있다.

일반적으로 입력 위치에 해당하는 *Parameter Type* 은 `Invariant`하거나 `Covariant`하고, 출력 위치에 해당하는 
*Return Type* 은 `Covariant`하다. 하지만 이것은 각 언어마다 서로 다른 특징을 보유하고 있기 때문에 반드시 그러한 것은 아니다. 
예를 들어 Scala 는 *Parameter Type* 가 Contravariant 하고, Eiffel 은 Covariant 하다.

|                | Type Relation           | TypeScript 4.7 Syntax |
|----------------|-------------------------|-----------------------|
| Origin         | A ≥ B                   |                       |
| Covariance     | `I<A>` ≥ `I<B>`         | `<out T>`             |
| Contravariance | `I<A>` ≤ `I<B>`         | `<in T>`              |
| Invariance     | `I<A>`, `I<B>` 는 독립적이다. | `<in out T>`          |

<br>

Classes 의 기본 동작은 더 파생된 타입(more derived type) `Dog`를 더 큰 컨테이너 `Animal`에 넣을 수 있다. 
이것을 `subtyping`이라 부른다.

> `Dog`는 `Animal`의 **subtype** 이고 화살표를 이용해 다음과 같이 표현할 수 있다.  
> `Dog → Animal` 이것을 **subtyping direction** 이라 한다.
> 
> `I<Dog> → I<Animal>`와 같이 컨테이너로 래핑한 타입이 Origin 타입의 **subtyping direction** 과 동일한 
> 방향을 갖는 걸 `Covariance`, 반대 방향을 갖는 걸 `Contravariance`라 한다.

---

### 2. Variance in TypeScript 👩‍💻

#### 1. Origin Types

```typescript
class Animal {
  private species: string;

  constructor(species: string) {
    this.species = species;
  }
}

class Dog extends Animal {
  private name: string;

  constructor(species: string, name: string) {
    super(species);
    this.name = name;
  }
}

const animal: Animal = new Dog('강아지', '호두')
```

```typescript
interface Animal {
  species: string
}

interface Dog extends Animal {
  name: string
}

const animal: Animal = {
  species: '강아지',
  name: '호두'
} as Dog
```

```typescript
type Animal = {
    species: string
}

type Dog = Animal & {
    name: string
}

const animal: Animal = {
    species: '강아지',
    name: '호두'
} as Dog
```

TypeScript 는 JavaScript 로 대체되어야 하고, 사실상 Classes 가 존재하지 않는다. 타입을 생성하고 상속하는 방법은  
`class`, `interface`, `type` 외에도 *Constructor Function* 을 사용하거나 *Object Literal*, 
*Closures* 를 사용하는 등 다양한 방법이 있으나 전부 함수를 이용한 `Object` 객체를 생성한다. 따라서 어떤 방법을 
사용하든 `Dog → Animal`의 **subtyping direction** 을 갖는다.

이번 섹션에서는 객체를 표현할 때 가장 일반적으로 사용되는 `interface`를 사용해 타입을 표현한다.

#### 2. TypeScript 4.7

TypeScript 는 4.7 버전부터 `in`, `out` modifier 를 지원한다. 없던 기능이 추가된 것은 아니고 기존에는 코드를 작성하면
컴파일러가 *Covariance* 인지, *Contravariance* 인지 추론하던 것을 사용자가 명시적으로 작성할 수 있도록 *modifier* 가
도입된 것이다. 이 *modifier* 가 도입된 이유는 코드를 보는 것 만으로 쉽게 유형을 이해할 수 있도록 사용자에게도 도움을 주고,
컴파일러의 속도와 정확성을 높이는 기능을 하기 위함이다.

```typescript
type Getter<T> = () => T
type Setter<T> = (value: T) => void
```

를 명시적으로 표현하면

```typescript
type Getter<out T> = () => T
type Setter<in T> = (value: T) => void
```

이 된다. 마찬가지로

```typescript
interface State<T> {
  get: () => T
  set: (value: T) => void
}
```

를 명시적으로 표현하면

```typescript
interface State<in out T> {
  get: () => T
  set: (value: T) => void
}
```

> `in`, `out` modifier 가 의미하는 것은 Generic `T`를 어떻게 사용되는지를 명시하는 것이다. 따라서 `Getter` 에 
> `type Getter<in T> = () => T`로 작성하면 **compile-time error** 가 발생된다. 반면 
> `type Getter<in out T> = () => T`는 혼동을 줄 수는 있으나 컴파일에 문제가 되지는 않는다.
> 
> 어쨌든 `T`를 **input** 으로 사용할 때는 `in` modifier 를, **output** 으로 사용할 때는 `out` modifier 를 사용해야한다. 
> 그리고 대부분의 TypeScript 시스템에서 `in`은 **Contravariant** 하며, `out`은 **Covariant** 한 특성을 갖는다.
> 
> 그런데 `in out`으로 작성하면 어떻게 될까? **input** 과 **output** 모두 `T`를 사용하겠다는 것이므로 **Invariant** 하다. 

#### 3. Covariance

```typescript
const dogArray: Array<Dog> = []
const animalArray: Array<Animal> = dogArray
```

Array 컨테이너로 래핑한 Dog 는 여전히 Array 컨테이너로 래핑한 Animal 의 subtype 이다.

[Dog] → [Animal]

Swift 의 Array 는 Origin Types 의 subtyping direction 과 동일한 방향 갖는 Covariance 다.

<br>

Covariance 의 또 다른 예는 `Function Retun Types`다.

```typescript
const dogBuilder: () => Dog = () => ({} as Dog)
const animalBuilder: () => Animal = dogBuilder
```

`Dog → Animal`과 동일한 방향 `() -> Dog` → `() -> Animal`이므로 함수의 *Return Types* 는 `Covariance`다.

#### 4. Contravariance

그런데 `Function Parameter Types`에서는 *Origin Types* 와 다른 방향을 갖는다.

```typescript
const dogHandler: (_: Dog) => void = (dog) => console.log(dog)
const animalHandler: (_: Animal) => void = dogHandler   // error
```

`Dog → Animal`이지만 `(Dog) -> void` → `(Animal) -> void`는 허용되지 않는다. 이것은 **Type Unsafe** 하기
때문이다.

```typescript
const animal: Animal = {} as Dog
const animalArray: Animal[] = [{} as Dog, {} as Dog, {} as Dog]
```

*Covariant* 한 위 코드를 보자. 이것이 허용되는 것은 Animal 이라는 컨테이너가 더 크기 때문에 *Dog* 를 저장하는 것이
가능하기 때문이다.

```typescript
const dogBuilder: () => Dog = () => ({} as Dog)
const animalBuilder: () => Animal = dogBuilder
```

마찬가지로, `Function Return Types`는 어딘가에 저장하기 위함이라는 것을 기억하자. 
애초에 `const animal: Animal = {} as Dog` 코드는 Object 생성을 `Class` Syntax 를 사용해 작성했을 경우, 
`constructor`를 호출하는 코드이고, 이것은 *Class Instances* 를 생성해 반환하는 특수한 함수이다.
예를 들어 Classes 를 `Singleton`으로 만들어 Instances 를 생성하는 다른 함수를 만들어 사용한다고 이 규칙이 깨진다는 것이
말이 안 되는 것이다. 즉, *Function Return Types* 는 어딘가 저장되기 위함이고, 당연히 더 큰 컨테이너로 내보내는 것이
가능해야 한다.

하지만 `Function Parameter Types`의 경우는 다르다! <span style="color: red;">이것은 어딘가에 저장되기 위함이 아닌,
*Functions* 의 **Body** 내에서 어떠한 비즈니스 로직을 수행하기 위함</span>이다. 즉, *Dog* 에만 존재하는 것들을 필요로
한다는 것인데, 만약 Animal 이 허용되어 또 다른 하위 타입인 **Cat** 이 들어올 경우, 비즈니스 로직은 수행할 수 없게 되고,
에러를 발생시킨다.

```typescript
const animalHandler: (_: Animal) => void = (animal) => console.log(animal)
const dogHandler: (_: Dog) => void = (dog) => animalHandler
```

따라서 <span style="color: red;">상위 타입인 Animal 이 하위 타입인 Dog 또는 Cat 으로 **subtyping direction** 이
역전되는 것은 **Type Safe** 하지만, 정방향은 Type Unsafe 한 반대의 상황</span>이 만들어지는 것이다.  
바로 `저장이 되기 위함인가?`, `비즈니스 로직을 수행하기 위함인가`의 차이에 따라 어떤 것이 Type Safe 한가를 생각해보면
알 수 있는 것이다.

따라서 Function Parameter Types 는 `Dog → Animal`인데 `(Animal) -> void` → `(Dog) -> void`가 성립되므로
*Origin Types* 의 **subtyping direction** 의 역방향을 갖는 `Contravariance`다.

> Function 의 Parameter Types 는 `Contravariant`하고, Return Types 는 `Covariant`해야 **Type Safe** 하다.

<br>

좀 더 복잡한 케이스를 생각해보자.

```typescript
// Case 1
const animalResolverLater: ((f: (animal: Animal) => void) => void) = (f) => f({} as Animal)
const dogResolverLater: ((f: (dog: Dog) => void) => void) = animalResolverLater     // error
```

는 불가능한데

```typescript
// Case 2
const dogResolverLater: ((f: (dog: Dog) => void) => void) = (f) => f({} as Dog)
const animalResolverLater: ((f: (animal: Animal) => void) => void) = dogResolverLater
```

는 가능하다.

얼핏 보면 **Case 1** 의 코드가 *Parameter Types* 가 `Animal` 에서 `Dog`로 역전되니 맞는 것 같아 보인다. 하지만
순서대로 차근차근 따져보면 **Case 2** 의 코드가 가능한 케이스라는 것을 알 수 있다.

```typescript
const dog: Dog = {} as Dog
const animal: Animal = dog
```

`Animal` 에 `Dog`를 저장한다. Covariant 한 정상 코드다.

```typescript
const animalHandler: (_: Animal) => void = (animal) => console.log(animal)
const dogHandler: (_: Dog) => void = (dog) => animalHandler
```

`Dog`에 `Animal` Parameter Types 가 저장되므로 역전이 된다. Contravariant 한 정상 코드다.

```typescript
const dogResolverLater: ((f: (dog: Dog) => void) => void) = (f) => f({} as Dog)
const animalResolverLater: ((f: (animal: Animal) => void) => void) = dogResolverLater
```

이제 다시 역전되어 `(Animal) -> void`에 `(Dog) -> void` Parameter Types 가 저장되므로 역전이 된다.
Contravariant 한 정상적인 코드다. 만약, 이 코드가 잘 이해가 되지 않는다면 *alias* 를 사용해 가독성을 높여보자.

```typescript
const dog: Dog = {} as Dog
const animal: Animal = dog

type AnimalHandler = (animal: Animal) => void
type DogHandler = (dog: Dog) => void

const animalHandler: AnimalHandler = (animal) => console.log(animal)
const dogHandler: DogHandler = (dog) => animalHandler

const dogResolverLater: (f: DogHandler) => void = (f) => f({} as Dog)
const animalResolverLater: (f: AnimalHandler) => void = dogResolverLater
```

즉, `Animal`과 `Dog`를 보는 것이 아니라 `(Animal) -> void`와 `(Dog) -> void`를 봐야 하는 것이다.

#### 5. Invariance

Invariant 를 다룰때 유의해야 할 것이 바로 `Generics`이다. 위 [TypeScript 4.7](#h-2-typescript-47) 에서 
소개한 `in`, `out` modifier 와 함께 알아보자.

```typescript
class Container {
  item: Animal

  constructor(item: Animal) {
    this.item = item
  }
}
```

```typescript
const containerStoreDog: Container = new Container({} as Dog)
const containerStoreAnimal: Container = containerStoreDog
```

기본적으로 *Covariant* 하기 때문에 위 코드는 정상이다.

<br>

하지만 Generics 를 사용한 코드에서는 어떨까?

```typescript
class Container<T> {
    item: T

    constructor(item: T) {
        this.item = item
    }
}
```

```typescript
const animalContainer: Container<Animal> = new Container<Animal>({} as Animal)
const dogContainer: Container<Dog> = animalContainer  // error
```

```typescript
const dogContainer: Container<Dog> = new Container<Dog>({} as Dog)
const animalContainer: Container<Animal> = dogContainer
```

TypeScript 는 기본적으로 <span style="color: red;">**Generics**</span>를 사용해 컨테이너를 생성하더라도
<span style="color: red;">*Covariant* 를 유지</span>한다!

<br>

Generics 를 사용할 경우 `Invariant`하도록 하기 위해 `in out` modifier 를 사용해보자.

```typescript
class Container<in out T> {
  item: T

  constructor(item: T) {
    this.item = item
  }
}
```

```typescript
const animalContainer: Container<Animal> = new Container<Animal>({} as Animal)
const dogContainer: Container<Dog> = animalContainer  // error
```

```typescript
const dogContainer: Container<Dog> = new Container<Dog>({} as Dog)
const animalContainer: Container<Animal> = dogContainer // error
```

이제 `Container`는 **input** 과 **output** 모두 `T`를 사용하겠다는 것이므로 **Invariant** 하다.

---

### 3. Variance in Swift 👩‍💻

#### 1. Origin Types

```swift
class Animal {}
class Dog: Animal {}

let animal: Animal = Dog()
```

`Dog → Animal`의 **subtyping direction** 을 갖는다.

#### 2. Covariance

```swift
let dogArray: [Dog] = []
let animalArray: [Animal] = dogArray
```

Array 컨테이너로 래핑한 Dog 는 여전히 Array 컨테이너로 래핑한 Animal 의 *subtype* 이다.

`[Dog] → [Animal]`

Swift 의 Array 는 *Origin Types* 의 **subtyping direction** 과 동일한 방향 갖는 `Covariance`다.

<br>

Covariance 의 또 다른 예는 `Closures Retun Types`다.

```swift
let dogBuilder: () -> Dog = { Dog() }
let animalBuilder: () -> Animal = dogBuilder
```

`Dog → Animal`과 동일한 방향 `() -> Dog` → `() -> Animal`이므로 함수의 *Return Types* 는 `Covariance`다.

#### 3. Contravariance

그런데 `Closures Parameter Types`에서는 *Origin Types* 와 다른 방향을 갖는다.

```swift
let dogHandler: (Dog) -> Void = { print($0) }
let animalHandler: (Animal) -> Void = dogHandler    // error
```

`Dog → Animal`이지만 `(Dog) -> Void` → `(Animal) -> Void`는 허용되지 않는다. 이것은 **Type Unsafe** 하기 
때문이다.

```swift
let animal: Animal = Dog()
let animalArray: [Animal] = [Dog(), Dog(), Dog()]
```

*Covariant* 한 위 코드를 보자. 이것이 허용되는 것은 Animal 이라는 컨테이너가 더 크기 때문에 *Dog* 를 저장하는 것이 
가능하기 때문이다.

```swift
let dogBuilder: () -> Dog = { Dog() }
let animalBuilder: () -> Animal = dogBuilder
```

마찬가지로, `Closure Return Types`는 어딘가에 저장하기 위함이라는 것을 기억하자. 애초에 `let animal: Animal = Dog()` 
코드는 Classes 의 `initializers`를 호출하는 코드이고, 이것은 *Class Instances* 를 생성해 반환하는 특수한 함수이다. 
예를 들어 Classes 를 `Singleton`으로 만들어 Instances 를 생성하는 다른 함수를 만들어 사용한다고 이 규칙이 깨진다는 것이 
말이 안 되는 것이다. 즉, *Closure Return Types* 는 어딘가 저장되기 위함이고, 당연히 더 큰 컨테이너로 내보내는 것이 
가능해야 한다.

하지만 `Closure Parameter Types`의 경우는 다르다! <span style="color: red;">이것은 어딘가에 저장되기 위함이 아닌, 
*Closures* 의 **Body** 내에서 어떠한 비즈니스 로직을 수행하기 위함</span>이다. 즉, *Dog* 에만 존재하는 것들을 필요로 
한다는 것인데, 만약 Animal 이 허용되어 또 다른 하위 타입인 **Cat** 이 들어올 경우, 비즈니스 로직은 수행할 수 없게 되고, 
에러를 발생시킨다.

```swift
let animalHandler: (Animal) -> Void = { print($0) }
let dogHandler: (Dog) -> Void = animalHandler
```

따라서 <span style="color: red;">상위 타입인 Animal 이 하위 타입인 Dog 또는 Cat 으로 **subtyping direction** 이 
역전되는 것은 **Type Safe** 하지만, 정방향은 Type Unsafe 한 반대의 상황</span>이 만들어지는 것이다.  
바로 `저장이 되기 위함인가?`, `비즈니스 로직을 수행하기 위함인가`의 차이에 따라 어떤 것이 Type Safe 한가를 생각해보면 
알 수 있는 것이다.

따라서 Closure Parameter Types 는 `Dog → Animal`인데 `(Animal) -> Void` → `(Dog) -> Void`가 성립되므로 
*Origin Types* 의 **subtyping direction** 의 역방향을 갖는 `Contravariance`다.

> Closure 의 Parameter Types 는 `Contravariant`하고, Return Types 는 `Covariant`해야 **Type Safe** 하다.

<br>

좀 더 복잡한 케이스를 생각해보자.

```swift
// Case 1
let animalResolverLater: ((Animal) -> Void) -> Void = { f in f(Animal()) }
let dogResolverLater: ((Dog) -> Void) -> Void = animalResolverLater     // error
```

는 불가능한데

```swift
// Case 2
let dogResolverLater: ((Dog) -> Void) -> Void = { f in f(Dog()) }
let animalResolverLater: ((Animal) -> Void) -> Void = dogResolverLater
```

는 가능하다.

얼핏 보면 **Case 1** 의 코드가 *Parameter Types* 가 `Animal` 에서 `Dog`로 역전되니 맞는 것 같아 보인다. 하지만 
순서대로 차근차근 따져보면 **Case 2** 의 코드가 가능한 케이스라는 것을 알 수 있다.

```swift
let dog: Dog = Dog()
let animal: Animal = dog
```

`Animal` 에 `Dog`를 저장한다. Covariant 한 정상 코드다.

```swift
let animalHandler: (Animal) -> Void = { print($0) }
let dogHandler: (Dog) -> Void = animalHandler
```

`Dog`에 `Animal` Parameter Types 가 저장되므로 역전이 된다. Contravariant 한 정상 코드다.

```swift
let dogResolverLater: ((Dog) -> Void) -> Void = { f in f(Dog()) }
let animalResolverLater: ((Animal) -> Void) -> Void = dogResolverLater
```

이제 다시 역전되어 `(Animal) -> Void`에 `(Dog) -> Void` Parameter Types 가 저장되므로 역전이 된다. 
Contravariant 한 정상적인 코드다. 만약, 이 코드가 잘 이해가 되지 않는다면 *typealias* 를 사용해 가독성을 높여보자.

```swift
let dog: Dog = Dog()
let animal: Animal = dog

typealias AnimalHandler = (Animal) -> Void
typealias DogHandler = (Dog) -> Void

let animalHandler: AnimalHandler = { print($0) }
let dogHandler: DogHandler = animalHandler

let dogResolverLater: (DogHandler) -> Void = { f in f(Dog()) }
let animalResolverLater: (AnimalHandler) -> Void = dogResolverLater
```

즉, `Animal`과 `Dog`를 보는 것이 아니라 `(Animal) -> Void`와 `(Dog) -> Void`를 봐야 하는 것이다.

#### 4. Invariance

Swift 의 시스템은 대부분 Invariant 하다. 그 중 유의해야 할 것이 바로 `Generics`이다.

```swift
struct Container {
    var item: Animal
}
```

```swift
let containerStoreDog: Container = Container(item: Dog())
let containerStoreAnimal: Container = containerStoreDog
```

기본적으로 Structures 와 Classes 는 *Covariant* 하다. Structures 대신 Structures 를 사용해도 당연히 
위 코드는 정상이다.

<br>

하지만 Generics 를 사용한 코드에서는 어떨까?

```swift
struct Container<T> {
    var item: T
}
```

```swift
let animalContainer: Container<Animal> = Container(item: Animal())
let dogContainer: Container<Dog> = animalContainer  // error
```

```swift
let dogContainer: Container<Dog> = Container(item: Dog())
let animalContainer: Container<Animal> = dogContainer   // error
```

`Generics`는 타입 추론을 사용한 동적 타입으로 수많은 코드의 오버로딩을 하나의 코드로 줄이며 *Type Safe* 한 코드를 
만들어준다. 하지만 Generics 는 `Invariant` 하기 때문에 주의해야한다.


<br><br>

---
Reference

1. "Covariance and contravariance in generics." Microsoft.Net. Sep. 15, 2021, [Covariance and contravariance in generics](https://learn.microsoft.com/en-us/dotnet/standard/generics/covariance-and-contravariance).
2. delmaSong. "item 32. 제네릭과 가변인수(varargs)를 함께 쓸 때는 신중하라" GitHub. Dec. 28, 2020, [item 32. 제네릭과 가변인수(varargs)를 함께 쓸 때는 신중하라](https://github.com/TheSwiftists/effective-swift/blob/main/5장_제네릭/item32.md).
3. Daniel Rosenwasser. "Announcing TypeScript 4.7". Microsoft TypeScript. May. 24, 2022, [Announcing TypeScript 4.7 - Optional Variance Annotations for Type Parameters](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#optional-variance-annotations-for-type-parameters).
4. "Covariance and contravariance (computer science)." Wikipedia. Dec. 12, 2023, [Wikipedia - Inheritance in object-oriented languages](https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)#Inheritance_in_object-oriented_languages).
5. aunnn. "Covariance and Contravariance in Swift." Medium, Feb. 24, 2018, [Covariance and Contravariance in Swift](https://medium.com/@aunnnn/covariance-and-contravariance-in-swift-32f3be8610b9).
