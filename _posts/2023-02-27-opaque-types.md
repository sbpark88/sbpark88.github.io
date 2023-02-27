---
layout: post
title: Swift Opaque Types
subtitle: Hide implementation details about a value’s type. 
categories: swift
tags: [swift docs, opaque type, some type, opaque type vs. protocol type]
---

### 1. Opaque Types 👩‍💻

우리는 이미 [Generics](/swift/2023/02/23/generics.html#h-6-using-a-protocol-in-its-associated-types-constraints) 
에서 `Opaque Types`를 본 적 있다. 함수 또는 메서드의 *return type* 을 `Type`이 아닌 `some Type`으로 바꿔 Type 의 일부임을 
암시할 뿐 명확한 Type 정보를 감춘다.

이렇게 자세한 정보를 감추는 것은 `모듈`과 `모듈을 호출하는 코드` 사이의 `경계(boundaries)`에서 유용하다. *Protocol Type* 의 값을 
반환하는 것과 달리 *Opaque Type* 은 `Type Identity`를 유지한다(*Compiler* 는 Type 의 정보에 접근할 수 있지만, 모듈의 
클라이언트는 접근할 수 없다).

---

### 2. The Problem That Opaque Types Solve 👩‍💻

#### 1. Triangle

*Opaque Types* 가 해결 할 수 있는 문제를 살펴보기 위해 기존의 *Nonopaque Types* 버전의 코드를 만들어보자. 다음은 ASCII 그림 모양을 
그리는 모듈로써 *String* 을 반환하는 `draw()` 함수를 요구 조건으로 정의하는 `Shape` protocol 과 이것을 준수하기 위한 `Triangle` 
structure 다.

```swift
protocol Shape {
    func draw() -> String
}
```

```swift
struct Triangle: Shape {
    var size: Int
    func draw() -> String {
        var result: [String] = []
        for length in 1...size {
            result.append(String(repeating: "*", count: length))
        }
        return result.joined(separator: "\n")
    }
}
```

```swift
let smallTriangle = Triangle(size: 3)
print(type(of: smallTriangle))  // Triangle
print(smallTriangle)            // Triangle(size: 3)
```

그리고 이 `Triangle(size: 3)`이 `draw()` 메서드를 호출하면 *result* 에는 `["*", "**", "***"]`가 담기게 될 것이다. `draw()` 
메서드를 호출하기 전 `joined(separator:)` 메서드의 동작을 먼저 살펴보자.

```swift
var arr = ["*", "**", "***"]
print(arr)                          // ["*", "**", "***"]
print(arr.joined())                 // ******
print(arr.joined(separator: ", "))  // *, **, ***
```

이제 어떤 그림이 그려질지 상상할 수 있을 것이다. 메서드를 호출해 그림을 그려보자.

```swift
print(smallTriangle.draw())
```

```console
*
**
***
```

`*\n**\n***`가 저장되어 위와 같이 출력된다.

#### 2. FlippedShape

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

Generic Types 를 이용해 `FlippedShped` Structure 를 구현했다. 그러나 여기에는 **중요한 제약**이 있는데, 
`뒤집힌 결과(flipped result)를 생성하는데 사용된 Exact Generic Type 을 노출(expose)`시킨다.

```swift
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
```

```console
***
**
*
```

모듈 사용자가 알아야 하는 것은 모듈 사용자가 제공받기로 한 `Shape` protocol 의 무언가 (이 경우 `draw()` 메서드)뿐이다.   
그런데 *Shape* Protocol 을 준수한다고 `draw()`를 제공하기 위해 Structure *flippedTriangle* 를 그대로 노출하면 여기 사용된 
`Wrapper` 인 `FlippedShape`가 그대로 노출된다(= 뒤집힌 결과를 생성하는데 사용된 Exact Generic Type 을 노출시킨다).

```swift
print(flippedTriangle.shape)        // Triangle(size: 3)
```

> `Wrapper`의 Exact Generic Type 이 노출되어 불필요한 정보(FlippedShape 의 'shape' Property)가 노출된다.

#### 3. JoinedShape

이번에는 *Shape* Protocol 을 준수하는 2개의 *shape* 을 결합하는 Structure 를 정의해보자.

```swift
struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
        top.draw() + "\n" + bottom.draw()
    }
}
```

`JoinedShape<T: Shape, U: Shape>` structure 는 2개의 *shapes* 를 수직으로 결합한다.

이것은 아레의 코드와 같이 *Flipped Triangle* 을 *Another Triangle* 과 결합해 
`JoinedShape<FlippedShape<Triangle>, Triangle>`과 같은 *return type* 을 생성한다.

```swift
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
```

```console
*
**
***
***
**
*
```

*shape* 를 생성하는 것에 대해 자세한 정보를 노출하면, `Full Return Type`을 명시해야하기 때문에 *ASCII 그림 모양을 그리는 모듈의 
public interface 에 포함되지 않은 Type 이 유출될 수 있다*.

```swift
print(joinedTriangles.top)          // Triangle(size: 3)
print(joinedTriangles.bottom)       // FlippedShape<Triangle>(shape: __lldb_expr_38.Triangle(size: 3))
```

*모듈 내의 코드는 다양한 방법으로 같은 모양을 만들 수 있으며, 모듈 외부의 다른 코드는 이 모듈의 구현 목록과 같은 세부 정보를 알 필요가 없다*. 

따라서 [FlippedShape](#h-2-flippedshape), [JoinedShape](#h-3-joinedshape) 와 같은 `Wrapper Types`는 모듈 사용자에게 
중요하지 않으며, `표시되지 않아야한다`. 모듈의 public interface 는 *shape* 을 결합하거나 뒤집는 것과 같은 작업으로 구성되며, 이러한 
작업은 또 다른 `Shape` 값을 반환한다.

---

### 3. Returning an Opaque Type 👩‍💻

#### 1. Square & makeTrapezoid()

*Opaque Types* 는 *Generic Types* 의 반대로 생각할 수 있다.

*Generic Types* 를 사용하면, 함수는 추상화된 방식(abstracted away)으로 값을 반환할 수 있으며, `return type 은 함수가 호출될 때 
결정`된다.

```swift
func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }
```

`max(_:_:)` 함수는 호출하는 코드의 x, y 값에 따라 `T`의 Type 이 정해지고, 이 `T`는 `Comparable` protocol 을 준수하는 어떤 
Types 나 사용 가능하다.

반면 *Opaque Types* 를 반환하는 함수의 경우 이러한 역할이 반전된다. *Opaque Types* 를 사용하면, 함수를 호출하는 코드로부터 추상화된 
방식으로 `함수의 구현에서 return type 을 선택`할 수 있다.

위에서 [FlippedShape](#h-2-flippedshape), [JoinedShape](#h-3-joinedshape) 를 그대로 노출해 다른 정보가 노출되었는데 
`Shape` protocol 이 제공하기로 약속한 `draw()`만 노출되면 되므로 

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

와 같이 [FlippedShape](#h-2-flippedshape), [JoinedShape](#h-3-joinedshape) 로부터 *return type* 을 선택해 
불필요한 정보를 포함하지 않는 간단한 형태로 Wrapping 된 값을 제공해야한다.

> Opaque Types 를 return type 으로 정의할 때 가능한 Types 는 다음과 같다.  
> `An 'opaque' type must specify only 'Any', 'AnyObject', protocols, and/or a base class`

<br>

다음 예제를 위해 사각형을 그리는 `Square` structure 를 추가로 정의하자.

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}
```

다음 예제에서 함수 `makeTrapezoid()`는 *shape* 의 명확한 Type 없이 사다리꼴(trapezoid)을 반환한다.  
(사용자에게 *Triangle, Square, FlippedShape, JoinedShape* 의 Exact Generic Type 이 노출되지 않는다.)

```swift
func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(
        top: top,
        bottom: JoinedShape(top: middle, bottom: bottom)
    )
    return trapezoid
}
```

```swift
let trapezoid = makeTrapezoid()
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```

<br>

그렇다면 정의한 [JoinedShape](#h-3-joinedshape) 와 뭐가 다를까? 한번 비교해보도록 하자.

![Nonopaque Type Return](/assets/images/posts/2023-02-27-opaque-types/nonopaque-type-return.png){: width="800"}

```swift
print(joinedTriangles.top)      // Triangle(size: 3)
print(joinedTriangles.bottom)   // FlippedShape<Triangle>(shape: __lldb_expr_38.Triangle(size: 3))
```

모듈의 사용자는 `draw()`의 결과만 알면 된다. 그런데 `JoinedShape`는 *Shape* Protocol 을 준수하는 Structure 자체를 정의하기 
때문에 *이를 구현하는데 사용된 Exact Generic Type `JoinedShape`가 노출되어 이것이 갖는 `top`과 `bottom`에 대한 정보까지 
노출시킨다*. 위에서도 이미 설명했듯이 [FlippedShape](#h-2-flippedshape), [JoinedShape](#h-3-joinedshape) 와 같은 
`Wrapper Types`는 모듈 사용자에게 중요하지 않으며, `표시되지 않아야`하는데 Structure 를 그대로 반환하기 때문에 불필요한 정보가 노출된다.

<br>

![Before Opaque Type Return](/assets/images/posts/2023-02-27-opaque-types/before-opaque-type-return.png){: width="800"}

`makeTrapezoid()` 역시 함수 내부에서는 `JoinedShape`가 생성한 Structure 로부터 `top`과 `bottom`에 접근 가능하지만

![Opaque Type Return 1](/assets/images/posts/2023-02-27-opaque-types/opaque-type-return-1.png){: width="800"}

<span style="color: red;">반환된 값에서는 접근할 수 없다</span>. `makeTrapezoid()`는 ***Return Type 을 
Opaque Type 으로 `Wrapping`해 `Shape` protocol 을 준수하는 객체의 다른 정보를 노출시키지 않고 모듈의 사용자가 알아야 하는 
`draw()`만 노출시킨다***.

#### 2. `flip(_:)` & `join(_:_:)` with Generics

위에서 `makeTrapezoid()` 함수는 *shape* 의 명확한 Type 없이 `some Shape`를 반환했다. 즉, `Shape` protocol 을 준수하는 
Structures 의 Exact Generic Type 대신

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

형태로 `Wrapping`해 반환했다.

`An 'opaque' type must specify only 'Any', 'AnyObject', protocols, and/or a base class`를 다시 한 번 더 
떠올려보자.

- Generic Types 가 해결하는 문제는 동일한 body 를 갖는 여러 cases 를 Type Inference 를 사용해 하나의 정의로 재사용함으로써 코드의
  중복을 최소화하는 방향으로 코드를 유연하게 만들었다.
- Opaque Types 가 해결하는 문제는 Types 의 불필요한 정보 노출을 방지(hiding)하는 것이다. 이를 위해 특정 `Type`을 반환하더라도 
  위와 같이 그 `Type Object` 내에서 반환 하려는 단일 `Type Member`만 반환하도록 코드를 작성해야한다. 이것은 추상적인 합의의 결과라 
  볼 수 있으며, 이 모듈을 개발하는 개발자와 *Compiler* 만 `Type Object`를 알 수 있다. 이 모듈을 사용하는 클라이언트는 단지 
  매번 동일한 `Type Member`를 얻는다는 것만 알고 있으면 되고, 매번 동일한 Identity 를 반환하니 클라이언트는 이 *return type* 을 
  더욱 신뢰하고 사용할 수 있게 된다.

> **Return Type** 으로 `Opaque Types`를 사용하는 함수가 여러 위치에서 반환되는 경우, <span style="color: red;">가능한 경우의 
> 모든 Return Values 의 Type 은 동일</span>해야한다(all of the possible return values must have the same type).
> 
> 이것은 [Generic Functions] 의 경우 **Return Type** 에 [Generic Types] 를 사용할 수 있지만 그럼에도 불구하고 
> <span style="color: red;">Return Type `some Type`은 여전히 **Single Type** 이어야 함</span>을 의미한다.

*Opaque Types* `some Shape`를 *return type* 으로 갖는 `flip(_:)`, `join(_:)` 함수를 추가로 구현해보자. 이번에는 
`Generics`를 결합해도 *Opaque Types* 가 정상적으로 동작하는지 확인해본다.

```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    FlippedShape(shape: shape)
}

func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}
```

```swift
let smallTriangle = Triangle(size: 3)
let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
print(opaqueJoinedTriangles.draw())
```

```console
*
**
***
***
**
*
```

![Opaque Type Return 2](/assets/images/posts/2023-02-27-opaque-types/opaque-type-return-2.png){: width="800"}

> `flip(_:)`과 `join(_:)`에 의해 반환된 `opaqueJoinedTriangles` 역시 `draw()` 외에는 접근할 수 없다.

#### 3. `invalidFlip(_:)`

위에서 `Opaque Type 의 return type 은 Single Type`이어야 한다고 했다. 따라서 이번에는 이 요구 조건을 위반하는 잘못된 case 를 살펴본다.

![Invalid Opaque Type](/assets/images/posts/2023-02-27-opaque-types/invalid-opaque-type.png){: width="1000"}

> *Opaque Type* 을 반환하겠다 해놓고 `Single Type`이 아닌 2가지 Types 로 *return* 을 하려고 하자 *Compiler* 가 *Opaque Type* 의 
> 요구 조건에 위반됨을 인지하고 에러를 출력한다.
> 
> - Function declares an opaque return type 'some Shape', but the return statements in its body do not have matching underlying types

<br>

이를 해결하기 위한 방법 중 하나는

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}
```

