---
layout: post
title: Clean Code - JavaScript/TypeScript
subtitle: Clean-Code that looks good is also good for maintenance.
excerpt_image: NO_EXCERPT_IMAGE
categories: [clean code, typescript, javascript]
tags: [clean code]
---


### 1. Variables 👩‍💻

#### 1. Use meaningful variable names

- Bad

```typescript

```

- Good

```typescript

```



- Bad

```typescript
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3;
}
```

- Good

```typescript
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right;
}
```

#### 2. Use pronounceable variable names

- Bad

```typescript

```

- Good

```typescript

```



- Bad

```typescript
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
}
```

- Good

```typescript
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
}
```

개발을 하다 보면 변수 명이 길어지는 게 보기 싫다고 무리하게 함축하는 사람들이 있다. 회사 내 코딩 컨벤션이 있으면 다행이지만 
그렇지 않을 경우 팀을 설득해 읽을 수 있는 변수명을 사용하도록 하자.

#### 3. Use the same vocabulary for the same type of variable

- Bad

```typescript

```

- Good

```typescript

```



- Bad

```typescript
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

- Good

```typescript
function getUser(): User;
```

사실 이 문제는 코드의 중복을 관리하는 것으로부터 시작한다. 예전에 일하던 곳에서 같은 회원 정보를 구하는 데, 서로 다른 컨트롤러에서 
서로 다른 서비스 레이어에 회원 정보를 조회하기 위한 코드가 중복되어 있는 경우가 있었다. 결국 조회하는 데이터는 완전히 같거나 거의 같았는데 
코드의 중복이 발생하면서 이름도 제각각이었던...

굳이 필요하지 않은 접미사는 붙이지 않고 동일한 유형의 변수명은 동일한 이름을 사용해 네이밍 파편화를 일으키지 않도록 한다.

#### 4. Use searchable names

- Bad

```typescript
// What the heck is 86400000 for?
setTimeout(restart, 86400000);
```

- Good

```typescript
// Declare them as capitalized named constants.
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; // 86400000

setTimeout(restart, MILLISECONDS_PER_DAY);
```

회사에서 일하다보면 특히 옛날 코드에 저런 것들 은근히 많다. 🤣🤣🤣그나마 위 예제와 같이 어느 정도 눈에 익은 숫자들은 
의미를 찾아낼 수 있지만 그렇지 않은 경우 결국 누군가에게 물어볼 수 밖에 없는 경우가 있다. `Magic Number`를 쓰지 말자!!

#### 5. Use explanatory variables

- Bad

```typescript
declare const users: Map<string, User>;

for (const keyValue of users) {
  // iterate through users map
}
```

- Good

```typescript
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // iterate through users map
}
```

아무리 iterator 에 사용되는 임시 변수명이라도 항상 의미 있게 사용하자. Destructuring 도 되는데 뒀다 뭐할라고!

#### 6. Avoid Mental Mapping

- Bad

```typescript
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

- Good

```typescript
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

어차피 저런 변수명인 컴파일러(TypeScript 는 트랜스파일러)가 알아서 난독화 하고 축약해서 만들어줄거다. 
언제나 암시적인 변수명 대신 명시적인 변수명을 사용하자.

#### 7. Don't add unneeded context

- Bad

```typescript
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

- Good

```typescript
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

`Car`의 properties 인데 굳이 `carMake`라고 쓸 필요가 있는가? Classes/Types/Objects 의 이름에 의미가 담겨있다면 
변수명에서 반복하지 말자.

#### 8. Use default arguments instead of short circuiting or conditionals

- Bad

```typescript
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

- Good

```typescript
function loadPages(count: number = 10) {
  // ...
}
```

어차피 기본값을 줄건데 굳이 함수의 body 에 코드 라인을 한 줄 추가할 필요는 없다. 함수의 parameters 에 
default value 를 주도록 하자.

#### 9. Use enum to document the intent

- Bad

```typescript
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary',
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed 
    }
  }
}
```

- Good

```typescript
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed 
    }
  }
}
```

`값 자체보다 값이 구별되어야 할 때`, 코드의 의도를 알려주기 위해 `enum`을 사용하라고 되어 있다. 사실 `Enumerations`는 
대부분의 언어에서 굉장히 유용하다. 단순한 구조체와 달리 기본적으로 Singleton 으로 작동하며, Enumerations 만이 제공하는 
기능들을 사용할 수 있기 때문이다. 하지만 TypeScript 에서는 좀 더 고려해봐야 할 것이 있다.

[TypeScript Docs - Enums] 에서도 다음과 같이 설명한다.

```typescript
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up;
//         ^?

ODirection.Up;
//         ^?

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

모던 TypeScript 에서는 Objects 에 `as const`를 사용하면 굳이 `enum`을 사용할 필요가 없다고 말한다.
[Line Engineering - TypeScript enum] 에서는 좀 더 자세히 설명하고 있는데, 
<span style="color: red;">TypeScript 의 `enume`은 `Tree-shaking`이 되지 않는다</span>.

위 `EDirection`와 같이 `const enum`은 Tree-shaking 은 되지만, 긴 문자열을 할당할 경우, JavaScript 로 
트랜스파일 되는 과정에서 지나치게 길어지는 문제가 있다고 한다.

라인에서 역시 `as const`를 사용한 Objects 로부터 추출한 `Union Types` > `const enum` > `enum` 순서로 
사용하길 추천하고 있다.

일본어를 예시로 들었는데, 사실 극단적인 경우를 제외하면, 굳이 Objects 를 `as const`로 선언한 다음
`Union Types`를 추출하기 위해 `type Direction = typeof ODirection[keyof typeof ODirection];`와 같이 
가독성도 별로인 코드를 한 줄 더 써야할 필요가 있을까 싶다. `const enum`도 Tree-shaking 이 되는데 말이다.

`enum` 사용에 대해서는 여전히 의견이 분분한 것 같다. 따라서 이 부분은 팀원과 합의롤 통해 코딩 컨벤션에 정의하고 
그에 따르는 것이 좋을 것 같다.

---

### 2. Functions 👩‍💻

#### 1. Function arguments (2 or fewer ideally)

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Functions should do one thing

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Function names should say what they do

- Bad

```typescript

