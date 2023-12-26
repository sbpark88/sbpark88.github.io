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

### 3. Type System 👩‍💻

#### 1. Make TypeScript more Strictly

*TypeScript* 는 직접 실행할 수 있는 언어가 아니고 최종적으로 *JavaScript* 로 변환되어야 하는 언어이기 때문에 갖는 
몇 가지 한계가 있다. 어떤 한계가 있는지, 그리고 어떻게 하면 이 문제를 *compile-error* 를 발생시켜  

<br>

__noImplicitAny__

```typescript
function foo(a) {
  return a * 10
}
```

`noImplicitAny` 옵션은 위와 같이 **입력값을 `any`로 받을 수 있는 상황**에 대해 *compile-error* 를 발생시켜 
명시적으로 타입을 지정하도록 강제한다.

<br>

__strictNullChecks & noImplicitReturns__

```typescript
function foo(a: number) {
  if (a > 0) {
    return a * 10
  }
}
```

이 경우 *a* 의 타입이 지정되며 *Return Type* 이 *number* 로 추론된다. 하지만 *a* 가 양수가 아닐 경우 `void`를 
반환하게된다. 즉, `foo(-5) + 10`을 하게 되면 `undefined + 5`가 되므로 `NaN`이 된다.

이로써 *TypeScript* 의 `number`는 기본적으로 `undefined`를 포함하고 있음을 알 수 있다. 
`strictNullChecks` 옵션은 모든 타입에 자동으로 포함되어있는 `null`과 `undefined`를 제거한다. 또한 
`noImplicitReturns` 옵션은 위와 같은 리턴값 문제가 발생되지 않도록 *Return Type* 이 존재하는 경우 명시적으로 타입을 
지정하도록 강제한다.

```typescript
function foo(a: number): number {
  if (a > 0) {
    return a * 10;
  } else {
    throw new Error("Input must be a positive number");
  }
}
```

#### 2. Structural Type System & Nominal Type System

- Structural Type System: 구조가 같으면 같은 타입.
- Nominal Type System: 

<br>

__Structural Type System__

```typescript
interface IPerson {
  name: string;
  age: number;
  speak(): string;
}

type PersonType = {
  name: string;
  age: number;
  speak(): string;
}

let personInterface: IPerson = {} as any;
let  personType: PersonType = {} as any;
```

위 두 타입은 문법적 차이는 있지만 데이터를 할당할 때 동일한 타입으로 간주된다(타입을 확장하거나 할 때 문법적 차이는 존재한다).

<br>

__Nominal Type System__

`C`와 같은 언어는 구조가 같아도 이름이 다르면 다른 타입이다. 즉, *TypeScript* 는 이러한 타입 시스템을 따르지 않는다. 
만약, 이러한 타입이 필요할 경우 다음과 같이 `symbol`을 이용해 유사한 구현은 가능하다.

```typescript
type PersonId = string & { readonly brand: unique symbol }

function PersonId(id: string): PersonId {
  // id 검증 로직...
  
  return id as PersonId;
}

function getPersonById(id: PersonId) { }

getPersonById(PersonId('id-327364'));
getPersonById('id-327364');  // error TS2345
```

위와 같은 방법으로 같은 형태지만 다른 고유한 타입으로 만들 수 있다.

#### 3. Type Compatibility

```typescript
// sub1 타입은 sup1 타입의 `Sub-Type`이다.
let sub1: 1 = 1;
let sup1: number = sub1;
sub1 = sup1; // error

// sub2 타입은 sup2 타입의 `Sub-Type`이다.
let sub2: number[] = [1];
let sup2: object = sub2;
sup2 = sup2; // error

// sub3 타입은 sup3 타입의 `Sub-Type`이다.
let sub3: [number, number] = [1, 2];
let sup3: number[] = sub3;
sub3 = sup3; // error
```

