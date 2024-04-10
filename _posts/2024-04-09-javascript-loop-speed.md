---
layout: post
title: JavaScript Loop Speed
subtitle: Is 'for-in' really slow?
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [for-in, for-of, iteration protocol, iterable protocol, iterator protocol]
---

### 1. for-in vs. for-of 👩‍💻

#### 1. Why JavaScript have two for-loops?

Java 프로그래밍을 할 때 컴파일 된 코드를 봤는데 `for`로 작성한 코드가 `while`로 컴파일 되는 것을 보고 매우 신기했던 
적이 있다. `while`은 코드 작성 시점에 반복 횟수를 미리 알 수 없고 **Runtime** 에 알 수 있는 경우 사용한다고 배웠었다. 

하지만 대부분의 언어는 아주 고전적인 `for-i`를 사용하는 index 기반의 반복문이 아닌 `Iterable` 객체의 Elements 를 
직접 반복시키는 `for` Syntax 를 제공하면서 `do-while`과 같은 반복문이 아니면 사실상 반드시 `while`로 작성할 필요가 
없어져 작성하는 사람의 취향에 따른 선택에 가까워졌다. 

그렇다면 혹시 `while`을 사용하는 것이 `for`을 사용하는 것보다 더 빠른가에 대한 궁금증이 생겨 검색을 해보았고, 얻어낸 결론은 
컴파일러가 최적화를 하기 때문에 차이는 미미하고 성능을 목적으로 선택하지는 말라는 것이었다.

<br>

JavaScript 는 다른 언어와 달리 `forEach`도 아닌 `for` 반복문이 2개나 된다. `for-await-of`와 같은 비동기 
처리를 위한 반복문을 제외하고도 `for-of`와 `for-in`이다. 대부분 Monad 를 적용하기 위해 배열의 Instance Methods 로 
구현된 `forEach`를 제외하면 하나의 `for`만 존재한다. 심지어 Swift 의 경우는 Arrays, Sets 은 물론이고, JavaScript 
로 치면 `Map` 또는 `Object`와 유사한 `Key-Value` 데이터 구조를 갖는 Dictionaries 마저도 [for-in][Swift - for-in] 
반복문 하나로 모든 Iterable 객체를 돌릴 수 있다.

그런데 왜 JavaScript 는 `for-of`와 `for-in` 2개나 존재하는 것일까?

#### 2. Is for-of faster than for-in?

성능상 차이가 존재할까 궁금해서 찾아보니 대부분의 블로그에서 `for-in`은 다른 반복문에 비해 느리다고 이야기한다. 물론, Monad 
를 적용하기 위한 배열 메서드인 `forEach`, `map`, `filter` 와 같은 반복은 기본적인 `for`, `while`에 비하면 조금 느리지만 
가져다 주는 이점이 더욱 크기 때문에 비교 대상이 아니다.

그런데 배열 메서드도 아닌데 왜 더 느린 반복문을 <span style="color: red;">deprecated</span> 시키지 않고 굳이 유지시키는걸까?

