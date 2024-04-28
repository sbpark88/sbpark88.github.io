---
layout: post
title: Microtask Queue
subtitle: Do not use setInterval for animation!
excerpt_image: /assets/images/posts/2024-04-27-task-queue/excerpt-image.png
categories: [javascript]
tags: [macro task queue, micro task queue]
---

### 1. Event Loop 👩‍💻

프로그래밍 언어에서 스레드 최적화를 위해 비동기를 처리하는 API 가 존재한다. Swift 같은 경우는 GCD, Run Loop 와 같은 것들이 
이런 역할을 하는데, 이 경우 멀티코어 환경에서 스레드 자원을 효율적으로 관리하고, 병렬 처리를 하기 위해 사용된다.

하지만 JavaScript 의 이벤트 루프는 조금 다르다. 비동기를 효율적으로 처리하기 위함은 맞지만, 가장 결정적인 이유는 싱글스레드 
환경으로 인한 코드 블로킹을 막기 위해 반드시 필요하다. JavaScript 에서는 이벤트 루프가 없으면 코드의 실행이 멈춰버린다! 

![Event Loop](/assets/images/posts/2024-04-27-task-queue/event-loop.png)

그리고 이 이벤트 루프에서 비동기 이벤트를 보관하는 Task Queue 는 우선순위에 따라 Macrotask Queue 와 Microtask Queue 로 
나뉜다.

![Task Queue](/assets/images/posts/2024-04-27-task-queue/task-queue.gif)

위 그림과 같이 작업이 실행되는 순서는

1. Synchronous Task
2. Asynchronous Task
   1. Microtask Queue: `process.nextTick()`, `Promise callback`, `async functions`, `queueMicrotask()`
   2. MacroTask Queue: `setTimeout()`, `setInterval()`, `addEventListener()`

와 같다.

---

### 2. Macrotask Queue 👩‍💻

Macrotask Queue 또는 그냥 Task Queue 라고 불리는 이것은 `setTimeout()`, `setInterval()`, `addEventListener()` 와 
같은 것들이 추가된다.

```javascript
function getData() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then(({ title }) => console.log(`Task 2: ${title}`));
}

function handleHeavyTask(bFetch) {
  if (bFetch) getData();
  else console.log('Task 2: 지연 없이 실행!');
}

(function () {
  console.log('Task 1');
  handleHeavyTask(false);
  console.log('Task 3');
})();
```

```console
Task 1
Task 2: 지연 없이 실행!
Task 3
```

Task 2 가 Synchronous Task 이므로 Task 1 > Task 2 > Task 3 순서대로 실행된다.

이번에는 handleHeavyTask 의 arguments 로 `true`를 넣어보자.

```javascript
(function () {
  console.log('Task 1');
  handleHeavyTask(true);
  console.log('Task 3');
})();
```

```console
Task 1
Task 3
Task 2: delectus aut autem
```

Task 2 가 Asynchronous Task 이므로 Task 1 > Task 3 > <span style="color: #13b6fa;">Task 2</span> 순서대로 
실행되었다. Task 2 가 Task Queue 에 쌓여 대기되고 있다 응답이 오고 stack 이 빌 때를 기다렸다 실행되기 때문이다.

<br>

위와 같이 `동기` 코드와 `비동기` 코드가 섞이면 순서를 예측하기 힘든 문제가 발생한다. 일일히 함수를 따라가서 전체 코드를 봐야 하기 
때문이다. 따라서 이런 문제를 가장 쉽게 해결할 수 있는 방법은 `handleHeavyTask()` 함수가 항상 비동기로 작동하도록 하는 것이다. 

```javascript
function handleHeavyTask(bFetch) {
  if (bFetch) getData();
  else setTimeout(() => console.log('Task 2: 지연 없이 실행!'));
}
```

이제 arguments 로 `false`를 입력해도 실행 순서가 Task 1 > Task 3 > <span style="color: #13b6fa;">Task 2</span>
로 보장된다.

```console
Task 1
Task 3
Task 2: 지연 없이 실행!
```

---

### 3. Microtask Queue 👩‍💻

