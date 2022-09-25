---
layout: post
title: Swift 문자열
subtitle: Strings and Characters
categories: swift
tags: [swift docs, swift string, swift character]
---

Swift의 `String` 타입은 `Foundation`의 `NSString` 클래스와 연결되고, 이를 확장해 `String`에서 `NSString` 메서드를 사용할 수 있게 해준다. 따라서, `import Foundation`을 하면 `String`을 캐스팅 하지 않고 `NSString` 메서드를 사용할 수 있다.

### <span style="color: orange">1. String Literals (문자열 리터럴) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. Multiline String Literals (여러줄 문자열 리터럴)</span>
Swift에서 문자열은 다음과 같이 `"` 사이에 원하는 텍스트를 입력하고, 코드가 필요할 경우 `\()` 안에 넣어 삽입하는 방식으로 사용이 가능하다.

```swift
let someString = "Some string literal value"
print("someString: \(someString)")  // someString: Some string literal value
```

또한 Swift에서 `Multiline` 문자열이 필요한 경우 `"""` 3개를 연속으로 사용하고, 그 사이에 텍스트를 넣는다.

```swift
var quotation = """
The White Rabbit put on his spectacles.  "Where shall I begin,
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on
till you come to the end; then stop."
"""
print(quotation)
```

그러면 아래와 같이 그대로 출력되는 것을 확인할 수 있다.

```console
The White Rabbit put on his spectacles.  "Where shall I begin,
please your Majesty?" he asked.

"Begin at the beginning," the King said gravely, "and go on
till you come to the end; then stop.
```

`Multiline String Literals`에서는 `line break` 또한 문자열 값으로 간주하기 때문에 개행을 위해 `\n`을 입력할 필요가 없다.

그렇다면, 가독성을 위해 코드상에서는 `Multiline String Literals`을 사용하고 싶은데, 실제로는 개행을 하고 싶지 않다면 어떻게 해야할까?

```swift
var quotation = """
The White Rabbit put on his spectacles.  "Where shall I begin, \
please your Majesty?" he asked.
"Begin at the beginning," the King said gravely, "and go on \
till you come to the end; then stop."
"""
print(quotation)
```

