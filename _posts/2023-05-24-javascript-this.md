---
layout: post
title: JavaScript 'this'
subtitle: JavaScript's 'this' are different from other languages.
categories: [javascript]
tags: [javascript, this, context, bind, call, apply, arrow function, _this, that]
---

### 1. Function's 'this' and Arrow Function's 'this' are not same 👩‍💻

JavaScript 의 `this`는 Swift 의 `self` 또는 타 언어에서의 `this`와 다른 행동을 보인다.

나는 언어를 하나 잡고 처음부터 끝까지 전부 공식문서를 읽고 배운게 Swift 였다. 그런데 지난번에 코드스쿼드에서 주니어 재직자를 대상으로 
하는 클린 자바스크립트 과정을 들으며 JavaScript 의 `this`가 내가 알던 Swift 의 `self`와 달라 헤맨적이 있었고, 이를 정리해두기로 한다.

#### 1. Function's 'this' will be changed by the context

- Case 1

```javascript
function printThis() {
  console.log(this)
}

printThis()      // Window
```

`window` context 상에서 **printThis()** 가 호출되었으므로(실제로 `printThis()`는 `window.printThis()`로 호출된 것이다), 
이때의 `this`는 호출한 객체 `window`를 가리킨다.

<br>

- Case 2

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

**printThis()** 가 `Banana.printThis()`에 의해 호출되었으므로, 이때의 `this`는 호출한 객체 `Banana`를 가리킨다.

> 위 결과로부터 JavaScript 에서 의미하는 `this` 는 함수의 정의와 상관 없이 호출되는 시점에 결정된다는 것을 알 수 있다.  

<br>

이것을 이애하는 것이 중요한 이유는 기존의 Function Syntax 로 정의된 경우 메서드 내부에 async/await, EventListener, Promise, 
setTimeout 과 같은 비동기 코드가 존재할 경우 정의된 context 를 벗어난 시점에 `trigger`가 발생하므로 ***이 함수를 호출하는 객체의 
context 가 정의된 객체가 아니므로 `this`가 변경*** 되는 문제가 발생한다.

즉, 다른 언어에서 사용하던 것처럼 객체 내에서 사용하는 `this`가 정의한 context 를 기준으로 바깥쪽 Block scope 에 존재하는 고정된 
context 를 가리키는 것이 아니다.

#### 2. Arrow Function's 'this' will be fixed from definition

위에서 사용했던 코드를 그대로 Arrow Function 으로 바꿔보자.

- Case 1

```javascript
const printThis = () => console.log(this)

printThis()      // Window
```

이 경우 동일하게 window 를 가리킨다.

<br>

- Case 2

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis: () => console.log(this)
}

Banana.printThis()  // Window
```

하지만 위 *Function* 과 다르게 *Arrow Function* 은 이 경우에도 여전히 `this`가 `window`를 가리키고있다.

ES6 에서 Arrow Functions 가 소개된 이후로 기존의 Functions 문법을 빠르게 대체하고 있다. Arrow Functions 가 갖는 특징은 다음과 같다.

> 1. Lambda Expression 기반으로 가독성이 뛰어나다.
> 2. 함수가 호출될 때 동적으로 this 가 binding 되는 일반 함수와 달리 선언할 때 상위 Scope 의 this 를 기억한다.
>    이를 `Lexical Scope`라 한다.
> 3. 자기 자신의 `this`를 갖고 있지 않다.

즉, 호출하는 객체와 무관하며, 자기 자신의 `this`를 갖고 있지 않고, 정의된 시점에 상위 scope 를 `this`로 기억하는 것이다. 그리고 Object 
Literal 은 객체를 먼저 생성 후 `prototype`에 등록하는 순서가 아니라 함수를 정의한 다음 객체의 Properties 에 할당해 객체를 생성하는 순서로 
이루어지기 때문에 익명 함수 `() => console.log(this)`가 정의되는 시점에 `this`는 `window`를 가리키게 되는 것이다.

따라서 <span style="color: red;">Object Literal 방식으로 객체를 정의할 때 메서드로 Arrow Function 을 사용하지 않도록 한다</span>.

---

### 2. 'this' in Method 👩‍💻

JavaScript 는 Object Literal 을 사용하든, new Object Syntax 를 사용하든, ES6 Class Syntax 를 사용하든 모두 Object 를 
만들어낸다. 각 케이스마다 어떻게 다른지 확인해보자.

#### 1. Object Literal & Function

```typescript
const Person = {
  name: '홍길동',
  age: 25,
  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
  },
}

