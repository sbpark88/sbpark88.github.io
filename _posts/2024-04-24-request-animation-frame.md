---
layout: post
title: Request Animation Frame(rAF)
subtitle: Do not use setInterval for animation!
excerpt_image: /assets/images/posts/2024-04-24-request-animation-frame/excerpt-image.gif
categories: [javascript]
tags: [transition, animation, keyframes, setInterval, request animation frame, rAF, reflow, repaint]
---

### 1. Transition 👩‍💻

브라우저가 애니메이션을 표현할 수 있는 방법이 무엇이 있을까? 가장 기본적이고 쉬운 것! 바로 CSS 의 `transition`을 사용하는 것이다. 
transition 은 성능도 좋고, 사용하기 쉬워 단순한 애니메이션 구현에 가장 많이 사용되는 방법이다. 하지만 여기에는 한 가지 문제점이 
존재한다.

바로 애니메이션 적용을 위해서는 `hover`가 발생한다거나 `class`가 변경딘다거나 하는 등 사용자의 인터랙션이 발생하거나 JavaScript 
코드에 의해 class 가 변경된다거나 해서 적용되어야 하는 CSS 의 변경이 발생되어야한다. 
즉, 애니메이션이 작동하기 위해서는 <span style="color: red;">외부 개입이 반드시 필요</span>하다. 그리고 애니메이션을 반복하고 
싶을 경우 setInterval 의 도움을 받아야 하고, 두 개의 애니메이션을 이어서 연속으로 작동시키고 싶을 경우 역시 setTimeout 의 도움을 
받아야하는데, JavaScript 가 싱글스레드이다보니 정확한 애니메이션 구현이 되지 않을 수 있을 뿐 아니라 단순한 애니메이션 연결을 위해서 
CSS 도 JavaScript 도 너무 난잡해지게되는 문제가 있다.

따라서 사용자 인터랙션에 반응하는 단순한 애니메이션 효과를 줄 때는 매우 효율적이지만 그 외 경우에 사용하기 힘들다는 단점이 있다.

---

### 2. setInterval 👩‍💻

#### 1. Problems of the setInterval

그렇다면 `setInterval`을 사용하는 것은 어떨까? 애니메이션 효과를 오로지 JavaScript 만으로 작성하기 때문에 애니메이션 반복이나 
연결 모두 사용자 인터랙션 없이 코드만으로 모든 것을 제어할 수 있다는 장점을 갖는다.

하지만 setInterval 은 추천되는 방법이 아니다. 왜 그럴까?

1. 프레임 손실 발생 가능성이 높다.
2. 하드웨어 가속을 사용하지 못한다.

우선 첫 번째, 가장 큰 문제가 프레임 손실이다. JavaScript 가 싱글스레드인 것과 관련이 있다. HTML 및 CSS 파일을 읽어서 파싱 하고 
Object Model(DOM, CSSOM) 트리를 생성 후 레이아웃을 잡고 스타일을 적용하면 렌더링이 완료된다. 그런데 애니메이션이 적용된다는 것은 
렌더링 과정 중 레이아웃을 잡고 스타일을 적용하는 `Reflow`와 `Repaint`가 지속적으로 다시 호출되는 실행되는 상태를 의미한다.

#### 2. Display Hertz

하드웨어 가속을 지원하지 않아서 성능이 좋지 못하다는 것은 쉽게 이해할 수 있다. 하지만 프레임 손실이 발생할 가능성이 높다는 것은 
왜일까?

브라우저는 원래 애니메이션 같은 작업을 염두해두고 만들어지지 않았었다. 정적인 데이터를 출력하도록 만들어졌다는 것이다. 그리고 
JavaScript 를 기본 언어로 채택하면서 멀티스레드 환경이 불가능해졌다. 이런 문제를 해결하기 위해 `Service Worker`가 도입되었지만 
브라우저의 렌더링은 메인스레드에서 돌아야 하기 때문에 무거운 작업을 Worker 를 통해 돌릴 수 있어도 메인스레드의 interrupt 를 
막을 수는 없다.

프레임과 주사율이 어떤 관계에 있길래 이것이 애니메이션에 중요한 영향을 미치는 것인지 TV의 사례를 보자. 영화는 옛날부터 지금까지 대부분 
23.976fps 를 사용하고 있다. 약 24fps 라는 말이다. 그러면 디스플레이 주사율이 24fps 의 정수배를 가져야 프레임 손실이 없다.

