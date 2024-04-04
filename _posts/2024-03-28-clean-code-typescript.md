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
type BankAccount = {
  balance: number;
  // ...
}

const value = 100;
const account: BankAccount = {
  balance: 0,
  // ...
};

if (value < 0) {
  throw new Error('Cannot set negative balance.');
}

account.balance = value;
```

- Good

```typescript
class BankAccount {
  private accountBalance: number = 0;

  get balance(): number {
    return this.accountBalance;
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error('Cannot set negative balance.');
    }

    this.accountBalance = value;
  }

  // ...
}

// Now `BankAccount` encapsulates the validation logic.
// If one day the specifications change, and we need extra validation rule,
// we would have to alter only the `setter` implementation,
// leaving all dependent code unchanged.
const account = new BankAccount();
account.balance = 100;
```

[ES6 Class Getter/Setter] 에서도 한 번 설명했듯이 ES6 부터 `getter`, `setter`를 사용할 수 있게 되었으며, Swift 의
[Computed Properties] 와 유사하다.

`Lazy Stored Properties`, `Property Observers`, `Property Wrappers`와 같은 좀 더 다양한 기능이 제공되지 않는 것은 
조금 아쉽지만 Java 처럼 `getter`, `setter`를 메서드를 구현해 사용해야 하는 것에 비하면 매우 편리하다. TypeScript 에서 
`getter`, `setter`를 사용해 얻을 수 있는 이익은 다음과 같다.

- `setter`에 validation check 추가하기.
- 내부 API 를 캡슐화.
- Log 남기기.
- 에러 처리.
- lazy loading

물론, 위 기능은 모두 메서드를 사용해 구현할 수 있다. 하지만 `getter`, `setter`가 존재한다는 것은 메서드는 비즈니스 로직을 처리하고, 
`getter`, `setter`는 그냥 properties 에 접근하듯이 사용하면서 전처리기/후처리기를 캡슐화 해 제공할 수 있다는 데 있다. 따라서 
일반적인 비즈니스 로직과 시각적으로 분리가 되기 때문에 가독성 높은 코드를 제공함은 물론이고, 메서드에 집중할 수 있게 해준다.

#### 2. Make objects have private/protected members

- Bad

```typescript
class Circle {
  radius: number;
  
