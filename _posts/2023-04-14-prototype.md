---
layout: post
title: JavaScript Prototype & ES6 Class
subtitle: Deep dive into JavaScript prototype
categories: [javascript]
tags: [javascript, prototype, es6 class, javascript inheritance, javascript superclass, javascript subclass, object.defineProperty, proxy, reflect]
---

### 1. How to create the Object 👩‍💻

객체 생성 과정을 통해 JavaScript Object 의 Prototype 을 이해하고 ES6 에 추가된 ES6 Class Syntax 와 비교해보자.

#### 1. Object (Constructor Function)

JavaScript 의 객체는 *최상위에 `Object`라는 객체*를 두고, 그 객체를 연결해 하위 구조로 써내려간다. 따라서 JavaScript 를 Prototype
Language 라 부르며, 이들간의 관계를 Prototype Chain 이라 한다.

그리고 좀 더 명확히 이야기하면 JavaScript 에는 Interfaces 뿐 아니라 Classes 역시 존재하지 않는다. ES6 이전 문법에서는 생성자를 다음과
같이 만들 수 있었다.

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  this.greet = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

하지만 위 방법은 <span style="color: red;">메모리를 과도하게 사용할 수 있는 문제점</span>을 갖는다. Class 를 사용하겠다는 것은 
재사용을 하기 위함이다. 그런데 위와 같이 생성자 함수에 메서드가 포함되는 경우, 2개의 instance 를 생성하면 각각 instance 가 메서드 
역시 각각 생성한다. 일반적으로 Class 객체가 메서드를 공유하지만 Properties 와 Closures 만 자신의 instance 에 저장하는 것과 달리 
이 방법은 모든 것을 각각 자신의 instance 에 저장하는 문제점을 갖는 것이다.

따라서 이 문제를 해결하기 위해 다음과 같이 Constructor 만 정의한 후 Methods 를 Prototype Chain 을 이용해 추가하는 것으로 변경할 
수 있다.

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}
```

이렇게 작성하면 여러 개의 instance 를 생성하더라도 Prototype 을 통해 메서드를 공유할 수 있다.

#### 2. Object (ES6 Class Syntax)

위에서 작성한 생성자 코드를 ES6 에서 추가된 Class Syntax 로 변경하면 다음과 같다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

```javascript
const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

ES6 의 Class Syntax 는 내부적으로는 `1. 생성자 함수를 생성`하고, `2. Prototype 에 메서드를 등록`하는 분리된 로직을 자동화 시켜주는
***Syntactic Sugar*** 에 가까운 문법이다.

> 단, 타 언어에서 생각하는 Class 와는 구조적으로, 기능적으로 많은 차이를 갖는다. 이는 JavaScript 의 문법적 특성이니 이를 명확히
> 이해하고 사용하는 것이 중요하다.

#### 3. Object Literal

Class 를 사용하는 이유는 instance 생성을 재사용 하기 위함이다. 그런데 instance 생성을 재사용 할 필요가 없는 하드코딩된 객체라던가 
instance 생성을 한 번만 하는 Singleton 객체와 같은 것들은 손쉽게 Object Literal 을 이용해 생성할 수 있다.
<br>

- 하드코딩 된 객체

```javascript
const Person = {
  name: '홍길동',
  age: 25,
  greet: function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

- Singleton 객체

```typescript
const Person = {
  name: '',
  age: 0,

  init(name: string, age: number) {
    this.name = name
    this.age = age
  },

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

```typescript
Person.init('홍길동', 25)
console.log(Person.greet())  // Hello, my name is 홍길동 and I'm 25 years old.
```

JavaScript 의 Class 는 Object 의 Prototype 객체에 생성자 함수를 다른 언어의 Class 문법과 유사하게 만들어 사용하기 쉽게 해주는 
***Syntactic Sugar*** 에 가깝기 때문에 이런식의 생성이 가능하다.

> Object Literal 방식은 `Singleton` 객체를 생성한다. 다른 언어에서 Singleton Class 를 구현하기 위해 사용하는
> `private initializer`와 Instance 를 생성하는 메서드, Synchronous 처리와 같은 것들 없이 손쉽게 Singleton 을 구현할 수 있다.

#### 4. Closures (Functional Programming)

마지막으로 완전히 함수형으로 Closures 를 사용한 객체 생성 방법이다.

```typescript
function Person(name: string, age: number) {
  let _name = name
  let _age = age

  function getName(): string {
    return _name
  }

  function setName(name: string) {
    _name = name
  }

  function getAge(): number {
    return _age
  }

  function setAge(age: number) {
    _age = age
  }
  function greet() {
    console.log(`Hello, my name is ${_name} and I'm ${_age} years old.`)
  }

  return {
    getName, setName, getAge, setAge, greet
  }
}
```

```typescript
const person = Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