그런데 TV 방송 시장이 디지털로 넘어오면서 NTSC 방식을 사용하는 우리나라와 미국은 30fps 를 사용하고 PAL & SECAM 방식을 사용하는 
유럽은 25fps 를 사용하고 있다. 왜일까? 우리와 미국의 교류 전력 주파수는 60Hz 고, 유럽은 50Hz 를 사용한다. 교류 전력의 주파수와 
디스플레이 주사율을 동기화 시키면 비용을 줄일 수 있는 점에 착안한 것이다. 간혹 가다 50Hz 모니터도 있지만 대부분의 디스플레이가 60Hz 
가 표준으로 자리 잡은 이유다.

여기서 문제가 되는 것이 무엇일까? 디지털 방송이 아닌 영화를 TV로 볼 때 발생한다. 60Hz는 1초에 60번 프레임을 변경할 수 있다는 말인데 
영화는 약 24fps 이기 때문에 정수배를 맞출 수 없다. 결국 각각의 프레임이 3번, 2번, 3번, 2번... 이런식으로 뿌려져야 60Hz 조건을 
맞출 수 있는 것이다. 그러면 무슨 일이 발생할까? 영상이 어색한 순간이 나타나게 된다. 안그래도 24fps 라는 프레임 수치가 높은 수치가 
아닌데 프레임 분배 마저 정수배가 맞지 않으니 영상이 매끄럽지 않은 문제가 발생한다.

그래서 TV 는 패널에 120Hz 의 주사율을 도입했다. 그러면 24fps 의 정수배가 되기 때문이다. 게다가 AD 보드를 사용해 프레임 보간까지 
하는 등 영상을 부드럽게 하기 위해 최선을 다하고있다.

<span style="color: red;">프레임 배분이 고르게 되지 않는다는 것</span>은  
<span style="color: red;">매끄러운 화면을 볼 수 없다는 것</span>을 의미한다.

#### 3. In Browser

이제 다시 브라우저로 돌아와보자. TV 사례로부터 60Hz 의 모니터에서 가장 최적의 애니메이션은 60fps 를 가져야 함을 알 수 있다. 
그 다음 대안으로는 정수배를 가질 수 있는 값 중 가장 큰 값으로 30fps 가 대안이 될 수 있다.

그러면 setInterval 로 60fps 를 만족시키려면 어떻게 해야할까?

60fps 를 뒤집어보자. 

<p>\( \frac{1\, \text{s}}{60\, \text{frames}} = \frac{1000\, \text{ms}}{60\, \text{frames}} \approx 16.6\, \text{ms} \)</p>

각 프레임간 간격이 약 16.6ms 가 되어야 한다. 만약 30fps 로 애니메이션을 뿌리고 싶다면 프레임 간격은 2배인 33.2ms 가 되는 것이다.

setInterval 이 정확히 주기마다 실행된다면 아무런 문제 없이 애니메이션을 출력할 수 있다. 하드웨어 가속이 지원되지 않아 다소 성능에 
영향을 미치더라도 애니메이션 구현 자체는 정상적으로 할 수 있다는 말이 된다.

그런데 문제는 `setInterval`은 브라우저의 렌더링 주기와 무관하게 작동한다는 것이다. 즉, 디스플레이 주사율을 고려하지 않고 실행된다는 
말이다. 이게 왜 문제가 될까?

우선 첫 번째 문제는 모든 디스플레이가 60Hz 를 사용하지 않는다. 사용자가 임의로 주사율을 변경했을 수도 있고, 50Hz 라던가 75Hz, 그 외 
고주사율로 90Hz, 120Hz, 144Hz 와 같이 디스플레이마다 다양한 주사율을 갖는다. 두 번째 문제는 `setInterval`이
Macrotask Queue 라 Microtask Queue 등 다른 작업이 스택에 끼어들 경우 디스플레이 주사율과 setInterval 의 주기가 달라진다는 것이다.

---

### 3. Synchronize with Display Hertz 👩‍💻 

위와 같은 문제를 해결해 원활한 애니메이션을 표현하기 위한 방법이 두 가지 존재한다. 하나는 CSS 의 `animation`을 사용하는 것이고, 
다른 하나는 JavaScript 의 `requestAnimationFrame`을 사용하는 것이다. 이 둘은 브라우저가 제공하는 API 를 사용해 최적화된 
애니메이션을 만들어내는데 특징은 다음과 같다.