*TypeScript* 의 타입 호환성은 위와 같이 다른 언어들과 크게 다르지 않다. 하지만 `function`의 타입에 대해서 하위 호환 뿐 
아니라 상위 호한까지 된다, 최종 *Runtime Code* 인 *JavaScript* 에서 이런 것이 가능하기 때문이다.

```typescript
class Person {}
class Developer extends Person { }
class JuniorDeveloper extends Developer { }

function tellMe(f: (d: Developer) => Developer) {}

// Parameter 에 Developer => Developer 를 전달.
tellMe((d: Developer): Developer => new Developer())  // OK

// Parameter 에 Person => Developer 를 전달.
tellMe((p: Person): Developer => new Developer())  // Super-Type 에 의한 Sub-Type 하위 호환

// Parameter 에 JuniorDeveloper => Developer 를 전달.
tellMe((j: JuniorDeveloper): Developer => new Developer())  // Sub-Type 이 Super-Type 을 상위 호환
```

`tellMe`의 3번째 호출은 다른 언어에서 보면 분명 잘못된 호출이다. 하지만 *TypeScript* 에서는 이것이 가능하며, 
심지어 에러가 아니다. [Make TypeScript more Strictly](#h-1-make-typescript-more-strictly) 에서 본 것처럼 
이것 역시 *compile-error* 를 발생시킬 수 있는데, `strictFunctionTypes` 옵션을 활성화 하면 된다.

> 따라서 TypeScript 에서 `noImplicitAny`, `strictNullChecks`, `noImplicitReturns`, 
> `strictFunctionTypes` 이 4개의 옵션은 안전한 코드 작성을 위해 활성화 해주도록 한다. 
> 이 옵션들은 TypeScript 를 타입에 대해 엄격한 다른 언어들과 유사한 환경을 만들어준다.

#### 4. Type Alias

`interface`와 비슷하지만 다른 언어와 마찬가지로 만들어진 타입을 `refer`로 사용하는 것이지 직접 타입을 만드는 것은 아니다. 
`interface`를 `Type Alias`로 대체하는 것이 가능한 이유는 *TypeScript* 가 `Object Literal` 그 자체를 타입으로 
정의할 수 있기 때문이다.

`interface`는 단지 *Object* 형태만 정의가 가능하지만, `type`은 더 유연하게 사용할 수 있다. 주로 *반복되는 타입*이나 
*Union Types* 를 정의할 때 사용한다.

> 명확히 이야기하면 `interface`와 `type`은 문법적으로도 기능적으로도 다르다. 하지만 대부분의 경우 **Object** 형태의 
> 타입을 정의할 때 `interface`를 사용하는 것과 `type`을 사용하는 것 모두 가능하기 때문에 실제로 이 부분에 있어서 
> 어떤 것을 사용하는 것이 더 적절한가에 대한 의견이 다양하다.
> 
> 어차피 **Structural Type System** 이기 때문에 반드시 `interface`를 써야 하거나, `type`을 써야하는 경우가 
> 아니라면 해당 앱에 대한 코딩 컨벤션을 정의하고 이에 따르도록 하면 된다.

---

### 4. TypeScript Compiler 👩‍💻

#### 1. Compilation Context

*TypeScript* 코드를 어떻게 *JavaScript* 코드로 변환할건지를 정의하는 방법으로 `tsconfig.json`을 사용하는 
것이 권장된다.

#### 2. tsconfig schema

*TypeScript* 의 버전이 올라가며 새로운 기능이 생기거나 세분화 되며 이 스키마의 크기 역시 증가하고있다. 
그 중 중요한 최상위 프로퍼티 일부를 소개하면 다음과 같다.

- compileOnSave
- extends
- compileOptions
- files
- include
- exclude
- references

`npx tsc --init`은 많이 사용되는 일부만 작성해주는 것이지 모든 것을 작성해주지는 않는다. 모든 옵션과 설명을 보려면 
[TSConfig Reference] 를 통해 확인하도록 한다. 그리고 레퍼런스 페이지에 부족한 보총 설명은
[TypeScript - tsconfig] 에 잘 정리되어 있으니 함께 참고한다.

#### 3. compileOnSave

```json
{
  "compileOnSave": true
}
```

이 옵션은 *TypeScript* 자체 *Config* 옵션이 아니다. *VS Code* 의 `Atom TypeScript` 플러그인을 설치해야 
사용할 수 있는 옵션으로 [Compile on save] 를 참고한다. 자동으로 컴파일과 저장을 수행해 문법적 에러를 발견하기 쉽도록 
해준다.

JetBrains 계열의 IDE 를 사용할 경우 IDE 설정에서 기본으로 지원한다. 

#### 4. extends

*TypeScript* 자체 *Config* 옵션이지만 기본값은 아니라 필요할 경우 작성해서 사용해야한다. 이것은 JSON 파일을 여러 
개로 나누어 확장을 통해 관리할 수 있도록 해주는 옵션이다.

- base.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}

