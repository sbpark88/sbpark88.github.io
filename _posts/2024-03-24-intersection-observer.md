---
layout: post
title: Intersection Observer
subtitle: Deep dive into intersection observer
excerpt_image: NO_EXCERPT_IMAGE
categories: [css]
tags: [observer, intersection, threshold, rootMargin]
---

### 1. Intersection Observer 👩‍💻

자주 사용하지만 `entry.intersectionRatio`을 사용할지, `threshold`를 사용할지 항상 고민이 많이 되는 것 같아 정리해보고자 한다.

우선 [Intersection Observer][MDN - IntersectionObserver] 는 웹 브라우저가 제공하는 `Intersection Observer API`에 
의해 웹 상에서 작동하는 API 로, DOM 이 브라우저의 Viewport 에 보이는지 가시성을 관찰해, 사용자가 정의한 함수를 실행시켜준다.

API 사용 방식은 JavaScript Classes 기반으로, 다음과 같이 인스턴스를 생성하고,

```javascript
new IntersectionObserver(callback)
new IntersectionObserver(callback, options)
```

인스턴스 메서드를 사용해 관찰할 DOM 타겟을 arguments 로 넘겨 Observer Events 를 등록시킨다.

```javascript
const io = new IntersectionObserver(callback, options)
const yellowBoxEl = document.querySelector(".box--yellow")
io.observe(yellowBoxEl)
```

전달 받는 `callback` parameters 는 Observer Patterns 에 등록할 함수로, 하나의 옵저버 인스턴스가 여러 대상을 
Observing 할 수 있기 때문에 해당 인스턴스가 `observe`메서드를 사용해 등록한 모든 DOM 타겟을 Array Parameters 로 
받는 함수를 사용해야한다. 함수의 예를 들면 다음과 같다.

```javascript
const callbackFn = (entries) => {
  entries.forEach((entry) => {
    entry.intersectionRatio > 0 
        ? entry.target.classList.add("show") 
        : entry.target.classList.remove("show");
  });
}
```

물론, 대부분의 예제는 인스턴스 생성과 메서드 attachment 만 구분해 설명하고 있어 다음과 같은 형태가 익숙할 것이다.

```javascript
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.intersectionRatio > 0
        ? entry.target.classList.add("show")
        : entry.target.classList.remove("show");
  });
})

const boxEls = document.querySelectorAll(".box")
boxEls.forEach((el) => io.observe(el))
```

---

### 2. Instance Properties and Methods 👩‍💻

#### 1. Instance Properties

IntersectionObserver 의 인스턴스 properties 는 `root`, `rootMargin`, `thresholds` 3개가 있다.

<br>

__1 ) root__

`root`는 잘 사용되지 않으니 무시하자.

<br>

__2 ) rootMargin__

CSS 의 `margin`의 개념과 동일하다. CSS 에서 **content-box** 의 크기는 `padding`에 의존하고, `margin`은 
다른 엘리먼트와의 거리를 조정하기 위해 사용하지만, Intersection Observer 는 
<span style="color: red;">**rootMargin** 을 관잘 대상의 영역으로 사용</span>한다.

위에서 사용한 `entry.intersectionRatio > 0`는 관찰자가 보이기 시작하는 즉시 `true`가 된다. 만약 20% 이상 보일 때 
`true`가 되게 하려면 `entry.intersectionRatio >= 20`을 줄 수 있다.

위 방법 대신 `rootMargin`을 사용하면 좀 더 직관적으로 관찰 영역을 확대하거나 축소할 수 있다.

- rootMargin 기본값: `0px 0px 0px 0px`를 기본값으로 갖는다.
- rootMargin 양수값: 타겟을 margin 영역 만큼 확장해 감시한다.
    - viewport 에 들어올 때: 늘어난 margin 영역으로 인해 실제 viewport 에 보이기 전 **intersection** 이 `true`가 된다. 
    - viewport 에서 나갈 때: 늘어난 margin 영역으로 인해 실제 viewport 에서 안보이고 나서도 영역을 완전히 벗어나야
      **intersection** 이 `false`가 된다.
