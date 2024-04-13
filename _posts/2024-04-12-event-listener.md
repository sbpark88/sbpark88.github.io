---
layout: post
title: Event Listener
subtitle: Short book about the event listener
excerpt_image: NO_EXCERPT_IMAGE
categories: [javascript]
tags: [event listener, focus, focusin, focusout, blur, cjk, isComposing, dispatchEvent, CustomEvent, AbortController]
---

### 1. Mouse Event 👩‍💻

<style>
.parent-1 {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 10px solid;
  background-color: red;
  overflow: auto;
}
.child-1 {
  width: 200px;
  height: 180px;
  border: 10px solid;
  background-color: orange;
}
.child-1.active {
  background-color: yellowgreen;
}
.screen-log {
  flex-grow: 1;
  background-color: white;
  color: black;
  font: 30px/1.6 sans-serif;
  padding-left: 30px;
  align-content: center;
}
</style>

#### 1. Click

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 10px solid;
  background-color: red;
  overflow: auto;
}
.child {
  width: 200px;
  height: 100px;
  border: 10px solid;
  background-color: orange;
}
```

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('click', (event) => {
  console.log(`Alt(Option): ${event.altKey}`);
  console.log(`Ctrl(Control): ${event.ctrlKey}`);
});
```

`Alt(Option)`키 또는 `Ctrl(Control)`키를 함께 눌렀는지 알 수 있다.

<div style="display: flex;">
  <div class="parent-1 parent-1-1">
    <div class="child-1 child-1-1"></div>
  </div>
  <div class="screen-log screen-1-1">
  </div>
</div>

<script>
const childEl_1_1 = document.querySelector('.child-1-1');
const screenEl_1_1 = document.querySelector('.screen-1-1');

childEl_1_1.addEventListener('click', (event) => {
  screenEl_1_1.innerText = `Click!\n
                            Alt(Option): ${event.altKey}\n
                            Ctrl(Control): ${event.ctrlKey}`;
});
</script>

#### 2. Double Click

```css
.child.active {
  background-color: yellowgreen;
}
```

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('dblclick', () => {
  childEl.classList.toggle('active');
});
```

<div class="parent-1 parent-1-2">
  <div class="child-1 child-1-2"></div>
</div>

<script>
const childEl_1_2 = document.querySelector('.child-1-2');

childEl_1_2.addEventListener('dblclick', () => {
  childEl_1_2.classList.toggle('active');
});
</script>

#### 3. Mouse Down & Mouse Up

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('mousedown', () => {
  childEl.classList.add('active');
});

childEl.addEventListener('mouseup', () => {
  childEl.classList.remove('active');
});
```

`mousedown` 이벤트와 `mouseup` 이벤트를 나눠 등록하면 마우스를 클릭중일 때와 클릭에서 손을 뗄 때를 나눠 처리할 수 있다.

<div class="parent-1 parent-1-3">
  <div class="child-1 child-1-3"></div>
</div>

<script>
const childEl_1_3 = document.querySelector('.child-1-3');

childEl_1_3.addEventListener('mousedown', () => {
  childEl_1_3.classList.add('active');
});

childEl_1_3.addEventListener('mouseup', () => {
  childEl_1_3.classList.remove('active');
});
</script>

#### 4. Mouse Enter & Mouse Leave

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('mouseenter', () => {
  childEl.classList.add('active');
});