그런데 여러 개의 비동기 코드가 존재할 때 우선순위는 어떻게 될까? 우선, 비동기 콜백이 Queue 에 들어가는 순서와 stack 이 
비워져 있는지가 중요하다.

```javascript
console.log('Task 1');
setTimeout(() => console.log('Task 2'));
console.log('Task 3');
setTimeout(() => console.log('Task 4'));
console.log('Task 5');
```

위 코드는 동기 코드 Task 1, Task 3, Task 5 가 실행되는 동안 비동기 코드 Task 2 와 Task 4 는 즉각 콜백을 Queue 에 대기시킨다. 
따라서 실행 순서는 Task 1 > Task 3 > Task 5 > <span style="color: #13b6fa;">Task 2 > Task 4</span> 가 된다.

그런데 Task 2 가 Task 4 보다 더 무겁다고 해보자.

```javascript
console.log('Task 1');
setTimeout(() => console.log('Task 2'), 2);
console.log('Task 3');
setTimeout(() => console.log('Task 4'), 1);
console.log('Task 5');
```

그러면 동기 코드가 실행되는 동안 비동기 코드 Task 4 가 먼저 Queue 에 추가되어 대기하고, 이후 Task 2 가 Queue 에 추가된다. 따라서 
실행 순서는 Task 1 > Task 3 > Task 5 > <span style="color: red;">Task 4</span> > 
<span style="color: #13b6fa;">Task 2</span> 가 된다.

그런데 동기 코드가 무거워 stack 을 오랜 시간 점유해 Task Queue 에 여러 개의 비동기 코드가 쌓여 실행을 기다리고 있다고 해보자.

```javascript
console.log('Task 1');
setTimeout(() => console.log('Task 2'));
console.log('Task 3');
setTimeout(() => console.log('Task 4 important!'));
console.log('Task 5');
```

```console
Task 1
Task 3
Task 5
Task 2
Task 4 important!
```

Task 2 와 Task 4 가 비동기 코드인데 Task 4 가 더 중요해 먼저 실행되기를 원한다면 어떻게 해야할까? Task 2 보다 Task 4 가 
Task Queue 에 먼저 추가되도록 코드를 수정해주어야한다. 하지만 위 경우는 비동기 콜백이 즉시 Queue 에 추가되기 때문에 예측이 
가능하지만, 실제 코드에서는 예측이 불가능한 상황이 발생한다.

<br>

이를 위해서 Task Queue 에 여러개의 비동기 콜백이 쌓였을 때 비교적 우선순위가 높은 콜백과 낮은 콜백을 구분하기 위해 Task Queue 를 
2개로 나누어 관리한다. 우선순위가 높은 이것을 <span style="color: #13b6fa;">Microtask Queue</span> 라 불리는 이것은 
`process.nextTick()`, `Promise callback`, `async functions`, `queueMicrotask()` 와 같은 것들이 추가된다.

```javascript
console.log('Task 1');
setTimeout(() => console.log('Task 2'));
console.log('Task 3');
queueMicrotask(() => console.log('Task 4 important!'));
console.log('Task 5');
```

```javascript
console.log('Task 1');
setTimeout(() => console.log('Task 2'));
console.log('Task 3');
Promise.resolve().then(() => console.log('Task 4 important!'));
console.log('Task 5');
```

```console
Task 1
Task 3
Task 5
Task 4 important!
Task 2
```

Task Queue 에 Task 2 가 먼저 등록되었지만 Task 4 가 [Microtask Queue](#h-3-microtask-queue) 로 등록되어 
실행 순서는 Task 1 > Task 3 > Task 5 > <span style="color: red;">Task 4</span> >
<span style="color: #13b6fa;">Task 2</span> 가 된다.



<br><br>

---
Reference

1. "Using microtasks in JavaScript with queueMicrotask()." MDN Web Docs. Apr. 06, 2024, accessed Apr. 27, 2024, [MDN - microtasks].
2. "두 개의 queue 로 동시성 제어." Youtube. Sep. 02, 2023, [두 개의 queue 로 동시성 제어](https://youtu.be/MqjkfuqMKIg?si=ItUzVcPNcLdTNm0Q).

[MDN - microtasks]:https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#timeout_and_microtask_example
