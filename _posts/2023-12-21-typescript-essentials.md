---
layout: post
title: TypeScript Essentials 
subtitle: 
categories: [typescript, javascript]
tags: [typescript]
---

### 1. TSC Transpiler 👩‍💻

*JavaScript* 는 *Interpreter Language* 이다. 그리고 이것을 확장한 *TypeScript* 는 웹 브라우저가 
*JavaScript* 만 이해할 수 있기 때문에 변환을 해야하는데 이 과정을 *Transpile* 이라 한다.

*Compile Language* 가 아니기 때문에 *Transpile* 이라고 구분짓기도 하고, 다른 컴파일 언어와 마찬가지로 
*Runtime* 이전에 오류를 찾아낼 수 있기 때문에 *Compile* 이라 부르는 경우도 존재한다. 아무튼 이때 사용되는 
것이 바로 `TSC`다.

*TypeScript* 는 *Global* 로 설치하거나 *Local* 로 설치할 수 있다. *Global* 로 설치했을때와 다르게 
*Local* 로 설치했을 경우 경로를 지정해줘야하며 다음 둘 중 하나를 이용해 실행할 수 있다.

```shell
./node_modules/.bin/tsc --init
```

```shell
./node_modules/typescript/bin/tsc --init
```

<br>

그 외에도 `npx`를 사용하거나

```shell
npx tsc
```

`package.json`파일을 사용해할 수 있는데, 이때는 **NPM Project** 로 만들었기 때문에`tsc`라고만 쳐도 
*Local* 로 설치한 패키지 라이브러리를 인식할 수 있다.

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

---

### 2. Basic Types 👩‍💻

#### 1. Types

__ECMAScript Types__

- Boolean
- Number
- String
- Symbol (ECMAScript 6 추가)
- Null
- Undefined
- Array (실제로는 Object)

__TypeScript Types__

- Any, Void, Never, Unknown
- Enum
- Tuple (실제로는 Object)

#### 2. Primitive Types

*Object* 와 *Reference* 형태가 아닌 `실제 값`을 저장하는 자료형을 말한다. 

- boolean
- number
- string
- symbol (ES2015)
- null
- undefined

> **JavaScript** 의 처리 방식으로 **Primitive Types** 에 내장 함수를 사용 가능하다.
> 
> ```typescript
> let name = 'Mark'
> name.toString()
> ```

<br>

*Primitive Types* 는 `literal` 값으로 *Primitive Types* 의 `Sub Types* 를 나타낼 수 있다.

```typescript
true      // Primitive Type `boolean`의 `Sub Type` 
'hello'
3.14
null
undefined
```

> `new`를 사용해 **Wrapper Object** 로 만든 **Types** 는 
> <span style="color: red;">Primitive Types 가 아니고 **Object**</span> 다.
> 
> ```typescript
> new Boolean(false)    // typeof new Boolean(false) : 'object'
> new String( 'world')  // typeof new String('world') : 'object'
> new Number (42)       // typeof new Number (42) : 'object'
> ```

> **Type Casing**
> 
> 다른 언어에서 String 과 같은 타입을 나타낼 때 대문자로 표현하는 것과 달리 TypeScript 는 Object Types 와 
> 구분하기 위해 **Primitive Types** 를 모두 `Lower-case`로 표현한다.

#### 3. boolean

```typescript
let isDone: boolean = false;
isDone = true;

console.log(typeof isDone); // 'boolean'
```

#### 4. number

*JavaScript* 와 마찬가지로 *TypeScript* 의 모든 숫자는 부동 소수점(Floating Point) 값이다.

```typescript
let decimal: number = 6;     // 10진수 리터럴
let hex: number = 0xf00d;    // 16진수 리터럴
let binary: number = 0b1010; // 2진수 리터럴
let octal: number = 0o744;   // 8진수 리터럴

let notANumber: number = NaN;
let underscoreNum: number = 1_000_000;
```

#### 5. string

*JavaScript* 와 마찬가지로 *Template String* 을 지원한다.

```typescript
let fullName: string = 'Harry Potter';
let age: number = 17;

let sentence: string = `Hello, My name is ${fullName}.

I'll be ${age + 1} years old next month.`;