childEl.addEventListener('mouseleave', () => {
  childEl.classList.remove('active');
});
```

마찬가지로, `mouseenter` 이벤트와 `mouseleave` 이벤트를 나눠 등록하면 마우스가 들어가 있을 때와 나올 때를 나눠 
처리할 수 있다.

<div style="display: flex;">
  <div class="parent-1 parent-1-4">
    <div class="child-1 child-1-4"></div>
  </div>
  <div class="screen-log screen-1-4">
  </div>
</div>

<script>
const childEl_1_4 = document.querySelector('.child-1-4');
const screenEl_1_4 = document.querySelector('.screen-1-4');

childEl_1_4.addEventListener('mouseenter', () => {
  childEl_1_4.classList.add('active');
  screenEl_1_4.textContent = 'The mouse is entered.';
});

childEl_1_4.addEventListener('mouseleave', () => {
  childEl_1_4.classList.remove('active');
  screenEl_1_4.textContent = 'The mouse is leaved.';
});
</script>
<br>

<span style="color: red;">단순히 마우스가 들어가 있을 때와 나올 때 CSS 만 처리하는 것이라면</span>, 그냥 CSS 
`hover` 선택자를 사용하면 된다.  
하지만 JavaScript 에서 들어가고 나올때 무언가 구분해서 처리할 비즈니스 로직이 존재한다면, 위와 같이 `mouseenter` 
이벤트와 `mouseleave` 이벤트를 나눠 처리해야한다. 

#### 5. Mose Move

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('mousemove', (event) => {
  console.log(event.offsetX, event.offsetY);
});
```

<div style="display: flex;">
  <div class="parent-1 parent-1-5">
    <div class="child-1 child-1-5"></div>
  </div>
  <div class="screen-log screen-1-5">
  </div>
</div>

<script>
const childEl_1_5 = document.querySelector('.child-1-5');
const screenEl_1_5 = document.querySelector('.screen-1-5');

childEl_1_5.addEventListener('mousemove', (event) => {
  screenEl_1_5.textContent = `${event.offsetX}, ${event.offsetY}`
});
</script>

#### 6. Context Menu

```javascript
const childEl = document.querySelector('.child');

childEl.addEventListener('contextmenu', (event) => {
  console.log(event);
});
```

마우스 우클릭을 감시한다.

<div style="display: flex;">
  <div class="parent-1 parent-1-6">
    <div class="child-1 child-1-6"></div>
  </div>
  <div class="screen-log screen-1-6">
  </div>
</div>

<script>
const childEl_1_6 = document.querySelector('.child-1-6');
const screenEl_1_6 = document.querySelector('.screen-1-6');
let childEl_1_6_count = 0;

childEl_1_6.addEventListener('contextmenu', (event) => {
  screenEl_1_6.textContent = `우클릭! ${++childEl_1_6_count}회`
});
</script>

#### 7. Wheel

```html
<div class="parent">
  <div class="child" style="height:1000px;"></div>
</div>
```

```javascript
const parentEl = document.querySelector('.parent');
const childEl = document.querySelector('.child');

childEl.addEventListener('wheel', (event) => {
  event.deltaY > 0
    ? console.log(`⬇ 위치: ${parentEl.scrollTop}`)
    : console.log(`⬆ 위치: ${parentEl.scrollTop}`);
});
```

`deltaY`를 사용해 휠의 방향을 알 수 있고, `parentEl.scrollTop`을 사용해 `부모의 컨테이너 안에서 자신의 Y축의 Top 위치`를 
알 수 있다.

<div style="display: flex;">
  <div class="parent-1 parent-1-7">
    <div class="child-1 child-1-7" style="height:1000px;"></div>
  </div>
  <div class="screen-log screen-1-7">
  </div>
</div>

<script>
const parentEl_1_7 = document.querySelector('.parent-1-7');
const childEl_1_7 = document.querySelector('.child-1-7');
const screenEl_1_7 = document.querySelector('.screen-1-7');

childEl_1_7.addEventListener('wheel', (event) => {
  screenEl_1_7.textContent = event.deltaY > 0
    ? `⬇  위치: ${parentEl_1_7.scrollTop}`
    : `⬆  위치: ${parentEl_1_7.scrollTop}`;
});
</script>

---

### 2. Keyboard Event 👩‍💻

<style>
.input-keyboard-label {
  position: absolute;
  padding-left: 20px;
  color: black;
  font: 17px/1 sans-serif;
}
.input-keyboard {
  width: 130px;
  height: 100%;
  outline: none;
  border: none;
  background-color: lightgray;
  border-radius: 10px 0 0 10px;
  padding: 0 13px 0 113px;
  font: 17px/1 sans-serif;
}
</style>

#### 1. Key Down