결론부터 말하자면 [for-in](#h-4-for-in) 은 [for-of](#h-3-for-of) 에 비해 느리지 않다. [for-in](#h-4-for-in) 과 
[for-of](#h-3-for-of) 은 애초에 용도가 다르다. [for-in](#h-4-for-in) 이 느리다는 것은 [MDN - for...in] 의 설명을 
제대로 보지 않고 사용했기 때문이다.  
즉, [for-in](#h-4-for-in) 이 느린 것이 아니라 <span style="color: red;">잘못 사용했기 때문에 느린 것</span>이다.

#### 3. for-of

어떤 언어에서든 배열은 `index` 기반이고, 배열이라는 컨테이너가 갖고 있는 각각의 아이템을 뽑아서 돌리는 반복문이 존재하기 이전에 
반복을 돌리는 방법은 다음과 같다.

```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

배열의 길이를 구하고, 인덱스로 사용할 변수를 생성한 다음, 그 인덱스로 배열에 접근하는 것이다. 이를 `for-i` 반복문이라 하자. 
그런데 어차피 배열을 돌리는 목적 자체가 배열의 아이템을 가지고 무언가를 하기 위함이지 않은가? 그래서 많은 언어들은 배열의 타입에 
순환 가능한 어떤 프로토콜을 따르도록 적합성을 추가하고, 이걸 이용해 바로 아이템을 꺼내오도록 하는 반복문이 생겼다. 
JavaScript 에선 이것이 바로 `for-of`다. 

[MDN - for...of] 를 보면 `Iterable Objects`를 반복할 수 있다고 설명한다. 이것은 다른 언어와 마찬가지로 Iterable 프로토콜을 
준수하는 데이터 타입을 의미한다. JavaScript 에서 이것은 [Iteration Protocols][MDN - Iteration protocols] 
를 준수하는 Types 를 의미하며, 이것은 두 개의 프로토콜을 의미한다.

__Iteration Protocols__

- Iterable Protocol: `@@iterator` 심볼로 알려진 `[Symbol.iterator]` 메서드를 구현한 데이터 타입으로 Array, Map 
                     등이 해당한다.
- Iterator Protocol: `Iterator.prototype`을 상속해 `this`를 반환하는 `[@@iterator]()` 메서드를 구현한 데이터 타입으로 
                     Generator Object 가 해당한다.

모든 객체는 Iteration Protocols 를 따르도록 할 수 있으며, 다음은 Iterable Protocol 과 Iterator Protocol 을 모두 만족시키는 
방법으로 두 메서드를 구현하면 된다.

```javascript
// Satisfies both the Iterator Protocol and Iterable
const myIterator = {
  next() {
    // ...
  },
  [Symbol.iterator]() {
    return this;
  },
};
```

이 두 메서드를 구현하면 그 객체는 `Iteration Protocols`를 준수하게 된다.  
JavaScript 에서 Iteration Protocols 를 준수하는 Iterable Objects 는 Array, String, TypedArray, Map, Set, 
NodeList(and other DOM collections), [arguments], Generator Functions, User-Defined Iterables... 을 의미한다.

이것이 바로 일반적으로 프로그래밍 언어에서 `for` 반복문을 돌리는 방법이고, JavaScript 의 `for` 반복문을 돌리는 방법이다.

<br>

<span style="color: red;">`Iteration Protocols`를 준수하는 데이터 Types 는 `for-of` 반복문을 사용할 수 있다</span>.

```javascript
for (const fruit of fruits) {
  console.log(fruit);
}
```

#### 4. for-in

[for-of](#h-3-for-of) 에서 알 수 있는 것은, `Map`, `Set`은 `for-of`를 사용해 반복을 돌릴 수 있는데, 여기에 `Object`가 
빠졌다는 것이다. JavaScript 는 함수도 Function Objects 일 정도로 모든 것이 `Object` 기반이다. 그런데 정작 가장 많이 사용하는  
`Object`는 [Iteration Protocols][MDN - Iteration protocols] 를 따르지 않는다는 것이다.

```javascript
const fruits = {
  Apple: 4200,
  Banana: 6800,
  Cherry: 3400,
};

for (const fruit of fruits) {   // Uncaught TypeError: fruits is not iterable
  console.log(fruit);
}
```

<br>

그렇다면 `Object`는 어떻게 반복을 돌려야 할까? `for-i` 반복문을 사용하면 다음과 같이 접근할 수 있다.

```javascript
for (let i = 0, keys = Object.keys(fruits); i < keys.length; i++) {
  console.log(keys[i], fruits[keys[i]]);
}
```

`Object`의 prototype 의 `keys` 메서드를 사용해 모든 키를 추출해서 배열로 만들고, 이것을 이용해 접근하는 것이다.

<br>

`for-i`보다 [for-of](#h-3-for-of) 가 가독성은 물론이고 사용하기 더 편한 것 같은데 방법이 없을까?

```javascript
for (const [key, value] of Object.entries(fruits)) {
  console.log(key, value);
}
```

`Object`의 prototype 의 `entries`메서드를 사용하면, `[key, value]` Tuple 타입의 배열을 반환한다(엄밀히 말하면 
TypeScript 가 아닌 JavaScript 에서 이것은 배열이고, 이중 배열에 해당한다). 이것을 이용해 접근하는 것이다.



<br><br>

---
Reference

1. "for...in." MDN Web Docs. Sep. 25, 2023, accessed Apr. 09, 2024, [MDN - for...in].
2. "for...of." MDN Web Docs. Aug. 25, 2023, accessed Apr. 09, 2024, [MDN - for...of].
3. "Iteration protocols." MDN Web Docs. Dec. 27, 2023, accessed Apr. 09, 2024, [MDN - Iteration protocols].

[MDN - for...in]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
[MDN - for...of]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
[Swift - for-in]:/swift/2022/10/11/control-flow.html#h-1-for-in-loops-
[arguments]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
[MDN - Iteration protocols]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
