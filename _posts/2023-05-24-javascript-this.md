---
layout: post
title: JavaScript 'this'
subtitle: JavaScript's 'this' are different from other languages.
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [javascript, this, context, bind, call, apply, arrow function, _this, that]
---

### 1. Function's 'this' 👩‍💻

JavaScript 의 `this`는 Swift 의 `self` 또는 타 언어에서의 `this`와 다른 행동을 보인다. **Runtime** 에 의해 
함수가 실행되는 <span style="color: red;">**context**</span> 가 바뀌기 때문이다.

- Normal Function

```javascript
function printThis() {
  console.log(this)
}

printThis()      // Window
```

- Arrow Function

```javascript
const printThis = () => console.log(this)

printThis()      // Window
```

`window` context 상에서 **printThis()** 가 호출되었으므로(실제로 `printThis()`는 `window.printThis()`로 호출된 것이다),
이때의 `this`는 호출한 객체 `window`를 가리킨다. 다른 프로그래밍 언어와 달리 객체 메서드가 아님에도 불구하고 `this`에 접근되는 것이 
의아할 수 있으나 JavaScript 에서 모든 함수는 Function 객체이기 때문이다.

---

### 2. Method's 'this' 👩‍💻

#### 1. Synchronous Code

- Normal Function

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    console.log(this)
  }
}

Banana.printThis()  // {name: 'Banana', color: 'Yellow', printThis: f}
```

`Banana` context 상에서 **printThis()** 가 호출되었으므로, 이때의 `this`는 호출한 객체 `Banana`를 가리킨다.  
일반 함수를 메서드로 사용했을 때는 다른 언어와 차이점이 없는 것 같아 보인다.

- Arrow Function

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis: () => console.log(this)
}

Banana.printThis()  // Window
```

이상하게도 `Banana`의 메서드 **printThis()** 를 호출했는데, `this`가 `window`다!

#### 2. Asynchronous Code

이번에는 위 예제를 조금 변형해보자.

- Normal Function

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(function () {
      console.log(this);
    });
  },
};

Banana.printThis()  // Window
```

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(() => console.log(this));
  },
};

Banana.printThis()  // {name: 'Banana', color: 'Yellow', printThis: f}
```

- Arrow Function

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis: () =>
    setTimeout(function () {
      console.log(this);
    }),
};

Banana.printThis(); // Window
```

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis: () => setTimeout(() => console.log(this)),
};

Banana.printThis(); // Window
```

객체의 메서드는 `Normal Functions`를, 메서드 내에서 비동기 코드(setTimeout)에는 `Arrow Functions`를 사용했을 때만 
객체를 `this`로 가리키고있다.

---

### 3. Arrow Function's 'this' 👩‍💻

[Function's 'this'](#h-1-functions-this-)와 [Method's 'this'](#h-2-methods-this-) 두 결과를 정리해보자

1. 객체의 메서드는 `Normal Functions`를 사용해야 객체 자기 자신을 `this`로 취한다.
2. 객체의 메서드 내 비동기 코드는 `Arrow Functions`를 사용해야 객체 자기 자신을 `this`로 취한다.

위에서 무슨 일이 발생한걸까?

JavaScript 의 `this`가 갖는 문제점을 먼저 이해해야한다. JavaScript 는 Compile Language 와 달리 **Runtime** 에 의해 
실행되는 함수의 <span style="color: red;">**context**</span> 가 정해진다. 
즉, <span style="color: red;">**this** 를 고정할 수 없다</span>는 말이다. 

위에서 우리는 객체의 메서드는 `Arrow Functions`가 아닌 `Normal Functions`를 사용해야 자신이 속한 객체를 `this`로 취할 수 있음을 
확인했다.

그런데 이 메서드 내 코드가 **Synchronous** 가 아닌 <span style="color: red;">**Asynchronous**</span> 로 작동하는 
경우, 해당 코드가 `Normal Functions`를 사용하면 `this`가 객체를 취하지 않는 문제가 발생했다.

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(function () {
      console.log(this);
    });
  },
};