```

- tsconfig.json

```json
{
  "extends": "./base",
  "compilerOptions": {
    
  }
}
```

이렇게 사용하면 `tsconfig.json`은 `base.json`의 내용을 확장을 통해 갖게 된다. [tsconfig / bases] 에 가면 
여러 개발 환경별로 맞춘 기본으로 사용하면 좋은 `tsconfig` 설정을 제공한다. 다음은 *CRA* 을 사용할 경우의 예시다.

```shell
npm install --save-dev @tsconfig/create-react-app
yarn add --dev @tsconfig/create-react-app
```

```json
{
  "extends": "@tsconfig/bun/tsconfig.json"
}
```

#### 5. files, include, exclude

__files__

```json
{
  "files": [
      "core.ts",
      "sys.ts",
      "types.ts",
      "scanner.ts",
      "parser.ts",
      "utilities.ts",
      "binder.ts",
      "checker.ts",
      "emitter.ts",
      "program.ts",
      "commandLineParser.ts",
      "tsc.ts",
      "diagnosticInformationMap.generated.ts"
  ]
}
```

와 같이 리스트 배열로 작성한다. 상대 경로와 절대 경로를 모두 지원하며 개별 파일 목록을 전부 입력해줘야한다. 이것은 파일의 
갯수가 적고, 컴파일 하고자 하는 파일을 지정해야할 때 유용하다.

<br>

__include & exclude__

```json
{
  "include": [
      "src/**/*"
  ],
  "exclude": [
      "node_modules",
      "**/*.spec.ts"
  ]
}
```

꼭 함께 사용할 필요는 없으나 일반적으로 위와 같은 형태로 함께 사용한다. `.gitignore` 파일처럼 `glob` 패턴을 사용할 
수 있어, 특정 경로나 패턴에 대해 전부 `include`, `exclude`를 적용할 수 있다.

<br>

__우선순위__

1. 아무런 설정을 하지 않으면 기본적으로 `node_modules`, `bower_components`, `jspm_packages`, 
   `<outDir>` 4개를 제외하고 모두 컴파일한다.
2. `exclude` 설정을 하면 이것을 제외하고 모두 컴파일한다. **1번의 기본 제외 항목은 별도로 지정해주지 않아도 
   기본적으로 제외**되기 때문에 위 경로 외 추가로 제외할 파일 또는 경로만 목록에 작성하면 된다.
3. `include` 설정을 하면 이것만 컴파일한다. 단, `<outDir>`은 포함시키더라도 강제로 제외된다.  
4. 우선순위는 `files` > `exclude` > `include` 이다. `files`에 존재하면, `exclude`에 포함되어 있더라도 
   컴파일되며, `include`에 포함되어 있더라도 `exclude`에 포함되면 컴파일에서 제외된다.

#### 6. compileOptions - typeRoots, types

__typeRoots__

*React* 라이브러리를 예로 들어보자.

```shell
npm i react
npm i -D @types/react
```

*build* 를 위해 *React* 라이브러리와, 개발 환경에서의 *TypeScript* 지원을 위한 *React 의 TypeScript* 버전을 
설치해 사용한다. 이렇듯 대부분의 라이브러리는 `@types/`를 붙여 *TypeScript* 를 지원한다.

즉, `./node_modules/@types/` 디렉토리는 특별한 경로이며, `typeRoots`를 미지정시 기본값으로 사용되는 경로다. 만약, 
이 `@types/`의 *root* 경로를 변경하고 싶다면 다음과 같이 `typeRoots` 옵션을 이용해 지정할 수 있다.

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

이제 `./typings`와 `./vendor/types` 하위 디렉토리가 모두 *TypeScript* 라이브러리의 *root* 경로가 된다. 
값을 지정했으니 이제 `./node_modules/@types`는 더이상 *TypeScript* 라이브러리의 *root* 경로가 아니다.

이것은 `@types/` 규칙을 따르지 않는 라이브러리 또는 직접 만든 *TypeScript* 라이브러리를 지원할 때 유용하다. 

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./typings", "./vendor/types"]
  }
}
```

