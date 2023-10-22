---
layout: post
title: Swift Advanced Operators
subtitle: Define custom operators, perform bitwise operations, and use builder syntax. 
categories: swift
tags: [swift docs, advanced operators, bitwise, overflow, precedence, associativity, prefix, postfix, compound, equivalence, custom operators, infix, result builders]
---

### 1. Advanced Operators 👩‍💻

Swift 는 `C`나 `Objective-C`와 유사한 `Bitwise Operators`를 포함해 여러 고급 연산자를 제공한다. *Swift* 는
**C** 의 *Arithmetic Operators* 와 달리 기본적으로 <span style="color: red;">*Overflow* 되지 않는다</span>.
*Overflow* 는 `trapped`되어 에러로 보고된다.  
Swift 에서 *Overflow* 행동을 하도록 하려면 `Overflow Addition Operator($+)`와 같은 연산자를 사용해야한다
(모든 `Overflow Operators`는 `&`로 시작한다).

Custom *Classes*, *Structures*, *Enumerations* 를 정의할 때, Custom Types 에 대해 **Standard Swift
Operators** 의 구현을 제공하는 것이 유용할 수 있다. Swift 는 Custom Types 에 대해 **Custom Operators** 를 손쉽게
제공할 수 있도록 하며, 각 Types 에 대한 행동이 정확히 무엇인지 결정할 수 있다.

**Custom Operators** 는 사전에 정의된 Operators 로 제한되지 않으며, Swift 는 자신만의 `Infix`, `Prefix`,
`Assignment Operators`를 정의함은 물론, 자신만의 `우선순위`를 자유롭게 정의할 수 있다. 이러한 **Custom Operators**
는 코드에서 Swift 가 기본적으로 제공하는 `Predefined Operators` 처럼 사용되며, **Custom Operators** 를 채택하도록
기존의 Types 를 확장할 수 있다.

---

### 2. Bitwise Operators 👩‍💻

#### 1. Bitwise Operators

*Bitwise Operators* 는 *Data Structure* 내에서 개별 `Raw Bits`를 조작할 수 있게 해준다. 이것은 **Graphics
Programming** 이나 디바이스 드라이버 생성 같은 **Low-Level Programming** 에서 주로 사용된다. 또한 외부 소스로부터
*Custom Protocol* 을 사용해 통신하는 데이터 **Encoding/Decoding** 작업에 사용하기도 한다. Swift 는 **C** 가
갖고 있는 모든 *Bitwise Operators* 를 지원한다.

```swift
func printToBinary(number: UInt8) {
    print(toBinary(number))

    func toBinary(_ number: UInt8) -> String {
        let binary = String(number, radix: 2)
        if binary.count < number.bitWidth {
            return String(repeating: "0", count: 8 - binary.count) + binary
        } else {
            return binary
        }
    }
}
```

위 함수를 만들고 비트 연산 결과를 확인해보자.

#### 2. Bitwise NOT Operator `~`

*Bitwise NOT Operator* `~`는 `Prefix Operator`로 `공백 없이` 값 바로 앞에 위치해 숫자의 모든 비트를 반전시킨다.

![Bitwise NOT Operator](/assets/images/posts/2023-10-14-advanced-operators/bitwiseNOT~dark@2x.png){: width="600"}

```swift
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits
printToBinary(number: invertedBits) // 11110000
```

`UInt8` 정수는 8비트를 가지며 0 ~ 255 사이의 숫자를 저장할 수 있으며, 2진수 `00001111`로 이루어진 8비트 데이터
(10진수로 15와 같음)에 `~` Operator 를 적용해 2진수 `11110000`(10진수로 240과 같음)이 되었다.

#### 3. Bitwise AND Operator `&`

*Bitwise AND Operator* `&`는 두 값 사이에 위치해 연산된 값을 반환한다. 비트의 각 자릿수가 모두 1이면 1을, 그 외에는
0을 반환한다.

![Bitwise AND Operator](/assets/images/posts/2023-10-14-advanced-operators/bitwiseAND~dark@2x.png){: width="600"}

```swift
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8 = 0b00111111
let middleFourBits = firstSixBits & lastSixBits
printToBinary(number: middleFourBits)   // 00111100
```

2진수 `11111100`과 `00111111`에 `&` Operator 를 적용해 2진수 `00111100`이 되었다.

#### 4. Bitwise OR Operator `|`

*Bitwise OR Operator* `|`는 두 값 사이에 위치해 연산된 값을 반환한다. 비트의 각 자릿수가 모두 0이면 0을, 그 외에는
1을 반환한다.

