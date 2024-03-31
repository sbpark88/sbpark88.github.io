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
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

- Good

```typescript
function createMenu(options: { title: string, body: string, buttonText: string, cancellable: boolean }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

또는

```typescript
type MenuOptions = { title: string, body: string, buttonText: string, cancellable: boolean };

function createMenu(options: MenuOptions) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

함수의 parameters 는 2개 이하가 이상적이다. parameters 가 3개 이상이 되면 테스트 해야할 경우의 수가 급격히 늘어나기 
때문이다. 만약, 테스트 해야 할 경우의 수가 많아질 경우 함수를 2개 이상으로 나누도록 하고, 테스트 해야할 경우의 수에 영향을 
주지는 않지만 많은 값이 필요할 경우, 이 값들이 하나의 객체로 합쳐질 수 있다면 Object Literal 을 사용하도록 한다.

#### 2. Functions should do one thing

- Bad

```typescript
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

- Good

```typescript
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

함수가 하나의 역할만 수행하도록 한다. 이것은 함수형 프로그래밍에서 중요한 원칙 중 하나일 뿐 아니라 Clean Code 
관점에서도 중요하다. 함수가 여러 역할을 수행하면 함수를 테스트하고 추론하는 것이 어려워진다. 이는 추후 리팩토링을 
할 때도 영향을 미친다.

#### 3. Function names should say what they do

- Bad

```typescript
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

- Good

```typescript
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

*parameter names* 를 보지 않고 함수의 이름만 보고 무엇을 하는지 알 수 있도록 하라고 말한다. 물론, 대부분의 함수명을 
지을 때는 맞는 말이다.

하지만 제공되는 예제를 보면 이 부분은 조금 ❔다. 
[Use the same vocabulary for the same type of variable](#h-3-use-the-same-vocabulary-for-the-same-type-of-variable) 
에 위배되지 않나 생각된다. JavaScript 도 아니고 TypeScript 는 Overloading 이 가능한데 굳이
`addDayToDate(date:day:)`, `addMonthToDate(date:month:)`, `addYearToDate(date:year:)`과 같이 
만드는 것이 좋은것인가에 대한 의문이다.

그냥 `addToDate(date:day:)`, `addToDate(date:month:)`, `addToDate(date:year:)` 이게 더 낫지 않을까?

#### 4. Functions should only be one level of abstraction

- Bad

```typescript
function parseCode(code: string) {
  const REGEXES = [ /* ... */ ];
  const statements = code.split(' ');
  const tokens = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

- Good

```typescript
const REGEXES = [ /* ... */ ];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach((node) => {
    // parse...
  });
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ');
  const tokens: Token[] = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = [];
  tokens.forEach((token) => {
    syntaxTree.push( /* ... */ );
  });

  return syntaxTree;
}
```

함수는 단일 행동을 추상화하도록 해야한다. 함수가 한 가지 이상을 추상화 할 경우 위와 같이 재사용성과 테스트를 고려해 함수를 
쪼개도록 한다.

사실 위와 같은 코드는 개인적으로 극혐하는 코드라... 단 한 번도 저렇게 작성해 본 적이 없다. 물론, 함수 하나에 500줄 짜리를 
도대체 뭔 소린지... 🥵🥵 테스트도 힘들고 해서 리팩토링 하며 쪼갠적은 많다.

#### 5. Remove duplicate code

- Bad

```typescript
function showDeveloperList(developers: Developer[]) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();

    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers: Manager[]) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();

    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

- Good

```typescript
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink,
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio,
    }
  }
}

function showEmployeeList(employee: Developer | Manager) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const extra = employee.getExtraDetails();

    const data = {
      expectedSalary,
      experience,
      extra,
    };

    render(data);
  });
}
```

때로는 비슷한 두 코드에서 `공통된 부분을 추출하는 것` 보다 <span style="color: red;">SOLID 원칙을 따르는 
올바른 추상화</span>가 더 좋다. 물론, 올바른 추상화가 가능할 때 하라는 것이다. 
<span style="color: red;">잘못된 추상화는 중복 코드보다 나쁘니</span> 조심해야한다. 

*Computed Properties* 가 없어서 고민했는데, 예제를 보니 그냥 `getter`를 사용하거나 위 예제와 같이 
`methods`를 사용해도 될 것 같다.

#### 6. Set default objects with Object.assign or destructuring

- Bad

```typescript
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

  // ...
}

createMenu({ body: 'Bar' });
```

- Good

```typescript
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // ...
}

createMenu({ body: 'Bar' });
```

또는

```typescript
function createMenu(config: MenuConfig) {
  const menuConfig = {
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true,
    ...config,
  };

  // ...
}
```

또는

