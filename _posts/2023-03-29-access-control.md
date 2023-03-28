---
layout: post
title: Swift Access Control
subtitle: Manage the visibility of code by declaration, file, and module. 
categories: swift
tags: [swift docs, access control, access level, modules, source files, open, public, internal, fileprivate, private]
---

### 1. Access Control 👩‍💻

Access Control 은 다른 소스 파일과 모듈에서 코드에 접근하는 것을 제한한다. Access Control 을 이용해 코드를 은닉화(hiding) 하고 
접근할 수 있는 기본 인터페이스를 지정할 수 있다.

접근 수준은 Classes, Structures, Enumerations 단위로 제한하거나 이에 속해 있는 Properties, Methods, Initializers, 
Subscripts 단위로 제한하는 것 역시 가능하다. 또한 Protocols 는 특정 context 단위로 제한될 수 있다.

> 이 문서에서는 간결성을 위해 Properties, Types, Functions 등과 같이 Access Control 을 적용할 수 있는 것들을 `Entities`로 표현한다.

---

### 2. Modules and Source Files 👩‍💻

Swift 의 Access Control 은 `Modules`와 `Source Files`의 개념을 기초로 한다.

- Modules : **Single unit of code distribution**. 즉, 코드가 빌드되고 제공되는 Framework 또는 App 과 같은 코드의 배포 단위로
  `import` keyword 를 사용해 다른 모듈을 가져와 사용한다.
- Source Files : Modules 내의 **Single Swift Source Code File** 로 실제로 Framework 또는 App 내에 있는 Single File 을 
  의미하며, 일반적으로 서로 다른 Types 는 각각의 Source Files 에 정의하지만 *Swift 에서는 `Single Source Code File 에 여러 
  Types, Functions 등에 대한 정의를 포함`할 수 있다*.

---

### 3. Access Levels 👩‍💻

#### 1. Access Levels

Swift 는 코드 내에서 *Entities* 에 대해 5개의 다른 Access Levels 를 제공한다. 이 Access Levels 는 
`Modules > Source Files > Entities`의 Hierarchy 구조와 관련된다.

- Open : Framework Level, Framework 를 공개된 인터페이스로 지정할 때 사용한다. <span style="color: red;">Classes 와 
  Class Members 에만 사용 가능하며, 다른 모듈에서 **Subclassing**, **Overriding** 하는 것이 가능하다.</span>
- Public : Framework Level, open 과 유사한 접근 레벨을 가지며 App 또는 Framework 를 공개된 인터페이스로 지정할 때 사용한다.  
  (단, 위 빨간색으로 설명한 open 에서만 적용되는 것에 대해서는 제한된다.)
- Internal : Application Level, 생략시 적용되는 기본 접근 레벨로, 동일 모듈 내에서 자유로운 접근이 가능하지만 외부 모듈의 접근은 제한된다. 
  따라서 App 또는 Framework 의 내부 구조를 정의할 때 사용한다.
- File-private : Application Level, Source File 내부로 접근을 제한한다.
- Private : Application Level, Source File 안에서도 정의를 둘러싼 context 로 내부로 접근을 제한한다.

#### 2. Guiding Principle of Access Levels

- `Public Variables`는 *Internal*, *File-private*, *Private* Types 로 정의될 수 없다. Public Variables 는 어디서나 
  사용될 수 있지만 Access Levels 를 이보다 낮은 수준으로 변경할 경우 그렇지 못하기 때문이다.
- `Functions`는 *Parameter* 와 *Return* Types 보다 높은 수준의 Access Levels 를 가질 수 없다.

#### 3. Default Access Levels

명시적으로 Access Levels 를 지정하지 않으면 Swift 는 default 로 `Internal`을 Access Levels 로 갖도록 한다. 따라서 대부분의 경우 
Access Levels 를 명시할 필요가 없다.

#### 4. Access Levels for Single-Target Apps

`Single-Target App`을 만들 때 앱의 코드는 앱 내에 포함되며 앱의 외부 모듈에서 사용하도록 만들 필요가 없다. Swift 에 의해 default 로 
지정되는 `Internal`은 이에 적합하므로 Access Levels 를 명시할 필요가 없다. 단, 앱의 모듈 내부 다른 코드에게 구현의 세부 내용을 가리기 위해 
`File Private`, `Private`을 이용해 Access Levels 를 제한하는 것이 가능하다.

#### 5. Access Levels for Frameworks

Framework 를 개발할 때 다른 모듈에서의 접근이 가능하도록 Framework 의 공용 인터페이스를 `open` 또는 `public`으로 표시한다.

> Framework 내의 헤부 구현은 Default Access Levels 인 `internal`을 사용할 수 있으며, Framework 내부에서도 다른 코드 부분에 
> 가리고자 하는 데이터는 `fileprivate` 또는 `private`을 명시할 수 있다. Framework 가 노출 시킬 API 에 해당하는 Entities 에만 
> `open`, `public`을 명시하면 된다.

#### 6. Access Levels for Unit Test Targets

Unit Test Targets 을 이용해 앱을 구현할 때 해당 코드는 테스트를 위해 Test 모듈 에서 사용할 수 있어야 한다. 하지만 일반적으로 `open` 또는 
`public`으로 선언되지 않은 Entities 는 다른 모듈에서 사용할 수 없다.

단, <span style="color: red;"> Unit Test Targets 에 한해 모듈을 import 할 때 앞에 `@testable` attribute 명시하면 해당 
모듈의 internal entities 에 접근이 가능</span>하다.

---

### 4. Access Control Syntax 👩‍💻

위에서 설명한 Access Levels 을 설정하기 위해 *open, public, internal, fileprivate, private* modifier 를 Entities 의 정의 앞에
명시하기 위한 Syntax 다.

```swift
public class SomePublicClass {}
internal class SomeInternalClass {}
fileprivate class SomeFilePrivateClass {}
private class SomePrivateClass {}

public var somePublicVariable = 0
internal let someInternalConstant = 0
fileprivate func someFilePrivateFunction() {}
private func somePrivateFunction() {}
```

그리고 위에서 internal 로 선언된 `SomeInternalClass`와 `someInternalConstant`는 별도로 명시하지 않고 default Access Levels 가
적용되도록 다음과 같이 선언할 수 있다.

```swift
class SomeInternalClass {}              // implicitly internal
let someInternalConstant = 0            // implicitly internal
```

---

<br><br>

---
Reference

1. "Access Control." The Swift Programming Language Swift 5.7. accessed Mar. 29, 2023, [Swift Docs Chapter 26 - Access Control](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/accesscontrol).

[Associated Values]:/swift/2022/11/01/enumerations.html#h-4-associated-values-
[Raw Values]:/swift/2022/11/01/enumerations.html#h-5-raw-values-
[Required Initializers]:/swift/2022/12/01/initialization.html#h-7-required-initializers--
[Default Initializers]:/swift/2022/12/01/initialization.html#h-3-default-initializers-
