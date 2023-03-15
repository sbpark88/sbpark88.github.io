---
layout: post
title: Swift Life Cycle - View Controller Lifecycle, App Lifecycle
subtitle: Understanding about iOS API Lifecycle, View Controller Lifecycle and App Lifecycle 
categories: swift
tags: [swift docs, view controller lifecycle, app lifecycle, viewDidLoad, ]
---

### 1. View Controller Lifecycle 👩‍💻

#### 1. View Controller Lifecycle

![UIViewController-Life-Cycle](/assets/images/posts/2023-03-16-swift-lifecycle/UIViewController_Class_Reference_2x_ddcaa00c-87d8-4c85-961e-ccfb9fa4aac2.png){: width="800"}

`UIStoryboard` & `UIKit`과 함께 사용되어, View 의 Life Cycle 을 관리한다.

이것은 Frontend 를 할 때 Angular, React, Vue 에서 사용하는 Lifecycle Hooks 와 거의 동일한 역할을 한다. 브라우저(window) 가 아닌 
*View Components* 를 관리하는 것이 Frontend 에서의 Lifecycle Hooks 인데 Swift 의 UIViewController Lifecycle 역시 이와 
동일하게 앱 자체의 화면 관리가 아닌, *UIStoryboard* 라는 것의 Life Cycle 을 관리한다.

#### 2. Examples - Present Modally - Automatic

- ViewController1

```swift
class ViewController1: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        print("VC1 viewDidLoad Called")
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("VC1 viewWillAppear Called")
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("VC1 viewDidAppear Called")
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        print("VC1 viewWillDisappear Called")
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        print("VC1 viewDidDisappear Called")
    }

}
```

- ViewController2

```swift
class ViewController2: UIViewController {

    @IBOutlet weak var label: UILabel!

    @IBAction func goBack(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        label.text = "hello"

        print("VC2 viewDidLoad Called")
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("VC2 viewWillAppear Called")
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("VC2 viewDidAppear Called")
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        print("VC2 viewWillDisappear Called")
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        print("VC2 viewDidDisappear Called")
    }

}
```

<br>

![View-Controller-Life-Cycle-Modal](/assets/images/posts/2023-03-16-swift-lifecycle/view-controller-life-cycle-modal.png){: width="400"}

__1 ) VC1 로딩__

```console
VC1 viewDidLoad Called
VC1 viewWillAppear Called
VC1 viewDidAppear Called
```
<br>

__2 ) VC2로 이동__

```console
VC2 viewDidLoad Called
VC2 viewWillAppear Called
VC2 viewDidAppear Called
```
<br>

__3 ) VC1로 되돌아가기__

`Back` 버튼을 눌러 이동시

```console
VC2 viewWillDisappear Called
VC2 viewDidDisappear Called
```
<br>

그런데 Modal 은 View Controller 의 Life Cycle 에서 조금 특이한 부분이 있다. Modal 을 천천히 끌어 내리거나 끌어 내리다 다시 올릴 경우 
호출되는 Life Cycle 을 보자.

- Modal 을 끌어내리는 동안

```console
VC2 viewWillDisappear Called
```

- Modal 을 완전히 끌어 내려 VC1으로 이동시

```console
VC2 viewDidDisappear Called
```

이로써 Modal 을 천천히 내려 둘이 호출되는 시점이 명백히 다르다는 것을 확인할 수 있다.

- Modal 을 끌어 내리다 다시 올려 VC2로 되돌아올 경우

```console
VC2 viewWillAppear Called
VC2 viewDidAppear Called
```

> `viewDidLoad()`는 호출되지 않는 것을 확인할 수 있다.

<br>

__4 ) 다시 VC2로 이동__

```console
VC2 viewDidLoad Called
VC2 viewWillAppear Called
VC2 viewDidAppear Called
```
<br>

__5 ) 앱 쓸어올리기__

```console
// Nothing
```
<br>

__6 ) 앱 내리기__

```console
// Nothing
```

앱을 쓸어 올리거나 내렸다 다시 들어오는 것은 VC 의 Lifecycle 과는 무관하다.

#### 3. Examples - Present Modally - Full Screen

![View-Controller-Life-Cycle-Full-Screen](/assets/images/posts/2023-03-16-swift-lifecycle/view-controller-life-cycle-full-screen.png){: width="400"}

__1 ) VC1 로딩__

```console
VC1 viewDidLoad Called
VC1 viewWillAppear Called
VC1 viewDidAppear Called
```
<br>

__2 ) VC2로 이동__

```console
VC2 viewDidLoad Called
VC1 viewWillDisappear Called
VC2 viewWillAppear Called
VC2 viewDidAppear Called
VC1 viewDidDisappear Called
```

Modal 에서 Full Screen 으로 바꾸자 완전히 다른 행동 패턴을 보여준다.

<br>

__3 ) VC1로 되돌아가기__

```console
VC2 viewWillDisappear Called
VC1 viewWillAppear Called
VC1 viewDidAppear Called
VC2 viewDidDisappear Called
```

> 마찬가지로 `viewDidLoad()`는 호출되지 않는 것을 확인할 수 있다. 하지만 Modal 과 달리 완전히 가려졌던 VC1 을 다시 보이면서 
> `viewWillAppear(_:)`와 `viewDidAppear(_:)`가 호출되는 것을 확인할 수 있다. 

<br>

__4 ) 다시 VC2로 이동__

```console
VC2 viewDidLoad Called
VC1 viewWillDisappear Called
VC2 viewWillAppear Called
VC2 viewDidAppear Called
VC1 viewDidDisappear Called
```
<br>

__5 ) 앱 쓸어올리기__

```console
// Nothing
```
<br>

__6 ) 앱 내리기__

```console
// Nothing
```

> 중요한 것은 둘 다 보여주는 방식의 차이일 뿐 모두 Modal 방식을 사용하기 때문에 VC1 은 VC2 로 가더라도 아래 감춰지는 것일 뿐 destroyed 
> 되지 않고 `viewDidLoad()`가 다시 호출되지 않는다. 반면 VC2 는 VC1 로 돌아갈 때 destroyed 되기 때문에 VC2 로 다시 이동할 경우 
> `viewDidLoad()`가 다시 호출된다.

---

### 2. App Lifecycle 👩‍💻



<br><br>

---
Reference

1. Angela Yu, "iOS & Swift - The Complete iOS App Development Bootcamp, Section 15." Udemy.com. last modified Nov. 2021, [https://www.udemy.com/course/ios-13-app-development-bootcamp/](https://www.udemy.com/course/ios-13-app-development-bootcamp/).
2. "UIViewController." Apple Developer Documentation. accessed Mar. 16, 2023, [UIViewController Life Cycle](https://developer.apple.com/documentation/uikit/uiviewcontroller).
3. "Managing your app's life cycle." Apple Developer Documentation. accessed Mar. 16, 2023, [App Life Cycle](https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle).