의 특수한 경우를 

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

의 내부로 옮기는 것이다.

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
            return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```


<br>

변경된 코드를 모아 비교해보면 다음과 같다.

- `flip(_:)`

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}

func flip<T: Shape>(_ shape: T) -> some Shape {
    FlippedShape(shape: shape)
}
```

```swift
let smallTriangle = Triangle(size: 2)
let smallSquare = Square(size: 2)
let trapezoid = join(smallTriangle, join(smallSquare, flip(smallTriangle)))

print(type(of: trapezoid))  // JoinedShape<Triangle, JoinedShape<Square, FlippedShape<Triangle>>>
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```
<br>

- `fixedInvalidFlip(_:)`

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
            return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}

func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // Error: return types don't match
    }
    return FlippedShape(shape: shape) // Error: return types don't match
}

// 따라서 위 `invalidFlip(_:)`은 다음과 같이 바뀔 수 있다.
func fixedInvalidFlip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape) // Error: return types don't match
}
```

```swift
let smallTriangle = Triangle(size: 2)
let smallSquare = Square(size: 2)
let trapezoid = join(smallTriangle, join(smallSquare, fixedInvalidFlip(smallTriangle)))

print(type(of: trapezoid))  // JoinedShape<Triangle, JoinedShape<Square, FlippedShape<Triangle>>>
print(trapezoid.draw())
```

```console
*
**
**
**
**
*
```

#### 4. `repeat(shape:count:)` - Opaque<T> Return Types with Generics 

항상 `Single Type`을 반환해야 한다고 해서 `Opaque Types`를 return 하는 함수에 [Generic Types] 의 사용을 막지는 않는다. 
다음은 [Generic Types] 를 사용하면서 `Opaque Types`의 요구 조건을 만족하는 경우를 보자.

위에서 `invalidFlip(_:)`함수가 불가능했던 이유는 

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // Error: return types don't match
    }
    return FlippedShape(shape: shape) // Error: return types don't match
}
```