1. 디스플레이 주사율(=브라우저 렌더링 엔진 실행 주기)와 동기화 돼 실행되므로 프레임 손실 발생 가능성이 적다.
2. 디스플레이 주사율과 동기화되므로 최적의 애니메이션 프레임 구현이 가능하다.
3. 하드웨어 가속을 사용할 수 있다.

그렇기 때문에 이 두 방식은 더 뛰어난 애니메이션을 제공할 수 있는 것이다.

#### 1. CSS - animation

__1 ) Animation Properties__

CSS 의 `animation`이 제공하는 properties 는 다음과 같다.

- `animation-name`: `@keyframes` 이름을 지정하며 <span style="color: red;">필수값</span>이다.
- `animation-duration`: ms, s 단위로 지정하며 <span style="color: red;">필수값</span>이다.
- `animation-timing-function`: 애니메이션 타이밍 함수를 지정한다. 기본값은 `ease`다.
- `animation-delay`: ms, s 단위로 애니메이션 시작 딜레이를 지정한다.
- `animation-iteration-count`: 기본값은 `1`이며 `infinite`을 주면 무한 재생이 가능하다.
- `animation-direction`: 기본값은 `normal`이며, `reverse`는 역방향, `alternate`는 정방향 바운스, 
                         `alternate-reverse`는 역방향 바운스를 지정한다.
- `animation-fill-mode`: 애니메이션 적용 행동값으로 기본값은 `normal`이다.  
                        - normal: 대기 -> 시작 -> 종료 -> 대기  
                        - forwards: 대기 -> 시작 -> 종료  
                        - backwards: 시작 -> 종료 -> 대기  
                        - both: 시작 -> 종료
- `animation-play-state`: 기본값은 `running`이며 `paused`를 주어 <span style="color: red;">일시정지</span>
                         시킬 수 있다.

참고로 setInterval 은 `clearInterval` 로 반복을 중단할 수 있듯이 requestAnimationFrame 은 `cancelAnimationFrame`
로 애니메이션 중단이 가능다. 하지만 이것은 반복을 중단시키는 것일 뿐 <span style="color: red;">재개할 수 있는 기능은 존재하지 
않는다</span>. 따라서 재개를 위해서는 다시 시작할 떼 남은 시간과 변화량만 애니메이션을 진행하도록 계산을 직접 해주어야한다. 
반면 animation 의 `animation-play-state`는 값을 바꾸는 것 만으로 일시정지 및 재개를 할 수 있다.

그리고 위 properties 단축 속성으로 `animation`을 사용하면 모든 설정값을 한 번에 지정할 수 있다.

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

<br>

__2 ) @keyframes__

위 properties 는 애니메이션 적용 스타일을 지정하는 부분은 존재하지 않는다. 즉, 애니메이션 설정값을 지정하는 옵션으로, 실제 스타일은 
`@keyframes`를 사용해 지정한다. 따라서 `animation`은 반드시 `@keyframes`를 작성해야함을 의미하는 것이다.

`@keyframes`에서 사용할 수 있는 properties 는 다음과 같다.

- `from`: 시작 스타일을 지정.
- `to`: 종료 스타일을 지정.

참고로 여기서 시작과 종료는 애니메이션이 실행되는 시점에 시작과 종료를 의미한다. 애니메이션이 시작되기 전 **대기** 상태를 의미하는 
것이 아님에 유의하도록 한다.

- `%`: `from`, `to`는 0% 와 100% 를 사용한 것과 같다. 만약 더 다양한 구간으로 나누고 싶다면 `%`를 사용해 여러 단계별 
       애니메이션 지정이 가능하다.

#### 2. JavaScript - requestAnimationFrame

```javascript
const element = document.getElementById("some-element-you-want-to-animate");
let start, previousTimeStamp;
let done = false;

function step(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
  }
  const elapsed = timeStamp - start;

  if (previousTimeStamp !== timeStamp) {
    // Math.min() is used here to make sure the element stops at exactly 200px
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = `translateX(${count}px)`;
    if (count === 200) done = true;
  }

  if (elapsed < 2000) {
    // Stop the animation after 2 seconds
    previousTimeStamp = timeStamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
```

`requestAnimationFrame` 은 `window` 객체가 가지고 있는 글로벌 API 다. 이 메서드에 프레임을 그릴 함수를 전달함으로써 
작동하는 데, 단 하나의 프레임만 그리기 때문에 애니메이션이 작동하기 위해서는 함수 내에서 다시 자신을 `requestAnimationFrame`에 
전달하도록 해 재귀함수를 작성하는 것과 유사하게 코드를 작성해야한다.