console.log(sentence);
```

```console
Hello, My name is Harry Potter.

I'll be 18 years old next month.
```

#### 6. symbol

- ECMAScript2015 의 Symbol 로 `new Symbol`로 사용할 수 없다. Symbol 을 함수로 사용해서 
  `symbol` Type 을 만들어 낼 수 있다.
- Primitive Types 의 값을 담아서 사용하며, `Unique`하고, `Immutable`한 값을 만들어 
  주로 접근을 제어하는데 사용된다.

```typescript
console.log(Symbol('foo') === Symbol('foo')); // false
````

```typescript
const sym = Symbol();

const obj = {
  [sym]: 'value',
};

// console.log(obj['sym']); // TypeError
console.log(obj[sym]);
```

#### 7. null & undefined

`tsconfig` 설정을 하지 않으면 `null`과 `undefined`는 다른 모든 타입의 `subtypes`로 존재한다.

```typescript
let name: string = null;
let age: number = undefined;
```

<br>

컴파일 옵션에서 `--stringNullChecks`를 사용하면 `null`은 자기 자신에게만, `undefined`는 자기 자신과 
`void`에게만 할당할 수 있다. 만약 다른 타입이 할당할 수 있게 하려면 `Union Types`를 사용해야한다.

```typescript
let n: null = null;
let v1: void = null; // TypeError

let u: undefined = undefined
let v2: void = undefined;
```

<br>

__null__

- `null`이라는 값으로 할당된 것을 `null`이라고 한다.
- 무언가가 있는데, 사용할 준비가 덜 된 상태.
- `null` type 은 `null` 이라는 값만 가질 수 있다.
- <span style="color: red;">*Runtime* 에서 `typeof` 연산자를 이용해 알아내면, `object`를 반환</span>한다.

```typescript
let n: null = null;

console.log(n); // null
console.log(typeof n); // object
```

<br>

__undefined__

- 값을 할당하지 않은 변수는 `undefined`라는 값을 갖는다.
- 무언가가 아예 준비가 안 된 상태.
- `Object`의 *Properties* 가 없을 때도 `undefined`를 갖는다.
- <span style="color: red;">*Runtime* 에서 `typeof` 연산자를 이용해 알아내면, `undefined`를 반환</span>한다.

```typescript
let u: undefined = undefined;

console.log(u);  // undefined
console.log(typeof u); // undefined
```

#### 8. object

*TypeScript* 의 `object`는 우리가 *객체*라 부르는 것과는 조금 다르게 사용된다. *TypeScript* 에서 `object`는 
<span style="color: red;">**Primitive Types** 가 아닌 것</span>을 나타내고 싶을 때 사용하는 타입이다.

> **Non-Primitive Types**
> 
> number, string, boolean, bigint, symbol, null, undefined 가 **아닌 것**

```typescript
// created by object literal
const person1 = {
  name: 'Mark',
  age: 25,
};

// created by Object.create
const person2 = Object.create({
  name: 'Mark',
  age: 25,
});
```

> 즉, `Object.create`는 Parameters 로 `object` 또는 `null`을 받을 수 있다. 또한 JavaScript 에서 
> Array 는 Object 의 일종이기 때문에 Array 역시 넣을 수 있다.

#### 9. Array

- 같은 타입의 *elements* 를 모아 놓은 자료형을 의미한다.
- 다른 언어와 달리 `any`타입을 사용하지 않고도 `union`타입을 사용해 서로 다른 타입의 *elements* 를 모아 
  배열을 만들 수 있다.

```typescript
let list1: number[] = [1, 2, 3, 4, 5];
let list2: Array<number> = [1, 2, 3, 4, 5];
```

```typescript
let list3: (number | string)[] = [1, '2', 3, '4', 5];
let list4: Array<number | string> = [1, '2', 3, '4', 5];
```

#### 10. Tuple

JavaScript 에 `tuple`이 존재하지 않기 때문에 *Array* 를 사용해 구현한다.

```typescript
let person1: [string, number] = ['Mark', 25];
let person2: Array<string | number> = ['Mark', 25];

const [name, age] = ['Mark', 25];
```

#### 11. any