Banana.printThis()  // Window
```

왜 `window`를 가리키는 것일까? `Banana` context 상에서 **printThis()** 가 호출되었으나, 
`setTimeout`에 의해 비동기로 처리된다.

```javascript
function () {
  console.log(this);
}
```

따라서 위 익명 함수는 Queue 의 대기열에 등록된다. 이 Event Loop 는 실행 trigger 가 작동되면 Stack 이 빌 때를 기다린다. 
즉, `Banana`의 **printThis()** 가 실행을 마치고 Stack 에서 제거되기를 기다린다. 이제 Stack 이 비었고, 위 익명함수가 
Stack 에 쌓인 후 실행된다.

결론적으로 보면 첫 섹션 [1. Function's 'this'](#h-1-functions-this-) 의 함수가 실행되고 있는 것이다.
그렇기 때문에 <span style="color: red;">메서드 내부에 비동기 코드가 포함될 경우</span> `this`는 객체를 가리키지 않는다!  
다른 언어에서의 `this`는 이런 방식으로 작동하지 않는다. **Runtime** 에 의해 함수가 실행되는 **context** 가 달라지는 문제를 
해결하고자 나온 것이 `Arrow Functions`다.

> 이것이 바로 JavaScript 의 `Arrow Functions`가 다른 언어의 Lambda Expressions 과 다른 이유다.  
> JavaScript 의 `Arrow Functions`는 단지 Synthetic Sugar 가 아닌 
> <span style="color: red;">새로 정의된 다른 함수</span>다.

물론 `Arrow Functions` 없이도 `this`를 고정시켜 문제를 해결할 수 있다. 하지만 매번 `this`를 고정하는 것은 
번거로울 뿐 아니라 복잡한 코드에서는 이를 추적하기가 쉽지 않을 수 있다.

---

### 4. Which one Choose? 👩‍💻

ES6 에서 Arrow Functions 가 소개된 이후로 기존의 Functions 문법을 빠르게 대체하고 있다. Arrow Functions 가 갖는 
특징은 다음과 같다.

> 1. Lambda Expression 기반으로 가독성이 뛰어나다.
> 2. 함수가 호출될 때 동적으로 this 가 binding 되는 일반 함수와 달리 선언할 때 상위 Scope 의 this
>    (= 자기 자신을 감싼 <span style="color: red;">부모 함수</span>의 `this`)를 기억한다. 
>    이를 `Lexical Scope`라 한다.
> 3. 자기 자신의 `this`를 갖고 있지 않다.

`let`과 `const`가 `var`의 **context** 문제를 해결했듯이, `Arrow Functions`가 `Normal Functions`의 
**context** 문제를 해결하기 위해 나온 것이다. 차이점이 존재한다면, `let`과 `const`는 `var`를 완전히 *대체하는 문법*이지만, 
`Arrow Functions`는 `Normal Functions`를 완전히 대체하는 것이 아닌, 서로 다른 두 함수가 **공존**한다는 것이다.

<br>

그러면 언제 어떤 함수를 사용하는 것이 좋을까?

__1 ) Functions__

일반 함수는 `this`를 필요로 하지 않는다. 따라서 어떤 Syntax 를 사용하든 무관하다. 단, Hosting 이 필요하다면 
`Normal Functions`를 사용해야하지만 대부분은 선언 순서를 조정하는 것 만으로 문제 해결이 가능하기 때문에 `Arrow Functions`를 
사용해도 문제는 없다.

함수를 **Higher-order Functions** 로 사용하고자 할 때는 `Arrow Functions`를 사용하는 것이 유리하다. 
물론, `Normal Functions`를 사용해도 상관 없지만 `Arrow Functions`가 *Lambda Expression* 기반으로 가독성이 뛰어나기 
때문에 주로 **Higher-order Functions** 은 `Arrow Functions`를 사용한다.

<br>

__2 ) Methods__

`this`를 사용하지 않는 코드라면 어떤 Syntax 를 사용하든 무관하다. 하지만, 메서드는 기본적으로 객체와 상호작용을 하기 위해 존재한다. 
그리고 메서드가 수정되며 `this` 접근이 필요해질 수가 있다. 따라서 메서드는 `Normal Functions`를 사용하도록 한다.

<br>

__3 ) Asynchronous Code in Methods__

메서드 내 비동기 코드는 `Arrow Functions`로 작성한다. 비동기 코드는 실행되는 시점에 **context** 가 현재 메서드가 실행 중인 
**context** 와 다르기 때문이다.

---

### 5. Fix 'this' in Asynchronous Code 👩‍💻

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(function () {
      console.log(this);
    });
  },
};

Banana.printThis()  // Window
```

