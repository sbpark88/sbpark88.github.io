---
layout: post
title: 스토리보드가 Assistant 로 Controller 를 연결하지 못할 때
subtitle: Assign the exact controller manually.
excerpt_image: NO_EXCERPT_IMAGE
categories: [swift]
tags: [storyboard]
---

### 스토리보드에서 View 가 Controller 와 연결 되지 못하는 문제 해결하기 👩‍💻

#### 1. 스토리보드에서 연결하려는 View 를 선택한다.

![assign-the-storyboard-to-the-matched-controller-1](/assets/images/posts/2022-07-24-when-the-storyboard-cannot-link-to-the-controller/assign-the-storyboard-to-the-matched-controller-1.png)

위 이미지처럼 우측 Inspector 에 해당 View 에 연결된 Class 가 정해지지 않았으며, `UIViewController`이어야 한다고 알려준다.

#### 2. 연결하려는 Controller 이름을 확인한다.

![assign-the-storyboard-to-the-matched-controller-2](/assets/images/posts/2022-07-24-when-the-storyboard-cannot-link-to-the-controller/assign-the-storyboard-to-the-matched-controller-2.png)

Navigator 에 나오는 이름은 `파일 이름`이다. 일반적으로 `파일 이름`과 `클래스 이름`은 동일하게 짓지만 다를 수도 있다.
우리가 알아야 하는 이름은 <font style="color: red;">클래스 이름</font>이다. 🤓

#### 3. 위 1번에 해당 클래스 이름을 넣어준다.

![assign-the-storyboard-to-the-matched-controller-3](/assets/images/posts/2022-07-24-when-the-storyboard-cannot-link-to-the-controller/assign-the-storyboard-to-the-matched-controller-3.png)

빨간 네모 상자 안에 연결하려는 Controller 의 클래스 이름을 넣어준다.  
설정 후 상자 안에 `→` 모양의 버튼을 누르면 해당 클래스로 이동하니 어떤 클래스인지 확인할 수 있다.
