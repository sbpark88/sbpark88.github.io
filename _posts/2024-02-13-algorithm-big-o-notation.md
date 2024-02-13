---
layout: post
title: Algorithms and Big O Notation
subtitle: What are algorithms and why should you learn them?
excerpt_image: NO_EXCERPT_IMAGE
categories: [algorithm]
tags: [algorithm, big-o notation]
---

### 1. What algorithms are better? 👩‍

코드를 작성하고, 알고리즘을 구현할 때 중요하게 생각해야 하는 것은 다음과 같다.

- 얼마나 빠른가?
- 얼마자 적은 메모리를 사용하는가?
- 얼마나 읽기 쉬운가?

### 2. How faster? 👩‍

알고리즘을 구현하며 얼마나 빠른가를 측정하려면 문서가 열린 시간으로부터 가동되는 타이머 함수를 사용할 수 있다.

```javascript
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

let t1 = performance.now();
addUpTo(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed: ${(t2 - t1) / 1000} seconds.`)
```

측정하고자 하는 코드의 전후에 `performance.now()` 함수로 시간을 측정해 두 시간차를 구함으로써 실행 시간을 구할 수 있다. 하지만 
이런식으로 코드의 실행 시간을 측정하는 것이 항상 좋은 방법은 아니다. 여러 개의 매우 빠른 알고리즘 중에서도 가장 빠른 알고리즘이 
존재할텐데 너무 빠르게 실행되는 경우 편차로 인해 정확한 결과를 얻기 힘들다. 때로는 너무 오래 걸리는 알고리즘이어서 실제 결과를 확인하는 
데 너무 많은 시간이 소모될 수 있다. 또한 이 방법은 컴퓨터의 성능에 영향을 받는다.

직접 시간을 측정하는 것 보다 좋은 방법은 <span style="color: red;">컴퓨터가 처리해야하는 연산 갯수를 세는 것</span>이다. 

![addUpTo 1](/assets/images/posts/2024-02-13-algorithm-big-o-notation/add-up-to-1.png){: width="400"}

n 이 얼마나 큰 수이든 상관 없이 `3 번의 연산`이 발생한다.

![addUpTo 2](/assets/images/posts/2024-02-13-algorithm-big-o-notation/add-up-to-2.png){: width="400"}

`5n + 2 번의 연산`이 발생하므로 n 이 클수록 연산 횟수 또한 늘어난다.

이러한 표현 방식을 `Big O`라 한다.

### 3. Big O Definition 👩‍

#### 1. Time Complexity

알고리즘이 `O(f(n))`이라는 것은 연산해야 할 `n`이 증가함에 따라 <span style="color: red;">최대 연산 횟수</span> 
`f(n)`이 얼마나 필요한지를 나타낸다.

- `f(n) = n`: linear
- `f(n) = n²`: quadratic
- `f(n) = 1`: constant

```javascript
function addUpTo(n) {
  return n * (n + 1) / 2;
}
```

```javascript
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}
```

위 함수는 *항상 3번의 연산*을 했고, 아래 함수는 *5n + 2 번의 연산*을 했다. 하지만 내부적으로 n 번이든, 5n 번이든 **n 이 커지면 
그래프를 표현하는 데 있어 이것은 크게 중요하지 않다**. 중요한 것은 지수이다. 따라서 위 함수는 `O(1)`으로 표현될 수 있고, 
아래 함수는 `O(n)`으로 표현될 수 있다.

![countUpAndDown](/assets/images/posts/2024-02-13-algorithm-big-o-notation/count-up-and-down.png){: width="400"}

위 함수의 경우, `O(n)`번의 연산이 2번 있으므로 **Big O** 가 `O(2n)`이라 생각할 수 있으나, 내부 연산이 n 번이든, 5n 번이든 사소한 
것은 무시한 채 그래프의 큰 그림만 보기로 했다. 그러므로 <span style="color: red;">이것은 여전히 `O(n)`이다</span>.

> 왜 무시할까? 1차 방정식이 `f(n) = n` 이든, `f(n) = 2n` 이든, `f(n) = 100n` 이든 2차방정식과 비교하면 결국 기울기는 
> 크게 중요하지 않기 때문이다. 1차 방정식 `f(n) = 10000n`이 되어봤자 2차 방정식 `f(n) = n²`에 비하면 지수 자체가 달라지기 때문이다. 
> 따라서 이 경우, 앞에 어떤 기울기 상수값이 붙었는지는 전혀 중요하지 않다.

<br>

![printAllPairs](/assets/images/posts/2024-02-13-algorithm-big-o-notation/print-all-pairs.png){: width="400"}

위 함수의 경우는 내부 연산 횟수를 무시하지 않는다. `O(n)`의 연산 안에 `O(n)`의 연산이 중첩되어 있기 때문이다. 앞에서 이야기 했듯이 
1차 방정식에서 2차 방정식으로 넘어가는 것이다. <span style="color: red;">이것은 `O(n * n)`이 되어 `O(n²)`이 된다</span>.

> 쉽게 말해, 상수는 무시한 채 표현한다고 생각하면 된다.
> 
> - `O(232n + 10)`은 상수값을 무시한 채 `O(n)`으로 표기한다.
> - `O(500000000)`은 상수값을 무시한 채 `O(1)`으로 표기한다.
> - `O(13n² + 13)`은 상수값을 무시한 채 `O(n²)`으로 표기한다.
> - `O(n² + 500n)`은 상수값을 무시한 채 `O(n²)`으로 표기한다.
> 
> 사소한 연산을 무시하는 이유는 컴퓨터가 `2 + 2`를 처리하는 시간과 `100만 + 2`를 처리하는 시간은 비슷하기 때문이다.

<br>

JavaScript 에서 *Time Complexity* 를 이야기 할 때 규칙이 있다.

1. 산술 연산은 `constant`다.
2. 변수 할당은 `constant`다.
3. array 에 index 로 접근하거나 object 에 key 로 접근하는 것은 `constant`다.
4. loop 안에 어떤 연산이 존재하든, loop 의 길이만큼 연산한다(중첩 loop 를 이야기 하는 것이 아니다).

loop 의 중첩이 2회인 것만 해도 엄청난 연산을 수행하기 때문에 loop 중첩을 3회씩 하는 코드는 작성하지 않기 때문에 
대부분의 추세는 다음과 같이 표현된다.

![Big O Graphs](/assets/images/posts/2024-02-13-algorithm-big-o-notation/big-o-graphs.png){: width="400"}

<br>

__Examples__

```javascript
function logAtLeast5(n) {
  for (var i = 1; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}
```

쉽게 예상할 수 있듯이 `O(n)`이다.

```javascript
function logAtMost5(n) {
  for (var i = 1; i <= Math.min(5, n); i++) {
    console.log(i);
  }
}
```

이 경우도 `O(n)`이라 생각할 수 있으나, 이 함수는 n 이 커져도 아무런 영향을 미치지 못한다. n 이 아무리 커져도 최대 
5번이다. 따라서 `O(1)`이다.

#### 2. Space Complexity

[Time Complexity](#h-1-time-complexity) 가 알고리즘의 소요 시간을 다루었다면, **Space Complexity**, 공간 복잡도란 
알고리즘의 메모리 사용량을 다룬다.

기본적으로, 입력값 n 이 커질수록, 필요로 하는 공간이 무한대로 늘어난다. 하지만 여기서 이야기하는 메모리 사용량은 
<span style="color: red;">입력되는 것은 제외</span>하고 `알고리즘 자체가 필요로 하는 공간(메모리 사용량)`을 의미한다.  

<br>

JavaScript 에서 *Space Complexity* 를 이야기 할 때 규칙이 있다.

- 대부분의 boolean, number, undefined, null 은 `constant space`다.
- String 은 문자열의 길이만큼 `O(n)`의 공간을 차지한다.
- Reference Types(array, object)는 배열의 길이, key 의 갯수만큼 `O(n)`의 공간을 차지한다.

<br>

![sum](/assets/images/posts/2024-02-13-algorithm-big-o-notation/sum.png){: width="400"}

number 2개이므로 `1 + 1`이다. 둘다 <span style="color: red;">constant 이므로 `O(1)`이 된다</span>.

![double](/assets/images/posts/2024-02-13-algorithm-big-o-notation/double.png){: width="400"}

<span style="color: red;">array</span> 가 길이만큼 늘어나므로, <span style="color: red;">`O(n)`이 된다</span>.

#### 3. log complexity

`f(n) = n² + 8n + 24`는 `n² + 8n + 24 = 0`이 되는 이차 방정식의 해를 구하는 것으로, 이 케이스의 *complexity* 는 
`f(n) = n²`였다.

우리는 어떤 값의 범위가 매우 크거나 linear 하지 않고 배수로써 증가하거나 감소하는 경우(i.e. 진도, 식품의 부패 지수, 은행의 복리) 
로그를 취해 단순화 시킨다. 컴퓨터에서 이것이 중요한 이유는 어떤 탐색 알고리즘들 역시 탐색 해야 할 대상의 범위가 매우 커 log 를 사용한 
수식으로 복잡도가 표현되는 경우가 존재하기 때문이다.

당연히 지수함수와 마찬가지로 로그함수도 그래프 추세에 큰 영향을 미치지 않는 사소한 것들은 무시하고 표현을 한다. 예를 들어 
`log(n² + 500n + 2000)`이라 하더라도 그래프 추세에 영향을 미치는 `log(n²)`만 보기로 하는 것이다.

4개의 로그 방정식
<code>log<sub>2</sub>n<sup></sup></code>, <code>log<sub>3</sub>n</code>, 
<code>log<sub>2</sub>n<sup>10</sup></code>, <code>log<sub>2</sub>n<sup>100</sup></code> 을 예로 들어보자.
기울기를 비교해보면 <code>log<sub>3</sub>n</code> < <code>log<sub>2</sub>n<sup></sup></code> 
< <code>10log<sub>2</sub>n</code> < <code>100log<sub>2</sub>n</code> 가 된다.

여기서 핵심은 <code>0 < log<sub>3</sub>n < n</code>라는 것이다. 마찬가지로 <code>0 < log<sub>2</sub>n < n</code>, 
<code>n < 10log<sub>2</sub>n < n²</code>, <code>n < 100log<sub>2</sub>n < n²</code> 관계가 성립된다.

즉, <span style="color: red;">밑이 얼마인지, 앞에 곱해지는 수가 얼마인지는 크게 중요하지 않다</span>. `앞이 있냐 없냐가 중요한 
것`이다. 따라서, `log n` 또는 `nlog n`두 케이스로 표현할 수 있다.

이들의 기울기에 따른 그래프 추세 관계를 표현하면, `O(log n)`은 `O(1)`과 `O(n)` 사이에 위치하고, `O(nlog n)`은 `O(n)`과 
`O(n²)` 사이에 위치하게 된다.

![Big O Graphs](/assets/images/posts/2024-02-13-algorithm-big-o-notation/big-o-graphs.png){: width="400"}

그래서 위와 같은 그래프가 나오게 되는 것이다.

---

### 4. Object and Array 👩‍

#### 1. Object

일반적으로 프로그래밍 언어에서 `Key-Value` Types 의 특징은 <span style="color: red;">**Hash Tables**</span> 를 기반으로 
하기 때문에 기본적으로 `Unordered Collection`이며, 빠른 속도의 **access, insertion, removal** 에 적합한 데이터 타입이다. 
따라서 일반적으로 다음과 같은 특성을 갖는다.

- Access: `O(1)`
- Insertion: `O(1)`
- Removal: `O(1)`
- Searching: `O(N)`

따라서 주요 메서드의 *Time Complexity* 는 다음과 같다.

- Object.keys: `O(N)`
- Object.values: `O(N)`
- Object.entries: `O(N)`
- hasOwnProperty: `O(1)`

```javascript
Object.keys(instructor)                // O(N) 
instructor.hasOwnProperty('firstName')  // O(1)
```

> 물론, 언어마다 `LinkedHashMap`과 같은 `Ordered Collection`의 구현이 되어있거나 구현을 해 사용할 수도 있다. 

#### 2. Arrays

일반적으로 프로그래밍 언어에서 `Array` Types 의 특징은 <span style="color: red;">Index</span> 를 기반으로 하기 때문에 
기본적으로 `Ordered Collection`이며, 정렬된 데이터에 적합한 데이터 타입으로 빠른 **access** 속도를 갖는다. 하지만 정렬되어야 하기 
때문에 **insertion, removal** 은 케이스에 따라 달라진다.

- Access: `O(1)`
- Insertion: It depends...
- Removal: It depends...
- Searching: `O(N)`

따라서 주요 메서드의 *Time Complexity* 는 다음과 같다.

- push: `O(1)`
- pop: `O(1)`
- unshift: `O(N)`
- shift: `O(N)`
- splice: `O(N)`
- concat: `O(N)`
- slice: `O(N)`
- reverse: `O(N)`
- forEach/map/filter/reduce/etc.: `O(N)`
- sort: `O(NlogN)`


> 물론, 언어마다 `Set`과 같은 `Unordered Collection`의 구현이 되어있거나 구현을 해 사용할 수도 있고, 배열보다 
> `Single Linked List`나 `Double Linked List`와 같은 데이터 타입이 더 빠를 수도 있다.


<br><br>

---
Reference

1. Colt Steele, "JavaScript 알고리즘 & 자료구조 마스터클래스" Udemy.com. last modified Aug. 2023, [https://www.udemy.com/course/best-javascript-data-structures](https://www.udemy.com/course/best-javascript-data-structures)