```html
<input type="text" />
```

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', (event) => {
  console.log(event.key);
});
```

<div style="display:flex;align-items:center;height:60px;">
  <labe class="input-keyboard-label">입력하세요:</labe>
  <input type="text" class="input-keyboard input-2-1" />
  <div class="screen-log screen-2-1" style="height:100%;">
  </div>
</div>

<script>
const inputEl_2_1 = document.querySelector('.input-2-1');
const screenEl_2_1 = document.querySelector('.screen-2-1');
const screenEl_2_1_colors = ['red', 'orange', 'green', 'brown', 'blue', 'purple'];
const screenEl_2_1_colorCount = screenEl_2_1_colors.length;
let screenEl_2_1_index = 0;

inputEl_2_1.addEventListener('keydown', (event) => {
  screenEl_2_1.textContent = event.key;
  screenEl_2_1.style.color = screenEl_2_1_colors[screenEl_2_1_index++ % screenEl_2_1_colorCount];
});
</script>

<br>

출력되는 특수키의 결과는 다음과 같다.

- Command: `Meta`
- Option: `Alt`
- Control: `Control`
- Shift: `Shift`
- Backspace: `Backspace`
- Delete: `Delete`
- Return: `Enter`
- Tab: `Tab`
- ESC: `Escape`
- ⬆: `ArrowUp`
- ⬇: `ArrowDown`
- ⬅: `ArrowLeft`
- ➡: `ArrowRight`
- Space: ` `


#### 2. Key Up

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keyup', (event) => {
  console.log(event.key);
});
```

`keyup`은 `keydown`과 달리 키보드를 누르고 있어도 반복 입력을 인식하지 않는다. 키에서 손을 뗄 때 반응하기 때문이다.

<div style="display:flex;align-items:center;height:60px;">
  <labe class="input-keyboard-label">입력하세요:</labe>
  <input type="text" class="input-keyboard input-2-2" />
  <div class="screen-log screen-2-2" style="height:100%;">
  </div>
</div>

<script>
const inputEl_2_2 = document.querySelector('.input-2-2');
const screenEl_2_2 = document.querySelector('.screen-2-2');
const screenEl_2_2_colors = ['red', 'orange', 'green', 'brown', 'blue', 'purple'];
const screenEl_2_2_colorCount = screenEl_2_2_colors.length;
let screenEl_2_2_index = 0;

inputEl_2_2.addEventListener('keyup', (event) => {
  screenEl_2_2.textContent = event.key;
  screenEl_2_2.style.color = screenEl_2_2_colors[screenEl_2_2_index++ % screenEl_2_2_colorCount];
});
</script>

<br>

키보드의 반복 입력을 인식하지 않기 때문에 과도한 이벤트 호출을 방지하려면 `keydown` 이벤트 보다 `keyup` 이벤트를 사용하는 것이 
더 좋다. 하지만 `keyup`은 `CJK` 문자의 `Return(Enter)` 입력시 문제가 있어 한글 입력시 `Return(Enter)`를 인식할 필요가 
있는 이벤트를 등록할 때는 `keyup`가 아닌 `keydown` 이벤트를 사용해야한다.

#### 3. CJK

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log(event.isComposing, event.target.value);
  }
});
```

`안녕하세요~ Hello`를 입력한 상태에서 `Return`키를 누르면 콘솔에 출력되는 결과는 다음과 같다.

```console
fasle '안녕하세요~ Hello'
```

<br>

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log(event.isComposing, event.target.value);
  }
});
```

`Hello~ 안녕하세요`를 입력한 상태에서 `Return`키를 누르면 콘솔에 출력되는 결과는 다음과 같다.

```console
true 'Hello~ 안녕하세요'
false 'Hello~ 안녕하세요'
```

마지막 글자가 한글일 때 `Return`키를 누르면 문자를 결합해야 하기 때문에 `Return`키 입력에 문자 결합 전/후로 2번의 트리거가 
발생이 된다. 만약 이걸 고려하지 않고 서버로 요청을 보낼 경우 한글이 마지막에 입력되었다면 중복 요청을 보내는 셈이 되는 것이다.

