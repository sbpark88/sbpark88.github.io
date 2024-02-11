---
layout: post
title: Throttle and Debounce
subtitle: Use 'throttle' and 'debounce' to improve performance.
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript, ux/ui]
tags: [javascript, throttle, debounce, performance]
---

### 1. Why are they necessary? 👩‍💻

요즘 개발은 Reactive Programming 이 대세가 되며 Event Listening 기반의 프로그래밍이 많아졌다. 이러한 이벤트 기반 프로그래밍은 
좋은 UX 를 제공할 수 있으나 과도한 Event 는 오히려 성능 저하로 이어지고, UX 에 나쁜 영향을 미칠 수 있다.

*Throttle* 과 *Debounce* 가 주로 사용되는 대표적인 예를 통해 살펴보자.

#### 1. Throttle

*Throttle* 은 `최소 재입력 시간`을 주는 것과 같다. 가장 쉬운 예로는 키보드 설정에 있는 **키 반복 속도**다. 키 반복 속도가 느리면 
동일 시간 키를 누르고 있어도 반복 속도가 빠를 때보다 실제 입력이 적게 된다.

웹에서는 어떤 경우에 사용할까?

가장 많이 사용되는 예는 바로 브라우저 관련 이벤트다. 화면을 스크롤 하거나 화면을 리사이즈 하는 경우에 발생하는 이벤트는 리스너에 콘솔을 
출력해보면 엄청나게 많은 이벤트가 수신되는 것을 알 수 있다. 하지만 이 수많은 이벤트를 모두 처리하면 오히려 성능 문제가 생기고 이로 인해 
좋지 않은 UX 가 되어버린다.

수없이 발생되는 이벤트를 일정 주기마다 처리하기 위해 *Throttle* 처리를 해주면 Reactive Programming 을 유지하면서 처리 횟수를 
줄여 엄청난 성능 개선을 할 수 있다.

이 외에도 검색창에 키보드 입력시마다 자동완성 목록을 불러오는 경우에도 일정 입력 주기마다 결과를 변경해 성능 개선을 할 수 있고, Post 
와 같은 요청이 아닌 여러 번 전송이 가능한 Get 요청의 경우 고장난 마우스 등으로 인해 연속으로 2번 요청이 될 수 있는 경우에 Throttle 
을 추가해 사용자 의도가 아닌 불필요한 중복 요청을 막는 데 사용되기도 한다.

#### 2. Debounce

*Debounce* 는 `실행을 지연`시키는 효과를 낸다. *Throttle* 은 첫 번째 실행은 즉시 이루어지고, 이후 요청건에 대해 일정 시간 동안 
요청을 Block 시킨다. 따라서 일정 시간이 지나면 재요청이 가능하다. 반면 *Debounce* 는 연속된 요청건이 들어올 때 일정 시간 요청이 
중단되면 실행을 한다. 따라서 실행 지연 시간보다 짧은 주기로 지속적인 요청건이 발생하면 계속해서 실행을 하지 않는다.

이것 역시 검색창에 주로 사용된다. *Throttle* 같은 경우는 중간 입력 결과가 의미가 있는 경우 사용자에게 지속적인 피드백을 주기 위해 
사용되지만 이 경우는 중간 입력 결과가 무의미한 경우 사용하면 좋다. 어차피 중간 입력 결과가 무의미하다면 굳이 많은 요청을 보낼 필요가 
없기 때문이다.

영화 검색을 예로 들어보자. 검색창에 영화의 제목을 입력할 때 사용자의 입력을 돕기 위해 검색 텍스트 자동완성은 *Throttle* 을 이용해 
주기적으료 요청을 보내도록 처리하면 좋다. 하지만 텍스트와 달리 이미지를 불러오는 것은 많은 양의 데이터를 필요로 하며, 사용자는 아직 
검색을 위해 영화 제목을 입력중이기 때문에 상대적으로 영화 포스터에 대한 관심도는 떨어진다. 따라서 영화 포스터는 사용자가 일정 시간 입력이 
정지되었을 때 한 번씩 업데이트 하도록 하는 것이 더욱 효율적이다. 따라서 이 경우 *Denounce* 를 사용해 처리하면 성능을 높이고 
통신 및 서버 비용을 중일 수 있다.