CSS `animation`는 상관 없지만 JavaScript `requestAnimationFrame`은 애니메이션을 위해 JavaScript 콜백 함수를 
작성해야한다. 그리고 이 콜백함수가 <span style="color: red;">16.6ms 를 초과하는 무거운 함수일 경우 프레임 손실</span>이 
발생할 수 있음에 유의해야한다.

참고로 setInterval 은 `clearInterval` 로 반복을 중단할 수 있듯이 requestAnimationFrame 은 `cancelAnimationFrame` 
로 애니메이션 중단이 가능하다.

<span style="color: red;">Timing Function</span> 을 적용해야 할 경우 CSS 의 `animation`을 사용하거나,
JavaScript 를 사용할 경우 `GSAP`, `Framer-motion`과 같은 라이브러리를 사용해야하지만 linear 한 기본적인 애니메이션은 
별도의 라이브러리 설치 없이 `requestAnimationFrame`을 직접 구현해 가볍게 사용할 수 있다는 것이 가장 큰 장점이다.

그리고 위 코드를 보면 콜백함수가 디스플레이 주파수만큼 실행되기 때문에 얼핏 보면 너무 많은 스택이 쌓여 `Stack Overflow`가 
발생할 것 같지만 안전하다는 것이다! `requestAnimationFrame`에 사용되는 콜백함수는 컴파일러에 의한 꼬리 재귀(Tail Recursion) 
최적화와 마찬가지로 브라우저가 디스플레이 주사율과 동기화 되어 반복문을 수행하듯이 작동하기 때문에 과도한 콜백 함수로 인한 
`Stack Overflow` 문제를 일으키지 않는다.

<br>

그리고 `requeatAnimationFrame`은 `animation`과 가장 중요한 차이점이 하나 존재한다. 다른 JavaScript 에 의해 
메인스레드가 블로킹 되더라도 애니메이션이 리렌더링만 되지 않을 뿐 디스플레이 주사율과 동기화 되어 계속 실행되는것은 동일하다.   
하지만 해당 탭이 포그라운드에 있지 않을 경우에도 계속 재생되는 `animation`과 달리 `requeatAnimationFrame`은 
애니메이션을 일시 정지한다. 이것은 모바일 기기와 같은 환경에서 리소스를 절약할 수 있다.

|                         |   setInterval   |          animation           |    requestAnimationFrame     |
|-------------------------|:---------------:|:----------------------------:|:----------------------------:|
| 디스플레이 주사율 동기화           |        X        |              O               |              O               |
| 하드웨어 가속                 |        X        |              O               |              O               |
| 메인스레드 블로킹 시 애니메이션 재생    | 블로킹 해제 후 이어서 진행 | 리렌더링은 안 되지만 애니메이션은 블로킹 없이 진행 | 리렌더링은 안 되지만 애니메이션은 블로킹 없이 진행 |
| 탭이 포그라운드가 아닐 때 애니메이션 재생 |       재생        |              재생              |             일시정지             |

---

### 4. Examples - Progress Bar 👩‍💻

<style>
.container {
  width: 100%;
  height: 20px;
  background-color: #fed;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  width: 0;
  background-color: #31e51f;
}

.controller button {
  padding: 5px 15px;
  margin: 12px 5px;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  background-color: #ffe4c4;
  font-weight: 700;
}
</style>

#### 1. setInterval

```javascript
import { $ } from '/assets/js/utils/render.js';
import { delay } from '/assets/js/utils/fp.js';


const HERTZ = 60;
const TWO_SECONDS = 2;
const FRAME_INTERVAL = 1000 / HERTZ; // 16.6ms

const progress = $('.progress');

let runner;

const start = () => {
  const changeQuantity = 100;
  const totalFrames = HERTZ * TWO_SECONDS;
  const oneFrameChangeQuantity = changeQuantity / totalFrames;
  let frame = 0;

  runner = setInterval(() => {
    progress.style.width = `${oneFrameChangeQuantity * ++frame}%`;
    if (frame === totalFrames) stop();
  }, FRAME_INTERVAL);
};
const stop = () => {
  clearInterval(runner);
  attachStartEvent();
};
const task = async (event) => {
  event.target.style.backgroundColor = '#a9a9a9';
  let sum = 0;
  await delay(10);
  while (true) {
    sum += 1;
    if (sum > 3_000_000_000) break;
  }
  event.target.style.backgroundColor = '#ffe4c4';
};

const attachStartEvent = () => {
  $('#start').addEventListener('click', start, { once: true });
};
attachStartEvent();
$('#stop').addEventListener('click', stop);
$('#task').addEventListener('click', task);
```