와 같이 설정하면 기본값 경로에 추가적으로 타입 시스템을 사용할 경로를 지정할 수 있다.

<br>

__types__

`types` 옵션은 기본값이든, 명시된 값이든 `typeRoots`의 라이브러리 중 *TypeScript* 시스템을 사용할 라이브러의 
이름을 직접 명시적으로 지정하는 옵션이다.

```json
{
   "compilerOptions": {
       "types" : ["node", "lodash", "express"]
   }
}
```

이렇게 정의하면, `./node_modules/@types`에 있는 라이브러리 중 `node`, `lodash`, `express` 세 라이브러리만 
타입 시스템을 사용하고 그 외 라이브러리는 디렉토리에 존재하더라도 이 시스템에 포함되지 않는다.

만약, `[]`와 같이 빈 배열로 정의할 경우, 이 시스템을 이용하지 않겠다는 의미가 된다.

#### 7. compileOptions - target, lib

__target__

```json
{
  "compilerOptions": {
    "target": "ES5"
  }
}
```

*JavaScript* 를 사용할 때는 배포를 하기 전 ES 레벨을 어디까지 내려 배포할지 `babel` 같은 라이브러리를 사용해 변환,
배포했었다. 하지만 *TypeScript* 는 항상 배포 전 *JavaScript* 로 변환해야하기 때문에 `babel`과 같은 별도의
라이브러리 없이 직접 변환할 타겟을 설정하고 컴파일한다. 이것을 설정하는 것이 바로 `target` 옵션이다.

- ES3
- ES5
- ES6 / ES2015
- ES2016
- ...
- ES2022
- ESNext

를 설정할 수 있으며, `ESNext`는 *latest*, *last* 와 같은 의미로 사용된다. 항상 최신 버전을 타겟으로 한다. 
보통 *Node* 서버에서는 필요에 따라 버전을 올리지만 프론트엔드는 브라우저 호환성 문제로 버전을 낮추어 사용한다.

<br>

__lib__

대부분 `target`에 따라 *default* 로 설정되는 `lib`가 있기 때문에 직접 설정할 필요는 없다.

- ES3: `lib.d.ts`
- ES5: `dom`, `es5`, `scripthost`
- ES6: `dom`, `es6`, `dom.iterable`, `scripthost`

를 기본으로 사용한다. 만약, 이걸 직접 설정하려면 배열에 `lib`를 적절히 선택해 입력해야한다.

#### 8. compileOptions - outDir, outFile, rootDir

__outFile__

`module`이 `AMD` 또는 `System` 같은 형태일 때 모든 *JavaScript* 코드를 단일 파일로 컴파일할 수 있도록 하는 
옵션으로 일반적으로 `CommonJS`, `ES6` 같은 형태로 사용할 때는 사용이 불가능하다.