#### 5. Arrow Functions are not equal to Functions

ES6 에서 Arrow Functions 가 소개된 이후로 기존의 Functions 문법을 빠르게 대체하고 있다. Arrow Functions 가 갖는 장점은 다음과 같다.

1. Lambda Expression 기반으로 가독성이 뛰어나다.
2. 함수가 호출될 때 동적으로 this 가 binding 되는 일반 함수와 달리 선언할 때 상위 Scope 의 this 를 기억한다. 이를 `Lexical Scope`라 한다.

문제는 저 2번째 동적인 this 에서 정적인 this 를 사용할 수 있지만 오히려 상위 Scope 를 가리키는 문제로 인해 메서드에 작성할 때는 잘못된 대상을 
가리키게 된다는 문제가 있다. 다른 언어에서는 객체 내에서 메서드가 this 를 가리키면 Method body context 를 기준으로 바깥쪽에 해당하는 자기 자신이 
속한 객체를 this 로 가리키지만 JavaScript 의 Arrow Functions 에서 this 는 Method body context 가 아닌 Method 를 기준으로 바깥쪽을 
this 로 가리킨다.
<br>

```javascript
const something2 = {
  whoAreYou: 'something2',
  aTraditionalFunction: function () {
    console.log(this.whoAreYou)
  },
  aArrowFunction: () => console.log(this.whoAreYou)
}

something2.aTraditionalFunction() // something2
something2.aArrowFunction()       // undefined
```

something2 의 this 가 가리키는 대상이 누구길래 undefined 가 출력될까?

```javascript
const something2 = {
  whoAreYou: 'something2',
  aTraditionalFunction: function () {
    console.log(this)
  },
  aArrowFunction: () => console.log(this)
}

something2.aTraditionalFunction() // {whoAreYou: 'something2', aTraditionalFunction: ƒ, aArrowFunction: ƒ}
something2.aArrowFunction()       // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

> Arrow Functions 의 this 는 something2 객체의 바깥쪽을 가리키고있다. Window 객체에 'whoAreYou' 가 정의된 적 조차 없으므로 
> undefined 가 출력되는 것이다.

<br>

그러면 다음의 경우는 어떨까?

```javascript
const something1 = {
  whoAreYou: 'something1',
  something2: {
    whoAreYou: 'something2',
    aTraditionalFunction: function () {
      console.log(this.whoAreYou)
    },
    aArrowFunction: () => console.log(this.whoAreYou)
  }
}

something1.something2.aTraditionalFunction()  // something2
something1.something2.aArrowFunction()        // undefined
```

something2 를 something1 내부에 정의했다. 여기서 this 는 something1 을 가리키고, 'something1' 이 출력될 것으로 예상할 수 있지만 
여전히 undefined 가 출력된다.

```javascript
const something1 = {
  whoAreYou: 'something1',
  something2: {
    whoAreYou: 'something2',
    aTraditionalFunction: function () {
      console.log(this)
    },
    aArrowFunction: () => console.log(this)
  }
}

something1.something2.aTraditionalFunction()  // {whoAreYou: 'something2', aTraditionalFunction: ƒ, aArrowFunction: ƒ}
something1.something2.aArrowFunction()        // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

<span style="color: red;">여전히 Window 객체를 가리킨다</span>‼️🤯🤯

왜 이런 현상이 일어나는 것일까? `선언할 때 상위 Scope 의 this 를 기억`한다고 했다. 아래 객체가 생성되는 과정을 풀어서 보면 다음과 같다.

```javascript
const something1 = {
  whoAreYou: 'something1',
}

const something2 = {
  whoAreYou: 'something2',
  aTraditionalFunction: function () {
    console.log(this.whoAreYou)
  },
  aArrowFunction: () => console.log(this.whoAreYou)
}

something1.something2 = something2
```

