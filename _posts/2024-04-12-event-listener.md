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
  height: 1000px;
  border: 10px solid;
  background-color: orange;
}
.child.active {
  background-color: yellowgreen;
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
  <div class="screen-1-1" style="flex-grow:1;background-color:white;color:black;
                                 font:30px/1.6 sans-serif;padding-left:30px;align-content:center;">
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
  <div class="screen-1-4" style="flex-grow:1;background-color:white;color:black;
                                 font:30px/1.6 sans-serif;padding-left:30px;align-content:center;">
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
  <div class="screen-1-5" style="flex-grow:1;background-color:white;color:black;
                                 font:30px/1.6 sans-serif;padding-left:30px;align-content:center;">
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
  <div class="screen-1-6" style="flex-grow:1;background-color:white;color:black;
                                 font:30px/1.6 sans-serif;padding-left:30px;align-content:center;">
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
  <div class="screen-1-7" style="flex-grow:1;background-color:white;color:black;
                                 font:30px/1.6 sans-serif;padding-left:30px;align-content:center;">
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


<br><br>

---
Reference

1. 박영웅, "프론트엔드 웹 개발의 모든 것 초격차 패키지 Online." fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/).
2. "AbortController." MDN Web Docs. Jan. 10, 2024, accessed Apr. 12, 2024, [MDN - Abort Controller].


[MDN - Abort Controller]:https://developer.mozilla.org/en-US/docs/Web/API/AbortController