메서드의 비동기 코드에서의 `this` 문제는 `Arrow Functions` 없이도 해결할 수 있다고 했다. 해당 문제를 해결할 수 있는 모든 
방법을 정리해본다.

#### 1. Closures

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    const self = this;
    setTimeout(function () {
      console.log(self);
    });
  },
};

Banana.printThis()  // {name: 'Banana', color: 'Yellow', printThis: f}
```

Closures 를 사용하면 **printThis()** 의 Closure Scope 가 **context** 를 기억할 수 있다.

#### 2. bind, call, apply

JavaScript 의 모든 Function 객체는 `bind`, `call`, `apply` 메서드를 갖고 있다.

- `bind`: binding this + arguments
- `call`: binding this + arguments + trigger
- `apply`: binding this + arguments(with array) + trigger

<br>

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(
      function () {
        console.log(this);
      }.bind(this)
    );
  },
};

Banana.printThis(); // {name: 'Banana', color: 'Yellow', printThis: f}
```

익명 함수의 `bind` 메서드를 사용해 `this`를 주입해 고정시킬 수 있다.

<br>

위에서 `bind` 메서드를 사용해 문제를 해결했다. 기본적으로 `bind`, `call`, `apply` 메서드는 `this`를 주입할 수 있다는 
공통점을 갖지만 사용법이 조금 다르다. `call`과 `apply` 메서드와는 어떤 차이가 있을까?

에제를 위해 Banana, Apple, Grape 객체와 `priceNow` 함수를 준비한다.

```javascript
const Banana = { name: 'Banana', color: 'Yellow' }
const Apple = { name: 'Apple', color: 'Red' }
const Grape = { name: 'Grape', color: 'Purple' }

function priceNow(price, count) {
    console.log(`${this.name} is ${price} won and there are ${count} left.`)
}
```

```javascript
priceNow(2000, 5)
// is 2000 won and there are 5 left.
```

`priceNow`는 메서드가 아니라 함수다. 그리고 `window`에 name 이라는 변수가 존재하지 않으므로 이름이 출력되지 않는다.

<br>

__1 ) bind__

```javascript
const bananaPrice = priceNow.bind(Banana)
bananaPrice(4500, 3)
// Banana is 4500 won and there are 3 left.
```

`bind` 메서드를 사용해 `this`를 주입시켰다. `bind` 메서드가 `call`, `apply` 메서드와 다른 점은 
<span style="color: red;">trigger 를 분리시킬 수 있다</span>는 것이다.

위와 같이 `this`만 미리 binding 시키는 것은 물론, 아래와 같이 arguments 까지 미리 정의한 다음 trigger 자체만 나중에 호출되도록
분리시키는 것도 가능하다.

```javascript
const applePrice = priceNow.bind(Apple, 5200, 6)
applePrice()
// Apple is 5200 won and there are 6 left.
```

<br>

__2 ) call & apply__

`call`, `apply` 메서드는 bind 메서드와 달리 <span style="color: red;">trigger 를 분리시킬 수 없다</span>. 
함수의 호출까지 한 번에 이루어진다. `bind` 메서드와 어떻게 다른지 알아보자.


```javascript
const applePrice = priceNow.bind(Apple)
applePrice(5200, 6)
// Apple is 5200 won and there are 6 left.
```

```javascript
const applePrice = priceNow.bind(Apple, 5200, 6);
applePrice();
// Apple is 5200 won and there are 6 left.
```