위에 사용된 `$`는 jQuery 가 아니고 `querySelectorAll`, `querySelector`를 하나로 합쳐 만든 함수로
<a href="/assets/js/utils/render.js" target="_blank">render.js</a> 에서 확인할 수 있다.

<div class="controller controller-4-1">
  <button type="button" id="start">실행</button>
  <button type="button" id="stop">중단</button>
  <button type="button" id="task">무거운 작업</button>
</div>

<div class="container">
  <div class="progress progress-4-1"></div>
</div>

<script type="module">
import { $ } from '/assets/js/utils/render.js';
import { delay } from '/assets/js/utils/fp.js';

const HERTZ = 60;
const TWO_SECONDS = 2;
const FRAME_INTERVAL = 1000 / HERTZ; // 16.6ms

const progress = $('.progress-4-1');

let runner;

const start = () => {
  const changeQuantity = 100;
  const totalFrames = HERTZ * TWO_SECONDS;
  const oneFrameChangeQuantity = changeQuantity / totalFrames;
  let frame = 0;

  runner = setInterval(() => {
    progress.style.width = `${oneFrameChangeQuantity * ++frame}%`;
    if (frame === totalFrames) stop();
  }, FRAME_INTERVAL);
};
const stop = () => {
  clearInterval(runner);
  attachStartEvent();
};
const task = async (event) => {
  event.target.style.backgroundColor = '#a9a9a9';
  let sum = 0;
  await delay(10);
  while (true) {
    sum += 1;
    if (sum > 3_000_000_000) break;
  }
  event.target.style.backgroundColor = '#ffe4c4';
};

const attachStartEvent = () => {
  $('.controller-4-1 #start').addEventListener('click', start, { once: true });
};
attachStartEvent();
$('.controller-4-1 #stop').addEventListener('click', stop);
$('.controller-4-1 #task').addEventListener('click', task);
</script>

'실행'을 눌러보면 막대기가 한 번씩 프레임이 어긋나 부드럽지 않게 올라가는 것을 볼 수 있다. 또한 막대기가 증가하는 도중 
'무거운 작업'을 누르면 일시정지 되었다 무거운 작업이 종료되고 스택이 비게 되면 다시 나머지 애니메이션이 진행된다.

#### 2. animation

```css
.progress {
  height: 100%;
  width: 0;
  background-color: #31e51f;

  animation-name: makeFull;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

@keyframes makeFull {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
```

<div class="controller controller-4-2">
  <button type="button" id="start">실행</button>
  <button type="button" id="stop">중단</button>
  <button type="button" id="task">무거운 작업</button>
</div>

<div style="display: flex; gap: 10px; flex-wrap: wrap; margin: 10px 0 20px;">
  <fieldset class="timing-function" style="width: 155px">
    <legend style="color: #fff; background-color: #555; font-weight: 700; padding: 3px 20px;">
      timing-function
    </legend>
    <div>
      <input type="radio" name="timing-function" id="ease" value="ease" checked />
      <label for="ease">ease</label>
    </div>
    <div>
      <input type="radio" name="timing-function" id="linear" value="linear" />
      <label for="linear">linear</label>
    </div>
  </fieldset>
  <fieldset class="direction" style="width: 245px">
    <legend style="color: #fff; background-color: #555; font-weight: 700; padding: 3px 20px;">
      direction
    </legend>
    <div>
      <input type="radio" name="direction" id="normal" value="normal" checked />
      <label for="normal">normal</label>
    </div>
    <div>
      <input type="radio" name="direction" id="reverse" value="reverse" />
      <label for="reverse">reverse</label>
    </div>
    <div>
      <input type="radio" name="direction" id="alternate" value="alternate" />
      <label for="alternate">alternate</label>
    </div>
  </fieldset>
</div>

<div class="container">
  <div class="progress progress-4-2"></div>
</div>