```typescript
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu({ title = 'Foo', body = 'Bar', buttonText = 'Baz', cancellable = true }: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

알고는 있지만 코드를 작성하면 간과하기 좋은 실수 같다. 마지막 방법을 주로 쓰곤 하는데, 처음 작성하는 코드가 아니고 리팩토링을 하는데 
이미 많은 곳에서 사용중인 코드일 경우 개인 코드면 몰라도 협업하는 코드라면 수정하기가 쉽지 않을 수 있다. 당연히 아무 문제 없을거라고 
생각하고 수정했는 데 어디선가 예상하지 못한 에러가 발생하면 그 에러 제공자는 내가 되는거니까... 😔

첫 번째와 두 번째 코드와 같이 함수의 body 에서 `default objects`를 제공하는 것은 매우 좋은 방법인 것 같다. `useState`에서 
값 일부를 업데이트 할 때 많이 사용하면서도 기본값으로 사용할 생각은 왜 안 했던걸까? 🥲꼭 기억해두어야겠다.

#### 7. Don't use flags as function parameters

- Bad

```typescript
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

- Good

```typescript
function createTempFile(name: string) {
  createFile(`./temp/${name}`);
}

function createFile(name: string) {
  fs.create(name);
}
```

함수의 parameters 로 `flags`를 사용한다는 것은 함수가 둘 이상의 일을 한다는 것을 의미한다. 함수는 한 가지 일만 해야한다. 

#### 8. Avoid Side Effects (part 1)

- Bad

```typescript
// Global variable referenced by following function.
let name = 'Robert C. Martin';

function toBase64() {
  name = btoa(name);
}

toBase64();
// If we had another function that used this name, now it'd be a Base64 value

console.log(name); // expected to print 'Robert C. Martin' but instead 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

- Good

```typescript
const name = 'Robert C. Martin';

function toBase64(text: string): string {
  return btoa(text);
}

const encodedName = toBase64(name);
console.log(name);
```

어... `swap` 함수도 아니고 설마 저렇게 코드를 작성하는 사람이 정말 있단 말인가 😂😂 그래도 누군가는 저렇게 작성하니까 
Clean Code 에서도 저렇게 작성하지 말라고 하는거겠지... 🫠

#### 9. Avoid Side Effects (part 2)

- Bad

```typescript
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
};
```

예를 들어 `purchase` 함수와 `addItemToCart` 함수가 있다고 해보자. `purchase` 함수가 실행돼 결제 화면을 띄워놓은 
상태에서 `addItemToCart` 함수가 호출되었다고 해보자. Original Reference 를 그대로 사용하면 서버에는 결제창에 
보이지 않는 아이템까지 요청이 들어갈 것이다!

- Good

```typescript
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
};
```

커다란 Reference Types 를 복제하는 것은 Reference Types 를 재사용 하는 것에 비해 많은 비용이 소모된다. 하지만 
전역에서 최신 상태를 공유해야하는 경우가 아니라면 이것이 `Immutable`이 갖는 장점보다 크다고 자신 있게 말할 수 있을까?

[Swift 에서 Structures, Classes 어떤걸 선택할까?][Choosing Between Structures and Classes] 에 대한 의문에 
Apple 은 Objective-C 를 제외하면 기본적으로 Structures 를 사용하고, 앱 전체에서 데이터의 *identity* 를 제어해야 
한다면 Classes 를 사용하라고 설명한다. 이는 지난 WWDC 에서도 우리의 기존 생각과 달리 Value Types 를 사용하는 것이 
오히려 Reference Types 가 강한 참조를 유지하기 위해 ARC 를 적용하는 것보다 효율적이라고 설명한다.

TypeScript 에는 이러한 Value Types 객체는 존재하지 않는다. Object 는 물론이고, Map 역시 Reference Types 다. 
사실 사실 JavaScript 로 트랜스파일 되어야 하는 언어이기 때문에 JavaScript 에 해당 타입 먼저 존재해야한다. 방금 전 설명은 
Apple 에서 Structures 를 소개하며 설명한 내용을 이야기 했지만, 많은 프로그래밍 언어들은 사실 비슷한 부분이 많다. 특히 
Java 와 같이 언어 레벨에서 First Class Citizen 이 불가능한 언어면 몰라도 Modern Language 에서는 상당히 많은 개념이 
다른 언어에서도 같거나 유사하게 적용이 되곤 한다.

마찬가지로 Clean Code 에서도 위 예제를 사용해 `Side Effects`를 막기 위해 `Immutable`을 사용하라고 이야기한다. 
즉, 독립되어야 하는 경우라면 Reference Types 를 복제해서 사용하라는 말이다. 비용이 들더라도 `Immutable`이 갖는 장점이 
`Side Effects`보다 낫다는 판단이다. 그리고 추가적으로 이야기한다. 객체가 크면 복제 비용도 커지는데, 그것이 부담된다면 
[immutable-js](https://github.com/immutable-js/immutable-js) 와 같은 같은 훌륭한 라이브러리가 있으므로 
걱정하지 말라고 말이다!

#### 10. Don't write to global functions

- Bad

```typescript
declare global {
  interface Array<T> {
    diff(other: T[]): Array<T>;
  }
}