```

- Good

```typescript

```



#### 4. Functions should only be one level of abstraction

- Bad

```typescript

```

- Good

```typescript

```



#### 5. Remove duplicate code

- Bad

```typescript

```

- Good

```typescript

```



#### 6. Set default objects with Object.assign or destructuring

- Bad

```typescript

```

- Good

```typescript

```



#### 7. Don't use flags as function parameters

- Bad

```typescript

```

- Good

```typescript

```



#### 8. Avoid Side Effects (part 1)

- Bad

```typescript

```

- Good

```typescript

```



#### 9. Avoid Side Effects (part 2)

- Bad

```typescript

```

- Good

```typescript

```



#### 10. Don't write to global functions

- Bad

```typescript

```

- Good

```typescript

```



#### 11. Favor functional programming over imperative programming

- Bad

```typescript

```

- Good

```typescript

```



#### 12. Encapsulate conditionals

- Bad

```typescript

```

- Good

```typescript

```



#### 13. Avoid negative conditionals

- Bad

```typescript

```

- Good

```typescript

```



#### 14. Avoid conditionals

- Bad

```typescript

```

- Good

```typescript

```



#### 15. Avoid type checking

- Bad

```typescript

```

- Good

```typescript

```



#### 16. Don't over-optimize

- Bad

```typescript

```

- Good

```typescript

```



#### 17. Remove dead code

- Bad

```typescript

```

- Good

```typescript

```



#### 18. Use iterators and generators

- Bad

```typescript

```

- Good

```typescript

```



---

### 3. Objects and Data Structures 👩‍💻

#### 1. Use getters and setters

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Make objects have private/protected members

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Prefer immutability

- Bad

```typescript

```

- Good

```typescript

```



#### 4. type vs. interface

- Bad

```typescript

```

- Good

```typescript

```



---

### 4. Classes 👩‍💻

#### 1. Classes should be small

- Bad

```typescript

```

- Good

```typescript

```



#### 2. High cohesion and low coupling

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Prefer composition over inheritance

- Bad

```typescript

```

- Good

```typescript

```



#### 4. Use method chaining

- Bad

```typescript

```

- Good

```typescript

```



---

### 5. SOLID 👩‍💻

#### 1. Single Responsibility Principle (SRP)

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Open/Closed Principle (OCP)

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Liskov Substitution Principle (LSP)

- Bad

```typescript

```

- Good

```typescript

```



#### 4. Interface Segregation Principle (ISP)

- Bad

```typescript

```

- Good

```typescript

```



#### 5. Dependency Inversion Principle (DIP)

- Bad

```typescript

```

- Good

```typescript

```



---

### 6. Testing 👩‍💻

#### 1. The three laws of TDD

- Bad

```typescript

```

- Good

```typescript

```



#### 2. F.I.R.S.T. rules

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Single concept per test

- Bad

```typescript

```

- Good

```typescript

```



#### 4. The name of the test should reveal its intention

- Bad

```typescript

```

- Good

```typescript

```



---

### 7. Concurrency 👩‍💻

#### 1. Prefer promises vs callbacks

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Async/Await are even cleaner than Promises

- Bad

```typescript

```

- Good

```typescript

```



---

### 8. Error Handling 👩‍💻

#### 1. Always use Error for throwing or rejecting

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Don't ignore caught errors

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Don't ignore rejected promises

- Bad

```typescript

```

- Good

```typescript

```



---

### 9. Formatting 👩‍💻

#### 1. Migrating from TSLint to ESLint

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Use consistent capitalization

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Function callers and callees should be close

- Bad

```typescript

```

- Good

```typescript

```



#### 4. Organize imports

- Bad

```typescript

```

- Good

```typescript

```



#### 5. Use typescript aliases

- Bad

```typescript

```

- Good

```typescript

```



---

### 10. Comments 👩‍💻

#### 1. Prefer self explanatory code instead of comments

- Bad

```typescript

```

- Good

```typescript

```



#### 2. Don't leave commented out code in your codebase

- Bad

```typescript

```

- Good

```typescript

```



#### 3. Don't have journal comments

- Bad

```typescript

```

- Good

```typescript

```



#### 4. Avoid positional markers

- Bad

```typescript

```

- Good

```typescript

```



#### 5. TODO comments

- Bad

```typescript

```

- Good

```typescript

```



---

### 11. Let's reduce the indentation of the Functions 👩‍💻 

<br><br>

---
Reference

1. "clean-code-typescript.", GitHub. accessed Mar. 28, 2024, [https://738.github.io/clean-code-typescript/](https://738.github.io/clean-code-typescript/_).
2. "코드리뷰에서 칭찬받는 코드의 비밀 😎." Youtube. Nov. 27, 2022, [코드리뷰에서 칭찬받는 코드의 비밀 😎](https://www.youtube.com/watch?v=BfpTtsWTWEM&t=3s).
3. "Enums." TypeScript Docs. accessed Mar. 30, 2024, [TypeScript Docs - Enums].
4. Amon Keishima. "TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다." Line Engineering. 
   last modified Sep. 10, 2020, [Line Engineering - TypeScript enum]

[TypeScript Docs - Enums]:https://www.typescriptlang.org/ko/docs/handbook/enums.html
[Line Engineering - TypeScript enum]:https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
