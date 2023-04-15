---
layout: post
title: JavaScript Prototype & ES6 Class
subtitle: Deep dive into JavaScript prototype
categories: javascript
tags: [javascript, prototype, es6 class, javascript inheritance, javascript superclass, javascript subclass, object.defineProperty]
---

### 1.Prototype 👩‍💻

객체 생성 과정을 통해 JavaScript Object 의 Prototype 을 이해하고 ES6 에 추가된 ES6 Class Syntax 와 비교해보자.

#### 1. Object (Constructor Function)

JavaScript 의 객체는 *최상위에 `Object`라는 객체*를 두고, 그 객체를 연결해 하위 구조로 써내려간다. 따라서 JavaScript 를 Prototype
Language 라 부르며, 이들간의 관계를 Prototype Chain 이라 한다.

그리고 좀 더 명확히 이야기하면 JavaScript 에는 Interfaces 뿐 아니라 Classes 역시 존재하지 않는다. ES6 이전 문법에서는 생성자를 다음과
같이 만들 수 있었다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}
```

만약 이것을 Properties 와 Methods 를 분리시켜 생성하고자 할 경우 다음과 같이 Constructor 만 정의한 후 Methods 를 Prototype Chain 
을 이용해 추가하는 것으로 변경할 수 있다.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
}
```

#### 2. Object (ES6 Class Syntax)

위에서 작성한 생성자 코드를 ES6 에서 추가된 Class Syntax 로 변경하면 다음과 같다.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}
```

```javascript
const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

ES6 의 Class Syntax 는 내부적으로는 'Function 을 이용한 생성자와 그 결과로 Object 가 생성되는 구조'를 그대로 따른다. ES6 의
Class Syntax 를 사용하더라도 실제로 생성되는 것은 다른 언어에서 보는 것과 같은 Class 객체가 아닌 ES5 이하에서 보던  Object 객체라는 뜻이다. 
그렇기 때문에 이를 단순히 Syntactic Sugar 로 치부하기도 하지만 보다 높은 가독성과 타 언어와의 Syntax 유사성을 확보할 수 있는 것은 큰 
장점이라고 생각한다.

> 단, 타 언어에서 생각하는 Class 와는 구조적으로, 기능적으로 많은 차이를 갖는다. 이는 JavaScript 의 문법적 특성이니 이를 명확히
> 이해하고 사용하는 것이 중요하다.

#### 3. Object Literal

마지막으로 재사용 할 가능성이 없다면 Object Literal 을 이용한 Shorthand Syntax 를 사용할 수 있다.

```javascript
const person = {
  name: '홍길동',
  age: 25,
  greet: function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}
```

```javascript
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

#### 4. Do not use Arrow Functions for Methods

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
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}
```

```javascript
console.dir(Person.prototype)
```

![Prototype Chain 1](/assets/images/posts/2023-04-14-prototype/prototype-chain-1.png){: width="500"}

> - constructor: f Person(name, age)
> - Prototype Chain: self -> Base Object

#### 2. ES6 Class Syntax

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
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
const person = {
  name: '홍길동',
  age: 25,
  greet: () => console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}
```

```javascript
console.dir(person.__proto__)
```

![Prototype Chain 3](/assets/images/posts/2023-04-14-prototype/prototype-chain-3.png){: width="500"}

> - constructor: none
> - Prototype Chain: Base Object

