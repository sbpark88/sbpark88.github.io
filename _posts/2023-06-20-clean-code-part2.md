---
layout: post
title: Destructuring
subtitle: Clean Code - Part 2
excerpt_image: NO_EXCERPT_IMAGE
categories: [cs, swift, typescript, javascript]
tags: [cs, swift, typescript, clean code, destructuring]
---

### 1. TypeScript - Tuple & Array 👩‍💻

#### 1. Assignment

JavaScript 에는 Tuple 이 존재하지 않기 때문에 TypeScript 에서는 그냥 JavaScript Array 가 복수의 Types 를 담을 수 있다는 것을 
이용해 Tuple 로 사용하기 때문에 Tuple 과 Array 는 동일하게 사용이 가능하다.

```typescript
const [foo, bar] = ["나무", "호그와트"]

console.log(foo)  // 나무
console.log(bar)  // 호그와트
```

위 코드는 다음과 같다.

```typescript
const foo = "나무"
const bar = "호그와트"

console.log(foo)  // 나무
console.log(bar)  // 호그와트
```

물론 이렇게 사용할 수도 있다.

```typescript
const some = ["나무", "호그와트"]
const [foo, bar] = some

console.log(foo)  // 나무
console.log(bar)  // 호그와트
```

또한 *default value* 를 지정할 수 있다.

```typescript
const [foo = "호두", bar = "사과"] = ["나무"]

console.log(foo)  // 나무
console.log(bar)  // 사과
```

#### 2. XOR Swap

JavaScript 의 Array 를 이용한 XOR Swap 을 지원하므로 아래와 같이 쉽게 처리할 수 있다

```typescript
let [foo, bar] = ["나무", "호그와트"]
;[foo, bar] = [bar, foo]

console.log(foo)  // 호그와트
console.log(bar)  // 나무
```

> `;[foo, bar] = [bar, foo]` 에 주목하자. `IIFE`와 마찬가지로 안전한 코드를 위해 시작 부분에 `;`를 넣어주자.

#### 3. Return Types

사실 Tuple 자체가 Array 이므로 아래와 같이 바로 분해해 할당시킬 수 있다.

```typescript
const [first, last] = "Harry Potter".split(" ")

console.log(first)  // Harry
console.log(last)  // Potter
```

Assignment 에서 *default value* 를 정의했었다. 반대로 일부 값을 무시하는 것 역시 가능하다.

```typescript
const foo = () => ["사과", "배", "메론", "딸기"]

const [apple, , melon, strawberry] = foo()

console.log(apple, melon, strawberry) // 사과 메론, 딸기
```

`, ,` 를 사용해 자리를 만들어 주되 그냥 무시하면 된다.

#### 4. Spread Operator

```typescript
const [fruits1, ...fruits2] = foo()

console.log(fruits1)  // 사과
console.log(fruits2)  // ["배", "메론", "딸기"]
```

Spread Operator 와 함께 사용하는 것 역시 가능하다.

---

### 2. TypeScript - Object

#### 1. Assignment

Destructuring 이 가장 빛을 발하는 곳이 바로 Object 다.

```typescript
const lecture1 = {
  subject: 'English',
  students: 40,
  level: 'Intermediate',
  discount: false
}

const { level, students } = lecture1

console.log(students) // 40
console.log(level)    // Intermediate
```

Object 는 `Key-Value` Types 여서 Array 와 달리 불필요한 값에 대해 `, ,`와 같이 빈 공간이나 순서를 고려할 필요도 없이 자유롭게 분해가 
가능하다.

선언과 할당을 분리하는 것 역시 가능하다.

```typescript
let students, level

;( { students, level } = lecture1 )

console.log(students) // 40
console.log(level)    // Intermediate
```