위와 같이 `\`를 넣어주면 개행을 하지 않도록 처리할 수 있다.
그러면 출력 결과는 아래와 같이 변경될 것이다.

```console
The White Rabbit put on his spectacles.  "Where shall I begin, please your Majesty?" he asked.
"Begin at the beginning," the King said gravely, "and go on till you come to the end; then stop.
```

#### <span style="color: rgba(166, 42, 254, 1)">2. String Indent (문자열 들여쓰기)</span>

![multiline string indent](/assets/images/posts/2022-09-17-strings-and-characters/multilineStringWhitespace_2x.png)

종료하는 `"""`를 기준으로 앞의 공간은 무시되고, 해당 라인이 기준이 된다. 따라서 해당 라인 이후로 있는 공백만 정상 공백으로 인식된다.

```swift
var quotation = """
      The White Rabbit put on his spectacles.
        "Where shall I begin, please your Majesty?" he asked.
      "Begin at the beginning," the King said gravely, "and go on \
      till you come to the end; then stop."
      """
print(quotation)
```

출력 결과는 다음과 같다.

```console
The White Rabbit put on his spectacles.
  "Where shall I begin, please your Majesty?" he asked.
"Begin at the beginning," the King said gravely, "and go on till you come to the end; then stop."
```

#### <span style="color: rgba(166, 42, 254, 1)">3. Special Characters in String Literals (문자열 리터럴의 특수 문자)</span>
- Escaped special characters  
`\0` (null character), `\\` (backslash),  
`\t` (horizontal tab), `\n` (line feed), `\r` (carriage return),  
`\"` (double quotation mark) and `\'` (single quotation mark)  

그 중 가장 많이 쓰이는 `\n`를 예로 살펴보자.

```swift
let specialCharacters = "To me:\nLive as if you were to \"die\" tomorrow."
print(specialCharacters)
```

```console
To me:
Live as if you were to "die" tomorrow.
```

- Unicode scalar value  
다음은 `\u{n}` 형태로 표현되는 유니코드다.

```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imagination is more important than knowledge" - Einstein
let dollarSign = "\u{24}"        // $,  Unicode scalar U+0024
let blackHeart = "\u{2665}"      // ♥,  Unicode scalar U+2665
let sparklingHeart = "\u{1F496}" // 💖, Unicode scalar U+1F496
```

- Extended String Delimiters (확장된 문자열 구획 문자)  
마지막으로 위 `Special Characters`를 무시하도록 처리할 수 있는 특수한 형태가 존재한다.  
이것은 문자열의 앞뒤에 `동일한 개수의 #`을 입력하는 방식으로 표현한다.

```swift
#"Line 1\nLine 2"#
##"Line 1\nLine 2"##
###"Line 1\nLine 2"###
```

위 문자열은 모두 다음과 같은 출력 결과를 갖는다.

```console
Line 1\nLine 2
```

앞뒤에 동일한 개수의 `#`을 입력함으로써 `Escaped special characers` `\n`가 작동을 하지 않고 그대로 출력되었다.

위에서 여러 줄 문자열 리터럴에서 개행을 일부러 하지 않기 위해 `\`를 넣었던 것처럼, `Extended String Delimiters`로 감싸진 문자열에서 일부러 작동하도록 하려면 어떻게 해야할까?

그 답은 `\` 뒤에 `동일한 개수의 #`을 넣음으로써 가능하다.

```swift
#"Line 1\#nLine 2"#
##"Line 1\##nLine 2"##
###"Line 1\###nLine 2"###
```

위 문자열은 모두 다음과 같은 출력 결과를 갖는다.

```console
Line 1
Line 2
```

---

### <span style="color: orange">2. Initializing an Empty String (빈 문자열 초기화) 👩‍💻</span>
문자열 초기화는 다음과 같은 두 가지 방식이 있으며, 결과는 동일하다.

```swift
var emptyString = ""
var initializerSyntax = String()
```

- String Mutability

단지 우리는 변수를 할당할 때 `var`, `let`을 구분해 할당하여 변수와 상수를 구별할 수 있다.

```swift
var variableString = "Horse"
variableString += " and carriage"
print(variableString)   // Horse and carriage
```

`var`로 선언한 변수는 수정이 가능하다.

```swift
let constantString = "Highlander"
constantString += " and another Highlander" // left side of mutating operator isn't mutable:
print(constantString)
```

`let`으로 선언한 상수는 수정이 불가능하다.

---

### <span style="color: orange">3. Strings Are Value Types (값 타입 문자열) 👩‍💻</span>
`Swift`에서 문자열은 `Value Types(값 타입)`이다.

무슨 말일까? 🤔

> 스위프트에서 새 문자열 값을 생성하면, 함수나 메소드에 전달되거나, 상수나 변수에 할당될 때 그 문자열 값이 복사되고, 복사본이 전달된다.

그렇다면 메모리 사용이 과도해 성능에 문제가 있지 않을까?

> 하지만 실제로는 코드 뒤에서 컴파일러가 실제 복사가 정말 필요한 경우에만 발생하도록 문자열 최적화를 하기 대문에 항상 높은 성능을 유지할 수 있고, 우리는 성능은 신경쓸 필요 없이 스위프트의 문자열이 `Reference type`이 아니라 `Value type`이라는 것에만 집중하면 된다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Working with Characters</span>
우리는 `for-in loop`를 통해 문자열을 반복함으로써 `String`의 개별 문자 `Character`에 접근할 수 있다.

```swift
for character in "Dog!🐶" {
    print(character)
}
// D
// o
// g
// !
// 🐶
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Working from Characters</span>
`String`을 개별 문자 `Character`에 접근하는 것을 반대로 접근하면 다음과 같다.  
👉 `Character`를 개별로 생성하고 배열을 구성해, `String`으로 만들 수 있다.

- 단일 `Character` 생성

```swift
let cCharacter: Character = "C"
print(cCharacter)   // Prints "C"
```

- `Character` 배열을 `String` 생성자에 `arguments`로 전닳 `String`을 생성할 수 있다

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
print(catString)    // Prints "Cat!🐱"
```

---



<br><br>

---
Reference

1. "Strings and Characters", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Sep. 17 2022, [Swift Docs Chapter 2 - Strings and Characters](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html)