![Bitwise OR Operator](/assets/images/posts/2023-10-14-advanced-operators/bitwiseOR~dark@2x.png){: width="600"}

```swift
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedBits = someBits | moreBits
printToBinary(number: combinedBits) // 11111110
```

2진수 `10110010`과 `01011110`에 `|` Operator 를 적용해 2진수 `11111110`이 되었다.

#### 5. Bitwise XOR Operator `^`

*Bitwise XOR Operator*(=*Exclusive OR Operator*) `^`는 두 값 사이에 위치해 연산된 값을 반환한다. 비트의 각 자릿수가
서로 같으면 0을, 다르면 1을 반환한다.

![Bitwise XOR Operator](/assets/images/posts/2023-10-14-advanced-operators/bitwiseXOR~dark@2x.png){: width="600"}

```swift
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits
printToBinary(number: outputBits)   // 00010001
```

2진수 `00010100`과 `00000101`에 `^` Operator 를 적용해 2진수 `00010001`이 되었다.

#### 6. Bitwise Left and Right Shift Operators `<<` `>>`

*Bitwise Left Shift Operator* `<<`는 모든 비트를 왼쪽으로 이동시키며 정수를 2배로 곱하는 효과가 있고, *Bitwise Right
Shift Operator* `>>`는 모든 비트를 오른쪽으로 이동시키며 정수를 반으로 나누는 효과가 있다.

부호없는 정수에 대한 이동 행동 (Shifting Behavior for Unsigned Integers)
부호없는 정수에 대해 비트 이동 행동은 아래와 같습니다:
기존 비트는 요청된 숫자만큼 왼쪽 또는 오른쪽으로 이동됩니다.
정수의 저장소 범위를 넘어 이동된 모든 비트는 삭제됩니다.
원래 비트가 왼쪽 또는 오른쪽으로 이동한 후 뒤에 남겨진 공백에 0이 삽입됩니다.
이 접근방식을 논리적 이동 (logical shift) 이라고 합니다.
아래 그림은 11111111 을 왼쪽으로 1 자리 이동한 11111111 << 1 의 결과와 11111111 을 오른쪽으로 1 자리 이동한 11111111 >> 1 의 결과를 보여줍니다. 초록 숫자는 이동되고 회색 숫자는 삭제되고 핑크 0이 삽입됩니다:


<br>

__1 ) Shifting Behavior for Unsigned Integers__

부호 없는 정수의 *Bit-Shifting* 행동은 다음과 같다.

- 기존의 비트를 요청된 숫자만큼 왼쪽 또는 오른쪽으로 이동시킨다.
- 정수의 저장 범위(UInt8 정수는 8비트를 가지며 0 ~ 255 사이의 숫자를 저장)를 넘는 비트는 **제거**된다.
- 비트 이동으로 *빈 공간에 `0`이 삽입*된다.

![Bit-Shift Unsigned](/assets/images/posts/2023-10-14-advanced-operators/bitshiftUnsigned~dark@2x.png){: width="600"}

```swift
let shiftBits: UInt8 = 4
printToBinary(number: shiftBits)        // 00000100
printToBinary(number: shiftBits << 1)   // 00001000
printToBinary(number: shiftBits << 2)   // 00010000
printToBinary(number: shiftBits << 5)   // 10000000
printToBinary(number: shiftBits << 6)   // 00000000
printToBinary(number: shiftBits >> 2)   // 00000001
```

<br>

다음 예제는 16진수 *Cascading Style Sheets* 색상값을 각각 RGB 로 분리하는 연산을 수행한다.

```swift
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
```

> 16진수 *Cascading Style Sheets* 색상값을 저장하기 위해 `UInt32` 상수를 사용했고 저장된 색상은 분홍색이다.
>
> - 빨간색을 분리하기 위해 분홍색에 빨강색의 자릿값 `0xFF0000`을 `&` 연산한 다음 오른쪽으로 16비트를 이동시킨다.
> - 녹색을 분리하기 위해 분홍색에 녹색의 자릿값 `0x00FF00`을 `&` 연산한 다음 오른쪽으로 8비트를 이동시킨다.
> - 파란색을 분리하기 위해 파랑색의 자릿값 `0x0000FF`을 `&` 연산했고 자릿값 이동이 필요 없어 그대로 종료했다.

<br>

__2 ) Shifting Behavior for Signed Integers__

부호 있는 정수의 *Bit-Shifting* 행동은 <span style="color: red;">이진으로 표현되는 방법 때문에</span> 부호 없는
정수보다 <span style="color: red;">더 복잡하다</span>(다음 예제는 단순화를 위해 8비트의 부호 있는 정수를 사용하지만
동일한 원칙이 모든 부호 있는 정수에 적용된다).