> [XOR Swap](#h-2-xor-swap) 에서 본 것처럼 이 경우도 IIFE 와 마찬가지로 시작 부분에 `;`를 넣어 주어야 한다. 단, 위에서는  
> `;[foo, bar] = [bar, foo]` 이렇게만 해줘도 작동했던 것과 달리 여기서는 `{ }` 이 block 이 **Code Chunk** 가 아닌 **Object** 
> 라는 것을 명시하지 않으면 코드 에러가 발생한다.  
> 따라서 `;( { students, level } = lecture1 )`와 같이 `;( )`로 감싸줘야한다.

#### 2. Assignment with NewName

값을 할당할 때 뒤에 Types 를 정의하듯 `: variableName`를 붙여주면 해당 이름의 변수에 할당된다.

```typescript
const { students, level: lectureLevel } = lecture1

console.log(students)     // 40
console.log(lectureLevel) // Intermediate
```

마찬가지로 *default value* 를 지정할 수 있다.

```typescript
const { students = 30, expire = false } = lecture1

console.log(students) // 40
console.log(expire)   // false
```

#### 3. Function Parameters

Destructuring 이 가장 유용한 곳이 바로 함수의 Parameters 다.

```typescript
const draw = (width?: number, height?: number, color: string = 'white') => {
  if (width === undefined || height === undefined) return
  return `The color of this square is ${color}, and area is ${width * height}.`
}

console.log(draw(5, 7, 'blue'))
console.log(draw(3, 6))
```

```console
The color of this square is blue, and area is 35.
The color of this square is white, and area is 18.
```

위 함수의 경우 Parameters 에 값을 각각 줘야한다. 문제는 우리는 대부분 저런 식의 데이터는 하나의 객체로 다룬다는 것이다. 즉, 넓이와 
높이, 색상과 같은 정보는 아래와 같이 존재할 것이다.

```typescript
const square1: Square = {
  width: 5,
  height: 7,
  color: 'blue'
}
const square2: Square = {
  width: 3,
  height: 6
}
```

따라서 이렇게 직접 분해해서 Arguments 로 던지거나

```typescript
draw(square1.width, square1.height, square1.color)
```

아예 아래와 같이 함수가 Parameters 로 Object 를 받도록 해야한다.

```typescript
const draw = (square: Square) => {
  if (square.width === undefined || square.height === undefined) return
  return `The color of this square is ${square.color}, and area is ${square.width * square.height}.`
}

draw(square1)
```

어떤 방법을 사용하든 `square.`와 같은 식으로 **Dot Syntax** 를 사용해야만 하고 코드가 길어진다. 사실 대부분 다른 언어에서는 이렇게 객체로 
다룬다. 하지만 TypeScript 에서는 Destructuring 을 사용해 <span style="color: red;">객체로 다루면서도 객체가 아닌 것처럼 값을 
사용</span>할 수 있도록 함수를 정의할 수 있다.

```typescript
const draw = ({ width, height, color = 'white' }: Square) => {
  if (width === undefined || height === undefined) return
  return `The color of this square is ${color}, and area is ${width * height}.`
}

console.log(draw(square1))
console.log(draw(square2))
```

```console
The color of this square is blue, and area is 35.
The color of this square is white, and area is 18.
```

> Arguments 만 보면 `draw(_:)` 함수에 객체를 던져 넣어 작동시키지만, 함수 내부에서 받는 Parameters 는 Destructuring 되어 
> `darw(_:_:_:)` 함수인 것처럼 작동한다.

#### 4. Nested Object

TypeScript 의 Destructuring 의 강력한 점은 중첩된 구조 역시 쉽게 풀어낼 수 있다는 것이다. 이것은 함수의 Parameters 를 풀어내는 것 
만큼 유용하다.

```typescript
const styles = {
    size: {
        width: 300,
        height: 200
    },
    colors: {
        fontColor: 'red',
        bgColor: 'blue'
    }
}
```

중첩 구조를 풀어내는 방법은 [Assignment with NewName](#h-2-assignment-with-newname) 와 같이 `: variableName`을 이용하는데 
이때 중첩 구조를 표현하기 위해 `{originalProperty: variableName}` 형태로 만들어 주는 것이다. 아래 예제를 보자.

```typescript
const { size: { width, height }, colors: { fontColor, bgColor } } = styles

console.log(width)      // 300
console.log(height)     // 200
console.log(fontColor)  // red
console.log(bgColor)    // blue
```

중첩된 Object 구조에 존재하는 Properties 를 전부 1차원으로 분해시켰다.

<br>

좀 더 복잡한 예제를 살펴보자.

```typescript
const metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      localizationTags: [],
      lastEdit: "2014-04-14T08:43:37",
      url: "/de/docs/Tools/Scratchpad",
      title: "JavaScript-Umgebung",
    },
  ],
  url: "/en-US/docs/Tools/Scratchpad",
}
```

`metadata` 에서 *title*, *translations 안쪽의 title* 2개만 분해하고 싶다. 그런데 기존의 *title* 은 `englishTitle`이라는 
변수로, 그리고 *translations 안쪽의 title* 은 `localTitle`이라는 변수로 분해하고자 한다.  
따라서 *translations 안쪽의 title* 은 `[ ]` 안쪽의 `{ }` 안에 있다. 즉, `[ { } ]` 에 접근해야한다. 이 구조를 그대로 따라가보자.

```typescript
const {
  title: englishTitle,
  translations: [
    {
      title: localTitle
    }
  ]
} = metadata

console.log(englishTitle) // Scratchpad
console.log(localTitle)   // JavaScript-Umgebung
```

#### 5. Iterating Over a Object in an Array

Object 의 중첩 보다는 쉽지만, 실제로 더 많이 사용되는 경우다.

```typescript
type Student = {
  name: string,
  age: number,
  grade: string
}

const studentInfo = [
  {name: 'David', age: 17, grade: 'junior'},
  {name: 'Julia', age: 18, grade: 'sophomore'},
  {name: 'Michael', age: 18, grade: 'sophomore'},
]
```

```typescript
studentInfo.map((student, index)  => (
    console.log(`Student ${index + 1}: ${student.name}`)
))
```

Destructuring 이 없다면 이렇게 접근하겠지만, Destructuring 을 사용하면 아래와 같이 접근할 수 있다.

```typescript
studentInfo.map(({name}, index)  => (
    console.log(`Student ${index + 1}: ${name}`)
))
```

---

### 3. Swift - Tuple 👩‍💻

#### 1. Assignment

```swift
let (foo, bar) = ("나무", "호그와트")

print(foo)  // 나무
print(bar)  // 호그와트
```

위 코드는 다음과 같다.

```swift
let foo = "나무"
let bar = "호그와트"

print(foo)  // 나무
print(bar)  // 호그와트
```

물론 이렇게 사용할 수도 있다.

```swift
let some = ("나무", "호그와트")
let (foo, bar) = some

print(foo)  // 나무
print(bar)  // 호그와트
```

#### 2. XOR Swap

Swift 의 Tuple 을 이용한 XOR Swap 을 지원하므로 아래와 같이 쉽게 처리할 수 있다.

```swift
var (foo, bar) = ("나무", "호그와트")
(foo, bar) = (bar, foo)

print(foo)  // 호그와트
print(bar)  // 나무
```

#### 3. Return Types

또한 Array 를 Tuple 로 반환하는 함수를 만들어 다음과 같이 활용할 수 있다.

```swift
func splitName(_ name: String) -> (String, String) {
    let parts = name.components(separatedBy: " ")
    return (parts[0], parts[1])
}

let (first, last) = splitName("Harry Potter")

print(first)    // Harry
print(last)     // Potter
```

### 4. Swift - Dictionary

#### 1. Iterating Over a Dictionary

```swift
// `Planet` Type
let Planet = [
    1: "Mercury",
    2: "Venus",
    3: "Earth",
    4: "Mars",
    5: "Jupiter",
    6: "Saturn",
    7: "Uranus",
    8: "Neptune"
]

Planet.sorted(by: <).forEach { (number, name) in
    print(#"\#(number)번째 위성은 "\#(name)" 입니다."#)
}
```
 
#### 2. Iterating Over a Dictionary in an Array

Array 자체는 Destructuring 할 것이 없다. 하지만 Array 안에 Dictionary 가 들어있는 형태라면, 이 Dictionary 를 Destructuring
할 수 있다.

```swift
// `[Planet]` Type
let Planet = [
    [1: "Mercury"],
    [2: "Venus"],
    [3: "Earth"],
    [4: "Mars"],
    [5: "Jupiter"],
    [6: "Saturn"],
    [7: "Uranus"],
    [8: "Neptune"]
]

Planet.flatMap { $0 }.forEach { (number, name) in
    print(#"\#(number)번째 위성은 "\#(name)" 입니다."#)
}
```


<br><br>

---
Reference

1. "Destructuring assignment." MDN Web Docs. Apr. 18, 2023, [MDN - Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).
2. Paul Hudson. "What is destructuring?." Hacking With Swift. May. 28, 2019, [Swift Destructuring](https://www.hackingwithswift.com/example-code/language/what-is-destructuring).