if (!Array.prototype.diff) {
  Array.prototype.diff = function <T>(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

앱 내에서 매우 빈번히 사용될 경우 종종 기본 Types 에 기능을 추가하는 것을 사용해본적이 있다. Code Squad 에서
크롱님이 지적해주셨던 부분이었다. 위 코드가 갖는 문제점은 다음과 같다.

- 만약 내가 정의한 기능이 Official 로 추가된다면 내 코드는 전부 수정되어야한다.
- 누군가 이 코드를 보고 Official 로 제공되는 내장 메서드로 오해할 수 있다.

<br>

- Good

그렇기 때문에 Base Types 에 `prototype`으로 메서드를 추가하는 것은 매우 신중히 해야한다고 말이다. 만약 정말로 필요하다면
내장 메서드와 구분을 하기 위해

```typescript
declare global {
  interface Array<T> {
    $diff(other: T[]): Array<T>;
  }
}

if (!Array.prototype.diff) {
  Array.prototype.$diff = function <T>(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

`Array.prototype.$diff`와 같이 내장 메서드와 구분될 수 있는 네이밍 규칙을 사용하거나

```typescript
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

`Custom Types`를 만든 후 기능을 추가해 사용하도록 해야한다.

여기서 가장 좋은 방법은 `Custom Types`를 사용하는 것이고, `Array.prototype.$diff` 역시 사용하고자 할 경우 협업하는 
사람들과 합의가 되어있어야한다.

#### 11. Favor functional programming over imperative programming

```typescript
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  },
  {
    name: 'Suzie Q',
    linesOfCode: 1500
  },
  {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  },
  {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];
```

<br>

- Bad

```typescript
let totalOutput = 0;

for (let i = 0; i < contributions.length; i++) {
  totalOutput += contributions[i].linesOfCode;
}
```

- Good

```typescript
const totalOutput = contributions
    .reduce((totalLines, output) => totalLines + output.linesOfCode, 0);
```

명령형 프로그래밍(imperative programming)보다 함수형 프로그래밍(functional programming)을 선호하라고 한다. 
참고로 테스트를 위해서는 `reduce`에 전달될 함수 역시 아래와 같이 분리시킬 수 있다.

```typescript
type Contribution = {
  name: string;
  linesOfCode: number;
};

const mergeLinesOfCode = (totalLines: number, contribution: Contribution) =>
    totalLines + contribution.linesOfCode;

const totalOutput = contributions.reduce(mergeLinesOfCode, 0);
```

#### 12. Encapsulate conditionals

- Bad

```typescript
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

- Good

```typescript
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0;
}

if (canActivateService(subscription, account)) {
  // ...
}
```

조건이 복잡할 경우 별도 함수로 분리시키긴 하지만 조건이 위와 같이 간단하면 그냥 inline 으로 작성하곤 했다. 간단한 조건을 
굳이 분리시켜 함수를 만들어야 할까? 라고 생각했기 때문이다. 하지만 Clean Code 관점에서 보면 
[Use pronounceable variable names](#h-2-use-pronounceable-variable-names) 와 마찬가지로 *읽을 수 있는가?* 
라는 관점에서 보면 분리시키는 것이 맞다는 생각이 든다. 게다가 `map`이나 `pipe`를 사용해 함수형으로 코드를 작성할 때는 
더욱 더 분리하는 것이 좋은 코드라는 생각이 든다.

#### 13. Avoid negative conditionals

- Bad

```typescript
function isEmailNotUsed(email: string): boolean {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

- Good

```typescript
function isEmailUsed(email: string): boolean {
  // ...
}

if (!isEmailUsed(email)) {
  // ...
}
```

굳이 조건을 구하고 다시 `!`를 사용해 반전시켜야 할까? 라는 생각에 종종 위와 같이 *negative* 조건을 검사한 적이 있다. 
하지만 Clean Code 관점에서 보면 좋지 못한 선택이다. `Positive Condition`을 선호하라!

#### 14. Avoid conditionals

- Bad

```typescript
class Airplane {
  private type: string;
  // ...

  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
      default:
        throw new Error('Unknown airplane type.');
    }
  }

  private getMaxAltitude(): number {
    // ...
  }
}
```

- Good

```typescript
abstract class Airplane {
  protected getMaxAltitude(): number {
    // shared logic with subclasses ...
  }

  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

조건문을 피하라는 말이 이상하게 들릴 수 있으나 불필요한 조건문을 피하라는 것이다. 이것은 위에서 본 
[Functions should do one thing](#h-2-functions-should-do-one-thing) 와
[Don’t use flags as function parameters](#h-7-dont-use-flags-as-function-parameters) 의 연장이라고 
볼 수 있다.

이는 비록 메서드가 파라미터로 `conditions`를 받은 것은 아니지만, `conditions`에 따라 메서드가 둘 이상의 일을 하고 
있다는 말이다. 단순 함수라면 *함수를 분리시킴*으로써 해결할 수 있다. 메서드의 경우는 어떻게 해야할까? 올바른 추상화를 통해 
`Polymorphism`을 사용하는 것이다.

#### 15. Avoid type checking

- Bad

```typescript
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(currentLocation, new Location('texas'));
  }
}
```

- Good

```typescript
type Vehicle = Bicycle | Car;

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(currentLocation, new Location('texas'));
}
```

TypeScript 에서는 더이상 JavaScript 스러운 코드를 사용할 필요가 없다. 언어 자체가 `Static Type Hhecking`을 
지원한다. 그냥 다른 언어에서 하던 것처럼 기본적인 타입 체크는 언어 레벨에서 하도록 맡겨두자. 

#### 16. Don't over-optimize

- Bad

```typescript
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

