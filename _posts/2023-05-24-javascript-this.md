---
layout: post
title: JavaScript 'this'
subtitle: JavaScript's 'this' are different from other languages.
categories: javascript
tags: [javascript, this, context, bind, call, apply, arrow function, _this, that]
---

### 1. The 'this' will be changed by context 👩‍💻

JavaScript 의 `this`는 Swift 의 `self` 또는 타 언어에서의 `this`와 다른 행동을 보인다.

나는 언어를 하나 잡고 처음부터 끝까지 전부 공식문서를 읽고 배운게 Swift 였다. 그런데 지난번에 코드스쿼드에서 주니어 재직자를 대상으로 
하는 클린 자바스크립트 과정을 들으며 JavaScript 의 `this`가 내가 알던 Swift 의 `self`와 달라 헤맨적이 있었고, 이를 정리해두기로 한다.

<br>

- Case 1

```javascript
function printThis() {
  console.log(this)
}

printThis()      // Window
```
<br>

- Case 2

```javascript
const Banana = {
  name: 'Banana',
  color: 'Yellow',
  printThis
}

Banana.printThis()  // {name: 'Banana', color: 'Yellow', printThis: f}
```

위 두 결과로부터 `this` 는 함수의 정의와 상관 없이 호출되는 시점에 결정된다는 것을 알 수 있다.  
즉, 함수 내 `this`가 계속 바뀐다는 것을 의마하며, 객체 내 메서드를 정의할 때 참조하려는 `this` 역시 매번 변경되는 것을 고려해야한다는 
의미가 된다.

위 현상을 정리하면 JavaScript 의 this 는 미리 Runtime 때 함수를 호출하는(=trigger 를 동작시키는) context 자체를 가리킨다.

> - Case 1: `printThis()` 함수는 window 상에서 정의되었으므로 window 객체에 등록되었고, 호출할 때 역시
>           `window`가 생략되었을 뿐 window 객체로부터 호출된다. 즉, `window.printThis()`를 호출하는 것으로,
>           window 객체로부터 trigger 되었으므로 this 는 이때의 context 인 `window`를 가리킨다.
> - Case 2: `Banana.printThis()` 함수는 명확하게 Banana 객체로부터 호출되었음을 알 수 있다. 즉, this 는 이것이
>           trigger 된 시점의 context 인 `Banana`를 가리킨다.

이것을 이애하는 것이 중요한 이유는 함수가 escaping closure 와 같이 비동기에 의해 정의된 context 를 벗어난
시점에 `trigger`가 발생하거나 event 에 의해 `trigger` 되는 경우 이 함수를 호출하는 객체의 `context`가 ***window 객체 또는 
event 객체 또는 다른 무언가***가로 변경된다.

즉, this 가 변경됨을 의미하는 것으로 특정 this 에 대한 접근이 필요하다면 명시적으로 binding 해야 한다.

> 💡 다음에 JavaScript 의 OOP 에 대해 설명하기 위해 객체 표현 방법을 포스팅 하며 다룰 것인데 객체의 메서드로써 Arrow Functions 를 
> 사용하는 경우 위 `this`에 대한 문제를 또 겪게 된다. 물론, 상속 관계에서 성능 문제로 인해 Arrow Functions 를 사용하지 않는 것이 좋지만 
> 그보다 이전에 Arrow Functions 의 this 특성으로 인해 위와 같은 문제를 또 겪게 된다.
> 
> 우선 여기서는 JavaScript 의 객체 메서드는 Arrow Functions 가 아닌 Function Declarations 를 사용해야 한다는 것과 
> Frontend 는 이미 Functional Programming 을 적극적으로 활용하기 때문에 OOP 를 많이 사용하지 않는다는 것 정도만 기억하자.

### 2. Binding 'this' 👩‍💻

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