부호 있는 정수는 첫 번째 비트를 부호로 사용한다. 이를 `Sign Bit`로 *0은 양수*를, *1은 음수*를 표현한다. 그리고 나머지
비트는 `Value Bits`로 실제 값을 저장한다. 양수일 때는 부호 없는 정수와 동일한 방식을 사용한다.

![Bit Shift Signed Four](/assets/images/posts/2023-10-14-advanced-operators/bitshiftSignedFour~dark@2x.png){: width="600"}

<p class="center">부호 있는 정수의 <code>+4</code></p>

<br>

하지만 음수의 경우 우리가 직관적으로 사용하는 `부호 + 절대값 숫자`의 형태를 띄지 않는다. `+4`, `-4` 이런 식의 표현은 사람에게
쉽고 익숙한 것이지 컴퓨터 친화적이지 않기 때문이다. 컴퓨터는 **Binary** 로 데이터를 다루기 때문에 2의 보수를 사용해 표현한다.

![Bit Shift Signed Minus Four](/assets/images/posts/2023-10-14-advanced-operators/bitshiftSignedMinusFour~dark@2x.png){: width="600"}

<p class="center">부호 있는 정수의 <code>-4</code></p>

> 2진수가 가질 수 있는 보수는 2의 보수와 1의 보수다.
>
> 1. 2진수 양수 `+4`는 `00000100`이다.
> 2. `+4`의 1의 보수는 `11111111 - 00000100` = `111110110`이다.
> 3. `+4`의 2의 보수는 1의 보수에 1을 더해 `111110110 + 00000001` = `11111100`이 된다.

부호 있는 정수의 `-4`는 *Sign Bit* 1과 *Value Bits* `1111100`으로 이루어진다. 10진수에서 이 값은 124를 갖는다.
따라서, 부호 있는 정수의 음수 표현은 2의 보수를 사용해 음수를 표현하는 *Sign Bit*와 2의 보수로 표현되는 *Value Bits*
`128 - 4`를 표현 방식으로 사용하고 있음을 확인할 수 있다. 이를 `Two's Complement Representation(2의 보수 표현)`이라
부른다.

2의 보수 표현을 사용하면 컴퓨터 연산에 여러 장점을 가질 수 있다.

- `-1` + `-4`와 같은 연산을 단순히 표준 이진 덧셈으로 다룰 수 있다.

![Bit Shift Signed Addition](/assets/images/posts/2023-10-14-advanced-operators/bitshiftSignedAddition~dark@2x.png){: width="600"}

2의 보수로 표현된 `-4`와 `-1`을 표준 이진 덧셈 연산을 한 후 정수의 저장소 범위를 넘어 이동된 모든 비트를 삭제하면 손쉽게 `-5`의
2의 보수 표현을 얻는다.

<br>

- Bitwise Shift Operators 를 Unsigned Integers 와 유사하게 다룰 수 있다.

![Bit Shift Signed](/assets/images/posts/2023-10-14-advanced-operators/bitshiftSigned~dark@2x.png){: width="800"}

부호 있는 정수의 Bitwise Left Shift Operator 는 부호 없는 정수와 동일하게 행동하며 값을 2배로 늘린다.  
부호 있는 정수의 Bitwise Right Shift Operator 는 부호 없는 정수와 유사하나, 비트 이동으로 빈 공간을 `0`으로 채우는 것이
아닌 <span style="color: red;">*Sign Bit 로 빈 자리를 채운다*</span>. 이것을 `Arithmetic Shift`라 한다.

---

### 3. Overflow Operators 👩‍💻

#### 1. Overflow Operators

Swift 는 정수 상수 또는 변수에 *저장할 수 없는 값을 삽입하려고 하면, 유효하지 않은 값을 생성을 허용하지 않으며 에러를 
발생*시킨다. 이러한 행동은 너무 크거나 작은 값을 다룰 때 추가적인 **Safety** 를 제공한다.

예를 들어 `Int16` 정수는 2^16 = 65,536 개의 값을 0을 기준으로 저장하므로 -32,768 ~ 32,767 의 값을 저장할 수 있으므로 
이 범위를 초과하는 숫자를 저장하려고 하면 에러를 발생시킨다.

```swift
var potentialOverflow = Int16.max   // 32,767
potentialOverflow += 1  //  error, Swift runtime failure: arithmetic overflow
```

따라서 경계값 조건을 코딩할 때 에러 처리를 제공해 유연성을 높일 수 있다. 하지만 에러를 발생시키는 대신 `&`를 붙여 `Overflow 
Operators`를 사용할 수도 있다. Swift 는 3가지 *Arithmetic Overflow Operators* 를 제공한다.