- Good

```typescript
for (let i = 0; i < list.length; i++) {
  // ...
}
```

JavaScript 가 Compile Language 가 아니라서 과도한 최적화를 하려는 경향이 있다. 물론, 예전에는 위와 같은 최적화를 
개발자가 해줘야했다. Python 과 마찬가지로 Interpreter Language 이므로 모든 최적화를 개발자가 해줘야 할 것 같지만, 
최신 브라우저는 Interpreter 대신 V8 Engine 과 같은 `JIT Compiler`를 사용한다. 따라서 기존의 Compile Language 에서 
컴파일러가 해주던 최적화를 최신 브라우저를 사용함으로써 적용할 수 있게 되었다. 이제 과도한 최적화는 오히려 코드의 가독성만 나쁘게 만든다.

#### 17. Remove dead code

- Bad

```typescript
function oldRequestModule(url: string) {
  // ...
}

function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

- Good

```typescript
function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

회사에서 일할때 생각보다 저런 코드가 많았다. 😩😩😩 Git 을 사용함에도 불구하고 과거에 머물러 있는 개발자들이 저런 코드를 
양산하는 것을 많이 목격했다. 제발... 옛날 코드를 보고 싶으면 Git 에게 맡기자. 죽은 코드가 혼재하면 가독성도 해치고, Git 의 
`diff` 역시 작동하지 않는다.

#### 18. Use iterators and generators

- Bad

```typescript
function fibonacci(n: number): number[] {
  if (n === 1) return [1];

  const items: number[] = [1, 1];
  while (items.length < n) {
    items.push(items[items.length - 2] + items[items.length - 1]);
  }

  return items;
}

function printFibonacci(n: number): void {
  fibonacci(n).forEach((fib) => console.log(fib));
}

printFibonacci(10);

```

```console
1
1
2
3
5
8
13
21
34
55
```

위 `fibonacci` 함수는 피보나치 수를 배열로 반환한다. 따라서 100 이라는 숫자가 입력되면 100 개의 피보나치 수를 배열로 
반환한다.

- Good

```typescript
// Generates an infinite stream of Fibonacci numbers.
// The generator doesn't keep the array of all numbers.
function* fibonacci(): IterableIterator<number> {
  let [a, b] = [1, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function printFibonacci(n: number) {
  let i = 0;
  for (const fib of fibonacci()) {
    if (i++ === n) break;
    console.log(fib);
  }
}

printFibonacci(10);
```

(CLI 는 `tsconfig`를 참고하지 않기 때문에 트랜스파일이 되지 않을 경우 타겟을 옵션으로 준다. `tsc -t es6 main.ts`)

`Iterators`와 `Generators`를 사용하면, 모든 피보나치 수를 저장하는 배열을 끌고 다닐 필요가 없다. 모든 피보나치 수를 
반환 받아 계속 사용해야하는 경우가 아니라면 `console.log` 한 번 출력할 때는 하나의 수만 알면 된다. 그리고 이 하나의 
수를 계산하기 위해서는 마지막 숫자 2개만 알면 된다.

그런데 개인적으로는 그냥 Closures 를 사용하는 게 낫지 않나? 생각된다.

```typescript
const fibonacci = (() => {
  let [a, b] = [0, 1];
  return () => {
    [a, b] = [b, a + b];
    return a;
  };
})();

function printFibonacci(n: number) {
  for (let i = 0; i < n; i++) {
    console.log(fibonacci());
  }
}

printFibonacci(10);
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
[Choosing Between Structures and Classes]:/swift/2022/11/21/structures-and-classes.html#h-3-choosing-between-structures-and-classes