```javascript
priceNow.call(Apple, 5200, 6);
// Apple is 5200 won and there are 6 left.
```

```javascript
priceNow.apply(Apple, [5200, 6]);
// Apple is 5200 won and there are 6 left.
```

함수의 **context** 를 주입해 새로운 함수를 만들어내거나, 호출을 분리시키는 등 재사용이 필요하다면 `bind`를 사용하고, 
단지 함수를 호출할 때 `this`의 고정이 필요한 경우는 `call` 또는 `apply`를 사용하면 된다. `call`과 `apply`는 함수의 
**Arguments** 를 각각 변수로 받을지, **Arrays** 로 받을지의 차이만 갖는다.

#### 3. Arrow Functions

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis() {
    setTimeout(() => console.log(this));
  },
};

Banana.printThis(); // {name: 'Banana', color: 'Yellow', printThis: f}
```

메서드 내 비동기 코드를 작성할 때 `Arrow Functions`가 갖는 장점이다. 위의 두 방법보다 훨씬 간편하다! 
단지 함수의 Syntax 를 바꾸는 것 만으로 this 를 직관적으로 고정시킬 수 있다.

---

### 6. Prototypes 👩‍💻

#### 1. Normal Functions

Arrow Functions 를 사용할 때 주의해야하는 경우 한 가지를 더 알아보자. 바로 Prototype 에 메서드를 
등록할 때다. 일반적으로 Prototype 에 메서드를 등록하는 방법은 두 가지가 존재한다.

- 방법 1: ES5 Constructor Function

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

아래의 <span style="color: red;">**Object Literal** 을 사용한 객체 생성</span>과 혼동하지 않도록 주의한다.

```javascript
const person = {
  name: '홍길동',
  age: 25,

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  },
};

person.greet(); // Hello, my name is 홍길동 and I'm 25 years old.
```

- 방법 2: ES6 Class Syntax

```typescript
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}

const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

ES6 의 Class Syntax 는 생성자 함수와 Prototype 을 통한 메서드 등록을 내부적으로 처리해준다.

#### 2. Arrow Functions

Arrow Function 은 `Lexical Scope`를 갖기 때문에 다음과 같이 재미있는 결과를 얻는다.

- ES5 Constructor Function

```javascript
function Person(name, age) {
  this.name = name
  this.age = age

  Person.prototype.greet = () => {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}

const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old. 
```

Person 의 prototype 에 메서드를 등록하는 코드를 Person 생성자 함수 안에 작성하면, `Arrow Functions`를 사용함에도 `this`가 
객체 자기 자신을 가리킨다.  
[Which one Choose?](#h-4-which-one-choose-) 에서 설명했듯이, Arrow Functions 는 `Lexical Scope`로 자기 자신을 감싼 
<span style="color: red;">부모 함수</span>의 `this`를 사용하기 때문에, 부모 함수인 `Person` 생성자 함수의 `this`를 
사용한다. 따라서 `Object Literal` 방식과 달리 `this`가 객체 자신을 가리키게 된다. 

- ES6 Class Syntax

```typescript
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  greet = () => {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  }
}

const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

결과를 보면 `this`가 정상적으로 객체 자신을 가리킨다. 즉, ES6 의 Class Syntax 는 바로 위 코드와 동일하게
prototype 을 통한 메서드 등록 코드가 생성자 함수 내부에 존재하도록 정의되는 Synthetic Sugar 라고 볼 수 있다.

그렇기 때문에 단순히 Synthetic Sugar 에 가까운 문법이라고 하더라도, JavaScript 의 Classes 는 다른 언어의 Classes 와 
유사한 경험을 제공해줄 수 있다.

<br>

<span style="color: red;">**주의!**</span>

하지만 Prototype 에 메서드를 등록할 때 해당 코드가 생성자 함수 밖에 존재할 때는 `Arrow Functions`를 사용해서는 안 된다.

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.greet = () => {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const person = new Person('홍길동', 25)
person.greet()  // Hello, my name is  and I'm undefined years old.
```

선언할 때 상위 Scope, 즉 코드상 상위 Scope 가 `window`이기 때문이다!
