---
layout: post
title: 자바스크립트 null, empty value 체크의 모든 것
subtitle: I don't know what you want, so I prepared everything!
categories: javascript
tags: [javascript null check, null coalescing operator]
---

### JavaScript 에는 유독 null 체크 방법이 다양하고, 예상 외의 동작이 존재한다 👩‍💻

색상 표를 위해 스크린샷과 첨부 파일로 대체한다. 😯😯
편의상 default value 는 `'default'`라는 string 으로 통일합니다. TypeScript 에서는 동일 타입으로 지정해줘야한다.
💁‍♀️ 하지만 우리가 TypeScript 에서 타입을 지정한다 해도 결국 실행 시점에는 JavaScript 로 `transpile`되므로 결국 JavaScript 의 동등 비교 및 체크의 넓은 범위를 모두 이해해야한다.

**<span style="color: red">빨간색</span>** 칸: 에러 또는 예상과 다른 case 가 출력되는 경우
**<span style="color: green">초록색</span>** 칸: 의도한 바에 맞는 null, empty value 체크가 가능한 경우

---

#### 1. `==`를 이용한 null check
![double-equal-simple](/assets/images/posts/2022-07-27-javascript-null-check/double-equal-simple.png)
![double-equal-everything](/assets/images/posts/2022-07-27-javascript-null-check/double-equal-everything.png)
> <span style="color: red">Uncaught SyntaxError: Unexpected token '=='</span>

위 표에서 볼 수 있듯이 `==`은 JavaScript 에서 동등 비교를 하는데 적절하지 못한다.
얼핏 보면 0과 '0', 1과 '1'을 구분하지 않고 받고 싶을때 유용해 보일 수도 있지만 2와 '2'는 다르다, 또한 0과 false, 1과 true 를 구분하지 못 하고 모두 동등 비교가 성립되므로 **<span style="color: red">`JavaScript`에서 동등 비교시 `==`는 사용하지 말아야한다</span>**.


#### 2. `===`를 이용한 null check
![triple-equal-simple](/assets/images/posts/2022-07-27-javascript-null-check/triple-equal-simple.png)
![triple-equal-everything](/assets/images/posts/2022-07-27-javascript-null-check/triple-equal-everything.png)
> <span style="color: red">Uncaught SyntaxError: Unexpected token '==='</span>

이번에는 매우 아름다운 표를 볼 수 있다.
단, 이 경우에도 주의해야 할 것이 있다.
* `NaN === NaN`은(는) 성립하지 않는다.
* `{} === []`은(는) Uncaught SyntaxError 가 발생한다.

그렇다면 `NaN`의 동등 비교는 어떻게 해야할까?
```javascript
Number.isNaN();
isNaN();  // Number는 생략 가능하다.
```
를 통해 할 수 있다.

```javascript
isNaN(NaN);           // true
isNaN(undefined);     // true
isNaN({});            // true
isNaN(function(){});  // true
```
하지만 메서드 이름과 달리 아름다운 결과를 보여주진 않는다. 💢💢

따라서 정말 `NaN`인지만 정확히 판단하고 싶다면 다음과 같이 조건을 두 가지를 사용해야한다.
```javascript
const checkNaN = input => ((input !== NaN) && Number.isNaN(input));
checkNaN(NaN);           // true
checkNaN(undefined);     // fasle
checkNaN({});            // false
checkNaN(function(){});  // false
```
사실 `input !== NaN`을 별도로 실행해보면 모든 경우 true 가 반환된다. 하지만 위와 같이 isNaN과 && 연산을 하면 NaN을 제외하면 모든 경우의 수에서 false 조건이 된다는 것을 알 수 있다. 따라서 위 로직을 통해 정확한 체크가 가능하다.


_**`&&` 앞위 순서는 바뀌어도 결과에 영향을 미치지는 않지만 <br>`&& 연산`의 경우의 둘 중 <span style="color: red">false 일 확률이 높은 것이 앞에 와야 확률상 유리</span>하다**_❗️

---