<style>
.progress-4-2 {
  height: 100%;
  width: 0;
  background-color: #31e51f;

  animation-name: makeFull;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

@keyframes makeFull {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>

<script type="module">
import { $ } from '/assets/js/utils/render.js';
import { delay } from '/assets/js/utils/fp.js';

const progress = $('.progress-4-2');

const start = () => {
  progress.style.animationPlayState = 'running';
};
const stop = () => {
  progress.style.animationPlayState = 'paused';
  attachStartEvent();
};
const task = async (event) => {
  event.target.style.backgroundColor = '#a9a9a9';
  let sum = 0;
  await delay(10);
  while (true) {
    sum += 1;
    if (sum > 3_000_000_000) break;
  }
  event.target.style.backgroundColor = '#ffe4c4';
};

const attachStartEvent = () => {
  $('.controller-4-2 #start').addEventListener('click', start, { once: true });
};
attachStartEvent();
$('.controller-4-2 #stop').addEventListener('click', stop);
$('.controller-4-2 #task').addEventListener('click', task);
$('.timing-function').addEventListener('input', (event) => {
  progress.style.animationTimingFunction = event.target.value;
});
$('.direction').addEventListener('input', (event) => {
  progress.style.animationDirection = event.target.value;
});
</script>

우선 가장 눈에 띄는 것은 프레임 손실 없이 매우 부드러운 애니메이션이 적용된다는 것이다. '중단'을 눌렀다 '실행'을 눌러보면 애니메이션이 
<span style="color: red;">일시정지</span> 되었다 <span style="color: red;">재개</span>되는 것을 볼 수 있다.

그리고 '무거운 작업'을 누르면 애니메이션이 정지된다. 브라우저의 리렌더링(Reflow, Repaint)이 메인스레드에서 정지되기 때문이다. 
하지만 위 setInterval 과는 중요한 차이점이 있는데, <span style="color: red;">브라우저의 리렌더링만 정지될 뿐 CSS 
애니메이션은 중단되지 않는다</span>는 것이다.  
그렇기 때문에 무거운 작업이 종료되고 리렌더링이 될 때 CSS 애니메이션은 독립적으로 처리하던 프레임에서 리렌더링이 시작된다.

즉, <span style="color: red;">시각적으로 리렌더링은 되지 않지만 애니메이션 프레임 자체는 JavaScript 에 전혀 
영향을 받지 않는다</span>.

#### 3. requestAnimationFrame

여기서 사용된 Animation 은 `requestAnimationFrame` 을 사용하기 쉽도록 Class 를 만든 것으로 코드는 
<a href="/assets/js/utils/Animation.js" target="_blank">Animation.js</a> 에서 확인할 수 있다.

```javascript
import { $ } from '/assets/js/utils/render.js';
import { delay } from '/assets/js/utils/fp.js';
import Animation from '/assets/js/utils/Animation.js';

const TWO_SECONDS = 2;

const animation = new Animation($('.progress'));

const start = async () => {
  await animation.from({ width: '0%' }).to({ width: '100%' }).run(TWO_SECONDS);
  attachStartEvent();
};
const stop = () => {
  animation.stop();
  attachStartEvent();
};
const task = async (event) => {
  event.target.style.backgroundColor = '#a9a9a9';
  let sum = 0;
  await delay(10);
  while (true) {
    sum += 1;
    if (sum > 3_000_000_000) break;
  }
  event.target.style.backgroundColor = '#ffe4c4';
};

const attachStartEvent = () => {
  $('#start').addEventListener('click', start, { once: true });
};
attachStartEvent();
$('#stop').addEventListener('click', stop);
$('#task').addEventListener('click', task);
```

<div class="controller controller-4-3">
  <button type="button" id="start">실행</button>
  <button type="button" id="stop">중단</button>
  <button type="button" id="task">무거운 작업</button>
</div>

<div class="container">
  <div class="progress progress-4-3"></div>
</div>

<script type="module">
import { $ } from '/assets/js/utils/render.js';
import { delay } from '/assets/js/utils/fp.js';
import Animation from '/assets/js/utils/Animation.js';

const TWO_SECONDS = 2;

const animation = new Animation($('.progress-4-3'));

const start = async () => {
  await animation.from({ width: '0%' }).to({ width: '100%' }).run(TWO_SECONDS);
  attachStartEvent();
};
const stop = () => {
  animation.stop();
  attachStartEvent();
};
const task = async (event) => {
  event.target.style.backgroundColor = '#a9a9a9';
  let sum = 0;
  await delay(10);
  while (true) {
    sum += 1;
    if (sum > 3_000_000_000) break;
  }
  event.target.style.backgroundColor = '#ffe4c4';
};

const attachStartEvent = () => {
  $('.controller-4-3 #start').addEventListener('click', start, { once: true });
};
attachStartEvent();
$('.controller-4-3 #stop').addEventListener('click', stop);
$('.controller-4-3 #task').addEventListener('click', task);
</script>

`animation`과 마찬가로 프레임 손실 없이 매우 부드러운 애니메이션이 적용되는 것을 확인할 수 있다.

그리고 '무거운 작업'을 눌러보면 [animation](#h-2-animation) 과 마찬가지로 <span style="color: red;">브라우저의 
리렌더링만 정지될 뿐 CSS 애니메이션은 중단되지 않는다</span>는 것을 알 수 있다. 애니메이션이 진행되는 도중 다른 무거운 작업이 
메인스레드를 차지해 리렌더링 자체가 멈추는 것은 막을 수 없지만 애니메이션 자체는 정확한 애니메이션 실행을 보장받을 수 있음을 
의미한다.

단, 주의해야 할 것은 앞에서도 말했듯이 `requestAnimationFrame`의 콜백 함수가 16.6ms 를 초과해 돌아가면 안 된다. 
애니메이션 실행은 보장할 수 있지만 디스플레이 주사율에 리렌더링을 할 수 없어 일부 프레임이 손실되며 그려지기 때문이다.

---

### 5. Examples - Animation Composition 👩‍💻

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: #31e51f;
  margin-bottom: 20px;
}

.board {
  width: 400px;
  height: 400px;
  border: 4px solid red;
  position: relative;

  .box {
    position: absolute;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

</style>

#### 1. setInterval

이번에는 애니메이션을 연결해보자.

```javascript
import { $ } from './render.js';
import { delay } from '/assets/js/utils/fp.js';

const HERTZ = 60;
const TWO_SECONDS = 2;
const FRAME_INTERVAL = 1000 / HERTZ; // 16.6ms

const box = $('.board .box');

const start = async () => {
  const changeQuantity = 300;
  const totalFrames = HERTZ * TWO_SECONDS;
  const oneFrameChangeQuantity = changeQuantity / totalFrames;
  let frame;

  const toRight = () => {
    frame = 0;
    runner = setInterval(() => {
      box.style.left = `${oneFrameChangeQuantity * ++frame}px`;
      if (frame === totalFrames) clearInterval(runner);
    }, FRAME_INTERVAL);
  };
  const toBottom = () => {
    frame = 0;
    runner = setInterval(() => {
      box.style.top = `${oneFrameChangeQuantity * ++frame}px`;
      if (frame === totalFrames) clearInterval(runner);
    }, FRAME_INTERVAL);
  };
  const toLeft = () => {
    frame = 0;
    runner = setInterval(() => {
      box.style.left = `${oneFrameChangeQuantity * (totalFrames - ++frame)}px`;
      if (frame === totalFrames) clearInterval(runner);
    }, FRAME_INTERVAL);
  };
  const toTop = () => {
    frame = 0;
    runner = setInterval(() => {
      box.style.top = `${oneFrameChangeQuantity * (totalFrames - ++frame)}px`;
      if (frame === totalFrames) clearInterval(runner);
    }, FRAME_INTERVAL);
  };

  toRight();
  await delay(TWO_SECONDS * 1000);
  toBottom();
  await delay(TWO_SECONDS * 1000);
  toLeft();
  await delay(TWO_SECONDS * 1000);
  toTop();
  await delay(TWO_SECONDS * 1000);
  toBottom();
  await delay(TWO_SECONDS * 1000);
  toRight();
  await delay(TWO_SECONDS * 1000);
  toTop();
  await delay(TWO_SECONDS * 1000);
  toLeft();
  await delay(TWO_SECONDS * 1000);
  start();
};
start();
```

불가능한건 아니지만 프레임도 저하될 뿐 아니라 코드 작성 및 제어가 힘들다. 심지어 이런식으로 코드를 작성할 경우 탭이 포그라운드를 유지하지 
않으면 심각한 에러가 발생하기도 한다.

#### 2. animation

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #31e51f;
  position: absolute;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  animation-name: rotation;
  animation-duration: 8s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
}

@keyframes rotation {
  0% {
    top: 0;
    left: 0;
    background-color: #31e51f;
  }
  25% {
    top: 0;
    left: 300px;
    background-color: #e5401f;
  }

  50% {
    top: 300px;
    left: 300px;
    background-color: #3662dc;
  }

  75% {
    top: 300px;
    left: 0;
    background-color: #e5d81f;
  }
  100% {
    top: 0;
    left: 0;
    background-color: #31e51f;
  }
}
```

<div class="board board-5-2">
  <div class="box"></div>
</div>

<style>
.board-5-2 .box {
  width: 100px;
  height: 100px;
  background-color: #31e51f;
  position: absolute;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  animation-name: rotation;
  animation-duration: 8s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
}

@keyframes rotation {
  0% {
    top: 0;
    left: 0;
    background-color: #31e51f;
  }
  25% {
    top: 0;
    left: 300px;
    background-color: #e5401f;
  }

  50% {
    top: 300px;
    left: 300px;
    background-color: #3662dc;
  }

  75% {
    top: 300px;
    left: 0;
    background-color: #e5d81f;
  }
  100% {
    top: 0;
    left: 0;
    background-color: #31e51f;
  }
}
</style>

#### 3. requestAnimationFrame

```javascript
import { $ } from '/assets/js/utils/render.js';
import { pipe } from '/assets/js/utils/fp.js';
import ColorAddon from '/assets/js/utils/ColorAddon.js';
import Animation from '/assets/js/utils/Animation.js';

const animation = new Animation($('.board .box'), { ColorAddon });

const topLeft = {
  top: '0px',
  left: '0px',
  backgroundColor: '#31e51f',
};
const topRight = {
  top: '0px',
  left: '300px',
  backgroundColor: '#e5401f',
};
const bottomRight = {
  top: '300px',
  left: '300px',
  backgroundColor: '#3662dc',
};
const bottomLeft = {
  top: '300px',
  left: '0px',
  backgroundColor: '#e5d81f',
};

const toRight = (self) => self.to(topRight).run(2);
const toBottom = (self) => self.to(bottomRight).run(2);
const toLeft = (self) => self.to(bottomLeft).run(2);
const toTop = (self) => self.to(topLeft).run(2);
const toBottomReversed = (self) => self.to(bottomLeft).run(2);
const toRightReversed = (self) => self.to(bottomRight).run(2);
const toTopReversed = (self) => self.to(topRight).run(2);
const toLeftReversed = (self) => self.to(topLeft).run(2);

const rotation = pipe(
  toRight,
  toBottom,
  toLeft,
  toTop,
  toBottomReversed,
  toRightReversed,
  toTopReversed,
  toLeftReversed
);

const run = async () => {
  await rotation(animation);
  run();
};
run();
```

<div class="board board-5-3">
  <div class="box"></div>
</div>

<script type="module">
import { $ } from '/assets/js/utils/render.js';
import { pipe } from '/assets/js/utils/fp.js';
import ColorAddon from '/assets/js/utils/ColorAddon.js';
import Animation from '/assets/js/utils/Animation.js';

const animation = new Animation($('.board-5-3 .box'), { ColorAddon });

const topLeft = {
  top: '0px',
  left: '0px',
  backgroundColor: '#31e51f',
};
const topRight = {
  top: '0px',
  left: '300px',
  backgroundColor: '#e5401f',
};
const bottomRight = {
  top: '300px',
  left: '300px',
  backgroundColor: '#3662dc',
};
const bottomLeft = {
  top: '300px',
  left: '0px',
  backgroundColor: '#e5d81f',
};

const toRight = (self) => self.to(topRight).run(2);
const toBottom = (self) => self.to(bottomRight).run(2);
const toLeft = (self) => self.to(bottomLeft).run(2);
const toTop = (self) => self.to(topLeft).run(2);
const toBottomReversed = (self) => self.to(bottomLeft).run(2);
const toRightReversed = (self) => self.to(bottomRight).run(2);
const toTopReversed = (self) => self.to(topRight).run(2);
const toLeftReversed = (self) => self.to(topLeft).run(2);

const rotation = pipe(
  toRight,
  toBottom,
  toLeft,
  toTop,
  toBottomReversed,
  toRightReversed,
  toTopReversed,
  toLeftReversed
);

const run = async () => {
  await rotation(animation);
  await run();
};
run();
</script>


<br><br>

---
Reference

1. "Window: requestAnimationFrame() method." MDN Web Docs. Jan. 19, 2024, accessed Apr. 24, 2024, [MDN - rAF].

[MDN - rAF]:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
