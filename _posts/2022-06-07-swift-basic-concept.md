---
layout: post
title: Swift Basic Concept
subtitle: IBOutlet, IBAction, Naming Conventions, and Range Operator etc...
categories: [swift]
tags: [swift]
---

### IBOutlet and IBAction

![IBOutlet and IBAction](/assets/images/posts/2022-06-07-swift-basic-concept/iboutlet-ibaction-flow.png)

* __IBOutlet__ : Code -> Design 방향으로 흐른다. 즉, View Controller 의 코드가 Storyboard 를 조작한다.
* __IBAction__ : Design -> Code 방향으로 흐른다. 즉, Storyboard 에서 화면 상 어떠한 조작이 발생할 경우 해당 element 에 연결된 Code block, 즉, 메서드를 호출한다. 이후 해당 메서드는 내부 블럭에 사전에 정의된 비즈니스 로직을 수행하여 또 다른 Code, Design 등에 영향을 줄 수 있다.

---

### Naming Conventions

* __camelCase__
* __PascalCase__
* __kebab-case__
* __snake_case__

> Swift 는 camelCase 를 사용한다‼️

---

### Commenting
* __Single line comment__
```swift
// This line is commented
```
* __Multiple lines comment__
```swift
/*
These lines are commented
commented
commented
*/
```

---

### String

#### String Interpolation
JavaScript 의 Template literals 와 같다. 다만 표현 방식이 다르다.

* __JavaScript__
```javascript
`3 + 5 = ${3 + 5}`
```
* __Swift__
```swift
"3 + 5 = \(3 + 5)"
```

#### String Concatenation
문자열을 연결한다.

```swift
var concatenatedString = "I like " + "swift."

print(concatenatedString)   // "I like swift."
```

---

### Range Operator

```swift
lower ... upper
```
`lower`와 `upper`를 포함한다. `lower` 이상, `upper` 이하.

```swift
lower ..< upper
```
`lower`는 포함하지만 `upper`는 포함하지 않는다. `lower` 이상, `upper` 미만.


<br><br>

---
Reference

1. Angela Yu, "iOS & Swift - The Complete iOS App Development Bootcamp, Section 4." Udemy.com. last modified Nov. 2021, [https://www.udemy.com/course/ios-13-app-development-bootcamp/](https://www.udemy.com/course/ios-13-app-development-bootcamp/)
