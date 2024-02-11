---
layout: post
title: Remove if-else repetition
subtitle: Clean Code - Part 1
excerpt_image: NO_EXCERPT_IMAGE
categories: [cs, swift, typescript, javascript]
tags: [cs, swift, typescript, clean code, switch, enum-switch]
---

### 1. If-Else Repetition 👩‍💻

#### 1. Swift

```swift
func beverage(_ num: Int) -> String {
  if (num == 0) {
    return "Juice";
  } else if (num == 1) {
    return "Soda";
  } else if (num == 2) {
    return "Beer";
  } else if (num == 3) {
    return "Wine";
  } else if (num == 4) {
    return "Tequila";
  } else {
    return "Water";
  }
}

print(beverage(0)) // Juice
print(beverage(3)) // Wine
print(beverage(5)) // Water
```

#### 2. TypeScript

```typescript
const beverage = (num: number): string => {
  if (num === 0) {
    return 'Juice';
  } else if (num === 1) {
    return 'Soda';
  } else if (num === 2) {
    return 'Beer';
  } else if (num === 3) {
    return 'Wine';
  } else if (num === 4) {
    return 'Tequila';
  } else {
    return 'Water';
  }
};

console.log(beverage(0))  // Juice
console.log(beverage(3))  // Wine
console.log(beverage(5))  // Water
```

일을 하면서 `if-else if-else if-else if...-else` 이런식으로 50개의 조건을 연결한 코드를 본 적이 있다. 😱

이런식의 코드는 가독성도 나쁘지만 조건 검사를 최악의 경우에 if, else if 의 개수만큼 검사해야하는 최악의 Control Flow 알고리즘이 탄생하게
된다. 개인적으로는 조건이 3개일 경우는 그냥 `if-else if-else` 를 사용하거나, `if` & `Ternary Operator`를 사용하고, 4개 이상일 경우
`switch` 또는 `Key-Value` Types 를 사용하곤 한다.

---

### 2. Switch-Case 👩‍💻

위와 같은 문제를 가장 쉽게 해결할 수 있는 방법은 `Switch-Case`를 사용하는 것이다.
<br>

#### 1. Swift

```swift
func beverage(_ num: Int) -> String {
    switch num {
    case 0: return "Juice"
    case 1: return "Soda"
    case 2: return "Beer"
    case 3: return "Wine"
    case 4: return "Tequila"
    default: return "Water"
    }
}

print(beverage(0)) // Juice
print(beverage(3)) // Wine
print(beverage(5)) // Water
```

아까보다 가독성이 훨씬 좋아졌을 뿐 아니라, <span style="color: red;">Hashable Key 를 이용해 Jump Table</span> 을 하므로 
성능 또한 좋아졌다.

#### 2. TypeScript

```typescript
const beverage = (num: number): string => {
  switch (num) {
    case 0:
      return 'Juice'
    case 1:
      return 'Soda'
    case 2:
      return 'Beer'
    case 3:
      return 'Wine'
    case 4:
      return 'Tequila'
    default:
      return 'Water'
  }
}

console.log(beverage(0))  // Juice
console.log(beverage(3))  // Wine
console.log(beverage(5))  // Water
```

개인적으로 대부분의 IDE 는 물론이고 Prettier 가 case 와 body 를 강제 줄바꿈 하는 것이 마음에 들지 않는다. 오히려 Dirty Code 가 되는 
느낌이랄까? 그래서 Clean Code 에서 Key-Value Types 를 권장하는 것인가 싶기도 하다. 

> **Caution**
> 
> [JavaScript language overview] 를 보면 다음과 같이 나온다.
> 
> Similar to C, case clauses are conceptually the same as labels, so if you don't add a break statement, 
> execution will "fall through" to the next level. However, they are not actually jump tables — any expression 
> can be part of the case clause, not just string or number literals, and they would be evaluated one-by-one 
> until one equals the value being matched. Comparison takes place between the two using the `===` operator.
> 
> 즉, JavaScript 에서 Switch 는 Hash Table 을 이용한 Jump 를 하지 않으므로 성능상 이점은 없는 것으로 보인다.

마지막으로 다음 섹션에서 **Switch-Case** 마저도 제거해보도록 하자.

---

### 3. Key-Value Types 👩‍💻

사실 **Switch-Case** 나 **Key-Value** 모두 Key 에 해당하는 데이터가 Hashable 을 만족해야하므로 큰 차이는 없다.

하지만 Swift 에서는 **Switch-Case** 의 경우 조건을 모두 커버하지 못했을 경우 compiler 가 에러를 띄워주는데, 만약 compile-time 에 
확인이 불가능한 경우가 있을 경우(그런 경우가 있을 수 있을까...? 🙄) *Runtime Error* 로 이어질 수 있다.

