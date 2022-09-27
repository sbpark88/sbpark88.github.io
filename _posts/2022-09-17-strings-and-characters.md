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

#### <span style="color: rgba(166, 42, 254, 1)">String Mutability</span>

단지 우리는 변수를 할당할 때 `var`, `let`을 구분해 할당하여 변수와 상수를 구별할 수 있다.

- `var`로 선언한 변수는 수정이 가능하다.

```swift
var variableString = "Horse"
variableString += " and carriage"
print(variableString)   // Horse and carriage
```

- `let`으로 선언한 상수는 수정이 불가능하다.

```swift
let constantString = "Highlander"
constantString += " and another Highlander" // left side of mutating operator isn't mutable:
print(constantString)
```

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

### <span style="color: orange">4. Concatenating Strings and Characters (문자열과 문자의 결합) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)">1. String + String, String + Character</span>
- `String` + `String`은 `+` 연산자를 이용한다.

```swift
var string1 = "hello"
var string2 = " there"
print(string1 + string2)    // hello there
```

- `String` + `Character`는 `String`의 `append()` 메서드를 이용한다.

```swift
var string1 = "hello"
let exclamationMark: Character = "!"
string1.append(exclamationMark)
print("string1.append(exclamationMark) = \(string1)")   // hello!
```

> 🙃`Character` + `String`은 불가능하다. `Character`는 `Single Character`만 가질 수 있기 때문이다.

#### <span style="color: rgba(166, 42, 254, 1)">2. Concatenating of The Multiline String Literals</span>
여러 줄의 문자열을 합칠 때는 문자열의 개행이 포함되는 때를 이해해야한다.

```swift
let badStart = """
one
two
"""

let end = """
three
"""

print(badStart + end)
```

```console
one
twothree
```

`two` 다음에는 개행이 포함되지 않는다. 따라서 다음 문자열 three가 새로운 행에서 시작하도록 하려면 다음과 같아야한다.

```swift
let goodStart = """
one
two

"""

let end = """
three
"""

print(goodStart + end)
```

```console
one
two
three
```
---

### <span style="color: orange">5. String Interpolation (문자열 삽입) 👩‍💻</span>
`String Interpolation`은 `String Literal` 안에 `constants`, `variables`, `literals`, 그리고 `expressions`를 포함해 `새 문자열`을 만드는 방법이다.

```swift
let three = 3
print("\(three) times 2.5 is \(Double(three) * 2.5)")   // 3 times 2.5 is 7.5
```

`Multiline String`에서 역시 사용할 수 있다.

```swift
let three = 3
let multilineString = """

     \(three)
x    2.5
---------
     \(Double(three) * 2.5)

"""
print(multilineString)
```

```console
     3
x    2.5
---------
     7.5
```

- `String Interpolation` 역시`Extended String Delimiters`의 규칙을 우선하여 따른다.

```swift
let ignored = #"\(three) times 2.5 is \(Double(three) * 2.5)"#
print(ignored)  // \(three) times 2.5 is \(Double(three) * 2.5)

let worksWell = #"\#(three) times 2.5 is \#(Double(three) * 2.5)"#
print(worksWell) = 3 times 2.5 is 7.5
```

---

### <span style="color: orange">6. Unicode (유니코드) 👩‍💻</span>
유니코드는 서로 다른 시스템에서 문자를 인코딩, 표현, 처리하기 위한 국제 표준이다.  
`Swift`의 `String`과 `Character`는 완벽히 유니코드와 호환된다.

#### <span style="color: rgba(166, 42, 254, 1)">1. Ubicode Scalar Values (유니코드 스칼라 값)</span>
`Swift`의 기본 `String` 타입은 `Unicode Scalar Values`로부터 빌드된다.  
`Unicode Scalar Value`는 `character` 또는 `modifier`를 표현하기 위한 `unique`한 21-bit 숫자다.

Syntax는 다음과 같다. `\u{Unicode Number}`

```swift
// U+0061 is LATIN SMALL LETTER A("a")
print("\u{0061}")   // a
print("\u{61}")     // a

// U+1F425 is FRONT-FACING BABY CHICK("🐥")
print("\u{1F425}")  // 🐥
```

#### <span style="color: rgba(166, 42, 254, 1)">2. Extended Grapheme Clusters (자모 그룹의 확장)</span>
`Swift`의 모든 `Character` 타입 인스턴스는 `single extended grapheme cluster`로 표현된다. 이것은 하나 또는 그 이상의 `Unicode Scalar Values`로 구성되며 여러 개의 `Unicode Scalar Values`로 구성되는 경우 결합되어 사람이 읽을 수 있는 단일 문자로 표현된다.

- 이 클러스터는 하나의 `scalar`로 구성되었다.

```swift
// U+00E9 is e acute
print("\u{E9}")         // é
```

- 위 클러스터는 다음과 같이 두 개의 `scalar` 결합으로 구성될 수 있다.

```swift
// U+0065 is "e"
print("\u{65}")         // e

// U+0301 is " ́"
print("\u{301}")        //  ́

// Combine U+0065 with U+0301 is e aucte
print("\u{65}\u{301}")  // é
```

다음 예제를 더 살펴보자

```swift
print("\u{D55C}")                   // 한
print("\u{1112}\u{1161}\u{11AB}")   // 한 = ㅎ + ㅏ + ㄴ
```

```swift
// U+1F1FA is REGIONAL INDICATOR SYMBOL LETTER U("🇺")
print("\u{1F1FA}")              // 🇺

// U+1F1F8 is REGIONAL INDICATOR SYMBOL LETTER S("🇸")
print("\u{1F1F8}")              // 🇸

// Combine U+1F1FA with U+1F1F8 is 🇺🇸
print("\u{1F1FA}\u{1F1F8}")     // 🇺🇸
```

---

### <span style="color: orange">7. Counting Characters (문자 세기) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">8. Accessing and Modifying a String (문자열 접근과 수정) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">9. Substrings (부분 문자열) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">10. Comparing Strings (문자열 비교) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---

### <span style="color: orange">11. Unicode Representations of Strings (문자열의 유니코드 표현) 👩‍💻</span>
#### <span style="color: rgba(166, 42, 254, 1)"></span>

---


<br><br>

---
Reference

1. "Strings and Characters", The Swift Programming Language Swift 5.7, last modified latest(Unknown), accessed Sep. 17 2022, [Swift Docs Chapter 2 - Strings and Characters](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html)