  constructor(radius: number) {
    this.radius = radius;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

- Good

```typescript
class Circle {
  constructor(private readonly radius: number) {}

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

JavaScript 에서 ES5 까지는 private 을 표현하기 위해 암묵적으로 `_` 를 붙이곤 했다. 그러다 ES6 에서 공식적으로 `private`을 위해 
`#`이 제공되었다. 그런데 TypeScript 에서는 더 나아가 Access Control 을 위한 `protected`, `private`을 제공한다.

#### 3. Prefer immutability

꼭 함수형 프로그래밍을 하지 않더라도, 모던 프로그래밍에서 `Immutable`은 매우 중요한 개념이다. CPU 나 메모리가 충분해진 시점에서 
극도로 아끼는 것 보다는 자원을 조금 더 사용하는 대신 안전한 프로그래밍을 하는 것이 훨씬 큰 장점을 갖기 때문이다. 꼭 필요한 경우가 
아니라면 `Immutable`을 선호하도록 하며, 크게 3가지 방법을 제공한다.

<br>

__1 ) `readonly` modifier__

- Bad

```typescript
interface Config {
  host: string;
  port: string;
  db: string;
}
```

- Good

```typescript
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

TypeScript 는 `Interfaces`와 `Classes`의 개별 **properties** 에 `readonly`를 제공해 `Immutable`을 제공할 수 있다. 

<br>

__2 ) Built-in Types support `readonly` that takes a type `T`__

- Bad

```typescript
const array: number[] = [ 1, 3, 5 ];
array = []; // error
array.push(100); // array will be updated
```

- Good

```typescript
const array: ReadonlyArray<number> = [ 1, 3, 5 ];
array = []; // error
array.push(100); // error
```

`Types` 자체가 `readonly`로 작동하는 내장 타입(`ReadonlyArray`, `ReadonlyMap`, `ReadonlySet`)을 
사용해 `Immutable`을 제공할 수 있다.

<br>

__3 ) Prefer `const assertions` for literal values__

- Bad

```typescript
const config = {
  hello: 'world'
};
config.hello = 'world'; // value is changed

const array  = [ 1, 3, 5 ];
array[0] = 10; // value is changed

// writable objects is returned
function readonlyData(value: number) {
  return { value };
}

const result = readonlyData(100);
result.value = 200; // value is changed
```

- Good

```typescript
// read-only object
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // error

// read-only array
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // error

// You can return read-only objects
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // error
```

`as const`는 대부분의 타입을 `Immutable`로 만들 수 있는 매우 강력한 도구다.

위에서 설명한 `ReadonlyArray<T>`와 `as const` 모두 `Immutable`을 제공할 수 있으며, 
두 케이스의 타입은 다음과 같다.

```typescript
const array1: ReadonlyArray<number> = [1, 3, 5]; // `interface ReadonlyArray<T>` 타입
const array2 = [1, 3, 5] as const;               // `readonly [1, 3, 5]` 타입
```

#### 4. type vs. interface

- Bad

```typescript
interface EmailConfig {
  // ...
}

interface DbConfig {
  // ...
}

interface Config {
  // ...
}

//...

type Shape = {
  // ...
}
```

- Good

```typescript
type EmailConfig = {
  // ...
}

type DbConfig = {
  // ...
}

type Config  = EmailConfig | DbConfig;

// ...

interface Shape {
  // ...
}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

`Uion` 또는 `Intersection`이 필요할 때는 `type`을, `extends` 또는 `implements`가 필요할 때는 `interface`를 
사용하라고 말한다.

단독으로 사용될 때는 어떤걸 사용하든 무관하다. 다만 기능에 차이가 있기 때문에 단독 사용이 아닐 경우 확장성을 고려해 사용하면 된다.

[Stackoverflow - Interfaces vs Types in TypeScript] 의 답변을 추가한다.

![Interfaces vs Types in TypeScript](/assets/images/posts/2024-03-28-clean-code-typescript/interfaces-vs-types-in-typescript.png)

---

### 4. Classes 👩‍💻

#### 1. Classes should be small

- Bad

```typescript
class Dashboard {
  getLanguage(): string { /* ... */ }
  setLanguage(language: string): void { /* ... */ }
  showProgress(): void { /* ... */ }
  hideProgress(): void { /* ... */ }
  isDirty(): boolean { /* ... */ }
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  addSubscription(subscription: Subscription): void { /* ... */ }
  removeSubscription(subscription: Subscription): void { /* ... */ }
  addUser(user: User): void { /* ... */ }
  removeUser(user: User): void { /* ... */ }
  goToHomePage(): void { /* ... */ }
  updateProfile(details: UserDetails): void { /* ... */ }
  getVersion(): string { /* ... */ }
  // ...
}

```

- Good

```typescript
class Dashboard {
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  getVersion(): string { /* ... */ }
}

// split the responsibilities by moving the remaining methods to other classes
// ...
```

Classes 의 크기는 책임(responsibility)에 의해 측정되며, [SRP](#h-1-single-responsibility-principle-srp) 에 
따르면 Classes 는 작아야 한다.

#### 2. High cohesion and low coupling

- Bad

```typescript
class UserManager {
  // Bad: each private variable is used by one or another group of methods.
  // It makes clear evidence that the class is holding more than a single responsibility.
  // If I need only to create the service to get the transactions for a user,
  // I'm still forced to pass and instance of `emailSender`.
  constructor(
    private readonly db: Database,
    private readonly emailSender: EmailSender) {
  }

  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId });
  }

  async sendGreeting(): Promise<void> {
    await emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

`private` properties `db`와 `emailSender`가 동시에 사용되지 않는데 굳이 하나의 Class 에 함께 있을 필요가 
있을까? 두 개의 Classes 로 분리하자!

- Good

```typescript
class UserService {
  constructor(private readonly db: Database) {
  }

  async getUser(id: number): Promise<User> {
    return await this.db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await this.db.transactions.find({ userId });
  }
}

class UserNotifier {
  constructor(private readonly emailSender: EmailSender) {
  }

  async sendGreeting(): Promise<void> {
    await this.emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await this.emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

- 응집도(cohesion): Classes 의 `properties`가 서로에게 연관되어 있는 정도.
- 결합도(coupling): 두 Classes 가 서로에게 관련되어있거나 종속적인 정도.

응집도는 높이고, 결합도는 낮춰라!

#### 3. Prefer composition over inheritance

- Bad

```typescript
class Employee {
  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  // ...
}

// Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData extends Employee {
  constructor(
    name: string,
    email: string,
    private readonly ssn: string,
    private readonly salary: number) {
    super(name, email);
  }

  // ...
}
```

직원의 세금 데이터는 직원이 아니다!

- Good

```typescript
class Employee {
  private taxData: EmployeeTaxData;

  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  setTaxData(ssn: string, salary: number): Employee {
    this.taxData = new EmployeeTaxData(ssn, salary);
    return this;
  }

  // ...
}

class EmployeeTaxData {
  constructor(
    public readonly ssn: string,
    public readonly salary: number) {
  }

  // ...
}
```

직원의 세금 데이터는 합성을 통해 직원 클래스를 의존성 주입 받는다. 직원의 세금 데이터는 자신에게 필요한 직원 정보에 
접근할 수 있지만 더이상 직원이 아니다.

<br>

`Gang of Four`의 디자인 패턴에 의하면 대부분의 경우 `Inheritance`보다 `Compoisition`를 선호해야한다. 
그래야 응집도는 높이고, 결합도를 낮출 수 있기 때문이다.

> Inheritance 가 더 유용한 예는 다음과 같다.
> 
> - `has-a` 관계가 아닌 `is-a`관계일 때(i.e. Human -> Animal).
> - `Base Class`의 코드를 재사용 할 수 있을 경우(i.e. Animal 에 구현된 `eat`은 Human 이 재사용 할 수 있다).
> - `Base Class`를 변경해 파생된 클래스(derived classes)를 모두에 적용하려는 경우.

#### 4. Use method chaining

- Bad

```typescript
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): void {
    this.collection = collection;
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields;
  }

  build(): Query {
    // ...
  }
}

// ...

const queryBuilder = new QueryBuilder();
queryBuilder.from('users');
queryBuilder.page(1, 100);
queryBuilder.orderBy('firstName', 'lastName');

const query = queryBuilder.build();
```

- Good

```typescript
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): this {
    this.collection = collection;
    return this;
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields;
    return this;
  }

  build(): Query {
    // ...
  }
}

// ...

const query = new QueryBuilder()
  .from('users')
  .page(1, 100)
  .orderBy('firstName', 'lastName')
  .build();
```

Array 에 `map`, `filter`, `toSorted`, `reduce` 와 같은 `Method Channing`을 써보면 매우 좋다는 것을 
느낄 수 있다. Custom Classes 에 Method Channing 을 제공하는 것은 별로 어려운 일이 아니다. 단순히 
Method Channing 을 제공하는 것은 `Monad`와 달리 lift 시킬 필요가 없어 Functor, Applicative Functor, 
Monad 를 구현할 필요가 없다. 단지 `return this;`를 하는 것 만으로 충분하다!

---

### 5. SOLID 👩‍💻

#### 1. Single Responsibility Principle (SRP)

- Bad

```typescript
class UserSettings {
  constructor(private readonly user: User) {
  }

  changeSettings(settings: UserSettings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

- Good

```typescript
class UserAuth {
  constructor(private readonly user: User) {
  }

  verifyCredentials() {
    // ...
  }
}


class UserSettings {
  private readonly auth: UserAuth;

  constructor(private readonly user: User) {
    this.auth = new UserAuth(user);
  }

  changeSettings(settings: UserSettings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

[Prefer composition over inheritance](#h-3-prefer-composition-over-inheritance) 에서 Inheritance 대신 
Composition 을 사용해 의존성을 주입하는 방법으로 클래스의 책임을 나누었다. 마찬가지로 상속이 아닌 단일 클래스 역시 서로 다른 
책임을 하나의 클래스가 갖고 있다면 Composition 을 사용한 의존성 주입을 통해 책임을 나눌 수 있다.

> - 함수가 하나의 역할만 수행하는 것과 마찬가지로 클래스 역시 하나의 책임을 가지고 있어야 한다.
> - 클래스가 비대해지면 명확한 책임을 정의하고, 그 외 것들은 별도 클래스로 분리한다.
> - 응집도 있는 클래스를 만들어라.

#### 2. Open/Closed Principle (OCP)

- Bad

```typescript
class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    if (this.adapter instanceof AjaxAdapter) {
      const response = await makeAjaxCall<T>(url);
      // transform response and return
    } else if (this.adapter instanceof NodeAdapter) {
      const response = await makeHttpCall<T>(url);
      // transform response and return
    }
  }
}

function makeAjaxCall<T>(url: string): Promise<T> {
  // request and return promise
}

function makeHttpCall<T>(url: string): Promise<T> {
  // request and return promise
}
```

- Good

```typescript
abstract class Adapter {
  abstract async request<T>(url: string): Promise<T>;

  // code shared to subclasses ...
}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // request and return promise
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // request and return promise
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    const response = await this.adapter.request<T>(url);
    // transform response and return
  }
}
```

`Software Entities`(classes, modules, functions, etc.) 는 확장에는 열려있고, 수정에는 닫혀있어야한다는 
원칙으로, 위 코드는 `fetch` 메서드가 두 개의 역할을 하고 있으며, 비슷한 기능인데도 불구하고 주입된 Adapter 에 따라 
`makeAjaxCall`와 `makeHttpCall`를 호출하도록 기능이 수정되고 있다. 공통 기능을 Base 로 두고 상속을 통해 확장시켜 
`fetch` 메서드가 어댑터의 `request`를 호출하도록 해 하나의 역할만 하도록 수정되었다.

> - 클래스, 모듈, 함수는 확장을 위해 열려있어야하고, 수정에는 닫혀있어야한다(=수정은 상속을 통해 이루어져야한다).
> - 즉, 쉽게 확장 가능해야하고, 수정에 영향을 안 받아야한다.
> - 상위 레벨의 클래스가 하위 레벨의 클래스 수정에 영향을 받으면 곤란하다.

#### 3. Liskov Substitution Principle (LSP)

근본적으로 이 문제가 발생하는 원인은 Classes 가 갖는 강력한 기능 때문인데, 어떤 Types 의 Instance 인지를 확인하는 것은 물론, 
`Upcasting`, `Downcasting`을 명시적으로든 암시적으로든 사용함으로써 코드의 유연성을 높이고 재사용 가능하도록 만든다.

문제는 이 강력한 기능은 올바른 상속 설계가 되었을 때 강력한 것이지, 잘못된 설계는 논리적 오류를 범하게 되는 문제가 있고, `LSP`는 
이에 대한 문제를 지적하고 주의를 주는 것이다. 대표적인 예시인 `Rectangle`과 `Square`을 보자.

- Bad

```typescript
class Rectangle {
  constructor(protected width: number = 0, protected height: number = 0) {}

  get area(): number {
    return this.width * this.height;
  }

  setWidth(width: number): this {
    this.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.height = height;
    return this;
  }
}

class Square extends Rectangle {
  setWidth(width: number): this {
    this.width = width;
    this.height = width;
    return this;
  }

  setHeight(height: number): this {
    this.width = height;
    this.height = height;
    return this;
  }
}
```

```typescript
const square: Square = new Square(7, 5);
console.log(square.area); // 35
// 응? 정사각형인데 width 와 height 가 다르게 생성된다.
// 정사각형의 인스턴스가 직사각형이 되었다.

const rect: Rectangle = new Square().setWidth(4).setHeight(8);
console.log(rect.area); // 64
// 응? 정사각형의 인스턴스가 직사각형이 되는 것도 모자라 넓이가 이상하다?
```

OOP 는 현실 세계를 투영하는 것에서 출발해 만들어졌다. 대표적인 예제로 자판기의 여러 기능을 클래스로 설명하는 코드를 흔히 
볼 수 있다. 문제는 우리나 현실에서 논리적으로 옳다고 생각되는 것들이 <span style="color: red;">반드시 프로그래밍 
세계에서도 적용되는 것이 아니라는 것</span>이다.

수학적으로 사각형이라는 최상위 집합 안에는 사다리꼴도 있고, 마름모도 있고, 직사각형도 있고, 정사각형도 있다. 그리고 
정사각형은 직사각형의 집합 내에 존재한다. 수학에서 보면 `사각형 ⊃ 직사각형 ⊃ 정사각형`이며, 논리적으로 타당하다. 그래서 
이 개념을 사용해 `정사각형 -> 직사각형`으로 상속 관계를 정의했다. <span style="color: red;">바로 이것이 문제다!</span>

- Good

```typescript
interface Shape {
  get area(): number;
}

class Rectangle implements Shape {
  constructor(protected width: number = 0, protected height: number = 0) {}

  get area(): number {
    return this.width * this.height;
  }

  setWidth(width: number): this {
    this.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.height = height;
    return this;
  }
}

class Square implements Shape {
  constructor(protected length: number = 0) {}

  get area(): number {
    return this.length * this.length;
  }

  setLength(length: number): this {
    this.length = length;
    return this;
  }
}
```

```typescript
const shape: Shape = new Rectangle(7, 5);
console.log(shape.area); // 35
```

```typescript
const shape: Shape = new Square().setLength(6);
console.log(shape.area); // 36
```

잘못된 상속 구조를 제거해 정상적으로 넓이를 구할 수 있게 되었다.

> - 상속에는 원칙이 존재해야한다. 잘못된 상속 관계를 만들지 말라.
> - 잘못된 상속의 예는 위 `Rectangle`, `Square`의 상속 관계와 같다.
>   - OOP 가 현실을 투영해 만들어졌지만, 현실 세계에서의 관계를 그대로 프로그래밍에 적용하면 위와 같은 문제가 발생한다.
>   - 프로그래밍 코드의 흐름 상 올바른 상속 관계인지를 생각해야한다.

#### 4. Interface Segregation Principle (ISP)

- Bad

```typescript
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // ...
  }  
  
  fax() {
    throw new Error('Fax not supported.');
  }

  scan() {
    throw new Error('Scan not supported.');
  }
}
```

- Good

```typescript
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```

[Classes should be small](#h-1-classes-should-be-small), [SRP](#h-1-single-responsibility-principle-srp) 
와 많은 관련이 있다. 인터페이스 역시 책임을 분산시키고 크기를 줄여야한다. 

> - 단일 책임 원치고가 많은 관련이 있다.
> - 불필요한 구현을 강제하지 않도록 해야 한다. 이는 불필요한 노출로 이어진다.
> - 인터페이스 역시 하나의 책임을 갖도록 분리하라.

#### 5. Dependency Inversion Principle (DIP)

과거에는 상위 레벨이 하위 레벨에 의존했다. 시스템 규모가 작을 때는 문제가 되지 않는데 시스템이 커지고, 협업을 하면서 이러한 구조는 
너무 코드의 수정을 어렵게 만들었다. 그래서 이 문제를 해결하고자 상위 레벨은 하위 레벨에 대해 몰라야하며, 하위 레벨이 상위 레벨에 
의존하도록 관계를 역전시켰다. 상위 레벨이 하위 레벨에 의존하지 않는다는 것은 곧 세부사항을 위해서는 상위 레벨이 아닌 하위 레벨로 
확장을 통해 구현해야한다는 것을 의미한다. 즉, [OCP](#h-2-openclosed-principle-ocp) 와 연관된다고 볼 수 있다.

> - 상위 레벨 모듈은 하위 레벨 모듈에 의존하지 않는다.
> - 과거에는 상위 레벨 모듈이 하위 레벨에 의존하고 있었고, 요즘은 이런 의존 관계가 역전(Inversion) 되었다.
> - Dependency Injection 을 잘 활용한다.
> - Facade 패턴을 활용한다.

---

### 6. Testing 👩‍💻

#### 1. The three laws of TDD

1. `fail` 단위 테스트가 통과될 때 까지 `production code`를 작성하지 마라.
2. 컴파일 실패는 그냥 실패다. 코드의 실행이 실패할 정도로만 `fail` 단위 테스트를 작성하라.
3. `fail` 단위 테스트를 통과하기에 충분한 것 이상의 `production code`를 작성하지 마라.

#### 2. F.I.R.S.T. rules

- `Fast`: 테스트는 자주 실행되므로 빨라야 한다.
- `Independent`: 테스트는 서로 종속적이지 않아야한다. 독립적으로 실행하든, 순서를 바꾸어 실행하든 동일한 결과가 나와야한다.
- `Repeatable`: 테스트는 어떤 환경에서든 반복될 수 있으며, 이것이 테스트 실패에 이유가 되어서는 안 된다.
- `Self-Validating`: 테스트 결과는 `Passed`, `Failed`로만 나와야한다. 테스트가 성공이라면 로그 파일을 비교할 필요가 없다.
- `Timely`: `Unit Tests -> Production Code`순으로 작성해라. 반대가 되어서는 안 된다.

#### 3. Single concept per test

- Bad

```typescript
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles date boundaries', () => {
    let date: AwesomeDate;

    date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));

    date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));

    date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

- Good

```typescript
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles 30-day months', () => {
    const date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));
  });

  it('handles leap year', () => {
    const date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));
  });

  it('handles non-leap year', () => {
    const date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

테스트 역시 [SRP](#h-1-single-responsibility-principle-srp) 를 따라야한다. 단위 테스트 하나 당 하나의 `assert`를 
작성하라.

#### 4. The name of the test should reveal its intention

- Bad

```typescript
describe('Calendar', () => {
  it('2/29/2020', () => {
    // ...
  });

  it('throws', () => {
    // ...
  });
});
```

- Good

```typescript
describe('Calendar', () => {
  it('should handle leap year', () => {
    // ...
  });

  it('should throw when format is invalid', () => {
    // ...
  });
});
```

[Function names should say what they do](#h-3-function-names-should-say-what-they-do) 와 마찬가지로, 
테스트가 실패했을 때 이름을 보고 어떤 테스트가 실패한 것인지 알 수 있어야 한다.

---

### 7. Concurrency 👩‍💻

#### 1. Prefer promises vs callbacks

- Bad

```typescript
import { get } from 'request';
import { writeFile } from 'fs';

function downloadPage(url: string, saveTo: string, callback: (error: Error, content?: string) => void) {
  get(url, (error, response) => {
    if (error) {
      callback(error);
    } else {
      writeFile(saveTo, response.body, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null, response.body);
        }
      });
    }
  });
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html', (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log(content);
  }
});
```

- Good

```typescript
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url)
    .then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));  
```

비동기로 작동하는 코드의 순서를 보장하기 위한 콜백 지옥(callback hell)에서 탈출하자. Promise 를 사용하면, callback 을 
중첩하지 않더라도 `then, then, then, catch...` 와 같이 순서를 보장할 수 있다.

| Pattern                  | Description                         |
|--------------------------|-------------------------------------|
| `Promise.resolve(value)` | Promise 로 wrapping 된 success 응답을 반환 |
| `Promise.reject(error)`  | Promise 로 wrapping 된 fail 응답을 반환    |
| `Promise.all(promises)`  | Promise 를 배열로 병렬 처리해 응답을 반환         |
| `Promise.race(promises)` | Promise 를 배열로 요청해 가장 먼저 온 응답을 반환    |

`Promise.race`는 timeout 을 쉽게 구현할 수 있게 해준다.

#### 2. Async/Await are even cleaner than Promises

- Bad

```typescript
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = util.promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));  
```

- Good

```typescript
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

async function downloadPage(url: string): Promise<string> {
  const response = await get(url);
  return response;
}

// somewhere in an async function
try {
  const content = await downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin');
  await write('article.html', content);
  console.log(content);
} catch (error) {
  console.error(error);
}
```

async/await 은 Promise 코드를 일반 절차 지향적인 Synchronous 코드로 보이도록 만들어준다.

---

### 8. Error Handling 👩‍💻

#### 1. Always use Error for throwing or rejecting

- Bad

```typescript
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.';
}

function get(): Promise<Item[]> {
  return Promise.reject('Not implemented.');
}
```

- Good

```typescript
function calculateTotal(items: Item[]): number {
  throw new Error('Not implemented.');
}

function get(): Promise<Item[]> {
  return Promise.reject(new Error('Not implemented.'));
}

// 또는 아래와 동일합니다:

async function get(): Promise<Item[]> {
  throw new Error('Not implemented.');
}
```

JavaScript 는 에러 타입 없이 단순 문자열을 에러로 던질 수 있다. 이것은 좋은 방법이 아니다. 에러는 항상 `Error` 객체로 
반환하자. 그래야 `catch`를 제대로 쓸 수 있다.

다른 대안으로는 `throw`와 `catch`를 사용하는 대신 `Custom Objects`를 반환하는 것이다.

```typescript
type Result<R> = { isError: false, value: R };
type Failure<E> = { isError: true, error: E };
type Failable<R, E> = Result<R> | Failure<E>;

function calculateTotal(items: Item[]): Failable<number, 'empty'> {
  if (items.length === 0) {
    return { isError: true, error: 'empty' };
  }

  // ...
  return { isError: false, value: 42 };
}
```

#### 2. Don't ignore caught errors

- Bad

```typescript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// or even worse

try {
  functionThatMightThrow();
} catch (error) {
  // ignore error
}
```

- Good

```typescript
import { logger } from './logging'

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}
```

`catch`의 에러 처리를 비워두지 말자. 에러가 발생해도 발생한 줄도 모르고 코드가 잘 돌아가고 있다고 착각하게 된다.

#### 3. Don't ignore rejected promises

- Bad

```typescript
getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    console.log(error);
  });
```

- Good

```typescript
import { logger } from './logging'

getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    logger.log(error);
  });

// or using the async/await syntax:

try {
  const user = await getUser();
  await sendEmail(user.email, 'Welcome!');
} catch (error) {
  logger.log(error);
}
```

[Don’t ignore caught errors](#h-2-dont-ignore-caught-errors) 와 같은 말이다. 비동기로 작동하는 Promise 의 
`reject` 역시 무시하지 말아라.

---

### 9. Formatting 👩‍💻

#### 1. Migrating from TSLint to ESLint

많은 프로그래밍 언어는 `Lint`를 제공한다. 다양한 언어를 제공하는 `SonarLint`와 같은 것들도 있지만, JavaScript/TypeScript 
에서 가장 많이 사용되는 것으 `ESLint`다. 만약 아직 `TSLint`를 사용중이라면 deprecated 되었으므로 `ESLint`로 교체하자.

#### 2. Use consistent capitalization

- Bad

```typescript
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restore_database() {}

type animal = { /* ... */ }
type Container = { /* ... */ }
```

- Good

```typescript
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

const discography = getArtistDiscography('ACDC');
const beatlesSongs = SONGS.filter((song) => isBeatlesSong(song));

function eraseDatabase() {}
function restoreDatabase() {}

type Animal = { /* ... */ }
type Container = { /* ... */ }
```

한 마디로, 일관적이게 작성하라는 말이다. Coding Convention 을 만들고 적용해라. 일반적으로 Classes, Interfaces, 
Types, Namespaces 는 `PascalCase`를 사용하고, Variables, Functions, Properties 와 같은 것들은 
`camelCase`를 사용하며, Constants 는 `SNAME_CASE`를 사용한다.

#### 3. Function callers and callees should be close

- Bad

```typescript
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

- Good

```typescript
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

호출 하는 함수 아래 호출 당하는 함수를 위치시키는 것이 가장 이상적이다. 우리는 위에서 아래로 읽어 내려가기 때문이다.

#### 4. Organize imports

- Bad

```typescript
import { TypeDefinition } from '../types/typeDefinition';
import { AttributeTypes } from '../model/attribute';
import { Customer, Credentials } from '../model/types';
import { ApiCredentials, Adapters } from './common/api/authorization';
import fs from 'fs';
import { ConfigPlugin } from './plugins/config/configPlugin';
import { BindingScopeEnum, Container } from 'inversify';
import 'reflect-metadata';
```

- Good

```typescript
import 'reflect-metadata';

import fs from 'fs';
import { BindingScopeEnum, Container } from 'inversify';

import { AttributeTypes } from '../model/attribute';
import { TypeDefinition } from '../types/typeDefinition';
import type { Customer, Credentials } from '../model/types';

import { ApiCredentials, Adapters } from './common/api/authorization';
import { ConfigPlugin } from './plugins/config/configPlugin';
```

의존성을 빠르게 확인하기 위해 그룹화 하고, 알파벳 순으로 배치하도록 한다.

1. Grouping 처리하기. Grouping 순서는 아래와 같다.
    1. Polyfills: `import 'reflect-metadata'`
    2. Node builtin modules: `import fs from 'fs'`
    3. external modules: `import { query } from 'itiriri'`
    4. internal modules: `import { UserService } from 'src/services/userService'`
    5. modules from a parent directory: `import foo from '../foo'; import qux from '../../foo/qux'`
    6. modules from the same or a sibling's directory: `import bar from './bar'; import baz from './bar/baz'`
2. 그룹 내에서는 알파벳 순으로 정리한다.
    1. from 이하 모듈의 이름을 알파벳으로 정렬한다.
    2. 불러올 대상 `{  }`의 이름 역시 알파벳으로 정렬한다.

#### 5. Use typescript aliases

- Bad

```typescript
import { UserService } from '../../../services/UserService';
```

- Good

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@services": [
        "services/*"
      ]
    }
  }
}
```

```typescript
import { UserService } from '@services/UserService';
```

컴파일 옵션을 사용하자. 간편할 뿐 아니라 가독성도 좋아진다.

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
   last modified Sep. 10, 2020, [Line Engineering - TypeScript enum].
5. "Interfaces vs Types in TypeScript.", stackoverflow. Nov. 24, 2021, [Stackoverflow Question and Answer](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/54101543#54101543).

[TypeScript Docs - Enums]:https://www.typescriptlang.org/ko/docs/handbook/enums.html
[Line Engineering - TypeScript enum]:https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking
[Choosing Between Structures and Classes]:/swift/2022/11/21/structures-and-classes.html#h-3-choosing-between-structures-and-classes
[ES6 Class Getter/Setter]:/javascript/2023/04/14/prototype.html#h-1-es6-class-gettersetter
[Computed Properties]:/swift/2022/11/22/properties.html#h-2-computed-properties-
[Stackoverflow - Interfaces vs Types in TypeScript]:(https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/54101543#54101543)