는 `T`를 받아 `Square` 또는 `FlippedShape`라는 2가지 Types 로 반환하려 했기 때문이다. 반면 

```swift
func `repeat`<T: Shape>(_ shape: T, count: Int) -> some Collection {
    Array<T>(repeating: shape, count: count)
}
```

`repeat(shape:count:)` 함수 역시 `T`에 의존하므로 받는 `T`에 따라 반환되는 `T`의 Type 은 변경되지만, 
`some Collection`의 일부로써 `Array<T>`라는 `Single Type 으로 Wrapping 된 Type 을 반환`하기 때문에 Opaque Type 의 
요구 조건을 준수한다. 

잘 작동하는지 확인해보자.

```swift
let doubleTriangle = `repeat`(smallTriangle, count: 2)
doubleTriangle.forEach { shape in
    if let shape = shape as? Shape {
        print(shape.draw())
    }
}
```

```console
*
**
***
*
**
***
```

```swift
let tripleSquare = `repeat`(smallSquare, count: 3)
tripleSquare.forEach { shape in
    if let shape = shape as? Shape {
        print(shape.draw())
    }
}
```

```console
***
***
***
***
***
***
***
***
***
```

---

### 4. Differences Between Opaque Types and Protocol Types 👩‍💻

#### 1. `protoFlip(_:)`