즉, something2 Instance 가 생성되는 시점에 this 는 Window 를 가리킨다. Instance 가 생성된 후 something1 의 something2 Property 에 
할당되기 때문에 해당 Arrow Functions 가 선언되고 정의되는 시점에 this 는 Window 객체고 이를 기억하기 때문이다.

> 즉, 메서드를 작성할 때 Arrow Functions 를 사용하는 것은 자신이 속한 Object 객체를 this 로 가리키지 않기 때문에 일반적인 객체의 
> 메서드로써의 기능을 수행할 수 없다.
> 
> Arrow Functions 는 단지 Syntax 만 다른 것이 아닌 <span style="color: red;">기존의 함수와는 다른 기능을 갖는 새로운 함수</span>
> 라는 점을 잊어서는 안 된다.

---

### 2. Prototype Chain 👩‍💻

이번에는 위에서 살펴본 Prototype 이 실제로 어떻게 Chaining 되는지 확인해본다.

#### 1. Constructor Function

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  this.greet = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

```javascript
console.dir(Person)
```

![Prototype Chain 1](/assets/images/posts/2023-04-14-prototype/prototype-chain-1.png){: width="500"}

> - constructor: f Person(name, age)
> - Prototype Chain: self -> Base Object

#### 2. ES6 Class Syntax

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

```javascript
console.dir(Person.prototype)
```

![Prototype Chain 2](/assets/images/posts/2023-04-14-prototype/prototype-chain-2.png){: width="500"}

> - constructor: class Person
> - Prototype Chain: self -> Base Object

#### 3. Object Literal

```javascript
const Person = {
  name: '홍길동',
  age: 25,
  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

```javascript
console.dir(Person.__proto__)
```

![Prototype Chain 3](/assets/images/posts/2023-04-14-prototype/prototype-chain-3.png){: width="500"}

> - constructor: none
> - Prototype Chain: Base Object

---

### 3. Inheritance 👩‍💻

#### 1. Constructor Function

__1 ) Superclass__

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  this.greet = function () {
    console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`)
  }
}
```

<br>

__2 ) Subclass__

```javascript
function Student(name, age, grade) {
  Person.call(this, name, age)
  this.grade = grade

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

```javascript
const student = new Student("Jane", 20, 2)
student.greet() // Hello, my name is Jane, I'm 20 years old.
student.study() // I'm studying in grade 2.
```

상속으로 잘 작동하는 것을 볼 수 있다.

student Instance -> Student Object -> Person Object -> Base Object

#### 2. ES6 Class Syntax

__1 ) Superclass__

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```

<br>

__2 ) Subclass__

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.grade = grade
  }

  study() {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

```javascript
const student1 = new Student("Jane", 20, 2)
student1.greet() // "Hello, my name is Jane and I'm 20 years old."
student1.study() // "I'm studying in grade 2."
```

> <span style="color: red;">Parent 가 ES6 Class Syntax 를 사용했다면, Children 역시 ES6 Class Syntax 를 사용해야한다!!</span>  
> 👉🏻 이 경우 Children 에서 Parent 의 `Person.call(this, name, age)`를 호출할 수 없다. 
> 
> 단, 반대의 경우 Parent 가 Constructor Function 을 사용했더라도 Children 은 ES6 Class Syntax 를 사용해 상속하는 것이 가능하다. 

---

### 4. Two Phase Initialization 👩‍💻

#### 1. Constructor Function

__1 ) Super 의 Constructor 호출 시점이 중요하지 않은 경우__

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  this.greet = function () {
    console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`)
  }
}
```

Parent 객체의 값이 Constructor 를 통해 초기화가 가능하다면, Children 객체의 Constructor 가 Super 의 Constructor 를 호출하는 
시점이 값을 저장한 후던 호출 후 저장을 하던 Prototype 에 의해 아무런 영향을 미치지 않는다.

```javascript
function Student(name, age, grade) {
  this.name = name
  this.age = age
  this.grade = grade
  Person.call(this, name, age)

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}

const student = new Student("Jane", 20, 2)