#### 3. Logical NOT Operator(`!`)
![logical-not](/assets/images/posts/2022-07-27-javascript-null-check/logical-not.png)
개인적으로 null, not null check 시 유용하게 사용하고 있다!! 👏👏👏
위 1, 2와 달리 동등비교는 아니고 null, not null 체크 시에 활용하기 좋은 방법이다.
동등 비교시에는 null, undefined, NaN, ''의 경우의 수를 각각 체크해야했지만 `!`를 사용하면 그럴 필요가 없다.

표를 보면 알 수 있듯이 그 어떤 경우에도 `SyntaxError`가 발생하지 않으며 값 자체가 `true`, `false`같은 boolean 값이 들어올 때를 제외하면 `0`인 경우의 수만 조심하면 대부분의 상황에서 손쉽게 체크가 가능하다.
만약, `0`인 경우의 수가 존재할 가능성이 있다면 다음과 같이 조건을 하나만 더 추가해주면 좀 더 완벽한 체크가 가능하다.

참고로 0인 경우는 `value === 0` 또는 `value !== 0` 조건을 추가해 제거할 수 있고, true, false 와 같은 Boolean 값은 `typeof`나 `constructor`를 통해 체크할 수 있다.

**좀 더 완벽한 `!`를 위한 함수**
```javascript
const runWhenEmpty = input => {
    if (!input && (typeof input !== "boolean") && (input !== 0)) {
        console.log("empty!!")
    }
}
```
**좀 더 완벽한 `!!`를 위한 함수**
```javascript
const runWhenNotEmpty = input => {
    if (!!input || (typeof input === "boolean") || (input === 0)) {
        console.log("not empty!!")
    }
}
```
하지만 굳이 저런식으로 조건을 복잡하게 나열할 할 필요 없이 `!`, `!!`만 체크한 후 `try-catch`를 이용해 로직을 보호해주는 방법이 더 깔끔하고 안전한 코딩이 가능하다.


#### 4. Nullish Coalescing Operator(`??`)
![nullish-coalescing](/assets/images/posts/2022-07-27-javascript-null-check/nullish-coalescing.png)
<span style="color: red">
> <span style="color: red">1. {} : Uncaught SyntaxError: Unexpected token '??'</span>  
> <span style="color: red">2.1 function(){} : 'Anonymous function' 일 경우 >> Uncaught SyntaxError: Function statements require a function name</span>  
> <span style="color: red">2.2 function(){} : 'Named function' 일 경우 >>  Uncaught SyntaxError: Unexpected token '??'</span>

`{}` 또는 `function(){}`일 때 에러가 발생하긴 하지만 `value`의 `default`를 처리하기 위한 용도로 사용되기 때문에 거의 완벽하게 사용이 가능하다.
`undefined`와 `null`일 때만 `default value`를 반환한다는 것을 기억하자. 

#### 5. Default function parameter(편의상 JavaScript 를 기준으로 합니다 👻👻👻)
```javascript
const nullCheck = (input = 'default') => console.log(input);
```
![default-function-parameter](/assets/images/posts/2022-07-27-javascript-null-check/default-function-parameter.png)
이름 그대로 `parameter`에 `default value`를 지정하는 것이다.
함수 block scope 에 들어가기도 전에 에러를 발생하지 않는 유연함은 있지만 비슷해 보이는 `??`와 달리 `undefined`일 때만 `default value`를 반환한다는 것에 유의하자. 👀


#### 6. OR Operator(`||`)
![or-operator](/assets/images/posts/2022-07-27-javascript-null-check/or-operator.png)

`??` 보다는 `!`를 사용하는 것과 비슷하다. `!`와 `Ternary Operator`를 결합해 사용하면 다음과 같다.
```javascript
let value;
!value ? 'default' : value;
```

### Summary
![triple-equal-simple](/assets/images/posts/2022-07-27-javascript-null-check/triple-equal-simple.png)
![summary](/assets/images/posts/2022-07-27-javascript-null-check/summary.png)
모든 것을 다 기억하긴 어려우니 이것만 기억하자. 🤓🤓

Numbers: [javascript null check](/assets/images/posts/2022-07-27-javascript-null-check/javascript%20null%20check.numbers)<br>
Excel: [javascript null check](/assets/images/posts/2022-07-27-javascript-null-check/javascript%20null%20check.xlsx)