- 타입이 정해지지 않아 불가능하다는 것이 아닌 어떤 타입이어도 상관 없는 타입으로 `any.toString()`같은 것을 해도 
  에러로 인식하지 않는다.
- 따라서 *Compiler* 가 에러를 사전에 확인할 수 없기 때문에 최대한 사용하지 않아야 한다.
- `noImplicitAny` 옵션은 `any`를 의도적으로 표현하거나 명확한 타입을 지정하도록 강제해 개발자가 안전한 코드를 
  작성하도록 한다.

```typescript
function returnAny(message: any) {
  console.log(message);
}
```

위와 같은 경우 별다른 상호작용을 하거나 에러를 발생시키지 않으므로 개발자가 명시적으로 `any`를 사용할 수 있다. 
즉, `any`를 사용한다는 것은 이것이 에러를 발생시키지 않음에 대한 책임이 개발자에게 주어진다.

<br>

어떤 타입이 들어올지 모르거나 귀찮아 `any`를 사용하려 한다면 반드시 `union`타입을 사용하도록 고쳐야 한다.  
<span style="color: red;">**any** 는 **object** 를 통해 계속해서 전파</span>되기 때문이다.

```typescript
let anyType: any = {};

let alsoAny = anyType.a.b.c.d.e;
```

<br>

위와 같은 `any` 전파로 인한 누수를 막기 위해 다음과 같이 중간에 타입을 지정할 수 있다.

```typescript
function leakingAny(obj: any) {
  const a = obj.num;
  const b = a + 1;
  return b;
}

const something = leakingAny({ num: 10 });
something.indexOf('0');
```

*something* 이 `any`타입이기 때문에 에러가 발생하지 않는다.

```typescript
function leakingAny(obj: any) {
  const a: number = obj.num;
  const b = a + 1;
  return b;
}

const something = leakingAny({ num: 10 });
something.indexOf('0');  // error, Property 'indexOf' does not exist on type 'number'
```

*a* 를 `number`로 타입을 지정하는 순간 *b* 와 *something* 역시 `number`타입으로 지정된다. 따라서 `number`는 
`indexOf`를 가지고 있지 않기 때문에 컴파일러는 에러를 감지한다. 즉, `any` 누수를 막은 것이다. 하지만 이와 같은 
방식으로 `any` 누수를 막는 것은 좋은 방법이 아니다. *Type Guard* 를 사용해 `unknown`을 사용하는 것이 좋은 방법이다.

#### 12. unknown

앱을 만들다 보면 동적 콘텐츠와 같이 의도적으로 모든 값을 수락하기를 원하거나 작성할 때 모르는 변수의 타입을 묘사해야 할 수도 
있다. 이 경우 `any`를 사용해 ***Any Leaking*** 위험을 감수하는 대신 *Compiler* 와 다른 사람에게 이를 
<span style="color: red;">의도적으로 이 변수가 무엇이든 될 수 있음을 알려주는 타입</span>으로 `unknown`타입을 제공한다.

`unknown`타입은 `any`와 비슷하지만 `Type-Safe`한 코드를 작성할 수 있도록 *Compiler* 가 이를 코드를 감시할 수 있다. 
`unknown`타입은 사용하려면 *Type Guard* 를 사용해 

```typescript
declare const maybe: unknown;

if (typeof maybe === 'number') {
  const aNumber: number = maybe;
}
```

*TypeScript* 의 `unknown`타입과 *Type Guard* 는 Swift 의 
[Any 타입과 Upcating Operator 'as'][Swift Upcasting 'as'] 와 유사하다.

```swift
var things: [Any] = []

func testAnyTypes(_ things: [Any]) {
    for thing in things {
        switch thing {
        case 0 as Int:
            print("\(thing) : zero as an Int")
        case 0 as Double:
            print("\(thing) : zero as a Double")
        case let someInt as Int:
            print("\(thing) : an integer value of \(someInt)")
        case let someDouble as Double where someDouble > 0:
            print("\(thing) : a positive double value of \(someDouble)")
        case is Double:
            print("some other double value that I don't want to print")
        case let someString as String:
            print("\(thing) : a string value of \"\(someString)\"")
        case let (x, y) as (Double, Double):
            print("\(thing) : an (x, y) point at \(x), \(y)")
        case let stringConverter as (String) -> String:
            print("\(thing) : \(stringConverter("Michael"))")
        case let movie as Movie:
            print("\(thing) : a movie called \(movie.name), dir. \(movie.director)")
        case let point as Point:
            print("\(thing) : a point is at (\(point.x), \(point.y))")
        case let direction as CompassPoint:
            print("\(thing) : a direction is \(direction)")
        default:
            print("\(thing) : something else")
        }
    }
}
```