- Overflow addition `&+`
- Overflow subtraction `&-`
- Overflow multplication `&*`

```swift
var potentialOverflow = Int16.max   // 32,767

print(potentialOverflow &+ 1)   // -32768
print(potentialOverflow &+ 2)   // -32767
print(potentialOverflow &+ 3)   // -32766

print(potentialOverflow &- 1)   // 32766

print(potentialOverflow &* 2)   // -2
```

#### 2. Value Overflow

숫자는 **Positive**, **Negative** 양 방향으로 오버플로우 될 수 있다.

앞에서 정의한 `printToBinary(number:)` 함수를 다음과 같이 고치고 Overflow Operators 의 동작을 살펴보자.

```swift
func printToBinary<T: BinaryInteger>(number: T) {
    print("Binary: \(toBinary(number)), Decimal: \(number)")

    func toBinary(_ number: T) -> String {
        let absoluteNumber = abs(Int(number))
        let binary = String(absoluteNumber, radix: 2)
        if binary.count < 8 {
            return String(repeating: "0", count: 8 - binary.count) + binary
        } else {
            return binary
        }
    }
}
```

다음은 부호 없는 정수의 **Positive** 방향으로의 오버플로우 발생에 대한 예제다.

![Overflow Unsigned Addition](/assets/images/posts/2023-10-14-advanced-operators/overflowAddition~dark@2x.png){: width="600"}

```swift
var unsignedOverflow = UInt8.max
printToBinary(number: unsignedOverflow)
unsignedOverflow = unsignedOverflow &+ 1
printToBinary(number: unsignedOverflow)
```

```console
Binary: 11111111, Decimal: 255
Binary: 00000000, Decimal: 0
```

> - 변수 unsignedOverflow 는 `UInt8`의 최댓값 `11111111`을 초깃값으로 저장한다.
> - Overflow Addition Operator `&+`를 사용해 값을 1 증가시킨다.
> - 정수의 저장 범위를 넘는 비트는 **제거**되고 `00000000`이 남게 된다.

<br>

이번에는 부호 없는 정수의 **Negative** 방향으로의 오버플로우 발생에 대한 예제를 알아보자.

![Overflow Unsigned Subtraction](/assets/images/posts/2023-10-14-advanced-operators/overflowUnsignedSubtraction~dark@2x.png){: width="600"}

```swift
var anotherUnsignedOverflow = UInt8.min
printToBinary(number: anotherUnsignedOverflow)
anotherUnsignedOverflow = anotherUnsignedOverflow &- 1
printToBinary(number: anotherUnsignedOverflow)
```

```console
Binary: 00000000, Decimal: 0
Binary: 11111111, Decimal: 255
```

<br>

*오버플로우는 Signed Integers 에서도 발생*한다. 부호 있는 정수의 모든 덧셈, 뺄셈은 비트 방식으로 수행된다.

![Overflow Signed Subtraction](/assets/images/posts/2023-10-14-advanced-operators/overflowSignedSubtraction~dark@2x.png){: width="600"}

```swift
var signedOverflow = Int8.min
printToBinary(number: signedOverflow)
signedOverflow = signedOverflow &- 1
printToBinary(number: signedOverflow)
```

```console
Binary: 10000000, Decimal: -128
Binary: 01111111, Decimal: 127
```

> - 변수 signedOverflow 는 `Int8`의 최솟값 `10000000`을 초깃값으로 저장한다.
> - Overflow Subtraction Operator `&-`를 사용해 값을 1 감소시킨다.
> - 결과값은 부호 비트가 토글되어 양수가 되어 `01111111`을 저장한다.

> <span style="color: red;">Signed Intergers, Unsigned Integers 는 동일하게 **최댓값을 넘어서면 최솟값으로, 
> 최솟값을 넘어서면 최댓값으로 순환**</span>된다.

---

### 4. Precedence and Associativity 👩‍💻

---

### 5. Operator Methods 👩‍💻

#### 1. Operator Methods

#### 2. Prefix and Postfix Operators

#### 3. Compound Assignment Operators

#### 4. Equivalence Operators

---

### 6. Custom Operators 👩‍💻

#### 1. Custom Operators

#### 2. Precedence for Custom Infix Operators

---

### 7. Result Builders 👩‍💻



<br><br>

---
Reference

1. "Advanced Operators." The Swift Programming Language Swift 5.9. accessed Oct. 14, 2023, [Swift Docs Chapter 27 - Advanced Operators](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/advancedoperators).