console.log(student)    // Student {name: 'Jane', age: 20, grade: 2, greet: ƒ, study: ƒ}
```

```javascript
function Student(name, age, grade) {
  Person.call(this, name, age)
  this.name = name
  this.age = age
  this.grade = grade

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}

const student = new Student("Jane", 20, 2)

console.log(student)  // Student {name: 'Jane', age: 20, grade: 2, greet: ƒ, study: ƒ}
```

<br>

__2 ) Super 의 Constructor 호출 시점이 중요한 경우__

```javascript
function Person() {
  this.name = '홍길동'
  this.age = 25

  this.greet = function () {
    console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`)
  }
}
```

하지만 위와 같이 Parent 객체의 값이 Constructor 를 통해 초기화가 가능한 값이 아닐 경우 Super 의 Constructor 를 호출하는 시점이 
중요해진다.

```javascript
function Student(name, age, grade) {
  this.name = name
  this.age = age
  this.grade = grade
  Person.call(this, name, age)

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}

const student = new Student("Jane", 20, 2)

console.log(student)  // Student {name: '홍길동', age: 25, grade: 2, greet: ƒ, study: ƒ}
```

> `Jane`이 아닌 `홍길동`이 생성되는 것을 볼 수 있다!!

```javascript
function Student(name, age, grade) {
  Person.call(this, name, age)
  this.name = name
  this.age = age
  this.grade = grade

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}

const student = new Student("Jane", 20, 2)

console.log(student)  // Student {name: 'Jane', age: 20, grade: 2, greet: ƒ, study: ƒ}
```

<br>

__3 Recommend Way__

<span style="color: red;">
  JavaScript 에서 Subclass 의 Constructor 는 항상 Superclass 의 Constructor 를 생성한 후 값을 수정 또는 정의하도록 한다!!
</span>

```javascript
function Student(name, age, grade) {
  Person.call(this, name, age)
  this.name = name
  this.age = age
  this.grade = grade

  this.study = function () {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}

const student = new Student("Jane", 20, 2)

console.log(student)  // Student {name: 'Jane', age: 20, grade: 2, greet: ƒ, study: ƒ}
```

#### 2. ES6 Class Syntax

단, ES6 Class Syntax 를 사용했을 경우는 좀 더 엄격하게 규칙이 적용된다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}
```
<br>

따라서 다음은 에러가 발생한다.

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    this.name = name    // error, 'this' is not allowed before superclass constructor invocation.
    this.age = age      // error, 'this' is not allowed before superclass constructor invocation. 
    this.grade = grade  // error, 'this' is not allowed before superclass constructor invocation.
    super(name, age)
  }

  study() {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

따라서 다음과 같이 정의해야만 에러가 발생하지 않는다.

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.name = name
    this.age = age
    this.grade = grade
  }

  study() {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

Swift 의 [Two Phase Initialization] 와 다른 점은 Subclass 에서 정의하는 Properties 역시 Superclass 의 Constructor 를 
호출 한 이후 Phase 2에서 함께 정의해야한다는 것이다.

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    this.grade = grade
    super(name, age)
    this.name = name
    this.age = age
  }

  study() {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

따라서 위와 같은 문법 역시 잘못되었다.

```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.name = name
    this.age = age
    this.grade = grade
  }

  study() {
    console.log(`I'm studying in grade ${this.grade}.`)
  }
}
```

<span style="color: red;">반드시 Super 의 Constructor 를 호출한 이후 이루어져야한다!!</span>

---

### 5. ES6 Class Private 👩‍💻

#### 1. ES6 Class Support Private Properties and Methods

```javascript
class Counter {
  #count = 0

  next = function () {
    return ++this.#count
  }

  #reset = function () {
    this.#count = 0
  }
}
```

```javascript
const counter = new Counter()