- rootMargin 음수값: 타겟을 margin 영역 만큼 축소해 감시한다. `%`는 물론, `px` 단위를 사용할 수도 있기 때문에
                   `entry.intersectionRatio`보다 더 세밀한 관찰이 가능하다.
    - viewport 에 들어올 때: 줄어든 margin 영역으로 인해 실제 viewport 에 줄어든 margin 보다 더 많이 보여야 
      **intersection** 이 `true`가 된다.
    - viewport 에서 나갈 때: 줄어든 margin 영역으로 인해 실제 viewport 에 아직 보이더라도 줄어든 margin 보다 적게 보이면 
      **intersection** 이 `false`가 된다.

<br>

__3 ) thresholds__

위 `rootMargin`처럼 관찰 영역을 확장하는 것은 할 수 없다. 다만, `entry.intersectionRatio > 0`,
`entry.intersectionRatio > 20`, `entry.intersectionRatio > 40` 이런식으로 사용하는 대신 
`threshold`를 사용하면 callback 함수를 `entry.isIntersecting`만으로 작성할 수 있어 재사용성읖 높여준다.

```javascript
const callbackFn = (entries) => {
  entries.forEach((entry) => {
    entry.isIntersecting 
        ? entry.target.classList.add("show") 
        : entry.target.classList.remove("show");
  });
}
```

```javascript
new IntersectionObserver(callback)                      // 0
new IntersectionObserver(callback, { threshold: 0.2 })  // 20%
new IntersectionObserver(callback, { threshold: 0.4 })  // 40%
```

> 따라서 관찰 영역을 확장하는 것은 `rootMargin`를 사용하고, 관찰 영역이 일정 비율 이상 보일 때는 `threshold`를 
> 사용하는 것이 좋다.
> 
> 참고로 일정 비율이 관찰될 때 작동하는 트리거는 다음 세 가지 방법 중 어떤 것을 사용해도 동일하다.
> - `entry.intersectionRatio > 20`
> - `entry.isIntersecting` && `rootMargin: "20%"`
> - `entry.isIntersecting` && `{ threshold: 0.2 }`

#### 2. Instance Methods

- `observe(target:)`: 해당 인스턴스에 하나의 감시할 대상 배열에 추가한다.
- `unobserve(target:)`: 해당 인스턴스가 감시중인 대상 중 하나를 배열에서 제거한다.
- `disconnect()`: 해당 인스턴스가 감시중인 모든 관찰 대상을 제거한다.

---

### 3. Observing Directions 👩‍💻

#### 1. Formula

`Infinite Scroll`처럼 관찰을 한 번만 해도 되는 경우는 

```javascript
const callbackFn = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      // fetch in here
      io.unobserve(entry)
    }
  });
}
```

와 같이 관찰에 성공하면 함수를 실행시키며 해당 관찰 대상을 제거해주면 된다. 기능과 성능 면에서 제거해주는 것이 가장 좋다.

하지만 애니메이션 스타일 적용을 위해 사용할 경우, 양방향이 아닌 위에서 아래, 또는 아래서 위로 가는 방향에서 관찰될 때만 
작동하도록 해야 하는 경우가 있다. 하지만 `entry.intersectionRatio`, `rootMargin`, `threshold`는 방향에 관계 없이 
관찰하기 때문에 사용할 수가 없다.

아래로 내려가는 방향에서만 작동하도록 해야하는 Observer 가 있다고 해보자. `rootMargin`을 사용해 `0px 0px 9999px 0`과 같이 
주면 원하는대로 작동하긴 할 것이다. 하지만 초고해상도 모니터도 많아졌고, 모니터를 세로로 놓고 보거나 확대/축소를 하기도 하는데 이런 
모든 상황을 고려하면 완벽한 방법이라 할 수는 없다.

하지만 `entry.boundingClientRect.top`를 관찰하도록 하면, 단지 보이기 시작하거나 사라질 때가 아닌, 상단이 보이기 시작하거나 
사라질 때, 하단이 보이기 시작하거나 사라질 때를 구분할 수 있게 된다.

<br>

|                 | `entry.boundingClientRect.top` | `entry.isIntersecting` |
|-----------------|:------------------------------:|:----------------------:|
| 내려가며 보이기 시작할 때  |               양수               |          true          |
| 내라가며 사라지기 시작할 때 |               음수               |         false          |
| 올라가며 보이기 시작할 때  |               음수               |          true          |
| 올라가며 사라지기 시작할 때 |               양수               |         false          |