그리고 개인적으로 Swift 의 Switch-Case 는 나름 가독성 좋다고 생각하는데, TypeScript 의 경우는 아니기도 하고, 특히 TypeScript 는 
Enumeration 의 경우 기존의 `enum`은 JavaScript 로 transpile 될 때 `IIFE`로 변환되어 Bundler 의 `Tree-shaking` 이 작동하지 
않아 불필요한 코드가 제거되지 않는 문제가 있다.  
이로 인해 `as const`를 사용한 Enumeration 선언이 권장되는데, 이걸 사용할 경우 어차피 Object 이기 때문에 Switch-Case 를 사용할 필요가 
없어져 버린다(TypeScript 의 Switch-Case Syntax 가 영 깨끗하지 못한 것도 있고... 🤭).

아무튼 Clean Code 에서 대부분 Switch 마저도 Key-Value Types 로 바꾸는 것을 권장한다. 따라서 우리도 Switch-Case 를 Key-Value 
Types 를 사용한 코드로 바꿔보자.
<br>

#### 1. Swift

```swift
func beverage(_ num: Int) -> String {
    let switcher: [Int: String] = [
        0: "Juice",
        1: "Soda",
        2: "Beer",
        3: "Wine",
        4: "Tequila"
    ]
    return switcher[num] ?? "Water"
}
```

`[Int, String]` Type 의 Dictionary 를 이용했다. 만약 이 Dictionary 를 밖으로 빼낼 경우 함수는 더 간단해진다.

```swift
let switcher: [Int: String] = [
    0: "Juice",
    1: "Soda",
    2: "Beer",
    3: "Wine",
    4: "Tequila"
]

func beverage(_ num: Int) -> String {
    switcher[num] ?? "Water"
}
```

그런데 이렇게 하면 불필요한 변수 오염이 발생한다. 만약 재사용까지 고려해 `Switch-Case`를 대신할 로직을 별도 Utilities 로 만들 경우 
다음과 같이 <span id="swift-curry-switch-case" style="color: orange;">Currying</span> 시킬 수 있다.

```swift
func switchCase<Key: Hashable, Value>(switcher: [Key: Value], defaultValue: Value) -> (_ key: Key) -> Value {
    { key in switcher[key] ?? defaultValue }
}
```

이제 이 `Curry Function` 을 이용해 다시 `beverage(_:)`를 정의해보자.

```swift
let beverage = switchCase(switcher: [0: "Juice",
                                     1: "Soda",
                                     2: "Beer",
                                     3: "Wine",
                                     4: "Tequila"],
                          defaultValue: "Water")

print(beverage(0)) // Juice
print(beverage(3)) // Wine
print(beverage(5)) // Water
```

#### 2. TypeScript

TypeScript 에서 사용할 수 있는 `Key-Value` Types 는 Object, Map, Record 등이 있다. Record 야 어차피 Object 로 transpile
될거고, Object 는 Key 가 가질 수 있는 Types 가 String 뿐이다. TypeScript 코드 상에서야 Record 를 이용해 Key 에 다른 Types 
를 정의할 수 있지만 JavaScript 코드에서는 사용할 수 없는 방법이다.

반면 `Map`을 사용할 경우 **Switch-Case** 의 `default` case 를 유효하지 않은 Key 로 인식하므로 `Record`를 사용하는 것이 더 좋다. 
따라서 TypeScript 버전은 `Record`를 사용하고, JavaScript 버전은 `Map`을 사용해 각각 구현해보자.
<br>

```typescript
const beverage = (num: number): string => {
  const switcher: Record<number, string> = {
    0: "Juice",
    1: "Soda",
    2: "Beer",
    3: "Wine",
    4: "Tequila",
  }
  return switcher[num] ?? "Water"
}
```

`Record<Int, String>` Type 을 사용했다. 이 Record 를 밖으로 빼내보자.

```typescript
const switcher: Record<number, string> = {
    0: "Juice",
    1: "Soda",
    2: "Beer",
    3: "Wine",
    4: "Tequila",
}

const beverage = (num: number): string => switcher[num] ?? "Water"
```

마찬가지로 <span id="typescript-curry-switch-case" style="color: orange;">Currying</span> 시켜보자.

```typescript
type Hashable = string | number
const switchCase = <Key extends Hashable, Value, Switcher extends Record<Key, Value>>(switcher: Switcher, defaultValue: Value) => (key: Key) => (
    switcher[key] ?? defaultValue
)
```

이제 이 `Curry Function` 을 이용해 다시 `beverage(_:)`를 정의해보자.

```typescript
const beverage = switchCase({
        0: "Juice",
        1: "Soda",
        2: "Beer",
        3: "Wine",
        4: "Tequila"
    },
    "Water")

console.log(beverage(0))  // Juice
console.log(beverage(3))  // Wine
console.log(beverage(5))  // Wate
```

#### 3. JavaScript

```javascript
const beverage = (num) => {
  const switcher = new Map([
    [0, "Juice"],
    [1, "Soda"],
    [2, "Beer"],
    [3, "Wine"],
    [4, "Tequila"]
  ])
  return switcher.get(num) ?? "Water"
}
```