#### 13. never

보통 `return`에 사용된다.

- [null, undefined](#h-7-null--undefined)와 마찬가지로 다른 모든 타입의 `subtypes`로 존재한다.
- `never`는 주로 `return`에 사용되며, 모든 타입에 할당할 수 있다. 하지만 `never`에는 `any`를 포함해 
  그 어느 것도 할당할 수 없다.
- `never`의 이런 특성을 이용해 *Type Guard* 또는 *Conditional Types* 에 사용할 수 있다.

<br>

__`never`는 값이 아닌 타입으로만 사용될 수 있다__

```typescript
function error(message: string): never {
  throw new Error(message);
}

function fail(message: string) {
  return error(message);
}
```

<br>

__Type Guard 에 사용되기도 한다__

```typescript
declare const a: string;

if (typeof a !== 'string') {
  a; // never
}

declare const b: string | number;

if (typeof b !=='string') {
  b; // number
}
```

<br>

__Conditional Types 에 사용되기도 한다__

```typescript
type MessageOf<T extends { message: unknown }> = T['message'];

interface Email {
  message: string;
}

type EmailMessageContent = MessageOf<Email>;
// type EmailMessageContent = string
```

위 코드에서 `MessageOf`가 아무 타입이나 받을 수 있도록 하려면 `never`타입을 사용해 다음과 같이 
`Conditional Types`로 바꿀 수 있다.

 - Destructuring

```typescript
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;

interface Email {
  message: string;
}

type EmailMessageContent = MessageOf<Email>;
// type EmailMessageContent = string

interface Dog {
  bark(): void;
}

type DogMessageContent = MessageOf<Dog>;
// type DogMessageContent = never
```

- Flatten

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;
// type Flatten<T> = T extends Array<infer Item> ? Item : T;

type Str = Flatten<string[]>;
// type Str = string;

type Num = Flatten<number[]>;
// type Num = number;

type Something = Flatten<object>;
// type Something = object;

type K = Flatten<[string, number]>;
// type K = string | number;
```

- To Array

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArr = ToArray<string>;
// type StrArr = string[];

type StrArrOrNumArr = ToArray<string | number>;
// type StrArrOrNumArr = string[] | number[];
```

- To Array Non-distributed

```typescript
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

type StrArr = ToArrayNonDist<string>;
// type StrArr = string[];

type ArrOfStrOrNum = ToArrayNonDist<string | number>;
// type ArrOfStrOrNum = (string | number)[];
```

#### 14. void

값을 반환하지 않는 함수의 `Return Type`으로 사용한다. 다른 언어와 문법적인 통일성을 위해 추가된 타입으로 *JavaScript* 에 
이미 존재하는 `undefined`라는 타입과 동일하다. 함수의 *Return Type 으로 사용되는 undefined* 정도로 보면 된다. 

```typescript
function returnVoid(message: string) {
  console.log(message);
}
// function returnVoid(message: string): void

const r = returnVoid('no return');
console.log(r); // undefined
```

> `void`는 사실 `undefined`와 같다. 하지만 명시적으로 `undefined`에 할당하는 것은 불가능하다.
> 
> ```typescript
> const r: undefined = returnVoid('no return');  // error, Type 'void' is not assignable to type 'undefined'
> ```
> 
> 이로써 TypeScript 의 `void` 역시 다른 언어의 `void`와 유사하게 작동한다.

---
Reference

1. 이웅재, "한 번에 끝내는 React의 모든 것 초격차 패키지, Part 6. TypeScript Essentials" fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)
2. "Conditional Types." typescriptlang.org. accessed Dec. 23, 2023 [TypeScript - Conditional Types]

[Swift Upcasting 'as']:/swift/2023/01/14/type-casting.html#h-1-any
[TypeScript - Conditional Types]:https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