Person.greet()  // Hello, my name is 홍길동 and I'm 25 years old.
```

`Person.greet()`에 의해 trigger 되었으므로 `greet()` 메서드를 호출한 객체가 `Person`이다. 다음 경우를 보자.

```typescript
const createButton = (id: string, name: string) => {
  const button = document.createElement('button')
  const buttonType = document.createAttribute('type')
  buttonType.value = 'button'
  button.setAttributeNode(buttonType)
  button.setAttribute('id', id)
  button.textContent = name
  const attachmentTarget = document.getElementById('app') ?? document.getElementById('root') ?? document.body
  return attachmentTarget.insertAdjacentElement('afterbegin', button)
}

createButton('button', '버튼')
document.getElementById('button')?.addEventListener('click', Person.greet)
```

```console
Hello, my name is  and I'm undefined years old.
```

이때의 `this`를 확인해보면 `<button type="button" id="button">버튼</button>`가 출력된다. `Person`이 아니다! 
addEventListener 로 이벤트를 붙인 객체가 바로 `document.getElementById('button')` 이었기 때문이다.

<br>

<span style="color: orange;">이 문제를 해결해보자</span>

__1 ) binding__

```typescript
document.getElementById('button')?.addEventListener('click', Person.greet.bind(Person))
```

```console
Hello, my name is 홍길동 and I'm 25 years old.
```

강제로 `this`를 `Person`으로 binding 시킨다.
<br>

__2 ) Closure__

```typescript
document.getElementById('button')?.addEventListener('click', () => Person.greet())
```

```console
Hello, my name is 홍길동 and I'm 25 years old.
```

Closure 를 이용하는 것 역시 context 문제를 해결할 수 있다.

#### 2. Prototype & Function

Prototype 을 이용해 메서드를 등록하는 것은 두 가지 방법이 존재한다.

- ES5 Constructor Function

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

- ES6 Class Syntax

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

<br>

두 방법 모두 잘 작동한다. 하지만 이 경우 역시 [Object Literal & Function](#h-1-object-literal--function) 의 문제점을 
동일하게 갖는다.

```typescript
document.getElementById('button')?.addEventListener('click', person.greet)
```

```console
Hello, my name is  and I'm undefined years old.
```

이 경우 역시 `bind` 또는 `Closure`를 사용해 문제를 해결할 수 있으나 단점은 매번 개발자가 신경써야하므로 휴먼 에러가 발생할 가능성이 
높다는 것이다.

#### 3. Prototype & Arrow Function

Arrow Function 은 `Lexical Scope`를 갖기 때문에 위에서 확인한 
[Object Literal 에서는 메서드에 Arrow Function 을 사용하면 안 되는 이유](#h-2-arrow-functions-this-will-be-fixed-from-definition) 
와 같은 경우를 제외하면 다른 언어에서 사용하던 `this`,`self`와 거의 동일하게 사용하는 것이 가능하다. 이번에는 Prototype 에 
Arrow Function 을 함께 사용해보자.

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

<br>

<span style="color: red; font-weight:900">주의!</span>

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

> Constructor Function 밖에 정의하면 Prototype 에 할당 하기 전에 우변의 익명 함수가 생성되는 시점에 `this`가 `window`를 가리켜 
> 원하는 `context`를 얻지 못한다.

<br>

Prototype 과 Arrow Function 을 이용해 이벤트 등록을 해보자.

```typescript
document.getElementById('button')?.addEventListener('click', person.greet);
```

```console
Hello, my name is 홍길동 and I'm 25 years old.
```

> `binding`이나 `Closure`를 사용하지 않고도 `this`의 `context`를 정의한 객체로 지정할 수 있다!

---

### 3. Binding 'this' 👩‍💻

#### 1. bind, call, apply

JavaScript 의 모든 함수는 bind, call, apply 를 갖고 있다.

- bind: binding this + arguments
- call: binding this + arguments + trigger
- apply: binding this + arguments(with array) + trigger

<br>

테스트를 위해 3개의 과일과 가격을 출력하는 함수를 정의해보자.

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

window 객체에 name 이라는 변수가 존재하지 않으므로 이름이 출력되지 않는다.

<br>

__1 ) bind__

```javascript
const bananaPrice = priceNow.bind(Banana)
bananaPrice(4500, 3)
// Banana is 4500 won and there are 3 left.
```

`bind()` 메서드는 call, apply 메서드와 달리 trigger 를 분리시킬 수 있다.

위와 같이 `this`만 미리 binding 시키는 것은 물론, 아래와 같이 arguments 까지 미리 정의한 다음 trigger 자체만 나중에 호출되도록 
분리시키는 것도 가능하다.

```javascript
const applePrice = priceNow.bind(Apple, 5200, 6)
applePrice()
// Apple is 5200 won and there are 6 left.
```

<br>

__2 ) call & apply__

`call()`, `apply()` 메서드는 bind 메서드와 달리 trigger 를 분리시킬 수 없다. 그냥 함수의 trigger 에 `this binding`만
추가로 할 수 있게 해주는 것이라 보면 된다.

`call()`은 기존의 함수 호출 형태를 그대로 유지하며 첫 번째 arguments 로 binding 할 this 만 추가로 전달하는 형태이며,
`apply()`는 첫 번째 arguments 는 동일하게 binding 할 this 를 전달하지만 함수의 arguments 를 모두 array 로 전달하는 형태로
***Syntax 의 차이만 보일 뿐 기능은 동일***하다.

```javascript
priceNow.call(Grape, 3700, 10)
// Grape is 3700 won and there are 10 left.
```

```javascript
priceNow.apply(Grape, [4200, 6])
// Grape is 4200 won and there are 6 left.
```

#### 2. Persistent binding

event 객체에 의해 또는 실행하려는 함수가 escaping 되어 실행되는 경우 context 를 고정시키기 위해 일반적으로 `bind()`를 이용하며, 
이는 영구적으로 this 를 변경시키는 것이 아니기 때문에 매 호출마다 binding 을 해줘야한다.

문제는 이렇게 매번 binding 하는 것이 불편할 뿐 아니라 누락되는 경우가 생길 수 있으므로 휴먼 에러가 생기기 좋은 사례에 해당한다. 따라서 
호출시 의도적으로 bind, call, apply 를 사용해 this 를 binding 할 것이 아니라면 항상 동일한 this 를 가리키도록 고정시킬 수 있는 
방법을 사용하는 것이 좋다.

<br>

```javascript
const some = {
    numbers: [1, 3, 6, 7, 8, 14],

    sum() {
        setTimeout(function() {console.log(this.numbers.reduce((acc, curr) => acc += curr, 0))}, 0)
    }
}

