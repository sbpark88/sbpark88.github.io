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







<br><br>

---
Reference

1. "Window: requestAnimationFrame() method." MDN Web Docs. Jan. 19, 2024, accessed Apr. 24, 2024, [MDN - rAF].

포스팅 목록 메인 이미지 출처 <a href="https://kr.freepik.com/free-vector/hand-drawn-animation-frames-element-collection_33591464.htm#query=animation%20frames&position=0&from_view=keyword&track=ais&uuid=3bfc2ea5-e05a-4656-8ea9-9a469c1424ad">Freepik</a>

[MDN - rAF]:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
