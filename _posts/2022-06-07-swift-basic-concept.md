---
layout: post
title: Swift Basic Concept
subtitle: IBOutlet, IBAction, Naming Conventions
categories: swift
tags: [swift]
---

## IBOutlet and IBAction

![IBOutlet and IBAction](/assets/images/posts/2022-06-07-swift-basic-concept/iboutlet-ibaction-flow.png)

* __IBOutlet__ : Code -> Design 방향으로 흐른다. 즉, View Controller의 코드가 Storyboard를 조작한다.
* __IBAction__ : Design -> Code 방향으로 흐른다. 즉, Storyboard에서 화면 상 어떠한 조작이 발생할 경우 해당 element에 연결된 Code block, 즉, 메소드를 호출한다. 이후 해당 메소드는 내부 블럭에 사전에 정의된 비즈니스 로직을 수행하여 또 다른 Code, Design 등에 영향을 줄 수 있다.

## Naming Conventions

* __camelCase__
* __PascalCase__
* __kebab-case__
* __snake_case__

> Swift는 camelCase를 사용한다‼️






<br><br>

---
Reference

1. "iOS & Swift - The Complete iOS App Development Bootcamp, Section 4", Udemy.com, last modified Nov. 2021, accessed June. 7 2022, [https://www.udemy.com/course/ios-13-app-development-bootcamp/](https://www.udemy.com/course/ios-13-app-development-bootcamp/)