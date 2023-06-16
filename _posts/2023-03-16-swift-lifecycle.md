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

<br>

__1 ) viewDidLoad__

- View Instance 가 메모리에 로드된 직후 호출.
- View 가 destroyed 되지 않는 한 1번만 호출.
- View 와 관련된 1회성의 초기화 작업, 네트워크 호출 등을 처리.

<br>

__2 ) viewWillAppear__

- View 가 화면에 보이기 직전 매번 호출.
- View 가 destroyed 되지 않더라도 다른 View 가 보여지다 새롭게 보여질 때마다 호출.
- View 가 보일 때마다 매번 실행되어야하는 초기화 작업, 네트워크 호출 등을 처리.

<br>

__3 ) viewDidAppear__

- View 가 화면에 보이기 시작할 때 호출.
- View 가 화면에 보여지기 시작하는 시점에 작동할 애니메이션 등을 처리.

<br>

__4 ) viewWillDisappear__

- View 가 화면에서 사라지기 시작할 때 호출.
- View 가 사라지기 직전 초기화 작업, 네트워크 호출, 데이터 저장 등을 처리.

<br>

__5 ) viewDidDisappear__

- View 가 사라진 다음 호출.
- View Instance 가 메모리에서 제거된 이후 추가적인 작업 필요시 처리.

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

__6 ) 앱 내리기(Background 로 보내기)__

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

__6 ) 앱 내리기(Background 로 보내기)__

```console
// Nothing
```

> 중요한 것은 둘 다 보여주는 방식의 차이일 뿐 모두 Modal 방식을 사용하기 때문에 VC1 은 VC2 로 가더라도 아래 감춰지는 것일 뿐 destroyed 
> 되지 않고 `viewDidLoad()`가 다시 호출되지 않는다. 반면 VC2 는 VC1 로 돌아갈 때 destroyed 되기 때문에 VC2 로 다시 이동할 경우 
> `viewDidLoad()`가 다시 호출된다.

---

### 2. App Lifecycle 👩‍💻

#### 1. App Lifecycles

앱의 현재 상태에 따라 언제든 수행할 수 있는 작업과 수행할 수 없는 작업이 결정된다. 예를 들면 `Foreground App`은 CPU 를 포함한 시스템 리소스보다 
우선 순위가 높다. 반대로 `Background App`은 가능한 한 적은 작업을 수행해야하며, 화면 밖에 있기 때문에 가급적 아무 작업도 수행하지 않는 것이 좋다. 
앱의 상태 변화를 감지하고 그에 따른 작동을 조정하기 위해 Swift 에서는 다음과 같은 방법을 제공한다.

- [UISceneDelegate] : iOS 13 이상에서 App 의 Lifecycles 를 관리하기 위해 사용한다.
- [UIApplicationDelegate] : iOS 12 이하에서 App 의 Lifecycles 를 관리하기 위해 사용한다.

```javascript
document.addEventListener('visibilitychange', (event) => {
    if (document.hidden) {
        console.log('not visible');
    } else {
        console.log('is visible');
    }
});
```

iOS 에서 앱의 상태에 따라 행동을 제어한다는 것은 Frontend 에서 브라우저와 그 탭의 활성 상태를 감지하고 이에 따른 작동을 조정하는 것과 같다.
<br>

__1 ) UISceneDelegate__

![app-lifecycle-scene-state](/assets/images/posts/2023-03-16-swift-lifecycle/scene-state_dark@2x.png){: width="800"}

<br>

__2 ) UIApplicationDelegate__

![app-lifecycle-app-state](/assets/images/posts/2023-03-16-swift-lifecycle/app-state_dark@2x.png){: width="800"}

아래 코드에서 볼 수 있듯이 `UISceneDelegate`는 `UIApplicationDelegate`의 
`application(_:didFinishLaunchingWithOptions:`) 메서드와 `application(_:configurationForConnecting:options:)` 메서드 사이에 
위치한다.

#### 2. Examples - Present Modally - Automatic

- AppDelegate: UIResponder, UIApplicationDelegate

```swift
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        print(#function)

        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        print(#function)

        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        print(#function)
    }

}
```

- SceneDelegate: UIResponder, UIWindowSceneDelegate

```swift
class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        print(#function)
        guard let _ = (scene as? UIWindowScene) else { return }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        print(#function)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        print(#function)
    }

    func sceneWillResignActive(_ scene: UIScene) {
        print(#function)
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        print(#function)
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        print(#function)
    }

}
```

<br>