`Map<Int, String>` Type 을 사용했다. 이 Map 을 밖으로 빼내보자.

```javascript
const switcher = new Map([
  [0, "Juice"],
  [1, "Soda"],
  [2, "Beer"],
  [3, "Wine"],
  [4, "Tequila"]
])

const beverage = (num) => switcher.get(num) ?? "Water"
```

마찬가지로 <span style="color: orange;">Currying</span> 시켜보자.

```javascript
const switchCase = (switcher, defaultValue) => (key) => switcher[key] ?? defaultValue
```

이제 이 `Curry Function` 을 이용해 다시 `beverage(_:)`를 정의해보자.

```javascript
const beverage = switchCase(new Map([
      [0, "Juice"],
      [1, "Soda"],
      [2, "Beer"],
      [3, "Wine"],
      [4, "Tequila"]
    ]),
    "Water")

console.log(beverage(0))  // Juice
console.log(beverage(3))  // Wine
console.log(beverage(5))  // Water
```

---

### 4. Enumeration 👩‍💻

**Switch-Case** 가 유용하게 사용되는 곳 중 하나가 Enumeration 을 Control Flow 처리 할 때다. Enumeration 의 Control Flow 
역시 **Switch-Case** 대신 **Key-Value** 를 적용해보자.

#### 1. Swift

```swift
enum CompassPoint: String {
    case north, south, east, west
}
```

<br>

- Switch-Case

```swift
func directionToHead(_ direction: CompassPoint) -> String {
    switch direction {
    case .north: return "Lots of planets have a north"
    case .south: return "Watch out for penguins"
    case .east: return "Where the sun rises"
    case .west: return "Where the skies are blue"
    }
}

print(directionToHead(.north))  // Lots of planets have a north
```

- Key-Value

```swift
let compassSwithcer: [CompassPoint: String] = [
    .north: "Lots of planets have a north",
    .south: "Watch out for penguins",
    .east: "Where the sun rises",
    .west: "Where the skies are blue"
]

func directionToHead(_ direction: CompassPoint) -> String {
    compassSwithcer[direction]!
}

print(directionToHead(.east))   // Where the sun rises
```

- Curry Function

마찬가지로 [Curry Function](#swift-curry-switch-case) 을 적용해보자.

```swift
let directionToHead = switchCase(switcher: [CompassPoint.north: "Lots of planets have a north",
                                            CompassPoint.south: "Watch out for penguins",
                                            CompassPoint.east: "Where the sun rises",
                                            CompassPoint.west: "Where the skies are blue"],
                                 defaultValue: "Water")

print(directionToHead(.east))   // Where the sun rises
```

#### 2. TypeScript

- Switch-Case

TypeScript 의 Old Syntax 에서 사용되는 `enum`을 사용할 경우는 다음과 같다.

```typescript
enum CompassPoint {
  North = "Lots of planets have a north",
  South = "Watch out for penguins",
  East = "Where the sun rises",
  West = "Where the skies are blue"
}
```

```typescript
const directionToHead = (direction: CompassPoint): string => {
  switch (direction) {
    case CompassPoint.North: return "Lots of planets have a north"
    case CompassPoint.South: return "Watch out for penguins"
    case CompassPoint.East: return "Where the sun rises"
    case CompassPoint.West: return "Where the skies are blue"
  }
}

console.log(directionToHead(CompassPoint.North)) // Lots of planets have a north
```

하지만 [Key-Value Types](#h-3-key-value-types-) 에서 설명했듯이 `IIFE`로 변환된 코드의 `Tree-shaking` 미작동 문제로 
Modern TypeScript 에서는 `const Object as const`가 권장된다.

```typescript
const CompassPoint = {
  North: "Lots of planets have a north",
  South: "Watch out for penguins",
  East: "Where the sun rises",
  West: "Where the skies are blue"
} as const

type CompassPointKeys = keyof typeof CompassPoint
```

```typescript
const directionToHead = (direction: CompassPointKeys): string => {
  switch (direction) {
    case "North": return "Lots of planets have a north"
    case "South": return "Watch out for penguins"
    case "East": return "Where the sun rises"
    case "West": return "Where the skies are blue"
  }
}

console.log(directionToHead("North")) // Lots of planets have a north
```

- Key-Value

```typescript
const directionToHead = (direction: CompassPointKeys): string => CompassPoint[direction]

console.log(directionToHead("East"))  // Where the sun rises
```

`const Object as const`를 **Enumeration** 으로 사용할 경우 이미 Object 가 정의되어 있기 때문에 별도로 정의할 필요가 없다. 
이 경우 오히려 **Switch-Case** 를 사용하는 것이 불필요한 코드를 생성하고 불필요한 로직을 추가하는 셈이 된다.  
마찬가지로 Key-Value 를 따로 정의할 필요가 없으므로 **Curry Function** 역시 필요가 없다.


<br><br>

---
Reference

1. "JavaScript language overview." MDN, May. 04, 2023, [JavaScript language overview]

[JavaScript language overview]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#control_structures