some.sum() // Uncaught TypeError: Cannot read properties of undefined (reading 'reduce')
```

setTimout 에 의해 함수가 trigger 되는 시점의 context 가 window 가 된다. 하지만 window 에는 numbers 라는 배열이 없기 때문에 
위와 같이 에러가 발생한다. 이를 해결해보자.

__1 ) Arrow Functions__

```javascript
const some = {
    numbers: [1, 3, 6, 7, 8, 14],

    sum() {
        setTimeout(() => console.log(this.numbers.reduce((acc, curr) => acc += curr, 0)), 0)
    }
}

some.sum() // 39
```

위에서 객체의 메서드에 Arrow Functions 는 사용하지 않는 것이 좋다고 했다. 하지만 위 경우는 객체의 메서드는 Function Declarations 
를 사용하되, 메서드 내부에서 Arrow Functions 를 사용한 것이므로 이에 해당하지 않는다. 따라서 이 경우 ***Arrow Functions 의 
this 는 정의된 시점에 상위 context 를 this 가리키도록 하는 특징***을 이용하면 항상 some 을 this 로 가리키도록 할 수 있다.

<br>

__2 ) Closure Capture binding__

```javascript
const some = {
    numbers: [1, 3, 6, 7, 8, 14],

    sum() {
        const _this = this
        setTimeout(function() {console.log(_this.numbers.reduce((acc, curr) => acc += curr, 0))}, 0)
    }
}

some.sum() // 39
```

또 다른 방법으로 메서드 내부에 this 를 다른 상수를 선언하고 거기에 현재의 this 를 Capture 시키는 것이다. 즉, escaping 되기 전에 
미리 some context 일때의 this 를 `_this`에 Capture 후 이를 사용하는 것이다. Closure 의 Capture 는 이를 기억하는 특성을 
사용하는 것이므로 sum 의 this 만 정확히 예측 가능하다면 setTimeout 내 Closure 는 언제나 동일한 `_this`에 접근할 수 있다.