console.log(counter.next())   // 1
console.log(counter.next())   // 2
console.log(counter.next())   // 3
```

```javascript
console.log(counter.count)    // undefined
console.log(counter.reset())  // caught TypeError: counter.reset is not a function
```

Private 으로 선언된 Properties 와 Methods 는 외부에서 접근할 수 없다.

#### 2. ES6 Class Private cannot be hidden

문제는 해당 이름으로 접근을 막겠다는 것이지 정말로 은닉화를 하는 것은 아니다.

```javascript
console.log(counter.count)  // undefined
console.log(counter.#count) // caught SyntaxError: Private field '#count' must be declared in an enclosing class
```

```javascript
counter.reset()   // caught TypeError: counter.reset is not a function
counter.#reset()  // caught SyntaxError: Private field '#reset' must be declared in an enclosing class
```

은닉화가 작동하는 것 같지만 개발자가 작성하는 코드 작성 방식에서 private 으로 작동한다는 것이지 
<span style="color: red;">정말로 객체의 Properties 자체가 hiding 되는 것은 아니다</span>.

```javascript
console.log(counter)  // Counter {#count: 3, #reset: ƒ, next: ƒ}
```

> Closures 를 이용하면 가능하지 않을까?
> 
> 객체를 출력했을 때 private 이 구현될 수 있는 유일한 방법이다. 단, Closures 를 사용한 객체 생성을 사용할 경우 매번 새 객체가 생성되는데 
> GC가 제대로 작동하지 않아 Memory Leak 이 생길 수 있다고 한다.
> 
> JavaScript 의 `built-in objects` 중 Map, Set, WeakMap, WeakSet 등을 이용하는 방법을 소개하는 블로그도 존재했지만 단순히 
> `dot syntax`로 접근이 안 되는 것 뿐이다. 원래 `set`, `get` 메서드로 관리하는 객체들이라 일 뿐 private 이 아니다.

---

### 6. Rect Examples 👩‍💻

#### 1. ES6 Class Getter/Setter

```swift
struct Size {
    var width = 0.0, height = 0.0
}

struct Point {
    var x = 0.0, y = 0.0
}

struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                  y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

위 코드를 JavaScript 의 ES6 Class 를 이용해 구현해보자.

```javascript
class Point {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

class Size {
  constructor(width = 0, height = 0) {
    this.width = width
    this.height = height
  }
}

class Rect {
  constructor(origin = new Point(), size = new Size()) {
    this.origin = origin
    this.size = size
  }

  get center() {
    const centerX = this.origin.x + (this.size.width / 2)
    const centerY = this.origin.y + (this.size.height / 2)
    return new Point(centerX, centerY)
  }

  set center(newCenter) {
    this.origin.x = newCenter.x - (this.size.width / 2)
    this.origin.y = newCenter.y - (this.size.height / 2)
  }
}
```

```javascript
const square = new Rect(new Point(), new Size(10, 10))
console.log(square.origin)                    // Point {x: 0, y: 0}
console.log(square.center)                    // Point {x: 5, y: 5}

square.center = new Point(17.5, 17.5)
console.log('square.origin', square.origin)   // Point {x: 12.5, y: 12.5}
console.log('square.center', square.center)   // Point {x: 17.5, y: 17.5}
```

#### 2. Object.defineProperty()

`Object.defineProperty()`로 바꿔보자.

```javascript
class Rect {
  constructor(origin = new Point(), size = new Size()) {
    this.origin = origin
    this.size = size

    Object.defineProperty(this, 'center', {
      get: function () {
        const centerX = this.origin.x + (this.size.width / 2)
        const centerY = this.origin.y + (this.size.height / 2)
        return new Point(centerX, centerY)
      },
      set: function (newCenter) {
        this.origin.x = newCenter.x - (this.size.width / 2)
        this.origin.y = newCenter.y - (this.size.height / 2)
      }
    });
  }
}
```

```javascript
const square = new Rect(new Point(), new Size(10, 10))
console.log(square.origin)                    // Point {x: 0, y: 0}
console.log(square.center)                    // Point {x: 5, y: 5}

square.center = new Point(17.5, 17.5)
console.log('square.origin', square.origin)   // Point {x: 12.5, y: 12.5}
console.log('square.center', square.center)   // Point {x: 17.5, y: 17.5}
```

#### 3. Use Object.defineProperty() likes Swift extensions

```javascript
class Rect {
  constructor(origin = new Point(), size = new Size()) {
    this.origin = origin
    this.size = size
  }
}

Object.defineProperty(Rect.prototype, 'center', {
  get: function () {
    const centerX = this.origin.x + (this.size.width / 2)
    const centerY = this.origin.y + (this.size.height / 2)
    return new Point(centerX, centerY)
  },
  set: function (newCenter) {
    this.origin.x = newCenter.x - (this.size.width / 2)
    this.origin.y = newCenter.y - (this.size.height / 2)
  }
})
```

> `Object.defineProperty()`를 Class 선언과 분리시켜 Swift 의 extensions 를 사용하듯 분리해 다룰 수 있다.

```javascript
const square = new Rect(new Point(), new Size(10, 10))
console.log(square.origin)                    // Point {x: 0, y: 0}
console.log(square.center)                    // Point {x: 5, y: 5}

square.center = new Point(17.5, 17.5)
console.log('square.origin', square.origin)   // Point {x: 12.5, y: 12.5}
console.log('square.center', square.center)   // Point {x: 17.5, y: 17.5}
```

#### 4. Use Object.prototype likes Swift extensions

위 3번이 가능하다는 것을 보았으니 prototype 을 직접 이용하는 것도 가능해보인다. <span style="color: red;">결론부터 말하자면 이 방법은 
실패한다</span>.

prototype 을 이용한 확장은 단순한 Properties 나 Methods 정도만 확장이 가능하다. `Getter/Setter`와 같은 것들을 등록하려면 반드시 
`Object.defineProperty()`를 사용해야한다.

```javascript
class Rect {
  constructor(origin = new Point(), size = new Size()) {
    this.origin = origin
    this.size = size
  }
}

Rect.prototype.center = {
  get: function () {
    const centerX = this.origin.x + (this.size.width / 2)
    const centerY = this.origin.y + (this.size.height / 2)
    return new Point(centerX, centerY)
  },
  set: function (newCenter) {
    this.origin.x = newCenter.x - (this.size.width / 2)
    this.origin.y = newCenter.y - (this.size.height / 2)
  }
}
```

```javascript
const square = new Rect(new Point(), new Size(10, 10))
console.log(square.origin)                    // Point {x: 0, y: 0}
console.log(square.center)                    // {get: ƒ, set: ƒ}

square.center = new Point(17.5, 17.5)
console.log('square.origin', square.origin)   // Point {x: 0, y: 0}
console.log('square.center', square.center)   // Point {x: 17.5, y: 17.5}
```

`Object.prototype`을 이용한 방법은 `Getter/Setter`와 같은 것들을 처리할 수 없어 위와 같이 예상과 달리 잘못된 결과를 도출하게된다.

#### 5. Proxy and Reflect

위 로직을 Proxy 와 Reflect 를 사용하는 방법으로 변경해보자.

```javascript
class Rect {
  constructor(origin = new Point(), size = new Size()) {
    this.origin = origin
    this.size = size
  }
}

const squareProxyHandler = {
  get(target, property, receiver) {
    switch (property) {
      case 'center':
        const centerY = target.origin.y + (target.size.height / 2)
        const centerX = target.origin.x + (target.size.width / 2)
        return new Point(centerX, centerY)
      default:
        // return Reflect.get(target, property, receiver)
        return Reflect.get(...arguments)
    }
  },
  set(target, property, newValue, receiver) {
    switch (property) {
      case 'center':
        target.origin.x = newValue.x - (target.size.width / 2)
        target.origin.y = newValue.y - (target.size.height / 2)
        break
      default:
        return Reflect.set(...arguments)
    }
  }
}
```

```javascript
const square = new Rect(new Point(), new Size(10, 10))
const squareProxy = new Proxy(square, squareProxyHandler)
console.log('squareProxy.origin', squareProxy.origin)   // Point {x: 0, y: 0}
console.log('squareProxy.center', squareProxy.center)   // Point {x: 5, y: 5}

squareProxy.center = new Point(17.5, 17.5)
console.log('squareProxy.origin', squareProxy.origin)   // Point {x: 12.5, y: 12.5}
console.log('squareProxy.center', squareProxy.center)   // Point {x: 17.5, y: 17.5}
```

- 장점: Proxy 를 사용하면 동일한 형태의 서로 다른 케이스를 하나의 정의로 재사용할 수 있다
- 단점: Reflection 은 비용이 많이 드는 비즈니스 로직이고 코드량이 늘어난다.

[Two Phase Initialization]:/swift/2022/12/01/initialization.html#h-4-two-phase-initialization