---

### 2. Implementation - Throttle 👩‍💻

내부 커링 함수가 함수 선언식이냐 표현식이냐에 따라 `this` binding 이 필요해 조금 다르게 구현해야한다. JavaScript 와 
TypeScript 버전으로 각각 구현 내용을 살펴본다.

#### 1. JavaScript

- Function Declaration

```javascript
export const throttle = (fn, delay = 500) => {
  let available = true;

  return function () {
    if (available) {
      available = false;
      fn.apply(this, arguments);
      const timer = setTimeout(() => {
        available = true;
        clearTimeout(timer);
      }, delay);
    }
  };
};
```

- Function Expression

```javascript
export const throttle = (fn, delay = 500) => {
  let available = true;

  return (...args) => {
    if (available) {
      available = false;
      fn(...args);
      const timer = setTimeout(() => {
        available = true;
        clearTimeout(timer);
      }, delay);
    }
  };
};
```

#### 2. TypeScript

- Function Declaration

```typescript
export const throttle = (fn: Function, delay = 500) => {
  let available = true;

  return function $fn() {
    if (available) {
      available = false;
      fn.apply($fn, arguments);
      const timer = setTimeout(() => {
        available = true;
        clearTimeout(timer);
      }, delay);
    }
  };
};
```

> TypeScript 에서 `apply`를 정의할 때 `this`를 사용하면 Lint 에서 `any` Types 를 가급적 사용하지 말라고 알려주는 
> 것 때문에 `// @ts-ignore`를 명시하거나 `this`가 아닌 정확히 명시된 대상을 제공해야한다.
>  
> 무시하도록 주석 처리를 하는 것 보다는 `$fn`이라는 이름을 주는 것으로 처리했다.

- Function Expression

```typescript
export const throttle = (fn: Function, delay = 500) => {
  let available = true;

  return (...args: any[]) => {
    if (available) {
      available = false;
      fn(...args);
      const timer = setTimeout(() => {
        available = true;
        clearTimeout(timer);
      }, delay);
    }
  };
};
```

<br>

다음과 같이 사용한다.

```typescript
const throttledFoo = throttle(foo)
const throttledBar = throttle(bar, 2000)
```

---

### 3. Implementation - Debounce 👩‍💻

내부 커링 함수가 함수 선언식이냐 표현식이냐에 따라 `this` binding 이 필요해 조금 다르게 구현해야한다. JavaScript 와
TypeScript 버전으로 각각 구현 내용을 살펴본다.

#### 1. JavaScript

- Function Declaration

```javascript
export const debounce = (fn, delay = 500) => {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = undefined;
    }, delay);
  };
};
```

- Function Expression

```javascript
export const debounce = (fn, delay = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
};
```

<br>

#### 2. TypeScript

- Function Declaration

```typescript
export const debounce = (fn: Function, delay = 500) => {
  let timer: number | undefined;

  return function $fn() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply($fn, arguments);
      timer = undefined;
    }, delay);
  };
};
```

> TypeScript 에서 `apply`를 정의할 때 `this`를 사용하면 Lint 에서 `any` Types 를 가급적 사용하지 말라고 알려주는
> 것 때문에 `// @ts-ignore`를 명시하거나 `this`가 아닌 정확히 명시된 대상을 제공해야한다.
>
> 무시하도록 주석 처리를 하는 것 보다는 `$fn`이라는 이름을 주는 것으로 처리했다.

- Function Expression

```typescript
export const debounce = (fn: Function, delay = 500) => {
  let timer: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
};
```

<br>

다음과 같이 사용한다.

```typescript
const debouncedFoo = debounce(foo)
const debouncedBar = debounce(bar, 2000)
```

---

### 4. Examples 👩‍💻

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);border-radius:2px;" width="800" height="700" 
 src="https://codesandbox.io/p/sandbox/throttle-and-debounce-forked-dj9q56?file=%2Fsrc%2Findex.ts%3A1%2C1&embed=1" 
 allowfullscreen></iframe>
