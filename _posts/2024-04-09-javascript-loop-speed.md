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

배열 메서드도 아닌데 왜 더 느린 `for-in` 반복문은 <span style="color: red;">deprecated</span> 가 되지 않는걸까?

[for-of](#h-3-for-of) 와 [for-in](#h-4-for-in) 의 정의와 차이점을 살펴보며 이야기 하겠지만, 결론부터 말하자면 둘은 
애초에 용도가 다르다. 배열에 [for-in](#h-4-for-in) 를 사용해놓고 느리다고 하는 것은 [MDN - for...in] 의 설명을 제대로 
보지 않고 사용했기 때문이다. 이것은 좀 더 정확히 말하면 <span style="color: red;">잘못 사용했기 때문에 느린 것</span>이다. 

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

물론, `forEach`를 사용하면 

```javascript
Object.keys(fruits).forEach((key) => console.log(key, fruits[key]));
Object.values(fruits).forEach((value) => console.log(value));
Object.entries(fruits).forEach(([key, value] = user) => console.log(key, value));
```

와 같이 접근할 수도 있지만, [for-of](#h-3-for-of) 를 통한 접근 방법과 크게 다르지 않을 뿐더러, `break`와 같은 
Control Flow 를 할 수 없다는 문제가 있다.

그래서 나온 것이 `for-in` 반복문이다. [MDN - for...in] 를 보면 `Symbols`를 제외한 모든 [enumerable string properties] 
를 반복할 수 있다고 설명한다.

이 `열거 가능한 문자열 속성(enumerable string properties)`이란 다음을 의미한다.

```javascript
const obj = {};

Object.defineProperty(obj, 'Apple', {
  value: 4200,
  enumerable: true  // default, true
});
```

`Object.keys`, `Object.values`, `Object.entries` 메서드를 사용할 수 있는 문자열 properties 를 의미한다. 결국 
`Object`를 위해 존재하는 반복문이라는 말이다.

```javascript
for (const fruit in fruits) {
  console.log(fruit, fruits[fruit]);
}
```

#### 5. What is the problem?

`Iteration Protocols`를 준수하는 Types 는 [for-of](#h-3-for-of) 를 사용하고, 이를 따르지 않는 `Object`는
[for-in](#h-4-for-in) 를 사용하면 된다. 그런데 무엇이 문제일까? 왜 논란이 있는 것일까?

이것은 JavaScript 의 구조적인 문제 때문이다. JavaScript 는 다른 언어와 달리 Arrays 역시 Objects 이기 때문이다.

```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];

for (const fruit in fruits) {
  console.log(fruit, fruits[fruit]);
}
```

즉, Objects 를 위해 존재하는 반복문인데, Arrays 에 실행이 가능하기 때문이다(참고로 Map 은 동일하게 `Key-Value` Types 지만 
`Iteration Protocols`를 준수하기 때문에 `for-of` 반복문 사용이 가능하다).

|         | for-of(Iteration Protocols) | for-in(enumerable string properties) |
|---------|:---------------------------:|:------------------------------------:|
| Objects |              X              |                  O                   |
| Arrays  |              O              |                  O                   |
| Map     |              O              |                  X                   |

표로 보면 한 눈에 무엇이 문제인지 알 수 있다. Arrays 에 실제로 `for-of`와 `for-in`이 모두 사용이 가능하기 때문에 발생하는 것이다.

```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];

for (const fruit in fruits) {
  console.log(fruit, fruits[fruit]);
}
```

```console
0 Apple
1 Banana
2 Cherry
```

물론 이런식으로 `index`를 Key 로 하는 `Key-Value` Types 형태의 Objects 로 인식되지만 말이다.  
빠르게 반복할 수 있도록 만들어 놓은 프로토콜을 사용하지 않고 <span style="color: red;">
굳이 `for-in`을 사용했기 때문에 느린 것</span>이다.

---

### 2. Performance Test 👩‍💻

[for-in](#h-4-for-in) 이 느린 것이 아니라 <span style="color: red;">잘못 사용했기 때문에 느린 것</span>이라고 
앞에서 설명했다. 반복을 위해 `Iteration Protocols`을 만들고, 이것을 사용하는 `for-of`를 만들어 놨는데
`Iteration Protocols`를 지원하는 배열에 굳이 `for-of`를 사용하지 않고 `for-in`을 사용하니 느린 것이다.

그렇다면 [for-in](#h-4-for-in) 을 목적에 맞게 `Objects`에 사용해도 정말로 [for-in](#h-4-for-in) 보다 느릴까?

다음 함수는 주어진 길이에 맞게 properties 를 1부터 생성한다.

```javascript
function LargeObject(length) {
  for (let i = 1; i <= length; i++) {
    this[i] = i;
  }
}
```

예를 들어

```javascript
const obj = new LargeObject(10);
```

는 `{1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10}`를 생성하고, 모든 values 를 합하면 1~10 의 
등차수열의 합을 얻을 수 있다. 이를 이용해 1~5000만의 등차수열의 합을 구해보자.

#### 1. for-i

```javascript
let t1 = performance.now();
let result = 0;
for (let i = 0, keys = Object.keys(obj); i < keys.length; i++) {
  result += obj[keys[i]];
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(13.6785 + 13.9869 + 13.9156 + 13.6352 + 13.5382) / 5 = 13.7509s

#### 2. for-in

```javascript
let t1 = performance.now();
let result = 0;
for (const key in obj) {
  result += obj[key];
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(16.2790 + 16.1625 + 15.5917 + 16.2225 + 15.9502) / 5 = 16.0412s

#### 3. for-of

- Object.entries

```javascript
let t1 = performance.now();
let result = 0;
for (const [key, value] of Object.entries(obj)) {
  result += value;
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

<span style="color: red;">97.4734s</span> 이건 뭐 추가로 확인해보 필요도 없을 정도로 느리다. 
그렇다면 `Object.entries`가 아닌 `Object.keys` 또는 `Object.values`로 접근해보면 어떨까?

- Object.keys

```javascript
let t1 = performance.now();
let result = 0;
for (const key of Object.keys(obj)) {
  result += obj[key];
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(13.2539 + 13.3760 + 14.1827 + 13.6154 + 13.2166) / 5 = 13.5289s

사실상 `for-i`와 같은 로직으로 봐도 되다보니 성능 역시 동일하게 확인된다.

- Object.values

```javascript
let t1 = performance.now();
let result = 0;
for (const value of Object.values(obj)) {
  result += value;
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(0.4228 + 0.4267 + 0.4233 + 0.4990 + 0.4860) / 5 = 0.4516s

#### 4. forEach & reduce

- forEach

```javascript
let t1 = performance.now();
let result = 0;
Object.keys(obj).forEach((key) => (result += obj[key]));
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(14.2790 + 13.3194 + 12.9647 + 13.5687 + 13.4019) / 5 = 13.5067s

`for-of`냐, `for-in`이냐 보다는 사실상 `Object.keys`메서드를 사용하는가? `Object.values` 메서드를 사용하는가? 
`Object.entries` 메서드를 사용하는가가 중요하다는 것을 확인했다. 그렇다면 당연하게도 `forEach`를 사용해도 이 조건은 
동일할 것이다. 이번에는 `Object.values`를 사용해 다시 반복을 돌려보자.

```javascript
let t1 = performance.now();
let result = 0;
Object.values(obj).forEach((value) => (result += value));
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(0.6285 + 0.6105 + 0.7024 + 0.7003 + 0.7266) / 5 = 0.6737s

- reduce

`Object.values`로 배열을 만든 다음 `for-of`를 사용한 것보다 미세하게 느리지만, 다른 방법과는 비교할 수 없을 만큼 빠르다. 
그렇다면 좀 더 순수 함수가 되도록 외부와의 상호작용을 완전히 차단시켜 `reduce`를 적용시켜보자.

```javascript
let t1 = performance.now();
const result = Object.values(obj).reduce((acc, cur) => acc + cur, 0);
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(0.4886 + 0.4565 + 0.4839 + 0.4827 + 0.5215) / 5 = 0.4866s

`Object.values`로 배열을 만든 다음 `for-of`를 사용한 것과 차이가 없다.

#### 5. while

```javascript
let t1 = performance.now();
let result = 0;
let i = 0;
const keys = Object.keys(obj);
while (i < keys.length) {
  result += obj[keys[i]];
  i++;
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(13.5255 + 13.7702 + 13.7690 + 13.2951 + 13.2285) / 5 = 13.5177s

마찬가지로 `Object.values`를 사용해 다시 반복을 돌려보자.

```javascript
let t1 = performance.now();
let result = 0;
let i = 0;
const values = Object.keys(obj);
while (i < values.length) {
  result += values[i];
  i++;
}
console.log(`Sum: ${result}, ${result === 1_250_000_025_000_000}`);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`);
```

(0.2336 + 0.1520 + 0.2443 + 0.2490 + 0.2424) / 5 = 0.2243s

참고로 `for-i` 역시 `Object.values`를 사용해서 배열을 돌리면 `while`과 동일한 성능이 측정된다.

#### 6 Summary

테스트 결과를 표로 정리해보자. 우선 `for-in`을 제외한 모든 방법은 반복을 돌리기 위해서는 `Object.entries`, `Object.keys`, 
`Object.values` 메서드 중 하나를 사용해야하는데, 이 메서드에 따른 편차가 매우 크다.

<table style="text-align: center">
<tr>
  <th colspan="3">for-of</th>
</tr>
<tr>
  <th>Object.entries</th>
  <th>Object.keys</th>
  <th>Object.values</th>
</tr>
<tr>
  <th>97.4734s</th>
  <th>13.5289s</th>
  <th>0.4516s</th>
</tr>
</table>

이 결과만 놓고 보면 무조건 `Object.values`를 사용해야만 할 것 같다. 하지만 여기엔 치명적인 문제점이 존재한다.

```javascript
const fruits = {
  Apple: 4200,
  Apricot: 9200,
  Avocado: 10300,
  Banana: 6800,
  Blueberry: 9700,
  Blackberry: 8300,
  Cherry: 3400,
  Clementine: 7700,
  Cranberry: 6900,
  ...
  Grape: 3700,
  Guava: 7100,
  Gooseberry: 8100,
  ...
}
```

위 `fruits` 객체의 모든 과일 가격의 평균을 구해야 할 경우는 `Object.values`를 사용하면 매우 빠를 것이다. 하지만 우리가 
`Key-Value` Types 를 사용하는 이유는, key 와 value 의 연관성이 필요하기 때문이다. 만약 알파벳 'B'로 시작하는 과일의 
평균 가격을 구해야 할 경우와 같은 상황에서 `Object.values`는 사용할 수 없다. 모든 값을 일단 배열로 만들고 반복을 돌리기 
때문에 `for-of`는 물론이고, `for-i`, `while` 와 같은 모든 반복문을 사용할 수 있고 빠르지만 이건 그저 Values 의 배열을 
추출한 다음 배열을 반복문 돌리는 것이기 때문이다. 이것은 우리가 원하는 것이 아니다.

<table style="text-align: center">
<tr>
  <th>for-i (Object.keys)</th>
  <th>13.7509s</th>
</tr>
<tr>
  <th>for-in</th>
  <th>16.0412s</th>
</tr>
<tr>
  <th>for-of (Object.keys)</th>
  <th>13.5289s</th>
</tr>
<tr>
  <th>forEach (Object.keys)</th>
  <th>13.5067s</th>
</tr>
<tr>
  <th>while (Object.keys)</th>
  <th>13.5177s</th>
</tr>
</table>

`key`가 필요한 상황에서 역시 `for-in`이 조금 느리긴 하다. 하지만 이것은 테스트를 위해 한 객체 안에 properties 를 
5000만개나 생성한 극단적인 경우라는 것을 고려해야한다. 배열도 아닌 단일 객체 내에 properties 를 5000만개나 만드는 경우는 
없기 때문이다. 혹시라도 이런 상황이 존재한다면, 설계부터 심각하게 잘못 되진 않았나를 고민해봐야 한다. 이렇게 극단적인 경우에 조차 
18% 정도 차이일 뿐 아니라 절대적 수치로도 1.5초 정도 차이다.

결론적으로 말하자면 <span style="color: red;">통상적인 범위 내에서 Object 를 반복할 때 `for-of`와 `for-in`의 
속도 차이는 없다</span>고 할 수 있다.

---

### 3. Final Conclusion 👩‍💻

1. Arrays 와 같이 [Iteration Protocols][MDN - Iteration protocols] 를 지원하는 Types 는 `for-of` 또는 
   `forEach`를 사용해라(배열이 매우 클 경우는 `for-i`와 `while`이 `for-of`나 `forEach`보다 조금 빠르긴 하다).
2. Objects 의 Keys 는 필요하지 않으며, 모든 Values 를 대상으로 반복을 해야할 경우는 `Object.values`메서드를 사용해라.
3. Objects 의 Keys 가 필요한 반복문을 사용할 때는 `for-in`은 결코 느리지 않다. 편리하다! 그러므로 `for-in`을 써라!



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
[enumerable string properties]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