> 참고로 위 공식은 `rootMargin` 값을 주더라도 변하지 않는다. 따라서 양방향, 내려갈 때, 올라갈 때 모두에 대한 
> 이벤트 조건으로 사용할 수 있다.

<br>

위 공식을 사용해 아래로 내려갈 때만 `show`를 추가하고, 내려가며 사라질 때는 그대로 유지, 위로 올라가며 사라질 때 
`show`를 제거하는 옵저버 는 다음과 같이 정의할 수 있다.

```javascript
const observerDownward = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const topIsIntersecting = entry.boundingClientRect.top >= 0;
      if (topIsIntersecting) {
        entry.isIntersecting
          ? entry.target.classList.add("show")
          : entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);
```

`observerDownward`는 3가지 조건 ① 상단이 보이고, ② 타겟이 관찰되는데 ③ 20% 이상일 때를 모두 만족할 때 `show`를 추가한다. 
따라서 내려가며 20% 이상 보이기 시작할 때는 `show`를 추가하지만, 내려가며 사라질 때는 
<span style="color: red;">① 상단이 보이고</span>가 `false`이기 때문에 아무 것도 하지 않는다.

그리고 위로 올라가며 완전히 사라질 때는 `show`를 제거해야하는데, 올라가며 사라질 때 20% 이하로 보이게 되면,
**① 상단이 보이고**는 `true`인데, <span style="color: red;">② 타겟이 관찰되는데 ③ 20% 이상일 때를</span>가 
`false`가 되기 때문에 `show`를 제거한다.

#### 2. Examples

위에서 설명한 개념을 VanillaJS 로 유틸로 만들면 다음과 같다.

- performance.js

```javascript
// @ts-check

/**
 * Apply throttling to a function.
 * @param fn {Function} - A function to apply throttling.
 * @param delay {number} - milliseconds (default 500)
 * @returns {Function} - A function is applied throttling.
 */
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

/**
 * Apply debouncing to a function.
 * @param fn {Function} - A function to apply debouncing.
 * @param delay {number} - milliseconds (default 500)
 * @returns {Function} - A function is applied debouncing.
 */
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

- observer.js

```javascript
// @ts-check

/* Intersection Observer */
import { debounce } from "./performance";

const createIObserver = (callback, options = { threshold: 0.2 }) =>
  new IntersectionObserver(callback, options);

const twoWayCallback = (entries) =>
  entries.forEach((entry) =>
    entry.isIntersecting
      ? entry.target.classList.add("show")
      : entry.target.classList.remove("show"),
  );

const downwardCallback = (entries) =>
  entries.forEach((entry) => {
    const topIsIntersecting = entry.boundingClientRect.top >= 0;
    if (topIsIntersecting) {
      entry.isIntersecting
        ? entry.target.classList.add("show")
        : entry.target.classList.remove("show");
    }
  });

const upwardCallback = (entries) =>
  entries.forEach((entry) => {
    const topIsHiding = entry.boundingClientRect.top < 0;
    if (topIsHiding) {
      entry.isIntersecting
        ? entry.target.classList.add("show")
        : entry.target.classList.remove("show");
    }
  });

const observer = createIObserver(twoWayCallback);
const observerDownward = createIObserver(downwardCallback);
const observerUpward = createIObserver(upwardCallback);

/* Mutation Observer */
const createMObserver = (callback) => new MutationObserver(callback);

const observerMutations = (callback) => {
  const debouncedCallback = debounce(callback);

  return createMObserver((mutations) => {
    mutations.forEach((mutation) => {
      debouncedCallback(mutation);
    });
  });
};

const mutationConfig = {
  attributes: false,
  childList: true,
  subtree: true,
};

export {
  observer,
  observerDownward,
  observerUpward,
  observerMutations,
  mutationConfig,
};
```

위 `performance.js`와 `observer.js` 외에도 `eventBinding.js`, `fp.js`, `render.js`, 
`styleHelper.js`와 같은 좀 더 많은 유틸은 [이곳][My VanillaJS Utils on Project]에서 확인할 수 있다.


<br><br>

---
Reference



1. "IntersectionObserver." MDN Web Docs. Feb. 28, 2023, accessed Mar. 24, 2024, [MDN - IntersectionObserver].

[MDN - IntersectionObserver]:https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
[My VanillaJS Utils on Project]:https://github.com/sbpark88/apple-ipad-responsive/tree/main/src/js/utils