![View-Controller-Life-Cycle-Modal](/assets/images/posts/2023-03-16-swift-lifecycle/view-controller-life-cycle-modal.png){: width="400"}

__1 ) VC1 로딩__

```console
application(_:didFinishLaunchingWithOptions:)
scene(_:willConnectTo:options:)
VC1 viewDidLoad Called
VC1 viewWillAppear Called
sceneWillEnterForeground(_:)
sceneDidBecomeActive(_:)
VC1 viewDidAppear Called
```

앱을 시작함과 동시에 App Life Cycles `application(_:didFinishLaunchingWithOptions:)`과 `scene(_:willConnectTo:options:)`이 
호출된다.

그리고 첫 번째 View 가 뜨고 로드 되어 뜨기 전 앱이 `Foreground`로 진입하게 되고, *UISceneDelegate* 가 이를 감지하고 
`sceneWillEnterForeground(_:)`와 `sceneDidBecomeActive(_:)`를 호출한다.

<br>

__2 ) VC2로 이동__

```console
VC2 viewDidLoad Called
VC2 viewWillAppear Called
VC2 viewDidAppear Called
```

앱은 계속해서 `Foreground`를 유지하므로, App Life Cycle 은 변화가 없다.

<br>

__3 ) VC1로 되돌아가기__

`Back` 버튼을 눌러 이동시

```console
VC2 viewWillDisappear Called
VC2 viewDidDisappear Called
```

마찬가지로 App Life Cycle 은 변화가 없다.

<br>

__4 ) 앱 쓸어올리기__

```console
sceneWillResignActive(_:)
```
<br>

__5 ) 앱 내리기(Background 로 보내기)__

```console
sceneDidEnterBackground(_:)
```

<br>

__6 ) 앱 다시 불러오기(Foreground 로 불러오기)__

```console
sceneWillEnterForeground(_:)
sceneDidBecomeActive(_:)
```

<br>

__7 ) 앱 위로 날려 종료하기__

```console
sceneWillResignActive(_:)
```

```console
sceneDidDisconnect(_:)
application(_:didDiscardSceneSessions:)
VC1 viewWillDisappear Called
VC1 viewDidDisappear Called
```

#### 3. Examples - Present Modally - Full Screen

![View-Controller-Life-Cycle-Full-Screen](/assets/images/posts/2023-03-16-swift-lifecycle/view-controller-life-cycle-full-screen.png){: width="400"}

__1 ) VC1 로딩__

```console
application(_:didFinishLaunchingWithOptions:)
scene(_:willConnectTo:options:)
VC1 viewDidLoad Called
VC1 viewWillAppear Called
sceneWillEnterForeground(_:)
sceneDidBecomeActive(_:)
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

<br>

__3 ) VC1로 되돌아가기__

`Back` 버튼을 눌러 이동시

```console
VC2 viewWillDisappear Called
VC1 viewWillAppear Called
VC1 viewDidAppear Called
VC2 viewDidDisappear Called
```

<br>

__4 ) 앱 쓸어올리기__

```console
sceneWillResignActive(_:)
```
<br>

__5 ) 앱 내리기(Background 로 보내기)__

```console
sceneDidEnterBackground(_:)
```

<br>

__6 ) 앱 다시 불러오기(Foreground 로 불러오기)__

```console
sceneWillEnterForeground(_:)
sceneDidBecomeActive(_:)
```

<br>

__7 ) 앱 위로 날려 종료하기__

```console
sceneWillResignActive(_:)
```

```console
sceneDidDisconnect(_:)
application(_:didDiscardSceneSessions:)
VC1 viewWillDisappear Called
VC1 viewDidDisappear Called
```

<br><br>

---
Reference

1. Angela Yu, "iOS & Swift - The Complete iOS App Development Bootcamp, Section 15." Udemy.com. last modified Nov. 2021, [https://www.udemy.com/course/ios-13-app-development-bootcamp/](https://www.udemy.com/course/ios-13-app-development-bootcamp/).
2. "UIViewController." Apple Developer Documentation. accessed Mar. 16, 2023, [UIViewController Life Cycle](https://developer.apple.com/documentation/uikit/uiviewcontroller).
3. "Managing your app's life cycle." Apple Developer Documentation. accessed Mar. 16, 2023, [App Life Cycle](https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle).

[UISceneDelegate]:https://developer.apple.com/documentation/uikit/uiscenedelegate
[UIApplicationDelegate]:https://developer.apple.com/documentation/uikit/uiapplicationdelegate