<br>

그런데 문제는 `keyup` 이벤트를 연결했을 경우다.

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    console.log(event.isComposing, event.target.value);
  }
});
```

`Hello~ 안녕하세요`를 입력했지만 결과는 다음과 같다.

```console
false 'Hello~ 안녕하세요'
false 'Hello~ 안녕하세요'
```

`isComposing`이 둘 다 `false`가 출력되어 구분할 수 없어지게 된 것이다. `Return`키 입력이 들어가는 순간이 아닌 
`Return`키 입력이 들어갔다 떼지는 순간 트리거가 발생하기 때문에 문자 결합 전/후로 2번의 트리거가 발생하지만, 함수가 실행되는 
시점에는 이미 문자 결합이 되어버린 것이다.

브라우저의 콘솔이 자동으로 문자를 결합해서 보여주어서 차이가 없어 보이지만

```console
# keydown
true 'Hello~ 안녕하세ㅇㅛ'
false 'Hello~ 안녕하세요'
```

```console
# keyup
false 'Hello~ 안녕하세요'
false 'Hello~ 안녕하세요'
```

실제로는 이렇게 출력되는 것이라 생각하면 된다.

<br>

따라서 이 문제를 해결하기 위해서는 `isComposing`의 구별이 필요하고, 이를 위해 `keydown` 이벤트를 사용해야한다.

__keydown event__

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    console.log(event.target.value);
  }
});
```

`event.isComposing`의 구분이 불가능해 로직이 2번 실행되어, 텍스트 입력과 동시에 적용된 색상이 한 번 더 변경되는 것을 확인할 수 있다.

<div style="display:flex;align-items:center;height:60px;">
  <labe class="input-keyboard-label">입력하세요:</labe>
  <input type="text" class="input-keyboard input-2-3-1" />
  <div class="screen-log screen-2-3-1" style="height:100%;">
  </div>
</div>

<script>
const inputEl_2_3_1 = document.querySelector('.input-2-3-1');
const screenEl_2_3_1 = document.querySelector('.screen-2-3-1');
const screenEl_2_3_1_colors = ['red', 'orange', 'green', 'brown', 'blue', 'purple'];
const screenEl_2_3_1_colorCount = screenEl_2_3_1_colors.length;
let screenEl_2_3_1_index = 0;

inputEl_2_3_1.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    screenEl_2_3_1.textContent = event.target.value;
    screenEl_2_3_1.style.color = screenEl_2_3_1_colors[screenEl_2_3_1_index++ % screenEl_2_3_1_colorCount];
  }
});
</script>

<br>

__keyup event__

```javascript
const inputEl = document.querySelector('input');

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    console.log(event.target.value);
  }
});
```

`event.isComposing`의 구분이 가능해 1번만 실행되므로, 텍스트 입력과 동시에 적용된 색상이 변하지 않는 것을 확인할 수 있다.

<div style="display:flex;align-items:center;height:60px;">
  <labe class="input-keyboard-label">입력하세요:</labe>
  <input type="text" class="input-keyboard input-2-3-2" />
  <div class="screen-log screen-2-3-2" style="height:100%;">
  </div>
</div>

<script>
const inputEl_2_3_2 = document.querySelector('.input-2-3-2');
const screenEl_2_3_2 = document.querySelector('.screen-2-3-2');
const screenEl_2_3_2_colors = ['red', 'orange', 'green', 'brown', 'blue', 'purple'];
const screenEl_2_3_2_colorCount = screenEl_2_3_2_colors.length;
let screenEl_2_3_2_index = 0;

inputEl_2_3_2.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing) {
    screenEl_2_3_2.textContent = event.target.value;
    screenEl_2_3_2.style.color = screenEl_2_3_2_colors[screenEl_2_3_2_index++ % screenEl_2_3_2_colorCount];
  }
});
</script>



<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "AbortController." MDN Web Docs. Jan. 10, 2024, accessed Apr. 12, 2024, [MDN - Abort Controller].


[MDN - Abort Controller]:https://developer.mozilla.org/en-US/docs/Web/API/AbortController