#### 2. Protocol Has an Associated Type Cannot Use as the Return Type 

#### 3. Opaque Type Resolve The Problem That Protocol Has an Associated Type

```swift
struct SomeStructure: Shape {
    func draw() -> String { something }
}
```

위 Wrapping 되어 반환되는 형태를 보자. 특정 Protocol 을 준수하는 다양한 Hierarchy 구조에서 *return type* 으로
<span style="color: red;">Protocol Type</span> 을 사용한다는 것은 해당 모듈의 `Original Type Object`에 
접근이 가능하므로 <span style="color: red;">높은 유연성</span>을 갖게 되고,  
반대로 <span style="color: red;">Opaque Type</span> 을 사용한다는 것은 해당 모듈이 어떤 Hierarchy 구조를 갖고 있든, 
중간에 모듈이 내부적으로 어떻게 변경되든 ***단지 제공하기로 약속된 `return type` 만 사용하면 된다는 것을 의미***하므로
<span style="color: red;">return type 에 대한 강력한 보증</span>을 약속
(Opaque Type 으로 반환하기 위해 단일 Identity 를 유지하도록 코드를 작성해야하므로)하는 것이다.


<br><br>

---
Reference

1. "Opaque Types." The Swift Programming Language Swift 5.7. accessed Feb. 27, 2023, [Swift Docs Chapter 23 - Opaque Types](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/opaquetypes).

[Generic Functions]:/swift/2023/02/23/generics.html#h-2-generic-functions-
[Generic Types]:/swift/2023/02/23/generics.html#h-3-generic-types-