<br>

__outDir__

특정 디렉토리에 디렉토리 구조를 맞춰 빌드 결과물이 생성된다. 일반적으로 `dist`, `out`과 같은 이름을 붙여 사용한다.

<br>

__rootDir__

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

일반적으로 이런식으로 사용한다. `src` 디렉토리 하위의 모든 파일을 `dist` 하위에 구조를 그대로 만들어 컴파일한다. 
만약, `include`와 `exclude` 옵션이 활성화 되어있다면 이에 따라 컴파일 대상이 영향을 받는다.

#### 9. compileOptions - strict

`strict`는 반드시 `true`로 설정하는 것을 기본으로 한다. 이것을 활성화 하면 컴파일 된 *JavaScript* 파일 
상단에 `"use strict";`가 포함될 것이다. 이 옵션은 위 [Type System](#h-3-type-system-) 에서 살펴보았던, 
*TypeScript* 가 좀 더 *Type-Safe* 한 코드를 작성하도록 돕는 모든 옵션을 켜는 것을 의미한다.

- noImplicitAny
- noImplicitThis
- strictNullChecks
- strictFunctionTypes
- strictPropertyInitialization
- strictBindCallApply
- alwaysStrict

이 모든 것을 다 활성화 하는 것이다.

<br>

__noImplicitAny__

```typescript
function noImplicitAny(x) {
  return x;
}
```

명시적인 `any`는 허용되지만, 타입 추론에 의한 `any`는 허용하지 않는다.

```typescript
function noImplicitAny(x: any) {
  return x;
}
```

<br>

__noImplicitThis__

```typescript
function noImplicitThis(x: string, y: string) {
  this.x = x;
  this.y = y;

  return this;
}
```

이런식의 `this`가 없는 형태는 에러로 간주된다. *JavaScript* 의 `this`는 워낙 심오하기 때문에 변환시 잘못된 
`this`를 사용하게 되는 것을 막기 위해 명시적으로 정확한 정보의 `this`를 제공해야한다.

이것은 *Python* 의 문법과 유사하게 첫 번째 *Parameter* 로 자기 자신을 제공해야하며, 자기 자신의 타입 정보를 
포함해야한다. 

```typescript
function noImplicitThis(this: { x: string; y: string }, x: string, y: string) {
  this.x = x;
  this.y = y;

  return this;
}
```

<br>

따라서 [Constructor Function] 역시 타입만 붙여 사용하려 하면 에러가 발생하므로 명확한 `this`를 제공해야한다.

```typescript
interface IPerson {
  name: string;
  age: number;
  greet(): void;
}

function Person(this: IPerson, name: string, age: number) {
  this.name = name;
  this.age = age;

  this.greet = function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  };
}
```

**사실... 이정도로 *boiler-code* 를 많이 만들거면 차라리 `Class` 문법을 사용하거나 완전히 `함수형`으로 사용하는 것이 낫다.**

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}
```

또는

```typescript
function Person(name: string, age: number) {
  let _name = name;
  let _age = age;

  function greet() {
    console.log(`Hello, my name is ${_name} and I'm ${_age} years old.`);
  }

  return {
    greet,
  };
}
```

<br>

__strictNullChecks__

위 [Make TypeScript more Strictly](#h-1-make-typescript-more-strictly) 에서 이미 한 번 살펴보았듯이 
*TypeScript* 의 모든 타입이 기본적으로 `null`과 `undefined`를 포함하기 때문에 이것을 제외시켜주는 옵션이다.

이걸 체크해주지 않으면 모든 타입이 사실상 `Optional` 타입이 되어버린다. 필요에 의해 `Union` 타입을 이용해 
`Optional`을 만드는 것이 아닌 모든 타입이 *Optional* 이 되는 것은 결국 *JavaScript* 와 큰 차이가 없어지는 
것이다.

<br>

__strictFunctionTypes__

[Type Compatibility](#h-3-type-compatibility) 에서 살펴본 것처럼 *TypeScript* 는 다른 언어와 달리 
기본적으로 *Sub-Type* 이 *Super-Type* 을 상위 호환하는 것이 가능한 문제를 제거하는 옵션이다.

__strictPropertyInitialization__

```typescript
class Person {
  private name: string;
  private age: number;

