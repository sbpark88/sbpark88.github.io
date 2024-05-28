---
layout: post
title: JavaScript built-in test library 'assert'
subtitle: Let's make the built-in assert easy to use!
excerpt_image: /assets/images/posts/2024-05-28-javascript-built-assert/excerpt_image.png
categories: [javascript]
tags: [javascript built-in test, assert, javascript test, console.assert]
---

### 1. console.assert 👩‍💻

JavaScript 를 사용하든, TypeScript 를 사용하든 테스트 코드를 작성할 때 `Jest`, `Vitest`와 같은 서드파티 라이브러리를 
설치하곤 했다. 문제는 서드파티이다보니 프로젝트 설정이나 다른 라이브러리에 종속성을 가져 테스트 코드를 돌려보기 위해 라이브러리가 
잘 돌아가는지 테스트를 해야하는 아이러니한 상황을 겪은 적이 있다.

실제 프로젝트도 아닌데 토이 프로젝트에서 일부 함수를 가볍게 테스트 해보고자 할 때 이런 상황이 펼쳐지면 배보다 배꼽이 더 커지는 
그런 상황에 짜증이 나곤 한다.

그래서 문득 궁금했다.

Java 를 비롯한 대부분의 언어를 사용할 때 기본적으로 `xUnit`이 있어 별도의 설치 없이도 테스트가 가능하다. 서버를 개발하며 
회사 코드에 테스트 코드가 존재하지 않아 도입을 했을 때 역시 별다른 설치 없이 바로 JUnit`을 사용했다. 심지어 뭔가 안되는게 
너무도 많다는 xCode 환경에서도 Swift 와 Objective-C 를 테스트 하기 위한 `XCTest`가 기본으로 포함되어 있었다.

물론, `console.assert`를 사용할 수도 있지만 이것은 아래 코드를 통해 확인할 수 있듯이 테스트 코드용으로 적합하지 않다.

```javascript
const isEven = (num) => num % 2 === 0

const test = () => {
  const num = 3
  
  const result = isEven(num)
  
  console.assert(result, `The number ${num} is not even.`)
}

test()
```

> `console.assert(assertion:obj:[...obj]?:)`, `console.assert(assertion:msg:[...msg]?:)`는 
> 테스트 코드를 작성하는 데 사용하기에 적합하지 않다.

---

### 2. Node 'assert' 👩‍💻

항상 브라우저 환경을 먼저 생각하고 코드를 작성하다보니 브라우저에선 제공되지 않지만 Node 에는 `assert`를 제공하고 있다는 것을 
알게 되었다. 당연히 브라우저 환경에선 제공되지 않는 API 였던 것이다. 하지만 클라이언트 역시 `webpack`이나 `vitest`, `parcel` 
와 같은 번들러를 사용하면 배포 전 Node 의 도움을 받아 컴파일 되기 때문에 `assert`를 사용할 수 있다.

다만, 이 `assert`가 시각적으로도 성공과 실패 여부가 잘 구분되지 않으며 `Jest`나 `Vitest`와 같은 라이브러리들과 사용 방법이 
꽤 다르다는 점이다.

따라서 이런 문제를 해결하기 위해 `Jest` 스타일로 테스트 코드를 작성할 수 있도록 기본적인 테스트 함수를 만들어두면 서드파티 라이브러리를 
설치하고, 버전이나 다른 라이브러리에 대한 종속성을 체크할 필요 없이 토이 프로젝트 같은 것에서 쉽게 사용이 가능하다.

```javascript
import assert from 'assert';

export const test = (description, callback) => {
  try {
    callback();
    console.log('Test %cpassed%c:', 'color: green', '', description);
  } catch (error) {
    console.error(
      'Test %cfailed%c:',
      'color: red',
      '',
      description,
      '-',
      error.message,
      '\nActual:',
      error.actual,
      '\nExpected:',
      error.expected
    );
  }
};

export const expect = (value) => {
  const toBe = (expected) => assert.strictEqual(value, expected);
  const toEqual = (expected) => assert.deepStrictEqual(value, expected);
  const not = {
    toBe: (expected) => assert.notStrictEqual(value, expected),
    toEqual: (expected) => assert.notDeepStrictEqual(value, expected),
  };

  return { toBe, toEqual, not };
};
```

> `toBe`는 Primitive 타입의 값과, Reference 타입의 값에 해당하는 포인터(shallow)가 같은지를 비교한다.  
> `toEqual`은 reference 타입의 실제 값(deep)이 같은지 비교한다.
> 
> 따라서 Primitive 타입은 `toBe`를 사용하고, Reference 타입은 포인터를 비교할 때는 `toBe`를 사용하고 값을 비교할 때는 
> `toEqual`을 사용하면 된다.

<br>

이제 위에서 만든 함수를 사용해 테스트 코드를 작성해보자.

```javascript

test('Two numbers are equal.', () => {
  expect(1 + 2).toBe(3);
});

test('Two strings are equal.', () => {
  expect('hello').toBe('hello');
});

test('Two numbers are not equal.', () => {
  expect(1 + 2).not.toBe(4);
});

test('Two different objects have same values(deep value equal)', () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2 };
  expect(obj1).toEqual(obj2);
});

test('Two different objects have different pointer address.', () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2 };
  expect(obj1).not.toBe(obj2);
});

test('Two different objects have different values(deep value not equal).', () => {
  const obj1 = { a: 1, b: 2 };
  const obj2 = { a: 1, b: 2, c: 4 };
  expect(obj1).not.toEqual(obj2);
});

test('Two arrays are equal.', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(arr1).toEqual(arr2);
});

test('This test will be failed.', () => {
  expect(23).toBe(25);
});
```

![test result](/assets/images/posts/2024-05-28-javascript-built-assert/excerpt_image.png)