  constructor() { }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}
```

와 같이 *Class* 의 *Properties* 를 초기화 하지 않을 경우 에러를 발생시키는 옵션으로, *TypeScript* 의 
*Class* 를 좀 더 *Class* 답게 만들어주는 옵션이다.

반드시 생성자를 사용해 초기화를 시켜주거나

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}
```

기본값을 제공해야한다.

```typescript
class Person {
  private name: string = 'John';
  private age: number = 23;

  constructor() {}

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}
```

<br>

*Classes* 의 초기화는 에러에 의해 실패할 수도 있지만, 의도적으로 지연시켜야 할 필요가 있는 경우도 있다. 초기화를 하는 
동안 값을 설정할 수 없어 [Optional Property Types] 를 필요로 하는 경우다. *TypeScript* 역시 이를 지원하며, 
`?` 또는 `!`를 적절히 사용해 *Classes* 를 생성하며, *Properties* 의 초기화를 지연시킬 수 있다. 물론, 이에 대한 
책임이 개발자에게 주어진다.

```typescript
class Person {
  private name!: string;
  private age?: number;

  constructor() {}

  async init(name: string, age?: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}
```

<br>

__strictBindCallApply__

`Function`의 내장 함수인 `bind`, `call`, `apply`를 사용할 때 `this`를 좀 더 엄격하게 체크하도록 하는 옵션이다.

```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const jane = new Person('Jane', 30);
const peterGreet = jane.greet.bind({ name: 'Peter', age: 36 });
jane.greet.call({ name: 'Mike', age: 27 });
peterGreet();
```

```console
Hello, my name is Mike and I'm 27 years old.
Hello, my name is Peter and I'm 36 years old.
```

근데 사실 이건 뭐가 더 엄격해지는건지 잘 모르겠다.

__alwaysStrict__

컴파일되는 모든 *JavaScript* 파일 상단에 `"use strict"`를 포함시켜 런타임 엔진이 코드를 `strict` 모드로 분석하도록 
하는 옵션이다.

---
Reference

1. 이웅재, "한 번에 끝내는 React의 모든 것 초격차 패키지, Part 6. TypeScript Essentials" fastcampus.co.kr. last modified unknown, [Fast Campus](https://fastcampus.co.kr/)
2. "Conditional Types." typescriptlang.org. accessed Dec. 23, 2023, [TypeScript - Conditional Types]
3. "Intro to the TSConfig Reference." typescriptlang.org. accessed Dec. 24, 2023, [TypeScript - TSConfig Reference][TSConfig Reference]
4. "Compile on save." GitHub. Dec. 24, 2023, [https://github.com/TypeStrong/atom-typescript#compile-on-save][Compile on save]
5. "tsconfig.json." TypeScript. access Dec. 24, 2023, [[TypeScript - tsconfig]]

[Swift Upcasting 'as']:/swift/2023/01/14/type-casting.html#h-1-any
[TypeScript - Conditional Types]:https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
[TSConfig Reference]:https://www.typescriptlang.org/tsconfig
[Compile on save]:https://github.com/TypeStrong/atom-typescript#compile-on-save
[tsconfig / bases]:https://github.com/tsconfig/bases
[TypeScript - tsconfig]:https://typescript-v2-163.ortam.vercel.app/docs/handbook/tsconfig-json.html
[Constructor Function]:/javascript/2023/04/14/prototype.html#h-1-object-constructor-function
[Optional Property Types]:/swift/2022/12/01/initialization.html#h-4-optional-property-types
